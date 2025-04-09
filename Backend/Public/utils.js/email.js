const nodemailer = require('nodemailer')
const { Resend } = require('resend')

const sendEmail = async(options)=>{
    const { email, subject, message, html } = options
     if(process.env.NODE_ENV==='production'){
        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
          await resend.emails.send({
            from: 'Divyanshu <onboarding@resend.dev>',
            to: email,
            subject,
            html: html || `<p>${message}</p>`,
          });
          console.log('Email sent via Resend');
        } catch (err) {
          console.error(' Failed to send via Resend:', err);
        }
     }else{

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure: false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
      }
})

const mailOptions ={
  
 from:'Divyanshu<no-reply@ecommerce.com>',
 to:options.email,
 subject:options.subject,
 text:options.message

}

await transporter.sendMail(mailOptions)
}}
module.exports = sendEmail