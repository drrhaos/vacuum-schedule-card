import type { HomeAssistant } from "custom-card-helpers";
export declare function getAllEntitiesFromAPI(hass: HomeAssistant): Promise<Record<string, any> | null>;
export declare function getAuthToken(hass: HomeAssistant): string | null;
export declare function getBaseUrl(): string;
export declare function createOrUpdateAutomationREST(hass: HomeAssistant, automation: any): Promise<boolean>;
export declare function deleteAutomationREST(hass: HomeAssistant, automationId: string): Promise<boolean>;
