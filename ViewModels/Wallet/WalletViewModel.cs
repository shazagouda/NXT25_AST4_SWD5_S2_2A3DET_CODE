using A3DET_CODE.Models;

namespace A3DET_CODE.ViewModels.Wallet
{
    public class WalletViewModel
    {
        public decimal Balance { get; set; }
        public string Role { get; set; } = string.Empty;
        public List<WalletTransaction> Transactions { get; set; } = new();

        public bool CanDeposit => Role != "Mentor";
        public bool CanWithdraw => Role != "Company";
    }
}
