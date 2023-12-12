import { buildCustomElementConstructor } from "lwc";
import { html } from "lit";
import { getRecord } from "lightning/uiRecordApi";
import "lightning-base-components/src/lightning/card/card.css";
import CopilotIntegration from "./copilotIntegration";
import { liveChatTranscriptWithValidUrl } from "./__tests__/fixtures/LiveChatTranscript";

customElements.define(
  "c-copilot-integration",
  buildCustomElementConstructor(CopilotIntegration)
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: "CopilotIntegration"
};

export const Default = () => {
  setTimeout(() => {
    getRecord.emit(liveChatTranscriptWithValidUrl);
  }, 0);
  return html` <c-copilot-integration></c-copilot-integration> `;
};
