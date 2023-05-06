const TaskModel = require("./task-model");

async function checkTaskId(req,res,next){
    try {
        const isExist = await TaskModel.getById(req.params.id);
        if(!isExist){
            res.status(404).json({message:"not found"});
        }
        else{
            req.Task = isExist;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports={
    checkTaskId
}