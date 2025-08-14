# Obsidian Moons

_Originally posted on the [Obsidian.md Forum](https://forum.obsidian.md/t/insert-moon-phase-in-daily-note-with-templater) to share my implementation of the phases; quickly after i created another script for moon signs (coming soon). After some time (exactly one year later, thanks to my "last year on this date" daily feature, and a request, i added full moon names, optimized the script while at it, and created this repository._

## Moon Phase Templater Script

### Concept

With the help of a javascript function, the moon phase is derived from the file’s date and inserted in a daily note through its template and Templater.

### Requirements & Dependencies

- [Templater](https://silentvoid13.github.io/Templater/introduction.html), installed
- The javascript file moon_phase.js, in this repository
- That’s all!

### Preliminary setup

Place the moon_phase.js script inside the folder of your choice. I chose Atlas/Ressources/scripts in my vault.
In the Templater settings, under User Scripts Functions, locate the scripts folder and Refresh 🔄 the Detected User Scripts.

### Template implementation

This implementation is relative to the file’s title.
For my usage, i wanted to insert the moon phase inside my daily notes, which have a YYYY-MM-DD file title format. I already use Templater to generate various elements of the note based on the file title (it allows to create the file whenever i want and still have relative dates inside it).

- Open your daily note’s template ― i won’t detail how to set it up if you’re not using any yet, it’s easy enough to find around here.
- On a new line, or wherever you want the moon phase displayed, insert : `<% tp.user.moon_phase(tp) %>`
- For the most basic (northern hemisphere, english) implementation, that’s enough!

### Customization

In order for a bit more control over the information displayed, I was about to write that you could play inside the javascript file; but i actually took the time and fun to expand it so that we can instead provide the function with optional parameters.

`<% tp.user.moon_phase(tp, language, display, separator, title_format, hemisphere) %>`

- `tp` : the templater object, mandatory to retrieve the date
- `language` : the text’s language; currently, only `"en"` (default), `"fr"`, and `"es"` are supported
- `display` : what is being rendered
  - `"emoji text"` for emoji and text (default)
  - `"text emoji"` for text and emoji
  - `"emoji"` for emoji only
  - `"text"` for text only
- `separator` : the character between emoji and text; default : `" "` (space)
- `title_format` : your daily note’s title format; default : `"YYYY-MM-DD"`
- `hemisphere` : the hemisphere you are in; will influence which emoji is shown, as the moon is viewed upside down; default : `"N"`
- `moonNames` : specifies if the names of the full moons are displayed; default `true`
- `moonNamesEmoji` : specifies if the emojis of the named full moon are displayed; default `true`

If you don’t provide any other parameter than the mandatory `tp`, it will default to :

`<% tp.user.moon_phase(tp, "en", "et", " ", "YYYY-MM-DD", "N", true, true) %>`

If you want to provide only some parameters, you have to enter them in order, and can skip the ones you do not need to replace by writing `undefined` or ommit them if they're at the end.

For example, Chile’s moon phase, with emoji and text separated with a bar :

`<% tp.user.moon_phase(tp, "es", undefined, " | ", undefined, "S") %>`

will be interpreted as :

­­`<% tp.user.moon_phase(tp, "es", "et", " | ", "YYYY-MM-DD", "S", true, true) %>`

and rendered on August 14th, 2024 as :

`🌖 | Luna Gibosa Creciente`

### Thanks and references

- un_bsd at [Processing.org](https://forum.processing.org/one/topic/moon-phase-display-class.html) for the calculation
- [LM Arena](https://lmarena.ai/) to translate Java to Javascript
- Obviously, SilentVoid for the amazing [Templater](https://silentvoid13.github.io/Templater/introduction.html)
- Goes without saying but i'll do it anyway : the [Obsidian](https://obsidian.md) team and [Forum](https://forum.obsidian.md)

### Contribute

Please mention any bug you find, or useful language translations that could be implemented.
For my use it works like it is, so i can’t promise any further update. But i might, once in a while.
I am not a professional developper, so there might be innefficiencies in the code, but i believe it’s good enough!

---

Hope you find it useful and informative!
