import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "harshitgarg1819@gmail.com",
    pass: "bceg wyhe epar czur",
  },
});
