const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? "",
  port: process.env.EMAIL_PORT ?? 2525,
  auth: {
    user: process.env.EMAIL_USERNAME ?? "",
    pass: process.env.EMAIL_PASSWORD ?? "",
  },
});

async function send(subject, text) {
  const emailOptions = {
    from: process.env.EMAIL_FROM ?? "",
    to: process.env.EMAIL_TO ?? "",
    subject: subject,
    text: text,
  };

  emailTransporter.sendMail(emailOptions, function (error, info) {
    if (error) logger.error(`Error sending email: ${error}`);
    else logger.info(`Email sent: ${emailOptions} |  ${info.response}`);
  });
}

module.exports = { send };
