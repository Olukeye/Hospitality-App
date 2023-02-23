import nodemailer from "nodemailer"



const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: process.env.SERVICE,
            // port: process.env.GMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.USER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
              }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email link has bees sent to your email for password reset");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

export {

    sendEmail
} 