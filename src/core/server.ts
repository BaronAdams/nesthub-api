import express, { NextFunction, Request, Response, Express } from 'express';
import path from 'path'
import http from 'http'
import { Server } from 'socket.io';
import authRouter from '../modules/auth/auth.route'
import postRouter from '../modules/post/post.route'
import userRouter from '../modules/user/user.route'
import propertyRouter from '../modules/property/property.route'
import upload from '../common/middlewares/multer'
import { connect } from '../db/sql/connect';

const host = process.env.NODE_ENV == "production" ? process.env.HOSTNAME : 'localhost'
const port = 7000
const allowedOrigins = process.env.NODE_ENV == "production" ? [] : ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:5000", "http://localhost:8100", "http://localhost:5173"]
const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)

// Middleware pour utiliser publiquement les fichiers statiques du serveur API
app.use('/images', express.static(path.join(__dirname, '../../public/images')))
app.use(express.urlencoded({ extended: true }))

// Middleware pour la configuration CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    next()
  
})

// Middleware pour permettre aux utilisateurs aux utilisateurs de l'API d'envoyer le corps
// de leurs requêtes au format JSON
app.use(express.json())
// Middleware vers les routes d'authentification (de prefixe /api/auth/ )
app.use('/api/auth', authRouter)
// Middleware vers les routeur chargé des Post (de prefixe /api/posts/ )
app.use('/api/posts', postRouter)
// Middleware vers les routeur chargé des Post (de prefixe /api/users/ )
app.use('/api/users', userRouter)
// Middleware vers les routeur chargé des Post (de prefixe /api/posts/ )
app.use('/api/properties', propertyRouter)

// Route d'API pour uploader des fichiers dans le serveur ou dans un cloud
app.post('/api/upload', upload, (req: Request, res: Response) => {
  if (req?.file) {
    const fileName = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    return res.status(200).json(fileName)
  } else {
    return res.status(200).json(`${req.protocol}://${req.get('host')}/images/blog3.webp`)
  }
})

// Fonction de connexion du socket de notre serveur
io.on("connection", (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Gérer l'authentification via le token
  // socket.on("authenticate", (token: string) => {
  //   const decodedToken = decryptToken(token)
  //   const userId = decodedToken?.userId; // Implémentez cette fonction
  //   if (userId) {
  //     userStatuses.set(userId, { userId, isOnline: true, lastSeen: null });

  //     // Rejoindre les chats de l'utilisateur
  //     getUserChatIds(userId).forEach((chatId) => socket.join(chatId));

  //     // Notifier les autres utilisateurs de son statut
  //     io.emit("user-status-update", { userId, isOnline: true });
  //   }
  // });

  // // Gérer la déconnexion
  // socket.on("disconnect", () => {
  //   const userId = getUserIdFromSocket(socket.id); // Implémentez cette fonction
  //   if (userId) {
  //     const status = userStatuses.get(userId);
  //     if (status) {
  //       status.isOnline = false;
  //       status.lastSeen = new Date();
  //       userStatuses.set(userId, status);

  //       io.emit("user-status-update", { userId, isOnline: false, lastSeen: status.lastSeen });
  //     }
  //   }
  // });
});


// Fonction d'écoute de notre serveur API
server.listen(port, host, () => {
  connect()
  console.log(`Server is running on http://${host}:${port}`)
})