const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.getTweets)
router.post('/', postController.postTweet);

module.exports = router;