import Groq from "groq-sdk";
import fs from 'fs';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to encode the image
function encodeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Path to your image
const imagePath = 'api/actions/IMG_8976.jpg';

// Getting the base64 string
const base64Image = encodeImage(imagePath);

/** @type {ActionRun} */
export const run = async ({}) => {
    const image = await getGroqChatCompletion();
    console.log(image);
    return image;
}

const schema = {
  Task: {
    properties: {
      title: { title: "Title", type: "string" },
      description: { title: "Description", type: "string" }
    },
    required: ["title", "description"],
    title: "Task",
    type: "object",
  },
};

class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}



export async function getGroqChatCompletion() {
  const jsonSchema = JSON.stringify(schema, null, 4);
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `You are a task management assistant. Your goal is to analyze a imagae of a meeting whiteboard and extract one actionable tasks with relevant details. The output should follow the structure of a Jira task should have Title and Description. Should follow the schema of the JSON object schema: ${jsonSchema}.`
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/jpeg;base64,${base64Image}`,
            }
          }
        ]
      }
    ],
    "model": "llama-3.2-11b-vision-preview",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null,
    response_format: { type: "json_object" },
  });

  return Object.assign(
    new Task(),
    JSON.parse(chatCompletion.choices[0].message.content),
  );
}