using A3DET_CODE.Services.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;

namespace A3DET_CODE.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration config, ILogger<EmailService> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task SendBookingConfirmationAsync(string toEmail, string toName, string bookingDetails)
        {
            var subject = "🎉 Booking Confirmed — A3DET CODE";
            var body = $@"
            <div style='font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f6f7fb; padding: 40px 20px;'>
                <div style='background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);'>
                    <div style='text-align: center; margin-bottom: 30px;'>
                        <div style='display: inline-block; background: linear-gradient(135deg, #2F6FED, #15C6AE); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 18px;'>A3DET CODE</div>
                    </div>
                    <h2 style='color: #0A1628; font-size: 24px; margin-bottom: 16px;'>Booking Confirmed!</h2>
                    <p style='color: #5B6478; line-height: 1.6;'>Hello <strong>{toName}</strong>,</p>
                    <p style='color: #5B6478; line-height: 1.6;'>Your booking has been confirmed. Here are the details:</p>
                    <div style='background: #f6f7fb; border-radius: 12px; padding: 20px; margin: 20px 0;'>
                        {bookingDetails}
                    </div>
                    <p style='color: #5B6478; line-height: 1.6;'>A contract will be generated for you to sign digitally.</p>
                    <div style='text-align: center; margin-top: 30px;'>
                        <a href='#' style='background: #2F6FED; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;'>View Booking</a>
                    </div>
                </div>
                <p style='text-align: center; color: #94A0B8; font-size: 12px; margin-top: 24px;'>© {DateTime.Now.Year} A3DET CODE Platform. All rights reserved.</p>
            </div>";

            await SendEmailInternalAsync(toEmail, toName, subject, body);
        }

        public async Task SendContractNotificationAsync(string toEmail, string toName, string contractNumber, string contractDetails)
        {
            var subject = $"📋 New Contract {contractNumber} — A3DET CODE";
            var body = $@"
            <div style='font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f6f7fb; padding: 40px 20px;'>
                <div style='background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);'>
                    <div style='text-align: center; margin-bottom: 30px;'>
                        <div style='display: inline-block; background: linear-gradient(135deg, #2F6FED, #15C6AE); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 18px;'>A3DET CODE</div>
                    </div>
                    <h2 style='color: #0A1628; font-size: 24px; margin-bottom: 16px;'>New Contract Ready for Signing</h2>
                    <p style='color: #5B6478; line-height: 1.6;'>Hello <strong>{toName}</strong>,</p>
                    <p style='color: #5B6478; line-height: 1.6;'>A new contract <strong>{contractNumber}</strong> has been created and is ready for your digital signature.</p>
                    <div style='background: #f6f7fb; border-radius: 12px; padding: 20px; margin: 20px 0;'>
                        {contractDetails}
                    </div>
                    <div style='text-align: center; margin-top: 30px;'>
                        <a href='#' style='background: #2F6FED; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;'>Sign Contract</a>
                    </div>
                </div>
                <p style='text-align: center; color: #94A0B8; font-size: 12px; margin-top: 24px;'>© {DateTime.Now.Year} A3DET CODE Platform. All rights reserved.</p>
            </div>";

            await SendEmailInternalAsync(toEmail, toName, subject, body);
        }

        public async Task SendContractSignedAsync(string toEmail, string toName, string signerName, string contractNumber)
        {
            var subject = $"✍️ Contract {contractNumber} Signed — A3DET CODE";
            var body = $@"
            <div style='font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f6f7fb; padding: 40px 20px;'>
                <div style='background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);'>
                    <div style='text-align: center; margin-bottom: 30px;'>
                        <div style='display: inline-block; background: linear-gradient(135deg, #2F6FED, #15C6AE); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 18px;'>A3DET CODE</div>
                    </div>
                    <h2 style='color: #0A1628; font-size: 24px; margin-bottom: 16px;'>Contract Signed!</h2>
                    <p style='color: #5B6478; line-height: 1.6;'>Hello <strong>{toName}</strong>,</p>
                    <p style='color: #5B6478; line-height: 1.6;'><strong>{signerName}</strong> has signed the contract <strong>{contractNumber}</strong>. The contract is now waiting for the other party's signature.</p>
                    <div style='text-align: center; margin-top: 30px;'>
                        <a href='#' style='background: #2F6FED; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;'>View Contract</a>
                    </div>
                </div>
                <p style='text-align: center; color: #94A0B8; font-size: 12px; margin-top: 24px;'>© {DateTime.Now.Year} A3DET CODE Platform. All rights reserved.</p>
            </div>";

            await SendEmailInternalAsync(toEmail, toName, subject, body);
        }

        public async Task SendContractFullySignedAsync(string partyAEmail, string partyAName, string partyBEmail, string partyBName, string contractNumber, string contractDetails)
        {
            var subject = $"✅ Contract {contractNumber} Fully Executed — A3DET CODE";
            var body = $@"
            <div style='font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f6f7fb; padding: 40px 20px;'>
                <div style='background: white; border-radius: 16px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);'>
                    <div style='text-align: center; margin-bottom: 30px;'>
                        <div style='display: inline-block; background: linear-gradient(135deg, #2F6FED, #15C6AE); color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 18px;'>A3DET CODE</div>
                    </div>
                    <h2 style='color: #0A1628; font-size: 24px; margin-bottom: 16px;'>🎉 Contract Fully Executed!</h2>
                    <p style='color: #5B6478; line-height: 1.6;'>Both parties have signed the contract <strong>{contractNumber}</strong>. The agreement is now active.</p>
                    <div style='background: #E8EFFE; border-left: 4px solid #2F6FED; border-radius: 8px; padding: 16px; margin: 20px 0;'>
                        <strong style='color: #0A1628;'>Parties:</strong>
                        <p style='color: #5B6478; margin: 4px 0;'>Party A: {partyAName}</p>
                        <p style='color: #5B6478; margin: 4px 0;'>Party B: {partyBName}</p>
                    </div>
                    <div style='background: #f6f7fb; border-radius: 12px; padding: 20px; margin: 20px 0;'>
                        {contractDetails}
                    </div>
                    <div style='text-align: center; margin-top: 30px;'>
                        <a href='#' style='background: #15C6AE; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; display: inline-block;'>View Active Contract</a>
                    </div>
                </div>
                <p style='text-align: center; color: #94A0B8; font-size: 12px; margin-top: 24px;'>© {DateTime.Now.Year} A3DET CODE Platform. All rights reserved.</p>
            </div>";

            await SendEmailInternalAsync(partyAEmail, partyAName, subject, body);
            await SendEmailInternalAsync(partyBEmail, partyBName, subject, body);
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
        {
            await SendEmailInternalAsync(toEmail, toEmail, subject, htmlBody);
        }

        private async Task SendEmailInternalAsync(string toEmail, string toName, string subject, string htmlBody)
        {
            try
            {
                var smtpHost = _config["Email:SmtpHost"] ?? "smtp.gmail.com";
                var smtpUser = _config["Email:SmtpUser"] ?? "";
                var smtpPass = _config["Email:SmtpPassword"] ?? "";
                var fromName = _config["Email:FromName"] ?? "A3DET CODE";
                var fromEmail = _config["Email:FromEmail"] ?? smtpUser;

                if (string.IsNullOrWhiteSpace(smtpUser) || string.IsNullOrWhiteSpace(smtpPass))
                {
                    _logger.LogWarning("⚠️ Email not configured. Skipping email to {Email}. Subject: {Subject}", toEmail, subject);
                    return;
                }

                var rawPort = _config["Email:SmtpPort"];
                if (!int.TryParse(rawPort, out int smtpPort))
                {
                    smtpPort = 587;
                }

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(new MailboxAddress(toName, toEmail));
                message.Subject = subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = htmlBody };
                message.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(smtpUser, smtpPass);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                _logger.LogInformation("✅ Email sent to {Email}: {Subject}", toEmail, subject);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to send email to {Email}: {Subject}", toEmail, subject);
            }
        }
    }
}