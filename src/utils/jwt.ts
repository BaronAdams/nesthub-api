import { JwtPayload, sign, verify } from 'jsonwebtoken'

// Interface de notre payload qui sera passé dans les fonctions de création et de décodage de tokens
export interface UserPayload extends JwtPayload { 
    userId: string;
    email: string;
    role: string
}

let secretKey = "ebkfanfma368794jsbzog.ietjdhge-ege.gejhgegevbc78436BIFEG3"

// Fonction qui nous permet de créer un token d'authentification et qui prend un paramètre un payload
export function createToken(payload: UserPayload){
    try {
        return sign(
            payload,
            secretKey,
            { expiresIn: '30d' }
        )
    } catch (error) {
        return null
    }
}
   
export function decryptToken(token: string) : UserPayload | null {
    try {
        const decoded = verify(token,secretKey) as UserPayload
        return decoded
    } catch (error) {
        return null
    }
}

export function refreshToken(decodedToken : UserPayload){
    // Vérifier la durée restante du token
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    if(decodedToken?.exp){
        const timeLeft = decodedToken.exp - currentTime;
        // Si le token est valide et qu'il reste moins de 10 jours (par exemple) avant l'expiration
        const thresholdInSeconds = 10 * 24 * 60 * 60; // 10 jours en secondes
        if (timeLeft < thresholdInSeconds) {
            // Générer un nouveau token avec une nouvelle durée de validité
            return createToken({ userId: decodedToken.userId, role: decodedToken.role, email: decodedToken.email });
        }
    }
}