/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/lit-html/lib/default-template-processor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lit-html/lib/default-template-processor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultTemplateProcessor": () => (/* binding */ DefaultTemplateProcessor),
/* harmony export */   "defaultTemplateProcessor": () => (/* binding */ defaultTemplateProcessor)
/* harmony export */ });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "./node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__.PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__.EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__.BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__.AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__.NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/directive.js":
/*!************************************************!*\
  !*** ./node_modules/lit-html/lib/directive.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "directive": () => (/* binding */ directive),
/* harmony export */   "isDirective": () => (/* binding */ isDirective)
/* harmony export */ });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/dom.js":
/*!******************************************!*\
  !*** ./node_modules/lit-html/lib/dom.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCEPolyfill": () => (/* binding */ isCEPolyfill),
/* harmony export */   "reparentNodes": () => (/* binding */ reparentNodes),
/* harmony export */   "removeNodes": () => (/* binding */ removeNodes)
/* harmony export */ });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/part.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lib/part.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noChange": () => (/* binding */ noChange),
/* harmony export */   "nothing": () => (/* binding */ nothing)
/* harmony export */ });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/parts.js":
/*!********************************************!*\
  !*** ./node_modules/lit-html/lib/parts.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPrimitive": () => (/* binding */ isPrimitive),
/* harmony export */   "isIterable": () => (/* binding */ isIterable),
/* harmony export */   "AttributeCommitter": () => (/* binding */ AttributeCommitter),
/* harmony export */   "AttributePart": () => (/* binding */ AttributePart),
/* harmony export */   "NodePart": () => (/* binding */ NodePart),
/* harmony export */   "BooleanAttributePart": () => (/* binding */ BooleanAttributePart),
/* harmony export */   "PropertyCommitter": () => (/* binding */ PropertyCommitter),
/* harmony export */   "PropertyPart": () => (/* binding */ PropertyPart),
/* harmony export */   "EventPart": () => (/* binding */ EventPart)
/* harmony export */ });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "./node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "./node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "./node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "./node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // tslint:disable-next-line:no-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!(0,_directive_js__WEBPACK_IMPORTED_MODULE_0__.isDirective)(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while ((0,_directive_js__WEBPACK_IMPORTED_MODULE_0__.isDirective)(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild((0,_template_js__WEBPACK_IMPORTED_MODULE_5__.createMarker)());
        this.endNode = container.appendChild((0,_template_js__WEBPACK_IMPORTED_MODULE_5__.createMarker)());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = (0,_template_js__WEBPACK_IMPORTED_MODULE_5__.createMarker)());
        part.__insert(this.endNode = (0,_template_js__WEBPACK_IMPORTED_MODULE_5__.createMarker)());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = (0,_template_js__WEBPACK_IMPORTED_MODULE_5__.createMarker)());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while ((0,_directive_js__WEBPACK_IMPORTED_MODULE_0__.isDirective)(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__.TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__.nothing) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__.nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__.TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__.TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while ((0,_directive_js__WEBPACK_IMPORTED_MODULE_0__.isDirective)(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while ((0,_directive_js__WEBPACK_IMPORTED_MODULE_0__.isDirective)(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__.noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/render.js":
/*!*********************************************!*\
  !*** ./node_modules/lit-html/lib/render.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parts": () => (/* binding */ parts),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "./node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "./node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeNodes)(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__.NodePart(Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__.templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-factory.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-factory.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "templateFactory": () => (/* binding */ templateFactory),
/* harmony export */   "templateCaches": () => (/* binding */ templateCaches)
/* harmony export */ });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__.marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__.Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-instance.js":
/*!********************************************************!*\
  !*** ./node_modules/lit-html/lib/template-instance.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplateInstance": () => (/* binding */ TemplateInstance)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari dooes not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__.isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!(0,_template_js__WEBPACK_IMPORTED_MODULE_1__.isTemplatePartActive)(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-result.js":
/*!******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-result.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TemplateResult": () => (/* binding */ TemplateResult),
/* harmony export */   "SVGTemplateResult": () => (/* binding */ SVGTemplateResult)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = _template_js__WEBPACK_IMPORTED_MODULE_1__.lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceeding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? _template_js__WEBPACK_IMPORTED_MODULE_1__.marker : _template_js__WEBPACK_IMPORTED_MODULE_1__.nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__.boundAttributeSuffix + attributeMatch[3] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__.marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.reparentNodes)(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/lit-html/lib/template.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "marker": () => (/* binding */ marker),
/* harmony export */   "nodeMarker": () => (/* binding */ nodeMarker),
/* harmony export */   "markerRegex": () => (/* binding */ markerRegex),
/* harmony export */   "boundAttributeSuffix": () => (/* binding */ boundAttributeSuffix),
/* harmony export */   "Template": () => (/* binding */ Template),
/* harmony export */   "isTemplatePartActive": () => (/* binding */ isTemplatePartActive),
/* harmony export */   "createMarker": () => (/* binding */ createMarker),
/* harmony export */   "lastAttributeNameRegex": () => (/* binding */ lastAttributeNameRegex)
/* harmony export */ });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "./node_modules/lit-html/lit-html.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lit-html.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultTemplateProcessor": () => (/* reexport safe */ _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__.DefaultTemplateProcessor),
/* harmony export */   "defaultTemplateProcessor": () => (/* reexport safe */ _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__.defaultTemplateProcessor),
/* harmony export */   "directive": () => (/* reexport safe */ _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__.directive),
/* harmony export */   "isDirective": () => (/* reexport safe */ _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__.isDirective),
/* harmony export */   "removeNodes": () => (/* reexport safe */ _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.removeNodes),
/* harmony export */   "reparentNodes": () => (/* reexport safe */ _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__.reparentNodes),
/* harmony export */   "noChange": () => (/* reexport safe */ _lib_part_js__WEBPACK_IMPORTED_MODULE_4__.noChange),
/* harmony export */   "nothing": () => (/* reexport safe */ _lib_part_js__WEBPACK_IMPORTED_MODULE_4__.nothing),
/* harmony export */   "AttributeCommitter": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.AttributeCommitter),
/* harmony export */   "AttributePart": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.AttributePart),
/* harmony export */   "BooleanAttributePart": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.BooleanAttributePart),
/* harmony export */   "EventPart": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.EventPart),
/* harmony export */   "isIterable": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.isIterable),
/* harmony export */   "isPrimitive": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.isPrimitive),
/* harmony export */   "NodePart": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.NodePart),
/* harmony export */   "PropertyCommitter": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.PropertyCommitter),
/* harmony export */   "PropertyPart": () => (/* reexport safe */ _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__.PropertyPart),
/* harmony export */   "parts": () => (/* reexport safe */ _lib_render_js__WEBPACK_IMPORTED_MODULE_6__.parts),
/* harmony export */   "render": () => (/* reexport safe */ _lib_render_js__WEBPACK_IMPORTED_MODULE_6__.render),
/* harmony export */   "templateCaches": () => (/* reexport safe */ _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__.templateCaches),
/* harmony export */   "templateFactory": () => (/* reexport safe */ _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__.templateFactory),
/* harmony export */   "TemplateInstance": () => (/* reexport safe */ _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__.TemplateInstance),
/* harmony export */   "SVGTemplateResult": () => (/* reexport safe */ _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__.SVGTemplateResult),
/* harmony export */   "TemplateResult": () => (/* reexport safe */ _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__.TemplateResult),
/* harmony export */   "createMarker": () => (/* reexport safe */ _lib_template_js__WEBPACK_IMPORTED_MODULE_9__.createMarker),
/* harmony export */   "isTemplatePartActive": () => (/* reexport safe */ _lib_template_js__WEBPACK_IMPORTED_MODULE_9__.isTemplatePartActive),
/* harmony export */   "Template": () => (/* reexport safe */ _lib_template_js__WEBPACK_IMPORTED_MODULE_9__.Template),
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "svg": () => (/* binding */ svg)
/* harmony export */ });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "./node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "./node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "./node_modules/lit-html/lib/directive.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "./node_modules/lit-html/lib/part.js");
/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "./node_modules/lit-html/lib/parts.js");
/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "./node_modules/lit-html/lib/render.js");
/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "./node_modules/lit-html/lib/template-factory.js");
/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "./node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.1');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__.TemplateResult(strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__.SVGTemplateResult(strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__.defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "./src/FullName.js":
/*!*************************!*\
  !*** ./src/FullName.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var haunted__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! haunted */ "./node_modules/haunted/lib/haunted.js");


function FullName(el) {
  const [first, setFirst] = (0,haunted__WEBPACK_IMPORTED_MODULE_0__.useState)("Happy");
  const [last, setLast] = (0,haunted__WEBPACK_IMPORTED_MODULE_0__.useState)("Halloween 🎃");

  (0,haunted__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const event = new CustomEvent('change', {
      detail: `${first} ${last}`
    });
    this.dispatchEvent(event);
  }, [first, last]);

  return haunted__WEBPACK_IMPORTED_MODULE_0__.html`
    <div class="container">
      <label for="first-name">First</label>
      <input
        value=${first}
        @keyup=${ev => setFirst(ev.target.value)}
        type="text"
        name="first"
        id="first-name"
      />

      <label for="last-name">Last</label>
      <input
        value=${last}
        @keyup=${ev => setLast(ev.target.value)}
        type="text"
        name="last"
        id="last-name"
      />
    </div>

    <style>
      .container {
        border: none;
        display: grid;
        grid-template-columns: 20% 80%;
      }

      input {
        border: 1px solid #e5e5e5;
        padding: 6px 10px;
        margin-bottom: 1em;
      }
    </style>
  `;
}

customElements.define("full-name", (0,haunted__WEBPACK_IMPORTED_MODULE_0__.component)(FullName));


/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var haunted__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! haunted */ "./node_modules/haunted/lib/haunted.js");
/* harmony import */ var _FullName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FullName.js */ "./src/FullName.js");



function App() {
  const [name, setName] = (0,haunted__WEBPACK_IMPORTED_MODULE_0__.useState)("");

  return haunted__WEBPACK_IMPORTED_MODULE_0__.html`
    <h2>User Page</h2>

    <h3>${name}</h3>

    <fieldset>
      <legend>Change name:</legend>
      <full-name @change=${ev => setName(ev.detail)}></full-name>
    </fieldset>

    <style>
      fieldset {
        border: none;
      }

      legend {
        padding: 0;
        margin-bottom: 0.5rem;
      }
    </style>
  `;
}

customElements.define("my-app", (0,haunted__WEBPACK_IMPORTED_MODULE_0__.component)(App));


/***/ }),

/***/ "./node_modules/haunted/lib/component.js":
/*!***********************************************!*\
  !*** ./node_modules/haunted/lib/component.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeComponent": () => (/* binding */ makeComponent)
/* harmony export */ });

function toCamelCase(val = '') {
  return val.indexOf('-') === -1 ? val.toLowerCase() : val.toLowerCase().split('-').reduce((out, part) => {
    return out ? out + part.charAt(0).toUpperCase() + part.slice(1) : part;
  },'') 
}

function makeComponent(Container) {
  function component(renderer, BaseElement = HTMLElement, {useShadowDOM = true, shadowRootInit = {}} = {}) {
    class Element extends BaseElement {
      static get observedAttributes() {
        return renderer.observedAttributes || [];
      }

      constructor() {
        super();
        if (useShadowDOM === false) {
          this._container = new Container(renderer, this);
        } else {
          this.attachShadow({ mode: "open", ...shadowRootInit});
          this._container = new Container(renderer, this.shadowRoot, this);        
        }
      }

      connectedCallback() {
        this._container.update();
      }

      disconnectedCallback() {
        this._container.teardown();
      }

      attributeChangedCallback(name, _, newValue) {
        let val = newValue === '' ? true : newValue;
        Reflect.set(this, toCamelCase(name), val);
      }
    };

    function reflectiveProp(initialValue) {
      let value = initialValue;
      return Object.freeze({
        enumerable: true,
        configurable: true,
        get() {
          return value;
        },
        set(newValue) {
          value = newValue;
          this._container.update();
        }
      })
    }

    const proto = new Proxy(BaseElement.prototype, {
      set(target, key, value, receiver) {
        if(key in target) {
          Reflect.set(target, key, value);
        }
        let desc;
        if(typeof key === 'symbol' || key[0] === '_') {
          desc = {
            enumerable: true,
            configurable: true,
            writable: true,
            value
          }; 
        } else {
          desc = reflectiveProp(value);
        }
        Object.defineProperty(receiver, key, desc);

        if(desc.set) {
          desc.set.call(receiver, value);
        }

        return true;
      }
    });

    Object.setPrototypeOf(Element.prototype, proto);


    return Element;
  }

  return component;
}




/***/ }),

/***/ "./node_modules/haunted/lib/container.js":
/*!***********************************************!*\
  !*** ./node_modules/haunted/lib/container.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeContainer": () => (/* binding */ makeContainer)
/* harmony export */ });
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbols.js */ "./node_modules/haunted/lib/symbols.js");
/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface.js */ "./node_modules/haunted/lib/interface.js");


//import { render, html } from './lit.js';

const defer = Promise.resolve().then.bind(Promise.resolve());

function scheduler() {
  let tasks = [];
  let id;

  function runTasks() {
    id = null;
    let t = tasks;
    tasks = [];
    for(var i = 0, len = t.length; i < len; i++) {
      t[i]();
    }
  }

  return function(task) {
    tasks.push(task);
    if(id == null) {
      id = defer(runTasks);
    }
  };
}

function makeContainer(render) {
  const read = scheduler();
  const write = scheduler();

  class Container {
    constructor(renderer, frag, host) {
      this.renderer = renderer;
      this.frag = frag;
      this.host = host || frag;
      this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.hookSymbol] = new Map();
      this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.phaseSymbol] = null;
      this._updateQueued = false;
    }

    update() {
      if(this._updateQueued) return;
      read(() => {
        let result = this.handlePhase(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.updateSymbol);
        write(() => {
          this.handlePhase(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.commitSymbol, result);

          if(this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol]) {
            write(() => {
              this.handlePhase(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol);
            });
          }
        });
        this._updateQueued = false;
      });
      this._updateQueued = true;
    }

    handlePhase(phase, arg) {
      this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.phaseSymbol] = phase;
      switch(phase) {
        case _symbols_js__WEBPACK_IMPORTED_MODULE_0__.commitSymbol: return this.commit(arg);
        case _symbols_js__WEBPACK_IMPORTED_MODULE_0__.updateSymbol: return this.render();
        case _symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol: return this.runEffects(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol);
      }
      this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.phaseSymbol] = null;
    }

    commit(result) {
      render(result, this.frag);
      this.runEffects(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.commitSymbol);
    }

    render() {
      (0,_interface_js__WEBPACK_IMPORTED_MODULE_1__.setCurrent)(this);
      let result = this.args ?
        this.renderer.apply(this.host, this.args) :
        this.renderer.call(this.host, this.host);
      (0,_interface_js__WEBPACK_IMPORTED_MODULE_1__.clear)();
      return result;
    }

    runEffects(symbol) {
      let effects = this[symbol];
      if(effects) {
        (0,_interface_js__WEBPACK_IMPORTED_MODULE_1__.setCurrent)(this);
        for(let effect of effects) {
          effect.call(this);
        }
        (0,_interface_js__WEBPACK_IMPORTED_MODULE_1__.clear)();
      }
    }

    teardown() {
      let hooks = this[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.hookSymbol];
      hooks.forEach((hook) => {
        if (typeof hook.teardown === 'function') {
          hook.teardown();
        }
      })
    }
  }

  return Container;
}




/***/ }),

/***/ "./node_modules/haunted/lib/core.js":
/*!******************************************!*\
  !*** ./node_modules/haunted/lib/core.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ haunted),
/* harmony export */   "useCallback": () => (/* reexport safe */ _use_callback_js__WEBPACK_IMPORTED_MODULE_3__.useCallback),
/* harmony export */   "useEffect": () => (/* reexport safe */ _use_effect_js__WEBPACK_IMPORTED_MODULE_4__.useEffect),
/* harmony export */   "useState": () => (/* reexport safe */ _use_state_js__WEBPACK_IMPORTED_MODULE_5__.useState),
/* harmony export */   "useReducer": () => (/* reexport safe */ _use_reducer_js__WEBPACK_IMPORTED_MODULE_6__.useReducer),
/* harmony export */   "useMemo": () => (/* reexport safe */ _use_memo_js__WEBPACK_IMPORTED_MODULE_7__.useMemo),
/* harmony export */   "useContext": () => (/* reexport safe */ _use_context_js__WEBPACK_IMPORTED_MODULE_8__.useContext),
/* harmony export */   "useRef": () => (/* reexport safe */ _use_ref_js__WEBPACK_IMPORTED_MODULE_9__.useRef),
/* harmony export */   "hook": () => (/* reexport safe */ _hook_js__WEBPACK_IMPORTED_MODULE_10__.hook),
/* harmony export */   "Hook": () => (/* reexport safe */ _hook_js__WEBPACK_IMPORTED_MODULE_10__.Hook)
/* harmony export */ });
/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container.js */ "./node_modules/haunted/lib/container.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component.js */ "./node_modules/haunted/lib/component.js");
/* harmony import */ var _create_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-context.js */ "./node_modules/haunted/lib/create-context.js");
/* harmony import */ var _use_callback_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-callback.js */ "./node_modules/haunted/lib/use-callback.js");
/* harmony import */ var _use_effect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-effect.js */ "./node_modules/haunted/lib/use-effect.js");
/* harmony import */ var _use_state_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-state.js */ "./node_modules/haunted/lib/use-state.js");
/* harmony import */ var _use_reducer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./use-reducer.js */ "./node_modules/haunted/lib/use-reducer.js");
/* harmony import */ var _use_memo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./use-memo.js */ "./node_modules/haunted/lib/use-memo.js");
/* harmony import */ var _use_context_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./use-context.js */ "./node_modules/haunted/lib/use-context.js");
/* harmony import */ var _use_ref_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./use-ref.js */ "./node_modules/haunted/lib/use-ref.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");




function haunted({ render }) {
  const Container = (0,_container_js__WEBPACK_IMPORTED_MODULE_0__.makeContainer)(render);
  const component = (0,_component_js__WEBPACK_IMPORTED_MODULE_1__.makeComponent)(Container);
  const createContext = (0,_create_context_js__WEBPACK_IMPORTED_MODULE_2__.makeContext)(component);

  return { Container, component, createContext };
}











/***/ }),

/***/ "./node_modules/haunted/lib/create-context.js":
/*!****************************************************!*\
  !*** ./node_modules/haunted/lib/create-context.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeContext": () => (/* binding */ makeContext)
/* harmony export */ });
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbols.js */ "./node_modules/haunted/lib/symbols.js");
/* harmony import */ var _use_context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-context.js */ "./node_modules/haunted/lib/use-context.js");



function makeContext(component) {
  return (defaultValue) => {
    const Context = {
      Provider: class extends HTMLElement {
        constructor() {
          super();
          this.listeners = new Set();
      
          this.addEventListener(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextEvent, this);
        }
      
        disconnectedCallback() {
          this.removeEventListener(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextEvent, this);
        }
    
        handleEvent(event) {
          const { detail } = event;
    
          if (detail.Context === Context) {
            detail.value = this.value;
            detail.unsubscribe = this.unsubscribe.bind(this, detail.callback);
    
            this.listeners.add(detail.callback);
    
            event.stopPropagation();
          }
        }
    
        unsubscribe(callback) {
          if(this.listeners.has(callback)) {
            this.listeners.delete(callback);
          }
        }
    
        set value(value) {
          this._value = value;
          for(let callback of this.listeners) {
            callback(value);
          }
        }
    
        get value() {
          return this._value;
        }
      },

      Consumer: component(function ({ render }) {
        const context = (0,_use_context_js__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);
    
        return render(context);
      }),

      defaultValue
    };

    return Context;
  };
}



/***/ }),

/***/ "./node_modules/haunted/lib/haunted.js":
/*!*********************************************!*\
  !*** ./node_modules/haunted/lib/haunted.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "html": () => (/* reexport safe */ _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__.html),
/* harmony export */   "render": () => (/* reexport safe */ _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "component": () => (/* reexport safe */ _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__.component),
/* harmony export */   "createContext": () => (/* reexport safe */ _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   "virtual": () => (/* reexport safe */ _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__.virtual),
/* harmony export */   "Hook": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.Hook),
/* harmony export */   "hook": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.hook),
/* harmony export */   "useCallback": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useContext),
/* harmony export */   "useEffect": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__.useState),
/* harmony export */   "default": () => (/* reexport safe */ _core_js__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _lit_haunted_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-haunted.js */ "./node_modules/haunted/lib/lit-haunted.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core.js */ "./node_modules/haunted/lib/core.js");





/***/ }),

/***/ "./node_modules/haunted/lib/hook.js":
/*!******************************************!*\
  !*** ./node_modules/haunted/lib/hook.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hook": () => (/* binding */ hook),
/* harmony export */   "Hook": () => (/* binding */ Hook)
/* harmony export */ });
/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface.js */ "./node_modules/haunted/lib/interface.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbols.js */ "./node_modules/haunted/lib/symbols.js");



class Hook {
  constructor(id, el) {
    this.id = id;
    this.el = el;
  }
}

function use(Hook, ...args) {
  let id = (0,_interface_js__WEBPACK_IMPORTED_MODULE_0__.notify)();
  let hooks = _interface_js__WEBPACK_IMPORTED_MODULE_0__.current[_symbols_js__WEBPACK_IMPORTED_MODULE_1__.hookSymbol];
  
  let hook = hooks.get(id);
  if(!hook) {
    hook = new Hook(id, _interface_js__WEBPACK_IMPORTED_MODULE_0__.current, ...args);
    hooks.set(id, hook);
  }

  return hook.update(...args);
}

function hook(Hook) {
  return use.bind(null, Hook);
}



/***/ }),

/***/ "./node_modules/haunted/lib/interface.js":
/*!***********************************************!*\
  !*** ./node_modules/haunted/lib/interface.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear": () => (/* binding */ clear),
/* harmony export */   "current": () => (/* binding */ current),
/* harmony export */   "setCurrent": () => (/* binding */ setCurrent),
/* harmony export */   "notify": () => (/* binding */ notify)
/* harmony export */ });
let current;
let currentId = 0;

function setCurrent(element) {
  current = element;
}

function clear() {
  current = null;
  currentId = 0;
}

function notify() {
  let id = currentId;
  currentId++;
  return id;
}



/***/ }),

/***/ "./node_modules/haunted/lib/lit-haunted.js":
/*!*************************************************!*\
  !*** ./node_modules/haunted/lib/lit-haunted.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "component": () => (/* binding */ component),
/* harmony export */   "createContext": () => (/* binding */ createContext),
/* harmony export */   "virtual": () => (/* binding */ virtual),
/* harmony export */   "html": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_0__.html),
/* harmony export */   "render": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/lit-html.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core.js */ "./node_modules/haunted/lib/core.js");
/* harmony import */ var _virtual_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./virtual.js */ "./node_modules/haunted/lib/virtual.js");




const { Container, component, createContext } = (0,_core_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
  render(what, where) {
    (0,lit_html__WEBPACK_IMPORTED_MODULE_0__.render)(what, where);
  }
});

const virtual = (0,_virtual_js__WEBPACK_IMPORTED_MODULE_2__.makeVirtual)(Container);



/***/ }),

/***/ "./node_modules/haunted/lib/symbols.js":
/*!*********************************************!*\
  !*** ./node_modules/haunted/lib/symbols.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "phaseSymbol": () => (/* binding */ phaseSymbol),
/* harmony export */   "hookSymbol": () => (/* binding */ hookSymbol),
/* harmony export */   "updateSymbol": () => (/* binding */ updateSymbol),
/* harmony export */   "commitSymbol": () => (/* binding */ commitSymbol),
/* harmony export */   "effectsSymbol": () => (/* binding */ effectsSymbol),
/* harmony export */   "contextSymbol": () => (/* binding */ contextSymbol),
/* harmony export */   "contextEvent": () => (/* binding */ contextEvent)
/* harmony export */ });
const symbolFor = typeof Symbol === 'function' ? Symbol.for : str => str;

const phaseSymbol = symbolFor('haunted.phase');
const hookSymbol = symbolFor('haunted.hook');

const updateSymbol = symbolFor('haunted.update');
const commitSymbol = symbolFor('haunted.commit');
const effectsSymbol = symbolFor('haunted.effects');
const contextSymbol = symbolFor('haunted.context');

const contextEvent = 'haunted.context'; 


/***/ }),

/***/ "./node_modules/haunted/lib/use-callback.js":
/*!**************************************************!*\
  !*** ./node_modules/haunted/lib/use-callback.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* binding */ useCallback)
/* harmony export */ });
/* harmony import */ var _use_memo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-memo.js */ "./node_modules/haunted/lib/use-memo.js");


const useCallback = (fn, inputs) => (0,_use_memo_js__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => fn, inputs);




/***/ }),

/***/ "./node_modules/haunted/lib/use-context.js":
/*!*************************************************!*\
  !*** ./node_modules/haunted/lib/use-context.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useContext": () => (/* binding */ useContext)
/* harmony export */ });
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbols.js */ "./node_modules/haunted/lib/symbols.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");
/* harmony import */ var _use_effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-effect.js */ "./node_modules/haunted/lib/use-effect.js");




function setContexts(el, consumer) {
  if(!(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextSymbol in el)) {
    el[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextSymbol] = [];
  }
  el[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextSymbol].push(consumer);
}

const useContext = (0,_hook_js__WEBPACK_IMPORTED_MODULE_1__.hook)(class extends _hook_js__WEBPACK_IMPORTED_MODULE_1__.Hook {
  constructor(id, el) {
    super(id, el);
    setContexts(el, this);
    this._updater = this._updater.bind(this);
    this._ranEffect = false;
    this._unsubscribe = null;
    (0,_use_effect_js__WEBPACK_IMPORTED_MODULE_2__.setEffects)(el, this);
  }

  update(Context) {
    if (this.el.virtual) {
      throw new Error('can\'t be used with virtual components');
    }

    if (this.Context !== Context) {
      this._subscribe(Context);
      this.Context = Context;
    }

    return this.value;
  }

  call() {
    if(!this._ranEffect) {
      this._ranEffect = true;
      if(this._unsubscribe) this._unsubscribe();
      this._subscribe(this.Context);
      this.el.update();
    }
  }

  _updater(value) {
    this.value = value;
    this.el.update();
  }

  _subscribe(Context) {
    const detail = { Context, callback: this._updater };

    this.el.host.dispatchEvent(new CustomEvent(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.contextEvent, {
      detail, // carrier
      bubbles: true, // to bubble up in tree
      cancelable: true, // to be able to cancel
      composed: true, // to pass ShadowDOM boundaries
    }));

    const { unsubscribe, value } = detail;

    this.value = unsubscribe ? value : Context.defaultValue;

    this._unsubscribe = unsubscribe;
  }

  teardown() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
});




/***/ }),

/***/ "./node_modules/haunted/lib/use-effect.js":
/*!************************************************!*\
  !*** ./node_modules/haunted/lib/use-effect.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setEffects": () => (/* binding */ setEffects),
/* harmony export */   "useEffect": () => (/* binding */ useEffect)
/* harmony export */ });
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./symbols.js */ "./node_modules/haunted/lib/symbols.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");



function setEffects(el, cb) {
  if(!(_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol in el)) {
    el[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol] = [];
  }
  el[_symbols_js__WEBPACK_IMPORTED_MODULE_0__.effectsSymbol].push(cb);
}

const useEffect = (0,_hook_js__WEBPACK_IMPORTED_MODULE_1__.hook)(class extends _hook_js__WEBPACK_IMPORTED_MODULE_1__.Hook {
  constructor(id, el) {
    super(id, el);
    this.values = false;
    setEffects(el, this);
  }

  update(callback, values) {
    this.callback = callback;
    this.lastValues = this.values;
    this.values = values;
  }

  call() {
    if(this.values) {
      if(this.hasChanged()) {
        this.run();
      }
    } else {
      this.run();
    }
  }

  run() {
    this.teardown();
    this._teardown = this.callback.call(this.el);
  }

  teardown() {
    if(this._teardown) {
      this._teardown();
    }
  }

  hasChanged() {
    return this.lastValues === false || this.values.some((value, i) => this.lastValues[i] !== value);
  }
});



/***/ }),

/***/ "./node_modules/haunted/lib/use-memo.js":
/*!**********************************************!*\
  !*** ./node_modules/haunted/lib/use-memo.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useMemo": () => (/* binding */ useMemo)
/* harmony export */ });
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");


const useMemo = (0,_hook_js__WEBPACK_IMPORTED_MODULE_0__.hook)(class extends _hook_js__WEBPACK_IMPORTED_MODULE_0__.Hook {
  constructor(id, el, fn, values) {
    super(id, el);
    this.value = fn();
    this.values = values;
  }

  update(fn, values) {
    if(this.hasChanged(values)) {
      this.values = values;
      this.value = fn();
    }
    return this.value;
  }

  hasChanged(values) {
    return values.some((value, i) => this.values[i] !== value);
  }
});



/***/ }),

/***/ "./node_modules/haunted/lib/use-reducer.js":
/*!*************************************************!*\
  !*** ./node_modules/haunted/lib/use-reducer.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useReducer": () => (/* binding */ useReducer)
/* harmony export */ });
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");


const useReducer = (0,_hook_js__WEBPACK_IMPORTED_MODULE_0__.hook)(class extends _hook_js__WEBPACK_IMPORTED_MODULE_0__.Hook {
  constructor(id, el, _, initialState) {
    super(id, el);
    this.dispatch = this.dispatch.bind(this);
    this.state = initialState;
  }

  update(reducer) {
    this.reducer = reducer;
    return [this.state, this.dispatch];
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.el.update();
  }
});



/***/ }),

/***/ "./node_modules/haunted/lib/use-ref.js":
/*!*********************************************!*\
  !*** ./node_modules/haunted/lib/use-ref.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRef": () => (/* binding */ useRef)
/* harmony export */ });
/* harmony import */ var _use_memo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-memo.js */ "./node_modules/haunted/lib/use-memo.js");


const useRef = (initialValue) => {
    return (0,_use_memo_js__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        return {
            current: initialValue
        };
    }, []);
}



/***/ }),

/***/ "./node_modules/haunted/lib/use-state.js":
/*!***********************************************!*\
  !*** ./node_modules/haunted/lib/use-state.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useState": () => (/* binding */ useState)
/* harmony export */ });
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook.js */ "./node_modules/haunted/lib/hook.js");


const useState = (0,_hook_js__WEBPACK_IMPORTED_MODULE_0__.hook)(class extends _hook_js__WEBPACK_IMPORTED_MODULE_0__.Hook {
  constructor(id, el, initialValue) {
    super(id, el);
    this.updater = this.updater.bind(this);

    if(typeof initialValue === 'function') {
      initialValue = initialValue();
    }

    this.makeArgs(initialValue);
  }

  update() {
    return this.args;
  }

  updater(value) {
    if (typeof value === "function") {
      const updaterFn = value;
      const [previousValue] = this.args;
      value = updaterFn(previousValue);
    }

    this.makeArgs(value);
    this.el.update();
  }

  makeArgs(value) {
    this.args = Object.freeze([value, this.updater]);
  }
});




/***/ }),

/***/ "./node_modules/haunted/lib/virtual.js":
/*!*********************************************!*\
  !*** ./node_modules/haunted/lib/virtual.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeVirtual": () => (/* binding */ makeVirtual)
/* harmony export */ });
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/lit-html.js");


const includes = Array.prototype.includes;

function makeVirtual(Container) {
  const partToContainer = new WeakMap();
  const containerToPart = new WeakMap();
  
  class DirectiveContainer extends Container {
    constructor(renderer, part) {
      super(renderer, part);
      this.virtual = true;
    }
  
    commit(result) {
      this.host.setValue(result);
      this.host.commit();
    }
  
    teardown() {
      super.teardown();
      let part = containerToPart.get(this);
      partToContainer.delete(part);
    }
  }
  
  function virtual(renderer) {
    function factory(...args) {
      return part => {
        let cont = partToContainer.get(part);
        if(!cont) {
          cont = new DirectiveContainer(renderer, part);
          partToContainer.set(part, cont);
          containerToPart.set(cont, part);
          teardownOnRemove(cont, part);
        }
        cont.args = args;
        cont.update();
      };
    }
  
    return (0,lit_html__WEBPACK_IMPORTED_MODULE_0__.directive)(factory);
  }

  return virtual;
}

function teardownOnRemove(cont, part, node = part.startNode) {
  let frag = node.parentNode;
  let mo = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      if(includes.call(mutation.removedNodes, node)) {
        mo.disconnect();

        if(node.parentNode instanceof ShadowRoot) {
          teardownOnRemove(cont, part);
        } else {
          cont.teardown();
        }
        break;
      } else if(includes.call(mutation.addedNodes, node.nextSibling)) {
        mo.disconnect();
        teardownOnRemove(cont, part, node.nextSibling);
        break;
      }
    }
  });
  mo.observe(frag, { childList: true });
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _start__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./start */ "./src/start.js");
/* harmony import */ var _FullName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FullName */ "./src/FullName.js");


})();

/******/ })()
;