const songInformation = () => {
    const captureInput = document.getElementById('input-id').value;
    fetch(`https://api.lyrics.ovh/suggest/${captureInput}`)
        .then(res => res.json())
        .then(data => {
            showSong(data);
        })
}
const lyricsInformation = (singerName, songTitle) =>{
    fetch(`https://api.lyrics.ovh/v1/${singerName}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        showLyrics(data)
    })
}
const showSong = (data) => {
    const songArray = data.data;
    songArray.forEach(eachSongInfo => {
        const songTitle = eachSongInfo.title;
        const singerName = eachSongInfo.artist.name;
        const audioUrl = eachSongInfo.preview;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${singerName}</span></p>
        <audio controls>
            <source src="${audioUrl}">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="lyricsInformation('${singerName}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
    </div>
</div>
`
document.getElementById('song-info').appendChild(newDiv);
    });
}

const showLyrics = (data) =>{
    const getLyrics = data.lyrics;
    document.getElementById('lyrics-id').innerText = getLyrics;
}