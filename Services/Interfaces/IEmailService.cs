namespace A3DET_CODE.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendBookingConfirmationAsync(string toEmail, string toName, string bookingDetails);
        Task SendContractNotificationAsync(string toEmail, string toName, string contractNumber, string contractDetails);
        Task SendContractSignedAsync(string toEmail, string toName, string signerName, string contractNumber);
        Task SendContractFullySignedAsync(string partyAEmail, string partyAName, string partyBEmail, string partyBName, string contractNumber, string contractDetails);
        Task SendEmailAsync(string toEmail, string subject, string htmlMessage);
    }
}
