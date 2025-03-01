import React, { useState } from "react";
import TTSSettings from "./TTSSettings";

const DonationForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const donationData = {
      message,
      settings, // Include the user's chosen TTS settings
    };

    const response = await fetch("/submit-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    });

    if (response.ok) {
      alert("Donation sent successfully!");
    } else {
      alert("Failed to send donation.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TTSSettings onSettingsChange={setSettings} />
      <label>Message:</label>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit">Donate & Send Message</button>
    </form>
  );
};

export default DonationForm;
