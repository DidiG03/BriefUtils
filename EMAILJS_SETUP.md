# EmailJS Setup Guide for Tool Suggestions

To enable the tool suggestion form to send emails to your Gmail account, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## 2. Create an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** as your email service
4. Connect your Gmail account (sefridkapllani@gmail.com)
5. Note down the **Service ID** (e.g., `service_xxxxxxx`)

## 3. Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Tool Suggestion - {{tool_name}}

**Body:**
```
New tool suggestion received from BriefUtils:

From: {{from_name}} ({{from_email}})
Tool Name: {{tool_name}}
Priority: {{priority}}

Description:
{{tool_description}}

Use Case:
{{use_case}}

---
This email was sent from the BriefUtils tool suggestion form.
```

4. Set the **To Email** to: `{{to_email}}`
5. Save the template and note down the **Template ID** (e.g., `template_xxxxxxx`)

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_xxxxxxxxxxxxxxx`)

## 5. Update the Contact Page

Replace the placeholders in `/src/app/contact/page.tsx`:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your Service ID
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID
  templateParams,
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key
);
```

## 6. Test the Form

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/contact`
3. Fill out the form and submit
4. Check your Gmail inbox for the test email

## EmailJS Free Tier Limits

- 200 emails per month
- Perfect for tool suggestions
- No credit card required

## Security Notes

- Your EmailJS public key is safe to expose in client-side code
- EmailJS handles all the email authentication
- No server-side code needed

## Troubleshooting

If emails aren't being sent:

1. Check browser console for errors
2. Verify all IDs are correct in the contact page
3. Make sure your Gmail service is properly connected in EmailJS
4. Check EmailJS dashboard for delivery logs