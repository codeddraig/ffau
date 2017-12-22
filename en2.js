Msg = {
  categories: {
    "html": "(not meant to be here)",
    "baseframe": "HTML Frame",
    "textstructure": "Text layout",
    "markup": "Text design",
    "style": "Styling",
    "enumerations": "Lists",
    "tables": "Tables",
    "forms": "Forms and inputs",
    //Below this point, there shouldn't be anything visible. Simply deleting the section's 'definition' does not work, so I temporarily filled it in with sample text to show that it is not meant to be there until I figure out a way to _completely_ get rid of any trace of its existance.   
    "scripts": "Do not click!",
    "scripting": "Do not click!",
    "logic": "Do not click!",
    "loops": "Do not click!",
    "math": "Do not click!",
    "text": "Do not click!",
    "lists": "Do not click!",
    "color": "Do not click!",
    "variables": "Do not click!",
    "functions": "Do not click!",
  },
  blocks: {
    "baseframe": {
      "message0": "<html> %1 <head> %2 %3 </head> <body> %4 %5 </body> </html>",
    },
    "html": {
      "message0": "<html> %1 %2 </html>",
    },
    "body": {
      "message0": "<body> %1 %2 </body>",
    },
    "head": {
      "message0": "<head> %1 %2 </head>",
    },
    "title": {
      "message0": "<title> %1 </title>",
    },
    "deleted": {
      "message0": "<in> %1 %2 </in> 
    },
    "paragraph": {
      "message0": "<p> %1 </p>",
    },
    "plaintext": {
      "message0": " %1 ",
    },
    "division": {
      "message0": "<div> %1 %2 </div>",
    },
    "style": {
      "message0": "style= %1 %2 ",
      "tooltip": "",
      "helpUrl": ""
    },
    "color": {
      "message0": "colour:  %1",
      "tooltip": "",
      "helpUrl": ""
    },
    "bgcolour": {
      "message0": "background-colour:  %1",
      "helpUrl": ""
    },
    "link": {
      "message0": "<a href= %1 > %2 %3 </a>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp",
      "args0": [{"text": "destination"}]
    },
    "span": {
      "message0": "<span> %1 %2 </span>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "image": {
      "message0": "<img src= %1 alt= %2 >",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp",
      "args0": [
        {"text": ""},
        {"text": ""}
      ],
    },
    "emphasise": {
      "message0": "<em> %1 %2 </em>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "strong": {
      "message0": "<strong> %1 %2 </strong>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    
    "headline": {
      //Theodore, how would we make the closing tag here? I am not fully proficient in Javascript, so see if you can figure something out.
      "message0": "<h %1 > %2 %3 </h1>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp",
      "args0": [{"options": [
        ["1","h1"],
        ["2","h2"],
        ["3","h3"],
        ["4","h4"],
        ["5","h5"],
        ["6","h6"]
      ]}],
    },
    "linebreak": {
      "message0": "<br/>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "horizontalbreak": {
      "message0": "<hr/>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "unorderedlist": {
      "message0": "<ul> %1 %2 </ul>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "orderedlist": {
      "message0": "<ol> %1 %2 </ol>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
    "listelement": {
      "message0": "<li> %1 %2 </li>",
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
    },
  }
}




