const nodemailer = require('nodemailer');

async function sendPayslip(email, payslipPath) {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this based on your email provider
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'  // Replace with your app-specific password
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Payslip',
        text: 'Attached is your payslip.',
        attachments: [
            {
                filename: 'payslip.pdf', // Change according to your file
                path: payslipPath // Path of the generated payslip
            }
        ]
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
}

module.exports = sendPayslip;
