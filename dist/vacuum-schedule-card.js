import{LitElement as e,css as t,html as r}from"lit";function i(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s}"function"==typeof SuppressedError&&SuppressedError;const o=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function n(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):o(e,t)}var s;null===(s=window.HTMLSlotElement)||void 0===s||s.prototype.assignedElements;let c=class extends e{static get styles(){return t`
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
    `}render(){if(!this.hass||!this.entity)return r`<div class="card">
        <div class="content">Ошибка: не указаны hass или entity</div>
      </div>`;const e=this.hass.states[this.entity];return e?r`
      <div class="card">
        <div class="header">Расписание уборки</div>
        <div class="content">
          <p>Сущность: ${this.entity}</p>
          <p>Состояние: ${e.state}</p>
          <p>✅ Карточка работает!</p>
        </div>
      </div>
    `:r`<div class="card">
        <div class="content">Ошибка: сущность ${this.entity} не найдена</div>
      </div>`}};i([n({attribute:!1})],c.prototype,"hass",void 0),i([n()],c.prototype,"entity",void 0),c=i([(e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:i}=t;return{kind:r,elements:i,finisher(t){customElements.define(e,t)}}})(e,t))("vacuum-schedule-card")],c),"undefined"!=typeof customElements&&(customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",c)),"undefined"!=typeof window&&(window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"}));export{c as VacuumScheduleCard};
