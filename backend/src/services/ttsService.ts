import { Client } from "@gradio/client";
import fs from "fs";
import path from "path";
import config from "../config";
import axios from "axios";

export async function generateAudio(text: string): Promise<string> {
  try {
    // Connect to the Gradio app
    const client = await Client.connect(config.gradioUrl);

    // Read the default speaker audio file as a Blob
    const speakerAudioBuffer = fs.readFileSync(config.defaultSpeakerAudio);
    const speakerAudioBlob = new Blob([speakerAudioBuffer], {
      type: "audio/wav",
    });

    // Call the /generate_audio endpoint
    const result = await client.predict("/generate_audio", {
      model_choice: "Zyphra/Zonos-v0.1-transformer",
      text: text,
      language: "en-us",
      speaker_audio: speakerAudioBlob,
      prefix_audio: null, // No prefix audio for simplicity
      e1: 1, // Happiness
      e2: 0.05, // Sadness
      e3: 0.05, // Disgust
      e4: 0.05, // Fear
      e5: 0.05, // Surprise
      e6: 0.05, // Anger
      e7: 0.1, // Other
      e8: 0.2, // Neutral
      vq_single: 0.78, // VQ Score
      fmax: 24000, // Fmax (Hz)
      pitch_std: 45, // Pitch Std
      speaking_rate: 15, // Speaking Rate
      dnsmos_ovrl: 4, // DNSMOS Overall
      speaker_noised: false, // Denoise Speaker
      cfg_scale: 2, // CFG Scale
      top_p: 0, // Top P
      top_k: 0, // Top K
      min_p: 0, // Min P
      linear: 0.5, // Linear
      confidence: 0.4, // Confidence
      quadratic: 0, // Quadratic
      seed: 420, // Seed
      randomize_seed: true, // Randomize Seed
      unconditional_keys: ["emotion"], // Unconditional Keys
    });

    // Extract audio data (assuming base64 encoded string in result.data[0].data)
    const audioData = result.data[0];
    const audioBuffer = Buffer.from(audioData.data, "base64");
    const audioPath = path.join(__dirname, "../../audio", `${Date.now()}.wav`);

    // Ensure the audio directory exists
    fs.mkdirSync(path.dirname(audioPath), { recursive: true });
    fs.writeFileSync(audioPath, audioBuffer);

    return audioPath;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
}

export async function processTTS(
  message: string,
  settings: any
): Promise<string | null> {
  try {
    const response = await axios.post(
      "http://localhost:7860/generate_audio",
      {
        text: message,
        model_choice: settings.model_choice || "Zyphra/Zonos-v0.1-transformer",
        language: "en-us",
        pitch_std: settings.pitch_std || 50,
        speaking_rate: settings.speaking_rate || 15,
      },
      { responseType: "arraybuffer" }
    );

    const fileName = `./audio/${Date.now()}.wav`;
    fs.writeFileSync(fileName, response.data);
    return fileName;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}
