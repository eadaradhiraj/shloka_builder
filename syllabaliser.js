

function split_chars(inp_str) {
    var split = '';
	for (var i=2362; i<2392; i++){
        split += String.fromCharCode(i);
    }
	
	var rx = new RegExp(".[" + split + "]?", "g");
	var matches = new Array();
	while((match = rx.exec(inp_str.replace(/\s/g, ""))) !== null){
		matches.push(match[0]);
	}

    return matches
}



function syllabalise(inp_str) {

    var res = new Array();
    var temp = '';
    var new_chars = split_chars(inp_str);
    for (var i=0;i<new_chars.length;i++) {
        char = new_chars[i];
        if (char.includes("्") || char.includes("ः") || char.includes("ं") || char.includes("ऽ")) {
            if (i != 0) {
                res[res.length-1] = (res[res.length-1] + char);
            } 
            else {
                res.push(char+new_chars[i+1]);
                new_chars[i+1] = '';
            }
        }
            else {
                res.push(char);
                }
            }

    var res_ret = new Array();
    for(var i=0; i<res.length;i++){
        //if (!(res[i] in ['', ' '])) {
        if ((res[i] !== '') || (res[i] !== ' ')) {
            res_ret.push(res[i])
        }
    }

    return res_ret;
        }
        
