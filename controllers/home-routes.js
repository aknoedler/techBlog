const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ],
      order: [['date_created', 'DESC']]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        order: [['date_created', 'DESC']]
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: req.session.logged_in
      });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.redirect('/login');
    return;
  }

})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;