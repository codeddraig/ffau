import os
import re

from datetime import datetime


def to_json(filename):
    with open(filename) as file:
        css = " " + file.read()

        css_dict = {}

        match_so_far = ""
        body_so_far = ""
        in_comment = False
        in_bracket = False
        in_string = False
        for i, char in enumerate(css, 1):
            if css[i - 2] + char == "/*" and not in_string:
                in_comment = True
                body_so_far = body_so_far[:-1]

            if not in_comment:
                if char in ['"', "'"]:
                    if not in_string and css[i - 2] != "\\":
                        in_string = char
                    else:
                        if char == in_string:
                            in_string = False

                if not in_bracket:
                    match_so_far += char

                    if char == "{":
                        in_bracket = True
                    elif char == "\n":
                        match_so_far = ""
                else:
                    body_so_far += char

                    if char == "}":
                        in_bracket = False

                        selector_name = match_so_far.replace("{", "").strip()

                        string_points = re.split("((['\"])(\\\\.|[^'\"])*\\2)", selector_name)
                        comma_points = [i for i, ltr in enumerate(selector_name) if ltr == ","]

                        new_string_points = [0]
                        for z, point in enumerate(string_points):
                            if z % 4 in [0, 1]:
                                new_string_points.append(len(point) + new_string_points[-1])

                        new_string_points = [i for i in new_string_points for _ in range(2)][1:-1]
                        new_string_points = [new_string_points[x:x + 2] for x in range(0, len(new_string_points), 2)]

                        string_points = new_string_points
                        new_string_points = []
                        for z, point in enumerate(string_points):
                            if z % 2 == 1:
                                new_string_points.append(point)

                        good_comma_points = []
                        for comma_point in comma_points:
                            is_good = True
                            for string_range in new_string_points:
                                if string_range[0] <= comma_point <= string_range[1]:
                                    is_good = False
                                    break

                            if is_good:
                                good_comma_points.append(comma_point)

                        selectors = [selector_name[i:j].strip(", ")
                                     for i, j in zip([0] + good_comma_points, good_comma_points + [None])]

                        for selector in selectors:
                            css_dict[selector.replace("{", "").strip()] = body_so_far \
                                                                              .replace("\n", "") \
                                                                              .replace("\t", "")[:-1] \
                                .strip()

                        match_so_far = ""
                        body_so_far = ""
            else:
                if css[i - 2] + char == "*/":
                    in_comment = False

        return css_dict


def to_css(css_obj):
    write_str = ""
    for selector in css_obj.keys():
        write_str += selector + "{" + css_obj[selector] + "}"

    return re.sub("( {2,})|(\n{2,})|(\t{2,})", "", write_str)


if os.path.exists("ffau.css"):
    os.remove("ffau.css")

cssFiles = ["./src/themes/" + f for f in os.listdir("./src/themes/") if os.path.isfile("./src/themes/" + f)
            and f.endswith(".css")
            and not (
        f.endswith("__.css") and
        f.startswith("__")
)
            ]

globalFiles = ["./src/themes/" + f for f in os.listdir("./src/themes/") if os.path.isfile("./src/themes/" + f)
            and f.endswith(".css")
            and (
        f.endswith("__.css") and
        f.startswith("__")
)]

cssData = ""

for filename in globalFiles:
    if filename == "./src/themes/__styles__.css":
        cssData += "\n\n/*Global Ffau styles*/\n"
    else:
        cssData += "\n\n\n/*Global styles (" + filename[11:-6] + ")*/\n"
    cssData += to_css(to_json(filename))

cssData += "\n\n"

for filename in cssFiles:
    json = to_json(filename)

    new_dict = json.copy()
    cssFileName = filename.split("/")[-1][:-4].lower()

    for key in json.keys():
        newkey = key
        if key.startswith((".blocklyTreeRow", ".blocklyTreeLabel", ".blocklyTreeIcon",
                           ".blocklyTreeSeparator", ".blocklyToolboxDiv", ".blocklySvg",
                           ".blocklyFlyoutBackground", ".blocklyFlyoutLabelText", ".blocklyText",
                           ".blocklyMainBackground", ".blocklyScrollbarHandle", ".blocklyScrollbarBackground")):
            newkey = "div.injectionDiv.blocklyTheme" + cssFileName.capitalize() + " " + key

        if newkey != key:
            new_dict[newkey] = new_dict[key]
            del new_dict[key]

    css_str = re.sub(r"b'(.*)'", r"\1", str(to_css(new_dict)))
    cssData += "\n\n/*Theme '" + cssFileName + "'*/\n" + css_str + \
               ".verifyBlocklyTheme" + cssFileName.capitalize() + "::before{content:'verify-" \
               + cssFileName + "';}"

f = open("./dist/ffau.css", "w+")
f.writelines(["/*\n",
              "\tTHIS FILE IS AUTO-GENERATED. DO NOT TAMPER MANUALLY:\n",
              "\t\tEDIT THE FILES IN `./src/themes` AND RUN `python ./compile_styles.py` FROM PROJECT ROOT\n",
              "\nThis version generated: " + datetime.now().strftime("%d/%m/%Y, %H:%M:%S"),
              "\n*/\n"])
f.write(cssData)
f.close()

print("Success! See `dist/ffau.css` for output code, or use:")
print('\t<link href="dist/ffau.css" rel="stylesheet">')
print('in the <head> of your HTML file to import the new themes.')
