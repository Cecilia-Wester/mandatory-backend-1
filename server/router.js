const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {
    res.send(200)('Server up and running');
});

module.exports = router;