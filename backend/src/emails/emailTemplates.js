
//EMAIL SIGN UP NOTIFICATION TEMPLATE

export function welcomeEmailTemplate(name, clientURL){
return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Wlad's chat app</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td align="center" style="padding: 20px;">
              <tr>
            <td align="center" style="background: linear-gradient(90deg, #4CAF50, #2E7D32); padding: 30px 20px;">
              <h1 style="margin: 0; font-size: 26px; color: #ffffff; font-family: Arial, sans-serif;">
                Wlad's chat app
              </h1>
            </td>
          </tr>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333;">
              <h2 style="margin: 0 0 10px;">Hello, ${name}!</h2>
              <p style="margin: 0 0 15px;">Welcome to my chat platform. Here’s what you can do:</p>
              <ul style="padding-left: 20px; margin: 0 0 20px;">
                <li style="margin-bottom: 10px;">Send and receive text messages</li>
                <li style="margin-bottom: 10px;">Share and receive photos</li>
                <li style="margin-bottom: 10px;">Get inspiring quotes from great people</li>
              </ul>

              <p style="margin: 20px 0 10px; font-weight: bold;"><strong>Get started in just a few steps:</strong></p>
              <ul style="padding-left: 20px; margin: 0 0 20px;">
                <li style="margin-bottom: 10px;">Set up your profile picture</li>
                <li style="margin-bottom: 10px;">Find and add your contacts</li>
                <li style="margin-bottom: 10px;">Start a conversation</li>
                <li style="margin-bottom: 0;">Share text and photos with your contacts</li>
              </ul>
              <div style="text-align: center; margin-top: 25px;">
                <a href="${clientURL}" target="_blank" 
                   style="display: inline-block; padding: 12px 24px; background: #4CAF50; color: #ffffff; 
                          text-decoration: none; font-size: 16px; border-radius: 6px;">
                  Start chattin'
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 15px; text-align: center; font-size: 12px; color: #888888;">
              © 2025 Wlad's chat.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
