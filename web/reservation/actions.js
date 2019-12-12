const connection = require("../db/database");

getAllReservationsQuery = () => {
    const query = 'SELECT * FROM reservation';
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
getAllReservations = async (req, res) => {

    try {
        const result = await getAllReservationsQuery();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}


getSpecificReservatioQuery = (reservationId) => {

    let query = "SELECT * FROM reservation WHERE id =?";
    console.log(reservationId);
    return new Promise((resolve, reject) => {

        connection.query(query, [reservationId], (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                console.log(results.length);
                if (results.length == 0) {
                    const error = new Error('No such reservation !!!');
                    reject(error);
                }
                resolve(results);
            }
        });

    })

}
getSpecificReservation = async (req, res) => {
    const reserv = req.params.id;
    try {
        console.log(reserv);
        var reservation = await getSpecificReservatioQuery(reserv);
        res.status(200).send(reservation[0]);

    } catch (error) {
        res.status(500).send("wrong route or no such Reservation !!!");
    }
}

deleteReservationQuery = (resId) => {
    var query = 'DELETE FROM reservation WHERE id = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, [resId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                if (results.affectedRows == 0) {
                    reject("No such Reservation with requested ID !!!");
                }
                resolve(results)
            }
        })
    })
}
deleteReservation = async (req, res, next) => {
    const resId = req.params.id;
    // console.log(resId);
    try {
        await deleteReservationQuery(resId);
        res.send(`Reservation with id:${resId} was deleted`);
    } catch (error) {
        res.status(500).send(error);
    }

}
addReservationQuery = (reserv) => {
    const query = 'INSERT INTO Reservation (GuestId,RoomId, StartDate, EndDate) VALUES(?,?,?,?)';
    return new Promise((resolve, reject) => {

        connection.query(query, [reserv.guestId, reserv.roomId, reserv.startDate, reserv.endDate], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(results);
            }
        });
    })

}
addReservation = async (req, res) => {
    const reservation = req.body;
    try {
        await addReservationQuery(reservation);

        res.status(201).send(`Reservation was made successfuly`);

    } catch (error) {
        res.status(500).send(error);

    }
}

getAllReservationsFromGuestQuery = (guestId) => {
    // const query = 'SELECT * FROM guest JOIN reservation ON guest.Id= reservation.GuestId JOIN Room ON reservation.RoomId=room.Id JOIN Hotel ON room.HotelId= hotel.Id WHERE guest.id=?';
    const query = 'SELECT * FROM guest JOIN reservation ON guest.Id= reservation.GuestId JOIN Room ON reservation.RoomId=room.Id JOIN Hotel ON room.HotelId= hotel.Id JOIN payment ON reservation.ID = payment.Id  WHERE guest.id=?';

    return new Promise((resolve, reject) => {
        connection.query(query, [guestId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getAllReservationsFromGuest = async (req, res) => {
    guestId = req.params.guestId;

    try {
        const result = await getAllReservationsFromGuestQuery(guestId);
       
        var finalResult = result.map(member => {

            reservationObj = {
                startDate: member.StartDate,
                endDate: member.EndDate,
                roomId: member.RoomId,
                hotelName: member.Name,
                hotelLocation: member.Location,
                roomType: member.RoomTypeId,
                amount: member.Amount

                
            }
            return reservationObj;
        })
        var final = {
            name: result[0].FirstName,
            lastName: result[0].LastName,
            country: result[0].Country,
            email: result[0].Email,
            reservation: finalResult
        }
        res.status(200).send(final);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports ={getAllReservations,getSpecificReservation, deleteReservation,addReservation,getAllReservationsFromGuest}