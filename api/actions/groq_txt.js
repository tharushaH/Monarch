import Groq from "groq-sdk";

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

const input = `Facilitator: Good morning, everyone! Let’s begin the daily stand-up. As usual, let’s go through what you worked on yesterday, what you’re planning to work on today, and any blockers you have. Let’s start with you, Sarah.

Sarah (Frontend Developer): Thanks. Yesterday, I wrapped up the user profile UI updates. I added the new accessibility improvements and tested them on Chrome and Safari. Today, I’ll be working on integrating the search filter component into the dashboard. 

Facilitator: Any blockers?

Sarah: Not at the moment. But I might need some help from the backend team if the API endpoints for search filtering aren’t fully ready.

Facilitator: Got it. Let’s check with Jack in a bit. Thanks, Sarah. Next, Jack?

Jack (Backend Developer): Sure. Yesterday, I finalized the API for the search functionality. It’s deployed to staging. Today, I’ll start working on optimizing the database queries for the analytics dashboard, but I’m waiting on some feedback from QA about the search API.

Facilitator: Thanks, Jack. QA, can you update us on this?

Rachel (QA Lead): Of course. We tested the search API yesterday. It’s working well overall, but there’s a minor issue with how it handles special characters in queries. I’ve documented it in Jira as ticket #456 and assigned it to you, Jack.

Jack: Thanks for flagging it. I’ll take a look right after the stand-up.

Facilitator: Great. Moving on, Sam?

Sam (DevOps Engineer): Yesterday, I configured the staging environment for the analytics feature and fixed a deployment pipeline issue. Today, I’ll be setting up monitoring alerts for the production cluster. No blockers for now.

Facilitator: Thanks, Sam. Last but not least, Priya?

Priya (Product Manager): Thanks. I’ve been working on updating the requirements for the upcoming sprint based on stakeholder feedback. I also added new details to the user stories in Jira, especially around the analytics feature. I noticed that ticket #401, for improving loading times, hasn’t been picked up yet. Can we prioritize that?

Facilitator: That’s a good point. Jack, Sarah, do you think you can coordinate on that once the current tasks are wrapped up?

Jack: Sure, we can discuss that.

Sarah: Agreed.

Facilitator: Perfect. Any other issues or updates? No? Alright, let’s follow up on the flagged issues after this. Have a productive day!
`;
const input2 = `Facilitator: Good morning, team! Let’s get started with the daily stand-up. Remember, we’re focusing on what you worked on yesterday, what’s on your plate today, and any roadblocks. Let’s start with you, Mia.

Mia (Frontend Developer): Thanks. Yesterday, I completed implementing the multi-step form for user registration, but there’s an issue with form validation. It seems that the backend validation rules are stricter than the ones in the frontend, and this is causing inconsistent error messages. Today, I’ll focus on syncing those rules. I might need help from the backend team to clarify the exact constraints.

Facilitator: Understood. Ethan, could you coordinate with Mia on this?

Ethan (Backend Developer): Absolutely. Speaking of which, I’ve been working on refining the API for user registration. While doing so, I realized our error handling strategy for failed requests is outdated. Right now, all errors return the same generic message, which makes it hard for users to understand what went wrong. I propose creating detailed error responses for each failure scenario. This will require both backend and frontend changes. 

Facilitator: That sounds critical. Can you create a ticket for that and discuss with Mia?

Ethan: Sure, I’ll do that after this meeting.

Facilitator: Great. Moving on, Anna?

Anna (QA Lead): Yesterday, we ran extensive tests on the new multi-step registration form. We found a bug where users are logged out if they idle too long while filling out the form. This seems related to session timeouts not being handled gracefully in the frontend. I’ve documented this as a high-priority issue in Jira. Today, I’ll focus on testing the payment processing module, but I need clarity from DevOps on how the staging environment mirrors production for payment gateways.

Facilitator: Sam, can you assist Anna with that?

Sam (DevOps Engineer): Definitely. I’ll check the environment setup right after the stand-up. On my side, I’ve been investigating a recurring deployment failure for the notification service. The pipeline occasionally hangs because of outdated dependencies in the build stage. Today, I’ll work on automating dependency checks as part of the CI pipeline and will coordinate with Ethan if additional scripts are needed.

Facilitator: Thanks, Sam. Finally, Priya?

Priya (Product Manager): Thanks. I’ve been reviewing analytics from the current sprint. One area of concern is the onboarding experience for new users. Stakeholder feedback indicates that users drop off during the registration process due to unclear instructions in the multi-step form. I’ve updated the Jira ticket with specific suggestions to make the language more user-friendly and added acceptance criteria for the changes. Also, I’d like to discuss prioritizing the timeout bug and error handling improv...

Facilitator: That’s a good call. Let’s coordinate priorities after the stand-up. Thanks, everyone. Any last updates or blockers? No? Alright, have a productive day!”
`
const input3 = `Facilitator, good morning, everyone. Let's begin the daily stand-up. As usual, let's go through what you worked on yesterday, what you're planning to work on today, and any blockers you have. Let's start with you, Sarah. Sarah, front-end developer, thanks. Yesterday, I wrapped up the user profile UI updates. I added the new accessibility improvements and tested them on Chrome and Safari. Today, I'll be working on integrating the search filter component into the dashboard. Facilitator, any blockers? Sarah, not at the moment. But I might need some help from the backend team if the API endpoints for search filtering aren't fully ready. Facilitator, got it. Let's check with Jack in a bit. Thanks, Sarah. Next, Jack? Jack, backend developer, sure. Yesterday, I finalized the API for the search functionality. It's deployed to staging. Today, I'll start working on optimizing the database queries for the analytics dashboard, but I'm waiting on some feedback from QA about the search API. Hi. Facilitator, thanks, Jack. QA, can you update us on this? Rachel QA lead of course We tested the search API yesterday It working well overall but there a minor issue with how it handles special characters in queries I documented it in Jira as ticket number 456 and assigned it to you Jack Jack, thanks for flagging it. I'll take a look right after the stand-up. Facilitator, great. Moving on, Sam. Sam, DevOps Engineer, Yesterday, I configured the staging environment for the analytics feature and fixed a deployment pipeline issue. Today, I'll be setting up monitoring alerts for the production cluster. No blockers for now. Facilitator, Thanks, Sam. Last but not least, Priya. Priya, Product Manager, Thanks. I've been working on updating the requirements for the upcoming sprint based on stakeholder feedback. I also added new details to the user stories in Jira, especially around the analytics feature. I noticed that ticket number 401, for improving loading times, hasn't been picked up yet. Can we prioritize that? Facilitator, that's a good point. Jack, Sarah, do you think you can coordinate on that once the current tasks are wrapped up? Jack, sure, we can discuss that. Sarah, agreed. Facilitator, perfect. Any other issues or updates? No? Alright, let's follow up on the flagged issues after this. Have a productive day.`

/** @type { ActionRun } */
export const run = async ({  }) => {
  const meeting = await getGroqChatCompletion();
  printMeeting(meeting);
  return meeting;
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

export async function getGroqChatCompletion() {
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
  \n2. A description of the work needed. The description can be upto a paragraph in length. ${input3}`,
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

function printMeeting(meeting) {
  console.log(`Meeting: ${meeting.meeting_name}`);
  console.log("");

  console.log("Tasks:");
  meeting.tasks.forEach((task) => {
    console.log(`- ${task.title}: ${task.description}`);
  });
}