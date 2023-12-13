import { buildCustomElementConstructor } from "lwc";
import { html } from "lit";
import { getRecord } from "lightning/uiRecordApi";
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
  return html`<c-copilot-integration></c-copilot-integration>`;
};

export const InLayout = () => {
  setTimeout(() => {
    getRecord.emit(liveChatTranscriptWithValidUrl);
  }, 0);
  return html` <style>
      .wrapper {
        background: url("/lightning_blue_background.png") top center repeat-x
          rgb(176, 196, 223);
        padding: 10px;
      }
      .columns {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
      .left {
        flex: 1 1 calc(60% - 20px);
      }
      .right {
        flex: 1 0 40%;
      }
      .spacer {
        display: block;
        margin: 10px;
        background: red;
      }
      .container {
        width: 100%;
        background: white;
        border: 1px solid rgb(201, 201, 201);
        border-radius: 4px;
        padding: 10px;
      }
      .container.large {
        height: 1110px;
      }
      .container.small {
        height: 100px;
      }
      .flex-centered {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .chat-icon {
        display: inline-block;
        background: url("/live_chat_120.png") center center no-repeat #ff5d2d;
        background-size: 100% auto;
        width: 2rem;
        height: 2rem;
      }
      .placeholder {
        background: url("/chat_loading.gif") top left repeat-y white;
      }
      h1 {
        font-size: 20px;
        font-weight: 700;
      }
    </style>
    <div class="wrapper">
      <div class="container">
        <div class="flex-centered">
          <span class="chat-icon"></span>
          <h1>${liveChatTranscriptWithValidUrl.id}</h1>
        </div>
      </div>
      <span class="spacer"></span>
      <div class="columns">
        <div class="left">
          <div class="container large placeholder"></div>
        </div>
        <div class="right">
          <c-copilot-integration></c-copilot-integration>
          <span class="spacer"></span>
          <div class="container small placeholder"></div>
        </div>
      </div>
    </div>`;
};
