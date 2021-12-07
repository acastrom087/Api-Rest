const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))


exports.sendMail = (req, res, next) => {
    User.findByEmail(req.body.mail)
        .then(user => {
            if (user) {
                var usuario = new User();
                usuario._id = user._id
                usuario.name = user.name
                usuario.lastName = user.lastName
                usuario.email = user.email
                usuario.password = generateP()
                usuario.birthday = user.birthday
                usuario.gender = user.gender
                console.log(usuario)
                usuario.save()
                    .then(response => {
                        transporter.sendMail({
                            to: req.body.mail,
                            from: 'anthony.1960@hotmail.es',
                            subject: 'Hello from nodeJS',
                            html: '<h1>Works!</h1>'
                        })
                            .then(response => {
                                console.log("response: ", response);
                                res.json({ yes: true });
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err=> res.json(err))

            } else {
                res.json(null)
            }
        })
        .catch(err => res.json(err))

}

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (var i = 1; i <= 12; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}