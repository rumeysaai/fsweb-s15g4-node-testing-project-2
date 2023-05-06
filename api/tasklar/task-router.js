const router = require("express").Router();
const Task = require("./task-model");
const {checkTaskId} = require("./task-middleware");

router.get("/", async(req,res,next)=>{
    try {
        const all = await Task.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
})

router.get("/:id", checkTaskId, async(req,res,next)=>{
    try {
        res.json(req.Task);
    } catch (error) {
        next(error);
    }
})

router.post("/", async(req,res,next)=>{
    try {
        const {Adi, GorevId}=req.body;
        if(!Adi || !GorevId){
            res.status(400).json({message:"Task adı boş olamaz"})
        }
        else{
            const posted = await Task.create({Adi:req.body.Adi, Aciklama:req.body.Aciklama, GorevId:req.body.GorevId, Tarih:new Date()});
            res.status(201).json(posted);
        }
        
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", checkTaskId, async(req,res,next)=>{
    try {
        await Task.remove(req.params.id);
        res.json({message:"silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
})
module.exports=router;