let scores = {
    property_type: ["Maison","Studio","Maison de vacances"],
    hood: ["Ndokotti","Bonapriso"],
    city: ["Douala","Yaoundé"],
    userId:"2d16dd26-4ca9-43d4-ba66-33be54f62a5e",
    actionType: 'like'
}
const weights = {
    view: 1,
    prefer:2,
    like: 3,
    save: 4,
    review: 5
};

let newScores = {}
for (const key of Object.keys(scores)) {
    if(key !== "actionType" && key !== "userId"){
        // @ts-ignore
        for (const el of scores[key]) {
            newScores[key] = { ...newScores[key], [el]: weights[scores.actionType]  }
        }
    }else if(key === "userId"){
        newScores[key] = { [scores[key]]: weights[scores.actionType]}
    }
}

// let { actionType, ...newScores } = scores

let storredScores = {
    property_type:{
        "Chambre d'hotel":7,
        "Maison de vacances":3,
        "Villa":9,
    },
    hood:{
        "Bonnamoussadi":2,
        "Akwa":1
    },
    city:{
        "Douala":14,
        "Yaoundé": 5
    },
    userId:{
        "0c781307-4c90-4ecb-9ac5-f73782a8e048":4
    }
}

for (const k1 of Object.keys(newScores)) {
    for (const k2 of Object.keys(newScores[k1])) {
      if(storredScores[k1][k2]){
        storredScores[k1][k2] = storredScores[k1][k2] + newScores[k1][k2]
      }else{
        storredScores[k1][k2] = newScores[k1][k2]
      }
    }
  }


console.log(newScores)
console.log(storredScores)