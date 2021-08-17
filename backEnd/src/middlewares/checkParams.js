var { check, validationResult } = require('express-validator');
exports.beforeViewCategory = [
    check('categoryName').trim().escape().not().isEmpty().withMessage('Category Game ห้ามว่าง !!'),
    async (req, res, next) => {
        next();
    }];


exports.beforeCreateSev = [
    check('serverName').trim().escape().not().isEmpty().withMessage('serverName ห้ามว่าง !!'),
    check('serverDetail').trim().escape().not().isEmpty().withMessage('serverDetail ห้ามว่าง !!'),
    check('categoryId').trim().escape().not().isEmpty().withMessage('categoryId ห้ามว่าง !!')
        .isNumeric().withMessage('CategoryId ต้องเป็นตัวเลข เท่านั้น'),

    async (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        else {
            next();
        }
    }];


exports.beforeUpdateProfile = [
    check('email').trim().escape().not().isEmpty().withMessage('email ห้ามว่าง !!').isEmail().withMessage('Email ไม่ถูกต้อง'),
    check('username').trim().escape().not().isEmpty().withMessage('username ห้ามว่าง !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('username ภาษา English เท่านั้น !!')
        .isLength({ min: 8, max: 30 }).withMessage('username ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!'),
    check('phoneNumber').trim().escape().not().isEmpty().withMessage('phoneNumber ห้ามว่าง !!')
        .isNumeric().withMessage('เบอร์โทรศัพท์ ต้องเป็นตัวเลข เท่านั้น').isLength({ min: 10, max: 10 }).withMessage('เบอร์โทรความยาวต้องเท่ากับ 10 ตัวอักษร!!'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        else {
            next();
        }
    }];


exports.beforeUpdatePassword = [
    check('Oldpassword').trim().escape().not().isEmpty().withMessage('ไม่พบ Password กรุณาพิมพ์รหัสของคุณ !!')
        .isLength({ min: 8, max: 30 }).withMessage('password ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('Password ภาษา English เท่านั้น !!'),
    check('password').trim().escape().not().isEmpty().withMessage('ไม่พบ Password กรุณาพิมพ์รหัสของคุณ !!')
        .isLength({ min: 8, max: 30 }).withMessage('password ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('Password ภาษา English เท่านั้น !!'),
    check('repeatPassword').trim().escape().not().isEmpty().withMessage('ไม่พบ Password กรุณาพิมพ์รหัสของคุณ !!')
        .isLength({ min: 8, max: 30 }).withMessage('password ห้ามน้อยกว่า 8 ตัวอักษร และห้ามมากว่า 30 ตัวอักษร !!')
        .not().custom((val) => /[^A-za-z0-9\s]/g.test(val)).withMessage('Password ภาษา English เท่านั้น !!'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        else if (req.body.password !== req.body.repeatPassword) {
            return res.status(200).json({ msg: 'ยืนยันรหัสผ่านใหม่ ไม่ถูกต้อง', status: false }).end();
        }
        else {
            next();
        }
    }];


exports.beforeUpdateServer = [
    check('serverName').trim().escape().not().isEmpty().withMessage('ไม่พบชื่อ server ของคุณ !!'),
    async (req, res, next) => {
        let isServOfUser = await fn.validateServerOfUser(req.body.serverId, req.body.userIdToken);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        if (isServOfUser === false) {
            return res.status(200).json({ msg: 'คุณไม่มีสิทธิ์เข้าถึงในส่วนนี้', status: false })
        }
        else {
            next();
        }
    }];


exports.beforeUpdateRankInfo = [
    check('days').trim().escape().not().isEmpty().withMessage('ไม่พบ days ของคุณ !!')
        .isNumeric().withMessage('days ต้องเป็นตัวเลข เท่านั้น'),
    async (req, res, next) => {
        const errors = validationResult(req);
        // let times = resetRank.times.split(':');

        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        if (!(req.body.days >= 0 && req.body.days <= 24)) {
            return res.status(200).json({ msg: 'days ห้ามน้อยกว่า 0 และ มากกว่า 24', status: false }).end();
        }
        if (req.body.times == undefined || req.body.times == '') {
            req.body.times = '00:00';
        }
        if (req.body.days === '0' && req.body.times === '00:00') {
            return res.status(200).json({ msg: 'ห้ามใส่ days 0 และ time 00:00', status: false }).end();
        }
        // console.log(req.body);
        next();
    }];


exports.beforeUpdateCategory = [
    check('categoryName').trim().escape().not().isEmpty().withMessage('ไม่พบชื่อ category name ของคุณ !!'),
    check('categoryId').trim().escape().not().isEmpty().withMessage('ไม่พบชื่อ category id ของคุณ !!')
        .isNumeric().withMessage('CategoryId ต้องเป็นตัวเลข เท่านั้น'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        req.body.uploadCategory = true;
        next();
    }];

exports.beforeAddCategory = [
    check('categoryName').trim().escape().not().isEmpty().withMessage('ไม่พบชื่อ category name ของคุณ !!'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ msg: errors.errors[0].msg, status: false }).end();
        }
        req.body.uploadCategory = true;
        next();
    }];