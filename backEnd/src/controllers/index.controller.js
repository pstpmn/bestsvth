const models = require('../models/model');
const { Op } = require("sequelize");

exports.indexPage = async (req, res) => {
    try {
        topTenData = await models.servers.findAll({
            attributes: ['server_id', 'server_name', 'category_id', 'server_img', 'score_vote', 'views'],
            order: [['score_vote', 'DESC']],
            limit: 10,
            include: [{
                attributes: ['categoty_name'],
                model: models.category
            }],
        });

        for (let n = 0; n < topTenData.length; n++) {
            let data = await fn.getCountCommentsById(topTenData[n].server_id);
            if (data) {
                topTenData[n].dataValues.comments = data.count
            }
        }

        category = await models.category.findAll({
            attributes: ['category_id', 'categoty_name', 'category_img', 'category_serverTotal', 'category_serverActive'],
            order: [['category_serverActive', 'DESC']],
            limit: 15
        });
        latestVoteRank = await models.sequelize.query('SELECT '
            + 'votes.vote_server , max(vote_id) as id ,servers.server_id ,servers.server_name ,servers.category_id ,servers.server_img,servers.score_vote,category_games.categoty_name as category_name '
            + 'FROM `votes` '
            + 'join servers on servers.server_id = votes.vote_server '
            + 'join category_games on category_games.category_id  = servers.category_id '
            + 'GROUP BY votes.vote_server '
            + 'ORDER BY id DESC '
            + 'limit 8');

        latestVoteFooter = await models.sequelize.query('SELECT '
            + 'votes.createdAt,votes.id_game ,votes.vote_server , vote_id ,servers.server_id ,servers.server_name ,servers.category_id ,category_games.categoty_name as category_name '
            + 'FROM `votes` '
            + 'join servers on servers.server_id = votes.vote_server '
            + 'join category_games on category_games.category_id  = servers.category_id '
            + 'ORDER BY vote_id DESC '
            + 'limit 20');

        return res.status(200).json({
            resetRank: {
                daysNormal: resetRank.days,
                times: resetRank.times,
                dateToReset: fn.getDateReset(resetRank.reset_date),
            },
            categorySev: category,
            Top10: topTenData,
            latestVoteServer: latestVoteRank[0],
            latestVoteFooter: latestVoteFooter[0]
        }).end();

    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}