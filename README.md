# mxgraph-typings
Typescript Type Definitions / Typings for https://github.com/jgraph/mxgraph

The typings are complete but many optional parameters are currently declared mandatory although optional, many parameters are any typed and much of the JSDoc is not properly formatted/tagged.

Install via 

```
npm install -D lgleim/mxgraph-typings
```

Usage (Working in Angular 5.x)

```typescript
import { mxgraph } from 'mxgraph'; // Typings only - no code!

declare var require: any;

const mx: typeof mxgraph = require('mxgraph')({
	mxBasePath: 'mxgraph'
});

@Component(...)
export class DashboardComponent {

	@ViewChild('dashboard') dashboard: ElementRef;

	private graph: mxgraph.mxGraph; 
    
	ngAfterViewInit() {
			this.graph = new mx.mxGraph(this.dashboard.nativeElement);
			xml = "<?xml version='1.0' encoding='UTF-8'?><mxGraphModel><root><mxCell id='0'/>...</root></mxGraphModel>";
			
			let doc = mx.mxUtils.parseXml(xml);
			let codec = new mx.mxCodec(doc);
			codec.decode(doc.documentElement, this.graph.getModel());		
	}
}
```

If you are using the Angular CLI you can add the following line to your .angular=cli.json assets array to make the mxGraph assets available
```
{"glob":"**/*", "input":"node_modules/mxgraph/javascript/src", "output": "./mxgraph"}
```
