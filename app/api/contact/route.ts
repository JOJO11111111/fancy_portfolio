import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter with your email credentials
// For security, these should be in environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your preferred email service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Set this in .env.local
    pass: process.env.EMAIL_PASS || 'your-app-password', // Set this in .env.local
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_RECIPIENT || 'your-email@gmail.com', // Where you want to receive messages
      subject: `[Website Contact] Message from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 