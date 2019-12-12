
var connection = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

getAllguestsQuery = () => {
    const query = 'SELECT * FROM guest';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(results);
            }
        })
    })
}
getAllGuests = async (req, res) => {

    try {
        const result = await getAllguestsQuery();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}



getSpecificGuestQuery = (guestId) => {

    let query = "SELECT * FROM guest WHERE id = ?";
    console.log(guestId);
    return new Promise((resolve, reject) => {

        connection.query(query, [guestId], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(results.length);
                if (results.length == 0) {
                    const error = new Error('No such Guest !!!');
                    // reject(`No user with id: ${userId}`);
                    reject(error);
                }
                resolve(results);
            }
        });

    })

}
getSpecificGuest = async (req, res) => {
    const guestId = req.params.id;
    try {
        // console.log(userId);
        var guest = await getSpecificGuestQuery(guestId);
        res.status(200).send(guest[0]);

    } catch (error) {
        res.status(500).send("wrong route or no such user");
    }
}

createGuestQuery = (post) => {
    let query = `INSERT INTO guest (Firstname, Lastname, Country, Address, City, Email, CreditCardNumber) VALUES (?, ?, ?, ?, ?, ?,?);`
    return new Promise((resolve, reject) => {
        connection.query(query, [post.firstName, post.lastName, post.country, post.address, post.city, post.email, post.creditCardNumber], (error, results, fields) => {
            if (error) {
                reject(error);

            } else {

                resolve(results);
            }

        });

    })

}
createGuest = async (req, res) => {
    const post = req.body;
    

    try {
        // var hash = bcrypt.hashSync(creditCardNumber, 8)
        await createGuestQuery(post);
        // const token =await post.generateAuthToken();
 
        res.status(201).send(`guest with name :${post.firstName} ${post.lastName} is created`)
    } catch (error) {
        res.status(500).send(error);

    }
}

deleteGuestQuery = (guestId) => {
    var query = 'DELETE FROM guest WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [guestId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows == 0) {
                    reject("No such Guest with requested ID !!!");
                }
                resolve(results)
            }
        })
    })
}
deleteGuest = async (req, res, next) => {
    var guestId = req.params.guestId;
    console.log(guestId);
    try {
        await deleteGuestQuery(guestId);
        res.status(200).send(`Guest with id: ${guestId} was deleted`);
    } catch (error) {
        res.status(500).send(error);
    }

}

guestFullUpdateQuery = (updateGuest, updateParams) => {
    var query = "UPDATE  guest SET FirstName=?,LastName=?,Country=?,Address=?,City=?, Email=? WHERE Id=?";
    return new Promise((resolve, reject) => {
        connection.query(query, [updateGuest.firstName, updateGuest.lastName, updateGuest.country, updateGuest.address, updateGuest.city, updateGuest.email, updateParams], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                if (results.affectedRows == 0) {
                    reject("No such guest with requested ID !!!");
                }
                resolve(results);
            }

        });
    })
}
guestFullUpdate = async (req, res, next) => {
    var updateGuest = req.body;
    var updateParams = req.params.id;
    console.log(updateGuest.firstName)

    try {
        await guestFullUpdateQuery(updateGuest, updateParams);
        const schema = Joi.object().keys({
            firstName : Joi.string().regex( /^[a-zA-Z]+$/).required(),
            lastName: Joi.string().regex( /^[a-zA-Z]+$/).required(),
            creditCardNumber: Joi.number().allow(null),
            country: Joi.string().regex( /^[a-zA-Z]+$/),
            address:Joi.string(),
            city: Joi.string().regex( /^[a-zA-Z]+$/),
            email: Joi.string().regex(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)
            
        });
        Joi.validate(req.body,schema,(err,result)=>{
            if(err){
                // console.log(err);
                res.send(err.message);
            }
            else{
                // console.log(result);
                res.send('successfully updated Guest !');
            }
            
        })
        res.send(`The user with id ${updateParams} was fully updated`)

    } catch (error) {
        res.status(500).send(error);

    }

}

loginGuestQuery = (email, card) => {
    const query = "SELECT * FROM guest WHERE Email = ? AND CreditCardNumber =?";
    return new Promise((resolve, reject) => {
        connection.query(query, [email,card], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                
                resolve(results);
            }
        });
    });
};

loginGuest = async (req, res, next) => {
    const email = req.body.email;
    const card = req.body.creditCardNumber;
      
    // console.log(email);
    // console.log(card);
    try {
        const guest = await loginGuestQuery(email,card);
        var dbGuest = guest[0];
        console.log(dbGuest);
        // const matchPass = bcrypt.compareSync(card, dbGuest.CreditCardNumber);
        if (email === dbGuest.Email && card === dbGuest.CreditCardNumber){
 
             jwt.sign({ dbGuest }, 'goce', { expiresIn: '1y' },(err,token)=>{

                 if(err) {console.log(err)}
                 res.send(token);
                });
        }else{
            res.status(401).send('Wrong Data')
        }
             
        
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = { getSpecificGuest, getAllGuests, createGuest, deleteGuest, guestFullUpdate, loginGuest };