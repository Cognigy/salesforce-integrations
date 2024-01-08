import { faker } from "@faker-js/faker";
import isChromatic from "chromatic/isChromatic";

if (isChromatic()) {
  faker.seed(28472624);
}

const domain = window?.location?.origin ?? "http://localhost:6006";
export const liveChatTranscriptWithValidUrl = {
  apiName: "LiveChatTranscript",
  childRelationships: {},
  fields: {
    Copilot__c: {
      displayValue: null,
      value: `${domain}/ai_copilot_workspace.html?sessionId=session-id&userId=user-id&URLToken=token&platform=salesforce`
    }
  },
  id: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedById: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedDate: faker.date.recent().toISOString(),
  recordTypeId: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  recordTypeInfo: null,
  systemModstamp: faker.date.recent().toISOString()
};

export const liveChatTranscriptWithValidUrlNoQueryParam = {
  apiName: "LiveChatTranscript",
  childRelationships: {},
  fields: {
    Copilot__c: {
      displayValue: null,
      value: `${domain}/ai_copilot_workspace.html?sessionId=session-id&userId=user-id&URLToken=token`
    }
  },
  id: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedById: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedDate: faker.date.recent().toISOString(),
  recordTypeId: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  recordTypeInfo: null,
  systemModstamp: faker.date.recent().toISOString()
};

export const liveChatTranscriptWithoutUrl = {
  apiName: "LiveChatTranscript",
  childRelationships: {},
  fields: {},
  id: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedById: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedDate: faker.date.recent().toISOString(),
  recordTypeId: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  recordTypeInfo: null,
  systemModstamp: faker.date.recent().toISOString()
};

export const liveChatTranscriptWithInvalidUrl = {
  apiName: "LiveChatTranscript",
  childRelationships: {},
  fields: {
    Copilot__c: {
      displayValue: null,
      value: "not-a-url"
    }
  },
  id: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedById: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  lastModifiedDate: faker.date.recent().toISOString(),
  recordTypeId: faker.string.alphanumeric({ casing: "upper", length: 18 }),
  recordTypeInfo: null,
  systemModstamp: faker.date.recent().toISOString()
};
