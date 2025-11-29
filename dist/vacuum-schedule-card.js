function t(t,e,s,o){var i,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(r<3?i(n):r>3?i(e,s,n):i(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new r(s,t,o)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,_={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},m=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:m},g="finalized";let y=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const o=this._$Ep(s,e);void 0!==o&&(this._$Ev.set(o,s),t.push(o))}),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,s,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(o){const i=this[t];this[e]=o,this.requestUpdate(t,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{s?t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):o.forEach(s=>{const o=document.createElement("style"),i=e.litNonce;void 0!==i&&o.setAttribute("nonce",i),o.textContent=s.cssText,t.appendChild(o)})})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=p){var o;const i=this.constructor._$Ep(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==(null===(o=s.converter)||void 0===o?void 0:o.toAttribute)?s.converter:_).toAttribute(e,s.type);this._$El=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$El=null}}_$AK(t,e){var s;const o=this.constructor,i=o._$Ev.get(t);if(void 0!==i&&this._$El!==i){const t=o.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:_;this._$El=i,this[i]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let o=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var v;y[g]=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:y}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const f=window,$=f.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",S=`lit$${(Math.random()+"").slice(9)}$`,A="?"+S,x=`<${A}>`,E=document,C=()=>E.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,D=/>/g,V=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,O=/"/g,H=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,M=E.createTreeWalker(E,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const q=(t,e)=>{const s=t.length-1,o=[];let i,r=2===e?"<svg>":"",n=P;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(n.lastIndex=d,l=n.exec(s),null!==l);)d=n.lastIndex,n===P?"!--"===l[1]?n=U:void 0!==l[1]?n=D:void 0!==l[2]?(H.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=V):void 0!==l[3]&&(n=V):n===V?">"===l[0]?(n=null!=i?i:P,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?V:'"'===l[3]?O:N):n===O||n===N?n=V:n===U||n===D?n=P:(n=V,i=void 0);const h=n===V&&t[e+1].startsWith("/>")?" ":"";r+=n===P?s+x:c>=0?(o.push(a),s.slice(0,c)+w+s.slice(c)+S+h):s+S+(-2===c?(o.push(void 0),e):h)}return[L(t,r+(t[s]||"<?>")+(2===e?"</svg>":"")),o]};class W{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let i=0,r=0;const n=t.length-1,a=this.parts,[l,c]=q(t,e);if(this.el=W.createElement(l,s),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=M.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(w)||e.startsWith(S)){const s=c[r++];if(t.push(e),void 0!==s){const t=o.getAttribute(s.toLowerCase()+w).split(S),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:J})}else a.push({type:6,index:i})}for(const e of t)o.removeAttribute(e)}if(H.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=$?$.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],C()),M.nextNode(),a.push({type:2,index:++i});o.append(t[e],C())}}}else if(8===o.nodeType)if(o.data===A)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:i}),t+=S.length-1}i++}}static createElement(t,e){const s=E.createElement("template");return s.innerHTML=t,s}}function F(t,e,s=t,o){var i,r,n,a;if(e===z)return e;let l=void 0!==o?null===(i=s._$Co)||void 0===i?void 0:i[o]:s._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,o)),void 0!==o?(null!==(n=(a=s)._$Co)&&void 0!==n?n:a._$Co=[])[o]=l:s._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,o)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:o}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(s,!0);M.currentNode=i;let r=M.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new G(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new tt(r,this,t)),this._$AV.push(e),l=o[++a]}n!==(null==l?void 0:l.index)&&(r=M.nextNode(),n++)}return M.currentNode=E,i}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class G{constructor(t,e,s,o){var i;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cp=null===(i=null==o?void 0:o.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>R(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=W.createElement(L(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.v(s);else{const t=new K(i,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new W(t)),e}T(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const i of t)o===e.length?e.push(s=new G(this.k(C()),this.k(C()),this,this.options)):s=e[o],s._$AI(i),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,o,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,o){const i=this.strings;let r=!1;if(void 0===i)t=F(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const o=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=F(this,o[s+n],e,n),a===z&&(a=this._$AH[n]),r||(r=!k(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+i[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Q=$?$.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(t,e,s,o,i){super(t,e,s,o,i),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=F(this,t,e,0))&&void 0!==s?s:j)===z)return;const o=this._$AH,i=t===j&&o!==j||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==j&&(o===j||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(W,G),(null!==(v=f.litHtmlVersions)&&void 0!==v?v:f.litHtmlVersions=[]).push("2.8.0");var st,ot;class it extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var o,i;const r=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:e;let n=r._$litPart$;if(void 0===n){const t=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:null;r._$litPart$=n=new G(e.insertBefore(C(),t),t,void 0,null!=s?s:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}it.finalized=!0,it._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:it});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:it}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function at(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):nt(t,e)}function lt(t){return at({...t,state:!0})}var ct;function dt(t){return t.auth?.data?.access_token||t.auth?.accessToken||null}function ht(){return window.location.origin}async function ut(t){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}}async function _t(t){try{const e=function(t){const e=[];for(const s in t.states){if(!s.startsWith("automation."))continue;const o=t.states[s];if(!o||!o.attributes)continue;const i=o.attributes.id||"";i.includes("vacuum_schedule")&&e.push({id:i,alias:o.attributes.friendly_name||i,_entity_id:s,_state:o.state,_attributes:o.attributes,_from_states:!0})}return e}(t);if(e.length>0){const s=[];for(const o of e){const e=o.id;try{let i=null;try{i=await t.callWS({type:"config/automation/config/get",automation_id:e})}catch(s){try{i=await t.callWS({type:"config/automation/get",automation_id:e})}catch(s){try{i=await t.callWS({type:"automation/get",automation_id:e})}catch(s){try{const s=t.auth?.data?.access_token||t.auth?.accessToken;if(s){const t=`${window.location.origin}/api/config/automation/config/${e}`,o=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"}});o.ok&&(i=await o.json())}}catch(t){}}}}i&&i.id?s.push(i):s.push(o)}catch(t){s.push(o)}}if(s.length>0)return s}return[]}catch(t){return console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:",t),[]}}function mt(t,e){const s=t.id||"";if(!s.startsWith("vacuum_schedule_")||!s.includes("_day_"))return null;if(t._incomplete)return null;const o=s.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!o)return null;const i=o[1],r=parseInt(o[2],10),n=!(!t.trigger&&!t.triggers),a=!(!t.action&&!t.actions);if(!n||!a)return null;const l=t.trigger||t.triggers;if(!l)return null;const c=Array.isArray(l)?l.filter(t=>null!=t):null!=l?[l]:[];if(0===c.length)return null;const d=c.find(t=>t&&"time"===t.platform);if(!d||!d.at)return null;const h=d.at.substring(0,5),u=t.action||t.actions;if(!u)return null;const _=Array.isArray(u)?u.filter(t=>null!=t):null!=u?[u]:[];if(0===_.length)return null;const m=_.find(t=>{if(!t)return!1;const e=t.service||t.action;return e&&"string"==typeof e&&e.includes("vacuum_clean_segment")});if(!m)return null;const p=m.data?.segments;return{scheduleId:i,day:r,time:h,rooms:Array.isArray(p)?p:p?[p]:[],enabled:"on"===e?.state}}async function pt(t,e){try{const s=(await _t(t)).find(t=>t.id===e.id),o=!!s,i=await async function(t,e){try{const s=dt(t);if(!s)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const o=`${ht()}/api/config/automation/config/${e.id}`,i={id:e.id,alias:e.alias,description:e.description,triggers:Array.isArray(e.trigger)?e.trigger:[e.trigger],conditions:Array.isArray(e.condition)?e.condition:e.condition?[e.condition]:[],actions:Array.isArray(e.action)?e.action:[e.action],mode:e.mode||"single"};i.actions&&Array.isArray(i.actions)&&(i.actions=i.actions.map(t=>{if(t.service&&!t.action){const e={...t};return e.action=t.service,delete e.service,e}return t}));const r=await fetch(o,{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok){const t=await r.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${e.id}:`,r.status,t),!1}return await r.json().catch(()=>null),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${e.id}:`,t),!1}}(t,e);if(i)return await ut(t),!0;try{const s=o?"config/automation/update":"config/automation/create";try{return await t.callWS({type:s,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await ut(t),!0}catch(s){if(o&&("unknown_command"===s.code||s.message?.includes("unknown_command")))try{return await t.callWS({type:"config/automation/delete",automation_id:e.id}),await t.callWS({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await ut(t),!0}catch(t){}return console.error(`[Vacuum Schedule Card] Ошибка ${o?"обновления":"создания"} автоматизации ${e.id}:`,s),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка ${o?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${e.id}:`,t),!1}}async function gt(t,e){try{const s=await async function(t,e){try{const s=dt(t);if(!s)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const o=`${ht()}/api/config/automation/config/${e}`,i=await fetch(o,{method:"DELETE",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"}});if(!i.ok){const t=await i.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${e}:`,i.status,t),!1}return!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${e}:`,t),!1}}(t,e);if(s)return await ut(t),!0;try{return await t.callWS({type:"config/automation/delete",automation_id:e}),await ut(t),!0}catch(s){if("unknown_command"===s.code||s.message?.includes("unknown_command"))try{return await t.callService("automation","delete",{id:e}),!0}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,s),!1}}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}}async function yt(t,e,s){try{const o=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const s=`${window.location.origin}/api/states`,o=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!o.ok)return console.warn(`Не удалось получить список сущностей: ${o.status}`),null;const i=await o.json(),r={};return Array.isArray(i)&&i.forEach(t=>{t.entity_id&&(r[t.entity_id]=t)}),r}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),i=e.replace("vacuum.",""),r=[],n=[i,i.replace(/_/g,""),"pylesos","vacuum"],a=e=>t.states[e]||o?.[e]||null;for(const t of n){for(let e=1;e<=50;e++){const s=`select.${t}_room_${e}_name`,o=`select.${t}_room_${e}_id`||`number.${t}_room_${e}_id`,i=a(s),n=a(o);if(i&&i.state){let t;if(n&&n.state)t=parseInt(n.state,10);else{const o=s.match(/room_(\d+)/);t=o?parseInt(o[1],10):e}isNaN(t)||r.push({id:t,name:i.state})}}if(r.length>0)break}if(r.length>0)return r.sort((t,e)=>t.id-e.id);const l=t.states[e];if(l?.attributes){const t=l.attributes.segments||l.attributes.room_list||[];if(Array.isArray(t)&&t.length>0)return t.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`}))}return vt(s)}catch(t){return console.error("Ошибка загрузки комнат:",t),vt(s)}}function vt(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;const ft={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная",start:"Запуск",stop:"Остановка",pause:"Пауза",return_to_base:"На станцию",error_starting:"Ошибка запуска",error_stopping:"Ошибка остановки",error_pausing:"Ошибка паузы",error_returning:"Ошибка возврата"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom",start:"Start",stop:"Stop",pause:"Pause",return_to_base:"Return to Base",error_starting:"Error starting",error_stopping:"Error stopping",error_pausing:"Error pausing",error_returning:"Error returning"}};function $t(t,e){const s=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return ft[s]?.[t]||ft.en[t]||t}let bt=class extends it{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._selectedRoomsForControl=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&(this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){console.warn("Ошибка при отписке от изменений автоматизаций:",t)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e&&e.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof t?t:()=>{this.hass.connection}}catch(t){console.warn("Не удалось подписаться на события:",t)}}catch(t){console.warn("Не удалось подписаться на изменения автоматизаций:",t)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await yt(this.hass,this.entity,t=>this._t(t)),this.requestUpdate())}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const t=new Map,e=await _t(this.hass);for(const s of e)try{const e=s.id||"";if(!e)continue;if(!e.startsWith("vacuum_schedule_")||!e.includes("_day_"))continue;let o=null;const i=`automation.${e}`;if(this.hass.states[i])o=this.hass.states[i];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const s=this.hass.states[t];if(s.attributes?.id===e){o=s;break}}const r=mt(s,o);if(!r)continue;let n=t.get(r.scheduleId);n||(n={id:r.scheduleId,enabled:r.enabled,days:[],time:r.time,rooms:r.rooms},t.set(r.scheduleId,n)),n.days.includes(r.day)||n.days.push(r.day),r.rooms.length>0&&(n.rooms=r.rooms),o?n.enabled="on"===o.state:r.enabled&&(n.enabled=!0)}catch(t){const e=s?.id||s?._entity_id||"неизвестно";console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${e}:`,t)}for(const e of t.values())e.days.sort((t,e)=>t-e);this._schedules=Array.from(t.values())}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card",show_room_ids:!1,room_icons:{}}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}}],computeLabel:t=>{if("entity"===t.name)return"Vacuum Entity"},computeHelper:t=>{if("entity"===t.name)return"Select the vacuum entity to manage schedules for"}}}static get styles(){return n`
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
      .control-panel {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
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
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      }
      .room-button {
        flex: 1;
        min-width: 80px;
        --mdc-theme-primary: var(--primary-color);
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 4px 0;
      }
      .room-button .button-icon {
        font-size: 20px;
        line-height: 1;
      }
      .room-button .button-label {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.2;
        text-align: center;
      }
      .room-button .button-id {
        font-size: 11px;
        opacity: 0.7;
        line-height: 1;
        font-family: monospace;
      }
      .room-button.selected {
        --mdc-theme-primary: var(--primary-color);
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .room-button.selected .button-id {
        opacity: 0.9;
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
    `}_t(t){return $t(t,this.hass)}_getDayNames(){return $t("day_names",this.hass).split(",")}_formatDays(t){return function(t,e,s){return 0===t.length?s.noDays:7===t.length?s.everyDay:t.map(t=>e[t]).join(", ")}(t,this._getDayNames(),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,s){if(0===t.length)return s;const o=t.map(t=>{const s=e.find(e=>e.id===t);return s?s.name:`ID:${t}`}).join(", ");return o||"Комнаты не выбраны"}(t,this._rooms,this._t("all_rooms"))}_shouldShowRoomIds(){return!0===this._config?.show_room_ids}_getRoomIcon(t){return 0===t?"🏠":this._config?.room_icons?.[t]||"🏠"}_getVacuumState(){if(!this.hass||!this.entity)return"unknown";const t=this.hass.states[this.entity];return t?.state||"unknown"}_isButtonDisabled(t,e){switch(t){case"start":return"cleaning"===e||"returning"===e;case"stop":return"idle"===e||"docked"===e||"returning"===e||"unknown"===e;case"pause":return"cleaning"!==e;case"return":return"docked"===e||"returning"===e;default:return!1}}_getStateLabel(t){return{cleaning:"Уборка",docked:"На базе",idle:"Ожидание",paused:"На паузе",returning:"Возврат на базу",error:"Ошибка",unknown:"Неизвестно"}[t]||t}_renderControlPanel(t){const e=this._isButtonDisabled("start",t),s=this._isButtonDisabled("stop",t),o=this._isButtonDisabled("pause",t),i=this._isButtonDisabled("return",t);return I`
      <div class="control-panel">
        <div class="control-panel-status">
          Статус: <strong>${this._getStateLabel(t)}</strong>
        </div>
        <div class="control-row">
          <ha-button 
            class="control-button"
            .disabled=${e}
            @click=${()=>!e&&this._startVacuum()}
            title="${e?this._t("start")+" (недоступно)":this._t("start")||"Запуск"}"
          >
            ▶️ ${this._t("start")||"Запуск"}
          </ha-button>
          <ha-button 
            class="control-button"
            .disabled=${s}
            @click=${()=>!s&&this._stopVacuum()}
            title="${s?this._t("stop")+" (недоступно)":this._t("stop")||"Остановка"}"
          >
            ⏹️ ${this._t("stop")||"Остановка"}
          </ha-button>
          <ha-button 
            class="control-button"
            .disabled=${o}
            @click=${()=>!o&&this._pauseVacuum()}
            title="${o?this._t("pause")+" (недоступно)":this._t("pause")||"Пауза"}"
          >
            ⏸️ ${this._t("pause")||"Пауза"}
          </ha-button>
          <ha-button 
            class="control-button"
            .disabled=${i}
            @click=${()=>!i&&this._returnToBase()}
            title="${i?this._t("return_to_base")+" (недоступно)":this._t("return_to_base")||"На станцию"}"
          >
            🏠 ${this._t("return_to_base")||"На станцию"}
          </ha-button>
        </div>
        <div class="control-row rooms-row">
          ${this._rooms.length>0?I`
            <ha-button 
              class="room-button ${0===this._selectedRoomsForControl.length?"selected":""}"
              @click=${()=>this._toggleAllRooms()}
              title="${this._t("all_rooms")}"
            >
              <span class="button-content">
                ${this._getRoomIcon(0)} ${this._t("all_rooms")}
              </span>
            </ha-button>
            ${this._rooms.map(t=>I`
              <ha-button 
                class="room-button ${this._selectedRoomsForControl.includes(t.id)?"selected":""}"
                @click=${()=>this._toggleRoom(t.id)}
                title="${t.name}${this._shouldShowRoomIds()?` (ID: ${t.id})`:""}"
              >
                <span class="button-content">
                  <span class="button-icon">${this._getRoomIcon(t.id)}</span>
                  <span class="button-label">${t.name}</span>
                  ${this._shouldShowRoomIds()?I`<span class="button-id">${t.id}</span>`:""}
                </span>
              </ha-button>
            `)}
          `:I`<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `}_toggleRoom(t){const e=this._selectedRoomsForControl.indexOf(t);this._selectedRoomsForControl=e>-1?this._selectedRoomsForControl.filter(e=>e!==t):[...this._selectedRoomsForControl,t],this.requestUpdate()}_toggleAllRooms(){0===this._selectedRoomsForControl.length?this._selectedRoomsForControl=this._rooms.map(t=>t.id):this._selectedRoomsForControl=[],this.requestUpdate()}async _startVacuum(){if(this.hass&&this.entity)try{this._selectedRoomsForControl.length>0?await this.hass.callService("dreame_vacuum","vacuum_clean_segment",{entity_id:this.entity,segments:this._selectedRoomsForControl}):await this.hass.callService("vacuum","start",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка запуска уборки:",t),this._error=`${this._t("error_starting")||"Ошибка запуска"}: ${t}`,this.requestUpdate()}}async _stopVacuum(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","stop",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка остановки уборки:",t),this._error=`${this._t("error_stopping")||"Ошибка остановки"}: ${t}`,this.requestUpdate()}}async _pauseVacuum(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","pause",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка паузы уборки:",t),this._error=`${this._t("error_pausing")||"Ошибка паузы"}: ${t}`,this.requestUpdate()}}async _returnToBase(){if(this.hass&&this.entity)try{await this.hass.callService("vacuum","return_to_base",{entity_id:this.entity})}catch(t){console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:",t),this._error=`${this._t("error_returning")||"Ошибка возврата"}: ${t}`,this.requestUpdate()}}render(){if(!this.hass||!this.entity)return I`<div class="card">
        <div class="content">${this._t("error_no_entity")}</div>
      </div>`;const t=this.hass.states[this.entity];if(!t)return I`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`;const e=t?.state||"unknown";return I`
      <ha-card>
        <div class="card">
          ${this._renderControlPanel(e)}
          
          <div class="header">
            <span>${this._t("schedule_title")}</span>
            <span>${this._schedules.length} ${this._t("schedules_count")}</span>
          </div>
          
          ${this._error&&!this._showAddDialog?I`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?I`<div class="loading">${this._t("loading")}</div>`:I`
                <div class="schedules-list">
                  ${0===this._schedules.length?I`<div class="content">${this._t("no_schedules")}</div>`:this._schedules.map(t=>I`
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
      ${this._showAddDialog?I`
        <div class="dialog" @click=${t=>{t.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?this._t("edit_schedule"):this._t("add_schedule_title")}
            </div>

            ${this._error?I`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">${this._t("days_label")}</label>
              <div class="days-selector">
                ${this._getDayNames().map((t,e)=>I`
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
                ${this._rooms.length>0?I`
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
                  ${this._rooms.map(t=>I`
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
                `:I`<div class="content">${this._t("rooms_not_found")}</div>`}
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
    `}_addSchedule(){this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass)return;const s={...t,enabled:e};this._schedules=this._schedules.map(e=>e.id===t.id?s:e),this.requestUpdate(),await this._updateAutomationsForSchedule(s,t);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}async _deleteSchedule(t){if(this.hass&&confirm(this._t("delete_confirm"))){for(const e of t.days)await this._deleteAutomation(t.id,e);this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate();try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}}async _createAutomation(t,e){if(!this.hass)return void console.warn("[Vacuum Schedule Card] Не удалось создать автоматизацию: hass недоступен");const s=function(t,e,s,o,i){const r=`vacuum_schedule_${t.id}_day_${e}`,n=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,l]=t.time.split(":").map(Number);return{id:r,alias:`${i} ${t.time} - ${o[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${o[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(l).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:n}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:s},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,this._getDayNames(),this._t("schedule_title"));await pt(this.hass,s)||console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${s.id}`)}async _deleteAutomation(t,e){if(!this.hass)return void console.warn("[Vacuum Schedule Card] Не удалось удалить автоматизацию: hass недоступен");const s=`vacuum_schedule_${t}_day_${e}`;await gt(this.hass,s)||console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${s}`)}async _updateAutomationsInBackground(t,e){try{await this._updateAutomationsForSchedule(t,e);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules()}catch(t){throw console.error("[Vacuum Schedule Card] Ошибка обновления автоматизаций:",t),t}}async _updateAutomationsForSchedule(t,e){if(!t.enabled){const s=e?e.days:t.days;for(const e of s)await this._deleteAutomation(t.id,e);return}if(e){const s=e.days.filter(e=>!t.days.includes(e));if(s.length>0)for(const e of s)await this._deleteAutomation(t.id,e)}for(const e of t.days)await this._createAutomation(t,e)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass)return void(this._error=this._t("error_no_hass"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];const s=this._editingSchedule;if(this._editingSchedule){const s=e.findIndex(t=>t.id===this._editingSchedule.id);s>-1&&(e[s]=t)}else e.push(t);this._schedules=e,this._closeDialog(),this._error=void 0,this.requestUpdate(),this._updateAutomationsInBackground(t,s).catch(t=>{console.error("[Vacuum Schedule Card] Ошибка создания автоматизаций:",t),this._error=`${this._t("error_saving")} ${t}`,this.requestUpdate()})}};t([at({attribute:!1})],bt.prototype,"hass",void 0),t([at()],bt.prototype,"entity",void 0),t([lt()],bt.prototype,"_schedules",void 0),t([lt()],bt.prototype,"_loading",void 0),t([lt()],bt.prototype,"_error",void 0),t([lt()],bt.prototype,"_showAddDialog",void 0),t([lt()],bt.prototype,"_editingSchedule",void 0),t([lt()],bt.prototype,"_rooms",void 0),t([lt()],bt.prototype,"_selectedRoomsForControl",void 0),t([lt()],bt.prototype,"_newSchedule",void 0),bt=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:o}=e;return{kind:s,elements:o,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],bt),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",bt),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{bt as VacuumScheduleCard};
