/* eslint-disable react/jsx-key */

import { Element } from '@/index';

describe('Element event handler props', () => {
  test('event handler props should work', () => {
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
