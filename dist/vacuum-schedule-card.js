/*! For license information please see vacuum-schedule-card.js.LICENSE.txt */
import{LitElement as e,css as t,html as i}from"lit";const o=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function a(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):o(e,t)}function s(e){return a({...e,state:!0})}var d;null===(d=window.HTMLSlotElement)||void 0===d||d.prototype.assignedElements;var l=function(e,t,i,o){var a,s=arguments.length,d=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(d=(s<3?a(d):s>3?a(t,i,d):a(t,i))||d);return s>3&&d&&Object.defineProperty(t,i,d),d};const c={ru:{cardTitle:"Расписание уборки",add:"Добавить",editSchedule:"Редактировать расписание",newSchedule:"Новое расписание",dayOfWeek:"День недели",time:"Время",rooms:"Комнаты",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete:"Удалить",deleteConfirm:"Удалить это расписание?",noSchedules:'Нет расписаний. Нажмите "Добавить" для создания.',clickToAdd:'Нажмите "Добавить" для создания.',selectDayAndRooms:"Пожалуйста, выберите день недели и комнаты",scheduleCreated:"Расписание создано",scheduleSaved:'Расписание "{alias}" сохранено.',createAutomation:"Для автоматического запуска создайте автоматизацию:",trigger:"Триггер",condition:"Условие",action:"Действие",roomsLabel:"Комнаты",daily:"Ежедневно",weekdays:"Будни",weekend:"Выходные",cleaning:"Уборка",at:"в",automaticCleaning:"Автоматическая уборка для расписания",days:["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],defaultRooms:["Гостиная","Спальня","Кухня","Ванная"],roomPrefix:"Комната"},en:{cardTitle:"Cleaning Schedule",add:"Add",editSchedule:"Edit Schedule",newSchedule:"New Schedule",dayOfWeek:"Day of Week",time:"Time",rooms:"Rooms",enabled:"Enabled",cancel:"Cancel",save:"Save",delete:"Delete",deleteConfirm:"Delete this schedule?",noSchedules:'No schedules. Click "Add" to create one.',clickToAdd:'Click "Add" to create.',selectDayAndRooms:"Please select day of week and rooms",scheduleCreated:"Schedule Created",scheduleSaved:'Schedule "{alias}" saved.',createAutomation:"To automatically run, create an automation:",trigger:"Trigger",condition:"Condition",action:"Action",roomsLabel:"Rooms",daily:"Daily",weekdays:"Weekdays",weekend:"Weekend",cleaning:"Cleaning",at:"at",automaticCleaning:"Automatic cleaning for schedule",days:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],defaultRooms:["Living Room","Bedroom","Kitchen","Bathroom"],roomPrefix:"Room"}};let n=class extends e{constructor(){super(...arguments),this._schedules=[],this._rooms=[],this._showAddDialog=!1,this._editingSchedule=null,this._newSchedule={dayOfWeek:[],time:"09:00",rooms:[],enabled:!0}}_getLanguage(){return this.hass&&(this.hass.locale?.language||this.hass.language||"en").startsWith("ru")?"ru":"en"}_t(e,t){const i=this._getLanguage();let o=(c[i]||c.en)[e];return t&&Object.keys(t).forEach(e=>{o=o.replace(`{${e}}`,t[e])}),o}get DAYS(){const e=this._getLanguage();return(c[e]||c.en).days}static get styles(){return t`
      :host {
        display: block;
        padding: 16px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .card-title {
        font-size: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .add-button {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }

      .add-button:hover {
        opacity: 0.9;
      }

      .schedule-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .schedule-item {
        background-color: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .schedule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .schedule-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }

      .schedule-days {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }

      .day-badge {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .schedule-time {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .schedule-rooms {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        margin-top: 4px;
      }

      .room-badge {
        background-color: var(--accent-color);
        color: var(--text-primary-color);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }

      .schedule-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .toggle-switch {
        position: relative;
        width: 48px;
        height: 24px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: var(--primary-color);
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }

      .delete-button {
        background-color: var(--error-color);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .delete-button:hover {
        opacity: 0.9;
      }

      .disabled {
        opacity: 0.5;
      }

      .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .dialog {
        background-color: var(--card-background-color);
        border-radius: 8px;
        padding: 24px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
      }

      .dialog-header {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;
        color: var(--primary-text-color);
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .day-checkboxes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .day-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        font-size: 16px;
        background-color: var(--input-fill-color);
        color: var(--primary-text-color);
      }

      .room-checkboxes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
      }

      .room-checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;
      }

      .button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .button-primary {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
      }

      .button-secondary {
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--secondary-text-color);
      }

      .empty-state-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
    `}connectedCallback(){if(super.connectedCallback(),this._loadSchedules(),this._loadRooms(),0===this._schedules.length&&this.entity)try{const e=localStorage.getItem(`vacuum_schedules_${this.entity}`);e&&(this._schedules=JSON.parse(e))}catch(e){}}updated(e){super.updated(e),e.has("entity")&&this.entity&&(this._loadSchedules(),this._loadRooms())}async _loadSchedules(){const e=`input_text.vacuum_schedules_${this.entity?.replace("vacuum.","")}`;try{const t=this.hass.states[e];t&&t.state?this._schedules=JSON.parse(t.state):this._schedules=[]}catch(e){this._schedules=[]}}async _loadRooms(){try{const e=this.hass.states[this.entity],t=this._getLanguage(),i=(c[t]||c.en).defaultRooms;this._rooms=e?.attributes?.rooms?e.attributes.rooms.map((e,t)=>({id:e.id||t+1,name:e.name||`${this._t("roomPrefix")} ${t+1}`})):i.map((e,t)=>({id:t+1,name:e}))}catch(e){this._rooms=[]}}_openAddDialog(){this._newSchedule={dayOfWeek:[],time:"09:00",rooms:[],enabled:!0},this._editingSchedule=null,this._showAddDialog=!0}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=null}_toggleDay(e){const t=this._editingSchedule||this._newSchedule;if(!t)return;t.dayOfWeek||(t.dayOfWeek=[]);const i=t.dayOfWeek.indexOf(e);i>-1?t.dayOfWeek.splice(i,1):t.dayOfWeek.push(e),this.requestUpdate()}_toggleRoom(e){const t=this._editingSchedule||this._newSchedule;if(!t)return;t.rooms||(t.rooms=[]);const i=t.rooms.indexOf(e);i>-1?t.rooms.splice(i,1):t.rooms.push(e),this.requestUpdate()}async _saveSchedule(){const e=this._editingSchedule||this._newSchedule;if(!e||!e.dayOfWeek?.length||!e.rooms?.length)return void alert(this._t("selectDayAndRooms"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,dayOfWeek:e.dayOfWeek,time:e.time||"09:00",rooms:e.rooms,enabled:!1!==e.enabled};if(this._editingSchedule){const e=this._schedules.findIndex(e=>e.id===this._editingSchedule.id);e>-1&&(this._schedules[e]=t)}else this._schedules.push(t);await this._saveSchedules(),await this._createOrUpdateAutomation(t),this._closeDialog()}async _saveSchedules(){const e=`input_text.vacuum_schedules_${this.entity?.replace("vacuum.","")}`;try{await this.hass.callService("input_text","set_value",{entity_id:e,value:JSON.stringify(this._schedules)})}catch(e){console.log("Could not save to input_text, using localStorage as fallback"),localStorage.setItem(`vacuum_schedules_${this.entity}`,JSON.stringify(this._schedules))}}async _createOrUpdateAutomation(e){const t=`vacuum_schedule_${e.id}`,i=this._getDaysText(e.dayOfWeek),o=`${this._t("cleaning")} ${i} ${this._t("at")} ${e.time}`;for(const i of e.dayOfWeek){const a=`${t}_day_${i}`,s={id:a,alias:`${o} (${this.DAYS[i]})`,description:`${this._t("automaticCleaning")} ${e.id}`,trigger:[{platform:"time",at:e.time}],condition:[{condition:"time",weekday:[this._getWeekdayName(i)]}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:this.entity},data:{segments:e.rooms}}],mode:"single"};try{const e=this.hass.auth,t=e?.data?.hassTokens?.access_token||e?.data?.access_token;if(!t)throw new Error("No auth token available");{const e=await fetch(`/api/config/automation/config/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(s)});if(!e.ok&&404!==e.status)throw new Error(`HTTP ${e.status}`)}}catch(t){console.log("Could not create automation automatically. User will need to create it manually.");const a=this._getRoomNames(e.rooms).join(", "),s=this.DAYS[i],d=`${this._t("scheduleSaved",{alias:o})}\n\n${this._t("createAutomation")}\n- ${this._t("trigger")}: ${this._t("time")} ${e.time}\n- ${this._t("condition")}: ${this._t("dayOfWeek")} - ${s}\n- ${this._t("action")}: dreame_vacuum.vacuum_clean_segment\n- ${this._t("roomsLabel")}: ${a} (ID: ${e.rooms.join(", ")})`;this.hass.callService("persistent_notification","create",{title:this._t("scheduleCreated"),message:d,notification_id:`vacuum_schedule_${e.id}_${i}`})}}}_getWeekdayName(e){return["mon","tue","wed","thu","fri","sat","sun"][e]}_getDaysText(e){return 0===e.length?"":7===e.length?this._t("daily"):5===e.length&&e.every(e=>e<5)?this._t("weekdays"):2===e.length&&e.includes(5)&&e.includes(6)?this._t("weekend"):e.sort().map(e=>this.DAYS[e].substring(0,2)).join(", ")}_getRoomNames(e){return e.map(e=>this._rooms.find(t=>t.id===e)?.name||`${this._t("roomPrefix")} ${e}`).filter(Boolean)}async _toggleSchedule(e){e.enabled=!e.enabled,await this._saveSchedules();for(const t of e.dayOfWeek){const i=`automation.vacuum_schedule_${e.id}_day_${t}`;try{e.enabled?await this.hass.callService("automation","turn_on",{entity_id:i}):await this.hass.callService("automation","turn_off",{entity_id:i})}catch(e){console.log(`Could not toggle automation ${i}`)}}}async _deleteSchedule(e){if(confirm(this._t("deleteConfirm"))){this._schedules=this._schedules.filter(t=>t.id!==e.id),await this._saveSchedules();for(const t of e.dayOfWeek){const i=`automation.vacuum_schedule_${e.id}_day_${t}`;try{await this.hass.callService("automation","turn_off",{entity_id:i})}catch(e){console.log(`Could not delete automation ${i}`)}}}}_editSchedule(e){this._editingSchedule={...e},this._newSchedule={...e},this._showAddDialog=!0}render(){return i`
      <ha-card>
        <div class="card-header">
          <div class="card-title">${this._t("cardTitle")}</div>
          <button class="add-button" @click=${this._openAddDialog}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
            ${this._t("add")}
          </button>
        </div>

        <div class="schedule-list">
          ${0===this._schedules.length?i`<div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <div>${this._t("noSchedules")}</div>
              </div>`:this._schedules.map(e=>i`
                  <div
                    class="schedule-item ${e.enabled?"":"disabled"}"
                    @click=${()=>this._editSchedule(e)}
                    style="cursor: pointer;"
                  >
                    <div class="schedule-header">
                      <div class="schedule-info">
                        <div class="schedule-time">${e.time}</div>
                        <div class="schedule-days">
                          ${e.dayOfWeek.map(e=>i`
                              <span class="day-badge">${this.DAYS[e]}</span>
                            `)}
                        </div>
                        <div class="schedule-rooms">
                          ${this._getRoomNames(e.rooms).map(e=>i`
                              <span class="room-badge">${e}</span>
                            `)}
                        </div>
                      </div>
                      <div class="schedule-actions" @click=${e=>e.stopPropagation()}>
                        <label class="toggle-switch">
                          <input
                            type="checkbox"
                            .checked=${e.enabled}
                            @change=${()=>this._toggleSchedule(e)}
                          />
                          <span class="slider"></span>
                        </label>
                        <button
                          class="delete-button"
                          @click=${()=>this._deleteSchedule(e)}
                          title=${this._t("delete")}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                `)}
        </div>

        ${this._showAddDialog?i`
              <div class="dialog-overlay" @click=${this._closeDialog}>
                <div class="dialog" @click=${e=>e.stopPropagation()}>
                  <div class="dialog-header">
                    ${this._editingSchedule?this._t("editSchedule"):this._t("newSchedule")}
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("dayOfWeek")}</label>
                    <div class="day-checkboxes">
                      ${this.DAYS.map((e,t)=>i`
                          <label class="day-checkbox">
                            <input
                              type="checkbox"
                              .checked=${(this._editingSchedule||this._newSchedule)?.dayOfWeek?.includes(t)}
                              @change=${()=>this._toggleDay(t)}
                            />
                            <span>${e}</span>
                          </label>
                        `)}
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("time")}</label>
                    <input
                      type="time"
                      class="time-input"
                      .value=${(this._editingSchedule||this._newSchedule)?.time||"09:00"}
                      @input=${e=>{const t=e.target;this._editingSchedule?this._editingSchedule.time=t.value:this._newSchedule&&(this._newSchedule.time=t.value)}}
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this._t("rooms")}</label>
                    <div class="room-checkboxes">
                      ${this._rooms.map(e=>i`
                          <label class="room-checkbox">
                            <input
                              type="checkbox"
                              .checked=${(this._editingSchedule||this._newSchedule)?.rooms?.includes(e.id)}
                              @change=${()=>this._toggleRoom(e.id)}
                            />
                            <span>${e.name}</span>
                          </label>
                        `)}
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <input
                        type="checkbox"
                        .checked=${!1!==(this._editingSchedule||this._newSchedule)?.enabled}
                        @change=${e=>{const t=e.target;this._editingSchedule?this._editingSchedule.enabled=t.checked:this._newSchedule&&(this._newSchedule.enabled=t.checked)}}
                      />
                      ${this._t("enabled")}
                    </label>
                  </div>

                  <div class="dialog-actions">
                    <button
                      class="button button-secondary"
                      @click=${this._closeDialog}
                    >
                      ${this._t("cancel")}
                    </button>
                    <button
                      class="button button-primary"
                      @click=${this._saveSchedule}
                    >
                      ${this._t("save")}
                    </button>
                  </div>
                </div>
              </div>
            `:""}
      </ha-card>
    `}};var r;l([a({attribute:!1})],n.prototype,"hass",void 0),l([a()],n.prototype,"entity",void 0),l([s()],n.prototype,"_schedules",void 0),l([s()],n.prototype,"_rooms",void 0),l([s()],n.prototype,"_showAddDialog",void 0),l([s()],n.prototype,"_editingSchedule",void 0),l([s()],n.prototype,"_newSchedule",void 0),n=l([(r="vacuum-schedule-card",e=>"function"==typeof e?((e,t)=>(customElements.define(e,t),t))(r,e):((e,t)=>{const{kind:i,elements:o}=t;return{kind:i,elements:o,finisher(t){customElements.define(e,t)}}})(r,e))],n);export{n as VacuumScheduleCard};