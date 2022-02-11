const short_vowels = ["a", "u", "i", "R"]
const vowels = ["a", "A", "i", "I", "u", "U", "e", "o", "R", "'"]

function shiftch2aft(arr, si) {
  //shift character in item to previous in array
  arr[si] = arr[si - 1].slice(-1) + arr[si]
  arr[si - 1] = arr[si - 1].slice(0, arr[si - 1].length - 1)
  return arr
}

function swap(json) {
  let ret = {};
  for (let key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function allreplace(retStr, obj) {
  for (let x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
  }
  return retStr
}

function inverse(obj) {
  let retobj = {};
  for (let key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}


function syllabalize(st) {
  let mahapranas = { "kh": "K", "gh": "Q", "ch": "C", "jh": "Z", "Th": "V", "Dh": "X", "th": "Y", "dh": "F", "pha": "P", "bh": "B" }
  //arr will hold the array of syllables and the first is initialised
  st = allreplace(st, mahapranas)
  let arr = [""]
  // List of vowels in sanskrit
  let si = 0
  //Split_next flag to signal when to split
  let split_next = false
  for (let i = 0; i < st.length; i++) {
    //c will hold each character in the string
    let c = st[i]
    //character will be appended to the current item in array
    // it should not be space or the next character should be a vowel
    if ((c != ' ') || (vowels.includes(st[i + 1]))) {
      arr[si] += c

      //In case the character is not a vowel
      if (!vowels.includes(c)) {
        if (split_next == true) {
          //split and create next item in array
          si += 1
          arr.push("")
          split_next = false
        } else if ((c == "h") && (arr.length > 1)) {
          //in case of mahaprANa consonants shift the character to prev array item
          if (vowels.includes(arr[si - 1])) {
            //in case of mahaprANa consonants shift the character to prev array item
            if (vowels.includes(arr[si].slice(0, 1))) {
              arr = shiftch2aft(arr, si)
            }
          }
        }
      } else {
        if ((arr[si].length == 1 && arr[si - 1] != undefined)) {
          //in case reaching end of string shift the character to prev array item
          arr = shiftch2aft(arr, si)
        }
        //split because vowel has come
        split_next = true
      }
    }
  }
  // Remove empty items in the array and trim them
  let res_arr = []
  for (let i = 0; i < arr.length; i++) {
    let arri = arr[i]
    if (arri != "") {
      res_arr.push(allreplace(arri.trim(), inverse(mahapranas)))
    }
  }
  return res_arr
}
