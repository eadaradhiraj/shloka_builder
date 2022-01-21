const short_vowels = ["a", "u", "i"]
const vowels = ["a", "A", "i", "I", "u", "U", "e", "o", "R", "'"]

function shiftch2prev(arr, si) {
  //shift character in item to previous in array
  arr[si] = arr[si - 1].slice(-1) + arr[si]
  arr[si - 1] = arr[si - 1].slice(0, arr[si - 1].length - 1)
  return arr
}

function syllabalize(st) {
  //arr will hold the array of syllables and the first is initialised
  arr = [""]
  // List of vowels in sanskrit
  si = 0
  //Split_next flag to signal when to split
  split_next = false
  for (var i = 0; i < st.length; i++) {
    //c will hold each character in the string
    c = st[i]
    //character will be appended to the current item in array
    arr[si] += c
    //In case the character is not a vowel
    if (!vowels.includes(c)) {
      if (split_next == true) {
        //split and create next item in array
        si += 1
        arr.push("")
        split_next = false
      } else if ((c == "h") && ( arr.length > 1 ) ) {
        //in case of mahaprANa consonants shift the character to prev array item
        if (vowels.includes(arr[si - 1])) {
          console.log(arr[si-1])
          //in case of mahaprANa consonants shift the character to prev array item
          arr = shiftch2prev(arr, si)
        }
      }
    } else {
      if ((arr[si].length == 1 && arr[si - 1] != undefined)) {
        //in case reaching end of string shift the character to prev array item
        arr = shiftch2prev(arr, si)
      }
      //split because vowel has come
      split_next = true
    }
  }
  // Remove empty items in the array and trim them
  res_arr = []
  for (var i = 0; i < arr.length; i++) {
    arri = arr[i]
    if (arri != "") {
      res_arr.push(arri.trim())
    }
  }
  return res_arr
}
