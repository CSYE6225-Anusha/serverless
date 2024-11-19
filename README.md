# Lambda Function 📧

This Lambda function handles sending email verification links to new users using Mailgun. The emails include a unique verification link that expires after 2 minutes. Below is an overview of the functionality and configuration:

## Features ✨
1. **Environment Variables**: Configured through `.env` for sensitive data.
2. **SNS Trigger**: Receives events from SNS when a new user account is created.
3. **Dynamic Email Content**: Sends personalized verification emails using a Mailgun template.
4. **Error Handling**: Logs errors during email sending and returns appropriate responses.

---

## How It Works 🛠️
1. **Trigger**: 
   - The function is invoked by an SNS event containing the user's email, first name, last name, and a verification token.

2. **Email Sending**:
   - Generates a verification link using the provided email and token.
   - Sends a personalized email using Mailgun's template system.

3. **Response**:
   - Returns `200` if the email is successfully sent.
   - Returns `500` in case of any error (e.g., email failure or missing data).

---

## Setup Instructions 🚀
### 1️⃣ Prerequisites
- [Node.js](https://nodejs.org/)  installed
- AWS Lambda with SNS integration
- Mailgun account for sending emails 

## Support the Project with a ⭐ 
```javascript
if (youEnjoyed) {
    starThisRepository();
}
