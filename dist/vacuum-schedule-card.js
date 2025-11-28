function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:p},g="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(s=>{const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:_).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:_;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var f;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,S="?"+A,x=`<${S}>`,E=document,k=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,U="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,N=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,M=/"/g,O=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),L=new WeakMap,B=E.createTreeWalker(E,129,null,!1);function q(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const W=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=T;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===T?"!--"===l[1]?r=D:void 0!==l[1]?r=N:void 0!==l[2]?(O.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=null!=o?o:T,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?M:H):r===M||r===H?r=R:r===D||r===N?r=T:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===T?s+x:c>=0?(i.push(a),s.slice(0,c)+w+s.slice(c)+A+h):s+A+(-2===c?(i.push(void 0),e):h)}return[q(t,n+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class V{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=V.createElement(l,s),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=B.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(w)||e.startsWith(A)){const s=c[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+w).split(A),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:J})}else a.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(O.test(i.tagName)){const t=i.textContent.split(A),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),B.nextNode(),a.push({type:2,index:++o});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(A,t+1));)a.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function F(t,e,s=t,i){var o,n,r,a;if(e===z)return e;let l=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,i)),void 0!==i?(null!==(r=(a=s)._$Co)&&void 0!==r?r:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,i)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(s,!0);B.currentNode=o;let n=B.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new G(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=i[++a]}r!==(null==l?void 0:l.index)&&(n=B.nextNode(),r++)}return B.currentNode=E,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{constructor(t,e,s,i){var o;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),C(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(q(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new K(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new V(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new G(this.k(k()),this.k(k()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,o){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=F(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=F(this,i[s+r],e,r),a===z&&(a=this._$AH[r]),n||(n=!C(a)||a!==this._$AH[r]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const Q=$?$.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=F(this,t,e,0))&&void 0!==s?s:I)===z)return;const i=this._$AH,o=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==I&&(i===I||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(V,G),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");var st,it;class ot extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new G(e.insertBefore(k(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function at(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):rt(t,e)}function lt(t){return at({...t,state:!0})}var ct;async function dt(t){try{if(t.connection&&"function"==typeof t.connection.sendMessagePromise)try{const e=await t.connection.sendMessagePromise({type:"get_config"});if(e?.success&&e.result){const t=e.result;if(t.components?.automation){const e=t.components.automation;if(Array.isArray(e))return e}if(t.automation&&Array.isArray(t.automation))return t.automation}}catch(t){console.warn("Ошибка получения конфигурации через get_config:",t)}const e=Object.keys(t.states).filter(t=>t.startsWith("automation."));if(0===e.length)return[];if(t.connection&&"function"==typeof t.connection.sendMessagePromise){const s=[];let i=!0;for(const o of e){const e=o.replace("automation.","");try{const i=await t.connection.sendMessagePromise({type:"automation/get",automation_id:e});i?.success&&i.result&&s.push(i.result)}catch(t){if("unknown_command"===t.code){console.warn("Команда automation/get не поддерживается, используем fallback"),i=!1;break}continue}}if(s.length>0)return console.log(`Получено ${s.length} полных конфигураций автоматизаций через automation/get`),s;i||console.warn("automation/get не поддерживается, возвращаем объекты из hass.states (без полной конфигурации)")}return e.map(e=>{const s=t.states[e],i=e.replace("automation.","");return{id:s.attributes?.id||i,alias:s.attributes?.friendly_name||i,_entity_id:e,_state:s.state,_attributes:s.attributes}})}catch(t){return console.warn("Ошибка получения списка автоматизаций:",t),[]}}function ht(t,e){const s=t.id||"";if(!s.startsWith("vacuum_schedule_")||!s.includes("_day_"))return null;const i=s.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!i)return null;const o=i[1],n=parseInt(i[2],10),r=(Array.isArray(t.trigger)?t.trigger:[t.trigger]).find(t=>"time"===t.platform);if(!r?.at)return null;const a=r.at.substring(0,5),l=(Array.isArray(t.action)?t.action:[t.action]).find(t=>t.service?.includes("vacuum_clean_segment"));return{scheduleId:o,day:n,time:a,rooms:l?.data?.segments||[],enabled:"on"===e?.state}}async function ut(t,e,s){try{const i=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const s=`${window.location.origin}/api/states`,i=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!i.ok)return console.warn(`Не удалось получить список сущностей: ${i.status}`),null;const o=await i.json(),n={};return Array.isArray(o)&&o.forEach(t=>{t.entity_id&&(n[t.entity_id]=t)}),n}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),o=e.replace("vacuum.",""),n=[],r=[o,o.replace(/_/g,""),"pylesos","vacuum"],a=e=>t.states[e]||i?.[e]||null;for(const t of r){for(let e=1;e<=50;e++){const s=`select.${t}_room_${e}_name`,i=`select.${t}_room_${e}_id`||`number.${t}_room_${e}_id`,o=a(s),r=a(i);if(o&&o.state){let t;if(r&&r.state)t=parseInt(r.state,10);else{const i=s.match(/room_(\d+)/);t=i?parseInt(i[1],10):e}isNaN(t)||n.push({id:t,name:o.state})}}if(n.length>0)break}if(n.length>0)return n.sort((t,e)=>t.id-e.id);const l=t.states[e];if(l?.attributes){const t=l.attributes.segments||l.attributes.room_list||[];if(Array.isArray(t)&&t.length>0)return t.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`}))}return _t(s)}catch(t){return console.error("Ошибка загрузки комнат:",t),_t(s)}}function _t(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;const pt={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom"}};function mt(t,e){const s=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return pt[s]?.[t]||pt.en[t]||t}let gt=class extends ot{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&(this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){console.warn("Ошибка при отписке от изменений автоматизаций:",t)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e&&e.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof t?t:()=>{this.hass.connection}}catch(t){console.warn("Не удалось подписаться на события:",t)}}catch(t){console.warn("Не удалось подписаться на изменения автоматизаций:",t)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await ut(this.hass,this.entity,t=>this._t(t)),this.requestUpdate())}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const t=new Map,e=await dt(this.hass);console.log("Всего автоматизаций получено:",e.length);for(const s of e)try{const e=s.id||"";if(e.includes("vacuum_schedule")&&console.log("Найдена потенциальная автоматизация расписания:",{id:e,hasTrigger:!!s.trigger,hasAction:!!s.action,config:s}),!e.startsWith("vacuum_schedule_")||!e.includes("_day_"))continue;let i=null;const o=`automation.${e}`;if(this.hass.states[o])i=this.hass.states[o];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const s=this.hass.states[t];if(s.attributes?.id===e){i=s;break}}const n=ht(s,i);if(!n)continue;console.log(`Найдена автоматизация расписания: id=${e}, scheduleId=${n.scheduleId}, day=${n.day}`);let r=t.get(n.scheduleId);r||(r={id:n.scheduleId,enabled:n.enabled,days:[],time:n.time,rooms:n.rooms},t.set(n.scheduleId,r)),r.days.includes(n.day)||r.days.push(n.day),n.rooms.length>0&&(r.rooms=n.rooms),i?r.enabled="on"===i.state:n.enabled&&(r.enabled=!0)}catch(t){console.warn("Ошибка обработки автоматизации:",t)}console.log("Всего обработано автоматизаций:",e.length),console.log("Создано расписаний:",t.size);for(const e of t.values())e.days.sort((t,e)=>t-e);this._schedules=Array.from(t.values())}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card"}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}}],computeLabel:t=>{if("entity"===t.name)return"Vacuum Entity"},computeHelper:t=>{if("entity"===t.name)return"Select the vacuum entity to manage schedules for"}}}static get styles(){return r`
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
    `}_t(t){return mt(t,this.hass)}_getDayNames(){return mt("day_names",this.hass).split(",")}_formatDays(t){return function(t,e,s){return 0===t.length?s.noDays:7===t.length?s.everyDay:t.map(t=>e[t]).join(", ")}(t,this._getDayNames(),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,s){if(0===t.length)return s;const i=t.map(t=>{const s=e.find(e=>e.id===t);return s?s.name:`ID:${t}`}).join(", ");return i||"Комнаты не выбраны"}(t,this._rooms,this._t("all_rooms"))}render(){if(!this.hass||!this.entity)return j`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;return this.hass.states[this.entity]?j`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error&&!this._showAddDialog?j`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?j`<div class="loading">${this._t("loading")}</div>`:j`
                <div class="schedules-list">
                  ${0===this._schedules.length?j`<div class="content">${this._t("no_schedules")}</div>`:this._schedules.map(t=>j`
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
      ${this._showAddDialog?j`
        <div class="dialog" @click=${t=>{t.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?this._t("edit_schedule"):this._t("add_schedule_title")}
            </div>

            ${this._error?j`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">${this._t("days_label")}</label>
              <div class="days-selector">
                ${this._getDayNames().map((t,e)=>j`
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
                ${this._rooms.length>0?j`
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
                  ${this._rooms.map(t=>j`
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
                `:j`<div class="content">${this._t("rooms_not_found")}</div>`}
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
    `:j`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`}_addSchedule(){this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass)return;const s={...t,enabled:e};this._schedules=this._schedules.map(e=>e.id===t.id?s:e),this.requestUpdate(),await this._updateAutomationsForSchedule(s,t)}async _deleteSchedule(t){if(this.hass&&confirm(this._t("delete_confirm"))){for(const e of t.days)await this._deleteAutomation(t.id,e);this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate()}}async _createAutomation(t,e){if(!this.hass)return;const s=function(t,e,s,i,o){const n=`vacuum_schedule_${t.id}_day_${e}`,r=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,l]=t.time.split(":").map(Number);return{id:n,alias:`${o} ${t.time} - ${i[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${i[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(l).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:r}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:s},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,this._getDayNames(),this._t("schedule_title"));await async function(t,e){try{const s=(await dt(t)).find(t=>t.id===e.id),i=!!s;if(console.log(`Попытка ${i?"обновить":"создать"} автоматизацию:`,{id:e.id,alias:e.alias,hasTrigger:!!e.trigger,hasAction:!!e.action}),t.connection&&"function"==typeof t.connection.sendMessagePromise)try{const s=i?"config/automation/update":"config/automation/create",o=await t.connection.sendMessagePromise({type:s,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"});if(o?.success){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("Не удалось перезагрузить автоматизации:",t)}return console.log(`Автоматизация ${e.id} успешно ${i?"обновлена":"создана"}`),!0}if(i){console.log("Пробуем удалить и создать заново...");try{const s=await t.connection.sendMessagePromise({type:"config/automation/delete",automation_id:e.id});if(s?.success||"not_found"===s?.error?.code){const s=await t.connection.sendMessagePromise({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"});if(s?.success){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("Не удалось перезагрузить автоматизации:",t)}return console.log(`Автоматизация ${e.id} успешно обновлена (удалена и создана заново)`),!0}console.error("Ошибка создания автоматизации после удаления:",s.error)}}catch(t){console.warn("Ошибка при попытке удалить автоматизацию:",t)}}return console.error(`Не удалось ${i?"обновить":"создать"} автоматизацию ${e.id}:`,o.error),!1}catch(t){return console.error(`Ошибка ${i?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}return console.warn(`Не удалось ${i?"обновить":"создать"} автоматизацию ${e.id}: WebSocket недоступен`),!1}catch(t){return console.error(`Ошибка создания автоматизации ${e.id}:`,t),!1}}(this.hass,s)}async _deleteAutomation(t,e){if(!this.hass)return;const s=`vacuum_schedule_${t}_day_${e}`;await async function(t,e){try{if(t.connection&&"function"==typeof t.connection.sendMessagePromise)try{const s=await t.connection.sendMessagePromise({type:"call_service",domain:"automation",service:"delete",service_data:{id:e}});if(s?.success){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("Не удалось перезагрузить автоматизации:",t)}return!0}return console.warn(`Не удалось удалить автоматизацию ${e}:`,s.error),!1}catch(t){return console.warn(`Ошибка удаления автоматизации ${e}:`,t),!1}return console.warn(`Не удалось удалить автоматизацию ${e}: WebSocket недоступен`),!1}catch(t){return console.warn(`Ошибка удаления автоматизации ${e}:`,t),!1}}(this.hass,s)}async _updateAutomationsForSchedule(t,e){if(!t.enabled){const s=e?e.days:t.days;for(const e of s)await this._deleteAutomation(t.id,e);return}if(e){const s=e.days.filter(e=>!t.days.includes(e));for(const e of s)await this._deleteAutomation(t.id,e)}for(const e of t.days)await this._createAutomation(t,e)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass)return void(this._error=this._t("error_no_hass"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];const s=this._editingSchedule;if(this._editingSchedule){const s=e.findIndex(t=>t.id===this._editingSchedule.id);s>-1&&(e[s]=t)}else e.push(t);try{this._schedules=e,this.requestUpdate(),await this._updateAutomationsForSchedule(t,s);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules(),this._closeDialog(),this._error=void 0,this.requestUpdate()}catch(t){this._error=`${this._t("error_saving")} ${t}`,console.error("Ошибка сохранения расписания:",t)}}};t([at({attribute:!1})],gt.prototype,"hass",void 0),t([at()],gt.prototype,"entity",void 0),t([lt()],gt.prototype,"_schedules",void 0),t([lt()],gt.prototype,"_loading",void 0),t([lt()],gt.prototype,"_error",void 0),t([lt()],gt.prototype,"_showAddDialog",void 0),t([lt()],gt.prototype,"_editingSchedule",void 0),t([lt()],gt.prototype,"_rooms",void 0),t([lt()],gt.prototype,"_newSchedule",void 0),gt=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],gt),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",gt),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{gt as VacuumScheduleCard};
