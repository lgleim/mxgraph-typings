# mxgraph-typings
Typescript Type Definitions / Typings for https://github.com/jgraph/mxgraph

The typings are complete but many optional parameters are currently declared mandatory although optional, many parameters are any typed and much of the JSDoc is not properly formatted/tagged.

Install via 

```
npm install -D lgleim/mxgraph-typings
```

Usage

```typescript
import mxGraphFactory, {mxgraph} from 'mxgraph';
...
const mx = mxGraphFactory({
    mxImageBasePath: 'mxgraph/images',
    mxBasePath: 'mxgraph'
});

// mxGraph classes can now be accessed through mx namespace object
// c.f. https://jgraph.github.io/mxgraph/docs/manual.html#2.1.3
// mxGraph types can be accessed from mxgraph namespace
const graph: mxgraph.mxGraph = mx.mxGraph(someDOMContainer);
```

If you are using the Angular CLI you can add the following line to your .angular=cli.json assets array to make the mxGraph assets available
```
{"glob":"**/*", "input":"node_modules/mxgraph/javascript/src", "output": "./mxgraph"}
```
