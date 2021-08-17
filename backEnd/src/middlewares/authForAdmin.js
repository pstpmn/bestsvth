const authorize = async (req, res, next) => {
    if (req.headers['token'] != undefined) {
        try {
            var result = jwt.verify(req.headers['token'], privateKey.token);
            if (await fn.validateIsAdmin(result.role) === true) {
                req.body.userToken = result.username;
                req.body.userIdToken = result.user_id;
                req.body.emailToken = result.email;
                next();
            } else {
                return res.status(200).json({ meg: "คุณไม่มีสิทธิ๋เข้าถึงข้อมูล", status: false }).end();
            }

        } catch (e) {
            return res.status(401).json({ meg: "Token ไม่ถูกต้อง", status: false }).end();
        }
    }
    else {
        return res.status(401).json({ meg: "ไม่พบ Token กรุณาทำการ Login ใหม่ !!", status: false }).end();
    }
}
module.exports = authorize;