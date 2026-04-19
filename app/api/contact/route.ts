import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message, recaptchaToken } = body

    if (!name || !email || !subject || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'All fields and captcha are required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })
    
    const verifyData = await verifyRes.json()
    if (!verifyData.success) {
      console.error('reCAPTCHA Error:', verifyData)
      return NextResponse.json(
        { error: 'Invalid captcha verification' },
        { status: 400 }
      )
    }

    // Attempt to send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Resend requires verified domain, since you own hamzabeizig.com, you will use it here.
        // For onboarding dev, resend uses onboarding@resend.dev
        from: "Contact Form <onboarding@resend.dev>",
        to: "beizig.hamza@gmail.com",
        reply_to: email,
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <h2>New Message from Your Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        `
      })
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend Error:', data)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
