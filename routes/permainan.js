var express = require('express');
var router = express.Router();
const permainanController = require('../controllers/permainan');
const verifyToken = require('../middleware/auth');

router.post('/store',verifyToken, permainanController.store);
router.post('/store/player-dadu',verifyToken, permainanController.storePlayerDadu);
router.get('/player-dadu/:id',verifyToken, permainanController.findById);

module.exports = router;
