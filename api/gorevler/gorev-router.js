const router=require("express").Router();
const Gorev = require("./gorev-model");
const {checkGorevId} = require("./gorev-middleware");

router.get("/", async (req,res,next)=>{
    try {
        
        const gorevler = await Gorev.getAll();
        res.json(gorevler);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", checkGorevId, async(req,res,next)=>{
    try {
        
        res.json(req.Gorev);

    } catch (error) {
        next(error);
    }
})

router.post("/", async(req,res,next)=>{
    try {

        let {Adi} = req.body;
        if(!Adi){
            res.status(400).json({message:"Gorev adı boş olamaz"})
        }
        else{
            const posted = await Gorev.create({Adi:req.body.Adi, Aciklama:req.body.Aciklama});
            res.status(201).json(posted);
        }
        
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", checkGorevId, async(req,res,next)=>{
    try {
        await Gorev.remove(req.params.id);
        res.json({message:"silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
})
module.exports=router;