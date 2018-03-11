# Ffau Editor Changelog and Feature List - Version 0.3.0
All new additions in **bold**.

## Summary
This release of Ffau Editor introduces JavaScript scripting, within the block editor. A few bugs have been fixed, and some minor HTML blocks have been added. We have moved from Materialize.css to Magic.css for formatting of the editor page, and have added syntax highlighting for pure code viewing to the editor page with Ace editor.

## Details
* Updated version numbers in index.html and version.txt
  * Blocks:
    * STRUCTURE
      * &lt;html&gt;
      * &lt;head&gt;
      * &lt;body&gt;
      * &lt;title&gt;
      * &lt;header&gt;
      * &lt;footer&gt;
      * &lt;div&gt;
      * &lt;/br&gt;
      * &lt;/hr&gt;
      * &lt;meta&lt;
      * **&lt;meta name="viewport"&lt;**
      * Pre-determined structure block sets
    * MODIFIERS
      * (arguments)
      * class = ""
      * id = ""
      * property = value
    * STYLE
      * &lt;style&gt;
      * style =
      * (Pure CSS) selector { }
      * Ability to include Materialize.css and Bootstrap in your projects
      * **Ability to include Magic.css in your projects**
    * CSS ATTRIBUTES
      * property : value assignment
      * font-family
      * font-size
      * color
      * text-shadow
      * margin-top/left/bottom/right
      * padding
      * display
      * overflow
      * width / height
      * background-color
      * background-image
      * background-position
      * background-repeat
      * background-size
      * border
      * border-collapse
      * border-radius
      * cursor
    * TEXT
      * Text placeholder element
      * &lt;span&gt;
      * &lt;strong/em/mark/small/big/del/ins/sub/sup/code/&gt;
      * &lt;p&gt;
      * &lt;h1&gt; though &lt;h6&gt;
      * &lt;a&gt;
    * TABLES
      * &lt;table&gt;
      * &lt;tr&gt;
      * &lt;th&gt;
      * &lt;td&gt;
    * LISTS
      * &lt;ul&gt;
      * &lt;ol&gt;
      * &lt;li&gt;
    * SUMMARY
      * &lt;details&gt;
      * &lt;summary&gt;
    * FORMS
      * &lt;form&gt;
      * &lt;input&gt;
      * &lt;label&gt;
    * MEDIA
      * &lt;audio&gt;
      * &lt;img&gt;
      * &lt;video&gt;
    * **SCRIPTING**
      * **&lt;script&gt;**
      * **Default Blockly Scripting blocks + generators**
