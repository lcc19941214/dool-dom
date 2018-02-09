/* eslint-disable react/jsx-key */

import { Element } from '@/index';
import 'jest-plugin-console-matchers/setup';

describe('null property', () => {
  test('null property should be removed', () => {
    const elem = (
      <div className={null} contentEditable={null} id="hello">
        hello
      </div>
    );
    const div = document.createElement('div');
    div.setAttribute('id', 'hello');
    div.textContent = 'hello';

    expect(elem.render()).toEqual(div);
  });
});

describe('property and attribute', () => {
  function getElemAndDOM() {
    let elem = <input type="checkbox" checked disabled={null} />;
    let elemDOM = elem.render();

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = true;
    return {
      elem,
      elemDOM,
      input
    };
  }

  test('property checked should equal', () => {
    const { elemDOM, input } = getElemAndDOM();
    expect(elemDOM.checked).toBe(input.checked);
  });

  test('property disabled equal', () => {
    const { elemDOM, input } = getElemAndDOM();
    expect(elemDOM.disabled).toBe(input.disabled);
  });

  test('boolean props should not equal to DOM which property is falsy', () => {
    const { elemDOM, input } = getElemAndDOM();
    input.checked = false;
    expect(elemDOM.checked).not.toBe(input.checked);
  });

  test('boolean props should equal to DOM which property is truethy', () => {
    const elem = <input type="checkbox" checked={null} />;
    const elemDOM = elem.render();
    const { input } = getElemAndDOM();
    input.checked = false;
    expect(elemDOM.checked).toBe(input.checked);
  });
});

describe('unexpected props value', () => {
  test('style is not an object', () => {
    const setStyle = () => {
      const elem = <div style={1} />;
      elem.render();
    };

    expect(setStyle).toConsoleWarn();
  });
});
