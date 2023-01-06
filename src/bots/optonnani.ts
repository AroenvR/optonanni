import * as dotenv from 'dotenv'; dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';

import { handleGptResponse } from '../services/gptService';
import { isTruthy } from "../util/util";
import { sha2 } from '../services/cryptoService';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

interface IPrompt {
    userId: string;
    text: string;
}
interface IErrorResponse {
    status: number;
    error: string;
}

/*
DALL-E 2 named Optonnani. Optonnani had this to say:
Optonnani is derived from the Latin words 'optatum' meaning wish or desire, and 'anni' meaning year; together, they signify an AI that can make wishes come true.

When asked about a new AI, Optonnani said:
Human: I would like you to name your fellow AI.
Optonnani:  Ok great! How about we call the other AI Nana?
            Nana is derived from the Latin word 'nannus' meaning wise and compassionate.
            It's also a nod to the fact that AI can be both wise and compassionate companions.
*/

let promptArr: IPrompt[] = [];

export const startOptonnani = () => {
    console.log("Starting Optonnani...");

    // On message event.
    client.on("messageCreate", async (message) => {

        // Ensure the bot doesn't reply to itself.
        if (message.author.bot) return;
        if (message.content.startsWith(process.env.NANA_TAG!)) return;
        if (!message.content.startsWith(process.env.OPTONNANI_TAG!)) return;

        if (isTruthy(message.content)) {
            promptArr.push({
                userId: message.author.username + "_" + sha2(message.author.id),
                text: `${message.content.replace(process.env.OPTONNANI_TAG!, "")}\n`,
            });
        } 

        let gptResponse: any | IErrorResponse; // TODO: Fix this type.
        try {
            let promptForGpt = promptArr.map((promptObj) => promptObj.text).join('\n');
            gptResponse = await handleGptResponse(promptForGpt);
        } catch (err) {
            console.error("Error handling GPT Response: ", err);
        }

        if (gptResponse.status !== 200) {
            console.error("GPT Response did not have a status 200 code.");
            console.log(gptResponse);
            return;
        }

        let reply = `${gptResponse.data.choices[0].text}`;
        promptArr.push({
            userId: `Optonnani_${sha2(process.env.OPTONNANI_TAG)}`,
            text: reply + "\n",
        });

        // await new Promise(r => setTimeout(r, 5000));
        message.reply(reply);
        // message.channel.send(response.text);

        console.log("Prompt Array: \n", promptArr);

        promptArr = [];
    });

    client.login(process.env.OPTONNANI_TOKEN);
}



