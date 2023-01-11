const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userdata = require('./user-seeds.json');
const postdata = require('./post-seeds.json');
const commentdata = require('./comment-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userdata, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postdata, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentdata, {
        individualHooks: true,
        returning: true,
    });
};

seedDatabase();