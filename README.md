# Virtual DOM Base

> Virtual DOM Base is a basic implementation of DOM manipulation lib.

### Intro

With `Element` and `RenderDOM` offered by **Virtual DOM Base**, you can easily manipulate your DOM structure.

### Usage

`jsx` syntax is supported in this lib, and you can also use `Element.createElement` to create virtual DOM and render it to real DOM.

**Basic Usage**

```javascript
import { Element } from 'virtual-dom-base';

const root = Element.createElement('div', {
  id: 'root',
  Element.createElement('h1', null, 'Hello Virtual DOM Base!'),
  Element.createElement('blockquote', null,
  	Element.createElement('code', null, 'Virtual DOM Base'),
    ' is a basic implementation of DOM manipulation lib.'
  ),
});
```

**With JSX**

```jsx
import { Element } from 'virtual-dom-base';

const root = (
  <div id="root">
    <h1>Hello Virtual DOM Base!</h1>
    <blockquote>
      <code>Virtual DOM Base</code> is a basic implementation of DOM manipulation lib.
    </blockquote>
  </div>
);
```

### Types of Params

| Type             | Result                           |
| ---------------- | -------------------------------- |
| Element instance | Element(HTMLElement)             |
| String           | TextNode                         |
| Number           | TextNode                         |
| Undefined        | Comment(`<!-- empty node -->`)   |
| Null             | Comment(`<!-- empty node -->`)   |
| Object           | Comment(`<!-- unknown node -->`) |
| Array            | DocumentFragment                 |
| Default          | Comment(`<!-- unknown node -->`) |
