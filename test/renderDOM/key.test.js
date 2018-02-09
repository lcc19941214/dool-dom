/* eslint-disable react/jsx-key */

import { Element, RenderDOM } from '../../src/';

const element = (
  <div key="lily">
    123
    {[<div>1</div>, <div>2</div>, <div>3</div>]}
    <div key="cancel">a</div>
    {['hello world', <div>ok</div>, 50, <div key="ok">ok</div>, [<div>nam</div>]]}
  </div>
);

describe('element and dom key', () => {
  test('element tree key  should equal to DOM tree key', () => {
    const elementDOM = element.render();

    const elementKeyTree = RenderDOM.getElementKeyTree(element, false);
    const elementDOMKeyTree = RenderDOM.getDOMElementKeyTree(elementDOM, false);

    expect(elementKeyTree).toBe(elementDOMKeyTree);
  });
});
