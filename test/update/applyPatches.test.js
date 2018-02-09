/* eslint-disable react/jsx-key */

import { Element, diff, update } from '@/index';

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
        <div key="first">to be removed</div>
        old text
      </div>
    );

    var div2 = (
      <div className="happy ok" contentEditable style={{ fontSize: '20px' }} onClick={console.log}>
        {
          <ul id="2">
            {[10, 20, 30, 40].map(v => (
              <li className={v}>
                <div>{`1-${v}`}</div>
                <div>{`2-${v}`}</div>
              </li>
            ))}
          </ul>
        }
        <div key="last">to be replaced</div>
        new test
      </div>
    );
    const div1DOM = div1.render();
    const div2DOM = div2.render();
    const diffs = diff(div1, div2);
    update(div1DOM, diffs);

    expect(div1DOM).toEqual(div2DOM);
  });

  test('remove handler', () => {
    const div1 = <div onClick={() => {}}>A</div>;
    const div2 = <div onClick={() => {}}>B</div>;

    const div1DOM = div1.render();
    const div2DOM = div2.render();
    const diffs = diff(div1, div2);
    update(div1DOM, diffs);

    expect(div1DOM).toEqual(div2DOM);
  });
});
