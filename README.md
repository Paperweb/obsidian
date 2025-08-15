# 🌙 Obsidian Moons

_Originally posted on the [Obsidian.md Forum](https://forum.obsidian.md/t/insert-moon-phase-in-daily-note-with-templater/86871) to share my implementation of the phases; quickly after i created another script for moon signs transits (coming soon). After some time (exactly one year later, thanks to my "last year on this date" daily feature, and a [request](https://forum.obsidian.md/t/insert-moon-phase-in-daily-note-with-templater/86871/5), i added full moon names, optimized the script while at it, and created this repository._

## Moon Phase 🌒🌓🌔🌝🌖🌗🌘🌑

### Concept

With the help of a javascript function, the moon phase is derived from the file’s date and inserted in a daily note through its template thanks to Templater.

Formatting options allow to display various details in the order and manner we wish :

- Moon phase emoji `🌕`
- Moon phase name `Full Moon`
- Moon phase with full moon name `Corn Full Moon`
- Full moon emoji `🌽`

#### Full Moon Names

Full moon names are somewhat opinionated, taken from [Royal Museums Greenwich (en)](https://www.rmg.co.uk/stories/space-astronomy/what-are-names-full-moons-throughout-year), [Wikipedia (es)](https://es.wikipedia.org/wiki/Luna_llena), [Sahavre (fr)](https://sahavre.fr/wp/histoire-de-lune/).
Feel free to modify the javascript file to modify according to your preferences.

_It is also good to know that originally, the name of the full moon was the one of its lunation, meaning it was based on the month when the previous new moon occurred._

##### Harvest Moon

On the full moon the closest to the autumn equinox, it will take the name of the Harvest Moon.
A rough calculation finds the date of the equinox for the current year, checks if the full moon is closer to it than a half-moon cycle and labels it such.

##### Blue moons

Blue moon is the name given to an "extra" moon. 
Originally, it was referring to the third full moon of a four full moon season. Due to a mistake, it became associated to the second full moon occurring in the same month, and is now used as such by NASA.
Because detecting blue moons would necessitate either to calculate all moons of a season or of a month (and/or use a database or an extra dependency), and because every full moon note creation would launch this calculation, i decided it not worth it and not to implement it in this script, especially considered the confusion about them.
Hopefully, the general moon awareness brought by the usage of this script will be enough for one to notice when there is an extra moon!

### Requirements & Dependencies

- [Templater](https://silentvoid13.github.io/Templater/introduction.html), installed
- The javascript file moon_phase.js, in this repository
- That’s all!

### Preliminary setup

Place the moon_phase.js script inside the folder of your choice. I chose Atlas/Ressources/scripts in my vault.
In the Templater settings, under User Scripts Functions, locate the scripts folder and Refresh 🔄 the Detected User Scripts.

### Template implementation

This implementation is relative to the file’s title which has to contain a date.

For my usage, i wanted to insert the moon phase inside my daily notes, which have a `YYYY-MM-DD` file title format. I already use Templater to generate various elements of the note based on the file title (it allows to create the file whenever i want and still have relative dates inside it).

- Open your daily note’s template ― i won’t detail how to set it up if you’re not using any yet, it’s easy enough to find around here.
- On a new line, or wherever you want the moon phase displayed, insert : `<% tp.user.moon_phase(tp) %>`
- For the most basic implementation (moon emoji, moon phase text, english, northern hemisphere, "YYYY-MM-DD" date format ), that’s enough!

### Customization

In order for a bit more control over the information displayed, we can provide the function with optional parameters.

`<% tp.user.moon_phase(tp, { format: string, hemisphere: string, language: string, title_format: string } ) %>`

- `tp` : the templater object, mandatory to retrieve the date
- `format` : what is being rendered; format options are any combination of : 
  - `"moonEmoji"` : displays the moon phase emoji
  - `"moonPhase"` OR `"moonPhaseWithName"` : displays the text version of the moon phase, basic or with the full moon names
  - `"fullMoonNameEmoji"` : displays the full Moon name's emoji
  - any character between the parts will be used as is as separators; using double underscore `__` will remove the space inbetween parts (usefull if we don't want a space between two emojis)
- `hemisphere` : the hemisphere we are in; will influence which emoji is shown, as the moon is viewed upside down
- `language` : the text’s language; currently, only `"en"`, `"fr"`, and `"es"` are supported
- `title_format` : our daily note’s title format

If we don’t provide any other parameter than the mandatory `tp`, it will default to :

```
<% tp.user.moon_phase(tp, { 
  format : "moonEmoji moonPhase", 
  hemisphere : "N", 
  language : "en", 
  title_format : "YYYY-MM-DD" 
}) %>
```

Which will be rendered on August 16th, 2025 as : `🌗 Last Quarter`
And on September 7th, 2025 as : `🌕 Full Moon`

If we want to provide only some parameters, we can skip the ones we do not need.

### Examples

#### Chile’s moon phase, with simple moon phase emoji and text separated with a bar

`<% tp.user.moon_phase(tp, { format : "moonEmoji | moonPhase", hemisphere : "S", language : "es" }) %>`

will be rendered on August 16th, 2025 as :

`🌓 | Cuarto Menguante`

and on September 7th, 2025 as :

`🌕 | Luna Llena`


#### Ireland’s moon phase, with named full moons, all emojis, date format being "YYMMDD"

`<% tp.user.moon_phase(tp, { format : "moonEmoji moonPhaseWithName fullMoonNameEmoji", title_format: "YYMMDD" }) %>`

will be rendered on August 15th, 2025 as :

`🌗 Last Quarter`

and on September 7th, 2025 as :

`🌕 Corn Full Moon 🌽`


#### Japan's moon phase, with only emojis, including that of the named full moon, without space :

`<% tp.user.moon_phase(tp, { format : "moonEmoji__fullMoonNameEmoji" }) %>`

will be rendered on August 15th, 2025 as :

`🌗`

and on September 7th, 2025 as :

`🌕🌽`


_Feel free to experiment and find the display that works best for you._


### Thanks and references

- un_bsd at [Processing.org](https://forum.processing.org/one/topic/moon-phase-display-class.html) for the calculation
- [LM Arena](https://lmarena.ai/) to translate Java to Javascript
- Obviously, SilentVoid for the amazing [Templater](https://silentvoid13.github.io/Templater/introduction.html)
- Goes without saying but i'll do it anyway : the [Obsidian](https://obsidian.md) team and [Forum](https://forum.obsidian.md)
- Baidu and [Wen Yi](https://en.chinaculture.org/focus/focus/2010qiufeng/2010-09/21/content_394728.htm) for the equinox date calculation

### Contribute

Please mention any bug you find, or useful language translations that could be implemented.
For my use it works like it is, so i can’t promise any further update. But i might, once in a while.
There might be innefficiencies in the code, but i believe it’s good enough!

---

Hope you find it useful and informative!
