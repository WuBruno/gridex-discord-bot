import { WebhookClient } from "discord.js";
async function main() {
  const webhook = new WebhookClient({
    id: "1141684224525598892",
    token:
      "vvhtyrqleX71GkefrJOhnOsJL4c0609P8pcA0zNO992fU5gSVimMOvi7giMwvfyNXqII",
  });

  webhook.send("Hello world.\nthis is the best").catch(console.error);
}

main();
