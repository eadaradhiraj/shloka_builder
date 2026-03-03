// --- DICTIONARIES ---
const consonants_dict_dev = {
    "k": "क", "K": "ख", "g": "ग", "Q": "घ", "G": "ङ",
    "c": "च", "C": "छ", "j": "ज", "Z": "झ", "J": "ञ",
    "T": "ट", "V": "ठ", "D": "ड", "X": "ढ", "N": "ण",
    "t": "त", "Y": "थ", "d": "द", "F": "ध", "n": "न",
    "p": "प", "P": "फ", "b": "ब", "B": "भ", "m": "म",
    "y": "य", "r": "र", "l": "ल", "v": "व", "z": "श",
    "S": "ष", "s": "स", "h": "ह"
};

const mahapranas_dict_dev = {
    "ai": "E", "au": "O", "RR": "L", "kh": "K", "gh": "Q", 
    "ch": "C", "jh": "Z", "Th": "V", "Dh": "X", "th": "Y", 
    "dh": "F", "ph": "P", "bh": "B"
};

const vowels_markers_dict_dev = {
    'a': '', 'A': 'ा', 'i': 'ि', 'I': 'ी', 'u': 'ु', 'U': 'ू',
    'R': 'ृ', 'L': 'ॄ', 'e': 'े', 'E': 'ै', 'o': 'ो', 'O': 'ौ'
};

const actual_vowels_dict_dev = {
    'a': 'अ', 'A': 'आ', 'i': 'इ', 'I': 'ई', 'u': 'उ', 'U': 'ऊ',
    'R': 'ऋ', 'L': 'ॠ', 'e': 'ए', 'E': 'ऐ', 'o': 'ओ', 'O': 'औ'
};

const special_vowels_dict_dev = { 'M': 'ं', 'H': 'ः' };
const space_period_dev = [' ', '.', '\n', '\t'];

// --- HELPERS ---
function allreplace(retStr, obj) {
    // Sort keys by length (longest first) to ensure "kh" is replaced before "k"
    const keys = Object.keys(obj).sort((a, b) => b.length - a.length);
    for (let x of keys) {
        retStr = retStr.replace(new RegExp(x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), obj[x]);
    }
    return retStr;
}

// Set up lookup sets for performance
const consonant_keys = new Set(Object.keys(consonants_dict_dev));
const vowel_marker_keys = new Set(Object.keys(vowels_markers_dict_dev));
const actual_vowel_keys = new Set(Object.keys(actual_vowels_dict_dev));
const special_vowel_keys = new Set(Object.keys(special_vowels_dict_dev));

// --- MAIN FUNCTION ---
function kh2dev(orig) {
    // 1. Convert multi-letter sounds (kh -> K, ai -> E)
    let st = allreplace(orig, mahapranas_dict_dev);
    let transstr = "";

    for (let i = 0; i < st.length; i++) {
        let ch = st[i];
        let nch = st[i + 1];
        let pch = st[i - 1];

        // A. Handle Consonants
        if (consonant_keys.has(ch)) {
            let baseConsonant = consonants_dict_dev[ch];

            // If consonant is followed by a vowel marker (a, A, i, I, etc.)
            if (nch && vowel_marker_keys.has(nch)) {
                transstr += baseConsonant + vowels_markers_dict_dev[nch];
                i++; // Consume the vowel marker
            } 
            // If consonant is followed by another consonant or end of word/string
            else {
                transstr += baseConsonant + '्';
            }
        } 
        
        // B. Handle Vowels (Standalone: start of word or after space/other vowel)
        else if (actual_vowel_keys.has(ch)) {
            const isAfterConsonant = consonant_keys.has(pch);
            
            // If it's NOT after a consonant, it must be an actual standalone vowel
            if (!isAfterConsonant) {
                transstr += actual_vowels_dict_dev[ch];
            }
            // (If it WAS after a consonant, it was already handled by the logic in block A)
        }

        // C. Handle Special Vowels (Anusvara/Visarga)
        else if (special_vowel_keys.has(ch)) {
            transstr += special_vowels_dict_dev[ch];
        }

        // D. Handle Avagraha, Punctuation and Others
        else if (ch === "'") {
            transstr += "ऽ";
        } else if (ch === ".") {
            transstr += "।";
        } else {
            transstr += ch; // Keeps spaces, numbers, and newlines
        }
    }

    return transstr;
}
