
errorRoute = (req,res,next)=>{

    var error = new Error("The route is not exists.. Try with an other route")
    error.status =404;
    next(error);

}


errorHandler=(err,req,res,next)=>{
    
    errObject ={
        status:err.status,
        error:{
            message: err.message,
        }
    }
    res.status(err.status).json(errObject);
}
module.exports = {errorRoute, errorHandler}