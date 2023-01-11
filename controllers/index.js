const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/', async (req, res) => {
    res.render('test');
  });

router.use('/api', apiRoutes);

module.exports = router;