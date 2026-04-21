require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    console.log(name, email, message);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Portfolio" <${process.env.EMAIL_USER}>`,
            to: 'latent.node.core@gmail.com',
            subject: `Message from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b><br>${message}</p>
            `
        });

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));