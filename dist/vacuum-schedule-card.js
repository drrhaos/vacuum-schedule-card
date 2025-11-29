function t(t,e,o,r){var s,i=arguments.length,n=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(i<3?s(n):i>3?s(e,o,n):s(e,o))||n);return i>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let i=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1],t[0]);return new i(o,t,r)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new i("string"==typeof t?t:t+"",void 0,r))(e)})(t):t;var c;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",u=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},m=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},g="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,o)=>{const r=this._$Ep(o,e);void 0!==r&&(this._$Ev.set(r,o),t.push(r))}),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,o;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const r=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{o?t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(o=>{const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=o.cssText,t.appendChild(r)})})(r,this.constructor.elementStyles),r}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=_){var r;const s=this.constructor._$Ep(t,o);if(void 0!==s&&!0===o.reflect){const i=(void 0!==(null===(r=o.converter)||void 0===r?void 0:r.toAttribute)?o.converter:p).toAttribute(e,o.type);this._$El=t,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$El=null}}_$AK(t,e){var o;const r=this.constructor,s=r._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=r.getPropertyOptions(s),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(o=t.converter)||void 0===o?void 0:o.fromAttribute)?t.converter:p;this._$El=s,this[s]=i.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,o){let r=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(o)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var f;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(c=l.reactiveElementVersions)&&void 0!==c?c:l.reactiveElementVersions=[]).push("1.6.3");const y=window,b=y.trustedTypes,$=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,A=`<${S}>`,k=document,E=()=>k.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,V=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,O=/"/g,z=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),I=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,M=k.createTreeWalker(k,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(e):e}const q=(t,e)=>{const o=t.length-1,r=[];let s,i=2===e?"<svg>":"",n=P;for(let e=0;e<o;e++){const o=t[e];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===P?"!--"===c[1]?n=U:void 0!==c[1]?n=D:void 0!==c[2]?(z.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=V):void 0!==c[3]&&(n=V):n===V?">"===c[0]?(n=null!=s?s:P,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?V:'"'===c[3]?O:N):n===O||n===N?n=V:n===U||n===D?n=P:(n=V,s=void 0);const h=n===V&&t[e+1].startsWith("/>")?" ":"";i+=n===P?o+A:l>=0?(r.push(a),o.slice(0,l)+w+o.slice(l)+x+h):o+x+(-2===l?(r.push(void 0),e):h)}return[L(t,i+(t[o]||"<?>")+(2===e?"</svg>":"")),r]};class W{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let s=0,i=0;const n=t.length-1,a=this.parts,[c,l]=q(t,e);if(this.el=W.createElement(c,o),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=M.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith(w)||e.startsWith(x)){const o=l[i++];if(t.push(e),void 0!==o){const t=r.getAttribute(o.toLowerCase()+w).split(x),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?Q:"@"===e[1]?X:J})}else a.push({type:6,index:s})}for(const e of t)r.removeAttribute(e)}if(z.test(r.tagName)){const t=r.textContent.split(x),e=t.length-1;if(e>0){r.textContent=b?b.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],E()),M.nextNode(),a.push({type:2,index:++s});r.append(t[e],E())}}}else if(8===r.nodeType)if(r.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(x,t+1));)a.push({type:7,index:s}),t+=x.length-1}s++}}static createElement(t,e){const o=k.createElement("template");return o.innerHTML=t,o}}function F(t,e,o=t,r){var s,i,n,a;if(e===I)return e;let c=void 0!==r?null===(s=o._$Co)||void 0===s?void 0:s[r]:o._$Cl;const l=C(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(i=null==c?void 0:c._$AO)||void 0===i||i.call(c,!1),void 0===l?c=void 0:(c=new l(t),c._$AT(t,o,r)),void 0!==r?(null!==(n=(a=o)._$Co)&&void 0!==n?n:a._$Co=[])[r]=c:o._$Cl=c),void 0!==c&&(e=F(t,c._$AS(t,e.values),c,r)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:r}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(o,!0);M.currentNode=s;let i=M.nextNode(),n=0,a=0,c=r[0];for(;void 0!==c;){if(n===c.index){let e;2===c.type?e=new G(i,i.nextSibling,this,t):1===c.type?e=new c.ctor(i,c.name,c.strings,this,t):6===c.type&&(e=new tt(i,this,t)),this._$AV.push(e),c=r[++a]}n!==(null==c?void 0:c.index)&&(i=M.nextNode(),n++)}return M.currentNode=k,s}v(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class G{constructor(t,e,o,r){var s;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),C(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>R(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=W.createElement(L(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(o);else{const t=new K(s,this),e=t.u(this.options);t.v(o),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new W(t)),e}T(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const s of t)r===e.length?e.push(o=new G(this.k(E()),this.k(E()),this,this.options)):o=e[r],o._$AI(s),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,o,r,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){const s=this.strings;let i=!1;if(void 0===s)t=F(this,t,e,0),i=!C(t)||t!==this._$AH&&t!==I,i&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=F(this,r[o+n],e,n),a===I&&(a=this._$AH[n]),i||(i=!C(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}i&&!r&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Z=b?b.emptyScript:"";class Q extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends J{constructor(t,e,o,r,s){super(t,e,o,r,s),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=F(this,t,e,0))&&void 0!==o?o:j)===I)return;const r=this._$AH,s=t===j&&r!==j||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==j&&(r===j||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(W,G),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");var ot,rt;class st extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{var r,s;const i=null!==(r=null==o?void 0:o.renderBefore)&&void 0!==r?r:e;let n=i._$litPart$;if(void 0===n){const t=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;i._$litPart$=n=new G(e.insertBefore(E(),t),t,void 0,null!=o?o:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}st.finalized=!0,st._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:st});const it=globalThis.litElementPolyfillSupport;null==it||it({LitElement:st}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.3");const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function at(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):nt(t,e)}function ct(t){return at({...t,state:!0})}var lt;function dt(t){return t.auth?.data?.access_token||t.auth?.accessToken||null}function ht(){return window.location.origin}async function ut(t){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}}async function pt(t){try{const e=function(t){const e=[];for(const o in t.states){if(!o.startsWith("automation."))continue;const r=t.states[o];if(!r||!r.attributes)continue;const s=r.attributes.id||"";s.includes("vacuum_schedule")&&e.push({id:s,alias:r.attributes.friendly_name||s,_entity_id:o,_state:r.state,_attributes:r.attributes,_from_states:!0})}return e}(t);if(e.length>0){const o=[];for(const r of e){const e=r.id;try{let s=null;try{s=await t.callWS({type:"config/automation/config/get",automation_id:e})}catch(o){try{s=await t.callWS({type:"config/automation/get",automation_id:e})}catch(o){try{s=await t.callWS({type:"automation/get",automation_id:e})}catch(o){try{const o=t.auth?.data?.access_token||t.auth?.accessToken;if(o){const t=`${window.location.origin}/api/config/automation/config/${e}`,r=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});r.ok&&(s=await r.json())}}catch(t){}}}}s&&s.id?o.push(s):o.push(r)}catch(t){o.push(r)}}if(o.length>0)return o}return[]}catch(t){return console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:",t),[]}}function mt(t,e){const o=t.id||"";if(!o.startsWith("vacuum_schedule_")||!o.includes("_day_"))return null;if(t._incomplete)return null;const r=o.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!r)return null;const s=r[1],i=parseInt(r[2],10),n=!(!t.trigger&&!t.triggers),a=!(!t.action&&!t.actions);if(!n||!a)return null;const c=t.trigger||t.triggers;if(!c)return null;const l=Array.isArray(c)?c.filter(t=>null!=t):null!=c?[c]:[];if(0===l.length)return null;const d=l.find(t=>t&&"time"===t.platform);if(!d||!d.at)return null;const h=d.at.substring(0,5),u=t.action||t.actions;if(!u)return null;const p=Array.isArray(u)?u.filter(t=>null!=t):null!=u?[u]:[];if(0===p.length)return null;const m=p.find(t=>{if(!t)return!1;const e=t.service||t.action;return e&&"string"==typeof e&&e.includes("vacuum_clean_segment")});if(!m)return null;const _=m.data?.segments;return{scheduleId:s,day:i,time:h,rooms:Array.isArray(_)?_:_?[_]:[],enabled:"on"===e?.state}}async function _t(t,e){try{const o=(await pt(t)).find(t=>t.id===e.id),r=!!o,s=await async function(t,e){try{const o=dt(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const r=`${ht()}/api/config/automation/config/${e.id}`,s={id:e.id,alias:e.alias,description:e.description,triggers:Array.isArray(e.trigger)?e.trigger:[e.trigger],conditions:Array.isArray(e.condition)?e.condition:e.condition?[e.condition]:[],actions:Array.isArray(e.action)?e.action:[e.action],mode:e.mode||"single"};s.actions&&Array.isArray(s.actions)&&(s.actions=s.actions.map(t=>{if(t.service&&!t.action){const e={...t};return e.action=t.service,delete e.service,e}return t}));const i=await fetch(r,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok){const t=await i.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${e.id}:`,i.status,t),!1}return await i.json().catch(()=>null),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${e.id}:`,t),!1}}(t,e);if(s)return await ut(t),!0;try{const o=r?"config/automation/update":"config/automation/create";try{return await t.callWS({type:o,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await ut(t),!0}catch(o){if(r&&("unknown_command"===o.code||o.message?.includes("unknown_command")))try{return await t.callWS({type:"config/automation/delete",automation_id:e.id}),await t.callWS({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await ut(t),!0}catch(t){}return console.error(`[Vacuum Schedule Card] Ошибка ${r?"обновления":"создания"} автоматизации ${e.id}:`,o),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка ${r?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${e.id}:`,t),!1}}async function gt(t,e){try{const o=await async function(t,e){try{const o=dt(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const r=`${ht()}/api/config/automation/config/${e}`,s=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(!s.ok){const t=await s.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${e}:`,s.status,t),!1}return!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${e}:`,t),!1}}(t,e);if(o)return await ut(t),!0;try{return await t.callWS({type:"config/automation/delete",automation_id:e}),await ut(t),!0}catch(o){if("unknown_command"===o.code||o.message?.includes("unknown_command"))try{return await t.callService("automation","delete",{id:e}),!0}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,o),!1}}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}}async function vt(t,e,o){try{const r=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const o=`${window.location.origin}/api/states`,r=await fetch(o,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!r.ok)return console.warn(`Не удалось получить список сущностей: ${r.status}`),null;const s=await r.json(),i={};return Array.isArray(s)&&s.forEach(t=>{t.entity_id&&(i[t.entity_id]=t)}),i}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),s=e.replace("vacuum.",""),i=[],n=[s,s.replace(/_/g,""),"pylesos","vacuum"],a=e=>t.states[e]||r?.[e]||null;for(const t of n){for(let e=1;e<=50;e++){const o=`select.${t}_room_${e}_name`,r=`select.${t}_room_${e}_id`||`number.${t}_room_${e}_id`,s=a(o),n=a(r);if(s&&s.state){let t;if(n&&n.state)t=parseInt(n.state,10);else{const r=o.match(/room_(\d+)/);t=r?parseInt(r[1],10):e}isNaN(t)||i.push({id:t,name:s.state})}}if(i.length>0)break}if(i.length>0)return i.sort((t,e)=>t.id-e.id);const c=t.states[e];if(c?.attributes){const t=c.attributes.segments||c.attributes.room_list||[];if(Array.isArray(t)&&t.length>0)return t.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`}))}return ft(o)}catch(t){return console.error("Ошибка загрузки комнат:",t),ft(o)}}function ft(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}null===(lt=window.HTMLSlotElement)||void 0===lt||lt.prototype.assignedElements;const yt={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная",start:"Запуск",stop:"Остановка",pause:"Пауза",return_to_base:"На станцию",error_starting:"Ошибка запуска",error_stopping:"Ошибка остановки",error_pausing:"Ошибка паузы",error_returning:"Ошибка возврата"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom",start:"Start",stop:"Stop",pause:"Pause",return_to_base:"Return to Base",error_starting:"Error starting",error_stopping:"Error stopping",error_pausing:"Error pausing",error_returning:"Error returning"}};function bt(t,e){const o=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return yt[o]?.[t]||yt.en[t]||t}let $t=class extends st{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._selectedRoomsForControl=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&(this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){console.warn("Ошибка при отписке от изменений автоматизаций:",t)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e&&e.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof t?t:()=>{this.hass.connection}}catch(t){console.warn("Не удалось подписаться на события:",t)}}catch(t){console.warn("Не удалось подписаться на изменения автоматизаций:",t)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await vt(this.hass,this.entity,t=>this._t(t)),this.requestUpdate())}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const t=new Map,e=await pt(this.hass);for(const o of e)try{const e=o.id||"";if(!e)continue;if(!e.startsWith("vacuum_schedule_")||!e.includes("_day_"))continue;let r=null;const s=`automation.${e}`;if(this.hass.states[s])r=this.hass.states[s];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const o=this.hass.states[t];if(o.attributes?.id===e){r=o;break}}const i=mt(o,r);if(!i)continue;let n=t.get(i.scheduleId);n||(n={id:i.scheduleId,enabled:i.enabled,days:[],time:i.time,rooms:i.rooms},t.set(i.scheduleId,n)),n.days.includes(i.day)||n.days.push(i.day),i.rooms.length>0&&(n.rooms=i.rooms),r?n.enabled="on"===r.state:i.enabled&&(n.enabled=!0)}catch(t){const e=o?.id||o?._entity_id||"неизвестно";console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${e}:`,t)}for(const e of t.values())e.days.sort((t,e)=>t-e);this._schedules=Array.from(t.values())}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card",show_room_ids:!1,room_icons:{}}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}}],computeLabel:t=>{if("entity"===t.name)return"Vacuum Entity"},computeHelper:t=>{if("entity"===t.name)return"Select the vacuum entity to manage schedules for"}}}static get styles(){return n`
      :host {
        display: block;
      }
      .card {
        padding: 16px;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        border-radius: var(--ha-card-border-radius, 4px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
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
        color: var(--error-color, var(--state-error-color, #f44336));
        padding: 8px;
        background: var(--error-background-color, var(--state-error-color, rgba(244, 67, 54, 0.1)));
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
        background: var(--card-background-color, var(--ha-card-background, #fff));
        border: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: var(--ha-card-border-radius, 4px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .schedule-item:hover {
        background: var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.05)));
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
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-theme-on-primary: var(--text-primary-color, var(--mdc-theme-on-primary, #fff));
      }
      .control-panel {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        border: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: var(--ha-card-border-radius, 4px);
      }
      .control-panel-status {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 12px;
        text-align: center;
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
        min-width: 100px;
      }
      .control-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .rooms-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
      }
      .room-button {
        flex: 1;
        min-width: 80px;
        max-width: 100%;
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        position: relative;
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: 8px;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.08));
        padding: 8px 4px;
        margin: 2px;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .room-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--primary-color);
        opacity: 0;
        transition: opacity 0.15s ease;
        pointer-events: none;
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 4px 2px;
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      .room-button .button-icon {
        font-size: 24px;
        line-height: 1;
        transition: transform 0.15s ease, filter 0.15s ease;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        max-width: 100%;
        max-height: 28px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .room-button .button-label {
        font-size: 12px;
        font-weight: 600;
        line-height: 1.2;
        text-align: center;
        color: var(--primary-text-color);
        transition: color 0.15s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 2px;
        box-sizing: border-box;
      }
      .room-button .button-id {
        font-size: 10px;
        opacity: 0.6;
        line-height: 1;
        font-family: monospace;
        color: var(--secondary-text-color);
        transition: opacity 0.15s ease, color 0.15s ease;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 2px;
        box-sizing: border-box;
      }
      .room-button.pressed {
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        background: var(--primary-color, var(--mdc-theme-primary));
        border-color: var(--primary-color, var(--mdc-theme-primary));
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.2), 
                    var(--ha-card-box-shadow, 0 1px 2px rgba(0,0,0,0.1));
        transform: translateY(1px);
      }
      .room-button.pressed::before {
        opacity: 0.1;
      }
      .room-button.pressed .button-icon {
        transform: scale(1.05);
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        max-height: 28px;
      }
      .room-button.pressed .button-label {
        color: var(--text-primary-color, var(--mdc-theme-on-primary, #fff));
        font-weight: 700;
      }
      .room-button.pressed .button-id {
        opacity: 0.9;
        color: var(--text-primary-color, var(--mdc-theme-on-primary, #fff));
      }
      .room-button:active:not(.pressed) {
        transform: translateY(2px) scale(0.98);
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }
      .room-button:hover:not(.pressed) {
        border-color: var(--primary-color, var(--mdc-theme-primary));
        box-shadow: var(--ha-card-box-shadow, 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08));
        transform: translateY(-1px);
      }
      .room-button:hover:not(.pressed)::before {
        opacity: 0.05;
      }
      .room-button:hover:not(.pressed) .button-icon {
        transform: scale(1.05);
        max-height: 28px;
      }
      .dialog {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: var(--ha-dialog-backdrop, rgba(0, 0, 0, 0.5)) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        z-index: 99999 !important;
        pointer-events: auto;
      }
      .dialog-content {
        background: var(--card-background-color, var(--ha-card-background, var(--primary-background-color, #fff))) !important;
        border-radius: var(--ha-card-border-radius, 8px);
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--ha-card-box-shadow, 0 8px 16px rgba(0,0,0,0.2));
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
        border: 2px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background, #fff));
        color: var(--primary-text-color);
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
      }
      .day-button:hover {
        border-color: var(--primary-color, var(--mdc-theme-primary));
      }
      .day-button.selected {
        background: var(--primary-color, var(--mdc-theme-primary));
        color: var(--text-primary-color, var(--mdc-theme-on-primary, #fff));
        border-color: var(--primary-color, var(--mdc-theme-primary));
      }
      .time-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: var(--ha-card-border-radius, 4px);
        font-size: 16px;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        color: var(--primary-text-color);
      }
      .rooms-selector {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background, #fff));
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
        background: var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.05)));
      }
      .room-checkbox {
        margin-right: 8px;
      }
      .select-all-rooms {
        margin-bottom: 8px;
        padding: 8px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color, rgba(0,0,0,0.12)));
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
    `}_t(t){return bt(t,this.hass)}_getDayNames(){return bt("day_names",this.hass).split(",")}_formatDays(t){return function(t,e,o){return 0===t.length?o.noDays:7===t.length?o.everyDay:t.map(t=>e[t]).join(", ")}(t,this._getDayNames(),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,o){if(0===t.length)return o;const r=t.map(t=>{const o=e.find(e=>e.id===t);return o?o.name:`ID:${t}`}).join(", ");return r||"Комнаты не выбраны"}(t,this._rooms,this._t("all_rooms"))}_shouldShowRoomIds(){return!0===this._config?.show_room_ids}_getRoomIcon(t){return 0===t?"🏠":this._config?.room_icons?.[t]||"🏠"}_getVacuumState(){if(!this.hass||!this.entity)return"unknown";const t=this.hass.states[this.entity];return t?.state||"unknown"}_isButtonDisabled(t,e){switch(t){case"start":return"cleaning"===e||"returning"===e;case"stop":return"idle"===e||"docked"===e||"returning"===e||"unknown"===e;case"pause":return"cleaning"!==e;case"return":return"docked"===e||"returning"===e;default:return!1}}_getStateLabel(t){return{cleaning:"Уборка",docked:"На базе",idle:"Ожидание",paused:"На паузе",returning:"Возврат на базу",error:"Ошибка",unknown:"Неизвестно"}[t]||t}_renderControlPanel(t){const e=this._isButtonDisabled("start",t),o=this._isButtonDisabled("stop",t),r=this._isButtonDisabled("pause",t),s=this._isButtonDisabled("return",t);return H`
      <div class="control-panel">
        <div class="control-panel-status">
          Статус: <strong>${this._getStateLabel(t)}</strong>
        </div>
        <div class="control-row">
          ${e?"":H`
            <ha-button 
              class="control-button"
              @click=${()=>this._startVacuum()}
              title="${this._t("start")||"Запуск"}"
            >
              ▶️ ${this._t("start")||"Запуск"}
            </ha-button>
          `}
          ${o?"":H`
            <ha-button 
              class="control-button"
              @click=${()=>this._stopVacuum()}
              title="${this._t("stop")||"Остановка"}"
            >
              ⏹️ ${this._t("stop")||"Остановка"}
            </ha-button>
          `}
          ${r?"":H`
            <ha-button 
              class="control-button"
              @click=${()=>this._pauseVacuum()}
              title="${this._t("pause")||"Пауза"}"
            >
              ⏸️ ${this._t("pause")||"Пауза"}
            </ha-button>
          `}
          ${s?"":H`
            <ha-button 
              class="control-button"
              @click=${()=>this._returnToBase()}
              title="${this._t("return_to_base")||"На станцию"}"
            >
              🏠 ${this._t("return_to_base")||"На станцию"}
            </ha-button>
          `}
        </div>
        <div class="control-row rooms-row">
          ${this._rooms.length>0?H`
            <ha-button 
              class="room-button ${0===this._selectedRoomsForControl.length?"pressed":""}"
              @click=${()=>this._toggleAllRooms()}
              title="${this._t("all_rooms")}"
            >
              <span class="button-content">
                <span class="button-icon">${this._getRoomIcon(0)}</span>
                <span class="button-label">${this._t("all_rooms")}</span>
              </span>
            </ha-button>
            ${this._rooms.map(t=>H`
              <ha-button 
                class="room-button ${this._selectedRoomsForControl.includes(t.id)?"pressed":""}"
                @click=${()=>this._toggleRoom(t.id)}
                title="${t.name}${this._shouldShowRoomIds()?` (ID: ${t.id})`:""}"
              >
                <span class="button-content">
                  <span class="button-icon">${this._getRoomIcon(t.id)}</span>
                  <span class="button-label">${t.name}</span>
                  ${this._shouldShowRoomIds()?H`<span class="button-id">${t.id}</span>`:""}
                </span>
              </ha-button>
            `)}
          `:H`<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `}_toggleRoom(t){const e=this._selectedRoomsForControl.indexOf(t);this._selectedRoomsForControl=e>-1?this._selectedRoomsForControl.filter(e=>e!==t):[...this._selectedRoomsForControl,t],this.requestUpdate()}_toggleAllRooms(){0===this._selectedRoomsForControl.length?this._selectedRoomsForControl=this._rooms.map(t=>t.id):this._selectedRoomsForControl=[],this.requestUpdate()}async _startVacuum(){if(this.hass&&this.entity)try{this._selectedRoomsForControl.length>0?await this.hass.callService("dreame_vacuum","vacuum_clean_segment",{entity_id:this.entity,segments:this._selectedRoomsForControl}):await this.hass.callService("vacuum","start",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка запуска уборки:",t),this._error=`${this._t("error_starting")||"Ошибка запуска"}: ${t}`,this.requestUpdate()}}async _stopVacuum(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","stop",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка остановки уборки:",t),this._error=`${this._t("error_stopping")||"Ошибка остановки"}: ${t}`,this.requestUpdate()}}async _pauseVacuum(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","pause",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка паузы уборки:",t),this._error=`${this._t("error_pausing")||"Ошибка паузы"}: ${t}`,this.requestUpdate()}}async _returnToBase(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","return_to_base",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:",t),this._error=`${this._t("error_returning")||"Ошибка возврата"}: ${t}`,this.requestUpdate()}}render(){if(!this.hass||!this.entity)return H`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;const t=this.hass.states[this.entity];if(!t)return H`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`;const e=t?.state||"unknown";return H`
      <ha-card>
        <div class="card">
          ${this._renderControlPanel(e)}
          
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error&&!this._showAddDialog?H`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?H`<div class="loading">${this._t("loading")}</div>`:H`
                <div class="schedules-list">
                  ${0===this._schedules.length?H`<div class="content">${this._t("no_schedules")}</div>`:this._schedules.map(t=>H`
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
      ${this._showAddDialog?H`
        <div class="dialog" @click=${t=>{t.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?this._t("edit_schedule"):this._t("add_schedule_title")}
            </div>

            ${this._error?H`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">${this._t("days_label")}</label>
              <div class="days-selector">
                ${this._getDayNames().map((t,e)=>H`
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
                ${this._rooms.length>0?H`
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
                  ${this._rooms.map(t=>H`
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
                `:H`<div class="content">${this._t("rooms_not_found")}</div>`}
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
    `}_addSchedule(){this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass)return;const o={...t,enabled:e};this._schedules=this._schedules.map(e=>e.id===t.id?o:e),this.requestUpdate(),await this._updateAutomationsForSchedule(o,t);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}async _deleteSchedule(t){if(this.hass&&confirm(this._t("delete_confirm"))){for(const e of t.days)await this._deleteAutomation(t.id,e);this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate();try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}}async _createAutomation(t,e){if(!this.hass)return void console.warn("[Vacuum Schedule Card] Не удалось создать автоматизацию: hass недоступен");const o=function(t,e,o,r,s){const i=`vacuum_schedule_${t.id}_day_${e}`,n=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,c]=t.time.split(":").map(Number);return{id:i,alias:`${s} ${t.time} - ${r[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${r[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:n}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:o},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,this._getDayNames(),this._t("schedule_title"));await _t(this.hass,o)||console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${o.id}`)}async _deleteAutomation(t,e){if(!this.hass)return void console.warn("[Vacuum Schedule Card] Не удалось удалить автоматизацию: hass недоступен");const o=`vacuum_schedule_${t}_day_${e}`;await gt(this.hass,o)||console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${o}`)}async _updateAutomationsInBackground(t,e){try{await this._updateAutomationsForSchedule(t,e);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}catch(t){throw console.error("[Vacuum Schedule Card] Ошибка обновления автоматизаций:",t),t}}async _updateAutomationsForSchedule(t,e){if(!t.enabled){const o=e?e.days:t.days;for(const e of o)await this._deleteAutomation(t.id,e);return}if(e){const o=e.days.filter(e=>!t.days.includes(e));if(o.length>0)for(const e of o)await this._deleteAutomation(t.id,e)}for(const e of t.days)await this._createAutomation(t,e)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass)return void(this._error=this._t("error_no_hass"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];const o=this._editingSchedule;if(this._editingSchedule){const o=e.findIndex(t=>t.id===this._editingSchedule.id);o>-1&&(e[o]=t)}else e.push(t);this._schedules=e,this._closeDialog(),this._error=void 0,this.requestUpdate(),this._updateAutomationsInBackground(t,o).catch(t=>{console.error("[Vacuum Schedule Card] Ошибка создания автоматизаций:",t),this._error=`${this._t("error_saving")} ${t}`,this.requestUpdate()})}};t([at({attribute:!1})],$t.prototype,"hass",void 0),t([at()],$t.prototype,"entity",void 0),t([ct()],$t.prototype,"_schedules",void 0),t([ct()],$t.prototype,"_loading",void 0),t([ct()],$t.prototype,"_error",void 0),t([ct()],$t.prototype,"_showAddDialog",void 0),t([ct()],$t.prototype,"_editingSchedule",void 0),t([ct()],$t.prototype,"_rooms",void 0),t([ct()],$t.prototype,"_selectedRoomsForControl",void 0),t([ct()],$t.prototype,"_newSchedule",void 0),$t=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:o,elements:r}=e;return{kind:o,elements:r,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],$t),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",$t),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{$t as VacuumScheduleCard};
