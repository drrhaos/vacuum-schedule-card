function e(e,t,o,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,o,n):s(t,o))||n);return r>3&&n&&Object.defineProperty(t,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=window,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new r(o,e,i)},a=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var c;const l=window,d=l.trustedTypes,u=d?d.emptyScript:"",h=l.reactiveElementPolyfillSupport,m={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},_=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_},p="finalized";let y=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,o)=>{const i=this._$Ep(o,t);void 0!==i&&(this._$Ev.set(i,o),e.push(i))}),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,o,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(p))return!1;this[p]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const o of t)this.createProperty(o,e[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,o;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(o=e.hostConnected)||void 0===o||o.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{o?e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):i.forEach(o=>{const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,e.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=g){var i;const s=this.constructor._$Ep(e,o);if(void 0!==s&&!0===o.reflect){const r=(void 0!==(null===(i=o.converter)||void 0===i?void 0:i.toAttribute)?o.converter:m).toAttribute(t,o.type);this._$El=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$El=null}}_$AK(e,t){var o;const i=this.constructor,s=i._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(o=e.converter)||void 0===o?void 0:o.fromAttribute)?e.converter:m;this._$El=s,this[s]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,o){let i=!0;void 0!==e&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||_)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===o.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,o))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(o)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};var f;y[p]=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:y}),(null!==(c=l.reactiveElementVersions)&&void 0!==c?c:l.reactiveElementVersions=[]).push("1.6.3");const v=window,$=v.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,C=`<${A}>`,x=document,E=()=>x.createComment(""),k=e=>null===e||"object"!=typeof e&&"function"!=typeof e,V=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,N=/"/g,O=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),j=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),W=new WeakMap,M=x.createTreeWalker(x,129,null,!1);function L(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const B=(e,t)=>{const o=e.length-1,i=[];let s,r=2===t?"<svg>":"",n=P;for(let t=0;t<o;t++){const o=e[t];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===P?"!--"===c[1]?n=I:void 0!==c[1]?n=R:void 0!==c[2]?(O.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=D):void 0!==c[3]&&(n=D):n===D?">"===c[0]?(n=null!=s?s:P,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?D:'"'===c[3]?N:U):n===N||n===U?n=D:n===I||n===R?n=P:(n=D,s=void 0);const u=n===D&&e[t+1].startsWith("/>")?" ":"";r+=n===P?o+C:l>=0?(i.push(a),o.slice(0,l)+S+o.slice(l)+w+u):o+w+(-2===l?(i.push(void 0),t):u)}return[L(e,r+(e[o]||"<?>")+(2===t?"</svg>":"")),i]};class q{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let s=0,r=0;const n=e.length-1,a=this.parts,[c,l]=B(e,t);if(this.el=q.createElement(c,o),M.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=M.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith(S)||t.startsWith(w)){const o=l[r++];if(e.push(t),void 0!==o){const e=i.getAttribute(o.toLowerCase()+S).split(w),t=/([.?@])?(.*)/.exec(o);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Z:"?"===t[1]?X:"@"===t[1]?Y:G})}else a.push({type:6,index:s})}for(const t of e)i.removeAttribute(t)}if(O.test(i.tagName)){const e=i.textContent.split(w),t=e.length-1;if(t>0){i.textContent=$?$.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],E()),M.nextNode(),a.push({type:2,index:++s});i.append(e[t],E())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(w,e+1));)a.push({type:7,index:s}),e+=w.length-1}s++}}static createElement(e,t){const o=x.createElement("template");return o.innerHTML=e,o}}function J(e,t,o=e,i){var s,r,n,a;if(t===j)return t;let c=void 0!==i?null===(s=o._$Co)||void 0===s?void 0:s[i]:o._$Cl;const l=k(t)?void 0:t._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(r=null==c?void 0:c._$AO)||void 0===r||r.call(c,!1),void 0===l?c=void 0:(c=new l(e),c._$AT(e,o,i)),void 0!==i?(null!==(n=(a=o)._$Co)&&void 0!==n?n:a._$Co=[])[i]=c:o._$Cl=c),void 0!==c&&(t=J(e,c._$AS(e,t.values),c,i)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:i}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:x).importNode(o,!0);M.currentNode=s;let r=M.nextNode(),n=0,a=0,c=i[0];for(;void 0!==c;){if(n===c.index){let t;2===c.type?t=new F(r,r.nextSibling,this,e):1===c.type?t=new c.ctor(r,c.name,c.strings,this,e):6===c.type&&(t=new ee(r,this,e)),this._$AV.push(t),c=i[++a]}n!==(null==c?void 0:c.index)&&(r=M.nextNode(),n++)}return M.currentNode=x,s}v(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class F{constructor(e,t,o,i){var s;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cp=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),k(e)?e===z||null==e||""===e?(this._$AH!==z&&this._$AR(),this._$AH=z):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>V(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==z&&k(this._$AH)?this._$AA.nextSibling.data=e:this.$(x.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=q.createElement(L(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(o);else{const e=new K(s,this),t=e.u(this.options);e.v(o),this.$(t),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new q(e)),t}T(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const s of e)i===t.length?t.push(o=new F(this.k(E()),this.k(E()),this,this.options)):o=t[i],o._$AI(s),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,o,i,s){this.type=1,this._$AH=z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,i){const s=this.strings;let r=!1;if(void 0===s)e=J(this,e,t,0),r=!k(e)||e!==this._$AH&&e!==j,r&&(this._$AH=e);else{const i=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=J(this,i[o+n],t,n),a===j&&(a=this._$AH[n]),r||(r=!k(a)||a!==this._$AH[n]),a===z?e=z:e!==z&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(e)}j(e){e===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Z extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===z?void 0:e}}const Q=$?$.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==z?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends G{constructor(e,t,o,i,s){super(e,t,o,i,s),this.type=5}_$AI(e,t=this){var o;if((e=null!==(o=J(this,e,t,0))&&void 0!==o?o:z)===j)return;const i=this._$AH,s=e===z&&i!==z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==z&&(i===z||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==o?o:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const te=v.litHtmlPolyfillSupport;null==te||te(q,F),(null!==(f=v.litHtmlVersions)&&void 0!==f?f:v.litHtmlVersions=[]).push("2.8.0");var oe,ie;class se extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{var i,s;const r=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:t;let n=r._$litPart$;if(void 0===n){const e=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;r._$litPart$=n=new F(t.insertBefore(E(),e),e,void 0,null!=o?o:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return j}}se.finalized=!0,se._$litElement$=!0,null===(oe=globalThis.litElementHydrateSupport)||void 0===oe||oe.call(globalThis,{LitElement:se});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const ne=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(o){o.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(o){o.createProperty(t.key,e)}};function ae(e){return(t,o)=>void 0!==o?((e,t,o)=>{t.constructor.createProperty(o,e)})(e,t,o):ne(e,t)}function ce(e){return ae({...e,state:!0})}var le;function de(e){return e.auth?.data?.access_token||e.auth?.accessToken||null}function ue(){return window.location.origin}async function he(e){try{const t=function(e){const t=[];for(const o in e.states){if(!o.startsWith("automation."))continue;const i=e.states[o];if(!i||!i.attributes)continue;const s=i.attributes.id||"";s.includes("vacuum_schedule")&&t.push({id:s,alias:i.attributes.friendly_name||s,_entity_id:o,_state:i.state,_attributes:i.attributes,_from_states:!0})}return console.log(`[Vacuum Schedule Card] Отфильтровано автоматизаций из hass.states: ${t.length}`),t}(e);if(t.length>0){console.log(`[Vacuum Schedule Card] Найдено ${t.length} автоматизаций расписаний в hass.states`);const o=[];for(const i of t){const t=i.id;i._entity_id;try{let s=null;try{s=await e.callWS({type:"config/automation/config/get",automation_id:t})}catch(o){try{s=await e.callWS({type:"config/automation/get",automation_id:t})}catch(o){try{s=await e.callWS({type:"automation/get",automation_id:t})}catch(o){console.warn(`[Vacuum Schedule Card] WebSocket команды не работают для ${t}, пробуем REST API`);try{const o=e.auth?.data?.access_token||e.auth?.accessToken;if(o){const e=`${window.location.origin}/api/config/automation/config/${t}`,i=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});i.ok&&(s=await i.json(),console.log(`[Vacuum Schedule Card] ✅ Получена конфигурация ${t} через REST API`))}}catch(e){console.warn(`[Vacuum Schedule Card] REST API тоже не сработал для ${t}`)}}}}s&&s.id?o.push(s):o.push(i)}catch(e){o.push(i)}}if(o.length>0){console.log(`[Vacuum Schedule Card] ✅ УСПЕШНО получено ${o.length} конфигураций автоматизаций`),console.group("[Vacuum Schedule Card] Список всех автоматизаций (фильтрация по ID):"),o.forEach((e,t)=>{const o=e.id||e._entity_id||"неизвестно";console.log(`${t+1}. ID: ${o}`),console.log(`   Alias: ${e.alias||e._attributes?.friendly_name||"нет"}`),console.log(`   Entity ID: ${e._entity_id||"нет"}`),console.log(`   State: ${e._state||e.state||"неизвестно"}`),(e.trigger||e.triggers)&&console.log(`   Trigger: ${JSON.stringify(e.trigger||e.triggers).substring(0,100)}...`),(e.action||e.actions)&&console.log(`   Action: ${JSON.stringify(e.action||e.actions).substring(0,100)}...`),o.includes("vacuum_schedule")&&console.log(`   ⭐ Относится к расписаниям уборки (фильтр по ID: ${o})`)}),console.groupEnd();const e=o.filter(e=>(e.id||e._entity_id||"").includes("vacuum_schedule"));return console.log(`[Vacuum Schedule Card] Найдено автоматизаций расписаний (по ID): ${e.length}`),o}}return console.log("[Vacuum Schedule Card] ⚠️ Фильтрация по hass.states не дала результатов"),[]}catch(e){return console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:",e),[]}}function me(e,t){const o=e.id||"";if(!o.startsWith("vacuum_schedule_")||!o.includes("_day_"))return null;if(e._incomplete)return console.warn(`[Vacuum Schedule Card] ⚠️ Пропускаем автоматизацию ${o} - конфигурация неполная (нет trigger/action)`),null;const i=o.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!i)return console.warn(`[Vacuum Schedule Card] Не удалось распарсить ID автоматизации: ${o}`),null;const s=i[1],r=parseInt(i[2],10),n=!(!e.trigger&&!e.triggers),a=!(!e.action&&!e.actions),c=!(!e.condition&&!e.conditions);if(console.log(`[Vacuum Schedule Card] Парсинг автоматизации ${o}:`,{hasTrigger:n,hasTriggers:!!e.triggers,hasAction:a,hasActions:!!e.actions,hasCondition:c,hasConditions:!!e.conditions,triggerType:Array.isArray(e.trigger||e.triggers)?"array":typeof(e.trigger||e.triggers),actionType:Array.isArray(e.action||e.actions)?"array":typeof(e.action||e.actions),allKeys:Object.keys(e)}),!n)return console.error(`[Vacuum Schedule Card] ❌ Автоматизация ${o} не имеет триггеров! Конфигурация неполная.`),console.error("[Vacuum Schedule Card] Полная структура автоматизации:",JSON.stringify(e,null,2)),null;const l=e.trigger||e.triggers;if(!l)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не имеет триггера (проверено trigger и triggers)`),console.warn("[Vacuum Schedule Card] Структура автоматизации:",{keys:Object.keys(e),hasTrigger:!!e.trigger,hasTriggers:!!e.triggers,config:e}),null;const d=Array.isArray(l)?l.filter(e=>null!=e):null!=l?[l]:[];if(0===d.length)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не имеет валидных триггеров`),null;const u=d.find(e=>e&&"time"===e.platform);if(!u||!u.at)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не имеет триггера времени`),console.warn("[Vacuum Schedule Card] Доступные триггеры:",d),null;const h=u.at.substring(0,5),m=e.action||e.actions;if(!m)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не имеет действий`),null;const _=Array.isArray(m)?m.filter(e=>null!=e):null!=m?[m]:[];if(0===_.length)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не имеет валидных действий`),null;const g=_.find(e=>{if(!e)return!1;const t=e.service||e.action;return t&&"string"==typeof t&&t.includes("vacuum_clean_segment")});if(!g)return console.warn(`[Vacuum Schedule Card] Автоматизация ${o} не содержит действия vacuum_clean_segment`),null;const p=g.data?.segments,y=Array.isArray(p)?p:p?[p]:[];return console.log(`[Vacuum Schedule Card] Извлечены комнаты из автоматизации ${o}:`,y),{scheduleId:s,day:r,time:h,rooms:y,enabled:"on"===t?.state}}async function _e(e,t){try{const o=(await he(e)).find(e=>e.id===t.id),i=!!o;console.log(`[Vacuum Schedule Card] Попытка ${i?"обновить":"создать"} автоматизацию:`,{id:t.id,alias:t.alias,hasTrigger:!!t.trigger,hasAction:!!t.action,trigger:t.trigger,action:t.action}),console.log(`[Vacuum Schedule Card] Используем REST API для ${i?"обновления":"создания"} автоматизации`);const s=await async function(e,t){try{const o=de(e);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const i=`${ue()}/api/config/automation/config/${t.id}`,s={id:t.id,alias:t.alias,description:t.description,triggers:Array.isArray(t.trigger)?t.trigger:[t.trigger],conditions:Array.isArray(t.condition)?t.condition:t.condition?[t.condition]:[],actions:Array.isArray(t.action)?t.action:[t.action],mode:t.mode||"single"};s.actions&&Array.isArray(s.actions)&&(s.actions=s.actions.map(e=>{if(e.service&&!e.action){const t={...e};return t.action=e.service,delete t.service,t}return e})),console.log("[Vacuum Schedule Card] Отправка REST API запроса на создание/обновление автоматизации:",{url:i,automationId:t.id,triggersCount:s.triggers?.length||0,conditionsCount:s.conditions?.length||0,actionsCount:s.actions?.length||0}),console.log("[Vacuum Schedule Card] Тело запроса:",JSON.stringify(s,null,2));const r=await fetch(i,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!r.ok){const e=await r.text();return console.error(`[Vacuum Schedule Card] ❌ Ошибка REST API при создании/обновлении автоматизации ${t.id}:`,r.status,e),!1}const n=await r.json().catch(()=>null);return console.log(`[Vacuum Schedule Card] ✅ REST API запрос успешно выполнен для автоматизации ${t.id}`,n),!0}catch(e){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${t.id}:`,e),!1}}(e,t);if(s){try{await e.callService("automation","reload"),await new Promise(e=>setTimeout(e,500))}catch(e){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",e)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t.id} успешно ${i?"обновлена":"создана"} через REST API`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:t.id,alias:t.alias,trigger:t.trigger,condition:t.condition,action:t.action}),!0}console.log("[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback");try{const o=i?"config/automation/update":"config/automation/create";try{await e.callWS({type:o,id:t.id,alias:t.alias,description:t.description,trigger:t.trigger,condition:t.condition||[],action:t.action,mode:t.mode||"single"});try{await e.callService("automation","reload"),await new Promise(e=>setTimeout(e,500))}catch(e){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",e)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t.id} успешно ${i?"обновлена":"создана"} через WebSocket API`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:t.id,alias:t.alias,trigger:t.trigger,condition:t.condition,action:t.action}),!0}catch(o){if(i&&("unknown_command"===o.code||o.message?.includes("unknown_command"))){console.log("[Vacuum Schedule Card] Пробуем удалить и создать заново через WebSocket...");try{await e.callWS({type:"config/automation/delete",automation_id:t.id}),await e.callWS({type:"config/automation/create",id:t.id,alias:t.alias,description:t.description,trigger:t.trigger,condition:t.condition||[],action:t.action,mode:t.mode||"single"});try{await e.callService("automation","reload"),await new Promise(e=>setTimeout(e,500))}catch(e){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",e)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t.id} успешно обновлена (удалена и создана заново через WebSocket)`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:t.id,alias:t.alias,trigger:t.trigger,condition:t.condition,action:t.action}),!0}catch(e){console.warn("[Vacuum Schedule Card] Ошибка при попытке удалить автоматизацию:",e)}}return console.error(`[Vacuum Schedule Card] ❌ Не удалось ${i?"обновить":"создать"} автоматизацию ${t.id} через WebSocket:`,o),console.error("[Vacuum Schedule Card] Детали ошибки:",{code:o.code,message:o.message,automation:{id:t.id,alias:t.alias}}),!1}}catch(e){return console.error(`[Vacuum Schedule Card] ❌ Ошибка ${i?"обновления":"создания"} автоматизации ${t.id}:`,e),!1}}catch(e){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${t.id}:`,e),!1}}async function ge(e,t){try{console.log(`[Vacuum Schedule Card] Попытка удалить автоматизацию: ${t}`),console.log("[Vacuum Schedule Card] Используем REST API для удаления автоматизации");const o=await async function(e,t){try{const o=de(e);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const i=`${ue()}/api/config/automation/config/${t}`;console.log("[Vacuum Schedule Card] Отправка REST API запроса на удаление автоматизации:",{url:i,automationId:t});const s=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(!s.ok){const e=await s.text();return console.error(`[Vacuum Schedule Card] ❌ Ошибка REST API при удалении автоматизации ${t}:`,s.status,e),!1}return console.log(`[Vacuum Schedule Card] ✅ REST API запрос на удаление успешно выполнен для автоматизации ${t}`),!0}catch(e){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${t}:`,e),!1}}(e,t);if(o){try{await e.callService("automation","reload"),await new Promise(e=>setTimeout(e,500))}catch(e){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",e)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t} успешно удалена через REST API`),!0}console.log("[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback");try{await e.callWS({type:"config/automation/delete",automation_id:t}),console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t} успешно удалена через WebSocket API`);try{await e.callService("automation","reload"),await new Promise(e=>setTimeout(e,500))}catch(e){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",e)}return!0}catch(o){if("unknown_command"===o.code||o.message?.includes("unknown_command"))try{return await e.callService("automation","delete",{id:t}),console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${t} удалена через сервис`),!0}catch(e){return console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${t} через сервис:`,e),!1}return console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${t} через WebSocket:`,o),!1}}catch(e){return console.warn(`[Vacuum Schedule Card] ❌ Ошибка удаления автоматизации ${t}:`,e),!1}}async function pe(e,t,o){try{const i=await async function(e){try{const t=e.auth?.data?.access_token||e.auth?.accessToken;if(!t)return console.warn("Токен авторизации не найден для получения сущностей"),null;const o=`${window.location.origin}/api/states`,i=await fetch(o,{method:"GET",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!i.ok)return console.warn(`Не удалось получить список сущностей: ${i.status}`),null;const s=await i.json(),r={};return Array.isArray(s)&&s.forEach(e=>{e.entity_id&&(r[e.entity_id]=e)}),r}catch(e){return console.warn("Ошибка получения сущностей через API:",e),null}}(e),s=t.replace("vacuum.",""),r=[],n=[s,s.replace(/_/g,""),"pylesos","vacuum"],a=t=>e.states[t]||i?.[t]||null;for(const e of n){for(let t=1;t<=50;t++){const o=`select.${e}_room_${t}_name`,i=`select.${e}_room_${t}_id`||`number.${e}_room_${t}_id`,s=a(o),n=a(i);if(s&&s.state){let e;if(n&&n.state)e=parseInt(n.state,10);else{const i=o.match(/room_(\d+)/);e=i?parseInt(i[1],10):t}isNaN(e)||r.push({id:e,name:s.state})}}if(r.length>0)break}if(r.length>0)return r.sort((e,t)=>e.id-t.id);const c=e.states[t];if(c?.attributes){const e=c.attributes.segments||c.attributes.room_list||[];if(Array.isArray(e)&&e.length>0)return e.map(e=>({id:"number"==typeof e?e:e.id||e.segment_id,name:"object"==typeof e&&e.name?e.name:`Комната ${"number"==typeof e?e:e.id||e.segment_id}`}))}return ye(o)}catch(e){return console.error("Ошибка загрузки комнат:",e),ye(o)}}function ye(e){const t=e("room_names").split(",");return[{id:16,name:t[0]||"Living Room"},{id:17,name:t[1]||"Bedroom"},{id:18,name:t[2]||"Kitchen"},{id:19,name:t[3]||"Bathroom"}]}null===(le=window.HTMLSlotElement)||void 0===le||le.prototype.assignedElements;const fe={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom"}};function ve(e,t){const o=function(e){return e&&(e.language||e.locale?.language||"en").startsWith("ru")?"ru":"en"}(t);return fe[o]?.[e]||fe.en[e]||e}let $e=class extends se{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(e){if(!e.entity)throw new Error("Entity must be specified");this._config=e,this.entity=e.entity,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&(this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(e){console.warn("Ошибка при отписке от изменений автоматизаций:",e)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(e){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const e=this.hass.connection.subscribeEvents(e=>{const t=e.event?.data?.entity_id;t&&t.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof e?e:()=>{this.hass.connection}}catch(e){console.warn("Не удалось подписаться на события:",e)}}catch(e){console.warn("Не удалось подписаться на изменения автоматизаций:",e)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await pe(this.hass,this.entity,e=>this._t(e)),this.requestUpdate())}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const e=new Map,t=await he(this.hass);console.log(`[Vacuum Schedule Card] ✅ Автоматизации успешно получены: ${t.length} шт.`),console.log("[Vacuum Schedule Card] Начинаем обработку автоматизаций...");let o=0;for(const i of t)try{const t=i.id||"";if(!t)continue;if(t.includes("vacuum_schedule")&&console.log("[Vacuum Schedule Card] 🔍 Обрабатываем автоматизацию расписания (по ID):",{id:t,hasTrigger:!(!i.trigger&&!i.triggers),hasAction:!(!i.action&&!i.actions)}),!t.startsWith("vacuum_schedule_")||!t.includes("_day_")){console.warn(`[Vacuum Schedule Card] ⚠️ Автоматизация ${t} не соответствует формату расписания, пропускаем`);continue}o++,console.log(`[Vacuum Schedule Card] ✅ Автоматизация соответствует формату расписания: ${t}`);let s=null;const r=`automation.${t}`;if(this.hass.states[r])s=this.hass.states[r];else for(const e in this.hass.states){if(!e.startsWith("automation."))continue;const o=this.hass.states[e];if(o.attributes?.id===t){s=o;break}}const n=me(i,s);if(!n){console.warn(`[Vacuum Schedule Card] ⚠️ Не удалось распарсить автоматизацию с ID: ${t}`);continue}console.log(`[Vacuum Schedule Card] ✅ Найдена автоматизация расписания (отфильтрована по ID): id=${t}, scheduleId=${n.scheduleId}, day=${n.day}`);let a=e.get(n.scheduleId);a||(a={id:n.scheduleId,enabled:n.enabled,days:[],time:n.time,rooms:n.rooms},e.set(n.scheduleId,a)),a.days.includes(n.day)||a.days.push(n.day),n.rooms.length>0&&(a.rooms=n.rooms),s?a.enabled="on"===s.state:n.enabled&&(a.enabled=!0)}catch(e){const t=i?.id||i?._entity_id||"неизвестно";console.error(`[Vacuum Schedule Card] ❌ Ошибка обработки автоматизации ${t}:`,e),console.error("[Vacuum Schedule Card] Детали автоматизации:",{id:i?.id,entity_id:i?._entity_id,hasTrigger:!!i?.trigger,hasAction:!!i?.action,trigger:i?.trigger,action:i?.action})}console.log("[Vacuum Schedule Card] ✅ Обработка завершена:"),console.log(`  - Всего получено автоматизаций: ${t.length}`),console.log(`  - Обработано автоматизаций (формат vacuum_schedule_*_day_*): ${o}`),console.log(`  - Создано расписаний: ${e.size}`),e.size>0&&(console.group("[Vacuum Schedule Card] Найденные расписания:"),e.forEach((e,t)=>{console.log(`Расписание ${t}:`),console.log(`  - Время: ${e.time}`),console.log(`  - Дни: ${e.days.join(", ")}`),console.log(`  - Комнаты: ${e.rooms.length>0?e.rooms.join(", "):"все"}`),console.log("  - Включено: "+(e.enabled?"да":"нет"))}),console.groupEnd());for(const t of e.values())t.days.sort((e,t)=>e-t);this._schedules=Array.from(e.values())}catch(e){this._error=`${this._t("error_loading")} ${e}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card"}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}}],computeLabel:e=>{if("entity"===e.name)return"Vacuum Entity"},computeHelper:e=>{if("entity"===e.name)return"Select the vacuum entity to manage schedules for"}}}static get styles(){return n`
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
    `}_t(e){return ve(e,this.hass)}_getDayNames(){return ve("day_names",this.hass).split(",")}_formatDays(e){return function(e,t,o){return 0===e.length?o.noDays:7===e.length?o.everyDay:e.map(e=>t[e]).join(", ")}(e,this._getDayNames(),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(e){return function(e,t,o){if(0===e.length)return o;const i=e.map(e=>{const o=t.find(t=>t.id===e);return o?o.name:`ID:${e}`}).join(", ");return i||"Комнаты не выбраны"}(e,this._rooms,this._t("all_rooms"))}render(){if(!this.hass||!this.entity)return H`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;return this.hass.states[this.entity]?H`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error&&!this._showAddDialog?H`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?H`<div class="loading">${this._t("loading")}</div>`:H`
                <div class="schedules-list">
                  ${0===this._schedules.length?H`<div class="content">${this._t("no_schedules")}</div>`:this._schedules.map(e=>H`
                          <div class="schedule-item" @click=${()=>this._editSchedule(e)}>
                            <div class="schedule-info">
                              <div class="schedule-time">
                                ${e.enabled?"✅":"⏸️"} ${e.time}
                              </div>
                              <div class="schedule-days">
                                ${this._formatDays(e.days)}
                                ${e.rooms.length>0?` • ${this._formatRooms(e.rooms)}`:` • ${this._t("all_rooms")}`}
                              </div>
                            </div>
                            <div class="schedule-actions" @click=${e=>e.stopPropagation()}>
                              <ha-switch
                                class="toggle-switch"
                                .checked=${e.enabled}
                                @change=${t=>this._toggleSchedule(e,t.target.checked)}
                              ></ha-switch>
                              <button
                                class="action-button"
                                @click=${()=>this._deleteSchedule(e)}
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
      ${this._showAddDialog?H`
        <div class="dialog" @click=${e=>{e.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?this._t("edit_schedule"):this._t("add_schedule_title")}
            </div>

            ${this._error?H`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">${this._t("days_label")}</label>
              <div class="days-selector">
                ${this._getDayNames().map((e,t)=>H`
                  <button
                    class="day-button ${this._isDaySelected(t)?"selected":""}"
                    @click=${()=>this._toggleDay(t)}
                  >
                    ${e}
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
                @input=${e=>{this._newSchedule.time=e.target.value}}
              />
            </div>

            <div class="form-group">
              <label class="form-label">${this._t("rooms_label")} (${this._rooms.length} ${this._t("rooms_available")})</label>
              <div class="rooms-selector">
                ${this._rooms.length>0?H`
                  <div class="select-all-rooms">
                    <label>
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.length===this._rooms.length}
                        @change=${e=>{e.target.checked?this._newSchedule.rooms=this._rooms.map(e=>e.id):this._newSchedule.rooms=[],this.requestUpdate()}}
                      />
                      ${this._t("select_all")}
                    </label>
                  </div>
                  ${this._rooms.map(e=>H`
                    <div class="room-item">
                      <input
                        type="checkbox"
                        class="room-checkbox"
                        .checked=${this._newSchedule.rooms?.includes(e.id)||!1}
                        @change=${t=>{this._newSchedule.rooms||(this._newSchedule.rooms=[]);if(t.target.checked)this._newSchedule.rooms.includes(e.id)||this._newSchedule.rooms.push(e.id);else{const t=this._newSchedule.rooms.indexOf(e.id);t>-1&&this._newSchedule.rooms.splice(t,1)}this.requestUpdate()}}
                      />
                      <span>${e.name} (ID: ${e.id})</span>
                    </div>
                  `)}
                `:H`<div class="content">${this._t("rooms_not_found")}</div>`}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._newSchedule.enabled??!0}
                  @change=${e=>{this._newSchedule.enabled=e.target.checked}}
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
    `:H`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`}_addSchedule(){this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,this.requestUpdate()}_toggleDay(e){this._newSchedule.days||(this._newSchedule.days=[]);const t=this._newSchedule.days.indexOf(e);t>-1?this._newSchedule.days.splice(t,1):this._newSchedule.days.push(e),this.requestUpdate()}_isDaySelected(e){return this._newSchedule.days?.includes(e)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(e){this._editingSchedule=e,this._newSchedule={enabled:e.enabled,days:[...e.days],time:e.time,rooms:[...e.rooms],name:e.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(e,t){if(!this.hass)return;const o={...e,enabled:t};this._schedules=this._schedules.map(t=>t.id===e.id?o:t),this.requestUpdate(),await this._updateAutomationsForSchedule(o,e)}async _deleteSchedule(e){if(this.hass&&confirm(this._t("delete_confirm"))){for(const t of e.days)await this._deleteAutomation(e.id,t);this._schedules=this._schedules.filter(t=>t.id!==e.id),this.requestUpdate()}}async _createAutomation(e,t){if(!this.hass)return;const o=function(e,t,o,i,s){const r=`vacuum_schedule_${e.id}_day_${t}`,n=function(e){return["sun","mon","tue","wed","thu","fri","sat"][e]||"mon"}(t),[a,c]=e.time.split(":").map(Number);return{id:r,alias:`${s} ${e.time} - ${i[t]} (${e.id})`,description:`Автоматизация для расписания уборки ${e.time} в ${i[t]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:n}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:o},data:{segments:e.rooms.length>0?e.rooms:void 0}}],mode:"single"}}(e,t,this.entity,this._getDayNames(),this._t("schedule_title"));await _e(this.hass,o)}async _deleteAutomation(e,t){if(!this.hass)return;const o=`vacuum_schedule_${e}_day_${t}`;await ge(this.hass,o)}async _updateAutomationsForSchedule(e,t){if(!e.enabled){const o=t?t.days:e.days;for(const t of o)await this._deleteAutomation(e.id,t);return}if(t){const o=t.days.filter(t=>!e.days.includes(t));for(const t of o)await this._deleteAutomation(e.id,t)}for(const t of e.days)await this._createAutomation(e,t)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass)return void(this._error=this._t("error_no_hass"));const e={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let t=[...this._schedules];const o=this._editingSchedule;if(this._editingSchedule){const o=t.findIndex(e=>e.id===this._editingSchedule.id);o>-1&&(t[o]=e)}else t.push(e);try{this._schedules=t,this.requestUpdate(),await this._updateAutomationsForSchedule(e,o);try{await this.hass.callService("automation","reload"),await new Promise(e=>setTimeout(e,1e3))}catch(e){console.warn("Не удалось перезагрузить автоматизации:",e),await new Promise(e=>setTimeout(e,1e3))}await this._loadSchedules(),this._closeDialog(),this._error=void 0,this.requestUpdate()}catch(e){this._error=`${this._t("error_saving")} ${e}`,console.error("Ошибка сохранения расписания:",e)}}};e([ae({attribute:!1})],$e.prototype,"hass",void 0),e([ae()],$e.prototype,"entity",void 0),e([ce()],$e.prototype,"_schedules",void 0),e([ce()],$e.prototype,"_loading",void 0),e([ce()],$e.prototype,"_error",void 0),e([ce()],$e.prototype,"_showAddDialog",void 0),e([ce()],$e.prototype,"_editingSchedule",void 0),e([ce()],$e.prototype,"_rooms",void 0),e([ce()],$e.prototype,"_newSchedule",void 0),$e=e([(e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:o,elements:i}=t;return{kind:o,elements:i,finisher(t){customElements.define(e,t)}}})(e,t))("vacuum-schedule-card")],$e),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",$e),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{$e as VacuumScheduleCard};
