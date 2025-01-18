import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "meeting" model, go to https://monarch.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "NaXMq2DI0YsP",
  fields: {
    dateTime: {
      type: "dateTime",
      includeTime: true,
      validations: { required: true },
      storageKey: "GmVuV_XjVBlp",
    },
    meetingName: {
      type: "string",
      validations: { required: true },
      storageKey: "bOEzkRm3CDHK",
    },
    tasks: {
      type: "hasMany",
      children: { model: "task", belongsToField: "meeting" },
      storageKey: "Fh0BW9G_Zw3X",
    },
  },
};
