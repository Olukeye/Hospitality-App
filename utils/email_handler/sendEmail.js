import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import dotenv from "dotenv"
import * as fs from 'fs'
import path from 'path'
import url from 'url';


dotenv.config();


const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: process.env.GMAIL_PORT,
        secure:false,
        
        auth: {
            user:process.env.USER,
            pass:process.env.USER_PASSWORD
        },
        tls: { rejectUnauthorized: false }
        });
    
        transporter.verify((error, success)=> {
            if (error) {
                  console.log(error);
            } else {
                  console.log(success);
            }
        });
        
    // these method only applie to ES Module scope in order to use "__dirname"
        const __filename = url.fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        const templateSource = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(templateSource);

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: compiledTemplate(payload)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error, "email not sent");
            } else {
                console.log("email link has been sent to your email for password reset "  + info.response);
            }
        });
    } catch (error) {
        return error
    }
};

export {

    sendEmail
} 