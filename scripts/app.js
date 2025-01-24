// List of songs (to be dynamically generated later)
const musicFiles = [
    { title: "Song 1", url: "assets/music/song1.mp3" },
    { title: "Song 2", url: "assets/music/song2.mp3" },
  ];
  
  // Populate music list
  const musicList = document.getElementById('music-list');
  
  musicFiles.forEach((song, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = song.title;
    link.href = `player.html?song=${encodeURIComponent(song.url)}&title=${encodeURIComponent(song.title)}`;
    listItem.appendChild(link);
    musicList.appendChild(listItem);
  });
  