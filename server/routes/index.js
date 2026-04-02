require('dotenv').config();
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const booksRoutes = require('./booksRoutes')
const bookingsRoutes = require('./bookingsRoutes')
const indexController = require('../controllers/indexController');
const {auth} = require('../middlewares/authen');


router.post('/login', indexController.login);
router.post('/register', indexController.register);

router.use(auth);
router.use('/users', userRoutes);
router.use('/books', booksRoutes)
router.use('/bookings', bookingsRoutes)

module.exports = router;