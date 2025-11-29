function t(t,e,r,i){var o,s=arguments.length,n=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,r,n):o(e,r))||n);return s>3&&n&&Object.defineProperty(e,r,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new s(r,t,i)},a=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var c;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",u=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},m=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},g="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,r)=>{const i=this._$Ep(r,e);void 0!==i&&(this._$Ev.set(i,r),t.push(i))}),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,r,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,r;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{r?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(r=>{const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=r.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EO(t,e,r=_){var i;const o=this.constructor._$Ep(t,r);if(void 0!==o&&!0===r.reflect){const s=(void 0!==(null===(i=r.converter)||void 0===i?void 0:i.toAttribute)?r.converter:p).toAttribute(e,r.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var r;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(r=t.converter)||void 0===r?void 0:r.fromAttribute)?t.converter:p;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,r){let i=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,r))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(r)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(c=l.reactiveElementVersions)&&void 0!==c?c:l.reactiveElementVersions=[]).push("1.6.3");const f=window,b=f.trustedTypes,$=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,A=`<${S}>`,k=document,C=()=>k.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,P=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,V=/"/g,I=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),H=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,L=k.createTreeWalker(k,129,null,!1);function M(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(e):e}const q=(t,e)=>{const r=t.length-1,i=[];let o,s=2===e?"<svg>":"",n=z;for(let e=0;e<r;e++){const r=t[e];let a,c,l=-1,d=0;for(;d<r.length&&(n.lastIndex=d,c=n.exec(r),null!==c);)d=n.lastIndex,n===z?"!--"===c[1]?n=U:void 0!==c[1]?n=D:void 0!==c[2]?(I.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=P):void 0!==c[3]&&(n=P):n===P?">"===c[0]?(n=null!=o?o:z,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?P:'"'===c[3]?V:N):n===V||n===N?n=P:n===U||n===D?n=z:(n=P,o=void 0);const h=n===P&&t[e+1].startsWith("/>")?" ":"";s+=n===z?r+A:l>=0?(i.push(a),r.slice(0,l)+w+r.slice(l)+x+h):r+x+(-2===l?(i.push(void 0),e):h)}return[M(t,s+(t[r]||"<?>")+(2===e?"</svg>":"")),i]};class F{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[c,l]=q(t,e);if(this.el=F.createElement(c,r),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=L.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(w)||e.startsWith(x)){const r=l[s++];if(t.push(e),void 0!==r){const t=i.getAttribute(r.toLowerCase()+w).split(x),e=/([.?@])?(.*)/.exec(r);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?Z:"@"===e[1]?Y:K})}else a.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(I.test(i.tagName)){const t=i.textContent.split(x),e=t.length-1;if(e>0){i.textContent=b?b.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],C()),L.nextNode(),a.push({type:2,index:++o});i.append(t[e],C())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(x,t+1));)a.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const r=k.createElement("template");return r.innerHTML=t,r}}function W(t,e,r=t,i){var o,s,n,a;if(e===H)return e;let c=void 0!==i?null===(o=r._$Co)||void 0===o?void 0:o[i]:r._$Cl;const l=E(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(s=null==c?void 0:c._$AO)||void 0===s||s.call(c,!1),void 0===l?c=void 0:(c=new l(t),c._$AT(t,r,i)),void 0!==i?(null!==(n=(a=r)._$Co)&&void 0!==n?n:a._$Co=[])[i]=c:r._$Cl=c),void 0!==c&&(e=W(t,c._$AS(t,e.values),c,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:r},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(r,!0);L.currentNode=o;let s=L.nextNode(),n=0,a=0,c=i[0];for(;void 0!==c;){if(n===c.index){let e;2===c.type?e=new Q(s,s.nextSibling,this,t):1===c.type?e=new c.ctor(s,c.name,c.strings,this,t):6===c.type&&(e=new tt(s,this,t)),this._$AV.push(e),c=i[++a]}n!==(null==c?void 0:c.index)&&(s=L.nextNode(),n++)}return L.currentNode=k,o}v(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{constructor(t,e,r,i){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),E(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>R(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:r,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(M(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(r);else{const t=new J(o,this),e=t.u(this.options);t.v(r),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new F(t)),e}T(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const o of t)i===e.length?e.push(r=new Q(this.k(C()),this.k(C()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,r,i,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,i){const o=this.strings;let s=!1;if(void 0===o)t=W(this,t,e,0),s=!E(t)||t!==this._$AH&&t!==H,s&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=W(this,i[r+n],e,n),a===H&&(a=this._$AH[n]),s||(s=!E(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}s&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const G=b?b.emptyScript:"";class Z extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class Y extends K{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){var r;if((t=null!==(r=W(this,t,e,0))&&void 0!==r?r:j)===H)return;const i=this._$AH,o=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==j&&(i===j||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==r?r:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(F,Q),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");var rt,it;class ot extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{var i,o;const s=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new Q(e.insertBefore(C(),t),t,void 0,null!=r?r:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}}ot.finalized=!0,ot._$litElement$=!0,null===(rt=globalThis.litElementHydrateSupport)||void 0===rt||rt.call(globalThis,{LitElement:ot});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:ot}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const nt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:i}=e;return{kind:r,elements:i,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(r){r.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function ct(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):at(t,e)}function lt(t){return ct({...t,state:!0})}var dt;function ht(t){return t.auth?.data?.access_token||t.auth?.accessToken||null}function ut(){return window.location.origin}null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;const pt="vacuum-schedule-card",mt="vacuum_schedule_",_t=["unknown","completed","неизвестно","завершено","","null","undefined","none"],gt={rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12};async function vt(t){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}}async function yt(t){try{const e=function(t){const e=[];for(const r in t.states){if(!r.startsWith("automation."))continue;const i=t.states[r];if(!i||!i.attributes)continue;const o=i.attributes.id||"";o.includes(mt)&&e.push({id:o,alias:i.attributes.friendly_name||o,_entity_id:r,_state:i.state,_attributes:i.attributes,_from_states:!0})}return e}(t);if(e.length>0){const r=[];for(const i of e){const e=i.id;try{let o=null;try{o=await t.callWS({type:"config/automation/config/get",automation_id:e})}catch(r){try{o=await t.callWS({type:"config/automation/get",automation_id:e})}catch(r){try{o=await t.callWS({type:"automation/get",automation_id:e})}catch(r){try{const r=t.auth?.data?.access_token||t.auth?.accessToken;if(r){const t=`${window.location.origin}/api/config/automation/config/${e}`,i=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});i.ok&&(o=await i.json())}}catch(t){}}}}o&&o.id?r.push(o):r.push(i)}catch(t){r.push(i)}}if(r.length>0)return r}return[]}catch(t){return console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:",t),[]}}function ft(t,e){const r=t.id||"";if(!r.startsWith("vacuum_schedule_")||!r.includes("_day_"))return null;if(t._incomplete)return null;const i=r.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!i)return null;const o=i[1],s=parseInt(i[2],10),n=!(!t.trigger&&!t.triggers),a=!(!t.action&&!t.actions);if(!n||!a)return null;const c=t.trigger||t.triggers;if(!c)return null;const l=Array.isArray(c)?c.filter(t=>null!=t):null!=c?[c]:[];if(0===l.length)return null;const d=l.find(t=>t&&"time"===t.platform);if(!d||!d.at)return null;const h=d.at.substring(0,5),u=t.action||t.actions;if(!u)return null;const p=Array.isArray(u)?u.filter(t=>null!=t):null!=u?[u]:[];if(0===p.length)return null;const m=p.find(t=>{if(!t)return!1;const e=t.service||t.action;return e&&"string"==typeof e&&e.includes("vacuum_clean_segment")});if(!m)return null;const _=m.data?.segments;return{scheduleId:o,day:s,time:h,rooms:Array.isArray(_)?_:_?[_]:[],enabled:"on"===e?.state}}async function bt(t,e){try{const r=(await yt(t)).find(t=>t.id===e.id),i=!!r,o=await async function(t,e){try{const r=ht(t);if(!r)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const i=`${ut()}/api/config/automation/config/${e.id}`,o={id:e.id,alias:e.alias,description:e.description,triggers:Array.isArray(e.trigger)?e.trigger:[e.trigger],conditions:Array.isArray(e.condition)?e.condition:e.condition?[e.condition]:[],actions:Array.isArray(e.action)?e.action:[e.action],mode:e.mode||"single"};o.actions&&Array.isArray(o.actions)&&(o.actions=o.actions.map(t=>{if(t.service&&!t.action){const e={...t};return e.action=t.service,delete e.service,e}return t}));const s=await fetch(i,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify(o)});if(!s.ok){const t=await s.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${e.id}:`,s.status,t),!1}return await s.json().catch(()=>null),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${e.id}:`,t),!1}}(t,e);if(o)return await vt(t),!0;try{const r=i?"config/automation/update":"config/automation/create";try{return await t.callWS({type:r,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await vt(t),!0}catch(r){if(i&&("unknown_command"===r.code||r.message?.includes("unknown_command")))try{return await t.callWS({type:"config/automation/delete",automation_id:e.id}),await t.callWS({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await vt(t),!0}catch(t){}return console.error(`[Vacuum Schedule Card] Ошибка ${i?"обновления":"создания"} автоматизации ${e.id}:`,r),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка ${i?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${e.id}:`,t),!1}}async function $t(t,e){try{const r=await async function(t,e){try{const r=ht(t);if(!r)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const i=`${ut()}/api/config/automation/config/${e}`,o=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(!o.ok){const t=await o.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${e}:`,o.status,t),!1}return!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${e}:`,t),!1}}(t,e);if(r)return await vt(t),!0;try{return await t.callWS({type:"config/automation/delete",automation_id:e}),await vt(t),!0}catch(r){if("unknown_command"===r.code||r.message?.includes("unknown_command"))try{return await t.callService("automation","delete",{id:e}),!0}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,r),!1}}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}}const wt={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная",start:"Запуск",stop:"Остановка",pause:"Пауза",return_to_base:"На станцию",error_starting:"Ошибка запуска",error_stopping:"Ошибка остановки",error_pausing:"Ошибка паузы",error_returning:"Ошибка возврата",state_charging:"зарядка",state_cleaning:"уборка",state_paused:"пауза",state_returning:"возврат",state_docked:"на базе",state_idle:"ожидание",state_error:"ошибка",state_standby:"ожидание",state_spot_cleaning:"точечная уборка",state_zone_cleaning:"уборка зоны",state_manual_control:"ручное управление",state_going_home:"возврат на базу",state_cleaning_room:"уборка комнаты",state_completing:"завершение",state_unknown:"неизвестно",state_drying:"сушка",state_drying_mop:"сушка мопов",state_drying_completed:"сушка завершена",state_drying_paused:"сушка приостановлена",state_drying_error:"ошибка сушки",state_fast_drying:"быстрая сушка",state_deep_drying:"глубокая сушка",state_hot_air_drying:"сушка горячим воздухом",state_poloskanie_shvabry:"полоскание швабры",state_avtoochistka:"автоочистка",state_suhaya_i_vlazhnaya_uborka:"сухая и влажная уборка",state_ochistka_i_dobavlenie_vody:"очистка и добавление воды",state_zaryadka_zavershena:"зарядка завершена",state_vozvraschenie_dlya_poloskaniya_shvabry:"возвращение для полоскания швабры",state_stirka_priostanovlena:"стирка приостановлена",state_rinsing_mop:"полоскание швабры",state_auto_cleaning:"автоочистка",state_dry_and_wet_cleaning:"сухая и влажная уборка",state_cleaning_and_adding_water:"очистка и добавление воды",state_charging_completed:"зарядка завершена",state_returning_for_mop_rinsing:"возвращение для полоскания швабры",state_washing_paused:"стирка приостановлена",state_returning_to_base:"возвращение на базу"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom",start:"Start",stop:"Stop",pause:"Pause",return_to_base:"Return to Base",error_starting:"Error starting",error_stopping:"Error stopping",error_pausing:"Error pausing",error_returning:"Error returning",state_charging:"charging",state_cleaning:"cleaning",state_paused:"paused",state_returning:"returning",state_docked:"docked",state_idle:"idle",state_error:"error",state_standby:"standby",state_spot_cleaning:"spot cleaning",state_zone_cleaning:"zone cleaning",state_manual_control:"manual control",state_going_home:"going home",state_cleaning_room:"cleaning room",state_completing:"completing",state_unknown:"unknown",state_drying:"drying",state_drying_mop:"drying mop",state_drying_completed:"drying completed",state_drying_paused:"drying paused",state_drying_error:"drying error",state_fast_drying:"fast drying",state_deep_drying:"deep drying",state_hot_air_drying:"hot air drying",state_poloskanie_shvabry:"rinsing mop",state_avtoochistka:"auto cleaning",state_suhaya_i_vlazhnaya_uborka:"dry and wet cleaning",state_ochistka_i_dobavlenie_vody:"cleaning and adding water",state_zaryadka_zavershena:"charging completed",state_vozvraschenie_dlya_poloskaniya_shvabry:"returning for mop rinsing",state_stirka_priostanovlena:"washing paused",state_rinsing_mop:"rinsing mop",state_auto_cleaning:"auto cleaning",state_dry_and_wet_cleaning:"dry and wet cleaning",state_cleaning_and_adding_water:"cleaning and adding water",state_charging_completed:"charging completed",state_returning_for_mop_rinsing:"returning for mop rinsing",state_washing_paused:"washing paused",state_returning_to_base:"returning to base"}};function xt(t,e){const r=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return wt[r]?.[t]||wt.en[t]||t}function St(t){return xt("day_names",t).split(",")}class At{constructor(t,e,r){this.hass=t,this.entity=e,this.getTranslation=r}async loadSchedules(){const t=new Map,e=await yt(this.hass);for(const r of e)try{const e=r.id||"";if(!e||!e.startsWith(mt)||!e.includes("_day_"))continue;let i=null;const o=`automation.${e}`;if(this.hass.states[o])i=this.hass.states[o];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const r=this.hass.states[t];if(r.attributes?.id===e){i=r;break}}const s=ft(r,i);if(!s||r._incomplete)continue;const n=s.scheduleId;if(!n)continue;t.has(n)||t.set(n,{id:n,enabled:s.enabled||!1,days:[],time:s.time||"09:00",rooms:s.rooms||[],name:r.alias||void 0});const a=t.get(n);a.days.includes(s.day)||a.days.push(s.day),s.rooms.length>0&&(a.rooms=s.rooms),i?a.enabled="on"===i.state:s.enabled&&(a.enabled=!0)}catch(t){const e=r?.id||r?._entity_id||"неизвестно";console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${e}:`,t)}const r=Array.from(t.values());for(const t of r)t.days.sort((t,e)=>t-e);return r}async saveSchedule(t,e){await this.updateAutomationsForSchedule(t,e),await vt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async deleteSchedule(t){for(const e of t.days)await this.deleteAutomationForDay(t.id,e);await vt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async toggleSchedule(t,e){const r={...t,enabled:e};await this.updateAutomationsForSchedule(r,t),await vt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async updateAutomationsForSchedule(t,e){if(!t.enabled){const r=e?e.days:t.days;for(const e of r)await this.deleteAutomationForDay(t.id,e);return}if(e){const r=e.days.filter(e=>!t.days.includes(e));for(const e of r)await this.deleteAutomationForDay(t.id,e)}const r=St(this.hass);for(const e of t.days)await this.createAutomationForDay(t,e,r)}async createAutomationForDay(t,e,r){const i=function(t,e,r,i,o){const s=`${mt}${t.id}_day_${e}`,n=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,c]=t.time.split(":").map(Number);return{id:s,alias:`${o} ${t.time} - ${i[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${i[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:n}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:r},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,r,this.getTranslation("schedule_title"));await bt(this.hass,i)||console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${i.id}`)}async deleteAutomationForDay(t,e){const r=`${mt}${t}_day_${e}`;await $t(this.hass,r)||console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${r}`)}}async function kt(t,e){try{const r=t.states[e];if(r?.attributes?.icon)return r.attributes.icon;try{const r=await t.callWS({type:"config/entity_registry/get",entity_id:e});if(r?.icon)return r.icon}catch(t){}return}catch(t){return}}async function Ct(t,e,r,i){try{const o=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const r=`${window.location.origin}/api/states`,i=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!i.ok)return console.warn(`Не удалось получить список сущностей: ${i.status}`),null;const o=await i.json(),s={};return Array.isArray(o)&&o.forEach(t=>{t.entity_id&&(s[t.entity_id]=t)}),s}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),s=e.replace("vacuum.",""),n=[],a=[s,s.replace(/_/g,""),"vacuum"],c=e=>t.states[e]||o?.[e]||null;for(const e of a){for(let r=1;r<=50;r++){const o=`select.${e}_room_${r}_name`,s=`select.${e}_room_${r}_id`||`number.${e}_room_${r}_id`,a=c(o),l=c(s);if(a&&a.state){let e;if(l&&l.state)e=parseInt(l.state,10);else{const t=o.match(/room_(\d+)/);e=t?parseInt(t[1],10):r}if(!isNaN(e)){const r={id:e,name:a.state},s=await kt(t,o);if(s&&(r.icon=s,r.entity_id=o),i&&i[e]){const o=i[e];if("string"==typeof o)r.icon=o;else if(o.entity_id){r.entity_id=o.entity_id;const e=await kt(t,o.entity_id);e&&(r.icon=e)}}else if(!r.icon){const e=a.state.toLowerCase().replace(/\s+/g,"_"),i=[`zone.${e}`,`sensor.${e}`,`input_select.${e}`,`input_text.${e}`];for(const e of i){const i=await kt(t,e);if(i){r.icon=i,r.entity_id=e;break}}}n.push(r)}}}if(n.length>0)break}if(n.length>0)return n.sort((t,e)=>t.id-e.id);const l=t.states[e];if(l?.attributes){const e=l.attributes.segments||l.attributes.room_list||[];if(Array.isArray(e)&&e.length>0){const r=[];for(const o of e){const e="number"==typeof o?o:o.id||o.segment_id,s={id:e,name:"object"==typeof o&&o.name?o.name:`Комната ${e}`};if(i&&i[e]){const r=i[e];if("string"==typeof r)s.icon=r;else if(r.entity_id){s.entity_id=r.entity_id;const e=await kt(t,r.entity_id);e&&(s.icon=e)}}r.push(s)}return r}}return Et(r)}catch(t){return console.error("Ошибка загрузки комнат:",t),Et(r)}}function Et(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}function Rt(t,e,r){if(!t?.connection)return null;try{if("function"==typeof t.connection.subscribeEvents){const i=t.connection.subscribeEvents(t=>{const i=t.event?.data?.entity_id;i===e&&r()},"state_changed");if("function"==typeof i)return{unsubscribe:()=>{try{i()}catch(t){}}}}}catch(t){console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:",t)}return null}const Tt=2;class zt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class Ut extends zt{constructor(t){if(super(t),this.et=j,t.type!==Tt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===j||null==t)return this.ft=void 0,this.et=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Ut.directiveName="unsafeHTML",Ut.resultType=1;const Dt=(t=>(...e)=>({_$litDirective$:t,values:e}))(Ut);class Pt{constructor(t,e){this.hass=t,this.entity=e}async start(t){t&&t.length>0?await this.hass.callService("dreame_vacuum","vacuum_clean_segment",{entity_id:this.entity,segments:t}):await this.hass.callService("vacuum","start",{entity_id:this.entity})}async stop(){await this.hass.callService("vacuum","stop",{entity_id:this.entity})}async pause(){await this.hass.callService("vacuum","pause",{entity_id:this.entity})}async returnToBase(){await this.hass.callService("vacuum","return_to_base",{entity_id:this.entity})}getState(){const t=this.hass.states[this.entity];return t?.state||"unknown"}getAdditionalState(){const t=this.entity.replace(/^vacuum\./,""),e=`sensor.${t}_state`,r=this.hass.states[e];if(r&&r.state){const t=String(r.state).trim(),e=t.toLowerCase().replace(/\s+/g,"");if(t&&!["noerror","нетешибок","none","нет","null","undefined","unknown","неизвестно",""].includes(e))return t}const i=this.hass.states[this.entity];if(!i||!i.attributes)return;const o=i.attributes[`${t}_state`];if("string"==typeof o&&o.trim()){const t=o.trim().toLowerCase().replace(/\s+/g,"");if(!["noerror","нетешибок","none","нет","null","undefined","unknown","неизвестно",""].includes(t))return o.trim()}}isButtonDisabled(t,e){switch(t){case"start":return"cleaning"===e||"returning"===e;case"stop":return"idle"===e||"docked"===e||"returning"===e||"unknown"===e;case"pause":return"cleaning"!==e;case"return":return"docked"===e||"returning"===e;default:return!1}}getStateLabel(t){return{cleaning:"Уборка",docked:"На базе",idle:"Ожидание",paused:"На паузе",returning:"Возврат на базу",error:"Ошибка",unknown:"Неизвестно"}[t]||t}getError(){const t=this.hass.states[this.entity];if(!t||!t.attributes)return;const e=t.attributes,r=["error","ошибка","no error","нет ошибок","noerror","нетешибок","none","нет","null","undefined",""];if(e.error){const t="string"==typeof e.error?e.error:String(e.error),i=t.trim().toLowerCase().replace(/\s+/g,"");if(t&&t.trim()&&!r.includes(i))return t.trim()}if(e.error_message){const t="string"==typeof e.error_message?e.error_message:String(e.error_message),i=t.trim().toLowerCase().replace(/\s+/g,"");if(t&&t.trim()&&!r.includes(i))return t.trim()}if("error"===e.status&&e.message){const t="string"==typeof e.message?e.message:String(e.message),i=t.trim().toLowerCase().replace(/\s+/g,"");if(t&&t.trim()&&!r.includes(i))return t.trim()}const i=["error_code","error_code_str","last_error"];for(const t of i)if(e[t]){const i="string"==typeof e[t]?e[t]:String(e[t]),o=i.trim().toLowerCase().replace(/\s+/g,"");if(i&&i.trim()&&!r.includes(o))return i.trim()}}getTaskStatus(){const t=`sensor.${this.entity.replace(/^vacuum\./,"")}_task_status`,e=this.hass.states[t];if(e&&null!==e.state&&void 0!==e.state){return String(e.state).trim()||void 0}}getCurrentCleaningRooms(){const t=this.hass.states[this.entity];if(!t||!t.attributes)return[];const e=t.attributes;return Array.isArray(e.current_segments)?e.current_segments.filter(t=>"number"==typeof t):"number"==typeof e.current_segment?[e.current_segment]:Array.isArray(e.cleaning_segments)?e.cleaning_segments.filter(t=>"number"==typeof t):Array.isArray(e.active_segments)?e.active_segments.filter(t=>"number"==typeof t):"number"==typeof e.segment?[e.segment]:Array.isArray(e.segments)?e.segments.filter(t=>"number"==typeof t):[]}}let Nt=class extends ot{constructor(){super(...arguments),this.rooms=[],this.selectedRooms=[],this.hiddenRooms=[],this.showRoomIds=!1,this.roomIcons={},this._currentCleaningRooms=[]}connectedCallback(){super.connectedCallback(),this.hass&&this.entity&&(this._vacuumService=new Pt(this.hass,this.entity),this._updateCleaningRooms(),this._subscribeToStateChanges())}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeFromStateChanges()}updated(t){(t.has("hass")||t.has("entity"))&&this.hass&&this.entity&&(this._vacuumService=new Pt(this.hass,this.entity),this._updateCleaningRooms(),this._subscribeToStateChanges())}_updateCleaningRooms(){if(this._vacuumService){const t=this._vacuumService.getCurrentCleaningRooms(),e=this._isCleaning();this._currentCleaningRooms=t,this._isCleaning()?JSON.stringify(this.selectedRooms.sort())!==JSON.stringify(t.sort())&&(this.selectedRooms=[...t],this.dispatchEvent(new CustomEvent("rooms-synced",{detail:{rooms:this.selectedRooms}}))):e&&this.selectedRooms.length>0&&JSON.stringify(this.selectedRooms.sort())===JSON.stringify(this._currentCleaningRooms.sort())&&(this.selectedRooms=[]),this.requestUpdate()}}_subscribeToStateChanges(){this._unsubscribeFromStateChanges();const t=Rt(this.hass,this.entity,()=>{this._updateCleaningRooms(),this.requestUpdate()});t&&(this._unsubscribeStateChanges=t.unsubscribe);const e=`sensor.${this.entity.replace(/^vacuum\./,"")}_task_status`,r=Rt(this.hass,e,()=>{this.requestUpdate()});if(r){const t=this._unsubscribeStateChanges;this._unsubscribeStateChanges=()=>{t&&t(),r.unsubscribe()}}}_unsubscribeFromStateChanges(){this._unsubscribeStateChanges&&(this._unsubscribeStateChanges(),this._unsubscribeStateChanges=void 0)}_t(t){return xt(t,this.hass)}_getVacuumState(){return this._vacuumService?.getState()||"unknown"}_isCleaning(){if(!this._vacuumService)return!1;const t=this._vacuumService.getTaskStatus();if(void 0!==t){const e=t.toLowerCase().trim();return![..._t].includes(e)}return"cleaning"===this._getVacuumState()||this._currentCleaningRooms.length>0}_isButtonDisabled(t){if(!this._vacuumService)return!0;const e=this._getVacuumState();return this._vacuumService.isButtonDisabled(t,e)}_getStateLabel(){if(!this._vacuumService)return"Неизвестно";const t=this._getVacuumState();return this._vacuumService.getStateLabel(t)}_getAdditionalState(){if(this._vacuumService)return this._vacuumService.getAdditionalState()}_getAdditionalStateLabel(){const t=this._getAdditionalState();if(!t)return"";const e={idle:"idle",cleaning:"cleaning",paused:"paused",returning:"returning","returning to dock":"returning","returning to base":"returning",charging:"charging",docked:"docked",error:"error",standby:"standby","spot cleaning":"spot_cleaning","zone cleaning":"zone_cleaning","manual control":"manual_control","going home":"going_home",completing:"completing",drying:"drying","rinsing mop":"rinsing_mop","auto cleaning":"auto_cleaning","dry and wet cleaning":"dry_and_wet_cleaning","cleaning and adding water":"cleaning_and_adding_water","charging completed":"charging_completed","returning for mop rinsing":"returning_for_mop_rinsing","washing paused":"washing_paused","ожидание":"idle","уборка":"cleaning","пауза":"paused","возврат":"returning","возвращение на базу":"returning","зарядка":"charging","на базе":"docked","ошибка":"error","точечная уборка":"spot_cleaning","уборка зоны":"zone_cleaning","ручное управление":"manual_control","завершение":"completing","сушка":"drying","полоскание швабры":"rinsing_mop","автоочистка":"auto_cleaning","сухая и влажная уборка":"dry_and_wet_cleaning","очистка и добавление воды":"cleaning_and_adding_water","зарядка завершена":"charging_completed","возвращение для полоскания швабры":"returning_for_mop_rinsing","стирка приостановлена":"washing_paused"},r=t.toLowerCase().trim();let i;i=e[r]?`state_${e[r]}`:`state_${r.replace(/\s+/g,"_").replace(/[^a-zа-я0-9_]/g,"").replace(/[а-я]/g,t=>({"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"ts","ч":"ch","ш":"sh","щ":"sch","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya"}[t]||""))}`;const o=this._t(i);return o&&o!==i?o:t}_getError(){if(this._vacuumService)return this._vacuumService.getError()}_renderRoomIcon(t){if(0===t.id)return O`<ha-icon .icon=${"mdi:home"}></ha-icon>`;const e=this.roomIcons[t.id];let r;return e&&"string"==typeof e&&(r=e),!r&&t.icon&&(r=t.icon),r?r.startsWith("mdi:")||r.startsWith("hass:")||r.includes(":")?O`<ha-icon .icon=${r}></ha-icon>`:O`${r}`:O`🏠`}async _handleStart(){if(this._vacuumService)try{await this._vacuumService.start(this.selectedRooms.length>0?this.selectedRooms:void 0),this.dispatchEvent(new CustomEvent("vacuum-started"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка запуска уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_starting")||"Ошибка запуска"}: ${t}`}}))}}async _handleStop(){if(this._vacuumService)try{await this._vacuumService.stop(),this.dispatchEvent(new CustomEvent("vacuum-stopped"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка остановки уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_stopping")||"Ошибка остановки"}: ${t}`}}))}}async _handlePause(){if(this._vacuumService)try{await this._vacuumService.pause(),this.dispatchEvent(new CustomEvent("vacuum-paused"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка паузы уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_pausing")||"Ошибка паузы"}: ${t}`}}))}}async _handleReturnToBase(){if(this._vacuumService)try{await this._vacuumService.returnToBase(),this.dispatchEvent(new CustomEvent("vacuum-returned"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_returning")||"Ошибка возврата"}: ${t}`}}))}}_toggleRoom(t){if(this._isCleaning())return;const e=this.selectedRooms.indexOf(t);e>-1?(this.selectedRooms.splice(e,1),this.dispatchEvent(new CustomEvent("room-toggled",{detail:{roomId:t,selected:!1}}))):(this.selectedRooms.push(t),this.dispatchEvent(new CustomEvent("room-toggled",{detail:{roomId:t,selected:!0}}))),this.requestUpdate()}_toggleAllRooms(){if(this._isCleaning())return;const t=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));0===this.selectedRooms.length?this.selectedRooms=t.map(t=>t.id):this.selectedRooms=[],this.dispatchEvent(new CustomEvent("all-rooms-toggled")),this.requestUpdate()}render(){const t=this._getVacuumState(),e=this._isButtonDisabled("start"),r=this._isButtonDisabled("stop"),i=this._isButtonDisabled("pause"),o=this._isButtonDisabled("return"),s=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));return O`
      <div class="control-panel">
        <div class="control-panel-status">
          <span class="status-icon ${"cleaning"===t?"cleaning":""}">${Dt(function(t="default"){return{default:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="42" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.25"/>\n  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2" opacity="0.4"/>\n  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2"/>\n  <circle cx="50" cy="28" r="4" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <circle cx="50" cy="28" r="2" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <circle cx="12" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="88" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="12" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <circle cx="88" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <ellipse cx="50" cy="78" rx="3.5" ry="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <circle cx="42" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <circle cx="58" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n</svg>',outline:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary-text-color)" stroke-width="2.5"/>\n  <circle cx="50" cy="28" r="7" fill="none" stroke="var(--primary-text-color)" stroke-width="2"/>\n  <circle cx="50" cy="28" r="4" fill="none" stroke="var(--primary-text-color)" stroke-width="1.5" opacity="0.6"/>\n  <circle cx="50" cy="28" r="2" fill="var(--primary-text-color)"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <circle cx="12" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <circle cx="88" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <circle cx="42" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>\n  <circle cx="58" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>\n</svg>',filled:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="38" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.3"/>\n  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))"/>\n  <circle cx="50" cy="28" r="5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.4"/>\n  <circle cx="50" cy="28" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>\n  <circle cx="12" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <circle cx="88" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <circle cx="12" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>\n  <circle cx="88" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <ellipse cx="50" cy="78" rx="4" ry="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="42" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>\n  <circle cx="58" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>\n</svg>'}[t]}("default"))}</span>
          <div class="status-info">
            <span class="status-text">Статус: <strong>${this._getStateLabel()}${this._getAdditionalState()?`, ${this._getAdditionalStateLabel()}`:""}</strong></span>
            ${this._getError()?O`
              <span class="status-error">${this._getError()}</span>
            `:""}
          </div>
        </div>
        <div class="control-row">
          ${e?"":O`
            <ha-button 
              class="control-button"
              @click=${this._handleStart}
              title="${this._t("start")||"Запуск"}"
            >
              ▶️ ${this._t("start")||"Запуск"}
            </ha-button>
          `}
          ${r?"":O`
            <ha-button 
              class="control-button"
              @click=${this._handleStop}
              title="${this._t("stop")||"Остановка"}"
            >
              ⏹️ ${this._t("stop")||"Остановка"}
            </ha-button>
          `}
          ${i?"":O`
            <ha-button 
              class="control-button"
              @click=${this._handlePause}
              title="${this._t("pause")||"Пауза"}"
            >
              ⏸️ ${this._t("pause")||"Пауза"}
            </ha-button>
          `}
          ${o?"":O`
            <ha-button 
              class="control-button"
              @click=${this._handleReturnToBase}
              title="${this._t("return_to_base")||"На станцию"}"
            >
              🏠 ${this._t("return_to_base")||"На станцию"}
            </ha-button>
          `}
        </div>
        <div class="control-row rooms-row">
          ${s.length>0?O`
            ${(()=>{const t=this._isCleaning(),e=t,r=!t&&0===this.selectedRooms.length;return O`
                <ha-card 
                  class="room-button ${r?"pressed":""} ${e?"disabled":""}"
                  @click=${e?void 0:this._toggleAllRooms}
                  title="${this._t("all_rooms")}${e?" (идет уборка)":""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon({id:0,name:this._t("all_rooms")})}</div>
                    <div class="button-label">${this._t("all_rooms")}</div>
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `})()}
            ${s.map(t=>{const e=this._isCleaning(),r=this.selectedRooms.includes(t.id),i=e?this._currentCleaningRooms.includes(t.id):r;return O`
                <ha-card 
                  class="room-button ${i?"pressed":""} ${e?"disabled":""}"
                  @click=${e?void 0:()=>this._toggleRoom(t.id)}
                  title="${t.name}${this.showRoomIds?` (ID: ${t.id})`:""}${e&&this._currentCleaningRooms.includes(t.id)?" (убирается)":""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon(t)}</div>
                    <div class="button-label">${t.name}</div>
                    ${this.showRoomIds?O`<div class="button-id">ID: ${t.id}</div>`:""}
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `})}
          `:O`<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `}static get styles(){return n`
      .control-panel {
        margin-bottom: 16px;
        padding: 0;
      }
      .control-panel-status {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 12px;
        line-height: 1.4;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 8px;
      }
      .status-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 128px;
        height: 128px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }
      .status-icon svg {
        width: 100%;
        height: 100%;
      }
      .status-icon.cleaning {
        animation: vacuum-cleaning 2s ease-in-out infinite;
      }
      @keyframes vacuum-cleaning {
        0%, 100% {
          transform: translateX(0) rotate(0deg);
        }
        25% {
          transform: translateX(4px) rotate(-2deg);
        }
        50% {
          transform: translateX(0) rotate(0deg);
        }
        75% {
          transform: translateX(-4px) rotate(2deg);
        }
      }
      .status-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }
      .status-text {
        display: inline-flex;
        align-items: center;
      }
      .status-error {
        display: inline-flex;
        align-items: center;
        color: var(--error-color, var(--state-error-color));
        font-size: 11px;
        font-weight: 500;
        padding: 4px 8px;
        background: var(--error-background-color, rgba(var(--rgb-error-color), 0.1));
        border-radius: var(--ha-card-border-radius, 4px);
        margin-top: 4px;
        word-break: break-word;
      }
      .control-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .control-row:last-child {
        margin-bottom: 0;
      }
      .control-button {
        flex: 1;
        min-width: 120px;
        min-height: 56px;
        font-size: 16px;
        padding: 12px 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .rooms-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, var(--ha-card-border-color));
      }
      .room-button {
        flex: 1;
        min-width: 100px;
        max-width: 100%;
        --ha-ripple-color: var(--primary-color, var(--mdc-theme-primary));
        --ha-ripple-hover-color: var(--ha-ripple-color);
        --ha-ripple-pressed-color: var(--ha-ripple-color);
        --ha-ripple-hover-opacity: 0.04;
        --ha-ripple-pressed-opacity: 0.12;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: normal;
        min-height: 80px;
        padding: 16px 12px;
        margin: 4px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      .room-button .button-icon {
        font-size: 32px;
        line-height: 1;
        transition: none;
        max-width: 100%;
        max-height: 36px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-text-color);
      }
      .room-button .button-label {
        font-size: 14px;
        font-weight: 500;
        line-height: 1.3;
        text-align: center;
        color: var(--primary-text-color);
        transition: color 0.2s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .room-button .button-id {
        font-size: 11px;
        opacity: 0.7;
        line-height: 1;
        font-family: monospace;
        color: var(--secondary-text-color);
        transition: opacity 0.2s ease, color 0.2s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 6px;
        box-sizing: border-box;
      }
      .room-button.pressed {
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
      }
      .room-button.disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.8;
      }
      .room-button.disabled.pressed {
        opacity: 1;
      }
      .room-button.pressed .button-icon {
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
      .room-button.pressed .button-label {
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
        font-weight: 500;
      }
      .room-button.pressed .button-id {
        opacity: 0.9;
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
      .room-button:active:not(.pressed) {
        transform: scale(0.98);
      }
      @media (hover: hover) and (pointer: fine) {
        .room-button:hover:not(.pressed) {
          background: var(--primary-color, var(--mdc-theme-primary));
          opacity: var(--ha-ripple-hover-opacity, 0.04);
        }
      }
      ha-ripple {
        --md-ripple-color: var(--ha-ripple-color);
        --md-ripple-hover-color: var(--ha-ripple-hover-color);
        --md-ripple-pressed-color: var(--ha-ripple-pressed-color);
        --md-ripple-hover-opacity: var(--ha-ripple-hover-opacity);
        --md-ripple-pressed-opacity: var(--ha-ripple-pressed-opacity);
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-theme-on-primary: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
    `}};t([ct({attribute:!1})],Nt.prototype,"hass",void 0),t([ct()],Nt.prototype,"entity",void 0),t([ct({attribute:!1})],Nt.prototype,"rooms",void 0),t([ct({attribute:!1})],Nt.prototype,"selectedRooms",void 0),t([ct({attribute:!1})],Nt.prototype,"hiddenRooms",void 0),t([ct()],Nt.prototype,"showRoomIds",void 0),t([ct({attribute:!1})],Nt.prototype,"roomIcons",void 0),t([lt()],Nt.prototype,"_vacuumService",void 0),t([lt()],Nt.prototype,"_currentCleaningRooms",void 0),Nt=t([nt("vacuum-control-panel")],Nt);let Vt=class extends ot{constructor(){super(...arguments),this.schedules=[],this.rooms=[]}_t(t){return xt(t,this.hass)}_formatDays(t){return function(t,e,r){return 0===t.length?r.noDays:7===t.length?r.everyDay:t.map(t=>e[t]).join(", ")}(t,St(this.hass),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,r){if(0===t.length)return r;const i=t.map(t=>{const r=e.find(e=>e.id===t);return r?r.name:`ID:${t}`}).join(", ");return i||"Комнаты не выбраны"}(t,this.rooms,this._t("all_rooms"))}_handleEdit(t){this.dispatchEvent(new CustomEvent("schedule-edit",{detail:{schedule:t}}))}_handleDelete(t){this.dispatchEvent(new CustomEvent("schedule-delete",{detail:{schedule:t}}))}async _handleToggle(t,e){this.dispatchEvent(new CustomEvent("schedule-toggle",{detail:{schedule:t,enabled:e}}))}render(){return 0===this.schedules.length?O`<div class="content">${this._t("no_schedules")}</div>`:O`
      <div class="schedules-list">
        ${this.schedules.map(t=>O`
            <div class="schedule-item" @click=${()=>this._handleEdit(t)}>
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
                  @change=${e=>this._handleToggle(t,e.target.checked)}
                ></ha-switch>
                <button
                  class="action-button"
                  @click=${()=>this._handleDelete(t)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          `)}
      </div>
    `}static get styles(){return n`
      .schedules-list {
        margin-top: 16px;
      }
      .schedule-item {
        padding: 16px;
        margin-bottom: 8px;
        min-height: 64px;
        background: var(--card-background-color, var(--ha-card-background));
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.2s ease;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .schedule-item:hover {
          background: var(--divider-color, var(--ha-card-border-color));
          opacity: 0.8;
        }
      }
      .schedule-item:active {
        background: var(--divider-color, var(--ha-card-border-color));
        opacity: 0.6;
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
        padding: 12px;
        min-width: 44px;
        min-height: 44px;
        color: var(--secondary-text-color);
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .action-button:hover {
          color: var(--primary-color);
        }
      }
      .action-button:active {
        color: var(--primary-color);
        opacity: 0.7;
      }
      .toggle-switch {
        margin-right: 12px;
        min-width: 48px;
        min-height: 24px;
      }
      .schedule-info {
        flex: 1;
      }
      .schedule-time {
        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
        color: var(--primary-text-color);
      }
      .schedule-days {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-top: 4px;
        line-height: 1.4;
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
    `}};t([ct({attribute:!1})],Vt.prototype,"hass",void 0),t([ct({attribute:!1})],Vt.prototype,"schedules",void 0),t([ct({attribute:!1})],Vt.prototype,"rooms",void 0),Vt=t([nt("vacuum-schedule-list")],Vt);let It=class extends ot{constructor(){super(...arguments),this.open=!1,this.rooms=[],this.hiddenRooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}updated(t){if(t.has("schedule")||t.has("open"))if(this.open&&this.schedule){const t=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id)),e=this.schedule.rooms.filter(e=>t.some(t=>t.id===e));this._newSchedule={enabled:this.schedule.enabled,days:[...this.schedule.days],time:this.schedule.time,rooms:e,name:this.schedule.name}}else this.open&&!this.schedule&&(this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]})}_t(t){return xt(t,this.hass)}_getDayNames(){return St(this.hass)}_handleClose(){this.dispatchEvent(new CustomEvent("dialog-close"))}_handleSave(){this._newSchedule.time?this._newSchedule.days&&0!==this._newSchedule.days.length?(this.error=void 0,this.dispatchEvent(new CustomEvent("schedule-save",{detail:{schedule:{id:this.schedule?.id,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days||[],time:this._newSchedule.time||"09:00",rooms:this._newSchedule.rooms||[],name:this._newSchedule.name}}}))):this.error=this._t("error_days_required")||"Выберите хотя бы один день":this.error=this._t("error_time_required")||"Время обязательно"}_handleDayToggle(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);-1===e?this._newSchedule.days.push(t):this._newSchedule.days.splice(e,1),this.requestUpdate()}_handleTimeChange(t){this._newSchedule.time=t.target.value}_handleToggleAllRooms(t){const e=t.target.checked,r=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));this._newSchedule.rooms=e?r.map(t=>t.id):[],this.requestUpdate()}_handleToggleRoom(t,e){this._newSchedule.rooms||(this._newSchedule.rooms=[]);if(e.target.checked)this._newSchedule.rooms.includes(t)||this._newSchedule.rooms.push(t);else{const e=this._newSchedule.rooms.indexOf(t);-1!==e&&this._newSchedule.rooms.splice(e,1)}this.requestUpdate()}_handleEnabledChange(t){this._newSchedule.enabled=t.target.checked}_handleNameChange(t){this._newSchedule.name=t.target.value||void 0}render(){if(!this.open)return O``;const t=this._getDayNames(),e=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));return O`
      <div class="dialog" @click=${this._handleClose}>
        <div class="dialog-content" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            ${this.schedule?this._t("edit_schedule"):this._t("add_schedule")}
          </div>

          ${this.error?O`<div class="error">${this.error}</div>`:""}

          <div class="form-group">
            <label class="form-label">${this._t("name_label")}</label>
            <input
              type="text"
              class="form-input"
              .value=${this._newSchedule.name||""}
              @input=${this._handleNameChange}
              placeholder=${this._t("name_placeholder")||"Название расписания (необязательно)"}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("days_label")}</label>
            <div class="days-selector">
              ${t.map((t,e)=>{const r=0===e?0:e;return O`
                  <button
                    class="day-button ${this._newSchedule.days?.includes(r)?"selected":""}"
                    @click=${()=>this._handleDayToggle(r)}
                  >
                    ${t}
                  </button>
                `})}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("time_label")}</label>
            <input
              type="time"
              class="form-input"
              .value=${this._newSchedule.time||"09:00"}
              @input=${this._handleTimeChange}
            />
          </div>

          <div class="form-group">
            ${(()=>O`
                <label class="form-label">${this._t("rooms_label")} (${e.length} ${this._t("rooms_available")})</label>
                <div class="rooms-selector">
                  ${e.length>0?O`
                    <div class="select-all-rooms">
                      <label>
                        <input
                          type="checkbox"
                          class="room-checkbox"
                          .checked=${this._newSchedule.rooms?.length===e.length&&e.length>0}
                          @change=${this._handleToggleAllRooms}
                        />
                        ${this._t("select_all")}
                      </label>
                    </div>
                    ${e.map(t=>O`
                      <div class="room-item">
                        <input
                          type="checkbox"
                          class="room-checkbox"
                          .checked=${this._newSchedule.rooms?.includes(t.id)||!1}
                          @change=${e=>this._handleToggleRoom(t.id,e)}
                        />
                        <span>${t.name} (ID: ${t.id})</span>
                      </div>
                    `)}
                  `:O`<div class="content">${this._t("rooms_not_found")}</div>`}
                </div>
              `)()}
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                type="checkbox"
                .checked=${this._newSchedule.enabled??!0}
                @change=${this._handleEnabledChange}
              />
              ${this._t("enabled")}
            </label>
          </div>

          <div class="dialog-actions">
            <ha-button class="button-secondary" @click=${this._handleClose}>
              ${this._t("cancel")}
            </ha-button>
            <ha-button @click=${this._handleSave}>
              ${this._t("save")}
            </ha-button>
          </div>
        </div>
      </div>
    `}static get styles(){return n`
      .dialog {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: var(--ha-dialog-backdrop, var(--mdc-dialog-scrim-color)) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 99999 !important;
        pointer-events: auto;
      }
      .dialog-content {
        background: var(--card-background-color, var(--ha-card-background, var(--primary-background-color))) !important;
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--ha-card-box-shadow);
        position: relative;
        z-index: 100000;
      }
      .dialog-header {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 24px;
        color: var(--primary-text-color);
        line-height: 1.5;
      }
      .error {
        color: var(--error-color, var(--state-error-color));
        padding: 12px 16px;
        background: var(--error-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 1.5;
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-label {
        display: block;
        margin-bottom: 8px;
        color: var(--primary-text-color);
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
      }
      .days-selector {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 4px;
      }
      .day-button {
        flex: 1;
        min-width: 56px;
        min-height: 56px;
        padding: 12px 8px;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
        font-size: 14px;
        font-weight: 500;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .day-button:hover {
          background: var(--primary-color);
          color: var(--text-primary-color, var(--primary-text-color));
          border-color: var(--primary-color);
        }
      }
      .day-button:active {
        transform: scale(0.95);
      }
      .day-button.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, var(--primary-text-color));
        border-color: var(--primary-color);
      }
      .form-input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        font-size: 16px;
        font-family: inherit;
        box-sizing: border-box;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .form-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      .rooms-selector {
        max-height: 300px;
        overflow-y: auto;
        border: 2px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        padding: 12px;
        background: var(--card-background-color, var(--ha-card-background));
        margin-top: 4px;
      }
      .room-item {
        padding: 12px;
        margin-bottom: 8px;
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
        cursor: pointer;
        transition: all 0.2s;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-item:hover {
          background: var(--primary-color);
          color: var(--text-primary-color, var(--primary-text-color));
        }
      }
      .room-item:active {
        transform: scale(0.98);
      }
      .room-checkbox {
        margin-right: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .select-all-rooms {
        padding-bottom: 12px;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color));
        font-weight: 500;
      }
      .select-all-rooms label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .room-item label {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 100%;
      }
      .room-item span {
        flex: 1;
        color: var(--primary-text-color);
        font-size: 14px;
      }
      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
      }
      .content {
        text-align: center;
        padding: 24px;
        color: var(--secondary-text-color);
      }
    `}};t([ct({attribute:!1})],It.prototype,"hass",void 0),t([ct({type:Boolean})],It.prototype,"open",void 0),t([ct({attribute:!1})],It.prototype,"schedule",void 0),t([ct({attribute:!1})],It.prototype,"rooms",void 0),t([ct({attribute:!1})],It.prototype,"hiddenRooms",void 0),t([ct()],It.prototype,"error",void 0),t([lt()],It.prototype,"_newSchedule",void 0),It=t([nt("vacuum-schedule-dialog")],It);let Ot=class extends ot{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._selectedRoomsForControl=[]}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this.hass&&(this._scheduleService=new At(this.hass,this.entity,t=>this._t(t)),this._loadSchedules(),this._loadRooms())}connectedCallback(){super.connectedCallback(),this.hass&&this.entity&&(this._scheduleService=new At(this.hass,this.entity,t=>this._t(t)),this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeAutomations&&(this._unsubscribeAutomations(),this._unsubscribeAutomations=void 0)}_subscribeToAutomationChanges(){this._unsubscribeAutomations&&(this._unsubscribeAutomations(),this._unsubscribeAutomations=void 0);const t=function(t,e,r){if(!t?.connection)return null;try{if("function"==typeof t.connection.subscribeEvents){const i=t.connection.subscribeEvents(t=>{const i=t.event?.data?.entity_id;i&&i.startsWith(e)&&r()},"state_changed");if("function"==typeof i)return{unsubscribe:()=>{try{i()}catch(t){}}}}}catch(t){console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:",t)}return null}(this.hass,`automation.${mt}`,()=>{this._loadSchedules()});t&&(this._unsubscribeAutomations=t.unsubscribe)}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await Ct(this.hass,this.entity,t=>this._t(t),this._config?.room_icons),this.requestUpdate())}async _loadSchedules(){if(this.hass&&this._scheduleService){this._loading=!0,this._error=void 0;try{this._schedules=await this._scheduleService.loadSchedules()}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}_t(t){return xt(t,this.hass)}_handleRoomToggled(t){const{roomId:e,selected:r}=t.detail;this._selectedRoomsForControl=r?[...this._selectedRoomsForControl,e]:this._selectedRoomsForControl.filter(t=>t!==e),this.requestUpdate()}_handleAllRoomsToggled(){0===this._selectedRoomsForControl.length?this._selectedRoomsForControl=this._rooms.map(t=>t.id):this._selectedRoomsForControl=[],this.requestUpdate()}_handleScheduleEdit(t){this._editingSchedule=t.detail.schedule,this._showAddDialog=!0,this._error=void 0,this.requestUpdate()}_handleScheduleDelete(t){const e=t.detail.schedule;confirm(this._t("delete_confirm"))&&this._deleteSchedule(e)}async _deleteSchedule(t){if(this._scheduleService){this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate();try{await this._scheduleService.deleteSchedule(t),await this._loadSchedules()}catch(t){console.error("[Vacuum Schedule Card] Ошибка удаления расписания:",t),this._error=`${this._t("error_deleting")||"Ошибка удаления"}: ${t}`,this.requestUpdate()}}}async _handleScheduleToggle(t){const{schedule:e,enabled:r}=t.detail;if(!this._scheduleService)return;const i={...e,enabled:r};this._schedules=this._schedules.map(t=>t.id===e.id?i:t),this.requestUpdate();try{await this._scheduleService.toggleSchedule(e,r),await this._loadSchedules()}catch(t){console.error("[Vacuum Schedule Card] Ошибка переключения расписания:",t),this._error=`${this._t("error_toggling")||"Ошибка переключения"}: ${t}`,this.requestUpdate()}}_handleScheduleSave(t){const{schedule:e,oldSchedule:r}=t.detail;if(!this._scheduleService)return;let i=[...this._schedules];if(r){const t=i.findIndex(t=>t.id===r.id);t>-1&&(i[t]=e)}else i.push(e);this._schedules=i,this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this.requestUpdate(),this._scheduleService.saveSchedule(e,r).then(()=>this._loadSchedules()).catch(t=>{console.error("[Vacuum Schedule Card] Ошибка сохранения расписания:",t),this._error=`${this._t("error_saving")} ${t}`,this.requestUpdate()})}_handleDialogClose(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this.requestUpdate()}_handleError(t){this._error=t.detail.message,this.requestUpdate()}_handleAddSchedule(){this._editingSchedule=void 0,this._showAddDialog=!0,this._error=void 0,this.requestUpdate()}render(){if(!this.hass||!this.entity)return O`<ha-card>
        <div class="content">${this._t("error_no_entity")}</div>
      </ha-card>`;return this.hass.states[this.entity]?O`
      <ha-card>
        <div class="header">
          <span>${this._config?.title||"Пылесос"}</span>
          <span>${this._schedules.length} ${this._t("schedules_count")}</span>
        </div>
        
        <vacuum-control-panel
          .hass=${this.hass}
          .entity=${this.entity}
          .rooms=${this._rooms}
          .selectedRooms=${this._selectedRoomsForControl}
          .hiddenRooms=${this._config?.hidden_rooms||[]}
          .showRoomIds=${this._config?.show_room_ids||!1}
          .roomIcons=${this._config?.room_icons||{}}
          @room-toggled=${this._handleRoomToggled}
          @all-rooms-toggled=${this._handleAllRoomsToggled}
          @error=${this._handleError}
        ></vacuum-control-panel>
          
        ${this._error&&!this._showAddDialog?O`<div class="error">${this._error}</div>`:""}
          
        ${this._loading?O`<div class="loading">${this._t("loading")}</div>`:O`
              <vacuum-schedule-list
                .hass=${this.hass}
                .schedules=${this._schedules}
                .rooms=${this._rooms}
                @schedule-edit=${this._handleScheduleEdit}
                @schedule-delete=${this._handleScheduleDelete}
                @schedule-toggle=${this._handleScheduleToggle}
              ></vacuum-schedule-list>
              
              <ha-button class="add-button" @click=${this._handleAddSchedule}>
                ${this._t("add_schedule")}
              </ha-button>
            `}
      </ha-card>
      <vacuum-schedule-dialog
        .hass=${this.hass}
        .open=${this._showAddDialog}
        .schedule=${this._editingSchedule}
        .rooms=${this._rooms}
        .hiddenRooms=${this._config?.hidden_rooms||[]}
        .error=${this._error}
        @schedule-save=${this._handleScheduleSave}
        @dialog-close=${this._handleDialogClose}
        @error=${this._handleError}
      ></vacuum-schedule-dialog>
    `:O`<ha-card>
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </ha-card>`}getCardSize(){return 3}getGridOptions(){return gt}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card",title:void 0,hidden_rooms:[],show_room_ids:!1,room_icons:{}}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"title",required:!1,selector:{text:{}}}],computeLabel:t=>"entity"===t.name?"Vacuum Entity":"title"===t.name?"Card Title":void 0,computeHelper:t=>"entity"===t.name?"Select the vacuum entity to manage schedules for":"title"===t.name?"Custom title for the card (optional). If not specified, default title will be used.":void 0}}static get styles(){return n`
      :host {
        display: block;
      }
      ha-card {
        padding: 16px;
        overflow: hidden;
        position: relative;
      }
      .header {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color));
        color: var(--primary-text-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.5;
      }
      .content {
        color: var(--primary-text-color);
        font-size: 14px;
        line-height: 1.5;
      }
      .error {
        color: var(--error-color, var(--state-error-color));
        padding: 12px 16px;
        background: var(--error-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 1.5;
      }
      .loading {
        text-align: center;
        padding: 24px 16px;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
      .add-button {
        margin-top: 20px;
        width: 100%;
        min-height: 56px;
        font-size: 16px;
        padding: 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-theme-on-primary: var(--text-primary-color, var(--mdc-theme-on-primary));
      }
    `}};t([ct({attribute:!1})],Ot.prototype,"hass",void 0),t([ct()],Ot.prototype,"entity",void 0),t([lt()],Ot.prototype,"_schedules",void 0),t([lt()],Ot.prototype,"_loading",void 0),t([lt()],Ot.prototype,"_error",void 0),t([lt()],Ot.prototype,"_showAddDialog",void 0),t([lt()],Ot.prototype,"_editingSchedule",void 0),t([lt()],Ot.prototype,"_rooms",void 0),t([lt()],Ot.prototype,"_selectedRoomsForControl",void 0),Ot=t([nt("vacuum-schedule-card")],Ot),customElements.get(pt)||customElements.define(pt,Ot),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:pt,name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{Ot as VacuumScheduleCard};
