// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const Api = require('../models/apiSchema');
const logger = require('../utils/logger');
const { validationResult, body } = require('express-validator');
const NodeCache = require( "node-cache" );

const apiCache = new NodeCache({stdTTL: 60})

const apiValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('url').notEmpty().withMessage('URL is required').isURL().withMessage('URL is not valid'),
    body('method').isIn(['GET', 'POST', 'PUT', 'DELETE']).withMessage('Invalid method'),
    body('fields').isArray().withMessage('Fields must be an array'),
];

// @route    GET api/apis
// @desc     Get all apis
router.get('/', async (req, res) => {
    try {
        const cachedData = apiCache.get('apiData');
         if(cachedData){
             console.log('data from cache')
             return res.json(cachedData);
         }
         const apis = await Api.find().sort({ createdAt: -1 });
         apiCache.set('apiData', apis)
         console.log('data from db')
        res.json(apis);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route    POST api/apis
// @desc     Add new api
router.post('/', apiValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(`Validation error ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, url, method, fields } = req.body;

    try {
        const newApi = new Api({
            name,
            url,
            method,
            fields,
        });

        const api = await newApi.save();
        //clear cache
        apiCache.del('apiData')
        res.json(api);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route    PUT api/apis/:id
// @desc     Update api
router.put('/:id', apiValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(`Validation error ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, url, method, fields } = req.body;

    const apiFields = {};
    if (name) apiFields.name = name;
    if (url) apiFields.url = url;
    if (method) apiFields.method = method;
    if (fields) apiFields.fields = fields;

    try {
        let api = await Api.findById(req.params.id);

        if (!api) return res.status(404).json({ error: 'Api not found' });

        api = await Api.findByIdAndUpdate(req.params.id, { $set: apiFields }, { new: true });
        //clear cache
        apiCache.del('apiData')
        res.json(api);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route    DELETE api/apis/:id
// @desc     Delete api
router.delete('/:id', async (req, res) => {
    try {
        let api = await Api.findById(req.params.id);

        if (!api) return res.status(404).json({ error: 'Api not found' });

        await Api.findByIdAndRemove(req.params.id);
        //clear cache
        apiCache.del('apiData')
        res.json({ msg: 'Api removed' });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;