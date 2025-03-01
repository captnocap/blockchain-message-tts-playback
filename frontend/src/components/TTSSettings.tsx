import React, { useEffect, useState } from "react";

const TTSSettings: React.FC<{ onSettingsChange: (settings: any) => void }> = ({
  onSettingsChange,
}) => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/zonos-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  if (!settings) return <p>Loading TTS settings...</p>;

  return (
    <div>
      <h2>Customize Your TTS Message</h2>
      <label>Pitch:</label>
      <input
        type="range"
        min="0"
        max="300"
        defaultValue={settings[14]}
        onChange={(e) => onSettingsChange({ pitch_std: e.target.value })}
      />

      <label>Speaking Rate:</label>
      <input
        type="range"
        min="1"
        max="50"
        defaultValue={settings[15]}
        onChange={(e) => onSettingsChange({ speaking_rate: e.target.value })}
      />

      <label>Voice Model:</label>
      <select
        defaultValue={settings[0]}
        onChange={(e) => onSettingsChange({ model_choice: e.target.value })}
      >
        <option value="Zyphra/Zonos-v0.1-transformer">Transformer</option>
        <option value="Zyphra/Zonos-v0.1-hybrid">Hybrid</option>
      </select>
    </div>
  );
};

export default TTSSettings;
