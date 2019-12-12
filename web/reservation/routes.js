const express = require("express");

const actions = require("./actions");
const router = express.Router();

router.get('/',actions.getAllReservations);
router.get('/:id',actions.getSpecificReservation);
router.get('/:guestId/reservations', actions.getAllReservationsFromGuest)
router.delete('/:id',actions.deleteReservation);
router.post('/',actions.addReservation);


module.exports = router