function calculateMoonPhase(tp, options = {}) {

    // Set default options

    const {
        format = "moonEmoji moonPhase", 
        hemisphere = "N",
        language = "en",
        title_format = "YYYY-MM-DD",
    } = options;

    // Extract date from note title

    let y = Math.floor(tp.date.now("YYYY", 0, tp.file.title, title_format));
    let m = Math.floor(tp.date.now("MM", 0, tp.file.title, title_format));
    let d = Math.floor(tp.date.now("DD", 0, tp.file.title, title_format))

    // Hemisphere inversion

    let invert_emojis = (hemisphere === "S") ? true : false;

    // Moon phases

    let phases = {
        0: { 
            en: "New Moon", 
            es: "Luna Nueva", 
            fr: "Nouvelle Lune", 
            emoji: "\u{1F311}", // 🌑 New moon
        },
        1: { 
            en: "Waxing Crescent", 
            es: "Luna Creciente", 
            fr: "Premier Croissant", 
            emoji: invert_emojis ? "\u{1F318}" : "\u{1F312}", // 🌘 Waning crescent / 🌒 Waxing crescent
        },
        2: { 
            en: "First Quarter", 
            es: "Cuarto Creciente", 
            fr: "Premier Quartier",
            emoji: invert_emojis ? "\u{1F317}" : "\u{1F313}", // 🌗 Last quarter / 🌓 First quarter
        },
        3: { 
            en: "Waxing Gibbous", 
            es: "Luna Gibosa Creciente", 
            fr: "Gibbeuse Croissante",
            emoji: invert_emojis ? "\u{1F316}" : "\u{1F314}", // 🌖 Waning gibbous / 🌔 Waxing gibbous
        },
        4: { 
            en: "Full Moon", 
            es: "Luna Llena", 
            fr: "Pleine Lune",
            emoji: "\u{1F315}", // 🌕 Full moon
        },
        5: { 
            en: "Waning Gibbous", 
            es: "Luna Gibosa Menguante", 
            fr: "Gibbeuse Décroissante",
            emoji: invert_emojis ? "\u{1F314}" : "\u{1F316}", // 🌔 Waxing gibbous / 🌖 Waning gibbous
        },
        6: { 
            en: "Last Quarter", 
            es: "Cuarto Menguante", 
            fr: "Dernier Quartier",
            emoji: invert_emojis ? "\u{1F313}" : "\u{1F317}", // 🌓 First quarter / 🌗 Last quarter
        },
        7: { 
            en: "Waning Crescent", 
            es: "Luna Menguante", 
            fr: "Dernier Croissant",
            emoji: invert_emojis ? "\u{1F312}" : "\u{1F318}", // 🌒 Waxing crescent / 🌘 Waning crescent
        }
    };

    // Calculate the moon phase (0-7), accurate to 1 segment.
    // 0 → new moon; 4 → full moon.

    let c, e, jd, b;

    if (m < 3) {
        y--;
        m += 12;
    }
    m++;
    c = Math.floor(365.25 * y);
    e = Math.floor(30.6 * m);
    jd = c + e + d - 694039.09;  // jd is total days elapsed
    jd /= 29.53;                 // divide by the moon cycle (29.53 days)
    b = Math.floor(jd);          // take integer part of jd
    jd -= b;                     // subtract integer part to leave fractional part of original jd
    b = Math.floor(jd * 8 + 0.5); // scale fraction from 0-8 and round by adding 0.5
    b = b & 7;                   // 0 and 8 are the same so turn 8 into 0
    m--; // revert m back to note month for further calculations

    // Initialize variables

    let moonPhase, moonEmoji, fullMoonName, rendered = format;

    // if there is a need for textual moon phase, set default
    if (format.includes("moonPhase")) {
        moonPhase = phases[b][language];
    };

    // if there is a need for emoji moon phase, set it
    if (format.includes("moonEmoji")) {
        moonEmoji = phases[b].emoji;
    }

    // If full moon names or emojis are requested in format

    if (format.includes("moonPhaseWithName") || format.includes("fullMoonNameEmoji")) {

        // If full Moon
        if (b === 4) {

            // Full moon names and emojis
            let fullMoonNames = {
                1: { 
                    en: "Wolf", 
                    es: "del Lobo", 
                    fr: "du Loup",
                    emoji: "\u{1F43A}" // 🐺 Wolf
                },
                2: { 
                    en: "Snow", 
                    es: "de la Nieve", 
                    fr: "de Neige",
                    emoji: "\u{2744}" // ❄️ Snowflake
                },
                3: { 
                    en: "Worm", 
                    es: "del Gusano", 
                    fr: "des Vers",
                    emoji: "\u{1F41B}" // 🐛 Bug
                },
                4: { 
                    en: "Pink", 
                    es: "Rosada", 
                    fr: "Rose",
                    emoji: "\u{1F338}" // 🌸 Cherry blossom
                },
                5: { 
                    en: "Flower", 
                    es: "de las Flores", 
                    fr: "des Fleurs",
                    emoji: "\u{1F33C}" // 🌼 Blossom
                },
                6: { 
                    en: "Strawberry", 
                    es: "de la Fresa", 
                    fr: "des Fraises",
                    emoji: "\u{1F353}" // 🍓 Strawberry
                },
                7: { 
                    en: "Buck", 
                    es: "del Ciervo", 
                    fr: "du Cerf",
                    emoji: "\u{1F98C}" // 🦌 Deer
                },
                8: { 
                    en: "Sturgeon", 
                    es: "del Esturión", 
                    fr: "de l'Esturgeon",
                    emoji: "\u{1F41F}" // 🐟 Fish
                },
                9: { 
                    en: "Corn", 
                    es: "de Maíz", 
                    fr: "du Maïs",
                    emoji: "\u{1F33D}" // 🌽 Ear of corn
                },
                10: { 
                    en: "Hunter's", 
                    es: "del Cazador", 
                    fr: "du Chasseur",
                    emoji: "\u{1F3F9}" // 🏹 Bow and arrow
                },
                11: { 
                    en: "Beaver", 
                    es: "del Castor", 
                    fr: "du Castor",
                    emoji: "\u{1F9AB}" // 🦫 Beaver
                },
                12: { 
                    en: "Cold", 
                    es: "Fría", 
                    fr: "Froide",
                    emoji: "\u{1F9CA}" // 🧊 Ice cube
                },
                equinox: { 
                    en: "Harvest", 
                    es: "de Cosecha", 
                    fr: "des Moissons",
                    emoji: "\u{1F33E}" // 🌾 Sheaf of rice
                },
                // Blue moon not implemented at this stage, because it relies on more than the current date :
                // it needs to calculate all moons of the month (erroneous but modern definition : 2nd full moon of a month) 
                // or season (original definition : 3rd full moon of a 4 full moon season)
            };

            // Initialize default full moon name
            fullMoonName = fullMoonNames[m];

            // Check if it's near the autumn equinox
            if (m === 9 || m === 10) {
                // If date is in september or october, calculate autumn equinox date for the current year 
                const year = tp.date.now("YY", 0, tp.file.title, title_format)
                const leap = year / 4; // number of past leap years
                const century = 23.042; // century variable for the 21st century
                const equinoxDay = Math.floor((year * 0.2422 + century) - leap); // Day of september when the autumn equinox occurs
                // Use a Date object to check if within half-moon cycle of autumn equinox
                const halfMoonCycle = 29.53 / 2;
                const equinoxDate = new Date(y, 8, equinoxDay); // September is month 8 (0-indexed)
                const currentDate = new Date(y, m - 1, d); // m is 1-indexed, Date() is 0-indexed
                const diffDays = Math.abs((currentDate - equinoxDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
                // If within half a moon cycle of the equinox, use the equinox moon name
                if (diffDays < halfMoonCycle) {
                    fullMoonName = fullMoonNames.equinox;
                } 
            }

            // Construct full moon name if specified in format
            if (format.includes("moonPhaseWithName")) {
                // Ajust text order based on language
                if (language === "en") { 
                    moonPhase = fullMoonName[language] + " " + moonPhase;
                } else {
                    moonPhase += " " + fullMoonName[language];
                }
            }

        } else {
            // If not a full moon, remove emoji string and preceding separator if not a character
            rendered = format.replace(/[^a-zA-Z0-9]*fullMoonNameEmoji/g, "");
        };
    };

    // Build rendered string by replacing placeholders in the format string

    rendered = rendered
        .replace(/moonEmoji/g, moonEmoji || "")
        .replace(/moonPhaseWithName/g, moonPhase) // has to be before next line
        .replace(/moonPhase/g, moonPhase || "")
        .replace(/fullMoonNameEmoji/g, (fullMoonName && fullMoonName.emoji) ? fullMoonName.emoji : "") 
        .replace(/__/g, ""); // remove spaces between parts if double underscore is used

    return rendered;
}

module.exports = calculateMoonPhase;