const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Session = require('../../model/Session');

/* ----- 
  @route  GET api/session
  @desc   Get all session
-----*/

router.get('/', async (req, res) => {
    try {
        const session = await Session.findAll();                
        res.json(session)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  GET api/session/:session_id
  @desc   Get session by id
-----*/
router.get('/:session_id', async (req, res) => {
    try {
        const session = await Session.findOne({
            where: { id: req.params.session_id }
        });
        res.json(session)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/* ----- 
  @route  POST api/session
  @desc   Create session
-----*/

router.post('/', [
    check('session_start_time', 'Thời gian bắt đầu session is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, jsession_id, user_id, session_start_time, session_end_time, entrance_page_id, exit_page_id, city_id, device_type_id, os_id, acquistion_id, age_id, gender_id, is_first_visit } = req.body;
    var sessionFields = {};
    if (id) sessionFields.id = id;
    sessionFields.jsession_id = req.session.id;   
    if (user_id) sessionFields.user_id = user_id;
    if (session_start_time) sessionFields.session_start_time = session_start_time;
    if (session_end_time) sessionFields.session_end_time = session_end_time;
    if (entrance_page_id) sessionFields.entrance_page_id = entrance_page_id;
    if (exit_page_id) sessionFields.exit_page_id = exit_page_id;
    if (city_id) sessionFields.city_id = city_id;
    if (device_type_id) sessionFields.device_type_id = device_type_id;
    if (os_id) sessionFields.os_id = os_id;
    if (acquistion_id) sessionFields.acquistion_id = acquistion_id;
    if (age_id) sessionFields.age_id = age_id;
    if (gender_id) sessionFields.gender_id = gender_id;
    if (is_first_visit) sessionFields.is_first_visit = is_first_visit;

    try {
        session = new Session(sessionFields);
        await session.save();
        res.json(session);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  PUT api/session
  @desc   Update session
-----*/

router.put('/', [
    check('session_start_time', 'Thời gian bắt đầu session is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, jsession_id, user_id, session_start_time, session_end_time, entrance_page_id, exit_page_id, city_id, device_type_id, os_id, is_first_visit } = req.body;
    var sessionFields = {};
    if (id) sessionFields.id = id;
    if (jsession_id) sessionFields.jsession_id = jsession_id;
    if (user_id) sessionFields.user_id = user_id;
    if (session_start_time) sessionFields.session_start_time = session_start_time;
    if (session_end_time) sessionFields.session_end_time = session_end_time;
    if (entrance_page_id) sessionFields.entrance_page_id = entrance_page_id;
    if (exit_page_id) sessionFields.exit_page_id = exit_page_id;
    if (city_id) sessionFields.city_id = city_id;
    if (device_type_id) sessionFields.device_type_id = device_type_id;
    if (os_id) sessionFields.os_id = os_id;
    if (is_first_visit) sessionFields.is_first_visit = is_first_visit;

    try {
        var session = await Session.findOne({
            where: { id: sessionFields.id }
        });
        if (session) {
            session.update({
                attributes: ['id', 'exit_page_id'],
                exit_page_id: placeFields.exit_page_id
            });
            return res.json(place);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

/* ----- 
  @route  DELETE api/session/:id
  @desc   Delete session
-----*/

router.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findOne({
            where: { id: req.params.id }
        });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        await session.destroy();
        res.json({ message: 'session removed' })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;