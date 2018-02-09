/* eslint-disable react/no-unescaped-entities*/
import * as Dool from '../src/';
if (_DEV_) {
  import('./dev');
}

window.Dool = Dool;

const { RenderDOM, Element } = Dool;

function init() {
  var root = (
    <div>
      <h1>Dool-DOM</h1>
      <blockquote>
        <p>Dool-DOM is a basic implementation of DOM manipulation lib.</p>
      </blockquote>
      <h3>Intro</h3>
      <p>
        With
        <code>Element</code> and
        <code>RenderDOM</code> offered by <strong>Dool-DOM</strong>, you can easily manipulate your DOM structure.
      </p>
      <h3>Usage</h3>
      <p>
        <code>jsx</code> syntax is supported in this lib, and you can also use
        <code>Element.createElement</code> to create virtual DOM and render it to real DOM.
      </p>
      <p>
        <strong>Basic Usage</strong>
      </p>
      <div class="highlight highlight-source-js">
            <pre><span class="pl-k">import</span> {'{'} <span class="pl-smi">Element </span>{'}'} <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>dool-dom<span class="pl-pds">'</span></span>;
          <span class="pl-k">const</span> <span class="pl-c1">root</span> <span class="pl-k">=</span> <span class="pl-c1">Element</span>.<span class="pl-c1">createElement</span>(<span class="pl-s"><span class="pl-pds">'</span>div<span class="pl-pds">'</span></span>, {'{'}
          id<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>root<span class="pl-pds">'</span></span>,
          <span class="pl-c1">Element</span>.<span class="pl-c1">createElement</span>(<span class="pl-s"><span class="pl-pds">'</span>h1<span class="pl-pds">'</span></span>, <span class="pl-c1">null</span>, <span class="pl-s"><span class="pl-pds">'</span>Hello Dool-DOM!<span class="pl-pds">'</span></span>),
          <span class="pl-c1">Element</span>.<span class="pl-c1">createElement</span>(<span class="pl-s"><span class="pl-pds">'</span>blockquote<span class="pl-pds">'</span></span>, <span class="pl-c1">null</span>,
          <span class="pl-c1">Element</span>.<span class="pl-c1">createElement</span>(<span class="pl-s"><span class="pl-pds">'</span>code<span class="pl-pds">'</span></span>, <span class="pl-c1">null</span>, <span class="pl-s"><span class="pl-pds">'</span>Dool-DOM<span class="pl-pds">'</span></span>),
          <span class="pl-s"><span class="pl-pds">'</span> is a basic implementation of DOM manipulation lib.<span class="pl-pds">'</span></span>
          ),
          });
            </pre>
      </div>
      <p>
        <strong>With JSX</strong>
      </p>
      <div class="highlight highlight-source-js-jsx">
            <pre><span class="pl-k">import</span> {'{'}<span class="pl-smi"> Element</span> {'}'}<span class="pl-k"> from</span> <span class="pl-s"><span class="pl-pds">'</span>dool-dom<span class="pl-pds">'</span></span>;
          <span class="pl-k">const</span> <span class="pl-c1">root</span><span class="pl-k"> =</span> (
          &lt;<span class="pl-ent">div</span> <span class="pl-e">id</span><span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">"</span>root<span class="pl-pds">"</span></span>&gt;
          &lt;<span class="pl-ent">h1</span>&gt;Hello Dool-DOM!&lt;/<span class="pl-ent">h1</span>&gt;
          &lt;<span class="pl-ent">blockquote</span>&gt;
            &lt;<span class="pl-ent">code</span>&gt;Dool-DOM&lt;/<span class="pl-ent">code</span>&gt; is a basic implementation of DOM manipulation lib.
          &lt;/<span class="pl-ent">blockquote</span>&gt;
          &lt;/<span class="pl-ent">div</span>&gt;
          );
            </pre>
      </div>
      <h3>Types of Params</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Element instance</td>
            <td>Element(DOMElement)</td>
          </tr>
          <tr>
            <td>String</td>
            <td>TextNode</td>
          </tr>
          <tr>
            <td>Number</td>
            <td>TextNode</td>
          </tr>
          <tr>
            <td>Undefined</td>
            <td>
              Comment(
              <code>&lt;!-- empty node --&gt;</code>)
            </td>
          </tr>
          <tr>
            <td>Null</td>
            <td>
              Comment(
              <code>&lt;!-- empty node --&gt;</code>)
            </td>
          </tr>
          <tr>
            <td>Object</td>
            <td>
              Comment(
              <code>&lt;!-- unknown node --&gt;</code>)
            </td>
          </tr>
          <tr>
            <td>Array</td>
            <td>DocumentFragment</td>
          </tr>
          <tr>
            <td>Default</td>
            <td>
              Comment(
              <code>&lt;!-- unknown node --&gt;</code>)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  RenderDOM.render(root, document.getElementById('root'));
}

init();