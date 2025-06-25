import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req) {
  const body = await req.json()
  const { name, email} = body

  try {
    const participant = await prisma.participant.create({
      data: { name, email, qrcode: '' }
    })
    return Response.json({ success: true, participant })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: error.message })
  }
}
