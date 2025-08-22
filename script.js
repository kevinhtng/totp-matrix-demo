document.addEventListener('DOMContentLoaded', () => {
  const otp = new jsOTP.totp();
  const generateBtn = document.getElementById('generateBtn');
  const codeElement = document.getElementById('code');
  const timerElement = document.getElementById('timer');
  const secretInput = document.getElementById('secret');
  const qrcodeDiv = document.getElementById('qrcode');

  let countdownInterval;

  function updateCode() {
    const secret = secretInput.value.trim();
    if (!secret) {
      codeElement.textContent = "------";
      timerElement.textContent = "30";
      qrcodeDiv.innerHTML = '';
      return;
    }

    const code = otp.getOtp(secret);
    codeElement.textContent = code;

    // Generate QR code
    qrcodeDiv.innerHTML = '';
    new QRCode(qrcodeDiv, {
      text: `otpauth://totp/Example?secret=${secret}`,
      width: 128,
      height: 128
    });

    // Reset countdown
    let timeLeft = 30 - Math.floor(Date.now() / 1000) % 30;
    timerElement.textContent = timeLeft;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        updateCode(); // regenerate
      } else {
        timerElement.textContent = timeLeft;
      }
    }, 1000);
  }

  generateBtn.addEventListener('click', updateCode);
});
