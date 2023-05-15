const pdf = require('./downloadPdf')
const userDetails = require('../server')
const nodemailer = require('nodemailer');
const fs = require('fs')
function mailToUserFn(){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ankitdubey8906@gmail.com',
            pass: '7@l8BsbR7gu3'
        }
    });
    
    // read PDF file content
    let pdfContent = fs.readFileSync('../cvbuilder/resumePdfs/' + pdf.pdfName);
    
    // create mail options
    let mailOptions = {
        from: 'ankitdubey8906@gmail.com',
        to: userDetails.email,
        subject: 'Cv Generated from CV Makers ',
        text: 'Thank you for using our service. Please find attached the PDF file you requested.',
        attachments: [
            {
                filename: userDetails.firstName + `'sresume.pdf`,
                content: pdfContent,
                contentType: 'application/pdf'
            }
        ]
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = mailToUserFn