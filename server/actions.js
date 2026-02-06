"use server"

import { PrismaClient } from "@prisma/client"
import { Sendmail } from "./mail"
import QRCode from "qrcode";

const prisma = new PrismaClient()

export async function getUsers() {
    try {
        const users = await prisma.participant.findMany()
        return { success: true, data: users }
    } catch (error) {
        console.error("Error fetching users:", error)
        return { success: false, error: "Failed to fetch users" }
    }
}

export async function saveUser(data) {
    try {
        // 1. Create user first to get ID
        const participant = await prisma.participant.create({
            data: {
                name: data.name,
                email: data.email,
            }
        })

        // 2. Generate QR Data
        const qrData = `SwiftPass:${participant.id}:${participant.email}`

        // 3. Generate QR Image
        const QRCode = require('qrcode');
        const qrImage = await QRCode.toDataURL(qrData)

        // 4. Update user with QR
        const updatedParticipant = await prisma.participant.update({
            where: { id: participant.id },
            data: { qrcode: qrImage }
        })

        return { success: true, data: updatedParticipant }
    } catch (error) {
        console.error("Error saving user:", error)
        return { success: false, error: error.message }
    }
}

export async function sendBatchMail() {
    try {
        await Sendmail()
        return { success: true, message: "Emails sent successfully!" }
    } catch (error) {
        console.error("Error sending mails:", error)
        return { success: false, error: "Failed to send emails." }
    }
}