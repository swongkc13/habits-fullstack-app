const { exec } = require("child_process");
const http = require("http");

console.log("🚀 Starting ngrok tunnel to Jenkins on port 8080...");

// Start ngrok in a child terminal window
const isWin = process.platform === "win32";
const ngrokCommand = isWin
  ? 'start "" cmd /k "ngrok http 8080"'
  : 'osascript -e \'tell app "Terminal" to do script "ngrok http 8080"\'';

exec(ngrokCommand);

// Wait for ngrok to spin up, then query the tunnel API
setTimeout(() => {
  http.get("http://localhost:4040/api/tunnels", (res) => {
    let data = "";
    res.on("data", chunk => (data += chunk));
    res.on("end", () => {
      const tunnels = JSON.parse(data).tunnels;
      const publicUrl = tunnels.find(t => t.public_url.startsWith("https")).public_url;
      console.log(`🌐 Jenkins is publicly available at: ${publicUrl}`);
      console.log("👉 Update this in GitHub Webhooks if needed.");
    });
  }).on("error", () => {
    console.log("❌ Could not connect to ngrok. Is it running?");
  });
}, 6000);
