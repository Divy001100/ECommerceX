const dotenv =require('dotenv')
const path = require('path');
const PDFDocument = require('pdfkit');

dotenv.config({ path: path.resolve(__dirname, '../../config.env') });



const nodemailer = require('nodemailer')
const { Resend } = require('resend');
const sendEmail = require('./email');


class SendEmail {
  constructor(user, token = null, link = null) {
    this.user = user;
    this.token = token;
    this.to = user.email;
    this.from = 'Ecommerce X <onboarding@resend.dev>';
    this.link = link;
  }

  // ✅ 1. Password Reset Email
  async sendResetEmail() {
    const subject = 'Password Reset Token (valid for 10 minutes)';
    const text = `Hi ${this.user.name},\n\nPlease reset your password using the link below:\n${this.link}`;

    try {
      if (process.env.NODE_ENV === 'production') {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: this.from,
          to: this.to,
          subject,
          text,
        });
      } else {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false, // required for dev SMTP like Mailtrap
          },
        });

        await transporter.sendMail({
          from: this.from,
          to: this.to,
          subject,
          text,
        });
      }

      console.log('✅ Reset email sent to:', this.to);
    } catch (err) {
      console.error('❌ Failed to send reset email:', err.message);
    }
  }

  // ✅ 2. PDF Invoice Email
  async sendInvoicePDF(order) {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];
  
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);
  
      const subject = `Invoice for Order #${order._id}`;
      const text = `Hi ${this.user.name},\n\nThanks for your order! Your invoice is attached.`;
  
      try {
        if (process.env.NODE_ENV === 'production') {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: this.from,
            to: this.to,
            subject,
            text,
            attachments: [
              {
                filename: `Invoice-${order._id}.pdf`,
                content: pdfBuffer.toString('base64'),
                type: 'application/pdf',
              },
            ],
          });
        } else {
          const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
  
          await transporter.sendMail({
            from: this.from,
            to: this.to,
            subject,
            text,
            attachments: [
              {
                filename: `Invoice-${order._id}.pdf`,
                content: pdfBuffer,
              },
            ],
          });
        }
  
        console.log('✅ Invoice sent to:', this.to);
      } catch (err) {
        console.error('❌ Failed to send invoice email:', err.message);
      }
    });
  
    // ✅ This part draws the PDF content
    doc.font('Helvetica').fontSize(20).text('Ecommerce X Invoice');
    doc.moveDown();
  
    doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Invoice #: ${order._id}`);
    doc.moveDown();
  
    doc.fontSize(12).text(`Customer: ${this.user.name}`);
    doc.text(`Email: ${this.user.email}`);
    doc.text(`Order ID: ${order._id}`);
    doc.moveDown();
  
    const addr = order.shippingLocation;
    doc.fontSize(12).text(`Shipping Address:`);
    doc.text(`${addr.address || ''}`);
    doc.text(`${addr.city || ''}, ${addr.state || ''} - ${addr.postalCode || ''}`);
    doc.text(`${addr.country || ''}`);
    doc.moveDown();
  
    doc.fontSize(12).text(`Total: AUD $${order.price.toFixed(2)}`);
    doc.moveDown(2);
  
    doc.fontSize(10).text('Thank you for shopping with Ecommerce X!');
  
    // ✅ Always end the doc to flush the buffer
    doc.end();
  }
}  

module.exports = SendEmail;
