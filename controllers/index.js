const router = require('express').Router();
const apiRoutes = require('./api');
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
            order: [['date_created', 'DESC']]
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('homepage', {
            posts
            // loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(400).json(err);
    }
  });

router.use('/api', apiRoutes);

module.exports = router;