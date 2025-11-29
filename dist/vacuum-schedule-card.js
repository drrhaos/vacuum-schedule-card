function t(t,e,o,r){var i,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(s<3?i(n):s>3?i(e,o,n):i(e,o))||n);return s>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=window,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=i.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[r+1],t[0]);return new s(o,t,r)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,r))(e)})(t):t;var c;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",u=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},m=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},v="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,o)=>{const r=this._$Ep(o,e);void 0!==r&&(this._$Ev.set(r,o),t.push(r))}),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){const i=this[t];this[e]=r,this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,o;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const r=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{o?t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(o=>{const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)})})(r,this.constructor.elementStyles),r}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=_){var r;const i=this.constructor._$Ep(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==(null===(r=o.converter)||void 0===r?void 0:r.toAttribute)?o.converter:p).toAttribute(e,o.type);this._$El=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$El=null}}_$AK(t,e){var o;const r=this.constructor,i=r._$Ev.get(t);if(void 0!==i&&this._$El!==i){const t=r.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(o=t.converter)||void 0===o?void 0:o.fromAttribute)?t.converter:p;this._$El=i,this[i]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,o){let r=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(o)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;g[v]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(c=l.reactiveElementVersions)&&void 0!==c?c:l.reactiveElementVersions=[]).push("1.6.3");const f=window,b=f.trustedTypes,$=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,S="?"+w,A=`<${S}>`,k=document,C=()=>k.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,P=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,I=/"/g,V=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),O=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,M=k.createTreeWalker(k,129,null,!1);function q(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(e):e}const L=(t,e)=>{const o=t.length-1,r=[];let i,s=2===e?"<svg>":"",n=U;for(let e=0;e<o;e++){const o=t[e];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===U?"!--"===c[1]?n=D:void 0!==c[1]?n=P:void 0!==c[2]?(V.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=z):void 0!==c[3]&&(n=z):n===z?">"===c[0]?(n=null!=i?i:U,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?z:'"'===c[3]?I:N):n===I||n===N?n=z:n===D||n===P?n=U:(n=z,i=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";s+=n===U?o+A:l>=0?(r.push(a),o.slice(0,l)+x+o.slice(l)+w+h):o+w+(-2===l?(r.push(void 0),e):h)}return[q(t,s+(t[o]||"<?>")+(2===e?"</svg>":"")),r]};class F{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let i=0,s=0;const n=t.length-1,a=this.parts,[c,l]=L(t,e);if(this.el=F.createElement(c,o),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=M.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith(x)||e.startsWith(w)){const o=l[s++];if(t.push(e),void 0!==o){const t=r.getAttribute(o.toLowerCase()+x).split(w),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?X:"@"===e[1]?Y:G})}else a.push({type:6,index:i})}for(const e of t)r.removeAttribute(e)}if(V.test(r.tagName)){const t=r.textContent.split(w),e=t.length-1;if(e>0){r.textContent=b?b.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],C()),M.nextNode(),a.push({type:2,index:++i});r.append(t[e],C())}}}else if(8===r.nodeType)if(r.data===S)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(w,t+1));)a.push({type:7,index:i}),t+=w.length-1}i++}}static createElement(t,e){const o=k.createElement("template");return o.innerHTML=t,o}}function W(t,e,o=t,r){var i,s,n,a;if(e===O)return e;let c=void 0!==r?null===(i=o._$Co)||void 0===i?void 0:i[r]:o._$Cl;const l=E(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(s=null==c?void 0:c._$AO)||void 0===s||s.call(c,!1),void 0===l?c=void 0:(c=new l(t),c._$AT(t,o,r)),void 0!==r?(null!==(n=(a=o)._$Co)&&void 0!==n?n:a._$Co=[])[r]=c:o._$Cl=c),void 0!==c&&(e=W(t,c._$AS(t,e.values),c,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:r}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(o,!0);M.currentNode=i;let s=M.nextNode(),n=0,a=0,c=r[0];for(;void 0!==c;){if(n===c.index){let e;2===c.type?e=new K(s,s.nextSibling,this,t):1===c.type?e=new c.ctor(s,c.name,c.strings,this,t):6===c.type&&(e=new tt(s,this,t)),this._$AV.push(e),c=r[++a]}n!==(null==c?void 0:c.index)&&(s=M.nextNode(),n++)}return M.currentNode=k,i}v(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class K{constructor(t,e,o,r){var i;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cp=null===(i=null==r?void 0:r.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),E(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==O&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>R(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=F.createElement(q(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.v(o);else{const t=new Q(i,this),e=t.u(this.options);t.v(o),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new F(t)),e}T(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const i of t)r===e.length?e.push(o=new K(this.k(C()),this.k(C()),this,this.options)):o=e[r],o._$AI(i),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,o,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){const i=this.strings;let s=!1;if(void 0===i)t=W(this,t,e,0),s=!E(t)||t!==this._$AH&&t!==O,s&&(this._$AH=t);else{const r=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=W(this,r[o+n],e,n),a===O&&(a=this._$AH[n]),s||(s=!E(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+i[n+1]),this._$AH[n]=a}s&&!r&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Z=b?b.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class Y extends G{constructor(t,e,o,r,i){super(t,e,o,r,i),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=W(this,t,e,0))&&void 0!==o?o:j)===O)return;const r=this._$AH,i=t===j&&r!==j||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==j&&(r===j||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(F,K),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");var ot,rt;class it extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{var r,i;const s=null!==(r=null==o?void 0:o.renderBefore)&&void 0!==r?r:e;let n=s._$litPart$;if(void 0===n){const t=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:null;s._$litPart$=n=new K(e.insertBefore(C(),t),t,void 0,null!=o?o:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return O}}it.finalized=!0,it._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:it});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:it}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.3");const nt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:o,elements:r}=e;return{kind:o,elements:r,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function ct(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):at(t,e)}function lt(t){return ct({...t,state:!0})}var dt;function ht(t){return t.auth?.data?.access_token||t.auth?.accessToken||null}function ut(){return window.location.origin}async function pt(t){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}}async function mt(t){try{const e=function(t){const e=[];for(const o in t.states){if(!o.startsWith("automation."))continue;const r=t.states[o];if(!r||!r.attributes)continue;const i=r.attributes.id||"";i.includes("vacuum_schedule")&&e.push({id:i,alias:r.attributes.friendly_name||i,_entity_id:o,_state:r.state,_attributes:r.attributes,_from_states:!0})}return e}(t);if(e.length>0){const o=[];for(const r of e){const e=r.id;try{let i=null;try{i=await t.callWS({type:"config/automation/config/get",automation_id:e})}catch(o){try{i=await t.callWS({type:"config/automation/get",automation_id:e})}catch(o){try{i=await t.callWS({type:"automation/get",automation_id:e})}catch(o){try{const o=t.auth?.data?.access_token||t.auth?.accessToken;if(o){const t=`${window.location.origin}/api/config/automation/config/${e}`,r=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});r.ok&&(i=await r.json())}}catch(t){}}}}i&&i.id?o.push(i):o.push(r)}catch(t){o.push(r)}}if(o.length>0)return o}return[]}catch(t){return console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:",t),[]}}function _t(t,e){const o=t.id||"";if(!o.startsWith("vacuum_schedule_")||!o.includes("_day_"))return null;if(t._incomplete)return null;const r=o.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!r)return null;const i=r[1],s=parseInt(r[2],10),n=!(!t.trigger&&!t.triggers),a=!(!t.action&&!t.actions);if(!n||!a)return null;const c=t.trigger||t.triggers;if(!c)return null;const l=Array.isArray(c)?c.filter(t=>null!=t):null!=c?[c]:[];if(0===l.length)return null;const d=l.find(t=>t&&"time"===t.platform);if(!d||!d.at)return null;const h=d.at.substring(0,5),u=t.action||t.actions;if(!u)return null;const p=Array.isArray(u)?u.filter(t=>null!=t):null!=u?[u]:[];if(0===p.length)return null;const m=p.find(t=>{if(!t)return!1;const e=t.service||t.action;return e&&"string"==typeof e&&e.includes("vacuum_clean_segment")});if(!m)return null;const _=m.data?.segments;return{scheduleId:i,day:s,time:h,rooms:Array.isArray(_)?_:_?[_]:[],enabled:"on"===e?.state}}async function vt(t,e){try{const o=(await mt(t)).find(t=>t.id===e.id),r=!!o,i=await async function(t,e){try{const o=ht(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const r=`${ut()}/api/config/automation/config/${e.id}`,i={id:e.id,alias:e.alias,description:e.description,triggers:Array.isArray(e.trigger)?e.trigger:[e.trigger],conditions:Array.isArray(e.condition)?e.condition:e.condition?[e.condition]:[],actions:Array.isArray(e.action)?e.action:[e.action],mode:e.mode||"single"};i.actions&&Array.isArray(i.actions)&&(i.actions=i.actions.map(t=>{if(t.service&&!t.action){const e={...t};return e.action=t.service,delete e.service,e}return t}));const s=await fetch(r,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(i)});if(!s.ok){const t=await s.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${e.id}:`,s.status,t),!1}return await s.json().catch(()=>null),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${e.id}:`,t),!1}}(t,e);if(i)return await pt(t),!0;try{const o=r?"config/automation/update":"config/automation/create";try{return await t.callWS({type:o,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await pt(t),!0}catch(o){if(r&&("unknown_command"===o.code||o.message?.includes("unknown_command")))try{return await t.callWS({type:"config/automation/delete",automation_id:e.id}),await t.callWS({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"}),await pt(t),!0}catch(t){}return console.error(`[Vacuum Schedule Card] Ошибка ${r?"обновления":"создания"} автоматизации ${e.id}:`,o),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка ${r?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${e.id}:`,t),!1}}async function gt(t,e){try{const o=await async function(t,e){try{const o=ht(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const r=`${ut()}/api/config/automation/config/${e}`,i=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(!i.ok){const t=await i.text();return console.error(`[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${e}:`,i.status,t),!1}return!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${e}:`,t),!1}}(t,e);if(o)return await pt(t),!0;try{return await t.callWS({type:"config/automation/delete",automation_id:e}),await pt(t),!0}catch(o){if("unknown_command"===o.code||o.message?.includes("unknown_command"))try{return await t.callService("automation","delete",{id:e}),!0}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,o),!1}}catch(t){return console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${e}:`,t),!1}}null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;const yt={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная",start:"Запуск",stop:"Остановка",pause:"Пауза",return_to_base:"На станцию",error_starting:"Ошибка запуска",error_stopping:"Ошибка остановки",error_pausing:"Ошибка паузы",error_returning:"Ошибка возврата"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom",start:"Start",stop:"Stop",pause:"Pause",return_to_base:"Return to Base",error_starting:"Error starting",error_stopping:"Error stopping",error_pausing:"Error pausing",error_returning:"Error returning"}};function ft(t,e){const o=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return yt[o]?.[t]||yt.en[t]||t}function bt(t){return ft("day_names",t).split(",")}class $t{constructor(t,e,o){this.hass=t,this.entity=e,this.getTranslation=o}async loadSchedules(){const t=new Map,e=await mt(this.hass);for(const o of e)try{const e=o.id||"";if(!e||!e.startsWith("vacuum_schedule_")||!e.includes("_day_"))continue;let r=null;const i=`automation.${e}`;if(this.hass.states[i])r=this.hass.states[i];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const o=this.hass.states[t];if(o.attributes?.id===e){r=o;break}}const s=_t(o,r);if(!s||o._incomplete)continue;const n=s.scheduleId;if(!n)continue;t.has(n)||t.set(n,{id:n,enabled:s.enabled||!1,days:[],time:s.time||"09:00",rooms:s.rooms||[],name:o.alias||void 0});const a=t.get(n);a.days.includes(s.day)||a.days.push(s.day),s.rooms.length>0&&(a.rooms=s.rooms),r?a.enabled="on"===r.state:s.enabled&&(a.enabled=!0)}catch(t){const e=o?.id||o?._entity_id||"неизвестно";console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${e}:`,t)}const o=Array.from(t.values());for(const t of o)t.days.sort((t,e)=>t-e);return o}async saveSchedule(t,e){await this.updateAutomationsForSchedule(t,e),await pt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async deleteSchedule(t){for(const e of t.days)await this.deleteAutomationForDay(t.id,e);await pt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async toggleSchedule(t,e){const o={...t,enabled:e};await this.updateAutomationsForSchedule(o,t),await pt(this.hass),await new Promise(t=>setTimeout(t,1e3))}async updateAutomationsForSchedule(t,e){if(!t.enabled){const o=e?e.days:t.days;for(const e of o)await this.deleteAutomationForDay(t.id,e);return}if(e){const o=e.days.filter(e=>!t.days.includes(e));for(const e of o)await this.deleteAutomationForDay(t.id,e)}const o=bt(this.hass);for(const e of t.days)await this.createAutomationForDay(t,e,o)}async createAutomationForDay(t,e,o){const r=function(t,e,o,r,i){const s=`vacuum_schedule_${t.id}_day_${e}`,n=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,c]=t.time.split(":").map(Number);return{id:s,alias:`${i} ${t.time} - ${r[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${r[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(c).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:n}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:o},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,o,this.getTranslation("schedule_title"));await vt(this.hass,r)||console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${r.id}`)}async deleteAutomationForDay(t,e){const o=`vacuum_schedule_${t}_day_${e}`;await gt(this.hass,o)||console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${o}`)}}async function xt(t,e){try{const o=t.states[e];if(o?.attributes?.icon)return o.attributes.icon;try{const o=await t.callWS({type:"config/entity_registry/get",entity_id:e});if(o?.icon)return o.icon}catch(t){}return}catch(t){return}}async function wt(t,e,o,r){try{const i=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const o=`${window.location.origin}/api/states`,r=await fetch(o,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!r.ok)return console.warn(`Не удалось получить список сущностей: ${r.status}`),null;const i=await r.json(),s={};return Array.isArray(i)&&i.forEach(t=>{t.entity_id&&(s[t.entity_id]=t)}),s}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),s=e.replace("vacuum.",""),n=[],a=[s,s.replace(/_/g,""),"pylesos","vacuum"],c=e=>t.states[e]||i?.[e]||null;for(const e of a){for(let o=1;o<=50;o++){const i=`select.${e}_room_${o}_name`,s=`select.${e}_room_${o}_id`||`number.${e}_room_${o}_id`,a=c(i),l=c(s);if(a&&a.state){let e;if(l&&l.state)e=parseInt(l.state,10);else{const t=i.match(/room_(\d+)/);e=t?parseInt(t[1],10):o}if(!isNaN(e)){const o={id:e,name:a.state},s=await xt(t,i);if(s&&(o.icon=s,o.entity_id=i),r&&r[e]){const i=r[e];if("string"==typeof i)o.icon=i;else if(i.entity_id){o.entity_id=i.entity_id;const e=await xt(t,i.entity_id);e&&(o.icon=e)}}else if(!o.icon){const e=a.state.toLowerCase().replace(/\s+/g,"_"),r=[`zone.${e}`,`sensor.${e}`,`input_select.${e}`,`input_text.${e}`];for(const e of r){const r=await xt(t,e);if(r){o.icon=r,o.entity_id=e;break}}}n.push(o)}}}if(n.length>0)break}if(n.length>0)return n.sort((t,e)=>t.id-e.id);const l=t.states[e];if(l?.attributes){const e=l.attributes.segments||l.attributes.room_list||[];if(Array.isArray(e)&&e.length>0){const o=[];for(const i of e){const e="number"==typeof i?i:i.id||i.segment_id,s={id:e,name:"object"==typeof i&&i.name?i.name:`Комната ${e}`};if(r&&r[e]){const o=r[e];if("string"==typeof o)s.icon=o;else if(o.entity_id){s.entity_id=o.entity_id;const e=await xt(t,o.entity_id);e&&(s.icon=e)}}o.push(s)}return o}}return St(o)}catch(t){return console.error("Ошибка загрузки комнат:",t),St(o)}}function St(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}const At=2;class kt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class Ct extends kt{constructor(t){if(super(t),this.et=j,t.type!==At)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===j||null==t)return this.ft=void 0,this.et=t;if(t===O)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Ct.directiveName="unsafeHTML",Ct.resultType=1;const Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(Ct);class Rt{constructor(t,e){this.hass=t,this.entity=e}async start(t){t&&t.length>0?await this.hass.callService("dreame_vacuum","vacuum_clean_segment",{entity_id:this.entity,segments:t}):await this.hass.callService("vacuum","start",{entity_id:this.entity})}async stop(){await this.hass.callService("vacuum","stop",{entity_id:this.entity})}async pause(){await this.hass.callService("vacuum","pause",{entity_id:this.entity})}async returnToBase(){await this.hass.callService("vacuum","return_to_base",{entity_id:this.entity})}getState(){const t=this.hass.states[this.entity];return t?.state||"unknown"}isButtonDisabled(t,e){switch(t){case"start":return"cleaning"===e||"returning"===e;case"stop":return"idle"===e||"docked"===e||"returning"===e||"unknown"===e;case"pause":return"cleaning"!==e;case"return":return"docked"===e||"returning"===e;default:return!1}}getStateLabel(t){return{cleaning:"Уборка",docked:"На базе",idle:"Ожидание",paused:"На паузе",returning:"Возврат на базу",error:"Ошибка",unknown:"Неизвестно"}[t]||t}getError(){const t=this.hass.states[this.entity];if(!t||!t.attributes)return;const e=t.attributes;return e.error?"string"==typeof e.error?e.error:String(e.error):e.error_message?"string"==typeof e.error_message?e.error_message:String(e.error_message):"error"===e.status&&e.message?"string"==typeof e.message?e.message:String(e.message):"error"===t.state?e.friendly_name?`Ошибка: ${e.friendly_name}`:"Ошибка":void 0}getCurrentCleaningRooms(){const t=this.hass.states[this.entity];if(!t||!t.attributes)return[];const e=t.attributes;return Array.isArray(e.current_segments)?e.current_segments.filter(t=>"number"==typeof t):"number"==typeof e.current_segment?[e.current_segment]:Array.isArray(e.cleaning_segments)?e.cleaning_segments.filter(t=>"number"==typeof t):Array.isArray(e.active_segments)?e.active_segments.filter(t=>"number"==typeof t):"number"==typeof e.segment?[e.segment]:Array.isArray(e.segments)?e.segments.filter(t=>"number"==typeof t):[]}}let Tt=class extends it{constructor(){super(...arguments),this.rooms=[],this.selectedRooms=[],this.hiddenRooms=[],this.showRoomIds=!1,this.roomIcons={},this._currentCleaningRooms=[]}connectedCallback(){super.connectedCallback(),this.hass&&this.entity&&(this._vacuumService=new Rt(this.hass,this.entity),this._updateCleaningRooms(),this._subscribeToStateChanges())}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeFromStateChanges()}updated(t){(t.has("hass")||t.has("entity"))&&this.hass&&this.entity&&(this._vacuumService=new Rt(this.hass,this.entity),this._updateCleaningRooms(),this._subscribeToStateChanges())}_updateCleaningRooms(){this._vacuumService&&(this._currentCleaningRooms=this._vacuumService.getCurrentCleaningRooms(),this.requestUpdate())}_subscribeToStateChanges(){if(this._unsubscribeFromStateChanges(),this.hass?.connection)try{if("function"==typeof this.hass.connection.subscribeEvents){const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e===this.entity&&this._updateCleaningRooms()},"state_changed");"function"==typeof t&&(this._unsubscribeStateChanges=t)}}catch(t){console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния пылесоса:",t)}}_unsubscribeFromStateChanges(){if(this._unsubscribeStateChanges){try{this._unsubscribeStateChanges()}catch(t){}this._unsubscribeStateChanges=void 0}}_t(t){return ft(t,this.hass)}_getVacuumState(){return this._vacuumService?.getState()||"unknown"}_isButtonDisabled(t){if(!this._vacuumService)return!0;const e=this._getVacuumState();return this._vacuumService.isButtonDisabled(t,e)}_getStateLabel(){if(!this._vacuumService)return"Неизвестно";const t=this._getVacuumState();return this._vacuumService.getStateLabel(t)}_getError(){if(this._vacuumService)return this._vacuumService.getError()}_renderRoomIcon(t){if(0===t.id)return H`<ha-icon .icon=${"mdi:home"}></ha-icon>`;const e=this.roomIcons[t.id];let o;return e&&"string"==typeof e&&(o=e),!o&&t.icon&&(o=t.icon),o?o.startsWith("mdi:")||o.startsWith("hass:")||o.includes(":")?H`<ha-icon .icon=${o}></ha-icon>`:H`${o}`:H`🏠`}async _handleStart(){if(this._vacuumService)try{await this._vacuumService.start(this.selectedRooms.length>0?this.selectedRooms:void 0),this.dispatchEvent(new CustomEvent("vacuum-started"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка запуска уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_starting")||"Ошибка запуска"}: ${t}`}}))}}async _handleStop(){if(this._vacuumService)try{await this._vacuumService.stop(),this.dispatchEvent(new CustomEvent("vacuum-stopped"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка остановки уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_stopping")||"Ошибка остановки"}: ${t}`}}))}}async _handlePause(){if(this._vacuumService)try{await this._vacuumService.pause(),this.dispatchEvent(new CustomEvent("vacuum-paused"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка паузы уборки:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_pausing")||"Ошибка паузы"}: ${t}`}}))}}async _handleReturnToBase(){if(this._vacuumService)try{await this._vacuumService.returnToBase(),this.dispatchEvent(new CustomEvent("vacuum-returned"))}catch(t){console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:",t),this.dispatchEvent(new CustomEvent("error",{detail:{message:`${this._t("error_returning")||"Ошибка возврата"}: ${t}`}}))}}_toggleRoom(t){if(this._currentCleaningRooms.includes(t))return;const e=this.selectedRooms.indexOf(t);e>-1?(this.selectedRooms.splice(e,1),this.dispatchEvent(new CustomEvent("room-toggled",{detail:{roomId:t,selected:!1}}))):(this.selectedRooms.push(t),this.dispatchEvent(new CustomEvent("room-toggled",{detail:{roomId:t,selected:!0}}))),this.requestUpdate()}_toggleAllRooms(){if(this._currentCleaningRooms.length>0)return;const t=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));0===this.selectedRooms.length?this.selectedRooms=t.map(t=>t.id):this.selectedRooms=[],this.dispatchEvent(new CustomEvent("all-rooms-toggled")),this.requestUpdate()}render(){this._getVacuumState();const t=this._isButtonDisabled("start"),e=this._isButtonDisabled("stop"),o=this._isButtonDisabled("pause"),r=this._isButtonDisabled("return"),i=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));return H`
      <div class="control-panel">
        <div class="control-panel-status">
          <span class="status-icon">${Et(function(t="default"){return{default:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="42" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.25"/>\n  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2" opacity="0.4"/>\n  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2"/>\n  <circle cx="50" cy="28" r="4" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <circle cx="50" cy="28" r="2" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <circle cx="12" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="88" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="12" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <circle cx="88" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <ellipse cx="50" cy="78" rx="3.5" ry="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <circle cx="42" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n  <circle cx="58" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>\n</svg>',outline:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary-text-color)" stroke-width="2.5"/>\n  <circle cx="50" cy="28" r="7" fill="none" stroke="var(--primary-text-color)" stroke-width="2"/>\n  <circle cx="50" cy="28" r="4" fill="none" stroke="var(--primary-text-color)" stroke-width="1.5" opacity="0.6"/>\n  <circle cx="50" cy="28" r="2" fill="var(--primary-text-color)"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>\n  <circle cx="12" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <circle cx="88" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--primary-text-color)" opacity="0.7"/>\n  <circle cx="42" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>\n  <circle cx="58" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>\n</svg>',filled:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="38" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.3"/>\n  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))"/>\n  <circle cx="50" cy="28" r="5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.4"/>\n  <circle cx="50" cy="28" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>\n  <path d="M 20 50 Q 50 48 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>\n  <path d="M 20 50 Q 50 52 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>\n  <circle cx="12" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <circle cx="88" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <circle cx="12" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>\n  <circle cx="88" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>\n  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>\n  <ellipse cx="50" cy="78" rx="4" ry="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>\n  <circle cx="42" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>\n  <circle cx="58" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>\n</svg>'}[t]}("default"))}</span>
          <div class="status-info">
            <span class="status-text">Статус: <strong>${this._getStateLabel()}</strong></span>
            ${this._getError()?H`
              <span class="status-error">${this._getError()}</span>
            `:""}
          </div>
        </div>
        <div class="control-row">
          ${t?"":H`
            <ha-button 
              class="control-button"
              @click=${this._handleStart}
              title="${this._t("start")||"Запуск"}"
            >
              ▶️ ${this._t("start")||"Запуск"}
            </ha-button>
          `}
          ${e?"":H`
            <ha-button 
              class="control-button"
              @click=${this._handleStop}
              title="${this._t("stop")||"Остановка"}"
            >
              ⏹️ ${this._t("stop")||"Остановка"}
            </ha-button>
          `}
          ${o?"":H`
            <ha-button 
              class="control-button"
              @click=${this._handlePause}
              title="${this._t("pause")||"Пауза"}"
            >
              ⏸️ ${this._t("pause")||"Пауза"}
            </ha-button>
          `}
          ${r?"":H`
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
          ${i.length>0?H`
            <ha-card 
              class="room-button ${0===this.selectedRooms.length&&0===this._currentCleaningRooms.length?"pressed":""} ${this._currentCleaningRooms.length>0?"disabled":""}"
              @click=${this._currentCleaningRooms.length>0?void 0:this._toggleAllRooms}
              title="${this._t("all_rooms")}${this._currentCleaningRooms.length>0?" (идет уборка)":""}"
            >
              <div class="button-content">
                <div class="button-icon">${this._renderRoomIcon({id:0,name:this._t("all_rooms")})}</div>
                <div class="button-label">${this._t("all_rooms")}</div>
              </div>
              <ha-ripple></ha-ripple>
            </ha-card>
            ${i.map(t=>{const e=this._currentCleaningRooms.includes(t.id),o=this.selectedRooms.includes(t.id);return H`
                <ha-card 
                  class="room-button ${e||o?"pressed":""} ${e?"disabled":""}"
                  @click=${e?void 0:()=>this._toggleRoom(t.id)}
                  title="${t.name}${this.showRoomIds?` (ID: ${t.id})`:""}${e?" (убирается)":""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon(t)}</div>
                    <div class="button-label">${t.name}</div>
                    ${this.showRoomIds?H`<div class="button-id">ID: ${t.id}</div>`:""}
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `})}
          `:H`<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
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
      }
      .status-icon svg {
        width: 100%;
        height: 100%;
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
    `}};t([ct({attribute:!1})],Tt.prototype,"hass",void 0),t([ct()],Tt.prototype,"entity",void 0),t([ct({attribute:!1})],Tt.prototype,"rooms",void 0),t([ct({attribute:!1})],Tt.prototype,"selectedRooms",void 0),t([ct({attribute:!1})],Tt.prototype,"hiddenRooms",void 0),t([ct()],Tt.prototype,"showRoomIds",void 0),t([ct({attribute:!1})],Tt.prototype,"roomIcons",void 0),t([lt()],Tt.prototype,"_vacuumService",void 0),t([lt()],Tt.prototype,"_currentCleaningRooms",void 0),Tt=t([nt("vacuum-control-panel")],Tt);let Ut=class extends it{constructor(){super(...arguments),this.schedules=[],this.rooms=[]}_t(t){return ft(t,this.hass)}_formatDays(t){return function(t,e,o){return 0===t.length?o.noDays:7===t.length?o.everyDay:t.map(t=>e[t]).join(", ")}(t,bt(this.hass),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,o){if(0===t.length)return o;const r=t.map(t=>{const o=e.find(e=>e.id===t);return o?o.name:`ID:${t}`}).join(", ");return r||"Комнаты не выбраны"}(t,this.rooms,this._t("all_rooms"))}_handleEdit(t){this.dispatchEvent(new CustomEvent("schedule-edit",{detail:{schedule:t}}))}_handleDelete(t){this.dispatchEvent(new CustomEvent("schedule-delete",{detail:{schedule:t}}))}async _handleToggle(t,e){this.dispatchEvent(new CustomEvent("schedule-toggle",{detail:{schedule:t,enabled:e}}))}render(){return 0===this.schedules.length?H`<div class="content">${this._t("no_schedules")}</div>`:H`
      <div class="schedules-list">
        ${this.schedules.map(t=>H`
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
    `}};t([ct({attribute:!1})],Ut.prototype,"hass",void 0),t([ct({attribute:!1})],Ut.prototype,"schedules",void 0),t([ct({attribute:!1})],Ut.prototype,"rooms",void 0),Ut=t([nt("vacuum-schedule-list")],Ut);let Dt=class extends it{constructor(){super(...arguments),this.open=!1,this.rooms=[],this.hiddenRooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}updated(t){if(t.has("schedule")||t.has("open"))if(this.open&&this.schedule){const t=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id)),e=this.schedule.rooms.filter(e=>t.some(t=>t.id===e));this._newSchedule={enabled:this.schedule.enabled,days:[...this.schedule.days],time:this.schedule.time,rooms:e,name:this.schedule.name}}else this.open&&!this.schedule&&(this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]})}_t(t){return ft(t,this.hass)}_getDayNames(){return bt(this.hass)}_handleClose(){this.dispatchEvent(new CustomEvent("dialog-close"))}_handleSave(){this._newSchedule.time?this._newSchedule.days&&0!==this._newSchedule.days.length?(this.error=void 0,this.dispatchEvent(new CustomEvent("schedule-save",{detail:{schedule:{id:this.schedule?.id,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days||[],time:this._newSchedule.time||"09:00",rooms:this._newSchedule.rooms||[],name:this._newSchedule.name}}}))):this.error=this._t("error_days_required")||"Выберите хотя бы один день":this.error=this._t("error_time_required")||"Время обязательно"}_handleDayToggle(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);-1===e?this._newSchedule.days.push(t):this._newSchedule.days.splice(e,1),this.requestUpdate()}_handleTimeChange(t){this._newSchedule.time=t.target.value}_handleToggleAllRooms(t){const e=t.target.checked,o=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));this._newSchedule.rooms=e?o.map(t=>t.id):[],this.requestUpdate()}_handleToggleRoom(t,e){this._newSchedule.rooms||(this._newSchedule.rooms=[]);if(e.target.checked)this._newSchedule.rooms.includes(t)||this._newSchedule.rooms.push(t);else{const e=this._newSchedule.rooms.indexOf(t);-1!==e&&this._newSchedule.rooms.splice(e,1)}this.requestUpdate()}_handleEnabledChange(t){this._newSchedule.enabled=t.target.checked}_handleNameChange(t){this._newSchedule.name=t.target.value||void 0}render(){if(!this.open)return H``;const t=this._getDayNames(),e=this.rooms.filter(t=>!this.hiddenRooms.includes(t.id));return H`
      <div class="dialog" @click=${this._handleClose}>
        <div class="dialog-content" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            ${this.schedule?this._t("edit_schedule"):this._t("add_schedule")}
          </div>

          ${this.error?H`<div class="error">${this.error}</div>`:""}

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
              ${t.map((t,e)=>{const o=0===e?0:e;return H`
                  <button
                    class="day-button ${this._newSchedule.days?.includes(o)?"selected":""}"
                    @click=${()=>this._handleDayToggle(o)}
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
            ${(()=>H`
                <label class="form-label">${this._t("rooms_label")} (${e.length} ${this._t("rooms_available")})</label>
                <div class="rooms-selector">
                  ${e.length>0?H`
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
                    ${e.map(t=>H`
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
                  `:H`<div class="content">${this._t("rooms_not_found")}</div>`}
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
    `}};t([ct({attribute:!1})],Dt.prototype,"hass",void 0),t([ct({type:Boolean})],Dt.prototype,"open",void 0),t([ct({attribute:!1})],Dt.prototype,"schedule",void 0),t([ct({attribute:!1})],Dt.prototype,"rooms",void 0),t([ct({attribute:!1})],Dt.prototype,"hiddenRooms",void 0),t([ct()],Dt.prototype,"error",void 0),t([lt()],Dt.prototype,"_newSchedule",void 0),Dt=t([nt("vacuum-schedule-dialog")],Dt);let Pt=class extends it{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._selectedRoomsForControl=[]}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this.hass&&(this._scheduleService=new $t(this.hass,this.entity,t=>this._t(t)),this._loadSchedules(),this._loadRooms())}connectedCallback(){super.connectedCallback(),this.hass&&this.entity&&(this._scheduleService=new $t(this.hass,this.entity,t=>this._t(t)),this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){console.warn("Ошибка при отписке от изменений автоматизаций:",t)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e&&e.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof t?t:()=>{}}catch(t){console.warn("Не удалось подписаться на события:",t)}}catch(t){console.warn("Не удалось подписаться на изменения автоматизаций:",t)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await wt(this.hass,this.entity,t=>this._t(t),this._config?.room_icons),this.requestUpdate())}async _loadSchedules(){if(this.hass&&this._scheduleService){this._loading=!0,this._error=void 0;try{this._schedules=await this._scheduleService.loadSchedules()}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}_t(t){return ft(t,this.hass)}_handleRoomToggled(t){const{roomId:e,selected:o}=t.detail;this._selectedRoomsForControl=o?[...this._selectedRoomsForControl,e]:this._selectedRoomsForControl.filter(t=>t!==e),this.requestUpdate()}_handleAllRoomsToggled(){0===this._selectedRoomsForControl.length?this._selectedRoomsForControl=this._rooms.map(t=>t.id):this._selectedRoomsForControl=[],this.requestUpdate()}_handleScheduleEdit(t){this._editingSchedule=t.detail.schedule,this._showAddDialog=!0,this._error=void 0,this.requestUpdate()}_handleScheduleDelete(t){const e=t.detail.schedule;confirm(this._t("delete_confirm"))&&this._deleteSchedule(e)}async _deleteSchedule(t){if(this._scheduleService){this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate();try{await this._scheduleService.deleteSchedule(t),await this._loadSchedules()}catch(t){console.error("[Vacuum Schedule Card] Ошибка удаления расписания:",t),this._error=`${this._t("error_deleting")||"Ошибка удаления"}: ${t}`,this.requestUpdate()}}}async _handleScheduleToggle(t){const{schedule:e,enabled:o}=t.detail;if(!this._scheduleService)return;const r={...e,enabled:o};this._schedules=this._schedules.map(t=>t.id===e.id?r:t),this.requestUpdate();try{await this._scheduleService.toggleSchedule(e,o),await this._loadSchedules()}catch(t){console.error("[Vacuum Schedule Card] Ошибка переключения расписания:",t),this._error=`${this._t("error_toggling")||"Ошибка переключения"}: ${t}`,this.requestUpdate()}}_handleScheduleSave(t){const{schedule:e,oldSchedule:o}=t.detail;if(!this._scheduleService)return;let r=[...this._schedules];if(o){const t=r.findIndex(t=>t.id===o.id);t>-1&&(r[t]=e)}else r.push(e);this._schedules=r,this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this.requestUpdate(),this._scheduleService.saveSchedule(e,o).then(()=>this._loadSchedules()).catch(t=>{console.error("[Vacuum Schedule Card] Ошибка сохранения расписания:",t),this._error=`${this._t("error_saving")} ${t}`,this.requestUpdate()})}_handleDialogClose(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this.requestUpdate()}_handleError(t){this._error=t.detail.message,this.requestUpdate()}_handleAddSchedule(){this._editingSchedule=void 0,this._showAddDialog=!0,this._error=void 0,this.requestUpdate()}render(){if(!this.hass||!this.entity)return H`<ha-card>
        <div class="content">${this._t("error_no_entity")}</div>
      </ha-card>`;return this.hass.states[this.entity]?H`
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
          
        ${this._error&&!this._showAddDialog?H`<div class="error">${this._error}</div>`:""}
          
        ${this._loading?H`<div class="loading">${this._t("loading")}</div>`:H`
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
    `:H`<ha-card>
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </ha-card>`}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card",title:void 0,hidden_rooms:[],show_room_ids:!1,room_icons:{}}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"title",required:!1,selector:{text:{}}}],computeLabel:t=>"entity"===t.name?"Vacuum Entity":"title"===t.name?"Card Title":void 0,computeHelper:t=>"entity"===t.name?"Select the vacuum entity to manage schedules for":"title"===t.name?"Custom title for the card (optional). If not specified, default title will be used.":void 0}}static get styles(){return n`
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
    `}};t([ct({attribute:!1})],Pt.prototype,"hass",void 0),t([ct()],Pt.prototype,"entity",void 0),t([lt()],Pt.prototype,"_schedules",void 0),t([lt()],Pt.prototype,"_loading",void 0),t([lt()],Pt.prototype,"_error",void 0),t([lt()],Pt.prototype,"_showAddDialog",void 0),t([lt()],Pt.prototype,"_editingSchedule",void 0),t([lt()],Pt.prototype,"_rooms",void 0),t([lt()],Pt.prototype,"_selectedRoomsForControl",void 0),Pt=t([nt("vacuum-schedule-card")],Pt),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",Pt),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{Pt as VacuumScheduleCard};
