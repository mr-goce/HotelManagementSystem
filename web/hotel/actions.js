
var connection = require('../db/database');

getAllHotelsQuery = () => {
    const query = "SELECT * from hotel"
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            }
            else {
                resolve(results);
            }
        });

    })

}

getAllHotels = async (req, res) => {
    try {
        let hotels = await getAllHotelsQuery();
        res.status(200).send(hotels);
    } catch (error) {
        res.staus(500).send(error.message);
    }
}

getSpecificHotelQuery = (hotelId) => {

    let query = "SELECT * FROM hotel WHERE id = ?";

    return new Promise((resolve, reject) => {

        connection.query(query, [hotelId], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(results.length);
                if (results.length == 0) {
                    const error = new Error('No such Hotel !!!');
                    reject(error);
                }
                resolve(results);
            }
        });

    })

}
getSpecificHotel = async (req, res) => {
    const hotelId = req.params.hotelId;
    console.log(hotelId);
    try {
        var hotel = await getSpecificHotelQuery(hotelId);
        res.status(200).send(hotel[0]);

    } catch (error) {
        res.status(500).send("wrong route or no such hotel");
    }
}

addHotelQuery = (post) => {
    const query = 'INSERT INTO hotel (Name, Location) VALUES(?,?)';
    return new Promise((resolve, reject) => {

        connection.query(query, [post.hotelName, post.location], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results);
            }
        });
    })

}
addHotel = async (req, res) => {
    const post = req.body;
    try {
        await addHotelQuery(post);
        res.send(`The Hotel ${post.hotelName} was added successfuly`);

    } catch (error) {
        res.status(500).send(error);
    }
}

deleteHotelQuery = (hotelId) => {
    var query = 'DELETE FROM hotel WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [hotelId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows == 0) {
                    reject("No such Hotel with requested ID !!!");
                }
                resolve(results)
            }
        })
    })
}
deleteHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    console.log(hotelId);
    try {
        await deleteHotelQuery(hotelId);
        res.send(`Hotel with id:${hotelId} was deleted`);
    } catch (error) {
        res.status(500).send(error);
    }

}
hotelFullUpdateQuery = (updateHotel, updateParams) => {
    var query = "UPDATE hotel SET Name=?,Location=? WHERE Id=?";
    return new Promise((resolve, reject) => {
        con.query(query, [updateHotel.name, updateHotel.location, updateParams], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                if (results.affectedRows == 0) {
                    reject("No such Hotel with requested ID !!!");
                }
                resolve(results);
            }

        });
    })
}
hotelFullUpdate = async (req, res, next) => {
    var updateHotel = req.body;
    var updateParams = req.params.hotelId;

    try {
        var updateHotel = await hotelFullUpdateQuery(updateHotel, updateParams);
        res.send(`Hotel  with id ${updateParams} was fully updated`);

    } catch (error) {
        res.status(500).send(error);

    }

}


module.exports = { getAllHotels, addHotel, getSpecificHotel, deleteHotel, hotelFullUpdate }