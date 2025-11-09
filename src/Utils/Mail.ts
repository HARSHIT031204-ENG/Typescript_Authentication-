import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";

interface I_options {
    email: string;
    name: string;
    subject: string;
    mailgenContent: {
        body: {
            name: any;
            intro: string;
            content: {
                instructions: string;
                button: {
                    color: string;
                    text: string;
                    link?: any;
                    
                };
            };
        };
    };
    outro: string;
}

const SendMail = async (options: I_options) => {
    const mailgenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Learning & Growing",
            link: "http://learning&growing.com",
        },
    });

    const emailTextual = mailgenerator.generatePlaintext(
        options.mailgenContent
    );
    const emailHTML = mailgenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            pass: process.env.SMTP_PASS,
            user: process.env.SMTP_USER,
        },
    });

    const mail = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log("email service failed silently ", error);
    }
};

const EmailverificationMailgen = (username: string, emailotp: number) => {
    return {
        body: {
            name: username,
            intro: `Welcome to Our Application! We're very excited to have you on board. ${emailotp}`,
            content: {
                instructions:
                    "To verify your mail please enter given otp on site!",
                button: {
                    color: "#22BC66",
                    text: `verify your email ${emailotp}`,
                    // link: emailotp,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

const ForgotPasswordMailgen = function (
    username: string,
    resetpasswordurl: string
) {
    return {
        body: {
            name: username,
            intro: "we got a request to reset the password of your account ",
            action: {
                instructions:
                    "To reset your password please click on the following button",
                button: {
                    color: "#ffee00ff",
                    text: "Reset your password !",
                    link: resetpasswordurl,
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
};

export { EmailverificationMailgen, ForgotPasswordMailgen, SendMail };
