import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "task" model, go to https://monarch.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "05hEYvsXi3RB",
  fields: {
    description: {
      type: "string",
      default: "",
      validations: { required: true },
      storageKey: "osRuXAiFt1JZ",
    },
    meeting: {
      type: "belongsTo",
      parent: { model: "meeting" },
      storageKey: "eza7AkuxIrxr",
    },
    title: {
      type: "string",
      default: "unnamed",
      validations: { required: true },
      storageKey: "nZqY-SchVf9m",
    },
  },
};
