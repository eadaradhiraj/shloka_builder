function allreplace(str, obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0) return str;

    // 1. Sort keys by length (longest first) to prevent partial matches 
    //    (e.g., if you have keys "cat" and "caterpillar", "caterpillar" is checked first)
    keys.sort((a, b) => b.length - a.length);

    // 2. Escape regex characters and join them with the OR operator '|'
    const escapedKeys = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(escapedKeys.join('|'), 'g');

    // 3. Replace all matches simultaneously
    return str.replace(regex, match => obj[match]);
}
