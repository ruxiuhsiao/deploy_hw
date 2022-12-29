import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();

const saveCard = async (name, subject, score)=>{
    const existing = await ScoreCard.findOne({name:name, subject:subject});
    let msg;
    if(existing){
      existing.score = score;
      existing.save();
      msg = `Updating(${name}, ${subject}, ${score})`
      //console.log("updating:", existing)
      return [msg, existing]
    }
    else{
      try{
        const newScoreCard = new ScoreCard({name, subject, score});
        newScoreCard.save();
        msg = `Adding(${name}, ${subject}, ${score})`
        //console.log("adding:", newScoreCard)
        return [msg, newScoreCard] 
      }
      catch(e){
        throw new Error("Card creation error: " + e); } 
      }
  }
  
const findCard = async(type, string)=>{
    let queryResult;
    
    if(type==="name"){
      queryResult = await ScoreCard.find({name:string});
    }
    else if(type==="subject"){
      queryResult = await ScoreCard.find({subject:string});
    }else{
      queryResult=''
    }
    
    //console.log(queryResult)
    return queryResult; 
}

router.delete("/api/cards", async (req, res)=>{
  console.log("Delete req", req)
    try {
      await ScoreCard.deleteMany({});
      console.log("Database cleared");
      res.send({message: "Database cleared"});
  } 
    catch (e) { throw new Error("Database cleared failed"); }
})

router.post("/api/card", async function (req, res) {
  console.log("Save req", req)
    try {  
      let [msg, card] = await saveCard(req.body.name, req.body.subject, req.body.score);
      res.send({message: msg, card: card}); 
    } catch (e) {
      res.json({ message: 'Something went wrong...' });
    }
  });

router.get("/api/cards",  async (req, res)=>{
  console.log("Query req", req)
    try {    
      let queryResult = await findCard(req.query.type, req.query.queryString)

      if(queryResult!=''){
        let msg = "query found";
        console.log(msg)
        //console.log(queryResult)
        let msgs = [];
        for(let i=0; i<queryResult.length; i++){
          msgs.push(`Found card with (${req.query.type}): (${queryResult[i].name}, ${queryResult[i].subject}, ${queryResult[i].score})`)
        }
        res.send({messages: msgs, message: msg});
      }
      else{
          let msg = `${req.query.type}(${req.query.queryString}) not found`;
          console.log(msg)
          res.send({message: msg});
      }
    } catch (e) {
      res.json({ message: 'Something went wrong...' });
    }
  })
export default router;
 