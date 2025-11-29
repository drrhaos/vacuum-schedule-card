function t(t,e,o,i){var s,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=window,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const c=window,d=c.trustedTypes,u=d?d.emptyScript:"",h=c.reactiveElementPolyfillSupport,m={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},_=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_},g="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,o)=>{const i=this._$Ep(o,e);void 0!==i&&(this._$Ev.set(i,o),t.push(i))}),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,o,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(i){const s=this[t];this[e]=i,this.requestUpdate(t,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,o;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{o?t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):i.forEach(o=>{const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=o.cssText,t.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(t,e,o=p){var i;const s=this.constructor._$Ep(t,o);if(void 0!==s&&!0===o.reflect){const n=(void 0!==(null===(i=o.converter)||void 0===i?void 0:i.toAttribute)?o.converter:m).toAttribute(e,o.type);this._$El=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var o;const i=this.constructor,s=i._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(o=t.converter)||void 0===o?void 0:o.fromAttribute)?t.converter:m;this._$El=s,this[s]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,o){let i=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,o))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(o)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};var y;v[g]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const f=window,$=f.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,A="?"+w,x=`<${A}>`,E=document,C=()=>E.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,T="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,I=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,N=/"/g,O=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),j=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),M=new WeakMap,W=E.createTreeWalker(E,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const B=(t,e)=>{const o=t.length-1,i=[];let s,n=2===e?"<svg>":"",r=V;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===V?"!--"===l[1]?r=D:void 0!==l[1]?r=I:void 0!==l[2]?(O.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=null!=s?s:V,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?N:U):r===N||r===U?r=R:r===D||r===I?r=V:(r=R,s=void 0);const u=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===V?o+x:c>=0?(i.push(a),o.slice(0,c)+S+o.slice(c)+w+u):o+w+(-2===c?(i.push(void 0),e):u)}return[L(t,n+(t[o]||"<?>")+(2===e?"</svg>":"")),i]};class q{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,c]=B(t,e);if(this.el=q.createElement(l,o),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=W.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(S)||e.startsWith(w)){const o=c[n++];if(t.push(e),void 0!==o){const t=i.getAttribute(o.toLowerCase()+S).split(w),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?X:"@"===e[1]?Y:G})}else a.push({type:6,index:s})}for(const e of t)i.removeAttribute(e)}if(O.test(i.tagName)){const t=i.textContent.split(w),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],C()),W.nextNode(),a.push({type:2,index:++s});i.append(t[e],C())}}}else if(8===i.nodeType)if(i.data===A)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(w,t+1));)a.push({type:7,index:s}),t+=w.length-1}s++}}static createElement(t,e){const o=E.createElement("template");return o.innerHTML=t,o}}function F(t,e,o=t,i){var s,n,r,a;if(e===j)return e;let l=void 0!==i?null===(s=o._$Co)||void 0===s?void 0:s[i]:o._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,o,i)),void 0!==i?(null!==(r=(a=o)._$Co)&&void 0!==r?r:a._$Co=[])[i]=l:o._$Cl=l),void 0!==l&&(e=F(t,l._$AS(t,e.values),l,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:i}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(o,!0);W.currentNode=s;let n=W.nextNode(),r=0,a=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new K(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=i[++a]}r!==(null==l?void 0:l.index)&&(n=W.nextNode(),r++)}return W.currentNode=E,s}v(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class K{constructor(t,e,o,i){var s;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cp=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(L(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(o);else{const t=new J(s,this),e=t.u(this.options);t.v(o),this.$(e),this._$AH=t}}_$AC(t){let e=M.get(t.strings);return void 0===e&&M.set(t.strings,e=new q(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new K(this.k(C()),this.k(C()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,o,i,s){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,i){const s=this.strings;let n=!1;if(void 0===s)t=F(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const i=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=F(this,i[o+r],e,r),a===j&&(a=this._$AH[r]),n||(n=!k(a)||a!==this._$AH[r]),a===z?t=z:t!==z&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const Q=$?$.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends G{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=F(this,t,e,0))&&void 0!==o?o:z)===j)return;const i=this._$AH,s=t===z&&i!==z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==z&&(i===z||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=f.litHtmlPolyfillSupport;null==et||et(q,K),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");var ot,it;class st extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{var i,s;const n=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new K(e.insertBefore(C(),t),t,void 0,null!=o?o:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}st.finalized=!0,st._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function at(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):rt(t,e)}function lt(t){return at({...t,state:!0})}var ct;function dt(t){return t.auth?.data?.access_token||t.auth?.accessToken||null}function ut(){return window.location.origin}async function ht(t){try{const e=Object.keys(t.states).filter(t=>t.startsWith("automation."));if(0===e.length)return[];const o=[];for(const i of e){const e=i.replace("automation.","");try{let s=null;try{s=await t.callWS({type:"config/automation/config/get",automation_id:e})}catch(o){try{s=await t.callWS({type:"config/automation/get",automation_id:e})}catch(o){try{s=await t.callWS({type:"automation/get",automation_id:e})}catch(o){const n=t.states[i];n&&(s={id:n.attributes?.id||e,alias:n.attributes?.friendly_name||e,_entity_id:i,_state:n.state,_attributes:n.attributes})}}}s&&o.push(s)}catch(s){const n=t.states[i];n&&o.push({id:n.attributes?.id||e,alias:n.attributes?.friendly_name||e,_entity_id:i,_state:n.state,_attributes:n.attributes})}}if(o.length>0){console.log(`[Vacuum Schedule Card] ✅ УСПЕШНО получено ${o.length} конфигураций автоматизаций`),console.group("[Vacuum Schedule Card] Список всех автоматизаций (фильтрация по ID):"),o.forEach((t,e)=>{const o=t.id||t._entity_id||"неизвестно";console.log(`${e+1}. ID: ${o}`),console.log(`   Alias: ${t.alias||t._attributes?.friendly_name||"нет"}`),console.log(`   Entity ID: ${t._entity_id||"нет"}`),console.log(`   State: ${t._state||t.state||"неизвестно"}`),t.trigger&&console.log(`   Trigger: ${JSON.stringify(t.trigger).substring(0,100)}...`),t.action&&console.log(`   Action: ${JSON.stringify(t.action).substring(0,100)}...`),o.includes("vacuum_schedule")&&console.log(`   ⭐ Относится к расписаниям уборки (фильтр по ID: ${o})`)}),console.groupEnd();const t=o.filter(t=>(t.id||t._entity_id||"").includes("vacuum_schedule"));return console.log(`[Vacuum Schedule Card] Найдено автоматизаций расписаний (по ID): ${t.length}`),o}const i=e.map(e=>{const o=t.states[e],i=e.replace("automation.","");return{id:o.attributes?.id||i,alias:o.attributes?.friendly_name||i,_entity_id:e,_state:o.state,_attributes:o.attributes}});console.log(`[Vacuum Schedule Card] ⚠️ Используется fallback: получено ${i.length} автоматизаций из hass.states`),console.group("[Vacuum Schedule Card] Список автоматизаций (fallback, фильтрация по ID):"),i.forEach((t,e)=>{const o=t.id||"неизвестно";console.log(`${e+1}. ID: ${o}`),console.log(`   Entity ID: ${t._entity_id}`),console.log(`   Alias: ${t.alias}`),console.log(`   State: ${t._state}`),o.includes("vacuum_schedule")&&console.log(`   ⭐ Относится к расписаниям уборки (фильтр по ID: ${o})`)}),console.groupEnd();const s=i.filter(t=>(t.id||"").includes("vacuum_schedule"));return console.log(`[Vacuum Schedule Card] Найдено автоматизаций расписаний (по ID, fallback): ${s.length}`),i}catch(t){return console.warn("Ошибка получения списка автоматизаций:",t),[]}}function mt(t,e){const o=t.id||"";if(!o.startsWith("vacuum_schedule_")||!o.includes("_day_"))return null;const i=o.match(/^vacuum_schedule_(.+)_day_(\d+)$/);if(!i)return null;const s=i[1],n=parseInt(i[2],10),r=(Array.isArray(t.trigger)?t.trigger:[t.trigger]).find(t=>"time"===t.platform);if(!r?.at)return null;const a=r.at.substring(0,5),l=(Array.isArray(t.action)?t.action:[t.action]).find(t=>t.service?.includes("vacuum_clean_segment"));return{scheduleId:s,day:n,time:a,rooms:l?.data?.segments||[],enabled:"on"===e?.state}}async function _t(t,e){try{const o=(await ht(t)).find(t=>t.id===e.id),i=!!o;console.log(`[Vacuum Schedule Card] Попытка ${i?"обновить":"создать"} автоматизацию:`,{id:e.id,alias:e.alias,hasTrigger:!!e.trigger,hasAction:!!e.action,trigger:e.trigger,action:e.action}),console.log(`[Vacuum Schedule Card] Используем REST API для ${i?"обновления":"создания"} автоматизации`);const s=await async function(t,e){try{const o=dt(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для создания автоматизации"),!1;const i=`${ut()}/api/config/automation/config/${e.id}`,s={id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"};console.log("[Vacuum Schedule Card] Отправка REST API запроса на создание/обновление автоматизации:",{url:i,automationId:e.id});const n=await fetch(i,{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const t=await n.text();return console.error(`[Vacuum Schedule Card] ❌ Ошибка REST API при создании/обновлении автоматизации ${e.id}:`,n.status,t),!1}const r=await n.json().catch(()=>null);return console.log(`[Vacuum Schedule Card] ✅ REST API запрос успешно выполнен для автоматизации ${e.id}`,r),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса для автоматизации ${e.id}:`,t),!1}}(t,e);if(s){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e.id} успешно ${i?"обновлена":"создана"} через REST API`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:e.id,alias:e.alias,trigger:e.trigger,condition:e.condition,action:e.action}),!0}console.log("[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback");try{const o=i?"config/automation/update":"config/automation/create";try{await t.callWS({type:o,id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"});try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e.id} успешно ${i?"обновлена":"создана"} через WebSocket API`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:e.id,alias:e.alias,trigger:e.trigger,condition:e.condition,action:e.action}),!0}catch(o){if(i&&("unknown_command"===o.code||o.message?.includes("unknown_command"))){console.log("[Vacuum Schedule Card] Пробуем удалить и создать заново через WebSocket...");try{await t.callWS({type:"config/automation/delete",automation_id:e.id}),await t.callWS({type:"config/automation/create",id:e.id,alias:e.alias,description:e.description,trigger:e.trigger,condition:e.condition||[],action:e.action,mode:e.mode||"single"});try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e.id} успешно обновлена (удалена и создана заново через WebSocket)`),console.log("[Vacuum Schedule Card] Детали автоматизации:",{id:e.id,alias:e.alias,trigger:e.trigger,condition:e.condition,action:e.action}),!0}catch(t){console.warn("[Vacuum Schedule Card] Ошибка при попытке удалить автоматизацию:",t)}}return console.error(`[Vacuum Schedule Card] ❌ Не удалось ${i?"обновить":"создать"} автоматизацию ${e.id} через WebSocket:`,o),console.error("[Vacuum Schedule Card] Детали ошибки:",{code:o.code,message:o.message,automation:{id:e.id,alias:e.alias}}),!1}}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка ${i?"обновления":"создания"} автоматизации ${e.id}:`,t),!1}}catch(t){return console.error(`[Vacuum Schedule Card] Ошибка создания автоматизации ${e.id}:`,t),!1}}async function pt(t,e){try{console.log(`[Vacuum Schedule Card] Попытка удалить автоматизацию: ${e}`),console.log("[Vacuum Schedule Card] Используем REST API для удаления автоматизации");const o=await async function(t,e){try{const o=dt(t);if(!o)return console.warn("[Vacuum Schedule Card] Токен авторизации не найден для удаления автоматизации"),!1;const i=`${ut()}/api/config/automation/config/${e}`;console.log("[Vacuum Schedule Card] Отправка REST API запроса на удаление автоматизации:",{url:i,automationId:e});const s=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(!s.ok){const t=await s.text();return console.error(`[Vacuum Schedule Card] ❌ Ошибка REST API при удалении автоматизации ${e}:`,s.status,t),!1}return console.log(`[Vacuum Schedule Card] ✅ REST API запрос на удаление успешно выполнен для автоматизации ${e}`),!0}catch(t){return console.error(`[Vacuum Schedule Card] ❌ Ошибка при выполнении REST API запроса на удаление автоматизации ${e}:`,t),!1}}(t,e);if(o){try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}return console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e} успешно удалена через REST API`),!0}console.log("[Vacuum Schedule Card] REST API не сработал, пробуем WebSocket API как fallback");try{await t.callWS({type:"config/automation/delete",automation_id:e}),console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e} успешно удалена через WebSocket API`);try{await t.callService("automation","reload"),await new Promise(t=>setTimeout(t,500))}catch(t){console.warn("[Vacuum Schedule Card] Не удалось перезагрузить автоматизации:",t)}return!0}catch(o){if("unknown_command"===o.code||o.message?.includes("unknown_command"))try{return await t.callService("automation","delete",{id:e}),console.log(`[Vacuum Schedule Card] ✅ Автоматизация ${e} удалена через сервис`),!0}catch(t){return console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${e} через сервис:`,t),!1}return console.warn(`[Vacuum Schedule Card] ❌ Не удалось удалить автоматизацию ${e} через WebSocket:`,o),!1}}catch(t){return console.warn(`[Vacuum Schedule Card] ❌ Ошибка удаления автоматизации ${e}:`,t),!1}}async function gt(t,e,o){try{const i=await async function(t){try{const e=t.auth?.data?.access_token||t.auth?.accessToken;if(!e)return console.warn("Токен авторизации не найден для получения сущностей"),null;const o=`${window.location.origin}/api/states`,i=await fetch(o,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!i.ok)return console.warn(`Не удалось получить список сущностей: ${i.status}`),null;const s=await i.json(),n={};return Array.isArray(s)&&s.forEach(t=>{t.entity_id&&(n[t.entity_id]=t)}),n}catch(t){return console.warn("Ошибка получения сущностей через API:",t),null}}(t),s=e.replace("vacuum.",""),n=[],r=[s,s.replace(/_/g,""),"pylesos","vacuum"],a=e=>t.states[e]||i?.[e]||null;for(const t of r){for(let e=1;e<=50;e++){const o=`select.${t}_room_${e}_name`,i=`select.${t}_room_${e}_id`||`number.${t}_room_${e}_id`,s=a(o),r=a(i);if(s&&s.state){let t;if(r&&r.state)t=parseInt(r.state,10);else{const i=o.match(/room_(\d+)/);t=i?parseInt(i[1],10):e}isNaN(t)||n.push({id:t,name:s.state})}}if(n.length>0)break}if(n.length>0)return n.sort((t,e)=>t.id-e.id);const l=t.states[e];if(l?.attributes){const t=l.attributes.segments||l.attributes.room_list||[];if(Array.isArray(t)&&t.length>0)return t.map(t=>({id:"number"==typeof t?t:t.id||t.segment_id,name:"object"==typeof t&&t.name?t.name:`Комната ${"number"==typeof t?t:t.id||t.segment_id}`}))}return vt(o)}catch(t){return console.error("Ошибка загрузки комнат:",t),vt(o)}}function vt(t){const e=t("room_names").split(",");return[{id:16,name:e[0]||"Living Room"},{id:17,name:e[1]||"Bedroom"},{id:18,name:e[2]||"Kitchen"},{id:19,name:e[3]||"Bathroom"}]}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;const yt={ru:{schedule_title:"Расписание уборки",schedules_count:"расписаний",no_schedules:"Нет расписаний. Добавьте первое расписание.",add_schedule:"+ Добавить расписание",edit_schedule:"Редактировать расписание",add_schedule_title:"Добавить расписание",days_label:"Дни недели",time_label:"Время",rooms_label:"Комнаты для уборки",rooms_available:"доступно",select_all:"Выбрать все",enabled:"Включено",cancel:"Отмена",save:"Сохранить",delete_confirm:"Удалить это расписание?",loading:"Загрузка...",error_no_entity:"Ошибка: не указаны hass или entity",error_entity_not_found:"Ошибка: сущность",not_found:"не найдена",error_loading:"Ошибка загрузки расписаний:",error_saving:"Ошибка сохранения:",error_updating:"Ошибка обновления:",error_deleting:"Ошибка удаления:",error_no_days:"Выберите хотя бы один день",error_no_time:"Укажите время",error_no_hass:"Ошибка: hass не доступен",all_rooms:"Все комнаты",no_rooms_selected:"Комнаты не выбраны",rooms_not_found:"Комнаты не найдены. Проверьте подключение пылесоса.",rooms_hint:"💡 Для получения реальных комнат используйте сервис dreame_vacuum.get_room_mapping через Developer Tools",every_day:"Каждый день",no_days:"Нет дней",day_names:"Вс,Пн,Вт,Ср,Чт,Пт,Сб",room_names:"Гостиная,Спальня,Кухня,Ванная"},en:{schedule_title:"Vacuum Schedule",schedules_count:"schedules",no_schedules:"No schedules. Add your first schedule.",add_schedule:"+ Add Schedule",edit_schedule:"Edit Schedule",add_schedule_title:"Add Schedule",days_label:"Days of week",time_label:"Time",rooms_label:"Rooms to clean",rooms_available:"available",select_all:"Select all",enabled:"Enabled",cancel:"Cancel",save:"Save",delete_confirm:"Delete this schedule?",loading:"Loading...",error_no_entity:"Error: hass or entity not specified",error_entity_not_found:"Error: entity",not_found:"not found",error_loading:"Error loading schedules:",error_saving:"Error saving:",error_updating:"Error updating:",error_deleting:"Error deleting:",error_no_days:"Select at least one day",error_no_time:"Specify time",error_no_hass:"Error: hass not available",all_rooms:"All rooms",no_rooms_selected:"No rooms selected",rooms_not_found:"Rooms not found. Check vacuum connection.",rooms_hint:"💡 To get real rooms use dreame_vacuum.get_room_mapping service via Developer Tools",every_day:"Every day",no_days:"No days",day_names:"Sun,Mon,Tue,Wed,Thu,Fri,Sat",room_names:"Living Room,Bedroom,Kitchen,Bathroom"}};function ft(t,e){const o=function(t){return t&&(t.language||t.locale?.language||"en").startsWith("ru")?"ru":"en"}(e);return yt[o]?.[t]||yt.en[t]||t}let $t=class extends st{constructor(){super(...arguments),this._schedules=[],this._loading=!1,this._showAddDialog=!1,this._rooms=[],this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]}}setConfig(t){if(!t.entity)throw new Error("Entity must be specified");this._config=t,this.entity=t.entity,this._loadSchedules(),this._loadRooms()}connectedCallback(){super.connectedCallback(),this.hass&&(this._loadSchedules(),this._loadRooms(),this._subscribeToAutomationChanges())}disconnectedCallback(){if(super.disconnectedCallback(),this._unsubscribeAutomations&&"function"==typeof this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){console.warn("Ошибка при отписке от изменений автоматизаций:",t)}this._unsubscribeAutomations=void 0}}_subscribeToAutomationChanges(){if(this.hass?.connection){if(this._unsubscribeAutomations){try{this._unsubscribeAutomations()}catch(t){}this._unsubscribeAutomations=void 0}try{if(this.hass.connection&&"function"==typeof this.hass.connection.subscribeEvents)try{const t=this.hass.connection.subscribeEvents(t=>{const e=t.event?.data?.entity_id;e&&e.startsWith("automation.vacuum_schedule_")&&this._loadSchedules()},"state_changed");this._unsubscribeAutomations="function"==typeof t?t:()=>{this.hass.connection}}catch(t){console.warn("Не удалось подписаться на события:",t)}}catch(t){console.warn("Не удалось подписаться на изменения автоматизаций:",t)}}}async _loadRooms(){this.hass&&this.entity&&(this._rooms=await gt(this.hass,this.entity,t=>this._t(t)),this.requestUpdate())}async _loadSchedules(){if(this.hass){this._loading=!0,this._error=void 0;try{const t=new Map,e=await ht(this.hass);console.log(`[Vacuum Schedule Card] ✅ Автоматизации успешно получены: ${e.length} шт.`),console.log("[Vacuum Schedule Card] Начинаем фильтрацию автоматизаций по ID...");let o=0;for(const i of e)try{const e=i.id||"";if(!e)continue;if(e.includes("vacuum_schedule")&&console.log("[Vacuum Schedule Card] 🔍 Найдена потенциальная автоматизация расписания (по ID):",{id:e,hasTrigger:!!i.trigger,hasAction:!!i.action}),!e.startsWith("vacuum_schedule_")||!e.includes("_day_"))continue;o++,console.log(`[Vacuum Schedule Card] ✅ Автоматизация прошла фильтр по ID: ${e}`);let s=null;const n=`automation.${e}`;if(this.hass.states[n])s=this.hass.states[n];else for(const t in this.hass.states){if(!t.startsWith("automation."))continue;const o=this.hass.states[t];if(o.attributes?.id===e){s=o;break}}const r=mt(i,s);if(!r){console.warn(`[Vacuum Schedule Card] ⚠️ Не удалось распарсить автоматизацию с ID: ${e}`);continue}console.log(`[Vacuum Schedule Card] ✅ Найдена автоматизация расписания (отфильтрована по ID): id=${e}, scheduleId=${r.scheduleId}, day=${r.day}`);let a=t.get(r.scheduleId);a||(a={id:r.scheduleId,enabled:r.enabled,days:[],time:r.time,rooms:r.rooms},t.set(r.scheduleId,a)),a.days.includes(r.day)||a.days.push(r.day),r.rooms.length>0&&(a.rooms=r.rooms),s?a.enabled="on"===s.state:r.enabled&&(a.enabled=!0)}catch(t){console.warn("Ошибка обработки автоматизации:",t)}console.log("[Vacuum Schedule Card] ✅ Фильтрация завершена:"),console.log(`  - Всего получено автоматизаций: ${e.length}`),console.log(`  - Отфильтровано по ID (vacuum_schedule_*_day_*): ${o}`),console.log(`  - Создано расписаний: ${t.size}`),t.size>0&&(console.group("[Vacuum Schedule Card] Найденные расписания:"),t.forEach((t,e)=>{console.log(`Расписание ${e}:`),console.log(`  - Время: ${t.time}`),console.log(`  - Дни: ${t.days.join(", ")}`),console.log(`  - Комнаты: ${t.rooms.length>0?t.rooms.join(", "):"все"}`),console.log("  - Включено: "+(t.enabled?"да":"нет"))}),console.groupEnd());for(const e of t.values())e.days.sort((t,e)=>t-e);this._schedules=Array.from(t.values())}catch(t){this._error=`${this._t("error_loading")} ${t}`,console.error(this._error)}finally{this._loading=!1,this.requestUpdate()}}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2,max_rows:6,min_columns:3,max_columns:12}}static getStubConfig(){return{entity:"vacuum.example",type:"custom:vacuum-schedule-card"}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}}],computeLabel:t=>{if("entity"===t.name)return"Vacuum Entity"},computeHelper:t=>{if("entity"===t.name)return"Select the vacuum entity to manage schedules for"}}}static get styles(){return r`
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
    `}_t(t){return ft(t,this.hass)}_getDayNames(){return ft("day_names",this.hass).split(",")}_formatDays(t){return function(t,e,o){return 0===t.length?o.noDays:7===t.length?o.everyDay:t.map(t=>e[t]).join(", ")}(t,this._getDayNames(),{noDays:this._t("no_days"),everyDay:this._t("every_day")})}_formatRooms(t){return function(t,e,o){if(0===t.length)return o;const i=t.map(t=>{const o=e.find(e=>e.id===t);return o?o.name:`ID:${t}`}).join(", ");return i||"Комнаты не выбраны"}(t,this._rooms,this._t("all_rooms"))}render(){if(!this.hass||!this.entity)return H`<div class="card">
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
    `:H`<div class="card">
        <div class="content">${this._t("error_entity_not_found")} ${this.entity} ${this._t("not_found")}</div>
      </div>`}_addSchedule(){this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this._editingSchedule=void 0,this._error=void 0,this._showAddDialog=!0,this.requestUpdate()}_toggleDay(t){this._newSchedule.days||(this._newSchedule.days=[]);const e=this._newSchedule.days.indexOf(t);e>-1?this._newSchedule.days.splice(e,1):this._newSchedule.days.push(t),this.requestUpdate()}_isDaySelected(t){return this._newSchedule.days?.includes(t)||!1}_closeDialog(){this._showAddDialog=!1,this._editingSchedule=void 0,this._error=void 0,this._newSchedule={enabled:!0,days:[],time:"09:00",rooms:[]},this.requestUpdate()}_editSchedule(t){this._editingSchedule=t,this._newSchedule={enabled:t.enabled,days:[...t.days],time:t.time,rooms:[...t.rooms],name:t.name},this._showAddDialog=!0,this._error=void 0}async _toggleSchedule(t,e){if(!this.hass)return;const o={...t,enabled:e};this._schedules=this._schedules.map(e=>e.id===t.id?o:e),this.requestUpdate(),await this._updateAutomationsForSchedule(o,t)}async _deleteSchedule(t){if(this.hass&&confirm(this._t("delete_confirm"))){for(const e of t.days)await this._deleteAutomation(t.id,e);this._schedules=this._schedules.filter(e=>e.id!==t.id),this.requestUpdate()}}async _createAutomation(t,e){if(!this.hass)return;const o=function(t,e,o,i,s){const n=`vacuum_schedule_${t.id}_day_${e}`,r=function(t){return["sun","mon","tue","wed","thu","fri","sat"][t]||"mon"}(e),[a,l]=t.time.split(":").map(Number);return{id:n,alias:`${s} ${t.time} - ${i[e]} (${t.id})`,description:`Автоматизация для расписания уборки ${t.time} в ${i[e]}`,trigger:[{platform:"time",at:`${String(a).padStart(2,"0")}:${String(l).padStart(2,"0")}:00`}],condition:[{condition:"time",weekday:r}],action:[{service:"dreame_vacuum.vacuum_clean_segment",target:{entity_id:o},data:{segments:t.rooms.length>0?t.rooms:void 0}}],mode:"single"}}(t,e,this.entity,this._getDayNames(),this._t("schedule_title"));await _t(this.hass,o)}async _deleteAutomation(t,e){if(!this.hass)return;const o=`vacuum_schedule_${t}_day_${e}`;await pt(this.hass,o)}async _updateAutomationsForSchedule(t,e){if(!t.enabled){const o=e?e.days:t.days;for(const e of o)await this._deleteAutomation(t.id,e);return}if(e){const o=e.days.filter(e=>!t.days.includes(e));for(const e of o)await this._deleteAutomation(t.id,e)}for(const e of t.days)await this._createAutomation(t,e)}async _saveSchedule(){if(!this._newSchedule.days||0===this._newSchedule.days.length)return void(this._error=this._t("error_no_days"));if(!this._newSchedule.time)return void(this._error=this._t("error_no_time"));if(!this.hass)return void(this._error=this._t("error_no_hass"));const t={id:this._editingSchedule?.id||`schedule_${Date.now()}`,enabled:this._newSchedule.enabled??!0,days:this._newSchedule.days,time:this._newSchedule.time,rooms:this._newSchedule.rooms||[],name:this._newSchedule.name};let e=[...this._schedules];const o=this._editingSchedule;if(this._editingSchedule){const o=e.findIndex(t=>t.id===this._editingSchedule.id);o>-1&&(e[o]=t)}else e.push(t);try{this._schedules=e,this.requestUpdate(),await this._updateAutomationsForSchedule(t,o);try{await this.hass.callService("automation","reload"),await new Promise(t=>setTimeout(t,1e3))}catch(t){console.warn("Не удалось перезагрузить автоматизации:",t),await new Promise(t=>setTimeout(t,1e3))}await this._loadSchedules(),this._closeDialog(),this._error=void 0,this.requestUpdate()}catch(t){this._error=`${this._t("error_saving")} ${t}`,console.error("Ошибка сохранения расписания:",t)}}};t([at({attribute:!1})],$t.prototype,"hass",void 0),t([at()],$t.prototype,"entity",void 0),t([lt()],$t.prototype,"_schedules",void 0),t([lt()],$t.prototype,"_loading",void 0),t([lt()],$t.prototype,"_error",void 0),t([lt()],$t.prototype,"_showAddDialog",void 0),t([lt()],$t.prototype,"_editingSchedule",void 0),t([lt()],$t.prototype,"_rooms",void 0),t([lt()],$t.prototype,"_newSchedule",void 0),$t=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:o,elements:i}=e;return{kind:o,elements:i,finisher(e){customElements.define(t,e)}}})(t,e))("vacuum-schedule-card")],$t),customElements.get("vacuum-schedule-card")||customElements.define("vacuum-schedule-card",$t),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-schedule-card",name:"Vacuum Schedule Card",description:"Карточка для создания расписания уборки пылесоса"});export{$t as VacuumScheduleCard};
