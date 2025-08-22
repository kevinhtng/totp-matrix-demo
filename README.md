# TOTP Matrix Demo

**Repo Name:** `totp-matrix-demo`  
**Demo:** Matrix-themed locked page with dynamic QR code and TOTP authentication.

## Description
This project demonstrates a **time-based one-time password (TOTP)** authentication system with a fun "Matrix" style interface. Users scan a dynamically generated QR code with Google Authenticator and enter the 6-digit code to unlock the page.

The background features a real-time Matrix-style code rain animation, fully implemented with HTML, CSS, and JavaScript. The project is **static**, making it ideal for GitHub Pages.

## Features
- Dynamic QR code generation for TOTP setup
- Real-time Matrix animation background
- Client-side verification of TOTP codes
- Fully static — no backend required
- Demonstrates understanding of multi-factor authentication concepts

## How It Works
1. The page and your Google Authenticator app share a **secret key**.
2. Google Authenticator uses the secret + current time to generate a 6-digit code every 30 seconds.
3. When you submit the code, the page independently generates the expected code using the same secret and verifies it.
4. If codes match, access is granted.
5. The QR code encodes the secret, simplifying setup in Authenticator.

## Technologies Used
- HTML, CSS, JavaScript
- [otplib](https://www.npmjs.com/package/otplib) (for TOTP generation)
- [qrcode.js](https://www.npmjs.com/package/qrcode) (for QR code generation)
- Hosted on GitHub Pages

## AI Assistance
This project was developed **with guidance from OpenAI's ChatGPT**, which helped structure the project, generate code snippets, and create a polished Matrix-style interface. Demonstrates the ability to **leverage AI to accelerate development**.

## Usage
1. Clone or fork the repository.
2. Open `index.html` on GitHub Pages or locally.
3. Scan the QR code using Google Authenticator.
4. Enter the current 6-digit code to unlock the page.

