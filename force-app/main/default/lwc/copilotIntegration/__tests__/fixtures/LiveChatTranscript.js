import { faker } from "@faker-js/faker";

export const liveChatTranscriptWithValidUrl = {
  apiName: "LiveChatTranscript",
  childRelationships: {},
  fields: {
    Copilot__c: {
      displayValue: null,
      value:
        "http://localhost:6006/ai_copilot_workspace.html?sessionId=session-id&userId=user-id&URLToken=token"
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
