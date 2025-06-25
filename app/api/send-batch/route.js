import { Sendmail } from "@/server/mail";

export async function POST() {
  try {
    await Sendmail();
    return Response.json({ success: true, message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending mails:", error);
    return Response.json({ success: false, error: "Failed to send emails." }, { status: 500 });
  }
}
