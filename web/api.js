// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/monarch
import { Client } from "@gadget-client/monarch";

export const api = new Client({ environment: window.gadgetConfig.environment });
