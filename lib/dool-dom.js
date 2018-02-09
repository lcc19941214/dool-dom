(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dool"] = factory();
	else
		root["Dool"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeCheck = __webpack_require__(7);

var _typeCheck2 = _interopRequireDefault(_typeCheck);

var _chore = __webpack_require__(12);

var _chore2 = _interopRequireDefault(_chore);

var _tools = __webpack_require__(13);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _chore2.default, _typeCheck2.default, _tools2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _renderDOM = __webpack_require__(2);

var _renderDOM2 = _interopRequireDefault(_renderDOM);

var _key3 = __webpack_require__(3);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createDOM = _renderDOM2.default.createDOM;
var isElement = exports.isElement = function isElement(val) {
  return val instanceof Element;
};

var Element = (_temp = _class = function () {
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

    props = props || {};

    this.tagName = tagName;
    this.props = props;

    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }

    this.children = children;
    this.key = (0, _key3.checkKey)(props.key) ? props.key : void 0;

    (0, _key3.checkAndAssignChildrenKey)(this.children);
    Object.defineProperties(this, {
      $childrenKeyChecked: {
        value: true
      }
    });

    this.count = computeChildCount(children);
  }

  _createClass(Element, [{
    key: 'render',
    value: function render() {
      return Element.render(this);
    }
  }]);

  return Element;
}(), _class.render = createDOM, _temp);
exports.default = Element;


function computeChildCount(children) {
  var count = 0;
  _utils2.default.flatten(children).forEach(function (child) {
    if (isElement(child)) {
      count += child.count;
    }
    count++;
  });
  return count;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.createDOM = createDOM;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _element = __webpack_require__(1);

var _key = __webpack_require__(3);

var _property = __webpack_require__(8);

var _eventHandler = __webpack_require__(10);

var _logTipsHelper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render Element instance to real DOM node, and attach it
 * to given DOMNode
 *
 * @param {*} element
 * @param {HTMLElement} mountPoint
 * @return {HTMLElement}
 */
function render(element, mountPoint) {
  var elem = createDOM(element);
  var root = _utils2.default.isElement(mountPoint) ? mountPoint : undefined;
  if (root) {
    root.appendChild(elem);
    return elem;
  } else {
    throw new TypeError((0, _logTipsHelper.typeError)('mountPoint', 'an instance of HTMLElement', mountPoint));
  }
}

/**
 * render Element instance to real DOM node.
 * this method receives params of any types and transform them
 * to HTMLElement or Comment
 *
 * @param {*} element
 * @param {string|number} defaultKey
 * @return {HTMLElement}
 */
function createDOM(element, defaultKey) {
  if ((0, _element.isElement)(element)) {
    return createElement(element, defaultKey);
  }

  if (_utils2.default.isArray(element)) {
    return createDocumentFragment(element, defaultKey);
  }

  if (_utils2.default.isString(element) || _utils2.default.isNumber(element)) {
    return createTextNode(element, defaultKey);
  }

  if (_utils2.default.isObject(element)) {
    throw new TypeError((0, _logTipsHelper.typeError)('element', 'String, Number, Array, undefined, null or an instance of Element', element));
  }

  if (_utils2.default.isUndef(element) || _utils2.default.isBoolean(element)) {
    return createEmptyNode();
  }

  if (_utils2.default.isNull(element)) {
    return createEmptyNode();
  }

  return createUnknownNode();
}

function createElement() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultKey = arguments[1];
  var _element$tagName = element.tagName,
      tagName = _element$tagName === undefined ? '' : _element$tagName,
      _element$props = element.props,
      props = _element$props === undefined ? {} : _element$props,
      _element$key = element.key,
      key = _element$key === undefined ? defaultKey : _element$key;

  var children = element.children || [];
  var elem = void 0;
  try {
    if (tagName === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      // set to true and it does not execute
      var div = document.createElement('div');
      div.innerHTML = '<script><' + '/script>';
      elem = div.removeChild(div.firstChild);
    } else {
      elem = document.createElement(tagName);
    }

    // set key
    (0, _key.setKeyForNode)(elem, key);

    // set props
    Object.keys(props).forEach(function (name) {
      (0, _property.setValueForProperty)(elem, name, props[name]);
    });

    // set style
    (0, _property.setValueForInlineStyle)(elem, props['style']);

    // add event listeners
    (0, _eventHandler.addEventHandlerForProps)(elem, props);

    // render children
    children.forEach(function (child, idx) {
      var key = idx + 1;
      var childEl = createDOM(child, key);
      if (childEl) elem.appendChild(childEl);
    });
  } catch (error) {
    console.error(error);
  }
  return elem;
}

function createDocumentFragment(child, indexKey) {
  var elem = document.createDocumentFragment();
  child.forEach(function (subChild, idx) {
    var key = idx + 1;
    var subElem = createDOM(subChild, (0, _key.composeKey)(indexKey, key));
    if (subElem) elem.appendChild(subElem);
  });
  return elem;
}

function createTextNode(text, key) {
  var node = document.createTextNode(text);
  (0, _key.setKeyForNode)(node, key);
  return node;
}

function createEmptyNode() {
  return document.createComment(' empty node ');
}

function createUnknownNode() {
  return document.createComment(' unknown node ');
}

var RenderDOM = {
  render: render,
  createDOM: createDOM
};

if (false) {
  Object.assign(RenderDOM, {
    getElementKeyTree: _key.getElementKeyTree,
    getDOMElementKeyTree: _key.getDOMElementKeyTree,
    createElement: createElement,
    createDocumentFragment: createDocumentFragment,
    createTextNode: createTextNode,
    createEmptyNode: createEmptyNode,
    createUnknownNode: createUnknownNode
  });
}

exports.default = RenderDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDOMElementKeyTree = exports.getElementKeyTree = exports.checkAndAssignChildrenKey = exports.composeKey = exports.checkKey = exports.setKeyForNode = exports.getKeyOfNode = exports.getKeyOfElement = exports.INTERNAL_INSTANCE = exports.KEY = exports.CURRENT_HASH = undefined;

var _templateObject = _taggedTemplateLiteral(['__doolInternalKey'], ['__doolInternalKey']),
    _templateObject2 = _taggedTemplateLiteral(['__doolInternalInstance'], ['__doolInternalInstance']);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _element = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import generateHash from 'random-hash';

var CURRENT_HASH = exports.CURRENT_HASH = Math.random().toString(36).slice(2);

function hashPrefix(str) {
  return str + '$' + CURRENT_HASH;
}

var KEY = exports.KEY = hashPrefix(_templateObject);
var INTERNAL_INSTANCE = exports.INTERNAL_INSTANCE = hashPrefix(_templateObject2);

var getKeyOfElement = exports.getKeyOfElement = function getKeyOfElement(elem) {
  return elem && elem.key;
};
var getKeyOfNode = exports.getKeyOfNode = function getKeyOfNode(node) {
  return node && node[KEY];
};

var setKeyForNode = exports.setKeyForNode = function setKeyForNode(node, key) {
  if (checkKey(key)) {
    Object.defineProperty(node, KEY, {
      value: key.toString()
    });
  }
};

var checkKey = exports.checkKey = function checkKey(key) {
  return _utils2.default.isString(key) && key && key.trim() || _utils2.default.isNumber(key);
};

var composeKey = exports.composeKey = function composeKey() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (v) {
    return v;
  }).join('/');
};

/**
 * Check if every child has a key, if not, assign the key with child index.
 * If the child is in an array, default key will be set with `composeKey`
 * @param {array} children
 * @param {string} prefix
 */
var checkAndAssignChildrenKey = exports.checkAndAssignChildrenKey = function checkAndAssignChildrenKey(children) {
  for (var _len2 = arguments.length, prefix = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    prefix[_key2 - 1] = arguments[_key2];
  }

  if (!_utils2.default.isArray(children)) return;

  children.forEach(function (child, idx) {
    if (_utils2.default.isArray(child)) {
      checkAndAssignChildrenKey(child, idx + 1);
      return;
    }

    if ((0, _element.isElement)(child)) {
      // if key of element is undefined, set key to index as default value
      // if element is one of an array, must set key with prefix
      if (_utils2.default.isUndef(child.key)) {
        var key = idx + 1;
        child.key = prefix.length ? composeKey.apply(undefined, prefix.concat([key])) : key;

        // if children has already checked element child, just skip it
        if (child.$childrenKeyChecked) return;
        if (child.children && child.children.length) {
          checkAndAssignChildrenKey(child.children);
        }
      }
    }
  });
};

// export const setInternalInstance = (node, element) => {
//   Object.defineProperty(node, INTERNAL_INSTANCE, {
//     value: _.createFrozenObject(element)
//   });
// };

/**
 * deeply iterate given root and print key of all elements
 */
var getElementKeyTree = exports.getElementKeyTree = function getElementKeyTree(root) {
  var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (false) {
    var str = '';
    var print = function print(elem, indent) {
      var key = elem.key,
          _elem$children = elem.children,
          children = _elem$children === undefined ? [] : _elem$children;

      log && console.log(indent + key);
      str += indent + key + '\n';
      children.length && walkChildren(children, indent);
    };

    var walkChildren = function walkChildren(children, indent) {
      children.forEach(function (child) {
        if ((0, _element.isElement)(child)) {
          print(child, indent + '  ');
        } else if (_utils2.default.isArray(child)) {
          walkChildren(child, indent);
        }
      });
    };

    print(root, '');
    return str;
  }
};

/**
 * deeply iterate given root and print key of all DOM Element
 */
var getDOMElementKeyTree = exports.getDOMElementKeyTree = function getDOMElementKeyTree(root) {
  var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (false) {
    var str = '';
    var print = function print(elem, indent) {
      var key = elem[KEY];

      log && console.log(indent + key);
      str += indent + key + '\n';
      var children = [].concat(_toConsumableArray(elem.children));
      children.length && children.forEach(function (child) {
        print(child, indent + '  ');
      });
    };

    print(root, '');
    return str;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIFFERENT_NAME_PROPS_MAP = exports.DIFFERENT_NAME_PROPS = exports.isEventHandler = exports.EVENT_HANDLER_PROP = exports.BOOLEAN = exports.ATTR = exports.RESERVED = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.shouldIgnoreProperty = shouldIgnoreProperty;
exports.shouldRemoveProperty = shouldRemoveProperty;
exports.shouldSetValueForPropertyWithWarning = shouldSetValueForPropertyWithWarning;
exports.getPropertyInfo = getPropertyInfo;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// propertyInfo type
// reserved properties that will be ignored when set property value
var RESERVED = exports.RESERVED = 0;

// normal ones
var ATTR = exports.ATTR = 1;

// this type works for HTML properties which comes info effect with only
// property name, despite the value is true, false or any other values
var BOOLEAN = exports.BOOLEAN = 2;

var EVENT_HANDLER_PROP = exports.EVENT_HANDLER_PROP = /^on([A-Z][a-z]+)+$/;
var isEventHandler = exports.isEventHandler = function isEventHandler(name) {
  return name.length > 2 && EVENT_HANDLER_PROP.test(name);
};

function shouldIgnoreProperty() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments[1];
  var propertyInfo = arguments[2];

  if (propertyInfo) {
    if (propertyInfo.type === RESERVED) {
      return true;
    }
  }

  // event handler
  if (isEventHandler(name)) {
    return true;
  }

  return false;
}

// eslint-disable-next-line no-unused-vars
function shouldRemoveProperty() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments[1];
  var propertyInfo = arguments[2];

  if (value === null || _utils2.default.isUndef(value)) {
    return true;
  }

  return false;
}

function shouldSetValueForPropertyWithWarning(name) {
  return DIFFERENT_NAME_PROPS.some(function (group) {
    return group[1] === name;
  });
}

/**
 * @param {string} name
 * @param {boolean} allowDefault - as Dool does not contains all the HTML properties
 *  like react does, use this param to make a default property info
 *  @see https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/DOMProperty.js#L147
 * @return {PropertyInfo} PropertyInfo
 */
function getPropertyInfo() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var allowDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return properties[name] || (allowDefault ? new PropertyInfo(name, name.toLowerCase(), ATTR, false) : null);
}

var properties = {};

var PropertyInfo =
/**
 * @param {string} name
 * @param {string} propertyName
 * @param {number} type
 * @param {boolean} useProperty
 */
function PropertyInfo(name, propertyName, type, useProperty) {
  _classCallCheck(this, PropertyInfo);

  this.name = name;
  this.propertyName = propertyName;
  this.type = type;
  this.useProperty = useProperty;
};

// reserved properties


['style', 'key'].forEach(function (name) {
  properties[name] = new PropertyInfo(name, name, RESERVED, false);
});

var DIFFERENT_NAME_PROPS = exports.DIFFERENT_NAME_PROPS = [['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']];

var DIFFERENT_NAME_PROPS_MAP = {};
DIFFERENT_NAME_PROPS.forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      prefer = _ref2[0],
      deprecated = _ref2[1];

  DIFFERENT_NAME_PROPS_MAP[deprecated] = prefer;
});
exports.DIFFERENT_NAME_PROPS_MAP = DIFFERENT_NAME_PROPS_MAP;

// properties may have different name

DIFFERENT_NAME_PROPS.forEach(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      name = _ref4[0],
      propertyName = _ref4[1];

  properties[name] = new PropertyInfo(name, propertyName, ATTR, false);
});

// properties must use DOM property instead of attribute
['checked', 'multiple', 'muted', 'selected'].forEach(function (name) {
  properties[name] = new PropertyInfo(name, name, BOOLEAN, true);
});

// properties are HTML boolean attributes.
['allowFullScreen', 'async', 'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', 'itemScope'].forEach(function (name) {
  properties[name] = new PropertyInfo(name, name.toLowerCase(), BOOLEAN, false);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @param {string} key - target name
 * @param {string} accept - accept types
 * @param {any} target
 * @example key should be accept, but got [object Target]
 */
var typeError = exports.typeError = function typeError(key, accept, target) {
  var text = '%s should be %s, but got %s';
  var index = 0;
  var arr = [key, accept, target == null ? String(target) : Object.prototype.toString.call(target)];
  var str = text.replace(/%s/g, function () {
    return arr[index++];
  });
  return str;
};

/**
 * @link typeError
 */
var checkTypeErrorWithWarning = exports.checkTypeErrorWithWarning = function checkTypeErrorWithWarning() {
  console.warn(typeError.apply(undefined, arguments));
};

var preservedPropertyWarning = exports.preservedPropertyWarning = function preservedPropertyWarning(target, prop) {
  console.warn('%s is preserved, your declaration will be skipped', prop, target);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REPLACE = exports.REPLACE = 'replace';

var PROPS = exports.PROPS = 'props';

var REORDER = exports.REORDER = 'reorder';

var TEXT = exports.TEXT = 'text';

var REORDER_REMOVE = exports.REORDER_REMOVE = 'remove';

var REORDER_INSERT = exports.REORDER_INSERT = 'insert';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPES = {};

'Boolean Number String Function Array Date RegExp Object Symbol Map Set'.split(' ').forEach(function (item) {
  TYPES['[object ' + item + ']'] = item.toLowerCase();
});

function type(obj) {
  return obj == null ? String(obj) : TYPES[Object.prototype.toString.call(obj)] || 'object';
}

var typeCheck = {
  isString: function isString(obj) {
    return type(obj) === 'string';
  },

  isNumber: function isNumber(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
  },

  isBoolean: function isBoolean(obj) {
    return type(obj) === 'boolean';
  },

  isFunction: function isFunction(obj) {
    return type(obj) === 'function';
  },

  isFunc: function isFunc(obj) {
    return typeCheck.isFunction(obj);
  },

  isArray: function isArray(obj) {
    return type(obj) === 'array';
  },

  isObject: function isObject(obj) {
    return type(obj) === 'object';
  },

  isRegExp: function isRegExp(obj) {
    return type(obj) === 'regexp';
  },

  isDate: function isDate(obj) {
    return type(obj) === 'date';
  },

  isNull: function isNull(obj) {
    return type(obj) === 'null';
  },

  isUndef: function isUndef(obj) {
    return type(obj) === 'undefined';
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setValueForInlineStyle = exports.setValueForProperty = undefined;

var _DOMPropertyOperation = __webpack_require__(14);

exports.setValueForProperty = _DOMPropertyOperation.setValueForProperty;
exports.setValueForInlineStyle = _DOMPropertyOperation.setValueForInlineStyle;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.checkStyleType = checkStyleType;
exports.shouldIgnoreStyle = shouldIgnoreStyle;
exports.shouldRemoveStyle = shouldRemoveStyle;
exports.getStyleInfo = getStyleInfo;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _logTipsHelper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function checkStyleType(style) {
  if (_utils2.default.isUndef(style) || _utils2.default.isNull(style)) {
    style = {};
  }

  if (!_utils2.default.isObject(style)) {
    (0, _logTipsHelper.checkTypeErrorWithWarning)('style', 'Object, null or undefined', style);
    return;
  }

  return style;
}

function shouldIgnoreStyle(name, value) {
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'function':
    case 'symbol':
    case 'object':
      return true;
    default:
  }

  return false;
}

// eslint-disable-next-line no-unused-vars
function shouldRemoveStyle() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments[1];
  var propertyInfo = arguments[2];

  if (value === null || _utils2.default.isUndef(value)) {
    return true;
  }

  return false;
}

/**
 * @param {string} name
 * @param {boolean} allowDefault
 * @return {.PropertyInfo} PropertyInfo
 */
function getStyleInfo() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var allowDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return styles[name] || (allowDefault ? new PropertyInfo(name, _utils2.default.transformUpperWithHyphen(name)) : null);
}

var styles = {};

var PropertyInfo =
/**
 * @param {string} name
 * @param {string} propertyName
 * @param {number} type
 */
function PropertyInfo(name, propertyName, type) {
  _classCallCheck(this, PropertyInfo);

  this.name = name;
  this.propertyName = propertyName;
  this.type = type;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.addEventHandlerForProps = addEventHandlerForProps;
exports.updateEventHandler = updateEventHandler;

var _DOMProperty = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _logTipsHelper = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEventName = function getEventName(handlerName) {
  return handlerName.replace(_DOMProperty.EVENT_HANDLER_PROP, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args[1].toLowerCase();
  });
};

function addEventListener(elem, event, handler) {
  elem.addEventListener(event, handler, false);
}

function removeEventListener(elem, event, handler) {
  elem.removeEventListener(event, handler, false);
}

function addEventHandlerForProps(elem, props) {
  if (!props) return;

  Object.keys(props).forEach(function (name) {
    var handler = props[name];
    if ((0, _DOMProperty.isEventHandler)(name)) {
      if (_utils2.default.isFunc(handler)) {
        addEventListener(elem, getEventName(name), handler);
      } else {
        (0, _logTipsHelper.checkTypeErrorWithWarning)('The value of ' + name, 'Function', handler);
      }
    }
  });
}

function updateEventHandler(elem, props) {
  var oldHandlers = {};
  var newHandlers = {};

  Object.keys(props).forEach(function (name) {
    var _props$name = props[name],
        oldHandler = _props$name.oldHandler,
        newHandler = _props$name.newHandler;

    oldHandlers[name] = oldHandler;
    newHandlers[name] = newHandler;
  });

  Object.keys(oldHandlers).forEach(function (name) {
    removeEventListener(elem, getEventName(name), oldHandlers[name]);
  });

  addEventHandlerForProps(elem, newHandlers);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.diff = exports.RenderDOM = exports.Element = undefined;

var _element = __webpack_require__(1);

var _element2 = _interopRequireDefault(_element);

var _renderDOM = __webpack_require__(2);

var _renderDOM2 = _interopRequireDefault(_renderDOM);

var _diff = __webpack_require__(15);

var _diff2 = _interopRequireDefault(_diff);

var _update = __webpack_require__(19);

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Element = _element2.default;
exports.RenderDOM = _renderDOM2.default;
exports.diff = _diff2.default;
exports.update = _update2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var chore = {
  /**
   * @example backgroundColor => background-color
   */
  transformUpperWithHyphen: function transformUpperWithHyphen() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.replace(/[A-Z]/g, function () {
      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      return '-' + arg[0].toLowerCase();
    });
  },
  /**
   * @example background-color => backgroundColor
   */
  transformHyphenWithUpper: function transformHyphenWithUpper() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return str.replace(/-[a-z]/g, function () {
      for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arg[_key2] = arguments[_key2];
      }

      return arg[0].slice(1).toUpperCase();
    });
  }
};

exports.default = chore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeCheck = __webpack_require__(7);

var _typeCheck2 = _interopRequireDefault(_typeCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tools = {
  createFrozenObject: function createFrozenObject(val) {
    var obj = _extends({}, val);
    Object.freeze(obj);
    return obj;
  },

  /**
   * flatten given array with specific level
   * @param {array} array
   * @param {number|boolean} [level=1] when level is true, means flatten iteratively
   * @example
   * flatten([1, [2, [3]]]) => [1, 2, [3]]
   * flatten([1, [2, [3]]], true) => [1, 2, 3]
   */
  flatten: function flatten(array) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var deep = -1;

    if (_typeCheck2.default.isBoolean(level)) {
      level = level || 1;
    } else if (!_typeCheck2.default.isNumber(level) || level < 0) {
      level = 1;
    }

    function _flatten(array, deep) {
      if (level !== true && deep === level) {
        return [array];
      }

      if (!_typeCheck2.default.isArray(array)) return array;
      var rst = [];

      array.forEach(function (x) {
        if (_typeCheck2.default.isArray(x)) {
          rst = rst.concat(_flatten(x, deep + 1));
        } else {
          rst.push(x);
        }
      });

      return rst;
    }

    return _flatten(array, deep);
  }
};

window.flatten = tools.flatten;

exports.default = tools;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setValueForProperty = setValueForProperty;
exports.setValueForInlineStyle = setValueForInlineStyle;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _DOMProperty = __webpack_require__(4);

var _CSSStyle = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {DOMElement} elem
 * @param {string} name
 * @param {*} value
 */
function setValueForProperty(elem, name, value) {
  var propertyInfo = (0, _DOMProperty.getPropertyInfo)(name);

  if (!propertyInfo) return;

  if ((0, _DOMProperty.shouldIgnoreProperty)(name, value, propertyInfo)) return;
  if ((0, _DOMProperty.shouldRemoveProperty)(name, value, propertyInfo)) value = null;

  var propertyName = propertyInfo.propertyName,
      type = propertyInfo.type,
      useProperty = propertyInfo.useProperty;


  if (true) {
    if ((0, _DOMProperty.shouldSetValueForPropertyWithWarning)(name, value, propertyInfo)) {
      console.warn('%s is not deprecated, use %s instead', name, _DOMProperty.DIFFERENT_NAME_PROPS_MAP[name]);
    }
  }

  // properties
  if (useProperty) {
    if (value === null) {
      elem[propertyName] = false;
    } else {
      elem[propertyName] = value;
    }
    return;
  }

  // attributes
  if (value === null) {
    elem.removeAttribute(propertyName);
  } else {
    if (type === _DOMProperty.BOOLEAN) {
      value = '';
    } else {
      value = '' + value;
    }

    elem.setAttribute(propertyName, value);
  }
}

function setValueForInlineStyle(elem, style) {
  style = (0, _CSSStyle.checkStyleType)(style, elem);
  if (!style) return;

  var styleStr = '';
  Object.keys(style).forEach(function (name) {
    var value = style[name];
    var propertyInfo = (0, _CSSStyle.getStyleInfo)(name);

    if (!propertyInfo) return;
    if ((0, _CSSStyle.shouldIgnoreStyle)(name, value, propertyInfo)) return;
    if ((0, _CSSStyle.shouldRemoveStyle)(name, value, propertyInfo)) {
      elem.style[name] = null;
      return;
    }

    var propertyName = propertyInfo.propertyName;

    styleStr += propertyName + ': ' + value + '; ';
  });
  if (styleStr) {
    elem.setAttribute('style', styleStr.trim());
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _diff = __webpack_require__(16);

var _diff2 = _interopRequireDefault(_diff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _diff2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _patches = __webpack_require__(6);

var PATCHES = _interopRequireWildcard(_patches);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _element = __webpack_require__(1);

var _propsDiff = __webpack_require__(17);

var _propsDiff2 = _interopRequireDefault(_propsDiff);

var _listDiff = __webpack_require__(18);

var _listDiff2 = _interopRequireDefault(_listDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {Element} oldTree
 * @param {Element} newTree
 * @returns {Object}
 */
function diff(oldTree, newTree) {
  var index = 0;
  var patches = {};
  diffWalk(oldTree, newTree, index, patches);
  return patches;
}

function diffWalk(oldElem, newElem, index, patches) {
  var currentPatch = [];

  if (newElem === _listDiff.NULL_ELEMENT) {
    // did nothing here
    // oldElem will be removed when compare with patches of itself
  } else if ((_utils2.default.isString(oldElem) || _utils2.default.isNumber(oldElem)) && (_utils2.default.isString(newElem) || _utils2.default.isNumber(newElem))) {
    // use loose equal to let string match number string
    if (oldElem != newElem) {
      currentPatch.push({ type: PATCHES.TEXT, payload: newElem });
    }
  } else if ((0, _element.isElement)(oldElem) && (0, _element.isElement)(newElem) && oldElem.tagName === newElem.tagName && oldElem.key === newElem.key) {
    var propsPatches = (0, _propsDiff2.default)(oldElem, newElem);
    if (propsPatches) {
      currentPatch.push({ type: PATCHES.PROPS, payload: propsPatches });
    }
    diffChildren(oldElem.children, newElem.children, index, patches, currentPatch);
  } else {
    // TODO:
    // null, undefined will still be render as new comment node
    currentPatch.push({ type: PATCHES.REPLACE, payload: newElem });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  oldChildren = _utils2.default.flatten(oldChildren, true);
  newChildren = _utils2.default.flatten(newChildren, true);

  var listDiffs = (0, _listDiff2.default)(oldChildren, newChildren);
  var nextChildren = listDiffs.children,
      moves = listDiffs.moves;

  if (moves.length) {
    currentPatch.push({ type: PATCHES.REORDER, payload: moves });
  }

  var currentIndex = index;
  var leftNode = null;
  oldChildren.forEach(function (child, idx) {
    currentIndex = leftNode && leftNode.count ? currentIndex + leftNode.count + 1 : currentIndex + 1;
    var newChild = nextChildren[idx];
    diffWalk(child, newChild, currentIndex, patches);
    leftNode = child;
  });
}

exports.default = diff;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = propsDiff;

var _DOMProperty = __webpack_require__(4);

var _CSSStyle = __webpack_require__(9);

function diffObject(pre, next) {
  var diffs = {};
  Object.keys(pre).forEach(function (key) {
    if (pre[key] !== next[key]) {
      diffs[key] = next[key];
    }
  });

  Object.keys(next).forEach(function (key) {
    if (!pre.hasOwnProperty(key)) {
      diffs[key] = next[key];
    }
  });
  return diffs;
}

function diffEventHandler(preProps, nextProps) {
  var preHandlers = {};
  var nextHandlers = {};

  [[preProps, preHandlers], [nextProps, nextHandlers]].forEach(function (v) {
    var _v = _slicedToArray(v, 2),
        props = _v[0],
        handlers = _v[1];

    Object.keys(props).forEach(function (name) {
      if ((0, _DOMProperty.isEventHandler)(name)) handlers[name] = props[name];
    });
  });

  var diffs = {};

  Object.keys(preHandlers).forEach(function (key) {
    if (preHandlers[key] !== nextHandlers[key]) {
      diffs[key] = {
        newHandler: nextHandlers[key],
        oldHandler: preHandlers[key]
      };
    }
  });

  Object.keys(nextHandlers).forEach(function (key) {
    if (!preHandlers.hasOwnProperty(key)) {
      diffs[key] = {
        newHandler: nextHandlers[key]
      };
    }
  });

  return diffs;
}

function diffStyle(preProps, nextProps) {
  var _preProps$style = preProps.style,
      pre = _preProps$style === undefined ? {} : _preProps$style;
  var _nextProps$style = nextProps.style,
      next = _nextProps$style === undefined ? {} : _nextProps$style;

  // if next style is not valid, return undefined.
  // thus pre style rules would be all removed.

  next = (0, _CSSStyle.checkStyleType)(next);
  if (!next) return;

  // TODO:
  // handle ES5 Object.keys TypeError

  var diffs = diffObject(pre, next);

  if (!Object.keys(diffs).length) {
    return null;
  }

  return diffs;
}

function diffProps(preProps, nextProps) {
  var props = diffObject(preProps, nextProps);
  var diffs = {};

  /**
   * do not check whether the prop should be removed here,
   * `setValueForProperty` will handle this
   *
   * a little bit verbose
   */
  Object.keys(props).forEach(function (name) {
    var value = props[name];
    var propertyInfo = (0, _DOMProperty.getPropertyInfo)(name);
    if (!propertyInfo) return;

    if ((0, _DOMProperty.shouldIgnoreProperty)(name, value, propertyInfo)) return;
    diffs[name] = value;
  });

  var styleDiffs = diffStyle(preProps, nextProps);
  if (styleDiffs) diffs.style = styleDiffs;

  var eventHandlerDiffs = diffEventHandler(preProps, nextProps);
  if (eventHandlerDiffs) diffs = _extends({}, diffs, eventHandlerDiffs);

  if (!Object.keys(props).length) {
    return null;
  }

  return diffs;
}

function propsDiff(oldNode, newNode) {

  var preProps = oldNode.props || {};
  var nextProps = newNode.props || {};
  var diffs = diffProps(preProps, nextProps);
  return diffs;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NULL_ELEMENT = undefined;
exports.default = listDiff;
exports.makeKeyIndexAndFree = makeKeyIndexAndFree;

var _patches = __webpack_require__(6);

var PATCHES = _interopRequireWildcard(_patches);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var NULL_ELEMENT = exports.NULL_ELEMENT = Symbol('null');

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function listDiff(oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key);
  var newMap = makeKeyIndexAndFree(newList, key);

  var newFree = newMap.free;

  var oldKeyIndex = oldMap.keyIndex;
  var newKeyIndex = newMap.keyIndex;

  var moves = [];

  // a simulate list to manipulate
  var children = [];
  var i = 0;
  var item = void 0;
  var itemKey = void 0;
  var freeIndex = 0;

  // first pass to check item in old list: if it's removed or not
  while (i < oldList.length) {
    item = oldList[i];
    itemKey = getItemKey(item, key);
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(NULL_ELEMENT);
      } else {
        var newItemIndex = newKeyIndex[itemKey];
        children.push(newList[newItemIndex]);
      }
    } else {
      var freeItem = newFree[freeIndex++];
      children.push(freeItem || NULL_ELEMENT);
    }
    i++;
  }

  var simulateList = children.slice(0);

  // remove items no longer exist
  i = 0;
  while (i < simulateList.length) {
    if (simulateList[i] === NULL_ELEMENT) {
      remove(i);
      removeSimulate(i);
    } else {
      i++;
    }
  }

  // i is cursor pointing to a item in new list
  // j is cursor pointing to a item in simulateList
  var j = i = 0;
  while (i < newList.length) {
    item = newList[i];
    itemKey = getItemKey(item, key);

    var simulateItem = simulateList[j];
    var simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        // new item, just insert it
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = getItemKey(simulateList[j + 1], key);
          if (nextItemKey === itemKey) {
            remove(i);
            removeSimulate(j);
            j++; // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }

    i++;
  }

  //if j is not remove to the end, remove all the rest item
  var k = simulateList.length - j;
  while (j++ < simulateList.length) {
    k--;
    remove(k + i);
  }

  function remove(index) {
    var move = { type: PATCHES.REORDER_REMOVE, index: index };
    moves.push(move);
  }

  function insert(index, item) {
    var move = { type: PATCHES.REORDER_INSERT, index: index, payload: item };
    moves.push(move);
  }

  function removeSimulate(index) {
    simulateList.splice(index, 1);
  }

  return {
    moves: moves,
    children: children
  };
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree(list, key) {
  var keyIndex = {};
  var free = [];
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i];
    var itemKey = getItemKey(item, key);
    if (itemKey) {
      keyIndex[itemKey] = i;
    } else {
      free.push(item);
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  };
}

function getItemKey(item, key) {
  if (!item || !key) return;
  return typeof key === 'string' ? item[key] : key(item);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applyPatches = __webpack_require__(20);

var _applyPatches2 = _interopRequireDefault(_applyPatches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _applyPatches2.default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyPatches;

var _renderDOM = __webpack_require__(2);

var _renderDOM2 = _interopRequireDefault(_renderDOM);

var _property = __webpack_require__(8);

var _eventHandler = __webpack_require__(10);

var _patches = __webpack_require__(6);

var PATCHES = _interopRequireWildcard(_patches);

var _key = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function applyPatches(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches, idx) {
  var currentPatches = patches[walker.index];
  var childNodes = node.childNodes;


  [].concat(_toConsumableArray(childNodes)).forEach(function (child, idx) {
    walker.index += 1;
    dfsWalk(child, walker, patches, idx);
  });

  if (currentPatches) {
    updateNode(node, currentPatches, idx);
  }
}

function updateNode(node, patches, idx) {
  patches.forEach(function (patch) {
    var type = patch.type,
        payload = patch.payload;

    switch (type) {
      case PATCHES.TEXT:
        updateTextNode(node, payload);
        node.textContent = payload;
        break;
      case PATCHES.PROPS:
        updateProps(node, payload);
        break;
      case PATCHES.REORDER:
        reorderChildren(node, payload, idx);
        break;
      case PATCHES.REPLACE:
        replaceNode(node, payload, idx);
        break;
      default:
        throw new Error('Unknown patch type ' + type);
    }
  });
}

function updateTextNode(node, text) {
  node.textContent = text;
}

function updateProps(node, props) {
  // set props
  Object.keys(props).forEach(function (name) {
    (0, _property.setValueForProperty)(node, name, props[name]);
  });

  // set style
  (0, _property.setValueForInlineStyle)(node, props['style']);

  // add event listeners
  (0, _eventHandler.updateEventHandler)(node, props);
}

function reorderChildren(node, moves, idx) {
  var nodeList = [].concat(_toConsumableArray(node.childNodes));
  var map = {};

  nodeList.forEach(function (n) {
    var key = (0, _key.getKeyOfNode)(n);
    if (key) {
      map[key] = n;
    }
  });

  moves.forEach(function (move) {
    var type = move.type,
        payload = move.payload,
        index = move.index;

    switch (type) {
      case PATCHES.REORDER_REMOVE:
        node.removeChild(nodeList[index]);
        nodeList.splice(index, 1);
        break;
      case PATCHES.REORDER_INSERT:
        var key = (0, _key.getKeyOfElement)(payload);
        var insertNode = key && map[key] ? map[key].cloneNode(true) : _renderDOM2.default.createDOM(payload, idx);
        node.insertBefore(insertNode, nodeList[index]);
        nodeList.splice(index, 0, insertNode);
        break;
      default:
        break;
    }
  });
}

function replaceNode(node, element, defaultKey) {
  var newNode = _renderDOM2.default.createDOM(element, defaultKey);
  node.parentNode.replaceChild(newNode, node);
}

/***/ })
/******/ ]);
});