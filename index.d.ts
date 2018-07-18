// Type definitions for mxgraph v3.8.0
// Project: https://github.com/jgraph/mxgraph
// Definitions by: Lars Gleim <https://github.com/lgleim>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

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
}): typeof mxgraph;

export module mxgraph {

    export var mxClient: {
        VERSION: string;
        IS_IE: boolean;
        IS_IE6: boolean;
        IS_IE11: boolean;
        IS_EDGE: boolean;
        IS_QUIRKS: boolean;
        IS_EM: boolean;
        VML_PREFIX: string;
        OFFICE_PREFIX: string;
        IS_NS: boolean;
        IS_OP: boolean;
        IS_OT: boolean;
        IS_SF: boolean;
        IS_IOS: boolean;
        IS_GC: boolean;
        IS_CHROMEAPP: boolean;
        IS_FF: boolean;
        IS_MT: boolean;
        IS_SVG: boolean;
        NO_FO: boolean;
        IS_VML: boolean;
        IS_WIN: boolean;
        IS_MAC: boolean;
        IS_TOUCH: boolean;
        IS_POINTER: boolean;
        IS_LOCAL: boolean;
        isBrowserSupported(): boolean;
        link(rel: any, href: any, doc?: any): void;
        include(src: any): void;
        dispose(): void;
        basePath: any;
        imageBasePath: any;
        language: any;
        languages: any;
        defaultLanguage: any;
    };

    /**
        * Implements a generic shape which is based on a XML node as a description.
        *
        * shape:
        *
        * The outer element is *shape*, that has attributes:
        *
        * - "name", string, required. The stencil name that uniquely identifies the shape.
        * - "w" and "h" are optional decimal view bounds. This defines your co-ordinate
        * system for the graphics operations in the shape. The default is 100,100.
        * - "aspect", optional string. Either "variable", the default, or "fixed". Fixed
        * means always render the shape with the aspect ratio defined by the ratio w/h.
        * Variable causes the ratio to match that of the geometry of the current vertex.
        * - "strokewidth", optional string. Either an integer or the string "inherit".
        * "inherit" indicates that the strokeWidth of the cell is only changed on scaling,
        * not on resizing. Default is "1".
        * If numeric values are used, the strokeWidth of the cell is changed on both
        * scaling and resizing and the value defines the multiple that is applied to
        * the width.
        *
        * connections:
        *
        * If you want to define specific fixed connection points on the shape use the
        * *connections* element. Each *constraint* element within connections defines
        * a fixed connection point on the shape. Constraints have attributes:
        *
        * - "perimeter", required. 1 or 0. 0 sets the connection point where specified
        * by x,y. 1 Causes the position of the connection point to be extrapolated from
        * the center of the shape, through x,y to the point of intersection with the
        * perimeter of the shape.
        * - "x" and "y" are the position of the fixed point relative to the bounds of
        * the shape. They can be automatically adjusted if perimeter=1. So, (0,0) is top
        * left, (0.5,0.5) the center, (1,0.5) the center of the right hand edge of the
        * bounds, etc. Values may be less than 0 or greater than 1 to be positioned
        * outside of the shape.
        * - "name", optional string. A unique identifier for the port on the shape.
        *
        * background and foreground:
        *
        * The path of the graphics drawing is split into two elements, *foreground* and
        * *background*. The split is to define which part any shadow applied to the shape
        * is derived from (the background). This, generally, means the background is the
        * line tracing of the outside of the shape, but not always.
        *
        * Any stroke, fill or fillstroke of a background must be the first element of the
        * foreground element, they must not be used within *background*. If the background
        * is empty, this is not required.
        *
        * Because the background cannot have any fill or stroke, it can contain only one
        * *path*, *rect*, *roundrect* or *ellipse* element (or none). It can also not
        * include *image*, *text* or *include-shape*.
        *
        * Note that the state, styling and drawing in mxGraph stencils is very close in
        * design to that of HTML 5 canvas. Tutorials on this subject, if you're not
        * familiar with the topic, will give a good high-level introduction to the
        * concepts used.
        *
        * State:
        *
        * Rendering within the foreground and background elements has the concept of
        * state. There are two types of operations other than state save/load, styling
        * and drawing. The styling operations change the current state, so you can save
        * the current state with <save/> and pull the last saved state from the state
        * stack using <restore/>.
        *
        * Styling:
        *
        * The elements that change colors within the current state all take a hash
        * prefixed hex color code ("#FFEA80").
        *
        * - *strokecolor*, this sets the color that drawing paths will be rendered in
        * when a stroke or fillstroke command is issued.
        * - *fillcolor*, this sets the color that the inside of closed paths will be
        * rendered in when a fill or fillstroke command is issued.
        * - *fontcolor*, this sets the color that fonts are rendered in when text is drawn.
        *
        * *alpha* defines the degree of transparency used between 1.0 for fully opaque
        * and 0.0 for fully transparent.
        *
        * *strokewidth* defines the integer thickness of drawing elements rendered by
        * stroking. Use fixed="1" to apply the value as-is, without scaling.
        *
        * *dashed* is "1" for dashing enabled and "0" for disabled.
        *
        * When *dashed* is enabled the current dash pattern, defined by *dashpattern*,
        * is used on strokes. dashpattern is a sequence of space separated "on, off"
        * lengths that define what distance to paint the stroke for, then what distance
        * to paint nothing for, repeat... The default is "3 3". You could define a more
        * complex pattern with "5 3 2 6", for example. Generally, it makes sense to have
        * an even number of elements in the dashpattern, but that's not required.
        *
        * *linejoin*, *linecap* and *miterlimit* are best explained by the Mozilla page
        * on Canvas styling (about halfway down). The values are all the same except we
        * use "flat" for linecap, instead of Canvas' "butt".
        *
        * For font styling there are.
        *
        * - *fontsize*, an integer,
        * - *fontstyle*, an ORed bit pattern of bold (1), italic (2) and underline (4),
        * i.e bold underline is "5".
        * - *fontfamily*, is a string defining the typeface to be used.
        *
        * Drawing:
        *
        * Most drawing is contained within a *path* element. Again, the graphic
        * primitives are very similar to that of HTML 5 canvas.
        *
        * - *move* to attributes required decimals (x,y).
        * - *line* to attributes required decimals (x,y).
        * - *quad* to required decimals (x2,y2) via control point required decimals
        * (x1,y1).
        * - *curve* to required decimals (x3,y3), via control points required decimals
        * (x1,y1) and (x2,y2).
        * - *arc*, this doesn't follow the HTML Canvas signatures, instead it's a copy
        * of the SVG arc command. The SVG specification documentation gives the best
        * description of its behaviors. The attributes are named identically, they are
        * decimals and all required.
        * - *close* ends the current subpath and causes an automatic straight line to
        * be drawn from the current point to the initial point of the current subpath.
        *
        * Complex drawing:
        *
        * In addition to the graphics primitive operations there are non-primitive
        * operations. These provide an easy method to draw some basic shapes.
        *
        * - *rect*, attributes "x", "y", "w", "h", all required decimals
        * - *roundrect*, attributes "x", "y", "w", "h", all required decimals. Also
        * "arcsize" an optional decimal attribute defining how large, the corner curves
        * are.
        * - *ellipse*, attributes "x", "y", "w", "h", all required decimals.
        *
        * Note that these 3 shapes and all paths must be followed by either a fill,
        * stroke, or fillstroke.
        *
        * Text:
        *
        * *text* elements have the following attributes.
        *
        * - "str", the text string to display, required.
        * - "x" and "y", the decimal location (x,y) of the text element, required.
        * - "align", the horizontal alignment of the text element, either "left",
        * "center" or "right". Optional, default is "left".
        * - "valign", the vertical alignment of the text element, either "top", "middle"
        * or "bottom". Optional, default is "top".
        * - "localized", 0 or 1, if 1 then the "str" actually contains a key to use to
        * fetch the value out of mxResources. Optional, default is
        * <mxStencil.defaultLocalized>.
        * - "vertical", 0 or 1, if 1 the label is rendered vertically (rotated by 90
        * degrees). Optional, default is 0.
        * - "rotation", angle in degrees (0 to 360). The angle to rotate the text by.
        * Optional, default is 0.
        * - "align-shape", 0 or 1, if 0 ignore the rotation of the shape when setting
        * the text rotation. Optional, default is 1.
        *
        * If <allowEval> is true, then the text content of the this element can define
        * a function which is invoked with the shape as the only argument and returns
        * the value for the text element (ignored if the str attribute is not null).
        *
        * Images:
        *
        * *image* elements can either be external URLs, or data URIs, where supported
        * (not in IE 7-). Attributes are:
        *
        * - "src", required string. Either a data URI or URL.
        * - "x", "y", required decimals. The (x,y) position of the image.
        * - "w", "h", required decimals. The width and height of the image.
        * - "flipH" and "flipV", optional 0 or 1. Whether to flip the image along the
        * horizontal/vertical axis. Default is 0 for both.
        *
        * If <allowEval> is true, then the text content of the this element can define
        * a function which is invoked with the shape as the only argument and returns
        * the value for the image source (ignored if the src attribute is not null).
        *
        * Sub-shapes:
        *
        * *include-shape* allow stencils to be rendered within the current stencil by
        * referencing the sub-stencil by name. Attributes are:
        *
        * - "name", required string. The unique shape name of the stencil.
        * - "x", "y", "w", "h", required decimals. The (x,y) position of the sub-shape
        * and its width and height.
        */
    export class mxStencil {
        /**
            * Static global variable that specifies the default value for the localized
            * attribute of the text element. Default is false.
            */
        static defaultLocalized: boolean;
        /**
            * Static global switch that specifies if the use of eval is allowed for
            * evaluating text content and images. Default is false. Set this to true
            * if stencils can not contain user input.
            */
        static allowEval: boolean;
        /**
            * Holds the XML node with the stencil description.
            */
        desc: Element;
        /**
            * Holds an array of <mxConnectionConstraints> as defined in the shape.
            */
        constraints: mxConnectionConstraint[];
        /**
            * Holds the aspect of the shape. Default is 'auto'.
            */
        aspect: string;
        /**
            * Holds the width of the shape. Default is 100.
            */
        w0: number;
        /**
            * Holds the height of the shape. Default is 100.
            */
        h0: number;
        /**
            * Holds the XML node with the stencil description.
            */
        bgNode: Element;
        /**
            * Holds the XML node with the stencil description.
            */
        fgNode: Element;
        /**
            * Holds the strokewidth direction from the description.
            */
        strokewidth: number | string;
        /**
            * Constructs a new generic shape by setting <desc> to the given XML node and
            * invoking <parseDescription> and <parseConstraints>.
            *
            * @param desc XML node that contains the stencil description.
            */
        constructor(desc: Element);
        /**
            * Reads <w0>, <h0>, <aspect>, <bgNodes> and <fgNodes> from <desc>.
            */
        parseDescription(): void;
        /**
            * Reads the constraints from <desc> into <constraints> using
            * <parseConstraint>.
            */
        parseConstraints(): void;
        /**
            * Parses the given XML node and returns its <mxConnectionConstraint>.
            */
        parseConstraint(node: Element): mxConnectionConstraint;
        /**
            * Gets the given attribute as a text. The return value from <evaluateAttribute>
            * is used as a key to <mxResources.get> if the localized attribute in the text
            * node is 1 or if <defaultLocalized> is true.
            */
        evaluateTextAttribute(node: Element, attribute: string, shape: any): string;
        /**
            * Gets the attribute for the given name from the given node. If the attribute
            * does not exist then the text content of the node is evaluated and if it is
            * a function it is invoked with <shape> as the only argument and the return
            * value is used as the attribute value to be returned.
            */
        evaluateAttribute(node: Element, attribute: string, shape: any): string;
        /**
            * Draws this stencil inside the given bounds.
            */
        drawShape(canvas: any, shape: any, x: any, y: any, w: any, h: any): void;
        /**
            * Draws this stencil inside the given bounds.
            */
        drawChildren(canvas: any, shape: any, x: any, y: any, w: any, h: any, node: any, aspect: any, disableShadow: any): void;
        /**
            * Returns a rectangle that contains the offset in x and y and the horizontal
            * and vertical scale in width and height used to draw this shape inside the
            * given <mxRectangle>.
            *
            * shape - <mxShape> to be drawn.
            * bounds - <mxRectangle> that should contain the stencil.
            * direction - Optional direction of the shape to be darwn.
            */
        computeAspect(shape: any, x: any, y: any, w: any, h: any, direction: any): mxRectangle;
        /**
            * Draws this stencil inside the given bounds.
            */
        drawNode(canvas: any, shape: any, node: any, aspect: any, disableShadow: any): void;
    }

    /**
        * Base class for all shapes. A shape in mxGraph is a
        * separate implementation for SVG, VML and HTML. Which
        * implementation to use is controlled by the <dialect>
        * property which is assigned from within the <mxCellRenderer>
        * when the shape is created. The dialect must be assigned
        * for a shape, and it does normally depend on the browser and
        * the confiuration of the graph (see <mxGraph> rendering hint).
        *
        * For each supported shape in SVG and VML, a corresponding
        * shape exists in mxGraph, namely for text, image, rectangle,
        * rhombus, ellipse and polyline. The other shapes are a
        * combination of these shapes (eg. label and swimlane)
        * or they consist of one or more (filled) path objects
        * (eg. actor and cylinder). The HTML implementation is
        * optional but may be required for a HTML-only view of
        * the graph.
        *
        * Custom Shapes:
        *
        * To extend from this class, the basic code looks as follows.
        * In the special case where the custom shape consists only of
        * one filled region or one filled region and an additional stroke
        * the <mxActor> and <mxCylinder> should be subclassed,
        * respectively.
        *
        * (code)
        * function CustomShape() { }
        *
        * CustomShape.prototype = new mxShape();
        * CustomShape.prototype.constructor = CustomShape;
        * (end)
        *
        * To register a custom shape in an existing graph instance,
        * one must register the shape under a new name in the graph's
        * cell renderer as follows:
        *
        * (code)
        * mxCellRenderer.registerShape('customShape', CustomShape);
        * (end)
        *
        * The second argument is the name of the constructor.
        *
        * In order to use the shape you can refer to the given name above
        * in a stylesheet. For example, to change the shape for the default
        * vertex style, the following code is used:
        *
        * (code)
        * var style = graph.getStylesheet().getDefaultVertexStyle();
        * style[mxConstants.STYLE_SHAPE] = 'customShape';
        * (end)
        */
    export class mxShape {
        /**
            * Holds the dialect in which the shape is to be painted.
            * This can be one of the DIALECT constants in <mxConstants>.
            */
        dialect: any;
        /**
            * Holds the scale in which the shape is being painted.
            */
        scale: number;
        /**
            * Rendering hint for configuring the canvas.
            */
        antiAlias: boolean;
        /**
            * Holds the <mxRectangle> that specifies the bounds of this shape.
            */
        bounds: mxRectangle;
        /**
            * Holds the array of <mxPoints> that specify the points of this shape.
            */
        points: mxPoint[];
        /**
            * Holds the outermost DOM node that represents this shape.
            */
        node: HTMLElement | SVGElement;
        /**
            * Optional reference to the corresponding <mxCellState>.
            */
        state: mxCellState;
        /**
            * Optional reference to the style of the corresponding <mxCellState>.
            */
        style: any[];
        /**
            * Contains the bounding box of the shape, that is, the smallest rectangle
            * that includes all pixels of the shape.
            */
        boundingBox: mxRectangle;
        /**
            * Holds the <mxStencil> that defines the shape.
            */
        stencil: mxStencil;
        /**
            * Event-tolerance for SVG strokes (in px). Default is 8. This is only passed
            * to the canvas in <createSvgCanvas> if <pointerEvents> is true.
            */
        svgStrokeTolerance: number;
        /**
            * Specifies if pointer events should be handled. Default is true.
            */
        pointerEvents: boolean;
        /**
            * Specifies if pointer events should be handled. Default is true.
            */
        svgPointerEvents: string;
        /**
            * Specifies if pointer events outside of shape should be handled. Default
            * is false.
            */
        shapePointerEvents: boolean;
        /**
            * Specifies if pointer events outside of stencils should be handled. Default
            * is false. Set this to true for backwards compatibility with the 1.x branch.
            */
        stencilPointerEvents: boolean;
        /**
            * Scale for improving the precision of VML rendering. Default is 1.
            */
        vmlScale: number;
        /**
            * Specifies if the shape should be drawn as an outline. This disables all
            * fill colors and can be used to disable other drawing states that should
            * not be painted for outlines. Default is false. This should be set before
            * calling <apply>.
            */
        outline: boolean;
        /**
            * Specifies if the shape is visible. Default is true.
            */
        visible: boolean;
        /**
            * Allows to use the SVG bounding box in SVG. Default is false for performance
            * reasons.
            */
        useSvgBoundingBox: boolean;
        /**
            * Implicit variable declarations
            */
        strokewidth: number;
        rotation: number;
        opacity: number;
        fillOpacity: number;
        strokeOpacity: number;
        flipH: boolean;
        flipV: boolean;
        spacing: any;
        fill: any;
        gradient: any;
        gradientDirection: any;
        stroke: any;
        startSize: any;
        endSize: any;
        startArrow: any;
        endArrow: any;
        direction: any;
        isShadow: any;
        isDashed: any;
        isRounded: any;
        glass: any;
        cursor: string;
        constructor(stencil?: any);
        /**
            * Initializes the shape by creaing the DOM node using <create>
            * and adding it into the given container.
            *
            * @param container - DOM node that will contain the shape.
            */
        init(container: HTMLElement): void;
        /**
            * Specifies if any VML should be added via insertAdjacentHtml to the DOM. This
            * is only needed in IE8 and only if the shape contains VML markup. This method
            * returns true.
            */
        isParseVml(): boolean;
        /**
            * Returns true if HTML is allowed for this shape. This implementation always
            * returns false.
            */
        isHtmlAllowed(): boolean;
        /**
            * Returns 0, or 0.5 if <strokewidth> % 2 == 1.
            */
        getSvgScreenOffset(): 0 | 0.5;
        /**
            * Creates and returns the DOM node(s) for the shape in
            * the given container. This implementation invokes
            * <createSvg>, <createHtml> or <createVml> depending
            * on the <dialect> and style settings.
            *
            * @param container - DOM node that will contain the shape.
            */
        create(container: Element): HTMLElement | SVGGElement;
        /**
            * Creates and returns the SVG node(s) to represent this shape.
            */
        createSvg(...args: any[]): SVGGElement;
        /**
            * Creates and returns the VML node to represent this shape.
            */
        createVml(...args: any[]): HTMLElement;
        /**
            * Creates and returns the HTML DOM node(s) to represent
            * this shape. This implementation falls back to <createVml>
            * so that the HTML creation is optional.
            */
        createHtml(...args: any[]): HTMLDivElement;
        /**
            * Reconfigures this shape. This will update the colors etc in
            * addition to the bounds or points.
            */
        reconfigure(): void;
        /**
            * Creates and returns the SVG node(s) to represent this shape.
            */
        redraw(): void;
        /**
            * Removes all child nodes and resets all CSS.
            */
        clear(): void;
        /**
            * Updates the bounds based on the points.
            */
        updateBoundsFromPoints(): void;
        /**
            * Returns the <mxRectangle> for the label bounds of this shape, based on the
            * given scaled and translated bounds of the shape. This method should not
            * change the rectangle in-place. This implementation returns the given rect.
            */
        getLabelBounds(rect: any): any;
        /**
            * Returns the scaled top, left, bottom and right margin to be used for
            * computing the label bounds as an <mxRectangle>, where the bottom and right
            * margin are defined in the width and height of the rectangle, respectively.
            */
        getLabelMargins(rect: any): any;
        /**
            * Returns true if the bounds are not null and all of its variables are numeric.
            */
        checkBounds(): boolean;
        /**
            * Returns the temporary element used for rendering in IE8 standards mode.
            */
        createVmlGroup(): HTMLElement;
        /**
            * Updates the SVG or VML shape.
            */
        redrawShape(): void;
        /**
            * Creates a new canvas for drawing this shape. May return null.
            */
        createCanvas(): mxSvgCanvas2D | mxVmlCanvas2D;
        /**
            * Creates and returns an <mxSvgCanvas2D> for rendering this shape.
            */
        createSvgCanvas(): mxSvgCanvas2D;
        /**
            * Creates and returns an <mxVmlCanvas2D> for rendering this shape.
            */
        createVmlCanvas(): any;
        /**
            * Updates the bounds of the VML container.
            */
        updateVmlContainer(): void;
        /**
            * Allow optimization by replacing VML with HTML.
            */
        redrawHtmlShape(): void;
        /**
            * Allow optimization by replacing VML with HTML.
            */
        updateHtmlFilters(node: any): void;
        /**
            * Allow optimization by replacing VML with HTML.
            */
        updateHtmlColors(node: any): void;
        /**
            * Allow optimization by replacing VML with HTML.
            */
        updateHtmlBounds(node: any): void;
        /**
            * Destroys the given canvas which was used for drawing. This implementation
            * increments the reference counts on all shared gradients used in the canvas.
            */
        destroyCanvas(canvas: any): void;
        /**
            * Generic rendering code.
            */
        paint(c: any): void;
        /**
            * Sets the state of the canvas for drawing the shape.
            */
        configureCanvas(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Returns the bounding box for the gradient box for this shape.
            */
        getGradientBounds(c: any, x: any, y: any, w: any, h: any): mxRectangle;
        /**
            * Sets the scale and rotation on the given canvas.
            */
        updateTransform(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Paints the vertex shape.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Hook for subclassers. This implementation is empty.
            */
        paintBackground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Hook for subclassers. This implementation is empty.
            */
        paintForeground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Hook for subclassers. This implementation is empty.
            */
        paintEdgeShape(c: any, pts: any): void;
        /**
            * Returns the arc size for the given dimension.
            */
        getArcSize(w: any, h: any): number;
        /**
            * Paints the glass gradient effect.
            */
        paintGlassEffect(c: any, x: any, y: any, w: any, h: any, arc: any): void;
        /**
            * Paints the given points with rounded corners.
            */
        addPoints(c: any, pts: any, rounded: any, arcSize: any, close: any, exclude: any, initialMove: any): void;
        /**
            * Resets all styles.
            */
        resetStyles(): void;
        /**
            * Applies the style of the given <mxCellState> to the shape. This
            * implementation assigns the following styles to local fields:
            *
            * - <mxConstants.STYLE_FILLCOLOR> => fill
            * - <mxConstants.STYLE_GRADIENTCOLOR> => gradient
            * - <mxConstants.STYLE_GRADIENT_DIRECTION> => gradientDirection
            * - <mxConstants.STYLE_OPACITY> => opacity
            * - <mxConstants.STYLE_FILL_OPACITY> => fillOpacity
            * - <mxConstants.STYLE_STROKE_OPACITY> => strokeOpacity
            * - <mxConstants.STYLE_STROKECOLOR> => stroke
            * - <mxConstants.STYLE_STROKEWIDTH> => strokewidth
            * - <mxConstants.STYLE_SHADOW> => isShadow
            * - <mxConstants.STYLE_DASHED> => isDashed
            * - <mxConstants.STYLE_SPACING> => spacing
            * - <mxConstants.STYLE_STARTSIZE> => startSize
            * - <mxConstants.STYLE_ENDSIZE> => endSize
            * - <mxConstants.STYLE_ROUNDED> => isRounded
            * - <mxConstants.STYLE_STARTARROW> => startArrow
            * - <mxConstants.STYLE_ENDARROW> => endArrow
            * - <mxConstants.STYLE_ROTATION> => rotation
            * - <mxConstants.STYLE_DIRECTION> => direction
            * - <mxConstants.STYLE_GLASS> => glass
            *
            * This keeps a reference to the <style>. If you need to keep a reference to
            * the cell, you can override this method and store a local reference to
            * state.cell or the <mxCellState> itself. If <outline> should be true, make
            * sure to set it before calling this method.
            *
            * state - <mxCellState> of the corresponding cell.
            */
        apply(state: any): void;
        /**
            * Sets the cursor on the given shape.
            *
            * cursor - The cursor to be used.
            */
        setCursor(cursor: any): void;
        /**
            * Returns the current cursor.
            */
        getCursor(): string;
        /**
            * Updates the <boundingBox> for this shape using <createBoundingBox> and
            * <augmentBoundingBox> and stores the result in <boundingBox>.
            */
        updateBoundingBox(): void;
        /**
            * Returns a new rectangle that represents the bounding box of the bare shape
            * with no shadows or strokewidths.
            */
        createBoundingBox(): any;
        /**
            * Augments the bounding box with the strokewidth and shadow offsets.
            */
        augmentBoundingBox(bbox: any): void;
        /**
            * Returns true if the bounds should be inverted.
            */
        isPaintBoundsInverted(): boolean;
        /**
            * Returns the rotation from the style.
            */
        getRotation(): number;
        /**
            * Returns the rotation for the text label.
            */
        getTextRotation(): number;
        /**
            * Returns the actual rotation of the shape.
            */
        getShapeRotation(): number;
        /**
            * Adds a transparent rectangle that catches all events.
            */
        createTransparentSvgRectangle(x: any, y: any, w: any, h: any): Element;
        /**
            * Sets a transparent background CSS style to catch all events.
            *
            * Paints the line shape.
            */
        setTransparentBackgroundImage(node: any): void;
        /**
            * Paints the line shape.
            */
        releaseSvgGradients(grads: any): void;
        /**
            * Destroys the shape by removing it from the DOM and releasing the DOM
            * node associated with the shape using <mxEvent.release>.
            */
        destroy(): void;
    }

    /**
      * Code to add stencils.
      *
      * (code)
      * var req = mxUtils.load('test/stencils.xml');
      * var root = req.getDocumentElement();
      * var shape = root.firstChild;
      *
      * while (shape != null)
      * {
      * 	 if (shape.nodeType == mxConstants.NODETYPE_ELEMENT)
      *   {
      *     mxStencilRegistry.addStencil(shape.getAttribute('name'), new mxStencil(shape));
      *   }
      *
      *   shape = shape.nextSibling;
      * }
      * (end)
      */
    export var mxStencilRegistry: {
        stencils: {};
        addStencil(name: any, stencil: any): void;
        getStencil(name: any): any;
    };


    export var mxMarker: {
        markers: any[];
        addMarker(type: any, funct: any): void;
        createMarker(canvas: any, shape: any, type: any, pe: any, unitX: any, unitY: any, size: any, source: any, sw: any, filled: any): any;
    };

    /**
        * Extends <mxShape> to implement an actor shape. If a custom shape with one
        * filled area is needed, then this shape's <redrawPath> should be overridden.
        *
        * Example:
        *
        * (code)
        * function SampleShape() { }
        *
        * SampleShape.prototype = new mxActor();
        * SampleShape.prototype.constructor = vsAseShape;
        *
        * mxCellRenderer.registerShape('sample', SampleShape);
        * SampleShape.prototype.redrawPath = function(path, x, y, w, h)
        * {
        *   path.moveTo(0, 0);
        *   path.lineTo(w, h);
        *   // ...
        *   path.close();
        * }
        * (end)
        *
        * This shape is registered under <mxConstants.SHAPE_ACTOR> in
        * <mxCellRenderer>.
        *
        * Constructor: mxActor
        *
        * Constructs a new actor shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxActor extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Redirects to redrawPath for subclasses to work.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Draws the path for this shape.
            */
        redrawPath(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxActor> to implement a cloud shape.
        *
        * This shape is registered under <mxConstants.SHAPE_CLOUD> in
        * <mxCellRenderer>.
        *
        * Constructor: mxCloud
        *
        * Constructs a new cloud shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxCloud extends mxActor {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Draws the path for this shape.
            */
        redrawPath(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement a rectangle shape.
        * This shape is registered under <mxConstants.SHAPE_RECTANGLE>
        * in <mxCellRenderer>.
        */
    export class mxRectangleShape extends mxShape {
        /**
            * Constructs a new rectangle shape.
            *
            * @param bounds - <mxRectangle> that defines the bounds. This is stored in
            * <mxShape.bounds>.
            * @param fill - String that defines the fill color. This is stored in <fill>.
            * @param stroke - String that defines the stroke color. This is stored in <stroke>.
            * @param strokewidth - Optional integer that defines the stroke width. Default is
            * 1. This is stored in <strokewidth>.
            */
        constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth?: number);
        /**
            * Returns true for non-rounded, non-rotated shapes with no glass gradient.
            */
        isHtmlAllowed(): boolean;
        /**
            * Generic background painting implementation.
            */
        paintBackground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Generic background painting implementation.
            */
        paintForeground(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement an ellipse shape.
        * This shape is registered under <mxConstants.SHAPE_ELLIPSE>
        * in <mxCellRenderer>.
        *
        * Constructor: mxEllipse
        *
        * Constructs a new ellipse shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxEllipse extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Paints the ellipse shape.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement a double ellipse shape. This shape is
        * registered under <mxConstants.SHAPE_DOUBLE_ELLIPSE> in <mxCellRenderer>.
        * Use the following override to only fill the inner ellipse in this shape:
        *
        * (code)
        * mxDoubleEllipse.prototype.paintVertexShape = function(c, x, y, w, h)
        * {
        *   c.ellipse(x, y, w, h);
        *   c.stroke();
        *
        *   var inset = mxUtils.getValue(this.style, mxConstants.STYLE_MARGIN, Math.min(3 + this.strokewidth, Math.min(w / 5, h / 5)));
        *   x += inset;
        *   y += inset;
        *   w -= 2 * inset;
        *   h -= 2 * inset;
        *
        *   if (w > 0 && h > 0)
        *   {
        *     c.ellipse(x, y, w, h);
        *   }
        *
        *   c.fillAndStroke();
        * };
        * (end)
        *
        * Constructor: mxDoubleEllipse
        *
        * Constructs a new ellipse shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxDoubleEllipse extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Paints the background.
            */
        paintBackground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Paints the foreground.
            */
        paintForeground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Returns the bounds for the label.
            */
        getLabelBounds(rect: any): mxRectangle;
    }

    /**
        * Extends <mxShape> to implement a rhombus (aka diamond) shape.
        * This shape is registered under <mxConstants.SHAPE_RHOMBUS>
        * in <mxCellRenderer>.
        *
        * Constructor: mxRhombus
        *
        * Constructs a new rhombus shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxRhombus extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Generic painting implementation.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement a polyline (a line with multiple points).
        * This shape is registered under <mxConstants.SHAPE_POLYLINE> in
        * <mxCellRenderer>.
        *
        * Constructor: mxPolyline
        *
        * Constructs a new polyline shape.
        *
        * Parameters:
        *
        * points - Array of <mxPoints> that define the points. This is stored in
        * <mxShape.points>.
        * stroke - String that defines the stroke color. Default is 'black'. This is
        * stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxPolyline extends mxShape {
        constructor(points: mxPoint[], stroke: string, strokewidth?: number);
        /**
            * Returns 0.
            */
        getRotation(): number;
        /**
            * Returns 0.
            */
        getShapeRotation(): number;
        /**
            * Returns false.
            */
        isPaintBoundsInverted(): boolean;
        /**
            * Paints the line shape.
            */
        paintEdgeShape(c: any, pts: any): void;
        /**
            * Paints the line shape.
            */
        paintLine(c: any, pts: any, rounded: any): void;
        /**
            * Paints the line shape.
            */
        paintCurvedLine(c: any, pts: any): void;
    }

    /**
        * Extends <mxShape> to implement an arrow shape. (The shape
        * is used to represent edges, not vertices.)
        * This shape is registered under <mxConstants.SHAPE_ARROW>
        * in <mxCellRenderer>.
        *
        * Constructor: mxArrow
        *
        * Constructs a new arrow shape.
        *
        * Parameters:
        *
        * points - Array of <mxPoints> that define the points. This is stored in
        * <mxShape.points>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        * arrowWidth - Optional integer that defines the arrow width. Default is
        * <mxConstants.ARROW_WIDTH>. This is stored in <arrowWidth>.
        * spacing - Optional integer that defines the spacing between the arrow shape
        * and its endpoints. Default is <mxConstants.ARROW_SPACING>. This is stored in
        * <spacing>.
        * endSize - Optional integer that defines the size of the arrowhead. Default
        * is <mxConstants.ARROW_SIZE>. This is stored in <endSize>.
        */
    export class mxArrow extends mxShape {
        constructor(points: any, fill: any, stroke: any, strokewidth: any, arrowWidth: any, spacing: any, endSize: any);
        /**
            * Augments the bounding box with the edge width and markers.
            */
        augmentBoundingBox(bbox: any): void;
        /**
            * Paints the line shape.
            */
        paintEdgeShape(c: any, pts: any): void;
    }

    /**
        * Extends <mxShape> to implement an new rounded arrow shape with support for
        * waypoints and double arrows. (The shape is used to represent edges, not
        * vertices.) This shape is registered under <mxConstants.SHAPE_ARROW_CONNECTOR>
        * in <mxCellRenderer>.
        *
        * Constructor: mxArrowConnector
        *
        * Constructs a new arrow shape.
        *
        * Parameters:
        *
        * points - Array of <mxPoints> that define the points. This is stored in
        * <mxShape.points>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        * arrowWidth - Optional integer that defines the arrow width. Default is
        * <mxConstants.ARROW_WIDTH>. This is stored in <arrowWidth>.
        * spacing - Optional integer that defines the spacing between the arrow shape
        * and its endpoints. Default is <mxConstants.ARROW_SPACING>. This is stored in
        * <spacing>.
        * endSize - Optional integer that defines the size of the arrowhead. Default
        * is <mxConstants.ARROW_SIZE>. This is stored in <endSize>.
        */
    export class mxArrowConnector extends mxShape {
        constructor(points: any, fill: any, stroke: any, strokewidth: any, arrowWidth: any, spacing: any, endSize: any);
        /**
            * Overrides mxShape to reset spacing.
            */
        resetStyles(): void;
        /**
            * Overrides apply to get smooth transition from default start- and endsize.
            */
        apply(state: any): void;
        /**
            * Augments the bounding box with the edge width and markers.
            */
        augmentBoundingBox(bbox: any): void;
        /**
            * Paints the line shape.
            */
        paintEdgeShape(c: any, pts: any): void;
        /**
            * Paints the line shape.
            */
        paintMarker(c: any, ptX: any, ptY: any, nx: any, ny: any, size: any, arrowWidth: any, edgeWidth: any, spacing: any, initialMove: any): void;
        /**
            * Returns wether the arrow is rounded
            */
        isArrowRounded(): any;
        /**
            * Returns the width of the start arrow
            */
        getStartArrowWidth(): number;
        /**
            * Returns the width of the end arrow
            */
        getEndArrowWidth(): number;
        /**
            * Returns the width of the body of the edge
            */
        getEdgeWidth(): number;
        /**
            * Returns whether the ends of the shape are drawn
            */
        isOpenEnded(): boolean;
        /**
            * Returns whether the start marker is drawn
            */
        isMarkerStart(): boolean;
        /**
            * Returns whether the end marker is drawn
            */
        isMarkerEnd(): boolean;
    }

    /**
        * Extends <mxShape> to implement a text shape. To change vertical text from
        * bottom to top to top to bottom, the following code can be used:
        *
        * @example
        * mxText.prototype.verticalTextRotation = 90;
        */
    export class mxText extends mxShape {
        /**
            * Specifies the spacing to be added to the top spacing. Default is 0. Use the
            * value 5 here to get the same label positions as in mxGraph 1.x.
            */
        baseSpacingTop: number;
        /**
            * Specifies the spacing to be added to the bottom spacing. Default is 0. Use the
            * value 1 here to get the same label positions as in mxGraph 1.x.
            */
        baseSpacingBottom: number;
        /**
            * Specifies the spacing to be added to the left spacing. Default is 0.
            */
        baseSpacingLeft: number;
        /**
            * Specifies the spacing to be added to the right spacing. Default is 0.
            */
        baseSpacingRight: number;
        /**
            * Specifies if linefeeds in HTML labels should be replaced with BR tags.
            * Default is true.
            */
        replaceLinefeeds: boolean;
        /**
            * Rotation for vertical text. Default is -90 (bottom to top).
            */
        verticalTextRotation: number;
        /**
            * Specifies if the string size should be measured in <updateBoundingBox> if
            * the label is clipped and the label position is center and middle. If this is
            * true, then the bounding box will be set to <bounds>. Default is true.
            * <ignoreStringSize> has precedence over this switch.
            */
        ignoreClippedStringSize: boolean;
        /**
            * Specifies if the actual string size should be measured. If disabled the
            * boundingBox will not ignore the actual size of the string, otherwise
            * <bounds> will be used instead. Default is false.
            */
        ignoreStringSize: boolean;
        /**
            * Specifies the padding to be added to the text width for the bounding box.
            * This is needed to make sure no clipping is applied to borders. Default is 4
            * for IE 8 standards mode and 3 for all others.
            */
        textWidthPadding: number;
        /**
            * Contains the last rendered text value. Used for caching.
            */
        lastValue: any;
        /**
            * Specifies if caching for HTML labels should be enabled. Default is true.
            */
        cacheEnabled: boolean;
        /**
            * Implicitly defined variables
            */
        textDirection: any;
        labelPadding: any;
        overflow: any;
        clipped: any;
        wrap: any;
        border: any;
        background: any;
        horizontal: any;
        spacingLeft: any;
        spacingBottom: any;
        spacingRight: any;
        spacingTop: any;
        fontStyle: any;
        size: any;
        family: any;
        valign: any;
        align: any;
        color: any;
        value: any;
        /**
            * Constructs a new text shape.
            *
            * @param value - String that represents the text to be displayed. This is stored in
            * <value>.
            * @param bounds - <mxRectangle> that defines the bounds. This is stored in
            * <mxShape.bounds>.
            * @param align - Specifies the horizontal alignment. Default is ''. This is stored in
            * <align>.
            * @param valign - Specifies the vertical alignment. Default is ''. This is stored in
            * <valign>.
            * @param color - String that specifies the text color. Default is 'black'. This is
            * stored in <color>.
            * @param family - String that specifies the font family. Default is
            * <mxConstants.DEFAULT_FONTFAMILY>. This is stored in <family>.
            * @param size - Integer that specifies the font size. Default is
            * <mxConstants.DEFAULT_FONTSIZE>. This is stored in <size>.
            * @param fontStyle - Specifies the font style. Default is 0. This is stored in
            * <fontStyle>.
            * @param spacing - Integer that specifies the global spacing. Default is 2. This is
            * stored in <spacing>.
            * @param spacingTop - Integer that specifies the top spacing. Default is 0. The
            * sum of the spacing and this is stored in <spacingTop>.
            * @param spacingRight - Integer that specifies the right spacing. Default is 0. The
            * sum of the spacing and this is stored in <spacingRight>.
            * @param spacingBottom - Integer that specifies the bottom spacing. Default is 0.The
            * sum of the spacing and this is stored in <spacingBottom>.
            * @param spacingLeft - Integer that specifies the left spacing. Default is 0. The
            * sum of the spacing and this is stored in <spacingLeft>.
            * @param horizontal - Boolean that specifies if the label is horizontal. Default is
            * true. This is stored in <horizontal>.
            * @param background - String that specifies the background color. Default is null.
            * This is stored in <background>.
            * @param border - String that specifies the label border color. Default is null.
            * This is stored in <border>.
            * @param wrap - Specifies if word-wrapping should be enabled. Default is false.
            * This is stored in <wrap>.
            * @param clipped - Specifies if the label should be clipped. Default is false.
            * This is stored in <clipped>.
            * @param overflow - Value of the overflow style. Default is 'visible'.
            */
        constructor(value: any, bounds: any, align: any, valign: any, color: any, family: any, size: any, fontStyle: any, spacing: any, spacingTop: any, spacingRight: any, spacingBottom: any, spacingLeft: any, horizontal: any, background: any, border: any, wrap: any, clipped: any, overflow: any, labelPadding: any, textDirection: any);
        /**
            * Text shapes do not contain VML markup and do not need to be parsed. This
            * method returns false to speed up rendering in IE8.
            */
        isParseVml(): boolean;
        /**
            * Returns true if HTML is allowed for this shape. This implementation returns
            * true if the browser is not in IE8 standards mode.
            */
        isHtmlAllowed(): boolean;
        /**
            * Disables offset in IE9 for crisper image output.
            */
        getSvgScreenOffset(): 0;
        /**
            * Returns true if the bounds are not null and all of its variables are numeric.
            */
        checkBounds(): boolean;
        /**
            * Generic rendering code.
            */
        paint(c: any, update?: boolean): void;
        /**
            * Renders the text using the given DOM nodes.
            */
        redraw(): void;
        /**
            * Resets all styles.
            */
        resetStyles(): void;
        /**
            * Extends mxShape to update the text styles.
            *
            * state - <mxCellState> of the corresponding cell.
            */
        apply(state: any): void;
        /**
            * Used to determine the automatic text direction. Returns
            * <mxConstants.TEXT_DIRECTION_LTR> or <mxConstants.TEXT_DIRECTION_RTL>
            * depending on the contents of <value>. This is not invoked for HTML, wrapped
            * content or if <value> is a DOM node.
            */
        getAutoDirection(): string;
        /**
            * Updates the <boundingBox> for this shape using the given node and position.
            */
        updateBoundingBox(): void;
        /**
            * Returns 0 to avoid using rotation in the canvas via updateTransform.
            */
        getShapeRotation(): number;
        /**
            * Returns the rotation for the text label of the corresponding shape.
            */
        getTextRotation(): number;
        /**
            * Inverts the bounds if <mxShape.isBoundsInverted> returns true or if the
            * horizontal style is false.
            */
        isPaintBoundsInverted(): boolean;
        /**
            * Sets the state of the canvas for drawing the shape.
            */
        configureCanvas(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Sets the width and height of the container to 1px.
            */
        updateVmlContainer(): void;
        /**
            * Updates the HTML node(s) to reflect the latest bounds and scale.
            */
        redrawHtmlShape(): void;
        /**
            * Returns the spacing as an <mxPoint>.
            */
        updateHtmlTransform(): void;
        /**
            * Sets the inner HTML of the given element to the <value>.
            */
        updateInnerHtml(elt: any): void;
        /**
            * Rotated text rendering quality is bad for IE9 quirks/IE8 standards
            */
        updateHtmlFilter(): void;
        /**
            * Updates the HTML node(s) to reflect the latest bounds and scale.
            */
        updateValue(): void;
        /**
            * Updates the HTML node(s) to reflect the latest bounds and scale.
            */
        updateFont(node: any): void;
        /**
            * Updates the HTML node(s) to reflect the latest bounds and scale.
            */
        updateSize(node: any, enableWrap: any): void;
        /**
            * Returns the spacing as an <mxPoint>.
            */
        updateMargin(): void;
        /**
            * Returns the spacing as an <mxPoint>.
            */
        getSpacing(): mxPoint;
    }

    /**
        * Implementation of the triangle shape.
        *
        * Constructor: mxTriangle
        *
        * Constructs a new triangle shape.
        */
    export class mxTriangle extends mxActor {
        constructor();
        /**
            * Draws the path for this shape.
            */
        redrawPath(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Implementation of the hexagon shape.
        *
        * Constructor: mxHexagon
        *
        * Constructs a new hexagon shape.
        */
    export class mxHexagon extends mxActor {
        constructor();
        /**
            * Draws the path for this shape.
            */
        redrawPath(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement a horizontal line shape.
        * This shape is registered under <mxConstants.SHAPE_LINE> in
        * <mxCellRenderer>.
        *
        * Constructor: mxLine
        *
        * Constructs a new line shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * stroke - String that defines the stroke color. Default is 'black'. This is
        * stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxLine extends mxShape {
        constructor(bounds: any, stroke: any, strokewidth: any);
        /**
            * Redirects to redrawPath for subclasses to work.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
    }

    /**
        * Extends <mxShape> to implement an image shape. This shape is registered
        * under <mxConstants.SHAPE_IMAGE> in <mxCellRenderer>.
        */
    export class mxImageShape extends mxRectangleShape {
        /**
            * Switch to preserve image aspect. Default is true.
            */
        preserveImageAspect: boolean;
        /** URL of the image */
        image: string;
        shadow: boolean;
        /**
            * Constructs a new image shape.
            *
            * @param bounds - <mxRectangle> that defines the bounds. This is stored in
            * <mxShape.bounds>.
            * @param image - String that specifies the URL of the image. This is stored in
            * <image>.
            * @param fill - String that defines the fill color. This is stored in <fill>.
            * @param stroke - String that defines the stroke color. This is stored in <stroke>.
            * @param strokewidth - Optional integer that defines the stroke width. Default is
            * 0. This is stored in <strokewidth>.
            */
        constructor(bounds: mxRectangle, image: string, fill: string, stroke: string, strokewidth?: number);
        /**
            * Disables offset in IE9 for crisper image output.
            */
        getSvgScreenOffset(): 0;
        /**
            * Overrides <mxShape.apply> to replace the fill and stroke colors with the
            * respective values from <mxConstants.STYLE_IMAGE_BACKGROUND> and
            * <mxConstants.STYLE_IMAGE_BORDER>.
            *
            * Applies the style of the given <mxCellState> to the shape. This
            * implementation assigns the following styles to local fields:
            *
            * - <mxConstants.STYLE_IMAGE_BACKGROUND> => fill
            * - <mxConstants.STYLE_IMAGE_BORDER> => stroke
            *
            * @param state - <mxCellState> of the corresponding cell.
            */
        apply(state: mxCellState): void;
        /**
            * Returns true if HTML is allowed for this shape. This implementation always
            * returns false.
            */
        isHtmlAllowed(): boolean;
        /**
            * Creates and returns the HTML DOM node(s) to represent
            * this shape. This implementation falls back to <createVml>
            * so that the HTML creation is optional.
            */
        createHtml(): HTMLDivElement;
        /**
            * Generic background painting implementation.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Overrides <mxShape.redraw> to preserve the aspect ratio of images.
            */
        redrawHtmlShape(): void;
    }

    /**
        * Extends <mxShape> to implement an image shape with a label.
        * This shape is registered under <mxConstants.SHAPE_LABEL> in
        * <mxCellRenderer>.
        *
        * Constructor: mxLabel
        *
        * Constructs a new label shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxLabel extends mxRectangleShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Initializes the shape and the <indicator>.
            */
        init(container: any): void;
        /**
            * Reconfigures this shape. This will update the colors of the indicator
            * and reconfigure it if required.
            */
        redraw(): void;
        /**
            * Returns true for non-rounded, non-rotated shapes with no glass gradient and
            * no indicator shape.
            */
        isHtmlAllowed(): boolean;
        /**
            * Generic background painting implementation.
            */
        paintForeground(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Generic background painting implementation.
            */
        paintImage(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Generic background painting implementation.
            */
        getImageBounds(x: any, y: any, w: any, h: any): mxRectangle;
        /**
            * Generic background painting implementation.
            */
        paintIndicator(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Generic background painting implementation.
            */
        getIndicatorBounds(x: any, y: any, w: any, h: any): mxRectangle;
        /**
            * Generic background painting implementation.
            */
        redrawHtmlShape(): void;
    }

    /**
        * Extends <mxShape> to implement an cylinder shape. If a
        * custom shape with one filled area and an overlay path is
        * needed, then this shape's <redrawPath> should be overridden.
        * This shape is registered under <mxConstants.SHAPE_CYLINDER>
        * in <mxCellRenderer>.
        *
        * Constructor: mxCylinder
        *
        * Constructs a new cylinder shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxCylinder extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Redirects to redrawPath for subclasses to work.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Draws the path for this shape.
            */
        redrawPath(c: any, x: any, y: any, w: any, h: any, isForeground: any): void;
    }

    /**
        * Extends <mxShape> to implement a connector shape. The connector
        * shape allows for arrow heads on either side.
        *
        * This shape is registered under <mxConstants.SHAPE_CONNECTOR> in
        * <mxCellRenderer>.
        *
        * Constructor: mxConnector
        *
        * Constructs a new connector shape.
        *
        * Parameters:
        *
        * points - Array of <mxPoints> that define the points. This is stored in
        * <mxShape.points>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * Default is 'black'.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxConnector extends mxPolyline {
        constructor(points: any, stroke: any, strokewidth: any);
        /**
            * Updates the <boundingBox> for this shape using <createBoundingBox> and
            * <augmentBoundingBox> and stores the result in <boundingBox>.
            */
        updateBoundingBox(): void;
        /**
            * Paints the line shape.
            */
        paintEdgeShape(c: any, pts: any): void;
        /**
            * Prepares the marker by adding offsets in pts and returning a function to
            * paint the marker.
            */
        createMarker(c: any, pts: any, source: any): any;
        /**
            * Augments the bounding box with the strokewidth and shadow offsets.
            */
        augmentBoundingBox(bbox: any): void;
    }

    /**
        * Extends <mxShape> to implement a swimlane shape. This shape is registered
        * under <mxConstants.SHAPE_SWIMLANE> in <mxCellRenderer>. Use the
        * <mxConstants.STYLE_STYLE_STARTSIZE> to define the size of the title
        * region, <mxConstants.STYLE_SWIMLANE_FILLCOLOR> for the content area fill,
        * <mxConstants.STYLE_SEPARATORCOLOR> to draw an additional vertical separator
        * and <mxConstants.STYLE_SWIMLANE_LINE> to hide the line between the title
        * region and the content area. The <mxConstants.STYLE_HORIZONTAL> affects
        * the orientation of this shape, not only its label.
        *
        * Constructor: mxSwimlane
        *
        * Constructs a new swimlane shape.
        *
        * Parameters:
        *
        * bounds - <mxRectangle> that defines the bounds. This is stored in
        * <mxShape.bounds>.
        * fill - String that defines the fill color. This is stored in <fill>.
        * stroke - String that defines the stroke color. This is stored in <stroke>.
        * strokewidth - Optional integer that defines the stroke width. Default is
        * 1. This is stored in <strokewidth>.
        */
    export class mxSwimlane extends mxShape {
        constructor(bounds: any, fill: any, stroke: any, strokewidth: any);
        /**
            * Returns the bounding box for the gradient box for this shape.
            */
        getTitleSize(): number;
        /**
            * Returns the bounding box for the gradient box for this shape.
            */
        getLabelBounds(rect: any): mxRectangle;
        /**
            * Returns the bounding box for the gradient box for this shape.
            */
        getGradientBounds(c: any, x: any, y: any, w: any, h: any): mxRectangle;
        /**
            * Returns the arcsize for the swimlane.
            */
        getArcSize(w: any, h: any, start?: any): number;
        /**
            * Paints the swimlane vertex shape.
            */
        isHorizontal(): boolean;
        /**
            * Paints the swimlane vertex shape.
            */
        paintVertexShape(c: any, x: any, y: any, w: any, h: any): void;
        /**
            * Paints the swimlane vertex shape.
            */
        paintSwimlane(c: any, x: any, y: any, w: any, h: any, start: any, fill: any, swimlaneLine: any): void;
        /**
            * Paints the swimlane vertex shape.
            */
        paintRoundedSwimlane(c: any, x: any, y: any, w: any, h: any, start: any, r: any, fill: any, swimlaneLine: any): void;
        /**
            * Paints the swimlane vertex shape.
            */
        paintSeparator(c: any, x: any, y: any, w: any, h: any, start: any, color: any): void;
        /**
            * Paints the swimlane vertex shape.
            */
        getImageBounds(x: any, y: any, w: any, h: any): mxRectangle;
    }


    export var mxLog: {
        consoleName: string;
        TRACE: boolean;
        DEBUG: boolean;
        WARN: boolean;
        buffer: string;
        init(): void;
        info(): void;
        addButton(lab: any, funct: any): void;
        isVisible(): any;
        show(): void;
        setVisible(visible: any): void;
        enter(string: any): number;
        leave(string: any, t0: any): void;
        debug(): void;
        warn(): void;
        write(): void;
        writeln(): void;
    };


    export var mxObjectIdentity: {
        FIELD_NAME: string;
        counter: number;
        get(obj: any): any;
        clear(obj: any): void;
    };

    /**
        * A wrapper class for an associative array with object keys. Note: This
        * implementation uses <mxObjectIdentitiy> to turn object keys into strings.
        *
        * Constructor: mxEventSource
        *
        * Constructs a new dictionary which allows object to be used as keys.
        */
    export class mxDictionary {
        constructor();
        /**
            * Clears the dictionary.
            */
        clear(): void;
        /**
            * Returns the value for the given key.
            */
        get(key: any): any;
        /**
            * Stores the value under the given key and returns the previous
            * value for that key.
            */
        put(key: any, value: any): any;
        /**
            * Removes the value for the given key and returns the value that
            * has been removed.
            */
        remove(key: any): any;
        /**
            * Returns all keys as an array.
            */
        getKeys(): any[];
        /**
            * Returns all values as an array.
            */
        getValues(): any[];
        /**
            * Visits all entries in the dictionary using the given function with the
            * following signature: function(key, value) where key is a string and
            * value is an object.
            *
            * Parameters:
            *
            * visitor - A function that takes the key and value as arguments.
            */
        visit(visitor: any): void;
    }


    export var mxResources: {
        resources: any[];
        extension: string;
        resourcesEncoded: boolean;
        loadDefaultBundle: boolean;
        loadSpecialBundle: boolean;
        isLanguageSupported(lan: any): boolean;
        getDefaultBundle(basename: any, lan: any): string;
        getSpecialBundle(basename: string, lan: string): string;
        add(basename: string, lan?: string, callback?: () => void): void;
        parse(text: string): void;
        get(key: string, params?: string[], defaultValue?: string): string;
        replacePlaceholders(value: string, params: string[]): string;
        loadResources(callback?: () => void): void;
    };

    /**
        * Implements a 2-dimensional vector with double precision coordinates.
        */
    export class mxPoint {
        /**
            * Holds the x-coordinate of the point. Default is 0.
            * @desc Relative to left corner.
            */
        x: number;
        /**
            * Holds the y-coordinate of the point. Default is 0.
            * @desc Relative to top.
            */
        y: number;
        /**
            * Constructs a new point for the optional x and y coordinates, relative to
            * the top left corner. If no coordinates are given, then the default values
            * for <x> and <y> are used.
            */
        constructor(x?: number, y?: number);
        /**
            * Returns true if the given object equals this point.
            */
        equals(obj: mxPoint): boolean;
        /**
            * Returns a clone of this <mxPoint>.
            */
        clone(): any;
    }

    /**
        * Extends <mxPoint> to implement a 2-dimensional rectangle with double
        * precision coordinates.
        */
    export class mxRectangle extends mxPoint {
        /**
            * Holds the width of the rectangle. Default is 0.
            */
        width: number;
        /**
            * Holds the height of the rectangle. Default is 0.
            */
        height: number;
        /**
            * Constructs a new rectangle for the optional parameters. If no parameters
            * are given then the respective default values are used.
            *
            * @param x X-coordinate of the rectangle origin (top left corner)
            * @param y Y-coordinate of the rectangle origin (top left corner)
            * @param w Width of the rectangle
            * @param h Height of the rectangle
            */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
            * Sets this rectangle to the specified values
            *
            * @param x X-coordinate of the rectangle origin (top left corner)
            * @param y Y-coordinate of the rectangle origin (top left corner)
            * @param w Width of the rectangle
            * @param h Height of the rectangle
            */
        setRect(x: number, y: number, w: number, h: number): void;
        /**
            * Returns the x-coordinate of the center point.
            */
        getCenterX(): number;
        /**
            * Returns the y-coordinate of the center point.
            */
        getCenterY(): number;
        /**
            * Adds the given rectangle to this rectangle, i.e. such that it just
            * about contains the supplied rectangle.
            *
            * @param rect
            */
        add(rect: mxRectangle): void;
        /**
            * Changes this rectangle to where it overlaps with the given rectangle.
            *
            * @param rect
            */
        intersect(rect: mxRectangle): void;
        /**
            * Grows the rectangle by the given amount, that is, this method subtracts
            * the given amount from the x- and y-coordinates and adds twice the amount
            * to the width and height.
            */
        grow(amount: number): void;
        /**
            * Returns the top, left corner as a new <mxPoint>.
            */
        getPoint(): mxPoint;
        /**
            * Rotates this rectangle by 90 degree around its center point.
            */
        rotate90(): void;
        /**
            * Returns true if the given object equals this rectangle.
            */
        equals(obj: mxRectangle): boolean;
        /**
            * Returns a new <mxRectangle> which is a copy of the given rectangle.
            */
        static fromRectangle(rect: mxRectangle): mxRectangle;
    }


    export var mxEffects: {
        animateChanges(graph: any, changes: any, done: any): void;
        cascadeOpacity(graph: any, cell: any, opacity: any): void;
        fadeOut(node: any, from: any, remove: any, step: any, delay: any, isEnabled: any): void;
    };


    export var mxUtils: any;


    export var mxConstants: {
        DEFAULT_HOTSPOT: number;
        MIN_HOTSPOT_SIZE: number;
        MAX_HOTSPOT_SIZE: number;
        RENDERING_HINT_EXACT: string;
        RENDERING_HINT_FASTER: string;
        RENDERING_HINT_FASTEST: string;
        DIALECT_SVG: string;
        DIALECT_VML: string;
        DIALECT_MIXEDHTML: string;
        DIALECT_PREFERHTML: string;
        DIALECT_STRICTHTML: string;
        NS_SVG: string;
        NS_XHTML: string;
        NS_XLINK: string;
        SHADOWCOLOR: string;
        VML_SHADOWCOLOR: string;
        SHADOW_OFFSET_X: number;
        SHADOW_OFFSET_Y: number;
        SHADOW_OPACITY: number;
        NODETYPE_ELEMENT: number;
        NODETYPE_ATTRIBUTE: number;
        NODETYPE_TEXT: number;
        NODETYPE_CDATA: number;
        NODETYPE_ENTITY_REFERENCE: number;
        NODETYPE_ENTITY: number;
        NODETYPE_PROCESSING_INSTRUCTION: number;
        NODETYPE_COMMENT: number;
        NODETYPE_DOCUMENT: number;
        NODETYPE_DOCUMENTTYPE: number;
        NODETYPE_DOCUMENT_FRAGMENT: number;
        NODETYPE_NOTATION: number;
        TOOLTIP_VERTICAL_OFFSET: number;
        DEFAULT_VALID_COLOR: string;
        DEFAULT_INVALID_COLOR: string;
        OUTLINE_HIGHLIGHT_COLOR: string;
        OUTLINE_HIGHLIGHT_STROKEWIDTH: number;
        HIGHLIGHT_STROKEWIDTH: number;
        HIGHLIGHT_SIZE: number;
        HIGHLIGHT_OPACITY: number;
        CURSOR_MOVABLE_VERTEX: string;
        CURSOR_MOVABLE_EDGE: string;
        CURSOR_LABEL_HANDLE: string;
        CURSOR_TERMINAL_HANDLE: string;
        CURSOR_BEND_HANDLE: string;
        CURSOR_VIRTUAL_BEND_HANDLE: string;
        CURSOR_CONNECT: string;
        HIGHLIGHT_COLOR: string;
        CONNECT_TARGET_COLOR: string;
        INVALID_CONNECT_TARGET_COLOR: string;
        DROP_TARGET_COLOR: string;
        VALID_COLOR: string;
        INVALID_COLOR: string;
        EDGE_SELECTION_COLOR: string;
        VERTEX_SELECTION_COLOR: string;
        VERTEX_SELECTION_STROKEWIDTH: number;
        EDGE_SELECTION_STROKEWIDTH: number;
        VERTEX_SELECTION_DASHED: boolean;
        EDGE_SELECTION_DASHED: boolean;
        GUIDE_COLOR: string;
        GUIDE_STROKEWIDTH: number;
        OUTLINE_COLOR: string;
        OUTLINE_STROKEWIDTH: number;
        HANDLE_SIZE: number;
        LABEL_HANDLE_SIZE: number;
        HANDLE_FILLCOLOR: string;
        HANDLE_STROKECOLOR: string;
        LABEL_HANDLE_FILLCOLOR: string;
        CONNECT_HANDLE_FILLCOLOR: string;
        LOCKED_HANDLE_FILLCOLOR: string;
        OUTLINE_HANDLE_FILLCOLOR: string;
        OUTLINE_HANDLE_STROKECOLOR: string;
        DEFAULT_FONTFAMILY: string;
        DEFAULT_FONTSIZE: number;
        DEFAULT_TEXT_DIRECTION: string;
        LINE_HEIGHT: number;
        WORD_WRAP: string;
        ABSOLUTE_LINE_HEIGHT: boolean;
        DEFAULT_FONTSTYLE: number;
        DEFAULT_STARTSIZE: number;
        DEFAULT_MARKERSIZE: number;
        DEFAULT_IMAGESIZE: number;
        ENTITY_SEGMENT: number;
        RECTANGLE_ROUNDING_FACTOR: number;
        LINE_ARCSIZE: number;
        ARROW_SPACING: number;
        ARROW_WIDTH: number;
        ARROW_SIZE: number;
        PAGE_FORMAT_A4_PORTRAIT: mxRectangle;
        PAGE_FORMAT_A4_LANDSCAPE: mxRectangle;
        PAGE_FORMAT_LETTER_PORTRAIT: mxRectangle;
        PAGE_FORMAT_LETTER_LANDSCAPE: mxRectangle;
        NONE: string;
        STYLE_PERIMETER: string;
        STYLE_SOURCE_PORT: string;
        STYLE_TARGET_PORT: string;
        STYLE_PORT_CONSTRAINT: string;
        STYLE_PORT_CONSTRAINT_ROTATION: string;
        STYLE_SOURCE_PORT_CONSTRAINT: string;
        STYLE_TARGET_PORT_CONSTRAINT: string;
        STYLE_OPACITY: string;
        STYLE_FILL_OPACITY: string;
        STYLE_STROKE_OPACITY: string;
        STYLE_TEXT_OPACITY: string;
        STYLE_TEXT_DIRECTION: string;
        STYLE_OVERFLOW: string;
        STYLE_ORTHOGONAL: string;
        STYLE_EXIT_X: string;
        STYLE_EXIT_Y: string;
        STYLE_EXIT_PERIMETER: string;
        STYLE_ENTRY_X: string;
        STYLE_ENTRY_Y: string;
        STYLE_ENTRY_PERIMETER: string;
        STYLE_WHITE_SPACE: string;
        STYLE_ROTATION: string;
        STYLE_FILLCOLOR: string;
        STYLE_POINTER_EVENTS: string;
        STYLE_SWIMLANE_FILLCOLOR: string;
        STYLE_MARGIN: string;
        STYLE_GRADIENTCOLOR: string;
        STYLE_GRADIENT_DIRECTION: string;
        STYLE_STROKECOLOR: string;
        STYLE_SEPARATORCOLOR: string;
        STYLE_STROKEWIDTH: string;
        STYLE_ALIGN: string;
        STYLE_VERTICAL_ALIGN: string;
        STYLE_LABEL_WIDTH: string;
        STYLE_LABEL_POSITION: string;
        STYLE_VERTICAL_LABEL_POSITION: string;
        STYLE_IMAGE_ASPECT: string;
        STYLE_IMAGE_ALIGN: string;
        STYLE_IMAGE_VERTICAL_ALIGN: string;
        STYLE_GLASS: string;
        STYLE_IMAGE: string;
        STYLE_IMAGE_WIDTH: string;
        STYLE_IMAGE_HEIGHT: string;
        STYLE_IMAGE_BACKGROUND: string;
        STYLE_IMAGE_BORDER: string;
        STYLE_FLIPH: string;
        STYLE_FLIPV: string;
        STYLE_NOLABEL: string;
        STYLE_NOEDGESTYLE: string;
        STYLE_LABEL_BACKGROUNDCOLOR: string;
        STYLE_LABEL_BORDERCOLOR: string;
        STYLE_LABEL_PADDING: string;
        STYLE_INDICATOR_SHAPE: string;
        STYLE_INDICATOR_IMAGE: string;
        STYLE_INDICATOR_COLOR: string;
        STYLE_INDICATOR_STROKECOLOR: string;
        STYLE_INDICATOR_GRADIENTCOLOR: string;
        STYLE_INDICATOR_SPACING: string;
        STYLE_INDICATOR_WIDTH: string;
        STYLE_INDICATOR_HEIGHT: string;
        STYLE_INDICATOR_DIRECTION: string;
        STYLE_SHADOW: string;
        STYLE_SEGMENT: string;
        STYLE_ENDARROW: string;
        STYLE_STARTARROW: string;
        STYLE_ENDSIZE: string;
        STYLE_STARTSIZE: string;
        STYLE_SWIMLANE_LINE: string;
        STYLE_ENDFILL: string;
        STYLE_STARTFILL: string;
        STYLE_DASHED: string;
        STYLE_DASH_PATTERN: string;
        STYLE_FIX_DASH: string;
        STYLE_ROUNDED: string;
        STYLE_CURVED: string;
        STYLE_ARCSIZE: string;
        STYLE_ABSOLUTE_ARCSIZE: string;
        STYLE_SOURCE_PERIMETER_SPACING: string;
        STYLE_TARGET_PERIMETER_SPACING: string;
        STYLE_PERIMETER_SPACING: string;
        STYLE_SPACING: string;
        STYLE_SPACING_TOP: string;
        STYLE_SPACING_LEFT: string;
        STYLE_SPACING_BOTTOM: string;
        STYLE_SPACING_RIGHT: string;
        STYLE_HORIZONTAL: string;
        STYLE_DIRECTION: string;
        STYLE_ELBOW: string;
        STYLE_FONTCOLOR: string;
        STYLE_FONTFAMILY: string;
        STYLE_FONTSIZE: string;
        STYLE_FONTSTYLE: string;
        STYLE_ASPECT: string;
        STYLE_AUTOSIZE: string;
        STYLE_FOLDABLE: string;
        STYLE_EDITABLE: string;
        STYLE_BENDABLE: string;
        STYLE_MOVABLE: string;
        STYLE_RESIZABLE: string;
        STYLE_RESIZE_WIDTH: string;
        STYLE_RESIZE_HEIGHT: string;
        STYLE_ROTATABLE: string;
        STYLE_CLONEABLE: string;
        STYLE_DELETABLE: string;
        STYLE_SHAPE: string;
        STYLE_EDGE: string;
        STYLE_JETTY_SIZE: string;
        STYLE_SOURCE_JETTY_SIZE: string;
        STYLE_TARGET_JETTY_SIZE: string;
        STYLE_LOOP: string;
        STYLE_ORTHOGONAL_LOOP: string;
        STYLE_ROUTING_CENTER_X: string;
        STYLE_ROUTING_CENTER_Y: string;
        FONT_BOLD: number;
        FONT_ITALIC: number;
        FONT_UNDERLINE: number;
        SHAPE_RECTANGLE: string;
        SHAPE_ELLIPSE: string;
        SHAPE_DOUBLE_ELLIPSE: string;
        SHAPE_RHOMBUS: string;
        SHAPE_LINE: string;
        SHAPE_IMAGE: string;
        SHAPE_ARROW: string;
        SHAPE_ARROW_CONNECTOR: string;
        SHAPE_LABEL: string;
        SHAPE_CYLINDER: string;
        SHAPE_SWIMLANE: string;
        SHAPE_CONNECTOR: string;
        SHAPE_ACTOR: string;
        SHAPE_CLOUD: string;
        SHAPE_TRIANGLE: string;
        SHAPE_HEXAGON: string;
        ARROW_CLASSIC: string;
        ARROW_CLASSIC_THIN: string;
        ARROW_BLOCK: string;
        ARROW_BLOCK_THIN: string;
        ARROW_OPEN: string;
        ARROW_OPEN_THIN: string;
        ARROW_OVAL: string;
        ARROW_DIAMOND: string;
        ARROW_DIAMOND_THIN: string;
        ALIGN_LEFT: string;
        ALIGN_CENTER: string;
        ALIGN_RIGHT: string;
        ALIGN_TOP: string;
        ALIGN_MIDDLE: string;
        ALIGN_BOTTOM: string;
        DIRECTION_NORTH: string;
        DIRECTION_SOUTH: string;
        DIRECTION_EAST: string;
        DIRECTION_WEST: string;
        TEXT_DIRECTION_DEFAULT: string;
        TEXT_DIRECTION_AUTO: string;
        TEXT_DIRECTION_LTR: string;
        TEXT_DIRECTION_RTL: string;
        DIRECTION_MASK_NONE: number;
        DIRECTION_MASK_WEST: number;
        DIRECTION_MASK_NORTH: number;
        DIRECTION_MASK_SOUTH: number;
        DIRECTION_MASK_EAST: number;
        DIRECTION_MASK_ALL: number;
        ELBOW_VERTICAL: string;
        ELBOW_HORIZONTAL: string;
        EDGESTYLE_ELBOW: string;
        EDGESTYLE_ENTITY_RELATION: string;
        EDGESTYLE_LOOP: string;
        EDGESTYLE_SIDETOSIDE: string;
        EDGESTYLE_TOPTOBOTTOM: string;
        EDGESTYLE_ORTHOGONAL: string;
        EDGESTYLE_SEGMENT: string;
        PERIMETER_ELLIPSE: string;
        PERIMETER_RECTANGLE: string;
        PERIMETER_RHOMBUS: string;
        PERIMETER_HEXAGON: string;
        PERIMETER_TRIANGLE: string;
    };

    /**
        * The mxEventObject is a wrapper for all properties of a single event.
        * Additionally, it also offers functions to consume the event and check if it
        * was consumed as follows:
        *
        * @example
        * evt.consume();
        * INV: evt.isConsumed() == true
        */
    export class mxEventObject {
        /**
            * Holds the name.
            */
        name: string;
        /**
            * Holds the properties as an associative array.
            */
        properties: any;
        /**
            * Holds the consumed state. Default is false.
            */
        consumed: boolean;
        /**
            * Constructs a new event object with the specified name. An optional
            * sequence of key, value pairs can be appended to define properties.
            *
            * @example
            * new mxEventObject("eventName", key1, val1, .., keyN, valN)
            */
        constructor(name?: any, ...args: any[]);
        /**
            * Returns <name>.
            */
        getName(): string;
        /**
            * Returns <properties>.
            */
        getProperties(): any;
        /**
            * Returns the property for the given key.
            */
        getProperty(key: any): any;
        /**
            * Returns true if the event has been consumed.
            */
        isConsumed(): boolean;
        /**
            * Consumes the event.
            */
        consume(): void;
    }

    /**
        * Base class for all mouse events in mxGraph. A listener for this event should
        * implement the following methods:
        *
        * (code)
        * graph.addMouseListener(
        * {
        *   mouseDown: function(sender, evt)
        *   {
        *     mxLog.debug('mouseDown');
        *   },
        *   mouseMove: function(sender, evt)
        *   {
        *     mxLog.debug('mouseMove');
        *   },
        *   mouseUp: function(sender, evt)
        *   {
        *     mxLog.debug('mouseUp');
        *   }
        * });
        * (end)
        *
        * Constructor: mxMouseEvent
        *
        * Constructs a new event object for the given arguments.
        *
        * Parameters:
        *
        * evt - Native mouse event.
        * state - Optional <mxCellState> under the mouse.
        *
        */
    export class mxMouseEvent {
        constructor(evt: any, state: any);
        /**
            * Returns <evt>.
            */
        getEvent(): any;
        /**
            * Returns the target DOM element using <mxEvent.getSource> for <evt>.
            */
        getSource(): any;
        /**
            * Returns true if the given <mxShape> is the source of <evt>.
            */
        isSource(shape: any): any;
        /**
            * Returns <evt.clientX>.
            */
        getX(): any;
        /**
            * Returns <evt.clientY>.
            */
        getY(): any;
        /**
            * Returns <graphX>.
            */
        getGraphX(): any;
        /**
            * Returns <graphY>.
            */
        getGraphY(): any;
        /**
            * Returns <state>.
            */
        getState(): any;
        /**
            * Returns the <mxCell> in <state> is not null.
            */
        getCell(): any;
        /**
            * Returns true if the event is a popup trigger.
            */
        isPopupTrigger(): boolean;
        /**
            * Returns <consumed>.
            */
        isConsumed(): any;
        /**
            * Sets <consumed> to true and invokes preventDefault on the native event
            * if such a method is defined. This is used mainly to avoid the cursor from
            * being changed to a text cursor in Webkit. You can use the preventDefault
            * flag to disable this functionality.
            *
            * Parameters:
            *
            * preventDefault - Specifies if the native event should be canceled. Default
            * is true.
            */
        consume(preventDefault: any): void;
    }

    /**
        * Base class for objects that dispatch named events. To create a subclass that
        * inherits from mxEventSource, the following code is used.
        *
        * (code)
        * function MyClass() { };
        *
        * MyClass.prototype = new mxEventSource();
        * MyClass.prototype.constructor = MyClass;
        * (end)
        *
        * Known Subclasses:
        *
        * <mxGraphModel>, <mxGraph>, <mxGraphView>, <mxEditor>, <mxCellOverlay>,
        * <mxToolbar>, <mxWindow>
        */
    export class mxEventSource {
        /**
            * Holds the event names and associated listeners in an array. The array
            * contains the event name followed by the respective listener for each
            * registered listener.
            */
        eventListeners: any;
        /**
            * Specifies if events can be fired. Default is true.
            */
        eventsEnabled: boolean;
        /**
            * Optional source for events. Default is null.
            */
        eventSource: any;
        /**
            * Constructs a new event source.
            */
        constructor(eventSource?: any);
        /**
            * Returns <eventsEnabled>.
            */
        isEventsEnabled(): boolean;
        /**
            * Sets <eventsEnabled>.
            */
        setEventsEnabled(value: any): void;
        /**
            * Returns <eventSource>.
            */
        getEventSource(): any;
        /**
            * Sets <eventSource>.
            */
        setEventSource(value: any): void;
        /**
            * Binds the specified function to the given event name. If no event name
            * is given, then the listener is registered for all events.
            *
            * The parameters of the listener are the sender and an <mxEventObject>.
            */
        addListener(name: any, funct: any): void;
        /**
            * Removes all occurrences of the given listener from <eventListeners>.
            */
        removeListener(funct: any): void;
        /**
            * Dispatches the given event to the listeners which are registered for
            * the event. The sender argument is optional. The current execution scope
            * ("this") is used for the listener invocation (see <mxUtils.bind>).
            *
            * Example:
            *
            * (code)
            * fireEvent(new mxEventObject("eventName", key1, val1, .., keyN, valN))
            * (end)
            *
            * Parameters:
            *
            * evt - <mxEventObject> that represents the event.
            * sender - Optional sender to be passed to the listener. Default value is
            * the return value of <getEventSource>.
            */
        fireEvent(evt: mxEventObject, sender?: mxEventSource): void;
    }


    export var mxEvent: {
        objects: any[];
        addListener: (element: any, eventName: any, funct: any) => void;
        removeListener: (element: any, eventName: any, funct: any) => void;
        removeAllListeners(element: any): void;
        addGestureListeners(node: any, startListener: any, moveListener: any, endListener: any): void;
        removeGestureListeners(node: any, startListener: any, moveListener: any, endListener: any): void;
        redirectMouseEvents(node: any, graph: any, state: any, down: any, move: any, up: any, dblClick: any): void;
        release(element: any): void;
        addMouseWheelListener(funct: any): void;
        disableContextMenu: (element: any) => void;
        getSource(evt: any): any;
        isConsumed(evt: any): boolean;
        isTouchEvent(evt: any): boolean;
        isPenEvent(evt: any): boolean;
        isMultiTouchEvent(evt: any): boolean;
        isMouseEvent(evt: any): boolean;
        isLeftMouseButton(evt: any): boolean;
        isMiddleMouseButton(evt: any): boolean;
        isRightMouseButton(evt: any): boolean;
        isPopupTrigger(evt: any): boolean;
        isShiftDown(evt: any): boolean;
        isAltDown(evt: any): boolean;
        isControlDown(evt: any): boolean;
        isMetaDown(evt: any): boolean;
        getMainEvent(e: any): any;
        getClientX(e: any): any;
        getClientY(e: any): any;
        consume(evt: any, preventDefault?: boolean, stopPropagation?: boolean): void;
        LABEL_HANDLE: number;
        ROTATION_HANDLE: number;
        CUSTOM_HANDLE: number;
        VIRTUAL_HANDLE: number;
        MOUSE_DOWN: string;
        MOUSE_MOVE: string;
        MOUSE_UP: string;
        ACTIVATE: string;
        RESIZE_START: string;
        RESIZE: string;
        RESIZE_END: string;
        MOVE_START: string;
        MOVE: string;
        MOVE_END: string;
        PAN_START: string;
        PAN: string;
        PAN_END: string;
        MINIMIZE: string;
        NORMALIZE: string;
        MAXIMIZE: string;
        HIDE: string;
        SHOW: string;
        CLOSE: string;
        DESTROY: string;
        REFRESH: string;
        SIZE: string;
        SELECT: string;
        FIRED: string;
        FIRE_MOUSE_EVENT: string;
        GESTURE: string;
        TAP_AND_HOLD: string;
        GET: string;
        RECEIVE: string;
        CONNECT: string;
        DISCONNECT: string;
        SUSPEND: string;
        RESUME: string;
        MARK: string;
        ROOT: string;
        POST: string;
        OPEN: string;
        SAVE: string;
        BEFORE_ADD_VERTEX: string;
        ADD_VERTEX: string;
        AFTER_ADD_VERTEX: string;
        DONE: string;
        EXECUTE: string;
        EXECUTED: string;
        BEGIN_UPDATE: string;
        START_EDIT: string;
        END_UPDATE: string;
        END_EDIT: string;
        BEFORE_UNDO: string;
        UNDO: string;
        REDO: string;
        CHANGE: string;
        NOTIFY: string;
        LAYOUT_CELLS: string;
        CLICK: string;
        SCALE: string;
        TRANSLATE: string;
        SCALE_AND_TRANSLATE: string;
        UP: string;
        DOWN: string;
        ADD: string;
        REMOVE: string;
        CLEAR: string;
        ADD_CELLS: string;
        CELLS_ADDED: string;
        MOVE_CELLS: string;
        CELLS_MOVED: string;
        RESIZE_CELLS: string;
        CELLS_RESIZED: string;
        TOGGLE_CELLS: string;
        CELLS_TOGGLED: string;
        ORDER_CELLS: string;
        CELLS_ORDERED: string;
        REMOVE_CELLS: string;
        CELLS_REMOVED: string;
        GROUP_CELLS: string;
        UNGROUP_CELLS: string;
        REMOVE_CELLS_FROM_PARENT: string;
        FOLD_CELLS: string;
        CELLS_FOLDED: string;
        ALIGN_CELLS: string;
        LABEL_CHANGED: string;
        CONNECT_CELL: string;
        CELL_CONNECTED: string;
        SPLIT_EDGE: string;
        FLIP_EDGE: string;
        START_EDITING: string;
        EDITING_STARTED: string;
        EDITING_STOPPED: string;
        ADD_OVERLAY: string;
        REMOVE_OVERLAY: string;
        UPDATE_CELL_SIZE: string;
        ESCAPE: string;
        DOUBLE_CLICK: string;
        START: string;
        RESET: string;
    };

    /**
        * XML HTTP request wrapper. See also: <mxUtils.get>, <mxUtils.post> and
        * <mxUtils.load>. This class provides a cross-browser abstraction for Ajax
        * requests.
        *
        * Encoding:
        *
        * For encoding parameter values, the built-in encodeURIComponent JavaScript
        * method must be used. For automatic encoding of post data in <mxEditor> the
        * <mxEditor.escapePostData> switch can be set to true (default). The encoding
        * will be carried out using the conte type of the page. That is, the page
        * containting the editor should contain a meta tag in the header, eg.
        * <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        *
        * Example:
        *
        * (code)
        * var onload = function(req)
        * {
        *   mxUtils.alert(req.getDocumentElement());
        * }
        *
        * var onerror = function(req)
        * {
        *   mxUtils.alert('Error');
        * }
        * new mxXmlRequest(url, 'key=value').send(onload, onerror);
        * (end)
        *
        * Sends an asynchronous POST request to the specified URL.
        *
        * Example:
        *
        * (code)
        * var req = new mxXmlRequest(url, 'key=value', 'POST', false);
        * req.send();
        * mxUtils.alert(req.getDocumentElement());
        * (end)
        *
        * Sends a synchronous POST request to the specified URL.
        *
        * Example:
        *
        * (code)
        * var encoder = new mxCodec();
        * var result = encoder.encode(graph.getModel());
        * var xml = encodeURIComponent(mxUtils.getXml(result));
        * new mxXmlRequest(url, 'xml='+xml).send();
        * (end)
        *
        * Sends an encoded graph model to the specified URL using xml as the
        * parameter name. The parameter can then be retrieved in C# as follows:
        *
        * (code)
        * string xml = HttpUtility.UrlDecode(context.Request.Params["xml"]);
        * (end)
        *
        * Or in Java as follows:
        *
        * (code)
        * String xml = URLDecoder.decode(request.getParameter("xml"), "UTF-8").replace("\n", "&#xa;");
        * (end)
        *
        * Note that the linefeeds should only be replaced if the XML is
        * processed in Java, for example when creating an image.
        *
        * Constructor: mxXmlRequest
        *
        * Constructs an XML HTTP request.
        *
        * Parameters:
        *
        * url - Target URL of the request.
        * params - Form encoded parameters to send with a POST request.
        * method - String that specifies the request method. Possible values are
        * POST and GET. Default is POST.
        * async - Boolean specifying if an asynchronous request should be used.
        * Default is true.
        * username - String specifying the username to be used for the request.
        * password - String specifying the password to be used for the request.
        */
    export class mxXmlRequest {
        constructor(url: any, params: any, method: any, async: any, username: any, password: any);
        /**
            * Returns <binary>.
            */
        isBinary(): any;
        /**
            * Sets <binary>.
            */
        setBinary(value: any): void;
        /**
            * Returns true if the response is ready.
            */
        isReady(): boolean;
        /**
            * Returns the document element of the response XML document.
            */
        getDocumentElement(): any;
        /**
            * Returns the response as an XML document. Use <getDocumentElement> to get
            * the document element of the XML document.
            */
        getXml(): any;
        /**
            * Returns the response as a string.
            */
        getText(): any;
        /**
            * Returns the status as a number, eg. 404 for "Not found" or 200 for "OK".
            * Note: The NS_ERROR_NOT_AVAILABLE for invalid responses cannot be cought.
            */
        getStatus(): any;
        /**
            * Send the <request> to the target URL using the specified functions to
            * process the response asychronously.
            *
            * Parameters:
            *
            * onload - Function to be invoked if a successful response was received.
            * onerror - Function to be called on any error.
            * timeout - Optional timeout in ms before calling ontimeout.
            * ontimeout - Optional function to execute on timeout.
            */
        send(onload: any, onerror: any, timeout: any, ontimeout: any): void;
        /**
            * Sets the headers for the given request and parameters. This sets the
            * content-type to application/x-www-form-urlencoded if any params exist.
            *
            * Example:
            *
            * (code)
            * request.setRequestHeaders = function(request, params)
            * {
            *   if (params != null)
            *   {
            *     request.setRequestHeader('Content-Type',
            *             'multipart/form-data');
            *     request.setRequestHeader('Content-Length',
            *             params.length);
            *   }
            * };
            * (end)
            *
            * Use the code above before calling <send> if you require a
            * multipart/form-data request.
            */
        setRequestHeaders(request: any, params: any): void;
        /**
            * Creates and posts a request to the given target URL using a dynamically
            * created form inside the given document.
            *
            * Parameters:
            *
            * docs - Document that contains the form element.
            * target - Target to send the form result to.
            */
        simulate(doc: any, target: any): void;
    }


    export var mxClipboard: {
        STEPSIZE: number;
        insertCount: number;
        cells: any;
        setCells(cells: any): void;
        getCells(): any;
        isEmpty(): boolean;
        cut(graph: any, cells: any): any;
        removeCells(graph: any, cells: any): void;
        copy(graph: any, cells: any): any;
        paste(graph: any): any;
    };

    /**
        * Basic window inside a document.
        *
        * Examples:
        *
        * Creating a simple window.
        *
        * (code)
        * var tb = document.createElement('div');
        * var wnd = new mxWindow('Title', tb, 100, 100, 200, 200, true, true);
        * wnd.setVisible(true);
        * (end)
        *
        * Creating a window that contains an iframe.
        *
        * (code)
        * var frame = document.createElement('iframe');
        * frame.setAttribute('width', '192px');
        * frame.setAttribute('height', '172px');
        * frame.setAttribute('src', 'http://www.example.com/');
        * frame.style.backgroundColor = 'white';
        *
        * var w = document.body.clientWidth;
        * var h = (document.body.clientHeight || document.documentElement.clientHeight);
        * var wnd = new mxWindow('Title', frame, (w-200)/2, (h-200)/3, 200, 200);
        * wnd.setVisible(true);
        * (end)
        *
        * To limit the movement of a window, eg. to keep it from being moved beyond
        * the top, left corner the following method can be overridden (recommended):
        *
        * (code)
        * wnd.setLocation = function(x, y)
        * {
        *   x = Math.max(0, x);
        *   y = Math.max(0, y);
        *   mxWindow.prototype.setLocation.apply(this, arguments);
        * };
        * (end)
        *
        * Or the following event handler can be used:
        *
        * (code)
        * wnd.addListener(mxEvent.MOVE, function(e)
        * {
        *   wnd.setLocation(Math.max(0, wnd.getX()), Math.max(0, wnd.getY()));
        * });
        * (end)
        *
        * To keep a window inside the current window:
        *
        * (code)
        * mxEvent.addListener(window, 'resize', mxUtils.bind(this, function()
        * {
        *   var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        *   var ih = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        *
        *   var x = this.window.getX();
        *   var y = this.window.getY();
        *
        *   if (x + this.window.table.clientWidth > iw)
        *   {
        *     x = Math.max(0, iw - this.window.table.clientWidth);
        *   }
        *
        *   if (y + this.window.table.clientHeight > ih)
        *   {
        *     y = Math.max(0, ih - this.window.table.clientHeight);
        *   }
        *
        *   if (this.window.getX() != x || this.window.getY() != y)
        *   {
        *     this.window.setLocation(x, y);
        *   }
        * }));
        * (end)
        *
        * Event: mxEvent.MOVE_START
        *
        * Fires before the window is moved. The <code>event</code> property contains
        * the corresponding mouse event.
        *
        * Event: mxEvent.MOVE
        *
        * Fires while the window is being moved. The <code>event</code> property
        * contains the corresponding mouse event.
        *
        * Event: mxEvent.MOVE_END
        *
        * Fires after the window is moved. The <code>event</code> property contains
        * the corresponding mouse event.
        *
        * Event: mxEvent.RESIZE_START
        *
        * Fires before the window is resized. The <code>event</code> property contains
        * the corresponding mouse event.
        *
        * Event: mxEvent.RESIZE
        *
        * Fires while the window is being resized. The <code>event</code> property
        * contains the corresponding mouse event.
        *
        * Event: mxEvent.RESIZE_END
        *
        * Fires after the window is resized. The <code>event</code> property contains
        * the corresponding mouse event.
        *
        * Event: mxEvent.MAXIMIZE
        *
        * Fires after the window is maximized. The <code>event</code> property
        * contains the corresponding mouse event.
        *
        * Event: mxEvent.MINIMIZE
        *
        * Fires after the window is minimized. The <code>event</code> property
        * contains the corresponding mouse event.
        *
        * Event: mxEvent.NORMALIZE
        *
        * Fires after the window is normalized, that is, it returned from
        * maximized or minimized state. The <code>event</code> property contains the
        * corresponding mouse event.
        *
        * Event: mxEvent.ACTIVATE
        *
        * Fires after a window is activated. The <code>previousWindow</code> property
        * contains the previous window. The event sender is the active window.
        *
        * Event: mxEvent.SHOW
        *
        * Fires after the window is shown. This event has no properties.
        *
        * Event: mxEvent.HIDE
        *
        * Fires after the window is hidden. This event has no properties.
        *
        * Event: mxEvent.CLOSE
        *
        * Fires before the window is closed. The <code>event</code> property contains
        * the corresponding mouse event.
        *
        * Event: mxEvent.DESTROY
        *
        * Fires before the window is destroyed. This event has no properties.
        *
        * Constructor: mxWindow
        *
        * Constructs a new window with the given dimension and title to display
        * the specified content. The window elements use the given style as a
        * prefix for the classnames of the respective window elements, namely,
        * the window title and window pane. The respective postfixes are appended
        * to the given stylename as follows:
        *
        *   style - Base style for the window.
        *   style+Title - Style for the window title.
        *   style+Pane - Style for the window pane.
        *
        * The default value for style is mxWindow, resulting in the following
        * classnames for the window elements: mxWindow, mxWindowTitle and
        * mxWindowPane.
        *
        * If replaceNode is given then the window replaces the given DOM node in
        * the document.
        *
        * Parameters:
        *
        * title - String that represents the title of the new window.
        * content - DOM node that is used as the window content.
        * x - X-coordinate of the window location.
        * y - Y-coordinate of the window location.
        * width - Width of the window.
        * height - Optional height of the window. Default is to match the height
        * of the content at the specified width.
        * minimizable - Optional boolean indicating if the window is minimizable.
        * Default is true.
        * movable - Optional boolean indicating if the window is movable. Default
        * is true.
        * replaceNode - Optional DOM node that the window should replace.
        * style - Optional base classname for the window elements. Default is
        * mxWindow.
        */
    export class mxWindow extends mxEventSource {
        constructor(title: any, content: any, x: any, y: any, width: any, height: any, minimizable: any, movable: any, replaceNode: any, style: any);
        /**
            * Initializes the DOM tree that represents the window.
            */
        init(x: any, y: any, width: any, height: any, style: any): void;
        /**
            * Sets the window title to the given string. HTML markup inside the title
            * will be escaped.
            */
        setTitle(title: any): void;
        /**
            * Sets if the window contents should be scrollable.
            */
        setScrollable(scrollable: any): void;
        /**
            * Puts the window on top of all other windows.
            */
        activate(): void;
        /**
            * Returuns the outermost DOM node that makes up the window.
            */
        getElement(): any;
        /**
            * Makes sure the window is inside the client area of the window.
            */
        fit(): void;
        /**
            * Returns true if the window is resizable.
            */
        isResizable(): boolean;
        /**
            * Sets if the window should be resizable. To avoid interference with some
            * built-in features of IE10 and later, the use of the following code is
            * recommended if there are resizable <mxWindow>s in the page:
            *
            * (code)
            * if (mxClient.IS_POINTER)
            * {
            *   document.body.style.msTouchAction = 'none';
            * }
            * (end)
            */
        setResizable(resizable: any): void;
        /**
            * Sets the size of the window.
            */
        setSize(width: any, height: any): void;
        /**
            * Sets if the window is minimizable.
            */
        setMinimizable(minimizable: any): void;
        /**
            * Returns an <mxRectangle> that specifies the size for the minimized window.
            * A width or height of 0 means keep the existing width or height. This
            * implementation returns the height of the window title and keeps the width.
            */
        getMinimumSize(): mxRectangle;
        /**
            * Installs the event listeners required for minimizing the window.
            */
        installMinimizeHandler(): void;
        /**
            * Sets if the window is maximizable.
            */
        setMaximizable(maximizable: any): void;
        /**
            * Installs the event listeners required for maximizing the window.
            */
        installMaximizeHandler(): void;
        /**
            * Installs the event listeners required for moving the window.
            */
        installMoveHandler(): void;
        /**
            * Sets the upper, left corner of the window.
            */
        setLocation(x: any, y: any): void;
        /**
            * Returns the current position on the x-axis.
            */
        getX(): number;
        /**
            * Returns the current position on the y-axis.
            */
        getY(): number;
        /**
            * Adds the <closeImage> as a new image node in <closeImg> and installs the
            * <close> event.
            */
        installCloseHandler(): void;
        /**
            * Sets the image associated with the window.
            *
            * Parameters:
            *
            * image - URL of the image to be used.
            */
        setImage(image: any): void;
        /**
            * Sets the image associated with the window.
            *
            * Parameters:
            *
            * closable - Boolean specifying if the window should be closable.
            */
        setClosable(closable: any): void;
        /**
            * Returns true if the window is visible.
            */
        isVisible(): boolean;
        /**
            * Shows or hides the window depending on the given flag.
            *
            * Parameters:
            *
            * visible - Boolean indicating if the window should be made visible.
            */
        setVisible(visible: any): void;
        /**
            * Shows the window.
            */
        show(): void;
        /**
            * Hides the window.
            */
        hide(): void;
        /**
            * Destroys the window and removes all associated resources. Fires a
            * <destroy> event prior to destroying the window.
            */
        destroy(): void;
    }

    /**
        * A simple class for creating HTML forms.
        *
        * Constructor: mxForm
        *
        * Creates a HTML table using the specified classname.
        */
    export class mxForm {
        constructor(className: any);
        /**
            * Returns the table that contains this form.
            */
        getTable(): any;
        /**
            * Helper method to add an OK and Cancel button using the respective
            * functions.
            */
        addButtons(okFunct: any, cancelFunct: any): void;
        /**
            * Adds an input for the given name, type and value and returns it.
            */
        addText(name: any, value: any, type: any): any;
        /**
            * Adds a checkbox for the given name and value and returns the textfield.
            */
        addCheckbox(name: any, value: any): HTMLInputElement;
        /**
            * Adds a textarea for the given name and value and returns the textarea.
            */
        addTextarea(name: any, value: any, rows: any): any;
        /**
            * Adds a combo for the given name and returns the combo.
            */
        addCombo(name: any, isMultiSelect: any, size: any): any;
        /**
            * Adds an option for the given label to the specified combo.
            */
        addOption(combo: any, label: any, value: any, isSelected: any): void;
        /**
            * Adds a new row with the name and the input field in two columns and
            * returns the given input.
            */
        addField(name: any, input: any): any;
    }

    /**
        * Encapsulates the URL, width and height of an image.
        */
    export class mxImage {
        /**
            * String that specifies the URL of the image.
            */
        src: string;
        /**
            * Integer that specifies the width of the image.
            */
        width: number;
        /**
            * Integer that specifies the height of the image.
            */
        height: number;
        /**
            * Constructs a new image.
            * @param src String that specifies the URL of the image.
            * @param width Integer that specifies the width of the image.
            * @param height Integer that specifies the height of the image.
            */
        constructor(src: any, width: any, height: any);
    }

    /**
        * Maintains the size of a div element in Internet Explorer. This is a
        * workaround for the right and bottom style being ignored in IE.
        *
        * If you need a div to cover the scrollwidth and -height of a document,
        * then you can use this class as follows:
        *
        * (code)
        * var resizer = new mxDivResizer(background);
        * resizer.getDocumentHeight = function()
        * {
        *   return document.body.scrollHeight;
        * }
        * resizer.getDocumentWidth = function()
        * {
        *   return document.body.scrollWidth;
        * }
        * resizer.resize();
        * (end)
        *
        * Constructor: mxDivResizer
        *
        * Constructs an object that maintains the size of a div
        * element when the window is being resized. This is only
        * required for Internet Explorer as it ignores the respective
        * stylesheet information for DIV elements.
        *
        * Parameters:
        *
        * div - Reference to the DOM node whose size should be maintained.
        * container - Optional Container that contains the div. Default is the
        * window.
        */
    export class mxDivResizer {
        constructor(div: any, container: any);
        /**
            * Updates the style of the DIV after the window has been resized.
            */
        resize(): void;
        /**
            * Hook for subclassers to return the width of the document (without
            * scrollbars).
            */
        getDocumentWidth(): number;
        /**
            * Hook for subclassers to return the height of the document (without
            * scrollbars).
            */
        getDocumentHeight(): number;
    }

    /**
        * Wrapper to create a drag source from a DOM element so that the element can
        * be dragged over a graph and dropped into the graph as a new cell.
        *
        * Problem is that in the dropHandler the current preview location is not
        * available, so the preview and the dropHandler must match.
        *
        * Constructor: mxDragSource
        *
        * Constructs a new drag source for the given element.
        */
    export class mxDragSource {
        constructor(element: any, dropHandler: any);
        /**
            * Returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Sets <enabled>.
            */
        setEnabled(value: any): void;
        /**
            * Returns <guidesEnabled>.
            */
        isGuidesEnabled(): any;
        /**
            * Sets <guidesEnabled>.
            */
        setGuidesEnabled(value: any): void;
        /**
            * Returns <gridEnabled>.
            */
        isGridEnabled(): any;
        /**
            * Sets <gridEnabled>.
            */
        setGridEnabled(value: any): void;
        /**
            * Returns the graph for the given mouse event. This implementation returns
            * null.
            */
        getGraphForEvent(evt: any): any;
        /**
            * Returns the drop target for the given graph and coordinates. This
            * implementation uses <mxGraph.getCellAt>.
            */
        getDropTarget(graph: any, x: any, y: any, evt: any): any;
        /**
            * Creates and returns a clone of the <dragElementPrototype> or the <element>
            * if the former is not defined.
            */
        createDragElement(evt: any): any;
        /**
            * Creates and returns an element which can be used as a preview in the given
            * graph.
            */
        createPreviewElement(graph: any): any;
        /**
            * Returns true if this drag source is active.
            */
        isActive(): boolean;
        /**
            * Stops and removes everything and restores the state of the object.
            */
        reset(): void;
        /**
            * Returns the drop target for the given graph and coordinates. This
            * implementation uses <mxGraph.getCellAt>.
            *
            * To ignore popup menu events for a drag source, this function can be
            * overridden as follows.
            *
            * (code)
            * var mouseDown = dragSource.mouseDown;
            *
            * dragSource.mouseDown = function(evt)
            * {
            *   if (!mxEvent.isPopupTrigger(evt))
            *   {
            *     mouseDown.apply(this, arguments);
            *   }
            * };
            * (end)
            */
        mouseDown(evt: any): void;
        /**
            * Creates the <dragElement> using <createDragElement>.
            */
        startDrag(evt: any): void;
        /**
            * Invokes <removeDragElement>.
            */
        stopDrag(): void;
        /**
            * Removes and destroys the <dragElement>.
            */
        removeDragElement(): void;
        /**
            * Returns true if the given graph contains the given event.
            */
        graphContainsEvent(graph: any, evt: any): boolean;
        /**
            * Gets the graph for the given event using <getGraphForEvent>, updates the
            * <currentGraph>, calling <dragEnter> and <dragExit> on the new and old graph,
            * respectively, and invokes <dragOver> if <currentGraph> is not null.
            */
        mouseMove(evt: any): void;
        /**
            * Processes the mouse up event and invokes <drop>, <dragExit> and <stopDrag>
            * as required.
            */
        mouseUp(evt: any): void;
        /**
            * Actives the given graph as a drop target.
            */
        removeListeners(): void;
        /**
            * Actives the given graph as a drop target.
            */
        dragEnter(graph: any, evt: any): void;
        /**
            * Deactivates the given graph as a drop target.
            */
        dragExit(graph: any, evt: any): void;
        /**
            * Implements autoscroll, updates the <currentPoint>, highlights any drop
            * targets and updates the preview.
            */
        dragOver(graph: any, evt: any): void;
        /**
            * Returns the drop target for the given graph and coordinates. This
            * implementation uses <mxGraph.getCellAt>.
            */
        drop(graph: any, evt: any, dropTarget: any, x: any, y: any): void;
    }

    /**
        * Creates a toolbar inside a given DOM node. The toolbar may contain icons,
        * buttons and combo boxes.
        *
        * Event: mxEvent.SELECT
        *
        * Fires when an item was selected in the toolbar. The <code>function</code>
        * property contains the function that was selected in <selectMode>.
        *
        * Constructor: mxToolbar
        *
        * Constructs a toolbar in the specified container.
        *
        * Parameters:
        *
        * container - DOM node that contains the toolbar.
        */
    export class mxToolbar extends mxEventSource {
        constructor(container: any);
        /**
            * Adds the given function as an image with the specified title and icon
            * and returns the new image node.
            *
            * Parameters:
            *
            * title - Optional string that is used as the tooltip.
            * icon - Optional URL of the image to be used. If no URL is given, then a
            * button is created.
            * funct - Function to execute on a mouse click.
            * pressedIcon - Optional URL of the pressed image. Default is a gray
            * background.
            * style - Optional style classname. Default is mxToolbarItem.
            * factoryMethod - Optional factory method for popup menu, eg.
            * function(menu, evt, cell) { menu.addItem('Hello, World!'); }
            */
        addItem(title: any, icon: any, funct: any, pressedIcon: any, style: any, factoryMethod: any): HTMLImageElement | HTMLButtonElement;
        /**
            * Adds and returns a new SELECT element using the given style. The element
            * is placed inside a DIV with the mxToolbarComboContainer style classname.
            *
            * Parameters:
            *
            * style - Optional style classname. Default is mxToolbarCombo.
            */
        addCombo(style: any): HTMLSelectElement;
        /**
            * Adds and returns a new SELECT element using the given title as the
            * default element. The selection is reset to this element after each
            * change.
            *
            * Parameters:
            *
            * title - String that specifies the title of the default element.
            * style - Optional style classname. Default is mxToolbarCombo.
            */
        addActionCombo(title: any, style: any): HTMLSelectElement;
        /**
            * Adds and returns a new OPTION element inside the given SELECT element.
            * If the given value is a function then it is stored in the option's funct
            * field.
            *
            * Parameters:
            *
            * combo - SELECT element that will contain the new entry.
            * title - String that specifies the title of the option.
            * value - Specifies the value associated with this option.
            */
        addOption(combo: any, title: any, value: any): HTMLOptionElement;
        /**
            * Adds a new selectable item to the toolbar. Only one switch mode item may
            * be selected at a time. The currently selected item is the default item
            * after a reset of the toolbar.
            */
        addSwitchMode(title: any, icon: any, funct: any, pressedIcon: any, style: any): HTMLImageElement;
        /**
            * Adds a new item to the toolbar. The selection is typically reset after
            * the item has been consumed, for example by adding a new vertex to the
            * graph. The reset is not carried out if the item is double clicked.
            *
            * The function argument uses the following signature: funct(evt, cell) where
            * evt is the native mouse event and cell is the cell under the mouse.
            */
        addMode(title: any, icon: any, funct: any, pressedIcon?: any, style?: any, toggle?: any): HTMLImageElement | HTMLButtonElement;
        /**
            * Resets the state of the previously selected mode and displays the given
            * DOM node as selected. This function fires a select event with the given
            * function as a parameter.
            */
        selectMode(domNode: any, funct: any): void;
        /**
            * Selects the default mode and resets the state of the previously selected
            * mode.
            */
        resetMode(forced: any): void;
        /**
            * Adds the specifies image as a separator.
            *
            * Parameters:
            *
            * icon - URL of the separator icon.
            */
        addSeparator(icon: any): any;
        /**
            * Adds a break to the container.
            */
        addBreak(): void;
        /**
            * Adds a horizontal line to the container.
            */
        addLine(): void;
        /**
            * Removes the toolbar and all its associated resources.
            */
        destroy(): void;
    }

    /**
        * Implements a composite undoable edit. Here is an example for a custom change
        * which gets executed via the model:
        *
        * (code)
        * function CustomChange(model, name)
        * {
        *   this.model = model;
        *   this.name = name;
        *   this.previous = name;
        * };
        *
        * CustomChange.prototype.execute = function()
        * {
        *   var tmp = this.model.name;
        *   this.model.name = this.previous;
        *   this.previous = tmp;
        * };
        *
        * var name = prompt('Enter name');
        * graph.model.execute(new CustomChange(graph.model, name));
        * (end)
        *
        * Event: mxEvent.EXECUTED
        *
        * Fires between START_EDIT and END_EDIT after an atomic change was executed.
        * The <code>change</code> property contains the change that was executed.
        *
        * Event: mxEvent.START_EDIT
        *
        * Fires before a set of changes will be executed in <undo> or <redo>.
        * This event contains no properties.
        *
        * Event: mxEvent.END_EDIT
        *
        * Fires after a set of changeswas executed in <undo> or <redo>.
        * This event contains no properties.
        */
    export class mxUndoableEdit {
        /**
            * Specifies the source of the edit.
            */
        source: any;
        /**
            * Array that contains the changes that make up this edit. The changes are
            * expected to either have an undo and redo function, or an execute
            * function. Default is an empty array.
            */
        changes: any[];
        /**
            * Specifies if the undoable change is significant.
            * Default is true.
            */
        significant: boolean;
        /**
            * Specifies if this edit has been undone. Default is false.
            */
        undone: boolean;
        /**
            * Specifies if this edit has been redone. Default is false.
            */
        redone: boolean;
        /**
            * Constructs a new undoable edit for the given source.
            * @param source
            * @param significant
            */
        constructor(source: any, significant?: boolean);
        /**
            * Returns true if the this edit contains no changes.
            */
        isEmpty(): boolean;
        /**
            * Returns <significant>.
            */
        isSignificant(): boolean;
        /**
            * Adds the specified change to this edit. The change is an object that is
            * expected to either have an undo and redo, or an execute function.
            */
        add(change: any): void;
        /**
            * Hook to notify any listeners of the changes after an <undo> or <redo>
            * has been carried out. This implementation is empty.
            */
        notify(): void;
        /**
            * Hook to free resources after the edit has been removed from the command
            * history. This implementation is empty.
            */
        die(): void;
        /**
            * Undoes all changes in this edit.
            */
        undo(): void;
        /**
            * Redoes all changes in this edit.
            */
        redo(): void;
    }

    /**
        * Implements a command history. When changing the graph model, an
        * <mxUndoableChange> object is created at the start of the transaction (when
        * model.beginUpdate is called). All atomic changes are then added to this
        * object until the last model.endUpdate call, at which point the
        * <mxUndoableEdit> is dispatched in an event, and added to the history inside
        * <mxUndoManager>. This is done by an event listener in
        * <mxEditor.installUndoHandler>.
        *
        * Each atomic change of the model is represented by an object (eg.
        * <mxRootChange>, <mxChildChange>, <mxTerminalChange> etc) which contains the
        * complete undo information. The <mxUndoManager> also listens to the
        * <mxGraphView> and stores it's changes to the current root as insignificant
        * undoable changes, so that drilling (step into, step up) is undone.
        *
        * This means when you execute an atomic change on the model, then change the
        * current root on the view and click undo, the change of the root will be
        * undone together with the change of the model so that the display represents
        * the state at which the model was changed. However, these changes are not
        * transmitted for sharing as they do not represent a state change.
        *
        * Example:
        *
        * When adding an undo manager to a graph, make sure to add it
        * to the model and the view as well to maintain a consistent
        * display across multiple undo/redo steps.
        *
        * (code)
        * var undoManager = new mxUndoManager();
        * var listener = function(sender, evt)
        * {
        *   undoManager.undoableEditHappened(evt.getProperty('edit'));
        * };
        * graph.getModel().addListener(mxEvent.UNDO, listener);
        * graph.getView().addListener(mxEvent.UNDO, listener);
        * (end)
        *
        * The code creates a function that informs the undoManager
        * of an undoable edit and binds it to the undo event of
        * <mxGraphModel> and <mxGraphView> using
        * <mxEventSource.addListener>.
        *
        * Event: mxEvent.CLEAR
        *
        * Fires after <clear> was invoked. This event has no properties.
        *
        * Event: mxEvent.UNDO
        *
        * Fires afer a significant edit was undone in <undo>. The <code>edit</code>
        * property contains the <mxUndoableEdit> that was undone.
        *
        * Event: mxEvent.REDO
        *
        * Fires afer a significant edit was redone in <redo>. The <code>edit</code>
        * property contains the <mxUndoableEdit> that was redone.
        *
        * Event: mxEvent.ADD
        *
        * Fires after an undoable edit was added to the history. The <code>edit</code>
        * property contains the <mxUndoableEdit> that was added.
        *
        * Constructor: mxUndoManager
        *
        * Constructs a new undo manager with the given history size. If no history
        * size is given, then a default size of 100 steps is used.
        */
    export class mxUndoManager extends mxEventSource {
        constructor(size: any);
        /**
            * Returns true if the history is empty.
            */
        isEmpty(): boolean;
        /**
            * Clears the command history.
            */
        clear(): void;
        /**
            * Returns true if an undo is possible.
            */
        canUndo(): boolean;
        /**
            * Undoes the last change.
            */
        undo(): void;
        /**
            * Returns true if a redo is possible.
            */
        canRedo(): boolean;
        /**
            * Redoes the last change.
            */
        redo(): void;
        /**
            * Method to be called to add new undoable edits to the <history>.
            */
        undoableEditHappened(undoableEdit: any): void;
        /**
            * Removes all pending steps after <indexOfNextAdd> from the history,
            * invoking die on each edit. This is called from <undoableEditHappened>.
            */
        trim(): void;
    }

    /**
        *
        * Converts relative and absolute URLs to absolute URLs with protocol and domain.
        */
    export class mxUrlConverter {
        /**
            * Private helper function to update the base URL.
            */
        updateBaseUrl(): void;
        /**
            * Returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Sets <enabled>.
            */
        setEnabled(value: any): void;
        /**
            * Returns <baseUrl>.
            */
        getBaseUrl(): any;
        /**
            * Sets <baseUrl>.
            */
        setBaseUrl(value: any): void;
        /**
            * Converts the given URL to an absolute URL with protol and domain.
            * Relative URLs are first converted to absolute URLs.
            */
        convert(url: any): any;
    }

    /**
        * Implements a handler for panning.
        */
    export function mxPanningManager(graph: any): void;

    /**
        * Basic popup menu. To add a vertical scrollbar to a given submenu, the
        * following code can be used.
        *
        * (code)
        * var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
        * mxPopupMenu.prototype.showMenu = function()
        * {
        *   mxPopupMenuShowMenu.apply(this, arguments);
        *
        *   this.div.style.overflowY = 'auto';
        *   this.div.style.overflowX = 'hidden';
        *   this.div.style.maxHeight = '160px';
        * };
        * (end)
        *
        * Constructor: mxPopupMenu
        *
        * Constructs a popupmenu.
        *
        * Event: mxEvent.SHOW
        *
        * Fires after the menu has been shown in <popup>.
        */
    export class mxPopupMenu extends mxEventSource {
        constructor(factoryMethod?: any);
        /**
            * Initializes the shapes required for this vertex handler.
            */
        init(): void;
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns true if the given event is a popupmenu trigger for the optional
            * given cell.
            *
            * Parameters:
            *
            * me - <mxMouseEvent> that represents the mouse event.
            */
        isPopupTrigger(me: any): any;
        /**
            * Adds the given item to the given parent item. If no parent item is specified
            * then the item is added to the top-level menu. The return value may be used
            * as the parent argument, ie. as a submenu item. The return value is the table
            * row that represents the item.
            *
            * Paramters:
            *
            * title - String that represents the title of the menu item.
            * image - Optional URL for the image icon.
            * funct - Function associated that takes a mouseup or touchend event.
            * parent - Optional item returned by <addItem>.
            * iconCls - Optional string that represents the CSS class for the image icon.
            * IconsCls is ignored if image is given.
            * enabled - Optional boolean indicating if the item is enabled. Default is true.
            * active - Optional boolean indicating if the menu should implement any event handling.
            * Default is true.
            */
        addItem(title: any, image: any, funct: any, parent: any, iconCls: any, enabled: any, active: any): HTMLTableRowElement;
        /**
            * Adds a checkmark to the given menuitem.
            */
        addCheckmark(item: any, img: any): void;
        /**
            * Creates the nodes required to add submenu items inside the given parent
            * item. This is called in <addItem> if a parent item is used for the first
            * time. This adds various DOM nodes and a <submenuImage> to the parent.
            *
            * Parameters:
            *
            * parent - An item returned by <addItem>.
            */
        createSubmenu(parent: any): void;
        /**
            * Shows the submenu inside the given parent row.
            */
        showSubmenu(parent: any, row: any): void;
        /**
            * Adds a horizontal separator in the given parent item or the top-level menu
            * if no parent is specified.
            *
            * Parameters:
            *
            * parent - Optional item returned by <addItem>.
            * force - Optional boolean to ignore <smartSeparators>. Default is false.
            */
        addSeparator(parent: any, force: any): void;
        /**
            * Shows the popup menu for the given event and cell.
            *
            * Example:
            *
            * (code)
            * graph.panningHandler.popup = function(x, y, cell, evt)
            * {
            *   mxUtils.alert('Hello, World!');
            * }
            * (end)
            */
        popup(x: any, y: any, cell: any, evt: any): void;
        /**
            * Returns true if the menu is showing.
            */
        isMenuShowing(): boolean;
        /**
            * Shows the menu.
            */
        showMenu(): void;
        /**
            * Removes the menu and all submenus.
            */
        hideMenu(): void;
        /**
            * Removes all submenus inside the given parent.
            *
            * Parameters:
            *
            * parent - An item returned by <addItem>.
            */
        hideSubmenu(parent: any): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Manager for automatically saving diagrams. The <save> hook must be
        * implemented.
        *
        * Example:
        *
        * (code)
        * var mgr = new mxAutoSaveManager(editor.graph);
        * mgr.save = function()
        * {
        *   mxLog.show();
        *   mxLog.debug('save');
        * };
        * (end)
        *
        * Constructor: mxAutoSaveManager
        *
        * Constructs a new automatic layout for the given graph.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing graph.
        */
    export class mxAutoSaveManager extends mxEventSource {
        constructor(graph: any);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(value: any): void;
        /**
            * Sets the graph that the layouts operate on.
            */
        setGraph(graph: any): void;
        /**
            * Empty hook that is called if the graph should be saved.
            */
        save(): void;
        /**
            * Invoked when the graph model has changed.
            */
        graphModelChanged(changes: any): void;
        /**
            * Resets all counters.
            */
        reset(): void;
        /**
            * Removes all handlers from the <graph> and deletes the reference to it.
            */
        destroy(): void;
    }

    /**
        *
        * Implements a basic animation in JavaScript.
        *
        * Constructor: mxAnimation
        *
        * Constructs an animation.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        */
    export class mxAnimation extends mxEventSource {
        constructor(delay: any);
        /**
            * Returns true if the animation is running.
            */
        isRunning(): boolean;
        /**
            * Starts the animation by repeatedly invoking updateAnimation.
            */
        startAnimation(): void;
        /**
            * Hook for subclassers to implement the animation. Invoke stopAnimation
            * when finished, startAnimation to resume. This is called whenever the
            * timer fires and fires an mxEvent.EXECUTE event with no properties.
            */
        updateAnimation(): void;
        /**
            * Stops the animation by deleting the timer and fires an <mxEvent.DONE>.
            */
        stopAnimation(): void;
    }

    /**
        *
        * Implements animation for morphing cells. Here is an example of
        * using this class for animating the result of a layout algorithm:
        *
        * (code)
        * graph.getModel().beginUpdate();
        * try
        * {
        *   var circleLayout = new mxCircleLayout(graph);
        *   circleLayout.execute(graph.getDefaultParent());
        * }
        * finally
        * {
        *   var morph = new mxMorphing(graph);
        *   morph.addListener(mxEvent.DONE, function()
        *   {
        *     graph.getModel().endUpdate();
        *   });
        *
        *   morph.startAnimation();
        * }
        * (end)
        *
        * Constructor: mxMorphing
        *
        * Constructs an animation.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * steps - Optional number of steps in the morphing animation. Default is 6.
        * ease - Optional easing constant for the animation. Default is 1.5.
        * delay - Optional delay between the animation steps. Passed to <mxAnimation>.
        */
    export class mxMorphing extends mxAnimation {
        constructor(graph: any, steps: any, ease: any, delay: any);
        /**
            * Animation step.
            */
        updateAnimation(): void;
        /**
            * Shows the changes in the given <mxCellStatePreview>.
            */
        show(move: any): void;
        /**
            * Animates the given cell state using <mxCellStatePreview.moveState>.
            */
        animateCell(cell: any, move: any, recurse: any): void;
        /**
            * Returns true if the animation should not recursively find more
            * deltas for children if the given parent state has been animated.
            */
        stopRecursion(state: any, delta: any): boolean;
        /**
            * Returns the vector between the current rendered state and the future
            * location of the state after the display will be updated.
            */
        getDelta(state: any): mxPoint;
        /**
            * Returns the top, left corner of the given cell. TODO: Improve performance
            * by using caching inside this method as the result per cell never changes
            * during the lifecycle of this object.
            */
        getOriginForCell(cell: any): any;
    }

    /**
        * Maps from keys to base64 encoded images or file locations. All values must
        * be URLs or use the format data:image/format followed by a comma and the base64
        * encoded image data, eg. "data:image/gif,XYZ", where XYZ is the base64 encoded
        * image data.
        *
        * To add a new image bundle to an existing graph, the following code is used:
        *
        * (code)
        * var bundle = new mxImageBundle(alt);
        * bundle.putImage('myImage', 'data:image/gif,R0lGODlhEAAQAMIGAAAAAICAAICAgP' +
        *   '//AOzp2O3r2////////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgAHACwAAAAA' +
        *   'EAAQAAADTXi63AowynnAMDfjPUDlnAAJhmeBFxAEloliKltWmiYCQvfVr6lBPB1ggxN1hi' +
        *   'laSSASFQpIV5HJBDyHpqK2ejVRm2AAgZCdmCGO9CIBADs=', fallback);
        * bundle.putImage('mySvgImage', 'data:image/svg+xml,' + encodeURIComponent(
        *   '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">' +
        *   '<linearGradient id="gradient"><stop offset="10%" stop-color="#F00"/>' +
        *   '<stop offset="90%" stop-color="#fcc"/></linearGradient>' +
        *   '<rect fill="url(#gradient)" width="100%" height="100%"/></svg>'), fallback);
        * graph.addImageBundle(bundle);
        * (end);
        *
        * Alt is an optional boolean (default is false) that specifies if the value
        * or the fallback should be returned in <getImage>.
        *
        * The image can then be referenced in any cell style using image=myImage.
        * If you are using mxOutline, you should use the same image bundles in the
        * graph that renders the outline.
        *
        * The keys for images are resolved in <mxGraph.postProcessCellStyle> and
        * turned into a data URI if the returned value has a short data URI format
        * as specified above.
        *
        * A typical value for the fallback is a MTHML link as defined in RFC 2557.
        * Note that this format requires a file to be dynamically created on the
        * server-side, or the page that contains the graph to be modified to contain
        * the resources, this can be done by adding a comment that contains the
        * resource in the HEAD section of the page after the title tag.
        *
        * This type of fallback mechanism should be used in IE6 and IE7. IE8 does
        * support data URIs, but the maximum size is limited to 32 KB, which means
        * all data URIs should be limited to 32 KB.
        */
    export class mxImageBundle {
        constructor(alt: any);
        /**
            * Adds the specified entry to the map. The entry is an object with a value and
            * fallback property as specified in the arguments.
            */
        putImage(key: any, value: any, fallback: any): void;
        /**
            * Returns the value for the given key. This returns the value
            * or fallback, depending on <alt>. The fallback is returned if
            * <alt> is true, the value is returned otherwise.
            */
        getImage(key: any): any;
    }

    /**
        * Creates a new image export instance to be used with an export canvas. Here
        * is an example that uses this class to create an image via a backend using
        * <mxXmlExportCanvas>.
        *
        * (code)
        * var xmlDoc = mxUtils.createXmlDocument();
        * var root = xmlDoc.createElement('output');
        * xmlDoc.appendChild(root);
        *
        * var xmlCanvas = new mxXmlCanvas2D(root);
        * var imgExport = new mxImageExport();
        * imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
        *
        * var bounds = graph.getGraphBounds();
        * var w = Math.ceil(bounds.x + bounds.width);
        * var h = Math.ceil(bounds.y + bounds.height);
        *
        * var xml = mxUtils.getXml(root);
        * new mxXmlRequest('export', 'format=png&w=' + w +
        * 		'&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
        * 		.simulate(document, '_blank');
        * (end)
        *
        * Constructor: mxImageExport
        *
        * Constructs a new image export.
        */
    export class mxImageExport {
        /**
            * Draws the given state and all its descendants to the given canvas.
            */
        drawState(state: any, canvas: any): void;
        /**
            * Draws the given state and all its descendants to the given canvas.
            */
        visitStatesRecursive(state: any, canvas: any, visitor: any): void;
        /**
            * Returns the link for the given cell state and canvas. This returns null.
            */
        getLinkForCellState(state: any, canvas: any): any;
        /**
            * Draws the given state to the given canvas.
            */
        drawCellState(state: any, canvas: any): void;
        /**
            * Draws the shape of the given state.
            */
        drawShape(state: any, canvas: any): void;
        /**
            * Draws the text of the given state.
            */
        drawText(state: any, canvas: any): void;
        /**
            * Draws the overlays for the given state. This is called if <includeOverlays>
            * is true.
            */
        drawOverlays(state: any, canvas: any): void;
    }

    /**
        * Base class for all canvases. A description of the public API is available in <mxXmlCanvas2D>.
        * All color values of <mxConstants.NONE> will be converted to null in the state.
        *
        * Constructor: mxAbstractCanvas2D
        *
        * Constructs a new abstract canvas.
        */
    export class mxAbstractCanvas2D {
        constructor();
        /**
            * Create a new <mxUrlConverter> and returns it.
            */
        createUrlConverter(): mxUrlConverter;
        /**
            * Resets the state of this canvas.
            */
        reset(): void;
        /**
            * Creates the state of the this canvas.
            */
        createState(): {
            dx: number;
            dy: number;
            scale: number;
            alpha: number;
            fillAlpha: number;
            strokeAlpha: number;
            fillColor: any;
            gradientFillAlpha: number;
            gradientColor: any;
            gradientAlpha: number;
            gradientDirection: any;
            strokeColor: any;
            strokeWidth: number;
            dashed: boolean;
            dashPattern: string;
            fixDash: boolean;
            lineCap: string;
            lineJoin: string;
            miterLimit: number;
            fontColor: string;
            fontBackgroundColor: any;
            fontBorderColor: any;
            fontSize: number;
            fontFamily: string;
            fontStyle: number;
            shadow: boolean;
            shadowColor: string;
            shadowAlpha: number;
            shadowDx: number;
            shadowDy: number;
            rotation: number;
            rotationCx: number;
            rotationCy: number;
        };
        /**
            * Rounds all numbers to integers.
            */
        format(value: any): number;
        /**
            * Adds the given operation to the path.
            */
        addOp(): void;
        /**
            * Rotates the given point and returns the result as an <mxPoint>.
            */
        rotatePoint(x: any, y: any, theta: any, cx: any, cy: any): any;
        /**
            * Saves the current state.
            */
        save(): void;
        /**
            * Restores the current state.
            */
        restore(): void;
        /**
            * Sets the current link. Hook for subclassers.
            */
        setLink(link: any): void;
        /**
            * Scales the current state.
            */
        scale(value: any): void;
        /**
            * Translates the current state.
            */
        translate(dx: any, dy: any): void;
        /**
            * Rotates the current state.
            */
        rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
        /**
            * Sets the current alpha.
            */
        setAlpha(value: any): void;
        /**
            * Sets the current solid fill alpha.
            */
        setFillAlpha(value: any): void;
        /**
            * Sets the current stroke alpha.
            */
        setStrokeAlpha(value: any): void;
        /**
            * Sets the current fill color.
            */
        setFillColor(value: any): void;
        /**
            * Sets the current gradient.
            */
        setGradient(color1: any, color2: any, x: any, y: any, w: any, h: any, direction: any, alpha1: any, alpha2: any): void;
        /**
            * Sets the current stroke color.
            */
        setStrokeColor(value: any): void;
        /**
            * Sets the current stroke width.
            */
        setStrokeWidth(value: any): void;
        /**
            * Enables or disables dashed lines.
            */
        setDashed(value: any, fixDash?: any): void;
        /**
            * Sets the current dash pattern.
            */
        setDashPattern(value: any): void;
        /**
            * Sets the current line cap.
            */
        setLineCap(value: any): void;
        /**
            * Sets the current line join.
            */
        setLineJoin(value: any): void;
        /**
            * Sets the current miter limit.
            */
        setMiterLimit(value: any): void;
        /**
            * Sets the current font color.
            */
        setFontColor(value: any): void;
        /**
            * Sets the current font color.
            */
        setFontBackgroundColor(value: any): void;
        /**
            * Sets the current font color.
            */
        setFontBorderColor(value: any): void;
        /**
            * Sets the current font size.
            */
        setFontSize(value: any): void;
        /**
            * Sets the current font family.
            */
        setFontFamily(value: any): void;
        /**
            * Sets the current font style.
            */
        setFontStyle(value: any): void;
        /**
            * Enables or disables and configures the current shadow.
            */
        setShadow(enabled: any): void;
        /**
            * Enables or disables and configures the current shadow.
            */
        setShadowColor(value: any): void;
        /**
            * Enables or disables and configures the current shadow.
            */
        setShadowAlpha(value: any): void;
        /**
            * Enables or disables and configures the current shadow.
            */
        setShadowOffset(dx: any, dy: any): void;
        /**
            * Starts a new path.
            */
        begin(): void;
        /**
            *  Moves the current path the given coordinates.
            */
        moveTo(x: any, y: any): void;
        /**
            * Draws a line to the given coordinates. Uses moveTo with the op argument.
            */
        lineTo(x: any, y: any): void;
        /**
            * Adds a quadratic curve to the current path.
            */
        quadTo(x1: any, y1: any, x2: any, y2: any): void;
        /**
            * Adds a bezier curve to the current path.
            */
        curveTo(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
        /**
            * Adds the given arc to the current path. This is a synthetic operation that
            * is broken down into curves.
            */
        arcTo(rx: any, ry: any, angle: any, largeArcFlag: any, sweepFlag: any, x: any, y: any): void;
        /**
            * Closes the current path.
            */
        close(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
        /**
            * Empty implementation for backwards compatibility. This will be removed.
            */
        end(): void;
    }

    /**
        * Base class for all canvases. The following methods make up the public
        * interface of the canvas 2D for all painting in mxGraph:
        *
        * - <save>, <restore>
        * - <scale>, <translate>, <rotate>
        * - <setAlpha>, <setFillAlpha>, <setStrokeAlpha>, <setFillColor>, <setGradient>,
        *   <setStrokeColor>, <setStrokeWidth>, <setDashed>, <setDashPattern>, <setLineCap>,
        *   <setLineJoin>, <setMiterLimit>
        * - <setFontColor>, <setFontBackgroundColor>, <setFontBorderColor>, <setFontSize>,
        *   <setFontFamily>, <setFontStyle>
        * - <setShadow>, <setShadowColor>, <setShadowAlpha>, <setShadowOffset>
        * - <rect>, <roundrect>, <ellipse>, <image>, <text>
        * - <begin>, <moveTo>, <lineTo>, <quadTo>, <curveTo>
        * - <stroke>, <fill>, <fillAndStroke>
        *
        * <mxAbstractCanvas2D.arcTo> is an additional method for drawing paths. This is
        * a synthetic method, meaning that it is turned into a sequence of curves by
        * default. Subclassers may add native support for arcs.
        *
        * Constructor: mxXmlCanvas2D
        *
        * Constructs a new abstract canvas.
        */
    export class mxXmlCanvas2D extends mxAbstractCanvas2D {
        constructor(root: any);
        /**
            * Writes the rendering defaults to <root>:
            */
        writeDefaults(): void;
        /**
            * Returns a formatted number with 2 decimal places.
            */
        format(value: any): number;
        /**
            * Creates the given element using the owner document of <root>.
            */
        createElement(name: any): any;
        /**
            * Saves the drawing state.
            */
        save(): void;
        /**
            * Restores the drawing state.
            */
        restore(): void;
        /**
            * Scales the output.
            *
            * Parameters:
            *
            * scale - Number that represents the scale where 1 is equal to 100%.
            */
        scale(value: any): void;
        /**
            * Translates the output.
            *
            * Parameters:
            *
            * dx - Number that specifies the horizontal translation.
            * dy - Number that specifies the vertical translation.
            */
        translate(dx: any, dy: any): void;
        /**
            * Rotates and/or flips the output around a given center. (Note: Due to
            * limitations in VML, the rotation cannot be concatenated.)
            *
            * Parameters:
            *
            * theta - Number that represents the angle of the rotation (in degrees).
            * flipH - Boolean indicating if the output should be flipped horizontally.
            * flipV - Boolean indicating if the output should be flipped vertically.
            * cx - Number that represents the x-coordinate of the rotation center.
            * cy - Number that represents the y-coordinate of the rotation center.
            */
        rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
        /**
            * Sets the current alpha.
            *
            * Parameters:
            *
            * value - Number that represents the new alpha. Possible values are between
            * 1 (opaque) and 0 (transparent).
            */
        setAlpha(value: any): void;
        /**
            * Sets the current fill alpha.
            *
            * Parameters:
            *
            * value - Number that represents the new fill alpha. Possible values are between
            * 1 (opaque) and 0 (transparent).
            */
        setFillAlpha(value: any): void;
        /**
            * Sets the current stroke alpha.
            *
            * Parameters:
            *
            * value - Number that represents the new stroke alpha. Possible values are between
            * 1 (opaque) and 0 (transparent).
            */
        setStrokeAlpha(value: any): void;
        /**
            * Sets the current fill color.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setFillColor(value: any): void;
        /**
            * Sets the gradient. Note that the coordinates may be ignored by some implementations.
            *
            * Parameters:
            *
            * color1 - Hexadecimal representation of the start color.
            * color2 - Hexadecimal representation of the end color.
            * x - X-coordinate of the gradient region.
            * y - y-coordinate of the gradient region.
            * w - Width of the gradient region.
            * h - Height of the gradient region.
            * direction - One of <mxConstants.DIRECTION_NORTH>, <mxConstants.DIRECTION_EAST>,
            * <mxConstants.DIRECTION_SOUTH> or <mxConstants.DIRECTION_WEST>.
            * alpha1 - Optional alpha of the start color. Default is 1. Possible values
            * are between 1 (opaque) and 0 (transparent).
            * alpha2 - Optional alpha of the end color. Default is 1. Possible values
            * are between 1 (opaque) and 0 (transparent).
            */
        setGradient(color1: any, color2: any, x: any, y: any, w: any, h: any, direction: any, alpha1: any, alpha2: any): void;
        /**
            * Sets the current stroke color.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setStrokeColor(value: any): void;
        /**
            * Sets the current stroke width.
            *
            * Parameters:
            *
            * value - Numeric representation of the stroke width.
            */
        setStrokeWidth(value: any): void;
        /**
            * Enables or disables dashed lines.
            *
            * Parameters:
            *
            * value - Boolean that specifies if dashed lines should be enabled.
            * value - Boolean that specifies if the stroke width should be ignored
            * for the dash pattern. Default is false.
            */
        setDashed(value: any, fixDash: any): void;
        /**
            * Sets the current dash pattern. Default is '3 3'.
            *
            * Parameters:
            *
            * value - String that represents the dash pattern, which is a sequence of
            * numbers defining the length of the dashes and the length of the spaces
            * between the dashes. The lengths are relative to the line width - a length
            * of 1 is equals to the line width.
            */
        setDashPattern(value: any): void;
        /**
            * Sets the line cap. Default is 'flat' which corresponds to 'butt' in SVG.
            *
            * Parameters:
            *
            * value - String that represents the line cap. Possible values are flat, round
            * and square.
            */
        setLineCap(value: any): void;
        /**
            * Sets the line join. Default is 'miter'.
            *
            * Parameters:
            *
            * value - String that represents the line join. Possible values are miter,
            * round and bevel.
            */
        setLineJoin(value: any): void;
        /**
            * Sets the miter limit. Default is 10.
            *
            * Parameters:
            *
            * value - Number that represents the miter limit.
            */
        setMiterLimit(value: any): void;
        /**
            * Sets the current font color. Default is '#000000'.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setFontColor(value: any): void;
        /**
            * Sets the current font background color.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setFontBackgroundColor(value: any): void;
        /**
            * Sets the current font border color.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setFontBorderColor(value: any): void;
        /**
            * Sets the current font size. Default is <mxConstants.DEFAULT_FONTSIZE>.
            *
            * Parameters:
            *
            * value - Numeric representation of the font size.
            */
        setFontSize(value: any): void;
        /**
            * Sets the current font family. Default is <mxConstants.DEFAULT_FONTFAMILY>.
            *
            * Parameters:
            *
            * value - String representation of the font family. This handles the same
            * values as the CSS font-family property.
            */
        setFontFamily(value: any): void;
        /**
            * Sets the current font style.
            *
            * Parameters:
            *
            * value - Numeric representation of the font family. This is the sum of the
            * font styles from <mxConstants>.
            */
        setFontStyle(value: any): void;
        /**
            * Enables or disables shadows.
            *
            * Parameters:
            *
            * value - Boolean that specifies if shadows should be enabled.
            */
        setShadow(value: any): void;
        /**
            * Sets the current shadow color. Default is <mxConstants.SHADOWCOLOR>.
            *
            * Parameters:
            *
            * value - Hexadecimal representation of the color or 'none'.
            */
        setShadowColor(value: any): void;
        /**
            * Sets the current shadows alpha. Default is <mxConstants.SHADOW_OPACITY>.
            *
            * Parameters:
            *
            * value - Number that represents the new alpha. Possible values are between
            * 1 (opaque) and 0 (transparent).
            */
        setShadowAlpha(value: any): void;
        /**
            * Sets the current shadow offset.
            *
            * Parameters:
            *
            * dx - Number that represents the horizontal offset of the shadow.
            * dy - Number that represents the vertical offset of the shadow.
            */
        setShadowOffset(dx: any, dy: any): void;
        /**
            * Puts a rectangle into the drawing buffer.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the rectangle.
            * y - Number that represents the y-coordinate of the rectangle.
            * w - Number that represents the width of the rectangle.
            * h - Number that represents the height of the rectangle.
            */
        rect(x: any, y: any, w: any, h: any): void;
        /**
            * Puts a rounded rectangle into the drawing buffer.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the rectangle.
            * y - Number that represents the y-coordinate of the rectangle.
            * w - Number that represents the width of the rectangle.
            * h - Number that represents the height of the rectangle.
            * dx - Number that represents the horizontal rounding.
            * dy - Number that represents the vertical rounding.
            */
        roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
        /**
            * Puts an ellipse into the drawing buffer.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the ellipse.
            * y - Number that represents the y-coordinate of the ellipse.
            * w - Number that represents the width of the ellipse.
            * h - Number that represents the height of the ellipse.
            */
        ellipse(x: any, y: any, w: any, h: any): void;
        /**
            * Paints an image.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the image.
            * y - Number that represents the y-coordinate of the image.
            * w - Number that represents the width of the image.
            * h - Number that represents the height of the image.
            * src - String that specifies the URL of the image.
            * aspect - Boolean indicating if the aspect of the image should be preserved.
            * flipH - Boolean indicating if the image should be flipped horizontally.
            * flipV - Boolean indicating if the image should be flipped vertically.
            */
        image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
        /**
            * Starts a new path and puts it into the drawing buffer.
            */
        begin(): void;
        /**
            * Moves the current path the given point.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the point.
            * y - Number that represents the y-coordinate of the point.
            */
        moveTo(x: any, y: any): void;
        /**
            * Draws a line to the given coordinates.
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the endpoint.
            * y - Number that represents the y-coordinate of the endpoint.
            */
        lineTo(x: any, y: any): void;
        /**
            * Adds a quadratic curve to the current path.
            *
            * Parameters:
            *
            * x1 - Number that represents the x-coordinate of the control point.
            * y1 - Number that represents the y-coordinate of the control point.
            * x2 - Number that represents the x-coordinate of the endpoint.
            * y2 - Number that represents the y-coordinate of the endpoint.
            */
        quadTo(x1: any, y1: any, x2: any, y2: any): void;
        /**
            * Adds a bezier curve to the current path.
            *
            * Parameters:
            *
            * x1 - Number that represents the x-coordinate of the first control point.
            * y1 - Number that represents the y-coordinate of the first control point.
            * x2 - Number that represents the x-coordinate of the second control point.
            * y2 - Number that represents the y-coordinate of the second control point.
            * x3 - Number that represents the x-coordinate of the endpoint.
            * y3 - Number that represents the y-coordinate of the endpoint.
            */
        curveTo(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any): void;
        /**
            * Closes the current path.
            */
        close(): void;
        /**
            * Paints the given text. Possible values for format are empty string for
            * plain text and html for HTML markup. Background and border color as well
            * as clipping is not available in plain text labels for VML. HTML labels
            * are not available as part of shapes with no foreignObject support in SVG
            * (eg. IE9, IE10).
            *
            * Parameters:
            *
            * x - Number that represents the x-coordinate of the text.
            * y - Number that represents the y-coordinate of the text.
            * w - Number that represents the available width for the text or 0 for automatic width.
            * h - Number that represents the available height for the text or 0 for automatic height.
            * str - String that specifies the text to be painted.
            * align - String that represents the horizontal alignment.
            * valign - String that represents the vertical alignment.
            * wrap - Boolean that specifies if word-wrapping is enabled. Requires w > 0.
            * format - Empty string for plain text or 'html' for HTML markup.
            * overflow - Specifies the overflow behaviour of the label. Requires w > 0 and/or h > 0.
            * clip - Boolean that specifies if the label should be clipped. Requires w > 0 and/or h > 0.
            * rotation - Number that specifies the angle of the rotation around the anchor point of the text.
            * dir - Optional string that specifies the text direction. Possible values are rtl and lrt.
            */
        text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
        /**
            * Paints the outline of the current drawing buffer.
            */
        stroke(): void;
        /**
            * Fills the current drawing buffer.
            */
        fill(): void;
        /**
            * Fills the current drawing buffer and its outline.
            */
        fillAndStroke(): void;
    }

    /**
        * Extends <mxAbstractCanvas2D> to implement a canvas for SVG. This canvas writes all
        * calls as SVG output to the given SVG root node.
        *
        * (code)
        * var svgDoc = mxUtils.createXmlDocument();
        * var root = (svgDoc.createElementNS != null) ?
        * 		svgDoc.createElementNS(mxConstants.NS_SVG, 'svg') : svgDoc.createElement('svg');
        *
        * if (svgDoc.createElementNS == null)
        * {
        *   root.setAttribute('xmlns', mxConstants.NS_SVG);
        *   root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
        * }
        * else
        * {
        *   root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', mxConstants.NS_XLINK);
        * }
        *
        * var bounds = graph.getGraphBounds();
        * root.setAttribute('width', (bounds.x + bounds.width + 4) + 'px');
        * root.setAttribute('height', (bounds.y + bounds.height + 4) + 'px');
        * root.setAttribute('version', '1.1');
        *
        * svgDoc.appendChild(root);
        *
        * var svgCanvas = new mxSvgCanvas2D(root);
        * (end)
        *
        * A description of the public API is available in <mxXmlCanvas2D>.
        *
        * To disable anti-aliasing in the output, use the following code.
        *
        * (code)
        * graph.view.canvas.ownerSVGElement.setAttribute('shape-rendering', 'crispEdges');
        * (end)
        *
        * Or set the respective attribute in the SVG element directly.
        */
    export class mxSvgCanvas2D extends mxAbstractCanvas2D {
        /**
            * Holds the current DOM node.
            */
        node: Element;
        /**
            * Specifies if plain text output should match the vertical HTML alignment.
            * Defaul is true.
            */
        matchHtmlAlignment: boolean;
        /**
            * Specifies if text output should be enabled. Default is true.
            */
        textEnabled: boolean;
        /**
            * Specifies if use of foreignObject for HTML markup is allowed. Default is true.
            */
        foEnabled: boolean;
        /**
            * Specifies the fallback text for unsupported foreignObjects in exported
            * documents. Default is '[Object]'. If this is set to null then no fallback
            * text is added to the exported document.
            */
        foAltText: string;
        /**
            * Offset to be used for foreignObjects.
            */
        foOffset: number;
        /**
            * Offset to be used for text elements.
            */
        textOffset: number;
        /**
            * Offset to be used for image elements.
            */
        imageOffset: number;
        /**
            * Adds transparent paths for strokes.
            */
        strokeTolerance: number;
        /**
            * Local counter for references in SVG export.
            */
        refCount: number;
        /**
            * Specifies if a transparent rectangle should be added on top of images to absorb
            * all pointer events. Default is false. This is only needed in Firefox to disable
            * control-clicks on images.
            */
        blockImagePointerEvents: boolean;
        /**
            * Correction factor for <mxConstants.LINE_HEIGHT> in HTML output. Default is 1.
            */
        lineHeightCorrection: number;
        /**
            * Default value for active pointer events. Default is all.
            */
        pointerEventsValue: string;
        /**
            * Padding to be added for text that is not wrapped to account for differences
            * in font metrics on different platforms in pixels. Default is 10.
            */
        fontMetricsPadding: number;
        /**
            * Specifies if offsetWidth and offsetHeight should be cached. Default is true.
            * This is used to speed up repaint of text in <updateText>.
            */
        cacheOffsetSize: boolean;
        /**
            * Implicit variable declarations
            */
        root: SVGElement;
        gradients: any[];
        defs: SVGDefsElement;
        styleEnabled: boolean;
        state: any;
        pointerEvents: any;
        originalRoot: any;
        path: any;
        closeOp: any;
        useDomParser: boolean;
        rotateHtml: boolean;
        /**
            * Constructs a new SVG canvas.
            *
            * @param root - SVG container for the output.
            * @param styleEnabled - Optional boolean that specifies if a style section should be
            * added. The style section sets the default font-size, font-family and
            * stroke-miterlimit globally. Default is false.
            */
        constructor(root: any, styleEnabled: any);
        /**
            * Rounds all numbers to 2 decimal points.
            */
        format(value: any): number;
        /**
            * Returns the URL of the page without the hash part. This needs to use href to
            * include any search part with no params (ie question mark alone). This is a
            * workaround for the fact that window.location.search is empty if there is
            * no search string behind the question mark.
            */
        getBaseUrl(): string;
        /**
            * Returns any offsets for rendering pixels.
            */
        reset(): void;
        /**
            * Creates the optional style section.
            */
        createStyle(x?: any): any;
        /**
            * Returns the alternate content for the given foreignObject.
            */
        createAlternateContent(fo: any, x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any): any;
        /**
            * Private helper function to create SVG elements
            */
        createGradientId(start: any, end: any, alpha1: any, alpha2: any, direction: any): string;
        /**
            * Private helper function to create SVG elements
            */
        getSvgGradient(start: any, end: any, alpha1: any, alpha2: any, direction: any): any;
        /**
            * Creates the given SVG gradient.
            */
        createSvgGradient(start: any, end: any, alpha1: any, alpha2: any, direction: any): any;
        /**
            * Private helper function to create SVG elements
            */
        addNode(filled: any, stroked: any): void;
        /**
            * Transfers the stroke attributes from <state> to <node>.
            */
        updateFill(): void;
        /**
            * Returns the current stroke width (>= 1), ie. max(1, this.format(this.state.strokeWidth * this.state.scale)).
            */
        getCurrentStrokeWidth(): number;
        /**
            * Transfers the stroke attributes from <state> to <node>.
            */
        updateStroke(): void;
        /**
            * Transfers the stroke attributes from <state> to <node>.
            */
        updateStrokeAttributes(): void;
        /**
            * Creates the SVG dash pattern for the given state.
            */
        createDashPattern(scale: any): string;
        /**
            * Creates a hit detection tolerance shape for the given node.
            */
        createTolerance(node: any): any;
        /**
            * Creates a shadow for the given node.
            */
        createShadow(node: any): any;
        /**
            * Experimental implementation for hyperlinks.
            */
        setLink(link: any): void;
        /**
            * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
            */
        rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
        /**
            * Extends superclass to create path.
            */
        begin(): void;
        /**
            * Private helper function to create SVG elements
            */
        rect(x: any, y: any, w: any, h: any): void;
        /**
            * Private helper function to create SVG elements
            */
        roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
        /**
            * Private helper function to create SVG elements
            */
        ellipse(x: any, y: any, w: any, h: any): void;
        /**
            * Private helper function to create SVG elements
            */
        image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
        /**
            * Converts the given HTML string to XHTML.
            */
        convertHtml(val: any): any;
        /**
            * Private helper function to create SVG elements
            */
        createDiv(str: any, align: any, valign: any, style: any, overflow: any): any;
        /**
            * Invalidates the cached offset size for the given node.
            */
        invalidateCachedOffsetSize(node: any): void;
        /**
            * Updates existing DOM nodes for text rendering. LATER: Merge common parts with text function below.
            */
        updateText(x: any, y: any, w: any, h: any, align: any, valign: any, wrap: any, overflow: any, clip: any, rotation: any, node: any): void;
        /**
            * Paints the given text. Possible values for format are empty string for plain
            * text and html for HTML markup. Note that HTML markup is only supported if
            * foreignObject is supported and <foEnabled> is true. (This means IE9 and later
            * does currently not support HTML text as part of shapes.)
            */
        text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
        /**
            * Creates a clip for the given coordinates.
            */
        createClip(x: any, y: any, w: any, h: any): any;
        /**
            * Paints the given text. Possible values for format are empty string for
            * plain text and html for HTML markup.
            */
        plainText(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, overflow: any, clip: any, rotation: any, dir: any): void;
        /**
            * Updates the text properties for the given node. (NOTE: For this to work in
            * IE, the given node must be a text or tspan element.)
            */
        updateFont(node: any): void;
        /**
            * Background color and border
            */
        addTextBackground(node: any, str: any, x: any, y: any, w: any, h: any, align: any, valign: any, overflow: any): void;
        /**
            * Paints the outline of the current path.
            */
        stroke(): void;
        /**
            * Fills the current path.
            */
        fill(): void;
        /**
            * Fills and paints the outline of the current path.
            */
        fillAndStroke(): void;
    }

    /**
        *
        * Implements a canvas to be used for rendering VML. Here is an example of implementing a
        * fallback for SVG images which are not supported in VML-based browsers.
        *
        * (code)
        * var mxVmlCanvas2DImage = mxVmlCanvas2D.prototype.image;
        * mxVmlCanvas2D.prototype.image = function(x, y, w, h, src, aspect, flipH, flipV)
        * {
        *   if (src.substring(src.length - 4, src.length) == '.svg')
        *   {
        *     src = 'http://www.jgraph.com/images/mxgraph.gif';
        *   }
        *
        *   mxVmlCanvas2DImage.apply(this, arguments);
        * };
        * (end)
        *
        * To disable anti-aliasing in the output, use the following code.
        *
        * (code)
        * document.createStyleSheet().cssText = mxClient.VML_PREFIX + '\\:*{antialias:false;)}';
        * (end)
        *
        * A description of the public API is available in <mxXmlCanvas2D>. Note that
        * there is a known issue in VML where gradients are painted using the outer
        * bounding box of rotated shapes, not the actual bounds of the shape. See
        * also <text> for plain text label restrictions in shapes for VML.
        */
    export class mxVmlCanvas2D extends mxAbstractCanvas2D {
        constructor(root: any);
        /**
            * Creates the given element using the document.
            */
        createElement(name: any): any;
        /**
            * Creates a new element using <createElement> and prefixes the given name with
            * <mxClient.VML_PREFIX>.
            */
        createVmlElement(name: any): any;
        /**
            * Adds the current node to the <root>.
            */
        addNode(filled: any, stroked: any): void;
        /**
            * Creates a transparent fill.
            */
        createTransparentFill(): any;
        /**
            * Creates a fill for the current state.
            */
        createFill(): any;
        /**
            * Creates a fill for the current state.
            */
        createStroke(): any;
        /**
            * Returns a VML dash pattern for the current dashPattern.
            * See http://msdn.microsoft.com/en-us/library/bb264085(v=vs.85).aspx
            */
        getVmlDashStyle(): string;
        /**
            * Creates a shadow for the given node.
            */
        createShadow(node: any, filled: any, stroked: any): any;
        /**
            * Creates the fill for the shadow.
            */
        createShadowFill(): any;
        /**
            * Creates the stroke for the shadow.
            */
        createShadowStroke(): any;
        /**
            * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
            */
        rotate(theta: any, flipH: any, flipV: any, cx: any, cy: any): void;
        /**
            * Extends superclass to create path.
            */
        begin(): void;
        /**
            * Replaces quadratic curve with bezier curve in VML.
            */
        quadTo(x1: any, y1: any, x2: any, y2: any): void;
        /**
            * Sets the glass gradient.
            */
        createRect(nodeName: any, x: any, y: any, w: any, h: any): any;
        /**
            * Sets the current path to a rectangle.
            */
        rect(x: any, y: any, w: any, h: any): void;
        /**
            * Sets the current path to a rounded rectangle.
            */
        roundrect(x: any, y: any, w: any, h: any, dx: any, dy: any): void;
        /**
            * Sets the current path to an ellipse.
            */
        ellipse(x: any, y: any, w: any, h: any): void;
        /**
            * Paints an image.
            */
        image(x: any, y: any, w: any, h: any, src: any, aspect: any, flipH: any, flipV: any): void;
        /**
            * Creates the innermost element that contains the HTML text.
            */
        createDiv(str: any, align: any, valign: any, overflow: any): any;
        /**
            * Paints the given text. Possible values for format are empty string for plain
            * text and html for HTML markup. Clipping, text background and border are not
            * supported for plain text in VML.
            */
        text(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
        /**
            * Paints the outline of the current path.
            */
        plainText(x: any, y: any, w: any, h: any, str: any, align: any, valign: any, wrap: any, format: any, overflow: any, clip: any, rotation: any, dir: any): void;
        /**
            * Paints the outline of the current path.
            */
        stroke(): void;
        /**
            * Fills the current path.
            */
        fill(): void;
        /**
            * Fills and paints the outline of the current path.
            */
        fillAndStroke(): void;
    }

    /**
        * Implements the alignment of selection cells to other cells in the graph.
        *
        * Constructor: mxGuide
        *
        * Constructs a new guide object.
        */
    export class mxGuide {
        constructor(graph: any, states: any);
        /**
            * Sets the <mxCellStates> that should be used for alignment.
            */
        setStates(states: any): void;
        /**
            * Returns true if the guide should be enabled for the given native event. This
            * implementation always returns true.
            */
        isEnabledForEvent(evt: any): boolean;
        /**
            * Returns the tolerance for the guides. Default value is gridSize / 2.
            */
        getGuideTolerance(): number;
        /**
            * Returns the mxShape to be used for painting the respective guide. This
            * implementation returns a new, dashed and crisp <mxPolyline> using
            * <mxConstants.GUIDE_COLOR> and <mxConstants.GUIDE_STROKEWIDTH> as the format.
            *
            * Parameters:
            *
            * horizontal - Boolean that specifies which guide should be created.
            */
        createGuideShape(horizontal: any): mxPolyline;
        /**
            * Moves the <bounds> by the given <mxPoint> and returnt the snapped point.
            */
        move(bounds: any, delta: any, gridEnabled: any): any;
        /**
            * Hides all current guides.
            */
        getGuideColor(state: any, horizontal: any): string;
        /**
            * Hides all current guides.
            */
        hide(): void;
        /**
            * Shows or hides the current guides.
            */
        setVisible(visible: any): void;
        /**
            * Destroys all resources that this object uses.
            */
        destroy(): void;
    }

    /**
        * Base class for all layout algorithms in mxGraph. Main public functions are
        * <move> for handling a moved cell within a layouted parent, and <execute> for
        * running the layout on a given parent cell.
        *
        * Known Subclasses:
        *
        * <mxCircleLayout>, <mxCompactTreeLayout>, <mxCompositeLayout>,
        * <mxFastOrganicLayout>, <mxParallelEdgeLayout>, <mxPartitionLayout>,
        * <mxStackLayout>
        *
        * Constructor: mxGraphLayout
        *
        * Constructs a new layout using the given layouts.
        *
        * Arguments:
        *
        * graph - Enclosing
        */
    export class mxGraphLayout {
        constructor(graph: any);
        /**
            * Notified when a cell is being moved in a parent that has automatic
            * layout to update the cell state (eg. index) so that the outcome of the
            * layout will position the vertex as close to the point (x, y) as
            * possible.
            *
            * Empty implementation.
            *
            * Parameters:
            *
            * cell - <mxCell> which has been moved.
            * x - X-coordinate of the new cell location.
            * y - Y-coordinate of the new cell location.
            */
        moveCell(cell: any, x: any, y: any): void;
        /**
            * Executes the layout algorithm for the children of the given parent.
            *
            * Parameters:
            *
            * parent - <mxCell> whose children should be layed out.
            */
        execute(parent: any): void;
        /**
            * Returns the graph that this layout operates on.
            */
        getGraph(): any;
        /**
            * Returns the constraint for the given key and cell. The optional edge and
            * source arguments are used to return inbound and outgoing routing-
            * constraints for the given edge and vertex. This implementation always
            * returns the value for the given key in the style of the given cell.
            *
            * Parameters:
            *
            * key - Key of the constraint to be returned.
            * cell - <mxCell> whose constraint should be returned.
            * edge - Optional <mxCell> that represents the connection whose constraint
            * should be returned. Default is null.
            * source - Optional boolean that specifies if the connection is incoming
            * or outgoing. Default is null.
            */
        getConstraint(key: any, cell: any, edge: any, source: any): any;
        /**
            * Traverses the (directed) graph invoking the given function for each
            * visited vertex and edge. The function is invoked with the current vertex
            * and the incoming edge as a parameter. This implementation makes sure
            * each vertex is only visited once. The function may return false if the
            * traversal should stop at the given vertex.
            *
            * Example:
            *
            * (code)
            * mxLog.show();
            * var cell = graph.getSelectionCell();
            * graph.traverse(cell, false, function(vertex, edge)
            * {
            *   mxLog.debug(graph.getLabel(vertex));
            * });
            * (end)
            *
            * Parameters:
            *
            * vertex - <mxCell> that represents the vertex where the traversal starts.
            * directed - Optional boolean indicating if edges should only be traversed
            * from source to target. Default is true.
            * func - Visitor function that takes the current vertex and the incoming
            * edge as arguments. The traversal stops if the function returns false.
            * edge - Optional <mxCell> that represents the incoming edge. This is
            * null for the first step of the traversal.
            * visited - Optional <mxDictionary> of cell paths for the visited cells.
            */
        static traverse(vertex: any, directed: any, func: any, edge: any, visited: any): void;
        /**
            * Returns a boolean indicating if the given <mxCell> is movable or
            * bendable by the algorithm. This implementation returns true if the given
            * cell is movable in the graph.
            *
            * Parameters:
            *
            * cell - <mxCell> whose movable state should be returned.
            */
        isVertexMovable(cell: any): any;
        /**
            * Returns a boolean indicating if the given <mxCell> should be ignored by
            * the algorithm. This implementation returns false for all vertices.
            *
            * Parameters:
            *
            * vertex - <mxCell> whose ignored state should be returned.
            */
        isVertexIgnored(vertex: any): boolean;
        /**
            * Returns a boolean indicating if the given <mxCell> should be ignored by
            * the algorithm. This implementation returns false for all vertices.
            *
            * Parameters:
            *
            * cell - <mxCell> whose ignored state should be returned.
            */
        isEdgeIgnored(edge: any): boolean;
        /**
            * Disables or enables the edge style of the given edge.
            */
        setEdgeStyleEnabled(edge: any, value: any): void;
        /**
            * Disables or enables orthogonal end segments of the given edge.
            */
        setOrthogonalEdge(edge: any, value: any): void;
        /**
            * Determines the offset of the given parent to the parent
            * of the layout
            */
        getParentOffset(parent: any): mxPoint;
        /**
            * Replaces the array of mxPoints in the geometry of the given edge
            * with the given array of mxPoints.
            */
        setEdgePoints(edge: any, points: any): void;
        /**
            * Sets the new position of the given cell taking into account the size of
            * the bounding box if <useBoundingBox> is true. The change is only carried
            * out if the new location is not equal to the existing location, otherwise
            * the geometry is not replaced with an updated instance. The new or old
            * bounds are returned (including overlapping labels).
            *
            * Parameters:
            *
            * cell - <mxCell> whose geometry is to be set.
            * x - Integer that defines the x-coordinate of the new location.
            * y - Integer that defines the y-coordinate of the new location.
            */
        setVertexLocation(cell: any, x: any, y: any): any;
        /**
            * Returns an <mxRectangle> that defines the bounds of the given cell or
            * the bounding box if <useBoundingBox> is true.
            */
        getVertexBounds(cell: any): mxRectangle;
        /**
            * Shortcut to <mxGraph.updateGroupBounds> with moveGroup set to true.
            */
        arrangeGroups(cells: any, border: any, topBorder: any, rightBorder: any, bottomBorder: any, leftBorder: any): any;
    }

    /**
        * Extends <mxGraphLayout> to create a horizontal or vertical stack of the
        * child vertices. The children do not need to be connected for this layout
        * to work.
        *
        * Example:
        *
        * (code)
        * var layout = new mxStackLayout(graph, true);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxStackLayout
        *
        * Constructs a new stack layout layout for the specified graph,
        * spacing, orientation and offset.
        */
    export class mxStackLayout extends mxGraphLayout {
        constructor(graph: any, horizontal: any, spacing: any, x0: any, y0: any, border: any);
        /**
            * Returns <horizontal>.
            */
        isHorizontal(): any;
        /**
            * Implements <mxGraphLayout.moveCell>.
            */
        moveCell(cell: any, x: any, y: any): void;
        /**
            * Returns the size for the parent container or the size of the graph
            * container if the parent is a layer or the root of the model.
            */
        getParentSize(parent: any): any;
        /**
            * Implements <mxGraphLayout.execute>.
            *
            * Only children where <isVertexIgnored> returns false are taken into
            * account.
            */
        execute(parent: any): void;
        /**
            * Implements <mxGraphLayout.execute>.
            *
            * Only children where <isVertexIgnored> returns false are taken into
            * account.
            */
        setChildGeometry(child: any, geo: any): void;
        /**
            * Implements <mxGraphLayout.execute>.
            *
            * Only children where <isVertexIgnored> returns false are taken into
            * account.
            */
        updateParentGeometry(parent: any, pgeo: any, last: any): void;
    }

    /**
        * Extends <mxGraphLayout> for partitioning the parent cell vertically or
        * horizontally by filling the complete area with the child cells. A horizontal
        * layout partitions the height of the given parent whereas a a non-horizontal
        * layout partitions the width. If the parent is a layer (that is, a child of
        * the root node), then the current graph size is partitioned. The children do
        * not need to be connected for this layout to work.
        *
        * Example:
        *
        * (code)
        * var layout = new mxPartitionLayout(graph, true, 10, 20);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxPartitionLayout
        *
        * Constructs a new stack layout layout for the specified graph,
        * spacing, orientation and offset.
        */
    export class mxPartitionLayout extends mxGraphLayout {
        constructor(graph: any, horizontal: any, spacing: any, border: any);
        /**
            * Returns <horizontal>.
            */
        isHorizontal(): any;
        /**
            * Implements <mxGraphLayout.moveCell>.
            */
        moveCell(cell: any, x: any, y: any): void;
        /**
            * Implements <mxGraphLayout.execute>. All children where <isVertexIgnored>
            * returns false and <isVertexMovable> returns true are modified.
            */
        execute(parent: any): void;
    }

    /**
        * Extends <mxGraphLayout> to implement a compact tree (Moen) algorithm. This
        * layout is suitable for graphs that have no cycles (trees). Vertices that are
        * not connected to the tree will be ignored by this layout.
        *
        * Example:
        *
        * (code)
        * var layout = new mxCompactTreeLayout(graph);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxCompactTreeLayout
        *
        * Constructs a new compact tree layout for the specified graph
        * and orientation.
        */
    export class mxCompactTreeLayout extends mxGraphLayout {
        constructor(graph: any, horizontal: any, invert: any);
        /**
            * Returns a boolean indicating if the given <mxCell> should be ignored as a
            * vertex. This returns true if the cell has no connections.
            *
            * Parameters:
            *
            * vertex - <mxCell> whose ignored state should be returned.
            */
        isVertexIgnored(vertex: any): any;
        /**
            * Returns <horizontal>.
            */
        isHorizontal(): any;
        /**
            * Implements <mxGraphLayout.execute>.
            *
            * If the parent has any connected edges, then it is used as the root of
            * the tree. Else, <mxGraph.findTreeRoots> will be used to find a suitable
            * root node within the set of children of the given parent.
            *
            * Parameters:
            *
            * parent - <mxCell> whose children should be laid out.
            * root - Optional <mxCell> that will be used as the root of the tree.
            * Overrides <root> if specified.
            */
        execute(parent: any, root?: any): void;
        /**
            * Moves the specified node and all of its children by the given amount.
            */
        moveNode(node: any, dx: any, dy: any): void;
        /**
            * Called if <sortEdges> is true to sort the array of outgoing edges in place.
            */
        sortOutgoingEdges(source: any, edges: any): void;
        /**
            * Stores the maximum height (relative to the layout
            * direction) of cells in each rank
            */
        findRankHeights(node: any, rank: any): void;
        /**
            * Set the cells heights (relative to the layout
            * direction) when the tops of each rank are to be aligned
            */
        setCellHeights(node: any, rank: any): void;
        /**
            * Does a depth first search starting at the specified cell.
            * Makes sure the specified parent is never left by the
            * algorithm.
            */
        dfs(cell: any, parent: any): any;
        /**
            * Starts the actual compact tree layout algorithm
            * at the given node.
            */
        layout(node: any): void;
        /**
            * Function: horizontalLayout
            */
        horizontalLayout(node: any, x0: any, y0: any, bounds: any): any;
        /**
            * Function: verticalLayout
            */
        verticalLayout(node: any, parent: any, x0: any, y0: any, bounds: any): any;
        /**
            * Function: attachParent
            */
        attachParent(node: any, height: any): void;
        /**
            * Function: layoutLeaf
            */
        layoutLeaf(node: any): void;
        /**
            * Function: join
            */
        join(node: any): any;
        /**
            * Function: merge
            */
        merge(p1: any, p2: any): number;
        /**
            * Function: offset
            */
        offset(p1: any, p2: any, a1: any, a2: any, b1: any, b2: any): number;
        /**
            * Function: bridge
            */
        bridge(line1: any, x1: any, y1: any, line2: any, x2: any, y2: any): Object;
        /**
            * Function: createNode
            */
        createNode(cell: any): Object;
        /**
            * Function: apply
            */
        apply(node: any, bounds: any): any;
        /**
            * Function: createLine
            */
        createLine(dx: any, dy: any, next: any): Object;
        /**
            * Adjust parent cells whose child geometries have changed. The default
            * implementation adjusts the group to just fit around the children with
            * a padding.
            */
        adjustParents(): void;
        /**
            * Moves the specified node and all of its children by the given amount.
            */
        localEdgeProcessing(node: any): void;
        /**
            * Separates the x position of edges as they connect to vertices
            */
        processNodeOutgoing(node: any): void;
    }
    /**
        * A utility class used to track cells whilst sorting occurs on the weighted
        * sum of their connected edges. Does not violate (x.compareTo(y)==0) ==
        * (x.equals(y))
        *
        * Constructor: WeightedCellSorter
        *
        * Constructs a new weighted cell sorted for the given cell and weight.
        */
    export class WeightedCellSorter {
        constructor(cell: any, weightedValue: any);
        /**
            * Compares two WeightedCellSorters.
            */
        compare(a: any, b: any): 1 | 0 | -1;
    }

    /**
        * Extends <mxGraphLayout> to implement a radial tree algorithm. This
        * layout is suitable for graphs that have no cycles (trees). Vertices that are
        * not connected to the tree will be ignored by this layout.
        *
        * Example:
        *
        * (code)
        * var layout = new mxRadialTreeLayout(graph);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxRadialTreeLayout
        *
        * Constructs a new radial tree layout for the specified graph
        */
    export class mxRadialTreeLayout extends mxCompactTreeLayout {
        constructor(graph: any);
        /**
            * Returns a boolean indicating if the given <mxCell> should be ignored as a
            * vertex. This returns true if the cell has no connections.
            *
            * Parameters:
            *
            * vertex - <mxCell> whose ignored state should be returned.
            */
        isVertexIgnored(vertex: any): any;
        /**
            * Implements <mxGraphLayout.execute>.
            *
            * If the parent has any connected edges, then it is used as the root of
            * the tree. Else, <mxGraph.findTreeRoots> will be used to find a suitable
            * root node within the set of children of the given parent.
            *
            * Parameters:
            *
            * parent - <mxCell> whose children should be laid out.
            * root - Optional <mxCell> that will be used as the root of the tree.
            */
        execute(parent: any, root: any): void;
        /**
            * Recursive function to calculate the dimensions of each row
            *
            * Parameters:
            *
            * row - Array of internal nodes, the children of which are to be processed.
            * rowNum - Integer indicating which row is being processed.
            */
        calcRowDims(row: any, rowNum: any): void;
    }

    /**
     * Extends <mxGraphLayout> to implement a fast organic layout algorithm.
     * The vertices need to be connected for this layout to work, vertices
     * with no connections are ignored.
     * 
     * @example
     * var layout = new mxFastOrganicLayout(graph);
     * layout.execute(graph.getDefaultParent());
     */
    export class mxFastOrganicLayout extends mxGraphLayout {
        /**
         * Specifies if the top left corner of the input cells should be the origin
         * of the layout result. Default is true.
         */
        useInputOrigin: boolean;

        /**
         * Specifies if all edge points of traversed edges should be removed.
         * Default is true.
         */
        resetEdges: boolean;

        /**
         * Specifies if the STYLE_NOEDGESTYLE flag should be set on edges that are
         * modified by the result. Default is true.
         */
        disableEdgeStyle: boolean;

        /**
         * The force constant by which the attractive forces are divided and the
         * replusive forces are multiple by the square of. The value equates to the
         * average radius there is of free space around each node. Default is 50.
         */
        forceConstant: number;
        /**
         * Cache of <forceConstant>^2 for performance.
         */
        forceConstantSquared: number;

        /**
         * Minimal distance limit. Default is 2. Prevents of
         * dividing by zero.
         */
        minDistanceLimit: number;

        /**
         * Minimal distance limit. Default is 2. Prevents of
         * dividing by zero.
         */
        maxDistanceLimit: number;

        /**
         * Cached version of <minDistanceLimit> squared.
         */
        minDistanceLimitSquared: number;

        /**
         * Start value of temperature. Default is 200.
         */
        initialTemp: number;

        /**
         * Temperature to limit displacement at later stages of layout.
         */
        temperature: number;

        /**
         * Total number of iterations to run the layout though.
         */
        maxIterations: number;

        /**
         * Current iteration count.
         */
        iteration: number;
        
        /**
         * An array of all vertices to be laid out.
         */
        vertexArray: any;

        /**
         * An array of locally stored X co-ordinate displacements for the vertices.
         */
        dispX: any;

        /**
         * An array of locally stored Y co-ordinate displacements for the vertices.
         */
        dispY: any;

        /**
         * An array of locally stored co-ordinate positions for the vertices.
         */
        cellLocation: any;

        /**
         * The approximate radius of each cell, nodes only.
         */
        radius: any;

        /**
         * The approximate radius squared of each cell, nodes only.
         */
        radiusSquared: any;

        /**
         * Array of booleans representing the movable states of the vertices.
         */
        isMoveable: any;

        /**
         * Local copy of cell neighbours.
         */
        neighbours: any;

        /**
         * Hashtable from cells to local indices.
         */
        indices: any;

        /**
         * Boolean flag that specifies if the layout is allowed to run. If this is
         * set to false, then the layout exits in the following iteration.
         */
        allowedToRun: boolean;

        /**
         * Constructs a new fast organic layout for the specified graph.
         */
        constructor(graph: any);
        /**
            * Returns a boolean indicating if the given <mxCell> should be ignored as a
            * vertex. This returns true if the cell has no connections.
            *
            * Parameters:
            *
            * vertex - <mxCell> whose ignored state should be returned.
            */
        isVertexIgnored(vertex: any): any;
        /**
            * Implements <mxGraphLayout.execute>. This operates on all children of the
            * given parent where <isVertexIgnored> returns false.
            */
        execute(parent: any): void;
        /**
            * Takes the displacements calculated for each cell and applies them to the
            * local cache of cell positions. Limits the displacement to the current
            * temperature.
            */
        calcPositions(): void;
        /**
            * Calculates the attractive forces between all laid out nodes linked by
            * edges
            */
        calcAttraction(): void;
        /**
            * Calculates the repulsive forces between all laid out nodes
            */
        calcRepulsion(): void;
        /**
            * Reduces the temperature of the layout from an initial setting in a linear
            * fashion to zero.
            */
        reduceTemperature(): void;
    }

    /**
        * Extends <mxGraphLayout> to implement a circluar layout for a given radius.
        * The vertices do not need to be connected for this layout to work and all
        * connections between vertices are not taken into account.
        *
        * Example:
        *
        * (code)
        * var layout = new mxCircleLayout(graph);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxCircleLayout
        *
        * Constructs a new circular layout for the specified radius.
        *
        * Arguments:
        *
        * graph - <mxGraph> that contains the cells.
        * radius - Optional radius as an int. Default is 100.
        */
    export class mxCircleLayout extends mxGraphLayout {
        constructor(graph: any, radius: any);
        /**
            * Implements <mxGraphLayout.execute>.
            */
        execute(parent: any): void;
        /**
            * Returns the radius to be used for the given vertex count. Max is the maximum
            * width or height of all vertices in the layout.
            */
        getRadius(count: any, max: any): number;
        /**
            * Executes the circular layout for the specified array
            * of vertices and the given radius. This is called from
            * <execute>.
            */
        circle(vertices: any, r: any, left: any, top: any): void;
    }

    /**
        * Extends <mxGraphLayout> for arranging parallel edges. This layout works
        * on edges for all pairs of vertices where there is more than one edge
        * connecting the latter.
        *
        * Example:
        *
        * (code)
        * var layout = new mxParallelEdgeLayout(graph);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * To run the layout for the parallel edges of a changed edge only, the
        * following code can be used.
        *
        * (code)
        * var layout = new mxParallelEdgeLayout(graph);
        *
        * graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt)
        * {
        *   var model = graph.getModel();
        *   var edge = evt.getProperty('edge');
        *   var src = model.getTerminal(edge, true);
        *   var trg = model.getTerminal(edge, false);
        *
        *   layout.isEdgeIgnored = function(edge2)
        *   {
        *     var src2 = model.getTerminal(edge2, true);
        *     var trg2 = model.getTerminal(edge2, false);
        *
        *     return !(model.isEdge(edge2) && ((src == src2 && trg == trg2) || (src == trg2 && trg == src2)));
        *   };
        *
        *   layout.execute(graph.getDefaultParent());
        * });
        * (end)
        *
        * Constructor: mxCompactTreeLayout
        *
        * Constructs a new fast organic layout for the specified graph.
        */
    export class mxParallelEdgeLayout extends mxGraphLayout {
        constructor(graph: any);
        /**
            * Implements <mxGraphLayout.execute>.
            */
        execute(parent: any): void;
        /**
            * Finds the parallel edges in the given parent.
            */
        findParallels(parent: any): any[];
        /**
            * Returns a unique ID for the given edge. The id is independent of the
            * edge direction and is built using the visible terminal of the given
            * edge.
            */
        getEdgeId(edge: any): string;
        /**
            * Lays out the parallel edges in the given array.
            */
        layout(parallels: any): void;
        /**
            * Routes the given edge via the given point.
            */
        route(edge: any, x: any, y: any): void;
    }

    /**
        * Allows to compose multiple layouts into a single layout. The master layout
        * is the layout that handles move operations if another layout than the first
        * element in <layouts> should be used. The <master> layout is not executed as
        * the code assumes that it is part of <layouts>.
        *
        * Example:
        * (code)
        * var first = new mxFastOrganicLayout(graph);
        * var second = new mxParallelEdgeLayout(graph);
        * var layout = new mxCompositeLayout(graph, [first, second], first);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxCompositeLayout
        *
        * Constructs a new layout using the given layouts. The graph instance is
        * required for creating the transaction that contains all layouts.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * layouts - Array of <mxGraphLayouts>.
        * master - Optional layout that handles moves. If no layout is given then
        * the first layout of the above array is used to handle moves.
        */
    export class mxCompositeLayout extends mxGraphLayout {
        constructor(graph: any, layouts: any, master: any);
        /**
            * Implements <mxGraphLayout.moveCell> by calling move on <master> or the first
            * layout in <layouts>.
            */
        moveCell(cell: any, x: any, y: any): void;
        /**
            * Implements <mxGraphLayout.execute> by executing all <layouts> in a
            * single transaction.
            */
        execute(parent: any): void;
    }

    /**
        * Extends <mxGraphLayout> to implement an edge label layout. This layout
        * makes use of cell states, which means the graph must be validated in
        * a graph view (so that the label bounds are available) before this layout
        * can be executed.
        *
        * Example:
        *
        * (code)
        * var layout = new mxEdgeLabelLayout(graph);
        * layout.execute(graph.getDefaultParent());
        * (end)
        *
        * Constructor: mxEdgeLabelLayout
        *
        * Constructs a new edge label layout.
        *
        * Arguments:
        *
        * graph - <mxGraph> that contains the cells.
        */
    export class mxEdgeLabelLayout extends mxGraphLayout {
        constructor(graph: any, radius: any);
        /**
            * Implements <mxGraphLayout.execute>.
            */
        execute(parent: any): void;
        /**
            * Places the labels of the given edges.
            */
        placeLabels(v: any, e: any): void;
        /**
            * Places the labels of the given edges.
            */
        avoid(edge: any, vertex: any): void;
    }

    /**
        * Extends <mxEventSource> to implement a graph model. The graph model acts as
        * a wrapper around the cells which are in charge of storing the actual graph
        * datastructure. The model acts as a transactional wrapper with event
        * notification for all changes, whereas the cells contain the atomic
        * operations for updating the actual datastructure.
        *
        * Layers:
        *
        * The cell hierarchy in the model must have a top-level root cell which
        * contains the layers (typically one default layer), which in turn contain the
        * top-level cells of the layers. This means each cell is contained in a layer.
        * If no layers are required, then all new cells should be added to the default
        * layer.
        *
        * Layers are useful for hiding and showing groups of cells, or for placing
        * groups of cells on top of other cells in the display. To identify a layer,
        * the <isLayer> function is used. It returns true if the parent of the given
        * cell is the root of the model.
        *
        * Events:
        *
        * See events section for more details. There is a new set of events for
        * tracking transactional changes as they happen. The events are called
        * startEdit for the initial beginUpdate, executed for each executed change
        * and endEdit for the terminal endUpdate. The executed event contains a
        * property called change which represents the change after execution.
        *
        * Encoding the model:
        *
        * To encode a graph model, use the following code:
        *
        * (code)
        * var enc = new mxCodec();
        * var node = enc.encode(graph.getModel());
        * (end)
        *
        * This will create an XML node that contains all the model information.
        *
        * Encoding and decoding changes:
        *
        * For the encoding of changes, a graph model listener is required that encodes
        * each change from the given array of changes.
        *
        * (code)
        * model.addListener(mxEvent.CHANGE, function(sender, evt)
        * {
        *   var changes = evt.getProperty('edit').changes;
        *   var nodes = [];
        *   var codec = new mxCodec();
        *
        *   for (var i = 0; i < changes.length; i++)
        *   {
        *     nodes.push(codec.encode(changes[i]));
        *   }
        *   // do something with the nodes
        * });
        * (end)
        *
        * For the decoding and execution of changes, the codec needs a lookup function
        * that allows it to resolve cell IDs as follows:
        *
        * (code)
        * var codec = new mxCodec();
        * codec.lookup = function(id)
        * {
        *   return model.getCell(id);
        * }
        * (end)
        *
        * For each encoded change (represented by a node), the following code can be
        * used to carry out the decoding and create a change object.
        *
        * (code)
        * var changes = [];
        * var change = codec.decode(node);
        * change.model = model;
        * change.execute();
        * changes.push(change);
        * (end)
        *
        * The changes can then be dispatched using the model as follows.
        *
        * (code)
        * var edit = new mxUndoableEdit(model, false);
        * edit.changes = changes;
        *
        * edit.notify = function()
        * {
        *   edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
        *   	'edit', edit, 'changes', edit.changes));
        *   edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
        *   	'edit', edit, 'changes', edit.changes));
        * }
        *
        * model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
        * model.fireEvent(new mxEventObject(mxEvent.CHANGE,
        * 		'edit', edit, 'changes', changes));
        * (end)
        *
        * Event: mxEvent.CHANGE
        *
        * Fires when an undoable edit is dispatched. The <code>edit</code> property
        * contains the <mxUndoableEdit>. The <code>changes</code> property contains
        * the array of atomic changes inside the undoable edit. The changes property
        * is <strong>deprecated</strong>, please use edit.changes instead.
        *
        * Example:
        *
        * For finding newly inserted cells, the following code can be used:
        *
        * (code)
        * graph.model.addListener(mxEvent.CHANGE, function(sender, evt)
        * {
        *   var changes = evt.getProperty('edit').changes;
        *
        *   for (var i = 0; i < changes.length; i++)
        *   {
        *     var change = changes[i];
        *
        *     if (change instanceof mxChildChange &&
        *       change.change.previous == null)
        *     {
        *       graph.startEditingAtCell(change.child);
        *       break;
        *     }
        *   }
        * });
        * (end)
        *
        *
        * Event: mxEvent.NOTIFY
        *
        * Same as <mxEvent.CHANGE>, this event can be used for classes that need to
        * implement a sync mechanism between this model and, say, a remote model. In
        * such a setup, only local changes should trigger a notify event and all
        * changes should trigger a change event.
        *
        * Event: mxEvent.EXECUTE
        *
        * Fires between begin- and endUpdate and after an atomic change was executed
        * in the model. The <code>change</code> property contains the atomic change
        * that was executed.
        *
        * Event: mxEvent.EXECUTED
        *
        * Fires between START_EDIT and END_EDIT after an atomic change was executed.
        * The <code>change</code> property contains the change that was executed.
        *
        * Event: mxEvent.BEGIN_UPDATE
        *
        * Fires after the <updateLevel> was incremented in <beginUpdate>. This event
        * contains no properties.
        *
        * Event: mxEvent.START_EDIT
        *
        * Fires after the <updateLevel> was changed from 0 to 1. This event
        * contains no properties.
        *
        * Event: mxEvent.END_UPDATE
        *
        * Fires after the <updateLevel> was decreased in <endUpdate> but before any
        * notification or change dispatching. The <code>edit</code> property contains
        * the <currentEdit>.
        *
        * Event: mxEvent.END_EDIT
        *
        * Fires after the <updateLevel> was changed from 1 to 0. This event
        * contains no properties.
        *
        * Event: mxEvent.BEFORE_UNDO
        *
        * Fires before the change is dispatched after the update level has reached 0
        * in <endUpdate>. The <code>edit</code> property contains the <curreneEdit>.
        *
        * Event: mxEvent.UNDO
        *
        * Fires after the change was dispatched in <endUpdate>. The <code>edit</code>
        * property contains the <currentEdit>.
        *
        * Constructor: mxGraphModel
        *
        * Constructs a new graph model. If no root is specified then a new root
        * <mxCell> with a default layer is created.
        *
        * Parameters:
        *
        * root - <mxCell> that represents the root cell.
        */
    export class mxGraphModel extends mxEventSource {
        /**
            * Holds the root cell, which in turn contains the cells that represent the
            * layers of the diagram as child cells. That is, the actual elements of the
            * diagram are supposed to live in the third generation of cells and below.
            */
        root: any;
        /**
            * Maps from Ids to cells.
            */
        cells: any;
        /**
            * Specifies if edges should automatically be moved into the nearest common
            * ancestor of their terminals. Default is true.
            */
        maintainEdgeParent: boolean;
        /**
            * Specifies if relative edge parents should be ignored for finding the nearest
            * common ancestors of an edge's terminals. Default is true.
            */
        ignoreRelativeEdgeParent: boolean;
        /**
            * Specifies if the model should automatically create Ids for new cells.
            * Default is true.
            */
        createIds: boolean;
        /**
            * Defines the prefix of new Ids. Default is an empty string.
            */
        prefix: string;
        /**
            * Defines the postfix of new Ids. Default is an empty string.
            */
        postfix: string;
        /**
            * Specifies the next Id to be created. Initial value is 0.
            */
        nextId: number;
        /**
            * Holds the changes for the current transaction. If the transaction is
            * closed then a new object is created for this variable using
            * <createUndoableEdit>.
            */
        currentEdit: any;
        /**
            * Counter for the depth of nested transactions. Each call to <beginUpdate>
            * will increment this number and each call to <endUpdate> will decrement
            * it. When the counter reaches 0, the transaction is closed and the
            * respective events are fired. Initial value is 0.
            */
        updateLevel: number;
        /**
            * True if the program flow is currently inside endUpdate.
            */
        endingUpdate: boolean;
        constructor(root?: any);
        /**
            * Sets a new root using <createRoot>.
            */
        clear(): void;
        /**
            * Returns <createIds>.
            */
        isCreateIds(): boolean;
        /**
            * Sets <createIds>.
            */
        setCreateIds(value: any): void;
        /**
            * Creates a new root cell with a default layer (child 0).
            */
        createRoot(): mxCell;
        /**
            * Returns the <mxCell> for the specified Id or null if no cell can be
            * found for the given Id.
            *
            * @param id - A string representing the Id of the cell.
            */
        getCell(id: string): mxCell;
        /**
            * Returns the cells from the given array where the given filter function
            * returns true.
            */
        filterCells(cells: mxCell[], filter: (cell: mxCell) => boolean): mxCell[];
        /**
            * Returns all descendants of the given cell and the cell itself in an array.
            *
            * @param parent - <mxCell> whose descendants should be returned.
            */
        getDescendants(parent: mxCell): mxCell[];
        /**
            * Visits all cells recursively and applies the specified filter function
            * to each cell. If the function returns true then the cell is added
            * to the resulting array. The parent and result paramters are optional.
            * If parent is not specified then the recursion starts at <root>.
            *
            * The following example extracts all vertices from a given model:
            * @example
            * var filter = function(cell)
            * {
            * 	return model.isVertex(cell);
            * }
            * var vertices = model.filterDescendants(filter);
            *
            * @param filter - JavaScript function that takes an <mxCell> as an argument
            * and returns a boolean.
            * @param parent - Optional <mxCell> that is used as the root of the recursion.
            */
        filterDescendants(filter: (cell: mxCell) => boolean, parent?: mxCell): mxCell[];
        /**
            * Returns the root of the model or the topmost parent of the given cell.
            *
            * @param cell - Optional <mxCell> that specifies the child.
            */
        getRoot(cell?: mxCell): mxCell;
        /**
            * Sets the <root> of the model using <mxRootChange> and adds the change to
            * the current transaction. This resets all datastructures in the model and
            * is the preferred way of clearing an existing model. Returns the new
            * root.
            *
            * @example
            * var root = new mxCell();
            * root.insert(new mxCell());
            * model.setRoot(root);
            *
            * @param root - <mxCell> that specifies the new root.
            */
        setRoot(root: mxCell): mxCell;
        /**
            * Inner callback to change the root of the model and update the internal
            * datastructures, such as <cells> and <nextId>. Returns the previous root.
            *
            * @param root - <mxCell> that specifies the new root.
            */
        rootChanged(root: mxCell): mxCell;
        /**
            * Returns true if the given cell is the root of the model and a non-null
            * value.
            *
            * @param cell - <mxCell> that represents the possible root.
            */
        isRoot(cell: mxCell): boolean;
        /**
            * Returns true if <isRoot> returns true for the parent of the given cell.
            *
            * @param cell - <mxCell> that represents the possible layer.
            */
        isLayer(cell: mxCell): boolean;
        /**
            * Returns true if the given parent is an ancestor of the given child.
            *
            * @param parent - <mxCell> that specifies the parent.
            * @param child - <mxCell> that specifies the child.
            */
        isAncestor(parent: mxCell, child: mxCell): boolean;
        /**
            * Returns true if the model contains the given <mxCell>.
            *
            * @param cell - <mxCell> that specifies the cell.
            */
        contains(cell: mxCell): boolean;
        /**
            * Returns the parent of the given cell.
            *
            * @param cell - <mxCell> whose parent should be returned.
            */
        getParent(cell: mxCell): mxCell;
        /**
            * Adds the specified child to the parent at the given index using
            * <mxChildChange> and adds the change to the current transaction. If no
            * index is specified then the child is appended to the parent's array of
            * children. Returns the inserted child.
            *
            * @param parent - <mxCell> that specifies the parent to contain the child.
            * @param child - <mxCell> that specifies the child to be inserted.
            * @param index - Optional integer that specifies the index of the child.
            */
        add(parent: mxCell, child: mxCell, index?: number): mxCell;
        /**
            * Inner callback to update <cells> when a cell has been added. This
            * implementation resolves collisions by creating new Ids. To change the
            * ID of a cell after it was inserted into the model, use the following
            * code:
            *
            * (code
            * delete model.cells[cell.getId()];
            * cell.setId(newId);
            * model.cells[cell.getId()] = cell;
            * (end)
            *
            * If the change of the ID should be part of the command history, then the
            * cell should be removed from the model and a clone with the new ID should
            * be reinserted into the model instead.
            *
            * @param cell - <mxCell> that specifies the cell that has been added.
            */
        cellAdded(cell: mxCell): void;
        /**
            * Hook method to create an Id for the specified cell. This implementation
            * concatenates <prefix>, id and <postfix> to create the Id and increments
            * <nextId>. The cell is ignored by this implementation, but can be used in
            * overridden methods to prefix the Ids with eg. the cell type.
            *
            * @param cell - <mxCell> to create the Id for.
            */
        createId(cell: mxCell): string;
        /**
            * Updates the parent for all edges that are connected to cell or one of
            * its descendants using <updateEdgeParent>.
            */
        updateEdgeParents(cell: mxCell, root?: mxCell): void;
        /**
            * Returns the absolute, accumulated origin for the children inside the
            * given parent as an <mxPoint>.
            */
        getOrigin(cell: mxCell): mxPoint;
        /**
            * Returns the nearest common ancestor for the specified cells.
            *
            * @param cell1 - <mxCell> that specifies the first cell in the tree.
            * @param cell2 - <mxCell> that specifies the second cell in the tree.
            */
        getNearestCommonAncestor(cell1: mxCell, cell2: mxCell): mxCell;
        /**
            * Removes the specified cell from the model using <mxChildChange> and adds
            * the change to the current transaction. This operation will remove the
            * cell and all of its children from the model. Returns the removed cell.
            *
            * @param cell - <mxCell> that should be removed.
            */
        remove(cell: mxCell): mxCell;
        /**
            * Inner callback to update <cells> when a cell has been removed.
            *
            * @param cell - <mxCell> that specifies the cell that has been removed.
            */
        cellRemoved(cell: mxCell): void;
        /**
            * Inner callback to update the parent of a cell using <mxCell.insert>
            * on the parent and return the previous parent.
            *
            * @param cell - <mxCell> to update the parent for.
            * @param parent - <mxCell> that specifies the new parent of the cell.
            * @param index - Optional integer that defines the index of the child
            * in the parent's child array.
            */
        parentForCellChanged(cell: mxCell, parent: mxCell, index?: number): mxCell;
        /**
            * Returns the number of children in the given cell.
            *
            * @param cell - <mxCell> whose number of children should be returned.
            */
        getChildCount(cell: mxCell): number;
        /**
            * Returns the child of the given <mxCell> at the given index.
            *
            * @param cell - <mxCell> that represents the parent.
            * @param index - Integer that specifies the index of the child to be returned.
            */
        getChildAt(cell: mxCell, index: number): mxCell;
        /**
            * Returns all children of the given <mxCell> as an array of <mxCells>. The
            * return value should be only be read.
            *
            * @param cell - <mxCell> the represents the parent.
            */
        getChildren(cell: mxCell): mxCell[];
        /**
            * Returns the child vertices of the given parent.
            *
            * @param cell - <mxCell> whose child vertices should be returned.
            */
        getChildVertices(parent: mxCell): mxCell[];
        /**
            * Returns the child edges of the given parent.
            *
            * @param cell - <mxCell> whose child edges should be returned.
            */
        getChildEdges(parent: mxCell): mxCell[];
        /**
            * Returns the children of the given cell that are vertices and/or edges
            * depending on the arguments.
            *
            * @param cell - <mxCell> the represents the parent.
            * @param vertices - Boolean indicating if child vertices should be returned.
            * Default is false.
            * @param edges - Boolean indicating if child edges should be returned.
            * Default is false.
            */
        getChildCells(parent: mxCell, vertices?: boolean, edges?: boolean): mxCell[];
        /**
            * Returns the source or target <mxCell> of the given edge depending on the
            * value of the boolean parameter.
            *
            * @param edge - <mxCell> that specifies the edge.
            * @param isSource - Boolean indicating which end of the edge should be returned.
            */
        getTerminal(edge: mxCell, isSource: boolean): mxCell;
        /**
            * Sets the source or target terminal of the given <mxCell> using
            * <mxTerminalChange> and adds the change to the current transaction.
            * This implementation updates the parent of the edge using <updateEdgeParent>
            * if required.
            *
            * @param edge - <mxCell> that specifies the edge.
            * @param terminal - <mxCell> that specifies the new terminal.
            * @param isSource - Boolean indicating if the terminal is the new source or
            * target terminal of the edge.
            */
        setTerminal(edge: mxCell, terminal: mxCell, isSource: boolean): mxCell;
        /**
            * Sets the source and target <mxCell> of the given <mxCell> in a single
            * transaction using <setTerminal> for each end of the edge.
            *
            * @param edge - <mxCell> that specifies the edge.
            * @param source - <mxCell> that specifies the new source terminal.
            * @param target - <mxCell> that specifies the new target terminal.
            */
        setTerminals(edge: mxCell, source: mxCell, target: mxCell): void;
        /**
            * Inner helper function to update the terminal of the edge using
            * <mxCell.insertEdge> and return the previous terminal.
            *
            * @param edge - <mxCell> that specifies the edge to be updated.
            * @param terminal - <mxCell> that specifies the new terminal.
            * @param isSource - Boolean indicating if the terminal is the new source or
            * target terminal of the edge.
            */
        terminalForCellChanged(edge: mxCell, terminal: mxCell, isSource: boolean): mxCell;
        /**
            * Returns the number of distinct edges connected to the given cell.
            *
            * @param cell - <mxCell> that represents the vertex.
            */
        getEdgeCount(cell: mxCell): number;
        /**
            * Returns the edge of cell at the given index.
            *
            * @param cell - <mxCell> that specifies the vertex.
            * @param index - Integer that specifies the index of the edge
            * to return.
            */
        getEdgeAt(cell: mxCell, index: number): mxCell;
        /**
            * Returns the number of incoming or outgoing edges, ignoring the given
            * edge.
            *
            * @param cell - <mxCell> whose edge count should be returned.
            * @param outgoing - Boolean that specifies if the number of outgoing or
            * incoming edges should be returned.
            * @param ignoredEdge - <mxCell> that represents an edge to be ignored.
            */
        getDirectedEdgeCount(cell: mxCell, outgoing: boolean, ignoredEdge?: mxCell): number;
        /**
            * Returns all edges of the given cell without loops.
            *
            * @param cell - <mxCell> whose edges should be returned.
            */
        getConnections(cell: mxCell): mxCell[];
        /**
            * Returns the incoming edges of the given cell without loops.
            *
            * @param cell - <mxCell> whose incoming edges should be returned.
            */
        getIncomingEdges(cell: mxCell): mxCell[];
        /**
            * Returns the outgoing edges of the given cell without loops.
            *
            * @param cell - <mxCell> whose outgoing edges should be returned.
            */
        getOutgoingEdges(cell: mxCell): mxCell[];
        /**
            * Returns all distinct edges connected to this cell as a new array of
            * <mxCells>. If at least one of incoming or outgoing is true, then loops
            * are ignored, otherwise if both are false, then all edges connected to
            * the given cell are returned including loops.
            *
            * @param cell - <mxCell> that specifies the cell.
            * @param incoming - Optional boolean that specifies if incoming edges should be
            * returned. Default is true.
            * @param outgoing - Optional boolean that specifies if outgoing edges should be
            * returned. Default is true.
            * @param includeLoops - Optional boolean that specifies if loops should be returned.
            * Default is true.
            */
        getEdges(cell: mxCell, incoming?: boolean, outgoing?: boolean, includeLoops?: boolean): mxCell[];
        /**
            * Returns all edges between the given source and target pair. If directed
            * is true, then only edges from the source to the target are returned,
            * otherwise, all edges between the two cells are returned.
            *
            * @param source - <mxCell> that defines the source terminal of the edge to be
            * returned.
            * @param target - <mxCell> that defines the target terminal of the edge to be
            * returned.
            * @param directed - Optional boolean that specifies if the direction of the
            * edge should be taken into account. Default is false.
            */
        getEdgesBetween(source: mxCell, target: mxCell, directed?: boolean): mxCell[];
        /**
            * Returns all opposite vertices wrt terminal for the given edges, only
            * returning sources and/or targets as specified. The result is returned
            * as an array of <mxCells>.
            *
            * @param edges - Array of <mxCells> that contain the edges to be examined.
            * @param terminal - <mxCell> that specifies the known end of the edges.
            * @param sources - Boolean that specifies if source terminals should be contained
            * in the result. Default is true.
            * @param targets - Boolean that specifies if target terminals should be contained
            * in the result. Default is true.
            */
        getOpposites(edges: mxCell[], terminal: mxCell, sources?: boolean, targets?: boolean): mxCell[];
        /**
            * Returns the topmost cells of the hierarchy in an array that contains no
            * descendants for each <mxCell> that it contains. Duplicates should be
            * removed in the cells array to improve performance.
            *
            * @param cells - Array of <mxCells> whose topmost ancestors should be returned.
            */
        getTopmostCells(cells: mxCell[]): mxCell[];
        /**
            * Returns true if the given cell is a vertex.
            *
            * @param cell - <mxCell> that represents the possible vertex.
            */
        isVertex(cell: mxCell): boolean;
        /**
            * Returns true if the given cell is an edge.
            *
            * @param cell - <mxCell> that represents the possible edge.
            */
        isEdge(cell: mxCell): boolean;
        /**
            * Returns true if the given <mxCell> is connectable. If <edgesConnectable>
            * is false, then this function returns false for all edges else it returns
            * the return value of <mxCell.isConnectable>.
            *
            * @param cell - <mxCell> whose connectable state should be returned.
            */
        isConnectable(cell: mxCell): boolean;
        /**
            * Returns the user object of the given <mxCell> using <mxCell.getValue>.
            *
            * @param cell - <mxCell> whose user object should be returned.
            */
        getValue(cell: mxCell): Value;
        /**
            * Sets the user object of then given <mxCell> using <mxValueChange>
            * and adds the change to the current transaction.
            *
            * @param cell - <mxCell> whose user object should be changed.
            * @param value - Object that defines the new user object.
            */
        setValue(cell: mxCell, value: Object): Object;
        /**
            * Returns the <mxGeometry> of the given <mxCell>.
            *
            * @param cell - <mxCell> whose geometry should be returned.
            */
        getGeometry(cell: mxCell): mxGeometry;
        /**
            * Sets the <mxGeometry> of the given <mxCell>. The actual update
            * of the cell is carried out in <geometryForCellChanged>. The
            * <mxGeometryChange> action is used to encapsulate the change.
            *
            * @param cell - <mxCell> whose geometry should be changed.
            * @param geometry - <mxGeometry> that defines the new geometry.
            */
        setGeometry(cell: mxCell, geometry: mxGeometry): mxGeometry;
        /**
            * Returns the style of the given <mxCell>.
            *
            * @param cell - <mxCell> whose style should be returned.
            */
        getStyle(cell: mxCell): string;
        /**
            * Sets the style of the given <mxCell> using <mxStyleChange> and
            * adds the change to the current transaction.
            *
            * @param cell - <mxCell> whose style should be changed.
            * @param style - String of the form [stylename;|key=value;] to specify
            * the new cell style.
            */
        setStyle(cell: mxCell, style: string): string;
        /**
            * Inner callback to update the style of the given <mxCell>
            * using <mxCell.setStyle> and return the previous style.
            *
            * @param cell - <mxCell> that specifies the cell to be updated.
            * @param style - String of the form [stylename;|key=value;] to specify
            * the new cell style.
            */
        styleForCellChanged(cell: mxCell, style: string): string;
        /**
            * Returns true if the given <mxCell> is collapsed.
            *
            * @param cell - <mxCell> whose collapsed state should be returned.
            */
        isCollapsed(cell: mxCell): boolean;
        /**
            * Sets the collapsed state of the given <mxCell> using <mxCollapseChange>
            * and adds the change to the current transaction.
            *
            * @param cell - <mxCell> whose collapsed state should be changed.
            * @param collapsed - Boolean that specifies the new collpased state.
            */
        setCollapsed(cell: mxCell, collapsed: boolean): boolean;
        /**
            * Inner callback to update the collapsed state of the
            * given <mxCell> using <mxCell.setCollapsed> and return
            * the previous collapsed state.
            *
            * @param cell - <mxCell> that specifies the cell to be updated.
            * @param collapsed - Boolean that specifies the new collpased state.
            */
        collapsedStateForCellChanged(cell: mxCell, collapsed: boolean): boolean;
        /**
            * Returns true if the given <mxCell> is visible.
            *
            * @param cell - <mxCell> whose visible state should be returned.
            */
        isVisible(cell: mxCell): boolean;
        /**
            * Sets the visible state of the given <mxCell> using <mxVisibleChange> and
            * adds the change to the current transaction.
            *
            * @param cell - <mxCell> whose visible state should be changed.
            * @param visible - Boolean that specifies the new visible state.
            */
        setVisible(cell: mxCell, visible: boolean): boolean;
        /**
            * Inner callback to update the visible state of the
            * given <mxCell> using <mxCell.setCollapsed> and return
            * the previous visible state.
            *
            * @param cell - <mxCell> that specifies the cell to be updated.
            * @param visible - Boolean that specifies the new visible state.
            */
        visibleStateForCellChanged(cell: mxCell, visible: boolean): boolean;
        /**
            * Executes the given edit and fires events if required. The edit object
            * requires an execute function which is invoked. The edit is added to the
            * <currentEdit> between <beginUpdate> and <endUpdate> calls, so that
            * events will be fired if this execute is an individual transaction, that
            * is, if no previous <beginUpdate> calls have been made without calling
            * <endUpdate>. This implementation fires an <execute> event before
            * executing the given change.
            *
            * Parameters:
            *
            * change - Object that described the change.
            */
        execute(change: any): void;
        /**
            * Increments the <updateLevel> by one. The event notification
            * is queued until <updateLevel> reaches 0 by use of
            * <endUpdate>.
            *
            * All changes on <mxGraphModel> are transactional,
            * that is, they are executed in a single undoable change
            * on the model (without transaction isolation).
            * Therefore, if you want to combine any
            * number of changes into a single undoable change,
            * you should group any two or more API calls that
            * modify the graph model between <beginUpdate>
            * and <endUpdate> calls as shown here:
            *
            * (code)
            * var model = graph.getModel();
            * var parent = graph.getDefaultParent();
            * var index = model.getChildCount(parent);
            * model.beginUpdate();
            * try
            * {
            *   model.add(parent, v1, index);
            *   model.add(parent, v2, index+1);
            * }
            * finally
            * {
            *   model.endUpdate();
            * }
            * (end)
            *
            * Of course there is a shortcut for appending a
            * sequence of cells into the default parent:
            *
            * (code)
            * graph.addCells([v1, v2]).
            * (end)
            */
        beginUpdate(): void;
        /**
            * Decrements the <updateLevel> by one and fires an <undo>
            * event if the <updateLevel> reaches 0. This function
            * indirectly fires a <change> event by invoking the notify
            * function on the <currentEdit> und then creates a new
            * <currentEdit> using <createUndoableEdit>.
            *
            * The <undo> event is fired only once per edit, whereas
            * the <change> event is fired whenever the notify
            * function is invoked, that is, on undo and redo of
            * the edit.
            */
        endUpdate(): void;
        /**
            * Creates a new <mxUndoableEdit> that implements the
            * notify function to fire a <change> and <notify> event
            * through the <mxUndoableEdit>'s source.
            */
        createUndoableEdit(): mxUndoableEdit;
        /**
            * Merges the children of the given cell into the given target cell inside
            * this model. All cells are cloned unless there is a corresponding cell in
            * the model with the same id, in which case the source cell is ignored and
            * all edges are connected to the corresponding cell in this model. Edges
            * are considered to have no identity and are always cloned unless the
            * cloneAllEdges flag is set to false, in which case edges with the same
            * id in the target model are reconnected to reflect the terminals of the
            * source edges.
            */
        mergeChildren(from: any, to: any, cloneAllEdges: any): void;
        /**
            * Clones the children of the source cell into the given target cell in
            * this model and adds an entry to the mapping that maps from the source
            * cell to the target cell with the same id or the clone of the source cell
            * that was inserted into this model.
            */
        mergeChildrenImpl(from: any, to: any, cloneAllEdges: any, mapping: any): void;
        /**
            * Returns an array that represents the set (no duplicates) of all parents
            * for the given array of cells.
            *
            * Parameters:
            *
            * cells - Array of cells whose parents should be returned.
            */
        getParents(cells: any): any[];
        /**
            * Returns a deep clone of the given <mxCell> (including
            * the children) which is created using <cloneCells>.
            *
            * Parameters:
            *
            * cell - <mxCell> to be cloned.
            */
        cloneCell(cell: any): any;
        /**
            * Returns an array of clones for the given array of <mxCells>.
            * Depending on the value of includeChildren, a deep clone is created for
            * each cell. Connections are restored based if the corresponding
            * cell is contained in the passed in array.
            *
            * Parameters:
            *
            * cells - Array of <mxCell> to be cloned.
            * includeChildren - Boolean indicating if the cells should be cloned
            * with all descendants.
            * mapping - Optional mapping for existing clones.
            */
        cloneCells(cells: mxCell[], includeChildren: boolean, mapping?: any): any[];
        /**
            * Inner helper method for cloning cells recursively.
            */
        cloneCellImpl(cell: any, mapping: any, includeChildren: any): any;
        /**
            * Hook for cloning the cell. This returns cell.clone() or
            * any possible exceptions.
            */
        cellCloned(cell: any): any;
        /**
            * Inner helper method for restoring the connections in
            * a network of cloned cells.
            */
        restoreClone(clone: any, cell: any, mapping: any): void;
    }
    /**
        * Action to change the root in a model.
        *
        * Constructor: mxRootChange
        *
        * Constructs a change of the root in the
        * specified model.
        */
    export class mxRootChange {
        model: mxGraphModel;
        root: any;
        previous: mxCell;
        constructor(model: any, root: any);
        /**
            * Carries out a change of the root using
            * <mxGraphModel.rootChanged>.
            */
        execute(): void;
    }
    /**
        * Action to add or remove a child in a model.
        *
        * Constructor: mxChildChange
        *
        * Constructs a change of a child in the
        * specified model.
        */
    export class mxChildChange {
        parent: any;
        previous: any;
        child: mxCell;
        index: any;
        previousIndex: any;
        constructor(model: any, parent: any, child: mxCell, index?: number);
        /**
            * Changes the parent of <child> using
            * <mxGraphModel.parentForCellChanged> and
            * removes or restores the cell's
            * connections.
            */
        execute(): void;
        /**
            * Disconnects the given cell recursively from its
            * terminals and stores the previous terminal in the
            * cell's terminals.
            */
        connect(cell: any, isConnect: any): void;
    }
    /**
        * Action to change a terminal in a model.
        *
        * Constructor: mxTerminalChange
        *
        * Constructs a change of a terminal in the
        * specified model.
        */
    export class mxTerminalChange {
        model: any;
        cell: mxCell;
        terminal: any;
        previous: mxCell;
        source: any;
        constructor(model: any, cell: any, terminal: any, source: any);
        /**
            * Changes the terminal of <cell> to <previous> using
            * <mxGraphModel.terminalForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change a user object in a model.
        *
        * Constructor: mxValueChange
        *
        * Constructs a change of a user object in the
        * specified model.
        */
    export class mxValueChange {
        model: any;
        cell: any;
        value: any;
        previous: any;
        constructor(model: any, cell: any, value: any);
        /**
            * Changes the value of <cell> to <previous> using
            * <mxGraphModel.valueForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change a cell's style in a model.
        *
        * Constructor: mxStyleChange
        *
        * Constructs a change of a style in the
        * specified model.
        */
    export class mxStyleChange {
        model: any;
        cell: any;
        style: any;
        previous: any;
        constructor(model: any, cell: any, style: any);
        /**
            * Changes the style of <cell> to <previous> using
            * <mxGraphModel.styleForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change a cell's geometry in a model.
        *
        * Constructor: mxGeometryChange
        *
        * Constructs a change of a geometry in the
        * specified model.
        */
    export class mxGeometryChange {
        model: any;
        cell: any;
        geometry: any;
        previous: any;
        constructor(model: any, cell: any, geometry: any);
        /**
            * Changes the geometry of <cell> ro <previous> using
            * <mxGraphModel.geometryForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change a cell's collapsed state in a model.
        *
        * Constructor: mxCollapseChange
        *
        * Constructs a change of a collapsed state in the
        * specified model.
        */
    export class mxCollapseChange {
        model: any;
        cell: any;
        collapsed: any;
        previous: any;
        constructor(model: any, cell: any, collapsed: any);
        /**
            * Changes the collapsed state of <cell> to <previous> using
            * <mxGraphModel.collapsedStateForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change a cell's visible state in a model.
        *
        * Constructor: mxVisibleChange
        *
        * Constructs a change of a visible state in the
        * specified model.
        */
    export class mxVisibleChange {
        model: any;
        cell: any;
        visible: any;
        previous: any;
        constructor(model: any, cell: any, visible: any);
        /**
            * Changes the visible state of <cell> to <previous> using
            * <mxGraphModel.visibleStateForCellChanged>.
            */
        execute(): void;
    }
    /**
        * Action to change the attribute of a cell's user object.
        * There is no method on the graph model that uses this
        * action. To use the action, you can use the code shown
        * in the example below.
        *
        * Example:
        *
        * To change the attributeName in the cell's user object
        * to attributeValue, use the following code:
        *
        * (code)
        * model.beginUpdate();
        * try
        * {
        *   var edit = new mxCellAttributeChange(
        *     cell, attributeName, attributeValue);
        *   model.execute(edit);
        * }
        * finally
        * {
        *   model.endUpdate();
        * }
        * (end)
        *
        * Constructor: mxCellAttributeChange
        *
        * Constructs a change of a attribute of the DOM node
        * stored as the value of the given <mxCell>.
        */
    export class mxCellAttributeChange {
        cell: any;
        attribute: any;
        value: any;
        previous: any;
        constructor(cell: any, attribute: any, value: any);
        /**
            * Changes the attribute of the cell's user object by
            * using <mxCell.setAttribute>.
            */
        execute(): void;
    }

    type Value = any;

    /**
        * Cells are the elements of the graph model. They represent the state
        * of the groups, vertices and edges in a graph.
        *
        * Custom attributes:
        *
        * For custom attributes we recommend using an XML node as the value of a cell.
        * The following code can be used to create a cell with an XML node as the
        * value:
        *
        * (code)
        * var doc = mxUtils.createXmlDocument();
        * var node = doc.createElement('MyNode')
        * node.setAttribute('label', 'MyLabel');
        * node.setAttribute('attribute1', 'value1');
        * graph.insertVertex(graph.getDefaultParent(), null, node, 40, 40, 80, 30);
        * (end)
        *
        * For the label to work, <mxGraph.convertValueToString> and
        * <mxGraph.cellLabelChanged> should be overridden as follows:
        *
        * (code)
        * graph.convertValueToString = function(cell)
        * {
        *   if (mxUtils.isNode(cell.value))
        *   {
        *     return cell.getAttribute('label', '')
        *   }
        * };
        *
        * va    invalidating: any;    invalidating: any;    [x: string]: any;
     
     
    r cellLabelChanged = graph.cellLabelChanged;
        * graph.cellLabelChanged = function(cell, newValue, autoSize)
        * {
        *   if (mxUtils.isNode(cell.value))
        *   {
        *     // Clones the value for correct undo/redo
        *     var elt = cell.value.cloneNode(true);
        *     elt.setAttribute('label', newValue);
        *     newValue = elt;
        *   }
        *
        *   cellLabelChanged.apply(this, arguments);
        * };
        * (end)
        */
    export class mxCell {
        /**
            * Holds the Id. Default is null.
            */
        id: string;
        /**
            * Holds the user object. Default is null.
            */
        value: Value;
        /**
            * Holds the <mxGeometry>. Default is null.
            */
        geometry: mxGeometry;
        /**
            * Holds the style as a string of the form [(stylename|key=value);]. Default is
            * null.
            */
        style: string;
        /**
            * Specifies whether the cell is a vertex. Default is false.
            */
        vertex: boolean;
        /**
            * Specifies whether the cell is an edge. Default is false.
            */
        edge: boolean;
        /**
            * Specifies whether the cell is connectable. Default is true.
            */
        connectable: boolean;
        /**
            * Specifies whether the cell is visible. Default is true.
            */
        visible: boolean;
        /**
            * Specifies whether the cell is collapsed. Default is false.
            */
        collapsed: boolean;
        /**
            * Reference to the parent cell.
            */
        parent: mxCell;
        /**
            * Reference to the source terminal.
            */
        source: mxCell;
        /**
            * Reference to the target terminal.
            */
        target: mxCell;
        /**
            * Holds the child cells.
            */
        children: mxCell[];
        /**
            * Holds the edges.
            */
        edges: mxCell[];
        /**
            * List of members that should not be cloned inside <clone>. This field is
            * passed to <mxUtils.clone> and is not made persistent in <mxCellCodec>.
            * This is not a convention for all classes, it is only used in this class
            * to mark transient fields since transient modifiers are not supported by
            * the language.
            */
        mxTransient: string[];
        /**
            * Implicit variable declarations
            */
        overlays: mxCellOverlay[];
        /**
            * Constructs a new cell to be used in a graph model.
            * This method invokes <onInit> upon completion.
            *
            * @param value - Optional object that represents the cell value.
            * @param geometry - Optional <mxGeometry> that specifies the geometry.
            * @param style - Optional formatted string that defines the style.
            */
        constructor(value?: any, geometry?: mxGeometry, style?: string);
        /**
            * Returns the Id of the cell as a string.
            */
        getId(): string;
        /**
            * Sets the Id of the cell to the given string.
            */
        setId(id: string): void;
        /**
            * Returns the user object of the cell. The user
            * object is stored in <value>.
            */
        getValue(): Value;
        /**
            * Sets the user object of the cell. The user object
            * is stored in <value>.
            */
        setValue(value: Value): void;
        /**
            * Changes the user object after an in-place edit
            * and returns the previous value. This implementation
            * replaces the user object with the given value and
            * returns the old user object.
            */
        valueChanged(newValue: any): Value;
        /**
            * Returns the <mxGeometry> that describes the <geometry>.
            */
        getGeometry(): mxGeometry;
        /**
            * Sets the <mxGeometry> to be used as the <geometry>.
            */
        setGeometry(geometry: mxGeometry): void;
        /**
            * Returns a string that describes the <style>.
            */
        getStyle(): string;
        /**
            * Sets the string to be used as the <style>.
            */
        setStyle(style: string): void;
        /**
            * Returns true if the cell is a vertex.
            */
        isVertex(): boolean;
        /**
            * Specifies if the cell is a vertex. This should only be assigned at
            * construction of the cell and not be changed during its lifecycle.
            *
            * @param vertex - Boolean that specifies if the cell is a vertex.
            */
        setVertex(vertex: boolean): void;
        /**
            * Returns true if the cell is an edge.
            */
        isEdge(): boolean;
        /**
            * Specifies if the cell is an edge. This should only be assigned at
            * construction of the cell and not be changed during its lifecycle.
            *
            * @param edge - Boolean that specifies if the cell is an edge.
            */
        setEdge(edge: boolean): void;
        /**
            * Returns true if the cell is connectable.
            */
        isConnectable(): boolean;
        /**
            * Sets the connectable state.
            *
            * @param connectable - Boolean that specifies the new connectable state.
            */
        setConnectable(connectable: boolean): void;
        /**
            * Returns true if the cell is visibile.
            */
        isVisible(): boolean;
        /**
            * Specifies if the cell is visible.
            *
            * @param visible - Boolean that specifies the new visible state.
            */
        setVisible(visible: boolean): void;
        /**
            * Returns true if the cell is collapsed.
            */
        isCollapsed(): boolean;
        /**
            * Sets the collapsed state.
            *
            * @param collapsed - Boolean that specifies the new collapsed state.
            */
        setCollapsed(collapsed: boolean): void;
        /**
            * Returns the cell's parent.
            */
        getParent(): mxCell;
        /**
            * Sets the parent cell.
            *
            * @param parent - <mxCell> that represents the new parent.
            */
        setParent(parent: mxCell): void;
        /**
            * Returns the source or target terminal.
            *
            * @param source - Boolean that specifies if the source terminal should be
            * returned. (true:source, false:target)
            */
        getTerminal(source: boolean): mxCell;
        /**
            * Sets the source or target terminal and returns the new terminal.
            *
            * @param terminal - <mxCell> that represents the new source or target terminal.
            * @param isSource - Boolean that specifies if the source or target terminal
            * should be set.
            */
        setTerminal(terminal: mxCell, isSource: boolean): mxCell;
        /**
            * Returns the number of child cells.
            */
        getChildCount(): number;
        /**
            * Returns the index of the specified child in the child array.
            *
            * @param child - Child whose index should be returned.
            */
        getIndex(child: mxCell): any;
        /**
            * Returns the child at the specified index.
            *
            * @param index - Integer that specifies the child to be returned.
            */
        getChildAt(index: number): mxCell;
        /**
            * Inserts the specified child into the child array at the specified index
            * and updates the parent reference of the child. If not childIndex is
            * specified then the child is appended to the child array. Returns the
            * inserted child.
            *
            * @param child - <mxCell> to be inserted or appended to the child array.
            * @param index - Optional integer that specifies the index at which the child
            * should be inserted into the child array.
            */
        insert(child: mxCell, index?: number): mxCell;
        /**
            * Removes the child at the specified index from the child array and
            * returns the child that was removed. Will remove the parent reference of
            * the child.
            *
            * @param index - Integer that specifies the index of the child to be
            * removed.
            */
        remove(index: number): any;
        /**
            * Removes the cell from its parent.
            */
        removeFromParent(): void;
        /**
            * Returns the number of edges in the edge array.
            */
        getEdgeCount(): number;
        /**
            * Returns the index of the specified edge in <edges>.
            *
            * @param edge - <mxCell> whose index in <edges> should be returned.
            */
        getEdgeIndex(edge: mxCell): any;
        /**
            * Returns the edge at the specified index in <edges>.
            *
            * @param index - Integer that specifies the index of the edge to be returned.
            */
        getEdgeAt(index: number): mxCell;
        /**
            * Inserts the specified edge into the edge array and returns the edge.
            * Will update the respective terminal reference of the edge.
            *
            * @param edge - <mxCell> to be inserted into the edge array.
            * @param isOutgoing - Boolean that specifies if the edge is outgoing.
            */
        insertEdge(edge: mxCell, isOutgoing: boolean): mxCell;
        /**
            * Removes the specified edge from the edge array and returns the edge.
            * Will remove the respective terminal reference from the edge.
            *
            * @param edge - <mxCell> to be removed from the edge array.
            * @param isOutgoing - Boolean that specifies if the edge is outgoing.
            */
        removeEdge(edge: mxCell, isOutgoing: boolean): mxCell;
        /**
            * Removes the edge from its source or target terminal.
            *
            * @param isSource - Boolean that specifies if the edge should be removed from its
            * source or target terminal.
            */
        removeFromTerminal(isSource: boolean): void;
        /**
            * Returns true if the user object is an XML node that contains the given
            * attribute.
            *
            * @param name - Name of the attribute.
            */
        hasAttribute(name: string): any;
        /**
            * Returns the specified attribute from the user object if it is an XML
            * node.
            *
            * @param name - Name of the attribute whose value should be returned.
            * @param defaultValue - Optional default value to use if the attribute has no
            * value.
            */
        getAttribute(name: string, defaultValue?: string): any;
        /**
            * Sets the specified attribute on the user object if it is an XML node.
            *
            * @param name - Name of the attribute whose value should be set.
            * @param value - New value of the attribute.
            */
        setAttribute(name: string, value: string): void;
        /**
            * Returns a clone of the cell. Uses <cloneValue> to clone
            * the user object. All fields in <mxTransient> are ignored
            * during the cloning.
            */
        clone(): any;
        /**
            * Returns a clone of the cell's user object.
            */
        cloneValue(): any;
    }

    /**
        * Extends <mxRectangle> to represent the geometry of a cell.
        *
        * For vertices, the geometry consists of the x- and y-location, and the width
        * and height. For edges, the geometry consists of the optional terminal- and
        * control points. The terminal points are only required if an edge is
        * unconnected, and are stored in the sourcePoint> and <targetPoint>
        * variables, respectively.
        *
        * Example:
        *
        * If an edge is unconnected, that is, it has no source or target terminal,
        * then a geometry with terminal points for a new edge can be defined as
        * follows.
        *
        * (code)
        * geometry.setTerminalPoint(new mxPoint(x1, y1), true);
        * geometry.points = [new mxPoint(x2, y2)];
        * geometry.setTerminalPoint(new mxPoint(x3, y3), false);
        * (end)
        *
        * Control points are used regardless of the connected state of an edge and may
        * be ignored or interpreted differently depending on the edge's <mxEdgeStyle>.
        *
        * To disable automatic reset of control points after a cell has been moved or
        * resized, the the <mxGraph.resizeEdgesOnMove> and
        * <mxGraph.resetEdgesOnResize> may be used.
        *
        * Edge Labels:
        *
        * Using the x- and y-coordinates of a cell's geometry, it is possible to
        * position the label on edges on a specific location on the actual edge shape
        * as it appears on the screen. The x-coordinate of an edge's geometry is used
        * to describe the distance from the center of the edge from -1 to 1 with 0
        * being the center of the edge and the default value. The y-coordinate of an
        * edge's geometry is used to describe the absolute, orthogonal distance in
        * pixels from that point. In addition, the <mxGeometry.offset> is used as an
        * absolute offset vector from the resulting point.
        *
        * This coordinate system is applied if <relative> is true, otherwise the
        * offset defines the absolute vector from the edge's center point to the
        * label and the values for <x> and <y> are ignored.
        *
        * The width and height parameter for edge geometries can be used to set the
        * label width and height (eg. for word wrapping).
        *
        * Ports:
        *
        * The term "port" refers to a relatively positioned, connectable child cell,
        * which is used to specify the connection between the parent and another cell
        * in the graph. Ports are typically modeled as vertices with relative
        * geometries.
        *
        * Offsets:
        *
        * The <offset> field is interpreted in 3 different ways, depending on the cell
        * and the geometry. For edges, the offset defines the absolute offset for the
        * edge label. For relative geometries, the offset defines the absolute offset
        * for the origin (top, left corner) of the vertex, otherwise the offset
        * defines the absolute offset for the label inside the vertex or group.
        */
    export class mxGeometry extends mxRectangle {
        /**
            * Global switch to translate the points in translate. Default is true.
            */
        TRANSLATE_CONTROL_POINTS: boolean;
        /**
            * Stores alternate values for x, y, width and height in a rectangle. See
            * <swap> to exchange the values. Default is null.
            */
        alternateBounds: any;
        /**
            * Defines the source <mxPoint> of the edge. This is used if the
            * corresponding edge does not have a source vertex. Otherwise it is
            * ignored. Default is  null.
            */
        sourcePoint: any;
        /**
            * Defines the target <mxPoint> of the edge. This is used if the
            * corresponding edge does not have a target vertex. Otherwise it is
            * ignored. Default is null.
            */
        targetPoint: any;
        /**
            * Array of <mxPoints> which specifies the control points along the edge.
            * These points are the intermediate points on the edge, for the endpoints
            * use <targetPoint> and <sourcePoint> or set the terminals of the edge to
            * a non-null value. Default is null.
            */
        points: any;
        /**
            * For edges, this holds the offset (in pixels) from the position defined
            * by <x> and <y> on the edge. For relative geometries (for vertices), this
            * defines the absolute offset from the point defined by the relative
            * coordinates. For absolute geometries (for vertices), this defines the
            * offset for the label. Default is null.
            */
        offset: any;
        /**
            * Specifies if the coordinates in the geometry are to be interpreted as
            * relative coordinates. For edges, this is used to define the location of
            * the edge label relative to the edge as rendered on the display. For
            * vertices, this specifies the relative location inside the bounds of the
            * parent cell.
            *
            * If this is false, then the coordinates are relative to the origin of the
            * parent cell or, for edges, the edge label position is relative to the
            * center of the edge as rendered on screen.
            *
            * Default is false.
            */
        relative: boolean;
        /**
            * Constructs a new object to describe the size and location of a vertex or
            * the control points of an edge.
            * @param x
            * @param y
            * @param width
            * @param height
            */
        constructor(x?: number, y?: number, width?: number, height?: number);
        /**
            * Swaps the x, y, width and height with the values stored in
            * <alternateBounds> and puts the previous values into <alternateBounds> as
            * a rectangle. This operation is carried-out in-place, that is, using the
            * existing geometry instance. If this operation is called during a graph
            * model transactional change, then the geometry should be cloned before
            * calling this method and setting the geometry of the cell using
            * <mxGraphModel.setGeometry>.
            */
        swap(): void;
        /**
            * Returns the <mxPoint> representing the source or target point of this
            * edge. This is only used if the edge has no source or target vertex.
            *
            * Parameters:
            *
            * isSource - Boolean that specifies if the source or target point
            * should be returned.
            */
        getTerminalPoint(isSource: any): any;
        /**
            * Sets the <sourcePoint> or <targetPoint> to the given <mxPoint> and
            * returns the new point.
            *
            * Parameters:
            *
            * point - Point to be used as the new source or target point.
            * isSource - Boolean that specifies if the source or target point
            * should be set.
            */
        setTerminalPoint(point: any, isSource: any): any;
        /**
            * Rotates the geometry by the given angle around the given center. That is,
            * <x> and <y> of the geometry, the <sourcePoint>, <targetPoint> and all
            * <points> are translated by the given amount. <x> and <y> are only
            * translated if <relative> is false.
            *
            * Parameters:
            *
            * angle - Number that specifies the rotation angle in degrees.
            * cx - <mxPoint> that specifies the center of the rotation.
            */
        rotate(angle: any, cx: any): void;
        /**
            * Translates the geometry by the specified amount. That is, <x> and <y> of the
            * geometry, the <sourcePoint>, <targetPoint> and all <points> are translated
            * by the given amount. <x> and <y> are only translated if <relative> is false.
            * If <TRANSLATE_CONTROL_POINTS> is false, then <points> are not modified by
            * this function.
            *
            * Parameters:
            *
            * dx - Number that specifies the x-coordinate of the translation.
            * dy - Number that specifies the y-coordinate of the translation.
            */
        translate(dx: any, dy: any): void;
        /**
            * Scales the geometry by the given amount. That is, <x> and <y> of the
            * geometry, the <sourcePoint>, <targetPoint> and all <points> are scaled
            * by the given amount. <x>, <y>, <width> and <height> are only scaled if
            * <relative> is false. If <fixedAspect> is true, then the smaller value
            * is used to scale the width and the height.
            *
            * Parameters:
            *
            * sx - Number that specifies the horizontal scale factor.
            * sy - Number that specifies the vertical scale factor.
            * fixedAspect - Optional boolean to keep the aspect ratio fixed.
            */
        scale(sx: any, sy: any, fixedAspect: any): void;
        /**
            * Returns true if the given object equals this geometry.
            */
        equals(obj: any): any;
    }


    export var mxCellPath: {
        PATH_SEPARATOR: string;
        create(cell: any): string;
        getParentPath(path: any): any;
        resolve(root: any, path: any): any;
        compare(p1: any, p2: any): number;
    };


    export var mxPerimeter: {
        RectanglePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
        EllipsePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
        RhombusPerimeter(bounds: any, vertex: any, next: any, orthogonal: any): any;
        TrianglePerimeter(bounds: any, vertex: any, next: any, orthogonal: any): any;
        HexagonPerimeter(bounds: any, vertex: any, next: any, orthogonal: any): mxPoint;
    };

    /**
        * Implements printing of a diagram across multiple pages. The following opens
        * a print preview for an existing graph:
        *
        * (code)
        * var preview = new mxPrintPreview(graph);
        * preview.open();
        * (end)
        *
        * Use <mxUtils.getScaleForPageCount> as follows in order to print the graph
        * across a given number of pages:
        *
        * (code)
        * var pageCount = mxUtils.prompt('Enter page count', '1');
        *
        * if (pageCount != null)
        * {
        *   var scale = mxUtils.getScaleForPageCount(pageCount, graph);
        *   var preview = new mxPrintPreview(graph, scale);
        *   preview.open();
        * }
        * (end)
        *
        * Additional pages:
        *
        * To add additional pages before and after the output, <getCoverPages> and
        * <getAppendices> can be used, respectively.
        *
        * (code)
        * var preview = new mxPrintPreview(graph, 1);
        *
        * preview.getCoverPages = function(w, h)
        * {
        *   return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
        *   {
        *     div.innerHTML = '<div style="position:relative;margin:4px;">Cover Page</p>'
        *   }))];
        * };
        *
        * preview.getAppendices = function(w, h)
        * {
        *   return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
        *   {
        *     div.innerHTML = '<div style="position:relative;margin:4px;">Appendix</p>'
        *   }))];
        * };
        *
        * preview.open();
        * (end)
        *
        * CSS:
        *
        * The CSS from the original page is not carried over to the print preview.
        * To add CSS to the page, use the css argument in the <open> function or
        * override <writeHead> to add the respective link tags as follows:
        *
        * (code)
        * var writeHead = preview.writeHead;
        * preview.writeHead = function(doc, css)
        * {
        *   writeHead.apply(this, arguments);
        *   doc.writeln('<link rel="stylesheet" type="text/css" href="style.css">');
        * };
        * (end)
        *
        * Padding:
        *
        * To add a padding to the page in the preview (but not the print output), use
        * the following code:
        *
        * (code)
        * preview.writeHead = function(doc)
        * {
        *   writeHead.apply(this, arguments);
        *
        *   doc.writeln('<style type="text/css">');
        *   doc.writeln('@media screen {');
        *   doc.writeln('  body > div { padding-top:30px;padding-left:40px;box-sizing:content-box; }');
        *   doc.writeln('}');
        *   doc.writeln('</style>');
        * };
        * (end)
        *
        * Headers:
        *
        * Apart from setting the title argument in the mxPrintPreview constructor you
        * can override <renderPage> as follows to add a header to any page:
        *
        * (code)
        * var oldRenderPage = mxPrintPreview.prototype.renderPage;
        * mxPrintPreview.prototype.renderPage = function(w, h, x, y, content, pageNumber)
        * {
        *   var div = oldRenderPage.apply(this, arguments);
        *
        *   var header = document.createElement('div');
        *   header.style.position = 'absolute';
        *   header.style.top = '0px';
        *   header.style.width = '100%';
        *   header.style.textAlign = 'right';
        *   mxUtils.write(header, 'Your header here');
        *   div.firstChild.appendChild(header);
        *
        *   return div;
        * };
        * (end)
        *
        * The pageNumber argument contains the number of the current page, starting at
        * 1. To display a header on the first page only, check pageNumber and add a
        * vertical offset in the constructor call for the height of the header.
        *
        * Page Format:
        *
        * For landscape printing, use <mxConstants.PAGE_FORMAT_A4_LANDSCAPE> as
        * the pageFormat in <mxUtils.getScaleForPageCount> and <mxPrintPreview>.
        * Keep in mind that one can not set the defaults for the print dialog
        * of the operating system from JavaScript so the user must manually choose
        * a page format that matches this setting.
        *
        * You can try passing the following CSS directive to <open> to set the
        * page format in the print dialog to landscape. However, this CSS
        * directive seems to be ignored in most major browsers, including IE.
        *
        * (code)
        * @page {
        *   size: landscape;
        * }
        * (end)
        *
        * Note that the print preview behaves differently in IE when used from the
        * filesystem or via HTTP so printing should always be tested via HTTP.
        *
        * If you are using a DOCTYPE in the source page you can override <getDoctype>
        * and provide the same DOCTYPE for the print preview if required. Here is
        * an example for IE8 standards mode.
        *
        * (code)
        * var preview = new mxPrintPreview(graph);
        * preview.getDoctype = function()
        * {
        *   return '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=8" ><![endif]-->';
        * };
        * preview.open();
        * (end)
        *
        * Constructor: mxPrintPreview
        *
        * Constructs a new print preview for the given parameters.
        *
        * Parameters:
        *
        * graph - <mxGraph> to be previewed.
        * scale - Optional scale of the output. Default is 1 / <mxGraph.pageScale>.
        * border - Border in pixels along each side of every page. Note that the
        * actual print function in the browser will add another border for
        * printing.
        * pageFormat - <mxRectangle> that specifies the page format (in pixels).
        * This should match the page format of the printer. Default uses the
        * <mxGraph.pageFormat> of the given graph.
        * x0 - Optional left offset of the output. Default is 0.
        * y0 - Optional top offset of the output. Default is 0.
        * borderColor - Optional color of the page border. Default is no border.
        * Note that a border is sometimes useful to highlight the printed page
        * border in the print preview of the browser.
        * title - Optional string that is used for the window title. Default
        * is 'Printer-friendly version'.
        * pageSelector - Optional boolean that specifies if the page selector
        * should appear in the window with the print preview. Default is true.
        */
    export class mxPrintPreview {
        constructor(graph: any, scale: any, pageFormat: any, border: any, x0: any, y0: any, borderColor: any, title: any, pageSelector: any);
        /**
            * Returns <wnd>.
            */
        getWindow(): any;
        /**
            * Returns the string that should go before the HTML tag in the print preview
            * page. This implementation returns an X-UA meta tag for IE5 in quirks mode,
            * IE8 in IE8 standards mode and edge in IE9 standards mode.
            */
        getDoctype(): string;
        /**
            * Adds the given graph to the existing print preview.
            *
            * Parameters:
            *
            * css - Optional CSS string to be used in the head section.
            * targetWindow - Optional window that should be used for rendering. If
            * this is specified then no HEAD tag, CSS and BODY tag will be written.
            */
        appendGraph(graph: any, scale: any, x0: any, y0: any, forcePageBreaks: any, keepOpen: any): void;
        /**
            * Shows the print preview window. The window is created here if it does
            * not exist.
            *
            * Parameters:
            *
            * css - Optional CSS string to be used in the head section.
            * targetWindow - Optional window that should be used for rendering. If
            * this is specified then no HEAD tag, CSS and BODY tag will be written.
            */
        open(css: any, targetWindow: any, forcePageBreaks: any, keepOpen: any): any;
        /**
            * Adds a page break to the given document.
            */
        addPageBreak(doc: any): void;
        /**
            * Writes the closing tags for body and page after calling <writePostfix>.
            */
        closeDocument(): void;
        /**
            * Writes the HEAD section into the given document, without the opening
            * and closing HEAD tags.
            */
        writeHead(doc: any, css: any): void;
        /**
            * Called before closing the body of the page. This implementation is empty.
            */
        writePostfix(doc: any): void;
        /**
            * Creates the page selector table.
            */
        createPageSelector(vpages: any, hpages: any): any;
        /**
            * Creates a DIV that prints a single page of the given
            * graph using the given scale and returns the DIV that
            * represents the page.
            *
            * Parameters:
            *
            * w - Width of the page in pixels.
            * h - Height of the page in pixels.
            * dx - Optional horizontal page offset in pixels (used internally).
            * dy - Optional vertical page offset in pixels (used internally).
            * content - Callback that adds the HTML content to the inner div of a page.
            * Takes the inner div as the argument.
            * pageNumber - Integer representing the page number.
            */
        renderPage(w: any, h: any, dx: any, dy: any, content: any, pageNumber: any): HTMLDivElement;
        /**
            * Returns the root cell for painting the graph.
            */
        getRoot(): any;
        /**
            * Adds a graph fragment to the given div.
            *
            * Parameters:
            *
            * dx - Horizontal translation for the diagram.
            * dy - Vertical translation for the diagram.
            * scale - Scale for the diagram.
            * pageNumber - Number of the page to be rendered.
            * div - Div that contains the output.
            * clip - Contains the clipping rectangle as an <mxRectangle>.
            */
        addGraphFragment(dx: any, dy: any, scale: any, pageNumber: any, div: any, clip: any): void;
        /**
            * Returns the link for the given cell state. This returns null.
            */
        getLinkForCellState(state: any): any;
        /**
            * Inserts the background image into the given div.
            */
        insertBackgroundImage(div: any, dx: any, dy: any): void;
        /**
            * Returns the pages to be added before the print output. This returns null.
            */
        getCoverPages(): any;
        /**
            * Returns the pages to be added after the print output. This returns null.
            */
        getAppendices(): any;
        /**
            * Opens the print preview and shows the print dialog.
            *
            * Parameters:
            *
            * css - Optional CSS string to be used in the head section.
            */
        print(css: any): void;
        /**
            * Closes the print preview window.
            */
        close(): void;
    }

    /**
        * Defines the appearance of the cells in a graph. See <putCellStyle> for an
        * example of creating a new cell style. It is recommended to use objects, not
        * arrays for holding cell styles. Existing styles can be cloned using
        * <mxUtils.clone> and turned into a string for debugging using
        * <mxUtils.toString>.
        *
        * Default Styles:
        *
        * The stylesheet contains two built-in styles, which are used if no style is
        * defined for a cell:
        *
        *   defaultVertex - Default style for vertices
        *   defaultEdge - Default style for edges
        *
        * Example:
        *
        * (code)
        * var vertexStyle = stylesheet.getDefaultVertexStyle();
        * vertexStyle[mxConstants.ROUNDED] = true;
        * var edgeStyle = stylesheet.getDefaultEdgeStyle();
        * edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
        * (end)
        *
        * Modifies the built-in default styles.
        *
        * To avoid the default style for a cell, add a leading semicolon
        * to the style definition, eg.
        *
        * (code)
        * ;shadow=1
        * (end)
        *
        * Removing keys:
        *
        * For removing a key in a cell style of the form [stylename;|key=value;] the
        * special value none can be used, eg. highlight;fillColor=none
        *
        * See also the helper methods in mxUtils to modify strings of this format,
        * namely <mxUtils.setStyle>, <mxUtils.indexOfStylename>,
        * <mxUtils.addStylename>, <mxUtils.removeStylename>,
        * <mxUtils.removeAllStylenames> and <mxUtils.setStyleFlag>.
        *
        * Constructor: mxStylesheet
        *
        * Constructs a new stylesheet and assigns default styles.
        */
    export class mxStylesheet {
        constructor();
        /**
            * Creates and returns the default vertex style.
            */
        createDefaultVertexStyle(): Object;
        /**
            * Creates and returns the default edge style.
            */
        createDefaultEdgeStyle(): Object;
        /**
            * Sets the default style for vertices using defaultVertex as the
            * stylename.
            *
            * Parameters:
            * style - Key, value pairs that define the style.
            */
        putDefaultVertexStyle(style: any): void;
        /**
            * Sets the default style for edges using defaultEdge as the stylename.
            */
        putDefaultEdgeStyle(style: any): void;
        /**
            * Returns the default style for vertices.
            */
        getDefaultVertexStyle(): any;
        /**
            * Sets the default style for edges.
            */
        getDefaultEdgeStyle(): any;
        /**
            * Stores the given map of key, value pairs under the given name in
            * <styles>.
            *
            * Example:
            *
            * The following example adds a new style called 'rounded' into an
            * existing stylesheet:
            *
            * (code)
            * var style = new Object();
            * style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
            * style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            * style[mxConstants.STYLE_ROUNDED] = true;
            * graph.getStylesheet().putCellStyle('rounded', style);
            * (end)
            *
            * In the above example, the new style is an object. The possible keys of
            * the object are all the constants in <mxConstants> that start with STYLE
            * and the values are either JavaScript objects, such as
            * <mxPerimeter.RightAngleRectanglePerimeter> (which is in fact a function)
            * or expressions, such as true. Note that not all keys will be
            * interpreted by all shapes (eg. the line shape ignores the fill color).
            * The final call to this method associates the style with a name in the
            * stylesheet. The style is used in a cell with the following code:
            *
            * (code)
            * model.setStyle(cell, 'rounded');
            * (end)
            *
            * Parameters:
            *
            * name - Name for the style to be stored.
            * style - Key, value pairs that define the style.
            */
        putCellStyle(name: any, style: any): void;
        /**
            * Returns the cell style for the specified stylename or the given
            * defaultStyle if no style can be found for the given stylename.
            *
            * Parameters:
            *
            * name - String of the form [(stylename|key=value);] that represents the
            * style.
            * defaultStyle - Default style to be returned if no style can be found.
            */
        getCellStyle(name: any, defaultStyle: any): any;
    }

    /**
        * Represents the current state of a cell in a given <mxGraphView>.
        *
        * For edges, the edge label position is stored in <absoluteOffset>.
        *
        * The size for oversize labels can be retrieved using the boundingBox property
        * of the <text> field as shown below.
        *
        * @example
        * var bbox = (state.text != null) ? state.text.boundingBox : null;
        */
    export class mxCellState extends mxRectangle {
        /**
            * Reference to the enclosing <mxGraphView>.
            */
        view: mxGraphView;
        /**
            * Reference to the <mxCell> that is represented by this state.
            */
        cell: mxCell;
        /**
            * Contains an array of key, value pairs that represent the style of the
            * cell.
            */
        style: any;
        /**
            * Specifies if the state is invalid. Default is true.
            */
        invalid: boolean;
        /**
            * <mxPoint> that holds the origin for all child cells. Default is a new
            * empty <mxPoint>.
            */
        origin: mxPoint;
        /**
            * Holds an array of <mxPoints> that represent the absolute points of an
            * edge.
            */
        absolutePoints: mxPoint[];
        /**
            * <mxPoint> that holds the absolute offset. For edges, this is the
            * absolute coordinates of the label position. For vertices, this is the
            * offset of the label relative to the top, left corner of the vertex.
            */
        absoluteOffset: mxPoint;
        /**
            * Caches the visible source terminal state.
            */
        visibleSourceState: any;
        /**
            * Caches the visible target terminal state.
            */
        visibleTargetState: any;
        /**
            * Caches the distance between the end points for an edge.
            */
        terminalDistance: number;
        /**
            * Caches the length of an edge.
            */
        length: number;
        /**
            * Array of numbers that represent the cached length of each segment of the
            * edge.
            */
        segments: number[];
        /**
            * Holds the <mxShape> that represents the cell graphically.
            */
        shape: mxShape;
        /**
            * Holds the <mxText> that represents the label of the cell. Thi smay be
            * null if the cell has no label.
            */
        text: mxText;
        /**
            * Holds the unscaled width of the state.
            */
        unscaledWidth: any;
        /**
            * Implicit variable declarations
            */
        cellBounds: mxRectangle;
        paintBounds: mxRectangle;
        /**
         * Constructs a new object that represents the current state of the given
         * cell in the specified view.
         *
         * @param view - <mxGraphView> that contains the state.
         * @param cell - <mxCell> that this state represents.
         * @param style - Array of key, value pairs that constitute the style.
         */
        constructor(view: mxGraphView, cell: mxCell, style: any[]);
        /**
            * Returns the <mxRectangle> that should be used as the perimeter of the
            * cell.
            *
            * @param border - Optional border to be added around the perimeter bounds.
            * @param bounds - Optional <mxRectangle> to be used as the initial bounds.
            */
        getPerimeterBounds(border?: number, bounds?: mxRectangle): mxRectangle;
        /**
            * Sets the first or last point in <absolutePoints> depending on isSource.
            *
            * @param point - <mxPoint> that represents the terminal point.
            * @param isSource - Boolean that specifies if the first or last point should
            * be assigned.
            */
        setAbsoluteTerminalPoint(point: mxPoint, isSource: boolean): void;
        /**
            * Sets the given cursor on the shape and text shape.
            */
        setCursor(cursor: any): void;
        /**
            * Returns the visible source or target terminal cell.
            *
            * @param source - Boolean that specifies if the source or target cell should be
            * returned.
            */
        getVisibleTerminal(source: boolean): any;
        /**
            * Returns the visible source or target terminal state.
            *
            * @param source - Boolean that specifies if the source or target state should be
            * returned.
            */
        getVisibleTerminalState(source: boolean): any;
        /**
            * Sets the visible source or target terminal state.
            *
            * @param terminalState - <mxCellState> that represents the terminal.
            * @param source - Boolean that specifies if the source or target state should be set.
            */
        setVisibleTerminalState(terminalState: mxCellState, source: boolean): void;
        /**
            * Returns the unscaled, untranslated bounds.
            */
        getCellBounds(): mxRectangle;
        /**
            * Returns the unscaled, untranslated paint bounds. This is the same as
            * <getCellBounds> but with a 90 degree rotation if the shape's
            * isPaintBoundsInverted returns true.
            */
        getPaintBounds(): mxRectangle;
        /**
            * Updates the cellBounds and paintBounds.
            */
        updateCachedBounds(): void;
        /**
            * Destructor: setState
            *
            * Copies all fields from the given state to this state.
            */
        setState(state: mxCellState): void;
        /**
            * Returns a clone of this <mxCellState>.
            */
        clone(): mxCellState;
        /**
            * Destructor: destroy
            *
            * Destroys the state and all associated resources.
            */
        destroy(): void;
    }

    /**
        * Implements the selection model for a graph. Here is a listener that handles
        * all removed selection cells.
        *
        * (code)
        * graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
        * {
        *   var cells = evt.getProperty('added');
        *
        *   for (var i = 0; i < cells.length; i++)
        *   {
        *     // Handle cells[i]...
        *   }
        * });
        * (end)
        *
        * Event: mxEvent.UNDO
        *
        * Fires after the selection was changed in <changeSelection>. The
        * <code>edit</code> property contains the <mxUndoableEdit> which contains the
        * <mxSelectionChange>.
        *
        * Event: mxEvent.CHANGE
        *
        * Fires after the selection changes by executing an <mxSelectionChange>. The
        * <code>added</code> and <code>removed</code> properties contain arrays of
        * cells that have been added to or removed from the selection, respectively.
        * The names are inverted due to historic reasons. This cannot be changed.
        */
    export class mxGraphSelectionModel extends mxEventSource {
        /**
            * Specifies the resource key for the status message after a long operation.
            * If the resource for this key does not exist then the value is used as
            * the status message. Default is 'done'.
            */
        doneResource: string;
        /**
            * Specifies the resource key for the status message while the selection is
            * being updated. If the resource for this key does not exist then the
            * value is used as the status message. Default is 'updatingSelection'.
            */
        updatingSelectionResource: string;
        /**
            * Reference to the enclosing <mxGraph>.
            */
        graph: mxGraph;
        /**
            * Specifies if only one selected item at a time is allowed.
            * Default is false.
            */
        singleSelection: boolean;
        /**
            * Implicit variable declarations
            */
        cells: mxCell[];
        /**
            * Constructs a new graph selection model for the given <mxGraph>.
            *
            * @param graph - Reference to the enclosing <mxGraph>.
            */
        constructor(graph: mxGraph);
        /**
            * Returns <singleSelection> as a boolean.
            */
        isSingleSelection(): boolean;
        /**
            * Sets the <singleSelection> flag.
            *
            * @param singleSelection - Boolean that specifies the new value for
            * <singleSelection>.
            */
        setSingleSelection(singleSelection: boolean): void;
        /**
            * Returns true if the given <mxCell> is selected.
            */
        isSelected(cell: mxCell): boolean;
        /**
            * Returns true if no cells are currently selected.
            */
        isEmpty(): boolean;
        /**
            * Clears the selection and fires a <change> event if the selection was not
            * empty.
            */
        clear(): void;
        /**
            * Selects the specified <mxCell> using <setCells>.
            *
            * @param cell - <mxCell> to be selected.
            */
        setCell(cell: mxCell): void;
        /**
            * Selects the given array of <mxCells> and fires a <change> event.
            *
            * @param cells - Array of <mxCells> to be selected.
            */
        setCells(cells: mxCell[]): void;
        /**
            * Returns the first selectable cell in the given array of cells.
            */
        getFirstSelectableCell(cells: mxCell[]): mxCell;
        /**
            * Adds the given <mxCell> to the selection and fires a <select> event.
            *
            * @param cell - <mxCell> to add to the selection.
            */
        addCell(cell: mxCell): void;
        /**
            * Adds the given array of <mxCells> to the selection and fires a <select>
            * event.
            *
            * @param cells - Array of <mxCells> to add to the selection.
            */
        addCells(cells: mxCell[]): void;
        /**
            * Removes the specified <mxCell> from the selection and fires a <select>
            * event for the remaining cells.
            *
            * @param cell - <mxCell> to remove from the selection.
            */
        removeCell(cell: mxCell): void;
        /**
            * Function: removeCells
            */
        removeCells(cells: mxCell[]): void;
        /**
            * Inner callback to add the specified <mxCell> to the selection. No event
            * is fired in this implementation.
            */
        changeSelection(added: mxCell[], removed: mxCell[]): void;
        /**
            * Inner callback to add the specified <mxCell> to the selection. No event
            * is fired in this implementation.
            *
            * @param cell - <mxCell> to add to the selection.
            */
        cellAdded(cell: mxCell): void;
        /**
            * Inner callback to remove the specified <mxCell> from the selection. No
            * event is fired in this implementation.
            *
            * @param cell - <mxCell> to remove from the selection.
            */
        cellRemoved(cell: mxCell): void;
    }
    /**
        * Action to change the current root in a view.
        */
    export class mxSelectionChange {
        selectionModel: mxGraphSelectionModel;
        added: mxCell[];
        removed: mxCell[];
        /**
            * Constructs a change of the current root in the given view.
            */
        constructor(selectionModel: mxGraphSelectionModel, added: mxCell[], removed: mxCell[]);
        /**
            * Changes the current root of the view.
            */
        execute(): void;
    }

    /**
        * In-place editor for the graph. To control this editor, use
        * <mxGraph.invokesStopCellEditing>, <mxGraph.enterStopsCellEditing> and
        * <mxGraph.escapeEnabled>. If <mxGraph.enterStopsCellEditing> is true then
        * ctrl-enter or shift-enter can be used to create a linefeed. The F2 and
        * escape keys can always be used to stop editing.
        *
        * To customize the location of the textbox in the graph, override
        * <getEditorBounds> as follows:
        *
        * (code)
        * graph.cellEditor.getEditorBounds = function(state)
        * {
        *   var result = mxCellEditor.prototype.getEditorBounds.apply(this, arguments);
        *
        *   if (this.graph.getModel().isEdge(state.cell))
        *   {
        *     result.x = state.getCenterX() - result.width / 2;
        *     result.y = state.getCenterY() - result.height / 2;
        *   }
        *
        *   return result;
        * };
        * (end)
        *
        * Note that this hook is only called if <autoSize> is false. If <autoSize> is true,
        * then <mxShape.getLabelBounds> is used to compute the current bounds of the textbox.
        *
        * The textarea uses the mxCellEditor CSS class. You can modify this class in
        * your custom CSS. Note: You should modify the CSS after loading the client
        * in the page.
        *
        * Example:
        *
        * To only allow numeric input in the in-place editor, use the following code.
        *
        * (code)
        * var text = graph.cellEditor.textarea;
        *
        * mxEvent.addListener(text, 'keydown', function (evt)
        * {
        *   if (!(evt.keyCode >= 48 && evt.keyCode <= 57) &&
        *       !(evt.keyCode >= 96 && evt.keyCode <= 105))
        *   {
        *     mxEvent.consume(evt);
        *   }
        * });
        * (end)
        *
        * Placeholder:
        *
        * To implement a placeholder for cells without a label, use the
        * <emptyLabelText> variable.
        *
        * Resize in Chrome:
        *
        * Resize of the textarea is disabled by default. If you want to enable
        * this feature extend <init> and set this.textarea.style.resize = ''.
        *
        * To start editing on a key press event, the container of the graph
        * should have focus or a focusable parent should be used to add the
        * key press handler as follows.
        *
        * (code)
        * mxEvent.addListener(graph.container, 'keypress', mxUtils.bind(this, function(evt)
        * {
        *   if (!graph.isEditing() && !graph.isSelectionEmpty() && evt.which !== 0 &&
        *       !mxEvent.isAltDown(evt) && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt))
        *   {
        *     graph.startEditing();
        *
        *     if (mxClient.IS_FF)
        *     {
        *       graph.cellEditor.textarea.value = String.fromCharCode(evt.which);
        *     }
        *   }
        * }));
        * (end)
        *
        * To allow focus for a DIV, and hence to receive key press events, some browsers
        * require it to have a valid tabindex attribute. In this case the following
        * code may be used to keep the container focused.
        *
        * (code)
        * var graphFireMouseEvent = graph.fireMouseEvent;
        * graph.fireMouseEvent = function(evtName, me, sender)
        * {
        *   if (evtName == mxEvent.MOUSE_DOWN)
        *   {
        *     this.container.focus();
        *   }
        *
        *   graphFireMouseEvent.apply(this, arguments);
        * };
        * (end)
        *
        * Constructor: mxCellEditor
        *
        * Constructs a new in-place editor for the specified graph.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        */
    export class mxCellEditor {
        constructor(graph: any);
        /**
            * Creates the <textarea> and installs the event listeners. The key handler
            * updates the <modified> state.
            */
        init(): void;
        /**
            * Called in <stopEditing> if cancel is false to invoke <mxGraph.labelChanged>.
            */
        applyValue(state: any, value: any): void;
        /**
            * Gets the initial editing value for the given cell.
            */
        getInitialValue(state: any, trigger: any): any;
        /**
            * Returns the current editing value.
            */
        getCurrentValue(state: any): any;
        /**
            * Installs listeners for focus, change and standard key event handling.
            */
        installListeners(elt: any): void;
        /**
            * Returns true if the given keydown event should stop cell editing. This
            * returns true if F2 is pressed of if <mxGraph.enterStopsCellEditing> is true
            * and enter is pressed without control or shift.
            */
        isStopEditingEvent(evt: any): boolean;
        /**
            * Returns true if this editor is the source for the given native event.
            */
        isEventSource(evt: any): boolean;
        /**
            * Returns <modified>.
            */
        resize(): void;
        /**
            * Called if the textarea has lost focus.
            */
        focusLost(): void;
        /**
            * Returns the background color for the in-place editor. This implementation
            * always returns null.
            */
        getBackgroundColor(state: any): any;
        /**
            * Starts the editor for the given cell.
            *
            * Parameters:
            *
            * cell - <mxCell> to start editing.
            * trigger - Optional mouse event that triggered the editor.
            */
        startEditing(cell: any, trigger: any): void;
        /**
            * Returns <selectText>.
            */
        isSelectText(): any;
        /**
            * Stops the editor and applies the value if cancel is false.
            */
        stopEditing(cancel: any): void;
        /**
            * Prepares the textarea for getting its value in <stopEditing>.
            * This implementation removes the extra trailing linefeed in Firefox.
            */
        prepareTextarea(): void;
        /**
            * Returns true if the label should be hidden while the cell is being
            * edited.
            */
        isHideLabel(state: any): boolean;
        /**
            * Returns the minimum width and height for editing the given state.
            */
        getMinimumSize(state: any): mxRectangle;
        /**
            * Returns the <mxRectangle> that defines the bounds of the editor.
            */
        getEditorBounds(state: any): mxRectangle;
        /**
            * Returns the initial label value to be used of the label of the given
            * cell is empty. This label is displayed and cleared on the first keystroke.
            * This implementation returns <emptyLabelText>.
            *
            * Parameters:
            *
            * cell - <mxCell> for which a text for an empty editing box should be
            * returned.
            */
        getEmptyLabelText(cell: any): any;
        /**
            * Returns the cell that is currently being edited or null if no cell is
            * being edited.
            */
        getEditingCell(): any;
        /**
            * Destroys the editor and removes all associated resources.
            */
        destroy(): void;
    }

    /**
        * Renders cells into a document object model. The <defaultShapes> is a global
        * map of shapename, constructor pairs that is used in all instances. You can
        * get a list of all available shape names using the following code.
        *
        * In general the cell renderer is in charge of creating, redrawing and
        * destroying the shape and label associated with a cell state, as well as
        * some other graphical objects, namely controls and overlays. The shape
        * hieararchy in the display (ie. the hierarchy in which the DOM nodes
        * appear in the document) does not reflect the cell hierarchy. The shapes
        * are a (flat) sequence of shapes and labels inside the draw pane of the
        * graph view, with some exceptions, namely the HTML labels being placed
        * directly inside the graph container for certain browsers.
        *
        * (code)
        * mxLog.show();
        * for (var i in mxCellRenderer.defaultShapes)
        * {
        *   mxLog.debug(i);
        * }
        * (end)
        *
        * Constructor: mxCellRenderer
        *
        * Constructs a new cell renderer with the following built-in shapes:
        * arrow, rectangle, ellipse, rhombus, image, line, label, cylinder,
        * swimlane, connector, actor and cloud.
        */
    export class mxCellRenderer {
        /**
            * Registers the given constructor under the specified key in this instance
            * of the renderer.
            *
            * Example:
            *
            * (code)
            * mxCellRenderer.registerShape(mxConstants.SHAPE_RECTANGLE, mxRectangleShape);
            * (end)
            *
            * Parameters:
            *
            * key - String representing the shape name.
            * shape - Constructor of the <mxShape> subclass.
            */
        static registerShape(key: any, shape: any): void;
        /**
            * Initializes the shape in the given state by calling its init method with
            * the correct container after configuring it using <configureShape>.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the shape should be initialized.
            */
        initializeShape(state: any): void;
        /**
            * Creates and returns the shape for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the shape should be created.
            */
        createShape(state: any): any;
        /**
            * Creates the indicator shape for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the indicator shape should be created.
            */
        createIndicatorShape(state: any): void;
        /**
            * Returns the shape for the given name from <defaultShapes>.
            */
        getShape(name: any): any;
        /**
            * Returns the constructor to be used for creating the shape.
            */
        getShapeConstructor(state: any): any;
        /**
            * Configures the shape for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the shape should be configured.
            */
        configureShape(state: any): void;
        /**
            * Replaces any reserved words used for attributes, eg. inherit,
            * indicated or swimlane for colors in the shape for the given state.
            * This implementation resolves these keywords on the fill, stroke
            * and gradient color keys.
            */
        postConfigureShape(state: any): void;
        /**
            * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
            * the respective color on the shape.
            */
        checkPlaceholderStyles(state: any): boolean;
        /**
            * Resolves special keywords 'inherit', 'indicated' and 'swimlane' and sets
            * the respective color on the shape.
            */
        resolveColor(state: any, field: any, key: any): void;
        /**
            * Returns the value to be used for the label.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the label should be created.
            */
        getLabelValue(state: any): any;
        /**
            * Creates the label for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the label should be created.
            */
        createLabel(state: any, value: any): void;
        /**
            * Initiailzes the label with a suitable container.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label should be initialized.
            */
        initializeLabel(state: any, shape: any): void;
        /**
            * Creates the actual shape for showing the overlay for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the overlay should be created.
            */
        createCellOverlays(state: any): void;
        /**
            * Initializes the given overlay.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the overlay should be created.
            * overlay - <mxImageShape> that represents the overlay.
            */
        initializeOverlay(state: any, overlay: any): void;
        /**
            * Installs the listeners for the given <mxCellState>, <mxCellOverlay> and
            * <mxShape> that represents the overlay.
            */
        installCellOverlayListeners(state: any, overlay: any, shape: any): void;
        /**
            * Creates the control for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the control should be created.
            */
        createControl(state: any): void;
        /**
            * Hook for creating the click handler for the folding icon.
            *
            * Parameters:
            *
            * state - <mxCellState> whose control click handler should be returned.
            */
        createControlClickHandler(state: any): any;
        /**
            * Initializes the given control and returns the corresponding DOM node.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the control should be initialized.
            * control - <mxShape> to be initialized.
            * handleEvents - Boolean indicating if mousedown and mousemove should fire events via the graph.
            * clickHandler - Optional function to implement clicks on the control.
            */
        initControl(state: any, control: any, handleEvents: any, clickHandler: any): any;
        /**
            * Returns true if the event is for the shape of the given state. This
            * implementation always returns true.
            *
            * Parameters:
            *
            * state - <mxCellState> whose shape fired the event.
            * evt - Mouse event which was fired.
            */
        isShapeEvent(state: any, evt: any): boolean;
        /**
            * Returns true if the event is for the label of the given state. This
            * implementation always returns true.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label fired the event.
            * evt - Mouse event which was fired.
            */
        isLabelEvent(state: any, evt: any): boolean;
        /**
            * Installs the event listeners for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the event listeners should be isntalled.
            */
        installListeners(state: any): void;
        /**
            * Redraws the label for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label should be redrawn.
            */
        redrawLabel(state: any, forced: any): void;
        /**
            * Returns true if the style for the text shape has changed.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label should be checked.
            * shape - <mxText> shape to be checked.
            */
        isTextShapeInvalid(state: any, shape: any): any;
        /**
            * Called to invoked redraw on the given text shape.
            *
            * Parameters:
            *
            * shape - <mxText> shape to be redrawn.
            */
        redrawLabelShape(shape: any): void;
        /**
            * Returns the scaling used for the label of the given state
            *
            * Parameters:
            *
            * state - <mxCellState> whose label scale should be returned.
            */
        getTextScale(state: any): any;
        /**
            * Returns the bounds to be used to draw the label of the given state.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label bounds should be returned.
            */
        getLabelBounds(state: any): mxRectangle;
        /**
            * Adds the shape rotation to the given label bounds and
            * applies the alignment and offsets.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label bounds should be rotated.
            * bounds - <mxRectangle> the rectangle to be rotated.
            */
        rotateLabelBounds(state: any, bounds: any): void;
        /**
            * Redraws the overlays for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> whose overlays should be redrawn.
            */
        redrawCellOverlays(state: any, forced: any): void;
        /**
            * Redraws the control for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> whose control should be redrawn.
            */
        redrawControl(state: any, forced: any): void;
        /**
            * Returns the bounds to be used to draw the control (folding icon) of the
            * given state.
            */
        getControlBounds(state: any, w: any, h: any): mxRectangle;
        /**
            * Inserts the given array of <mxShapes> after the given nodes in the DOM.
            *
            * Parameters:
            *
            * shapes - Array of <mxShapes> to be inserted.
            * node - Node in <drawPane> after which the shapes should be inserted.
            * htmlNode - Node in the graph container after which the shapes should be inserted that
            * will not go into the <drawPane> (eg. HTML labels without foreignObjects).
            */
        insertStateAfter(state: any, node: any, htmlNode: any): any[];
        /**
            * Returns the <mxShapes> for the given cell state in the order in which they should
            * appear in the DOM.
            *
            * Parameters:
            *
            * state - <mxCellState> whose shapes should be returned.
            */
        getShapesForState(state: any): any[];
        /**
            * Updates the bounds or points and scale of the shapes for the given cell
            * state. This is called in mxGraphView.validatePoints as the last step of
            * updating all cells.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the shapes should be updated.
            * force - Optional boolean that specifies if the cell should be reconfiured
            * and redrawn without any additional checks.
            * rendering - Optional boolean that specifies if the cell should actually
            * be drawn into the DOM. If this is false then redraw and/or reconfigure
            * will not be called on the shape.
            */
        redraw(state: mxCellState, force?: any, rendering?: any): void;
        /**
            * Redraws the shape for the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> whose label should be redrawn.
            */
        redrawShape(state: any, force: any, rendering: any): boolean;
        /**
            * Invokes redraw on the shape of the given state.
            */
        doRedrawShape(state: any): void;
        /**
            * Returns true if the given shape must be repainted.
            */
        isShapeInvalid(state: any, shape: any): boolean;
        /**
            * Destroys the shapes associated with the given cell state.
            *
            * Parameters:
            *
            * state - <mxCellState> for which the shapes should be destroyed.
            */
        destroy(state: any): void;
    }


    export var mxEdgeStyle: {
        EntityRelation(state: any, source: any, target: any, points: any, result: any): void;
        Loop(state: any, source: any, target: any, points: any, result: any): void;
        ElbowConnector(state: any, source: any, target: any, points: any, result: any): void;
        SideToSide(state: any, source: any, target: any, points: any, result: any): void;
        TopToBottom(state: any, source: any, target: any, points: any, result: any): void;
        SegmentConnector(state: any, source: any, target: any, hints: any, result: any): void;
        orthBuffer: number;
        orthPointsFallback: boolean;
        dirVectors: number[][];
        wayPoints1: number[][];
        routePatterns: number[][][];
        inlineRoutePatterns: number[][][];
        vertexSeperations: any[];
        limits: number[][];
        LEFT_MASK: number;
        TOP_MASK: number;
        RIGHT_MASK: number;
        BOTTOM_MASK: number;
        LEFT: number;
        TOP: number;
        RIGHT: number;
        BOTTOM: number;
        SIDE_MASK: number;
        CENTER_MASK: number;
        SOURCE_MASK: number;
        TARGET_MASK: number;
        VERTEX_MASK: number;
        getJettySize(state: any, source: any, target: any, points: any, isSource: any): any;
        OrthConnector(state: any, source: any, target: any, points: any, result: any): void;
        getRoutePattern(dir: any, quad: any, dx: any, dy: any): any;
    };


    export var mxStyleRegistry: {
        values: any[];
        putValue(name: any, obj: any): void;
        getValue(name: any): any;
        getName(value: any): string;
    };

    /**
        * Extends <mxEventSource> to implement a view for a graph. This class is in
        * charge of computing the absolute coordinates for the relative child
        * geometries, the points for perimeters and edge styles and keeping them
        * cached in <mxCellStates> for faster retrieval. The states are updated
        * whenever the model or the view state (translate, scale) changes. The scale
        * and translate are honoured in the bounds.
        *
        * Event: mxEvent.UNDO
        *
        * Fires after the root was changed in <setCurrentRoot>. The <code>edit</code>
        * property contains the <mxUndoableEdit> which contains the
        * <mxCurrentRootChange>.
        *
        * Event: mxEvent.SCALE_AND_TRANSLATE
        *
        * Fires after the scale and translate have been changed in <scaleAndTranslate>.
        * The <code>scale</code>, <code>previousScale</code>, <code>translate</code>
        * and <code>previousTranslate</code> properties contain the new and previous
        * scale and translate, respectively.
        *
        * Event: mxEvent.SCALE
        *
        * Fires after the scale was changed in <setScale>. The <code>scale</code> and
        * <code>previousScale</code> properties contain the new and previous scale.
        *
        * Event: mxEvent.TRANSLATE
        *
        * Fires after the translate was changed in <setTranslate>. The
        * <code>translate</code> and <code>previousTranslate</code> properties contain
        * the new and previous value for translate.
        *
        * Event: mxEvent.DOWN and mxEvent.UP
        *
        * Fire if the current root is changed by executing an <mxCurrentRootChange>.
        * The event name depends on the location of the root in the cell hierarchy
        * with respect to the current root. The <code>root</code> and
        * <code>previous</code> properties contain the new and previous root,
        * respectively.
        */
    export class mxGraphView extends mxEventSource {
        /**
            *
            */
        EMPTY_POINT: mxPoint;
        /**
            * Specifies the resource key for the status message after a long operation.
            * If the resource for this key does not exist then the value is used as
            * the status message. Default is 'done'.
            */
        doneResource: string;
        /**
            * Specifies the resource key for the status message while the document is
            * being updated. If the resource for this key does not exist then the
            * value is used as the status message. Default is 'updatingDocument'.
            */
        updatingDocumentResource: string;
        /**
            * Specifies if string values in cell styles should be evaluated using
            * <mxUtils.eval>. This will only be used if the string values can't be mapped
            * to objects using <mxStyleRegistry>. Default is false. NOTE: Enabling this
            * switch carries a possible security risk.
            */
        allowEval: boolean;
        /**
            * Specifies if a gesture should be captured when it goes outside of the
            * graph container. Default is true.
            */
        captureDocumentGesture: boolean;
        /**
            * Specifies if the <canvas> should be hidden while rendering in IE8 standards
            * mode and quirks mode. This will significantly improve rendering performance.
            * Default is true.
            */
        optimizeVmlReflows: boolean;
        /**
            * Specifies if shapes should be created, updated and destroyed using the
            * methods of <mxCellRenderer> in <graph>. Default is true.
            */
        rendering: boolean;
        /**
            * Reference to the enclosing <mxGraph>.
            */
        graph: mxGraph;
        /**
            * <mxCell> that acts as the root of the displayed cell hierarchy.
            */
        currentRoot: mxCell;
        /**
            * <mxRectangle> that caches the scales, translated bounds of the current view.
            */
        graphBounds: mxRectangle;
        /**
            * Specifies the scale. Default is 1 (100%).
            */
        scale: number;
        /**
            * <mxPoint> that specifies the current translation. Default is a new
            * empty <mxPoint>.
            */
        translate: mxPoint;
        /**
            * <mxDictionary> that maps from cell IDs to <mxCellStates>.
            */
        states: mxDictionary;
        /**
            * Specifies if the style should be updated in each validation step. If this
            * is false then the style is only updated if the state is created or if the
            * style of the cell was changed. Default is false.
            */
        updateStyle: boolean;
        /**
            * During validation, this contains the last DOM node that was processed.
            */
        lastNode: HTMLElement;
        /**
            * During validation, this contains the last HTML DOM node that was processed.
            */
        lastHtmlNode: HTMLElement;
        /**
            * During validation, this contains the last edge's DOM node that was processed.
            */
        lastForegroundNode: HTMLElement;
        /**
            * During validation, this contains the last edge HTML DOM node that was processed.
            */
        lastForegroundHtmlNode: HTMLElement;
        /**
            * Implicit variable definitions
            */
        canvas: HTMLCanvasElement;
        placeholder: HTMLElement;
        textDiv: HTMLElement;
        backgroundPane: HTMLElement;
        drawPane: SVGElement;
        overlayPane: HTMLElement;
        decoratorPane: HTMLElement;
        /**
            * Constructs a new view for the given <mxGraph>.
            *
            * @param graph - Reference to the enclosing <mxGraph>.
            */
        constructor(graph: mxGraph);
        /**
            * Returns <graphBounds>.
            */
        getGraphBounds(): mxRectangle;
        /**
            * Sets <graphBounds>.
            */
        setGraphBounds(value: mxRectangle): void;
        /**
            * Returns the union of all <mxCellStates> for the given array of <mxCells>.
            *
            * @param cells - Array of <mxCells> whose bounds should be returned.
            */
        getBounds(cells: mxCell[]): mxRectangle;
        /**
            * Sets and returns the current root and fires an <undo> event before
            * calling <mxGraph.sizeDidChange>.
            *
            * @param root - <mxCell> that specifies the root of the displayed cell hierarchy.
            */
        setCurrentRoot(root: any): any;
        /**
            * Sets the scale and translation and fires a <scale> and <translate> event
            * before calling <revalidate> followed by <mxGraph.sizeDidChange>.
            *
            * @param scale - Decimal value that specifies the new scale (1 is 100%).
            * @param dx - X-coordinate of the translation.
            * @param dy - Y-coordinate of the translation.
            */
        scaleAndTranslate(scale: any, dx: any, dy: any): void;
        /**
            * Returns the <scale>.
            */
        getScale(): number;
        /**
            * Sets the scale and fires a <scale> event before calling <revalidate> followed
            * by <mxGraph.sizeDidChange>.
            *
            * @param value - Decimal value that specifies the new scale (1 is 100%).
            */
        setScale(value: any): void;
        /**
            * Returns the <translate>.
            */
        getTranslate(): mxPoint;
        /**
            * Sets the translation and fires a <translate> event before calling
            * <revalidate> followed by <mxGraph.sizeDidChange>. The translation is the
            * negative of the origin.
            *
            * @param dx - X-coordinate of the translation.
            * @param dy - Y-coordinate of the translation.
            */
        setTranslate(dx: number, dy: number): void;
        /**
            * Clears the view if <currentRoot> is not null and revalidates.
            */
        refresh(): void;
        /**
            * Revalidates the complete view with all cell states.
            */
        revalidate(): void;
        /**
            * Removes the state of the given cell and all descendants if the given
            * cell is not the current root.
            *
            * @param cell - Optional <mxCell> for which the state should be removed. Default
            * is the root of the model.
            * @param force - Boolean indicating if the current root should be ignored for
            * recursion.
            */
        clear(cell?: mxCell, force?: boolean, recurse?: boolean): void;
        /**
            * Invalidates the state of the given cell, all its descendants and
            * connected edges.
            *
            * @param cell - Optional <mxCell> to be invalidated. Default is the root of the
            * model.
            */
        invalidate(cell?: mxCell, recurse?: boolean, includeEdges?: boolean): void;
        /**
            * Calls <validateCell> and <validateCellState> and updates the <graphBounds>
            * using <getBoundingBox>. Finally the background is validated using
            * <validateBackground>.
            *
            * @param cell - Optional <mxCell> to be used as the root of the validation.
            * Default is <currentRoot> or the root of the model.
            */
        validate(cell?: mxCell): void;
        /**
            * Returns the bounds for an empty graph. This returns a rectangle at
            * <translate> with the size of 0 x 0.
            */
        getEmptyBounds(): mxRectangle;
        /**
            * Returns the bounding box of the shape and the label for the given
            * <mxCellState> and its children if recurse is true.
            *
            * @param state - <mxCellState> whose bounding box should be returned.
            * @param recurse - Optional boolean indicating if the children should be included.
            * Default is true.
            */
        getBoundingBox(state: mxCellState, recurse?: boolean): mxRectangle;
        /**
            * Creates and returns the shape used as the background page.
            *
            * bounds - <mxRectangle> that represents the bounds of the shape.
            */
        createBackgroundPageShape(bounds: any): mxRectangleShape;
        /**
            * Calls <validateBackgroundImage> and <validateBackgroundPage>.
            */
        validateBackground(): void;
        /**
            * Validates the background image.
            */
        validateBackgroundImage(): void;
        /**
            * Validates the background page.
            */
        validateBackgroundPage(): void;
        /**
            * Returns the bounds for the background page.
            */
        getBackgroundPageBounds(): mxRectangle;
        /**
            * Updates the bounds and redraws the background image.
            *
            * Example:
            *
            * If the background image should not be scaled, this can be replaced with
            * the following.
            *
            * (code)
            * mxGraphView.prototype.redrawBackground = function(backgroundImage, bg)
            * {
            *   backgroundImage.bounds.x = this.translate.x;
            *   backgroundImage.bounds.y = this.translate.y;
            *   backgroundImage.bounds.width = bg.width;
            *   backgroundImage.bounds.height = bg.height;
            *
            *   backgroundImage.redraw();
            * };
            * (end)
            *
            * @param backgroundImage - <mxImageShape> that represents the background image.
            * @param bg - <mxImage> that specifies the image and its dimensions.
            */
        redrawBackgroundImage(backgroundImage: any, bg: any): void;
        /**
            * Recursively creates the cell state for the given cell if visible is true and
            * the given cell is visible. If the cell is not visible but the state exists
            * then it is removed using <removeState>.
            *
            * @param cell - <mxCell> whose <mxCellState> should be created.
            * @param visible - Optional boolean indicating if the cell should be visible. Default
            * is true.
            */
        validateCell(cell: mxCell, visible?: boolean): mxCell;
        /**
            * Validates and repaints the <mxCellState> for the given <mxCell>.
            *
            * @param cell - <mxCell> whose <mxCellState> should be validated.
            * @param recurse - Optional boolean indicating if the children of the cell should be
            * validated. Default is true.
            */
        validateCellState(cell: mxCell, recurse?: boolean): mxCellState;
        /**
            * Updates the given <mxCellState>.
            *
            * @param state - <mxCellState> to be updated.
            */
        updateCellState(state: mxCellState): void;
        /**
            * Returns true if the children of the given cell should not be visible in the
            * view. This implementation uses <mxGraph.isCellVisible> but it can be
            * overidden to use a separate condition.
            *
            * @param cell
            */
        isCellCollapsed(cell: any): boolean;
        /**
            * Validates the given cell state.
            *
            * @param state
            * @param geo
            */
        updateVertexState(state: any, geo: any): void;
        /**
            * Validates the given cell state.
            *
            * @param state
            * @param geo
            */
        updateEdgeState(state: any, geo: any): void;
        /**
            * Updates the absoluteOffset of the given vertex cell state. This takes
            * into account the label position styles.
            *
            * @param state - <mxCellState> whose absolute offset should be updated.
            */
        updateVertexLabelOffset(state: any): void;
        /**
            * Resets the current validation state.
            */
        resetValidationState(): void;
        /**
            * Invoked when a state has been processed in <validatePoints>. This is used
            * to update the order of the DOM nodes of the shape.
            *
            * @param state - <mxCellState> that represents the cell state.
            */
        stateValidated(state: any): void;
        /**
            * Sets the initial absolute terminal points in the given state before the edge
            * style is computed.
            *
            * @param edge - <mxCellState> whose initial terminal points should be updated.
            * @param source - <mxCellState> which represents the source terminal.
            * @param target - <mxCellState> which represents the target terminal.
            */
        updateFixedTerminalPoints(edge: any, source: any, target: any): void;
        /**
            * Sets the fixed source or target terminal point on the given edge.
            *
            * @param edge - <mxCellState> whose terminal point should be updated.
            * @param terminal - <mxCellState> which represents the actual terminal.
            * @param source - Boolean that specifies if the terminal is the source.
            * @param constraint - <mxConnectionConstraint> that specifies the connection.
            */
        updateFixedTerminalPoint(edge: any, terminal: any, source: any, constraint: any): void;
        /**
            * Returns the fixed source or target terminal point for the given edge.
            *
            * @param edge - <mxCellState> whose terminal point should be returned.
            * @param terminal - <mxCellState> which represents the actual terminal.
            * @param source - Boolean that specifies if the terminal is the source.
            * @param constraint - <mxConnectionConstraint> that specifies the connection.
            */
        getFixedTerminalPoint(edge: any, terminal: any, source: any, constraint: any): any;
        /**
            * Updates the bounds of the given cell state to reflect the bounds of the stencil
            * if it has a fixed aspect and returns the previous bounds as an <mxRectangle> if
            * the bounds have been modified or null otherwise.
            *
            * @param edge - <mxCellState> whose bounds should be updated.
            */
        updateBoundsFromStencil(state: any): any;
        /**
            * Updates the absolute points in the given state using the specified array
            * of <mxPoints> as the relative points.
            *
            * @param edge - <mxCellState> whose absolute points should be updated.
            * @param points - Array of <mxPoints> that constitute the relative points.
            * @param source - <mxCellState> that represents the source terminal.
            * @param target - <mxCellState> that represents the target terminal.
            */
        updatePoints(edge: any, points: any, source: any, target: any): void;
        /**
            * Transforms the given control point to an absolute point.
            *
            * @param state
            * @param pt
            */
        transformControlPoint(state: any, pt: any): mxPoint;
        /**
            * Returns true if the given edge should be routed with <mxGraph.defaultLoopStyle>
            * or the <mxConstants.STYLE_LOOP> defined for the given edge. This implementation
            * returns true if the given edge is a loop and does not
            *
            * @param edge
            * @param points
            * @param source
            * @param target
            */
        isLoopStyleEnabled(edge: mxCellState, points: any, source: any, target: any): boolean;
        /**
            * Returns the edge style function to be used to render the given edge state.
            *
            * @param edge
            * @param points
            * @param source
            * @param target
            */
        getEdgeStyle(edge: any, points?: any, source?: any, target?: any): any;
        /**
            * Updates the terminal points in the given state after the edge style was
            * computed for the edge.
            *
            * @param state - <mxCellState> whose terminal points should be updated.
            * @param source - <mxCellState> that represents the source terminal.
            * @param target - <mxCellState> that represents the target terminal.
            */
        updateFloatingTerminalPoints(state: any, source: any, target: any): void;
        /**
            * Updates the absolute terminal point in the given state for the given
            * start and end state, where start is the source if source is true.
            *
            * @param edge - <mxCellState> whose terminal point should be updated.
            * @param start - <mxCellState> for the terminal on "this" side of the edge.
            * @param end - <mxCellState> for the terminal on the other side of the edge.
            * @param source - Boolean indicating if start is the source terminal state.
            */
        updateFloatingTerminalPoint(edge: any, start: any, end: any, source: any): void;
        /**
            * Returns the floating terminal point for the given edge, start and end
            * state, where start is the source if source is true.
            *
            * @param edge - <mxCellState> whose terminal point should be returned.
            * @param start - <mxCellState> for the terminal on "this" side of the edge.
            * @param end - <mxCellState> for the terminal on the other side of the edge.
            * @param source - Boolean indicating if start is the source terminal state.
            */
        getFloatingTerminalPoint(edge: any, start: any, end: any, source: any): mxPoint;
        /**
            * Returns an <mxCellState> that represents the source or target terminal or
            * port for the given edge.
            *
            * @param state - <mxCellState> that represents the state of the edge.
            * @param terminal - <mxCellState> that represents the terminal.
            * @param source - Boolean indicating if the given terminal is the source terminal.
            */
        getTerminalPort(state: any, terminal: any, source: any): any;
        /**
            * Returns an <mxPoint> that defines the location of the intersection point between
            * the perimeter and the line between the center of the shape and the given point.
            *
            * @param terminal - <mxCellState> for the source or target terminal.
            * @param next - <mxPoint> that lies outside of the given terminal.
            * @param orthogonal - Boolean that specifies if the orthogonal projection onto
            * the perimeter should be returned. If this is false then the intersection
            * of the perimeter and the line between the next and the center point is
            * returned.
            * @param border - Optional border between the perimeter and the shape.
            */
        getPerimeterPoint(terminal: mxCellState, next: mxPoint, orthogonal: boolean, border?: number): mxPoint;
        /**
            * Returns the x-coordinate of the center point for automatic routing.
            */
        getRoutingCenterX(state: any): any;
        /**
            * Returns the y-coordinate of the center point for automatic routing.
            */
        getRoutingCenterY(state: any): any;
        /**
            * Returns the perimeter bounds for the given terminal, edge pair as an
            * <mxRectangle>.
            *
            * If you have a model where each terminal has a relative child that should
            * act as the graphical endpoint for a connection from/to the terminal, then
            * this method can be replaced as follows:
            *
            * (code)
            * var oldGetPerimeterBounds = mxGraphView.prototype.getPerimeterBounds;
            * mxGraphView.prototype.getPerimeterBounds = function(terminal, edge, isSource)
            * {
            *   var model = this.graph.getModel();
            *   var childCount = model.getChildCount(terminal.cell);
            *
            *   if (childCount > 0)
            *   {
            *     var child = model.getChildAt(terminal.cell, 0);
            *     var geo = model.getGeometry(child);
            *
            *     if (geo != null &&
            *         geo.relative)
            *     {
            *       var state = this.getState(child);
            *
            *       if (state != null)
            *       {
            *         terminal = state;
            *       }
            *     }
            *   }
            *
            *   return oldGetPerimeterBounds.apply(this, arguments);
            * };
            * (end)
            *
            * @param terminal - <mxCellState> that represents the terminal.
            * @param border - Number that adds a border between the shape and the perimeter.
            */
        getPerimeterBounds(terminal: mxCellState, border?: number): mxRectangle;
        /**
            * Returns the perimeter function for the given state.
            *
            * @param state
            */
        getPerimeterFunction(state: mxCellState): any;
        /**
            * Returns the nearest point in the list of absolute points or the center
            * of the opposite terminal.
            *
            * @param edge - <mxCellState> that represents the edge.
            * @param opposite - <mxCellState> that represents the opposite terminal.
            * @param source - Boolean indicating if the next point for the source or target
            * @param should be returned.
            */
        getNextPoint(edge: any, opposite: any, source: any): any;
        /**
            * Returns the nearest ancestor terminal that is visible. The edge appears
            * to be connected to this terminal on the display. The result of this method
            * is cached in <mxCellState.getVisibleTerminalState>.
            *
            * @param edge - <mxCell> whose visible terminal should be returned.
            * @param source - Boolean that specifies if the source or target terminal
            * should be returned.
            */
        getVisibleTerminal(edge: any, source: any): mxCell;
        /**
            * Updates the given state using the bounding box of t
            * he absolute points.
            * Also updates <mxCellState.terminalDistance>, <mxCellState.length> and
            * <mxCellState.segments>.
            *
            * @param state - <mxCellState> whose bounds should be updated.
            */
        updateEdgeBounds(state: any): void;
        /**
            * Returns the absolute point on the edge for the given relative
            * <mxGeometry> as an <mxPoint>. The edge is represented by the given
            * <mxCellState>.
            *
            * @param state - <mxCellState> that represents the state of the parent edge.
            * @param geometry - <mxGeometry> that represents the relative location.
            */
        getPoint(state: any, geometry?: any): mxPoint;
        /**
            * Gets the relative point that describes the given, absolute label
            * position for the given edge state.
            *
            * @param state - <mxCellState> that represents the state of the parent edge.
            * @param x - Specifies the x-coordinate of the absolute label location.
            * @param y - Specifies the y-coordinate of the absolute label location.
            */
        getRelativePoint(edgeState: any, x: any, y: any): mxPoint;
        /**
            * Updates <mxCellState.absoluteOffset> for the given state. The absolute
            * offset is normally used for the position of the edge label. Is is
            * calculated from the geometry as an absolute offset from the center
            * between the two endpoints if the geometry is absolute, or as the
            * relative distance between the center along the line and the absolute
            * orthogonal distance if the geometry is relative.
            *
            * @param state - <mxCellState> whose absolute offset should be updated.
            */
        updateEdgeLabelOffset(state: any): void;
        /**
            * Returns the <mxCellState> for the given cell. If create is true, then
            * the state is created if it does not yet exist.
            *
            * @param cell - <mxCell> for which the <mxCellState> should be returned.
            * @param create - Optional boolean indicating if a new state should be created
            * @param if it does not yet exist. Default is false.
            */
        getState(cell: mxCell, create?: boolean): mxCellState;
        /**
            * Returns <rendering>.
            */
        isRendering(): boolean;
        /**
            * Sets <rendering>.
            *
            * @param value
            */
        setRendering(value: boolean): void;
        /**
            * Returns <allowEval>.
            */
        isAllowEval(): boolean;
        /**
            * Sets <allowEval>.
            *
            * @param value
            */
        setAllowEval(value: boolean): void;
        /**
            * Returns <states>.
            */
        getStates(): mxDictionary;
        /**
            * Sets <states>.
            *
            * @param value
            */
        setStates(value: mxDictionary): void;
        /**
            * Returns the <mxCellStates> for the given array of <mxCells>. The array
            * contains all states that are not null, that is, the returned array may
            * have less elements than the given array. If no argument is given, then
            * this returns <states>.
            *
            * @param cells
            */
        getCellStates(cells: mxCell[]): any[] | mxDictionary;
        /**
            * Removes and returns the <mxCellState> for the given cell.
            *
            * @param cell - <mxCell> for which the <mxCellState> should be removed.
            */
        removeState(cell: any): any;
        /**
            * Creates and returns an <mxCellState> for the given cell and initializes
            * it using <mxCellRenderer.initialize>.
            *
            * @param cell - <mxCell> for which a new <mxCellState> should be created.
            */
        createState(cell: any): mxCellState;
        /**
            * Returns the DOM node that contains the background-, draw- and
            * overlay- and decoratorpanes.
            */
        getCanvas(): HTMLCanvasElement;
        /**
            * Returns the DOM node that represents the background layer.
            */
        getBackgroundPane(): HTMLElement;
        /**
            * Returns the DOM node that represents the main drawing layer.
            */
        getDrawPane(): SVGElement;
        /**
            * Returns the DOM node that represents the layer above the drawing layer.
            */
        getOverlayPane(): HTMLElement;
        /**
            * Returns the DOM node that represents the topmost drawing layer.
            */
        getDecoratorPane(): HTMLElement;
        /**
            * Returns true if the event origin is one of the drawing panes or
            * containers of the view.
            */
        isContainerEvent(evt: any): boolean;
        /**
            * Returns true if the event origin is one of the scrollbars of the
            * container in IE. Such events are ignored.
            */
        isScrollEvent(evt: any): boolean;
        /**
            * Initializes the graph event dispatch loop for the specified container
            * and invokes <create> to create the required DOM nodes for the display.
            */
        init(): void;
        /**
            * Installs the required listeners in the container.
            */
        installListeners(): void;
        /**
            * Creates the DOM nodes for the HTML display.
            */
        createHtml(): void;
        /**
            * Updates the size of the HTML canvas.
            */
        updateHtmlCanvasSize(width: any, height: any): void;
        /**
            * Creates and returns a drawing pane in HTML (DIV).
            */
        createHtmlPane(width: any, height: any): HTMLElement;
        /**
            * Creates the DOM nodes for the VML display.
            */
        createVml(): void;
        /**
            * Creates a drawing pane in VML (group).
            */
        createVmlPane(width: any, height: any): HTMLElement;
        /**
            * Creates and returns the DOM nodes for the SVG display.
            */
        createSvg(): void;
        /**
            * Updates the style of the container after installing the SVG DOM elements.
            */
        updateContainerStyle(container: any): void;
        /**
            * Destroys the view and all its resources.
            */
        destroy(): void;
    }
    /**
        * Action to change the current root in a view.
        *
        * Constructor: mxCurrentRootChange
        *
        * Constructs a change of the current root in the given view.
        */
    export class mxCurrentRootChange {
        constructor(view: any, root: any);
        /**
            * Changes the current root of the view.
            */
        execute(): void;
    }
    /**
     * A string to affect the display performance and rendering in IE, but not in SVG-based browsers. The parameter is mapped to <dialect>, which may be one of <mxConstants.DIALECT_SVG> for SVG-based browsers, 
     * <mxConstants.DIALECT_STRICTHTML> for fastest display mode,
     * <mxConstants.DIALECT_PREFERHTML> for faster display mode,
     * <mxConstants.DIALECT_MIXEDHTML> for fast 
     * and <mxConstants.DIALECT_VML> for exact display mode (slowest). The dialects are defined in mxConstants.
     * The default values are DIALECT_SVG for SVG-based browsers and DIALECT_MIXED for IE.
     */
    export enum renderingHint {
        /**
        * The display performance is 
        * highly improved in IE if the VML is not contained within a VML group 
        * element. The lack of a group element only slightly affects the display while 
        * panning, but improves the performance by almost a factor of 2, while keeping 
        * the display sufficiently accurate. This also allows to render certain shapes as HTML 
        * if the display accuracy is not affected, which is implemented by 
        * <mxShape.isMixedModeHtml>. This is the default setting and is mapped to
        * DIALECT_MIXEDHTML.
        */
        fast = 'fast',

        /**
        * Same as fast, but more expensive shapes are avoided. This is 
        * controlled by <mxShape.preferModeHtml>. The default implementation will 
        * avoid gradients and rounded rectangles, but more significant shapes, such 
        * as rhombus, ellipse, actor and cylinder will be rendered accurately. This 
        * setting is mapped to DIALECT_PREFERHTML.
         */
        faster = 'faster',

        /**
        * Almost anything will be rendered in Html.This allows for 
        * rectangles, labels and images.This setting is mapped to
        * DIALECT_STRICTHTML.
        */
        fastest = 'fastest',

        /**
        * exact - If accurate panning is required and if the diagram is small(up
        * to 100 cells), then this value should be used.In this mode, a group is
        * created that contains the VML.This allows for accurate panning and is
        * mapped to DIALECT_VML.
        */
        exact = 'exact',
    }
    /**
        * Extends <mxEventSource> to implement a graph component for
        * the browser. This is the main class of the package. To activate
        * panning and connections use <setPanning> and <setConnectable>.
        * For rubberband selection you must create a new instance of
        * <mxRubberband>. The following listeners are added to
        * <mouseListeners> by default:
        *
        * - <tooltipHandler>: <mxTooltipHandler> that displays tooltips
        * - <panningHandler>: <mxPanningHandler> for panning and popup menus
        * - <connectionHandler>: <mxConnectionHandler> for creating connections
        * - <graphHandler>: <mxGraphHandler> for moving and cloning cells
        *
        * These listeners will be called in the above order if they are enabled.
        *
        * Background Images:
        *
        * To display a background image, set the image, image width and
        * image height using <setBackgroundImage>. If one of the
        * above values has changed then the <view>'s <mxGraphView.validate>
        * should be invoked.
        *
        * Cell Images:
        *
        * To use images in cells, a shape must be specified in the default
        * vertex style (or any named style). Possible shapes are
        * <mxConstants.SHAPE_IMAGE> and <mxConstants.SHAPE_LABEL>.
        * The code to change the shape used in the default vertex style,
        * the following code is used:
        *
        * (code)
        * var style = graph.getStylesheet().getDefaultVertexStyle();
        * style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        * (end)
        *
        * For the default vertex style, the image to be displayed can be
        * specified in a cell's style using the <mxConstants.STYLE_IMAGE>
        * key and the image URL as a value, for example:
        *
        * (code)
        * image=http://www.example.com/image.gif
        * (end)
        *
        * For a named style, the the stylename must be the first element
        * of the cell style:
        *
        * (code)
        * stylename;image=http://www.example.com/image.gif
        * (end)
        *
        * A cell style can have any number of key=value pairs added, divided
        * by a semicolon as follows:
        *
        * (code)
        * [stylename;|key=value;]
        * (end)
        *
        * Labels:
        *
        * The cell labels are defined by <getLabel> which uses <convertValueToString>
        * if <labelsVisible> is true. If a label must be rendered as HTML markup, then
        * <isHtmlLabel> should return true for the respective cell. If all labels
        * contain HTML markup, <htmlLabels> can be set to true. NOTE: Enabling HTML
        * labels carries a possible security risk (see the section on security in
        * the manual).
        *
        * If wrapping is needed for a label, then <isHtmlLabel> and <isWrapping> must
        * return true for the cell whose label should be wrapped. See <isWrapping> for
        * an example.
        *
        * If clipping is needed to keep the rendering of a HTML label inside the
        * bounds of its vertex, then <isClipping> should return true for the
        * respective cell.
        *
        * By default, edge labels are movable and vertex labels are fixed. This can be
        * changed by setting <edgeLabelsMovable> and <vertexLabelsMovable>, or by
        * overriding <isLabelMovable>.
        *
        * In-place Editing:
        *
        * In-place editing is started with a doubleclick or by typing F2.
        * Programmatically, <edit> is used to check if the cell is editable
        * (<isCellEditable>) and call <startEditingAtCell>, which invokes
        * <mxCellEditor.startEditing>. The editor uses the value returned
        * by <getEditingValue> as the editing value.
        *
        * After in-place editing, <labelChanged> is called, which invokes
        * <mxGraphModel.setValue>, which in turn calls
        * <mxGraphModel.valueForCellChanged> via <mxValueChange>.
        *
        * The event that triggers in-place editing is passed through to the
        * <cellEditor>, which may take special actions depending on the type of the
        * event or mouse location, and is also passed to <getEditingValue>. The event
        * is then passed back to the event processing functions which can perform
        * specific actions based on the trigger event.
        *
        * Tooltips:
        *
        * Tooltips are implemented by <getTooltip>, which calls <getTooltipForCell>
        * if a cell is under the mousepointer. The default implementation checks if
        * the cell has a getTooltip function and calls it if it exists. Hence, in order
        * to provide custom tooltips, the cell must provide a getTooltip function, or
        * one of the two above functions must be overridden.
        *
        * Typically, for custom cell tooltips, the latter function is overridden as
        * follows:
        *
        * (code)
        * graph.getTooltipForCell = function(cell)
        * {
        *   var label = this.convertValueToString(cell);
        *   return 'Tooltip for '+label;
        * }
        * (end)
        *
        * When using a config file, the function is overridden in the mxGraph section
        * using the following entry:
        *
        * (code)
        * <add as="getTooltipForCell"><![CDATA[
        *   function(cell)
        *   {
        *     var label = this.convertValueToString(cell);
        *     return 'Tooltip for '+label;
        *   }
        * ]]></add>
        * (end)
        *
        * "this" refers to the graph in the implementation, so for example to check if
        * a cell is an edge, you use this.getModel().isEdge(cell)
        *
        * For replacing the default implementation of <getTooltipForCell> (rather than
        * replacing the function on a specific instance), the following code should be
        * used after loading the JavaScript files, but before creating a new mxGraph
        * instance using <mxGraph>:
        *
        * (code)
        * mxGraph.prototype.getTooltipForCell = function(cell)
        * {
        *   var label = this.convertValueToString(cell);
        *   return 'Tooltip for '+label;
        * }
        * (end)
        *
        * Shapes & Styles:
        *
        * The implementation of new shapes is demonstrated in the examples. We'll assume
        * that we have implemented a custom shape with the name BoxShape which we want
        * to use for drawing vertices. To use this shape, it must first be registered in
        * the cell renderer as follows:
        *
        * (code)
        * mxCellRenderer.registerShape('box', BoxShape);
        * (end)
        *
        * The code registers the BoxShape constructor under the name box in the cell
        * renderer of the graph. The shape can now be referenced using the shape-key in
        * a style definition. (The cell renderer contains a set of additional shapes,
        * namely one for each constant with a SHAPE-prefix in <mxConstants>.)
        *
        * Styles are a collection of key, value pairs and a stylesheet is a collection
        * of named styles. The names are referenced by the cellstyle, which is stored
        * in <mxCell.style> with the following format: [stylename;|key=value;]. The
        * string is resolved to a collection of key, value pairs, where the keys are
        * overridden with the values in the string.
        *
        * When introducing a new shape, the name under which the shape is registered
        * must be used in the stylesheet. There are three ways of doing this:
        *
        *   - By changing the default style, so that all vertices will use the new
        * 		shape
        *   - By defining a new style, so that only vertices with the respective
        * 		cellstyle will use the new shape
        *   - By using shape=box in the cellstyle's optional list of key, value pairs
        * 		to be overridden
        *
        * In the first case, the code to fetch and modify the default style for
        * vertices is as follows:
        *
        * (code)
        * var style = graph.getStylesheet().getDefaultVertexStyle();
        * style[mxConstants.STYLE_SHAPE] = 'box';
        * (end)
        *
        * The code takes the default vertex style, which is used for all vertices that
        * do not have a specific cellstyle, and modifies the value for the shape-key
        * in-place to use the new BoxShape for drawing vertices. This is done by
        * assigning the box value in the second line, which refers to the name of the
        * BoxShape in the cell renderer.
        *
        * In the second case, a collection of key, value pairs is created and then
        * added to the stylesheet under a new name. In order to distinguish the
        * shapename and the stylename we'll use boxstyle for the stylename:
        *
        * (code)
        * var style = new Object();
        * style[mxConstants.STYLE_SHAPE] = 'box';
        * style[mxConstants.STYLE_STROKECOLOR] = '#000000';
        * style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        * graph.getStylesheet().putCellStyle('boxstyle', style);
        * (end)
        *
        * The code adds a new style with the name boxstyle to the stylesheet. To use
        * this style with a cell, it must be referenced from the cellstyle as follows:
        *
        * (code)
        * var vertex = graph.insertVertex(parent, null, 'Hello, World!', 20, 20, 80, 20,
        * 				'boxstyle');
        * (end)
        *
        * To summarize, each new shape must be registered in the <mxCellRenderer> with
        * a unique name. That name is then used as the value of the shape-key in a
        * default or custom style. If there are multiple custom shapes, then there
        * should be a separate style for each shape.
        *
        * Inheriting Styles:
        *
        * For fill-, stroke-, gradient- and indicatorColors special keywords can be
        * used. The inherit keyword for one of these colors will inherit the color
        * for the same key from the parent cell. The swimlane keyword does the same,
        * but inherits from the nearest swimlane in the ancestor hierarchy. Finally,
        * the indicated keyword will use the color of the indicator as the color for
        * the given key.
        *
        * Scrollbars:
        *
        * The <containers> overflow CSS property defines if scrollbars are used to
        * display the graph. For values of 'auto' or 'scroll', the scrollbars will
        * be shown. Note that the <resizeContainer> flag is normally not used
        * together with scrollbars, as it will resize the container to match the
        * size of the graph after each change.
        *
        * Multiplicities and Validation:
        *
        * To control the possible connections in mxGraph, <getEdgeValidationError> is
        * used. The default implementation of the function uses <multiplicities>,
        * which is an array of <mxMultiplicity>. Using this class allows to establish
        * simple multiplicities, which are enforced by the graph.
        *
        * The <mxMultiplicity> uses <mxCell.is> to determine for which terminals it
        * applies. The default implementation of <mxCell.is> works with DOM nodes (XML
        * nodes) and checks if the given type parameter matches the nodeName of the
        * node (case insensitive). Optionally, an attributename and value can be
        * specified which are also checked.
        *
        * <getEdgeValidationError> is called whenever the connectivity of an edge
        * changes. It returns an empty string or an error message if the edge is
        * invalid or null if the edge is valid. If the returned string is not empty
        * then it is displayed as an error message.
        *
        * <mxMultiplicity> allows to specify the multiplicity between a terminal and
        * its possible neighbors. For example, if any rectangle may only be connected
        * to, say, a maximum of two circles you can add the following rule to
        * <multiplicities>:
        *
        * (code)
        * graph.multiplicities.push(new mxMultiplicity(
        *   true, 'rectangle', null, null, 0, 2, ['circle'],
        *   'Only 2 targets allowed',
        *   'Only shape targets allowed'));
        * (end)
        *
        * This will display the first error message whenever a rectangle is connected
        * to more than two circles and the second error message if a rectangle is
        * connected to anything but a circle.
        *
        * For certain multiplicities, such as a minimum of 1 connection, which cannot
        * be enforced at cell creation time (unless the cell is created together with
        * the connection), mxGraph offers <validate> which checks all multiplicities
        * for all cells and displays the respective error messages in an overlay icon
        * on the cells.
        *
        * If a cell is collapsed and contains validation errors, a respective warning
        * icon is attached to the collapsed cell.
        *
        * Auto-Layout:
        *
        * For automatic layout, the <getLayout> hook is provided in <mxLayoutManager>.
        * It can be overridden to return a layout algorithm for the children of a
        * given cell.
        *
        * Unconnected edges:
        *
        * The default values for all switches are designed to meet the requirements of
        * general diagram drawing applications. A very typical set of settings to
        * avoid edges that are not connected is the following:
        *
        * (code)
        * graph.setAllowDanglingEdges(false);
        * graph.setDisconnectOnMove(false);
        * (end)
        *
        * Setting the <cloneInvalidEdges> switch to true is optional. This switch
        * controls if edges are inserted after a copy, paste or clone-drag if they are
        * invalid. For example, edges are invalid if copied or control-dragged without
        * having selected the corresponding terminals and allowDanglingEdges is
        * false, in which case the edges will not be cloned if the switch is false.
        *
        * Output:
        *
        * To produce an XML representation for a diagram, the following code can be
        * used.
        *
        * (code)
        * var enc = new mxCodec(mxUtils.createXmlDocument());
        * var node = enc.encode(graph.getModel());
        * (end)
        *
        * This will produce an XML node than can be handled using the DOM API or
        * turned into a string representation using the following code:
        *
        * (code)
        * var xml = mxUtils.getXml(node);
        * (end)
        *
        * To obtain a formatted string, mxUtils.getPrettyXml can be used instead.
        *
        * This string can now be stored in a local persistent storage (for example
        * using Google Gears) or it can be passed to a backend using mxUtils.post as
        * follows. The url variable is the URL of the Java servlet, PHP page or HTTP
        * handler, depending on the server.
        *
        * (code)
        * var xmlString = encodeURIComponent(mxUtils.getXml(node));
        * mxUtils.post(url, 'xml='+xmlString, function(req)
        * {
        *   // Process server response using req of type mxXmlRequest
        * });
        * (end)
        *
        * Input:
        *
        * To load an XML representation of a diagram into an existing graph object
        * mxUtils.load can be used as follows. The url variable is the URL of the Java
        * servlet, PHP page or HTTP handler that produces the XML string.
        *
        * (code)
        * var xmlDoc = mxUtils.load(url).getXml();
        * var node = xmlDoc.documentElement;
        * var dec = new mxCodec(node.ownerDocument);
        * dec.decode(node, graph.getModel());
        * (end)
        *
        * For creating a page that loads the client and a diagram using a single
        * request please refer to the deployment examples in the backends.
        *
        * Functional dependencies:
        *
        * (see images/callgraph.png)
        *
        * Resources:
        *
        * resources/graph - Language resources for mxGraph
        *
        * Group: Events
        *
        * Event: mxEvent.ROOT
        *
        * Fires if the root in the model has changed. This event has no properties.
        *
        * Event: mxEvent.ALIGN_CELLS
        *
        * Fires between begin- and endUpdate in <alignCells>. The <code>cells</code>
        * and <code>align</code> properties contain the respective arguments that were
        * passed to <alignCells>.
        *
        * Event: mxEvent.FLIP_EDGE
        *
        * Fires between begin- and endUpdate in <flipEdge>. The <code>edge</code>
        * property contains the edge passed to <flipEdge>.
        *
        * Event: mxEvent.ORDER_CELLS
        *
        * Fires between begin- and endUpdate in <orderCells>. The <code>cells</code>
        * and <code>back</code> properties contain the respective arguments that were
        * passed to <orderCells>.
        *
        * Event: mxEvent.CELLS_ORDERED
        *
        * Fires between begin- and endUpdate in <cellsOrdered>. The <code>cells</code>
        * and <code>back</code> arguments contain the respective arguments that were
        * passed to <cellsOrdered>.
        *
        * Event: mxEvent.GROUP_CELLS
        *
        * Fires between begin- and endUpdate in <groupCells>. The <code>group</code>,
        * <code>cells</code> and <code>border</code> arguments contain the respective
        * arguments that were passed to <groupCells>.
        *
        * Event: mxEvent.UNGROUP_CELLS
        *
        * Fires between begin- and endUpdate in <ungroupCells>. The <code>cells</code>
        * property contains the array of cells that was passed to <ungroupCells>.
        *
        * Event: mxEvent.REMOVE_CELLS_FROM_PARENT
        *
        * Fires between begin- and endUpdate in <removeCellsFromParent>. The
        * <code>cells</code> property contains the array of cells that was passed to
        * <removeCellsFromParent>.
        *
        * Event: mxEvent.ADD_CELLS
        *
        * Fires between begin- and endUpdate in <addCells>. The <code>cells</code>,
        * <code>parent</code>, <code>index</code>, <code>source</code> and
        * <code>target</code> properties contain the respective arguments that were
        * passed to <addCells>.
        *
        * Event: mxEvent.CELLS_ADDED
        *
        * Fires between begin- and endUpdate in <cellsAdded>. The <code>cells</code>,
        * <code>parent</code>, <code>index</code>, <code>source</code>,
        * <code>target</code> and <code>absolute</code> properties contain the
        * respective arguments that were passed to <cellsAdded>.
        *
        * Event: mxEvent.REMOVE_CELLS
        *
        * Fires between begin- and endUpdate in <removeCells>. The <code>cells</code>
        * and <code>includeEdges</code> arguments contain the respective arguments
        * that were passed to <removeCells>.
        *
        * Event: mxEvent.CELLS_REMOVED
        *
        * Fires between begin- and endUpdate in <cellsRemoved>. The <code>cells</code>
        * argument contains the array of cells that was removed.
        *
        * Event: mxEvent.SPLIT_EDGE
        *
        * Fires between begin- and endUpdate in <splitEdge>. The <code>edge</code>
        * property contains the edge to be splitted, the <code>cells</code>,
        * <code>newEdge</code>, <code>dx</code> and <code>dy</code> properties contain
        * the respective arguments that were passed to <splitEdge>.
        *
        * Event: mxEvent.TOGGLE_CELLS
        *
        * Fires between begin- and endUpdate in <toggleCells>. The <code>show</code>,
        * <code>cells</code> and <code>includeEdges</code> properties contain the
        * respective arguments that were passed to <toggleCells>.
        *
        * Event: mxEvent.FOLD_CELLS
        *
        * Fires between begin- and endUpdate in <foldCells>. The
        * <code>collapse</code>, <code>cells</code> and <code>recurse</code>
        * properties contain the respective arguments that were passed to <foldCells>.
        *
        * Event: mxEvent.CELLS_FOLDED
        *
        * Fires between begin- and endUpdate in cellsFolded. The
        * <code>collapse</code>, <code>cells</code> and <code>recurse</code>
        * properties contain the respective arguments that were passed to
        * <cellsFolded>.
        *
        * Event: mxEvent.UPDATE_CELL_SIZE
        *
        * Fires between begin- and endUpdate in <updateCellSize>. The
        * <code>cell</code> and <code>ignoreChildren</code> properties contain the
        * respective arguments that were passed to <updateCellSize>.
        *
        * Event: mxEvent.RESIZE_CELLS
        *
        * Fires between begin- and endUpdate in <resizeCells>. The <code>cells</code>
        * and <code>bounds</code> properties contain the respective arguments that
        * were passed to <resizeCells>.
        *
        * Event: mxEvent.CELLS_RESIZED
        *
        * Fires between begin- and endUpdate in <cellsResized>. The <code>cells</code>
        * and <code>bounds</code> properties contain the respective arguments that
        * were passed to <cellsResized>.
        *
        * Event: mxEvent.MOVE_CELLS
        *
        * Fires between begin- and endUpdate in <moveCells>. The <code>cells</code>,
        * <code>dx</code>, <code>dy</code>, <code>clone</code>, <code>target</code>
        * and <code>event</code> properties contain the respective arguments that
        * were passed to <moveCells>.
        *
        * Event: mxEvent.CELLS_MOVED
        *
        * Fires between begin- and endUpdate in <cellsMoved>. The <code>cells</code>,
        * <code>dx</code>, <code>dy</code> and <code>disconnect</code> properties
        * contain the respective arguments that were passed to <cellsMoved>.
        *
        * Event: mxEvent.CONNECT_CELL
        *
        * Fires between begin- and endUpdate in <connectCell>. The <code>edge</code>,
        * <code>terminal</code> and <code>source</code> properties contain the
        * respective arguments that were passed to <connectCell>.
        *
        * Event: mxEvent.CELL_CONNECTED
        *
        * Fires between begin- and endUpdate in <cellConnected>. The
        * <code>edge</code>, <code>terminal</code> and <code>source</code> properties
        * contain the respective arguments that were passed to <cellConnected>.
        *
        * Event: mxEvent.REFRESH
        *
        * Fires after <refresh> was executed. This event has no properties.
        *
        * Event: mxEvent.CLICK
        *
        * Fires in <click> after a click event. The <code>event</code> property
        * contains the original mouse event and <code>cell</code> property contains
        * the cell under the mouse or null if the background was clicked.
        *
        * Event: mxEvent.DOUBLE_CLICK
        *
        * Fires in <dblClick> after a double click. The <code>event</code> property
        * contains the original mouse event and the <code>cell</code> property
        * contains the cell under the mouse or null if the background was clicked.
        *
        * Event: mxEvent.GESTURE
        *
        * Fires in <fireGestureEvent> after a touch gesture. The <code>event</code>
        * property contains the original gesture end event and the <code>cell</code>
        * property contains the optional cell associated with the gesture.
        *
        * Event: mxEvent.TAP_AND_HOLD
        *
        * Fires in <tapAndHold> if a tap and hold event was detected. The <code>event</code>
        * property contains the initial touch event and the <code>cell</code> property
        * contains the cell under the mouse or null if the background was clicked.
        *
        * Event: mxEvent.FIRE_MOUSE_EVENT
        *
        * Fires in <fireMouseEvent> before the mouse listeners are invoked. The
        * <code>eventName</code> property contains the event name and the
        * <code>event</code> property contains the <mxMouseEvent>.
        *
        * Event: mxEvent.SIZE
        *
        * Fires after <sizeDidChange> was executed. The <code>bounds</code> property
        * contains the new graph bounds.
        *
        * Event: mxEvent.START_EDITING
        *
        * Fires before the in-place editor starts in <startEditingAtCell>. The
        * <code>cell</code> property contains the cell that is being edited and the
        * <code>event</code> property contains the optional event argument that was
        * passed to <startEditingAtCell>.
        *
        * Event: mxEvent.EDITING_STARTED
        *
        * Fires after the in-place editor starts in <startEditingAtCell>. The
        * <code>cell</code> property contains the cell that is being edited and the
        * <code>event</code> property contains the optional event argument that was
        * passed to <startEditingAtCell>.
        *
        * Event: mxEvent.EDITING_STOPPED
        *
        * Fires after the in-place editor stops in <stopEditing>.
        *
        * Event: mxEvent.LABEL_CHANGED
        *
        * Fires between begin- and endUpdate in <cellLabelChanged>. The
        * <code>cell</code> property contains the cell, the <code>value</code>
        * property contains the new value for the cell, the <code>old</code> property
        * contains the old value and the optional <code>event</code> property contains
        * the mouse event that started the edit.
        *
        * Event: mxEvent.ADD_OVERLAY
        *
        * Fires after an overlay is added in <addCellOverlay>. The <code>cell</code>
        * property contains the cell and the <code>overlay</code> property contains
        * the <mxCellOverlay> that was added.
        *
        * Event: mxEvent.REMOVE_OVERLAY
        *
        * Fires after an overlay is removed in <removeCellOverlay> and
        * <removeCellOverlays>. The <code>cell</code> property contains the cell and
        * the <code>overlay</code> property contains the <mxCellOverlay> that was
        * removed.
        *
        * Constructor: mxGraph
        *
        * Constructs a new mxGraph in the specified container. Model is an optional
        * mxGraphModel. If no model is provided, a new mxGraphModel instance is
        * used as the model. The container must have a valid owner document prior
        * to calling this function in Internet Explorer. RenderHint is a string to
        * affect the display performance and rendering in IE, but not in SVG-based
        * browsers. The parameter is mapped to <dialect>, which may
        * be one of <mxConstants.DIALECT_SVG> for SVG-based browsers,
        * <mxConstants.DIALECT_STRICTHTML> for fastest display mode,
        * <mxConstants.DIALECT_PREFERHTML> for faster display mode,
        * <mxConstants.DIALECT_MIXEDHTML> for fast and <mxConstants.DIALECT_VML>
        * for exact display mode (slowest). The dialects are defined in mxConstants.
        * The default values are DIALECT_SVG for SVG-based browsers and
        * DIALECT_MIXED for IE.
        *
        * The possible values for the renderingHint parameter are explained below:
        *
        * fast - The parameter is based on the fact that the display performance is
        * highly improved in IE if the VML is not contained within a VML group
        * element. The lack of a group element only slightly affects the display while
        * panning, but improves the performance by almost a factor of 2, while keeping
        * the display sufficiently accurate. This also allows to render certain shapes as HTML
        * if the display accuracy is not affected, which is implemented by
        * <mxShape.isMixedModeHtml>. This is the default setting and is mapped to
        * DIALECT_MIXEDHTML.
        * faster - Same as fast, but more expensive shapes are avoided. This is
        * controlled by <mxShape.preferModeHtml>. The default implementation will
        * avoid gradients and rounded rectangles, but more significant shapes, such
        * as rhombus, ellipse, actor and cylinder will be rendered accurately. This
        * setting is mapped to DIALECT_PREFERHTML.
        * fastest - Almost anything will be rendered in Html. This allows for
        * rectangles, labels and images. This setting is mapped to
        * DIALECT_STRICTHTML.
        * exact - If accurate panning is required and if the diagram is small (up
        * to 100 cells), then this value should be used. In this mode, a group is
        * created that contains the VML. This allows for accurate panning and is
        * mapped to DIALECT_VML.
        *
        * Example:
        *
        * To create a graph inside a DOM node with an id of graph:
        * (code)
        * var container = document.getElementById('graph');
        * var graph = new mxGraph(container);
        * (end)
        *
        * container - Optional DOM node that acts as a container for the graph.
        * If this is null then the container can be initialized later using
        * <init>.
        * model - Optional <mxGraphModel> that constitutes the graph data.
        * renderHint - Optional string that specifies the display accuracy and
        * performance. Default is mxConstants.DIALECT_MIXEDHTML (for IE).
        * stylesheet - Optional <mxStylesheet> to be used in the graph.
        */
    export class mxGraph extends mxEventSource {
        /**
            * Immutable empty array instance.
            */
        readonly EMPTY_ARRAY: any[];
        /**
            * Holds the mouse event listeners. See <fireMouseEvent>.
            */
        mouseListeners: any;
        /**
            * Holds the state of the mouse button.
            */
        isMouseDown: boolean;
        /**
            * Holds the <mxGraphModel> that contains the cells to be displayed.
            */
        model: mxGraphModel;
        /**
            * Holds the <mxGraphView> that caches the <mxCellStates> for the cells.
            */
        view: mxGraphView;
        /**
            * Holds the <mxStylesheet> that defines the appearance of the cells.
            *
            *
            * Example:
            *
            * Use the following code to read a stylesheet into an existing graph.
            *
            * (code)
            * var req = mxUtils.load('stylesheet.xml');
            * var root = req.getDocumentElement();
            * var dec = new mxCodec(root.ownerDocument);
            * dec.decode(root, graph.stylesheet);
            * (end)
            */
        stylesheet: mxStylesheet;
        /**
            * Holds the <mxGraphSelectionModel> that models the current selection.
            */
        selectionModel: mxGraphSelectionModel;
        /**
            * Holds the <mxCellEditor> that is used as the in-place editing.
            */
        cellEditor: mxCellEditor;
        /**
            * Holds the <mxCellRenderer> for rendering the cells in the graph.
            */
        cellRenderer: mxCellRenderer;
        /**
            * An array of <mxMultiplicities> describing the allowed
            * connections in a graph.
            */
        multiplicities: mxMultiplicity[];
        /**
            * RenderHint as it was passed to the constructor.
            */
        renderHint: any;
        /**
            * Dialect to be used for drawing the graph. Possible values are all
            * constants in <mxConstants> with a DIALECT-prefix.
            */
        dialect: any;
        /**
            * Specifies the grid size. Default is 10.
            */
        gridSize: number;
        /**
            * Specifies if the grid is enabled. This is used in <snap>. Default is
            * true.
            */
        gridEnabled: boolean;
        /**
            * Specifies if ports are enabled. This is used in <cellConnected> to update
            * the respective style. Default is true.
            */
        portsEnabled: boolean;
        /**
            * Specifies if native double click events should be detected. Default is true.
            */
        nativeDblClickEnabled: boolean;
        /**
            * Specifies if double taps on touch-based devices should be handled as a
            * double click. Default is true.
            */
        doubleTapEnabled: boolean;
        /**
            * Specifies the timeout for double taps and non-native double clicks. Default
            * is 500 ms.
            */
        doubleTapTimeout: number;
        /**
            * Specifies the tolerance for double taps and double clicks in quirks mode.
            * Default is 25 pixels.
            */
        doubleTapTolerance: number;
        /**
            * Holds the x-coordinate of the last touch event for double tap detection.
            */
        lastTouchX: number;
        /**
            * Holds the y-coordinate of the last touch event for double tap detection.
            */
        lastTouchY: number;
        /**
            * Holds the time of the last touch event for double click detection.
            */
        lastTouchTime: number;
        /**
            * Specifies if tap and hold should be used for starting connections on touch-based
            * devices. Default is true.
            */
        tapAndHoldEnabled: boolean;
        /**
            * Specifies the time for a tap and hold. Default is 500 ms.
            */
        tapAndHoldDelay: number;
        /**
            * True if the timer for tap and hold events is running.
            */
        tapAndHoldInProgress: boolean;
        /**
            * True as long as the timer is running and the touch events
            * stay within the given <tapAndHoldTolerance>.
            */
        tapAndHoldValid: boolean;
        /**
            * Holds the x-coordinate of the intial touch event for tap and hold.
            */
        initialTouchX: number;
        /**
            * Holds the y-coordinate of the intial touch event for tap and hold.
            */
        initialTouchY: number;
        /**
            * Tolerance for a move to be handled as a single click.
            * Default is 4 pixels.
            */
        tolerance: number;
        /**
            * Value returned by <getOverlap> if <isAllowOverlapParent> returns
            * true for the given cell. <getOverlap> is used in <constrainChild> if
            * <isConstrainChild> returns true. The value specifies the
            * portion of the child which is allowed to overlap the parent.
            */
        defaultOverlap: number;
        /**
            * Specifies the default parent to be used to insert new cells.
            * This is used in <getDefaultParent>. Default is null.
            */
        defaultParent: any;
        /**
            * Specifies the alternate edge style to be used if the main control point
            * on an edge is being doubleclicked. Default is null.
            */
        alternateEdgeStyle: any;
        /**
            * Specifies the <mxImage> to be returned by <getBackgroundImage>. Default
            * is null.
            *
            * Example:
            *
            * (code)
            * var img = new mxImage('http://www.example.com/maps/examplemap.jpg', 1024, 768);
            * graph.setBackgroundImage(img);
            * graph.view.validate();
            * (end)
            */
        backgroundImage: mxImage;
        /**
            * Specifies if the background page should be visible. Default is false.
            * Not yet implemented.
            */
        pageVisible: boolean;
        /**
            * Specifies if a dashed line should be drawn between multiple pages. Default
            * is false. If you change this value while a graph is being displayed then you
            * should call <sizeDidChange> to force an update of the display.
            */
        pageBreaksVisible: boolean;
        /**
            * Specifies the color for page breaks. Default is 'gray'.
            */
        pageBreakColor: string;
        /**
            * Specifies the page breaks should be dashed. Default is true.
            */
        pageBreakDashed: boolean;
        /**
            * Specifies the minimum distance for page breaks to be visible. Default is
            * 20 (in pixels).
            */
        minPageBreakDist: number;
        /**
            * Specifies if the graph size should be rounded to the next page number in
            * <sizeDidChange>. This is only used if the graph container has scrollbars.
            * Default is false.
            */
        preferPageSize: boolean;
        /**
            * Specifies the page format for the background page. Default is
            * <mxConstants.PAGE_FORMAT_A4_PORTRAIT>. This is used as the default in
            * <mxPrintPreview> and for painting the background page if <pageVisible> is
            * true and the pagebreaks if <pageBreaksVisible> is true.
            */
        pageFormat: mxRectangle;
        /**
            * Specifies the scale of the background page. Default is 1.5.
            * Not yet implemented.
            */
        pageScale: number;
        /**
            * Specifies the return value for <isEnabled>. Default is true.
            */
        enabled: boolean;
        /**
            * Specifies if <mxKeyHandler> should invoke <escape> when the escape key
            * is pressed. Default is true.
            */
        escapeEnabled: boolean;
        /**
            * If true, when editing is to be stopped by way of selection changing,
            * data in diagram changing or other means stopCellEditing is invoked, and
            * changes are saved. This is implemented in a focus handler in
            * <mxCellEditor>. Default is true.
            */
        invokesStopCellEditing: boolean;
        /**
            * If true, pressing the enter key without pressing control or shift will stop
            * editing and accept the new value. This is used in <mxCellEditor> to stop
            * cell editing. Note: You can always use F2 and escape to stop editing.
            * Default is false.
            */
        enterStopsCellEditing: boolean;
        /**
            * Specifies if scrollbars should be used for panning in <panGraph> if
            * any scrollbars are available. If scrollbars are enabled in CSS, but no
            * scrollbars appear because the graph is smaller than the container size,
            * then no panning occurs if this is true. Default is true.
            */
        useScrollbarsForPanning: boolean;
        /**
            * Specifies the return value for <canExportCell>. Default is true.
            */
        exportEnabled: boolean;
        /**
            * Specifies the return value for <canImportCell>. Default is true.
            */
        importEnabled: boolean;
        /**
            * Specifies the return value for <isCellLocked>. Default is false.
            */
        cellsLocked: boolean;
        /**
            * Specifies the return value for <isCellCloneable>. Default is true.
            */
        cellsCloneable: boolean;
        /**
            * Specifies if folding (collapse and expand via an image icon in the graph
            * should be enabled). Default is true.
            */
        foldingEnabled: boolean;
        /**
            * Specifies the return value for <isCellEditable>. Default is true.
            */
        cellsEditable: boolean;
        /**
            * Specifies the return value for <isCellDeletable>. Default is true.
            */
        cellsDeletable: boolean;
        /**
            * Specifies the return value for <isCellMovable>. Default is true.
            */
        cellsMovable: boolean;
        /**
            * Specifies the return value for edges in <isLabelMovable>. Default is true.
            */
        edgeLabelsMovable: boolean;
        /**
            * Specifies the return value for vertices in <isLabelMovable>. Default is false.
            */
        vertexLabelsMovable: boolean;
        /**
            * Specifies the return value for <isDropEnabled>. Default is false.
            */
        dropEnabled: boolean;
        /**
            * Specifies if dropping onto edges should be enabled. This is ignored if
            * <dropEnabled> is false. If enabled, it will call <splitEdge> to carry
            * out the drop operation. Default is true.
            */
        splitEnabled: boolean;
        /**
            * Specifies the return value for <isCellResizable>. Default is true.
            */
        cellsResizable: boolean;
        /**
            * Specifies the return value for <isCellsBendable>. Default is true.
            */
        cellsBendable: boolean;
        /**
            * Specifies the return value for <isCellSelectable>. Default is true.
            */
        cellsSelectable: boolean;
        /**
            * Specifies the return value for <isCellDisconntable>. Default is true.
            */
        cellsDisconnectable: boolean;
        /**
            * Specifies if the graph should automatically update the cell size after an
            * edit. This is used in <isAutoSizeCell>. Default is false.
            */
        autoSizeCells: boolean;
        /**
            * Specifies if autoSize style should be applied when cells are added. Default is false.
            */
        autoSizeCellsOnAdd: boolean;
        /**
            * Specifies if the graph should automatically scroll if the mouse goes near
            * the container edge while dragging. This is only taken into account if the
            * container has scrollbars. Default is true.
            *
            * If you need this to work without scrollbars then set <ignoreScrollbars> to
            * true. Please consult the <ignoreScrollbars> for details. In general, with
            * no scrollbars, the use of <allowAutoPanning> is recommended.
            */
        autoScroll: boolean;
        /**
            * Specifies if the graph should automatically scroll regardless of the
            * scrollbars. This will scroll the container using positive values for
            * scroll positions (ie usually only rightwards and downwards). To avoid
            * possible conflicts with panning, set <translateToScrollPosition> to true.
            */
        ignoreScrollbars: boolean;
        /**
            * Specifies if the graph should automatically convert the current scroll
            * position to a translate in the graph view when a mouseUp event is received.
            * This can be used to avoid conflicts when using <autoScroll> and
            * <ignoreScrollbars> with no scrollbars in the container.
            */
        translateToScrollPosition: boolean;
        /**
            * Specifies if autoscrolling should be carried out via mxPanningManager even
            * if the container has scrollbars. This disables <scrollPointToVisible> and
            * uses <mxPanningManager> instead. If this is true then <autoExtend> is
            * disabled. It should only be used with a scroll buffer or when scollbars
            * are visible and scrollable in all directions. Default is false.
            */
        timerAutoScroll: boolean;
        /**
            * Specifies if panning via <panGraph> should be allowed to implement autoscroll
            * if no scrollbars are available in <scrollPointToVisible>. To enable panning
            * inside the container, near the edge, set <mxPanningManager.border> to a
            * positive value. Default is false.
            */
        allowAutoPanning: boolean;
        /**
            * Specifies if the size of the graph should be automatically extended if the
            * mouse goes near the container edge while dragging. This is only taken into
            * account if the container has scrollbars. Default is true. See <autoScroll>.
            */
        autoExtend: boolean;
        /**
            * <mxRectangle> that specifies the area in which all cells in the diagram
            * should be placed. Uses in <getMaximumGraphBounds>. Use a width or height of
            * 0 if you only want to give a upper, left corner.
            */
        maximumGraphBounds: any;
        /**
            * <mxRectangle> that specifies the minimum size of the graph. This is ignored
            * if the graph container has no scrollbars. Default is null.
            */
        minimumGraphSize: any;
        /**
            * <mxRectangle> that specifies the minimum size of the <container> if
            * <resizeContainer> is true.
            */
        minimumContainerSize: any;
        /**
            * <mxRectangle> that specifies the maximum size of the container if
            * <resizeContainer> is true.
            */
        maximumContainerSize: any;
        /**
            * Specifies if the container should be resized to the graph size when
            * the graph size has changed. Default is false.
            */
        resizeContainer: boolean;
        /**
            * Border to be added to the bottom and right side when the container is
            * being resized after the graph has been changed. Default is 0.
            */
        border: number;
        /**
            * Specifies if edges should appear in the foreground regardless of their order
            * in the model. If <keepEdgesInForeground> and <keepEdgesInBackground> are
            * both true then the normal order is applied. Default is false.
            */
        keepEdgesInForeground: boolean;
        /**
            * Specifies if edges should appear in the background regardless of their order
            * in the model. If <keepEdgesInForeground> and <keepEdgesInBackground> are
            * both true then the normal order is applied. Default is false.
            */
        keepEdgesInBackground: boolean;
        /**
            * Specifies if negative coordinates for vertices are allowed. Default is true.
            */
        allowNegativeCoordinates: boolean;
        /**
            * Specifies if a child should be constrained inside the parent bounds after a
            * move or resize of the child. Default is true.
            */
        constrainChildren: boolean;
        /**
            * Specifies if child cells with relative geometries should be constrained
            * inside the parent bounds, if <constrainChildren> is true, and/or the
            * <maximumGraphBounds>. Default is false.
            */
        constrainRelativeChildren: boolean;
        /**
            * Specifies if a parent should contain the child bounds after a resize of
            * the child. Default is true. This has precedence over <constrainChildren>.
            */
        extendParents: boolean;
        /**
            * Specifies if parents should be extended according to the <extendParents>
            * switch if cells are added. Default is true.
            */
        extendParentsOnAdd: boolean;
        /**
            * Specifies if parents should be extended according to the <extendParents>
            * switch if cells are added. Default is false for backwards compatiblity.
            */
        extendParentsOnMove: boolean;
        /**
            * Specifies the return value for <isRecursiveResize>. Default is
            * false for backwards compatiblity.
            */
        recursiveResize: boolean;
        /**
            * Specifies if the cell size should be changed to the preferred size when
            * a cell is first collapsed. Default is true.
            */
        collapseToPreferredSize: boolean;
        /**
            * Specifies the factor used for <zoomIn> and <zoomOut>. Default is 1.2
            * (120%).
            */
        zoomFactor: number;
        /**
            * Specifies if the viewport should automatically contain the selection cells
            * after a zoom operation. Default is false.
            */
        keepSelectionVisibleOnZoom: boolean;
        /**
            * Specifies if the zoom operations should go into the center of the actual
            * diagram rather than going from top, left. Default is true.
            */
        centerZoom: boolean;
        /**
            * Specifies if the scale and translate should be reset if the root changes in
            * the model. Default is true.
            */
        resetViewOnRootChange: boolean;
        /**
            * Specifies if edge control points should be reset after the resize of a
            * connected cell. Default is false.
            */
        resetEdgesOnResize: boolean;
        /**
            * Specifies if edge control points should be reset after the move of a
            * connected cell. Default is false.
            */
        resetEdgesOnMove: boolean;
        /**
            * Specifies if edge control points should be reset after the the edge has been
            * reconnected. Default is true.
            */
        resetEdgesOnConnect: boolean;
        /**
            * Specifies if loops (aka self-references) are allowed. Default is false.
            */
        allowLoops: boolean;
        /**
            * <mxEdgeStyle> to be used for loops. This is a fallback for loops if the
            * <mxConstants.STYLE_LOOP> is undefined. Default is <mxEdgeStyle.Loop>.
            */
        defaultLoopStyle: (state: any, source: any, target: any, points: any, result: any) => void;
        /**
            * Specifies if multiple edges in the same direction between the same pair of
            * vertices are allowed. Default is true.
            */
        multigraph: boolean;
        /**
            * Specifies if edges are connectable. Default is false. This overrides the
            * connectable field in edges.
            */
        connectableEdges: boolean;
        /**
            * Specifies if edges with disconnected terminals are allowed in the graph.
            * Default is true.
            */
        allowDanglingEdges: boolean;
        /**
            * Specifies if edges that are cloned should be validated and only inserted
            * if they are valid. Default is true.
            */
        cloneInvalidEdges: boolean;
        /**
            * Specifies if edges should be disconnected from their terminals when they
            * are moved. Default is true.
            */
        disconnectOnMove: boolean;
        /**
            * Specifies if labels should be visible. This is used in <getLabel>. Default
            * is true.
            */
        labelsVisible: boolean;
        /**
            * Specifies the return value for <isHtmlLabel>. Default is false.
            */
        htmlLabels: boolean;
        /**
            * Specifies if swimlanes should be selectable via the content if the
            * mouse is released. Default is true.
            */
        swimlaneSelectionEnabled: boolean;
        /**
            * Specifies if nesting of swimlanes is allowed. Default is true.
            */
        swimlaneNesting: boolean;
        /**
            * The attribute used to find the color for the indicator if the indicator
            * color is set to 'swimlane'. Default is <mxConstants.STYLE_FILLCOLOR>.
            */
        swimlaneIndicatorColorAttribute: string;
        /**
            * Holds the list of image bundles.
            */
        imageBundles: any;
        /**
            * Specifies the minimum scale to be applied in <fit>. Default is 0.1. Set this
            * to null to allow any value.
            */
        minFitScale: number;
        /**
            * Specifies the maximum scale to be applied in <fit>. Default is 8. Set this
            * to null to allow any value.
            */
        maxFitScale: number;
        /**
            * Current horizontal panning value. Default is 0.
            */
        panDx: number;
        /**
            * Current vertical panning value. Default is 0.
            */
        panDy: number;
        /**
            * Specifies the <mxImage> to indicate a collapsed state.
            * Default value is mxClient.imageBasePath + '/collapsed.gif'
            */
        collapsedImage: mxImage;
        /**
            * Specifies the <mxImage> to indicate a expanded state.
            * Default value is mxClient.imageBasePath + '/expanded.gif'
            */
        expandedImage: mxImage;
        /**
            * Specifies the <mxImage> for the image to be used to display a warning
            * overlay. See <setCellWarning>. Default value is mxClient.imageBasePath +
            * '/warning'.  The extension for the image depends on the platform. It is
            * '.png' on the Mac and '.gif' on all other platforms.
            */
        warningImage: mxImage;
        /**
            * Specifies the resource key for the error message to be displayed in
            * non-multigraphs when two vertices are already connected. If the resource
            * for this key does not exist then the value is used as the error message.
            * Default is 'alreadyConnected'.
            */
        alreadyConnectedResource: string;
        /**
            * Specifies the resource key for the warning message to be displayed when
            * a collapsed cell contains validation errors. If the resource for this
            * key does not exist then the value is used as the warning message.
            * Default is 'containsValidationErrors'.
            */
        containsValidationErrorsResource: string;
        /**
            * Specifies the resource key for the tooltip on the collapse/expand icon.
            * If the resource for this key does not exist then the value is used as
            * the tooltip. Default is 'collapse-expand'.
            */
        tooltipHandler: mxTooltipHandler;
        selectionCellsHandler: mxSelectionCellsHandler;
        connectionHandler: mxConnectionHandler;
        graphHandler: mxGraphHandler;
        panningHandler: mxPanningHandler;
        popupMenuHandler: mxPopupMenuHandler;
        graphModelChangeListener: any;
        panningManager: any;
        collapseExpandResource: string;
        container: HTMLScriptElement;
        /**
    * Constructs a new mxGraph in the specified container. 
    * 
    * Model is an optional {@link mxGraphModel}. If no model is provided, a new mxGraphModel instance is used as the model. 
    * The container must have a valid owner document prior to calling this function in Internet Explorer. 
    * RenderHint - see {@link renderingHint}
    *
    * To create a graph inside a DOM node with an id of graph:
    * @example
    * var container = document.getElementById('graph');
    * var graph = new mxGraph(container);
    * 
    * @param container - Optional DOM node that acts as a container for the graph.
    * If this is null then the container can be initialized later using
    * <init>.
    * @param model - Optional <mxGraphModel> that constitutes the graph data.
    * @param renderHint - Optional string that specifies the display accuracy and
    * performance. Default is mxConstants.DIALECT_MIXEDHTML (for IE).
    * @param stylesheet - Optional <mxStylesheet> to be used in the graph.
    */
        constructor(container?: Element, model?: mxGraphModel, renderHint?: renderingHint, stylesheet?: mxStylesheet);
        /**
            * Initializes the <container> and creates the respective datastructures.
            *
            * container - DOM node that will contain the graph display.
            */
        init(container: HTMLScriptElement): void;
        /**
            * Creates the tooltip-, panning-, connection- and graph-handler (in this
            * order). This is called in the constructor before <init> is called.
            */
        createHandlers(): void;
        /**
            * Creates and returns a new <mxTooltipHandler> to be used in this graph.
            */
        createTooltipHandler(): mxTooltipHandler;
        /**
            * Creates and returns a new <mxTooltipHandler> to be used in this graph.
            */
        createSelectionCellsHandler(): mxSelectionCellsHandler;
        /**
            * Creates and returns a new <mxConnectionHandler> to be used in this graph.
            */
        createConnectionHandler(): mxConnectionHandler;
        /**
            * Creates and returns a new <mxGraphHandler> to be used in this graph.
            */
        createGraphHandler(): mxGraphHandler;
        /**
            * Creates and returns a new <mxPanningHandler> to be used in this graph.
            */
        createPanningHandler(): mxPanningHandler;
        /**
            * Creates and returns a new <mxPopupMenuHandler> to be used in this graph.
            */
        createPopupMenuHandler(): mxPopupMenuHandler;
        /**
            * Creates a new <mxGraphSelectionModel> to be used in this graph.
            */
        createSelectionModel(): mxGraphSelectionModel;
        /**
            * Creates a new <mxGraphSelectionModel> to be used in this graph.
            */
        createStylesheet(): mxStylesheet;
        /**
            * Creates a new <mxGraphView> to be used in this graph.
            */
        createGraphView(): mxGraphView;
        /**
            * Creates a new <mxCellRenderer> to be used in this graph.
            */
        createCellRenderer(): mxCellRenderer;
        /**
            * Creates a new <mxCellEditor> to be used in this graph.
            */
        createCellEditor(): mxCellEditor;
        /**
            * Returns the <mxGraphModel> that contains the cells.
            */
        getModel(): mxGraphModel;
        /**
            * Returns the <mxGraphView> that contains the <mxCellStates>.
            */
        getView(): mxGraphView;
        /**
            * Returns the <mxStylesheet> that defines the style.
            */
        getStylesheet(): mxStylesheet;
        /**
            * Sets the <mxStylesheet> that defines the style.
            */
        setStylesheet(stylesheet: mxStylesheet): void;
        /**
            * Returns the <mxGraphSelectionModel> that contains the selection.
            */
        getSelectionModel(): mxGraphSelectionModel;
        /**
            * Sets the <mxGraphSelectionModel> that contains the selection.
            */
        setSelectionModel(selectionModel: mxGraphSelectionModel): void;
        /**
            * Returns the cells to be selected for the given array of changes.
            */
        getSelectionCellsForChanges(changes: (mxRootChange | mxChildChange | {
            cell: mxCell;
        })[]): mxCell[];
        /**
            * Called when the graph model changes. Invokes <processChange> on each
            * item of the given array to update the view accordingly.
            *
            * changes - Array that contains the individual changes.
            */
        graphModelChanged(changes: any): void;
        /**
            * Returns the cells that have been removed from the model.
            */
        getRemovedCellsForChanges(changes: any): mxCell[];
        /**
            * Processes the given change and invalidates the respective cached data
            * in <view>. This fires a <root> event if the root has changed in the
            * model.
            *
            * change - Object that represents the change on the model.
            */
        processChange(change: any): void;
        /**
            * Removes all cached information for the given cell and its descendants.
            * This is called when a cell was removed from the model.
            *
            * Paramters:
            *
            * cell - <mxCell> that was removed from the model.
            */
        removeStateForCell(cell: mxCell): void;
        /**
            * Adds an <mxCellOverlay> for the specified cell. This method fires an
            * <addoverlay> event and returns the new <mxCellOverlay>.
            *
            * cell - <mxCell> to add the overlay for.
            * overlay - <mxCellOverlay> to be added for the cell.
            */
        addCellOverlay(cell: mxCell, overlay: mxCellOverlay): mxCellOverlay;
        /**
            * Returns the array of <mxCellOverlays> for the given cell or null, if
            * no overlays are defined.
            *
            * cell - <mxCell> whose overlays should be returned.
            */
        getCellOverlays(cell: mxCell): mxCellOverlay[];
        /**
            * Removes and returns the given <mxCellOverlay> from the given cell. This
            * method fires a <removeoverlay> event. If no overlay is given, then all
            * overlays are removed using <removeOverlays>.
            *
            * cell - <mxCell> whose overlay should be removed.
            * overlay - Optional <mxCellOverlay> to be removed.
            */
        removeCellOverlay(cell: mxCell, overlay: mxCellOverlay): mxCellOverlay;
        /**
            * Removes all <mxCellOverlays> from the given cell. This method
            * fires a <removeoverlay> event for each <mxCellOverlay> and returns
            * the array of <mxCellOverlays> that was removed from the cell.
            *
            * cell - <mxCell> whose overlays should be removed
            */
        removeCellOverlays(cell: mxCell): mxCellOverlay[];
        /**
            * Removes all <mxCellOverlays> in the graph for the given cell and all its
            * descendants. If no cell is specified then all overlays are removed from
            * the graph. This implementation uses <removeCellOverlays> to remove the
            * overlays from the individual cells.
            *
            * cell - Optional <mxCell> that represents the root of the subtree to
            * remove the overlays from. Default is the root in the model.
            */
        clearCellOverlays(cell: mxCell): void;
        /**
            * Creates an overlay for the given cell using the warning and image or
            * <warningImage> and returns the new <mxCellOverlay>. The warning is
            * displayed as a tooltip in a red font and may contain HTML markup. If
            * the warning is null or a zero length string, then all overlays are
            * removed from the cell.
            *
            * Example:
            *
            * (code)
            * graph.setCellWarning(cell, '<b>Warning:</b>: Hello, World!');
            * (end)
            *
            * cell - <mxCell> whose warning should be set.
            * warning - String that represents the warning to be displayed.
            * img - Optional <mxImage> to be used for the overlay. Default is
            * <warningImage>.
            * isSelect - Optional boolean indicating if a click on the overlay
            * should select the corresponding cell. Default is false.
            */
        setCellWarning(cell: mxCell, warning: string, img?: mxImage, isSelect?: boolean): mxCellOverlay;
        /**
            * Calls <startEditingAtCell> using the given cell or the first selection
            * cell.
            *
            * evt - Optional mouse event that triggered the editing.
            */
        startEditing(evt: any): void;
        /**
            * Fires a <startEditing> event and invokes <mxCellEditor.startEditing>
            * on <editor>. After editing was started, a <editingStarted> event is
            * fired.
            *
            * cell - <mxCell> to start the in-place editor for.
            * evt - Optional mouse event that triggered the editing.
            */
        startEditingAtCell(cell: any, evt: any): void;
        /**
            * Returns the initial value for in-place editing. This implementation
            * returns <convertValueToString> for the given cell. If this function is
            * overridden, then <mxGraphModel.valueForCellChanged> should take care
            * of correctly storing the actual new value inside the user object.
            *
            * cell - <mxCell> for which the initial editing value should be returned.
            * evt - Optional mouse event that triggered the editor.
            */
        getEditingValue(cell: any, evt: any): string;
        /**
            * Stops the current editing  and fires a <editingStopped> event.
            *
            * cancel - Boolean that specifies if the current editing value
            * should be stored.
            */
        stopEditing(cancel: any): void;
        /**
            * Sets the label of the specified cell to the given value using
            * <cellLabelChanged> and fires <mxEvent.LABEL_CHANGED> while the
            * transaction is in progress. Returns the cell whose label was changed.
            *
            * cell - <mxCell> whose label should be changed.
            * value - New label to be assigned.
            * evt - Optional event that triggered the change.
            */
        labelChanged(cell: any, value: any, evt: any): any;
        /**
            * Sets the new label for a cell. If autoSize is true then
            * <cellSizeUpdated> will be called.
            *
            * In the following example, the function is extended to map changes to
            * attributes in an XML node, as shown in <convertValueToString>.
            * Alternatively, the handling of this can be implemented as shown in
            * <mxGraphModel.valueForCellChanged> without the need to clone the
            * user object.
            *
            * (code)
            * var graphCellLabelChanged = graph.cellLabelChanged;
            * graph.cellLabelChanged = function(cell, newValue, autoSize)
            * {
            * 	// Cloned for correct undo/redo
            * 	var elt = cell.value.cloneNode(true);
            *  elt.setAttribute('label', newValue);
            *
            *  newValue = elt;
            *  graphCellLabelChanged.apply(this, arguments);
            * };
            * (end)
            *
            * cell - <mxCell> whose label should be changed.
            * value - New label to be assigned.
            * autoSize - Boolean that specifies if <cellSizeUpdated> should be called.
            */
        cellLabelChanged(cell: any, value: any, autoSize: any): void;
        /**
            * Processes an escape keystroke.
            *
            * evt - Mouseevent that represents the keystroke.
            */
        escape(evt: any): void;
        /**
            * Processes a singleclick on an optional cell and fires a <click> event.
            * The click event is fired initially. If the graph is enabled and the
            * event has not been consumed, then the cell is selected using
            * <selectCellForEvent> or the selection is cleared using
            * <clearSelection>. The events consumed state is set to true if the
            * corresponding <mxMouseEvent> has been consumed.
            *
            * To handle a click event, use the following code.
            *
            * (code)
            * graph.addListener(mxEvent.CLICK, function(sender, evt)
            * {
            *   var e = evt.getProperty('event'); // mouse event
            *   var cell = evt.getProperty('cell'); // cell may be null
            *
            *   if (cell != null)
            *   {
            *     // Do something useful with cell and consume the event
            *     evt.consume();
            *   }
            * });
            * (end)
            *
            * me - <mxMouseEvent> that represents the single click.
            */
        click(me: any): void;
        /**
            * Processes a doubleclick on an optional cell and fires a <dblclick>
            * event. The event is fired initially. If the graph is enabled and the
            * event has not been consumed, then <edit> is called with the given
            * cell. The event is ignored if no cell was specified.
            *
            * Example for overriding this method.
            *
            * (code)
            * graph.dblClick = function(evt, cell)
            * {
            *   var mxe = new mxEventObject(mxEvent.DOUBLE_CLICK, 'event', evt, 'cell', cell);
            *   this.fireEvent(mxe);
            *
            *   if (this.isEnabled() && !mxEvent.isConsumed(evt) && !mxe.isConsumed())
            *   {
            * 	   mxUtils.alert('Hello, World!');
            *     mxe.consume();
            *   }
            * }
            * (end)
            *
            * Example listener for this event.
            *
            * (code)
            * graph.addListener(mxEvent.DOUBLE_CLICK, function(sender, evt)
            * {
            *   var cell = evt.getProperty('cell');
            *   // do something with the cell and consume the
            *   // event to prevent in-place editing from start
            * });
            * (end)
            *
            * evt - Mouseevent that represents the doubleclick.
            * cell - Optional <mxCell> under the mousepointer.
            */
        dblClick(evt: any, cell: any): void;
        /**
            * Handles the <mxMouseEvent> by highlighting the <mxCellState>.
            *
            * me - <mxMouseEvent> that represents the touch event.
            * state - Optional <mxCellState> that is associated with the event.
            */
        tapAndHold(me: any): void;
        /**
            * Scrolls the graph to the given point, extending the graph container if
            * specified.
            */
        scrollPointToVisible(x: any, y: any, extend: any, border: any): void;
        /**
            * Creates and returns an <mxPanningManager>.
            */
        createPanningManager(): any;
        /**
            * Returns the size of the border and padding on all four sides of the
            * container. The left, top, right and bottom borders are stored in the x, y,
            * width and height of the returned <mxRectangle>, respectively.
            */
        getBorderSizes(): mxRectangle;
        /**
            * Returns the preferred size of the background page if <preferPageSize> is true.
            */
        getPreferredPageSize(bounds: any, width: any, height: any): mxRectangle;
        /**
         * Scales the graph such that the complete diagram fits into <container> and
         * returns the current scale in the view. To fit an initial graph prior to
         * rendering, set <mxGraphView.rendering> to false prior to changing the model
         * and execute the following after changing the model.
         * 
         * @example
         * graph.fit();
         * graph.view.rendering = true;
         * graph.refresh();
         * 
         * @example <caption>To fit and center the graph, the following code can be used.</caption>
         * var margin = 2;
         * var max = 3;
         * 
         * var bounds = graph.getGraphBounds();
         * var cw = graph.container.clientWidth - margin;
         * var ch = graph.container.clientHeight - margin;
         * var w = bounds.width / graph.view.scale;
         * var h = bounds.height / graph.view.scale;
         * var s = Math.min(max, Math.min(cw / w, ch / h));
         * 
         * graph.view.scaleAndTranslate(s,
         *   (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
         *   (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);
         * 
         * @param border - Optional number that specifies the border. Default is <border>.
         * @param keepOrigin - Optional boolean that specifies if the translate should be
         * changed. Default is false.
         * @param margin - Optional margin in pixels. Default is 0.
         * @param enabled - Optional boolean that specifies if the scale should be set or
         * just returned. Default is true.
         * @param ignoreWidth - Optional boolean that specifies if the width should be
         * ignored. Default is false.
         * @param ignoreHeight - Optional boolean that specifies if the height should be
         * ignored. Default is false.
         * @param maxHeight - Optional maximum height.
         */
        fit(border?: number, keepOrigin?: boolean, margin?: number, enabled?: boolean, ignoreWidth?: boolean, ignoreHeight?: boolean, maxHeight?: number): number;
        /**
            * Called when the size of the graph has changed. This implementation fires
            * a <size> event after updating the clipping region of the SVG element in
            * SVG-bases browsers.
            */
        sizeDidChange(): void;
        /**
            * Resizes the container for the given graph width and height.
            */
        doResizeContainer(width: any, height: any): void;
        /**
            * Invokes from <sizeDidChange> to redraw the page breaks.
            *
            * visible - Boolean that specifies if page breaks should be shown.
            * width - Specifies the width of the container in pixels.
            * height - Specifies the height of the container in pixels.
            */
        updatePageBreaks(visible: any, width: any, height: any): void;
        /**
            * Returns an array of key, value pairs representing the cell style for the
            * given cell. If no string is defined in the model that specifies the
            * style, then the default style for the cell is returned or <EMPTY_ARRAY>,
            * if not style can be found. Note: You should try and get the cell state
            * for the given cell and use the cached style in the state before using
            * this method.
            *
            * cell - <mxCell> whose style should be returned as an array.
            */
        getCellStyle(cell: any): any;
        /**
            * Tries to resolve the value for the image style in the image bundles and
            * turns short data URIs as defined in mxImageBundle to data URIs as
            * defined in RFC 2397 of the IETF.
            */
        postProcessCellStyle(style: any): any;
        /**
            * Sets the style of the specified cells. If no cells are given, then the
            * selection cells are changed.
            *
            * style - String representing the new style of the cells.
            * cells - Optional array of <mxCells> to set the style for. Default is the
            * selection cells.
            */
        setCellStyle(style: any, cells: any): void;
        /**
            * Toggles the boolean value for the given key in the style of the given cell
            * and returns the new value as 0 or 1. If no cell is specified then the
            * selection cell is used.
            *
            * Parameter:
            *
            * key - String representing the key for the boolean value to be toggled.
            * defaultValue - Optional boolean default value if no value is defined.
            * Default is false.
            * cell - Optional <mxCell> whose style should be modified. Default is
            * the selection cell.
            */
        toggleCellStyle(key: any, defaultValue: any, cell: any): any;
        /**
            * Toggles the boolean value for the given key in the style of the given cells
            * and returns the new value as 0 or 1. If no cells are specified, then the
            * selection cells are used. For example, this can be used to toggle
            * <mxConstants.STYLE_ROUNDED> or any other style with a boolean value.
            *
            * Parameter:
            *
            * key - String representing the key for the boolean value to be toggled.
            * defaultValue - Optional boolean default value if no value is defined.
            * Default is false.
            * cells - Optional array of <mxCells> whose styles should be modified.
            * Default is the selection cells.
            */
        toggleCellStyles(key: any, defaultValue: any, cells: any): any;
        /**
            * Sets the key to value in the styles of the given cells. This will modify
            * the existing cell styles in-place and override any existing assignment
            * for the given key. If no cells are specified, then the selection cells
            * are changed. If no value is specified, then the respective key is
            * removed from the styles.
            *
            * key - String representing the key to be assigned.
            * value - String representing the new value for the key.
            * cells - Optional array of <mxCells> to change the style for. Default is
            * the selection cells.
            */
        setCellStyles(key: any, value: any, cells: any): void;
        /**
            * Toggles the given bit for the given key in the styles of the specified
            * cells.
            *
            * key - String representing the key to toggle the flag in.
            * flag - Integer that represents the bit to be toggled.
            * cells - Optional array of <mxCells> to change the style for. Default is
            * the selection cells.
            */
        toggleCellStyleFlags(key: any, flag: any, cells: any): void;
        /**
            * Sets or toggles the given bit for the given key in the styles of the
            * specified cells.
            *
            * key - String representing the key to toggle the flag in.
            * flag - Integer that represents the bit to be toggled.
            * value - Boolean value to be used or null if the value should be toggled.
            * cells - Optional array of <mxCells> to change the style for. Default is
            * the selection cells.
            */
        setCellStyleFlags(key: any, flag: any, value: any, cells: any): void;
        /**
            * Aligns the given cells vertically or horizontally according to the given
            * alignment using the optional parameter as the coordinate.
            *
            * align - Specifies the alignment. Possible values are all constants in
            * mxConstants with an ALIGN prefix.
            * cells - Array of <mxCells> to be aligned.
            * param - Optional coordinate for the alignment.
            */
        alignCells(align: any, cells: any, param: any): any;
        /**
            * Toggles the style of the given edge between null (or empty) and
            * <alternateEdgeStyle>. This method fires <mxEvent.FLIP_EDGE> while the
            * transaction is in progress. Returns the edge that was flipped.
            *
            * Here is an example that overrides this implementation to invert the
            * value of <mxConstants.STYLE_ELBOW> without removing any existing styles.
            *
            * (code)
            * graph.flipEdge = function(edge)
            * {
            *   if (edge != null)
            *   {
            *     var state = this.view.getState(edge);
            *     var style = (state != null) ? state.style : this.getCellStyle(edge);
            *
            *     if (style != null)
            *     {
            *       var elbow = mxUtils.getValue(style, mxConstants.STYLE_ELBOW,
            *           mxConstants.ELBOW_HORIZONTAL);
            *       var value = (elbow == mxConstants.ELBOW_HORIZONTAL) ?
            *           mxConstants.ELBOW_VERTICAL : mxConstants.ELBOW_HORIZONTAL;
            *       this.setCellStyles(mxConstants.STYLE_ELBOW, value, [edge]);
            *     }
            *   }
            * };
            * (end)
            *
            * edge - <mxCell> whose style should be changed.
            */
        flipEdge(edge: any): any;
        /**
            * Adds the specified <mxImageBundle>.
            */
        addImageBundle(bundle: any): void;
        /**
            * Removes the specified <mxImageBundle>.
            */
        removeImageBundle(bundle: any): void;
        /**
            * Searches all <imageBundles> for the specified key and returns the value
            * for the first match or null if the key is not found.
            */
        getImageFromBundles(key: any): any;
        /**
            * Moves the given cells to the front or back. The change is carried out
            * using <cellsOrdered>. This method fires <mxEvent.ORDER_CELLS> while the
            * transaction is in progress.
            *
            * back - Boolean that specifies if the cells should be moved to back.
            * cells - Array of <mxCells> to move to the background. If null is
            * specified then the selection cells are used.
            */
        orderCells(back: any, cells: any): any;
        /**
            * Moves the given cells to the front or back. This method fires
            * <mxEvent.CELLS_ORDERED> while the transaction is in progress.
            *
            * cells - Array of <mxCells> whose order should be changed.
            * back - Boolean that specifies if the cells should be moved to back.
            */
        cellsOrdered(cells: any, back: any): void;
        /**
            * Adds the cells into the given group. The change is carried out using
            * <cellsAdded>, <cellsMoved> and <cellsResized>. This method fires
            * <mxEvent.GROUP_CELLS> while the transaction is in progress. Returns the
            * new group. A group is only created if there is at least one entry in the
            * given array of cells.
            *
            * group - <mxCell> that represents the target group. If null is specified
            * then a new group is created using <createGroupCell>.
            * border - Optional integer that specifies the border between the child
            * area and the group bounds. Default is 0.
            * cells - Optional array of <mxCells> to be grouped. If null is specified
            * then the selection cells are used.
            */
        groupCells(group: any, border: any, cells: any): any;
        /**
            * Returns the cells with the same parent as the first cell
            * in the given array.
            */
        getCellsForGroup(cells: any): any[];
        /**
            * Returns the bounds to be used for the given group and children.
            */
        getBoundsForGroup(group: any, children: any, border: any): mxRectangle;
        /**
            * Hook for creating the group cell to hold the given array of <mxCells> if
            * no group cell was given to the <group> function.
            *
            * The following code can be used to set the style of new group cells.
            *
            * (code)
            * var graphCreateGroupCell = graph.createGroupCell;
            * graph.createGroupCell = function(cells)
            * {
            *   var group = graphCreateGroupCell.apply(this, arguments);
            *   group.setStyle('group');
            *
            *   return group;
            * };
            */
        createGroupCell(cells: any): mxCell;
        /**
            * Ungroups the given cells by moving the children the children to their
            * parents parent and removing the empty groups. Returns the children that
            * have been removed from the groups.
            *
            * cells - Array of cells to be ungrouped. If null is specified then the
            * selection cells are used.
            */
        ungroupCells(cells: any): any[];
        /**
            * Hook to remove the groups after <ungroupCells>.
            *
            * cells - Array of <mxCells> that were ungrouped.
            */
        removeCellsAfterUngroup(cells: any): void;
        /**
            * Removes the specified cells from their parents and adds them to the
            * default parent. Returns the cells that were removed from their parents.
            *
            * cells - Array of <mxCells> to be removed from their parents.
            */
        removeCellsFromParent(cells: any): any;
        /**
            * Updates the bounds of the given groups to include all children and returns
            * the passed-in cells. Call this with the groups in parent to child order,
            * top-most group first, the cells are processed in reverse order and cells
            * with no children are ignored.
            *
            * cells - The groups whose bounds should be updated. If this is null, then
            * the selection cells are used.
            * border - Optional border to be added in the group. Default is 0.
            * moveGroup - Optional boolean that allows the group to be moved. Default
            * is false.
            * topBorder - Optional top border to be added in the group. Default is 0.
            * rightBorder - Optional top border to be added in the group. Default is 0.
            * bottomBorder - Optional top border to be added in the group. Default is 0.
            * leftBorder - Optional top border to be added in the group. Default is 0.
            */
        updateGroupBounds(cells: any, border: any, moveGroup: any, topBorder: any, rightBorder: any, bottomBorder: any, leftBorder: any): any;
        /**
            * Returns the bounding box for the given array of <mxCells>. The bounding box for
            * each cell and its descendants is computed using <mxGraphView.getBoundingBox>.
            *
            * cells - Array of <mxCells> whose bounding box should be returned.
            */
        getBoundingBox(cells: any): any;
        /**
            * Returns the clones for the given cells. The clones are created recursively
            * using <mxGraphModel.cloneCells>. If the terminal of an edge is not in the
            * given array, then the respective end is assigned a terminal point and the
            * terminal is removed.
            *
            * @param cells - Array of <mxCells> to be cloned.
            * @param allowInvalidEdges - Optional boolean that specifies if invalid edges
            * should be cloned. Default is true.
            * @param mapping - Optional mapping for existing clones.
            */
        cloneCells(cells: mxCell[], allowInvalidEdges?: boolean, mapping?: any): any;
        /**
            * Adds a new vertex into the given parent {@link mxCell} using value as the user
            * object and the given coordinates as the {@link mxGeometry} of the new vertex.
            * The id and style are used for the respective properties of the new
            * {@link mxCell}, which is returned.
            *
            * When adding new vertices from a mouse event, one should take into
            * account the offset of the graph container and the scale and translation
            * of the view in order to find the correct unscaled, untranslated
            * coordinates using {@link mxGraph.getPointForEvent} as follows:
            *
            * (code)
            * var pt = graph.getPointForEvent(evt);
            * var parent = graph.getDefaultParent();
            * graph.insertVertex(parent, null,
            * 			'Hello, World!', x, y, 220, 30);
            * (end)
            *
            * For adding image cells, the style parameter can be assigned as
            *
            * (code)
            * stylename;image=imageUrl
            * (end)
            *
            * See {@link mxGraph} for more information on using images.
            *
            * @param {mxCell} parent Specifies the parent of the new vertex.
            * @param {?string} id Optional string that defines the Id of the new vertex.
            * @param {Object} value User defined data object.
            * @param {number} x Integer that defines the x coordinate of the vertex.
            * @param {number} y Integer that defines the y coordinate of the vertex.
            * @param {number} width Integer that defines the width of the vertex.
            * @param {number} height Integer that defines the height of the vertex.
            * @param {string} [style] Optional string that defines the cell style.
            * @param {boolean} [relative] Optional boolean that specifies if the geometry is relative.
            * Default is false.
            */
        insertVertex(parent: mxCell, id: string, value: Object, x: number, y: number, width: number, height: number, style?: string, relative?: boolean): mxCell;
        /**
            * Adds a new edge into the given parent {@link mxCell} using value as the user
            * object and the given source and target as the terminals of the new edge.
            * The id and style are used for the respective properties of the new
            * {@link mxCell}, which is returned.
            *
            * @param {mxCell} parent specifies the parent of the new edge.
            * @param {?string} id Optional string that defines the Id of the new edge.
            * @param {Object} value User defined data object.
            * @param {mxCell} source Source of the edge.
            * @param {mxCell} target Target of the edge.
            * @param {string} [style] Optional string that defines the cell style.
            */
        insertEdge(parent: mxCell, id: string, value: Object, source: mxCell, target: mxCell, style?: string): mxCell;
        /**
            * Adds the edge to the parent and connects it to the given source and
            * target terminals. This is a shortcut method. Returns the edge that was
            * added.
            *
            * @param edge - <mxCell> to be inserted into the given parent.
            * @param parent - <mxCell> that represents the new parent. If no parent is
            * given then the default parent is used.
            * @param source - Optional <mxCell> that represents the source terminal.
            * @param target - Optional <mxCell> that represents the target terminal.
            * @param index - Optional index to insert the cells at. Default is to append.
            */
        addEdge(edge: mxCell, parent: mxCell, source?: mxCell, target?: mxCell, index?: number): mxCell;
        /**
            * Adds the cell to the parent and connects it to the given source and
            * target terminals. This is a shortcut method. Returns the cell that was
            * added.
            *
            * @param cell - <mxCell> to be inserted into the given parent.
            * @param parent - <mxCell> that represents the new parent. If no parent is
            * given then the default parent is used.
            * @param index - Optional index to insert the cells at. Default is to append.
            * @param source - Optional <mxCell> that represents the source terminal.
            * @param target - Optional <mxCell> that represents the target terminal.
            */
        addCell(cell: mxCell, parent?: mxCell, index?: number, source?: mxCell, target?: mxCell): mxCell;
        /**
            * Adds the cells to the parent at the given index, connecting each cell to
            * the optional source and target terminal. The change is carried out using
            * <cellsAdded>. This method fires <mxEvent.ADD_CELLS> while the
            * transaction is in progress. Returns the cells that were added.
            *
            * @param cells - Array of <mxCells> to be inserted.
            * @param parent - <mxCell> that represents the new parent. If no parent is
            * given then the default parent is used.
            * @param index - Optional index to insert the cells at. Default is to append.
            * @param source - Optional source <mxCell> for all inserted cells.
            * @param target - Optional target <mxCell> for all inserted cells.
            */
        addCells(cells: mxCell[], parent: mxCell, index?: number, source?: mxCell, target?: mxCell): mxCell[];
        /**
            * Resizes the specified cell to just fit around the its label and/or children
            *
            * @param cell - <mxCells> to be resized.
            * @param recurse - Optional boolean which specifies if all descendants should be
            * autosized. Default is true.
            */
        autoSizeCell(cell: mxCell, recurse?: boolean): void;
        /**
            * Removes the given cells from the graph including all connected edges if
            * includeEdges is true. The change is carried out using <cellsRemoved>.
            * This method fires <mxEvent.REMOVE_CELLS> while the transaction is in
            * progress. The removed cells are returned as an array.
            *
            * cells - Array of <mxCells> to remove. If null is specified then the
            * selection cells which are deletable are used.
            * includeEdges - Optional boolean which specifies if all connected edges
            * should be removed as well. Default is true.
            */
        removeCells(cells?: any, includeEdges?: any): any;
        /**
            * Removes the given cells from the model. This method fires
            * <mxEvent.CELLS_REMOVED> while the transaction is in progress.
            *
            * cells - Array of <mxCells> to remove.
            */
        cellsRemoved(cells: any): void;
        /**
            * Splits the given edge by adding the newEdge between the previous source
            * and the given cell and reconnecting the source of the given edge to the
            * given cell. This method fires <mxEvent.SPLIT_EDGE> while the transaction
            * is in progress. Returns the new edge that was inserted.
            *
            * edge - <mxCell> that represents the edge to be splitted.
            * cells - <mxCells> that represents the cells to insert into the edge.
            * newEdge - <mxCell> that represents the edge to be inserted.
            * dx - Optional integer that specifies the vector to move the cells.
            * dy - Optional integer that specifies the vector to move the cells.
            */
        splitEdge(edge: any, cells: any, newEdge: any, dx: any, dy: any): any;
        /**
            * Sets the visible state of the specified cells and all connected edges
            * if includeEdges is true. The change is carried out using <cellsToggled>.
            * This method fires <mxEvent.TOGGLE_CELLS> while the transaction is in
            * progress. Returns the cells whose visible state was changed.
            *
            * show - Boolean that specifies the visible state to be assigned.
            * cells - Array of <mxCells> whose visible state should be changed. If
            * null is specified then the selection cells are used.
            * includeEdges - Optional boolean indicating if the visible state of all
            * connected edges should be changed as well. Default is true.
            */
        toggleCells(show: any, cells: any, includeEdges: any): any;
        /**
            * Sets the visible state of the specified cells.
            *
            * cells - Array of <mxCells> whose visible state should be changed.
            * show - Boolean that specifies the visible state to be assigned.
            */
        cellsToggled(cells: any, show: any): void;
        /**
            * Sets the collapsed state of the specified cells and all descendants
            * if recurse is true. The change is carried out using <cellsFolded>.
            * This method fires <mxEvent.FOLD_CELLS> while the transaction is in
            * progress. Returns the cells whose collapsed state was changed.
            *
            * @param collapsed - Boolean indicating the collapsed state to be assigned.
            * @param recurse - Optional boolean indicating if the collapsed state of all
            * descendants should be set. Default is false.
            * @param cells - Array of <mxCells> whose collapsed state should be set. If
            * null is specified then the foldable selection cells are used.
            * @param checkFoldable - Optional boolean indicating of isCellFoldable should be
            * checked. Default is false.
            * @param evt - Optional native event that triggered the invocation.
            */
        foldCells(collapse: boolean, recurse?: boolean, cells?: mxCell[], checkFoldable?: boolean, evt?: Event): mxCell[];
        /**
            * Sets the collapsed state of the specified cells. This method fires
            * <mxEvent.CELLS_FOLDED> while the transaction is in progress. Returns the
            * cells whose collapsed state was changed.
            *
            * @param cells - Array of <mxCells> whose collapsed state should be set.
            * @param collapsed - Boolean indicating the collapsed state to be assigned.
            * @param recurse - Boolean indicating if the collapsed state of all descendants
            * should be set.
            * @param checkFoldable - Optional boolean indicating of isCellFoldable should be
            * checked. Default is false.
            */
        cellsFolded(cells: mxCell[], collapse: boolean, recurse: boolean, checkFoldable?: boolean): void;
        /**
            * Swaps the alternate and the actual bounds in the geometry of the given
            * cell invoking <updateAlternateBounds> before carrying out the swap.
            *
            * cell - <mxCell> for which the bounds should be swapped.
            * willCollapse - Boolean indicating if the cell is going to be collapsed.
            */
        swapBounds(cell: any, willCollapse: any): void;
        /**
            * Updates or sets the alternate bounds in the given geometry for the given
            * cell depending on whether the cell is going to be collapsed. If no
            * alternate bounds are defined in the geometry and
            * <collapseToPreferredSize> is true, then the preferred size is used for
            * the alternate bounds. The top, left corner is always kept at the same
            * location.
            *
            * cell - <mxCell> for which the geometry is being udpated.
            * g - <mxGeometry> for which the alternate bounds should be updated.
            * willCollapse - Boolean indicating if the cell is going to be collapsed.
            */
        updateAlternateBounds(cell: any, geo: any, willCollapse: any): void;
        /**
            * Returns an array with the given cells and all edges that are connected
            * to a cell or one of its descendants.
            */
        addAllEdges(cells: any): any;
        /**
            * Returns all edges connected to the given cells or its descendants.
            */
        getAllEdges(cells: any): any[];
        /**
            * Updates the size of the given cell in the model using <cellSizeUpdated>.
            * This method fires <mxEvent.UPDATE_CELL_SIZE> while the transaction is in
            * progress. Returns the cell whose size was updated.
            *
            * @param cell - <mxCell> whose size should be updated.
            */
        updateCellSize(cell: mxCell, ignoreChildren?: boolean): mxCell;
        /**
            * Updates the size of the given cell in the model using
            * <getPreferredSizeForCell> to get the new size.
            *
            * cell - <mxCell> for which the size should be changed.
            */
        cellSizeUpdated(cell: any, ignoreChildren: any): void;
        /**
            * Returns the preferred width and height of the given <mxCell> as an
            * <mxRectangle>. To implement a minimum width, add a new style eg.
            * minWidth in the vertex and override this method as follows.
            *
            * (code)
            * var graphGetPreferredSizeForCell = graph.getPreferredSizeForCell;
            * graph.getPreferredSizeForCell = function(cell)
            * {
            *   var result = graphGetPreferredSizeForCell.apply(this, arguments);
            *   var style = this.getCellStyle(cell);
            *
            *   if (style['minWidth'] > 0)
            *   {
            *     result.width = Math.max(style['minWidth'], result.width);
            *   }
            *
            *   return result;
            * };
            * (end)
            *
            * cell - <mxCell> for which the preferred size should be returned.
            */
        getPreferredSizeForCell(cell: any): any;
        /**
            * Sets the bounds of the given cell using <resizeCells>. Returns the
            * cell which was passed to the function.
            *
            * @param cell - <mxCell> whose bounds should be changed.
            * @param bounds - <mxRectangle> that represents the new bounds.
            * @param recurse - Recursively resize children
            */
        resizeCell(cell: mxCell, bounds: mxRectangle, recurse?: any): mxCell;
        /**
            * Sets the bounds of the given cells and fires a <mxEvent.RESIZE_CELLS>
            * event while the transaction is in progress. Returns the cells which
            * have been passed to the function.
            *
            * @param cells - Array of <mxCells> whose bounds should be changed.
            * @param bounds - Array of <mxRectangles> that represent the new bounds.
            * @param recurse - Recursively resize children
            */
        resizeCells(cells: mxCell[], bounds: mxRectangle[], recurse?: any): mxCell[];
        /**
            * Sets the bounds of the given cells and fires a <mxEvent.CELLS_RESIZED>
            * event. If <extendParents> is true, then the parent is extended if a
            * child size is changed so that it overlaps with the parent.
            *
            * The following example shows how to control group resizes to make sure
            * that all child cells stay within the group.
            *
            * @example
            * graph.addListener(mxEvent.CELLS_RESIZED, function(sender, evt)
            * {
            *   var cells = evt.getProperty('cells');
            *
            *   if (cells != null)
            *   {
            *     for (var i = 0; i < cells.length; i++)
            *     {
            *       if (graph.getModel().getChildCount(cells[i]) > 0)
            *       {
            *         var geo = graph.getCellGeometry(cells[i]);
            *
            *         if (geo != null)
            *         {
            *           var children = graph.getChildCells(cells[i], true, true);
            *           var bounds = graph.getBoundingBoxFromGeometry(children, true);
            *
            *           geo = geo.clone();
            *           geo.width = Math.max(geo.width, bounds.width);
            *           geo.height = Math.max(geo.height, bounds.height);
            *
            *           graph.getModel().setGeometry(cells[i], geo);
            *         }
            *       }
            *     }
            *   }
            * });
            *
            * @param cells - Array of <mxCells> whose bounds should be changed.
            * @param bounds - Array of <mxRectangles> that represent the new bounds.
            * @param recurse - Optional boolean that specifies if the children should be resized.
            */
        cellsResized(cells: mxCell[], bounds: mxRectangle[], recurse?: boolean): void;
        /**
            * Resizes the parents recursively so that they contain the complete area
            * of the resized child cell.
            *
            * @param cell - <mxCell> whose bounds should be changed.
            * @param bounds - <mxRectangles> that represent the new bounds.
            * @param ignoreRelative - Boolean that indicates if relative cells should be ignored.
            * @param recurse - Optional boolean that specifies if the children should be resized.
            */
        cellResized(cell: mxCell, bounds: mxRectangle, ignoreRelative: boolean, recurse: boolean): void;
        /**
            * Resizes the child cells of the given cell for the given new geometry with
            * respect to the current geometry of the cell.
            *
            * @param cell - <mxCell> that has been resized.
            * @param newGeo - <mxGeometry> that represents the new bounds.
            */
        resizeChildCells(cell: mxCell, newGeo: mxGeometry): void;
        /**
            * Constrains the children of the given cell using <constrainChild>.
            *
            * cell - <mxCell> that has been resized.
            */
        constrainChildCells(cell: any): void;
        /**
            * Scales the points, position and size of the given cell according to the
            * given vertical and horizontal scaling factors.
            *
            * @param cell - <mxCell> whose geometry should be scaled.
            * @param dx - Horizontal scaling factor.
            * @param dy - Vertical scaling factor.
            * @param recurse - Boolean indicating if the child cells should be scaled.
            */
        scaleCell(cell: mxCell, dx: number, dy: number, recurse: boolean): void;
        /**
            * Resizes the parents recursively so that they contain the complete area
            * of the resized child cell.
            *
            * @param cell - <mxCell> that has been resized.
            */
        extendParent(cell: mxCell): void;
        /**
            * Clones and inserts the given cells into the graph using the move
            * method and returns the inserted cells. This shortcut is used if
            * cells are inserted via datatransfer.
            *
            * @param cells - Array of <mxCells> to be imported.
            * @param dx - Integer that specifies the x-coordinate of the vector. Default is 0.
            * @param dy - Integer that specifies the y-coordinate of the vector. Default is 0.
            * @param target - <mxCell> that represents the new parent of the cells.
            * @param evt - Mouseevent that triggered the invocation.
            * @param mapping - Optional mapping for existing clones.
            */
        importCells(cells: mxCell[], dx: number, dy: number, target: mxCell, evt: Event, mapping: any): mxCell[];
        /**
            * Moves or clones the specified cells and moves the cells or clones by the
            * given amount, adding them to the optional target cell. The evt is the
            * mouse event as the mouse was released. The change is carried out using
            * <cellsMoved>. This method fires <mxEvent.MOVE_CELLS> while the
            * transaction is in progress. Returns the cells that were moved.
            *
            * Use the following code to move all cells in the graph.
            *
            * @example graph.moveCells(graph.getChildCells(null, true, true), 10, 10);
            *
            * @param cells - Array of <mxCells> to be moved, cloned or added to the target.
            * @param dx - Integer that specifies the x-coordinate of the vector. Default is 0.
            * @param dy - Integer that specifies the y-coordinate of the vector. Default is 0.
            * @param clone - Boolean indicating if the cells should be cloned. Default is false.
            * @param target - <mxCell> that represents the new parent of the cells.
            * @param evt - Mouseevent that triggered the invocation.
            * @param mapping - Optional mapping for existing clones.
            */
        moveCells(cells: mxCell[], dx?: number, dy?: number, clone?: boolean, target?: mxCell, evt?: Event, mapping?: any): mxCell[];
        /**
            * Moves the specified cells by the given vector, disconnecting the cells
            * using disconnectGraph is disconnect is true. This method fires
            * <mxEvent.CELLS_MOVED> while the transaction is in progress.
            */
        cellsMoved(cells: mxCell[], dx: number, dy: number, disconnect?: boolean, constrain?: boolean, extend?: boolean): void;
        /**
            * Translates the geometry of the given cell and stores the new,
            * translated geometry in the model as an atomic change.
            */
        translateCell(cell: any, dx: any, dy: any): void;
        /**
            * Returns the <mxRectangle> inside which a cell is to be kept.
            *
            * cell - <mxCell> for which the area should be returned.
            */
        getCellContainmentArea(cell: any): mxRectangle;
        /**
            * Returns the bounds inside which the diagram should be kept as an
            * <mxRectangle>.
            */
        getMaximumGraphBounds(): any;
        /**
            * Keeps the given cell inside the bounds returned by
            * <getCellContainmentArea> for its parent, according to the rules defined by
            * <getOverlap> and <isConstrainChild>. This modifies the cell's geometry
            * in-place and does not clone it.
            *
            * cells - <mxCell> which should be constrained.
            * sizeFirst - Specifies if the size should be changed first. Default is true.
            */
        constrainChild(cell: mxCell, sizeFirst?: boolean): void;
        /**
            * Resets the control points of the edges that are connected to the given
            * cells if not both ends of the edge are in the given cells array.
            *
            * cells - Array of <mxCells> for which the connected edges should be
            * reset.
            */
        resetEdges(cells: mxCell[]): void;
        /**
            * Resets the control points of the given edge.
            *
            * edge - <mxCell> whose points should be reset.
            */
        resetEdge(edge: any): any;
        /**
            * Returns the constraint used to connect to the outline of the given state.
            */
        getOutlineConstraint(point: any, terminalState: any, me: any): mxConnectionConstraint;
        /**
            * Returns an array of all <mxConnectionConstraints> for the given terminal. If
            * the shape of the given terminal is a <mxStencilShape> then the constraints
            * of the corresponding <mxStencil> are returned.
            *
            * terminal - <mxCellState> that represents the terminal.
            * source - Boolean that specifies if the terminal is the source or target.
            */
        getAllConnectionConstraints(terminal: any, source: any): any;
        /**
            * Returns an <mxConnectionConstraint> that describes the given connection
            * point. This result can then be passed to <getConnectionPoint>.
            *
            * @param edge - <mxCellState> that represents the edge.
            * @param terminal - <mxCellState> that represents the terminal.
            * @param source - Boolean indicating if the terminal is the source or target.
            */
        getConnectionConstraint(edge: mxCellState, terminal: mxCellState, source: boolean): mxConnectionConstraint;
        /**
            * Sets the <mxConnectionConstraint> that describes the given connection point.
            * If no constraint is given then nothing is changed. To remove an existing
            * constraint from the given edge, use an empty constraint instead.
            *
            * @param edge - <mxCell> that represents the edge.
            * @param terminal - <mxCell> that represents the terminal.
            * @param source - Boolean indicating if the terminal is the source or target.
            * @param constraint - Optional <mxConnectionConstraint> to be used for this
            * connection.
            */
        setConnectionConstraint(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): void;
        /**
            * Returns the nearest point in the list of absolute points or the center
            * of the opposite terminal.
            *
            * @param vertex - <mxCellState> that represents the vertex.
            * @param constraint - <mxConnectionConstraint> that represents the connection point
            * constraint as returned by <getConnectionConstraint>.
            */
        getConnectionPoint(vertex: mxCellState, constraint: mxConnectionConstraint): mxPoint;
        /**
            * Connects the specified end of the given edge to the given terminal
            * using <cellConnected> and fires <mxEvent.CONNECT_CELL> while the
            * transaction is in progress. Returns the updated edge.
            *
            * @param edge - <mxCell> whose terminal should be updated.
            * @param terminal - <mxCell> that represents the new terminal to be used.
            * @param source - Boolean indicating if the new terminal is the source or target.
            * @param constraint - Optional <mxConnectionConstraint> to be used for this
            * connection.
            */
        connectCell(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): mxCell;
        /**
            * Sets the new terminal for the given edge and resets the edge points if
            * <resetEdgesOnConnect> is true. This method fires
            * <mxEvent.CELL_CONNECTED> while the transaction is in progress.
            *
            * @param edge - <mxCell> whose terminal should be updated.
            * @param terminal - <mxCell> that represents the new terminal to be used.
            * @param source - Boolean indicating if the new terminal is the source or target.
            * @param constraint - <mxConnectionConstraint> to be used for this connection.
            */
        cellConnected(edge: mxCell, terminal: mxCell, source: boolean, constraint?: mxConnectionConstraint): void;
        /**
            * Disconnects the given edges from the terminals which are not in the
            * given array.
            *
            * @param cells - Array of <mxCells> to be disconnected.
            */
        disconnectGraph(cells: mxCell[]): void;
        /**
            * Returns the current root of the displayed cell hierarchy. This is a
            * shortcut to <mxGraphView.currentRoot> in <view>.
            */
        getCurrentRoot(): mxCell;
        /**
            * Returns the translation to be used if the given cell is the root cell as
            * an <mxPoint>. This implementation returns null.
            *
            * Example:
            *
            * To keep the children at their absolute position while stepping into groups,
            * this function can be overridden as follows.
            *
            * (code)
            * var offset = new mxPoint(0, 0);
            *
            * while (cell != null)
            * {
            *   var geo = this.model.getGeometry(cell);
            *
            *   if (geo != null)
            *   {
            *     offset.x -= geo.x;
            *     offset.y -= geo.y;
            *   }
            *
            *   cell = this.model.getParent(cell);
            * }
            *
            * return offset;
            * (end)
            *
            * @param cell - <mxCell> that represents the root.
            */
        getTranslateForRoot(cell: mxCell): any;
        /**
            * Returns true if the given cell is a "port", that is, when connecting to
            * it, the cell returned by getTerminalForPort should be used as the
            * terminal and the port should be referenced by the ID in either the
            * mxConstants.STYLE_SOURCE_PORT or the or the
            * mxConstants.STYLE_TARGET_PORT. Note that a port should not be movable.
            * This implementation always returns false.
            *
            * A typical implementation is the following:
            *
            * (code)
            * graph.isPort = function(cell)
            * {
            *   var geo = this.getCellGeometry(cell);
            *
            *   return (geo != null) ? geo.relative : false;
            * };
            * (end)
            *
            * @param cell - <mxCell> that represents the port.
            */
        isPort(cell: mxCell): boolean;
        /**
            * Returns the terminal to be used for a given port. This implementation
            * always returns the parent cell.
            *
            * @param cell - <mxCell> that represents the port.
            * @param source - If the cell is the source or target port.
            */
        getTerminalForPort(cell: mxCell, source: any): mxCell;
        /**
            * Returns the offset to be used for the cells inside the given cell. The
            * root and layer cells may be identified using <mxGraphModel.isRoot> and
            * <mxGraphModel.isLayer>. For all other current roots, the
            * <mxGraphView.currentRoot> field points to the respective cell, so that
            * the following holds: cell == this.view.currentRoot. This implementation
            * returns null.
            *
            * @param cell - <mxCell> whose offset should be returned.
            */
        getChildOffsetForCell(cell: mxCell): any;
        /**
            * Uses the given cell as the root of the displayed cell hierarchy. If no
            * cell is specified then the selection cell is used. The cell is only used
            * if <isValidRoot> returns true.
            *
            * @param cell - Optional <mxCell> to be used as the new root. Default is the
            * selection cell.
            */
        enterGroup(cell?: mxCell): void;
        /**
            * Changes the current root to the next valid root in the displayed cell
            * hierarchy.
            */
        exitGroup(): void;
        /**
            * Uses the root of the model as the root of the displayed cell hierarchy
            * and selects the previous root.
            */
        home(): void;
        /**
            * Returns true if the given cell is a valid root for the cell display
            * hierarchy. This implementation returns true for all non-null values.
            *
            * cell - <mxCell> which should be checked as a possible root.
            */
        isValidRoot(cell: any): boolean;
        /**
            * Returns the bounds of the visible graph. Shortcut to
            * <mxGraphView.getGraphBounds>. See also: <getBoundingBoxFromGeometry>.
            */
        getGraphBounds(): mxRectangle;
        /**
            * Returns the scaled, translated bounds for the given cell. See
            * <mxGraphView.getBounds> for arrays.
            *
            * @param cell - <mxCell> whose bounds should be returned.
            * @param includeEdge - Optional boolean that specifies if the bounds of
            * the connected edges should be included. Default is false.
            * @param includeDescendants - Optional boolean that specifies if the bounds
            * of all descendants should be included. Default is false.
            */
        getCellBounds(cell: mxCell, includeEdges?: boolean, includeDescendants?: boolean): mxRectangle;
        /**
            * Returns the bounding box for the geometries of the vertices in the
            * given array of cells. This can be used to find the graph bounds during
            * a layout operation (ie. before the last endUpdate) as follows:
            *
            * (code)
            * var cells = graph.getChildCells(graph.getDefaultParent(), true, true);
            * var bounds = graph.getBoundingBoxFromGeometry(cells, true);
            * (end)
            *
            * This can then be used to move cells to the origin:
            *
            * (code)
            * if (bounds.x < 0 || bounds.y < 0)
            * {
            *   graph.moveCells(cells, -Math.min(bounds.x, 0), -Math.min(bounds.y, 0))
            * }
            * (end)
            *
            * Or to translate the graph view:
            *
            * (code)
            * if (bounds.x < 0 || bounds.y < 0)
            * {
            *   graph.view.setTranslate(-Math.min(bounds.x, 0), -Math.min(bounds.y, 0));
            * }
            * (end)
            *
            * @param cells - Array of <mxCells> whose bounds should be returned.
            * @param includeEdges - Specifies if edge bounds should be included by computing
            * the bounding box for all points in geometry. Default is false.
            */
        getBoundingBoxFromGeometry(cells: mxCell[], includeEdges?: boolean): mxRectangle;
        /**
            * Clears all cell states or the states for the hierarchy starting at the
            * given cell and validates the graph. This fires a refresh event as the
            * last step.
            *
            * @param cell - Optional <mxCell> for which the cell states should be cleared.
            */
        refresh(cell: mxCell): void;
        /**
            * Snaps the given numeric value to the grid if <gridEnabled> is true.
            *
            * value - Numeric value to be snapped to the grid.
            */
        snap(value: any): any;
        /**
            * Shifts the graph display by the given amount. This is used to preview
            * panning operations, use <mxGraphView.setTranslate> to set a persistent
            * translation of the view. Fires <mxEvent.PAN>.
            *
            * dx - Amount to shift the graph along the x-axis.
            * dy - Amount to shift the graph along the y-axis.
            */
        panGraph(dx: any, dy: any): void;
        /**
            * Zooms into the graph by <zoomFactor>.
            */
        zoomIn(): void;
        /**
            * Zooms out of the graph by <zoomFactor>.
            */
        zoomOut(): void;
        /**
            * Resets the zoom and panning in the view.
            */
        zoomActual(): void;
        /**
            * Zooms the graph to the given scale with an optional boolean center
            * argument, which is passd to <zoom>.
            */
        zoomTo(scale: any, center: any): void;
        /**
            * Centers the graph in the container.
            *
            * horizontal - Optional boolean that specifies if the graph should be centered
            * horizontally. Default is true.
            * vertical - Optional boolean that specifies if the graph should be centered
            * vertically. Default is true.
            * cx - Optional float that specifies the horizontal center. Default is 0.5.
            * cy - Optional float that specifies the vertical center. Default is 0.5.
            */
        center(horizontal: any, vertical: any, cx: any, cy: any): void;
        /**
            * Zooms the graph using the given factor. Center is an optional boolean
            * argument that keeps the graph scrolled to the center. If the center argument
            * is omitted, then <centerZoom> will be used as its value.
            */
        zoom(factor: number, center?: boolean): void;
        /**
            * Zooms the graph to the specified rectangle. If the rectangle does not have same aspect
            * ratio as the display container, it is increased in the smaller relative dimension only
            * until the aspect match. The original rectangle is centralised within this expanded one.
            *
            * Note that the input rectangular must be un-scaled and un-translated.
            *
            * rect - The un-scaled and un-translated rectangluar region that should be just visible
            * after the operation
            */
        zoomToRect(rect: any): void;
        /**
            * Pans the graph so that it shows the given cell. Optionally the cell may
            * be centered in the container.
            *
            * To center a given graph if the <container> has no scrollbars, use the following code.
            *
            * [code]
            * var bounds = graph.getGraphBounds();
            * graph.view.setTranslate(-bounds.x - (bounds.width - container.clientWidth) / 2,
            * 						   -bounds.y - (bounds.height - container.clientHeight) / 2);
            * [/code]
            *
            * cell - <mxCell> to be made visible.
            * center - Optional boolean flag. Default is false.
            */
        scrollCellToVisible(cell: any, center: any): void;
        /**
            * Pans the graph so that it shows the given rectangle.
            *
            * rect - <mxRectangle> to be made visible.
            */
        scrollRectToVisible(rect: any): boolean;
        /**
            * Returns the <mxGeometry> for the given cell. This implementation uses
            * <mxGraphModel.getGeometry>. Subclasses can override this to implement
            * specific geometries for cells in only one graph, that is, it can return
            * geometries that depend on the current state of the view.
            *
            * cell - <mxCell> whose geometry should be returned.
            */
        getCellGeometry(cell: any): mxGeometry;
        /**
            * Returns true if the given cell is visible in this graph. This
            * implementation uses <mxGraphModel.isVisible>. Subclassers can override
            * this to implement specific visibility for cells in only one graph, that
            * is, without affecting the visible state of the cell.
            *
            * When using dynamic filter expressions for cell visibility, then the
            * graph should be revalidated after the filter expression has changed.
            *
            * cell - <mxCell> whose visible state should be returned.
            */
        isCellVisible(cell: any): boolean;
        /**
            * Returns true if the given cell is collapsed in this graph. This
            * implementation uses <mxGraphModel.isCollapsed>. Subclassers can override
            * this to implement specific collapsed states for cells in only one graph,
            * that is, without affecting the collapsed state of the cell.
            *
            * When using dynamic filter expressions for the collapsed state, then the
            * graph should be revalidated after the filter expression has changed.
            *
            * cell - <mxCell> whose collapsed state should be returned.
            */
        isCellCollapsed(cell: any): boolean;
        /**
            * Returns true if the given cell is connectable in this graph. This
            * implementation uses <mxGraphModel.isConnectable>. Subclassers can override
            * this to implement specific connectable states for cells in only one graph,
            * that is, without affecting the connectable state of the cell in the model.
            *
            * cell - <mxCell> whose connectable state should be returned.
            */
        isCellConnectable(cell: any): boolean;
        /**
            * Returns true if perimeter points should be computed such that the
            * resulting edge has only horizontal or vertical segments.
            *
            * edge - <mxCellState> that represents the edge.
            */
        isOrthogonal(edge: mxCellState): any;
        /**
            * Returns true if the given cell state is a loop.
            *
            * state - <mxCellState> that represents a potential loop.
            */
        isLoop(state: any): boolean;
        /**
            * Returns true if the given event is a clone event. This implementation
            * returns true if control is pressed.
            */
        isCloneEvent(evt: any): boolean;
        /**
            * Hook for implementing click-through behaviour on selected cells. If this
            * returns true the cell behind the selected cell will be selected. This
            * implementation returns false;
            */
        isTransparentClickEvent(evt: any): boolean;
        /**
            * Returns true if the given event is a toggle event. This implementation
            * returns true if the meta key (Cmd) is pressed on Macs or if control is
            * pressed on any other platform.
            */
        isToggleEvent(evt: any): boolean;
        /**
            * Returns true if the given mouse event should be aligned to the grid.
            */
        isGridEnabledEvent(evt: any): boolean;
        /**
            * Returns true if the given mouse event should be aligned to the grid.
            */
        isConstrainedEvent(evt: any): boolean;
        /**
            * Returns true if the given mouse event should not allow any connections to be
            * made. This implementation returns false.
            */
        isIgnoreTerminalEvent(evt: any): boolean;
        /**
            * Displays the given validation error in a dialog. This implementation uses
            * mxUtils.alert.
            */
        validationAlert(message: any): void;
        /**
            * Checks if the return value of <getEdgeValidationError> for the given
            * arguments is null.
            *
            * edge - <mxCell> that represents the edge to validate.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            */
        isEdgeValid(edge: any, source: any, target: any): boolean;
        /**
            * Returns the validation error message to be displayed when inserting or
            * changing an edges' connectivity. A return value of null means the edge
            * is valid, a return value of '' means it's not valid, but do not display
            * an error message. Any other (non-empty) string returned from this method
            * is displayed as an error message when trying to connect an edge to a
            * source and target. This implementation uses the <multiplicities>, and
            * checks <multigraph>, <allowDanglingEdges> and <allowLoops> to generate
            * validation errors.
            *
            * For extending this method with specific checks for source/target cells,
            * the method can be extended as follows. Returning an empty string means
            * the edge is invalid with no error message, a non-null string specifies
            * the error message, and null means the edge is valid.
            *
            * (code)
            * graph.getEdgeValidationError = function(edge, source, target)
            * {
            *   if (source != null && target != null &&
            *     this.model.getValue(source) != null &&
            *     this.model.getValue(target) != null)
            *   {
            *     if (target is not valid for source)
            *     {
            *       return 'Invalid Target';
            *     }
            *   }
            *
            *   // "Supercall"
            *   return mxGraph.prototype.getEdgeValidationError.apply(this, arguments);
            * }
            * (end)
            *
            * edge - <mxCell> that represents the edge to validate.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            */
        getEdgeValidationError(edge: any, source: any, target: any): string;
        /**
            * Hook method for subclassers to return an error message for the given
            * edge and terminals. This implementation returns null.
            *
            * edge - <mxCell> that represents the edge to validate.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            */
        validateEdge(edge: any, source: any, target: any): any;
        /**
            * Validates the graph by validating each descendant of the given cell or
            * the root of the model. Context is an object that contains the validation
            * state for the complete validation run. The validation errors are
            * attached to their cells using <setCellWarning>. Returns null in the case of
            * successful validation or an array of strings (warnings) in the case of
            * failed validations.
            *
            * Paramters:
            *
            * cell - Optional <mxCell> to start the validation recursion. Default is
            * the graph root.
            * context - Object that represents the global validation state.
            */
        validateGraph(cell: any, context: any): any;
        /**
            * Checks all <multiplicities> that cannot be enforced while the graph is
            * being modified, namely, all multiplicities that require a minimum of
            * 1 edge.
            *
            * cell - <mxCell> for which the multiplicities should be checked.
            */
        getCellValidationError(cell: any): string;
        /**
            * Hook method for subclassers to return an error message for the given
            * cell and validation context. This implementation returns null. Any HTML
            * breaks will be converted to linefeeds in the calling method.
            *
            * cell - <mxCell> that represents the cell to validate.
            * context - Object that represents the global validation state.
            */
        validateCell(cell: any, context: any): any;
        /**
            * Returns the <backgroundImage> as an <mxImage>.
            */
        getBackgroundImage(): mxImage;
        /**
            * Sets the new <backgroundImage>.
            *
            * image - New <mxImage> to be used for the background.
            */
        setBackgroundImage(image: any): void;
        /**
            * Returns the <mxImage> used to display the collapsed state of
            * the specified cell state. This returns null for all edges.
            */
        getFoldingImage(state: any): mxImage;
        /**
            * Returns the textual representation for the given cell. This
            * implementation returns the nodename or string-representation of the user
            * object.
            *
            * Example:
            *
            * The following returns the label attribute from the cells user
            * object if it is an XML node.
            *
            * (code)
            * graph.convertValueToString = function(cell)
            * {
            * 	return cell.getAttribute('label');
            * }
            * (end)
            *
            * See also: <cellLabelChanged>.
            *
            * cell - <mxCell> whose textual representation should be returned.
            */
        convertValueToString(cell: any): string;
        /**
            * Returns a string or DOM node that represents the label for the given
            * cell. This implementation uses <convertValueToString> if <labelsVisible>
            * is true. Otherwise it returns an empty string.
            *
            * To truncate a label to match the size of the cell, the following code
            * can be used.
            *
            * (code)
            * graph.getLabel = function(cell)
            * {
            *   var label = mxGraph.prototype.getLabel.apply(this, arguments);
            *
            *   if (label != null && this.model.isVertex(cell))
            *   {
            *     var geo = this.getCellGeometry(cell);
            *
            *     if (geo != null)
            *     {
            *       var max = parseInt(geo.width / 8);
            *
            *       if (label.length > max)
            *       {
            *         label = label.substring(0, max)+'...';
            *       }
            *     }
            *   }
            *   return mxUtils.htmlEntities(label);
            * }
            * (end)
            *
            * A resize listener is needed in the graph to force a repaint of the label
            * after a resize.
            *
            * (code)
            * graph.addListener(mxEvent.RESIZE_CELLS, function(sender, evt)
            * {
            *   var cells = evt.getProperty('cells');
            *
            *   for (var i = 0; i < cells.length; i++)
            *   {
            *     this.view.removeState(cells[i]);
            *   }
            * });
            * (end)
            *
            * cell - <mxCell> whose label should be returned.
            */
        getLabel(cell: any): string;
        /**
            * Returns true if the label must be rendered as HTML markup. The default
            * implementation returns <htmlLabels>.
            *
            * cell - <mxCell> whose label should be displayed as HTML markup.
            */
        isHtmlLabel(cell: any): boolean;
        /**
            * Returns <htmlLabels>.
            */
        isHtmlLabels(): boolean;
        /**
            * Sets <htmlLabels>.
            */
        setHtmlLabels(value: any): void;
        /**
            * This enables wrapping for HTML labels.
            *
            * Returns true if no white-space CSS style directive should be used for
            * displaying the given cells label. This implementation returns true if
            * <mxConstants.STYLE_WHITE_SPACE> in the style of the given cell is 'wrap'.
            *
            * This is used as a workaround for IE ignoring the white-space directive
            * of child elements if the directive appears in a parent element. It
            * should be overridden to return true if a white-space directive is used
            * in the HTML markup that represents the given cells label. In order for
            * HTML markup to work in labels, <isHtmlLabel> must also return true
            * for the given cell.
            *
            * Example:
            *
            * (code)
            * graph.getLabel = function(cell)
            * {
            *   var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
            *
            *   if (this.model.isEdge(cell))
            *   {
            *     tmp = '<div style="width: 150px; white-space:normal;">'+tmp+'</div>';
            *   }
            *
            *   return tmp;
            * }
            *
            * graph.isWrapping = function(state)
            * {
            * 	 return this.model.isEdge(state.cell);
            * }
            * (end)
            *
            * Makes sure no edge label is wider than 150 pixels, otherwise the content
            * is wrapped. Note: No width must be specified for wrapped vertex labels as
            * the vertex defines the width in its geometry.
            *
            * state - <mxCell> whose label should be wrapped.
            */
        isWrapping(cell: any): boolean;
        /**
            * Returns true if the overflow portion of labels should be hidden. If this
            * returns true then vertex labels will be clipped to the size of the vertices.
            * This implementation returns true if <mxConstants.STYLE_OVERFLOW> in the
            * style of the given cell is 'hidden'.
            *
            * state - <mxCell> whose label should be clipped.
            */
        isLabelClipped(cell: any): boolean;
        /**
            * Returns the string or DOM node that represents the tooltip for the given
            * state, node and coordinate pair. This implementation checks if the given
            * node is a folding icon or overlay and returns the respective tooltip. If
            * this does not result in a tooltip, the handler for the cell is retrieved
            * from <selectionCellsHandler> and the optional getTooltipForNode method is
            * called. If no special tooltip exists here then <getTooltipForCell> is used
            * with the cell in the given state as the argument to return a tooltip for the
            * given state.
            *
            * state - <mxCellState> whose tooltip should be returned.
            * node - DOM node that is currently under the mouse.
            * x - X-coordinate of the mouse.
            * y - Y-coordinate of the mouse.
            */
        getTooltip(state: any, node: any, x: any, y: any): any;
        /**
            * Returns the string or DOM node to be used as the tooltip for the given
            * cell. This implementation uses the cells getTooltip function if it
            * exists, or else it returns <convertValueToString> for the cell.
            *
            * Example:
            *
            * (code)
            * graph.getTooltipForCell = function(cell)
            * {
            *   return 'Hello, World!';
            * }
            * (end)
            *
            * Replaces all tooltips with the string Hello, World!
            *
            * cell - <mxCell> whose tooltip should be returned.
            */
        getTooltipForCell(cell: any): any;
        /**
            * Returns the cursor value to be used for the CSS of the shape for the
            * given event. This implementation calls <getCursorForCell>.
            *
            * me - <mxMouseEvent> whose cursor should be returned.
            */
        getCursorForMouseEvent(me: any): any;
        /**
            * Returns the cursor value to be used for the CSS of the shape for the
            * given cell. This implementation returns null.
            *
            * cell - <mxCell> whose cursor should be returned.
            */
        getCursorForCell(cell: any): any;
        /**
            * Returns the start size of the given swimlane, that is, the width or
            * height of the part that contains the title, depending on the
            * horizontal style. The return value is an <mxRectangle> with either
            * width or height set as appropriate.
            *
            * swimlane - <mxCell> whose start size should be returned.
            */
        getStartSize(swimlane: any): mxRectangle;
        /**
            * Returns the image URL for the given cell state. This implementation
            * returns the value stored under <mxConstants.STYLE_IMAGE> in the cell
            * style.
            *
            * state - <mxCellState> whose image URL should be returned.
            */
        getImage(state: any): any;
        /**
            * Returns the vertical alignment for the given cell state. This
            * implementation returns the value stored under
            * <mxConstants.STYLE_VERTICAL_ALIGN> in the cell style.
            *
            * state - <mxCellState> whose vertical alignment should be
            * returned.
            */
        getVerticalAlign(state: any): any;
        /**
            * Returns the indicator color for the given cell state. This
            * implementation returns the value stored under
            * <mxConstants.STYLE_INDICATOR_COLOR> in the cell style.
            *
            * state - <mxCellState> whose indicator color should be
            * returned.
            */
        getIndicatorColor(state: any): any;
        /**
            * Returns the indicator gradient color for the given cell state. This
            * implementation returns the value stored under
            * <mxConstants.STYLE_INDICATOR_GRADIENTCOLOR> in the cell style.
            *
            * state - <mxCellState> whose indicator gradient color should be
            * returned.
            */
        getIndicatorGradientColor(state: any): any;
        /**
            * Returns the indicator shape for the given cell state. This
            * implementation returns the value stored under
            * <mxConstants.STYLE_INDICATOR_SHAPE> in the cell style.
            *
            * state - <mxCellState> whose indicator shape should be returned.
            */
        getIndicatorShape(state: any): any;
        /**
            * Returns the indicator image for the given cell state. This
            * implementation returns the value stored under
            * <mxConstants.STYLE_INDICATOR_IMAGE> in the cell style.
            *
            * state - <mxCellState> whose indicator image should be returned.
            */
        getIndicatorImage(state: any): any;
        /**
            * Returns the value of <border>.
            */
        getBorder(): number;
        /**
            * Sets the value of <border>.
            *
            * value - Positive integer that represents the border to be used.
            */
        setBorder(value: any): void;
        /**
            * Returns true if the given cell is a swimlane in the graph. A swimlane is
            * a container cell with some specific behaviour. This implementation
            * checks if the shape associated with the given cell is a <mxSwimlane>.
            *
            * cell - <mxCell> to be checked.
            */
        isSwimlane(cell: any): boolean;
        /**
            * Returns <resizeContainer>.
            */
        isResizeContainer(): boolean;
        /**
            * Sets <resizeContainer>.
            *
            * value - Boolean indicating if the container should be resized.
            */
        setResizeContainer(value: any): void;
        /**
            * Returns true if the graph is <enabled>.
            */
        isEnabled(): boolean;
        /**
            * Specifies if the graph should allow any interactions. This
            * implementation updates <enabled>.
            *
            * value - Boolean indicating if the graph should be enabled.
            */
        setEnabled(value: any): void;
        /**
            * Returns <escapeEnabled>.
            */
        isEscapeEnabled(): boolean;
        /**
            * Sets <escapeEnabled>.
            *
            * enabled - Boolean indicating if escape should be enabled.
            */
        setEscapeEnabled(value: any): void;
        /**
            * Returns <invokesStopCellEditing>.
            */
        isInvokesStopCellEditing(): boolean;
        /**
            * Sets <invokesStopCellEditing>.
            */
        setInvokesStopCellEditing(value: any): void;
        /**
            * Returns <enterStopsCellEditing>.
            */
        isEnterStopsCellEditing(): boolean;
        /**
            * Sets <enterStopsCellEditing>.
            */
        setEnterStopsCellEditing(value: any): void;
        /**
            * Returns true if the given cell may not be moved, sized, bended,
            * disconnected, edited or selected. This implementation returns true for
            * all vertices with a relative geometry if <locked> is false.
            *
            * cell - <mxCell> whose locked state should be returned.
            */
        isCellLocked(cell: any): boolean;
        /**
            * Returns true if the given cell may not be moved, sized, bended,
            * disconnected, edited or selected. This implementation returns true for
            * all vertices with a relative geometry if <locked> is false.
            *
            * cell - <mxCell> whose locked state should be returned.
            */
        isCellsLocked(): boolean;
        /**
            * Sets if any cell may be moved, sized, bended, disconnected, edited or
            * selected.
            *
            * value - Boolean that defines the new value for <cellsLocked>.
            */
        setCellsLocked(value: any): void;
        /**
            * Returns the cells which may be exported in the given array of cells.
            */
        getCloneableCells(cells: any): mxCell[];
        /**
            * Returns true if the given cell is cloneable. This implementation returns
            * <isCellsCloneable> for all cells unless a cell style specifies
            * <mxConstants.STYLE_CLONEABLE> to be 0.
            *
            * cell - Optional <mxCell> whose cloneable state should be returned.
            */
        isCellCloneable(cell: any): boolean;
        /**
            * Returns <cellsCloneable>, that is, if the graph allows cloning of cells
            * by using control-drag.
            */
        isCellsCloneable(): boolean;
        /**
            * Specifies if the graph should allow cloning of cells by holding down the
            * control key while cells are being moved. This implementation updates
            * <cellsCloneable>.
            *
            * value - Boolean indicating if the graph should be cloneable.
            */
        setCellsCloneable(value: any): void;
        /**
            * Returns the cells which may be exported in the given array of cells.
            */
        getExportableCells(cells: any): mxCell[];
        /**
            * Returns true if the given cell may be exported to the clipboard. This
            * implementation returns <exportEnabled> for all cells.
            *
            * cell - <mxCell> that represents the cell to be exported.
            */
        canExportCell(cell: any): boolean;
        /**
            * Returns the cells which may be imported in the given array of cells.
            */
        getImportableCells(cells: any): mxCell[];
        /**
            * Returns true if the given cell may be imported from the clipboard.
            * This implementation returns <importEnabled> for all cells.
            *
            * cell - <mxCell> that represents the cell to be imported.
            */
        canImportCell(cell: any): boolean;
        /**
            * Returns true if the given cell is selectable. This implementation
            * returns <cellsSelectable>.
            *
            * To add a new style for making cells (un)selectable, use the following code.
            *
            * (code)
            * mxGraph.prototype.isCellSelectable = function(cell)
            * {
            *   var state = this.view.getState(cell);
            *   var style = (state != null) ? state.style : this.getCellStyle(cell);
            *
            *   return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] != 0;
            * };
            * (end)
            *
            * You can then use the new style as shown in this example.
            *
            * (code)
            * graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'selectable=0');
            * (end)
            *
            * cell - <mxCell> whose selectable state should be returned.
            */
        isCellSelectable(cell: any): boolean;
        /**
            * Returns <cellsSelectable>.
            */
        isCellsSelectable(): boolean;
        /**
            * Sets <cellsSelectable>.
            */
        setCellsSelectable(value: any): void;
        /**
            * Returns the cells which may be exported in the given array of cells.
            */
        getDeletableCells(cells: any): mxCell[];
        /**
            * Returns true if the given cell is moveable. This returns
            * <cellsDeletable> for all given cells if a cells style does not specify
            * <mxConstants.STYLE_DELETABLE> to be 0.
            *
            * cell - <mxCell> whose deletable state should be returned.
            */
        isCellDeletable(cell: any): boolean;
        /**
            * Returns <cellsDeletable>.
            */
        isCellsDeletable(): boolean;
        /**
            * Sets <cellsDeletable>.
            *
            * value - Boolean indicating if the graph should allow deletion of cells.
            */
        setCellsDeletable(value: any): void;
        /**
            * Returns true if the given edges's label is moveable. This returns
            * <movable> for all given cells if <isLocked> does not return true
            * for the given cell.
            *
            * cell - <mxCell> whose label should be moved.
            */
        isLabelMovable(cell: any): boolean;
        /**
            * Returns true if the given cell is rotatable. This returns true for the given
            * cell if its style does not specify <mxConstants.STYLE_ROTATABLE> to be 0.
            *
            * cell - <mxCell> whose rotatable state should be returned.
            */
        isCellRotatable(cell: any): boolean;
        /**
            * Returns the cells which are movable in the given array of cells.
            */
        getMovableCells(cells: any): mxCell[];
        /**
            * Returns true if the given cell is moveable. This returns <cellsMovable>
            * for all given cells if <isCellLocked> does not return true for the given
            * cell and its style does not specify <mxConstants.STYLE_MOVABLE> to be 0.
            *
            * cell - <mxCell> whose movable state should be returned.
            */
        isCellMovable(cell: any): boolean;
        /**
            * Returns <cellsMovable>.
            */
        isCellsMovable(): boolean;
        /**
            * Specifies if the graph should allow moving of cells. This implementation
            * updates <cellsMsovable>.
            *
            * value - Boolean indicating if the graph should allow moving of cells.
            */
        setCellsMovable(value: any): void;
        /**
            * Returns <gridEnabled> as a boolean.
            */
        isGridEnabled(): boolean;
        /**
            * Specifies if the grid should be enabled.
            *
            * value - Boolean indicating if the grid should be enabled.
            */
        setGridEnabled(value: any): void;
        /**
            * Returns <portsEnabled> as a boolean.
            */
        isPortsEnabled(): boolean;
        /**
            * Specifies if the ports should be enabled.
            *
            * value - Boolean indicating if the ports should be enabled.
            */
        setPortsEnabled(value: any): void;
        /**
            * Returns <gridSize>.
            */
        getGridSize(): number;
        /**
            * Sets <gridSize>.
            */
        setGridSize(value: any): void;
        /**
            * Returns <tolerance>.
            */
        getTolerance(): number;
        /**
            * Sets <tolerance>.
            */
        setTolerance(value: any): void;
        /**
            * Returns <vertexLabelsMovable>.
            */
        isVertexLabelsMovable(): boolean;
        /**
            * Sets <vertexLabelsMovable>.
            */
        setVertexLabelsMovable(value: any): void;
        /**
            * Returns <edgeLabelsMovable>.
            */
        isEdgeLabelsMovable(): boolean;
        /**
            * Sets <edgeLabelsMovable>.
            */
        setEdgeLabelsMovable(value: any): void;
        /**
            * Returns <swimlaneNesting> as a boolean.
            */
        isSwimlaneNesting(): boolean;
        /**
            * Specifies if swimlanes can be nested by drag and drop. This is only
            * taken into account if dropEnabled is true.
            *
            * value - Boolean indicating if swimlanes can be nested.
            */
        setSwimlaneNesting(value: any): void;
        /**
            * Returns <swimlaneSelectionEnabled> as a boolean.
            */
        isSwimlaneSelectionEnabled(): boolean;
        /**
            * Specifies if swimlanes should be selected if the mouse is released
            * over their content area.
            *
            * value - Boolean indicating if swimlanes content areas
            * should be selected when the mouse is released over them.
            */
        setSwimlaneSelectionEnabled(value: any): void;
        /**
            * Returns <multigraph> as a boolean.
            */
        isMultigraph(): boolean;
        /**
            * Specifies if the graph should allow multiple connections between the
            * same pair of vertices.
            *
            * value - Boolean indicating if the graph allows multiple connections
            * between the same pair of vertices.
            */
        setMultigraph(value: any): void;
        /**
            * Returns <allowLoops> as a boolean.
            */
        isAllowLoops(): boolean;
        /**
            * Specifies if dangling edges are allowed, that is, if edges are allowed
            * that do not have a source and/or target terminal defined.
            *
            * value - Boolean indicating if dangling edges are allowed.
            */
        setAllowDanglingEdges(value: any): void;
        /**
            * Returns <allowDanglingEdges> as a boolean.
            */
        isAllowDanglingEdges(): boolean;
        /**
            * Specifies if edges should be connectable.
            *
            * value - Boolean indicating if edges should be connectable.
            */
        setConnectableEdges(value: any): void;
        /**
            * Returns <connectableEdges> as a boolean.
            */
        isConnectableEdges(): boolean;
        /**
            * Specifies if edges should be inserted when cloned but not valid wrt.
            * <getEdgeValidationError>. If false such edges will be silently ignored.
            *
            * value - Boolean indicating if cloned invalid edges should be
            * inserted into the graph or ignored.
            */
        setCloneInvalidEdges(value: any): void;
        /**
            * Returns <cloneInvalidEdges> as a boolean.
            */
        isCloneInvalidEdges(): boolean;
        /**
            * Specifies if loops are allowed.
            *
            * value - Boolean indicating if loops are allowed.
            */
        setAllowLoops(value: any): void;
        /**
            * Returns <disconnectOnMove> as a boolean.
            */
        isDisconnectOnMove(): boolean;
        /**
            * Specifies if edges should be disconnected when moved. (Note: Cloned
            * edges are always disconnected.)
            *
            * value - Boolean indicating if edges should be disconnected
            * when moved.
            */
        setDisconnectOnMove(value: any): void;
        /**
            * Returns <dropEnabled> as a boolean.
            */
        isDropEnabled(): boolean;
        /**
            * Specifies if the graph should allow dropping of cells onto or into other
            * cells.
            *
            * dropEnabled - Boolean indicating if the graph should allow dropping
            * of cells into other cells.
            */
        setDropEnabled(value: any): void;
        /**
            * Returns <splitEnabled> as a boolean.
            */
        isSplitEnabled(): boolean;
        /**
            * Specifies if the graph should allow dropping of cells onto or into other
            * cells.
            *
            * dropEnabled - Boolean indicating if the graph should allow dropping
            * of cells into other cells.
            */
        setSplitEnabled(value: any): void;
        /**
            * Returns true if the given cell is resizable. This returns
            * <cellsResizable> for all given cells if <isCellLocked> does not return
            * true for the given cell and its style does not specify
            * <mxConstants.STYLE_RESIZABLE> to be 0.
            *
            * cell - <mxCell> whose resizable state should be returned.
            */
        isCellResizable(cell: any): boolean;
        /**
            * Returns <cellsResizable>.
            */
        isCellsResizable(): boolean;
        /**
            * Specifies if the graph should allow resizing of cells. This
            * implementation updates <cellsResizable>.
            *
            * value - Boolean indicating if the graph should allow resizing of
            * cells.
            */
        setCellsResizable(value: any): void;
        /**
            * Returns true if the given terminal point is movable. This is independent
            * from <isCellConnectable> and <isCellDisconnectable> and controls if terminal
            * points can be moved in the graph if the edge is not connected. Note that it
            * is required for this to return true to connect unconnected edges. This
            * implementation returns true.
            *
            * cell - <mxCell> whose terminal point should be moved.
            * source - Boolean indicating if the source or target terminal should be moved.
            */
        isTerminalPointMovable(cell: any, source: any): boolean;
        /**
            * Returns true if the given cell is bendable. This returns <cellsBendable>
            * for all given cells if <isLocked> does not return true for the given
            * cell and its style does not specify <mxConstants.STYLE_BENDABLE> to be 0.
            *
            * cell - <mxCell> whose bendable state should be returned.
            */
        isCellBendable(cell: any): boolean;
        /**
            * Returns <cellsBenadable>.
            */
        isCellsBendable(): boolean;
        /**
            * Specifies if the graph should allow bending of edges. This
            * implementation updates <bendable>.
            *
            * value - Boolean indicating if the graph should allow bending of
            * edges.
            */
        setCellsBendable(value: any): void;
        /**
            * Returns true if the given cell is editable. This returns <cellsEditable> for
            * all given cells if <isCellLocked> does not return true for the given cell
            * and its style does not specify <mxConstants.STYLE_EDITABLE> to be 0.
            *
            * cell - <mxCell> whose editable state should be returned.
            */
        isCellEditable(cell: any): boolean;
        /**
            * Returns <cellsEditable>.
            */
        isCellsEditable(): boolean;
        /**
            * Specifies if the graph should allow in-place editing for cell labels.
            * This implementation updates <cellsEditable>.
            *
            * value - Boolean indicating if the graph should allow in-place
            * editing.
            */
        setCellsEditable(value: any): void;
        /**
            * Returns true if the given cell is disconnectable from the source or
            * target terminal. This returns <isCellsDisconnectable> for all given
            * cells if <isCellLocked> does not return true for the given cell.
            *
            * cell - <mxCell> whose disconnectable state should be returned.
            * terminal - <mxCell> that represents the source or target terminal.
            * source - Boolean indicating if the source or target terminal is to be
            * disconnected.
            */
        isCellDisconnectable(cell: any, terminal: any, source: any): boolean;
        /**
            * Returns <cellsDisconnectable>.
            */
        isCellsDisconnectable(): boolean;
        /**
            * Sets <cellsDisconnectable>.
            */
        setCellsDisconnectable(value: any): void;
        /**
            * Returns true if the given cell is a valid source for new connections.
            * This implementation returns true for all non-null values and is
            * called by is called by <isValidConnection>.
            *
            * cell - <mxCell> that represents a possible source or null.
            */
        isValidSource(cell: any): boolean;
        /**
            * Returns <isValidSource> for the given cell. This is called by
            * <isValidConnection>.
            *
            * cell - <mxCell> that represents a possible target or null.
            */
        isValidTarget(cell: any): boolean;
        /**
            * Returns true if the given target cell is a valid target for source.
            * This is a boolean implementation for not allowing connections between
            * certain pairs of vertices and is called by <getEdgeValidationError>.
            * This implementation returns true if <isValidSource> returns true for
            * the source and <isValidTarget> returns true for the target.
            *
            * source - <mxCell> that represents the source cell.
            * target - <mxCell> that represents the target cell.
            */
        isValidConnection(source: any, target: any): boolean;
        /**
            * Specifies if the graph should allow new connections. This implementation
            * updates <mxConnectionHandler.enabled> in <connectionHandler>.
            *
            * connectable - Boolean indicating if new connections should be allowed.
            */
        setConnectable(connectable: any): void;
        /**
            * Returns true if the <connectionHandler> is enabled.
            */
        isConnectable(connectable: any): boolean;
        /**
            * Specifies if tooltips should be enabled. This implementation updates
            * <mxTooltipHandler.enabled> in <tooltipHandler>.
            *
            * enabled - Boolean indicating if tooltips should be enabled.
            */
        setTooltips(enabled: any): void;
        /**
            * Specifies if panning should be enabled. This implementation updates
            * <mxPanningHandler.panningEnabled> in <panningHandler>.
            *
            * enabled - Boolean indicating if panning should be enabled.
            */
        setPanning(enabled: any): void;
        /**
            * Returns true if the given cell is currently being edited.
            * If no cell is specified then this returns true if any
            * cell is currently being edited.
            *
            * @param cell - <mxCell> that should be checked.
            */
        isEditing(cell?: mxCell): boolean;
        /**
            * Returns true if the size of the given cell should automatically be
            * updated after a change of the label. This implementation returns
            * <autoSizeCells> or checks if the cell style does specify
            * <mxConstants.STYLE_AUTOSIZE> to be 1.
            *
            * cell - <mxCell> that should be resized.
            */
        isAutoSizeCell(cell: any): boolean;
        /**
            * Returns <autoSizeCells>.
            */
        isAutoSizeCells(): boolean;
        /**
            * Specifies if cell sizes should be automatically updated after a label
            * change. This implementation sets <autoSizeCells> to the given parameter.
            * To update the size of cells when the cells are added, set
            * <autoSizeCellsOnAdd> to true.
            *
            * value - Boolean indicating if cells should be resized
            * automatically.
            */
        setAutoSizeCells(value: any): void;
        /**
            * Returns true if the parent of the given cell should be extended if the
            * child has been resized so that it overlaps the parent. This
            * implementation returns <isExtendParents> if the cell is not an edge.
            *
            * cell - <mxCell> that has been resized.
            */
        isExtendParent(cell: any): boolean;
        /**
            * Returns <extendParents>.
            */
        isExtendParents(): boolean;
        /**
            * Sets <extendParents>.
            *
            * value - New boolean value for <extendParents>.
            */
        setExtendParents(value: any): void;
        /**
            * Returns <extendParentsOnAdd>.
            */
        isExtendParentsOnAdd(cell: any): boolean;
        /**
            * Sets <extendParentsOnAdd>.
            *
            * value - New boolean value for <extendParentsOnAdd>.
            */
        setExtendParentsOnAdd(value: any): void;
        /**
            * Returns <extendParentsOnMove>.
            */
        isExtendParentsOnMove(): boolean;
        /**
            * Sets <extendParentsOnMove>.
            *
            * value - New boolean value for <extendParentsOnAdd>.
            */
        setExtendParentsOnMove(value: any): void;
        /**
            * Returns <recursiveResize>.
            *
            * state - <mxCellState> that is being resized.
            */
        isRecursiveResize(state?: mxCellState): boolean;
        /**
            * Sets <recursiveResize>.
            *
            * value - New boolean value for <recursiveResize>.
            */
        setRecursiveResize(value: any): void;
        /**
            * Returns true if the given cell should be kept inside the bounds of its
            * parent according to the rules defined by <getOverlap> and
            * <isAllowOverlapParent>. This implementation returns false for all children
            * of edges and <isConstrainChildren> otherwise.
            *
            * cell - <mxCell> that should be constrained.
            */
        isConstrainChild(cell: any): boolean;
        /**
            * Returns <constrainChildren>.
            */
        isConstrainChildren(): boolean;
        /**
            * Sets <constrainChildren>.
            */
        setConstrainChildren(value: any): void;
        /**
            * Returns <constrainRelativeChildren>.
            */
        isConstrainRelativeChildren(): boolean;
        /**
            * Sets <constrainRelativeChildren>.
            */
        setConstrainRelativeChildren(value: any): void;
        /**
            * Returns <allowNegativeCoordinates>.
            */
        isAllowNegativeCoordinates(): boolean;
        /**
            * Sets <allowNegativeCoordinates>.
            */
        setAllowNegativeCoordinates(value: any): void;
        /**
            * Returns a decimal number representing the amount of the width and height
            * of the given cell that is allowed to overlap its parent. A value of 0
            * means all children must stay inside the parent, 1 means the child is
            * allowed to be placed outside of the parent such that it touches one of
            * the parents sides. If <isAllowOverlapParent> returns false for the given
            * cell, then this method returns 0.
            *
            * cell - <mxCell> for which the overlap ratio should be returned.
            */
        getOverlap(cell: any): number;
        /**
            * Returns true if the given cell is allowed to be placed outside of the
            * parents area.
            *
            * cell - <mxCell> that represents the child to be checked.
            */
        isAllowOverlapParent(cell: any): boolean;
        /**
            * Returns the cells which are movable in the given array of cells.
            */
        getFoldableCells(cells: any, collapse: any): mxCell[];
        /**
            * Returns true if the given cell is foldable. This implementation
            * returns true if the cell has at least one child and its style
            * does not specify <mxConstants.STYLE_FOLDABLE> to be 0.
            *
            * cell - <mxCell> whose foldable state should be returned.
            */
        isCellFoldable(cell: any, collapse: any): boolean;
        /**
            * Returns true if the given cell is a valid drop target for the specified
            * cells. If <splitEnabled> is true then this returns <isSplitTarget> for
            * the given arguments else it returns true if the cell is not collapsed
            * and its child count is greater than 0.
            *
            * cell - <mxCell> that represents the possible drop target.
            * cells - <mxCells> that should be dropped into the target.
            * evt - Mouseevent that triggered the invocation.
            */
        isValidDropTarget(cell: any, cells: any, evt: any): boolean;
        /**
            * Returns true if the given edge may be splitted into two edges with the
            * given cell as a new terminal between the two.
            *
            * target - <mxCell> that represents the edge to be splitted.
            * cells - <mxCells> that should split the edge.
            * evt - Mouseevent that triggered the invocation.
            */
        isSplitTarget(target: any, cells: any, evt: any): boolean;
        /**
            * Returns the given cell if it is a drop target for the given cells or the
            * nearest ancestor that may be used as a drop target for the given cells.
            * If the given array contains a swimlane and <swimlaneNesting> is false
            * then this always returns null. If no cell is given, then the bottommost
            * swimlane at the location of the given event is returned.
            *
            * This function should only be used if <isDropEnabled> returns true.
            *
            * cells - Array of <mxCells> which are to be dropped onto the target.
            * evt - Mouseevent for the drag and drop.
            * cell - <mxCell> that is under the mousepointer.
            * clone - Optional boolean to indicate of cells will be cloned.
            */
        getDropTarget(cells: any, evt: any, cell: any, clone: any): any;
        /**
            * Returns <defaultParent> or <mxGraphView.currentRoot> or the first child
            * child of <mxGraphModel.root> if both are null. The value returned by
            * this function should be used as the parent for new cells (aka default
            * layer).
            */
        getDefaultParent(): mxCell;
        /**
            * Sets the <defaultParent> to the given cell. Set this to null to return
            * the first child of the root in getDefaultParent.
            */
        setDefaultParent(cell: any): void;
        /**
            * Returns the nearest ancestor of the given cell which is a swimlane, or
            * the given cell, if it is itself a swimlane.
            *
            * cell - <mxCell> for which the ancestor swimlane should be returned.
            */
        getSwimlane(cell: any): any;
        /**
            * Returns the bottom-most swimlane that intersects the given point (x, y)
            * in the cell hierarchy that starts at the given parent.
            *
            * x - X-coordinate of the location to be checked.
            * y - Y-coordinate of the location to be checked.
            * parent - <mxCell> that should be used as the root of the recursion.
            * Default is <defaultParent>.
            */
        getSwimlaneAt(x: number, y: number, parent?: mxCell): any;
        /**
            * Returns the bottom-most cell that intersects the given point (x, y) in
            * the cell hierarchy starting at the given parent. This will also return
            * swimlanes if the given location intersects the content area of the
            * swimlane. If this is not desired, then the <hitsSwimlaneContent> may be
            * used if the returned cell is a swimlane to determine if the location
            * is inside the content area or on the actual title of the swimlane.
            *
            * @param x - X-coordinate of the location to be checked.
            * @param y - Y-coordinate of the location to be checked.
            * @param parent - <mxCell> that should be used as the root of the recursion.
            * Default is current root of the view or the root of the model.
            * @param vertices - Optional boolean indicating if vertices should be returned.
            * Default is true.
            * @param edges - Optional boolean indicating if edges should be returned. Default
            * is true.
            * @param ignoreFn - Optional function that returns true if cell should be ignored.
            * The function is passed the cell state and the x and y parameter.
            */
        getCellAt(x: number, y: number, parent?: mxCell, vertices?: boolean, edges?: boolean, ignoreFn?: (cell: mxCellState, x: number, y: number) => boolean): any;
        /**
            * Returns the bottom-most cell that intersects the given point (x, y) in
            * the cell hierarchy that starts at the given parent.
            *
            * state - <mxCellState> that represents the cell state.
            * x - X-coordinate of the location to be checked.
            * y - Y-coordinate of the location to be checked.
            */
        intersects(state: any, x: any, y: any): boolean;
        /**
            * Returns true if the given coordinate pair is inside the content
            * are of the given swimlane.
            *
            * swimlane - <mxCell> that specifies the swimlane.
            * x - X-coordinate of the mouse event.
            * y - Y-coordinate of the mouse event.
            */
        hitsSwimlaneContent(swimlane: any, x: any, y: any): boolean;
        /**
            * Returns the visible child vertices of the given parent.
            *
            * parent - <mxCell> whose children should be returned.
            */
        getChildVertices(parent: any): mxCell[];
        /**
            * Returns the visible child edges of the given parent.
            *
            * @param parent - <mxCell> whose child vertices should be returned.
            */
        getChildEdges(parent: mxCell): mxCell[];
        /**
            * Returns the visible child vertices or edges in the given parent. If
            * vertices and edges is false, then all children are returned.
            *
            * @param parent - <mxCell> whose children should be returned.
            * @param vertices - Optional boolean that specifies if child vertices should
            * be returned. Default is false.
            * @param edges - Optional boolean that specifies if child edges should
            * be returned. Default is false.
            */
        getChildCells(parent: mxCell, vertices?: boolean, edges?: boolean): mxCell[];
        /**
            * Returns all visible edges connected to the given cell without loops.
            *
            * @param cell - <mxCell> whose connections should be returned.
            * @param parent - Optional parent of the opposite end for a connection to be
            * returned.
            */
        getConnections(cell: mxCell, parent?: mxCell): any[];
        /**
            * Returns the visible incoming edges for the given cell. If the optional
            * parent argument is specified, then only child edges of the given parent
            * are returned.
            *
            * @param cell - <mxCell> whose incoming edges should be returned.
            * @param parent - Optional parent of the opposite end for an edge to be
            * returned.
            */
        getIncomingEdges(cell: mxCell, parent?: mxCell): any[];
        /**
            * Returns the visible outgoing edges for the given cell. If the optional
            * parent argument is specified, then only child edges of the given parent
            * are returned.
            *
            * @param cell - <mxCell> whose outgoing edges should be returned.
            * @param parent - Optional parent of the opposite end for an edge to be
            * returned.
            */
        getOutgoingEdges(cell: mxCell, parent?: mxCell): any[];
        /**
            * Returns the incoming and/or outgoing edges for the given cell.
            * If the optional parent argument is specified, then only edges are returned
            * where the opposite is in the given parent cell. If at least one of incoming
            * or outgoing is true, then loops are ignored, if both are false, then all
            * edges connected to the given cell are returned including loops.
            *
            * @param cell - <mxCell> whose edges should be returned.
            * @param parent - Optional parent of the opposite end for an edge to be
            * returned.
            * @param incoming - Optional boolean that specifies if incoming edges should
            * be included in the result. Default is true.
            * @param outgoing - Optional boolean that specifies if outgoing edges should
            * be included in the result. Default is true.
            * @param includeLoops - Optional boolean that specifies if loops should be
            * included in the result. Default is true.
            * @param recurse - Optional boolean the specifies if the parent specified only
            * need be an ancestral parent, true, or the direct parent, false.
            * Default is false
            */
        getEdges(cell: mxCell, parent?: mxCell, incoming?: boolean, outgoing?: boolean, includeLoops?: boolean, recurse?: boolean): any[];
        /**
            * Returns whether or not the specified parent is a valid
            * ancestor of the specified cell, either direct or indirectly
            * based on whether ancestor recursion is enabled.
            *
            * cell - <mxCell> the possible child cell
            * parent - <mxCell> the possible parent cell
            * recurse - boolean whether or not to recurse the child ancestors
            */
        isValidAncestor(cell: any, parent: any, recurse: any): boolean;
        /**
            * Returns all distinct visible opposite cells for the specified terminal
            * on the given edges.
            *
            * edges - Array of <mxCells> that contains the edges whose opposite
            * terminals should be returned.
            * terminal - Terminal that specifies the end whose opposite should be
            * returned.
            * source - Optional boolean that specifies if source terminals should be
            * included in the result. Default is true.
            * targets - Optional boolean that specifies if targer terminals should be
            * included in the result. Default is true.
            */
        getOpposites(edges: any, terminal: any, sources: any, targets: any): any[];
        /**
            * Returns the edges between the given source and target. This takes into
            * account collapsed and invisible cells and returns the connected edges
            * as displayed on the screen.
            *
            * source -
            * target -
            * directed -
            */
        getEdgesBetween(source: any, target: any, directed: any): any[];
        /**
            * Returns an <mxPoint> representing the given event in the unscaled,
            * non-translated coordinate space of <container> and applies the grid.
            *
            * @param evt - Mousevent that contains the mouse pointer location.
            * @param addOffset - Optional boolean that specifies if the position should be
            * offset by half of the <gridSize>. Default is true.
            */
        getPointForEvent(evt: MouseEvent, addOffset?: boolean): any;
        /**
            * Returns the child vertices and edges of the given parent that are contained
            * in the given rectangle. The result is added to the optional result array,
            * which is returned. If no result array is specified then a new array is
            * created and returned.
            *
            * @param x - X-coordinate of the rectangle.
            * @param y - Y-coordinate of the rectangle.
            * @param width - Width of the rectangle.
            * @param height - Height of the rectangle.
            * @param parent - <mxCell> that should be used as the root of the recursion.
            * Default is current root of the view or the root of the model.
            * @param result - Optional array to store the result in.
            */
        getCells(x: number, y: number, width: number, height: number, parent?: mxCell, result?: mxCell[]): mxCell[];
        /**
            * Returns the children of the given parent that are contained in the
            * halfpane from the given point (x0, y0) rightwards or downwards
            * depending on rightHalfpane and bottomHalfpane.
            *
            * x0 - X-coordinate of the origin.
            * y0 - Y-coordinate of the origin.
            * parent - Optional <mxCell> whose children should be checked. Default is
            * <defaultParent>.
            * rightHalfpane - Boolean indicating if the cells in the right halfpane
            * from the origin should be returned.
            * bottomHalfpane - Boolean indicating if the cells in the bottom halfpane
            * from the origin should be returned.
            */
        getCellsBeyond(x0: any, y0: any, parent: any, rightHalfpane: any, bottomHalfpane: any): any[];
        /**
            * Returns all children in the given parent which do not have incoming
            * edges. If the result is empty then the with the greatest difference
            * between incoming and outgoing edges is returned.
            *
            * parent - <mxCell> whose children should be checked.
            * isolate - Optional boolean that specifies if edges should be ignored if
            * the opposite end is not a child of the given parent cell. Default is
            * false.
            * invert - Optional boolean that specifies if outgoing or incoming edges
            * should be counted for a tree root. If false then outgoing edges will be
            * counted. Default is false.
            */
        findTreeRoots(parent: any, isolate: any, invert: any): any[];
        /**
            * Traverses the (directed) graph invoking the given function for each
            * visited vertex and edge. The function is invoked with the current vertex
            * and the incoming edge as a parameter. This implementation makes sure
            * each vertex is only visited once. The function may return false if the
            * traversal should stop at the given vertex.
            *
            * Example:
            *
            * (code)
            * mxLog.show();
            * var cell = graph.getSelectionCell();
            * graph.traverse(cell, false, function(vertex, edge)
            * {
            *   mxLog.debug(graph.getLabel(vertex));
            * });
            * (end)
            *
            * vertex - <mxCell> that represents the vertex where the traversal starts.
            * directed - Optional boolean indicating if edges should only be traversed
            * from source to target. Default is true.
            * func - Visitor function that takes the current vertex and the incoming
            * edge as arguments. The traversal stops if the function returns false.
            * edge - Optional <mxCell> that represents the incoming edge. This is
            * null for the first step of the traversal.
            * visited - Optional <mxDictionary> from cells to true for the visited cells.
            * inverse - Optional boolean to traverse in inverse direction. Default is false.
            * This is ignored if directed is false.
            */
        traverse(vertex: any, directed: any, func: any, edge: any, visited: any, inverse: any): void;
        /**
            * Returns true if the given cell is selected.
            *
            * cell - <mxCell> for which the selection state should be returned.
            */
        isCellSelected(cell: any): boolean;
        /**
            * Returns true if the selection is empty.
            */
        isSelectionEmpty(): boolean;
        /**
            * Clears the selection using <mxGraphSelectionModel.clear>.
            */
        clearSelection(): void;
        /**
            * Returns the number of selected cells.
            */
        getSelectionCount(): number;
        /**
            * Returns the first cell from the array of selected <mxCells>.
            */
        getSelectionCell(): mxCell;
        /**
            * Returns the array of selected <mxCells>.
            */
        getSelectionCells(): mxCell[];
        /**
            * Sets the selection cell.
            *
            * cell - <mxCell> to be selected.
            */
        setSelectionCell(cell: any): void;
        /**
            * Sets the selection cell.
            *
            * cells - Array of <mxCells> to be selected.
            */
        setSelectionCells(cells: any): void;
        /**
            * Adds the given cell to the selection.
            *
            * cell - <mxCell> to be add to the selection.
            */
        addSelectionCell(cell: any): void;
        /**
            * Adds the given cells to the selection.
            *
            * cells - Array of <mxCells> to be added to the selection.
            */
        addSelectionCells(cells: any): void;
        /**
            * Removes the given cell from the selection.
            *
            * cell - <mxCell> to be removed from the selection.
            */
        removeSelectionCell(cell: any): void;
        /**
            * Removes the given cells from the selection.
            *
            * cells - Array of <mxCells> to be removed from the selection.
            */
        removeSelectionCells(cells: any): void;
        /**
            * Selects and returns the cells inside the given rectangle for the
            * specified event.
            *
            * @param rect - <mxRectangle> that represents the region to be selected.
            * @param evt - Mouseevent that triggered the selection.
            */
        selectRegion(rect: mxRectangle, evt: MouseEvent): mxCell[];
        /**
            * Selects the next cell.
            */
        selectNextCell(): void;
        /**
            * Selects the previous cell.
            */
        selectPreviousCell(): void;
        /**
            * Selects the parent cell.
            */
        selectParentCell(): void;
        /**
            * Selects the first child cell.
            */
        selectChildCell(): void;
        /**
            * Selects the next, parent, first child or previous cell, if all arguments
            * are false.
            *
            * @param isNext - Boolean indicating if the next cell should be selected.
            * @param isParent - Boolean indicating if the parent cell should be selected.
            * @param isChild - Boolean indicating if the first child cell should be selected.
            */
        selectCell(isNext?: boolean, isParent?: boolean, isChild?: boolean): void;
        /**
            * Selects all children of the given parent cell or the children of the
            * default parent if no parent is specified. To select leaf vertices and/or
            * edges use <selectCells>.
            *
            * parent - Optional <mxCell> whose children should be selected.
            * Default is <defaultParent>.
            * descendants - Optional boolean specifying whether all descendants should be
            * selected. Default is false.
            */
        selectAll(parent: any, descendants: any): void;
        /**
            * Select all vertices inside the given parent or the default parent.
            */
        selectVertices(parent: any): void;
        /**
            * Select all vertices inside the given parent or the default parent.
            */
        selectEdges(parent: any): void;
        /**
            * Selects all vertices and/or edges depending on the given boolean
            * arguments recursively, starting at the given parent or the default
            * parent if no parent is specified. Use <selectAll> to select all cells.
            * For vertices, only cells with no children are selected.
            *
            * vertices - Boolean indicating if vertices should be selected.
            * edges - Boolean indicating if edges should be selected.
            * parent - Optional <mxCell> that acts as the root of the recursion.
            * Default is <defaultParent>.
            */
        selectCells(vertices: any, edges: any, parent: any): void;
        /**
            * Selects the given cell by either adding it to the selection or
            * replacing the selection depending on whether the given mouse event is a
            * toggle event.
            *
            * cell - <mxCell> to be selected.
            * evt - Optional mouseevent that triggered the selection.
            */
        selectCellForEvent(cell: any, evt: any): void;
        /**
            * Selects the given cells by either adding them to the selection or
            * replacing the selection depending on whether the given mouse event is a
            * toggle event.
            *
            * cells - Array of <mxCells> to be selected.
            * evt - Optional mouseevent that triggered the selection.
            */
        selectCellsForEvent(cells: any, evt: any): void;
        /**
            * Creates a new handler for the given cell state. This implementation
            * returns a new <mxEdgeHandler> of the corresponding cell is an edge,
            * otherwise it returns an <mxVertexHandler>.
            *
            * state - <mxCellState> whose handler should be created.
            */
        createHandler(state: any): any;
        /**
            * Hooks to create a new <mxVertexHandler> for the given <mxCellState>.
            *
            * state - <mxCellState> to create the handler for.
            */
        createVertexHandler(state: any): mxVertexHandler;
        /**
            * Hooks to create a new <mxEdgeHandler> for the given <mxCellState>.
            *
            * state - <mxCellState> to create the handler for.
            */
        createEdgeHandler(state: any, edgeStyle: any): any;
        /**
            * Hooks to create a new <mxEdgeSegmentHandler> for the given <mxCellState>.
            *
            * state - <mxCellState> to create the handler for.
            */
        createEdgeSegmentHandler(state: any): mxEdgeSegmentHandler;
        /**
            * Hooks to create a new <mxElbowEdgeHandler> for the given <mxCellState>.
            *
            * state - <mxCellState> to create the handler for.
            */
        createElbowEdgeHandler(state: any): mxElbowEdgeHandler;
        /**
            * Adds a listener to the graph event dispatch loop. The listener
            * must implement the mouseDown, mouseMove and mouseUp methods
            * as shown in the <mxMouseEvent> class.
            *
            * listener - Listener to be added to the graph event listeners.
            */
        addMouseListener(listener: any): void;
        /**
            * Removes the specified graph listener.
            *
            * listener - Listener to be removed from the graph event listeners.
            */
        removeMouseListener(listener: any): void;
        /**
            * Sets the graphX and graphY properties if the given <mxMouseEvent> if
            * required and returned the event.
            *
            * me - <mxMouseEvent> to be updated.
            * evtName - Name of the mouse event.
            */
        updateMouseEvent(me: any, evtName: any): any;
        /**
            * Returns the state for the given touch event.
            */
        getStateForTouchEvent(evt: any): mxCellState;
        /**
            * Returns true if the event should be ignored in <fireMouseEvent>.
            */
        isEventIgnored(evtName: any, me: any, sender: any): boolean;
        /**
            * Hook for ignoring synthetic mouse events after touchend in Firefox.
            */
        isSyntheticEventIgnored(evtName: any, me: any, sender: any): boolean;
        /**
            * Returns true if the event should be ignored in <fireMouseEvent>. This
            * implementation returns true for select, option and input (if not of type
            * checkbox, radio, button, submit or file) event sources if the event is not
            * a mouse event or a left mouse button press event.
            *
            * evtName - The name of the event.
            * me - <mxMouseEvent> that should be ignored.
            */
        isEventSourceIgnored(evtName: any, me: any): boolean;
        /**
            * Returns the <mxCellState> to be used when firing the mouse event for the
            * given state. This implementation returns the given state.
            *
            * <mxCellState> - State whose event source should be returned.
            */
        getEventState(state: any): any;
        /**
            * Dispatches the given event in the graph event dispatch loop. Possible
            * event names are <mxEvent.MOUSE_DOWN>, <mxEvent.MOUSE_MOVE> and
            * <mxEvent.MOUSE_UP>. All listeners are invoked for all events regardless
            * of the consumed state of the event.
            *
            * evtName - String that specifies the type of event to be dispatched.
            * me - <mxMouseEvent> to be fired.
            * sender - Optional sender argument. Default is this.
            */
        fireMouseEvent(evtName: any, me: any, sender: any): void;
        /**
            * Consumes the given <mxMouseEvent> if it's a touchStart event.
            */
        consumeMouseEvent(evtName: any, me: any, sender: any): void;
        /**
            * Dispatches a <mxEvent.GESTURE> event. The following example will resize the
            * cell under the mouse based on the scale property of the native touch event.
            *
            * (code)
            * graph.addListener(mxEvent.GESTURE, function(sender, eo)
            * {
            *   var evt = eo.getProperty('event');
            *   var state = graph.view.getState(eo.getProperty('cell'));
            *
            *   if (graph.isEnabled() && graph.isCellResizable(state.cell) && Math.abs(1 - evt.scale) > 0.2)
            *   {
            *     var scale = graph.view.scale;
            *     var tr = graph.view.translate;
            *
            *     var w = state.width * evt.scale;
            *     var h = state.height * evt.scale;
            *     var x = state.x - (w - state.width) / 2;
            *     var y = state.y - (h - state.height) / 2;
            *
            *     var bounds = new mxRectangle(graph.snap(x / scale) - tr.x,
            *     		graph.snap(y / scale) - tr.y, graph.snap(w / scale), graph.snap(h / scale));
            *     graph.resizeCell(state.cell, bounds);
            *     eo.consume();
            *   }
            * });
            * (end)
            *
            * evt - Gestureend event that represents the gesture.
            * cell - Optional <mxCell> associated with the gesture.
            */
        fireGestureEvent(evt: any, cell: any): void;
        /**
            * Destroys the graph and all its resources.
            */
        destroy(): void;
    }

    /**
        * Extends <mxEventSource> to implement a graph overlay, represented by an icon
        * and a tooltip. Overlays can handle and fire <click> events and are added to
        * the graph using <mxGraph.addCellOverlay>, and removed using
        * <mxGraph.removeCellOverlay>, or <mxGraph.removeCellOverlays> to remove all overlays.
        * The <mxGraph.getCellOverlays> function returns the array of overlays for a given
        * cell in a graph. If multiple overlays exist for the same cell, then
        * <getBounds> should be overridden in at least one of the overlays.
        *
        * Overlays appear on top of all cells in a special layer. If this is not
        * desirable, then the image must be rendered as part of the shape or label of
        * the cell instead.
        *
        * Example:
        *
        * The following adds a new overlays for a given vertex and selects the cell
        * if the overlay is clicked.
        *
        * (code)
        * var overlay = new mxCellOverlay(img, html);
        * graph.addCellOverlay(vertex, overlay);
        * overlay.addListener(mxEvent.CLICK, function(sender, evt)
        * {
        *   var cell = evt.getProperty('cell');
        *   graph.setSelectionCell(cell);
        * });
        * (end)
        *
        * For cell overlays to be printed use <mxPrintPreview.printOverlays>.
        *
        * Event: mxEvent.CLICK
        *
        * Fires when the user clicks on the overlay. The <code>event</code> property
        * contains the corresponding mouse event and the <code>cell</code> property
        * contains the cell. For touch devices this is fired if the element receives
        * a touchend event.
        */
    export class mxCellOverlay extends mxEventSource {
        /**
            * Holds the <mxImage> to be used as the icon.
            */
        image: any;
        /**
            * Holds the optional string to be used as the tooltip.
            */
        tooltip: any;
        /**
            * Holds the horizontal alignment for the overlay. Default is
            * <mxConstants.ALIGN_RIGHT>. For edges, the overlay always appears in the
            * center of the edge.
            */
        align: string;
        /**
            * Holds the vertical alignment for the overlay. Default is
            * <mxConstants.ALIGN_BOTTOM>. For edges, the overlay always appears in the
            * center of the edge.
            */
        verticalAlign: string;
        /**
            * Holds the offset as an <mxPoint>. The offset will be scaled according to the
            * current scale.
            */
        offset: any;
        /**
            * Holds the cursor for the overlay. Default is 'help'.
            */
        cursor: any;
        /**
            * Defines the overlapping for the overlay, that is, the proportional distance
            * from the origin to the point defined by the alignment. Default is 0.5.
            */
        defaultOverlap: number;
        /**
            * Constructs a new overlay using the given image and tooltip.
            *
            * @param image - <mxImage> that represents the icon to be displayed.
            * @param tooltip - Optional string that specifies the tooltip.
            * @param align - Optional horizontal alignment for the overlay. Possible
            * values are <ALIGN_LEFT>, <ALIGN_CENTER> and <ALIGN_RIGHT>
            * (default).
            * @param verticalAlign - Vertical alignment for the overlay. Possible
            * values are <ALIGN_TOP>, <ALIGN_MIDDLE> and <ALIGN_BOTTOM>
            * (default).
            * @param offset ?
            * @param cursor ?
            */
        constructor(image: mxImage, tooltip?: string, align?: any, verticalAlign?: any, offset?: mxPoint, cursor?: string);
        /**
            * Returns the bounds of the overlay for the given <mxCellState> as an
            * <mxRectangle>. This should be overridden when using multiple overlays
            * per cell so that the overlays do not overlap.
            *
            * The following example will place the overlay along an edge (where
            * x=[-1..1] from the start to the end of the edge and y is the
            * orthogonal offset in px).
            *
            * (code)
            * overlay.getBounds = function(state)
            * {
            *   var bounds = mxCellOverlay.prototype.getBounds.apply(this, arguments);
            *
            *   if (state.view.graph.getModel().isEdge(state.cell))
            *   {
            *     var pt = state.view.getPoint(state, {x: 0, y: 0, relative: true});
            *
            *     bounds.x = pt.x - bounds.width / 2;
            *     bounds.y = pt.y - bounds.height / 2;
            *   }
            *
            *   return bounds;
            * };
            * (end)
            *
            * Parameters:
            *
            * state - <mxCellState> that represents the current state of the
            * associated cell.
            */
        getBounds(state: any): mxRectangle;
        /**
            * Returns the textual representation of the overlay to be used as the
            * tooltip. This implementation returns <tooltip>.
            */
        toString(): any;
    }

    /**
        * Implements an outline (aka overview) for a graph. Set <updateOnPan> to true
        * to enable updates while the source graph is panning.
        *
        * Example:
        *
        * (code)
        * var outline = new mxOutline(graph, div);
        * (end)
        *
        * If an outline is used in an <mxWindow> in IE8 standards mode, the following
        * code makes sure that the shadow filter is not inherited and that any
        * transparent elements in the graph do not show the page background, but the
        * background of the graph container.
        *
        * (code)
        * if (document.documentMode == 8)
        * {
        *   container.style.filter = 'progid:DXImageTransform.Microsoft.alpha(opacity=100)';
        * }
        * (end)
        *
        * To move the graph to the top, left corner the following code can be used.
        *
        * (code)
        * var scale = graph.view.scale;
        * var bounds = graph.getGraphBounds();
        * graph.view.setTranslate(-bounds.x / scale, -bounds.y / scale);
        * (end)
        *
        * To toggle the suspended mode, the following can be used.
        *
        * (code)
        * outline.suspended = !outln.suspended;
        * if (!outline.suspended)
        * {
        *   outline.update(true);
        * }
        * (end)
        *
        * Constructor: mxOutline
        *
        * Constructs a new outline for the specified graph inside the given
        * container.
        *
        * Parameters:
        *
        * source - <mxGraph> to create the outline for.
        * container - DOM node that will contain the outline.
        */
    export class mxOutline {
        constructor(source: any, container: any);
        /**
            * Creates the <mxGraph> used in the outline.
            */
        createGraph(container: any): mxGraph;
        /**
            * Initializes the outline inside the given container.
            */
        init(container: any): void;
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * value - Boolean that specifies the new enabled state.
            */
        setEnabled(value: any): void;
        /**
            * Enables or disables the zoom handling by showing or hiding the respective
            * handle.
            *
            * Parameters:
            *
            * value - Boolean that specifies the new enabled state.
            */
        setZoomEnabled(value: any): void;
        /**
            * Invokes <update> and revalidate the outline. This method is deprecated.
            */
        refresh(): void;
        /**
            * Creates the shape used as the sizer.
            */
        createSizer(): any;
        /**
            * Returns the size of the source container.
            */
        getSourceContainerSize(): mxRectangle;
        /**
            * Returns the offset for drawing the outline graph.
            */
        getOutlineOffset(scale: any): any;
        /**
            * Returns the offset for drawing the outline graph.
            */
        getSourceGraphBounds(): any;
        /**
            * Updates the outline.
            */
        update(revalidate: any): void;
        /**
            * Handles the event by starting a translation or zoom.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Handles the event by previewing the viewrect in <graph> and updating the
            * rectangle that represents the viewrect in the outline.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Gets the translate for the given mouse event. Here is an example to limit
            * the outline to stay within positive coordinates:
            *
            * (code)
            * outline.getTranslateForEvent = function(me)
            * {
            *   var pt = new mxPoint(me.getX() - this.startX, me.getY() - this.startY);
            *
            *   if (!this.zoom)
            *   {
            *     var tr = this.source.view.translate;
            *     pt.x = Math.max(tr.x * this.outline.view.scale, pt.x);
            *     pt.y = Math.max(tr.y * this.outline.view.scale, pt.y);
            *   }
            *
            *   return pt;
            * };
            * (end)
            */
        getTranslateForEvent(me: any): mxPoint;
        /**
            * Handles the event by applying the translation or zoom to <graph>.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Destroy this outline and removes all listeners from <source>.
            */
        destroy(): void;
    }

    /**
        * Defines invalid connections along with the error messages that they produce.
        * To add or remove rules on a graph, you must add/remove instances of this
        * class to <mxGraph.multiplicities>.
        *
        * Example:
        *
        * (code)
        * graph.multiplicities.push(new mxMultiplicity(
        *   true, 'rectangle', null, null, 0, 2, ['circle'],
        *   'Only 2 targets allowed',
        *   'Only circle targets allowed'));
        * (end)
        *
        * Defines a rule where each rectangle must be connected to no more than 2
        * circles and no other types of targets are allowed.
        */
    export class mxMultiplicity {
        /**
            * Defines the type of the source or target terminal. The type is a string
            * passed to <mxUtils.isNode> together with the source or target vertex
            * value as the first argument.
            */
        type: any;
        /**
            * Optional string that specifies the attributename to be passed to
            * <mxUtils.isNode> to check if the rule applies to a cell.
            */
        attr: any;
        /**
            * Optional string that specifies the value of the attribute to be passed
            * to <mxUtils.isNode> to check if the rule applies to a cell.
            */
        value: any;
        /**
            * Boolean that specifies if the rule is applied to the source or target
            * terminal of an edge.
            */
        source: any;
        /**
            * Defines the minimum number of connections for which this rule applies.
            * Default is 0.
            */
        min: any;
        /**
            * Defines the maximum number of connections for which this rule applies.
            * A value of 'n' means unlimited times. Default is 'n'.
            */
        max: any;
        /**
            * Holds an array of strings that specify the type of neighbor for which
            * this rule applies. The strings are used in <mxCell.is> on the opposite
            * terminal to check if the rule applies to the connection.
            */
        validNeighbors: any;
        /**
            * Boolean indicating if the list of validNeighbors are those that are allowed
            * for this rule or those that are not allowed for this rule.
            */
        validNeighborsAllowed: boolean;
        /**
            * Holds the localized error message to be displayed if the number of
            * connections for which the rule applies is smaller than <min> or greater
            * than <max>.
            */
        countError: any;
        /**
            * Holds the localized error message to be displayed if the type of the
            * neighbor for a connection does not match the rule.
            */
        typeError: any;
        /**
            * Instantiate class mxMultiplicity in order to describe allowed
            * connections in a graph. Not all constraints can be enforced while
            * editing, some must be checked at validation time. The <countError> and
            * <typeError> are treated as resource keys in <mxResources>.
            *
            * @param source - Boolean indicating if this rule applies to the source or target
            * terminal.
            * @param type - Type of the source or target terminal that this rule applies to.
            * See <type> for more information.
            * @param attr - Optional attribute name to match the source or target terminal.
            * @param value - Optional attribute value to match the source or target terminal.
            * @param min - Minimum number of edges for this rule. Default is 1.
            * @param max - Maximum number of edges for this rule. n means infinite. Default
            * is n.
            * @param validNeighbors - Array of types of the opposite terminal for which this
            * rule applies.
            * @param countError - Error to be displayed for invalid number of edges.
            * @param typeError - Error to be displayed for invalid opposite terminals.
            * @param validNeighborsAllowed - Optional boolean indicating if the array of
            * opposite types should be valid or invalid.
            */
        constructor(source: boolean, type: any, attr: any, value: any, min: number, max: number | 'n', validNeighbors: any, countError: string, typeError: string, validNeighborsAllowed?: boolean);
        /**
            * Checks the multiplicity for the given arguments and returns the error
            * for the given connection or null if the multiplicity does not apply.
            *
            * graph - Reference to the enclosing <mxGraph> instance.
            * edge - <mxCell> that represents the edge to validate.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            * sourceOut - Number of outgoing edges from the source terminal.
            * targetIn - Number of incoming edges for the target terminal.
            */
        check(graph: any, edge: any, source: any, target: any, sourceOut: any, targetIn: any): string;
        /**
            * Checks if there are any valid neighbours in <validNeighbors>. This is only
            * called if <validNeighbors> is a non-empty array.
            */
        checkNeighbors(graph: any, edge: any, source: any, target: any): boolean;
        /**
            * Checks the given terminal cell and returns true if this rule applies. The
            * given cell is the source or target of the given edge, depending on
            * <source>. This implementation uses <checkType> on the terminal's value.
            */
        checkTerminal(graph: any, terminal: any, edge: any): any;
        /**
            * Checks the type of the given value.
            */
        checkType(graph: any, value: any, type: any, attr: any, attrValue: any): any;
    }

    /**
        * Implements a layout manager that runs a given layout after any changes to the graph:
        *
        * Example:
        *
        * (code)
        * var layoutMgr = new mxLayoutManager(graph);
        * layoutMgr.getLayout = function(cell)
        * {
        *   return layout;
        * };
        * (end)
        *
        * Event: mxEvent.LAYOUT_CELLS
        *
        * Fires between begin- and endUpdate after all cells have been layouted in
        * <layoutCells>. The <code>cells</code> property contains all cells that have
        * been passed to <layoutCells>.
        *
        * Constructor: mxLayoutManager
        *
        * Constructs a new automatic layout for the given graph.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing graph.
        */
    export class mxLayoutManager extends mxEventSource {
        constructor(graph: any);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns true if a layout should bubble, that is, if the parent layout
            * should be executed whenever a cell layout (layout of the children of
            * a cell) has been executed. This implementation returns <bubbling>.
            */
        isBubbling(): any;
        /**
            * Sets <bubbling>.
            */
        setBubbling(value: any): void;
        /**
            * Returns the graph that this layout operates on.
            */
        getGraph(): any;
        /**
            * Sets the graph that the layouts operate on.
            */
        setGraph(graph: any): void;
        /**
            * Returns the layout to be executed for the given graph and parent.
            */
        getLayout(parent: any): any;
        /**
            * Called from the undoHandler.
            *
            * Parameters:
            *
            * cell - Array of <mxCells> that have been moved.
            * evt - Mouse event that represents the mousedown.
            */
        beforeUndo(undoableEdit: any): void;
        /**
            * Executes the given layout on the given parent.
            */
        executeLayoutForCells(cells: any): void;
        /**
            * Called from the moveHandler.
            *
            * Parameters:
            *
            * cell - Array of <mxCells> that have been moved.
            * evt - Mouse event that represents the mousedown.
            */
        cellsMoved(cells: any, evt: any): void;
        /**
            * Returns the cells to be layouted for the given sequence of changes.
            */
        getCellsForChanges(changes: any): any[];
        /**
            * Executes all layouts which have been scheduled during the
            * changes.
            */
        getCellsForChange(change: any): any[];
        /**
            * Executes all layouts which have been scheduled during the
            * changes.
            */
        layoutCells(cells: any): void;
        /**
            * Executes the given layout on the given parent.
            */
        executeLayout(layout: any, parent: any): boolean;
        /**
            * Removes all handlers from the <graph> and deletes the reference to it.
            */
        destroy(): void;
    }

    /**
        * Manager for swimlanes and nested swimlanes that sets the size of newly added
        * swimlanes to that of their siblings, and propagates changes to the size of a
        * swimlane to its siblings, if <siblings> is true, and its ancestors, if
        * <bubbling> is true.
        *
        * Constructor: mxSwimlaneManager
        *
        * Constructs a new swimlane manager for the given graph.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing graph.
        */
    export class mxSwimlaneManager extends mxEventSource {
        constructor(graph: any, horizontal: any, addEnabled: any, resizeEnabled: any);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(value: any): void;
        /**
            * Returns <horizontal>.
            */
        isHorizontal(): any;
        /**
            * Sets <horizontal>.
            */
        setHorizontal(value: any): void;
        /**
            * Returns <addEnabled>.
            */
        isAddEnabled(): any;
        /**
            * Sets <addEnabled>.
            */
        setAddEnabled(value: any): void;
        /**
            * Returns <resizeEnabled>.
            */
        isResizeEnabled(): any;
        /**
            * Sets <resizeEnabled>.
            */
        setResizeEnabled(value: any): void;
        /**
            * Returns the graph that this manager operates on.
            */
        getGraph(): any;
        /**
            * Sets the graph that the manager operates on.
            */
        setGraph(graph: any): void;
        /**
            * Returns true if the given swimlane should be ignored.
            */
        isSwimlaneIgnored(swimlane: any): boolean;
        /**
            * Returns true if the given cell is horizontal. If the given cell is not a
            * swimlane, then the global orientation is returned.
            */
        isCellHorizontal(cell: any): boolean;
        /**
            * Called if any cells have been added.
            *
            * Parameters:
            *
            * cell - Array of <mxCells> that have been added.
            */
        cellsAdded(cells: any): void;
        /**
            * Updates the size of the given swimlane to match that of any existing
            * siblings swimlanes.
            *
            * Parameters:
            *
            * swimlane - <mxCell> that represents the new swimlane.
            */
        swimlaneAdded(swimlane: any): void;
        /**
            * Called if any cells have been resizes. Calls <swimlaneResized> for all
            * swimlanes where <isSwimlaneIgnored> returns false.
            *
            * Parameters:
            *
            * cells - Array of <mxCells> whose size was changed.
            */
        cellsResized(cells: any): void;
        /**
            * Called from <cellsResized> for all swimlanes that are not ignored to update
            * the size of the siblings and the size of the parent swimlanes, recursively,
            * if <bubbling> is true.
            *
            * Parameters:
            *
            * swimlane - <mxCell> whose size has changed.
            */
        resizeSwimlane(swimlane: any, w: any, h: any, parentHorizontal: any): void;
        /**
            * Removes all handlers from the <graph> and deletes the reference to it.
            */
        destroy(): void;
    }

    /**
        * Creates a temporary set of cell states.
        */
    export class mxTemporaryCellStates {
        constructor(view: any, scale: any, cells: any, isCellVisibleFn: any, getLinkForCellState: any);
        /**
            * Returns the top, left corner as a new <mxPoint>.
            */
        destroy(): void;
    }

    /**
        *
        * Implements a live preview for moving cells.
        *
        * Constructor: mxCellStatePreview
        *
        * Constructs a move preview for the given graph.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        */
    export class mxCellStatePreview {
        constructor(graph: any);
        /**
            * Returns true if this contains no entries.
            */
        isEmpty(): boolean;
        /**
            * Function: moveState
            */
        moveState(state: any, dx: any, dy: any, add: any, includeEdges: any): any;
        /**
            * Function: show
            */
        show(visitor: any): void;
        /**
            * Function: translateState
            */
        translateState(state: any, dx: any, dy: any): void;
        /**
            * Function: revalidateState
            */
        revalidateState(state: any, dx: any, dy: any, visitor: any): void;
        /**
            * Function: addEdges
            */
        addEdges(state: any): void;
    }

    /**
        * Defines an object that contains the constraints about how to connect one
        * side of an edge to its terminal.
        */
    export class mxConnectionConstraint {
        /**
            * <mxPoint> that specifies the fixed location of the connection point.
            */
        point: any;
        /**
            * Boolean that specifies if the point should be projected onto the perimeter
            * of the terminal.
            */
        perimeter: any;
        /**
            * Optional string that specifies the name of the constraint.
            */
        name: any;
        /**
            * Constructs a new connection constraint for the given point and boolean
            * arguments.
            *
            * @param point - Optional <mxPoint> that specifies the fixed location of the point
            * in relative coordinates. Default is null.
            * @param perimeter - Optional boolean that specifies if the fixed point should be
            * projected onto the perimeter of the terminal. Default is true.
            */
        constructor(point?: mxPoint, perimeter?: boolean, name?: string);
    }

    /**
        * Graph event handler that handles selection. Individual cells are handled
        * separately using <mxVertexHandler> or one of the edge handlers. These
        * handlers are created using <mxGraph.createHandler> in
        * <mxGraphSelectionModel.cellAdded>.
        *
        * To avoid the container to scroll a moved cell into view, set
        * <scrollAfterMove> to false.
        *
        * Constructor: mxGraphHandler
        *
        * Constructs an event handler that creates handles for the
        * selection cells.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        */
    export class mxGraphHandler {
        constructor(graph: any);
        /**
            * Returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Sets <enabled>.
            */
        setEnabled(value: any): void;
        /**
            * Returns <cloneEnabled>.
            */
        isCloneEnabled(): any;
        /**
            * Sets <cloneEnabled>.
            *
            * Parameters:
            *
            * value - Boolean that specifies the new clone enabled state.
            */
        setCloneEnabled(value: any): void;
        /**
            * Returns <moveEnabled>.
            */
        isMoveEnabled(): any;
        /**
            * Sets <moveEnabled>.
            */
        setMoveEnabled(value: any): void;
        /**
            * Returns <selectEnabled>.
            */
        isSelectEnabled(): any;
        /**
            * Sets <selectEnabled>.
            */
        setSelectEnabled(value: any): void;
        /**
            * Returns <removeCellsFromParent>.
            */
        isRemoveCellsFromParent(): any;
        /**
            * Sets <removeCellsFromParent>.
            */
        setRemoveCellsFromParent(value: any): void;
        /**
            * Hook to return initial cell for the given event.
            */
        getInitialCellForEvent(me: any): any;
        /**
            * Hook to return true for delayed selections.
            */
        isDelayedSelection(cell: any, me: any): any;
        /**
            * Consumes the given mouse event. NOTE: This may be used to enable click
            * events for links in labels on iOS as follows as consuming the initial
            * touchStart disables firing the subsequent click evnent on the link.
            *
            * <code>
            * mxGraphHandler.prototype.consumeMouseEvent = function(evtName, me)
            * {
            *   var source = mxEvent.getSource(me.getEvent());
            *
            *   if (!mxEvent.isTouchEvent(me.getEvent()) || source.nodeName != 'A')
            *   {
            *     me.consume();
            *   }
            * }
            * </code>
            */
        consumeMouseEvent(evtName: any, me: any): void;
        /**
            * Handles the event by selecing the given cell and creating a handle for
            * it. By consuming the event all subsequent events of the gesture are
            * redirected to this handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Creates an array of cell states which should be used as guides.
            */
        getGuideStates(): any;
        /**
            * Returns the cells to be modified by this handler. This implementation
            * returns all selection cells that are movable, or the given initial cell if
            * the given cell is not selected and movable. This handles the case of moving
            * unselectable or unselected cells.
            *
            * Parameters:
            *
            * initialCell - <mxCell> that triggered this handler.
            */
        getCells(initialCell: any): any;
        /**
            * Returns the <mxRectangle> used as the preview bounds for
            * moving the given cells.
            */
        getPreviewBounds(cells: any): any;
        /**
            * Returns the union of the <mxCellStates> for the given array of <mxCells>.
            * For vertices, this method uses the bounding box of the corresponding shape
            * if one exists. The bounding box of the corresponding text label and all
            * controls and overlays are ignored. See also: <mxGraphView.getBounds> and
            * <mxGraph.getBoundingBox>.
            *
            * Parameters:
            *
            * cells - Array of <mxCells> whose bounding box should be returned.
            */
        getBoundingBox(cells: any): any;
        /**
            * Creates the shape used to draw the preview for the given bounds.
            */
        createPreviewShape(bounds: any): mxRectangleShape;
        /**
            * Starts the handling of the mouse gesture.
            */
        start(cell: any, x: any, y: any): void;
        /**
            * Returns true if the guides should be used for the given <mxMouseEvent>.
            * This implementation returns <mxGuide.isEnabledForEvent>.
            */
        useGuidesForEvent(me: any): any;
        /**
            * Snaps the given vector to the grid and returns the given mxPoint instance.
            */
        snap(vector: any): any;
        /**
            * Returns an <mxPoint> that represents the vector for moving the cells
            * for the given <mxMouseEvent>.
            */
        getDelta(me: any): mxPoint;
        /**
            * Hook for subclassers do show details while the handler is active.
            */
        updateHint(me: any): void;
        /**
            * Hooks for subclassers to hide details when the handler gets inactive.
            */
        removeHint(): void;
        /**
            * Hook for rounding the unscaled vector. This uses Math.round.
            */
        roundLength(length: any): number;
        /**
            * Handles the event by highlighting possible drop targets and updating the
            * preview.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Updates the bounds of the preview shape.
            */
        updatePreviewShape(): void;
        /**
            * Sets the color of the rectangle used to highlight drop targets.
            *
            * Parameters:
            *
            * color - String that represents the new highlight color.
            */
        setHighlightColor(color: any): void;
        /**
            * Handles the event by applying the changes to the selection cells.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Implements the delayed selection for the given mouse event.
            */
        selectDelayed(me: any): void;
        /**
            * Resets the state of this handler.
            */
        reset(): void;
        /**
            * Returns true if the given cells should be removed from the parent for the specified
            * mousereleased event.
            */
        shouldRemoveCellsFromParent(parent: any, cells: any, evt: any): boolean;
        /**
            * Moves the given cells by the specified amount.
            */
        moveCells(cells: any, dx: any, dy: any, clone: any, target: any, evt: any): void;
        /**
            * Destroy the preview and highlight shapes.
            */
        destroyShapes(): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Event handler that pans and creates popupmenus. To use the left
        * mousebutton for panning without interfering with cell moving and
        * resizing, use <isUseLeftButton> and <isIgnoreCell>. For grid size
        * steps while panning, use <useGrid>. This handler is built-into
        * <mxGraph.panningHandler> and enabled using <mxGraph.setPanning>.
        *
        * Event: mxEvent.PAN_START
        *
        * Fires when the panning handler changes its <active> state to true. The
        * <code>event</code> property contains the corresponding <mxMouseEvent>.
        *
        * Event: mxEvent.PAN
        *
        * Fires while handle is processing events. The <code>event</code> property contains
        * the corresponding <mxMouseEvent>.
        *
        * Event: mxEvent.PAN_END
        *
        * Fires when the panning handler changes its <active> state to false. The
        * <code>event</code> property contains the corresponding <mxMouseEvent>.
        */
    export class mxPanningHandler extends mxEventSource {
        /**
            * Reference to the enclosing <mxGraph>.
            */
        graph: mxGraph;
        /**
            * Specifies if panning should be active for the left mouse button.
            * Setting this to true may conflict with <mxRubberband>. Default is false.
            */
        useLeftButtonForPanning: boolean;
        /**
            * Specifies if <mxEvent.isPopupTrigger> should also be used for panning.
            */
        usePopupTrigger: boolean;
        /**
            * Specifies if panning should be active even if there is a cell under the
            * mousepointer. Default is false.
            */
        ignoreCell: boolean;
        /**
            * Specifies if the panning should be previewed. Default is true.
            */
        previewEnabled: boolean;
        /**
            * Specifies if the panning steps should be aligned to the grid size.
            * Default is false.
            */
        useGrid: boolean;
        /**
            * Specifies if panning should be enabled. Default is true.
            */
        panningEnabled: boolean;
        /**
            * Specifies if pinch gestures should be handled as zoom. Default is true.
            */
        pinchEnabled: boolean;
        /**
            * Specifies the maximum scale. Default is 8.
            */
        maxScale: number;
        /**
            * Specifies the minimum scale. Default is 0.01.
            */
        minScale: number;
        /**
            * Holds the current horizontal offset.
            */
        dx: number;
        /**
            * Holds the current vertical offset.
            */
        dy: number;
        /**
            * Holds the x-coordinate of the start point.
            */
        startX: number;
        /**
            * Holds the y-coordinate of the start point.
            */
        startY: number;
        /**
            * Implicit variable declarations
            */
        forcePanningHandler: any;
        panningTrigger: any;
        gestureHandler: any;
        /** True if the handler is currently active. */
        active: boolean;
        initialScale: any;
        mouseDownEvent: any;
        dx0: number;
        dy0: number;
        /**
            * Constructs an event handler that creates a <mxPopupMenu>
            * and pans the graph.
            * @param graph
            */
        constructor(graph: mxGraph);
        /**
            * Returns true if the handler is currently active.
            */
        isActive(): boolean;
        /**
            * Returns <panningEnabled>.
            */
        isPanningEnabled(): boolean;
        /**
            * Sets <panningEnabled>.
            */
        setPanningEnabled(value: boolean): void;
        /**
            * Returns <pinchEnabled>.
            */
        isPinchEnabled(): boolean;
        /**
            * Sets <pinchEnabled>.
            */
        setPinchEnabled(value: boolean): void;
        /**
            * Returns true if the given event is a panning trigger for the optional
            * given cell. This returns true if control-shift is pressed or if
            * <usePopupTrigger> is true and the event is a popup trigger.
            */
        isPanningTrigger(me: any): boolean;
        /**
            * Returns true if the given <mxMouseEvent> should start panning. This
            * implementation always returns true if <ignoreCell> is true or for
            * multi touch events.
            */
        isForcePanningEvent(me: any): boolean;
        /**
            * Handles the event by initiating the panning. By consuming the event all
            * subsequent events of the gesture are redirected to this handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Starts panning at the given event.
            */
        start(me: any): void;
        /**
            * Consumes the given <mxMouseEvent> if it was a panning trigger in
            * <mouseDown>. The default is to invoke <mxMouseEvent.consume>. Note that this
            * will block any further event processing. If you haven't disabled built-in
            * context menus and require immediate selection of the cell on mouseDown in
            * Safari and/or on the Mac, then use the following code:
            *
            * (code)
            * mxPanningHandler.prototype.consumePanningTrigger = function(me)
            * {
            *   if (me.evt.preventDefault)
            *   {
            *     me.evt.preventDefault();
            *   }
            *
            *   // Stops event processing in IE
            *   me.evt.returnValue = false;
            *
            *   // Sets local consumed state
            *   if (!mxClient.IS_SF && !mxClient.IS_MAC)
            *   {
            *     me.consumed = true;
            *   }
            * };
            * (end)
            */
        consumePanningTrigger(me: any): void;
        /**
            * Handles the event by updating the panning on the graph.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Handles the event by setting the translation on the view or showing the
            * popupmenu.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Pans <graph> by the given amount.
            */
        panGraph(dx: number, dy: number): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Event handler that creates popupmenus.
        *
        * Constructor: mxPopupMenuHandler
        *
        * Constructs an event handler that creates a <mxPopupMenu>.
        */
    export class mxPopupMenuHandler extends mxPopupMenu {
        constructor(graph?: any, factoryMethod?: any);
        /**
            * Initializes the shapes required for this vertex handler.
            */
        init(): void;
        /**
            * Hook for returning if a cell should be selected for a given <mxMouseEvent>.
            * This implementation returns <selectOnPopup>.
            */
        isSelectOnPopup(me: any): any;
        /**
            * Handles the event by initiating the panning. By consuming the event all
            * subsequent events of the gesture are redirected to this handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Handles the event by updating the panning on the graph.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Handles the event by setting the translation on the view or showing the
            * popupmenu.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Hook to return the cell for the mouse up popup trigger handling.
            */
        getCellForPopupEvent(me: any): any;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * A helper class to process mouse locations and highlight cells.
        *
        * Helper class to highlight cells. To add a cell marker to an existing graph
        * for highlighting all cells, the following code is used:
        *
        * (code)
        * var marker = new mxCellMarker(graph);
        * graph.addMouseListener({
        *   mouseDown: function() {},
        *   mouseMove: function(sender, me)
        *   {
        *     marker.process(me);
        *   },
        *   mouseUp: function() {}
        * });
        * (end)
        *
        * Event: mxEvent.MARK
        *
        * Fires after a cell has been marked or unmarked. The <code>state</code>
        * property contains the marked <mxCellState> or null if no state is marked.
        *
        * Constructor: mxCellMarker
        *
        * Constructs a new cell marker.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * validColor - Optional marker color for valid states. Default is
        * <mxConstants.DEFAULT_VALID_COLOR>.
        * invalidColor - Optional marker color for invalid states. Default is
        * <mxConstants.DEFAULT_INVALID_COLOR>.
        * hotspot - Portion of the width and hight where a state intersects a
        * given coordinate pair. A value of 0 means always highlight. Default is
        * <mxConstants.DEFAULT_HOTSPOT>.
        */
    export class mxCellMarker extends mxEventSource {
        constructor(graph: any, validColor: any, invalidColor: any, hotspot: any);
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Sets the <hotspot>.
            */
        setHotspot(hotspot: any): void;
        /**
            * Returns the <hotspot>.
            */
        getHotspot(): any;
        /**
            * Specifies whether the hotspot should be used in <intersects>.
            */
        setHotspotEnabled(enabled: any): void;
        /**
            * Returns true if hotspot is used in <intersects>.
            */
        isHotspotEnabled(): any;
        /**
            * Returns true if <validState> is not null.
            */
        hasValidState(): boolean;
        /**
            * Returns the <validState>.
            */
        getValidState(): any;
        /**
            * Returns the <markedState>.
            */
        getMarkedState(): any;
        /**
            * Resets the state of the cell marker.
            */
        reset(): void;
        /**
            * Processes the given event and cell and marks the state returned by
            * <getState> with the color returned by <getMarkerColor>. If the
            * markerColor is not null, then the state is stored in <markedState>. If
            * <isValidState> returns true, then the state is stored in <validState>
            * regardless of the marker color. The state is returned regardless of the
            * marker color and valid state.
            */
        process(me: any): any;
        /**
            * Sets and marks the current valid state.
            */
        setCurrentState(state: any, me: any, color: any): void;
        /**
            * Marks the given cell using the given color, or <validColor> if no color is specified.
            */
        markCell(cell: any, color: any): void;
        /**
            * Marks the <markedState> and fires a <mark> event.
            */
        mark(): void;
        /**
            * Hides the marker and fires a <mark> event.
            */
        unmark(): void;
        /**
            * Returns true if the given <mxCellState> is a valid state. If this
            * returns true, then the state is stored in <validState>. The return value
            * of this method is used as the argument for <getMarkerColor>.
            */
        isValidState(state: any): boolean;
        /**
            * Returns the valid- or invalidColor depending on the value of isValid.
            * The given <mxCellState> is ignored by this implementation.
            */
        getMarkerColor(evt: any, state: any, isValid: any): any;
        /**
            * Uses <getCell>, <getStateToMark> and <intersects> to return the
            * <mxCellState> for the given <mxMouseEvent>.
            */
        getState(me: any): any;
        /**
            * Returns the <mxCell> for the given event and cell. This returns the
            * given cell.
            */
        getCell(me: any): any;
        /**
            * Returns the <mxCellState> to be marked for the given <mxCellState> under
            * the mouse. This returns the given state.
            */
        getStateToMark(state: any): any;
        /**
            * Returns true if the given coordinate pair intersects the given state.
            * This returns true if the <hotspot> is 0 or the coordinates are inside
            * the hotspot for the given cell state.
            */
        intersects(state: any, me: any): any;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * An event handler that manages cell handlers and invokes their mouse event
        * processing functions.
        *
        * Group: Events
        *
        * Event: mxEvent.ADD
        *
        * Fires if a cell has been added to the selection. The <code>state</code>
        * property contains the <mxCellState> that has been added.
        *
        * Event: mxEvent.REMOVE
        *
        * Fires if a cell has been remove from the selection. The <code>state</code>
        * property contains the <mxCellState> that has been removed.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        */
    export class mxSelectionCellsHandler extends mxEventSource {
        constructor(graph: any);
        /**
            * Returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Sets <enabled>.
            */
        setEnabled(value: any): void;
        /**
            * Returns the handler for the given cell.
            */
        getHandler(cell: any): any;
        /**
            * Resets all handlers.
            */
        reset(): void;
        /**
            * Reloads or updates all handlers.
            */
        refresh(): void;
        /**
            * Returns true if the given handler is active and should not be redrawn.
            */
        isHandlerActive(handler: any): boolean;
        /**
            * Updates the handler for the given shape if one exists.
            */
        updateHandler(state: any): void;
        /**
            * Redirects the given event to the handlers.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Redirects the given event to the handlers.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Redirects the given event to the handlers.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Graph event handler that creates new connections. Uses <mxTerminalMarker>
        * for finding and highlighting the source and target vertices and
        * <factoryMethod> to create the edge instance. This handler is built-into
        * <mxGraph.connectionHandler> and enabled using <mxGraph.setConnectable>.
        *
        * Example:
        *
        * (code)
        * new mxConnectionHandler(graph, function(source, target, style)
        * {
        *   edge = new mxCell('', new mxGeometry());
        *   edge.setEdge(true);
        *   edge.setStyle(style);
        *   edge.geometry.relative = true;
        *   return edge;
        * });
        * (end)
        *
        * Here is an alternative solution that just sets a specific user object for
        * new edges by overriding <insertEdge>.
        *
        * (code)
        * mxConnectionHandlerInsertEdge = mxConnectionHandler.prototype.insertEdge;
        * mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style)
        * {
        *   value = 'Test';
        *
        *   return mxConnectionHandlerInsertEdge.apply(this, arguments);
        * };
        * (end)
        *
        * Using images to trigger connections:
        *
        * This handler uses mxTerminalMarker to find the source and target cell for
        * the new connection and creates a new edge using <connect>. The new edge is
        * created using <createEdge> which in turn uses <factoryMethod> or creates a
        * new default edge.
        *
        * The handler uses a "highlight-paradigm" for indicating if a cell is being
        * used as a source or target terminal, as seen in other diagramming products.
        * In order to allow both, moving and connecting cells at the same time,
        * <mxConstants.DEFAULT_HOTSPOT> is used in the handler to determine the hotspot
        * of a cell, that is, the region of the cell which is used to trigger a new
        * connection. The constant is a value between 0 and 1 that specifies the
        * amount of the width and height around the center to be used for the hotspot
        * of a cell and its default value is 0.5. In addition,
        * <mxConstants.MIN_HOTSPOT_SIZE> defines the minimum number of pixels for the
        * width and height of the hotspot.
        *
        * This solution, while standards compliant, may be somewhat confusing because
        * there is no visual indicator for the hotspot and the highlight is seen to
        * switch on and off while the mouse is being moved in and out. Furthermore,
        * this paradigm does not allow to create different connections depending on
        * the highlighted hotspot as there is only one hotspot per cell and it
        * normally does not allow cells to be moved and connected at the same time as
        * there is no clear indication of the connectable area of the cell.
        *
        * To come across these issues, the handle has an additional <createIcons> hook
        * with a default implementation that allows to create one icon to be used to
        * trigger new connections. If this icon is specified, then new connections can
        * only be created if the image is clicked while the cell is being highlighted.
        * The <createIcons> hook may be overridden to create more than one
        * <mxImageShape> for creating new connections, but the default implementation
        * supports one image and is used as follows:
        *
        * In order to display the "connect image" whenever the mouse is over the cell,
        * an DEFAULT_HOTSPOT of 1 should be used:
        *
        * (code)
        * mxConstants.DEFAULT_HOTSPOT = 1;
        * (end)
        *
        * In order to avoid confusion with the highlighting, the highlight color
        * should not be used with a connect image:
        *
        * (code)
        * mxConstants.HIGHLIGHT_COLOR = null;
        * (end)
        *
        * To install the image, the connectImage field of the mxConnectionHandler must
        * be assigned a new <mxImage> instance:
        *
        * (code)
        * mxConnectionHandler.prototype.connectImage = new mxImage('images/green-dot.gif', 14, 14);
        * (end)
        *
        * This will use the green-dot.gif with a width and height of 14 pixels as the
        * image to trigger new connections. In createIcons the icon field of the
        * handler will be set in order to remember the icon that has been clicked for
        * creating the new connection. This field will be available under selectedIcon
        * in the connect method, which may be overridden to take the icon that
        * triggered the new connection into account. This is useful if more than one
        * icon may be used to create a connection.
        *
        * Group: Events
        *
        * Event: mxEvent.START
        *
        * Fires when a new connection is being created by the user. The <code>state</code>
        * property contains the state of the source cell.
        *
        * Event: mxEvent.CONNECT
        *
        * Fires between begin- and endUpdate in <connect>. The <code>cell</code>
        * property contains the inserted edge, the <code>event</code> and <code>target</code>
        * properties contain the respective arguments that were passed to <connect> (where
        * target corresponds to the dropTarget argument). Finally, the <code>terminal</code>
        * property corresponds to the target argument in <connect> or the clone of the source
        * terminal if <createTarget> is enabled.
        *
        * Note that the target is the cell under the mouse where the mouse button was released.
        * Depending on the logic in the handler, this doesn't necessarily have to be the target
        * of the inserted edge. To print the source, target or any optional ports IDs that the
        * edge is connected to, the following code can be used. To get more details about the
        * actual connection point, <mxGraph.getConnectionConstraint> can be used. To resolve
        * the port IDs, use <mxGraphModel.getCell>.
        *
        * (code)
        * graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
        * {
        *   var edge = evt.getProperty('cell');
        *   var source = graph.getModel().getTerminal(edge, true);
        *   var target = graph.getModel().getTerminal(edge, false);
        *
        *   var style = graph.getCellStyle(edge);
        *   var sourcePortId = style[mxConstants.STYLE_SOURCE_PORT];
        *   var targetPortId = style[mxConstants.STYLE_TARGET_PORT];
        *
        *   mxLog.show();
        *   mxLog.debug('connect', edge, source.id, target.id, sourcePortId, targetPortId);
        * });
        * (end)
        *
        * Event: mxEvent.RESET
        *
        * Fires when the <reset> method is invoked.
        */
    export class mxConnectionHandler extends mxEventSource {
        /**
            * Reference to the enclosing <mxGraph>.
            */
        graph: any;
        /**
            * Function that is used for creating new edges. The function takes the
            * source and target <mxCell> as the first and second argument and returns
            * a new <mxCell> that represents the edge. This is used in <createEdge>.
            */
        factoryMethod: boolean;
        /**
            * Specifies if icons should be displayed inside the graph container instead
            * of the overlay pane. This is used for HTML labels on vertices which hide
            * the connect icon. This has precendence over <moveIconBack> when set
            * to true. Default is false.
            */
        moveIconFront: boolean;
        /**
            * Specifies if icons should be moved to the back of the overlay pane. This can
            * be set to true if the icons of the connection handler conflict with other
            * handles, such as the vertex label move handle. Default is false.
            */
        moveIconBack: boolean;
        /**
            * <mxImage> that is used to trigger the creation of a new connection. This
            * is used in <createIcons>. Default is null.
            */
        connectImage: any;
        /**
            * Specifies if the connect icon should be centered on the target state
            * while connections are being previewed. Default is false.
            */
        targetConnectImage: boolean;
        /**
            * Specifies if events are handled. Default is true.
            */
        enabled: boolean;
        /**
            * Specifies if new edges should be selected. Default is true.
            */
        select: boolean;
        /**
            * Specifies if <createTargetVertex> should be called if no target was under the
            * mouse for the new connection. Setting this to true means the connection
            * will be drawn as valid if no target is under the mouse, and
            * <createTargetVertex> will be called before the connection is created between
            * the source cell and the newly created vertex in <createTargetVertex>, which
            * can be overridden to create a new target. Default is false.
            */
        createTarget: boolean;
        /**
            * Holds the <mxTerminalMarker> used for finding source and target cells.
            */
        marker: any;
        /**
            * Holds the <mxConstraintHandler> used for drawing and highlighting
            * constraints.
            */
        constraintHandler: any;
        /**
            * Holds the current validation error while connections are being created.
            */
        error: any;
        /**
            * Specifies if single clicks should add waypoints on the new edge. Default is
            * false.
            */
        waypointsEnabled: boolean;
        /**
            * Specifies if the connection handler should ignore the state of the mouse
            * button when highlighting the source. Default is false, that is, the
            * handler only highlights the source if no button is being pressed.
            */
        ignoreMouseDown: boolean;
        /**
            * Holds the <mxPoint> where the mouseDown took place while the handler is
            * active.
            */
        first: any;
        /**
            * Holds the offset for connect icons during connection preview.
            * Default is mxPoint(0, <mxConstants.TOOLTIP_VERTICAL_OFFSET>).
            * Note that placing the icon under the mouse pointer with an
            * offset of (0,0) will affect hit detection.
            */
        connectIconOffset: mxPoint;
        /**
            * Optional <mxCellState> that represents the preview edge while the
            * handler is active. This is created in <createEdgeState>.
            */
        edgeState: any;
        /**
            * Holds the change event listener for later removal.
            */
        changeHandler: any;
        /**
            * Holds the drill event listener for later removal.
            */
        drillHandler: any;
        /**
            * Counts the number of mouseDown events since the start. The initial mouse
            * down event counts as 1.
            */
        mouseDownCounter: number;
        /**
            * Switch to enable moving the preview away from the mousepointer. This is required in browsers
            * where the preview cannot be made transparent to events and if the built-in hit detection on
            * the HTML elements in the page should be used. Default is the value of <mxClient.IS_VML>.
            */
        movePreviewAway: boolean;
        /**
            * Specifies if connections to the outline of a highlighted target should be
            * enabled. This will allow to place the connection point along the outline of
            * the highlighted target. Default is false.
            */
        outlineConnect: boolean;
        /**
            * Specifies if the actual shape of the edge state should be used for the preview.
            * Default is false. (Ignored if no edge state is created in <createEdgeState>.)
            */
        livePreview: boolean;
        /**
            * Specifies the cursor to be used while the handler is active. Default is null.
            */
        cursor: any;
        /**
            * Specifies if new edges should be inserted before the source vertex in the
            * cell hierarchy. Default is false for backwards compatibility.
            */
        insertBeforeSource: boolean;
        /**
            * Implicit variable declarations
            */
        previous: any;
        escapeHandler: any;
        /**
            * Constructs an event handler that connects vertices using the specified
            * factory method to create the new edges. Modify
            * <mxConstants.ACTIVE_REGION> to setup the region on a cell which triggers
            * the creation of a new connection or use connect icons as explained
            * above.
            *
            * @param graph - Reference to the enclosing <mxGraph>.
            * @param factoryMethod - Optional function to create the edge. The function takes
            * the source and target <mxCell> as the first and second argument and an
            * optional cell style from the preview as the third argument. It returns
            * the <mxCell> that represents the new edge.
            */
        constructor(graph?: any, factoryMethod?: any);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): boolean;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns <insertBeforeSource> for non-loops and false for loops.
            *
            * Parameters:
            *
            * edge - <mxCell> that represents the edge to be inserted.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            * evt - Mousedown event of the connect gesture.
            * dropTarget - <mxCell> that represents the cell under the mouse when it was
            * released.
            */
        isInsertBefore(edge: any, source: any, target: any, evt: any, dropTarget: any): boolean;
        /**
            * Returns <createTarget>.
            *
            * Parameters:
            *
            * evt - Current active native pointer event.
            */
        isCreateTarget(evt: any): boolean;
        /**
            * Sets <createTarget>.
            */
        setCreateTarget(value: any): void;
        /**
            * Creates the preview shape for new connections.
            */
        createShape(): any;
        /**
            * Initializes the shapes required for this connection handler. This should
            * be invoked if <mxGraph.container> is assigned after the connection
            * handler has been created.
            */
        init(): void;
        /**
            * Returns true if the given cell is connectable. This is a hook to
            * disable floating connections. This implementation returns true.
            */
        isConnectableCell(cell: any): boolean;
        /**
            * Creates and returns the <mxCellMarker> used in <marker>.
            */
        createMarker(): any;
        /**
            * Starts a new connection for the given state and coordinates.
            */
        start(state: any, x: any, y: any, edgeState: any): void;
        /**
            * Returns true if the source terminal has been clicked and a new
            * connection is currently being previewed.
            */
        isConnecting(): boolean;
        /**
            * Returns <mxGraph.isValidSource> for the given source terminal.
            *
            * Parameters:
            *
            * cell - <mxCell> that represents the source terminal.
            * me - <mxMouseEvent> that is associated with this call.
            */
        isValidSource(cell: any, me: any): any;
        /**
            * Returns true. The call to <mxGraph.isValidTarget> is implicit by calling
            * <mxGraph.getEdgeValidationError> in <validateConnection>. This is an
            * additional hook for disabling certain targets in this specific handler.
            *
            * Parameters:
            *
            * cell - <mxCell> that represents the target terminal.
            */
        isValidTarget(cell: any): boolean;
        /**
            * Returns the error message or an empty string if the connection for the
            * given source target pair is not valid. Otherwise it returns null. This
            * implementation uses <mxGraph.getEdgeValidationError>.
            *
            * Parameters:
            *
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            */
        validateConnection(source: any, target: any): any;
        /**
            * Hook to return the <mxImage> used for the connection icon of the given
            * <mxCellState>. This implementation returns <connectImage>.
            *
            * Parameters:
            *
            * state - <mxCellState> whose connect image should be returned.
            */
        getConnectImage(state: any): any;
        /**
            * Returns true if the state has a HTML label in the graph's container, otherwise
            * it returns <moveIconFront>.
            *
            * Parameters:
            *
            * state - <mxCellState> whose connect icons should be returned.
            */
        isMoveIconToFrontForState(state: any): boolean;
        /**
            * Creates the array <mxImageShapes> that represent the connect icons for
            * the given <mxCellState>.
            *
            * Parameters:
            *
            * state - <mxCellState> whose connect icons should be returned.
            */
        createIcons(state: any): any[];
        /**
            * Redraws the given array of <mxImageShapes>.
            *
            * Parameters:
            *
            * icons - Optional array of <mxImageShapes> to be redrawn.
            */
        redrawIcons(icons: any, state: any): void;
        /**
            * Redraws the given array of <mxImageShapes>.
            *
            * Parameters:
            *
            * icons - Optional array of <mxImageShapes> to be redrawn.
            */
        getIconPosition(icon: any, state: any): mxPoint;
        /**
            * Destroys the connect icons and resets the respective state.
            */
        destroyIcons(): void;
        /**
            * Returns true if the given mouse down event should start this handler. The
            * This implementation returns true if the event does not force marquee
            * selection, and the currentConstraint and currentFocus of the
            * <constraintHandler> are not null, or <previous> and <error> are not null and
            * <icons> is null or <icons> and <icon> are not null.
            */
        isStartEvent(me: any): boolean;
        /**
            * Handles the event by initiating a new connection.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Returns true if a tap on the given source state should immediately start
            * connecting. This implementation returns true if the state is not movable
            * in the graph.
            */
        isImmediateConnectSource(state: any): boolean;
        /**
            * Hook to return an <mxCellState> which may be used during the preview.
            * This implementation returns null.
            *
            * Use the following code to create a preview for an existing edge style:
            *
            * (code)
            * graph.connectionHandler.createEdgeState = function(me)
            * {
            *   var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=elbowEdgeStyle');
            *
            *   return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
            * };
            * (end)
            */
        createEdgeState(me: any): any;
        /**
            * Returns true if <outlineConnect> is true and the source of the event is the outline shape
            * or shift is pressed.
            */
        isOutlineConnectEvent(me: any): any;
        /**
            * Updates the current state for a given mouse move event by using
            * the <marker>.
            */
        updateCurrentState(me: any, point: any): void;
        /**
            * Converts the given point from screen coordinates to model coordinates.
            */
        convertWaypoint(point: any): void;
        /**
            * Called to snap the given point to the current preview. This snaps to the
            * first point of the preview if alt is not pressed.
            */
        snapToPreview(me: any, point: any): void;
        /**
            * Handles the event by updating the preview edge or by highlighting
            * a possible source or target terminal.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Updates <edgeState>.
            */
        updateEdgeState(current: any, constraint: any): void;
        /**
            * Returns the perimeter point for the given target state.
            *
            * Parameters:
            *
            * state - <mxCellState> that represents the target cell state.
            * me - <mxMouseEvent> that represents the mouse move.
            */
        getTargetPerimeterPoint(state: any, me: any): any;
        /**
            * Hook to update the icon position(s) based on a mouseOver event. This is
            * an empty implementation.
            *
            * Parameters:
            *
            * state - <mxCellState> that represents the target cell state.
            * next - <mxPoint> that represents the next point along the previewed edge.
            * me - <mxMouseEvent> that represents the mouse move.
            */
        getSourcePerimeterPoint(state: any, next: any, me: any): any;
        /**
            * Hook to update the icon position(s) based on a mouseOver event. This is
            * an empty implementation.
            *
            * Parameters:
            *
            * state - <mxCellState> under the mouse.
            * icons - Array of currently displayed icons.
            * me - <mxMouseEvent> that contains the mouse event.
            */
        updateIcons(state: any, icons: any, me: any): void;
        /**
            * Returns true if the given mouse up event should stop this handler. The
            * connection will be created if <error> is null. Note that this is only
            * called if <waypointsEnabled> is true. This implemtation returns true
            * if there is a cell state in the given event.
            */
        isStopEvent(me: any): boolean;
        /**
            * Adds the waypoint for the given event to <waypoints>.
            */
        addWaypointForEvent(me: any): void;
        /**
            * Handles the event by inserting the new connection.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Resets the state of this handler.
            */
        reset(): void;
        /**
            * Redraws the preview edge using the color and width returned by
            * <getEdgeColor> and <getEdgeWidth>.
            */
        drawPreview(): void;
        /**
            * Returns the color used to draw the preview edge. This returns green if
            * there is no edge validation error and red otherwise.
            *
            * Parameters:
            *
            * valid - Boolean indicating if the color for a valid edge should be
            * returned.
            */
        updatePreview(valid: any): void;
        /**
            * Returns the color used to draw the preview edge. This returns green if
            * there is no edge validation error and red otherwise.
            *
            * Parameters:
            *
            * valid - Boolean indicating if the color for a valid edge should be
            * returned.
            */
        getEdgeColor(valid: any): string;
        /**
            * Returns the width used to draw the preview edge. This returns 3 if
            * there is no edge validation error and 1 otherwise.
            *
            * Parameters:
            *
            * valid - Boolean indicating if the width for a valid edge should be
            * returned.
            */
        getEdgeWidth(valid: any): 1 | 3;
        /**
            * Connects the given source and target using a new edge. This
            * implementation uses <createEdge> to create the edge.
            *
            * Parameters:
            *
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            * evt - Mousedown event of the connect gesture.
            * dropTarget - <mxCell> that represents the cell under the mouse when it was
            * released.
            */
        connect(source: any, target: any, evt: any, dropTarget: any): void;
        /**
            * Selects the given edge after adding a new connection. The target argument
            * contains the target vertex if one has been inserted.
            */
        selectCells(edge: any, target: any): void;
        /**
            * Creates, inserts and returns the new edge for the given parameters. This
            * implementation does only use <createEdge> if <factoryMethod> is defined,
            * otherwise <mxGraph.insertEdge> will be used.
            */
        insertEdge(parent: any, id: any, value: any, source: any, target: any, style: any): any;
        /**
            * Hook method for creating new vertices on the fly if no target was
            * under the mouse. This is only called if <createTarget> is true and
            * returns null.
            *
            * Parameters:
            *
            * evt - Mousedown event of the connect gesture.
            * source - <mxCell> that represents the source terminal.
            */
        createTargetVertex(evt: any, source: any): any;
        /**
            * Returns the tolerance for aligning new targets to sources. This returns the grid size / 2.
            */
        getAlignmentTolerance(evt: any): any;
        /**
            * Creates and returns a new edge using <factoryMethod> if one exists. If
            * no factory method is defined, then a new default edge is returned. The
            * source and target arguments are informal, the actual connection is
            * setup later by the caller of this function.
            *
            * Parameters:
            *
            * value - Value to be used for creating the edge.
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            * style - Optional style from the preview edge.
            */
        createEdge(value: any, source: any, target: any, style: any): any;
        /**
            * Destroys the handler and all its resources and DOM nodes. This should be
            * called on all instances. It is called automatically for the built-in
            * instance created for each <mxGraph>.
            */
        destroy(): void;
    }

    /**
        * Handles constraints on connection targets. This class is in charge of
        * showing fixed points when the mouse is over a vertex and handles constraints
        * to establish new connections.
        *
        * Constructor: mxConstraintHandler
        *
        * Constructs an new constraint handler.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * factoryMethod - Optional function to create the edge. The function takes
        * the source and target <mxCell> as the first and second argument and
        * returns the <mxCell> that represents the new edge.
        */
    export class mxConstraintHandler {
        constructor(graph: any);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(enabled: any): void;
        /**
            * Resets the state of this handler.
            */
        reset(): void;
        /**
            * Returns the tolerance to be used for intersecting connection points. This
            * implementation returns <mxGraph.tolerance>.
            *
            * Parameters:
            *
            * me - <mxMouseEvent> whose tolerance should be returned.
            */
        getTolerance(me: any): any;
        /**
            * Returns the tolerance to be used for intersecting connection points.
            */
        getImageForConstraint(state: any, constraint: any, point: any): any;
        /**
            * Returns true if the given <mxMouseEvent> should be ignored in <update>. This
            * implementation always returns false.
            */
        isEventIgnored(me: any, source: any): boolean;
        /**
            * Returns true if the given state should be ignored. This always returns false.
            */
        isStateIgnored(state: any, source: any): boolean;
        /**
            * Destroys the <focusIcons> if they exist.
            */
        destroyIcons(): void;
        /**
            * Destroys the <focusHighlight> if one exists.
            */
        destroyFocusHighlight(): void;
        /**
            * Returns true if the current focused state should not be changed for the given event.
            * This returns true if shift and alt are pressed.
            */
        isKeepFocusEvent(me: any): boolean;
        /**
            * Returns the cell for the given event.
            */
        getCellForEvent(me: any, point: any): any;
        /**
            * Updates the state of this handler based on the given <mxMouseEvent>.
            * Source is a boolean indicating if the cell is a source or target.
            */
        update(me: any, source: any, existingEdge: any, point: any): void;
        /**
            * Transfers the focus to the given state as a source or target terminal. If
            * the handler is not enabled then the outline is painted, but the constraints
            * are ignored.
            */
        redraw(): void;
        /**
            * Transfers the focus to the given state as a source or target terminal. If
            * the handler is not enabled then the outline is painted, but the constraints
            * are ignored.
            */
        setFocus(me: any, state: any, source: any): void;
        /**
            * Create the shape used to paint the highlight.
            *
            * Returns true if the given icon intersects the given point.
            */
        createHighlightShape(): mxRectangleShape;
        /**
            * Returns true if the given icon intersects the given rectangle.
            */
        intersects(icon: any, mouse: any, source: any, existingEdge: any): any;
        /**
            * Destroy this handler.
            */
        destroy(): void;
    }

    /**
        * Event handler that selects rectangular regions. This is not built-into
        * <mxGraph>. To enable rubberband selection in a graph, use the following code.
        *
        * Example:
        *
        * (code)
        * var rubberband = new mxRubberband(graph);
        * (end)
        *
        * Constructor: mxRubberband
        *
        * Constructs an event handler that selects rectangular regions in the graph
        * using rubberband selection.
        */
    export class mxRubberband {
        constructor(graph: any);
        /**
            * Returns true if events are handled. This implementation returns
            * <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation updates
            * <enabled>.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns true if the given <mxMouseEvent> should start rubberband selection.
            * This implementation returns true if the alt key is pressed.
            */
        isForceRubberbandEvent(me: any): boolean;
        /**
            * Handles the event by initiating a rubberband selection. By consuming the
            * event all subsequent events of the gesture are redirected to this
            * handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Sets the start point for the rubberband selection.
            */
        start(x: any, y: any): void;
        /**
            * Handles the event by updating therubberband selection.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Creates the rubberband selection shape.
            */
        createShape(): any;
        /**
            * Returns true if this handler is active.
            */
        isActive(sender: any, me: any): boolean;
        /**
            * Handles the event by selecting the region of the rubberband using
            * <mxGraph.selectRegion>.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Resets the state of this handler and selects the current region
            * for the given event.
            */
        execute(evt: any): void;
        /**
            * Resets the state of the rubberband selection.
            */
        reset(): void;
        /**
            * Sets <currentX> and <currentY> and calls <repaint>.
            */
        update(x: any, y: any): void;
        /**
            * Computes the bounding box and updates the style of the <div>.
            */
        repaint(): void;
        /**
            * Destroys the handler and all its resources and DOM nodes. This does
            * normally not need to be called, it is called automatically when the
            * window unloads.
            */
        destroy(): void;
    }

    /**
        * Implements a single custom handle for vertices.
        *
        * Constructor: mxHandle
        *
        * Constructs a new handle for the given state.
        *
        * Parameters:
        *
        * state - <mxCellState> of the cell to be handled.
        */
    export class mxHandle {
        constructor(state: any, cursor: any, image: any);
        /**
            * Hook for subclassers to return the current position of the handle.
            */
        getPosition(bounds: any): void;
        /**
            * Hooks for subclassers to update the style in the <state>.
            */
        setPosition(bounds: any, pt: any, me: any): void;
        /**
            * Hook for subclassers to execute the handle.
            */
        execute(): void;
        /**
            * Sets the cell style with the given name to the corresponding value in <state>.
            */
        copyStyle(key: any): void;
        /**
            * Processes the given <mxMouseEvent> and invokes <setPosition>.
            */
        processEvent(me: any): void;
        /**
            * Called after <setPosition> has been called in <processEvent>. This repaints
            * the state using <mxCellRenderer>.
            */
        positionChanged(): void;
        /**
            * Returns the rotation defined in the style of the cell.
            */
        getRotation(): any;
        /**
            * Returns the rotation from the style and the rotation from the direction of
            * the cell.
            */
        getTotalRotation(): any;
        /**
            * Creates and initializes the shapes required for this handle.
            */
        init(): void;
        /**
            * Creates and returns the shape for this handle.
            */
        createShape(html: any): mxRectangleShape;
        /**
            * Initializes <shape> and sets its cursor.
            */
        initShape(html: any): void;
        /**
            * Renders the shape for this handle.
            */
        redraw(): void;
        /**
            * Returns true if this handle should be rendered in HTML. This returns true if
            * the text node is in the graph container.
            */
        isHtmlRequired(): boolean;
        /**
            * Rotates the point by the given angle.
            */
        rotatePoint(pt: any, alpha: any): any;
        /**
            * Flips the given point vertically and/or horizontally.
            */
        flipPoint(pt: any): any;
        /**
            * Snaps the given point to the grid if ignore is false. This modifies
            * the given point in-place and also returns it.
            */
        snapPoint(pt: any, ignore: any): any;
        /**
            * Shows or hides this handle.
            */
        setVisible(visible: any): void;
        /**
            * Resets the state of this handle by setting its visibility to true.
            */
        reset(): void;
        /**
            * Destroys this handle.
            */
        destroy(): void;
    }

    /**
        * Event handler for resizing cells. This handler is automatically created in
        * <mxGraph.createHandler>.
        *
        * Constructor: mxVertexHandler
        *
        * Constructs an event handler that allows to resize vertices
        * and groups.
        *
        * Parameters:
        *
        * state - <mxCellState> of the cell to be resized.
        */
    export class mxVertexHandler {
        constructor(state: any);
        /**
            * Initializes the shapes required for this vertex handler.
            */
        init(): void;
        /**
            * Returns true if the rotation handle should be showing.
            */
        isRotationHandleVisible(): boolean;
        /**
            * Returns true if the aspect ratio if the cell should be maintained.
            */
        isConstrainedEvent(me: any): boolean;
        /**
            * Returns true if the center of the vertex should be maintained during the resize.
            */
        isCenteredEvent(state: any, me: any): boolean;
        /**
            * Returns an array of custom handles. This implementation returns null.
            */
        createCustomHandles(): any;
        /**
            * Initializes the shapes required for this vertex handler.
            */
        updateMinBounds(): void;
        /**
            * Returns the mxRectangle that defines the bounds of the selection
            * border.
            */
        getSelectionBounds(state: any): mxRectangle;
        /**
            * Creates the shape used to draw the selection border.
            */
        createParentHighlightShape(bounds: any): mxRectangleShape;
        /**
            * Creates the shape used to draw the selection border.
            */
        createSelectionShape(bounds: any): mxRectangleShape;
        /**
            * Returns <mxConstants.VERTEX_SELECTION_COLOR>.
            */
        getSelectionColor(): string;
        /**
            * Returns <mxConstants.VERTEX_SELECTION_STROKEWIDTH>.
            */
        getSelectionStrokeWidth(): number;
        /**
            * Returns <mxConstants.VERTEX_SELECTION_DASHED>.
            */
        isSelectionDashed(): boolean;
        /**
            * Creates a sizer handle for the specified cursor and index and returns
            * the new <mxRectangleShape> that represents the handle.
            */
        createSizer(cursor: any, index: any, size: any, fillColor: any): any;
        /**
            * Returns true if the sizer for the given index is visible.
            * This returns true for all given indices.
            */
        isSizerVisible(index: any): boolean;
        /**
            * Creates the shape used for the sizer handle for the specified bounds an
            * index. Only images and rectangles should be returned if support for HTML
            * labels with not foreign objects is required.
            */
        createSizerShape(bounds: any, index: any, fillColor: any): any;
        /**
            * Helper method to create an <mxRectangle> around the given centerpoint
            * with a width and height of 2*s or 6, if no s is given.
            */
        moveSizerTo(shape: any, x: any, y: any): void;
        /**
            * Returns the index of the handle for the given event. This returns the index
            * of the sizer from where the event originated or <mxEvent.LABEL_INDEX>.
            */
        getHandleForEvent(me: any): number;
        /**
            * Returns true if the given event allows custom handles to be changed. This
            * implementation returns true.
            */
        isCustomHandleEvent(me: any): boolean;
        /**
            * Handles the event if a handle has been clicked. By consuming the
            * event all subsequent events of the gesture are redirected to this
            * handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Called if <livePreview> is enabled to check if a border should be painted.
            * This implementation returns true if the shape is transparent.
            */
        isLivePreviewBorder(): boolean;
        /**
            * Starts the handling of the mouse gesture.
            */
        start(x: any, y: any, index: any): void;
        /**
            * Shortcut to <hideSizers>.
            */
        setHandlesVisible(visible: any): void;
        /**
            * Hides all sizers except.
            *
            * Starts the handling of the mouse gesture.
            */
        hideSizers(): void;
        /**
            * Checks if the coordinates for the given event are within the
            * <mxGraph.tolerance>. If the event is a mouse event then the tolerance is
            * ignored.
            */
        checkTolerance(me: any): void;
        /**
            * Hook for subclassers do show details while the handler is active.
            */
        updateHint(me: any): void;
        /**
            * Hooks for subclassers to hide details when the handler gets inactive.
            */
        removeHint(): void;
        /**
            * Hook for rounding the angle. This uses Math.round.
            */
        roundAngle(angle: any): number;
        /**
            * Hook for rounding the unscaled width or height. This uses Math.round.
            */
        roundLength(length: any): number;
        /**
            * Handles the event by updating the preview.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Rotates the vertex.
            */
        moveLabel(me: any): void;
        /**
            * Rotates the vertex.
            */
        rotateVertex(me: any): void;
        /**
            * Rotates the vertex.
            */
        resizeVertex(me: any): void;
        /**
            * Repaints the live preview.
            */
        updateLivePreview(me: any): void;
        /**
            * Handles the event by applying the changes to the geometry.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Rotates the given cell to the given rotation.
            */
        isRecursiveResize(state: any, me: any): any;
        /**
            * Hook for subclassers to implement a single click on the rotation handle.
            * This code is executed as part of the model transaction. This implementation
            * is empty.
            */
        rotateClick(): void;
        /**
            * Rotates the given cell and its children by the given angle in degrees.
            *
            * Parameters:
            *
            * cell - <mxCell> to be rotated.
            * angle - Angle in degrees.
            */
        rotateCell(cell: any, angle: any, parent: any): void;
        /**
            * Resets the state of this handler.
            */
        reset(): void;
        /**
            * Uses the given vector to change the bounds of the given cell
            * in the graph using <mxGraph.resizeCell>.
            */
        resizeCell(cell: any, dx: any, dy: any, index: any, gridEnabled: any, constrained: any, recurse: any): void;
        /**
            * Moves the children of the given cell by the given vector.
            */
        moveChildren(cell: any, dx: any, dy: any): void;
        /**
            * Returns the union of the given bounds and location for the specified
            * handle index.
            *
            * To override this to limit the size of vertex via a minWidth/-Height style,
            * the following code can be used.
            *
            * (code)
            * var vertexHandlerUnion = mxVertexHandler.prototype.union;
            * mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr, constrained)
            * {
            *   var result = vertexHandlerUnion.apply(this, arguments);
            *
            *   result.width = Math.max(result.width, mxUtils.getNumber(this.state.style, 'minWidth', 0));
            *   result.height = Math.max(result.height, mxUtils.getNumber(this.state.style, 'minHeight', 0));
            *
            *   return result;
            * };
            * (end)
            *
            * The minWidth/-Height style can then be used as follows:
            *
            * (code)
            * graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'minWidth=100;minHeight=100;');
            * (end)
            *
            * To override this to update the height for a wrapped text if the width of a vertex is
            * changed, the following can be used.
            *
            * (code)
            * var mxVertexHandlerUnion = mxVertexHandler.prototype.union;
            * mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr, constrained)
            * {
            *   var result = mxVertexHandlerUnion.apply(this, arguments);
            *   var s = this.state;
            *
            *   if (this.graph.isHtmlLabel(s.cell) && (index == 3 || index == 4) &&
            *       s.text != null && s.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap')
            *   {
            *     var label = this.graph.getLabel(s.cell);
            *     var fontSize = mxUtils.getNumber(s.style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
            *     var ww = result.width / s.view.scale - s.text.spacingRight - s.text.spacingLeft
            *
            *     result.height = mxUtils.getSizeForString(label, fontSize, s.style[mxConstants.STYLE_FONTFAMILY], ww).height;
            *   }
            *
            *   return result;
            * };
            * (end)
            */
        union(bounds: any, dx: any, dy: any, index: any, gridEnabled: any, scale: any, tr: any, constrained: any, centered: any): mxRectangle;
        /**
            * Redraws the handles and the preview.
            */
        redraw(): void;
        /**
            * Returns the padding to be used for drawing handles for the current <bounds>.
            */
        getHandlePadding(): mxPoint;
        /**
            * Redraws the handles. To hide certain handles the following code can be used.
            *
            * (code)
            * mxVertexHandler.prototype.redrawHandles = function()
            * {
            *   mxVertexHandlerRedrawHandles.apply(this, arguments);
            *
            *   if (this.sizers != null && this.sizers.length > 7)
            *   {
            *     this.sizers[1].node.style.display = 'none';
            *     this.sizers[6].node.style.display = 'none';
            *   }
            * };
            * (end)
            */
        redrawHandles(): void;
        /**
            * Updates the highlight of the parent if <parentHighlightEnabled> is true.
            */
        updateParentHighlight(): void;
        /**
            * Redraws the preview.
            */
        drawPreview(): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Graph event handler that reconnects edges and modifies control points and
        * the edge label location. Uses <mxTerminalMarker> for finding and
        * highlighting new source and target vertices. This handler is automatically
        * created in <mxGraph.createHandler> for each selected edge.
        *
        * To enable adding/removing control points, the following code can be used:
        *
        * (code)
        * mxEdgeHandler.prototype.addEnabled = true;
        * mxEdgeHandler.prototype.removeEnabled = true;
        * (end)
        *
        * Note: This experimental feature is not recommended for production use.
        *
        * Constructor: mxEdgeHandler
        *
        * Constructs an edge handler for the specified <mxCellState>.
        *
        * Parameters:
        *
        * state - <mxCellState> of the cell to be handled.
        */
    export class mxEdgeHandler {
        constructor(state: any);
        /**
            * Initializes the shapes required for this edge handler.
            */
        init(): void;
        /**
            * Returns an array of custom handles. This implementation returns null.
            */
        createCustomHandles(): any;
        /**
            * Returns true if virtual bends should be added. This returns true if
            * <virtualBendsEnabled> is true and the current style allows and
            * renders custom waypoints.
            */
        isVirtualBendsEnabled(evt: any): boolean;
        /**
            * Returns true if the given event is a trigger to add a new point. This
            * implementation returns true if shift is pressed.
            */
        isAddPointEvent(evt: any): boolean;
        /**
            * Returns true if the given event is a trigger to remove a point. This
            * implementation returns true if shift is pressed.
            */
        isRemovePointEvent(evt: any): boolean;
        /**
            * Returns the list of points that defines the selection stroke.
            */
        getSelectionPoints(state: any): any;
        /**
            * Creates the shape used to draw the selection border.
            */
        createParentHighlightShape(bounds: any): mxRectangleShape;
        /**
            * Creates the shape used to draw the selection border.
            */
        createSelectionShape(points: any): any;
        /**
            * Returns <mxConstants.EDGE_SELECTION_COLOR>.
            */
        getSelectionColor(): string;
        /**
            * Returns <mxConstants.EDGE_SELECTION_STROKEWIDTH>.
            */
        getSelectionStrokeWidth(): number;
        /**
            * Returns <mxConstants.EDGE_SELECTION_DASHED>.
            */
        isSelectionDashed(): boolean;
        /**
            * Returns true if the given cell is connectable. This is a hook to
            * disable floating connections. This implementation returns true.
            */
        isConnectableCell(cell: any): boolean;
        /**
            * Creates and returns the <mxCellMarker> used in <marker>.
            */
        getCellAt(x: any, y: any): any;
        /**
            * Creates and returns the <mxCellMarker> used in <marker>.
            */
        createMarker(): any;
        /**
            * Returns the error message or an empty string if the connection for the
            * given source, target pair is not valid. Otherwise it returns null. This
            * implementation uses <mxGraph.getEdgeValidationError>.
            *
            * Parameters:
            *
            * source - <mxCell> that represents the source terminal.
            * target - <mxCell> that represents the target terminal.
            */
        validateConnection(source: any, target: any): any;
        /**
            * Creates and returns the bends used for modifying the edge. This is
            * typically an array of <mxRectangleShapes>.
            */
        createBends(): any[];
        /**
            * Creates and returns the bends used for modifying the edge. This is
            * typically an array of <mxRectangleShapes>.
            */
        createVirtualBends(): any[];
        /**
            * Creates the shape used to display the given bend.
            */
        isHandleEnabled(index: any): boolean;
        /**
            * Returns true if the handle at the given index is visible.
            */
        isHandleVisible(index: any): boolean;
        /**
            * Creates the shape used to display the given bend. Note that the index may be
            * null for special cases, such as when called from
            * <mxElbowEdgeHandler.createVirtualBend>. Only images and rectangles should be
            * returned if support for HTML labels with not foreign objects is required.
            * Index if null for virtual handles.
            */
        createHandleShape(index: any): any;
        /**
            * Creates the shape used to display the the label handle.
            */
        createLabelHandleShape(): any;
        /**
            * Helper method to initialize the given bend.
            *
            * Parameters:
            *
            * bend - <mxShape> that represents the bend to be initialized.
            */
        initBend(bend: any, dblClick: any): void;
        /**
            * Returns the index of the handle for the given event.
            */
        getHandleForEvent(me: any): any;
        /**
            * Returns true if the given event allows virtual bends to be added. This
            * implementation returns true.
            */
        isAddVirtualBendEvent(me: any): boolean;
        /**
            * Returns true if the given event allows custom handles to be changed. This
            * implementation returns true.
            */
        isCustomHandleEvent(me: any): boolean;
        /**
            * Handles the event by checking if a special element of the handler
            * was clicked, in which case the index parameter is non-null. The
            * indices may be one of <LABEL_HANDLE> or the number of the respective
            * control point. The source and target points are used for reconnecting
            * the edge.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Starts the handling of the mouse gesture.
            */
        start(x: any, y: any, index: any): void;
        /**
            * Returns a clone of the current preview state for the given point and terminal.
            */
        clonePreviewState(point: any, terminal: any): any;
        /**
            * Returns the tolerance for the guides. Default value is
            * gridSize * scale / 2.
            */
        getSnapToTerminalTolerance(): number;
        /**
            * Hook for subclassers do show details while the handler is active.
            */
        updateHint(me: any, point: any): void;
        /**
            * Hooks for subclassers to hide details when the handler gets inactive.
            */
        removeHint(): void;
        /**
            * Hook for rounding the unscaled width or height. This uses Math.round.
            */
        roundLength(length: any): number;
        /**
            * Returns true if <snapToTerminals> is true and if alt is not pressed.
            */
        isSnapToTerminalsEvent(me: any): boolean;
        /**
            * Returns the point for the given event.
            */
        getPointForEvent(me: any): mxPoint;
        /**
            * Updates the given preview state taking into account the state of the constraint handler.
            */
        getPreviewTerminalState(me: any): any;
        /**
            * Updates the given preview state taking into account the state of the constraint handler.
            *
            * Parameters:
            *
            * pt - <mxPoint> that contains the current pointer position.
            * me - Optional <mxMouseEvent> that contains the current event.
            */
        getPreviewPoints(pt: any, me: any): any;
        /**
            * Returns true if <outlineConnect> is true and the source of the event is the outline shape
            * or shift is pressed.
            */
        isOutlineConnectEvent(me: any): any;
        /**
            * Updates the given preview state taking into account the state of the constraint handler.
            */
        updatePreviewState(edge: any, point: any, terminalState: any, me: any, outline: any): void;
        /**
            * Handles the event by updating the preview.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Handles the event to applying the previewed changes on the edge by
            * using <moveLabel>, <connect> or <changePoints>.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Resets the state of this handler.
            */
        reset(): void;
        /**
            * Sets the color of the preview to the given value.
            */
        setPreviewColor(color: any): void;
        /**
            * Converts the given point in-place from screen to unscaled, untranslated
            * graph coordinates and applies the grid. Returns the given, modified
            * point instance.
            *
            * Parameters:
            *
            * point - <mxPoint> to be converted.
            * gridEnabled - Boolean that specifies if the grid should be applied.
            */
        convertPoint(point: any, gridEnabled: any): any;
        /**
            * Changes the coordinates for the label of the given edge.
            *
            * Parameters:
            *
            * edge - <mxCell> that represents the edge.
            * x - Integer that specifies the x-coordinate of the new location.
            * y - Integer that specifies the y-coordinate of the new location.
            */
        moveLabel(edgeState: any, x: any, y: any): void;
        /**
            * Changes the terminal or terminal point of the given edge in the graph
            * model.
            *
            * Parameters:
            *
            * edge - <mxCell> that represents the edge to be reconnected.
            * terminal - <mxCell> that represents the new terminal.
            * isSource - Boolean indicating if the new terminal is the source or
            * target terminal.
            * isClone - Boolean indicating if the new connection should be a clone of
            * the old edge.
            * me - <mxMouseEvent> that contains the mouse up event.
            */
        connect(edge: any, terminal: any, isSource: any, isClone: any, me: any): any;
        /**
            * Changes the terminal point of the given edge.
            */
        changeTerminalPoint(edge: any, point: any, isSource: any, clone: any): any;
        /**
            * Changes the control points of the given edge in the graph model.
            */
        changePoints(edge: any, points: any, clone: any): any;
        /**
            * Adds a control point for the given state and event.
            */
        addPoint(state: any, evt: any): void;
        /**
            * Adds a control point at the given point.
            */
        addPointAt(state: any, x: any, y: any): void;
        /**
            * Removes the control point at the given index from the given state.
            */
        removePoint(state: any, index: any): void;
        /**
            * Returns the fillcolor for the handle at the given index.
            */
        getHandleFillColor(index: any): string;
        /**
            * Redraws the preview, and the bends- and label control points.
            */
        redraw(): void;
        /**
            * Redraws the handles.
            */
        redrawHandles(): void;
        /**
            * Shortcut to <hideSizers>.
            */
        setHandlesVisible(visible: any): void;
        /**
            * Updates and redraws the inner bends.
            *
            * Parameters:
            *
            * p0 - <mxPoint> that represents the location of the first point.
            * pe - <mxPoint> that represents the location of the last point.
            */
        redrawInnerBends(p0: any, pe: any): void;
        /**
            * Checks if the label handle intersects the given bounds and moves it if it
            * intersects.
            */
        checkLabelHandle(b: any): void;
        /**
            * Redraws the preview.
            */
        drawPreview(): void;
        /**
            * Refreshes the bends of this handler.
            */
        refresh(): void;
        /**
            * Destroys all elements in <bends>.
            */
        destroyBends(bends: any): void;
        /**
            * Destroys the handler and all its resources and DOM nodes. This does
            * normally not need to be called as handlers are destroyed automatically
            * when the corresponding cell is deselected.
            */
        destroy(): void;
    }

    /**
        * Graph event handler that reconnects edges and modifies control points and
        * the edge label location. Uses <mxTerminalMarker> for finding and
        * highlighting new source and target vertices. This handler is automatically
        * created in <mxGraph.createHandler>. It extends <mxEdgeHandler>.
        *
        * Constructor: mxEdgeHandler
        *
        * Constructs an edge handler for the specified <mxCellState>.
        *
        * Parameters:
        *
        * state - <mxCellState> of the cell to be modified.
        */
    export class mxElbowEdgeHandler extends mxEdgeHandler {
        constructor(state: any);
        /**
            * Overrides <mxEdgeHandler.createBends> to create custom bends.
            */
        createBends(): any[];
        /**
            * Creates a virtual bend that supports double clicking and calls
            * <mxGraph.flipEdge>.
            */
        createVirtualBend(dblClickHandler: any): any;
        /**
            * Returns the cursor to be used for the bend.
            */
        getCursorForBend(): "row-resize" | "col-resize";
        /**
            * Returns the tooltip for the given node.
            */
        getTooltipForNode(node: any): any;
        /**
            * Converts the given point in-place from screen to unscaled, untranslated
            * graph coordinates and applies the grid.
            *
            * Parameters:
            *
            * point - <mxPoint> to be converted.
            * gridEnabled - Boolean that specifies if the grid should be applied.
            */
        convertPoint(point: any, gridEnabled: any): any;
        /**
            * Updates and redraws the inner bends.
            *
            * Parameters:
            *
            * p0 - <mxPoint> that represents the location of the first point.
            * pe - <mxPoint> that represents the location of the last point.
            */
        redrawInnerBends(p0: any, pe: any): void;
    }


    export class mxEdgeSegmentHandler extends mxElbowEdgeHandler {
        constructor(state: any);
        /**
            * Returns the current absolute points.
            */
        getCurrentPoints(): any;
        /**
            * Updates the given preview state taking into account the state of the constraint handler.
            */
        getPreviewPoints(point: any): any;
        /**
            * Overridden to perform optimization of the edge style result.
            */
        updatePreviewState(edge: any, point: any, terminalState: any, me: any): void;
        /**
            * Overriden to merge edge segments.
            */
        connect(edge: any, terminal: any, isSource: any, isClone: any, me: any): any;
        /**
            * Returns no tooltips.
            */
        getTooltipForNode(node: any): any;
        /**
            * Adds custom bends for the center of each segment.
            */
        start(x: any, y: any, index: any): void;
        /**
            * Adds custom bends for the center of each segment.
            */
        createBends(): any[];
        /**
            * Overridden to invoke <refresh> before the redraw.
            */
        redraw(): void;
        /**
            * Updates the position of the custom bends.
            */
        redrawInnerBends(p0: any, pe: any): void;
    }

    /**
        * Event handler that listens to keystroke events. This is not a singleton,
        * however, it is normally only required once if the target is the document
        * element (default).
        *
        * This handler installs a key event listener in the topmost DOM node and
        * processes all events that originate from descandants of <mxGraph.container>
        * or from the topmost DOM node. The latter means that all unhandled keystrokes
        * are handled by this object regardless of the focused state of the <graph>.
        *
        * Example:
        *
        * The following example creates a key handler that listens to the delete key
        * (46) and deletes the selection cells if the graph is enabled.
        *
        * (code)
        * var keyHandler = new mxKeyHandler(graph);
        * keyHandler.bindKey(46, function(evt)
        * {
        *   if (graph.isEnabled())
        *   {
        *     graph.removeCells();
        *   }
        * });
        * (end)
        *
        * Keycodes:
        *
        * See http://tinyurl.com/yp8jgl or http://tinyurl.com/229yqw for a list of
        * keycodes or install a key event listener into the document element and print
        * the key codes of the respective events to the console.
        *
        * To support the Command key and the Control key on the Mac, the following
        * code can be used.
        *
        * (code)
        * keyHandler.getFunction = function(evt)
        * {
        *   if (evt != null)
        *   {
        *     return (mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey)) ? this.controlKeys[evt.keyCode] : this.normalKeys[evt.keyCode];
        *   }
        *
        *   return null;
        * };
        * (end)
        *
        * Constructor: mxKeyHandler
        *
        * Constructs an event handler that executes functions bound to specific
        * keystrokes.
        *
        * Parameters:
        *
        * graph - Reference to the associated <mxGraph>.
        * target - Optional reference to the event target. If null, the document
        * element is used as the event target, that is, the object where the key
        * event listener is installed.
        */
    export class mxKeyHandler {
        constructor(graph: any, target?: any);
        /**
            * Returns true if events are handled. This implementation returns
            * <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling by updating <enabled>.
            *
            * Parameters:
            *
            * enabled - Boolean that specifies the new enabled state.
            */
        setEnabled(enabled: any): void;
        /**
            * Binds the specified keycode to the given function. This binding is used
            * if the control key is not pressed.
            *
            * Parameters:
            *
            * code - Integer that specifies the keycode.
            * funct - JavaScript function that takes the key event as an argument.
            */
        bindKey(code: any, funct: any): void;
        /**
            * Binds the specified keycode to the given function. This binding is used
            * if the shift key is pressed.
            *
            * Parameters:
            *
            * code - Integer that specifies the keycode.
            * funct - JavaScript function that takes the key event as an argument.
            */
        bindShiftKey(code: any, funct: any): void;
        /**
            * Binds the specified keycode to the given function. This binding is used
            * if the control key is pressed.
            *
            * Parameters:
            *
            * code - Integer that specifies the keycode.
            * funct - JavaScript function that takes the key event as an argument.
            */
        bindControlKey(code: any, funct: any): void;
        /**
            * Binds the specified keycode to the given function. This binding is used
            * if the control and shift key are pressed.
            *
            * Parameters:
            *
            * code - Integer that specifies the keycode.
            * funct - JavaScript function that takes the key event as an argument.
            */
        bindControlShiftKey(code: any, funct: any): void;
        /**
            * Returns true if the control key is pressed. This uses <mxEvent.isControlDown>.
            *
            * Parameters:
            *
            * evt - Key event whose control key pressed state should be returned.
            */
        isControlDown(evt: any): boolean;
        /**
            * Returns the function associated with the given key event or null if no
            * function is associated with the given event.
            *
            * Parameters:
            *
            * evt - Key event whose associated function should be returned.
            */
        getFunction(evt: any): any;
        /**
            * Returns true if the event should be processed by this handler, that is,
            * if the event source is either the target, one of its direct children, a
            * descendant of the <mxGraph.container>, or the <mxGraph.cellEditor> of the
            * <graph>.
            *
            * Parameters:
            *
            * evt - Key event that represents the keystroke.
            */
        isGraphEvent(evt: any): any;
        /**
            * Handles the event by invoking the function bound to the respective keystroke
            * if <isEnabledForEvent> returns true for the given event and if
            * <isEventIgnored> returns false, except for escape for which
            * <isEventIgnored> is not invoked.
            *
            * Parameters:
            *
            * evt - Key event that represents the keystroke.
            */
        keyDown(evt: any): void;
        /**
            * Returns true if the given event should be handled. <isEventIgnored> is
            * called later if the event is not an escape key stroke, in which case
            * <escape> is called. This implementation returns true if <isEnabled>
            * returns true for both, this handler and <graph>, if the event is not
            * consumed and if <isGraphEvent> returns true.
            *
            * Parameters:
            *
            * evt - Key event that represents the keystroke.
            */
        isEnabledForEvent(evt: any): any;
        /**
            * Returns true if the given keystroke should be ignored. This returns
            * graph.isEditing().
            *
            * Parameters:
            *
            * evt - Key event that represents the keystroke.
            */
        isEventIgnored(evt: any): any;
        /**
            * Hook to process ESCAPE keystrokes. This implementation invokes
            * <mxGraph.stopEditing> to cancel the current editing, connecting
            * and/or other ongoing modifications.
            *
            * Parameters:
            *
            * evt - Key event that represents the keystroke. Possible keycode in this
            * case is 27 (ESCAPE).
            */
        escape(evt: any): void;
        /**
            * Destroys the handler and all its references into the DOM. This does
            * normally not need to be called, it is called automatically when the
            * window unloads (in IE).
            */
        destroy(): void;
    }

    /**
        * Graph event handler that displays tooltips. <mxGraph.getTooltip> is used to
        * get the tooltip for a cell or handle. This handler is built-into
        * <mxGraph.tooltipHandler> and enabled using <mxGraph.setTooltips>.
        *
        * Example:
        *
        * (code>
        * new mxTooltipHandler(graph);
        * (end)
        *
        * Constructor: mxTooltipHandler
        *
        * Constructs an event handler that displays tooltips with the specified
        * delay (in milliseconds). If no delay is specified then a default delay
        * of 500 ms (0.5 sec) is used.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * delay - Optional delay in milliseconds.
        */
    export class mxTooltipHandler {
        constructor(graph: any, delay?: number);
        /**
            * Returns true if events are handled. This implementation
            * returns <enabled>.
            */
        isEnabled(): any;
        /**
            * Enables or disables event handling. This implementation
            * updates <enabled>.
            */
        setEnabled(enabled: any): void;
        /**
            * Returns <hideOnHover>.
            */
        isHideOnHover(): any;
        /**
            * Sets <hideOnHover>.
            */
        setHideOnHover(value: any): void;
        /**
            * Initializes the DOM nodes required for this tooltip handler.
            */
        init(): void;
        /**
            * Handles the event by initiating a rubberband selection. By consuming the
            * event all subsequent events of the gesture are redirected to this
            * handler.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Handles the event by updating the rubberband selection.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Handles the event by resetting the tooltip timer or hiding the existing
            * tooltip.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Resets the timer.
            */
        resetTimer(): void;
        /**
            * Resets and/or restarts the timer to trigger the display of the tooltip.
            */
        reset(me: any, restart: any): void;
        /**
            * Hides the tooltip and resets the timer.
            */
        hide(): void;
        /**
            * Hides the tooltip.
            */
        hideTooltip(): void;
        /**
            * Shows the tooltip for the specified cell and optional index at the
            * specified location (with a vertical offset of 10 pixels).
            */
        show(tip: any, x: any, y: any): void;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Event handler that highlights cells. Inherits from <mxCellMarker>.
        *
        * Example:
        *
        * (code)
        * new mxCellTracker(graph, '#00FF00');
        * (end)
        *
        * For detecting dragEnter, dragOver and dragLeave on cells, the following
        * code can be used:
        *
        * (code)
        * graph.addMouseListener(
        * {
        *   cell: null,
        *   mouseDown: function(sender, me) { },
        *   mouseMove: function(sender, me)
        *   {
        *     var tmp = me.getCell();
        *
        *     if (tmp != this.cell)
        *     {
        *       if (this.cell != null)
        *       {
        *         this.dragLeave(me.getEvent(), this.cell);
        *       }
        *
        *       this.cell = tmp;
        *
        *       if (this.cell != null)
        *       {
        *         this.dragEnter(me.getEvent(), this.cell);
        *       }
        *     }
        *
        *     if (this.cell != null)
        *     {
        *       this.dragOver(me.getEvent(), this.cell);
        *     }
        *   },
        *   mouseUp: function(sender, me) { },
        *   dragEnter: function(evt, cell)
        *   {
        *     mxLog.debug('dragEnter', cell.value);
        *   },
        *   dragOver: function(evt, cell)
        *   {
        *     mxLog.debug('dragOver', cell.value);
        *   },
        *   dragLeave: function(evt, cell)
        *   {
        *     mxLog.debug('dragLeave', cell.value);
        *   }
        * });
        * (end)
        *
        * Constructor: mxCellTracker
        *
        * Constructs an event handler that highlights cells.
        *
        * Parameters:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * color - Color of the highlight. Default is blue.
        * funct - Optional JavaScript function that is used to override
        * <mxCellMarker.getCell>.
        */
    export class mxCellTracker extends mxCellMarker {
        constructor(graph: any, color: any, funct: any);
        /**
            * Ignores the event. The event is not consumed.
            */
        mouseDown(sender: any, me: any): void;
        /**
            * Handles the event by highlighting the cell under the mousepointer if it
            * is over the hotspot region of the cell.
            */
        mouseMove(sender: any, me: any): void;
        /**
            * Handles the event by reseting the highlight.
            */
        mouseUp(sender: any, me: any): void;
        /**
            * Destroys the object and all its resources and DOM nodes. This doesn't
            * normally need to be called. It is called automatically when the window
            * unloads.
            */
        destroy(): void;
    }

    /**
        * A helper class to highlight cells. Here is an example for a given cell.
        *
        * (code)
        * var highlight = new mxCellHighlight(graph, '#ff0000', 2);
        * highlight.highlight(graph.view.getState(cell)));
        * (end)
        *
        * Constructor: mxCellHighlight
        *
        * Constructs a cell highlight.
        */
    export class mxCellHighlight {
        constructor(graph: any, highlightColor: any, strokeWidth: any, dashed: any);
        /**
            * Sets the color of the rectangle used to highlight drop targets.
            *
            * Parameters:
            *
            * color - String that represents the new highlight color.
            */
        setHighlightColor(color: any): void;
        /**
            * Creates and returns the highlight shape for the given state.
            */
        drawHighlight(): void;
        /**
            * Creates and returns the highlight shape for the given state.
            */
        createShape(): any;
        /**
            * Updates the highlight after a change of the model or view.
            */
        getStrokeWidth(state: any): any;
        /**
            * Updates the highlight after a change of the model or view.
            */
        repaint(): void;
        /**
            * Resets the state of the cell marker.
            */
        hide(): void;
        /**
            * Marks the <markedState> and fires a <mark> event.
            */
        highlight(state: any): void;
        /**
            * Returns true if this highlight is at the given position.
            */
        isHighlightAt(x: any, y: any): boolean;
        /**
            * Destroys the handler and all its resources and DOM nodes.
            */
        destroy(): void;
    }

    /**
        * Binds keycodes to actionnames in an editor. This aggregates an internal
        * <handler> and extends the implementation of <mxKeyHandler.escape> to not
        * only cancel the editing, but also hide the properties dialog and fire an
        * <mxEditor.escape> event via <editor>. An instance of this class is created
        * by <mxEditor> and stored in <mxEditor.keyHandler>.
        *
        * Example:
        *
        * Bind the delete key to the delete action in an existing editor.
        *
        * (code)
        * var keyHandler = new mxDefaultKeyHandler(editor);
        * keyHandler.bindAction(46, 'delete');
        * (end)
        *
        * Codec:
        *
        * This class uses the <mxDefaultKeyHandlerCodec> to read configuration
        * data into an existing instance. See <mxDefaultKeyHandlerCodec> for a
        * description of the configuration format.
        *
        * Keycodes:
        *
        * See <mxKeyHandler>.
        *
        * An <mxEvent.ESCAPE> event is fired via the editor if the escape key is
        * pressed.
        *
        * Constructor: mxDefaultKeyHandler
        *
        * Constructs a new default key handler for the <mxEditor.graph> in the
        * given <mxEditor>. (The editor may be null if a prototypical instance for
        * a <mxDefaultKeyHandlerCodec> is created.)
        *
        * Parameters:
        *
        * editor - Reference to the enclosing <mxEditor>.
        */
    export class mxDefaultKeyHandler {
        constructor(editor: any);
        /**
            * Binds the specified keycode to the given action in <editor>. The
            * optional control flag specifies if the control key must be pressed
            * to trigger the action.
            *
            * Parameters:
            *
            * code - Integer that specifies the keycode.
            * action - Name of the action to execute in <editor>.
            * control - Optional boolean that specifies if control must be pressed.
            * Default is false.
            */
        bindAction(code: any, action: any, control: any): void;
        /**
            * Destroys the <handler> associated with this object. This does normally
            * not need to be called, the <handler> is destroyed automatically when the
            * window unloads (in IE) by <mxEditor>.
            */
        destroy(): void;
    }

    /**
        * Creates popupmenus for mouse events. This object holds an XML node
        * which is a description of the popup menu to be created. In
        * <createMenu>, the configuration is applied to the context and
        * the resulting menu items are added to the menu dynamically. See
        * <createMenu> for a description of the configuration format.
        *
        * This class does not create the DOM nodes required for the popup menu, it
        * only parses an XML description to invoke the respective methods on an
        * <mxPopupMenu> each time the menu is displayed.
        *
        * Codec:
        *
        * This class uses the <mxDefaultPopupMenuCodec> to read configuration
        * data into an existing instance, however, the actual parsing is done
        * by this class during program execution, so the format is described
        * below.
        *
        * Constructor: mxDefaultPopupMenu
        *
        * Constructs a new popupmenu-factory based on given configuration.
        *
        * Paramaters:
        *
        * config - XML node that contains the configuration data.
        */
    export class mxDefaultPopupMenu {
        constructor(config: any);
        /**
            * This function is called from <mxEditor> to add items to the
            * given menu based on <config>. The config is a sequence of
            * the following nodes and attributes.
            *
            * Child Nodes:
            *
            * add - Adds a new menu item. See below for attributes.
            * separator - Adds a separator. No attributes.
            * condition - Adds a custom condition. Name attribute.
            *
            * The add-node may have a child node that defines a function to be invoked
            * before the action is executed (or instead of an action to be executed).
            *
            * Attributes:
            *
            * as - Resource key for the label (needs entry in property file).
            * action - Name of the action to execute in enclosing editor.
            * icon - Optional icon (relative/absolute URL).
            * iconCls - Optional CSS class for the icon.
            * if - Optional name of condition that must be true (see below).
            * enabled-if - Optional name of condition that specifies if the menu item
            * should be enabled.
            * name - Name of custom condition. Only for condition nodes.
            *
            * Conditions:
            *
            * nocell - No cell under the mouse.
            * ncells - More than one cell selected.
            * notRoot - Drilling position is other than home.
            * cell - Cell under the mouse.
            * notEmpty - Exactly one cell with children under mouse.
            * expandable - Exactly one expandable cell under mouse.
            * collapsable - Exactly one collapsable cell under mouse.
            * validRoot - Exactly one cell which is a possible root under mouse.
            * swimlane - Exactly one cell which is a swimlane under mouse.
            *
            * Example:
            *
            * To add a new item for a given action to the popupmenu:
            *
            * (code)
            * <mxDefaultPopupMenu as="popupHandler">
            *   <add as="delete" action="delete" icon="images/delete.gif" if="cell"/>
            * </mxDefaultPopupMenu>
            * (end)
            *
            * To add a new item for a custom function:
            *
            * (code)
            * <mxDefaultPopupMenu as="popupHandler">
            *   <add as="action1"><![CDATA[
            *		function (editor, cell, evt)
            *		{
            *			editor.execute('action1', cell, 'myArg');
            *		}
            *   ]]></add>
            * </mxDefaultPopupMenu>
            * (end)
            *
            * The above example invokes action1 with an additional third argument via
            * the editor instance. The third argument is passed to the function that
            * defines action1. If the add-node has no action-attribute, then only the
            * function defined in the text content is executed, otherwise first the
            * function and then the action defined in the action-attribute is
            * executed. The function in the text content has 3 arguments, namely the
            * <mxEditor> instance, the <mxCell> instance under the mouse, and the
            * native mouse event.
            *
            * Custom Conditions:
            *
            * To add a new condition for popupmenu items:
            *
            * (code)
            * <condition name="condition1"><![CDATA[
            *   function (editor, cell, evt)
            *   {
            *     return cell != null;
            *   }
            * ]]></condition>
            * (end)
            *
            * The new condition can then be used in any item as follows:
            *
            * (code)
            * <add as="action1" action="action1" icon="action1.gif" if="condition1"/>
            * (end)
            *
            * The order in which the items and conditions appear is not significant as
            * all connditions are evaluated before any items are created.
            *
            * Parameters:
            *
            * editor - Enclosing <mxEditor> instance.
            * menu - <mxPopupMenu> that is used for adding items and separators.
            * cell - Optional <mxCell> which is under the mousepointer.
            * evt - Optional mouse event which triggered the menu.
            */
        createMenu(editor: any, menu: any, cell: any, evt: any): void;
        /**
            * Recursively adds the given items and all of its children into the given menu.
            *
            * Parameters:
            *
            * editor - Enclosing <mxEditor> instance.
            * menu - <mxPopupMenu> that is used for adding items and separators.
            * cell - Optional <mxCell> which is under the mousepointer.
            * evt - Optional mouse event which triggered the menu.
            * conditions - Array of names boolean conditions.
            * item - XML node that represents the current menu item.
            * parent - DOM node that represents the parent menu item.
            */
        addItems(editor: any, menu: any, cell: any, evt: any, conditions: any, item: any, parent: any): void;
        /**
            * Helper method to bind an action to a new menu item.
            *
            * Parameters:
            *
            * menu - <mxPopupMenu> that is used for adding items and separators.
            * editor - Enclosing <mxEditor> instance.
            * lab - String that represents the label of the menu item.
            * icon - Optional URL that represents the icon of the menu item.
            * action - Optional name of the action to execute in the given editor.
            * funct - Optional function to execute before the optional action. The
            * function takes an <mxEditor>, the <mxCell> under the mouse and the
            * mouse event that triggered the call.
            * cell - Optional <mxCell> to use as an argument for the action.
            * parent - DOM node that represents the parent menu item.
            * iconCls - Optional CSS class for the menu icon.
            * enabled - Optional boolean that specifies if the menu item is enabled.
            * Default is true.
            */
        addAction(menu: any, editor: any, lab: any, icon: any, funct: any, action: any, cell: any, parent: any, iconCls: any, enabled: any): any;
        /**
            * Evaluates the default conditions for the given context.
            */
        createConditions(editor: any, cell: any, evt: any): any[];
    }

    /**
        * Toolbar for the editor. This modifies the state of the graph
        * or inserts new cells upon mouse clicks.
        *
        * Example:
        *
        * Create a toolbar with a button to copy the selection into the clipboard,
        * and a combo box with one action to paste the selection from the clipboard
        * into the graph.
        *
        * (code)
        * var toolbar = new mxDefaultToolbar(container, editor);
        * toolbar.addItem('Copy', null, 'copy');
        *
        * var combo = toolbar.addActionCombo('More actions...');
        * toolbar.addActionOption(combo, 'Paste', 'paste');
        * (end)
        *
        * Codec:
        *
        * This class uses the <mxDefaultToolbarCodec> to read configuration
        * data into an existing instance. See <mxDefaultToolbarCodec> for a
        * description of the configuration format.
        *
        * Constructor: mxDefaultToolbar
        *
        * Constructs a new toolbar for the given container and editor. The
        * container and editor may be null if a prototypical instance for a
        * <mxDefaultKeyHandlerCodec> is created.
        *
        * Parameters:
        *
        * container - DOM node that contains the toolbar.
        * editor - Reference to the enclosing <mxEditor>.
        */
    export class mxDefaultToolbar {
        constructor(container: any, editor: any);
        /**
            * Constructs the <toolbar> for the given container and installs a listener
            * that updates the <mxEditor.insertFunction> on <editor> if an item is
            * selected in the toolbar. This assumes that <editor> is not null.
            *
            * Parameters:
            *
            * container - DOM node that contains the toolbar.
            */
        init(container: any): void;
        /**
            * Adds a new item that executes the given action in <editor>. The title,
            * icon and pressedIcon are used to display the toolbar item.
            *
            * Parameters:
            *
            * title - String that represents the title (tooltip) for the item.
            * icon - URL of the icon to be used for displaying the item.
            * action - Name of the action to execute when the item is clicked.
            * pressed - Optional URL of the icon for the pressed state.
            */
        addItem(title: any, icon: any, action: any, pressed: any): any;
        /**
            * Adds a vertical separator using the optional icon.
            *
            * Parameters:
            *
            * icon - Optional URL of the icon that represents the vertical separator.
            * Default is <mxClient.imageBasePath> + '/separator.gif'.
            */
        addSeparator(icon: any): void;
        /**
            * Helper method to invoke <mxToolbar.addCombo> on <toolbar> and return the
            * resulting DOM node.
            */
        addCombo(): any;
        /**
            * Helper method to invoke <mxToolbar.addActionCombo> on <toolbar> using
            * the given title and return the resulting DOM node.
            *
            * Parameters:
            *
            * title - String that represents the title of the combo.
            */
        addActionCombo(title: any): any;
        /**
            * Binds the given action to a option with the specified label in the
            * given combo. Combo is an object returned from an earlier call to
            * <addCombo> or <addActionCombo>.
            *
            * Parameters:
            *
            * combo - DOM node that represents the combo box.
            * title - String that represents the title of the combo.
            * action - Name of the action to execute in <editor>.
            */
        addActionOption(combo: any, title: any, action: any): void;
        /**
            * Helper method to invoke <mxToolbar.addOption> on <toolbar> and return
            * the resulting DOM node that represents the option.
            *
            * Parameters:
            *
            * combo - DOM node that represents the combo box.
            * title - String that represents the title of the combo.
            * value - Object that represents the value of the option.
            */
        addOption(combo: any, title: any, value: any): any;
        /**
            * Creates an item for selecting the given mode in the <editor>'s graph.
            * Supported modenames are select, connect and pan.
            *
            * Parameters:
            *
            * title - String that represents the title of the item.
            * icon - URL of the icon that represents the item.
            * mode - String that represents the mode name to be used in
            * <mxEditor.setMode>.
            * pressed - Optional URL of the icon that represents the pressed state.
            * funct - Optional JavaScript function that takes the <mxEditor> as the
            * first and only argument that is executed after the mode has been
            * selected.
            */
        addMode(title: any, icon: any, mode: any, pressed: any, funct: any): any;
        /**
            * Creates an item for inserting a clone of the specified prototype cell into
            * the <editor>'s graph. The ptype may either be a cell or a function that
            * returns a cell.
            *
            * Parameters:
            *
            * title - String that represents the title of the item.
            * icon - URL of the icon that represents the item.
            * ptype - Function or object that represents the prototype cell. If ptype
            * is a function then it is invoked with no arguments to create new
            * instances.
            * pressed - Optional URL of the icon that represents the pressed state.
            * insert - Optional JavaScript function that handles an insert of the new
            * cell. This function takes the <mxEditor>, new cell to be inserted, mouse
            * event and optional <mxCell> under the mouse pointer as arguments.
            * toggle - Optional boolean that specifies if the item can be toggled.
            * Default is true.
            */
        addPrototype(title: any, icon: any, ptype: any, pressed: any, insert: any, toggle: any): any;
        /**
            * Handles a drop from a toolbar item to the graph. The given vertex
            * represents the new cell to be inserted. This invokes <insert> or
            * <connect> depending on the given target cell.
            *
            * Parameters:
            *
            * vertex - <mxCell> to be inserted.
            * evt - Mouse event that represents the drop.
            * target - Optional <mxCell> that represents the drop target.
            */
        drop(vertex: any, evt: any, target: any): void;
        /**
            * Handles a drop by inserting the given vertex into the given parent cell
            * or the default parent if no parent is specified.
            *
            * Parameters:
            *
            * vertex - <mxCell> to be inserted.
            * evt - Mouse event that represents the drop.
            * parent - Optional <mxCell> that represents the parent.
            */
        insert(vertex: any, evt: any, target: any): any;
        /**
            * Handles a drop by connecting the given vertex to the given source cell.
            *
            * vertex - <mxCell> to be inserted.
            * evt - Mouse event that represents the drop.
            * source - Optional <mxCell> that represents the source terminal.
            */
        connect(vertex: any, evt: any, source: any): void;
        /**
            * Makes the given img draggable using the given function for handling a
            * drop event.
            *
            * Parameters:
            *
            * img - DOM node that represents the image.
            * dropHandler - Function that handles a drop of the image.
            */
        installDropHandler(img: any, dropHandler: any): void;
        /**
            * Destroys the <toolbar> associated with this object and removes all
            * installed listeners. This does normally not need to be called, the
            * <toolbar> is destroyed automatically when the window unloads (in IE) by
            * <mxEditor>.
            */
        destroy(): void;
    }

    /**
        * Extends <mxEventSource> to implement a application wrapper for a graph that
        * adds <actions>, I/O using <mxCodec>, auto-layout using <mxLayoutManager>,
        * command history using <undoManager>, and standard dialogs and widgets, eg.
        * properties, help, outline, toolbar, and popupmenu. It also adds <templates>
        * to be used as cells in toolbars, auto-validation using the <validation>
        * flag, attribute cycling using <cycleAttributeValues>, higher-level events
        * such as <root>, and backend integration using <urlPost> and <urlImage>.
        *
        * Actions:
        *
        * Actions are functions stored in the <actions> array under their names. The
        * functions take the <mxEditor> as the first, and an optional <mxCell> as the
        * second argument and are invoked using <execute>. Any additional arguments
        * passed to execute are passed on to the action as-is.
        *
        * A list of built-in actions is available in the <addActions> description.
        *
        * Read/write Diagrams:
        *
        * To read a diagram from an XML string, for example from a textfield within the
        * page, the following code is used:
        *
        * (code)
        * var doc = mxUtils.parseXML(xmlString);
        * var node = doc.documentElement;
        * editor.readGraphModel(node);
        * (end)
        *
        * For reading a diagram from a remote location, use the <open> method.
        *
        * To save diagrams in XML on a server, you can set the <urlPost> variable.
        * This variable will be used in <getUrlPost> to construct a URL for the post
        * request that is issued in the <save> method. The post request contains the
        * XML representation of the diagram as returned by <writeGraphModel> in the
        * xml parameter.
        *
        * On the server side, the post request is processed using standard
        * technologies such as Java Servlets, CGI, .NET or ASP.
        *
        * Here are some examples of processing a post request in various languages.
        *
        * - Java: URLDecoder.decode(request.getParameter("xml"), "UTF-8").replace("\n", "&#xa;")
        *
        * Note that the linefeeds should only be replaced if the XML is
        * processed in Java, for example when creating an image, but not
        * if the XML is passed back to the client-side.
        *
        * - .NET: HttpUtility.UrlDecode(context.Request.Params["xml"])
        * - PHP: urldecode($_POST["xml"])
        *
        * Creating images:
        *
        * A backend (Java, PHP or C#) is required for creating images. The
        * distribution contains an example for each backend (ImageHandler.java,
        * ImageHandler.cs and graph.php). More information about using a backend
        * to create images can be found in the readme.html files. Note that the
        * preview is implemented using VML/SVG in the browser and does not require
        * a backend. The backend is only required to creates images (bitmaps).
        *
        * Special characters:
        *
        * Note There are five characters that should always appear in XML content as
        * escapes, so that they do not interact with the syntax of the markup. These
        * are part of the language for all documents based on XML and for HTML.
        *
        * - &lt; (<)
        * - &gt; (>)
        * - &amp; (&)
        * - &quot; (")
        * - &apos; (')
        *
        * Although it is part of the XML language, &apos; is not defined in HTML.
        * For this reason the XHTML specification recommends instead the use of
        * &#39; if text may be passed to a HTML user agent.
        *
        * If you are having problems with special characters on the server-side then
        * you may want to try the <escapePostData> flag.
        *
        * For converting decimal escape sequences inside strings, a user has provided
        * us with the following function:
        *
        * (code)
        * function html2js(text)
        * {
        *   var entitySearch = /&#[0-9]+;/;
        *   var entity;
        *
        *   while (entity = entitySearch.exec(text))
        *   {
        *     var charCode = entity[0].substring(2, entity[0].length -1);
        *     text = text.substring(0, entity.index)
        *            + String.fromCharCode(charCode)
        *            + text.substring(entity.index + entity[0].length);
        *   }
        *
        *   return text;
        * }
        * (end)
        *
        * Otherwise try using hex escape sequences and the built-in unescape function
        * for converting such strings.
        *
        * Local Files:
        *
        * For saving and opening local files, no standardized method exists that
        * works across all browsers. The recommended way of dealing with local files
        * is to create a backend that streams the XML data back to the browser (echo)
        * as an attachment so that a Save-dialog is displayed on the client-side and
        * the file can be saved to the local disk.
        *
        * For example, in PHP the code that does this looks as follows.
        *
        * (code)
        * $xml = stripslashes($_POST["xml"]);
        * header("Content-Disposition: attachment; filename=\"diagram.xml\"");
        * echo($xml);
        * (end)
        *
        * To open a local file, the file should be uploaded via a form in the browser
        * and then opened from the server in the editor.
        *
        * Cell Properties:
        *
        * The properties displayed in the properties dialog are the attributes and
        * values of the cell's user object, which is an XML node. The XML node is
        * defined in the templates section of the config file.
        *
        * The templates are stored in <mxEditor.templates> and contain cells which
        * are cloned at insertion time to create new vertices by use of drag and
        * drop from the toolbar. Each entry in the toolbar for adding a new vertex
        * must refer to an existing template.
        *
        * In the following example, the task node is a business object and only the
        * mxCell node and its mxGeometry child contain graph information:
        *
        * (code)
        * <Task label="Task" description="">
        *   <mxCell vertex="true">
        *     <mxGeometry as="geometry" width="72" height="32"/>
        *   </mxCell>
        * </Task>
        * (end)
        *
        * The idea is that the XML representation is inverse from the in-memory
        * representation: The outer XML node is the user object and the inner node is
        * the cell. This means the user object of the cell is the Task node with no
        * children for the above example:
        *
        * (code)
        * <Task label="Task" description=""/>
        * (end)
        *
        * The Task node can have any tag name, attributes and child nodes. The
        * <mxCodec> will use the XML hierarchy as the user object, while removing the
        * "known annotations", such as the mxCell node. At save-time the cell data
        * will be "merged" back into the user object. The user object is only modified
        * via the properties dialog during the lifecycle of the cell.
        *
        * In the default implementation of <createProperties>, the user object's
        * attributes are put into a form for editing. Attributes are changed using
        * the <mxCellAttributeChange> action in the model. The dialog can be replaced
        * by overriding the <createProperties> hook or by replacing the showProperties
        * action in <actions>. Alternatively, the entry in the config file's popupmenu
        * section can be modified to invoke a different action.
        *
        * If you want to displey the properties dialog on a doubleclick, you can set
        * <mxEditor.dblClickAction> to showProperties as follows:
        *
        * (code)
        * editor.dblClickAction = 'showProperties';
        * (end)
        *
        * Popupmenu and Toolbar:
        *
        * The toolbar and popupmenu are typically configured using the respective
        * sections in the config file, that is, the popupmenu is defined as follows:
        *
        * (code)
        * <mxEditor>
        *   <mxDefaultPopupMenu as="popupHandler">
        * 		<add as="cut" action="cut" icon="images/cut.gif"/>
        *      ...
        * (end)
        *
        * New entries can be added to the toolbar by inserting an add-node into the
        * above configuration. Existing entries may be removed and changed by
        * modifying or removing the respective entries in the configuration.
        * The configuration is read by the <mxDefaultPopupMenuCodec>, the format of the
        * configuration is explained in <mxDefaultPopupMenu.decode>.
        *
        * The toolbar is defined in the mxDefaultToolbar section. Items can be added
        * and removed in this section.
        *
        * (code)
        * <mxEditor>
        *   <mxDefaultToolbar>
        *     <add as="save" action="save" icon="images/save.gif"/>
        *     <add as="Swimlane" template="swimlane" icon="images/swimlane.gif"/>
        *     ...
        * (end)
        *
        * The format of the configuration is described in
        * <mxDefaultToolbarCodec.decode>.
        *
        * Ids:
        *
        * For the IDs, there is an implicit behaviour in <mxCodec>: It moves the Id
        * from the cell to the user object at encoding time and vice versa at decoding
        * time. For example, if the Task node from above has an id attribute, then
        * the <mxCell.id> of the corresponding cell will have this value. If there
        * is no Id collision in the model, then the cell may be retrieved using this
        * Id with the <mxGraphModel.getCell> function. If there is a collision, a new
        * Id will be created for the cell using <mxGraphModel.createId>. At encoding
        * time, this new Id will replace the value previously stored under the id
        * attribute in the Task node.
        *
        * See <mxEditorCodec>, <mxDefaultToolbarCodec> and <mxDefaultPopupMenuCodec>
        * for information about configuring the editor and user interface.
        *
        * Programmatically inserting cells:
        *
        * For inserting a new cell, say, by clicking a button in the document,
        * the following code can be used. This requires an reference to the editor.
        *
        * (code)
        * var userObject = new Object();
        * var parent = editor.graph.getDefaultParent();
        * var model = editor.graph.model;
        * model.beginUpdate();
        * try
        * {
        *   editor.graph.insertVertex(parent, null, userObject, 20, 20, 80, 30);
        * }
        * finally
        * {
        *   model.endUpdate();
        * }
        * (end)
        *
        * If a template cell from the config file should be inserted, then a clone
        * of the template can be created as follows. The clone is then inserted using
        * the add function instead of addVertex.
        *
        * (code)
        * var template = editor.templates['task'];
        * var clone = editor.graph.model.cloneCell(template);
        * (end)
        *
        * Resources:
        *
        * resources/editor - Language resources for mxEditor
        *
        * Callback: onInit
        *
        * Called from within the constructor. In the callback,
        * "this" refers to the editor instance.
        *
        * Cookie: mxgraph=seen
        *
        * Set when the editor is started. Never expires. Use
        * <resetFirstTime> to reset this cookie. This cookie
        * only exists if <onInit> is implemented.
        *
        * Event: mxEvent.OPEN
        *
        * Fires after a file was opened in <open>. The <code>filename</code> property
        * contains the filename that was used. The same value is also available in
        * <filename>.
        *
        * Event: mxEvent.SAVE
        *
        * Fires after the current file was saved in <save>. The <code>url</code>
        * property contains the URL that was used for saving.
        *
        * Event: mxEvent.POST
        *
        * Fires if a successful response was received in <postDiagram>. The
        * <code>request</code> property contains the <mxXmlRequest>, the
        * <code>url</code> and <code>data</code> properties contain the URL and the
        * data that were used in the post request.
        *
        * Event: mxEvent.ROOT
        *
        * Fires when the current root has changed, or when the title of the current
        * root has changed. This event has no properties.
        *
        * Event: mxEvent.BEFORE_ADD_VERTEX
        *
        * Fires before a vertex is added in <addVertex>. The <code>vertex</code>
        * property contains the new vertex and the <code>parent</code> property
        * contains its parent.
        *
        * Event: mxEvent.ADD_VERTEX
        *
        * Fires between begin- and endUpdate in <addVertex>. The <code>vertex</code>
        * property contains the vertex that is being inserted.
        *
        * Event: mxEvent.AFTER_ADD_VERTEX
        *
        * Fires after a vertex was inserted and selected in <addVertex>. The
        * <code>vertex</code> property contains the new vertex.
        *
        * Example:
        *
        * For starting an in-place edit after a new vertex has been added to the
        * graph, the following code can be used.
        *
        * (code)
        * editor.addListener(mxEvent.AFTER_ADD_VERTEX, function(sender, evt)
        * {
        *   var vertex = evt.getProperty('vertex');
        *
        *   if (editor.graph.isCellEditable(vertex))
        *   {
        *   	editor.graph.startEditingAtCell(vertex);
        *   }
        * });
        * (end)
        *
        * Event: mxEvent.ESCAPE
        *
        * Fires when the escape key is pressed. The <code>event</code> property
        * contains the key event.
        *
        * Constructor: mxEditor
        *
        * Constructs a new editor. This function invokes the <onInit> callback
        * upon completion.
        *
        * Example:
        *
        * (code)
        * var config = mxUtils.load('config/diagrameditor.xml').getDocumentElement();
        * var editor = new mxEditor(config);
        * (end)
        *
        * Parameters:
        *
        * config - Optional XML node that contains the configuration.
        */
    export class mxEditor extends mxEventSource {
        constructor(config: any);
        /**
            * Returns <modified>.
            */
        isModified(): any;
        /**
            * Sets <modified> to the specified boolean value.
            */
        setModified(value: any): void;
        /**
            * Adds the built-in actions to the editor instance.
            *
            * save - Saves the graph using <urlPost>.
            * print - Shows the graph in a new print preview window.
            * show - Shows the graph in a new window.
            * exportImage - Shows the graph as a bitmap image using <getUrlImage>.
            * refresh - Refreshes the graph's display.
            * cut - Copies the current selection into the clipboard
            * and removes it from the graph.
            * copy - Copies the current selection into the clipboard.
            * paste - Pastes the clipboard into the graph.
            * delete - Removes the current selection from the graph.
            * group - Puts the current selection into a new group.
            * ungroup - Removes the selected groups and selects the children.
            * undo - Undoes the last change on the graph model.
            * redo - Redoes the last change on the graph model.
            * zoom - Sets the zoom via a dialog.
            * zoomIn - Zooms into the graph.
            * zoomOut - Zooms out of the graph
            * actualSize - Resets the scale and translation on the graph.
            * fit - Changes the scale so that the graph fits into the window.
            * showProperties - Shows the properties dialog.
            * selectAll - Selects all cells.
            * selectNone - Clears the selection.
            * selectVertices - Selects all vertices.
            * selectEdges = Selects all edges.
            * edit - Starts editing the current selection cell.
            * enterGroup - Drills down into the current selection cell.
            * exitGroup - Moves up in the drilling hierachy
            * home - Moves to the topmost parent in the drilling hierarchy
            * selectPrevious - Selects the previous cell.
            * selectNext - Selects the next cell.
            * selectParent - Selects the parent of the selection cell.
            * selectChild - Selects the first child of the selection cell.
            * collapse - Collapses the currently selected cells.
            * expand - Expands the currently selected cells.
            * bold - Toggle bold text style.
            * italic - Toggle italic text style.
            * underline - Toggle underline text style.
            * alignCellsLeft - Aligns the selection cells at the left.
            * alignCellsCenter - Aligns the selection cells in the center.
            * alignCellsRight - Aligns the selection cells at the right.
            * alignCellsTop - Aligns the selection cells at the top.
            * alignCellsMiddle - Aligns the selection cells in the middle.
            * alignCellsBottom - Aligns the selection cells at the bottom.
            * alignFontLeft - Sets the horizontal text alignment to left.
            * alignFontCenter - Sets the horizontal text alignment to center.
            * alignFontRight - Sets the horizontal text alignment to right.
            * alignFontTop - Sets the vertical text alignment to top.
            * alignFontMiddle - Sets the vertical text alignment to middle.
            * alignFontBottom - Sets the vertical text alignment to bottom.
            * toggleTasks - Shows or hides the tasks window.
            * toggleHelp - Shows or hides the help window.
            * toggleOutline - Shows or hides the outline window.
            * toggleConsole - Shows or hides the console window.
            */
        addActions(): void;
        /**
            * Configures the editor using the specified node. To load the
            * configuration from a given URL the following code can be used to obtain
            * the XML node.
            *
            * (code)
            * var node = mxUtils.load(url).getDocumentElement();
            * (end)
            *
            * Parameters:
            *
            * node - XML node that contains the configuration.
            */
        configure(node: any): void;
        /**
            * Resets the cookie that is used to remember if the editor has already
            * been used.
            */
        resetFirstTime(): void;
        /**
            * Resets the command history, modified state and counters.
            */
        resetHistory(): void;
        /**
            * Binds the specified actionname to the specified function.
            *
            * Parameters:
            *
            * actionname - String that specifies the name of the action
            * to be added.
            * funct - Function that implements the new action. The first
            * argument of the function is the editor it is used
            * with, the second argument is the cell it operates
            * upon.
            *
            * Example:
            * (code)
            * editor.addAction('test', function(editor, cell)
            * {
            * 		mxUtils.alert("test "+cell);
            * });
            * (end)
            */
        addAction(actionname: any, funct: any): void;
        /**
            * Executes the function with the given name in <actions> passing the
            * editor instance and given cell as the first and second argument. All
            * additional arguments are passed to the action as well. This method
            * contains a try-catch block and displays an error message if an action
            * causes an exception. The exception is re-thrown after the error
            * message was displayed.
            *
            * Example:
            *
            * (code)
            * editor.execute("showProperties", cell);
            * (end)
            */
        execute(actionname: any, cell: any, evt: any): void;
        /**
            * Adds the specified template under the given name in <templates>.
            */
        addTemplate(name: any, template: any): void;
        /**
            * Returns the template for the given name.
            */
        getTemplate(name: any): any;
        /**
            * Creates the <graph> for the editor. The graph is created with no
            * container and is initialized from <setGraphContainer>.
            */
        createGraph(): any;
        /**
            * Sets the graph's container using <mxGraph.init>.
            */
        createSwimlaneManager(graph: any): any;
        /**
            * Creates a layout manager for the swimlane and diagram layouts, that
            * is, the locally defined inter- and intraswimlane layouts.
            */
        createLayoutManager(graph: any): mxLayoutManager;
        /**
            * Sets the graph's container using <mxGraph.init>.
            */
        setGraphContainer(container: any): void;
        /**
            * Overrides <mxGraph.dblClick> to invoke <dblClickAction>
            * on a cell and reset the selection tool in the toolbar.
            */
        installDblClickHandler(graph: any): void;
        /**
            * Adds the <undoManager> to the graph model and the view.
            */
        installUndoHandler(graph: any): void;
        /**
            * Installs listeners for dispatching the <root> event.
            */
        installDrillHandler(graph: any): void;
        /**
            * Installs the listeners required to automatically validate
            * the graph. On each change of the root, this implementation
            * fires a <root> event.
            */
        installChangeHandler(graph: any): void;
        /**
            * Installs the handler for invoking <insertFunction> if
            * one is defined.
            */
        installInsertHandler(graph: any): void;
        /**
            * Creates the layout instance used to layout the
            * swimlanes in the diagram.
            */
        createDiagramLayout(): any;
        /**
            * Creates the layout instance used to layout the
            * children of each swimlane.
            */
        createSwimlaneLayout(): any;
        /**
            * Creates the <toolbar> with no container.
            */
        createToolbar(): mxDefaultToolbar;
        /**
            * Initializes the toolbar for the given container.
            */
        setToolbarContainer(container: any): void;
        /**
            * Creates the <status> using the specified container.
            *
            * This implementation adds listeners in the editor to
            * display the last saved time and the current filename
            * in the status bar.
            *
            * Parameters:
            *
            * container - DOM node that will contain the statusbar.
            */
        setStatusContainer(container: any): void;
        /**
            * Display the specified message in the status bar.
            *
            * Parameters:
            *
            * message - String the specified the message to
            * be displayed.
            */
        setStatus(message: any): void;
        /**
            * Creates a listener to update the inner HTML of the
            * specified DOM node with the value of <getTitle>.
            *
            * Parameters:
            *
            * container - DOM node that will contain the title.
            */
        setTitleContainer(container: any): void;
        /**
            * Executes a vertical or horizontal compact tree layout
            * using the specified cell as an argument. The cell may
            * either be a group or the root of a tree.
            *
            * Parameters:
            *
            * cell - <mxCell> to use in the compact tree layout.
            * horizontal - Optional boolean to specify the tree's
            * orientation. Default is true.
            */
        treeLayout(cell: any, horizontal: any): void;
        /**
            * Returns the string value for the current root of the
            * diagram.
            */
        getTitle(): string;
        /**
            * Returns the string value of the root cell in
            * <mxGraph.model>.
            */
        getRootTitle(): any;
        /**
            * Undo the last change in <graph>.
            */
        undo(): void;
        /**
            * Redo the last change in <graph>.
            */
        redo(): void;
        /**
            * Invokes <createGroup> to create a new group cell and the invokes
            * <mxGraph.groupCells>, using the grid size of the graph as the spacing
            * in the group's content area.
            */
        groupCells(): any;
        /**
            * Creates and returns a clone of <defaultGroup> to be used
            * as a new group cell in <group>.
            */
        createGroup(): any;
        /**
            * Opens the specified file synchronously and parses it using
            * <readGraphModel>. It updates <filename> and fires an <open>-event after
            * the file has been opened. Exceptions should be handled as follows:
            *
            * (code)
            * try
            * {
            *   editor.open(filename);
            * }
            * catch (e)
            * {
            *   mxUtils.error('Cannot open ' + filename +
            *     ': ' + e.message, 280, true);
            * }
            * (end)
            *
            * Parameters:
            *
            * filename - URL of the file to be opened.
            */
        open(filename: any): void;
        /**
            * Reads the specified XML node into the existing graph model and resets
            * the command history and modified state.
            */
        readGraphModel(node: any): void;
        /**
            * Posts the string returned by <writeGraphModel> to the given URL or the
            * URL returned by <getUrlPost>. The actual posting is carried out by
            * <postDiagram>. If the URL is null then the resulting XML will be
            * displayed using <mxUtils.popup>. Exceptions should be handled as
            * follows:
            *
            * (code)
            * try
            * {
            *   editor.save();
            * }
            * catch (e)
            * {
            *   mxUtils.error('Cannot save : ' + e.message, 280, true);
            * }
            * (end)
            */
        save(url: any, linefeed: any): void;
        /**
            * Hook for subclassers to override the posting of a diagram
            * represented by the given node to the given URL. This fires
            * an asynchronous <post> event if the diagram has been posted.
            *
            * Example:
            *
            * To replace the diagram with the diagram in the response, use the
            * following code.
            *
            * (code)
            * editor.addListener(mxEvent.POST, function(sender, evt)
            * {
            *   // Process response (replace diagram)
            *   var req = evt.getProperty('request');
            *   var root = req.getDocumentElement();
            *   editor.graph.readGraphModel(root)
            * });
            * (end)
            */
        postDiagram(url: any, data: any): void;
        /**
            * Hook to create the string representation of the diagram. The default
            * implementation uses an <mxCodec> to encode the graph model as
            * follows:
            *
            * (code)
            * var enc = new mxCodec();
            * var node = enc.encode(this.graph.getModel());
            * return mxUtils.getXml(node, this.linefeed);
            * (end)
            *
            * Parameters:
            *
            * linefeed - Optional character to be used as the linefeed. Default is
            * <linefeed>.
            */
        writeGraphModel(linefeed: any): any;
        /**
            * Returns the URL to post the diagram to. This is used
            * in <save>. The default implementation returns <urlPost>,
            * adding <code>?draft=true</code>.
            */
        getUrlPost(): any;
        /**
            * Returns the URL to create the image with. This is typically
            * the URL of a backend which accepts an XML representation
            * of a graph view to create an image. The function is used
            * in the image action to create an image. This implementation
            * returns <urlImage>.
            */
        getUrlImage(): any;
        /**
            * Swaps the styles for the given names in the graph's
            * stylesheet and refreshes the graph.
            */
        swapStyles(first: any, second: any): void;
        /**
            * Creates and shows the properties dialog for the given
            * cell. The content area of the dialog is created using
            * <createProperties>.
            */
        showProperties(cell: any): void;
        /**
            * Returns true if the properties dialog is currently visible.
            */
        isPropertiesVisible(): boolean;
        /**
            * Creates and returns the DOM node that represents the contents
            * of the properties dialog for the given cell. This implementation
            * works for user objects that are XML nodes and display all the
            * node attributes in a form.
            */
        createProperties(cell: any): any;
        /**
            * Hides the properties dialog.
            */
        hideProperties(): void;
        /**
            * Shows the tasks window. The tasks window is created using <createTasks>. The
            * default width of the window is 200 pixels, the y-coordinate of the location
            * can be specifies in <tasksTop> and the x-coordinate is right aligned with a
            * 20 pixel offset from the right border. To change the location of the tasks
            * window, the following code can be used:
            *
            * (code)
            * var oldShowTasks = mxEditor.prototype.showTasks;
            * mxEditor.prototype.showTasks = function()
            * {
            *   oldShowTasks.apply(this, arguments); // "supercall"
            *
            *   if (this.tasks != null)
            *   {
            *     this.tasks.setLocation(10, 10);
            *   }
            * };
            * (end)
            */
        showTasks(): void;
        /**
            * Updates the contents of the tasks window using <createTasks>.
            */
        refreshTasks(div: any): void;
        /**
            * Updates the contents of the given DOM node to
            * display the tasks associated with the current
            * editor state. This is invoked whenever there
            * is a possible change of state in the editor.
            * Default implementation is empty.
            */
        createTasks(div: any): void;
        /**
            * Shows the help window. If the help window does not exist
            * then it is created using an iframe pointing to the resource
            * for the <code>urlHelp</code> key or <urlHelp> if the resource
            * is undefined.
            */
        showHelp(tasks: any): void;
        /**
            * Shows the outline window. If the window does not exist, then it is
            * created using an <mxOutline>.
            */
        showOutline(): void;
        /**
            * Puts the graph into the specified mode. The following modenames are
            * supported:
            *
            * select - Selects using the left mouse button, new connections
            * are disabled.
            * connect - Selects using the left mouse button or creates new
            * connections if mouse over cell hotspot. See <mxConnectionHandler>.
            * pan - Pans using the left mouse button, new connections are disabled.
            */
        setMode(modename: any): void;
        /**
            * Uses <popupHandler> to create the menu in the graph's
            * panning handler. The redirection is setup in
            * <setToolbarContainer>.
            */
        createPopupMenu(menu: any, cell: any, evt: any): void;
        /**
            * Uses <defaultEdge> as the prototype for creating new edges
            * in the connection handler of the graph. The style of the
            * edge will be overridden with the value returned by
            * <getEdgeStyle>.
            */
        createEdge(source: any, target: any): any;
        /**
            * Returns a string identifying the style of new edges.
            * The function is used in <createEdge> when new edges
            * are created in the graph.
            */
        getEdgeStyle(): any;
        /**
            * Returns the next attribute in <cycleAttributeValues>
            * or null, if not attribute should be used in the
            * specified cell.
            */
        consumeCycleAttribute(cell: any): any;
        /**
            * Uses the returned value from <consumeCycleAttribute>
            * as the value for the <cycleAttributeName> key in
            * the given cell's style.
            */
        cycleAttribute(cell: any): void;
        /**
            * Adds the given vertex as a child of parent at the specified
            * x and y coordinate and fires an <addVertex> event.
            */
        addVertex(parent: any, vertex: any, x: any, y: any): any;
        /**
            * Removes the editor and all its associated resources. This does not
            * normally need to be called, it is called automatically when the window
            * unloads.
            */
        destroy(): void;
    }


    export var mxCodecRegistry: {
        codecs: any[];
        aliases: any[];
        register(codec: any): any;
        addAlias(classname: any, codecname: any): void;
        getCodec(ctor: any): any;
    };

    /**
        * XML codec for JavaScript object graphs. See <mxObjectCodec> for a
        * description of the general encoding/decoding scheme. This class uses the
        * codecs registered in <mxCodecRegistry> for encoding/decoding each object.
        *
        * References:
        *
        * In order to resolve references, especially forward references, the mxCodec
        * constructor must be given the document that contains the referenced
        * elements.
        *
        * Examples:
        *
        * The following code is used to encode a graph model.
        *
        * (code)
        * var encoder = new mxCodec();
        * var result = encoder.encode(graph.getModel());
        * var xml = mxUtils.getXml(result);
        * (end)
        *
        * Example:
        *
        * Using the code below, an XML document is decoded into an existing model. The
        * document may be obtained using one of the functions in mxUtils for loading
        * an XML file, eg. <mxUtils.get>, or using <mxUtils.parseXml> for parsing an
        * XML string.
        *
        * (code)
        * var doc = mxUtils.parseXml(xmlString);
        * var codec = new mxCodec(doc);
        * codec.decode(doc.documentElement, graph.getModel());
        * (end)
        *
        * Example:
        *
        * This example demonstrates parsing a list of isolated cells into an existing
        * graph model. Note that the cells do not have a parent reference so they can
        * be added anywhere in the cell hierarchy after parsing.
        *
        * (code)
        * var xml = '<root><mxCell id="2" value="Hello," vertex="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="World!" vertex="1"><mxGeometry x="200" y="150" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" edge="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell></root>';
        * var doc = mxUtils.parseXml(xml);
        * var codec = new mxCodec(doc);
        * var elt = doc.documentElement.firstChild;
        * var cells = [];
        *
        * while (elt != null)
        * {
        *   cells.push(codec.decode(elt));
        *   elt = elt.nextSibling;
        * }
        *
        * graph.addCells(cells);
        * (end)
        *
        * Example:
        *
        * Using the following code, the selection cells of a graph are encoded and the
        * output is displayed in a dialog box.
        *
        * (code)
        * var enc = new mxCodec();
        * var cells = graph.getSelectionCells();
        * mxUtils.alert(mxUtils.getPrettyXml(enc.encode(cells)));
        * (end)
        *
        * Newlines in the XML can be converted to <br>, in which case a '<br>' argument
        * must be passed to <mxUtils.getXml> as the second argument.
        *
        * Debugging:
        *
        * For debugging I/O you can use the following code to get the sequence of
        * encoded objects:
        *
        * (code)
        * var oldEncode = mxCodec.prototype.encode;
        * mxCodec.prototype.encode = function(obj)
        * {
        *   mxLog.show();
        *   mxLog.debug('mxCodec.encode: obj='+mxUtils.getFunctionName(obj.constructor));
        *
        *   return oldEncode.apply(this, arguments);
        * };
        * (end)
        *
        * Note that the I/O system adds object codecs for new object automatically. For
        * decoding those objects, the constructor should be written as follows:
        *
        * (code)
        * var MyObj = function(name)
        * {
        *   // ...
        * };
        * (end)
        *
        * Constructor: mxCodec
        *
        * Constructs an XML encoder/decoder for the specified
        * owner document.
        *
        * Parameters:
        *
        * document - Optional XML document that contains the data.
        * If no document is specified then a new document is created
        * using <mxUtils.createXmlDocument>.
        */
    export class mxCodec {
        constructor(document: any);
        /**
            * Assoiates the given object with the given ID and returns the given object.
            *
            * Parameters
            *
            * id - ID for the object to be associated with.
            * obj - Object to be associated with the ID.
            */
        putObject(id: any, obj: any): any;
        /**
            * Returns the decoded object for the element with the specified ID in
            * <document>. If the object is not known then <lookup> is used to find an
            * object. If no object is found, then the element with the respective ID
            * from the document is parsed using <decode>.
            */
        getObject(id: any): any;
        /**
            * Hook for subclassers to implement a custom lookup mechanism for cell IDs.
            * This implementation always returns null.
            *
            * Example:
            *
            * (code)
            * var codec = new mxCodec();
            * codec.lookup = function(id)
            * {
            *   return model.getCell(id);
            * };
            * (end)
            *
            * Parameters:
            *
            * id - ID of the object to be returned.
            */
        lookup(id: any): any;
        /**
            * Returns the element with the given ID from <document>.
            *
            * Parameters:
            *
            * id - String that contains the ID.
            */
        getElementById(id: any): any;
        /**
            * Adds the given element to <elements> if it has an ID.
            */
        addElement(node: any): void;
        /**
            * Returns the ID of the specified object. This implementation
            * calls <reference> first and if that returns null handles
            * the object as an <mxCell> by returning their IDs using
            * <mxCell.getId>. If no ID exists for the given cell, then
            * an on-the-fly ID is generated using <mxCellPath.create>.
            *
            * Parameters:
            *
            * obj - Object to return the ID for.
            */
        getId(obj: any): any;
        /**
            * Hook for subclassers to implement a custom method
            * for retrieving IDs from objects. This implementation
            * always returns null.
            *
            * Example:
            *
            * (code)
            * var codec = new mxCodec();
            * codec.reference = function(obj)
            * {
            *   return obj.getCustomId();
            * };
            * (end)
            *
            * Parameters:
            *
            * obj - Object whose ID should be returned.
            */
        reference(obj: any): any;
        /**
            * Encodes the specified object and returns the resulting
            * XML node.
            *
            * Parameters:
            *
            * obj - Object to be encoded.
            */
        encode(obj: any): any;
        /**
            * Decodes the given XML node. The optional "into"
            * argument specifies an existing object to be
            * used. If no object is given, then a new instance
            * is created using the constructor from the codec.
            *
            * The function returns the passed in object or
            * the new instance if no object was given.
            *
            * Parameters:
            *
            * node - XML node to be decoded.
            * into - Optional object to be decodec into.
            */
        decode(node: any, into: any): any;
        /**
            * Encoding of cell hierarchies is built-into the core, but
            * is a higher-level function that needs to be explicitely
            * used by the respective object encoders (eg. <mxModelCodec>,
            * <mxChildChangeCodec> and <mxRootChangeCodec>). This
            * implementation writes the given cell and its children as a
            * (flat) sequence into the given node. The children are not
            * encoded if the optional includeChildren is false. The
            * function is in charge of adding the result into the
            * given node and has no return value.
            *
            * Parameters:
            *
            * cell - <mxCell> to be encoded.
            * node - Parent XML node to add the encoded cell into.
            * includeChildren - Optional boolean indicating if the
            * function should include all descendents. Default is true.
            */
        encodeCell(cell: any, node: any, includeChildren: any): void;
        /**
            * Returns true if the given codec is a cell codec. This uses
            * <mxCellCodec.isCellCodec> to check if the codec is of the
            * given type.
            */
        isCellCodec(codec: any): any;
        /**
            * Decodes cells that have been encoded using inversion, ie.
            * where the user object is the enclosing node in the XML,
            * and restores the group and graph structure in the cells.
            * Returns a new <mxCell> instance that represents the
            * given node.
            *
            * Parameters:
            *
            * node - XML node that contains the cell data.
            * restoreStructures - Optional boolean indicating whether
            * the graph structure should be restored by calling insert
            * and insertEdge on the parent and terminals, respectively.
            * Default is true.
            */
        decodeCell(node: any, restoreStructures: any): any;
        /**
            * Inserts the given cell into its parent and terminal cells.
            */
        insertIntoGraph(cell: any): void;
        /**
            * Sets the attribute on the specified node to value. This is a
            * helper method that makes sure the attribute and value arguments
            * are not null.
            *
            * Parameters:
            *
            * node - XML node to set the attribute for.
            * attributes - Attributename to be set.
            * value - New value of the attribute.
            */
        setAttribute(node: any, attribute: any, value: any): void;
    }

    /**
        * Generic codec for JavaScript objects that implements a mapping between
        * JavaScript objects and XML nodes that maps each field or element to an
        * attribute or child node, and vice versa.
        *
        * Atomic Values:
        *
        * Consider the following example.
        *
        * (code)
        * var obj = new Object();
        * obj.foo = "Foo";
        * obj.bar = "Bar";
        * (end)
        *
        * This object is encoded into an XML node using the following.
        *
        * (code)
        * var enc = new mxCodec();
        * var node = enc.encode(obj);
        * (end)
        *
        * The output of the encoding may be viewed using <mxLog> as follows.
        *
        * (code)
        * mxLog.show();
        * mxLog.debug(mxUtils.getPrettyXml(node));
        * (end)
        *
        * Finally, the result of the encoding looks as follows.
        *
        * (code)
        * <Object foo="Foo" bar="Bar"/>
        * (end)
        *
        * In the above output, the foo and bar fields have been mapped to attributes
        * with the same names, and the name of the constructor was used for the
        * nodename.
        *
        * Booleans:
        *
        * Since booleans are numbers in JavaScript, all boolean values are encoded
        * into 1 for true and 0 for false. The decoder also accepts the string true
        * and false for boolean values.
        *
        * Objects:
        *
        * The above scheme is applied to all atomic fields, that is, to all non-object
        * fields of an object. For object fields, a child node is created with a
        * special attribute that contains the fieldname. This special attribute is
        * called "as" and hence, as is a reserved word that should not be used for a
        * fieldname.
        *
        * Consider the following example where foo is an object and bar is an atomic
        * property of foo.
        *
        * (code)
        * var obj = {foo: {bar: "Bar"}};
        * (end)
        *
        * This will be mapped to the following XML structure by mxObjectCodec.
        *
        * (code)
        * <Object>
        *   <Object bar="Bar" as="foo"/>
        * </Object>
        * (end)
        *
        * In the above output, the inner Object node contains the as-attribute that
        * specifies the fieldname in the enclosing object. That is, the field foo was
        * mapped to a child node with an as-attribute that has the value foo.
        *
        * Arrays:
        *
        * Arrays are special objects that are either associative, in which case each
        * key, value pair is treated like a field where the key is the fieldname, or
        * they are a sequence of atomic values and objects, which is mapped to a
        * sequence of child nodes. For object elements, the above scheme is applied
        * without the use of the special as-attribute for creating each child. For
        * atomic elements, a special add-node is created with the value stored in the
        * value-attribute.
        *
        * For example, the following array contains one atomic value and one object
        * with a field called bar. Furthermore it contains two associative entries
        * called bar with an atomic value, and foo with an object value.
        *
        * (code)
        * var obj = ["Bar", {bar: "Bar"}];
        * obj["bar"] = "Bar";
        * obj["foo"] = {bar: "Bar"};
        * (end)
        *
        * This array is represented by the following XML nodes.
        *
        * (code)
        * <Array bar="Bar">
        *   <add value="Bar"/>
        *   <Object bar="Bar"/>
        *   <Object bar="Bar" as="foo"/>
        * </Array>
        * (end)
        *
        * The Array node name is the name of the constructor. The additional
        * as-attribute in the last child contains the key of the associative entry,
        * whereas the second last child is part of the array sequence and does not
        * have an as-attribute.
        *
        * References:
        *
        * Objects may be represented as child nodes or attributes with ID values,
        * which are used to lookup the object in a table within <mxCodec>. The
        * <isReference> function is in charge of deciding if a specific field should
        * be encoded as a reference or not. Its default implementation returns true if
        * the fieldname is in <idrefs>, an array of strings that is used to configure
        * the <mxObjectCodec>.
        *
        * Using this approach, the mapping does not guarantee that the referenced
        * object itself exists in the document. The fields that are encoded as
        * references must be carefully chosen to make sure all referenced objects
        * exist in the document, or may be resolved by some other means if necessary.
        *
        * For example, in the case of the graph model all cells are stored in a tree
        * whose root is referenced by the model's root field. A tree is a structure
        * that is well suited for an XML representation, however, the additional edges
        * in the graph model have a reference to a source and target cell, which are
        * also contained in the tree. To handle this case, the source and target cell
        * of an edge are treated as references, whereas the children are treated as
        * objects. Since all cells are contained in the tree and no edge references a
        * source or target outside the tree, this setup makes sure all referenced
        * objects are contained in the document.
        *
        * In the case of a tree structure we must further avoid infinite recursion by
        * ignoring the parent reference of each child. This is done by returning true
        * in <isExcluded>, whose default implementation uses the array of excluded
        * fieldnames passed to the mxObjectCodec constructor.
        *
        * References are only used for cells in mxGraph. For defining other
        * referencable object types, the codec must be able to work out the ID of an
        * object. This is done by implementing <mxCodec.reference>. For decoding a
        * reference, the XML node with the respective id-attribute is fetched from the
        * document, decoded, and stored in a lookup table for later reference. For
        * looking up external objects, <mxCodec.lookup> may be implemented.
        *
        * Expressions:
        *
        * For decoding JavaScript expressions, the add-node may be used with a text
        * content that contains the JavaScript expression. For example, the following
        * creates a field called foo in the enclosing object and assigns it the value
        * of <mxConstants.ALIGN_LEFT>.
        *
        * (code)
        * <Object>
        *   <add as="foo">mxConstants.ALIGN_LEFT</add>
        * </Object>
        * (end)
        *
        * The resulting object has a field called foo with the value "left". Its XML
        * representation looks as follows.
        *
        * (code)
        * <Object foo="left"/>
        * (end)
        *
        * This means the expression is evaluated at decoding time and the result of
        * the evaluation is stored in the respective field. Valid expressions are all
        * JavaScript expressions, including function definitions, which are mapped to
        * functions on the resulting object.
        *
        * Expressions are only evaluated if <allowEval> is true.
        *
        * Constructor: mxObjectCodec
        *
        * Constructs a new codec for the specified template object.
        * The variables in the optional exclude array are ignored by
        * the codec. Variables in the optional idrefs array are
        * turned into references in the XML. The optional mapping
        * may be used to map from variable names to XML attributes.
        * The argument is created as follows:
        *
        * (code)
        * var mapping = new Object();
        * mapping['variableName'] = 'attribute-name';
        * (end)
        *
        * Parameters:
        *
        * template - Prototypical instance of the object to be
        * encoded/decoded.
        * exclude - Optional array of fieldnames to be ignored.
        * idrefs - Optional array of fieldnames to be converted to/from
        * references.
        * mapping - Optional mapping from field- to attributenames.
        */
    export class mxObjectCodec {
        constructor(template: any, exclude: any, idrefs: any, mapping: any);
        /**
            * Returns the name used for the nodenames and lookup of the codec when
            * classes are encoded and nodes are decoded. For classes to work with
            * this the codec registry automatically adds an alias for the classname
            * if that is different than what this returns. The default implementation
            * returns the classname of the template class.
            */
        getName(): any;
        /**
            * Returns a new instance of the template for this codec.
            */
        cloneTemplate(): any;
        /**
            * Returns the fieldname for the given attributename.
            * Looks up the value in the <reverse> mapping or returns
            * the input if there is no reverse mapping for the
            * given name.
            */
        getFieldName(attributename: any): any;
        /**
            * Returns the attributename for the given fieldname.
            * Looks up the value in the <mapping> or returns
            * the input if there is no mapping for the
            * given name.
            */
        getAttributeName(fieldname: any): any;
        /**
            * Returns true if the given attribute is to be ignored by the codec. This
            * implementation returns true if the given fieldname is in <exclude> or
            * if the fieldname equals <mxObjectIdentity.FIELD_NAME>.
            *
            * Parameters:
            *
            * obj - Object instance that contains the field.
            * attr - Fieldname of the field.
            * value - Value of the field.
            * write - Boolean indicating if the field is being encoded or decoded.
            * Write is true if the field is being encoded, else it is being decoded.
            */
        isExcluded(obj: any, attr: any, value: any, write: any): boolean;
        /**
            * Returns true if the given fieldname is to be treated
            * as a textual reference (ID). This implementation returns
            * true if the given fieldname is in <idrefs>.
            *
            * Parameters:
            *
            * obj - Object instance that contains the field.
            * attr - Fieldname of the field.
            * value - Value of the field.
            * write - Boolean indicating if the field is being encoded or decoded.
            * Write is true if the field is being encoded, else it is being decoded.
            */
        isReference(obj: any, attr: any, value: any, write: any): boolean;
        /**
            * Encodes the specified object and returns a node
            * representing then given object. Calls <beforeEncode>
            * after creating the node and <afterEncode> with the
            * resulting node after processing.
            *
            * Enc is a reference to the calling encoder. It is used
            * to encode complex objects and create references.
            *
            * This implementation encodes all variables of an
            * object according to the following rules:
            *
            * - If the variable name is in <exclude> then it is ignored.
            * - If the variable name is in <idrefs> then <mxCodec.getId>
            * is used to replace the object with its ID.
            * - The variable name is mapped using <mapping>.
            * - If obj is an array and the variable name is numeric
            * (ie. an index) then it is not encoded.
            * - If the value is an object, then the codec is used to
            * create a child node with the variable name encoded into
            * the "as" attribute.
            * - Else, if <encodeDefaults> is true or the value differs
            * from the template value, then ...
            * - ... if obj is not an array, then the value is mapped to
            * an attribute.
            * - ... else if obj is an array, the value is mapped to an
            * add child with a value attribute or a text child node,
            * if the value is a function.
            *
            * If no ID exists for a variable in <idrefs> or if an object
            * cannot be encoded, a warning is issued using <mxLog.warn>.
            *
            * Returns the resulting XML node that represents the given
            * object.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Object to be encoded.
            */
        encode(enc: any, obj: any): any;
        /**
            * Encodes the value of each member in then given obj into the given node using
            * <encodeValue>.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Object to be encoded.
            * node - XML node that contains the encoded object.
            */
        encodeObject(enc: any, obj: any, node: any): void;
        /**
            * Converts the given value according to the mappings
            * and id-refs in this codec and uses <writeAttribute>
            * to write the attribute into the given node.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Object whose property is going to be encoded.
            * name - XML node that contains the encoded object.
            * value - Value of the property to be encoded.
            * node - XML node that contains the encoded object.
            */
        encodeValue(enc: any, obj: any, name: any, value: any, node: any): void;
        /**
            * Writes the given value into node using <writePrimitiveAttribute>
            * or <writeComplexAttribute> depending on the type of the value.
            */
        writeAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
        /**
            * Writes the given value as an attribute of the given node.
            */
        writePrimitiveAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
        /**
            * Writes the given value as a child node of the given node.
            */
        writeComplexAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
        /**
            * Converts true to "1" and false to "0" is <isBooleanAttribute> returns true.
            * All other values are not converted.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Objec to convert the attribute for.
            * name - Name of the attribute to be converted.
            * value - Value to be converted.
            */
        convertAttributeToXml(enc: any, obj: any, name: any, value: any): any;
        /**
            * Returns true if the given object attribute is a boolean value.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Objec to convert the attribute for.
            * name - Name of the attribute to be converted.
            * value - Value of the attribute to be converted.
            */
        isBooleanAttribute(enc: any, obj: any, name: any, value: any): boolean;
        /**
            * Converts booleans and numeric values to the respective types. Values are
            * numeric if <isNumericAttribute> returns true.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * attr - XML attribute to be converted.
            * obj - Objec to convert the attribute for.
            */
        convertAttributeFromXml(dec: any, attr: any, obj: any): any;
        /**
            * Returns true if the given XML attribute is a numeric value.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * attr - XML attribute to be converted.
            * obj - Objec to convert the attribute for.
            */
        isNumericAttribute(dec: any, attr: any, obj: any): any;
        /**
            * Hook for subclassers to pre-process the object before
            * encoding. This returns the input object. The return
            * value of this function is used in <encode> to perform
            * the default encoding into the given node.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Object to be encoded.
            * node - XML node to encode the object into.
            */
        beforeEncode(enc: any, obj: any, node: any): any;
        /**
            * Hook for subclassers to post-process the node
            * for the given object after encoding and return the
            * post-processed node. This implementation returns
            * the input node. The return value of this method
            * is returned to the encoder from <encode>.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * obj - Object to be encoded.
            * node - XML node that represents the default encoding.
            */
        afterEncode(enc: any, obj: any, node: any): any;
        /**
            * Parses the given node into the object or returns a new object
            * representing the given node.
            *
            * Dec is a reference to the calling decoder. It is used to decode
            * complex objects and resolve references.
            *
            * If a node has an id attribute then the object cache is checked for the
            * object. If the object is not yet in the cache then it is constructed
            * using the constructor of <template> and cached in <mxCodec.objects>.
            *
            * This implementation decodes all attributes and childs of a node
            * according to the following rules:
            *
            * - If the variable name is in <exclude> or if the attribute name is "id"
            * or "as" then it is ignored.
            * - If the variable name is in <idrefs> then <mxCodec.getObject> is used
            * to replace the reference with an object.
            * - The variable name is mapped using a reverse <mapping>.
            * - If the value has a child node, then the codec is used to create a
            * child object with the variable name taken from the "as" attribute.
            * - If the object is an array and the variable name is empty then the
            * value or child object is appended to the array.
            * - If an add child has no value or the object is not an array then
            * the child text content is evaluated using <mxUtils.eval>.
            *
            * For add nodes where the object is not an array and the variable name
            * is defined, the default mechanism is used, allowing to override/add
            * methods as follows:
            *
            * (code)
            * <Object>
            *   <add as="hello"><![CDATA[
            *     function(arg1) {
            *       mxUtils.alert('Hello '+arg1);
            *     }
            *   ]]></add>
            * </Object>
            * (end)
            *
            * If no object exists for an ID in <idrefs> a warning is issued
            * using <mxLog.warn>.
            *
            * Returns the resulting object that represents the given XML node
            * or the object given to the method as the into parameter.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * node - XML node to be decoded.
            * into - Optional objec to encode the node into.
            */
        decode(dec: any, node: any, into: any): any;
        /**
            * Calls <decodeAttributes> and <decodeChildren> for the given node.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * node - XML node to be decoded.
            * obj - Objec to encode the node into.
            */
        decodeNode(dec: any, node: any, obj: any): void;
        /**
            * Decodes all attributes of the given node using <decodeAttribute>.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * node - XML node to be decoded.
            * obj - Objec to encode the node into.
            */
        decodeAttributes(dec: any, node: any, obj: any): void;
        /**
            * Returns true if the given attribute should be ignored. This implementation
            * returns true if the attribute name is "as" or "id".
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * attr - XML attribute to be decoded.
            * obj - Objec to encode the attribute into.
            */
        isIgnoredAttribute(dec: any, attr: any, obj: any): boolean;
        /**
            * Reads the given attribute into the specified object.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * attr - XML attribute to be decoded.
            * obj - Objec to encode the attribute into.
            */
        decodeAttribute(dec: any, attr: any, obj: any): void;
        /**
            * Decodes all children of the given node using <decodeChild>.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * node - XML node to be decoded.
            * obj - Objec to encode the node into.
            */
        decodeChildren(dec: any, node: any, obj: any): void;
        /**
            * Reads the specified child into the given object.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * child - XML child element to be decoded.
            * obj - Objec to encode the node into.
            */
        decodeChild(dec: any, child: any, obj: any): void;
        /**
            * Returns the template instance for the given field. This returns the
            * value of the field, null if the value is an array or an empty collection
            * if the value is a collection. The value is then used to populate the
            * field for a new instance. For strongly typed languages it may be
            * required to override this to return the correct collection instance
            * based on the encoded child.
            */
        getFieldTemplate(obj: any, fieldname: any, child: any): any;
        /**
            * Sets the decoded child node as a value of the given object. If the
            * object is a map, then the value is added with the given fieldname as a
            * key. If the fieldname is not empty, then setFieldValue is called or
            * else, if the object is a collection, the value is added to the
            * collection. For strongly typed languages it may be required to
            * override this with the correct code to add an entry to an object.
            */
        addObjectValue(obj: any, fieldname: any, value: any, template: any): void;
        /**
            * Returns true if the given node is an include directive and
            * executes the include by decoding the XML document. Returns
            * false if the given node is not an include directive.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the encoding/decoding process.
            * node - XML node to be checked.
            * into - Optional object to pass-thru to the codec.
            */
        processInclude(dec: any, node: any, into: any): boolean;
        /**
            * Hook for subclassers to pre-process the node for
            * the specified object and return the node to be
            * used for further processing by <decode>.
            * The object is created based on the template in the
            * calling method and is never null. This implementation
            * returns the input node. The return value of this
            * function is used in <decode> to perform
            * the default decoding into the given object.
            *
            * Parameters:
            *
            * dec - <mxCodec> that controls the decoding process.
            * node - XML node to be decoded.
            * obj - Object to encode the node into.
            */
        beforeDecode(dec: any, node: any, obj: any): any;
        /**
            * Hook for subclassers to post-process the object after
            * decoding. This implementation returns the given object
            * without any changes. The return value of this method
            * is returned to the decoder from <decode>.
            *
            * Parameters:
            *
            * enc - <mxCodec> that controls the encoding process.
            * node - XML node to be decoded.
            * obj - Object that represents the default decoding.
            */
        afterDecode(dec: any, node: any, obj: any): any;
    }



























    /**
        * A hierarchical layout algorithm.
        *
        * Constructor: mxHierarchicalLayout
        *
        * Constructs a new hierarchical layout algorithm.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * orientation - Optional constant that defines the orientation of this
        * layout.
        * deterministic - Optional boolean that specifies if this layout should be
        * deterministic. Default is true.
        */
    export class mxHierarchicalLayout extends mxGraphLayout {
        constructor(graph: any, orientation?: string, deterministic?: boolean);
        /**
            * Returns the internal <mxGraphHierarchyModel> for this layout algorithm.
            */
        getModel(): any;
        /**
            * Executes the layout for the children of the specified parent.
            *
            * Parameters:
            *
            * parent - Parent <mxCell> that contains the children to be laid out.
            * roots - Optional starting roots of the layout.
            */
        execute(parent: any, roots?: any): void;
        /**
            * Returns all visible children in the given parent which do not have
            * incoming edges. If the result is empty then the children with the
            * maximum difference between incoming and outgoing edges are returned.
            * This takes into account edges that are being promoted to the given
            * root due to invisible children or collapsed cells.
            *
            * Parameters:
            *
            * parent - <mxCell> whose children should be checked.
            * vertices - array of vertices to limit search to
            */
        findRoots(parent: any, vertices: any): any[];
        /**
            * Returns the connected edges for the given cell.
            *
            * Parameters:
            *
            * cell - <mxCell> whose edges should be returned.
            */
        getEdges(cell: any): any;
        /**
            * Helper function to return visible terminal for edge allowing for ports
            *
            * Parameters:
            *
            * edge - <mxCell> whose edges should be returned.
            * source - Boolean that specifies whether the source or target terminal is to be returned
            */
        getVisibleTerminal(edge: any, source: any): any;
        /**
            * The API method used to exercise the layout upon the graph description
            * and produce a separate description of the vertex position and edge
            * routing changes made. It runs each stage of the layout that has been
            * created.
            */
        run(parent: any): void;
        /**
            * Creates an array of descendant cells
            */
        filterDescendants(cell: any, result: any): void;
        /**
            * Returns true if the given cell is a "port", that is, when connecting to
            * it, its parent is the connecting vertex in terms of graph traversal
            *
            * Parameters:
            *
            * cell - <mxCell> that represents the port.
            */
        isPort(cell: any): boolean;
        /**
            * Returns the edges between the given source and target. This takes into
            * account collapsed and invisible cells and ports.
            *
            * Parameters:
            *
            * source -
            * target -
            * directed -
            */
        getEdgesBetween(source: any, target: any, directed: any): any[];
        /**
            * Traverses the (directed) graph invoking the given function for each
            * visited vertex and edge. The function is invoked with the current vertex
            * and the incoming edge as a parameter. This implementation makes sure
            * each vertex is only visited once. The function may return false if the
            * traversal should stop at the given vertex.
            *
            * Parameters:
            *
            * vertex - <mxCell> that represents the vertex where the traversal starts.
            * directed - boolean indicating if edges should only be traversed
            * from source to target. Default is true.
            * edge - Optional <mxCell> that represents the incoming edge. This is
            * null for the first step of the traversal.
            * allVertices - Array of cell paths for the visited cells.
            */
        traverse(vertex: any, directed: any, edge: any, allVertices: any, currentComp: any, hierarchyVertices: any, filledVertexSet: any): any;
        /**
            * Executes the cycle stage using mxMinimumCycleRemover.
            */
        cycleStage(parent: any): void;
        /**
            * Implements first stage of a Sugiyama layout.
            */
        layeringStage(): void;
        /**
            * Executes the crossing stage using mxMedianHybridCrossingReduction.
            */
        crossingStage(parent: any): void;
        /**
            * Executes the placement stage using mxCoordinateAssignment.
            */
        placementStage(initialX: any, parent: any): any;
    }
    export var mxHierarchicalEdgeStyle: {
        ORTHOGONAL: number;
        POLYLINE: number;
        STRAIGHT: number;
        CURVE: number;
    };

    /**
        * A hierarchical layout algorithm.
        *
        * Constructor: mxSwimlaneLayout
        *
        * Constructs a new hierarchical layout algorithm.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * orientation - Optional constant that defines the orientation of this
        * layout.
        * deterministic - Optional boolean that specifies if this layout should be
        * deterministic. Default is true.
        */
    export class mxSwimlaneLayout extends mxGraphLayout {
        constructor(graph: any, orientation: any, deterministic: any);
        /**
            * Returns the internal <mxSwimlaneModel> for this layout algorithm.
            */
        getModel(): any;
        /**
            * Executes the layout for the children of the specified parent.
            *
            * Parameters:
            *
            * parent - Parent <mxCell> that contains the children to be laid out.
            * swimlanes - Ordered array of swimlanes to be laid out
            */
        execute(parent: any, swimlanes?: any): void;
        /**
            * Updates the bounds of the given array of groups so that it includes
            * all child vertices.
            *
            */
        updateGroupBounds(): void;
        /**
            * Returns all visible children in the given parent which do not have
            * incoming edges. If the result is empty then the children with the
            * maximum difference between incoming and outgoing edges are returned.
            * This takes into account edges that are being promoted to the given
            * root due to invisible children or collapsed cells.
            *
            * Parameters:
            *
            * parent - <mxCell> whose children should be checked.
            * vertices - array of vertices to limit search to
            */
        findRoots(parent: any, vertices: any): any[];
        /**
            * Returns the connected edges for the given cell.
            *
            * Parameters:
            *
            * cell - <mxCell> whose edges should be returned.
            */
        getEdges(cell: any): any;
        /**
            * Helper function to return visible terminal for edge allowing for ports
            *
            * Parameters:
            *
            * edge - <mxCell> whose edges should be returned.
            * source - Boolean that specifies whether the source or target terminal is to be returned
            */
        getVisibleTerminal(edge: any, source: any): any;
        /**
            * The API method used to exercise the layout upon the graph description
            * and produce a separate description of the vertex position and edge
            * routing changes made. It runs each stage of the layout that has been
            * created.
            */
        run(parent: any): void;
        /**
            * Creates an array of descendant cells
            */
        filterDescendants(cell: any, result: any): void;
        /**
            * Returns true if the given cell is a "port", that is, when connecting to
            * it, its parent is the connecting vertex in terms of graph traversal
            *
            * Parameters:
            *
            * cell - <mxCell> that represents the port.
            */
        isPort(cell: any): boolean;
        /**
            * Returns the edges between the given source and target. This takes into
            * account collapsed and invisible cells and ports.
            *
            * Parameters:
            *
            * source -
            * target -
            * directed -
            */
        getEdgesBetween(source: any, target: any, directed: any): any[];
        /**
            * Traverses the (directed) graph invoking the given function for each
            * visited vertex and edge. The function is invoked with the current vertex
            * and the incoming edge as a parameter. This implementation makes sure
            * each vertex is only visited once. The function may return false if the
            * traversal should stop at the given vertex.
            *
            * Parameters:
            *
            * vertex - <mxCell> that represents the vertex where the traversal starts.
            * directed - boolean indicating if edges should only be traversed
            * from source to target. Default is true.
            * edge - Optional <mxCell> that represents the incoming edge. This is
            * null for the first step of the traversal.
            * allVertices - Array of cell paths for the visited cells.
            * swimlaneIndex - the laid out order index of the swimlane vertex is contained in
            */
        traverse(vertex: any, directed: any, edge: any, allVertices: any, currentComp: any, hierarchyVertices: any, filledVertexSet: any, swimlaneIndex: any): any;
        /**
            * Executes the cycle stage using mxMinimumCycleRemover.
            */
        cycleStage(parent: any): void;
        /**
            * Implements first stage of a Sugiyama layout.
            */
        layeringStage(): void;
        /**
            * Executes the crossing stage using mxMedianHybridCrossingReduction.
            */
        crossingStage(parent: any): void;
        /**
            * Executes the placement stage using mxCoordinateAssignment.
            */
        placementStage(initialX: any, parent: any): any;
    }

    /**
        * The specific layout interface for hierarchical layouts. It adds a
        * <code>run</code> method with a parameter for the hierarchical layout model
        * that is shared between the layout stages.
        *
        * Constructor: mxHierarchicalLayoutStage
        *
        * Constructs a new hierarchical layout stage.
        */
    export class mxHierarchicalLayoutStage {
        /**
            * Takes the graph detail and configuration information within the facade
            * and creates the resulting laid out graph within that facade for further
            * use.
            */
        execute(parent: any): void;
    }

    /**
        * Sets the horizontal locations of node and edge dummy nodes on each layer.
        * Uses median down and up weighings as well heuristic to straighten edges as
        * far as possible.
        *
        * Constructor: mxMedianHybridCrossingReduction
        *
        * Creates a coordinate assignment.
        *
        * Arguments:
        *
        * intraCellSpacing - the minimum buffer between cells on the same rank
        * interRankCellSpacing - the minimum distance between cells on adjacent ranks
        * orientation - the position of the root node(s) relative to the graph
        * initialX - the leftmost coordinate node placement starts at
        */
    export class mxMedianHybridCrossingReduction extends mxHierarchicalLayoutStage {
        constructor(layout: any);
        /**
            * Performs a vertex ordering within ranks as described by Gansner et al
            * 1993
            */
        execute(parent: any): void;
        /**
            * Calculates the total number of edge crossing in the current graph.
            * Returns the current number of edge crossings in the hierarchy graph
            * model in the current candidate layout
            *
            * Parameters:
            *
            * model - the internal model describing the hierarchy
            */
        calculateCrossings(model: any): number;
        /**
            * Calculates the number of edges crossings between the specified rank and
            * the rank below it. Returns the number of edges crossings with the rank
            * beneath
            *
            * Parameters:
            *
            * i -  the topmost rank of the pair ( higher rank value )
            * model - the internal model describing the hierarchy
            */
        calculateRankCrossing(i: any, model: any): number;
        /**
            * Takes each possible adjacent cell pair on each rank and checks if
            * swapping them around reduces the number of crossing
            *
            * Parameters:
            *
            * mainLoopIteration - the iteration number of the main loop
            * model - the internal model describing the hierarchy
            */
        transpose(mainLoopIteration: any, model: any): void;
        /**
            * Sweeps up or down the layout attempting to minimise the median placement
            * of connected cells on adjacent ranks
            *
            * Parameters:
            *
            * iteration - the iteration number of the main loop
            * model - the internal model describing the hierarchy
            */
        weightedMedian(iteration: any, model: any): void;
        /**
            * Attempts to minimise the median placement of connected cells on this rank
            * and one of the adjacent ranks
            *
            * Parameters:
            *
            * rankValue - the layer number of this rank
            * downwardSweep - whether or not this is a downward sweep through the graph
            */
        medianRank(rankValue: any, downwardSweep: any): void;
        /**
            * Calculates the median rank order positioning for the specified cell using
            * the connected cells on the specified rank. Returns the median rank
            * ordering value of the connected cells
            *
            * Parameters:
            *
            * connectedCells - the cells on the specified rank connected to the
            * specified cell
            * rankValue - the rank that the connected cell lie upon
            */
        medianValue(connectedCells: any, rankValue: any): any;
    }
    /**
        * A utility class used to track cells whilst sorting occurs on the median
        * values. Does not violate (x.compareTo(y)==0) == (x.equals(y))
        *
        * Constructor: MedianCellSorter
        *
        * Constructs a new median cell sorter.
        */
    export class MedianCellSorter {
        /**
            * Compares two MedianCellSorters.
            */
        compare(a: any, b: any): 1 | 0 | -1;
    }

    /**
        * An implementation of the first stage of the Sugiyama layout. Straightforward
        * longest path calculation of layer assignment
        *
        * Constructor: mxMinimumCycleRemover
        *
        * Creates a cycle remover for the given internal model.
        */
    export class mxMinimumCycleRemover extends mxHierarchicalLayoutStage {
        constructor(layout: any);
        /**
            * Takes the graph detail and configuration information within the facade
            * and creates the resulting laid out graph within that facade for further
            * use.
            */
        execute(parent: any): void;
    }

    /**
        * Sets the horizontal locations of node and edge dummy nodes on each layer.
        * Uses median down and up weighings as well as heuristics to straighten edges as
        * far as possible.
        *
        * Constructor: mxCoordinateAssignment
        *
        * Creates a coordinate assignment.
        *
        * Arguments:
        *
        * intraCellSpacing - the minimum buffer between cells on the same rank
        * interRankCellSpacing - the minimum distance between cells on adjacent ranks
        * orientation - the position of the root node(s) relative to the graph
        * initialX - the leftmost coordinate node placement starts at
        */
    export class mxCoordinateAssignment extends mxHierarchicalLayoutStage {
        constructor(layout: any, intraCellSpacing: any, interRankCellSpacing: any, orientation: any, initialX: any, parallelEdgeSpacing: any);
        /**
            * Utility method to display current positions
            */
        printStatus(): void;
        /**
            * A basic horizontal coordinate assignment algorithm
            */
        execute(parent: any): void;
        /**
            * Performs one median positioning sweep in both directions
            */
        minNode(model: any): void;
        /**
            * Performs one median positioning sweep in one direction
            *
            * Parameters:
            *
            * i - the iteration of the whole process
            * model - an internal model of the hierarchical layout
            */
        medianPos(i: any, model: any): void;
        /**
            * Performs median minimisation over one rank.
            *
            * Parameters:
            *
            * rankValue - the layer number of this rank
            * model - an internal model of the hierarchical layout
            * nextRankValue - the layer number whose connected cels are to be laid out
            * relative to
            */
        rankMedianPosition(rankValue: any, model: any, nextRankValue: any): void;
        /**
            * Calculates the priority the specified cell has based on the type of its
            * cell and the cells it is connected to on the next layer
            *
            * Parameters:
            *
            * currentCell - the cell whose weight is to be calculated
            * collection - the cells the specified cell is connected to
            */
        calculatedWeightedValue(currentCell: any, collection: any): number;
        /**
            * Calculates the median position of the connected cell on the specified
            * rank
            *
            * Parameters:
            *
            * connectedCells - the cells the candidate connects to on this level
            * rankValue - the layer number of this rank
            */
        medianXValue(connectedCells: any, rankValue: any): any;
        /**
            * Sets up the layout in an initial positioning. The ranks are all centered
            * as much as possible along the middle vertex in each rank. The other cells
            * are then placed as close as possible on either side.
            *
            * Parameters:
            *
            * facade - the facade describing the input graph
            * model - an internal model of the hierarchical layout
            */
        initialCoords(facade: any, model: any): void;
        /**
            * Sets up the layout in an initial positioning. All the first cells in each
            * rank are moved to the left and the rest of the rank inserted as close
            * together as their size and buffering permits. This method works on just
            * the specified rank.
            *
            * Parameters:
            *
            * rankValue - the current rank being processed
            * graph - the facade describing the input graph
            * model - an internal model of the hierarchical layout
            */
        rankCoordinates(rankValue: any, graph: any, model: any): void;
        /**
            * Calculates the width rank in the hierarchy. Also set the y value of each
            * rank whilst performing the calculation
            *
            * Parameters:
            *
            * graph - the facade describing the input graph
            * model - an internal model of the hierarchical layout
            */
        calculateWidestRank(graph: any, model: any): void;
        /**
            * Straightens out chains of virtual nodes where possibleacade to those stored after this layout
            * processing step has completed.
            *
            * Parameters:
            *
            * graph - the facade describing the input graph
            * model - an internal model of the hierarchical layout
            */
        minPath(graph: any, model: any): void;
        /**
            * Determines whether or not a node may be moved to the specified x
            * position on the specified rank
            *
            * Parameters:
            *
            * model - the layout model
            * cell - the cell being analysed
            * rank - the layer of the cell
            * position - the x position being sought
            */
        repositionValid(model: any, cell: any, rank: any, position: any): boolean;
        /**
            * Sets the cell locations in the facade to those stored after this layout
            * processing step has completed.
            *
            * Parameters:
            *
            * graph - the input graph
            * model - the layout model
            */
        setCellLocations(graph: any, model: any): void;
        /**
            * Separates the x position of edges as they connect to vertices
            *
            * Parameters:
            *
            * model - the layout model
            */
        localEdgeProcessing(model: any): void;
        /**
            * Fixes the control points
            */
        setEdgePosition(cell: any): void;
        /**
            * Fixes the position of the specified vertex.
            *
            * Parameters:
            *
            * cell - the vertex to position
            */
        setVertexLocation(cell: any): void;
        /**
            * Hook to add additional processing
            *
            * Parameters:
            *
            * edge - the hierarchical model edge
            * realEdge - the real edge in the graph
            */
        processReversedEdge(graph: any, model: any): void;
    }

    /**
        * An implementation of the first stage of the Sugiyama layout. Straightforward
        * longest path calculation of layer assignment
        *
        * Constructor: mxSwimlaneOrdering
        *
        * Creates a cycle remover for the given internal model.
        */
    export class mxSwimlaneOrdering extends mxHierarchicalLayoutStage {
        constructor(layout: any);
        /**
            * Takes the graph detail and configuration information within the facade
            * and creates the resulting laid out graph within that facade for further
            * use.
            */
        execute(parent: any): void;
    }

    /**
        * An abstraction of an internal hierarchy node or edge
        *
        * Constructor: mxGraphAbstractHierarchyCell
        *
        * Constructs a new hierarchical layout algorithm.
        *
        * Arguments:
        *
        * graph - Reference to the enclosing <mxGraph>.
        * deterministic - Optional boolean that specifies if this layout should be
        * deterministic. Default is true.
        */
    export class mxGraphAbstractHierarchyCell {
        constructor();
        /**
            * Returns the cells this cell connects to on the next layer up
            */
        getNextLayerConnectedCells(layer: any): any;
        /**
            * Returns the cells this cell connects to on the next layer down
            */
        getPreviousLayerConnectedCells(layer: any): any;
        /**
            * Returns whether or not this cell is an edge
            */
        isEdge(): boolean;
        /**
            * Returns whether or not this cell is a node
            */
        isVertex(): boolean;
        /**
            * Gets the value of temp for the specified layer
            */
        getGeneralPurposeVariable(layer: any): any;
        /**
            * Set the value of temp for the specified layer
            */
        setGeneralPurposeVariable(layer: any, value: any): any;
        /**
            * Set the value of x for the specified layer
            */
        setX(layer: any, value: any): void;
        /**
            * Gets the value of x on the specified layer
            */
        getX(layer: any): any;
        /**
            * Set the value of y for the specified layer
            */
        setY(layer: any, value: any): void;
    }

    /**
        * An abstraction of a hierarchical edge for the hierarchy layout
        *
        * Constructor: mxGraphHierarchyNode
        *
        * Constructs an internal node to represent the specified real graph cell
        *
        * Arguments:
        *
        * cell - the real graph cell this node represents
        */
    export class mxGraphHierarchyNode extends mxGraphAbstractHierarchyCell {
        constructor(cell: any);
        /**
            * Returns the integer value of the layer that this node resides in
            */
        getRankValue(layer: any): any;
        /**
            * Returns the cells this cell connects to on the next layer up
            */
        getNextLayerConnectedCells(layer: any): any;
        /**
            * Returns the cells this cell connects to on the next layer down
            */
        getPreviousLayerConnectedCells(layer: any): any;
        /**
            * Returns true.
            */
        isVertex(): boolean;
        /**
            * Gets the value of temp for the specified layer
            */
        getGeneralPurposeVariable(layer: any): any;
        /**
            * Set the value of temp for the specified layer
            */
        setGeneralPurposeVariable(layer: any, value: any): void;
        /**
            * Function: isAncestor
            */
        isAncestor(otherNode: any): boolean;
        /**
            * Gets the core vertex associated with this wrapper
            */
        getCoreCell(): any;
    }

    /**
        * An abstraction of a hierarchical edge for the hierarchy layout
        *
        * Constructor: mxGraphHierarchyEdge
        *
        * Constructs a hierarchy edge
        *
        * Arguments:
        *
        * edges - a list of real graph edges this abstraction represents
        */
    export class mxGraphHierarchyEdge extends mxGraphAbstractHierarchyCell {
        constructor(edges: any);
        /**
            * Inverts the direction of this internal edge(s)
            */
        invert(layer: any): void;
        /**
            * Returns the cells this cell connects to on the next layer up
            */
        getNextLayerConnectedCells(layer: any): any;
        /**
            * Returns the cells this cell connects to on the next layer down
            */
        getPreviousLayerConnectedCells(layer: any): any;
        /**
            * Returns true.
            */
        isEdge(): boolean;
        /**
            * Gets the value of temp for the specified layer
            */
        getGeneralPurposeVariable(layer: any): any;
        /**
            * Set the value of temp for the specified layer
            */
        setGeneralPurposeVariable(layer: any, value: any): void;
        /**
            * Gets the first core edge associated with this wrapper
            */
        getCoreCell(): any;
    }

    /**
        * Internal model of a hierarchical graph. This model stores nodes and edges
        * equivalent to the real graph nodes and edges, but also stores the rank of the
        * cells, the order within the ranks and the new candidate locations of cells.
        * The internal model also reverses edge direction were appropriate , ignores
        * self-loop and groups parallels together under one edge object.
        *
        * Constructor: mxGraphHierarchyModel
        *
        * Creates an internal ordered graph model using the vertices passed in. If
        * there are any, leftward edge need to be inverted in the internal model
        *
        * Arguments:
        *
        * graph - the facade describing the graph to be operated on
        * vertices - the vertices for this hierarchy
        * ordered - whether or not the vertices are already ordered
        * deterministic - whether or not this layout should be deterministic on each
        * tightenToSource - whether or not to tighten vertices towards the sources
        * scanRanksFromSinks - Whether rank assignment is from the sinks or sources.
        * usage
        */
    export class mxGraphHierarchyModel {
        constructor(layout: any, vertices: any, roots: any, parent: any, tightenToSource: any);
        /**
            * Creates all edges in the internal model
            *
            * Parameters:
            *
            * layout - Reference to the <mxHierarchicalLayout> algorithm.
            * vertices - Array of <mxCells> that represent the vertices whom are to
            * have an internal representation created.
            * internalVertices - The array of <mxGraphHierarchyNodes> to have their
            * information filled in using the real vertices.
            */
        createInternalCells(layout: any, vertices: any, internalVertices: any): void;
        /**
            * Basic determination of minimum layer ranking by working from from sources
            * or sinks and working through each node in the relevant edge direction.
            * Starting at the sinks is basically a longest path layering algorithm.
         */
        initialRank(): void;
        /**
            * Fixes the layer assignments to the values stored in the nodes. Also needs
            * to create dummy nodes for edges that cross layers.
            */
        fixRanks(): void;
        /**
            * A depth first search through the internal heirarchy model.
            *
            * Parameters:
            *
            * visitor - The visitor function pattern to be called for each node.
            * trackAncestors - Whether or not the search is to keep track all nodes
            * directly above this one in the search path.
            */
        visit(visitor: any, dfsRoots: any, trackAncestors: any, seenNodes: any): void;
        /**
            * Performs a depth first search on the internal hierarchy model
            *
            * Parameters:
            *
            * parent - the parent internal node of the current internal node
            * root - the current internal node
            * connectingEdge - the internal edge connecting the internal node and the parent
            * internal node, if any
            * visitor - the visitor pattern to be called for each node
            * seen - a set of all nodes seen by this dfs a set of all of the
            * ancestor node of the current node
            * layer - the layer on the dfs tree ( not the same as the model ranks )
            */
        dfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, layer: any): void;
        /**
            * Performs a depth first search on the internal hierarchy model. This dfs
            * extends the default version by keeping track of cells ancestors, but it
            * should be only used when necessary because of it can be computationally
            * intensive for deep searches.
            *
            * Parameters:
            *
            * parent - the parent internal node of the current internal node
            * root - the current internal node
            * connectingEdge - the internal edge connecting the internal node and the parent
            * internal node, if any
            * visitor - the visitor pattern to be called for each node
            * seen - a set of all nodes seen by this dfs
            * ancestors - the parent hash code
            * childHash - the new hash code for this node
            * layer - the layer on the dfs tree ( not the same as the model ranks )
            */
        extendedDfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, ancestors: any, childHash: any, layer: any): void;
    }

    /**
        * Internal model of a hierarchical graph. This model stores nodes and edges
        * equivalent to the real graph nodes and edges, but also stores the rank of the
        * cells, the order within the ranks and the new candidate locations of cells.
        * The internal model also reverses edge direction were appropriate , ignores
        * self-loop and groups parallels together under one edge object.
        *
        * Constructor: mxSwimlaneModel
        *
        * Creates an internal ordered graph model using the vertices passed in. If
        * there are any, leftward edge need to be inverted in the internal model
        *
        * Arguments:
        *
        * graph - the facade describing the graph to be operated on
        * vertices - the vertices for this hierarchy
        * ordered - whether or not the vertices are already ordered
        * deterministic - whether or not this layout should be deterministic on each
        * tightenToSource - whether or not to tighten vertices towards the sources
        * scanRanksFromSinks - Whether rank assignment is from the sinks or sources.
        * usage
        */
    export class mxSwimlaneModel {
        constructor(layout: any, vertices: any, roots: any, parent: any, tightenToSource: any);
        /**
            * Creates all edges in the internal model
            *
            * Parameters:
            *
            * layout - Reference to the <mxHierarchicalLayout> algorithm.
            * vertices - Array of <mxCells> that represent the vertices whom are to
            * have an internal representation created.
            * internalVertices - The array of <mxGraphHierarchyNodes> to have their
            * information filled in using the real vertices.
            */
        createInternalCells(layout: any, vertices: any, internalVertices: any): void;
        /**
            * Basic determination of minimum layer ranking by working from from sources
            * or sinks and working through each node in the relevant edge direction.
            * Starting at the sinks is basically a longest path layering algorithm.
         */
        initialRank(): void;
        /**
            * Performs a depth first search on the internal hierarchy model. This dfs
            * extends the default version by keeping track of chains within groups.
            * Any cycles should be removed prior to running, but previously seen cells
            * are ignored.
            *
            * Parameters:
            *
            * parent - the parent internal node of the current internal node
            * root - the current internal node
            * connectingEdge - the internal edge connecting the internal node and the parent
            * internal node, if any
            * seen - a set of all nodes seen by this dfs
            * chainCount - the number of edges in the chain of vertices going through
            * the current swimlane
            */
        maxChainDfs(parent: any, root: any, connectingEdge: any, seen: any, chainCount: any): void;
        /**
            * Fixes the layer assignments to the values stored in the nodes. Also needs
            * to create dummy nodes for edges that cross layers.
            */
        fixRanks(): void;
        /**
            * A depth first search through the internal heirarchy model.
            *
            * Parameters:
            *
            * visitor - The visitor function pattern to be called for each node.
            * trackAncestors - Whether or not the search is to keep track all nodes
            * directly above this one in the search path.
            */
        visit(visitor: any, dfsRoots: any, trackAncestors: any, seenNodes: any): void;
        /**
            * Performs a depth first search on the internal hierarchy model
            *
            * Parameters:
            *
            * parent - the parent internal node of the current internal node
            * root - the current internal node
            * connectingEdge - the internal edge connecting the internal node and the parent
            * internal node, if any
            * visitor - the visitor pattern to be called for each node
            * seen - a set of all nodes seen by this dfs a set of all of the
            * ancestor node of the current node
            * layer - the layer on the dfs tree ( not the same as the model ranks )
            */
        dfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, layer: any): void;
        /**
            * Performs a depth first search on the internal hierarchy model. This dfs
            * extends the default version by keeping track of cells ancestors, but it
            * should be only used when necessary because of it can be computationally
            * intensive for deep searches.
            *
            * Parameters:
            *
            * parent - the parent internal node of the current internal node
            * root - the current internal node
            * connectingEdge - the internal edge connecting the internal node and the parent
            * internal node, if any
            * visitor - the visitor pattern to be called for each node
            * seen - a set of all nodes seen by this dfs
            * ancestors - the parent hash code
            * childHash - the new hash code for this node
            * layer - the layer on the dfs tree ( not the same as the model ranks )
            */
        extendedDfs(parent: any, root: any, connectingEdge: any, visitor: any, seen: any, ancestors: any, childHash: any, layer: any): void;
    }
}