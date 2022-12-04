import * as dotenv from 'dotenv'; dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

/**
 * Checks if the given data or object is truthy. https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 * @param data The data, object or array to check.
 * @returns true if TRUTHY and false if FALSY.
 */
export const isTruthy = (data) => {
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

/**
 * TODO: Create format.
 * Sends a message to OpenAI to query an AI with.
 * @param prompt string to query the AI with.
 * @returns a response from OpenAI in "" format.
 */
export const handleGptResponse = async (prompt) => {
    console.log('prompt');
    console.log(prompt);

    let gptResponse;
    try {
        gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.9,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            // stop: ["Human:", "AI:"],
        });
    } catch (err) {
        console.error("handleGptResponse (util): Error handling GPT response: ");
        console.log(err);
        return { status: 400, error: "createCompletion failed." };
    }
    
    return gptResponse;
}