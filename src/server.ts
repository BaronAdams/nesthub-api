import express, { NextFunction, Request, Response, Express } from 'express';
import path from 'path'
import http from 'http'
import { Server } from 'socket.io';
import User from './db/mysql/models/user'
import authRouter from './routes/auth'
import postRouter from './routes/post'
import upload from './middlewares/multer'
import connection from './db/mysql/connection';
import { isAdmin, isAuthenticated } from './middlewares/auth';

const host = 'localhost'
const port = 5000
const allowedOrigins = ["http://localhost:3000","http://localhost:3001","http://localhost:8100","http://localhost:5173"]
const app : Express = express()
const server = http.createServer(app)
const io = new Server(server)

// Appel de la fonction de connexion à la base de données
connection()
// Middleware pour utiliser publiquement les fichiers statiques du serveur API
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(express.urlencoded({extended:true}))

// Middleware pour la configuration CORS
app.use((req: Request, res: Response ,next: NextFunction)=> {
  const origin = req.headers.origin
  if(origin && allowedOrigins.includes(origin)) res.header('Access-Control-Allow-Origin',origin)
  res.setHeader('Access-Control-Allow-Credentials','true')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization, x_csrf_token')
  next()
})

// Middleware pour permettre aux utilisateurs aux utilisateurs de l'API d'envoyer le corps
// de leurs requêtes au format JSON
app.use(express.json())
// Middleware vers les routes d'authentification (de prefixe /api/auth/ )
app.use('/api/auth',authRouter)
// Middleware vers les routeur chargé des Post (de prefixe /api/posts/ )
app.use('/api/posts',postRouter)

// Route d'API pour uploader des fichiers dans le serveur ou dans un cloud
app.post('/api/upload', upload,(req: Request ,res: Response)=>{
  if(req?.file){
    const fileName = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    return res.status(200).json(fileName)
  }else{
    return res.status(200).json( `${req.protocol}://${req.get('host')}/images/blog3.webp`)
  }
})

// Route d'API pour obtenir la liste de tous les utilisateurs (User) enregistrés dans notre base de données
// Elle est accéssible uniquement par les admins
app.get('/api/users', isAdmin, async (req: Request, res: Response) => {
  try {
      const users = await User.findAll()
      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
    }
})

// Fonction de connexion du socket de notre serveur
io.on('connection', (socket) => {
  console.log('a user connected');
});

// Fonction d'écoute de notre serveur API
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})