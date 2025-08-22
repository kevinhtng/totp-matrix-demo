document.addEventListener("DOMContentLoaded", () => {
  // -------- MATRIX BACKGROUND --------
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const chars = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    // cool fade
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 33);

  // Adjust drops when resizing
  window.addEventListener("resize", () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  // -------- TOTP + QR (all local libs) --------
  // Use a VALID Base32 secret (A-Z and 2-7). You can change this.
  const SECRET_BASE32 = "JBSWY3DPEHPK3PXP"; // demo secret (works)
  const otp = new jsOTP.totp(); // defaults: 30s period, 6 digits, SHA1

  // Build otpauth URL for Google Authenticator
  const issuer = "Demo";
  const account = "MatrixMFA";
  const otpUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${SECRET_BASE32}&issuer=${encodeURIComponent(issuer)}`;

  // Render QR into the #qrcode container (qrcode.js)
  const qrContainer = document.getElementById("qrcode");
  // clear first in case of hot reload
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text: otpUrl,
    width: 200,
    height: 200,
    correctLevel: QRCode.CorrectLevel.M
  });

  // -------- CODE VERIFICATION --------
  window.checkCode = function() {
    const input = document.getElementById("codeInput").value.trim();
    const token = otp.getOtp(SECRET_BASE32); // current 6-digit TOTP

    const resultDiv = document.getElementById("result");
    if (input === token) {
      resultDiv.innerHTML = "<h3>Access Granted! Redirecting...</h3>";
      setTimeout(() => {
        window.location.href = "success.html";
      }, 800);
    } else {
      resultDiv.innerHTML = "<h3>Invalid Code.</h3>";
    }
  };
});

