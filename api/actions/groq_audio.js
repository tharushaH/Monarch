import { api } from "gadget-server";
import Groq from "groq-sdk";
import fs from "fs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const schema = {
  $defs: {
    Task: {
      properties: {
        title: { title: "Title", type: "string" },
        description: { title: "Description", type: "string" }
      },
      required: ["title", "description"],
      title: "Task",
      type: "object",
    },
  },
  properties: {
    meeting_name: { title: "Meeting Name", type: "string" },
    tasks: {
      items: { $ref: "#/$defs/Task" },
      title: "Tasks",
      type: "array",
    },
  },
  required: ["meeting_name", "tasks"],
  title: "Meeting",
};

/** @type { ActionRun } */
export const run = async ({ params }) => {
  try {
    console.log(params);
    const af = params.audio;
    const transcription = await getGroqAudioTranscription(af);
    const meeting = await getGroqChatCompletion(transcription);
    await saveMeeting(meeting);
    return meeting;
  } catch (error) {
    console.error('Error parsing the audio file:', error);
    throw error;
  }
};

/**  @type { ActionSucess } */
export const onSuccess = async ({ params, logger}) => {
  logger.info({ params }, "transcript sucessfully analyzed!")
};

export async function getGroqAudioTranscription(af) {
  return groq.audio.transcriptions.create({
    file: fs.createReadStream("/gadget/app/api/actions/c0392df91f0112539d18536660d3e427.mp3"),
    model: "whisper-large-v3-turbo",
    prompt: "Given an audio recording of a meeting, transcribe the conversation and create tasks.",
    response_format: "text"
  });
}

class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

class Meeting {
  constructor(meeting_name, tasks) {
    this.meeting_name = meeting_name;
    this.tasks = tasks;
  }
}

export async function getGroqChatCompletion(text) {
  const jsonSchema = JSON.stringify(schema, null, 4);
  const chat_completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a meeting assistant that will analyze meeting transcripts and output all the tasks/issues identified from the meeting. \n The JSON object must use the schema: ${jsonSchema}`
      },
      {
        role: "user",
        content: `Analyze the following transcript of a daily scrum meeting and extract key tasks or issues discussed. For each task, provide: \n1. A brief title for the task.
  \n2. A description of the work needed for the task. Transcript: ${text}`,
      },
    ],
    model: "llama-3.2-90b-vision-preview",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });
  return Object.assign(
    new Meeting(),
    JSON.parse(chat_completion.choices[0].message.content),
  );
}

async function saveMeeting(meetingData) {
  try {
    const createdMeeting = await api.meeting.create({
      dateTime: new Date(),
      meetingName: meetingData.meeting_name,
    });

    for (const task of meetingData.tasks) {
      await api.task.create({
        description: task.description,
        meeting: { _link: createdMeeting.id }, 
        title: task.title,
      });
    }

    console.log("Meeting and tasks saved successfully!");
  } catch (error) {
    console.error("Error saving meeting or tasks:", error);
  }
}