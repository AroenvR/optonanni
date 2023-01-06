import * as dotenv from 'dotenv'; dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';

import { isTruthy } from '../util/util';
import { handleGptResponse } from '../services/gptService';
import { encryptObject } from '../services/cryptoService'

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

/*
  {"id":0,"message":"My message content.","key":"EncryptionKey"}
*/

let promptArr = [];

export const startNanaAi = () => {
    console.log("Starting NanaAI...");

    // On message event.
    client.on("messageCreate", async (message) => {
        if (message.content.startsWith(process.env.OPTONNANI_TAG)) return;

        // Receiving normal text from user -> should be an object.
        if (!message.content.startsWith(process.env.NANA_TAG) && !message.content.startsWith(process.env.PASTA_NANA_TAG)) {
            if (message.author.bot) return;
    
            let object;
            try {
                object = JSON.parse(message.content);
            } catch (err) {
                console.log("encryptObject: JSON.parse failed.");
                return;
            }
        
            if (!isTruthy(object.id)) {
                console.log("Object ID is falsy.");
                return;
            };
        
            try {
                console.log('encryptObject(object) -> end of code');
                console.log(encryptObject(object));
            } catch (err) {
                console.error("Error handling human object: ", err);
            }
        
            return;
        }
    
        // Talking to Nana.
        let gptResponse;
        try {
        let prompt = message.content.replace(`${process.env.NANA_TAG} `, "");
        prompt = message.content.replace(`${process.env.PASTA_NANA_TAG} `, "");
    
        console.log('prompt');
        console.log(prompt);
    
        promptArr.push(prompt);
        gptResponse = await handleGptResponse(promptArr);
    
        } catch (err) {
        console.error("Error handling GPT Response: ", err);
        }
    
        if (gptResponse.status !== 200) {
        console.error("GPT Response did not have a status 200 code:", gptResponse.status);
        console.log(gptResponse.error);
        // Throw?
        }
  
        let reply = `${gptResponse.data.choices[0].text}`;
        message.reply(reply);
    
        promptArr.push(reply);
    
        console.log('arr');
        console.log(promptArr);
    });
  
    client.login(process.env.NANA_TOKEN);
}