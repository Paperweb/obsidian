# Obsidian Moons 🌒🌓🌔🌝🌖🌗🌘🌑


_Originally posted on the [Obsidian.md Forum](https://forum.obsidian.md/t/insert-moon-phase-in-daily-note-with-templater/86871) to share my implementation of the phases; quickly after i created another script for moon signs transits. After some time (exactly one year later, thanks to my "last year on this date" daily feature, and a [request](https://forum.obsidian.md/t/insert-moon-phase-in-daily-note-with-templater/86871/5), i added full moon names, optimized the script while at it, merged with the transit script, and created this repository._


## Concept

Using Templater and a javascript function, the moon's phase and zodiac sign transit are calculated from the file’s title date and inserted in a (daily) note.

Formatting options allow to display various details in the order and manner we wish :

Moon phase :
- Moon Phase : `Full Moon`
- Moon Phase Emoji : `🌕`
- Moon Phase With Full Moon Name : `Corn Full Moon`
- Full Moon Emoji : `🌽`

Moon sign :
- Moon Sign : `Pisces`
- Moon Sign Emoji : `♓`
- Next Moon Sign : `Aries`
- Next Moon Sign Emoji : `♈`
- Next Moon Sign Date : `9/9`

## Requirements & Dependencies

- [Templater](https://silentvoid13.github.io/Templater/introduction.html), installed
- The javascript file obsidian_moons.js, in this repository
- That’s all!

## Preliminary setup

Place the `obsidian_moons.js` script inside the folder of your choice. I chose `Atlas/Ressources/scripts` in my vault.
In the Templater settings, under `User Scripts Functions`, locate the scripts folder and `Refresh 🔄` the `Detected User Scripts`.

## Basic usage

This implementation is relative to the file’s title, which has to contain a date.

- Open your daily note’s template ― i won’t detail how to set it up if you’re not using any yet, it’s easy enough to find around here.
- On a new line, or wherever you want the moon's info displayed, insert : `<% tp.user.obsidian_moons(tp) %>`
- For the most basic implementation (moon phase emoji and text, english, northern hemisphere, "YYYY-MM-DD" date format ), that’s enough!

## Customization

In order for a bit more control over the information displayed, we can provide the function with optional parameters :

- `format` : what is being rendered, and how; format options are any combination of : 
  - `moonEmoji` : displays the moon phase emoji
  - `moonPhase` OR `moonPhaseWithName` : displays the text version of the moon phase, basic or with the full moon names
  - `fullMoonNameEmoji` : displays the full Moon name's emoji
  - `moonSign` : displays the current sign the moon is in
  - `moonSignEmoji` : displays the current sign's emoji
  - `moonSignNext` : displays the next sign the moon will be in (useful if we don't know the signs' order)
  - `moonSignNextEmoji` : displays the next sign's emoji
  - `moonSignNextDate` : displays the date the moon will enter the next sign (very optional, as it changes every two/three days)
  - `__` : double underscore will be erased, leaving no space (usefull if we don't want a space between two emojis)
  - any other characters will be left as is as separators
- `language` : the text’s language; currently, only `en`, `fr`, and `es` are supported
- `hemisphere` : the hemisphere we are in; will influence which emoji is shown, as the moon is viewed upside down
- `title_format` : our daily note’s title format, usually a combination of `Y`s, `M`s and `D`s
- `hour` : the hour in the day at which the moon's sign will be calculated
- `minute` : the minutes in the hour
- `hourOffset` : a positive or negative hour offset (useful to calculate the moon's sign at a location in a different timezone)

To add parameters, place them between curly braces `{ }` with the parameter name followed by semicolons `:` and the parameter's value inside double quotes `" "`, parameter separated by a comma `,`, as such :

`<% tp.user.obsidian_moons(tp, { parameter1: "value", parameter2: "value" } ) %>`

We can provide only some parameters and skip the ones we do not need.

If we don’t provide anything else than the mandatory `tp`, like such `<% tp.user.obsidian_moons(tp) %>`, it will default to :

```
<% tp.user.obsidian_moons(tp, { 
  format : "moonEmoji moonPhase", 
  language : "en", 
  hemisphere : "N", 
  title_format : "YYYY-MM-DD" ,
  hour : 6,
  minute: 0,
  hourOffset: 0
}) %>
```

Which will be rendered on August 16th, 2025 as : `🌗 Last Quarter`

And on September 7th, 2025 as : `🌕 Full Moon`

## Examples

### Chile’s moon phase, with simple moon phase emoji and text separated with a bar

`<% tp.user.obsidian_moons(tp, { format : "moonEmoji | moonPhase", hemisphere : "S", language : "es" }) %>`

will be rendered on August 16th, 2025 as :

`🌓 | Cuarto Menguante`

and on September 7th, 2025 as :

`🌕 | Luna Llena`


### Ireland’s moon phase, with named full moons, phase and name emojis, date format being "YYMMDD"

`<% tp.user.obsidian_moons(tp, { format : "moonEmoji moonPhaseWithName fullMoonNameEmoji", title_format: "YYMMDD" }) %>`

will be rendered on August 15th, 2025 as :

`🌗 Last Quarter`

and on September 7th, 2025 as :

`🌕 Corn Full Moon 🌽`


### France's moon phase and sign, with all text and emojis

`<% tp.user.obsidian_moons(tp, { format : "moonEmoji moonPhaseWithName fullMoonNameEmoji en moonSign moonSignEmoji (moonSignNext moonSignNextEmoji : moonSignNextDate)", language : "fr" }) %>`

will be rendered on August 15th, 2025 as :

`🌗 Dernier Quartier en Taureau ♉ (Gémeaux ♊ : 17/8)`

and on September 7th, 2025 as :

`🌕 Pleine Lune du Maïs 🌽 en Poissons ♓ (Bélier ♈ : 9/9)`


### Japan's moon phase and sign, with only emojis, including that of the named full moon, without space :

`<% tp.user.obsidian_moons(tp, { format : "moonEmoji__fullMoonNameEmoji__moonSignEmoji" }) %>`

will be rendered on August 15th, 2025 as :

`🌗♉`

and on September 7th, 2025 as :

`🌕🌽♓`


_Feel free to experiment and find the display that works best for you. To test, modify the `format` parameter in your note's template and populate a daily note with the template, clearing and inserting everytime until you get something you like._

## Notes on Full Moon Names

Full moon names are somewhat opinionated, taken from [Royal Museums Greenwich (en)](https://www.rmg.co.uk/stories/space-astronomy/what-are-names-full-moons-throughout-year), [Wikipedia (es)](https://es.wikipedia.org/wiki/Luna_llena), [Sahavre (fr)](https://sahavre.fr/wp/histoire-de-lune/).

It is also good to know that originally, the name of the full moon was the one of its lunation, meaning it was based on the month when the previous new moon occurred.

_Feel free to modify the javascript file (look for the `fullMoonNames` variable) according to your preferences―which you can do from a simple text/code editor like [notepad++](https://notepad-plus-plus.org/)._

### Harvest Moon

The full moon the closest to the autumn equinox will take the name of Harvest Moon.
To do so, if it's a full moon and the date is in september or october, a rough calculation finds the date of the equinox for the current year, checks if the full moon is closer to it than a half-moon cycle and labels it such.

### Blue Moon (not implemented)

Blue moon is the name given to an "extra" moon. Originally, it was referring to the third full moon of a four full moon season. Due to a mistake, it became associated to the second full moon occurring in the same month, and is now used as such by NASA and others. A Blue Moon isn't actually blue.

Because detecting blue moons would necessitate either to calculate all moons of a season or of a month (and/or use a database or an extra dependency), and because every full moon note creation would launch this calculation, i decided it not worth it and not to implement it in this script for now, especially considered the confusion about them.
Hopefully, the general moon awareness brought by the usage of this script will be enough for one to notice when there is an extra moon!
I might reconsider if there is demand for it, and if i just want to test how bad of a performance draw it would be on a full moon note creation.

### Dark Moon (not implemented)

A Dark Moon is similar to a Blue Moon, but for New Moons. 

For the same reasons Blue Moons are not implemented for now, Dark Moons aren't either.

### Super Moon and Micro Moon (implementation in study)

The name of the moon when it is full and the closest to earth (or up to 111% of its closest distance) is a Super Moon.
When the full moon occurs as the moon is at its apogee, it is called a Micro Moon.

Its apparent diameter varies (in degrees of sky) from 29’20’’ (apogee, furthest) to 33’30’’ (perigee, closest), with an average of 31’25’’.
Making it, when at its perigee, about 6.5% bigger and 9-16% more luminous than average; 14.5% bigger and 30% more luminous than when at its apogee.

## Notes on Astronomical events

### Transits

When the moon passes through one of the twelve constellations of the Zodiac.

Used in astrology to understand the emotional, feminine influences taking place during the transit.

### Lunar Eclipse (implementation in study)

When the shadow of the earth covers part or the whole of a full moon. Its color becomes reddish, as the sun's rays are filtered through the Earth's atmosphere.

## Thanks and references

- un_bsd at [Processing.org](https://forum.processing.org/one/topic/moon-phase-display-class.html) for the phase calculation
- Baidu and [Wen Yi](https://en.chinaculture.org/focus/focus/2010qiufeng/2010-09/21/content_394728.htm) for the equinox date calculation
- [LM Arena](https://lmarena.ai/) to translate Java to Javascript and help with sign's calculation and code.
- Obviously, SilentVoid for the amazing [Templater](https://silentvoid13.github.io/Templater/introduction.html)
- Goes without saying but i'll do it anyway : the [Obsidian](https://obsidian.md) team and [Forum](https://forum.obsidian.md)

## Contribute

Please mention any bug you find, code optimization, useful language translations or features that could be implemented.
For my use it works like it is, so i can’t promise any further update. But i might, once in a while.
There might be innefficiencies in the code, but i believe it’s good enough!

---

Hope you find it useful and informative!
