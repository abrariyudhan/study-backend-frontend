const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController')
const { adminOnly } = require('../middlewares/authen');


router.get('/', bookingsController.getAllBookings)
router.use(adminOnly); // Authentication middleware for admin only
router.post('/', bookingsController.createBooking)
router.patch('/:id/return', bookingsController.returnBooking)
module.exports = router