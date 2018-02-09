/* eslint-disable react/jsx-key */

import { Element, RenderDOM } from '../../src/';

const clearSpace = str => str.replace(/[\n\t\s\r]/g, '');

describe('create Element DOM', () => {
  function createElementAndDOM() {
    const elem = (
      <div className="friends-wrapper">
        <input type="number" disabled />
        <ul style={{ color: 'red', fontSize: '16px' }}>
          {[<li>Bob</li>, <li>Tom</li>]}
          <li>Jim</li>
        </ul>
      </div>
    );

    const div = document.createElement('div');
    div.className = 'friends-wrapper';
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('disabled', '');
    const ul = document.createElement('ul');
    ul.style.color = 'red';
    ul.style.fontSize = '16px';
    ['Bob', 'Tom', 'Jim'].forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    [input, ul].forEach(v => div.appendChild(v));

    return { elem, dom: div };
  }

  const { elem, dom } = createElementAndDOM();
  const elemDOM = elem.render();

  // outerHTML
  test('outerHTML of RenderDOM.createDOM() and native DOM should be equal ', () => {
    expect(clearSpace(elemDOM.outerHTML)).toBe(clearSpace(dom.outerHTML));
  });

  // DOM
  test('DOM of RenderDOM.createDOM() and native DOM should be equal ', () => {
    expect(elemDOM).toEqual(dom);
  });

  // eventHandler
  test('event handler should work', () => {
    const handler = function() {
      this._count = this._count ? this._count + 1 : 1;
    };
    const elem = <div onClick={handler}>click me</div>;
    const elemDOM = elem.render();

    const divDOM = document.createElement('div');
    divDOM.onclick = handler;

    for (let index = 0; index < 10; index++) {
      elemDOM.click();
      divDOM.click();
    }

    expect(elemDOM._count).toBe(divDOM._count);
  });
});

describe('create DOM', () => {
  test('undefined', () => {
    expect(RenderDOM.createDOM(undefined)).toEqual(RenderDOM.createEmptyNode());
  });

  test('null', () => {
    expect(RenderDOM.createDOM(null)).toEqual(RenderDOM.createEmptyNode());
  });

  test('Object', () => {
    function createObject() {
      RenderDOM.createDOM({});
    }
    expect(createObject).toThrowError(/should be|but got/g);
  });

  test('String', () => {
    const str = 'hello Dool;';
    expect(RenderDOM.createDOM(str)).toEqual(document.createTextNode(str));
  });

  test('Number', () => {
    const num = 666;
    expect(RenderDOM.createDOM(num)).toEqual(document.createTextNode(num));
  });

  test('Array', () => {
    const containerA = document.createElement('div');
    const containerB = document.createElement('div');

    const arr = [1, <div key="hello">Hello</div>, <span>Dool</span>];

    const fragment = document.createDocumentFragment();
    const text = document.createTextNode(1);
    const div = document.createElement('div');
    div.textContent = 'Hello';
    const span = document.createElement('span');
    span.textContent = 'Dool';
    [text, div, span].forEach(v => fragment.appendChild(v));

    containerA.appendChild(RenderDOM.createDOM(arr));
    containerB.appendChild(fragment);

    expect(containerA).toEqual(containerB);
  });
});
