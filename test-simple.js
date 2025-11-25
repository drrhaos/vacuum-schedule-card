// Простейшая версия для тестирования регистрации
// Используйте этот файл для проверки, работает ли регистрация вообще

import { LitElement, html, css } from "https://unpkg.com/lit@2/index.js?module";

class VacuumScheduleCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
    `;
  }

  render() {
    return html`<div>✅ Тестовая карточка работает!</div>`;
  }
}

// Явная регистрация
customElements.define("vacuum-schedule-card", VacuumScheduleCard);

// Регистрация для HACS
window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: "vacuum-schedule-card",
  name: "Vacuum Schedule Card",
  description: "Тестовая карточка",
});

console.log("✅ Модуль загружен, элемент зарегистрирован:", customElements.get("vacuum-schedule-card"));


