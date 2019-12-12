const express = require('express');

var actions = require('./actions');
var router = express.Router();
/**
 * @swagger
 * /hotel:
 *   get:
 *   description: geting  all rooms
 *  responses:
 *   '200':
 *    description: successful response
 */


router.get('/', actions.getAllHotels);
router.get('/:hotelId',actions.getSpecificHotel);
router.post('/', actions.addHotel);
router.delete("/:hotelId",actions.deleteHotel);
router.put('/:hotelId',actions.hotelFullUpdate);


module.exports = router