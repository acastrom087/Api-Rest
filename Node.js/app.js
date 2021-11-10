
const json = require('express');
const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());

const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

//app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
})