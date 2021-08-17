const models = require('../models/model');
const { Op } = require("sequelize");
var fs = require('fs');




exports.getAllCategory = (req, res) => {
    models.category.findAll({
        attributes: ['category_id', 'categoty_name', 'category_img',
            'category_serverTotal', 'category_serverActive', 'createdAt']
    }).then(data => {
        return res.status(200).json({ category: data }).end();
    }).catch(err => {
        return res.status(500).json({ msg: 'Error โปรดติดต่อทีมงาน' }).end();
    })
}


exports.getAllServers = (req, res) => {
    models.servers.findAll({
        include: [{
            attributes: ['category_id', 'categoty_name'],
            model: models.category
        }]
    }).then(data => {
        return res.status(200).json({ servers: data }).end();
    }).catch(err => {
        return res.status(500).json({ msg: 'Error โปรดติดต่อทีมงาน' }).end();
    })
}

exports.getMySev = (req, res) => {
    console.log(req.body);
    models.servers.findAll({
        attributes: ['server_id', 'server_name',
            'server_img', 'score_vote',
            'createdAt'],
        where: {
            server_user: req.body.userIdToken
        },
        order: [['score_vote', 'DESC']],
        include: [{
            attributes: ['category_id', 'categoty_name'],
            model: models.category
        }]

    }).then(data => {
        return res.status(200).json({ category: data }).end();
    }).catch(err => {
        return res.status(500).json({ msg: 'Error โปรดติดต่อทีมงาน' }).end();
    })
}


exports.getViewCategory = (req, res) => {
    models.servers.findAll({
        attributes: ['server_id', 'server_name',
            'server_img', 'score_vote', 'views',
            'createdAt'],
        include: [{
            model: models.category,
            attributes: [],
            where: {
                categoty_name: req.params.categoryName
            }
        }],
    }).then(saverData => {
        models.category.findAll({
            attributes: ['category_id', 'categoty_name', 'category_img',
                'category_serverTotal', 'category_serverActive'],
            where: {
                categoty_name: req.params.categoryName
            }
        }).then(CategoryData => {
            return res.status(200).json({ category: CategoryData, servers: saverData }).end();
        })
    }).catch(err => {
        return res.status(500).json({ msg: 'Error โปรดติดต่อทีมงาน' }).end();
    })
}

exports.getInfoServer = async (req, res) => {
    // checking 
    if (req.params.serverId === "") return res.status(400).json({ msg: 'Error ไม่พบห้อง Server ที่คุณต้องการ' });
    let sevInfo;
    let serverId = (req.params.serverId);
    try {
        sevInfo = await models.servers.findAll({
            attributes: ['server_id', 'server_name', 'server_detail',
                'server_img', 'website', 'facebook', 'facebook_group', 'score_vote', 'views',
                'createdAt'],
            where: {
                [Op.or]: [
                    { server_id: req.params.serverId },
                    { server_name: req.params.serverId }
                ],
            },
            include: [{
                attributes: ['category_id', 'categoty_name', 'category_img'],
                model: models.category
            }, {
                attributes: ['user_id', 'username'],
                model: models.users
            }],
            limit: 1
        })
        if (sevInfo.length === 0) throw "Error length 0";
    } catch (err) {
        return res.status(400).json({ msg: 'Error ไม่พบห้อง Server ที่คุณต้องการ' });
    }

    let comment;
    try {
        console.log('select id , comment , comments.createdAt from comments '
            + 'join servers on servers.server_id = comments.server_id'
            + 'where comments.server_id = ' + req.params.serverId + ' OR servers.server_name = "' + req.params.serverId + '" ');
        comment = await models.sequelize.query('select id , comment , comments.createdAt from comments '
            + 'join servers on servers.server_id = comments.server_id '
            + 'where comments.server_id = "' + req.params.serverId + '" OR servers.server_name = "' + req.params.serverId + '" ');
    } catch (err) {
        console.log(err);
    }



    let rankGlobalServer = await fn.getRankGlobalServer(serverId);
    let rankServer = await fn.getRankServer(serverId, sevInfo[0].category_game.category_id);
    let ip = await fn.getClientIp(req);
    let validatedView = await fn.validatedView(ip, sevInfo[0].server_id);
    if (!validatedView) {
        console.log('d');
        await fn.insertLogViews(ip, sevInfo[0].server_id);
        await fn.incrementViews(sevInfo[0].server_id);
    }


    return res.status(200).json({
        sevInfo: sevInfo,
        rankGlobalServer: rankGlobalServer,
        rankServer: rankServer,
        comment: comment[0]
    }).end();
}


exports.checkBeforeVote = async (req, res) => {
    //checking
    let ip = await fn.getClientIp(req);
    let serverId = parseInt(req.body.serverId);
    let isLogIpAddress = false; let isLogIdGame = false;
    let logIdGame; let timeSecondDelay;

    //check server id 
    if (isNaN(serverId)) return res.status(400).json({ msg: 'Error ไม่พบห้อง Server ที่คุณต้องการ', status: false });

    // validated IP Address
    try {
        let logIpAddress = await models.votes.findAll({
            attributes: ['createdAt'],
            order: [['vote_id', 'DESC']],
            limit: 1,
            where: {
                [Op.and]: [
                    { vote_server: serverId },
                    { ip_address: ip }
                ],
            }
        });
        if (logIpAddress.length === 0) {
            isLogIpAddress = true;
        } else {
            let diffTime = await fn.diffTimeCurrent(logIpAddress[0].createdAt);
            if (diffTime[4] >= 1) isLogIpAddress = true;
            else timeSecondDelay = diffTime[6] + "" + diffTime[7]
        }
    } catch (err) {
        return res.status(400).json({ msg: 'Error โปรดติดต่อผู้ดูแล', status: false });
    }
    // validated ID GAME 

    try {
        if (req.body.gameId != "" && req.body.gameId != undefined && req.body.gameId != null) {
            logIdGame = await models.votes.findAll({
                attributes: ['createdAt'],
                order: [['vote_id', 'DESC']],
                limit: 1,
                where: {
                    [Op.and]: [
                        { vote_server: serverId },
                        { id_game: req.body.gameId }
                    ],
                }
            });
            if (logIdGame.length === 0) {
                isLogIdGame = true;
            } else {
                let diffTime = await fn.diffTimeCurrent(logIdGame[0].createdAt);
                console.log(diffTime);
                if (diffTime[4] >= 1) isLogIdGame = true;
                else timeSecondDelay = diffTime[6] + "" + diffTime[7]
            }
        } else {
            isLogIdGame = true;
        }
    } catch (err) {
        return res.status(200).json({ msg: 'Error โปรดติดต่อผู้ดูแล', status: false });
    }

    //checking before save vote
    if (isLogIdGame === true && isLogIpAddress === true) {
        // check wheel score
        let getUserIdOfServer = await fn.getUserIdFromServerId(req.body.serverId);
        let scoreVoteOfServ = 1;
        if (await fn.validatedWheelVotes(getUserIdOfServer) !== true)
            scoreVoteOfServ = await fn.getScoreVoteOfWheelByUserId(serverId);
        let resultLog = await fn.setAddLogVote(scoreVoteOfServ, serverId, ip, req.body.gameId);
        if (await fn.isHadScoreVoteSev(serverId) === true) {
            await fn.setAddActive(1, await fn.findIdCategoryOfServer(serverId))
        }
        let resultVoteScore = await fn.setAddScoreVoteSev(scoreVoteOfServ, serverId);
        let scoreVoteCurrent = await fn.getScoreSev(serverId);
        if (resultLog === true && resultVoteScore === true) return res.status(200).json({
            msg: 'vote success',
            status: true, scoreVoteCurrent: scoreVoteCurrent[0].score_vote
        });
        else return res.status(200).json({ msg: 'Error เกิดข้อผิดพลาดโปรดติดต่อทีมงาน', status: false });
    } else {
        return res.status(200).json({ msg: (60 - timeSecondDelay), status: false });
    }
}



exports.setCreateSev = (req, res) => {
    if (req.file == undefined) {
        return res.status(200).json({ msg: req.body.fileValidationError, status: false })
    }
    models.servers.create({
        server_name: req.body.serverName,
        server_user: req.body.userIdToken,
        server_detail: req.body.serverDetail,
        category_id: req.body.categoryId,
        server_img: req.file.filename,
        score_vote: 0,
        facebook: req.body.fb,
        facebook_group: req.body.fbGroup
    }).then(data => { res.status(200).json({ msg: 'เพิ่มข้อมูลสำเร็จ', status: true }) })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false
            })
        })
}


exports.setDeleteSev = async (req, res) => {
    let validatedServ = await fn.validateServerOfUser(req.body.serverId, req.body.userIdToken);
    if (validatedServ === false) {
        return res.status(200).json({ msg: 'คุณไม่ได้รับสิทธิ์ทำการลบ server นี้', status: false })
    }
    await fn.removeImgServerOfUser(req.body.serverId, req.body.userIdToken);
    models.votes.destroy({
        where: { vote_server: req.body.serverId }
    }).then(data => {
        models.servers.destroy({
            where: { server_id: req.body.serverId }
        }).then(success => {
            return res.status(200).json({ msg: 'delete สำเร็จ', status: true })
        })
    })
        .catch(err => { res.status(200).json({ msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false }) })
}


exports.setUpdateServer = async (req, res) => {
    if (req.file == undefined) {
        models.servers.update({
            server_name: req.body.serverName,
            server_detail: req.body.serverDetail,
        }, {
            where: { server_id: req.body.serverId }
        }).then(data => {
            return res.status(200).json({ msg: 'Update สำเร็จ', status: true })
        })
            .catch(err => {
                // console.log(err);
                return res.status(200).json({ msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false })
            })
    } else {
        await fn.removeImgServerOfUser(req.body.serverId, req.body.userIdToken);
        models.servers.update({
            server_name: req.body.serverName,
            server_detail: req.body.serverDetail,
            server_img: req.file.filename,
        }, {
            where: { server_id: req.body.serverId }
        }).then(data => {
            return res.status(200).json({ msg: 'Update สำเร็จ', status: true })
        })
            .catch(err => {
                // console.log(err);
                return res.status(200).json({ msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false })
            })
    }
}


exports.search = async (req, res) => {
    let resultSearch = await fn.getServByName(req.body.serverName);
    if (resultSearch.length == 0) return res.status(200).json({
        status: false,
        msg: 'ไม่พบ servers ที่คุณค้นหา'
    })
    for (let n = 0; n < resultSearch.length; n++) {
        let data = await fn.getCountCommentsById(resultSearch[n].server_id);
        if (data) {
            resultSearch[n].comments = data.count
        }
    }
    return res.status(200).json({
        status: true,
        result: resultSearch
    })
}
