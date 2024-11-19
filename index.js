const mailgun = require("mailgun.js");
const formData = require("form-data");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Mailgun configuration
const DOMAIN = process.env.DOMAIN;
const mailgunClient = new mailgun(formData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Lambda handler
exports.handler = async (event) => {
  let emailLogEntry;

  try {
    // Parse SNS message to get user email
    const message = JSON.parse(event.Records[0].Sns.Message);
    const userEmail = message.email;

    // Generate a unique verification link with a 2-minute expiration
    const verificationToken = message.verificationToken;
    const first_name = message.first_name;
    const last_name = message.last_name;
    const verificationLink = `http://${process.env.DOMAIN}/v1/user/verify?email=${userEmail}&token=${verificationToken}`;

    const data = {
      from: `Anusha Kadali <no-reply@${process.env.DOMAIN}>`,
      to: userEmail,
      subject: "Welcome! Please verify your email",
      template: "email_verification_template",
      'h:X-Mailgun-Variables': {first_name: first_name, last_name: last_name, verificationLink: verificationLink}
    };
    
    // Step 2: Send verification email
    try {
      
      await mailgunClient.messages.create(DOMAIN, data);

    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to send verification email." }),
      };
    }

    // Return success response if all steps complete
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Verification email sent successfully." }),
    };
  } catch (error) {
    console.error("General error:", error);

    // Update status to "error" if there is an error before email is sent
    if (emailLogEntry) {
      await emailLogEntry.update({ status: "error" });
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process verification email." }),
    };
  }
};