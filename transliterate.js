const consonants_dict = {
    "k": "क",
    "K": "ख",
    "g": "ग",
    "Q": "घ",
    "G": "ङ",
    "c": "च",
    "C": "छ",
    "j": "ज",
    "Z": "झ",
    "J": "ञ",
    "T": "ट",
    "V": "ठ",
    "D": "ड",
    "X": "ढ",
    "N": "ण",
    "t": "त",
    "Y": "थ",
    "d": "द",
    "F": "ध",
    "n": "न",
    "p": "प",
    "P": "फ",
    "b": "ब",
    "B": "भ",
    "m": "म",
    "y": "य",
    "r": "र",
    "l": "ल",
    "v": "व",
    "z": "श",
    "S": "ष",
    "s": "स",
    "h": "ह"
}
const mahapranas_dict = {
    "ai": "E",
    "au": "O",
    "RR": "L",
    "kh": "K",
    "gh": "Q",
    "ch": "C",
    "jh": "Z",
    "Th": "V",
    "Dh": "X",
    "th": "Y",
    "dh": "F",
    "pha": "P",
    "bh": "B"
}
const vowels_markers_dict = {
    'a': '',
    'A': 'ा',
    'i': 'ि',
    'I': 'ी',
    'u': 'ु',
    'U': 'ू',
    'R': 'ृ',
    'L': 'ॄ',
    'e': 'े',
    'E': 'ै',
    'o': 'ो',
    'O': 'ौ',
}

const actual_vowels_dict = {
    'a': 'अ',
    'A': 'आ',
    'i': 'इ',
    'I': 'ई',
    'u': 'उ',
    'U': 'ऊ',
    'R': 'ऋ',
    'L': 'ॠ',
    'e': 'ए',
    'E': 'ऐ',
    'o': 'ओ',
    'O': 'औ',
}

const special_vowels_dict = {
    'M': 'ं',
    'H': 'ः'
}

var consonant_arr = Object.keys(consonants_dict),
    vowels_markers_arr = Object.keys(vowels_markers_dict),
    special_vowels_arr = Object.keys(special_vowels_dict)
    actual_vowels_arr = Object.keys(actual_vowels_dict)

function dev2kh(orig) {
    let transstr = "",
        st = allreplace(orig, mahapranas_dict),
        fch = st.charAt('0'),
        st_idx = 0
    // if starting character is a vowel
    if (actual_vowels_arr.includes(fch)) {
        transstr = actual_vowels_dict[fch]
        st_idx = 1
    }
    for (var i = st_idx; i < st.length; i++) {
        let ch = st.charAt(i),
            nch = st.charAt(i+1),
            pch = st.charAt(i-1)
        // if current letter is a vowel but previous is also a vowel
        if (actual_vowels_arr.includes(ch) && (
            actual_vowels_arr.includes(pch) || special_vowels_arr.includes(pch) || special_vowels_arr.includes(' ') || special_vowels_arr.includes('।')
        )) {
            transstr += actual_vowels_dict[ch]
        } 
        // if current letter is a visarga or anunAsika
        else if (special_vowels_arr.includes(ch)) {
            transstr += special_vowels_dict[ch]
            if (actual_vowels_arr.includes(nch)) {
                transstr += actual_vowels_dict[nch]
                i = i + 1
            }
        }
        // if consonant is followed by a consonant or end of string
        else if
            (consonant_arr.includes(ch) && (consonant_arr.includes(nch) || i == st.length - 1 || nch === ' ') ) {
            transstr += consonants_dict[ch]+'्'
        }
        // if consonant followed by a vowel
        else if (vowels_markers_arr.includes(nch)) {
            transstr += consonants_dict[ch] + vowels_markers_dict[nch]
            i = i + 1;
        } else if (ch == '.') {
            transstr += "।"
        } else {
            transstr += ch
        }
      }
    return transstr
}