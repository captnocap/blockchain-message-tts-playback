import express from "express";
import { getNextAudio } from "../services/queueService";
import path from "path";

const router = express.Router();

router.get("/next-audio", (req, res) => {
  const nextAudio = getNextAudio();
  if (nextAudio) {
    const audioUrl = `/audio/${path.basename(nextAudio)}`;
    res.json({ audioUrl });
  } else {
    res.json({ audioUrl: null });
  }
});

export default router;
