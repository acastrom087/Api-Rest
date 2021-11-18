

const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();


app.use(express.json());
const userRoutes = require('./routes/user');
const albumRoutes = require('./routes/album');
const photoRoutes = require('./routes/photo');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use('/album', albumRoutes);
app.use('/photo', photoRoutes);




app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})