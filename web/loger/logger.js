logger =(req,res,next)=>{
console.log(`${req.method}-${req.url}-ON: ${new Date()}`);
next();
}


module.exports={logger}