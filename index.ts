import { ethers, formatEther, formatUnits } from "ethers";
import { GridAbi } from "./abi/Grid";
import { WebhookClient } from "discord.js";
import "dotenv/config";

const GRID = "0x4A1a52316bFb5B14d08c13426943f0F94dfFc282";

if (!process.env.DISCORD_ID) {
  console.error("DISCORD_ID not found");
}
if (!process.env.DISCORD_TOKEN) {
  console.error("TOKEN_ID not found");
}
if (!process.env.PROVIDER_API_KEY) {
  console.error("PROVIDER_API_KEY not found");
}

async function main() {
  const webhook = new WebhookClient({
    id: process.env.DISCORD_ID,
    token: process.env.DISCORD_TOKEN,
  });

  const provider = new ethers.WebSocketProvider(
    `wss://linea-mainnet.infura.io/ws/v3/${process.env.PROVIDER_API_KEY}`
  );

  const Grid = new ethers.Contract(GRID, GridAbi, provider);

  console.log("Start listening");
  await Grid.on(
    "Swap",
    (swapRouter, recipient, usdcAmount, gdxAmount, priceX96, boundary) => {
      webhook.send(
        `Swap carried out on GDX/USDC: ${formatUnits(
          usdcAmount,
          6
        )} USDC, ${Number(formatEther(gdxAmount)).toFixed(2)}`
      );
      console.log(
        "Event received",
        recipient,
        usdcAmount,
        gdxAmount,
        priceX96,
        boundary
      );
    }
  );
}

main();
