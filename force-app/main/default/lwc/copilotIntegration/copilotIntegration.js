import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { isValidUrl } from "./isValidUrl";

export default class CopilotIntegration extends LightningElement {
  @api recordId;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: ["LiveChatTranscript.Copilot__c"]
  })
  record;

  get recordData() {
    return JSON.stringify(this.record, null, 2);
  }

  get copilotUrl() {
    const copilotUrl = this.record.data?.fields?.Copilot__c?.value;
    if (!copilotUrl) return "";
    if (!isValidUrl(copilotUrl)) return "";

    return this.record.data.fields.Copilot__c.value;
  }
}
