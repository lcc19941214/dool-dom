# Dool-DOM ![build](https://travis-ci.org/lcc19941214/dool-dom.svg?branch=master) [![codecov](https://codecov.io/gh/lcc19941214/dool-dom/branch/master/graph/badge.svg)](https://codecov.io/gh/lcc19941214/dool-dom) ![inspired by Dool](https://img.shields.io/badge/inspired%20by-Dool-orange.svg) ![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

> Dool-DOM is a basic implementation of DOM manipulation lib.

## Intro

With `Element` and `RenderDOM` offered by **Dool-DOM**, you can easily manipulate your DOM structure with pure js.

Dool-DOM has similar api like [React](https://github.com/facebook/react), but Dool-DOM is more light and focus on writing HTML in js.



## Start up

### Install

```bash
$ npm install --save dool-dom
// or
$ yarn add dool-dom
```



### Notice

If you'd like to use Dool-DOM with jsx, make sure you have installed `babel`,  `babel-plugin-syntax-jsx`, `babel-plugin-syntax-jsx`, and config them in a right way:

```bash
# install babel
$ npm install babel-core babel-plugin-syntax-jsx babel-plugin-transform-react-jsx --save-dev 
```

`babel-plugin-syntax-jsx` only allows Babel to parse this syntax. Use `babel-plugin-transform-react-jsx` to enbale babel transform your jsx codes with Dool.

Add `"pragma": "Element.createElement"` to your .babelrc is required.

```json
// .babelrc
{
  "plugins": [
    "syntax-jsx",
    [
      "transform-react-jsx",
      {
        "pragma": "Element.createElement"
      }
    ]
  ]
}
```


## Usage

`jsx` syntax is supported in this lib, and you can also use `Element.createElement` to create virtual DOM and render it to real DOM.



### Basic Usage

```javascript
import { Element, RenderDOM } from 'dool-dom';

const app = Element.createElement('div', {
  id: 'app',
  Element.createElement('h1', null, 'Hello Dool-DOM!'),
  Element.createElement('blockquote', null,
    Element.createElement('code', null, 'Dool-DOM'),
    ' is a basic implementation of DOM manipulation lib.'
  ),
});

// attach app to document.body as a DOM Node
RenderDOM.render(app, document.body);
```



### With [JSX](https://reactjs.org/docs/jsx-in-depth.html)

```jsx
// import statement cannot be ignored with jsx syntax
import { Element } from 'dool-dom';

const app = (
  <div id="app">
    <h1>Hello Dool-DOM!</h1>
    <blockquote>
      <code>Dool-DOM</code> is a basic implementation of DOM manipulation lib.
    </blockquote>
  </div>
);

// you can also get the DOM transformed from app Element separetly
const appDOM = RenderDOM.createDOM(app); // same as `app.render()`
appDOM.className = 'app';
document.body.appendChild(appDOM);
```



### Example

**input**

```jsx
import { Element } from 'dool-dom';

const handler = (e) => console.log('Hello Dool');

const root = (
  <div onClick={handler}>
    <h1>Headline</h1>
    text
    7873632
    {undefined}
    {null}
    {[
      <div className="child">Amy</div>,
      <div className="child">Bob</div>,
      Math.random > 0.5 ? 'Cindy' : 'Dick',
      false
    ]}
    <div>Content</div>
  </div>
);

const rootElem = root.render();
rootElem.click(); // 'Hello Dool'
```

**output HTML**

```html
<body>
  <div>
    <h1>Headline</h1>
    text
    7873632
    <!-- empty node -->
    <!-- empty node -->
    <div class="child">Amy</div>
    <div class="child">Bob</div>
    Dick
    <!-- empty node -->
    <div>Content</div>
  </div>
</body>
```



## API

### Element

#### Element

```
new Element(tagName, props, ...children): Element
```

Dool Element constructor.

#### createElement

```
Element.createElement(tagName, props, ...children): Element
```

Create Dool Element.

### RenderDOM

#### render

```
render(element, mountPoint): moutPoint
```

Render given element to DOM Node and attached to mountPoint. For details about element, see below.

#### createDOM

```
createDOM(element): DOM Node
```

Render element to real DOM node.

##### Acceptable Children type

| Type             | Result                           |
| ---------------- | -------------------------------- |
| Element instance | Element(DOMElement)              |
| String           | TextNode                         |
| Number           | TextNode                         |
| Undefined        | Comment(`<!-- empty node -->`)   |
| Boolean          | Comment(`<!-- empty node -->`)   |
| Null             | Comment(`<!-- empty node -->`)   |
| Object           | `TyperError`                     |
| Array            | DocumentFragment                 |
| Default          | Comment(`<!-- unknown node -->`) |

##### Acceptable Props

| Prop            | e.g.                                 | Description                              |
| --------------- | ------------------------------------ | ---------------------------------------- |
| key             | -                                    | Key is important for Dool-DOM to compare two Elements while diffing. Default key is child index. |
| HTML attributes | `className` `contentEditable`        | All valid HTML attributes can be pass to renderd DON Node. Props have `null` or `undefined` value will be removed. |
| Style           | `{ color: 'red', fontSize: '20px' }` | An object is required for `style`. Style rules have `null` or `undefined` value will be removed. |
| Event Handler   | `onClick={handler}`                  | Pass `onXXX` prop to Element, Dool-DOM will automaticly add event listener to it. Handler shall be a function, or Dool-DOM will throw an warning and skip it. |



## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Chengchuan (Conan) Liu