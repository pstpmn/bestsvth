const wheelScore = require('../../wheelToScore.json');
const models = require('../models/model');

exports.getReward = async (req, res) => {
    let json = [];
    for (let i = 0; i < wheelScore.length; i++) {
        json[i] = { name: wheelScore[i], icon: null };
    }
    return res.status(200).send(json);
}

exports.recordServ = async (req, res) => {
    let dueDate = await fn.setDueDateOfWheel();
    let randomItem = await fn.randomWheel();
    let validatedTime = await fn.validatedWheelVotes(req.body.userIdToken);
    // let validatedTime = true;
    if (validatedTime === true) {
        await models.sequelize.query('insert into wheeltovotes('
            + 'user_id,server_id,score_votes,dueDate) '
            + 'values(' + req.body.userIdToken + ' , ' + req.body.serverId + ' , ' + randomItem + ' , "' + dueDate + '")');

        return res.status(200).json({
            msg: 'คุณได้รับ votes ' + randomItem + " คะแนน",
            index: wheelScore.indexOf(randomItem),
            status: true
        })
    } else {
        return res.status(200).json({
            msg: 'สามารถสุ่มได้อีกครั้งเมื่อถึงเวลา ' + validatedTime + " ms.",
            getTime: validatedTime,
            status: false
        })
    }
}

exports.validatedWheelVotes = async (req, res) => {
    let validatedTime = await fn.validatedWheelVotes(req.body.userIdToken);
    if (validatedTime === true) {
        return res.status(200).json({
            msg: 'สามารถสุ่มได้',
            status: true
        })
    } else {
        return res.status(200).json({
            msg: 'สามารถสุ่มได้อีกครั้งเมื่อถึงเวลา ' + validatedTime + " ms.",
            getTime: validatedTime,
            status: false
        })
    }
}


exports.test = async (req, res) => {
    let a = await fn.getUserIdFromServerId(req.body.serverId);
    let b = await fn.getScoreVoteOfWheelByUserId(a);
    console.log(b);
}