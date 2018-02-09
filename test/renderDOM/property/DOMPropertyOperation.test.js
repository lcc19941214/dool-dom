/* eslint-disable react/jsx-key */

import { Element } from '@/index';

describe('null property', () => {
  test('null property should be removed', () => {
    const elem = (
      <div className={null} contentEditable={null} id="hello">
        hello
      </div>
    );
    const div = document.createElement('div');
    div.setAttribute('id', 'hello');

    expect(elem.render()).toEqual(div);
  });
});

describe('property and attribute', () => {
  let elem = <input type="checkbox" checked disabled={null} />;
  let elemDOM = elem.render();
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.checked = true;
  test('use property', () => {
    expect(elemDOM).toEqual(input);
  });

  input.checked = false;
  test('boolean props should not equal to DOM which property is falsy', () => {
    expect(elemDOM).not.toEqual(input);
  });

  elem = <input type="checkbox" checked={false} />;
  elemDOM = elem.render();
  test('boolean props should equal to DOM which property is truethy', () => {
    expect(elemDOM).toEqual(input);
  });
});
