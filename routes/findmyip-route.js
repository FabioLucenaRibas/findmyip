const express = require('express');
const router = express.Router();

const findMyIpController = require('../controllers/findmyip-controller');

router.get('/', findMyIpController.findMyIp);

module.exports = router;