"use server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host : 'send.ahasend.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_USERNAME,
        pass: process.env.NEXT_USERPASS,
    }

})

export async function Sendmail() {
    const mailoptions = {
        from: 'Namitayayayaya@donation.vinucode.in',
        to: 'namita.24572@sscbs.du.ac.in',
        subject: 'Invitation to die',
        text:`
Dear bsc 1st year peeps,just die`,
    }


    transporter.sendMail(mailoptions, function(e,i){
        if (e){
            console.log(e)
        }
        else {
            console.log(i.response)
        }
    })
}