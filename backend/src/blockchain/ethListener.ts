import Web3 from "web3";
import config from "../config";
import { generateAudio } from "../services/ttsService";
import { addToQueue } from "../services/queueService";

// Initialize Web3 with Ethereum node
const web3 = new Web3(config.ethNodeUrl);
const contract = new web3.eth.Contract(
  config.contractAbi,
  config.contractAddress
);

// Listen for NewMessage events from the smart contract
contract.events
  .NewMessage({})
  .on("data", async (event) => {
    const message = event.returnValues.message as string;
    try {
      console.log(`New message received: ${message}`);
      const audioPath = await generateAudio(message);
      addToQueue(audioPath);
      console.log(`Audio generated and queued: ${audioPath}`);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  })
  .on("error", (error: Error) => {
    console.error("Blockchain listener error:", error);
  });
