import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const sendApprovalEmail = async (email: string, name: string) => {
    const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Forge Media - Welcome</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap');
            body { font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #050505; color: #ffffff; width: 100% !important; }
            .container { max-width: 600px; margin: 40px auto; background-color: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 32px; overflow: hidden; }
            .content { padding: 48px; }
            .logo-wrap { text-align: center; margin-bottom: 40px; }
            .logo-text { font-size: 28px; font-weight: 800; color: #92E3A9; letter-spacing: -1px; text-decoration: none; }
            .logo-text span { color: #ffffff; }
            .status-badge { display: inline-block; padding: 6px 14px; background-color: #92E3A9; color: #000000; border-radius: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; }
            h1 { font-size: 32px; font-weight: 800; color: #ffffff; margin: 0 0 20px 0; letter-spacing: -1px; line-height: 1.1; }
            p { font-size: 16px; line-height: 1.6; color: #a1a1aa; margin: 0 0 24px 0; }
            .cta-wrap { margin: 40px 0; text-align: center; }
            .button { display: inline-block; background-color: #92E3A9; color: #000000 !important; padding: 18px 40px; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 14px; text-align: center; transition: all 0.2s ease; box-shadow: 0 10px 20px rgba(146, 227, 169, 0.2); }
            .footer { padding: 40px; background-color: #0f0f0f; border-top: 1px solid #1a1a1a; text-align: center; }
            .footer-text { font-size: 12px; color: #52525b; line-height: 1.5; }
        </style>
    </head>
    <body style="background-color: #050505;">
        <div class="container">
            <div class="content">
                <div class="logo-wrap">
                    <a href="#" class="logo-text">FORGE<span>MEDIA</span></a>
                </div>
                
                <div style="text-align: center;">
                    <div class="status-badge">Approved!</div>
                    <h1>Welcome To The Team, ${name}.</h1>
                    <p>Good news! Your account has been approved by the admin. You now have full access to the Media dashboard and all our internal tools.</p>
                </div>

                <div class="cta-wrap">
                    <a href="https://studentforge.com/login" class="button">Go To Dashboard</a>
                </div>

                <div style="margin-top: 40px; border-top: 1px solid #1a1a1a; padding-top: 24px; text-align: center;">
                    <p style="margin-bottom: 4px; color: #ffffff; font-weight: 700;">Forge Admin Team</p>
                    <p style="font-size: 12px; color: #92E3A9; margin: 0;">Student Forge Technologies</p>
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-text">
                    This is an automated message to let you know your account is ready.<br/>
                    Please keep your login details safe.<br/><br/>
                    &copy; 2026 Student Forge Technologies
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await transporter.sendMail({
            from: '"Forge Admin" <studentforgetechnologies@gmail.com>',
            to: email,
            subject: "Your account is approved, " + name + "!",
            html: html,
        });
        console.log(`Simplified approval email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Simple Mail Error:", error);
        return false;
    }
};
