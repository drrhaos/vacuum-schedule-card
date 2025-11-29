import type { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
export interface I18nMixin {
    hass: HomeAssistant;
    _t(key: string): string;
    _getDayNames(): string[];
}
export declare const I18nMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<I18nMixin> & T;
type Constructor<T = {}> = new (...args: any[]) => T;
export {};
