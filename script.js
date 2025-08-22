// --- TOTP SETUP ---
const secret = OTPAuth.Secret.fromBase32("JBSWY3DPEHPK3PXP");
const totp = new OTPAuth.TOTP({
  issuer: "Demo",
  label: "MatrixMFA",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: secret
});

// --- MATRIX BACKGROUND ---
document.addEventListener("DOMContentLoaded", () => {
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

  // --- DEBUG DISPLAY OF CURRENT TOTP ---
  const qrContainer = document.querySelector(".qr-container");
  const debugDiv = document.createElement("div");
  debugDiv.style.marginTop = "10px";
  debugDiv.style.fontSize = "20px";
  debugDiv.style.color = "#00ff00";
  qrContainer.appendChild(debugDiv);

  function updateDebugCode() {
    debugDiv.textContent = "Current TOTP: " + totp.generate();
  }
  updateDebugCode();
  setInterval(updateDebugCode, 1000); // updates every second

  // --- BUTTON HANDLER ---
  const unlockBtn = document.querySelector("button");
  unlockBtn.addEventListener("click", () => {
    const input = document.getElementById("codeInput").value.trim();
    const token = totp.generate();
    const resultDiv = document.getElementById("result");

    if(input === token){
      resultDiv.innerHTML = "<h3>Access Granted! Redirecting...</h3>";
      setTimeout(()=>{ window.location.href="success.html"; }, 1000);
    } else {
      resultDiv.innerHTML = "<h3>Invalid Code.</h3>";
    }
  });
});
