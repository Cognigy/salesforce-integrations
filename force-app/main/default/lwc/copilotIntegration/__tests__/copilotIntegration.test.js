import { createElement } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { setImmediate } from "timers";
import CopilotIntegration from "c/copilotIntegration";
import {
  liveChatTranscriptWithValidUrl,
  liveChatTranscriptWithoutUrl,
  liveChatTranscriptWithInvalidUrl
} from "./fixtures/LiveChatTranscript";

// Helper function to wait until the microtask queue is empty.
async function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("c-copilot-integration", () => {
  it("renders an iframe with correct url", async () => {
    // Arrange
    const element = createElement("c-copilot-integration", {
      is: CopilotIntegration
    });
    document.body.appendChild(element);

    // Act
    getRecord.emit(liveChatTranscriptWithValidUrl);

    // Wait for any asynchronous DOM updates
    await flushPromises();

    // Assert
    const iframe = element.shadowRoot.querySelector("iframe");

    expect(iframe).toBeInstanceOf(HTMLIFrameElement);
    expect(iframe.src).toBe(
      liveChatTranscriptWithValidUrl.fields.Copilot__c.value
    );
  });

  it("nothing if only the Copilot__c field is missing", async () => {
    // Arrange
    const element = createElement("c-copilot-integration", {
      is: CopilotIntegration
    });
    document.body.appendChild(element);

    // Act
    getRecord.emit(liveChatTranscriptWithoutUrl);

    // Wait for any asynchronous DOM updates
    await flushPromises();

    // Assert
    const iframe = element.shadowRoot.querySelector("iframe");

    expect(iframe).toBeNull();
  });

  it("nothing if the record could not be fetched", async () => {
    // Arrange
    const element = createElement("c-copilot-integration", {
      is: CopilotIntegration
    });
    document.body.appendChild(element);

    // Act
    getRecord.error(Error("some error"));

    // Wait for any asynchronous DOM updates
    await flushPromises();

    // Assert
    const iframe = element.shadowRoot.querySelector("iframe");

    expect(iframe).toBeNull();
  });

  it("shows an error if field value is not a valid url", async () => {
    // Arrange
    const element = createElement("c-copilot-integration", {
      is: CopilotIntegration
    });
    document.body.appendChild(element);

    // Act
    getRecord.emit(liveChatTranscriptWithInvalidUrl);

    // Wait for any asynchronous DOM updates
    await flushPromises();

    // Assert
    const iframe = element.shadowRoot.querySelector("iframe");

    expect(iframe).toBeNull();
  });
});
