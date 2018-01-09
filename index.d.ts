// Type definitions for mxgraph v3.8.0
// Project: https://github.com/jgraph/mxgraph
// Definitions by: Lars Gleim <https://github.com/lgleim>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as mx from './mxgraph.d';
export * from './mxgraph.d';

export default MxGraphFactory;

declare function MxGraphFactory(opts: {
    /** Specifies the path in mxClient.basePath. */
    mxBasePath?: string;
    /** Specifies the path in mxClient.imageBasePath. */
    mxImageBasePath?: string;
    /** Specifies the language for resources in mxClient.language. */
    mxLanguage?: string;
    /** Array of all supported language extensions. */
    mxLanguages?: string[];
    /** Specifies the default language in mxClient.defaultLanguage. */
    mxDefaultLanguage?: string;
    /** Specifies if any resources should be loaded.  Default is true. */
    mxLoadResources?: boolean;
    /** Specifies if any stylesheets should be loaded.  Default is true. */
    mxLoadStylesheets?: boolean;
    /** Force loading the JavaScript files in development mode */
    mxForceIncludes?: boolean;
    /** Specify the extension of resource files. */
    mxResourceExtension?: string;
}): typeof mx;