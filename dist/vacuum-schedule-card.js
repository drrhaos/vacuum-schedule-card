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
const t$3=window,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$5=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$3),i$3=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$3)},S$1=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$5=window,r$1=e$5.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$5.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:true,type:String,converter:n$4,reflect:false,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return  false;this[d$1]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=true,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:u$1}),(null!==(s$2=e$5.reactiveElementVersions)&&void 0!==s$2?s$2:e$5.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$2=window,s$1=i$2.trustedTypes,e$4=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$3,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$4?e$4.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$2.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$2.litHtmlVersions)&&void 0!==t$2?t$2:i$2.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$1;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}}s.finalized=true,s._$litElement$=true,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$2=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e$2(n,t,o):i$1(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n$1({...t,state:true})}

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
 * Константы для Vacuum Schedule Card
 */
const CARD_NAME = "vacuum-schedule-card";
const CARD_TITLE = "Vacuum Schedule Card";
const CARD_DESCRIPTION = "Карточка для создания расписания уборки пылесоса";
/**
 * Префиксы для автоматизаций расписания
 */
const AUTOMATION_PREFIX = "vacuum_schedule_";
/**
 * Статусы задачи, при которых кнопки выбора комнат активны
 */
const ACTIVE_BUTTON_TASK_STATUSES = [
    // Английские статусы
    "unknown",
    "completed",
    // Русские статусы (переведенные Home Assistant)
    "неизвестно",
    "завершено",
    // Пустые значения
    "",
    "null",
    "undefined",
    "none",
];
/**
 * Дефолтные значения
 */
const DEFAULT_TITLE = "Пылесос";
const DEFAULT_CARD_SIZE = 3;
/**
 * Grid options для карточки
 */
const GRID_OPTIONS = {
    rows: 3,
    columns: 6,
    min_rows: 2,
    max_rows: 6,
    min_columns: 3,
    max_columns: 12,
};

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
        if (!automationId.includes(AUTOMATION_PREFIX)) {
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
    const automationId = `${AUTOMATION_PREFIX}${schedule.id}_day_${day}`;
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

/**
 * Русские переводы для Vacuum Schedule Card
 */
const ru = {
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
    "state_charging": "зарядка",
    "state_cleaning": "уборка",
    "state_paused": "пауза",
    "state_returning": "возврат",
    "state_docked": "на базе",
    "state_idle": "ожидание",
    "state_error": "ошибка",
    "state_standby": "ожидание",
    "state_spot_cleaning": "точечная уборка",
    "state_zone_cleaning": "уборка зоны",
    "state_manual_control": "ручное управление",
    "state_going_home": "возврат на базу",
    "state_cleaning_room": "уборка комнаты",
    "state_completing": "завершение",
    "state_unknown": "неизвестно",
    "state_drying": "сушка",
    "state_drying_mop": "сушка мопов",
    "state_drying_completed": "сушка завершена",
    "state_drying_paused": "сушка приостановлена",
    "state_drying_error": "ошибка сушки",
    "state_fast_drying": "быстрая сушка",
    "state_deep_drying": "глубокая сушка",
    "state_hot_air_drying": "сушка горячим воздухом",
    "state_poloskanie_shvabry": "полоскание швабры",
    "state_avtoochistka": "автоочистка",
    "state_suhaya_i_vlazhnaya_uborka": "сухая и влажная уборка",
    "state_ochistka_i_dobavlenie_vody": "очистка и добавление воды",
    "state_zaryadka_zavershena": "зарядка завершена",
    "state_vozvraschenie_dlya_poloskaniya_shvabry": "возвращение для полоскания швабры",
    "state_stirka_priostanovlena": "стирка приостановлена",
    "state_rinsing_mop": "полоскание швабры",
    "state_auto_cleaning": "автоочистка",
    "state_dry_and_wet_cleaning": "сухая и влажная уборка",
    "state_cleaning_and_adding_water": "очистка и добавление воды",
    "state_charging_completed": "зарядка завершена",
    "state_returning_for_mop_rinsing": "возвращение для полоскания швабры",
    "state_washing_paused": "стирка приостановлена",
    "state_returning_to_base": "возвращение на базу",
};

/**
 * English translations for Vacuum Schedule Card
 */
const en = {
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
    "state_charging": "charging",
    "state_cleaning": "cleaning",
    "state_paused": "paused",
    "state_returning": "returning",
    "state_docked": "docked",
    "state_idle": "idle",
    "state_error": "error",
    "state_standby": "standby",
    "state_spot_cleaning": "spot cleaning",
    "state_zone_cleaning": "zone cleaning",
    "state_manual_control": "manual control",
    "state_going_home": "going home",
    "state_cleaning_room": "cleaning room",
    "state_completing": "completing",
    "state_unknown": "unknown",
    "state_drying": "drying",
    "state_drying_mop": "drying mop",
    "state_drying_completed": "drying completed",
    "state_drying_paused": "drying paused",
    "state_drying_error": "drying error",
    "state_fast_drying": "fast drying",
    "state_deep_drying": "deep drying",
    "state_hot_air_drying": "hot air drying",
    "state_poloskanie_shvabry": "rinsing mop",
    "state_avtoochistka": "auto cleaning",
    "state_suhaya_i_vlazhnaya_uborka": "dry and wet cleaning",
    "state_ochistka_i_dobavlenie_vody": "cleaning and adding water",
    "state_zaryadka_zavershena": "charging completed",
    "state_vozvraschenie_dlya_poloskaniya_shvabry": "returning for mop rinsing",
    "state_stirka_priostanovlena": "washing paused",
    "state_rinsing_mop": "rinsing mop",
    "state_auto_cleaning": "auto cleaning",
    "state_dry_and_wet_cleaning": "dry and wet cleaning",
    "state_cleaning_and_adding_water": "cleaning and adding water",
    "state_charging_completed": "charging completed",
    "state_returning_for_mop_rinsing": "returning for mop rinsing",
    "state_washing_paused": "washing paused",
    "state_returning_to_base": "returning to base",
};

const translations = {
    ru,
    en,
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
                if (!configId || !configId.startsWith(AUTOMATION_PREFIX) || !configId.includes("_day_")) {
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
        const automationId = `${AUTOMATION_PREFIX}${scheduleId}_day_${day}`;
        const success = await deleteAutomation(this.hass, automationId);
        if (!success) {
            console.error(`[Vacuum Schedule Card] Не удалось удалить автоматизацию ${automationId}`);
        }
    }
}

/**
 * Получает иконку из entity Home Assistant
 */
async function getEntityIcon(hass, entityId) {
    try {
        // Сначала проверяем в hass.states
        const state = hass.states[entityId];
        if (state?.attributes?.icon) {
            return state.attributes.icon;
        }
        // Пытаемся получить из entity registry
        try {
            const entityRegistry = await hass.callWS({
                type: "config/entity_registry/get",
                entity_id: entityId,
            });
            if (entityRegistry?.icon) {
                return entityRegistry.icon;
            }
        }
        catch (e) {
            // Игнорируем ошибки получения из registry
        }
        return undefined;
    }
    catch (error) {
        return undefined;
    }
}
/**
 * Загружает комнаты из различных источников
 */
async function loadRooms(hass, entity, getTranslation, roomIcons) {
    try {
        // Получаем все сущности через API как дополнительный источник
        const apiEntities = await getAllEntitiesFromAPI(hass);
        // Извлекаем базовое имя entity (например, из vacuum.xiaomi_m30s получаем xiaomi_m30s)
        const entityName = entity.replace("vacuum.", "");
        // Ищем select-сущности для комнат (например, select.{entity_name}_room_1_name)
        // Паттерн: select.{entity_prefix}_room_{id}_name
        const roomEntities = [];
        // Пробуем разные префиксы
        const possiblePrefixes = [
            entityName,
            entityName.replace(/_/g, ""),
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
                        const room = {
                            id: roomId,
                            name: nameState.state,
                        };
                        const iconFromSelectEntity = await getEntityIcon(hass, roomNameEntity);
                        if (iconFromSelectEntity) {
                            room.icon = iconFromSelectEntity;
                            room.entity_id = roomNameEntity;
                        }
                        // Проверяем, есть ли переопределение иконки в конфигурации (имеет приоритет)
                        if (roomIcons && roomIcons[roomId]) {
                            const iconConfig = roomIcons[roomId];
                            if (typeof iconConfig === "string") {
                                // Прямая иконка (emoji или mdi:icon) - переопределяет иконку из entity
                                room.icon = iconConfig;
                            }
                            else if (iconConfig.entity_id) {
                                // Иконка из указанного entity - переопределяет иконку из select-сущности
                                room.entity_id = iconConfig.entity_id;
                                const icon = await getEntityIcon(hass, iconConfig.entity_id);
                                if (icon) {
                                    room.icon = icon;
                                }
                            }
                        }
                        else if (!room.icon) {
                            // Если иконка не найдена в select-сущности и нет переопределения,
                            // пытаемся найти entity для комнаты по имени
                            const roomNameLower = nameState.state.toLowerCase().replace(/\s+/g, "_");
                            const possibleEntities = [
                                `zone.${roomNameLower}`,
                                `sensor.${roomNameLower}`,
                                `input_select.${roomNameLower}`,
                                `input_text.${roomNameLower}`,
                            ];
                            for (const possibleEntity of possibleEntities) {
                                const icon = await getEntityIcon(hass, possibleEntity);
                                if (icon) {
                                    room.icon = icon;
                                    room.entity_id = possibleEntity;
                                    break;
                                }
                            }
                        }
                        roomEntities.push(room);
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
                const rooms = [];
                for (const room of segments) {
                    const roomId = typeof room === "number" ? room : room.id || room.segment_id;
                    const roomName = typeof room === "object" && room.name
                        ? room.name
                        : `Комната ${roomId}`;
                    const roomData = {
                        id: roomId,
                        name: roomName,
                    };
                    // Проверяем, есть ли переопределение иконки в конфигурации
                    if (roomIcons && roomIcons[roomId]) {
                        const iconConfig = roomIcons[roomId];
                        if (typeof iconConfig === "string") {
                            roomData.icon = iconConfig;
                        }
                        else if (iconConfig.entity_id) {
                            roomData.entity_id = iconConfig.entity_id;
                            const icon = await getEntityIcon(hass, iconConfig.entity_id);
                            if (icon) {
                                roomData.icon = icon;
                            }
                        }
                    }
                    rooms.push(roomData);
                }
                return rooms;
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

/**
 * Подписывается на изменения состояния конкретной сущности
 * @param hass - экземпляр Home Assistant
 * @param entityId - ID сущности для отслеживания
 * @param callback - функция обратного вызова при изменении состояния
 * @returns функция для отписки от событий
 */
function subscribeToStateChanges(hass, entityId, callback) {
    if (!hass?.connection) {
        return null;
    }
    try {
        if (typeof hass.connection.subscribeEvents === "function") {
            const unsubscribe = hass.connection.subscribeEvents((event) => {
                const changedEntityId = event.event?.data?.entity_id;
                if (changedEntityId === entityId) {
                    callback();
                }
            }, "state_changed");
            if (typeof unsubscribe === "function") {
                return {
                    unsubscribe: () => {
                        try {
                            unsubscribe();
                        }
                        catch (error) {
                            // Игнорируем ошибки при отписке
                        }
                    },
                };
            }
        }
    }
    catch (error) {
        console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:", error);
    }
    return null;
}
/**
 * Подписывается на изменения состояния сущностей по паттерну
 * @param hass - экземпляр Home Assistant
 * @param pattern - паттерн для фильтрации entity_id (например, "automation.vacuum_schedule_")
 * @param callback - функция обратного вызова при изменении состояния
 * @returns функция для отписки от событий
 */
function subscribeToStateChangesByPattern(hass, pattern, callback) {
    if (!hass?.connection) {
        return null;
    }
    try {
        if (typeof hass.connection.subscribeEvents === "function") {
            const unsubscribe = hass.connection.subscribeEvents((event) => {
                const entityId = event.event?.data?.entity_id;
                if (entityId && entityId.startsWith(pattern)) {
                    callback();
                }
            }, "state_changed");
            if (typeof unsubscribe === "function") {
                return {
                    unsubscribe: () => {
                        try {
                            unsubscribe();
                        }
                        catch (error) {
                            // Игнорируем ошибки при отписке
                        }
                    },
                };
            }
        }
    }
    catch (error) {
        console.warn("[Vacuum Schedule Card] Ошибка подписки на изменения состояния:", error);
    }
    return null;
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={CHILD:2},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.et=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this.ft=void 0,this.et=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

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
    getAdditionalState() {
        // Извлекаем имя сущности из entity (убираем префикс "vacuum.")
        const entityName = this.entity.replace(/^vacuum\./, "");
        const sensorEntityId = `sensor.${entityName}_state`;
        // Проверяем отдельную сущность sensor.{entity_name}_state
        const sensorState = this.hass.states[sensorEntityId];
        if (sensorState && sensorState.state) {
            const stateValue = String(sensorState.state).trim();
            const normalized = stateValue.toLowerCase().replace(/\s+/g, "");
            // Не показываем пустые значения или сообщения об отсутствии ошибок
            const nonErrorValues = ["noerror", "нетешибок", "none", "нет", "null", "undefined", "unknown", "неизвестно", ""];
            if (stateValue && !nonErrorValues.includes(normalized)) {
                return stateValue;
            }
        }
        // Если не нашли в отдельной сущности, проверяем атрибуты пылесоса
        const state = this.hass.states[this.entity];
        if (!state || !state.attributes) {
            return undefined;
        }
        const attrs = state.attributes;
        // Проверяем различные возможные варианты названия атрибута
        const additionalState = attrs[`${entityName}_state`];
        if (typeof additionalState === "string" && additionalState.trim()) {
            const normalized = additionalState.trim().toLowerCase().replace(/\s+/g, "");
            // Не показываем пустые значения или сообщения об отсутствии ошибок
            const nonErrorValues = ["noerror", "нетешибок", "none", "нет", "null", "undefined", "unknown", "неизвестно", ""];
            if (!nonErrorValues.includes(normalized)) {
                return additionalState.trim();
            }
        }
        return undefined;
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
    /**
     * Получает сообщение об ошибке из атрибутов пылесоса
     * Возвращает undefined, если ошибки нет или нет конкретного сообщения об ошибке
     */
    getError() {
        const state = this.hass.states[this.entity];
        if (!state || !state.attributes) {
            return undefined;
        }
        const attrs = state.attributes;
        // Список значений, которые не являются реальными ошибками
        const nonErrorValues = [
            "error", "ошибка",
            "no error", "нет ошибок", "noerror", "нетешибок",
            "none", "нет", "null", "undefined", ""
        ];
        // Проверяем различные возможные атрибуты ошибки
        // Только если есть конкретное сообщение об ошибке
        if (attrs.error) {
            const errorMsg = typeof attrs.error === "string" ? attrs.error : String(attrs.error);
            const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
            if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
                return errorMsg.trim();
            }
        }
        if (attrs.error_message) {
            const errorMsg = typeof attrs.error_message === "string" ? attrs.error_message : String(attrs.error_message);
            const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
            if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
                return errorMsg.trim();
            }
        }
        if (attrs.status === "error" && attrs.message) {
            const errorMsg = typeof attrs.message === "string" ? attrs.message : String(attrs.message);
            const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
            if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
                return errorMsg.trim();
            }
        }
        // Проверяем также другие возможные атрибуты
        const otherErrorAttrs = ["error_code", "error_code_str", "last_error"];
        for (const attrName of otherErrorAttrs) {
            if (attrs[attrName]) {
                const errorMsg = typeof attrs[attrName] === "string" ? attrs[attrName] : String(attrs[attrName]);
                const normalizedMsg = errorMsg.trim().toLowerCase().replace(/\s+/g, "");
                if (errorMsg && errorMsg.trim() && !nonErrorValues.includes(normalizedMsg)) {
                    return errorMsg.trim();
                }
            }
        }
        // Не показываем общее сообщение "Ошибка" без конкретной информации
        return undefined;
    }
    /**
     * Получает статус задачи из сущности sensor.{entity_name}_task_status
     * Например, для vacuum.pylesos ищет sensor.pylesos_task_status
     * Возвращает значение состояния или undefined, если сущность не найдена
     */
    getTaskStatus() {
        // Извлекаем имя сущности из entity (убираем префикс "vacuum.")
        const entityName = this.entity.replace(/^vacuum\./, "");
        const sensorEntityId = `sensor.${entityName}_task_status`;
        // Проверяем отдельную сущность sensor.{entity_name}_task_status
        const sensorState = this.hass.states[sensorEntityId];
        if (sensorState && sensorState.state !== null && sensorState.state !== undefined) {
            const stateValue = String(sensorState.state).trim();
            // Возвращаем значение состояния, включая "unknown" и "none" для обработки в _isCleaning()
            return stateValue || undefined;
        }
        return undefined;
    }
    /**
     * Получает список ID комнат, которые сейчас убираются
     * Проверяет различные возможные атрибуты пылесоса
     */
    getCurrentCleaningRooms() {
        const state = this.hass.states[this.entity];
        if (!state || !state.attributes) {
            return [];
        }
        const attrs = state.attributes;
        // Проверяем различные возможные атрибуты
        // 1. current_segments (массив ID сегментов)
        if (Array.isArray(attrs.current_segments)) {
            return attrs.current_segments.filter((id) => typeof id === "number");
        }
        // 2. current_segment (одиночный ID)
        if (typeof attrs.current_segment === "number") {
            return [attrs.current_segment];
        }
        // 3. cleaning_segments
        if (Array.isArray(attrs.cleaning_segments)) {
            return attrs.cleaning_segments.filter((id) => typeof id === "number");
        }
        // 4. active_segments
        if (Array.isArray(attrs.active_segments)) {
            return attrs.active_segments.filter((id) => typeof id === "number");
        }
        // 5. segment (старое название)
        if (typeof attrs.segment === "number") {
            return [attrs.segment];
        }
        // 6. segments (массив)
        if (Array.isArray(attrs.segments)) {
            return attrs.segments.filter((id) => typeof id === "number");
        }
        return [];
    }
}

/**
 * Загружает SVG как строку для использования в Lit templates
 */
/**
 * Получает SVG иконку робота-пылесоса
 */
function getVacuumRobotSVG(variant = "default") {
    const svgMap = {
        default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="42" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.25"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2" opacity="0.4"/>
  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="2"/>
  <circle cx="50" cy="28" r="4" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <circle cx="50" cy="28" r="2" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--secondary-text-color, #9e9e9e)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="12" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="88" cy="50" r="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="12" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <circle cx="88" cy="50" r="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <ellipse cx="50" cy="78" rx="3.5" ry="1.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <circle cx="42" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
  <circle cx="58" cy="24" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.5"/>
</svg>`,
        outline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary-text-color)" stroke-width="2.5"/>
  <circle cx="50" cy="28" r="7" fill="none" stroke="var(--primary-text-color)" stroke-width="2"/>
  <circle cx="50" cy="28" r="4" fill="none" stroke="var(--primary-text-color)" stroke-width="1.5" opacity="0.6"/>
  <circle cx="50" cy="28" r="2" fill="var(--primary-text-color)"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--primary-text-color)" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="12" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <circle cx="88" cy="50" r="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--primary-text-color)" opacity="0.7"/>
  <circle cx="42" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>
  <circle cx="58" cy="24" r="2" fill="var(--primary-text-color)" opacity="0.6"/>
</svg>`,
        filled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="38" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.3"/>
  <circle cx="50" cy="28" r="7" fill="var(--card-background-color, var(--ha-card-background, #fff))"/>
  <circle cx="50" cy="28" r="5" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.4"/>
  <circle cx="50" cy="28" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))"/>
  <path d="M 20 50 Q 50 48 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>
  <path d="M 20 50 Q 50 52 80 50" stroke="var(--card-background-color, var(--ha-card-background, #fff))" stroke-width="2" fill="none" opacity="0.4"/>
  <circle cx="12" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <circle cx="88" cy="50" r="4" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <circle cx="12" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>
  <circle cx="88" cy="50" r="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.7"/>
  <ellipse cx="50" cy="78" rx="7" ry="3.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.9"/>
  <ellipse cx="50" cy="78" rx="4" ry="2" fill="var(--secondary-text-color, #9e9e9e)" opacity="0.6"/>
  <circle cx="42" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>
  <circle cx="58" cy="24" r="2.5" fill="var(--text-primary-color, var(--mdc-theme-on-primary, #fff))" opacity="0.8"/>
</svg>`
    };
    return svgMap[variant];
}

let ControlPanel = class ControlPanel extends s {
    constructor() {
        super(...arguments);
        this.rooms = [];
        this.selectedRooms = [];
        this.hiddenRooms = [];
        this.showRoomIds = false;
        this.roomIcons = {};
        this._currentCleaningRooms = [];
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.hass && this.entity) {
            this._vacuumService = new VacuumService(this.hass, this.entity);
            this._updateCleaningRooms();
            this._subscribeToStateChanges();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeFromStateChanges();
    }
    updated(changedProperties) {
        if (changedProperties.has("hass") || changedProperties.has("entity")) {
            if (this.hass && this.entity) {
                this._vacuumService = new VacuumService(this.hass, this.entity);
                this._updateCleaningRooms();
                this._subscribeToStateChanges();
            }
        }
    }
    _updateCleaningRooms() {
        if (this._vacuumService) {
            const newCleaningRooms = this._vacuumService.getCurrentCleaningRooms();
            const wasCleaning = this._isCleaning();
            this._currentCleaningRooms = newCleaningRooms;
            // Если уборка активна, автоматически выбираем текущие убираемые комнаты
            // Если уборка не активна, не меняем выбранные комнаты (управляются пользователем)
            if (this._isCleaning()) {
                // Синхронизируем selectedRooms с текущими убираемыми комнатами
                if (JSON.stringify(this.selectedRooms.sort()) !== JSON.stringify(newCleaningRooms.sort())) {
                    this.selectedRooms = [...newCleaningRooms];
                    // Синхронизация selectedRooms с текущими убираемыми комнатами
                }
            }
            else if (wasCleaning) {
                // Уборка только что завершилась - очищаем выбор, если он был синхронизирован с уборкой
                // Но только если selectedRooms совпадали с предыдущими убираемыми комнатами
                if (this.selectedRooms.length > 0 &&
                    JSON.stringify(this.selectedRooms.sort()) === JSON.stringify(this._currentCleaningRooms.sort())) {
                    this.selectedRooms = [];
                }
            }
            this.requestUpdate();
        }
    }
    _subscribeToStateChanges() {
        this._unsubscribeFromStateChanges();
        // Подписываемся на изменения основного entity пылесоса
        const subscription = subscribeToStateChanges(this.hass, this.entity, () => {
            this._updateCleaningRooms();
            this.requestUpdate();
        });
        if (subscription) {
            this._unsubscribeStateChanges = subscription.unsubscribe;
        }
        // Также подписываемся на изменения sensor.{entity_name}_task_status
        const entityName = this.entity.replace(/^vacuum\./, "");
        const taskStatusEntityId = `sensor.${entityName}_task_status`;
        const taskStatusSubscription = subscribeToStateChanges(this.hass, taskStatusEntityId, () => {
            this.requestUpdate();
        });
        // Сохраняем обе подписки
        if (taskStatusSubscription) {
            const originalUnsubscribe = this._unsubscribeStateChanges;
            this._unsubscribeStateChanges = () => {
                if (originalUnsubscribe)
                    originalUnsubscribe();
                taskStatusSubscription.unsubscribe();
            };
        }
    }
    _unsubscribeFromStateChanges() {
        if (this._unsubscribeStateChanges) {
            this._unsubscribeStateChanges();
            this._unsubscribeStateChanges = undefined;
        }
    }
    _t(key) {
        return translate(key, this.hass);
    }
    _getVacuumState() {
        return this._vacuumService?.getState() || "unknown";
    }
    _isCleaning() {
        if (!this._vacuumService)
            return false;
        // Проверяем статус задачи из sensor.{entity_name}_task_status
        // Блокируем кнопки выбора комнат, если идет активная задача
        const taskStatus = this._vacuumService.getTaskStatus();
        // Если task_status существует (даже если это пустая строка или "unknown")
        if (taskStatus !== undefined) {
            const taskStatusLower = taskStatus.toLowerCase().trim();
            // Список статусов, при которых кнопки активны (можно выбирать комнаты)
            // Основано на переводах из dreame-vacuum интеграции
            // https://github.com/Tasshack/dreame-vacuum/blob/master/custom_components/dreame_vacuum/translations/
            const activeButtonStatuses = [...ACTIVE_BUTTON_TASK_STATUSES];
            // Если статус НЕ в списке активных, значит идет активная задача - блокируем
            // Активные задачи (блокируем кнопки): cleaning, zone_cleaning, room_cleaning, spot_cleaning,
            // fast_mapping, cleaning_paused, room_cleaning_paused, zone_cleaning_paused,
            // spot_cleaning_paused, map_cleaning_paused, docking_paused, mopping_paused,
            // zone_mopping_paused, room_mopping_paused, zone_docking_paused, room_docking_paused,
            // cruising_path, cruising_path_paused, cruising_point, cruising_point_paused,
            // summon_clean_paused, returning_to_install_mop, returning_to_remove_mop и т.д.
            if (!activeButtonStatuses.includes(taskStatusLower)) {
                return true;
            }
            else {
                // Если статус в списке активных (unknown, completed), кнопки активны - не блокируем
                return false;
            }
        }
        // Fallback: если task_status не определен, проверяем основной статус пылесоса и список убираемых комнат
        const state = this._getVacuumState();
        return state === "cleaning" || this._currentCleaningRooms.length > 0;
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
    _getAdditionalState() {
        if (!this._vacuumService)
            return undefined;
        return this._vacuumService.getAdditionalState();
    }
    _getAdditionalStateLabel() {
        const additionalState = this._getAdditionalState();
        if (!additionalState)
            return "";
        // Маппинг статусов (как английских, так и переведенных Home Assistant) на ключи переводов
        // Основано на переводах из dreame-vacuum интеграции
        const statusMap = {
            // Английские оригинальные статусы (из dreame-vacuum)
            "idle": "idle",
            "cleaning": "cleaning",
            "paused": "paused",
            "returning": "returning",
            "returning to dock": "returning",
            "returning to base": "returning",
            "charging": "charging",
            "docked": "docked",
            "error": "error",
            "standby": "standby",
            "spot cleaning": "spot_cleaning",
            "zone cleaning": "zone_cleaning",
            "manual control": "manual_control",
            "going home": "going_home",
            "completing": "completing",
            "drying": "drying",
            "rinsing mop": "rinsing_mop",
            "auto cleaning": "auto_cleaning",
            "dry and wet cleaning": "dry_and_wet_cleaning",
            "cleaning and adding water": "cleaning_and_adding_water",
            "charging completed": "charging_completed",
            "returning for mop rinsing": "returning_for_mop_rinsing",
            "washing paused": "washing_paused",
            // Русские статусы (переведенные Home Assistant из dreame-vacuum)
            "ожидание": "idle",
            "уборка": "cleaning",
            "пауза": "paused",
            "возврат": "returning",
            "возвращение на базу": "returning",
            "зарядка": "charging",
            "на базе": "docked",
            "ошибка": "error",
            "точечная уборка": "spot_cleaning",
            "уборка зоны": "zone_cleaning",
            "ручное управление": "manual_control",
            "завершение": "completing",
            "сушка": "drying",
            "полоскание швабры": "rinsing_mop",
            "автоочистка": "auto_cleaning",
            "сухая и влажная уборка": "dry_and_wet_cleaning",
            "очистка и добавление воды": "cleaning_and_adding_water",
            "зарядка завершена": "charging_completed",
            "возвращение для полоскания швабры": "returning_for_mop_rinsing",
            "стирка приостановлена": "washing_paused",
        };
        const stateLower = additionalState.toLowerCase().trim();
        let translationKey;
        // Проверяем маппинг для известных статусов
        if (statusMap[stateLower]) {
            translationKey = `state_${statusMap[stateLower]}`;
        }
        else {
            // Для неизвестных статусов нормализуем ключ (убираем пробелы, спецсимволы)
            translationKey = `state_${stateLower.replace(/\s+/g, "_").replace(/[^a-zа-я0-9_]/g, "").replace(/[а-я]/g, (char) => {
                // Простая транслитерация для кириллицы
                const translit = {
                    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
                    "ж": "zh", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
                    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
                    "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch",
                    "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
                };
                return translit[char] || "";
            })}`;
        }
        const translated = this._t(translationKey);
        // Если перевод найден и он отличается от ключа, возвращаем перевод
        // Иначе возвращаем оригинальное значение
        return translated && translated !== translationKey ? translated : additionalState;
    }
    _getError() {
        if (!this._vacuumService)
            return undefined;
        return this._vacuumService.getError();
    }
    _renderRoomIcon(room) {
        if (room.id === 0) {
            // Для кнопки "Все комнаты" используем mdi:home
            return x `<ha-icon .icon=${"mdi:home"}></ha-icon>`;
        }
        // 1. Проверяем переопределение в конфигурации
        const configIcon = this.roomIcons[room.id];
        let iconToUse;
        if (configIcon) {
            if (typeof configIcon === "string") {
                iconToUse = configIcon;
            }
            // Если это объект с entity_id, иконка уже должна быть загружена в room.icon
        }
        // 2. Используем иконку из комнаты (загруженную из entity)
        if (!iconToUse && room.icon) {
            iconToUse = room.icon;
        }
        // 3. Дефолтная иконка
        if (!iconToUse) {
            return x `🏠`;
        }
        // Если иконка начинается с "mdi:" или "hass:", используем ha-icon
        if (iconToUse.startsWith("mdi:") || iconToUse.startsWith("hass:") || iconToUse.includes(":")) {
            return x `<ha-icon .icon=${iconToUse}></ha-icon>`;
        }
        // Иначе используем как есть (emoji или текст)
        return x `${iconToUse}`;
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
        }
        catch (error) {
            console.error("[Vacuum Schedule Card] Ошибка возврата на станцию:", error);
            this.dispatchEvent(new CustomEvent("error", { detail: { message: `${this._t("error_returning") || "Ошибка возврата"}: ${error}` } }));
        }
    }
    _toggleRoom(roomId) {
        // Не позволяем изменять состояние во время уборки
        if (this._isCleaning()) {
            return;
        }
        const index = this.selectedRooms.indexOf(roomId);
        if (index > -1) {
            this.selectedRooms.splice(index, 1);
            this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: false } }));
        }
        else {
            this.selectedRooms.push(roomId);
            this.dispatchEvent(new CustomEvent("room-toggled", { detail: { roomId, selected: true } }));
        }
        this.requestUpdate();
    }
    _toggleAllRooms() {
        // Не позволяем изменять состояние во время уборки
        if (this._isCleaning()) {
            return;
        }
        const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
        if (this.selectedRooms.length === 0) {
            this.selectedRooms = visibleRooms.map(r => r.id);
        }
        else {
            this.selectedRooms = [];
        }
        this.dispatchEvent(new CustomEvent("all-rooms-toggled"));
        this.requestUpdate();
    }
    render() {
        const vacuumState = this._getVacuumState();
        const isStartDisabled = this._isButtonDisabled("start");
        const isStopDisabled = this._isButtonDisabled("stop");
        const isPauseDisabled = this._isButtonDisabled("pause");
        const isReturnDisabled = this._isButtonDisabled("return");
        // Фильтруем комнаты, скрывая те, что в hiddenRooms
        const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
        return x `
      <div class="control-panel">
        <div class="control-panel-status">
          <span class="status-icon ${vacuumState === "cleaning" ? "cleaning" : ""}">${o(getVacuumRobotSVG("default"))}</span>
          <div class="status-info">
            <span class="status-text">Статус: <strong>${this._getStateLabel()}${this._getAdditionalState() ? `, ${this._getAdditionalStateLabel()}` : ""}</strong></span>
            ${this._getError() ? x `
              <span class="status-error">${this._getError()}</span>
            ` : ""}
          </div>
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
          ${visibleRooms.length > 0 ? x `
            ${(() => {
            const isCleaning = this._isCleaning();
            const isDisabled = isCleaning;
            // Если уборка активна, кнопка "Все комнаты" не нажата (так как выбраны конкретные комнаты)
            // Если уборка не активна, кнопка нажата когда selectedRooms пуст
            const isPressed = !isCleaning && this.selectedRooms.length === 0;
            return x `
                <ha-card 
                  class="room-button ${isPressed ? "pressed" : ""} ${isDisabled ? "disabled" : ""}"
                  @click=${isDisabled ? undefined : this._toggleAllRooms}
                  title="${this._t("all_rooms")}${isDisabled ? " (идет уборка)" : ""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon({ id: 0, name: this._t("all_rooms") })}</div>
                    <div class="button-label">${this._t("all_rooms")}</div>
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `;
        })()}
            ${visibleRooms.map((room) => {
            const isCleaning = this._isCleaning();
            const isSelected = this.selectedRooms.includes(room.id);
            // Если уборка активна, показываем выбранными только текущие убираемые комнаты
            // Если уборка не активна, показываем выбранными комнаты, выбранные пользователем
            const isPressed = isCleaning
                ? this._currentCleaningRooms.includes(room.id)
                : isSelected;
            const isDisabled = isCleaning;
            return x `
                <ha-card 
                  class="room-button ${isPressed ? "pressed" : ""} ${isDisabled ? "disabled" : ""}"
                  @click=${isDisabled ? undefined : () => this._toggleRoom(room.id)}
                  title="${room.name}${this.showRoomIds ? ` (ID: ${room.id})` : ""}${isCleaning && this._currentCleaningRooms.includes(room.id) ? " (убирается)" : ""}"
                >
                  <div class="button-content">
                    <div class="button-icon">${this._renderRoomIcon(room)}</div>
                    <div class="button-label">${room.name}</div>
                    ${this.showRoomIds ? x `<div class="button-id">ID: ${room.id}</div>` : ""}
                  </div>
                  <ha-ripple></ha-ripple>
                </ha-card>
              `;
        })}
          ` : x `<div class="content" style="width: 100%; text-align: center; padding: 8px;">${this._t("rooms_not_found")}</div>`}
        </div>
      </div>
    `;
    }
    static get styles() {
        return i$3 `
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
    n$1({ attribute: false })
], ControlPanel.prototype, "hiddenRooms", void 0);
__decorate([
    n$1()
], ControlPanel.prototype, "showRoomIds", void 0);
__decorate([
    n$1({ attribute: false })
], ControlPanel.prototype, "roomIcons", void 0);
__decorate([
    t$1()
], ControlPanel.prototype, "_vacuumService", void 0);
__decorate([
    t$1()
], ControlPanel.prototype, "_currentCleaningRooms", void 0);
ControlPanel = __decorate([
    e$3("vacuum-control-panel")
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
        return i$3 `
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
    e$3("vacuum-schedule-list")
], ScheduleList);

let ScheduleDialog = class ScheduleDialog extends s {
    constructor() {
        super(...arguments);
        this.open = false;
        this.rooms = [];
        this.hiddenRooms = [];
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
                // Фильтруем скрытые комнаты из существующего расписания
                const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
                const validRooms = this.schedule.rooms.filter(roomId => visibleRooms.some(room => room.id === roomId));
                this._newSchedule = {
                    enabled: this.schedule.enabled,
                    days: [...this.schedule.days],
                    time: this.schedule.time,
                    rooms: validRooms,
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
    _handleClose() {
        this.dispatchEvent(new CustomEvent("dialog-close"));
    }
    _handleSave() {
        if (!this._newSchedule.time) {
            this.error = this._t("error_time_required") || "Время обязательно";
            return;
        }
        if (!this._newSchedule.days || this._newSchedule.days.length === 0) {
            this.error = this._t("error_days_required") || "Выберите хотя бы один день";
            return;
        }
        this.error = undefined;
        this.dispatchEvent(new CustomEvent("schedule-save", {
            detail: {
                schedule: {
                    id: this.schedule?.id,
                    enabled: this._newSchedule.enabled ?? true,
                    days: this._newSchedule.days || [],
                    time: this._newSchedule.time || "09:00",
                    rooms: this._newSchedule.rooms || [],
                    name: this._newSchedule.name,
                },
            },
        }));
    }
    _handleDayToggle(day) {
        if (!this._newSchedule.days) {
            this._newSchedule.days = [];
        }
        const index = this._newSchedule.days.indexOf(day);
        if (index === -1) {
            this._newSchedule.days.push(day);
        }
        else {
            this._newSchedule.days.splice(index, 1);
        }
        this.requestUpdate();
    }
    _handleTimeChange(e) {
        this._newSchedule.time = e.target.value;
    }
    _handleToggleAllRooms(e) {
        const checked = e.target.checked;
        const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
        if (checked) {
            this._newSchedule.rooms = visibleRooms.map(r => r.id);
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
        const checkbox = e.target;
        if (checkbox.checked) {
            if (!this._newSchedule.rooms.includes(roomId)) {
                this._newSchedule.rooms.push(roomId);
            }
        }
        else {
            const index = this._newSchedule.rooms.indexOf(roomId);
            if (index !== -1) {
                this._newSchedule.rooms.splice(index, 1);
            }
        }
        this.requestUpdate();
    }
    _handleEnabledChange(e) {
        this._newSchedule.enabled = e.target.checked;
    }
    _handleNameChange(e) {
        this._newSchedule.name = e.target.value || undefined;
    }
    render() {
        if (!this.open) {
            return x ``;
        }
        const dayNames = this._getDayNames();
        const visibleRooms = this.rooms.filter(room => !this.hiddenRooms.includes(room.id));
        return x `
      <div class="dialog" @click=${this._handleClose}>
        <div class="dialog-content" @click=${(e) => e.stopPropagation()}>
          <div class="dialog-header">
            ${this.schedule ? this._t("edit_schedule") : this._t("add_schedule")}
          </div>

          ${this.error ? x `<div class="error">${this.error}</div>` : ""}

          <div class="form-group">
            <label class="form-label">${this._t("name_label")}</label>
            <input
              type="text"
              class="form-input"
              .value=${this._newSchedule.name || ""}
              @input=${this._handleNameChange}
              placeholder=${this._t("name_placeholder") || "Название расписания (необязательно)"}
            />
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("days_label")}</label>
            <div class="days-selector">
              ${dayNames.map((name, index) => {
            const day = index === 0 ? 0 : index;
            return x `
                  <button
                    class="day-button ${this._newSchedule.days?.includes(day) ? "selected" : ""}"
                    @click=${() => this._handleDayToggle(day)}
                  >
                    ${name}
                  </button>
                `;
        })}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">${this._t("time_label")}</label>
            <input
              type="time"
              class="form-input"
              .value=${this._newSchedule.time || "09:00"}
              @input=${this._handleTimeChange}
            />
          </div>

          <div class="form-group">
            ${(() => {
            return x `
                <label class="form-label">${this._t("rooms_label")} (${visibleRooms.length} ${this._t("rooms_available")})</label>
                <div class="rooms-selector">
                  ${visibleRooms.length > 0 ? x `
                    <div class="select-all-rooms">
                      <label>
                        <input
                          type="checkbox"
                          class="room-checkbox"
                          .checked=${this._newSchedule.rooms?.length === visibleRooms.length && visibleRooms.length > 0}
                          @change=${this._handleToggleAllRooms}
                        />
                        ${this._t("select_all")}
                      </label>
                    </div>
                    ${visibleRooms.map((room) => x `
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
              `;
        })()}
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
        return i$3 `
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
    n$1({ attribute: false })
], ScheduleDialog.prototype, "hiddenRooms", void 0);
__decorate([
    n$1()
], ScheduleDialog.prototype, "error", void 0);
__decorate([
    t$1()
], ScheduleDialog.prototype, "_newSchedule", void 0);
ScheduleDialog = __decorate([
    e$3("vacuum-schedule-dialog")
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
        if (this._unsubscribeAutomations) {
            this._unsubscribeAutomations();
            this._unsubscribeAutomations = undefined;
        }
    }
    _subscribeToAutomationChanges() {
        if (this._unsubscribeAutomations) {
            this._unsubscribeAutomations();
            this._unsubscribeAutomations = undefined;
        }
        const subscription = subscribeToStateChangesByPattern(this.hass, `automation.${AUTOMATION_PREFIX}`, () => {
            this._loadSchedules();
        });
        if (subscription) {
            this._unsubscribeAutomations = subscription.unsubscribe;
        }
    }
    async _loadRooms() {
        if (!this.hass || !this.entity)
            return;
        this._rooms = await loadRooms(this.hass, this.entity, (key) => this._t(key), this._config?.room_icons);
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
        <div class="header">
          <span>${this._config?.title || DEFAULT_TITLE}</span>
          <span>${this._schedules.length} ${this._t("schedules_count")}</span>
        </div>
        
        <vacuum-control-panel
          .hass=${this.hass}
          .entity=${this.entity}
          .rooms=${this._rooms}
          .selectedRooms=${this._selectedRoomsForControl}
          .hiddenRooms=${this._config?.hidden_rooms || []}
          .showRoomIds=${this._config?.show_room_ids || false}
          .roomIcons=${this._config?.room_icons || {}}
          @room-toggled=${this._handleRoomToggled}
          @all-rooms-toggled=${this._handleAllRoomsToggled}
          @error=${this._handleError}
        ></vacuum-control-panel>
          
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
        .hiddenRooms=${this._config?.hidden_rooms || []}
        .error=${this._error}
        @schedule-save=${this._handleScheduleSave}
        @dialog-close=${this._handleDialogClose}
        @error=${this._handleError}
      ></vacuum-schedule-dialog>
    `;
    }
    getCardSize() {
        return DEFAULT_CARD_SIZE;
    }
    getGridOptions() {
        return GRID_OPTIONS;
    }
    static getStubConfig() {
        return {
            entity: "vacuum.example",
            type: "custom:vacuum-schedule-card",
            title: undefined,
            hidden_rooms: [],
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
                {
                    name: "title",
                    required: false,
                    selector: {
                        text: {},
                    },
                },
            ],
            computeLabel: (schema) => {
                if (schema.name === "entity") {
                    return "Vacuum Entity";
                }
                if (schema.name === "title") {
                    return "Card Title";
                }
                return undefined;
            },
            computeHelper: (schema) => {
                if (schema.name === "entity") {
                    return "Select the vacuum entity to manage schedules for";
                }
                if (schema.name === "title") {
                    return "Custom title for the card (optional). If not specified, default title will be used.";
                }
                return undefined;
            },
        };
    }
    static get styles() {
        return i$3 `
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
    t$1()
], VacuumScheduleCard.prototype, "_schedules", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_loading", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_error", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_showAddDialog", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_editingSchedule", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_rooms", void 0);
__decorate([
    t$1()
], VacuumScheduleCard.prototype, "_selectedRoomsForControl", void 0);
VacuumScheduleCard = __decorate([
    e$3("vacuum-schedule-card")
], VacuumScheduleCard);
if (!customElements.get(CARD_NAME)) {
    customElements.define(CARD_NAME, VacuumScheduleCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
    preview: true,
    type: CARD_NAME,
    name: CARD_TITLE,
    description: CARD_DESCRIPTION,
});

export { VacuumScheduleCard };
//# sourceMappingURL=vacuum-schedule-card.js.map
