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
                     attributes: ['body','date_created']
                 }
            ]});
        const post = postData.get({plain: true});
        res.render('post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;