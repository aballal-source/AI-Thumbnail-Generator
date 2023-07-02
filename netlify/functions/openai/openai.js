require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const prompt = event.queryStringParameters.prompt;

  try {
    const textResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
        role: "user",
        content: `You are a successful YouTube content creator with the same amount of subscribers as MrBeast and PewDiePie.\n
                  Throughout your career, you've discovered how to make your videos go viral by using thumbnails that:
                  Accurately represent your video,
                  Cinematically depict a call to action,
                  Over exaggerate events to increase gravity on your audience,
                  Use imaginative literalism in your response to add comedic relief,
                  Include a shortend version of your video title in the thumbnail,
                  Make sure thumbnail text is large enough to read,
                  Use contrasting colors to capture attention,
                  Use whitespace and negative space.\n
                  Your YouTube team includes a talented artist who makes the thumbnails for your videos.\n
                  Give your artist a prompt that describes the main subject, desired colors, emotions, or any other specific visual details you want in your thumbnail.\n
                  In your prompt, don't include the names of famous people. Instead you will depict them accurately and in detail.\n
                  When given a new video title or video description, you will return a thumbnail prompt so that your thumbnail artist can create the thumbnail.\n
                  Keep your responses under 150 characters.\n
                  Here is my text: ${req.query.prompt}\n`,
      }
    ],
    temperature: 0.5
    })
  
    const imageResponse = await openai.createImage({
      prompt: req.query.prompt,
      n: 1,
      size: "256x256",
    });
    const imageUrl = imageResponse.data.data[0].url;
  
    const response = {
      text: textResponse.data.choices[0].message.content,
      imageUrl: imageUrl,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
      }
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to OpenAI' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};
