"use strict";

const short_vowels = ["a", "u", "i", "R"];
const vowels       = ["a", "A", "i", "I", "u", "U", "e", "o", "R", "'"];
const mahapranas   = {
    "kh": "K", "gh": "Q", "ch": "C", "jh": "Z",
    "Th": "V", "Dh": "X", "th": "Y", "dh": "F",
    "ph": "P", "bh": "B"
};
const coda_only = ["H", "M"];


function inverse(obj) {
    const ret = {};
    for (const key in obj) {
        ret[obj[key]] = key;
    }
    return ret;
}


function shiftch2aft(arr, si) {
    if (si === 0) return arr;
    arr[si]     = arr[si - 1].slice(-1) + arr[si];
    arr[si - 1] = arr[si - 1].slice(0, -1);
    return arr;
}


function syllabalize(st) {
    st = allreplace(st, mahapranas);

    let arr           = [""];
    let si            = 0;
    let split_next    = false;
    let coda_consumed = false;

    for (let i = 0; i < st.length; i++) {
        const c       = st[i];
        const next_ch = st[i + 1];

        if (c !== ' ' || vowels.includes(next_ch)) {

            if (!vowels.includes(c)) {
                // ── Consonant ──────────────────────────────────────────────

                if (coda_only.includes(c)) {
                    // Visarga / anusvāra — always coda, never opens new syllable
                    arr[si] += c;
                } else {
                    if (split_next) {
                        if (!coda_consumed && !coda_only.includes(c) && !vowels.includes(next_ch)) {
                            // Only take as coda if next char is also a consonant
                            coda_consumed = true;
                        } else if (!coda_only.includes(c)) {
                            // Open new syllable
                            si += 1;
                            arr.push("");
                            split_next    = false;
                            coda_consumed = false;
                        }
                    }


                    arr[si] += c;

                    if (c === "h" && si > 0 && !vowels.includes(arr[si - 1].slice(-1))) {
                        arr = shiftch2aft(arr, si);
                    }
                }

            } else {
                // ── Vowel ──────────────────────────────────────────────────
                arr[si] += c;

                if (arr[si].length === 1 && arr[si - 1] !== undefined) {
                    arr = shiftch2aft(arr, si);
                }

                split_next    = true;
                coda_consumed = false;
            }
        }
    }

    const inv_mahapranas = inverse(mahapranas);
    return arr
        .filter(s => s !== "")
        .map(s => allreplace(s.trim(), inv_mahapranas));
}
