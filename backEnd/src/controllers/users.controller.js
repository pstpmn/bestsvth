const models = require('../models/model');
var { check, validationResult } = require('express-validator');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs')

exports.authentication = [
    check('username').trim().escape().not().isEmpty().withMessage('ไม่พบ Username กรุณาพิมพ์รหัสของคุณ !!'),
    check('password').trim().escape().not().isEmpty().withMessage('ไม่พบ Password กรุณาพิมพ์รหัสของคุณ !!'),
    async (req, res) => {
        // checking
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array(), status: false }).end();
        }
        // execute
        models.users.findAll({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.username }
                ],
            }, limit: 1
        }).then(data => {
            if (data.length === 0) return res.status(200).json({ msg: "ไม่พบข้อมูล Username และ Password !!", status: false }).end();
            if (bcrypt.compareSync(req.body.password, data[0].password)) {
                var token = fn.createUserToken(data);
                console.log("generated token : " + token);
                return res.status(200).json({
                    token: token,
                    username: data[0].username,
                    email: data[0].email,
                    user_id: data[0].user_id,
                    role: data[0].role,
                    status: true
                }).end();
            } else {
                return res.status(200).json({ msg: "Username และ Password ไม่ถูกต้อง !!", status: false }).end();

            }
        })
    }
]


exports.validatedToken = async (req, res) => {
    if (req.headers['token'] != undefined) {
        try {
            var result = jwt.verify(req.headers['token'], privateKey.token);
            req.body.userToken = result.username;
            req.body.userIdToken = result.user_id;
            req.body.emailToken = result.email;

            return res.status(200).json({ meg: "Token สามารถใช้งานได้", status: true }).end();

        } catch (e) {
            return res.status(200).json({ meg: "Token ไม่ถูกต้อง", status: false }).end();
        }
    }
    else {
        return res.status(200).json({ meg: "ไม่พบ Token กรุณาทำการ Login ใหม่ !!", status: false }).end();
    }
}


exports.checkBeforeRegister = [
    check('username').trim().escape().not().isEmpty().withMessage('ไม่พบ Username กรุณาพิมพ์รหัสของคุณ !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('username ภาษา English เท่านั้น !!')
        .isLength({ min: 8, max: 30 }).withMessage('username ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!'),
    check('password').trim().escape().not().isEmpty().withMessage('ไม่พบ Password กรุณาพิมพ์รหัสของคุณ !!')
        .isLength({ min: 8, max: 30 }).withMessage('password ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('Password ภาษา English เท่านั้น !!'),
    check('phoneNumber').trim().escape().not().isEmpty().withMessage('ไม่พบ phone number กรุณาพิมพ์รหัสของคุณ !!')
        .isNumeric().withMessage('เบอร์โทรศัพท์ ต้องเป็นตัวเลข เท่านั้น').isLength({ min: 10, max: 10 }).withMessage('เบอร์โทรความยาวต้องเท่ากับ 10 ตัวอักษร!!'),
    check('email').trim().escape().not().isEmpty().withMessage('ไม่พบ Email กรุณาพิมพ์รหัสของคุณ !!').isEmail().withMessage('Email ไม่ถูกต้อง'),

    async (req, res) => {
        // checking
        let userData;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        try {
            userData = await models.users.findAll({
                where: {
                    username: req.body.username
                }
            });
            if (userData.length !== 0) {
                return res.status(200).json({ status: false, msg: "Username ถูกใช้งานแล้วว !!" }).end();
            }
        } catch (err) {
            return res.status(200).json({
                status: false, msg: "พบข้อผิดพลาดในการสมัครสมาชิก !!"
            }).end();
        }

        // created new User 
        let resultCreated = await fn.createUser([{
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }]);
        return res.status(200).json({
            status: true, msg: "สมัครสมาชิกสำรเร็จ !!", token: fn.createUserToken([resultCreated]),
            username: resultCreated.username, user_id: resultCreated.user_id
        }).end();
    }
]


exports.updateProfile = async (req, res) => {
    // checking
    if (await fn.isEmailInDB(req.body.email, req.body.emailToken) == false) {
        return res.status(200).json({ msg: 'Email มีผู้ใช้งานแล้ว', status: false });
    }
    else if (await fn.isUsernameInDB(req.body.username, req.body.userToken) == false) {
        return res.status(200).json({ msg: 'Username มีผู้ใช้งานแล้ว', status: false });
    }
    try {
        let update = await models.users.update({
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }, {
            where: { user_id: req.body.userIdToken }
        })
        let token = await fn.refreshToken(req.body.userIdToken);
        return res.status(200).json({ msg: 'Update ข้อมูลสำเร็จ', status: true, retoken: token })
    } catch (err) {
        return res.status(200).json({ msg: 'พบข้อผิดพลาดโปรดติดต่อทีมงาน', status: false })
    }


}


exports.getMyProfile = async (req, res) => {
    // checking
    models.users.findAll({
        attributes: ['user_id', 'username', 'phoneNumber', 'email', 'createdAt'],
        where: { user_id: req.body.userIdToken },
        limit: 1
    }).then(data => {
        return res.status(200).json({ msg: data, status: true })
    })
        .catch(err => { return res.status(200).json({ msg: 'ไม่พบ User', status: false }) })
}

exports.setUpdatePassword = async (req, res) => {
    console.log(req.body);
    // checking
    let validPass = await fn.validatedPassUser(req.body.Oldpassword, req.body.userIdToken);
    if (validPass === true) {
        models.users.update({
            password: bcrypt.hashSync(req.body.password, 10)
        }, {
            where: { user_id: req.body.userIdToken }
        }).then(data => {
            return res.status(200).json({ msg: 'เปลียน password สำเร็จ', status: true })
        })
            .catch(err => { return res.status(200).json({ msg: 'เกิดข้อผิดพลาดโปรดติดต่อทีมงาน', status: false }) })
    } else {
        return res.status(200).json({ msg: 'password ดั้งเดิมของคุณไม่ถูกต้องโปรดตรวจสอบอีกครั้ง', status: false })
    }
}