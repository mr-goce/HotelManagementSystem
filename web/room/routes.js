const express = require('express');

var actions = require('./actions');
var router = express.Router();
/**
 * @swagger
 *
 * /rooms:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *         
 *     responses:
 *      200:
 *     description: rooms
 *       schema: array
 *       items:
 *       $ref: '#/definitions/rooms'
 *        
 */

 
 
router.get('/rooms',actions.getAllRooms);
/**
 * @swagger
 * /rooms:
 *    post:
 *      description: Use to return all customers
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user*/
router.post('/rooms',actions.addRoom);

router.delete('/:roomId', actions.deleteRoom);
router.get("/:hotelId/rooms",actions.getAllRoomsFromHotel); 
router.get('/:hotelId/rooms/review/roomtype',actions.getAllRoomsFromHotelReviewRoomType);



module.exports = router

