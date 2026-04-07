# Temple Landscaping — Form Setup Guide

This guide walks you through connecting the contact form to Google Sheets, email notifications, and text notifications. You will need to create accounts on 3 services and add your credentials to Vercel.

**Estimated time: 30 minutes**
**Monthly cost: ~$2-3 (Twilio only). Everything else is free.**

---

## 1. Google Sheets (Free)

This saves every form submission as a row in a spreadsheet you can view anytime.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it "Temple Leads" (or whatever you like)
3. In Row 1, add these column headers:
   - A1: `Timestamp`
   - B1: `First Name`
   - C1: `Last Name`
   - D1: `Email`
   - E1: `Phone`
   - F1: `Service`
   - G1: `Message`
4. Click **Extensions > Apps Script**
5. Delete everything in the editor and paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.service,
    data.message
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

6. Click **Deploy > New deployment**
7. Click the gear icon and select **Web app**
8. Set "Execute as" to **Me**
9. Set "Who has access" to **Anyone**
10. Click **Deploy**
11. Copy the **Web app URL** — you will need this later

> **Important:** If you ever update the Apps Script code, use **Deploy > Manage deployments > Edit** (pencil icon) instead of creating a new deployment. A new deployment gives you a different URL.

---

## 2. Resend — Email Notifications (Free)

This sends you an email every time someone submits the form.

1. Go to [resend.com](https://resend.com) and sign up
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Name it "Temple Website" and copy the key (starts with `re_`)

### For production (so emails don't go to spam):
5. Go to **Domains** in the sidebar
6. Click **Add Domain** and enter your domain (e.g. `templelandscaping.com`)
7. Resend will give you DNS records to add — go to your domain registrar (GoDaddy, Namecheap, etc.) and add them
8. Once verified, update the "from" address in the code (ask your developer to change `onboarding@resend.dev` to `quotes@templelandscaping.com`)

---

## 3. Twilio — Text Notifications (~$2-3/month)

This texts you every time someone submits the form.

1. Go to [twilio.com](https://www.twilio.com) and sign up
2. You will get a **free trial** with $15.50 credit
3. From the Console Dashboard, copy:
   - **Account SID** (starts with `AC`)
   - **Auth Token**
4. Go to **Phone Numbers > Manage > Buy a number**
5. Buy a Canadian number (area code 403 if available)
6. Copy the phone number (format: `+14035550000`)

### For trial accounts:
7. Go to **Phone Numbers > Manage > Verified Caller IDs**
8. Add your personal cell phone number and verify it via text
9. Trial accounts can only send texts to verified numbers

> **To remove the "Sent from a Twilio trial account" prefix:** Upgrade to pay-as-you-go (no monthly minimum, just ~$1.15/mo for the phone number + $0.0079 per text).

---

## 4. Add Everything to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings > Environment Variables**
3. Add these 7 variables:

| Variable | Value |
|----------|-------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | The Web app URL from Step 1 |
| `RESEND_API_KEY` | The API key from Step 2 (starts with `re_`) |
| `NOTIFICATION_EMAIL` | Your email address (where you want to receive notifications) |
| `TWILIO_ACCOUNT_SID` | Account SID from Step 3 (starts with `AC`) |
| `TWILIO_AUTH_TOKEN` | Auth Token from Step 3 |
| `TWILIO_PHONE_NUMBER` | The Twilio phone number you bought (e.g. `+14035550000`) |
| `OWNER_PHONE_NUMBER` | Your personal cell phone (e.g. `+14035551234`) |

4. Click **Save** for each one
5. Go to **Deployments** and click the **...** menu on the latest deployment
6. Click **Redeploy**

---

## 5. Test It

1. Go to your live website
2. Fill out the contact form with your own info
3. You should see:
   - A success message on the website
   - A new row in your Google Sheet
   - An email in your inbox
   - A text on your phone

If something doesn't work, check the Vercel **Function Logs** (Deployments > select deployment > Functions tab) for error messages.

---

## Troubleshooting

**Form shows error message:**
- Check that all 7 environment variables are set correctly in Vercel
- Make sure you redeployed after adding the variables

**No row in Google Sheet:**
- Make sure the Apps Script is deployed (not just saved)
- Check that "Who has access" is set to "Anyone"

**No email:**
- Check your spam folder
- Make sure `RESEND_API_KEY` and `NOTIFICATION_EMAIL` are set
- For production: verify your domain in Resend

**No text:**
- On trial: make sure your phone number is verified in Twilio
- Check that phone numbers include the country code (e.g. `+1` for Canada)

**"Sent from a Twilio trial account" in texts:**
- Upgrade your Twilio account to pay-as-you-go to remove this
