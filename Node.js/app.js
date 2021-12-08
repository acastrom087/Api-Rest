const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
    
});

const mailRoute = require('./routes/mail')
const userRoutes = require('./routes/user');
const albumRoutes = require('./routes/album');
const photoRoutes = require('./routes/photo');

app.use('/mail', mailRoute);
app.use('/user', userRoutes);
app.use('/album', albumRoutes);
app.use('/photo', photoRoutes);




app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})