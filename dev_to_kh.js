const kh_dict = {
    "क": "k",
    "ख": "kh",
    "ग": "g",
    "घ": "gh",
    "ङ": "G",
    "च": "c",
    "छ": "ch",
    "ज": "j",
    "झ": "jh",
    "ञ": "J",
    "ट": "T",
    "ठ": "Th",
    "ड": "D",
    "ढ": "Dh",
    "ण": "N",
    "त": "t",
    "थ": "th",
    "द": "d",
    "ध": "dh",
    "न": "n",
    "प": "p",
    "फ": "ph",
    "ब": "b",
    "भ": "bh",
    "म": "m",
    "य": "y",
    "र": "r",
    "ल": "l",
    "व": "v",
    "श": "z",
    "ष": "S",
    "स": "s",
    "ह": "h",
    "अ": "a",
    "आ": "A",
    "इ": "i",
    "ई": "I",
    "उ": "u",
    "ऊ": "U",
    "ऋ": "R",
    "ॠ": "RR",
    "ए": "e",
    "ऐ": "ai",
    "ओ": "o",
    "औ": "au",
    'ं': 'M',
    'ः': 'H',
    "ा": "A",
    "ि": "i",
    "ी": "I",
    "ु": "u",
    "ू": "U",
    "ृ": "R",
    "ॄ": "L",
    "े": "e",
    "ै": "ai",
    "ो": "o",
    "ौ": "au",
    "ऽ": "'",
    " ": " "
}

let kh_arr = Object.keys(kh_dict)
let consonants_kh_arr = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']
let special_vowels_arr = ['ं', 'ः']
let cons_vowels_arr = consonants_kh_arr.concat(special_vowels_arr);
function dev2kh(st) {
    let transstr = ""
    for (var i = 0; i < st.length; i++) {
        let ch = st.charAt(i),
            pch = st.charAt(i-1)
            nch = st.charAt(i+1)
        if (ch == '्') {
            continue
        } else if (cons_vowels_arr.includes(pch) && cons_vowels_arr.includes(ch)) {
            transstr += "a"
        }
        transstr += kh_dict[ch]
        if (consonants_kh_arr.includes(ch) && (i == st.length-1 || nch == " ")) {
            transstr += "a"
        }
    }
    return (transstr)
}