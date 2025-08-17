function moonPhaseAndSign(tp, options = {}) {

    // Set default options

    const {
        // Format options are (any combination) :
        // - for moon phase : "moonEmoji", "moonPhase" OR "moonPhaseWithName", "fullMoonEmoji" 
        // - for moon transit : "moonSign", "moonSignEmoji", "moonSignNext", "moonSignNextEmoji", "moonSignNextDate"
        // - double underscore "__" will remove spaces between parts
        // - any other word or character will be rendered as is
        format = "moonEmoji moonPhase", 
        hemisphere = "N", // "N" for Northern Hemisphere, "S" for Southern Hemisphere
        hour = 6, // Time of the day to calculate the moon sign
        hourOffset = 0, // Hour offset to adjust the time if needed
        minute = 0,
        language = "en", // Language : "en", "es", "fr"
        title_format = "YYYY-MM-DD", // Format of the date in the note's title
    } = options;

    // Extract date from note title

    let year = Math.floor(tp.date.now("YYYY", 0, tp.file.title, title_format));
    let month = Math.floor(tp.date.now("MM", 0, tp.file.title, title_format));
    let day = Math.floor(tp.date.now("DD", 0, tp.file.title, title_format))

    // Create a date object with the given time
    let offset, 
        date = new Date(year, month - 1, day, hour, minute); // month is 0-indexed in JavaScript
    // console.log(date);

    // If hourOffset is defined and not zero, adjust the date with the hour offset
    if (hourOffset !== undefined && hourOffset !== 0) {
        offset = hourOffset * 60 * 60 * 1000; // Convert hour offset to milliseconds
        date = new Date(date.getTime() + offset); // adjust date with offset
        console.log(`Adjusted date with hour offset: ${date}`);
    }

    // Hemisphere inversion

    let invert_emojis = (hemisphere === "S") ? true : false;

    // 1. MOON PHASES

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

    let daysInYear, daysInMonth, julianDays, phase;

    if (month < 3) {
        year--;
        month += 12;
    }
    month++;                                    // increase month by 1 to match the formula
    daysInYear = Math.floor(365.25 * year);     // convert years to days
    daysInMonth = Math.floor(30.6 * month);     // convert months to days
    julianDays = daysInYear + daysInMonth + day - 694039.09;   // total Julian Days elapsed
    julianDays /= 29.53;                        // divide by the moon cycle (29.53 days)
    phase = Math.floor(julianDays);             // take integer part of julianDays
    julianDays -= phase;                        // subtract integer part to leave fractional part of original julianDays
    phase = Math.floor(julianDays * 8 + 0.5);   // scale fraction from 0-8 and round by adding 0.5
    phase = phase & 7;                          // 0 and 8 are the same so turn 8 into 0
    month--;                                    // revert month back to note month for further calculations

    // Initialize variables

    let moonPhase, moonEmoji, fullMoonName, rendered = format;

    // if there is a need for textual moon phase, set default
    if (format.includes("moonPhase")) {
        moonPhase = phases[phase][language];
    };

    // if there is a need for emoji moon phase, set it
    if (format.includes("moonEmoji")) {
        moonEmoji = phases[phase].emoji;
    }

    // If full moon names or emojis are requested in format

    if (format.includes("moonPhaseWithName") || format.includes("fullMoonEmoji")) {

        // If full Moon
        if (phase === 4) {

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
            fullMoonName = fullMoonNames[month];

            // Check if it's near the autumn equinox
            if (month === 9 || month === 10) {
                // If date is in september or october, calculate autumn equinox date for the current year 
                const eqYear = tp.date.now("YY", 0, tp.file.title, title_format)
                const leap = eqYear / 4; // number of past leap years
                const century = 23.042; // century variable for the 21st century
                const equinoxDay = Math.floor((eqYear * 0.2422 + century) - leap); // Day of september when the autumn equinox occurs
                // Use a Date object to check if within half-moon cycle of autumn equinox
                const halfMoonCycle = 29.53 / 2;
                const equinoxDate = new Date(year, 8, equinoxDay); // September is month 8 (0-indexed)
                const currentDate = new Date(year, month - 1, day); // m is 1-indexed, Date() is 0-indexed
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
            rendered = format.replace(/[^a-zA-Z0-9]*fullMoonEmoji/g, "");
        };
    };

    // 2. MOON TRANSIT

    let currentSign, nextSign, nextSignEntryDateRendered;

    if (format.includes("moonSign") || format.includes("moonSignEmoji") || format.includes("moonSignNext") || format.includes("moonSignNextEmoji") || format.includes("moonSignNextDate")) {
    
        // Signs data, in the zodiac sign order
        let signs = {
            0: {
                en: "Aries",
                es: "Aries",
                fr: "Bélier",
                emoji: "\u{2648}", // ♈
                start: 0,
                end: 30
            },
            1: {
                en: "Taurus",
                es: "Tauro",
                fr: "Taureau",
                emoji: "\u{2649}", // ♉
                start: 30,
                end: 60
            },
            2: {
                en: "Gemini",
                es: "Géminis",
                fr: "Gémeaux",
                emoji: "\u{264A}", // ♊
                start: 60,
                end: 90
            },
            3: {
                en: "Cancer",
                es: "Cáncer",
                fr: "Cancer",
                emoji: "\u{264B}", // ♋
                start: 90,
                end: 120
            },
            4: {
                en: "Leo",
                es: "Leo",
                fr: "Lion",
                emoji: "\u{264C}", // ♌
                start: 120,
                end: 150
            },
            5: {
                en: "Virgo",
                es: "Virgo",
                fr: "Vierge",
                emoji: "\u{264D}", // ♍
                start: 150,
                end: 180
            },
            6: {
                en: "Libra",
                es: "Libra",
                fr: "Balance",
                emoji: "\u{264E}", // ♎
                start: 180,
                end: 210
            },
            7: {
                en: "Scorpio",
                es: "Escorpio",
                fr: "Scorpion",
                emoji: "\u{264F}", // ♏
                start: 210,
                end: 240
            },
            8: {
                en: "Sagittarius",
                es: "Sagitario",
                fr: "Sagittaire",
                emoji: "\u{2650}", // ♐
                start: 240,
                end: 270
            },
            9: {
                en: "Capricorn",
                es: "Capricornio",
                fr: "Capricorne",
                emoji: "\u{2651}", // ♑
                start: 270,
                end: 300
            },
            10: {
                en: "Aquarius",
                es: "Acuario",
                fr: "Verseau",
                emoji: "\u{2652}", // ♒
                start: 300,
                end: 330
            },
            11: {
                en: "Pisces",
                es: "Piscis",
                fr: "Poisson",
                emoji: "\u{2653}", // ♓
                start: 330,
                end: 360
            }
        };

        // Function to calculate the moon's longitude (0-360 deg) from a javascript Date
        function getMoonLongitude(date) {

            // Calculate the Julian date
            const JD = date / 86400000 + 2440587.5;

            // Calculate the number of days since the epoch of J2000.0
            const J2000 = 2451545.0;

            // Mean longitude at J2000.0 (in degrees)
            const L0 = 218.31617;

            // Mean motion of the Moon (degrees per day)
            const n = 13.176396;

            // Time in Julian centuries since J2000.0
            const T = (JD - J2000) / 36525;

            // Calculate the Moon's mean longitude
            let L = (L0 + n * (JD - J2000)) % 360;

            // Add the principal perturbations
            L += 6.28877 * Math.sin((134.9 + 477198.8675055 * T) * Math.PI / 180);
            L += 1.27402 * Math.sin((259.2 - 413335.36 * T) * Math.PI / 180);
            L += 0.65831 * Math.sin((235.7 + 890534.22 * T) * Math.PI / 180);
            L += 0.21362 * Math.sin((93.3 + 483202.0175 * T) * Math.PI / 180);

            // Reduce the longitude to the range 0 to 360 degrees
            return ((L % 360) + 360) % 360;

        }

        // Get the moon's longitude
        const moonLongitude = getMoonLongitude(date);
        // console.log(`Current moon longitude: ${moonLongitude}`);

        // Find the current sign
        const currentSignIndex = Object.values(signs).findIndex(
            sign => moonLongitude >= sign.start && moonLongitude < sign.end
        );
        currentSign = signs[currentSignIndex];
        // console.log(`Current moon sign: ${currentSign[language]}`);

        // Find the next sign if needed
        if (format.includes("moonSignNext") || format.includes("moonSignNextEmoji") || format.includes("moonSignNextDate")) {
            
            nextSign = signs[(currentSignIndex + 1) % Object.keys(signs).length];

            // calculate the next sign's start time if needed
            if (format.includes("moonSignNextDate") || format.includes("moonSignNextEmoji")) {
                // Calculate the difference in longitude
                // Note: For highest accuracy, you'll still need to incorporate an ephemeris and interpolate.
                // This provides a better estimate considering Moon speed variations.

                let difference = nextSign.start - moonLongitude;
                if (difference < 0) {
                    difference += 360; // Handle cases where the next sign is at the beginning of the zodiac
                }

                // Assume a slight speed variation range (adjust as needed based on your ephemeris data)
                const minMoonSpeedDegreesPerDay = 12.5;
                const maxMoonSpeedDegreesPerDay = 13.5;

                // Calculate estimated time range (in milliseconds)
                const minEstimatedTime =
                    (difference * (24 * 60 * 60 * 1000)) / minMoonSpeedDegreesPerDay;
                const maxEstimatedTime =
                    (difference * (24 * 60 * 60 * 1000)) / maxMoonSpeedDegreesPerDay;

                // Create a new Date objects for the estimated ingress time range
                const minEstimatedIngressDate = new Date(date.getTime() + minEstimatedTime);
                const maxEstimatedIngressDate = new Date(date.getTime() + maxEstimatedTime);

                // Log the estimated range 
                // console.log("Estimated Moon ingress into", nextSign[language], "between:", minEstimatedIngressDate, "and", maxEstimatedIngressDate);

                // Return the midpoint of the range as a single estimated date (for simplicity)
                const nextSignEntryDate = new Date((minEstimatedIngressDate.getTime() + maxEstimatedIngressDate.getTime()) / 2);
                nextSignEntryDateRendered = `${nextSignEntryDate.getDate()}/${nextSignEntryDate.getMonth() + 1}`;

                console.log(`Next moon sign : ${nextSign[language]}${nextSign.emoji}; entry date: ${nextSignEntryDate}`);
            };

        };

        // Test with current date
        // const liveDate = new Date();
        // console.log(liveDate, getMoonLongitude(liveDate));
    };

    // Build rendered string by replacing placeholders in the format string
    // The order matters for adequate parsing
    rendered = rendered
        .replace(/moonEmoji/g, moonEmoji || "")
        .replace(/moonPhaseWithName/g, moonPhase || "")
        .replace(/moonPhase/g, moonPhase || "")
        .replace(/fullMoonEmoji/g, fullMoonName ? fullMoonName.emoji : "") 
        .replace(/moonSignEmoji/g, currentSign ? currentSign.emoji : "")
        .replace(/moonSignNextEmoji/g, nextSign ? nextSign.emoji : "")
        .replace(/moonSignNextDate/g, nextSignEntryDateRendered || "")
        .replace(/moonSignNext/g, nextSign ? nextSign[language] : "")
        .replace(/moonSign/g, currentSign ? currentSign[language] : "")
        .replace(/__/g, ""); // remove spaces between parts if double underscore is used

    return rendered;
}

module.exports = moonPhaseAndSign;