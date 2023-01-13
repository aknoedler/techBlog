const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ],
                    attributes: ['body', 'date_created']
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('post', {
            post,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        req.body["user_id"] = req.session.user_id;
        const post = Post.create(req.body);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;