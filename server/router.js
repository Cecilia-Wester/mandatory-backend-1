const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Server up and running');
});

module.exports = router;