const express = require("express");

const actions = require("./actions");
const router = express.Router();
// const {unknowUser} = require('../validation/validations');
const {unknowUser,validateEmail,validAges,validateName,validateLastName,validateCountry,validateCreditCard} = require('../validation/validations');
const {checkToken} = require('../authorizatoin');

// console.log(unknowUser);
router.get('/',checkToken,actions.getAllGuests);
router.get('/:id',unknowUser, actions.getSpecificGuest);
router.post('/',validateEmail,validateName,validateLastName,validateCountry,validateCreditCard, actions.createGuest);
router.delete('/:guestId',actions.deleteGuest);
router.put('/:id', actions.guestFullUpdate);

router.post('/login', actions.loginGuest);


module.exports = router