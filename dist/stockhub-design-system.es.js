import { css as u, LitElement as a, html as p } from "lit";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = (r) => (e) => typeof e == "function" ? ((t, n) => (customElements.define(t, n), n))(r, e) : ((t, n) => {
  const { kind: o, elements: i } = n;
  return { kind: o, elements: i, finisher(s) {
    customElements.define(t, s);
  } };
})(r, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(t) {
  t.createProperty(e.key, r);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} }, y = (r, e, t) => {
  e.constructor.createProperty(t, r);
};
function b(r) {
  return (e, t) => t !== void 0 ? y(r, e, t) : f(r, e);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var c;
((c = window.HTMLSlotElement) === null || c === void 0 ? void 0 : c.prototype.assignedElements) != null;
var h = Object.defineProperty, v = Object.getOwnPropertyDescriptor, d = (r, e, t, n) => {
  for (var o = n > 1 ? void 0 : n ? v(e, t) : e, i = r.length - 1, s; i >= 0; i--)
    (s = r[i]) && (o = (n ? s(e, t, o) : s(o)) || o);
  return n && o && h(e, t, o), o;
};
let l = class extends a {
  constructor() {
    super(...arguments), this.label = "Click me";
  }
  render() {
    return p`<button><slot>${this.label}</slot></button>`;
  }
};
l.styles = u`
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
  `;
d([
  b({ type: String })
], l.prototype, "label", 2);
l = d([
  m("sh-button")
], l);
