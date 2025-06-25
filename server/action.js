"use server"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function saveuser(data) {
    return await prisma.participant.create({
        data: {
            name: data.name,
            email: data.email
         }
    })
};