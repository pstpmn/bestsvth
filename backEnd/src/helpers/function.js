const models = require('../models/model');
var moment = require('moment');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs')
var fs = require('fs');
const wheelScore = require('../../wheelToScore.json');

exports.setTimeResetRank = () => {
    setTimeout(function () {
        fn.resetActiveOfGames();
        fn.resetRanking();
    }, resetRank.reset_date - new Date().getTime());
}

exports.writerFile = (data, path) => {
    fs.writeFile(path, data, function (err) {
        if (err) throw err;
        console.log('Update New Time Reset Ranking!');
    });
}

exports.updateTimeAndResetRank = () => {
    let current = new Date();
    let toUpdate = new Date();
    let time = resetRank.times.split(':');
    toUpdate.setDate(toUpdate.getDate() + parseInt(resetRank.days));
    toUpdate.setHours(toUpdate.getHours() + parseInt(time[0]));
    toUpdate.setMinutes(toUpdate.getMinutes() + parseInt(time[1]));
    // console.log(toUpdate);
    resetRank.reset_date = toUpdate.getTime();
    resetRank.updatedAt =
        ("00" + current.getDate()).slice(-2) + "/" +
        ("00" + (current.getMonth() + 1)).slice(-2) + "/" +
        current.getFullYear() + " " +
        ("00" + current.getHours()).slice(-2) + ":" +
        ("00" + current.getMinutes()).slice(-2) + ":" +
        ("00" + current.getSeconds()).slice(-2);
    console.log(resetRank);
    fn.writerFile(JSON.stringify(resetRank), __basedir + "\\resetRank.json")
    fn.setTimeResetRank();
}

exports.setDueDateOfWheel = () => {
    let toUpdate = new Date();
    toUpdate.setDate(toUpdate.getDate() + 1);
    return toUpdate.getTime();
    // // console.log(toUpdate);
    // resetRank.reset_date = toUpdate.getTime();
    // resetRank.updatedAt =
    //     ("00" + current.getDate()).slice(-2) + "/" +
    //     ("00" + (current.getMonth() + 1)).slice(-2) + "/" +
    //     current.getFullYear() + " " +
    //     ("00" + current.getHours()).slice(-2) + ":" +
    //     ("00" + current.getMinutes()).slice(-2) + ":" +
    //     ("00" + current.getSeconds()).slice(-2);
    // console.log(resetRank);
    // fn.writerFile(JSON.stringify(resetRank), __basedir + "\\resetRank.json")
    // fn.setTimeResetRank();
}


exports.validatedWheelVotes = async (userId) => {
    let today = new Date();
    let data = await models.sequelize.query('SELECT * from wheeltovotes '
        + 'WHERE user_id = ' + userId + ' '
        + 'ORDER BY id DESC '
        + 'LIMIT 1');

    if (data[0].length === 0 || ((data[0][0].dueDate - today.getTime()) <= 0)) {
        return true
    } else {
        return data[0][0].dueDate;
    }
    return false;
}

exports.getScoreVoteOfWheelByUserId = async (userId) => {
    let data = await models.sequelize.query('SELECT score_votes from wheeltovotes '
        + 'WHERE server_id = ' + userId + ' '
        + 'ORDER BY id DESC '
        + 'LIMIT 1');

    if (data[0].length === 0) {
        return 1
    } else if (data[0][0].score_votes) {
        return data[0][0].score_votes;
    }
}

exports.getUserIdFromServerId = async (serverId) => {
    let data = await models.sequelize.query('SELECT server_user from servers '
        + 'WHERE server_id = ' + serverId + '');
    return data[0][0].server_user;
}

exports.randomWheel = async () => {
    var randomItem = wheelScore[Math.floor(Math.random() * wheelScore.length)];
    return randomItem;
}


exports.updateTimeRank = () => {
    let current = new Date();
    let toUpdate = new Date();
    let time = resetRank.times.split(':');
    toUpdate.setDate(toUpdate.getDate() + parseInt(resetRank.days));
    toUpdate.setHours(toUpdate.getHours() + parseInt(time[0]));
    toUpdate.setMinutes(toUpdate.getMinutes() + parseInt(time[1]));
    // console.log(toUpdate);
    resetRank.updatedAt =
        ("00" + current.getDate()).slice(-2) + "/" +
        ("00" + (current.getMonth() + 1)).slice(-2) + "/" +
        current.getFullYear() + " " +
        ("00" + current.getHours()).slice(-2) + ":" +
        ("00" + current.getMinutes()).slice(-2) + ":" +
        ("00" + current.getSeconds()).slice(-2);
    console.log(resetRank);
    fn.writerFile(JSON.stringify(resetRank), __basedir + "\\resetRank.json")
}

exports.resetRanking = () => {
    models.servers.update({
        score_vote: 0,
    }, {
        where: {}
    }).then(() => {
        fn.updateTimeAndResetRank();
        console.log('==> Already Reset Ranking <==');
    })
}


exports.resetActiveOfGames = async () => {
    models.category.update({
        category_serverActive: 0,
    }, {
        where: {}
    }).then(() => {
    }).catch(err => { console.log(err); })
}

exports.getDateReset = (millisecond) => {
    let date = new Date(millisecond);
    return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


exports.createUserToken = (userData) => {
    console.log(privateKey.token);
    return jwt.sign({
        user_id: userData[0].user_id,
        username: userData[0].username,
        phoneNumber: userData[0].phoneNumber,
        email: userData[0].email,
        role: userData[0].role,
    }, privateKey.token, { expiresIn: privateKey.expToken });
}

exports.createUser = async (userData) => {
    return models.users.create({
        username: userData[0].username,
        password: userData[0].password,
        phoneNumber: userData[0].phoneNumber,
        email: userData[0].email
    });
}

exports.getRankGlobalServer = async (serverId) => {
    let serAll = await models.servers.findAll({
        attributes: ['server_id', 'server_name'],
        order: [['score_vote', 'DESC']],
    })
    for (let n = 0; n < serAll.length; n++) {
        if (serverId == serAll[n].server_id || serAll[n].server_name === serverId) return (n + 1);
    }
}

exports.getRankServer = async (serverId, categoryId) => {
    let serAll = await models.servers.findAll({
        attributes: ['server_id', 'server_name'],
        order: [['score_vote', 'DESC']],
        where: { category_id: categoryId }
    })
    for (let n = 0; n < serAll.length; n++) {
        if (serverId == serAll[n].server_id || serAll[n].server_name === serverId) return (n + 1);
    }
}

exports.getClientIp = async (req) => {
    return (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress;
};

exports.setAddLogVote = async (score, serverId, ipAddress, idGame) => {
    try {
        await models.votes.create({
            vote_server: serverId,
            vote_score: score,
            ip_address: ipAddress,
            id_game: idGame
        });
        return true;
    } catch (err) {
        return err;
    }
}

exports.setAddScoreVoteSev = async (score, serverId) => {
    try {
        await models.servers.increment({
            score_vote: +parseInt(score),
        }, {
            where: { server_id: serverId }
        });
        return true;
    } catch (err) {
        return err;
    }
}


exports.setAddActive = async (score, gameId) => {
    try {
        await models.category.increment({
            category_serverActive: +score,
        }, {
            where: { category_id: gameId }
        });
        return true;
    } catch (err) {
        return err;
    }
}

exports.findIdCategoryOfServer = async (serverId) => {
    try {
        let data = await models.servers.findAll({
            attributes: ['category_id'],
            where: { server_id: serverId },
            limit: 1
        });
        console.log(data[0].category_id);
        return await data[0].category_id;
    } catch (err) {
        return err;
    }
}

exports.isHadScoreVoteSev = async (serverId) => {
    try {
        let data = await models.servers.findAll({
            attributes: ['score_vote'],
            where: { server_id: serverId },
            limit: 1
        });
        if (data[0].score_vote > 0) {
            return false
        } else {
            return true
        }

    } catch (err) {
        return false
    }
}


exports.validateIsAdmin = async (userId) => {
    try {
        let role = await models.users.findAll({
            attributes: ['role'],
            where: { user_id: userId },
            limit: 1
        });
        if (role[0].role == 1) return true;
        else return false;
    } catch (err) {
        return false;
    }
};

exports.diffTimeCurrent = async (date) => {
    var now = new Date();
    var then = date;
    return moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
};

exports.getScoreSev = async (serverId) => {
    try {

        return await models.servers.findAll({
            attributes: ['score_vote'],
            where: { server_id: serverId },
            limit: 1
        });
    } catch (err) {
        return err;
    }
};


exports.isEmailInDB = async (email, oldEmail) => {
    let emailInDB;
    try {
        emailInDB = await models.users.findAll({
            attributes: ['email'],
            where: { email: email },
            limit: 1
        });
    } catch (err) {
        return false;
    }
    if (emailInDB.length === 0) return true;
    else if (oldEmail === email) return true;
    else return false;
};



exports.isUsernameInDB = async (username, oldUsername) => {
    let userInDB;
    try {
        userInDB = await models.users.findAll({
            attributes: ['username'],
            where: { username: username },
            limit: 1
        });
    } catch (err) {
        return false;
    }
    if (userInDB.length === 0) return true;
    else if (oldUsername === username) return true;
    else {
        return false;
    }
};



exports.refreshToken = async (userId) => {
    try {
        let userInDB = await models.users.findAll({
            where: { user_id: userId },
            limit: 1
        });

        return json = {
            username: userInDB[0].username,
            user_id: userInDB[0].user_id,
            email: userInDB[0].email,
            token: fn.createUserToken(userInDB)
        }
    } catch (err) {
        return false;
    }
};




exports.validatedPassUser = async (password, userId) => {
    let userInDB;
    try {
        userInDB = await models.users.findAll({
            attributes: ['password'],
            where: {
                user_id: userId
            },
            limit: 1
        });
        if (userInDB.length >= 1) {
            console.log(userInDB[0].password);
            if (bcrypt.compareSync(password, userInDB[0].password)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


exports.validateServerOfUser = async (serverId, userId) => {
    try {
        let serverInfo = await models.servers.findAll({
            where: {
                [Op.and]: [
                    { server_id: serverId },
                    { server_user: userId }
                ],
            },
            limit: 1
        });
        if (serverInfo.length >= 1) {
            return true;
        } else {
            if (await fn.validateIsAdmin(userId) === true) return true;
            else return false;
        }
    } catch (err) {
        return false;
    }
};


exports.removeImgServerOfUser = async (serverId, userId) => {
    try {
        let serverInfo = await models.servers.findAll({
            where: {
                [Op.and]: [
                    { server_id: serverId },
                    { server_user: userId }
                ],
            },
            limit: 1
        });
        try {
            fs.unlinkSync(__basedir + '\\src\\public\\img\\servers\\' + serverInfo[0].server_img);
            return true;
        } catch (err) {
            return false;
        }
    } catch (err) {
        return false;
    }
};


exports.removeImgCategoryOfGame = async (categoryId) => {
    try {
        let categoryInfo = await models.category.findAll({
            where: {
                category_id: categoryId
            },
            limit: 1
        });
        try {
            fs.unlinkSync(__basedir + '\\src\\public\\img\\category\\' + categoryInfo[0].category_img);
            return true;
        } catch (err) {
            return false;
        }
    } catch (err) {
        return false;
    }
};


exports.getServByName = async (servName) => {
    try {
        let info = await models.sequelize.query('select '
            + ' server_name , server_id , score_vote , server_img , c.categoty_name '
            + ' from servers'
            + ' join category_games as c on c.category_id = servers.category_id  '
            + ' WHERE servers.server_name LIKE "' + servName + '%" '
            + ' GROUP BY servers.server_id');
        return info[0]
    } catch (err) {
        return false;
    }
};


exports.getCountCommentsById = async (id) => {
    try {
        let info = await models.sequelize.query('select count(comments.server_id) as count '
            + ' from comments'
            + ' WHERE server_id = ' + id + ' ');
        return info[0][0]
    } catch (err) {
        return false;
    }
};


exports.validatedView = async (ip, serverId) => {
    try {
        let info = await models.sequelize.query('select * '
            + 'from log_views_servers '
            + 'WHERE ip_address = "' + ip + '" and server_id = ' + serverId);
        return info[0][0]
    } catch (err) {
        return false;
    }
};

exports.insertLogViews = async (ip, serverId) => {
    try {
        let info = await models.sequelize.query('insert into log_views_servers(ip_address,server_id) '
            + 'values("' + ip + '",' + serverId + ')');
        return true
    } catch (err) {
        return false;
    }
};

exports.incrementViews = async (serverId) => {
    try {
        let info = await models.sequelize.query('update servers '
            + 'set views = views + 1 '
            + 'where server_id = ' + serverId);
        return true
    } catch (err) {
        return false;
    }
};