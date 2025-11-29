/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$5=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$4?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$3=window,r$1=e$3.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$3.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:true,type:String,converter:n$4,reflect:false,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return  false;this[d$1]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=true,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$3.reactiveElementVersions)&&void 0!==s$2?s$2:e$3.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$1=i$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$3,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}}s.finalized=true,s._$litElement$=true,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e(n,t,o):i(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$1({...t,state:true})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

async function getAllEntitiesFromAPI(hass) {
    try {
        const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
        if (!token) {
            console.warn("Токен авторизации не найден для получения сущностей");
            return null;
        }
        const baseUrl = window.location.origin;
        const apiUrl = `${baseUrl}/api/states`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.warn(`Не удалось получить список сущностей: ${response.status}`);
            return null;
        }
        const entities = await response.json();
        const entitiesMap = {};
        if (Array.isArray(entities)) {
            entities.forEach((entity) => {
                if (entity.entity_id) {
                    entitiesMap[entity.entity_id] = entity;
                }
            });
        }
        return entitiesMap;
    }
    catch (error) {
        console.warn("Ошибка получения сущностей через API:", error);
        return null;
    }
}
function getAuthToken(hass) {
    return hass.auth?.data?.access_token || hass.auth?.accessToken || null;
}
function getBaseUrl() {
    return window.location.origin;
}
async function createOrUpdateAutomationREST(hass, automation) {
    try {
        const token = getAuthToken(hass);
        if (!token) {
            console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации");
            return false;
        }
        const baseUrl = getBaseUrl();
        const apiUrl = `${baseUrl}/api/config/automation/config/${automation.id}`;
        const requestBody = {
            id: automation.id,
            alias: automation.alias,
            description: automation.description,
            triggers: Array.isArray(automation.trigger) ? automation.trigger : [automation.trigger],
            conditions: Array.isArray(automation.condition) ? automation.condition : (automation.condition ? [automation.condition] : []),
            actions: Array.isArray(automation.action) ? automation.action : [automation.action],
            mode: automation.mode || "single",
        };
        if (requestBody.actions && Array.isArray(requestBody.actions)) {
            requestBody.actions = requestBody.actions.map((act) => {
                if (act.service && !act.action) {
                    const newAct = { ...act };
                    newAct.action = act.service;
                    delete newAct.service;
                    return newAct;
                }
                return act;
            });
        }
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Vacuum Schedule Card] Ошибка REST API при создании/обновлении автоматизации ${automation.id}:`, response.status, errorText);
            return false;
        }
        await response.json().catch(() => null);
        return true;
    }
    catch (error) {
        console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${automation.id}:`, error);
        return false;
    }
}
async function deleteAutomationREST(hass, automationId) {
    try {
        const token = getAuthToken(hass);
        if (!token) {
            console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации");
            return false;
        }
        const baseUrl = getBaseUrl();
        const apiUrl = `${baseUrl}/api/config/automation/config/${automationId}`;
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Vacuum Schedule Card] Ошибка REST API при удалении автоматизации ${automationId}:`, response.status, errorText);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${automationId}:`, error);
        return false;
    }
}

/**
 * Перезагружает автоматизации в Home Assistant
 */
async function reloadAutomations(hass) {
    try {
        await hass.callService("automation", "reload");
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    catch (error) {
        console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:", error);
    }
}
/**
 * Фильтрует hass.states для получения автоматизаций расписаний
 */
function filterScheduleAutomations(hass) {
    const filteredAutomations = [];
    for (const entityId in hass.states) {
        if (!entityId.startsWith("automation.")) {
            continue;
        }
        const state = hass.states[entityId];
        if (!state || !state.attributes) {
            continue;
        }
        const automationId = state.attributes.id || "";
        if (!automationId.includes("vacuum_schedule")) {
            continue;
        }
        filteredAutomations.push({
            id: automationId,
            alias: state.attributes.friendly_name || automationId,
            _entity_id: entityId,
            _state: state.state,
            _attributes: state.attributes,
            _from_states: true,
        });
    }
    return filteredAutomations;
}
async function getScheduleAutomations(hass) {
    try {
        const filteredFromStates = filterScheduleAutomations(hass);
        if (filteredFromStates.length > 0) {
            const automationConfigs = [];
            for (const filteredAutomation of filteredFromStates) {
                const automationId = filteredAutomation.id;
                try {
                    let config = null;
                    try {
                        config = await hass.callWS({
                            type: "config/automation/config/get",
                            automation_id: automationId,
                        });
                    }
                    catch (e1) {
                        try {
                            config = await hass.callWS({
                                type: "config/automation/get",
                                automation_id: automationId,
                            });
                        }
                        catch (e2) {
                            try {
                                config = await hass.callWS({
                                    type: "automation/get",
                                    automation_id: automationId,
                                });
                            }
                            catch (e3) {
                                try {
                                    const token = hass.auth?.data?.access_token || hass.auth?.accessToken;
                                    if (token) {
                                        const baseUrl = window.location.origin;
                                        const apiUrl = `${baseUrl}/api/config/automation/config/${automationId}`;
                                        const response = await fetch(apiUrl, {
                                            method: "GET",
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                "Content-Type": "application/json",
                                            },
                                        });
                                        if (response.ok) {
                                            config = await response.json();
                                        }
                                    }
                                }
                                catch (restError) {
                                    // Игнорируем ошибки REST API
                                }
                            }
                        }
                    }
                    if (config && config.id) {
                        automationConfigs.push(config);
                    }
                    else {
                        automationConfigs.push(filteredAutomation);
                    }
                }
                catch (error) {
                    automationConfigs.push(filteredAutomation);
                }
            }
            if (automationConfigs.length > 0) {
                return automationConfigs;
            }
        }
        return [];
    }
    catch (error) {
        console.warn("[Vacuum Schedule Card] Ошибка получения списка автоматизаций:", error);
        return [];
    }
}
/**
 * Парсит расписание из конфигурации автоматизации
 */
function parseScheduleFromAutomation(automationConfig, automationState) {
    const configId = automationConfig.id || "";
    if (!configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
        return null;
    }
    if (automationConfig._incomplete) {
        return null;
    }
    const idMatch = configId.match(/^vacuum_schedule_(.+)_day_(\d+)$/);
    if (!idMatch) {
        return null;
    }
    const scheduleId = idMatch[1];
    const day = parseInt(idMatch[2], 10);
    const hasTrigger = !!(automationConfig.trigger || automationConfig.triggers);
    const hasAction = !!(automationConfig.action || automationConfig.actions);
    if (!hasTrigger || !hasAction) {
        return null;
    }
    const triggerData = automationConfig.trigger || automationConfig.triggers;
    if (!triggerData) {
        return null;
    }
    const triggers = Array.isArray(triggerData)
        ? triggerData.filter((t) => t != null)
        : triggerData != null
            ? [triggerData]
            : [];
    if (triggers.length === 0) {
        return null;
    }
    const timeTrigger = triggers.find((t) => t && t.platform === "time");
    if (!timeTrigger || !timeTrigger.at) {
        return null;
    }
    const time = timeTrigger.at.substring(0, 5);
    const actionData = automationConfig.action || automationConfig.actions;
    if (!actionData) {
        return null;
    }
    const actions = Array.isArray(actionData)
        ? actionData.filter((a) => a != null)
        : actionData != null
            ? [actionData]
            : [];
    if (actions.length === 0) {
        return null;
    }
    const action = actions.find((a) => {
        if (!a)
            return false;
        const service = a.service || a.action;
        return service && typeof service === "string" && service.includes("vacuum_clean_segment");
    });
    if (!action) {
        return null;
    }
    const segments = action.data?.segments;
    const rooms = Array.isArray(segments) ? segments : segments ? [segments] : [];
    return {
        scheduleId,
        day,
        time,
        rooms,
        enabled: automationState?.state === "on",
    };
}
async function createOrUpdateAutomation(hass, automation) {
    try {
        const scheduleAutomations = await getScheduleAutomations(hass);
        const existingAutomation = scheduleAutomations.find((a) => a.id === automation.id);
        const isUpdate = !!existingAutomation;
        const restSuccess = await createOrUpdateAutomationREST(hass, automation);
        if (restSuccess) {
            await reloadAutomations(hass);
            return true;
        }
        try {
            const commandType = isUpdate ? "config/automation/update" : "config/automation/create";
            try {
                await hass.callWS({
                    type: commandType,
                    id: automation.id,
                    alias: automation.alias,
                    description: automation.description,
                    trigger: automation.trigger,
                    condition: automation.condition || [],
                    action: automation.action,
                    mode: automation.mode || "single",
                });
                await reloadAutomations(hass);
                return true;
            }
            catch (error) {
                if (isUpdate && (error.code === "unknown_command" || error.message?.includes("unknown_command"))) {
                    try {
                        await hass.callWS({
                            type: "config/automation/delete",
                            automation_id: automation.id,
                        });
                        await hass.callWS({
                            type: "config/automation/create",
                            id: automation.id,
                            alias: automation.alias,
                            description: automation.description,
                            trigger: automation.trigger,
                            condition: automation.condition || [],
                            action: automation.action,
                            mode: automation.mode || "single",
                        });
                        await reloadAutomations(hass);
                        return true;
                    }
                    catch (deleteError) {
                        // Игнорируем ошибки удаления
                    }
                }
                console.error(`[Vacuum Schedule Card] Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`, error);
                return false;
            }
        }
        catch (error) {
            console.error(`[Vacuum Schedule Card] Ошибка ${isUpdate ? "обновления" : "создания"} автоматизации ${automation.id}:`, error);
            return false;
        }
    }
    catch (error) {
        console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${automation.id}:`, error);
        return false;
    }
}
async function deleteAutomation(hass, automationId) {
    try {
        const restSuccess = await deleteAutomationREST(hass, automationId);
        if (restSuccess) {
            await reloadAutomations(hass);
            return true;
        }
        try {
            await hass.callWS({
                type: "config/automation/delete",
                automation_id: automationId,
            });
            await reloadAutomations(hass);
            return true;
        }
        catch (error) {
            if (error.code === "unknown_command" || error.message?.includes("unknown_command")) {
                try {
                    await hass.callService("automation", "delete", {
                        id: automationId,
                    });
                    return true;
                }
                catch (serviceError) {
                    console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, serviceError);
                    return false;
                }
            }
            console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, error);
            return false;
        }
    }
    catch (error) {
        console.warn(`[Vacuum Schedule Card] Ошибка удаления автоматизации ${automationId}:`, error);
        return false;
    }
}
function createAutomationFromSchedule(schedule, day, entity, dayNames, scheduleTitle) {
    const automationId = `vacuum_schedule_${schedule.id}_day_${day}`;
    const dayName = getWeekdayName(day);
    const [hours, minutes] = schedule.time.split(":").map(Number);
    return {
        id: automationId,
        alias: `${scheduleTitle} ${schedule.time} - ${dayNames[day]} (${schedule.id})`,
        description: `Автоматизация для расписания уборки ${schedule.time} в ${dayNames[day]}`,
        trigger: [
            {
                platform: "time",
                at: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`,
            },
        ],
        condition: [
            {
                condition: "time",
                weekday: dayName,
            },
        ],
        action: [
            {
                service: "dreame_vacuum.vacuum_clean_segment",
                target: {
                    entity_id: entity,
                },
                data: {
                    segments: schedule.rooms.length > 0 ? schedule.rooms : undefined,
                },
            },
        ],
        mode: "single",
    };
}
function getWeekdayName(day) {
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return dayNames[day] || "mon";
}

const translations = {
    ru: {
        "schedule_title": "Расписание уборки",
        "schedules_count": "расписаний",
        "no_schedules": "Нет расписаний. Добавьте первое расписание.",
        "add_schedule": "+ Добавить расписание",
        "edit_schedule": "Редактировать расписание",
        "add_schedule_title": "Добавить расписание",
        "days_label": "Дни недели",
        "time_label": "Время",
        "rooms_label": "Комнаты для уборки",
        "rooms_available": "доступно",
        "select_all": "Выбрать все",
        "enabled": "Включено",
        "cancel": "Отмена",
        "save": "Сохранить",
        "delete_confirm": "Удалить это расписание?",
        "loading": "Загрузка...",
        "error_no_entity": "Ошибка: не указаны hass или entity",
        "error_entity_not_found": "Ошибка: сущность",
        "not_found": "не найдена",
        "error_loading": "Ошибка загрузки расписаний:",
        "error_saving": "Ошибка сохранения:",
        "error_updating": "Ошибка обновления:",
        "error_deleting": "Ошибка удаления:",
        "error_no_days": "Выберите хотя бы один день",
        "error_no_time": "Укажите время",
        "error_no_hass": "Ошибка: hass не доступен",
        "all_rooms": "Все комнаты",
        "no_rooms_selected": "Комнаты не выбраны",
        "rooms_not_found": "Комнаты не найдены. Проверьте подключение пылесоса.",
        "rooms_hint": "💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",
        "every_day": "Каждый день",
        "no_days": "Нет дней",
        "day_names": "Вс,Пн,Вт,Ср,Чт,Пт,Сб",
        "room_names": "Гостиная,Спальня,Кухня,Ванная",
        "start": "Запуск",
        "stop": "Остановка",
        "pause": "Пауза",
        "return_to_base": "На станцию",
        "error_starting": "Ошибка запуска",
        "error_stopping": "Ошибка остановки",
        "error_pausing": "Ошибка паузы",
        "error_returning": "Ошибка возврата",
    },
    en: {
        "schedule_title": "Vacuum Schedule",
        "schedules_count": "schedules",
        "no_schedules": "No schedules. Add your first schedule.",
        "add_schedule": "+ Add Schedule",
        "edit_schedule": "Edit Schedule",
        "add_schedule_title": "Add Schedule",
        "days_label": "Days of week",
        "time_label": "Time",
        "rooms_label": "Rooms to clean",
        "rooms_available": "available",
        "select_all": "Select all",
        "enabled": "Enabled",
        "cancel": "Cancel",
        "save": "Save",
        "delete_confirm": "Delete this schedule?",
        "loading": "Loading...",
        "error_no_entity": "Error: hass or entity not specified",
        "error_entity_not_found": "Error: entity",
        "not_found": "not found",
        "error_loading": "Error loading schedules:",
        "error_saving": "Error saving:",
        "error_updating": "Error updating:",
        "error_deleting": "Error deleting:",
        "error_no_days": "Select at least one day",
        "error_no_time": "Specify time",
        "error_no_hass": "Error: hass not available",
        "all_rooms": "All rooms",
        "no_rooms_selected": "No rooms selected",
        "rooms_not_found": "Rooms not found. Check vacuum connection.",
        "rooms_hint": "💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",
        "every_day": "Every day",
        "no_days": "No days",
        "day_names": "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
        "room_names": "Living Room,Bedroom,Kitchen,Bathroom",
        "start": "Start",
        "stop": "Stop",
        "pause": "Pause",
        "return_to_base": "Return to Base",
        "error_starting": "Error starting",
        "error_stopping": "Error stopping",
        "error_pausing": "Error pausing",
        "error_returning": "Error returning",
    },
};

/**
 * Получает язык из hass
 */
function getLanguage(hass) {
    if (!hass)
        return "en";
    const lang = hass.language || hass.locale?.language || "en";
    return lang.startsWith("ru") ? "ru" : "en";
}
/**
 * Получает перевод по ключу
 */
function translate(key, hass) {
    const lang = getLanguage(hass);
    return translations[lang]?.[key] || translations.en[key] || key;
}
/**
 * Получает имена дней недели
 */
function getDayNames(hass) {
    const dayNamesStr = translate("day_names", hass);
    return dayNamesStr.split(",");
}

class ScheduleService {
    constructor(hass, entity, getTranslation) {
        this.hass = hass;
        this.entity = entity;
        this.getTranslation = getTranslation;
    }
    async loadSchedules() {
        const automationsMap = new Map();
        const scheduleAutomations = await getScheduleAutomations(this.hass);
        for (const automationConfig of scheduleAutomations) {
            try {
                const configId = automationConfig.id || "";
                if (!configId || !configId.startsWith("vacuum_schedule_") || !configId.includes("_day_")) {
                    continue;
                }
                let automationState = null;
                const directEntityId = `automation.${configId}`;
                if (this.hass.states[directEntityId]) {
                    automationState = this.hass.states[directEntityId];
                }
                else {
                    for (const entityId in this.hass.states) {
                        if (!entityId.startsWith("automation."))
                            continue;
                        const state = this.hass.states[entityId];
                        if (state.attributes?.id === configId) {
                            automationState = state;
                            break;
                        }
                    }
                }
                const parsed = parseScheduleFromAutomation(automationConfig, automationState);
                if (!parsed || automationConfig._incomplete) {
                    continue;
                }
                const scheduleId = parsed.scheduleId;
                if (!scheduleId) {
                    continue;
                }
                if (!automationsMap.has(scheduleId)) {
                    automationsMap.set(scheduleId, {
                        id: scheduleId,
                        enabled: parsed.enabled || false,
                        days: [],
                        time: parsed.time || "09:00",
                        rooms: parsed.rooms || [],
                        name: automationConfig.alias || undefined,
                    });
                }
                const schedule = automationsMap.get(scheduleId);
                if (!schedule.days.includes(parsed.day)) {
                    schedule.days.push(parsed.day);
                }
                if (parsed.rooms.length > 0) {
                    schedule.rooms = parsed.rooms;
                }
                if (automationState) {
                    schedule.enabled = automationState.state === "on";
                }
                else if (parsed.enabled) {
                    schedule.enabled = true;
                }
            }
            catch (e) {
                const errorId = automationConfig?.id || automationConfig?._entity_id || "неизвестно";
                console.error(`[Vacuum Schedule Card] Ошибка обработки автоматизации ${errorId}:`, e);
            }
        }
        const schedules = Array.from(automationsMap.values());
        for (const schedule of schedules) {
            schedule.days.sort((a, b) => a - b);
        }
        return schedules;
    }
    async saveSchedule(schedule, oldSchedule) {
        await this.updateAutomationsForSchedule(schedule, oldSchedule);
        await reloadAutomations(this.hass);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async deleteSchedule(schedule) {
        for (const day of schedule.days) {
            await this.deleteAutomationForDay(schedule.id, day);
        }
        await reloadAutomations(this.hass);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async toggleSchedule(schedule, enabled) {
        const updatedSchedule = { ...schedule, enabled };
        await this.updateAutomationsForSchedule(updatedSchedule, schedule);
        await reloadAutomations(this.hass);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async updateAutomationsForSchedule(schedule, oldSchedule) {
        if (!schedule.enabled) {
            const daysToDelete = oldSchedule ? oldSchedule.days : schedule.days;
            for (const day of daysToDelete) {
                await this.deleteAutomationForDay(schedule.id, day);
            }
            return;
        }
        if (oldSchedule) {
            const daysToRemove = oldSchedule.days.filter(d => !schedule.days.includes(d));
            for (const day of daysToRemove) {
                await this.deleteAutomationForDay(schedule.id, day);
            }
        }
        const dayNames = getDayNames(this.hass);
        for (const day of schedule.days) {
            await this.createAutomationForDay(schedule, day, dayNames);
        }
    }
    async createAutomationForDay(schedule, day, dayNames) {
        const automation = createAutomationFromSchedule(schedule, day, this.entity, dayNames, this.getTranslation("schedule_title"));
        const success = await createOrUpdateAutomation(this.hass, automation);
        if (!success) {
            console.error(`[Vacuum Schedule Card] Не удалось создать/обновить автоматизацию ${automation.id}`);
        }
    }
    async deleteAutomationForDay(scheduleId, day) {
        const automationId = `vacuum_schedule_${scheduleId}_day_${day}`;
        const success = await deleteAutomation(this.hass, automationId);
        if (!success) {
            console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${automationId}`);
        }
    }
}

/**
 * Загружает комнаты из различных источников
 */
async function loadRooms(hass, entity, getTranslation) {
    try {
        // Получаем все сущности через API как дополнительный источник
        const apiEntities = await getAllEntitiesFromAPI(hass);
        // Извлекаем базовое имя entity (например, из vacuum.xiaomi_m30s получаем xiaomi_m30s)
        const entityName = entity.replace("vacuum.", "");
        // Ищем select-сущности для комнат (например, select.pylesos_room_1_name)
        // Паттерн: select.{entity_prefix}_room_{id}_name
        const roomEntities = [];
        // Пробуем разные префиксы
        const possiblePrefixes = [
            entityName,
            entityName.replace(/_/g, ""),
            "pylesos", // как в примере
            "vacuum",
        ];
        // Функция для получения состояния сущности (из hass.states или из API)
        const getEntityState = (entityId) => {
            return hass.states[entityId] || apiEntities?.[entityId] || null;
        };
        for (const prefix of possiblePrefixes) {
            // Ищем сущности вида select.{prefix}_room_{id}_name
            for (let i = 1; i <= 50; i++) {
                const roomNameEntity = `select.${prefix}_room_${i}_name`;
                const roomIdEntity = `select.${prefix}_room_${i}_id` || `number.${prefix}_room_${i}_id`;
                const nameState = getEntityState(roomNameEntity);
                const idState = getEntityState(roomIdEntity);
                if (nameState && nameState.state) {
                    // Пытаемся получить ID из отдельной сущности или из имени сущности
                    let roomId;
                    if (idState && idState.state) {
                        roomId = parseInt(idState.state, 10);
                    }
                    else {
                        // Извлекаем ID из имени сущности (room_1 -> 1)
                        const match = roomNameEntity.match(/room_(\d+)/);
                        roomId = match ? parseInt(match[1], 10) : i;
                    }
                    if (!isNaN(roomId)) {
                        roomEntities.push({
                            id: roomId,
                            name: nameState.state,
                        });
                    }
                }
            }
            // Если нашли комнаты, прекращаем поиск
            if (roomEntities.length > 0) {
                break;
            }
        }
        // Если нашли комнаты через select-сущности
        if (roomEntities.length > 0) {
            return roomEntities.sort((a, b) => a.id - b.id);
        }
        // Пытаемся получить комнаты из атрибутов пылесоса
        const state = hass.states[entity];
        if (state?.attributes) {
            const segments = state.attributes.segments || state.attributes.room_list || [];
            if (Array.isArray(segments) && segments.length > 0) {
                return segments.map((room) => ({
                    id: typeof room === "number" ? room : room.id || room.segment_id,
                    name: typeof room === "object" && room.name
                        ? room.name
                        : `Комната ${typeof room === "number" ? room : room.id || room.segment_id}`,
                }));
            }
        }
        // Если не нашли, используем стандартные комнаты
        return getDefaultRooms(getTranslation);
    }
    catch (error) {
        console.error("Ошибка загрузки комнат:", error);
        // Используем стандартные комнаты
        return getDefaultRooms(getTranslation);
    }
}
/**
 * Возвращает стандартные комнаты по умолчанию
 */
function getDefaultRooms(getTranslation) {
    const roomNames = getTranslation("room_names").split(",");
    return [
        { id: 16, name: roomNames[0] || "Living Room" },
        { id: 17, name: roomNames[1] || "Bedroom" },
        { id: 18, name: roomNames[2] || "Kitchen" },
        { id: 19, name: roomNames[3] || "Bathroom" },
    ];
}

class VacuumService {
    constructor(hass, entity) {
        this.hass = hass;
        this.entity = entity;
    }
    async start(rooms) {
        if (rooms && rooms.length > 0) {
            await this.hass.callService("dreame_vacuum", "vacuum_clean_segment", {
                entity_id: this.entity,
                segments: rooms,
            });
        }
        else {
            await this.hass.callService("vacuum", "start", {
                entity_id: this.entity,
            });
        }
    }
    async stop() {
        await this.hass.callService("vacuum", "stop", {
            entity_id: this.entity,
        });
    }
    async pause() {
        await this.hass.callService("vacuum", "pause", {
            entity_id: this.entity,
        });
    }
    async returnToBase() {
        await this.hass.callService("vacuum", "return_to_base", {
            entity_id: this.entity,
        });
    }
    getState() {
        const state = this.hass.states[this.entity];
        return state?.state || "unknown";
    }
    isButtonDisabled(buttonType, vacuumState) {
        switch (buttonType) {
            case "start":
                return vacuumState === "cleaning" || vacuumState === "returning";
            case "stop":
                return vacuumState === "idle" || vacuumState === "docked" ||
                    vacuumState === "returning" || vacuumState === "unknown";
            case "pause":
                return vacuumState !== "cleaning";
            case "return":
                return vacuumState === "docked" || vacuumState === "returning";
            default:
                return false;
        }
    }
    getStateLabel(state) {
        const labels = {
            "cleaning": "Уборка",
            "docked": "На базе",
            "idle": "Ожидание",
            "paused": "На паузе",
            "returning": "Возврат на базу",
            "error": "Ошибка",
            "unknown": "Неизвестно"
        };
        return labels[state] || state;
    }
}

let ControlPanel = class ControlPanel extends s {
    constructor() {
        super(...arguments);
        this.rooms = [];
        this.selectedRooms = [];
        this.showRoomIds = false;
        this.roomIcons = {};
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.hass && this.entity) {
            this._vacuumService = new VacuumService(this.hass, this.entity);
        }
    }
    updated(changedProperties) {
        if (changedProperties.has("hass") || changedProperties.has("entity")) {
            if (this.hass && this.entity) {
                this._vacuumService = new VacuumService(this.hass, this.entity);
            }
        }
    }
    _t(key) {
        return translate(key, this.hass);
    }
    _getVacuumState() {
        return this._vacuumService?.getState() || "unknown";
    }
    _isButtonDisabled(buttonType) {
        if (!this._vacuumService)
            return true;
        const state = this._getVacuumState();
        return this._vacuumService.isButtonDisabled(buttonType, state);
    }
    _getStateLabel() {
        if (!this._vacuumService)
            return "Неизвестно";
        const state = this._getVacuumState();
        return this._vacuumService.getStateLabel(state);
    }
    _getRoomIcon(roomId) {
        if (roomId === 0) {
            return "🏠";
        }
        return this.roomIcons[roomId] || "🏠";
    }
    async _handleStart() {
        if (!this._vacuumService)
            return;
        try {
            await this._vacuumService.start(this.selectedRooms.length > 0 ? this.selectedRooms : undefined);
            this.dispatchEvent(new CustomEvent("vacuum-started"));
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка запуска уборки:", error);
            this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_starting") || "Ошибка запуска"}: ${error}` } }));
        }
    }
    async _handleStop() {
        if (!this._vacuumService)
            return;
        try {
            await this._vacuumService.stop();
            this.dispatchEvent(new CustomEvent("vacuum-stopped"));
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка остановки уборки:", error);
            this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_stopping") || "Ошибка остановки"}: ${error}` } }));
        }
    }
    async _handlePause() {
        if (!this._vacuumService)
            return;
        try {
            await this._vacuumService.pause();
            this.dispatchEvent(new CustomEvent("vacuum-paused"));
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка паузы уборки:", error);
            this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_pausing") || "Ошибка паузы"}: ${error}` } }));
        }
    }
    async _handleReturnToBase() {
        if (!this._vacuumService)
            return;
        try {
            await this._vacuumService.returnToBase();
            this.dispatchEvent(new CustomEvent("vacuum-returned"));
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:", error);
            this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_returning") || "Ошибка возврата"}: ${error}` } }));
        }
    }
    _toggleRoom(roomId) {
        const index = this.selectedRooms.indexOf(roomId);
        if (index > -1) {
            this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: false } }));
        }
        else {
            this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: true } }));
        }
    }
    _toggleAllRooms() {
        this.dispatchEvent(new CustomEvent("all-rooms-toggled"));
    }
    render() {
        this._getVacuumState();
        const isStartDisabled = this._isButtonDisabled("start");
        const isStopDisabled = this._isButtonDisabled("stop");
        const isPauseDisabled = this._isButtonDisabled("pause");
        const isReturnDisabled = this._isButtonDisabled("return");
        return x `
      <div class="control-panel">
        <div class="control-panel-status">
          Статус: <strong>${this._getStateLabel()}</strong>
        </div>
        <div class="control-row">
          ${!isStartDisabled ? x `
            <ha-button 
              class="control-button"
              @click=${this._handleStart}
              title="${this._t("start") || "Запуск"}"
            >
              ▶️ ${this._t("start") || "Запуск"}
            </ha-button>
          ` : ""}
          ${!isStopDisabled ? x `
            <ha-button 
              class="control-button"
              @click=${this._handleStop}
              title="${this._t("stop") || "Остановка"}"
            >
              ⏹️ ${this._t("stop") || "Остановка"}
            </ha-button>
          ` : ""}
          ${!isPauseDisabled ? x `
            <ha-button 
              class="control-button"
              @click=${this._handlePause}
              title="${this._t("pause") || "Пауза"}"
            >
              ⏸️ ${this._t("pause") || "Пауза"}
            </ha-button>
          ` : ""}
          ${!isReturnDisabled ? x `
            <ha-button 
              class="control-button"
              @click=${this._handleReturnToBase}
              title="${this._t("return_to_base") || "На станцию"}"
            >
              🏠 ${this._t("return_to_base") || "На станцию"}
            </ha-button>
          ` : ""}
        </div>
        <div class="control-row rooms-row">
          ${this.rooms.length > 0 ? x `
            <ha-button 
              class="room-button ${this.selectedRooms.length === 0 ? "pressed" : ""}"
              @click=${this._toggleAllRooms}
              title="${this._t("all_rooms")}"
            >
              <span class="button-content">
                <span class="button-icon">${this._getRoomIcon(0)}</span>
                <span class="button-label">${this._t("all_rooms")}</span>
              </span>
            </ha-button>
            ${this.rooms.map((room) => x `
              <ha-button 
                class="room-button ${this.selectedRooms.includes(room.id) ? "pressed" : ""}"
                @click=${() => this._toggleRoom(room.id)}
                title="${room.name}${this.showRoomIds ? ` (ID: ${room.id})` : ""}"
              >
                <span class="button-content">
                  <span class="button-icon">${this._getRoomIcon(room.id)}</span>
                  <span class="button-label">${room.name}</span>
                  ${this.showRoomIds ? x `<span class="button-id">${room.id}</span>` : ""}
                </span>
              </ha-button>
            `)}
          ` : x `<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `;
    }
    static get styles() {
        return i$2 `
      .control-panel {
        margin-bottom: 16px;
        padding: 0;
      }
      .control-panel-status {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 12px;
        text-align: center;
        line-height: 1.4;
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
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-button-container-shape: var(--ha-card-border-radius, 4px);
        --mdc-button-outline-width: 1px;
        --mdc-button-outline-color: var(--divider-color, var(--ha-card-border-color));
        --mdc-ripple-color: transparent;
        position: relative;
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        border: 1px solid var(--divider-color, var(--ha-card-border-color)) !important;
        border-radius: var(--ha-card-border-radius, 4px) !important;
        background: var(--card-background-color, var(--ha-card-background)) !important;
        box-shadow: none !important;
        padding: 16px 12px !important;
        margin: 4px;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .room-button::part(button),
      .room-button::part(native-button) {
        background: var(--card-background-color, var(--ha-card-background)) !important;
        border: 1px solid var(--divider-color, var(--ha-card-border-color)) !important;
        box-shadow: none !important;
        border-radius: var(--ha-card-border-radius, 4px) !important;
      }
      .room-button .button-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 0;
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
        --mdc-theme-primary: var(--primary-color, var(--mdc-theme-primary));
        --mdc-button-outline-color: var(--primary-color, var(--mdc-theme-primary));
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        box-shadow: none !important;
      }
      .room-button.pressed::part(button),
      .room-button.pressed::part(native-button) {
        background: var(--primary-color, var(--mdc-theme-primary)) !important;
        border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
        box-shadow: none !important;
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
        background: var(--divider-color, var(--ha-card-border-color)) !important;
        opacity: 0.6;
      }
      .room-button:active:not(.pressed)::part(button),
      .room-button:active:not(.pressed)::part(native-button) {
        background: var(--divider-color, var(--ha-card-border-color)) !important;
        opacity: 0.6;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-button:hover:not(.pressed) {
          border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
          background: var(--divider-color, var(--ha-card-border-color)) !important;
          opacity: 0.8;
        }
        .room-button:hover:not(.pressed)::part(button),
        .room-button:hover:not(.pressed)::part(native-button) {
          border-color: var(--primary-color, var(--mdc-theme-primary)) !important;
          background: var(--divider-color, var(--ha-card-border-color)) !important;
          opacity: 0.8;
        }
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
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], ControlPanel.prototype, "hass", void 0);
__decorate([
    n$1()
], ControlPanel.prototype, "entity", void 0);
__decorate([
    n$1({ attribute: false })
], ControlPanel.prototype, "rooms", void 0);
__decorate([
    n$1({ attribute: false })
], ControlPanel.prototype, "selectedRooms", void 0);
__decorate([
    n$1()
], ControlPanel.prototype, "showRoomIds", void 0);
__decorate([
    n$1({ attribute: false })
], ControlPanel.prototype, "roomIcons", void 0);
__decorate([
    t()
], ControlPanel.prototype, "_vacuumService", void 0);
ControlPanel = __decorate([
    e$1("vacuum-control-panel")
], ControlPanel);

/**
 * Форматирует список дней недели в строку
 */
function formatDays(days, dayNames, translations) {
    if (days.length === 0)
        return translations.noDays;
    if (days.length === 7)
        return translations.everyDay;
    return days.map((d) => dayNames[d]).join(", ");
}
/**
 * Форматирует список комнат в строку
 */
function formatRooms(roomIds, rooms, allRoomsText) {
    if (roomIds.length === 0)
        return allRoomsText;
    const roomNames = roomIds
        .map((id) => {
        const room = rooms.find((r) => r.id === id);
        return room ? room.name : `ID:${id}`;
    })
        .join(", ");
    return roomNames || "Комнаты не выбраны";
}

let ScheduleList = class ScheduleList extends s {
    constructor() {
        super(...arguments);
        this.schedules = [];
        this.rooms = [];
    }
    _t(key) {
        return translate(key, this.hass);
    }
    _formatDays(days) {
        const dayNames = getDayNames(this.hass);
        return formatDays(days, dayNames, {
            noDays: this._t("no_days"),
            everyDay: this._t("every_day"),
        });
    }
    _formatRooms(roomIds) {
        return formatRooms(roomIds, this.rooms, this._t("all_rooms"));
    }
    _handleEdit(schedule) {
        this.dispatchEvent(new CustomEvent("schedule-edit", { detail: { schedule } }));
    }
    _handleDelete(schedule) {
        this.dispatchEvent(new CustomEvent("schedule-delete", { detail: { schedule } }));
    }
    async _handleToggle(schedule, enabled) {
        this.dispatchEvent(new CustomEvent("schedule-toggle", { detail: { schedule, enabled } }));
    }
    render() {
        if (this.schedules.length === 0) {
            return x `<div class="content">${this._t("no_schedules")}</div>`;
        }
        return x `
      <div class="schedules-list">
        ${this.schedules.map((schedule) => x `
            <div class="schedule-item" @click=${() => this._handleEdit(schedule)}>
              <div class="schedule-info">
                <div class="schedule-time">
                  ${schedule.enabled ? "✅" : "⏸️"} ${schedule.time}
                </div>
                <div class="schedule-days">
                  ${this._formatDays(schedule.days)}
                  ${schedule.rooms.length > 0
            ? ` • ${this._formatRooms(schedule.rooms)}`
            : ` • ${this._t("all_rooms")}`}
                </div>
              </div>
              <div class="schedule-actions" @click=${(e) => e.stopPropagation()}>
                <ha-switch
                  class="toggle-switch"
                  .checked=${schedule.enabled}
                  @change=${(e) => this._handleToggle(schedule, e.target.checked)}
                ></ha-switch>
                <button
                  class="action-button"
                  @click=${() => this._handleDelete(schedule)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
          `)}
      </div>
    `;
    }
    static get styles() {
        return i$2 `
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
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], ScheduleList.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], ScheduleList.prototype, "schedules", void 0);
__decorate([
    n$1({ attribute: false })
], ScheduleList.prototype, "rooms", void 0);
ScheduleList = __decorate([
    e$1("vacuum-schedule-list")
], ScheduleList);

let ScheduleDialog = class ScheduleDialog extends s {
    constructor() {
        super(...arguments);
        this.open = false;
        this.rooms = [];
        this._newSchedule = {
            enabled: true,
            days: [],
            time: "09:00",
            rooms: [],
        };
    }
    updated(changedProperties) {
        if (changedProperties.has("schedule") || changedProperties.has("open")) {
            if (this.open && this.schedule) {
                this._newSchedule = {
                    enabled: this.schedule.enabled,
                    days: [...this.schedule.days],
                    time: this.schedule.time,
                    rooms: [...this.schedule.rooms],
                    name: this.schedule.name,
                };
            }
            else if (this.open && !this.schedule) {
                this._newSchedule = {
                    enabled: true,
                    days: [],
                    time: "09:00",
                    rooms: [],
                };
            }
        }
    }
    _t(key) {
        return translate(key, this.hass);
    }
    _getDayNames() {
        return getDayNames(this.hass);
    }
    _toggleDay(day) {
        if (!this._newSchedule.days) {
            this._newSchedule.days = [];
        }
        const index = this._newSchedule.days.indexOf(day);
        if (index > -1) {
            this._newSchedule.days.splice(index, 1);
        }
        else {
            this._newSchedule.days.push(day);
        }
        this.requestUpdate();
    }
    _isDaySelected(day) {
        return this._newSchedule.days?.includes(day) || false;
    }
    _handleClose() {
        this.dispatchEvent(new CustomEvent("dialog-close"));
    }
    _handleSave() {
        if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
            this.dispatchEvent(new CustomEvent("error", { detail: { message: this._t("error_no_days") } }));
            return;
        }
        if (!this._newSchedule.time) {
            this.dispatchEvent(new CustomEvent("error", { detail: { message: this._t("error_no_time") } }));
            return;
        }
        const schedule = {
            id: this.schedule?.id || `schedule_${Date.now()}`,
            enabled: this._newSchedule.enabled ?? true,
            days: this._newSchedule.days,
            time: this._newSchedule.time,
            rooms: this._newSchedule.rooms || [],
            name: this._newSchedule.name,
        };
        this.dispatchEvent(new CustomEvent("schedule-save", { detail: { schedule, oldSchedule: this.schedule } }));
    }
    _handleTimeChange(e) {
        this._newSchedule.time = e.target.value;
    }
    _handleToggleAllRooms(e) {
        const checked = e.target.checked;
        if (checked) {
            this._newSchedule.rooms = this.rooms.map(r => r.id);
        }
        else {
            this._newSchedule.rooms = [];
        }
        this.requestUpdate();
    }
    _handleToggleRoom(roomId, e) {
        if (!this._newSchedule.rooms) {
            this._newSchedule.rooms = [];
        }
        const checked = e.target.checked;
        if (checked) {
            if (!this._newSchedule.rooms.includes(roomId)) {
                this._newSchedule.rooms.push(roomId);
            }
        }
        else {
            const index = this._newSchedule.rooms.indexOf(roomId);
            if (index > -1) {
                this._newSchedule.rooms.splice(index, 1);
            }
        }
        this.requestUpdate();
    }
    _handleEnabledChange(e) {
        this._newSchedule.enabled = e.target.checked;
    }
    render() {
        if (!this.open) {
            return x ``;
        }
        return x `
      <div class="dialog" @click=${(e) => {
            const target = e.target;
            if (target.classList.contains("dialog")) {
                this._handleClose();
            }
        }}>
        <div class="dialog-content">
          <div class="dialog-header">
            ${this.schedule ? this._t("edit_schedule") : this._t("add_schedule_title")}
          </div>

          ${this.error ? x `<div class="error">${this.error}</div>` : ""}

          <div class="form-group">
            <label class="form-label">${this._t("days_label")}</label>
            <div class="days-selector">
              ${this._getDayNames().map((dayName, index) => x `
                <button
                  class="day-button ${this._isDaySelected(index) ? "selected" : ""}"
                  @click=${() => this._toggleDay(index)}
                >
                  ${dayName}
                </button>
              `)}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("time_label")}</label>
            <input
              type="time"
              class="time-input"
              .value=${this._newSchedule.time || "09:00"}
              @input=${this._handleTimeChange}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("rooms_label")} (${this.rooms.length} ${this._t("rooms_available")})</label>
            <div class="rooms-selector">
              ${this.rooms.length > 0 ? x `
                <div class="select-all-rooms">
                  <label>
                    <input
                      type="checkbox"
                      class="room-checkbox"
                      .checked=${this._newSchedule.rooms?.length === this.rooms.length}
                      @change=${this._handleToggleAllRooms}
                    />
                    ${this._t("select_all")}
                  </label>
                </div>
                ${this.rooms.map((room) => x `
                  <div class="room-item">
                    <input
                      type="checkbox"
                      class="room-checkbox"
                      .checked=${this._newSchedule.rooms?.includes(room.id) || false}
                      @change=${(e) => this._handleToggleRoom(room.id, e)}
                    />
                    <span>${room.name} (ID: ${room.id})</span>
                  </div>
                `)}
              ` : x `<div class="content">${this._t("rooms_not_found")}</div>`}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <input
                type="checkbox"
                .checked=${this._newSchedule.enabled ?? true}
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
    `;
    }
    static get styles() {
        return i$2 `
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
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .day-button:hover {
          border-color: var(--primary-color, var(--mdc-theme-primary));
        }
      }
      .day-button:active {
        border-color: var(--primary-color, var(--mdc-theme-primary));
        opacity: 0.8;
      }
      .day-button.selected {
        background: var(--primary-color, var(--mdc-theme-primary));
        color: var(--text-primary-color, var(--mdc-theme-on-primary));
        border-color: var(--primary-color, var(--mdc-theme-primary));
      }
      .time-input {
        width: 100%;
        padding: 16px;
        min-height: 56px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        font-size: 18px;
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .rooms-selector {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
        padding: 8px;
        border: 1px solid var(--divider-color, var(--ha-card-border-color));
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--card-background-color, var(--ha-card-background));
      }
      .room-item {
        display: flex;
        align-items: center;
        padding: 16px;
        min-height: 56px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      @media (hover: hover) and (pointer: fine) {
        .room-item:hover {
          background: var(--divider-color, var(--ha-card-border-color));
          opacity: 0.8;
        }
      }
      .room-item:active {
        background: var(--divider-color, var(--ha-card-border-color));
        opacity: 0.6;
      }
      .room-checkbox {
        margin-right: 8px;
      }
      .select-all-rooms {
        margin-bottom: 12px;
        padding: 12px;
        border-bottom: 1px solid var(--divider-color, var(--ha-card-border-color));
        font-size: 14px;
      }
      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .dialog-actions ha-button {
        min-height: 56px;
        padding: 16px 24px;
        font-size: 16px;
        -webkit-tap-highlight-color: var(--divider-color, var(--ha-card-border-color));
        touch-action: manipulation;
      }
      .button-secondary {
        --mdc-theme-primary: var(--secondary-text-color);
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
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], ScheduleDialog.prototype, "hass", void 0);
__decorate([
    n$1({ type: Boolean })
], ScheduleDialog.prototype, "open", void 0);
__decorate([
    n$1({ attribute: false })
], ScheduleDialog.prototype, "schedule", void 0);
__decorate([
    n$1({ attribute: false })
], ScheduleDialog.prototype, "rooms", void 0);
__decorate([
    n$1()
], ScheduleDialog.prototype, "error", void 0);
__decorate([
    t()
], ScheduleDialog.prototype, "_newSchedule", void 0);
ScheduleDialog = __decorate([
    e$1("vacuum-schedule-dialog")
], ScheduleDialog);

let VacuumScheduleCard = class VacuumScheduleCard extends s {
    constructor() {
        super(...arguments);
        this._schedules = [];
        this._loading = false;
        this._showAddDialog = false;
        this._rooms = [];
        this._selectedRoomsForControl = [];
    }
    setConfig(config) {
        if (!config.entity) {
            throw new Error("Entity must be specified");
        }
        this._config = config;
        this.entity = config.entity;
        if (this.hass) {
            this._scheduleService = new ScheduleService(this.hass, this.entity, (key) => this._t(key));
            this._loadSchedules();
            this._loadRooms();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.hass && this.entity) {
            this._scheduleService = new ScheduleService(this.hass, this.entity, (key) => this._t(key));
            this._loadSchedules();
            this._loadRooms();
            this._subscribeToAutomationChanges();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribeAutomations && typeof this._unsubscribeAutomations === "function") {
            try {
                this._unsubscribeAutomations();
            }
            catch (error) {
                console.warn("Ошибка при отписке от изменений автоматизаций:", error);
            }
            this._unsubscribeAutomations = undefined;
        }
    }
    _subscribeToAutomationChanges() {
        if (!this.hass?.connection)
            return;
        if (this._unsubscribeAutomations) {
            try {
                this._unsubscribeAutomations();
            }
            catch (e) {
                // Игнорируем ошибки при отписке
            }
            this._unsubscribeAutomations = undefined;
        }
        try {
            if (this.hass.connection && typeof this.hass.connection.subscribeEvents === "function") {
                try {
                    const unsubscribe = this.hass.connection.subscribeEvents((event) => {
                        const entityId = event.event?.data?.entity_id;
                        if (entityId && entityId.startsWith("automation.vacuum_schedule_")) {
                            this._loadSchedules();
                        }
                    }, "state_changed");
                    if (typeof unsubscribe === "function") {
                        this._unsubscribeAutomations = unsubscribe;
                    }
                    else {
                        this._unsubscribeAutomations = () => {
                            // Отписка происходит автоматически при переподключении
                        };
                    }
                }
                catch (error) {
                    console.warn("Не удалось подписаться на события:", error);
                }
            }
        }
        catch (error) {
            console.warn("Не удалось подписаться на изменения автоматизаций:", error);
        }
    }
    async _loadRooms() {
        if (!this.hass || !this.entity)
            return;
        this._rooms = await loadRooms(this.hass, this.entity, (key) => this._t(key));
        this.requestUpdate();
    }
    async _loadSchedules() {
        if (!this.hass || !this._scheduleService)
            return;
        this._loading = true;
        this._error = undefined;
        try {
            this._schedules = await this._scheduleService.loadSchedules();
        }
        catch (error) {
            this._error = `${this._t("error_loading")} ${error}`;
            console.error(this._error);
        }
        finally {
            this._loading = false;
            this.requestUpdate();
        }
    }
    _t(key) {
        return translate(key, this.hass);
    }
    _handleRoomToggled(e) {
        const { roomId, selected } = e.detail;
        if (selected) {
            this._selectedRoomsForControl = [...this._selectedRoomsForControl, roomId];
        }
        else {
            this._selectedRoomsForControl = this._selectedRoomsForControl.filter(id => id !== roomId);
        }
        this.requestUpdate();
    }
    _handleAllRoomsToggled() {
        if (this._selectedRoomsForControl.length === 0) {
            this._selectedRoomsForControl = this._rooms.map(r => r.id);
        }
        else {
            this._selectedRoomsForControl = [];
        }
        this.requestUpdate();
    }
    _handleScheduleEdit(e) {
        this._editingSchedule = e.detail.schedule;
        this._showAddDialog = true;
        this._error = undefined;
        this.requestUpdate();
    }
    _handleScheduleDelete(e) {
        const schedule = e.detail.schedule;
        if (!confirm(this._t("delete_confirm"))) {
            return;
        }
        this._deleteSchedule(schedule);
    }
    async _deleteSchedule(schedule) {
        if (!this._scheduleService)
            return;
        this._schedules = this._schedules.filter(s => s.id !== schedule.id);
        this.requestUpdate();
        try {
            await this._scheduleService.deleteSchedule(schedule);
            await this._loadSchedules();
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка удаления расписания:", error);
            this._error = `${this._t("error_deleting") || "Ошибка удаления"}: ${error}`;
            this.requestUpdate();
        }
    }
    async _handleScheduleToggle(e) {
        const { schedule, enabled } = e.detail;
        if (!this._scheduleService)
            return;
        const updatedSchedule = { ...schedule, enabled };
        this._schedules = this._schedules.map(s => s.id === schedule.id ? updatedSchedule : s);
        this.requestUpdate();
        try {
            await this._scheduleService.toggleSchedule(schedule, enabled);
            await this._loadSchedules();
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка переключения расписания:", error);
            this._error = `${this._t("error_toggling") || "Ошибка переключения"}: ${error}`;
            this.requestUpdate();
        }
    }
    _handleScheduleSave(e) {
        const { schedule, oldSchedule } = e.detail;
        if (!this._scheduleService)
            return;
        let schedules = [...this._schedules];
        if (oldSchedule) {
            const index = schedules.findIndex(s => s.id === oldSchedule.id);
            if (index > -1) {
                schedules[index] = schedule;
            }
        }
        else {
            schedules.push(schedule);
        }
        this._schedules = schedules;
        this._showAddDialog = false;
        this._editingSchedule = undefined;
        this._error = undefined;
        this.requestUpdate();
        this._scheduleService.saveSchedule(schedule, oldSchedule)
            .then(() => this._loadSchedules())
            .catch((error) => {
            console.error("[Vacuum Schedule Card] Ошибка сохранения расписания:", error);
            this._error = `${this._t("error_saving")} ${error}`;
            this.requestUpdate();
        });
    }
    _handleDialogClose() {
        this._showAddDialog = false;
        this._editingSchedule = undefined;
        this._error = undefined;
        this.requestUpdate();
    }
    _handleError(e) {
        this._error = e.detail.message;
        this.requestUpdate();
    }
    _handleAddSchedule() {
        this._editingSchedule = undefined;
        this._showAddDialog = true;
        this._error = undefined;
        this.requestUpdate();
    }
    render() {
        if (!this.hass || !this.entity) {
            return x `<ha-card>
        <div class="content">${this._t("error_no_entity")}</div>
      </ha-card>`;
        }
        const state = this.hass.states[this.entity];
        if (!state) {
            return x `<ha-card>
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </ha-card>`;
        }
        return x `
      <ha-card>
        <vacuum-control-panel
          .hass=${this.hass}
          .entity=${this.entity}
          .rooms=${this._rooms}
          .selectedRooms=${this._selectedRoomsForControl}
          .showRoomIds=${this._config?.show_room_ids || false}
          .roomIcons=${this._config?.room_icons || {}}
          @room-toggled=${this._handleRoomToggled}
          @all-rooms-toggled=${this._handleAllRoomsToggled}
          @error=${this._handleError}
        ></vacuum-control-panel>
        
        <div class="header">
          <span>${this._t("schedule_title")}</span>
          <span>${this._schedules.length} ${this._t("schedules_count")}</span>
        </div>
          
        ${this._error && !this._showAddDialog ? x `<div class="error">${this._error}</div>` : ""}
          
        ${this._loading
            ? x `<div class="loading">${this._t("loading")}</div>`
            : x `
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
        .error=${this._error}
        @schedule-save=${this._handleScheduleSave}
        @dialog-close=${this._handleDialogClose}
        @error=${this._handleError}
      ></vacuum-schedule-dialog>
    `;
    }
    getCardSize() {
        return 3;
    }
    getGridOptions() {
        return {
            rows: 3,
            columns: 6,
            min_rows: 2,
            max_rows: 6,
            min_columns: 3,
            max_columns: 12,
        };
    }
    static getStubConfig() {
        return {
            entity: "vacuum.example",
            type: "custom:vacuum-schedule-card",
            show_room_ids: false,
            room_icons: {},
        };
    }
    static getConfigForm() {
        return {
            schema: [
                {
                    name: "entity",
                    required: true,
                    selector: {
                        entity: {
                            domain: "vacuum",
                        },
                    },
                },
            ],
            computeLabel: (schema) => {
                if (schema.name === "entity") {
                    return "Vacuum Entity";
                }
                return undefined;
            },
            computeHelper: (schema) => {
                if (schema.name === "entity") {
                    return "Select the vacuum entity to manage schedules for";
                }
                return undefined;
            },
        };
    }
    static get styles() {
        return i$2 `
      :host {
        display: block;
      }
      ha-card {
        padding: 16px;
        overflow: hidden;
        position: relative;
      }
      .header {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
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
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], VacuumScheduleCard.prototype, "hass", void 0);
__decorate([
    n$1()
], VacuumScheduleCard.prototype, "entity", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_schedules", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_loading", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_error", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_showAddDialog", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_editingSchedule", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_rooms", void 0);
__decorate([
    t()
], VacuumScheduleCard.prototype, "_selectedRoomsForControl", void 0);
VacuumScheduleCard = __decorate([
    e$1("vacuum-schedule-card")
], VacuumScheduleCard);
if (!customElements.get("vacuum-schedule-card")) {
    customElements.define("vacuum-schedule-card", VacuumScheduleCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
    preview: true,
    type: "vacuum-schedule-card",
    name: "Vacuum Schedule Card",
    description: "Карточка для создания расписания уборки пылесоса",
});

export { VacuumScheduleCard };
//# sourceMappingURL=vacuum-schedule-card.js.map
