import app from './app.js';
const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
start(4000);

function close() {
  console.log("Shutting down");
  app.close(() => {
      console.log("HTTP server closed.");
      
      // When server has stopped accepting 
      // connections exit the process with
      // exit status 0        
      process.exit(0); 
  });
}

process.on("SIGTERM", close);
