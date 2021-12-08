const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))


exports.sendMail = (req, res, next) => {
    User.findByEmail(req.body.mail)
        .then(user => {
            console.log(user);
            if (user) {
                var usuario = new User();
                usuario._id = user._id
                usuario.name = user.name
                usuario.lastName = user.lastName
                usuario.email = user.email
                usuario.birthday = user.birthday
                usuario.gender = user.gender
                console.log(usuario)
                bcryptjs.hash(generateP(), 10, (e, hash) => {
                    if (e) {
                        res.json('Error')
                    }else{
                        usuario.password = hash
                        console.log(usuario.password)
                    usuario.save()
                        .then(response => {
                            transporter.sendMail({
                                to: req.body.mail,
                                from: 'anthony.1960@hotmail.es',
                                subject: 'Change of password',
                                html: '<h1>Your new password is</h1>' + '<h2>' + generateP() +'</h2>'
                            })
                                .then(response => {
                                    console.log("response: ", response);
                                    res.json({ yes: true });
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => res.json(err))
                    }
                })
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