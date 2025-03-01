import express from "express";
import playbackRoutes from "./routes/playbackRoutes";
import "./blockchain/ethListener"; // Import to start the listener

const app = express();

// Serve audio files statically from the audio/ directory
app.use("/audio", express.static("audio"));
app.use("/playback", playbackRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
