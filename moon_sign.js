// Function to get the current and next moon signs with times of entry
function getMoonSign(tp, language = "en", display = "te", separator = " ", hour = 6, minute = 0, hourOffset = 0, title_format = "YYYY-MM-DD") {

    // Language
    let signs = {
        "en": [
            "Aries",
            "Taurus",
            "Gemini",
            "Cancer",
            "Leo",
            "Virgo",
            "Libra",
            "Scorpio",
            "Sagittarius",
            "Capricorn",
            "Aquarius",
            "Pisces",
        ],
        "fr": [
            "Bélier",
            "Taureau",
            "Gémeaux",
            "Cancer",
            "Lion",
            "Vierge",
            "Balance",
            "Scorpion",
            "Sagittaire",
            "Capricorne",
            "Verseau",
            "Poisson",
        ],
        "es": [
            "Bélier",
            "Taureau",
            "Gémeaux",
            "Cancer",
            "Lion",
            "Vierge",
            "Balance",
            "Scorpion",
            "Sagittaire",
            "Capricorne",
            "Verseau",
            "Poisson",
        ]
    }

    let signsEmoji = [
        "\u{2648}",
        "\u{2649}",
        "\u{264A}",
        "\u{264B}",
        "\u{264C}",
        "\u{264D}",
        "\u{264E}",
        "\u{264F}",
        "\u{2650}",
        "\u{2651}",
        "\u{2652}",
        "\u{2653}",
    ]

    // select language and map emojis to their sign
    signs = signs[language].map(
        (sign, index) => ({
            name: sign,
            emoji: signsEmoji[index]
        })
    );

    // console.log(signs);

    // Handle Templater data
    let year = Math.floor(tp.date.now("YYYY", 0, tp.file.title, title_format));
    let month = Math.floor(tp.date.now("MM", 0, tp.file.title, title_format));
    let day = Math.floor(tp.date.now("DD", 0, tp.file.title, title_format))

    // Define the sign boundaries
    const signBoundaries = [
        { start: 0, end: 30, name: signs[0].name, emoji: signs[0].emoji },
        { start: 30, end: 60, name: signs[1].name, emoji: signs[1].emoji  },
        { start: 60, end: 90, name: signs[2].name, emoji: signs[2].emoji  },
        { start: 90, end: 120, name: signs[3].name, emoji: signs[3].emoji  },
        { start: 120, end: 150, name: signs[4].name, emoji: signs[4].emoji  },
        { start: 150, end: 180, name: signs[5].name, emoji: signs[5].emoji  },
        { start: 180, end: 210, name: signs[6].name, emoji: signs[6].emoji  },
        { start: 210, end: 240, name: signs[7].name, emoji: signs[7].emoji  },
        { start: 240, end: 270, name: signs[8].name, emoji: signs[8].emoji  },
        { start: 270, end: 300, name: signs[9].name, emoji: signs[9].emoji  },
        { start: 300, end: 330, name: signs[10].name, emoji: signs[10].emoji  },
        { start: 330, end: 360, name: signs[11].name, emoji: signs[11].emoji  },
    ];

    // Function to calculate the moon's longitude from a javascript Date
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

    // Create a date object with the given time
    let date = new Date(year, month - 1, day, hour, minute);

    let offsetMs = hourOffset * 60 * 60000;

    console.log(date);

    // Adjust date with offset
    let adjustedDate = new Date(date.getTime() + offsetMs);
    // console.log(adjustedDate);

    // Get the moon's longitude
    const moonLongitude = getMoonLongitude(adjustedDate);
    // console.log(`Current moon longitude: ${moonLongitude}`);

    // Find the current sign
    const currentSign = signBoundaries.find(
        ({ start, end }) => moonLongitude >= start && moonLongitude < end);

    // Find the next sign
    const nextSign = signBoundaries[(signBoundaries.indexOf(currentSign) + 1) % signBoundaries.length];

    // Calculate the difference in longitude
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
    // console.log("Estimated Moon ingress into", nextSign.name, "between:", minEstimatedIngressDate, "and", maxEstimatedIngressDate);

    // Note: For highest accuracy, you'll still need to incorporate an ephemeris and interpolate.
    // This provides a better estimate considering Moon speed variations.

    // Return the midpoint of the range as a single estimated date (for simplicity)
    const nextSignEntryDate = new Date((minEstimatedIngressDate.getTime() + maxEstimatedIngressDate.getTime()) / 2);

    // console.log(`Current moon sign: ${currentSign.name}`);
    // console.log(`Next moon sign: ${nextSign.name}`);
    // console.log(`Next moon sign entry date: ${nextSignEntryDate.toLocaleString()}`);

    // Test with current date
    // const liveDate = new Date();
    // console.log(liveDate, getMoonLongitude(liveDate));

    // return sequence
    switch (display) {
        case ("et"): return currentSign.emoji + separator + currentSign.name;
        case ("te"): return currentSign.name + separator + currentSign.emoji;
        case ("e"): return currentSign.emoji;
        case ("t"): return currentSign.name;
    }

}

module.exports = getMoonSign;