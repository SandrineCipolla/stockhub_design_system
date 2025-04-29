(function(o,s){typeof exports=="object"&&typeof module<"u"?s(require("lit")):typeof define=="function"&&define.amd?define(["lit"],s):(o=typeof globalThis<"u"?globalThis:o||self,s(o.lit))})(this,function(o){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=n=>e=>typeof e=="function"?((t,r)=>(customElements.define(t,r),r))(n,e):((t,r)=>{const{kind:i,elements:l}=r;return{kind:i,elements:l,finisher(d){customElements.define(t,d)}}})(n,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p=(n,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,n)}},a=(n,e,t)=>{e.constructor.createProperty(t,n)};function m(n){return(e,t)=>t!==void 0?a(n,e,t):p(n,e)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var u;((u=window.HTMLSlotElement)===null||u===void 0?void 0:u.prototype.assignedElements)!=null;var y=Object.defineProperty,b=Object.getOwnPropertyDescriptor,f=(n,e,t,r)=>{for(var i=r>1?void 0:r?b(e,t):e,l=n.length-1,d;l>=0;l--)(d=n[l])&&(i=(r?d(e,t,i):d(i))||i);return r&&i&&y(e,t,i),i};let c=class extends o.LitElement{constructor(){super(...arguments),this.label="Click me"}render(){return o.html`<button><slot>${this.label}</slot></button>`}};c.styles=o.css`
    button {
      background-color: #5a21b5;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background-color: #7e56c2;
    }
  `,f([m({type:String})],c.prototype,"label",2),c=f([s("sh-button")],c)});
