
unknowUser = (req, res, next) => {
    if (req.params.id < 1) {
        var error = new Error("ERROR: No such entity in the DB");
        error.status = 401;
        next(error);

    }
    else{
        next();
    }
};
validAges =(req,res,next)=>{
    if(req.body.age<18){
        var error = new Error("Users under 18 can not be added");
        error.status =400;
        next(error);
    }
    else{
        next();
    }
}
validateEmail=(req,res,next)=> {
    var email = req.body.email;
    console.log(email);
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
         next();
    }
    else {
        var error = new Error('Please input proper email');
        error.status = 400
        next(error);
    }
}
validateName =(req,res,next)=>{
    var name = req.body.firstName;
    var regex = /^[a-zA-Z]+$/;
    if(regex.test(name)){
        next();
    }
    else{
        var error = new Error('Please input proper First Name --> LETTERS ONLY !!!');
        error.status =400;
        next(error);
    }
}
validateLastName =(req,res,next)=>{
    var name = req.body.lastName;
    var regex = /^[a-zA-Z]+$/;
    if(regex.test(name)){
        next();
    }
    else{
        var error = new Error('Please input proper Last Name --> LETTERS ONLY !!!');
        error.status =400;
        next(error);
    }
}
validateCountry =(req,res,next)=>{
    var name = req.body.country;
    var regex = /^[a-zA-Z]+$/;
    if(regex.test(name)){
        next();
    }
    else{
        var error = new Error('Please input proper country Name --> LETTERS ONLY !!!');
        error.status =400;
        next(error);
    }
}
validateCreditCard =(req,res,next)=>{
    var name = req.body.creditCardNumber;
    var regex = /^\d+$/;
    if(regex.test(name)){
        next();
    }
    else{
        var error = new Error('Please input proper Credit Card Number --> DIGITS ONLY !!!');
        error.status =400;
        next(error);
    }
}

module.exports={unknowUser, validAges,validateEmail, validateName, validateLastName,validateCountry,validateCreditCard}