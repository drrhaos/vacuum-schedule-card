function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:p},g="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(s=>{const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const r=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:_).toAttribute(e,s.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:_;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const f=window,$=f.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,x=`<${A}>`,E=document,k=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,U="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,O=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,I=/"/g,H=/^(?:script|style|textarea|title)$/i,M=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),L=new WeakMap,B=E.createTreeWalker(E,129,null,!1);function q(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const V=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":"",n=T;for(let e=0;e<s;e++){const s=t[e];let a,l,d=-1,h=0;for(;h<s.length&&(n.lastIndex=h,l=n.exec(s),null!==l);)h=n.lastIndex,n===T?"!--"===l[1]?n=N:void 0!==l[1]?n=D:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=null!=o?o:T,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?O:'"'===l[3]?I:R):n===I||n===R?n=O:n===N||n===D?n=T:(n=O,o=void 0);const c=n===O&&t[e+1].startsWith("/>")?" ":"";r+=n===T?s+x:d>=0?(i.push(a),s.slice(0,d)+S+s.slice(d)+w+c):s+w+(-2===d?(i.push(void 0),e):c)}return[q(t,r+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class W{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,d]=V(t,e);if(this.el=W.createElement(l,s),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=B.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(S)||e.startsWith(w)){const s=d[r++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+S).split(w),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:G})}else a.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split(w),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),B.nextNode(),a.push({type:2,index:++o});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(w,t+1));)a.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){var o,r,n,a;if(e===z)return e;let l=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,s,i)),void 0!==i?(null!==(n=(a=s)._$Co)&&void 0!==n?n:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=J(t,l._$AS(t,e.values),l,i)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(s,!0);B.currentNode=o;let r=B.nextNode(),n=0,a=0,l=i[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new K(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new tt(r,this,t)),this._$AV.push(e),l=i[++a]}n!==(null==l?void 0:l.index)&&(r=B.nextNode(),n++)}return B.currentNode=E,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class K{constructor(t,e,s,i){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),C(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(q(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new F(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new W(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new K(this.k(k()),this.k(k()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,s,i,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=J(this,t,e,0),r=!C(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=J(this,i[s+n],e,n),a===z&&(a=this._$AH[n]),r||(r=!C(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Q=$?$.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends G{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=J(this,t,e,0))&&void 0!==s?s:j)===z)return;const i=this._$AH,o=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==j&&(i===j||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(W,K),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");var st,it;class ot extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,o;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new K(e.insertBefore(k(),t),t,void 0,null!=s?s:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:ot}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function at(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):nt(t,e)}function lt(t){return at({...t,state:!0})}var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;const ht={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom"}};let ct=class extends ot{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity;const e=t.entity.replace("vacuum.","");this._schedulesEntityId=`input_text.vacuum_schedules_${e}`,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&this._schedulesEntityId&&(this._loadSchedules(),this._loadRooms())}async _loadRooms(){if(this.hass&&this.entity){try{const t=this.entity.replace("vacuum.",""),e=[],s=[t,t.replace(/_/g,""),"pylesos","vacuum"];for(const t of s){for(let s=1;s<=50;s++){const i=`select.${t}_room_${s}_name`,o=`select.${t}_room_${s}_id`||`number.${t}_room_${s}_id`,r=this.hass.states[i],n=this.hass.states[o];if(r&&r.state){let t;if(n&&n.state)t=parseInt(n.state,10);else{const e=i.match(/room_(\d+)/);t=e?parseInt(e[1],10):s}isNaN(t)||e.push({id:t,name:r.state})}}if(e.length>0)break}if(e.length>0)return this._rooms=e.sort((t,e)=>t.id-e.id),console.log("Загружено комнат из select-сущностей:",this._rooms.length,this._rooms),void this.requestUpdate();const i=this.hass.states[this.entity];if(i&&i.attributes){const t=i.attributes.segments||i.attributes.room_list||[];if(Array.isArray(t)&&t.length>0)return this._rooms=t.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`})),console.log("Загружено комнат из атрибутов:",this._rooms.length,this._rooms),void this.requestUpdate()}const o=this._t("room_names").split(",");this._rooms=[{id:16,name:o[0]||"Living Room"},{id:17,name:o[1]||"Bedroom"},{id:18,name:o[2]||"Kitchen"},{id:19,name:o[3]||"Bathroom"}],console.log("Используются стандартные комнаты:",this._rooms.length,this._rooms)}catch(t){console.error("Ошибка загрузки комнат:",t);const e=this._t("room_names").split(",");this._rooms=[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}this.requestUpdate()}}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const t=this.hass.auth?.data?.access_token||this.hass.auth?.accessToken;if(!t)return console.warn("Токен авторизации не найден для загрузки автоматизаций"),void(this._schedules=[]);const e=new Map,s=Object.keys(this.hass.states).filter(t=>t.startsWith("automation."));console.log("Всего автоматизаций в hass.states:",s.length),console.log("Список всех автоматизаций:",s);const i=s.filter(t=>{const e=t.split(".");return 2===e.length&&"automation"===e[0]&&e[1]?.includes("raspisanie_uborki")&&e[1]?.includes("schedule_")});console.log("Найдено автоматизаций расписаний по entity_id:",i.length),i.length>0?console.log("Все найденные автоматизации расписаний:",i):console.warn("Автоматизации расписаний не найдены!");for(const s of i)try{const i=this.hass.states[s],o=s.replace("automation.","");console.log(`Обработка автоматизации: ${o}`);let r=null;if(this.hass.connection&&"function"==typeof this.hass.connection.sendMessagePromise)try{const t=await this.hass.connection.sendMessagePromise({type:"automation/get",automation_id:o});t&&t.success&&t.result&&(r=t.result,console.log(`Конфигурация получена через WebSocket для ${o}`))}catch(t){console.warn(`WebSocket API не сработал для ${o}:`,t)}if(!r)try{const e=await fetch(`/api/config/automation/config/${o}`,{method:"GET",headers:{Authorization:`Bearer ${t}`}});e.ok?(r=await e.json(),console.log(`Конфигурация получена через REST API для ${o}`)):console.warn(`REST API вернул ${e.status} для ${o}`)}catch(t){console.warn(`Ошибка получения конфигурации через REST API для ${o}:`,t)}if(!r){console.warn(`Конфигурация не найдена для автоматизации ${o}`);continue}console.log(`Конфигурация автоматизации ${o}:`,r);const n=r.id;if(!n){console.warn(`ID не найден в конфигурации автоматизации ${o}`);continue}const a=n.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!a){console.warn(`Не удалось распарсить ID автоматизации: ${n}`);continue}const l=a[1],d=parseInt(a[2],10);console.log(`Извлечено из ID: scheduleId=${l}, day=${d}`);const h=(Array.isArray(r.trigger)?r.trigger:[r.trigger]).find(t=>"time"===t.platform);if(!h||!h.at){console.warn(`Не найден time trigger в автоматизации ${o}`);continue}const c=h.at,u=c.length>=5?c.substring(0,5):c,_=(Array.isArray(r.action)?r.action:[r.action]).find(t=>"dreame_vacuum.vacuum_clean_segment"===t.service||t.service?.includes("vacuum_clean_segment")),p=_?.data?.segments||_?.segments||[];let m=e.get(l);m||(m={id:l,enabled:"on"===i?.state,days:[],time:u,rooms:p},e.set(l,m),console.log(`Создано новое расписание: ${l}, время: ${u}, комнаты:`,p)),m.days.includes(d)||(m.days.push(d),console.log(`Добавлен день ${d} к расписанию ${l}`)),p.length>0&&(m.rooms=p),"on"===i?.state&&(m.enabled=!0)}catch(t){console.warn(`Ошибка обработки автоматизации ${s}:`,t)}for(const t of e.values())t.days.sort((t,e)=>t-e),console.log("Обработанное расписание:",{id:t.id,enabled:t.enabled,days:t.days,time:t.time,rooms:t.rooms});if(this._schedules=Array.from(e.values()),console.log("Загружено расписаний из автоматизаций:",this._schedules.length),console.log("Детали всех расписаний:",JSON.stringify(this._schedules,null,2)),0===this._schedules.length&&this._schedulesEntityId){const t=this.hass.states[this._schedulesEntityId];if(t&&t.state)try{const e=JSON.parse(t.state)||[];e.length>0&&(this._schedules=e,console.log("Загружено расписаний из input_text (fallback):",this._schedules.length))}catch(t){console.error("Ошибка парсинга расписаний из input_text:",t)}}}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}static get styles(){return n`
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
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content {
        color: var(--primary-text-color);
      }
      .error {
        color: var(--error-color, #f44336);
        padding: 8px;
        background: var(--error-background-color, rgba(244, 67, 54, 0.1));
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .loading {
        text-align: center;
        padding: 16px;
        color: var(--secondary-text-color);
      }
      .schedules-list {
        margin-top: 16px;
      }
      .schedule-item {
        padding: 12px;
        margin-bottom: 8px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .schedule-item:hover {
        background: var(--divider-color, rgba(0,0,0,0.05));
      }
      .schedule-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .action-button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px 8px;
        color: var(--secondary-text-color);
        font-size: 18px;
      }
      .action-button:hover {
        color: var(--primary-color);
      }
      .toggle-switch {
        margin-right: 8px;
      }
      .schedule-info {
        flex: 1;
      }
      .schedule-time {
        font-weight: bold;
        font-size: 16px;
      }
      .schedule-days {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      .add-button {
        margin-top: 16px;
        width: 100%;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color);
      }
      .dialog {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.5) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 99999 !important;
        pointer-events: auto;
      }
      .dialog-content {
        background: var(--card-background-color, #fff) !important;
        border-radius: 8px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        position: relative;
        z-index: 100000;
      }
      .dialog-header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: var(--primary-text-color);
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        margin-bottom: 8px;
        color: var(--primary-text-color);
        font-weight: 500;
      }
      .days-selector {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .day-button {
        flex: 1;
        min-width: 50px;
        padding: 8px;
        border: 2px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
      }
      .day-button:hover {
        border-color: var(--primary-color);
      }
      .day-button.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        font-size: 16px;
      }
      .rooms-selector {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
      }
      .room-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .room-item:hover {
        background: var(--divider-color, rgba(0,0,0,0.05));
      }
      .room-checkbox {
        margin-right: 8px;
      }
      .select-all-rooms {
        margin-bottom: 8px;
        padding: 8px;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      }
      .dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
      }
    `}_getLanguage(){if(!this.hass)return"en";return(this.hass.language||this.hass.locale?.language||"en").startsWith("ru")?"ru":"en"}_t(t){const e=this._getLanguage();return ht[e]?.[t]||ht.en[t]||t}_getDayNames(){return this._t("day_names").split(",")}_formatDays(t){const e=this._getDayNames();return 0===t.length?this._t("no_days"):7===t.length?this._t("every_day"):t.map(t=>e[t]).join(", ")}_formatRooms(t){if(0===t.length)return this._t("all_rooms");const e=t.map(t=>{const e=this._rooms.find(e=>e.id===t);return e?e.name:`ID:${t}`}).join(", ");return e||"Комнаты не выбраны"}render(){if(console.log("render() вызван, количество расписаний:",this._schedules.length,"loading:",this._loading),!this.hass||!this.entity)return M`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;return this.hass.states[this.entity]?M`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error&&!this._showAddDialog?M`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?M`<div class="loading">${this._t("loading")}</div>`:M`
                <div class="schedules-list">
                  ${0===this._schedules.length?M`<div class="content">${this._t("no_schedules")}</div>`:this._schedules.map(t=>M`
                          <div class="schedule-item" @click=${()=>this._editSchedule(t)}>
                            <div class="schedule-info">
                              <div class="schedule-time">
                                ${t.enabled?"✅":"⏸️"} ${t.time}
                              </div>
                              <div class="schedule-days">
                                ${this._formatDays(t.days)}
                                ${t.rooms.length>0?` • ${this._formatRooms(t.rooms)}`:` • ${this._t("all_rooms")}`}
                              </div>
                            </div>
                            <div class="schedule-actions" @click=${t=>t.stopPropagation()}>
                              <ha-switch
                                class="toggle-switch"
                                .checked=${t.enabled}
                                @change=${e=>this._toggleSchedule(t,e.target.checked)}
                              ></ha-switch>
                              <button
                                class="action-button"
                                @click=${()=>this._deleteSchedule(t)}
                                title="Удалить"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        `)}
                </div>
                
                <ha-button class="add-button" @click=${this._addSchedule}>
                  ${this._t("add_schedule")}
                </ha-button>
              `}
        </div>
      </ha-card>
      ${this._showAddDialog?M`
        <div class="dialog" @click=${t=>{t.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?this._t("edit_schedule"):this._t("add_schedule_title")}
            </div>

            ${this._error?M`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">${this._t("days_label")}</label>
              <div class="days-selector">
                ${this._getDayNames().map((t,e)=>M`
                  <button
                    class="day-button ${this._isDaySelected(e)?"selected":""}"
                    @click=${()=>this._toggleDay(e)}
                  >
                    ${t}
                  </button>
                `)}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${this._t("time_label")}</label>
              <input
                type="time"
                class="time-input"
                .value=${this._newSchedule.time||"09:00"}
                @input=${t=>{this._newSchedule.time=t.target.value}}
              />
            </div>

            <div class="form-group">
              <label class="form-label">${this._t("rooms_label")} (${this._rooms.length} ${this._t("rooms_available")})</label>
              <div class="rooms-selector">
                ${this._rooms.length>0?M`
                  <div class="select-all-rooms">
                    <label>
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.length===this._rooms.length}
                        @change=${t=>{t.target.checked?this._newSchedule.rooms=this._rooms.map(t=>t.id):this._newSchedule.rooms=[],this.requestUpdate()}}
                      />
                      ${this._t("select_all")}
                    </label>
                  </div>
                  ${this._rooms.map(t=>M`
                    <div class="room-item">
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.includes(t.id)||!1}
                        @change=${e=>{this._newSchedule.rooms||(this._newSchedule.rooms=[]);if(e.target.checked)this._newSchedule.rooms.includes(t.id)||this._newSchedule.rooms.push(t.id);else{const e=this._newSchedule.rooms.indexOf(t.id);e>-1&&this._newSchedule.rooms.splice(e,1)}this.requestUpdate()}}
                      />
                      <span>${t.name} (ID: ${t.id})</span>
                    </div>
                  `)}
                `:M`<div class="content">${this._t("rooms_not_found")}</div>`}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._newSchedule.enabled??!0}
                  @change=${t=>{this._newSchedule.enabled=t.target.checked}}
                />
                ${this._t("enabled")}
              </label>
            </div>

            <div class="dialog-actions">
              <ha-button class="button-secondary" @click=${this._closeDialog}>
                ${this._t("cancel")}
              </ha-button>
              <ha-button @click=${this._saveSchedule}>
                ${this._t("save")}
              </ha-button>
            </div>
          </div>
        </div>
      `:""}
    `:M`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`}_addSchedule(){console.log("_addSchedule called"),this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,console.log("_showAddDialog set to:",this._showAddDialog),this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass||!this._schedulesEntityId)return;const s={...t,enabled:e},i=this._schedules.map(e=>e.id===t.id?s:e);try{await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(i)}),this._schedules=i,await this._updateAutomationsForSchedule(s,t)}catch(t){this._error=`${this._t("error_updating")} ${t}`,console.error("Ошибка обновления расписания:",t)}}async _deleteSchedule(t){if(!this.hass||!this._schedulesEntityId)return;if(!confirm(this._t("delete_confirm")))return;for(const e of t.days)await this._deleteAutomation(t.id,e);const e=this._schedules.filter(e=>e.id!==t.id);try{await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(e)}),this._schedules=e}catch(t){this._error=`${this._t("error_deleting")} ${t}`,console.error("Ошибка удаления расписания:",t)}}_getDayNameForAutomation(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}async _createAutomation(t,e){if(!this.hass)return;const s=`vacuum_schedule_${t.id}_day_${e}`,i=this._getDayNameForAutomation(e),[o,r]=t.time.split(":").map(Number),n={id:s,alias:`${this._t("schedule_title")} ${t.time} - ${this._getDayNames()[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${this._getDayNames()[e]}`,trigger:[{platform:"time",at:`${String(o).padStart(2,"0")}:${String(r).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:i}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:this.entity},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"};try{const t=this.hass.auth?.data?.access_token||this.hass.auth?.accessToken;if(!t)return void console.warn("Токен авторизации не найден для создания автоматизации");let e=await fetch(`/api/config/automation/config/${s}`,{method:"GET",headers:{Authorization:`Bearer ${t}`}});const i=e.ok?"PUT":"POST";if(e=await fetch(`/api/config/automation/config/${s}`,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)}),e.ok)console.log(`Автоматизация ${s} успешно ${"POST"===i?"создана":"обновлена"}`);else{const t=await e.text();console.warn(`Не удалось ${"POST"===i?"создать":"обновить"} автоматизацию ${s}:`,e.status,t),console.warn("Данные автоматизации:",n)}}catch(t){console.warn(`Ошибка создания автоматизации ${s}:`,t)}}async _deleteAutomation(t,e){if(!this.hass)return;const s=`vacuum_schedule_${t}_day_${e}`;try{const t=this.hass.auth?.data?.access_token||this.hass.auth?.accessToken;if(!t)return void console.warn("Токен авторизации не найден для удаления автоматизации");const e=await fetch(`/api/config/automation/config/${s}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});e.ok?console.log(`Автоматизация ${s} успешно удалена`):console.warn(`Не удалось удалить автоматизацию ${s}:`,e.status)}catch(t){console.warn(`Ошибка удаления автоматизации ${s}:`,t)}}async _updateAutomationsForSchedule(t,e){if(!t.enabled){const s=e?e.days:t.days;for(const e of s)await this._deleteAutomation(t.id,e);return}if(e){const s=e.days.filter(e=>!t.days.includes(e));for(const e of s)await this._deleteAutomation(t.id,e)}for(const e of t.days)await this._createAutomation(t,e)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass||!this._schedulesEntityId)return void(this._error=this._t("error_no_hass"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];const s=this._editingSchedule;if(this._editingSchedule){const s=e.findIndex(t=>t.id===this._editingSchedule.id);s>-1&&(e[s]=t)}else e.push(t);try{console.log("Сохранение расписаний:",{entity_id:this._schedulesEntityId,schedules_count:e.length,schedules:e}),await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(e)}),await new Promise(t=>setTimeout(t,100)),this._schedules=e,console.log("Расписания обновлены локально:",this._schedules.length,this._schedules),this.requestUpdate(),await this._loadSchedules();try{await this._updateAutomationsForSchedule(t,s)}catch(t){console.warn("Ошибка создания автоматизаций (не критично):",t)}this._closeDialog(),this._error=void 0,this.requestUpdate()}catch(t){this._error=`${this._t("error_saving")} ${t}`,console.error("Ошибка сохранения расписания:",t),console.error("Детали ошибки:",{entity_id:this._schedulesEntityId,schedules_count:e.length,error:t})}}};t([at({attribute:!1})],ct.prototype,"hass",void 0),t([at()],ct.prototype,"entity",void 0),t([lt()],ct.prototype,"_schedules",void 0),t([lt()],ct.prototype,"_loading",void 0),t([lt()],ct.prototype,"_error",void 0),t([lt()],ct.prototype,"_showAddDialog",void 0),t([lt()],ct.prototype,"_editingSchedule",void 0),t([lt()],ct.prototype,"_rooms",void 0),t([lt()],ct.prototype,"_newSchedule",void 0),ct=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],ct),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",ct),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{ct as VacuumScheduleCard};
