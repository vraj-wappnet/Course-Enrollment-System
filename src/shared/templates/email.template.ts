export class EmailTemplate {
  static getResetPasswordOtpTemplate(otp: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            @media only screen and (max-width: 600px) {
              .container { padding: 15px !important; }
              .otp-box { font-size: 24px !important; letter-spacing: 3px !important; }
              .header img { max-width: 150px !important; }
            }
          </style>
        </head>
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f7fa; color: #333;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #ffffff, #f8fafc); border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); padding: 30px;">
            <div class="header" style="text-align: center; margin-bottom: 30px;">
               <img src="https://static.vecteezy.com/system/resources/previews/013/079/497/non_2x/lms-icon-illustration-lms-learning-management-system-educational-course-education-training-program-infographic-template-concept-banner-pictogram-icon-set-icons-vector.jpg" alt="Company Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: #1e88e5; font-size: 26px; margin: 0; font-weight: 600;">Password Reset Request</h1>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Dear User,</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">We've received a request to reset your password. Please use the One-Time Password (OTP) below to proceed:</p>
            
            <div class="otp-box" style="background: #e3f2fd; border: 1px solid #bbdefb; padding: 20px; border-radius: 8px; font-size: 36px; font-weight: bold; text-align: center; margin: 30px 0; letter-spacing: 6px; color: #1565c0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
              ${otp}
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 15px;">This OTP is valid for <strong>5 minutes</strong>.</p>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 30px;">If you did not initiate this request, please disregard this email or reach out to our support team for assistance.</p>
    
            <div style="text-align: center; padding-top: 25px; border-top: 1px solid #e0e7ff;">
              <p style="color: #1e88e5; font-weight: bold; font-size: 16px; margin: 0 0 5px;">Course Enrollment System</p>
              <p style="color: #607d8b; font-size: 13px; margin: 0;">© ${new Date().getFullYear()} All Rights Reserved</p>
              <p style="color: #90a4ae; font-size: 12px; margin: 10px 0 0;">
                <a href="#" style="color: #1e88e5; text-decoration: none;">Support</a> | 
                <a href="#" style="color: #1e88e5; text-decoration: none;">Privacy Policy</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
  }
}
