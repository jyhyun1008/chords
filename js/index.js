
function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var qs = getQueryStringObject()
var music = qs.music

addEventListener("DOMContentLoaded", async (event) => {
    if (music) { //music이 있을 경우

        var result = await fetch(`https://raw.githubusercontent.com/${USERNAME}/${REPONAME}/main/md/${music}.md`)
        var md = await result.text()

        var info = md.split('INFO')[1].split('---')[0]
        var title = info.split('TITLE: ')[1]?info.split('TITLE: ')[1].split('\n')[0]:''
        document.querySelector('#music-title').innerText = title
        var key = info.split('KEY: ')[1]?info.split('KEY: ')[1].split('\n')[0]:''
        document.querySelector('#key').innerText = key+' Key'
        var bpm = info.split('BPM: ')[1]?info.split('BPM: ')[1].split('\n')[0]:''
        document.querySelector('#bpm').innerText = bpm+' BPM'
        var beat = info.split('BEAT: ')[1]?info.split('BEAT: ')[1].split('\n')[0]:''
        document.querySelector('#beat').innerText = beat

        var chords = md.split('CHORDS')[1]
        var lines = chords.split('\n')
        var songform = 'INTRO'
        var chordArray = []
        var lyricsArray = []
        var songformArray = []
        for (var i=0; i<lines.length; i++){
            if (lines[i][0] == '*') {
                songform = lines[i].split('* ')[1]
            } else if (lines[i] != ''){
                lines[i] = lines[i].replaceAll('_', ' _')
                lines[i] = lines[i].replaceAll(/_([A-G]+)/g, `_ $1`)
                chordArray.push(lines[i].split(' /')[0].split(' '))
                lyricsArray.push(lines[i].split(' /')[1])
                songformArray.push(songform)
            }
        }
        for (var j=0; j<chordArray.length; j++){
            if (j > 0 && songformArray[j] != songformArray[j-1]) {
                document.querySelector('#content').innerHTML += `<div class="songform">${songformArray[j]}</div><div class="content" id="${songformArray[j]}"></div>`
            } else if (j==0) {
                document.querySelector('#content').innerHTML += `<div class="songform">${songformArray[j]}</div><div class="content" id="${songformArray[j]}"></div>`
            }
            document.querySelector(`#${songformArray[j]}`).innerHTML += `<div class="madi"><div class="chords" id="chords${j}"></div><div class="lyrics">${lyricsArray[j]}</div></div>`
            for (var k=0; k<chordArray[j].length; k++){
                if (chordArray[j][k] == '_'){
                    document.querySelector(`#chords${j}`).innerHTML += `<div> </div>`
                } else {
                    document.querySelector(`#chords${j}`).innerHTML += `<div>${chordArray[j][k]}</div>`
                }
            }
        }
    }
})