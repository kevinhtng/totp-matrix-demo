document.addEventListener("DOMContentLoaded", () => {
  // --- MATRIX BACKGROUND ---
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const chars = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
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

  // --- TOTP SETUP ---
  const secret = OTPAuth.Secret.fromBase32("S3CR3TD3M0K3YQWER"); // demo secret
  const totp = new OTPAuth.TOTP({
    issuer: "Demo",
    label: "MatrixMFA",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret
  });

  // Generate QR code
  const otpUrl = totp.toString();
  const qrCanvas = document.getElementById("qrcode");
  QRCode.toCanvas(qrCanvas, otpUrl, function(error) {
    if (error) console.error(error);
    else console.log("QR code generated!");
  });

  // --- CODE VERIFICATION ---
  window.checkCode = function() {
    const input = document.getElementById("codeInput").value.trim();
    const token = totp.generate(); // current 6-digit TOTP
    const resultDiv = document.getElementById("result");

    if (input === token) {
      resultDiv.innerHTML = "<h3>Access Granted! Redirecting...</h3>";
      setTimeout(() => {
        window.location.href = "success.html";
      }, 1000);
    } else {
      resultDiv.innerHTML = "<h3>Invalid Code.</h3>";
    }
  };
});
