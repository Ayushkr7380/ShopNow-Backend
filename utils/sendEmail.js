import {config} from "dotenv";
config();
import nodemailer from 'nodemailer';
import Mailgen from "mailgen";


const mailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"ShopNow",
        link:process.env.FRONTEND_URL
    }
});



const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.ADMIN_EMAIL,
        pass:process.env.ADMIN_PASSWORD
    }
})


const emailSend = async(options)=>{

    const email = {
    body:{
        name:options.name,
        intro:"Welcome to ShopNow.",
        action:{
            instructions:options.instructions,
            button:{
                color: "#22BC66",
                text: options.subject,
                link:`${process.env.FRONTEND_URL}/auth/${options.route}/${options.token}`,
                }
            },
        outro: "Need help? Just reply to this email, we'd love to help.",
        }
    }

    const emailBody = mailGenerator.generate(email);

    const emailText = mailGenerator.generatePlaintext(email);
    const mailOptions = {
        from:process.env.ADMIN_EMAIL,
        to:options.email,
        subject:options.subject,
        text:emailText,
        html:emailBody
    }

    const info = await transporter.sendMail(mailOptions);


    console.log("Message sent:", info.messageId);

    
    return info;

    
}

export default emailSend;