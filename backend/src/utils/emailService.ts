import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SENDGRID_HOST,
  port: Number(process.env.SENDGRID_PORT),
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_API_KEY,
  },
  secure: false,
})

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDGRID_EMAIL_FROM,
      to,
      subject,
      text,
    })
    console.log('✅ Email sent successfully')
  } catch (err) {
    console.error('Failed to send confirmation email:', err)
  }
}
