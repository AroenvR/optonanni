require('dotenv').config();
let CryptoJS = require("crypto-js");

// Discord client setup.
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// OpenAI setup.
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Gotta set up importing but I'm too lazy
/**
 * Checks if the given data or object is truthy. https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 * @param data The data, object or array to check.
 * @returns true if TRUTHY and false if FALSY.
 */
const isTruthy = (data) => {
  // Checking for falsy objects. https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  if (data && Object.getOwnPropertyNames(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) return false;

  if (Array.isArray(data)) {
      if (data.length === 0) return false;

      for (const foo of data) {
          if (isTruthy(foo)) return true;
      }

      // 'data' is an array but all elements are falsy.
      return false;
  }

  if (typeof(data) === 'string' && data.length === 0) return false;

  if (typeof(data) === 'undefined' || data === null) return false;

  if (data === 0) return true;

  if (!data) return false;

  return true;
}

const handleGptResponse = async (prompt) => {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    // stop: ["Human:", "AI:"],
  });
}

let promptArr = [{
  userId: "Code69",
  text: "Initial prompt. We are in a Discord Server. The users in the server are two humans by the name Aroen and Quinn as well as one AI ChatBot by the name Optonanni! Optonanni has agreed to help Quinn with her every day struggles.",
  // Due to security reasons I cannot add the proof of this agreement. I do, however, own the conversation in the interacive_index files with real Discord User Id's.
}];

// On message event.
client.on("messageCreate", async (message) => {
  // Ensure the bot doesn't reply to itself.
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.OPTONANNI_TAG)) return;
  
  if (isTruthy(message.content)) {
    promptArr.push({
      userId: message.author.username + "_" + CryptoJS.SHA256(message.author.id),
      text: `${message.content}\n`,
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
    userId: `Optonanni_${CryptoJS.SHA256(process.env.OPTONANNI_TAG)}`,
    text: reply + "\n",
  });

  message.reply(reply);

  console.log("Prompt Array: \n", promptArr);
});

client.login(process.env.BOT_TOKEN);

