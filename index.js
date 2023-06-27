const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      host : "smtp.gmail.com",
      port : '587',
      auth: {
        user: 'hello@dyota.digital',
        pass: 'xfrsrvehimuwitwf',
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: 'hello@dyota.digital',
      subject: 'Test email',
      text: `Name: ${req.body.name}\nemail: ${req.body.email}\nservice: ${req.body.service}\nSomethingElse: ${req.body.somethingElse}\nindustry: ${req.body.industry}\nteamSize: ${req.body.teamSize}, \noffering: ${req.body.offering}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send({ message: 'error' });
      } else {
        console.log('Email Sent');
        res.send('true');
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
