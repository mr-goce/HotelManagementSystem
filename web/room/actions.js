var connection = require('../db/database');
const Joi = require('joi');
// const {Room,Hotel, Review, RoomType}= require('../models'); 
getAllRoomsQuery = () => {
    const query = "SELECT * from room ";
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(results);
            }
        });

    })

}

getAllRooms = async (req, res) => {
    try {
        let rooms = await getAllRoomsQuery();
        res.status(200).send(rooms);
    } catch (error) {
        res.staus(500).send(error.message);
    }
}

addRoomQuery = (room) => {
    const query = 'INSERT INTO room (RoomTypeId,HotelId, Status) VALUES(?,?,?)';
    return new Promise((resolve, reject) => {

        connection.query(query, [room.roomTypeId, room.hotelId, room.status], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results);
            }
        });
    })

}
addRoom = async (req, res) => {
    const room = req.body;
    console.log(room.roomTypeId);
    try {
       
        await addRoomQuery(room);
        res.status(201).send(`The Room  was added successfuly`);

    } catch (error) {
        res.status(500).send(error);

    }
}

deleteRoomQuery = (roomId) => {
    var query = 'DELETE FROM room WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [roomId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows == 0) {
                    reject("No such Room with requested ID !!!");
                }
                resolve(results)
            }
        })
    })
}
deleteRoom = async (req, res, next) => {
    const roomId = req.params.roomId;
    console.log(roomId);
    try {
        await deleteRoomQuery(roomId);
        res.send(`Room with id:${roomId} was deleted`);
    } catch (error) {
        res.status(500).send(error);
    }

}
// get Rooms from  Hotels
getAllRoomsFromHotelQuery = (hotelId) => {
    const query = 'SELECT * FROM hotel JOIN room ON hotel.Id= room.HotelId WHERE hotel.id=?';
    return new Promise((resolve, reject) => {
        connection.query(query, [hotelId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getAllRoomsFromHotel = async (req, res) => {
    hotelId = req.params.hotelId;

    try {
        const result = await getAllRoomsFromHotelQuery(hotelId);
       
        var finalResult = result.map(member => {

            roomObj = {
                roomId: member.Id,
                status: member.Status,
                roomType: member.RoomTypeId


            }
            return roomObj;
        })
        var final = {
            hotelId: result[0].HotelId,
            hotelName: result[0].Name,
            hotelLocation: result[0].Location,
            room: finalResult

        }

        res.status(200).send(final);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
getAllRoomsFromHotelReviewRoomTypeQuery = (hotelId) => {
    const query = 'SELECT * FROM hotel JOIN room ON hotel.Id= room.HotelId  JOIN Review ON hotel.id= review.hotelId JOIN RoomType ON RoomType.Id=room.Id WHERE hotel.id=?';
    return new Promise((resolve, reject) => {
        connection.query(query, [hotelId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getAllRoomsFromHotelReviewRoomType = async (req, res) => {
    hotelId = req.params.hotelId;

    try {
        const result = await getAllRoomsFromHotelReviewRoomTypeQuery(hotelId);
        var finalResult = result.map(member => {

            roomObj = {
                roomId: member.Id,
                status: member.Status,
                roomType: member.RoomTypeId,
                rating: member.Rating,
                comment: member.Comment,
                floor: member.Floor,
                description: member.Description


            }
            return roomObj;
        })
        

        var final = {
            hotelId: result[0].HotelId,
            hotelName: result[0].Name,
            hotelLocation: result[0].Location,
            room: finalResult

        }

        res.status(200).send(final);


        res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = { getAllRooms, deleteRoom, addRoom, getAllRoomsFromHotel, getAllRoomsFromHotelReviewRoomType }
