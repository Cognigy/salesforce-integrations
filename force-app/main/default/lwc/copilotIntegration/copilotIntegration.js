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
    fields: ["MessagingSession.Copilot__c"]
  })
  record;

  get recordData() {
    return JSON.stringify(this.record, null, 2);
  }

  ensurePlatformParam(url) {
    if (new URL(url).searchParams.get("platform")) return url;

    const urlWithParam = new URL(url);
    urlWithParam.searchParams.set("platform", "salesforce");

    return urlWithParam.toString();
  }

  get error() {
    if (this.record.error) {
      return new ErrorFetchingRecord(
        `${this.record.error.statusText} (${this.record.error.status}): ${this.record.error.body}`
      );
    }

    const copilotUrl = this.record.data?.fields?.Copilot__c?.value;
    if (!copilotUrl) {
      return new UrlNotFoundError(
        "Could not find field 'Copilot__c'. Make sure to add this field to your Salesforce installation."
      );
    }
    if (!isValidUrl(copilotUrl)) {
      return new UrlInvalid(
        `The field 'Copilot__c' does not contain a valid url (current value: "${copilotUrl}").`
      );
    }

    return null;
  }

  get shouldShowIframe() {
    return !this.error && this.copilotUrl;
  }

  get copilotUrl() {
    if (this.record.error) {
      return "";
    }

    const copilotUrl = this.record.data?.fields?.Copilot__c?.value;
    if (!copilotUrl) {
      return "";
    }
    if (!isValidUrl(copilotUrl)) {
      return "";
    }

    return this.ensurePlatformParam(this.record.data.fields.Copilot__c.value);
  }
}
