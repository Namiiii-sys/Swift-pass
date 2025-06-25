"use server"
import nodemailer from "nodemailer"
import QRCode from "qrcode"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const transporter = nodemailer.createTransport({
  host: 'send.ahasend.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_USERNAME,
    pass: process.env.NEXT_USERPASS,
  }
})

export async function Sendmail() {
  const participants = await prisma.participant.findMany()

  for (const person of participants) {
    if (!person.email || !person.name) {
      console.log("Skipping invalid participant:", person)
      continue
    }

    // const qrData = `SwiftPass:${person.id}:${person.email}`
    // const qrImage = await QRCode.toDataURL(qrData)

    const mailoptions = {
      from: 'Namita@donation.vinucode.in',
      to: person.email,
      subject: `Your SwiftPass QR Code`,
      html: `
        <p>Hi ${person.name},</p>
        <p>Here's your QR code for event check-in:</p>
        // <img src="${qrImage}" alt="QR Code" />
        <p>See you there!</p>
      `
    }

    try {
      const info = await transporter.sendMail(mailoptions)
      console.log(`Email sent to ${person.email}:`, info.response)
    } catch (e) {
      console.error(`Error sending to ${person.email}:`, e)
    }
  }
}
