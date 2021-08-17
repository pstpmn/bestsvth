const models = require('../models/model');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs')


exports.getFileRanking = async (req, res) => {
    return res.status(200).json({ RankingInfo: resetRank })
}


exports.setUpdateDataTimeRanking = async (req, res) => {
    resetRank.days = req.body.days;
    resetRank.times = req.body.times;
    try {
        await fn.updateTimeRank();
        return res.status(200).json({ status: true, msg: 'อัพเดท Time Ranking สำเร็จ' })
    } catch (err) {
        return res.status(200).json({ status: false, msg: 'พบข้อผิดพลาดในการอัพเดท เวลา Reset Ranking โปรดติดต่อทีมงาน' });
    }
}

exports.setResetTimeRanking = async (req, res) => {
    await fn.resetRanking();
    return res.status(200).json({ status: true, msg: 'Reset Ranking แล้ว' })
}

exports.setUpdateCategory = async (req, res) => {
    if (req.file == undefined) {
        models.category.update({
            categoty_name: req.body.categoryName,
        }, {
            where: { category_id: req.body.categoryId }
        }).then(data => {
            return res.status(200).json({ msg: 'Update สำเร็จ', status: true })
        })
            .catch(err => {
                // console.log(err);
                return res.status(200).json({ msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false })
            })
    } else {
        await fn.removeImgCategoryOfGame(req.body.categoryId);
        models.category.update({
            categoty_name: req.body.categoryName,
            category_img: req.file.filename,
        }, {
            where: { category_id: req.body.categoryId }
        }).then(data => {
            return res.status(200).json({ msg: 'Update สำเร็จ', status: true })
        })
            .catch(err => {
                // console.log(err);
                return res.status(200).json({ msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false })
            })
    }
}

exports.setAddCategory = async (req, res) => {
    console.log(req.body);
    if (req.file == undefined) {
        return res.status(200).json({ msg: 'โปรดอัพรูปภาพเกมส์', status: false })
    }
    models.category.create({
        categoty_name: req.body.categoryName,
        category_img: req.file.filename,
        category_serverTotal: 0,
        category_serverActive: 0

    }).then(data => {
        res.status(200).json({ msg: 'เพิ่มข้อมูลสำเร็จ', status: true })
    })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false
            })
        })
}


exports.setDeleteCategory = async (req, res) => {
    models.servers.findAll({ attributes: ['server_id'], where: { category_id: req.body.categoryId } })
        .then(function (data) {
            if (data.length != 0) {
                let array = [];
                for (let n = 0; n < data.length; n++) {
                    array.push(data[n].server_id);
                }
                models.votes.destroy({ where: { vote_server: { [Op.in]: array } } })
            }
        }).then(success => {
            models.servers.destroy({
                where: { category_id: req.body.categoryId }
            })
        }).then(() => {
            models.category.destroy({
                where: { category_id: req.body.categoryId }
            })
            return res.status(200).json({ msg: 'การลบ category สำเร็จ', status: true })

        }).catch(err => {
            return res.status(200).json({ msg: 'เกิดข้อผิดพลาดโปรดติดต่อทีมงาน', status: false })
        })
}


exports.setUpdateAccUser = async (req, res) => {
    if (req.body.password == undefined || req.body.password == '') {
        models.users.update({
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role,
        }, { where: { user_id: req.body.userId } })
            .then(data => { return res.status(200).json({ msg: 'อัพเดทข้อมูลสำเร็จ', status: true }) })
            .catch(err => {
                console.log(err);
                return res.status(200).json({
                    msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false
                })
            })
    } else {
        models.users.update({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role,
        }, { where: { user_id: req.body.userId } })
            .then(data => { return res.status(200).json({ msg: 'อัพเดทข้อมูลสำเร็จ', status: true }) })
            .catch(err => {
                console.log(err);
                return res.status(200).json({
                    msg: 'เกิดปัญหาโปรดติดต่อทีมงาน', status: false
                })
            })
    }
}


exports.setDeleteAccUser = async (req, res) => {
    models.servers.findAll({ attributes: ['server_id'], where: { server_user: req.body.userId } })
        .then(function (data) {
            if (data.length != 0) {
                let array = [];
                for (let n = 0; n < data.length; n++) {
                    array.push(data[n].server_id);
                }
                models.votes.destroy({ where: { vote_server: { [Op.in]: array } } })
            }
        }).then(success => {
            models.servers.destroy({
                where: { server_user: req.body.userId }
            })
        }).then(success => {
            models.users.destroy({
                where: { user_id: req.body.userId }
            })
            return res.status(200).json({ msg: 'ลบสมาชิกสำเร็จ', status: true })
        }).catch(err => {
            console.log(err);
            return res.status(200).json({ msg: 'เกิดข้อผิดพลาดโปรดติดต่อทีมงาน', status: false })
        })
}

exports.getUserAll = async (req, res) => {
    models.users.findAll()
        .then(function (data) {
            return res.status(200).json({
                userAll: data,
                status: true
            })
        })
        .catch(err => {
            return res.status(200).json({ status: false })
        })
}

exports.getUserInfo = async (req, res) => {
    models.users.findAll({
        where: { user_id: req.params.userId }
    })
        .then(function (data) {
            return res.status(200).json({
                userInfo: data,
                status: true
            })
        })
        .catch(err => {
            return res.status(200).json({ status: false })
        })
}