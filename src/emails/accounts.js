const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = process.env.SENDGRID_API_KEY
  // "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";
//   "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"

sgMail.setApiKey(sendgridAPIKey);

const sendEmail = (email, text) => {
  const msg = {
    to: email,
    from: "darshan.m@crestinfosystems.com",
    subject: "Greeting",
    text: text,
  };
  sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
};


module.exports = {
    sendEmail
}

