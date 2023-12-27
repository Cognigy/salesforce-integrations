import { createElement } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { setImmediate } from "timers";
import CopilotIntegration from "c/copilotIntegration";
import {
  liveChatTranscriptWithValidUrl,
  liveChatTranscriptWithoutUrl,
  liveChatTranscriptWithInvalidUrl,
  liveChatTranscriptWithValidUrlNoQueryParam
} from "../fixtures/LiveChatTranscript";

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
    expect(new URL(iframe.src).searchParams.get("platform")).toBe("salesforce");
    expect(iframe.src).toBe(
      liveChatTranscriptWithValidUrl.fields.Copilot__c.value
    );
  });

  it("appends the platform query parameter to the url", async () => {
    // Arrange
    const element = createElement("c-copilot-integration", {
      is: CopilotIntegration
    });
    document.body.appendChild(element);

    // Act
    getRecord.emit(liveChatTranscriptWithValidUrlNoQueryParam);

    // Wait for any asynchronous DOM updates
    await flushPromises();

    // Assert
    const iframe = element.shadowRoot.querySelector("iframe");

    expect(iframe).toBeInstanceOf(HTMLIFrameElement);

    expect(new URL(iframe.src).searchParams.get("platform")).toBe("salesforce");
  });

  it("shows an error if only the Copilot__c field is missing from data", async () => {
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

    const error = element.shadowRoot.querySelector(
      ".copilot_integration_error"
    );
    expect(error).toBeInstanceOf(HTMLHeadingElement);
    expect(error.textContent).toContain(
      "Could not find field 'Copilot__c'. Make sure to add this field to your Salesforce installation."
    );
  });

  it("forwards error if the record could not be fetched", async () => {
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

    const error = element.shadowRoot.querySelector(
      ".copilot_integration_error"
    );
    expect(error).toBeInstanceOf(HTMLHeadingElement);
    expect(error.textContent).toContain("NOT_FOUND (404): Error: some error");
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

    const error = element.shadowRoot.querySelector(
      ".copilot_integration_error"
    );
    expect(error).toBeInstanceOf(HTMLHeadingElement);
    expect(error.textContent).toContain(
      `The field 'Copilot__c' does not contain a valid url (current value: "${liveChatTranscriptWithInvalidUrl.fields.Copilot__c.value}").`
    );
  });
});
