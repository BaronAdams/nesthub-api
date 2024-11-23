const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let uniqueId = ''
    for (let i = 0; i < 6; i++) {
        uniqueId += '0123456789'[Math.floor(Math.random()*10)]; 
    }
    for (let j = 0; j < 19; j++) {
        uniqueId += characters[Math.floor(Math.random()*36)]; 
    }
    return uniqueId
}

export const createError = (status: number, message?: string, errors:object | any[] = {})=>{
    if(message?.length && Object.keys(errors).length) return Response.json({error:true, message, errors}, {status})
    if(message?.length && !Object.keys(errors).length) return Response.json({error:true, message}, {status})
    if(!message?.length && Object.keys(errors).length) return Response.json({error:true, errors}, {status})
    return Response.json({error:true, messgae: "Une erreur est survenue lors de la création de l'erreur" }, {status:500})
}

export const createSuccess = (status: number, message: string) => Response.json({success:true, message}, {status})

export const generateColor = ()=>{
    let profilePallete = [
        "#3f6212", /**Vert */
        "#3b82f6", /**Bleu */
        "#ea580c", /**Orange */,
        "#ef4444", /**Rouge */,
        "#9333ea",
        "#ec4899"
    ]
    return profilePallete[Math.floor(Math.random()*6)]
}