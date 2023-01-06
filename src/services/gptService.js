import * as dotenv from 'dotenv'; dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

/**
 * Sends a message to OpenAI to query an AI with.
 * @param prompt string to query the AI with.
 * @returns a response from OpenAI in "" format.
 */
export const handleGptResponse = async (prompt) => {
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
        });
    } catch (err) {
        // console.error("handleGptResponse (util): Error handling GPT response -> ", err);
        return handleGptResponseError(err);
    }
    
    return gptResponse;
}

const handleGptResponseError = (err) => {
    // Check for different types of errors and return appropriate status codes and messages
    switch (err.constructor) {
        case openai.errors.ForbiddenError:
          return { status: 403, error: "Forbidden: Incorrect API key or insufficient permissions." };

        case openai.errors.BadRequestError:
          return { status: 400, error: "Bad request: Invalid input parameters or invalid request format." };

        case openai.errors.TooManyRequestsError:
          return { status: 429, error: "Too many requests: Rate limit exceeded." };

        case openai.errors.InternalServerError:
          return { status: 500, error: "Internal server error: An unexpected error occurred on the server." };

        default:
          return { status: 500, error: "Unknown error." };
    }
}

/*

export const handleGptResponse = async (prompt) => {
    let gptResponse;
    try {
        gptResponse = await openai.createCompletion({
            model: "davinci",  // Use a different model here
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.9,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });
    } catch (err) {
        console.error("handleGptResponse (util): Error handling GPT response -> ", err);

        if (isTruthy(err.response)) return { statusCode: err.response.status, error: err.response.statusText };
        return { statusCode: 500, error: "Unknown error." };
    }
    
    return gptResponse;
}

Here are a few guidelines for choosing a temperature setting:
If you want the model to generate responses that are more diverse and creative, 
you can try using a higher temperature, such as 0.9 or 1.0. 
This can be useful for tasks where you want the model to generate a wide range of possible responses, 
rather than just the most likely or predictable ones.

If you want the model to generate responses that are more faithful to the training data and less prone to errors or inconsistencies,
you can try using a lower temperature, such as 0.5 or 0.7.
This can be useful for tasks where you want the model to produce responses that are more reliable and accurate,
such as answering factual questions or providing information.

*/


/*

Suppose we have the following prompt: "The quick brown fox jumps over the lazy dog."

If we set top_p to a value of 1 (the default value), the model will consider the entire distribution of possible next words when generating the next token. This might result in the model generating a wide range of possible next words, such as "ran," "leaped," "hopped," etc.

However, if we set top_p to a value of 0.9, the model will only consider the top 90% of the distribution when generating the next token. This might result in the model generating more predictable and deterministic output, such as "jumped" or "leaped."

Here is an example of how presence_penalty can be used to control the coherence of the model's output:

Suppose we have the following prompt: "The quick brown fox jumps over the lazy dog."

If we set presence_penalty to a value of 0 (the default value), the model will not be penalized for generating words that were not present in the original prompt. This might result in the model generating a wide range of possible next words, even if they are not necessarily coherent or consistent with the original prompt.

However, if we set presence_penalty to a value of 0.6, the model will be penalized for generating words that were not present in the original prompt. This might result in the model generating output that is more coherent and consistent with the original prompt, as it will be less likely to generate words that do not fit in with the overall theme or context of the prompt.

*/