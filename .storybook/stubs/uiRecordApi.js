/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { createLdsTestWireAdapter } from "@salesforce/wire-service-jest-util";

export const getRecord = createLdsTestWireAdapter(() => {});
export const getRecords = createLdsTestWireAdapter(() => {});
export const getRecordCreateDefaults = createLdsTestWireAdapter(() => {});
export const updateRecord = () => Promise.resolve({});
export const createRecord = () => Promise.resolve({});
export const deleteRecord = () => Promise.resolve();
export const generateRecordInputForCreate = () => {};
export const generateRecordInputForUpdate = () => {};
export const createRecordInputFilteredByEditedFields = () => {};
export const getRecordInput = () => {};
export const getRecordNotifyChange = createLdsTestWireAdapter(() => {});
export const refresh = () => Promise.resolve();
export const getRecordUi = () => {};
export const notifyRecordUpdateAvailable = () => Promise.resolve();

/**
 * Gets a field's value from a record.
 * @param record The record.
 * @param field The qualified API name of the field to return.
 * @returns The field's value (which may be a record in the case of spanning fields), or undefined if the field isn't found.
 */
export const getFieldValue = (record, field) => {
  const unqualifiedField = splitQualifiedFieldApiName(
    getFieldApiName(field)
  )[1];
  const fields = unqualifiedField.split(".");
  let r = record;
  while (fields.length > 0 && r && r.fields) {
    const f = fields.shift();
    const fvr = r.fields[f];
    if (fvr === undefined) {
      return undefined;
    } else {
      r = fvr.value;
    }
  }
  return r;
};

/**
 * Gets a field's display value from a record.
 * @param record The record.
 * @param field The qualified API name of the field to return.
 * @returns The field's display value, or undefined if the field isn't found.
 */
export const getFieldDisplayValue = (record, field) => {
  const unqualifiedField = splitQualifiedFieldApiName(
    getFieldApiName(field)
  )[1];
  const fields = unqualifiedField.split(".");
  let r = record;
  while (r && r.fields) {
    const f = fields.shift();
    const fvr = r.fields[f];
    if (fvr === undefined) {
      return undefined;
    } else if (fields.length > 0) {
      r = fvr.value;
    } else {
      return fvr.displayValue;
    }
  }
  return r;
};

/**
 * Returns the field API name, qualified with an object name if possible.
 * @param value The value from which to get the qualified field API name.
 * @return The qualified field API name.
 */
function getFieldApiName(value) {
  if (typeof value === "string") {
    return value;
  } else if (
    value &&
    typeof value.objectApiName === "string" &&
    typeof value.fieldApiName === "string"
  ) {
    return value.objectApiName + "." + value.fieldApiName;
  }
  throw new TypeError("Value is not a string or FieldId.");
}

/**
 * Split the object API name and field API name from a qualified field name.
 * Eg: Opportunity.Title returns ['Opportunity', 'Title']
 * Eg: Opportunity.Account.Name returns ['Opportunity', 'Account.Name']
 * @param fieldApiName The qualified field name.
 * @return The object and field API names.
 */
function splitQualifiedFieldApiName(fieldApiName) {
  const idx = fieldApiName.indexOf(".");
  if (idx < 1) {
    // object api name must non-empty
    throw new TypeError("Value does not include an object API name.");
  }
  return [fieldApiName.substring(0, idx), fieldApiName.substring(idx + 1)];
}
