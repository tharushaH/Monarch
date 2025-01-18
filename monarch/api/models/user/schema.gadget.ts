import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://monarch.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "3BWDfU0QQqEe",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "uSSNREOYHxqp",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "4tq_2TbhgyVa",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "YnlAVWu5ZaLU",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "0I-Hm_Z1_Edp",
    },
    firstName: { type: "string", storageKey: "CUWjt0g9EXbW" },
    googleImageUrl: { type: "url", storageKey: "0lJ-egZPV2cT" },
    googleProfileId: { type: "string", storageKey: "z_r0K_OZGF8P" },
    lastName: { type: "string", storageKey: "RLZMNuGdmMlE" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "H_lkSPxhE0hj",
    },
    meetings: { type: "string", storageKey: "A8JqYfgMHF5J" },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "XQHHUWWQTVm7",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "ku5cdDynwdxe",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Ri4aHz14uglK",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "oeAOhbnAmMHM",
    },
  },
};
