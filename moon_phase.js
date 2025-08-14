function calculateMoonPhase(tp, language = "en", display = "et", separator = " ", title_format = "YYYY-MM-DD", hemisphere = "N") {

    // Hemisphere inversion
        
    let invert_emojis = (hemisphere === "S") ? true : false;
    

    // Language

    let phase_zero = "New Moon";
        phase_one = "Waxing Crescent";
        phase_two = "First Quarter";
        phase_three = "Waxing Gibbous";
        phase_four = "Full Moon";
        phase_five = "Waning Gibbous";
        phase_six = "Last Quarter";
        phase_seven = "Waning Crescent";

    switch (language) {
        // system : not implemented, untested
        case ("system"): (navigator.languages && navigator.languages.length) ? navigator.languages[0].split('-')[0] : navigator.language.split('-')[0]; break;
        case ("en"): break;
        case ("fr"): 
            phase_zero = "Nouvelle Lune";
            phase_one = "Premier Croissant";
            phase_two = "Premier Quartier";
            phase_three = "Gibbeuse Croissante";
            phase_four = "Pleine Lune";
            phase_five = "Gibbeuse Décroissante";
            phase_six = "Dernier Quartier";
            phase_seven = "Dernier Croissant";
            break;
        case ("es"): 
            phase_zero = "Luna Nueva";
            phase_one = "Luna Creciente";
            phase_two = "Cuarto Creciente";
            phase_three = "Luna Gibosa Creciente";
            phase_four = "Luna Llena";
            phase_five = "Luna Gibosa Menguante";
            phase_six = "Cuarto Menguante";
            phase_seven = "Luna Menguante";
            break;
    }
        
    // Handle Templater data
    
    let y = Math.floor(tp.date.now("YYYY", 0, tp.file.title, title_format)); 
    let m = Math.floor(tp.date.now("MM", 0, tp.file.title, title_format)); 
    let d = Math.floor(tp.date.now("DD", 0, tp.file.title, title_format))

    // Calculate the moon phase (0-7), accurate to 1 segment.
    // 0 → new moon; 4 → full moon.
    
    let c, e, jd, b, emoji;

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
    
    // Render

    switch (b) {
        case (0): b = phase_zero; emoji = "\u{1F311}"; break;
        case (1): b = phase_one; emoji = invert_emojis ? "\u{1F318}" : "\u{1F312}"; break;
        case (2): b = phase_two; emoji = invert_emojis ? "\u{1F317}" : "\u{1F313}"; break;
        case (3): b = phase_three; emoji = invert_emojis ? "\u{1F316}" : "\u{1F314}"; break;
        case (4): b = phase_four; emoji = "\u{1F315}"; break;
        case (5): b = phase_five; emoji = invert_emojis ? "\u{1F314}" : "\u{1F316}"; break;
        case (6): b = phase_six; emoji = invert_emojis ? "\u{1F313}" : "\u{1F317}"; break;
        case (7): b = phase_seven; emoji = invert_emojis ? "\u{1F312}" : "\u{1F318}"; break;
    }

    switch (display) {
        case ("et") : return (emoji + separator + b);
        case ("te") : return (b + separator + emoji);
        case ("e") : return emoji;
        case ("t") : return b;
    }

}

module.exports = calculateMoonPhase;
