import type { LitElement } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import { translate, getDayNames } from "../utils/i18n";

export interface I18nMixin {
  hass: HomeAssistant;
  _t(key: string): string;
  _getDayNames(): string[];
}

export const I18nMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class I18nMixinClass extends superClass implements I18nMixin {
    declare hass: HomeAssistant;

    _t(key: string): string {
      return translate(key, this.hass);
    }

    _getDayNames(): string[] {
      return getDayNames(this.hass);
    }
  }

  return I18nMixinClass as Constructor<I18nMixin> & T;
};

type Constructor<T = {}> = new (...args: any[]) => T;

