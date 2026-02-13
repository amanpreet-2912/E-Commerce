export function checkStatus(req,res,next){
    if(req.user.approvalStatus!=="approved"){
        return res.status(403).json({message:"approval pending"})
    }
    next();
}