"use strict";

function hkToSlp1(str) {
    if (!str) return "";
    const map = {
        "lRR": "X", "lR": "x", "RR": "F", "R": "f",
        "ai": "E", "au": "O",
        "kh": "K", "gh": "G",
        "ch": "C", "jh": "J",
        "Th": "W", "Dh": "Q",
        "th": "T", "dh": "D",
        "ph": "P", "bh": "B",
        "S": "z",  // HK retroflex ṣ -> SLP1 z
        "z": "S",  // HK palatal ś -> SLP1 S
        "G": "N",  // HK guttural ṅ -> SLP1 N
        "J": "Y",  // HK palatal ñ -> SLP1 Y
        "T": "w",  // HK retroflex ṭ -> SLP1 w
        "D": "q",  // HK retroflex ḍ -> SLP1 q
        "N": "R"   // HK retroflex ṇ -> SLP1 R
    };
    
    // Single-pass regex ensures 'dh' goes to 'D', and stops there!
    const regex = /lRR|lR|RR|ai|au|kh|gh|ch|jh|Th|Dh|th|dh|ph|bh|R|S|z|G|J|T|D|N/g;
    return str.replace(regex, match => map[match]);
}

function slp1ToHk(str) {
    if (!str) return "";
    const map = {
        "X": "lRR", "x": "lR", "F": "RR", "f": "R",
        "E": "ai", "O": "au",
        "K": "kh", "G": "gh",
        "C": "ch", "J": "jh",
        "W": "Th", "Q": "Dh",
        "T": "th", "D": "dh",
        "P": "ph", "B": "bh",
        "z": "S",   // SLP1 retroflex ṣ -> HK S
        "S": "z",   // SLP1 palatal ś -> HK z
        "N": "G",   // SLP1 guttural ṅ -> HK G
        "Y": "J",   // SLP1 palatal ñ -> HK J
        "w": "T",   // SLP1 retroflex ṭ -> HK T
        "q": "D",   // SLP1 retroflex ḍ -> HK D
        "R": "N"    // SLP1 retroflex ṇ -> HK N
    };
    
    const regex = /X|x|F|f|E|O|K|G|C|J|W|Q|T|D|P|B|z|S|N|Y|w|q|R/g;
    return str.replace(regex, match => map[match]);
}