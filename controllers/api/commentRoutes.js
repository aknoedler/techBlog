const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        req.body["user_id"] = req.session.user_id;
        const comment = Comment.create(req.body);
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;