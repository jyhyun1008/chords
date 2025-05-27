
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
        var title = info.split('TITLE: ')[1]?info.split('TITLE ')[1].split('\n')[0]:''
        document.querySelector('#music-title').innerText = title
        var key = info.split('KEY: ')[1]?info.split('KEY: ')[1].split('\n')[0]:''
        document.querySelector('#key').innerText = key+' Key'
        var bpm = info.split('BPM: ')[1]?info.split('BPM: ')[1].split('\n')[0]:''
        document.querySelector('#bpm').innerText = bpm+' BPM'
        var beat = info.split('BEAT: ')[1]?info.split('BEAT: ')[1].split('\n')[0]:''
        document.querySelector('#beat').innerText = beat

    }
})