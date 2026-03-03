const kh_dict = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "G",
    "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "J",
    "ट": "T", "ठ": "Th", "ड": "D", "ढ": "Dh", "ण": "N",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v", "श": "z",
    "ष": "S", "स": "s", "ह": "h",
    "अ": "a", "आ": "A", "इ": "i", "ई": "I", "उ": "u", "ऊ": "U",
    "ऋ": "R", "ॠ": "RR", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
    'ं': 'M', 'ः': 'H', "ा": "A", "ि": "i", "ी": "I", "ु": "u",
    "ू": "U", "ृ": "R", "ॄ": "L", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
    "ऽ": "'", " ": " "
};

// Use Sets for much faster lookups O(1)
const consonants = new Set(['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']);
const matras = new Set(["ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "े", "ै", "ो", "ौ"]);

function dev2kh(st) {
    let transstr = "";
    
    for (let i = 0; i < st.length; i++) {
        let ch = st[i];
        let nextCh = st[i + 1];

        // 1. If it's a Virama (Halant), we skip it because its job 
        // is just to prevent the "a" from being added to the previous consonant.
        if (ch === '्') {
            continue;
        }

        // 2. Get the roman value from dictionary
        let roman = kh_dict[ch] || ch; 
        transstr += roman;

        // 3. Logic for implicit 'a'
        // If current character is a consonant...
        if (consonants.has(ch)) {
            // ...AND the next character is NOT a Matra (vowel sign)
            // ...AND the next character is NOT a Virama (halant)
            // ...AND the next character is NOT a special vowel (Anusvara/Visarga)
            if (nextCh !== '्' && !matras.has(nextCh)) {
                transstr += "a";
            }
        }
    }
    
    return transstr;
}

// Tests:
console.log(dev2kh("नमस्ते")); // "namaste"
console.log(dev2kh("भारत"));   // "bhArata"
console.log(dev2kh("कल्याण")); // "kalyANa"
