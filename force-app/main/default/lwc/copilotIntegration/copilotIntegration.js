import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { isValidUrl } from "./isValidUrl";

class ErrorFetchingRecord extends Error {}
class UrlNotFoundError extends Error {}
class UrlInvalid extends Error {}

export default class CopilotIntegration extends LightningElement {
  @api recordId;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: ["LiveChatTranscript.Copilot__c"]
  })
  record;

  copilotUrlError;

  get error() {
    return this.copilotUrlError;
  }

  get copilotUrl() {
    if (this.record.error) {
      this.copilotUrlError = new ErrorFetchingRecord(
        `${this.record.error.statusText} (${this.record.error.status}): ${this.record.error.body}`
      );
      return "";
    }

    const copilotUrl = this.record.data?.fields?.Copilot__c?.value;
    if (!copilotUrl) {
      this.copilotUrlError = new UrlNotFoundError(
        "Could not find field 'Copilot__c'. Make sure to add this field to your Salesforce installation."
      );
      return "";
    }
    if (!isValidUrl(copilotUrl)) {
      this.copilotUrlError = new UrlInvalid(
        `The field 'Copilot__c' does not contain a valid url (current value: "${copilotUrl}").`
      );
      return "";
    }

    return this.record.data.fields.Copilot__c.value;
  }
}
