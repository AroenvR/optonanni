// Execute file with: node optonnani
import * as dotenv from 'dotenv'; dotenv.config();
import CryptoJS from 'crypto-js';
import { Client, GatewayIntentBits } from 'discord.js';

import { isTruthy, handleGptResponse } from './util.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);


/*

I think it would be great to name the AI Optonnani.
Optonnani is derived from the Latin words 'optatum' meaning wish or desire, and 'anni' meaning year; together, they signify an AI that can make wishes come true.

I would like you to name your fellow AI.
Ok great! How about we call the other AI Nana?
Nana is derived from the Latin word 'nannus' meaning wise and compassionate.
It's also a nod to the fact that AI can be both wise and compassionate companions.

*/

// Inspirational Coaching sessions, where each session is stored for later use.
let promptArr = [
  {
    userId: "Creator69",
    text: `You are in a Discord chat room with humans. Your task is to brighten the mood with intellectual humor. When using sarcasm, it MUST be prefixed with: '/s'`,
    // text: `Your name is Optonnani. You are in a chat room with an AI named NanaAI that you designed together with a human who is also in the room. To address Optonnani you need to start your sentence with ${process.env.NANA_TAG}.`,
    // Due to security reasons I cannot add the proof of this agreement. I do, however, own the conversation in the interacive_index files with real Discord User Id's.
  }
];

// On message event.
client.on("messageCreate", async (message) => {
  // Ensure the bot doesn't reply to itself.
  // if (message.author.bot) return;
  if (!message.content.startsWith(process.env.OPTONNANI_TAG)) return;
  
  if (isTruthy(message.content)) {
    promptArr.push({
      userId: message.author.username + "_" + CryptoJS.SHA256(message.author.id),
      text: `${message.content.replace(process.env.OPTONNANI_TAG, "")}\n`,
    });
  } 
  
  let gptResponse;
  try {
    let promptForGpt = promptArr.map((promptObj) => promptObj.text).join('\n');
    gptResponse = await handleGptResponse(promptForGpt);
  } catch (err) {
    console.error("Error handling GPT Response: ", err);
  }

  if (gptResponse.status !== 200) {
    console.error("GPT Response did not have a status 200 code.");
    console.log(gptResponse);
    // Throw?
  }

  let reply = `${gptResponse.data.choices[0].text}`;
  promptArr.push({
    userId: `Optonnani_${CryptoJS.SHA256(process.env.OPTONNANI_TAG)}`,
    text: reply + "\n",
  });

  // await new Promise(r => setTimeout(r, 5000));
  message.reply(reply);

  console.log("Prompt Array: \n", promptArr);
});

client.login(process.env.OPTONNANI_TOKEN);

