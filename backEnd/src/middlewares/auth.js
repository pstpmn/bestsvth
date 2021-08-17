const authorize = (req, res, next) => {
    if (req.headers['token'] != undefined) {
        try {
            var result = jwt.verify(req.headers['token'],privateKey.token);
            req.body.userToken = result.username;
            req.body.userIdToken = result.user_id;
            req.body.emailToken = result.email;
            next();
        } catch (e) {
            return res.status(401).json({meg:"Token ไม่ถูกต้อง"}).end();
        }
    }
    else {
        return res.status(401).json({meg:"ไม่พบ Token กรุณาทำการ Login ใหม่ !!"}).end();
    }
}
module.exports = authorize;