import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function Post(req) {
    try{
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required"}, {status:400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        })
        
        const MailOpt = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Codefest",
            text: "this is a mail from namita's side",
        };

        await transporter.sendMail(MailOpt);
        return NextResponse.json({ message: "Email sent successfully!"});
    }
      catch (error) {
        console.log("Email Error:",error);
        return NextResponse.json({error: "Failed to send mail!"},{status:500});
      }
    
};