function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var a;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},m="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=_){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;g[m]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(a=d.reactiveElementVersions)&&void 0!==a?a:d.reactiveElementVersions=[]).push("1.6.3");const f=window,$=f.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,x="?"+A,w=`<${x}>`,E=document,k=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,H=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,T=/"/g,M=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),L=new WeakMap,B=E.createTreeWalker(E,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,a=n.exec(i),null!==a);)h=n.lastIndex,n===N?"!--"===a[1]?n=O:void 0!==a[1]?n=D:void 0!==a[2]?(M.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=H):void 0!==a[3]&&(n=H):n===H?">"===a[0]?(n=null!=o?o:N,d=-1):void 0===a[1]?d=-2:(d=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?H:'"'===a[3]?T:R):n===T||n===R?n=H:n===O||n===D?n=N:(n=H,o=void 0);const c=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+w:d>=0?(s.push(l),i.slice(0,d)+S+i.slice(d)+A+c):i+A+(-2===d?(s.push(void 0),e):c)}return[V(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,d]=q(t,e);if(this.el=J.createElement(a,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=B.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(S)||e.startsWith(A)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+S).split(A),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Y:F})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),B.nextNode(),l.push({type:2,index:++o});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===x)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)l.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,s){var o,r,n,l;if(e===j)return e;let a=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==d&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===d?a=void 0:(a=new d(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Co)&&void 0!==n?n:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=W(t,a._$AS(t,e.values),a,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);B.currentNode=o;let r=B.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new tt(r,this,t)),this._$AV.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=B.nextNode(),n++)}return B.currentNode=E,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{constructor(t,e,i,s){var o;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),C(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>U(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new K(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new J(t)),e}T(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,s,o){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=W(this,t,e,0),r=!C(t)||t!==this._$AH&&t!==j,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=W(this,s[i+n],e,n),l===j&&(l=this._$AH[n]),r||(r=!C(l)||l!==this._$AH[n]),l===z?t=z:t!==z&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const Q=$?$.emptyScript:"";class X extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends F{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:z)===j)return;const s=this._$AH,o=t===z&&s!==z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==z&&(s===z||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(J,Z),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");var it,st;class ot extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new Z(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");const nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):nt(t,e)}function at(t){return lt({...t,state:!0})}var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;let ht=class extends ot{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity;const e=t.entity.replace("vacuum.","");this._schedulesEntityId=`input_text.vacuum_schedules_${e}`,this._loadSchedules()}connectedCallback(){super.connectedCallback(),this.hass&&this._schedulesEntityId&&(this._loadSchedules(),this._loadRooms())}async _loadRooms(){if(this.hass&&this.entity)try{const t=this.hass.states[this.entity];if(t&&t.attributes){const e=t.attributes.segments||t.attributes.room_list||[];if(Array.isArray(e)&&e.length>0)return void(this._rooms=e.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`})))}0===this._rooms.length&&(this._rooms=[{id:16,name:"Гостиная"},{id:17,name:"Спальня"},{id:18,name:"Кухня"},{id:19,name:"Ванная"}])}catch(t){console.error("Ошибка загрузки комнат:",t),this._rooms=[{id:16,name:"Гостиная"},{id:17,name:"Спальня"},{id:18,name:"Кухня"},{id:19,name:"Ванная"}]}}async _loadSchedules(){if(this.hass&&this._schedulesEntityId){this._loading=!0,this._error=void 0;try{const t=this.hass.states[this._schedulesEntityId];if(t&&t.state)try{this._schedules=JSON.parse(t.state)||[]}catch(t){console.error("Ошибка парсинга расписаний:",t),this._schedules=[]}else this._schedules=[]}catch(t){this._error=`Ошибка загрузки расписаний: ${t}`,console.error(this._error)}finally{this._loading=!1}}}getCardSize(){return 3}static get styles(){return n`
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
    `}_getDayNames(){return["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]}_formatDays(t){const e=this._getDayNames();return 0===t.length?"Нет дней":7===t.length?"Каждый день":t.map(t=>e[t]).join(", ")}_formatRooms(t){if(0===t.length)return"Все комнаты";const e=t.map(t=>{const e=this._rooms.find(e=>e.id===t);return e?e.name:`ID:${t}`}).join(", ");return e||"Комнаты не выбраны"}render(){if(!this.hass||!this.entity)return I`<div class="card">
        <div class="content">Ошибка: не указаны hass или entity</div>
      </div>`;return this.hass.states[this.entity]?I`
      <ha-card>
        <div class="card">
          <div class="header">
            <span>Расписание уборки</span>
            <span>${this._schedules.length} расписаний</span>
          </div>
          
          ${this._error&&!this._showAddDialog?I`<div class="error">${this._error}</div>`:""}
          
          ${this._loading?I`<div class="loading">Загрузка...</div>`:I`
                <div class="schedules-list">
                  ${0===this._schedules.length?I`<div class="content">Нет расписаний. Добавьте первое расписание.</div>`:this._schedules.map(t=>I`
                          <div class="schedule-item" @click=${()=>this._editSchedule(t)}>
                            <div class="schedule-info">
                              <div class="schedule-time">
                                ${t.enabled?"✅":"⏸️"} ${t.time}
                              </div>
                              <div class="schedule-days">
                                ${this._formatDays(t.days)}
                                ${t.rooms.length>0?` • ${this._formatRooms(t.rooms)}`:" • Все комнаты"}
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
                  + Добавить расписание
                </ha-button>
              `}
        </div>
      </ha-card>
      ${this._showAddDialog?I`
        <div class="dialog" @click=${t=>{t.target.classList.contains("dialog")&&this._closeDialog()}}>
          <div class="dialog-content">
            <div class="dialog-header">
              ${this._editingSchedule?"Редактировать расписание":"Добавить расписание"}
            </div>

            ${this._error?I`<div class="error">${this._error}</div>`:""}

            <div class="form-group">
              <label class="form-label">Дни недели</label>
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
              <label class="form-label">Время</label>
              <input
                type="time"
                class="time-input"
                .value=${this._newSchedule.time||"09:00"}
                @input=${t=>{this._newSchedule.time=t.target.value}}
              />
            </div>

            <div class="form-group">
              <label class="form-label">Комнаты для уборки</label>
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
                      Выбрать все
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
                `:I`<div class="content">Комнаты не найдены. Проверьте подключение пылесоса.</div>`}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._newSchedule.enabled??!0}
                  @change=${t=>{this._newSchedule.enabled=t.target.checked}}
                />
                Включено
              </label>
            </div>

            <div class="dialog-actions">
              <ha-button class="button-secondary" @click=${this._closeDialog}>
                Отмена
              </ha-button>
              <ha-button @click=${this._saveSchedule}>
                Сохранить
              </ha-button>
            </div>
          </div>
        </div>
      `:""}
    `:I`<div class="card">
        <div class="content">Ошибка: сущность ${this.entity} не найдена</div>
      </div>`}_addSchedule(){console.log("_addSchedule called"),this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,console.log("_showAddDialog set to:",this._showAddDialog),this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass||!this._schedulesEntityId)return;const i=this._schedules.map(i=>i.id===t.id?{...i,enabled:e}:i);try{await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(i)}),this._schedules=i}catch(t){this._error=`Ошибка обновления: ${t}`,console.error("Ошибка обновления расписания:",t)}}async _deleteSchedule(t){if(!this.hass||!this._schedulesEntityId)return;if(!confirm("Удалить это расписание?"))return;const e=this._schedules.filter(e=>e.id!==t.id);try{await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(e)}),this._schedules=e}catch(t){this._error=`Ошибка удаления: ${t}`,console.error("Ошибка удаления расписания:",t)}}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error="Выберите хотя бы один день");if(!this._newSchedule.time)return void(this._error="Укажите время");if(!this.hass||!this._schedulesEntityId)return void(this._error="Ошибка: hass не доступен");const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];if(this._editingSchedule){const i=e.findIndex(t=>t.id===this._editingSchedule.id);i>-1&&(e[i]=t)}else e.push(t);try{await this.hass.callService("input_text","set_value",{entity_id:this._schedulesEntityId,value:JSON.stringify(e)}),this._schedules=e,this._closeDialog(),this._error=void 0}catch(t){this._error=`Ошибка сохранения: ${t}`,console.error("Ошибка сохранения расписания:",t)}}};t([lt({attribute:!1})],ht.prototype,"hass",void 0),t([lt()],ht.prototype,"entity",void 0),t([at()],ht.prototype,"_schedules",void 0),t([at()],ht.prototype,"_loading",void 0),t([at()],ht.prototype,"_error",void 0),t([at()],ht.prototype,"_showAddDialog",void 0),t([at()],ht.prototype,"_editingSchedule",void 0),t([at()],ht.prototype,"_rooms",void 0),t([at()],ht.prototype,"_newSchedule",void 0),ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],ht),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",ht),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{ht as VacuumScheduleCard};
