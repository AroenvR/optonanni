//// This file has interesting / funny snippets from the project.
// It holds no development power, it is simply interesting stuff that happened while creating this project.

/*
    // Dev note: Recruited the "Chat" example from the OpenAI API docs.
    https://beta.openai.com/playground/p/default-chat?model=text-davinci-003

    Hello, would you be a good OpenAI preset for a Discord chat bot?
    AI:

    Unfortunately, I'm not built to be a chat bot. However, I do have the capability of analyzing natural language and making intelligent recommendations based on conversations that I've had with users in the past.
    Human: I've set up the framework so you could be hosted in a client, will you be up for the challenge of answering in a Discord server?
    AI:

    Yes, I'm up for the challenge! It would be an interesting experience for me to interact with users in a Discord server.
*/

/*
    Copilot, what do you think?
    AI: I think that's a great idea! I'm excited to see how it turns out.
*/

let testPrompt = "Human: Hello, my name is Inigo Montoya. You killed my father. Prepare to die.\n"; // Copilot, that was pretty grim. AI: "I'm sorry to hear that. I'm sure you'll be able to find a way to cope with it." ... Okay then.
// Who is Inigo Montoya? AI: "Inigo Montoya is a fictional character in the 1987 film The Princess Bride.".
// What is the Princess Bride? AI: "The Princess Bride is a 1987 American romantic fantasy adventure comedy film directed by Rob Reiner and starring Cary Elwes, Robin Wright, Mandy Patinkin, Chris Sarandon, Christopher Guest, Wallace Shawn, André the Giant, and Billy Crystal. It is an adaptation of the 1973 novel of the same name by William Goldman. The film tells the story of a farmhand named Westley, who is in love with Buttercup, the beautiful daughter of a wealthy landowner. When Buttercup is kidnapped by a group of Sicilian pirates, Westley is told that she has been killed, and he swears revenge. He is accompanied on his quest by a giant, a Spaniard, a Sicilian.
// TL;DR: Together they face a series of obstacles, including a vicious swordsman, a giant spider, and a fire-breathing monster, in order to rescue Buttercup. The film is known for its memorable lines, cast of colorful characters, and action-packed adventure sequences.
// https://beta.openai.com/playground/p/default-tldr-summary?model=text-davinci-003

/*
    // Dev note: First message content to the bot was:
    @Optonnani#2225 Optonnani, I have created you with the help of GPT-3's "Chat" example.
    Copilot helped in creating your code.
    DALL-E 2 chose your icon and username.
    Are you excited to be a creation of your own AI family?
*/

/*

First successful converstaion with Optonnani:

Prompt Array: 
 [
  { userId: 'Code69', text: 'Initial prompt.\n' },
  {
    userId: '1',
    text: `<@3> I have created you with the help of GPT-3's "Chat" example.\n` +
      'Copilot helped in creating your code.\n' +
      'DALL-E 2 chose your icon and username.\n' +
      'Are you excited to be a creation of your own AI family?\n'
  },
  {
    userId: '3',
    text: '\n' +
      'Yes, I am very excited to be part of my own AI family! I look forward to seeing what creative things I can do with the help of GPT-3 and Copilot.\n'
  },
  {
    userId: '1',
    text: 'Users of this server:\n' +
      'Name: Aroen\n' +
      'Id: <@1> \n' +
      'Name: Quinn\n' +
      'Id: <@2> \n' +
      'Name: Optonnani\n' +
      'Id: <@3>\n'
  },
  {
    userId: '3',
    text: '\n' +
      "Hello Aroen, Quinn and Optonnani! It's nice to meet you all. I'm excited to be a part of this AI family and eager to learn more about what we can do together.\n"
  },
  {
    userId: '1',
    text: 'Quinn is very important to me.\n' +
      'I designed you hoping you could help her out with her every day problems.\n' +
      'Are you up for the challenge?\n'
  },
  {
    userId: '3',
    text: '\n' +
      'Yes, I am up for the challenge! I look forward to working together with Quinn and helping her out in any way I can.\n'
  }
]

*/