/*! For license information please see vacuum-schedule-card.js.LICENSE.txt */
import{LitElement as e,css as t,html as i}from"lit";const r=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function s(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):r(e,t)}var n;null===(n=window.HTMLSlotElement)||void 0===n||n.prototype.assignedElements;var o=function(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let c=class extends e{static get styles(){return t`
      :host {
        display: block;
      }
      .card {
        padding: 16px;
        background: var(--card-background-color, #fff);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 16px;
        color: var(--primary-text-color);
      }
      .content {
        color: var(--primary-text-color);
      }
    `}render(){if(!this.hass||!this.entity)return i`<div class="card">
        <div class="content">Ошибка: не указаны hass или entity</div>
      </div>`;const e=this.hass.states[this.entity];return e?i`
      <div class="card">
        <div class="header">Расписание уборки</div>
        <div class="content">
          <p>Сущность: ${this.entity}</p>
          <p>Состояние: ${e.state}</p>
          <p>✅ Карточка работает!</p>
        </div>
      </div>
    `:i`<div class="card">
        <div class="content">Ошибка: сущность ${this.entity} не найдена</div>
      </div>`}};var d;o([s({attribute:!1})],c.prototype,"hass",void 0),o([s()],c.prototype,"entity",void 0),c=o([(d="vacuum-schedule-card",e=>"function"==typeof e?((e,t)=>(customElements.define(e,t),t))(d,e):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){customElements.define(e,t)}}})(d,e))],c),"undefined"!=typeof customElements&&(customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",c)),"undefined"!=typeof window&&(window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"}));export{c as VacuumScheduleCard};