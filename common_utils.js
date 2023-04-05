function allreplace(retStr, obj) {
    for (let x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr
}
