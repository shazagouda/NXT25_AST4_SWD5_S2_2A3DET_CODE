document.addEventListener('DOMContentLoaded', function () {
    const startDateInput = document.getElementById('ScheduledAt');
    const endDateInput = document.getElementById('EndDate');
    
    if (!startDateInput || !endDateInput) return; // Not on booking page

    const displayRate = document.getElementById('displayRate');
    const displayDuration = document.getElementById('displayDuration');
    const displaySubtotal = document.getElementById('displaySubtotal');
    const displayFee = document.getElementById('displayFee');
    const displayTotal = document.getElementById('displayTotal');
    const payAmount = document.getElementById('payAmount');
    
    // The hourly rate is passed as a value in the form
    const hourlyRateInput = document.querySelector('input[name="HourlyRate"]');
    const hourlyRate = hourlyRateInput ? parseFloat(hourlyRateInput.value) : 0;

    function calculatePrices() {
        if (!startDateInput.value || !endDateInput.value) return;

        const start = new Date(startDateInput.value + 'T00:00:00');
        const end = new Date(endDateInput.value + 'T00:00:00');
        
        let days = 1;
        if (end >= start) {
            const diffTime = Math.abs(end - start);
            days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        } else {
            days = 0; // Invalid
        }

        const subtotal = hourlyRate * 8 * days; // 8 hours a day
        const fee = subtotal * 0.10; // 10% Platform Fee
        const total = subtotal; // Booker pays subtotal
        
        // Update UI
        if (displayDuration) displayDuration.innerText = days + ' days (8 hrs/day)';
        if (displaySubtotal) displaySubtotal.innerText = subtotal.toFixed(2);
        if (displayFee) displayFee.innerText = fee.toFixed(2);
        if (displayTotal) displayTotal.innerText = total.toFixed(2);
        if (payAmount) payAmount.innerText = total.toFixed(2);
    }

    startDateInput.addEventListener('change', calculatePrices);
    endDateInput.addEventListener('change', calculatePrices);

    // Initial calculation
    calculatePrices();
});
