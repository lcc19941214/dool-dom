/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RenderDOM = __webpack_require__(1);

var _RenderDOM2 = _interopRequireDefault(_RenderDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderDOM = _RenderDOM2.default.renderDOM;

var Element = function () {
  _createClass(Element, null, [{
    key: 'createElement',
    value: function createElement() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Element, [null].concat(args)))();
    }
  }]);

  function Element(tagName, props) {
    _classCallCheck(this, Element);

    this.tagName = tagName;
    this.props = props || {};

    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }

    this.children = children;
  }

  _createClass(Element, [{
    key: 'render',
    value: function render() {
      return Element.render(this);
    }
  }]);

  return Element;
}();

Element.render = function (element) {
  return renderDOM(element);
};

exports.default = Element;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _Element = __webpack_require__(0);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderDOM = function () {
  function RenderDOM() {
    _classCallCheck(this, RenderDOM);
  }

  _createClass(RenderDOM, null, [{
    key: 'render',

    /**
     * render Element instance to real DOM node, and attach it
     * to given DOMNode
     * @param {[Element]} element
     * @param {[HTMLElement]} DOMNode
     */
    value: function render(element, DOMNode) {
      var elem = RenderDOM.renderDOM(element);
      var DOMElement = _utils2.default.isElement(DOMNode) ? DOMNode : document.body;
      DOMElement.appendChild(elem);
      return elem;
    }

    /**
     * render Element instance to real DOM node.
     * this method receives params of any types and transform them
     * to HTMLElement or Comment
     * @param {[Element, string, number, array, undefined]} element
     */

  }, {
    key: 'renderDOM',
    value: function renderDOM(element) {
      var elem = void 0;
      if (element instanceof _Element2.default) {
        elem = RenderDOM.renderElement(element);
      } else {
        elem = RenderDOM.renderWithTypeCheck(element);
      }
      return elem;
    }
  }, {
    key: 'renderElement',
    value: function renderElement() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _element$tagName = element.tagName,
          tagName = _element$tagName === undefined ? '' : _element$tagName;

      var props = element.props || {};
      var children = elem.children || [];
      var elem = void 0;
      try {
        elem = document.createElement(tagName);
        Object.keys(props).forEach(function (name) {
          var value = props[name];
          elem.setAttribute(name, value);
        });

        children.forEach(function (child) {
          var childEl = RenderDOM.renderDOM(child);
          elem.appendChild(childEl);
        });
      } catch (error) {
        elem = RenderDOM.renderUnknownNode();
      }
      return elem;
    }
  }, {
    key: 'renderWithTypeCheck',
    value: function renderWithTypeCheck(element) {
      var elem = void 0;
      if (_utils2.default.isArray(element)) {
        elem = RenderDOM.renderArray(element);
      } else if (_utils2.default.isString(element) || !Number.isNaN(element) && _utils2.default.isNumber(element)) {
        elem = document.createTextNode(element);
      } else if (_utils2.default.isNull(element) || _utils2.default.isUndef(element)) {
        elem = RenderDOM.renderEmptyNode();
      } else if (_utils2.default.isObject(element)) {
        elem = RenderDOM.renderObject();
      } else {
        elem = RenderDOM.renderUnknownNode();
      }
      return elem;
    }
  }, {
    key: 'renderObject',
    value: function renderObject() {
      console.warn('child is supposed to be undefined, null, string, array or Element instance, but got an object');
      return RenderDOM.renderUnknownNode();
    }
  }, {
    key: 'renderArray',
    value: function renderArray(child) {
      var elem = document.createDocumentFragment();
      child.forEach(function (subChild) {
        var subElem = RenderDOM.renderDOM(subChild);
        elem.appendChild(subElem);
      });
      return elem;
    }
  }, {
    key: 'renderEmptyNode',
    value: function renderEmptyNode() {
      return document.createComment('empty node');
    }
  }, {
    key: 'renderUnknownNode',
    value: function renderUnknownNode() {
      return document.createComment('unknown node');
    }
  }]);

  return RenderDOM;
}();

exports.default = RenderDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderDOM = exports.Element = undefined;

var _Element = __webpack_require__(0);

var _Element2 = _interopRequireDefault(_Element);

var _RenderDOM = __webpack_require__(1);

var _RenderDOM2 = _interopRequireDefault(_RenderDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Element = _Element2.default;
exports.RenderDOM = _RenderDOM2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeCheck = __webpack_require__(4);

var _typeCheck2 = _interopRequireDefault(_typeCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _typeCheck2.default);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var typeCheck = {
  isString: function isString(str) {
    return typeof str === 'string';
  },

  isNumber: function isNumber(num) {
    return typeof num === 'number';
  },

  isArray: function isArray(arr) {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else {
      return arr instanceof Array;
    }
  },

  isFunc: function isFunc(fn) {
    return typeof fn === 'function';
  },

  isNull: function isNull(val) {
    return val === null;
  },

  isUndef: function isUndef(val) {
    return val === undefined;
  },

  isObject: function isObject(obj) {
    return !typeCheck.isNull(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },

  isEmptyObject: function isEmptyObject(obj) {
    if (Object.hasOwnProperty('keys')) {
      return Object.keys(obj).length === 0;
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  },

  isNode: function isNode(node) {
    return typeCheck.isObject(Node) ? node instanceof Node : !!(node && typeCheck.isObject(node) && typeCheck.isNumber(node.nodeType) && typeCheck.isString(node.nodeName));
  },

  isElement: function isElement(elem) {
    return typeCheck.isObject(HTMLElement) ? elem instanceof HTMLElement : !!(elem && typeCheck.isObject(elem) && elem.nodeType === 1 && typeCheck.isString(elem.nodeName));
  }
};

exports.default = typeCheck;

/***/ })
/******/ ]);