export function welcomeEmailTemplate(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .logo { font-size: 32px; font-weight: 900; background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .content { background: #1e293b; border-radius: 8px; padding: 30px; margin: 20px 0; }
          .greeting { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
          .text { line-height: 1.6; margin: 12px 0; color: #cbd5e1; }
          .cta { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; }
          .features { margin: 20px 0; }
          .feature { margin: 12px 0; padding-left: 24px; position: relative; }
          .feature::before { content: "✓"; position: absolute; left: 0; color: #00d4ff; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">WYZE</div>
          </div>
          
          <div class="content">
            <div class="greeting">Welcome, ${userName}! 🚀</div>
            
            <p class="text">
              You've successfully created your Wyze account. We're excited to have you join our community of career-focused professionals.
            </p>
            
            <p class="text">
              Explore exciting career opportunities, connect with industry professionals, and advance your career with Wyze.
            </p>
            
            <div class="features">
              <div class="feature">Discover curated career paths and opportunities</div>
              <div class="feature">Connect with professionals in your field</div>
              <div class="feature">Track your career growth and milestones</div>
            </div>
            
            <a href="http://localhost:3000/careers" class="cta">Start Exploring Careers</a>
            
            <p class="text" style="margin-top: 30px; color: #94a3b8;">
              If you didn't create this account, please ignore this email. Your account is now live and ready to use.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2026 Wyze. All rights reserved.</p>
            <p>Empowering careers, one opportunity at a time.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
