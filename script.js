// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 33);
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// --- TOTP + QR CODE ---
const secret = "S3CR3TD3M0K3YQWER"; // demo secret
const totp = window.otplib.totp;
totp.options = { digits: 6, step: 30 };

// Generate QR code dynamically
const otpUrl = `otpauth://totp/MatrixMFA?secret=${secret}&issuer=Demo`;
QRCode.toCanvas(document.getElementById("qrcode"), otpUrl, function (error) {
  if (error) console.error(error);
});

// Check code
function checkCode() {
  const input = document.getElementById("codeInput").value.trim();
  const token = totp.generate(secret);
  if (input === token) {
    document.getElementById("result").innerHTML = "<h3>Access Granted! Redirecting...</h3>";
    setTimeout(() => { window.location.href = "success.html"; }, 1000);
  } else {
    document.getElementById("result").innerHTML = "<h3>Invalid Code.</h3>";
  }
}
