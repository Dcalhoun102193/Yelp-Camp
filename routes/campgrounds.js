const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campground = require('../models/campground');
const { populate } = require('../models/review');
const { updateCampground } = require('../controllers/campgrounds');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage} );

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isAuthor,  isLoggedIn, upload.array('image'), validateCampground, catchAsync(updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampgrounds));



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;