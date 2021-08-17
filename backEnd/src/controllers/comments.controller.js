const models = require('../models/model');

exports.commentToServer = async (req, res) => {
    console.log(req);
    try {
        let ip = await fn.getClientIp(req);
        await models.sequelize.query('insert into comments('
            + 'server_id,ip_address,comment) '
            + 'values(' + req.body.serverId + ' , "' + ip + '" , "' + req.body.comment + '")');
        return res.status(200).json({
            msg: 'comment สำเร็จ ',
            status: true
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            msg: 'เกิดข้อผิดพลาด',
            status: false
        })
    }
}


exports.getComment = async (req, res) => {
    try {
        let comment = await models.sequelize.query('select id , comment , createdAt from comments '
            + 'where server_id = ' + req.params.serverId);
        if (comment[0].length == 0) {
            return res.status(200).json({
                status: false
            })
        }
        return res.status(200).json({
            comment: comment[0],
            status: true
        })
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            msg: 'เกิดข้อผิดพลาด',
            status: false
        })
    }
}
