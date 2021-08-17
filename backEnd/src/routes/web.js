const router = require('express').Router();
const index = require('../controllers/index.controller');
const users = require('../controllers/users.controller');
const servers = require('../controllers/servers.controller');
const manage = require('../controllers/manage.controller');
const wheel = require('../controllers/wheelToVotes.controller');
const comments = require('../controllers/comments.controller');

const checkMiddleware = require('../middlewares/checkParams');
const auth = require('../middlewares/auth');
const authForAdmin = require('../middlewares/authForAdmin');


let routes = (app) => {
    // index page
    router.get('/', index.indexPage);
    router.post('/authUser', users.authentication);
    router.post('/register', users.checkBeforeRegister);
    router.get('/validatedToken', users.validatedToken);

    // category 
    router.get('/category/all', servers.getAllCategory);
    router.get('/category/view/:categoryName',
        checkMiddleware.beforeViewCategory,
        servers.getViewCategory);

    // profile 
    router.get('/profile/myProfile', auth, users.getMyProfile);
    router.patch('/profile/update/profile', auth,
        checkMiddleware.beforeUpdateProfile,
        users.updateProfile);
    router.patch('/profile/update/password',
        auth,
        checkMiddleware.beforeUpdatePassword,
        users.setUpdatePassword);
    router.patch('/profile/update/server',
        upload.single('serverImg'),
        auth,
        checkMiddleware.beforeUpdateServer,
        servers.setUpdateServer);

    //servers games
    router.get('/servers/all', servers.getAllServers);
    router.post('/servers/vote', servers.checkBeforeVote);
    router.post('/servers/cratedSev',
        upload.single('serverImg'),
        auth,
        checkMiddleware.beforeCreateSev,
        servers.setCreateSev);
    router.get('/servers/info/:serverId',
        servers.getInfoServer);
    router.get('/servers/myServer',
        auth,
        servers.getMySev);
    router.delete('/servers/delete',
        auth,
        servers.setDeleteSev);
    router.post('/servers/search', servers.search)

    //manage for admin
    router.patch('/admin/servers/update', authForAdmin, servers.setUpdateServer);
    router.get('/manage/show/ranking', authForAdmin, manage.getFileRanking);
    router.get('/manage/reset/ranking', authForAdmin, manage.setResetTimeRanking);
    router.patch('/manage/update/ranking',
        authForAdmin,
        checkMiddleware.beforeUpdateRankInfo,
        manage.setUpdateDataTimeRanking);
    router.post('/manage/add/category',
        authForAdmin,
        upload.single('categoryImg'),
        checkMiddleware.beforeAddCategory,
        manage.setAddCategory);
    router.patch('/manage/update/category',
        authForAdmin,
        upload.single('categoryImg'),
        checkMiddleware.beforeUpdateCategory,
        manage.setUpdateCategory);
    router.delete('/manage/delete/category',
        authForAdmin,
        manage.setDeleteCategory);
    router.delete('/manage/delete/user',
        authForAdmin,
        manage.setDeleteAccUser);
    router.get('/manage/view/user/all',
        authForAdmin,
        manage.getUserAll);
    router.get('/manage/view/user/:userId',
        authForAdmin,
        manage.getUserInfo);
    router.patch('/manage/update/user',
        authForAdmin,
        checkMiddleware.beforeUpdatePassword,
        checkMiddleware.beforeUpdateProfile,
        manage.setUpdateAccUser);


    //wheel To Vote
    router.get('/wheelToVote/reward',
        wheel.getReward);
    router.post('/wheelToVote/start',
        auth,
        wheel.recordServ);
    router.get('/wheelToVote/validated',
        auth,
        wheel.validatedWheelVotes);
    router.get('/wheelToVote/test',
        wheel.test);


    //comments system
    router.post('/comments/insert',
        comments.commentToServer);
    router.get('/comments/:serverId',
        comments.getComment);

    return app.use("/", router);
}

module.exports = routes;