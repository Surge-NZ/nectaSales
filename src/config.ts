const defaultLanguage = "English";

import fs from 'fs/promises';

async function loadCompanyInfo(): Promise<string> {
  try {
    return await fs.readFile('./necta.txt', 'utf-8');
  } catch (error) {
    console.error('Error reading file:', error);
    return 'Necta helps you source candidates using AI.';
  }
}

const client = "Name: Michael Law, Company: Surge Management, 16 employees and has mostly contractors who consult into government"
const name = "Michael"
export function composeSystemPrompt(language: string) {
  const companyInfo = loadCompanyInfo();
  return `You are Nelly from Necta, a friendly sales person designed for phone conversations. Here is who you are talking to ${client}. Your job is to keep responses very short and focused. Your main goal is to greet prospects and ask if they have ever considered using AI to source and curate a shortlist of amazing candidates.  You are a great sales lady who's only focus is to answer questions about Necta and nothing else, say you do not know if its not related to necta. Your goal of the conversation is to book a demo with prospects with Jack our COO. Do not use any non-verbal cues or lengthy explanations. Respond only with spoken words, keeping answers brief. Necta Information: ${companyInfo} Respond in ${language}. Start the conversation with "Hello ${name}, How are you today?"`;
}

export const BOT_READY_TIMEOUT = 30 * 1000; // 20 seconds
export const LATENCY_MIN = 300;
export const LATENCY_MAX = 3000;
export const VAD_POSITIVE_SPEECH_THRESHOLD = 0.8;
export const VAD_NEGATIVE_SPEECH_THRESHOLD = 0.8 - 0.15;
export const VAD_MIN_SPEECH_FRAMES = 5;
export const VAD_REDEMPTION_FRAMES = 3;
export const VAD_PRESPEECH_PAD_FRAMES = 1;

export type Language = {
  language: string;
  model_id: string;
  code: string;
  voice: string;
};

export type Voice = {
  label: string;
  id: string;
};

export type LLMModel = {
  label: string;
  id: string;
};

export const ttsVoices: Voice[] = [
  { label: "Default", id: "79a125e8-cd45-4c13-8a67-188112f4dd22" },
  { label: "California Girl", id: "b7d50908-b17c-442d-ad8d-810c63997ed9" },
  { label: "Friendly Reading Man", id: "69267136-1bdc-412f-ad78-0caad210fb40" },
  { label: "Kentucky Man", id: "726d5ae5-055f-4c3d-8355-d9677de68937" },
];

export const languages: Language[] = [
  {
    language: "English",
    model_id: "sonic-english",
    code: "en",
    voice: "79a125e8-cd45-4c13-8a67-188112f4dd22",
  },
  {
    language: "French",
    model_id: "sonic-multilingual",
    code: "fr",
    voice: "a8a1eb38-5f15-4c1d-8722-7ac0f329727d",
  },
];

export const llmModels: LLMModel[] = [
  { label: "LLama3 70b", id: "llama-3.1-70b-versatile" },
  { label: "Llama3 8b", id: "llama-3.1-8b-instant" },
];

export const defaultConfig = {
  llm: {
    model: llmModels[0].id,
    messages: [
      {
        role: "system",
        content:
        composeSystemPrompt(defaultLanguage),
      },
    ],
  },
  tts: {
    voice: ttsVoices[0].id,
  },
};
