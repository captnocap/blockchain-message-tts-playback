import express, { Request, Response } from "express";
import { processTTS } from "../services/ttsService";

const router = express.Router();

router.post("/submit-donation", async (req: Request, res: Response) => {
router.post("/submit-donation", async (req: express.Request, res: express.Response) => {

  if (!message) return res.status(400).json({ error: "Message is required." });

  try {
    const audioFile = await processTTS(message, settings);
    res.json({ status: "Success", audioFile });
  } catch (error) {
    res.status(500).json({ error: "Failed to process donation." });
  }
});

export default router;
