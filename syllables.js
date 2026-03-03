"use strict";

const short_vowels = ["a", "u", "i", "R"];
const vowels       = ["a", "A", "i", "I", "u", "U", "e", "o", "R", "'"];
const mahapranas   = {
    "kh": "K", "gh": "Q", "ch": "C", "jh": "Z",
    "Th": "V", "Dh": "X", "th": "Y", "dh": "F",
    "ph": "P", "bh": "B"
};

// FIX: removed duplicate `swap` — `inverse` is identical and better named
function inverse(obj) {
    const ret = {};
    for (const key in obj) {
        ret[obj[key]] = key;
    }
    return ret;
}

// FIX: added si === 0 guard to prevent arr[-1] TypeError
// FIX: slice(0, arr[si-1].length - 1) → slice(0, -1)
function shiftch2aft(arr, si) {
    if (si === 0) return arr;
    arr[si]     = arr[si - 1].slice(-1) + arr[si];
    arr[si - 1] = arr[si - 1].slice(0, -1);
    return arr;
}

function syllabalize(st) {
    // Replace mahāprāṇa digraphs with single placeholder characters
    st = allreplace(st, mahapranas);

    let arr        = [""];
    let si         = 0;
    let split_next = false;

    for (let i = 0; i < st.length; i++) {
        const c        = st[i];
        const next_ch  = st[i + 1];  // may be undefined at end-of-string; handled safely below

        // Pass through non-space characters, or a space followed by a vowel
        // (the space+vowel case keeps vowel-initial words attached correctly)
        if (c !== ' ' || vowels.includes(next_ch)) {

            if (!vowels.includes(c)) {
                // ── Consonant ───────────────────────────────────────────────
                // FIX: split BEFORE appending so the consonant starts the new syllable,
                //      not ends the old one
                if (split_next) {
                    si += 1;
                    arr.push("");
                    split_next = false;
                }

                arr[si] += c;

                // FIX: mahāprāṇa detection — check last char of previous syllable,
                //      not the entire syllable string against the vowels array
                //      (vowels.includes("ka") is always false — old code never ran)
                if (c === "h" && si > 0 && !vowels.includes(arr[si - 1].slice(-1))) {
                    arr = shiftch2aft(arr, si);
                }

            } else {
                // ── Vowel ────────────────────────────────────────────────────
                arr[si] += c;

                // If this vowel is the only character so far in this slot,
                // attach it to the previous syllable (e.g. diphthong / hiatus)
                if (arr[si].length === 1 && arr[si - 1] !== undefined) {
                    arr = shiftch2aft(arr, si);
                }

                split_next = true;
            }
        }
    }

    // Remove empty slots and restore mahāprāṇa digraphs
    const inv_mahapranas = inverse(mahapranas);
    return arr
        .filter(s => s !== "")
        .map(s => allreplace(s.trim(), inv_mahapranas));
}
