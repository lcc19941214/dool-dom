/* eslint-disable react/jsx-key */

import { Element } from '../../src/';

const clearSpace = str => str.replace(/[\n\t\s\r]/g, '');

describe('create a DOM', () => {
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

  test('outerHTML of RenderDOM.createDOM() and native DOM should be equal ', () => {
    expect(clearSpace(elemDOM.outerHTML)).toBe(clearSpace(dom.outerHTML));
  });

  test('DOM of RenderDOM.createDOM() and native DOM should be equal ', () => {
    expect(elemDOM).toEqual(dom);
  });

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
