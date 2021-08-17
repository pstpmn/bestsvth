const app = require('express')();
const port = process.env.PORT || 13569;
const bodyParser = require('body-parser');
const cors = require('cors');
// const models = require('./src/models/model');
const initRoutes = require('./src/routes/web');
const upload = require("./src/middlewares/img.upload");

global.upload = upload;
global.fn = require('./src/helpers/function')

global.jwt = require('jsonwebtoken');
global.privateKey = require('./key.json');
global.resetRank = require('./resetRank.json');
global.__basedir = __dirname;


var corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(require('express').static(('./src/public/')));
initRoutes(app);
fn.setTimeResetRank();

app.listen(port, () => {
    console.log('Server running port : ' + port);
})