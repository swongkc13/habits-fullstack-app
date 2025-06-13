const { exec } = require("child_process");

console.log("🚀 Starting Spring Boot backend on port 8081...");
exec("cd backend && mvn spring-boot:run");

setTimeout(() => {
  console.log("🌐 Starting Vite frontend on port 5173...");
  exec("cd frontend && npm run dev");

  setTimeout(async () => {
    console.log("🔗 Opening http://localhost:5173 in browser...");
    const open = (await import('open')).default;
    open("http://localhost:5173");
  }, 3000); // Wait for frontend to warm up
}, 5000); // Wait for backend to start
