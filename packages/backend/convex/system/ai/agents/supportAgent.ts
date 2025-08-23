import { google } from '@ai-sdk/google';
import { Agent } from '@convex-dev/agent';
import { components } from '../../../_generated/api';
import { SUPPORT_AGENT_PROMPT } from '../constant';

export const supportAgent = new Agent(components.agent, {
    chat: google("gemini-2.5-flash"),
    instructions: SUPPORT_AGENT_PROMPT,
})