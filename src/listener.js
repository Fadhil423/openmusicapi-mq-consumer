/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistSongsService.getPlaylistById(playlistId);
      const songs = await this._playlistSongsService.getPlaylistSongs(playlistId);

      // Menguji jika playlist id, name dan list of song pada playlist ada
      /* console.log(`Playlist id : ${playlistId}`);
      console.log(`Playlist name : ${playlists.name}`);
      console.log(`Playlist song list : ${playlistSongs}`); */

      const result = {
        id: playlistId,
        name: playlists.name,
        songs,
      };

      const sentResult = await this._mailSender.sendEmail(targetEmail, JSON.stringify(result));
      console.log(sentResult);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
