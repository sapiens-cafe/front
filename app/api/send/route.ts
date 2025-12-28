import { Resend } from 'resend';
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sapienscafe.tech@gmail.com',
      subject: 'Nouveau message contact sapiens.com',
      html: requestBody.html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
