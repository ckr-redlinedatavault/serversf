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
        <title>Student Forge - Access Approved</title>
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
            .signature { margin-top: 40px; border-top: 1px solid #1a1a1a; paddingTop: 24px; }
            .signature-name { font-weight: 700; color: #ffffff; font-size: 14px; }
            .signature-title { color: #92E3A9; font-size: 12px; font-weight: 600; margin-top: 4px; }
        </style>
    </head>
    <body style="background-color: #050505;">
        <div class="container">
            <div class="content">
                <div class="logo-wrap">
                    <a href="#" class="logo-text">STUDENT<span>FORGE</span></a>
                </div>
                
                <div style="text-align: center;">
                    <div class="status-badge">System Verification Complete</div>
                    <h1>Identity Verified, ${name}.</h1>
                    <p>Welcome to the Forge. Your account has been reviewed and approved by the Super Admin node. All media channels and technical assets are now at your disposal.</p>
                </div>

                <div class="cta-wrap">
                    <a href="https://studentforge.com/login" class="button">Access Control Panel</a>
                </div>

                <div class="signature">
                    <p style="margin-bottom: 12px;">Protocol initialized by:</p>
                    <div class="signature-name">Super Admin Node</div>
                    <div class="signature-title">Security & Operations Protocol</div>
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-text">
                    This is a secure automated transmission from the Forge Media Network.<br/>
                    Do not share your authorization credentials with unauthorized units.<br/><br/>
                    &copy; 2026 Student Forge Technologies • Sydney Node v4.2.0 • Security L-5
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await transporter.sendMail({
            from: '"Student Forge Security" <studentforgetechnologies@gmail.com>',
            to: email,
            subject: "PROTOCOL: Access Authorization for " + name,
            html: html,
        });
        console.log(`Professional approval email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Professional Mail Error:", error);
        return false;
    }
};
