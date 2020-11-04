const nodemailer = require('nodemailer') 

module.exports = class MailManager{

    mail_Begin(host,port,email,password){
        this.server_mail = email;
        this.TRANSPORTER = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
                user: email,
                pass: password
            }
        })
    }

    mailConstructor(email,subject,txt){
        let MAIL = {
            from: this.server_mail,
            to: email,
            subject: subject,
            text: txt
        }
        return MAIL
    }

    senderMail(mail){
        this.TRANSPORTER.sendMail(mail, (err, info) => { 
            if (err) {
                return console.log(err)
            }
            console.log(info)
        });
    }

}