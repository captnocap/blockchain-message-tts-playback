import express from "express";
import axios from "axios";

const router = express.Router();
const ZONOS_API_URL = "http://localhost:7860/update_ui";

router.get("/zonos-settings", async (req, res) => {
  try {
    const response = await axios.get(ZONOS_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Zonos settings:", error);
    res.status(500).json({ error: "Failed to fetch settings from Zonos." });
  }
});

export default router;
