// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Configure Nodemailer transporter with your SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'alina.zabec.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Create a simple API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'oskar@oblikoval.xyz',
        subject: `New Message from Portfolio: ${name}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});