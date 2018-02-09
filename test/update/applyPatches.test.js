/* eslint-disable react/jsx-key */

import { Element, RenderDOM, diff, update } from '../../src/';

describe('update a DOM', () => {
  test('div1 applied diff patches is equal to div2', () => {
    var div1 = (
      <div className="happy" style={{ color: 'red' }}>
        {
          <ul>
            {[1, 2, 3].map(v => (
              <li className={v}>
                <div>{`1-${v}`}</div>
                <div>{`2-${v}`}</div>
              </li>
            ))}
          </ul>
        }
      </div>
    );
    var div2 = (
      <div className="happy ok" contentEditable style={{ fontSize: '20px' }} onClick={console.log}>
        {
          <ul id="2">
            {[10, 20, 30].map(v => (
              <li className={v}>
                <div>{`1-${v}`}</div>
                <div>{`2-${v}`}</div>
              </li>
            ))}
          </ul>
        }
      </div>
    );
    const div1DOM = div1.render();
    const div2DOM = div2.render();
    const diffs = diff(div1, div2);
    update(div1DOM, diffs);

    expect(div1DOM).toEqual(div2DOM);
  });
});
