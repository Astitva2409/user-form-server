const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")))

app.get('/form', (req, res) => {
    res.send('Hello World!');
});


app.post("/form", (req, res) => {
    const { name, email, age, number } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'StackFusion Assignment',
        text: `YOUR NAME IS: ${name} YOUR EMAIL IS: ${email} YOUR DOB IS: ${age} YOUR NUMBER IS: ${number}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Could not send email.');
        } else {
            console.log(`Email sent: ${info.response}`);
            res.status(200).send('Email sent successfully!');
        }
    });
});

app.listen(3000, () => {
    console.log('Hi astitva, server started on port 3000');
});