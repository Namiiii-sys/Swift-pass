import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function info() {
    const users = prisma.participant.findMany();
    return Response.json(users),
    console.log("heres the db")

    
}