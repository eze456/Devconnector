/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Prfile
const User = require('../../models/Users');

// @route   GEt api/profile/test
// @des     Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'profile works'
}));

// @route   GEt api/profile
// @des     Current user profile route
// @access  Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;