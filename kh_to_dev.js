const consonants_dict_dev = {
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
const mahapranas_dict_dev = {
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
const vowels_markers_dict_dev = {
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

const actual_vowels_dict_dev = {
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

const special_vowels_dict_dev = {
    'M': 'ं',
    'H': 'ः'
}
const space_period_dev = [' ', '.']

let consonant_dev_arr = Object.keys(consonants_dict_dev),
    vowels_markers_dev_arr = Object.keys(vowels_markers_dict_dev),
    special_vowels_dev_arr = Object.keys(special_vowels_dict_dev)
    actual_vowels_dev_arr = Object.keys(actual_vowels_dict_dev)

function kh2dev(orig) {
    let transstr = "",
        st = allreplace(orig, mahapranas_dict_dev),
        fch = st.charAt('0'),
        st_idx = 0
    // if starting character is a vowel
    if (actual_vowels_dev_arr.includes(fch)) {
        transstr = actual_vowels_dict_dev[fch]
        st_idx = 1
    }
    for (var i = st_idx; i < st.length; i++) {
        let ch = st.charAt(i),
            nch = st.charAt(i+1),
            pch = st.charAt(i-1)
        // if current letter is a vowel but previous is also a vowel or a psace
        if (actual_vowels_dev_arr.includes(ch) && (
            actual_vowels_dev_arr.includes(pch) || special_vowels_dev_arr.includes(pch) || space_period_dev.includes(pch)
        )) {
            transstr += actual_vowels_dict_dev[ch]
        } 
        // if current letter is a visarga or anunAsika
        else if (special_vowels_dev_arr.includes(ch)) {
            transstr += special_vowels_dict_dev[ch]
            if (actual_vowels_dev_arr.includes(nch)) {
                transstr += actual_vowels_dict_dev[nch]
                i = i + 1
            }
        }
        // if consonant is followed by a consonant or end of string
        else if
            (consonant_dev_arr.includes(ch) && (consonant_dev_arr.includes(nch) || i == st.length - 1 || space_period_dev.includes(nch)) ) {
            transstr += consonants_dict_dev[ch]+'्'
        }
        // if consonant followed by a vowel
        else if (consonant_dev_arr.includes(ch) && vowels_markers_dev_arr.includes(nch)) {
            transstr += consonants_dict_dev[ch] + vowels_markers_dict_dev[nch]
            i = i + 1;
        } else if (ch == "'") {
            transstr += "ऽ"
        } else if (ch == '.') {
            transstr += "।"
        } else {
            transstr += ch
        }
      }
    return transstr
}