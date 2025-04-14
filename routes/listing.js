const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});



const { validate } = require("../models/listing.js");


// router.route("/")
//     .get(wrapAsync(listingController.index))
//     .post(isLoggedIn, wrapAsync(listingController.createListing)
// );

// router.route("/:id")
//     .get( wrapAsync(listingController.showListing))
//     .put(isLoggedIn, isOwner, wrapAsync(listingController.updateListing))
//     .delete(isLoggedIn,isOwner, wrapAsync(listingController.destoryListing)
// );


//INDEX ROUTE

router.get("/", wrapAsync(listingController.index));

//New Route

router.get("/new", isLoggedIn, listingController.renderNewForm);


//SHOW ROUTE
router.get("/:id", wrapAsync(listingController.showListing));


//Create Route

router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//Edit Route

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//Update Route
router.put("/:id",isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing));

//Delete Route

router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destoryListing));

// router.get("/", wrapAsync(listingController.searchListing));


module.exports = router;