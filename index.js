const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = 3000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const sendMail = (mailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: mailData?.email,
    to: process.env.EMAIL,
    subject: `Email from ${mailData?.name}`,
    text: mailData?.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


app.get("/", (req, res) => {
  res.send("portfolio server is running");
});

app.post("/sendEmail", (req, res) => {
  const dataFromContact = req.body;
  sendMail(dataFromContact);
  res.send({ message: "Email sent" });
});

app.listen(port, () => {
  console.log(`portfolio server running on port ${port}`);
});
