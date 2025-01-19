import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://monarch.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "signed-in": {
      storageKey: "signed-in",
      default: {
        read: true,
        action: true,
      },
      models: {
        meeting: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        session: {
          read: true,
        },
        task: {
          read: true,
          actions: {
            create: true,
          },
        },
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        meeting: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        session: {
          read: true,
        },
        task: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: true,
          actions: {
            changePassword: true,
            delete: true,
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signOut: true,
            signUp: true,
            update: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        groq_audio: true,
        groq_txt: true,
        groq_vision: true,
      },
    },
  },
};
