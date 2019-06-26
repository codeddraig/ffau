# Full list of available Ffau blocks

`block_name` `generated_code`

## HTML
### Head section
* `html` `<!DOCTYPE html> <html> </html>`
* `head` `<head> </head>`
* `title` `<title> </title>`
* `metacharset` `<meta charset="">`
* `metaviewport` `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### Basic body
* `body` `<body> </body>`
* `header` `<header> </header>`
* `footer` `<footer> </footer>`
* `divider` `<div> </div>` (name should be `division`)
* `linebreak` `<br />`
* `hline` `<hr />`

### Attributes
* `args` Contains other attributes (name should be `attrs`)
* `class` `class=""`
* `id` `id=""`
* `align` `align=""` (deprecated in HTML5, but still available in most browsers)
* `emptyarg` `attribute=""` (where attribute is any user-entered attribute name - **WARNING**: this can be dangerous, for example JavaScript attributes. We don't recommend including this in a production toolbox)

### Text
* `emptytext` Inserts plain text in any appropriate container
* `span` `<span> </span>`
* `textmod` `<strong/em/ins/etc> </>`
* `paragraph` `<p> </p>`
* `header` `<hX> </hX>` (where X is 1-6)
* `link` `<a href=""> </a>`

### Tables
* `table` `<table> </table>`
* `tablerow` `<tr> </tr>`
* `tableheading` `<th> </th>`
* `tabledata` `<td> </td>`

### Lists
* `unorderedlist` `<ul> </ul>`
* `orderedlist` `<ol> </ol>`
* `listitem` `<li> </li>`

### Details/summary
* `details` `<details> </details>`
* `summary` `<summary> </summary>`

### Forms
* `form` `<form> </form>`
* `input` `<input type="" value="" placeholder="" name="">`
* `label` `<label> </label>` (`for` attribute TBA)
* `button` (TBA, use `<input type="submit>` for now)

### Media
* `image` `<img src="">` (`placeholder` attribute TBA)
* `audio` `<audio loop="" autoplay="" controls=""> <source src="" type=""> </audio>`
* `video` `<video loop="" autoplay="" controls=""> <source src="" type=""> </video>`

### Snippets
For these snippets, the generated code is not shown since it's too long and relatively unimportant. However, XML toolbox examples may be provided.

##### Google Chart
* `chart` Google Chart (Bar, Column or Pie)
* `chart_row` A row of data for a Google Chart
* `chart_column` A column to go inside a row for a Google Chart

XML toolbox example:
```
<block type="chart">
    <value name="data">
        <block type="chart_row">
            <value name="columns">
                <block type="chart_column"></block>
            </value>
            <value name="columns">
                <block type="chart_column"></block>
            </value>
        </block>
    </value>
    
    <value name="modifier">
        <block type="args">
            <value name="content">
                <block type="stylearg">
                    <value name="content">
                        <block type="widthheightnum">
                            <field name="option">height</field>
                            <field name="size">300px</field>
                        </block>
                    </value>
                    <value name="content">
                        <block type="widthheightnum">
                            <field name="option">width</field>
                            <field name="size">400px</field>
                        </block>
                    </value>
                </block>
            </value>
        </block>
    </value>
</block>
```

##### Gumshoe
See <https://github.com/cferdinandi/gumshoe>.

* `scrollspy` A block for creating a scrollspy system

See <https://codedragon.org/editor/25d6617c5adb6470f9a2166d3a6d5f48> for an example of how to use this block

## CSS
### Structure
* `style` `<style> </style>` (only fits in `head`)
* `stylearg` `style=""` (only fits in `args`)
* `linkhead` `<link rel="stylesheet" href="">` (used to import Bootstrap, Materialize or Magic.css)
* `cssitem` `selector {}`

### Text
* `fontfamily` `font-family: ;`
* `fontsize` `font-size: ;`
* `fontweight` `font-weight: ;`
* `color` `color: ;` - deprecated; kept for backwards compatibility
* `color-new` `color: ;` - new version of `color`, accepting color type blocks instead of a built-in color picker
* `colordropdown` `color: initial/inherit;`
* `textshadow` `text-shadow: a b c d;` - deprecated; kept for backwards compatibility
* `textshadow-new` `text-shadow: a b c d;` - new version of `textshadow`, accepting color type blocks instead of a built-in color picker
* `texttransform` `text-transform: ;`
* `textalign` `text-align: ;`
* `letterspacing` `letter-spacing: ;`

### Arrangement
* `margin` `margin-direction: ;` (where direction is left, right, top or bottom)
* `padding` `padding-direction: ;` (same as margin)
* `display` `display: ;`
* `overflow` `overflow-direction: ;` (where direction is y or x)
* `widthheightnum` `width/height: ;` (takes any input)
* `widthheight` `width/height: ;` (takes only auto, initial or inherit)
* `float` `float: ;`
* `verticalalign` `vertical-align: ;`

### Design
* `color_picker` `#color` - built-in Blockly color picker
* `hex_picker` `#color` - manual hex text entry
* `rgba_picker` `rgba(r, g, b, a)`
* `bgcolor` `background-color: ;` - deprecated; kept for backwards compatibility
* `bgcolor-new` `background-color: ;` - new version of `bgcolor`, accepting color type blocks instead of a built-in color picker
* `bgimage` `background-image: url();`
* `bgposition` `background-position: ;`
* `bgrepeat` `background-repeat: ;`
* `bgsize` `background-size: ;`
* `cursor` `cursor: ;`
* `boxshadow` `box-shadow: x y blur color;` - deprecated; kept for backwards compatibility
* `boxshadow-new` `box-shadow: x y blur color;` - new version of `boxshadow`, accepting color type blocks instead of a built-in color picker

### Borders
* `border` `border: a b c;` - deprecated; kept for backwards compatibility
* `border-new` `border: a b c;` - new version of `border`, accepting color type blocks instead of a built-in color picker
* `borderedge` `border-edge: a b c;` - deprecated; kept for backwards compatibility
* `borderedge-new` `border-edge: a b c;` - new version of `borderedge`, accepting color type blocks instead of a built-in color picker
* `bordercol` `border-collapse: ;`
* `borderrad` `border-radius: ;`

### Transitions
* `transition` `transition-property: ; transition-duration: ; transition-delay: ; transition-timing-function: ;`
* `transitiontimingdropdown` `ease/linear/etc...`
* `transitiontimingbezier` `cubic-bezier(0, 0, 0, 0)`

### Other
* `cssevents` `::after/::before/:focus/:hover` (name should be `csspseudo`)
* `cssnot` `:not()`
