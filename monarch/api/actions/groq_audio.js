import Groq from "groq-sdk";
import fs from "fs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/** @type { ActionRun } */
export const run = async ({}) => {
  const transcription = await getGroqAudioTranscription();
  return transcription

};

/**  @type { ActionSucess } */
export const onSuccess = async ({ params, logger}) => {
  logger.info({ params }, "transcript sucessfully analyzed!")
  // send data
};

// /** @type { ActionOptions }/
// export const options = {
//   actionType: "c"
// };

export async function getGroqAudioTranscription() {
  return groq.audio.transcriptions.create({
    file: fs.createReadStream("/gadget/app/api/actions/c0392df91f0112539d18536660d3e427.mp3"),
    model: "whisper-large-v3-turbo",
    prompt: "Given an audio recording of a meeting, transcribe the conversation and create tasks.",
    response_format: "json",


  });
}