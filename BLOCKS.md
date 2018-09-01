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
* `button` (TBA)

### Media
* `image` `<img src="">` (`placeholder` attribute TBA)
* `audio` `<audio loop="" autoplay="" controls=""> <source src="" type=""> </audio>`
* `video` `<video loop="" autoplay="" controls=""> <source src="" type=""> </video>`

## CSS
### Structure
* `style` `<style> </style>` (only fits in `head`)
* `stylearg` `style=""` (only fits in `args`)
* `linkhead` `<link rel="stylesheet" href="">` (used to import Bootstrap, Materialize or Magic.css)
* `cssitem` `selector {}`

### Text
* `fontfamily` `font-family: ;`
* `fontsize` `font-size: ;`
* `color` `color: ;`
* `textshadow` `text-shadow: a b c d;`

### Arrangement
* `margin` `margin-direction: ;` (where direction is left, right, top or bottom)
* `padding` `padding-direction: ;` (same as margin)
* `display` `display: ;`
* `overflow` `overflow-direction: ;` (where direction is y or x)
* `widthheightnum` `width/height: ;` (takes any input)
* `widthheight` `width/height: ;` (takes only auto, initial or inherit)

### Design
* `bgcolor` `background-color: ;`
* `bgimage` `background-image: url();`
* `bgposition` `background-position: ;`
* `bgrepeat` `background-repeat: ;`
* `bgsize` `background-size: ;`
* `border` `border: a b c;`
* `bordercol` `border-collapse: ;`
* `borderrad` `border-radius: ;`
* `cursor` `cursor: ;`

### Other
* `cssevents` `::after/::before/:focus/:hover` (name should be `csspseudo`)
* `cssnot` `:not()`
