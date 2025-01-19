import Groq from "groq-sdk";
import { api } from "gadget-server";

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

const text1 = `Alice: Good morning, everyone. Let’s get started with this week’s sync. First, let’s review updates from each team. Bob, can you start with hardware?

Bob: Sure, Alice. The new chip design is on schedule. We’ve addressed the thermal issues identified during the last testing phase. The updated layout reduces heat generation by about 15%, and the prototype will be ready next week.

Alice: Great work, Bob. Carol, how about software?

Carol: Thanks, Alice. The SDK updates are progressing well. We’ve implemented additional support for parallel processing optimizations, and the new API documentation is being reviewed by the tech writers.

Alice: Excellent. Dave, any updates from product?

Dave: Yes, the market feedback from our early access program has been very positive. We’re seeing significant interest in the healthcare and finance sectors. I’ll be refining the roadmap based on this input.

Alice: Sounds promising. Emily, what’s happening on the AI research side?

Emily: We’ve been exploring applications of low-precision compute for large language models. Initial experiments show a 20% improvement in throughput without significant accuracy loss.

Alice: Impressive, Emily. Let’s aim to include that in next quarter’s presentations. Any blockers or risks we should discuss?

Bob: No blockers from my end.

Carol: Same here.

Dave: Just a heads-up that we might need to adjust the timeline for the next product demo based on some feedback sessions scheduled for later this month.

Alice: Noted, Dave. Let’s monitor that and regroup next week. Thanks, everyone. Meeting adjourned.`

/** @type { import("gadget-server").ActionOptions } */
export const options = {
  variableTypes: {
    txt: {
      type: "String",
      required: true
    }
  }
};

/** @type { ActionRun } */
export const run = async ({ params }) => {
  try {
    console.log('params:', params);
    const meeting = await getGroqChatCompletion(params.text);
    await saveMeeting(meeting);
    console.log("meeting:", meeting);
    return meeting;
  } catch (error) {
    console.error('Error reading the file:', error)
    throw error;
  }
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, logger }) => {
  console.log('params2:', params);
  logger.info({ params }, "post successfully created!");
};

export async function getGroqChatCompletion(text) {
  const jsonSchema = JSON.stringify(schema, null, 4);
  console.log(text1);
  const chat_completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a meeting assistant that will analyze meeting transcripts and output all the tasks/issues identified from the meeting. \n The JSON object must use the schema: ${jsonSchema}`
      },
      {
        role: "user",
        content: `Analyze the following transcript of a daily scrum meeting and extract key tasks or issues discussed. Generate a descriptive, short title for the meeting. For each task, provide: \n1. A brief title for the task.
  \n2. A description of the work needed. The description can be upto a paragraph in length. ${text1}`,
      },
    ],
    model: "llama-3.2-90b-vision-preview",
    temperature: 1,
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
    console.log('meetingData', meetingData);
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