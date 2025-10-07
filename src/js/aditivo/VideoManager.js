/**
*
* Aditivo Interactive Group S.A Framework...
*
* @author Aditivo Interactive Group S.A
*
* @since  1.0.0
*
* @see {@link http://www.aditivointeractivegroup.com}
*
* @todo Complete documentation.
*/

class VideoManager {

  /**
  *
  * @function constructor
  * @description initial settings...
  */

  constructor() {

    this._testering = 'ok';

    //this._mainVideo = videojs('videoReference', { language: 'es'});
    this._mainVideo;

    this._currentVideo;

    this._subtitles;

    this._onVideoStart = new CustomEvent("onVideoStart");

    this._onVideoEnd = new CustomEvent("onVideoEnd");

    this._onVideoError = new CustomEvent("onVideoError");

    this._isPlayerOpen = false;



  }



  /**
  *
  * @function loadVideo
  * @description load actual video...
  */

  loadVideo = (videoId, currentVideo, subtitles) => {

    console.log("load video?");

    this._mainVideo = videojs(videoId, { language: 'es'});

    this._currentVideo = currentVideo;

    this._subtitles = subtitles;

    $(".vjs-tech").attr("src", this._currentVideo);

    this._mainVideo.play();

    document.dispatchEvent(this._onVideoStart);

    this.addListeners();

    this.animateIn();

  }

  /**
  *
  * @function addListeners();
  * @description add all the listeners...
  */

  addListeners = () => {

    alert("adding listeners");



    var closePlayer = this.closePlayer;

    this._mainVideo.ready(function () { });

    this._mainVideo.on('error', function () { closePlayer('error'); });

    this._mainVideo.on('ended', function () { 

      console.log("corre?");


      closePlayer('ended'); });

    $(".overlay").on('click', function (e) { if (e.target == this) closePlayer('overlay'); });

    $(".close-btn").on('click', function (e) { closePlayer('button'); });

  }



  /**
  *
  * @function animateIn();
  * @description create the initial animation...
  */

  animateIn = () => {

    $('.overlay').css("display", "block");

    $('.cont-video').css({ "opacity": "1", "display": "block" });

    TweenMax.to($('.overlay'), .5, { opacity: 1 });
  }

  /**
  *
  * @function closePlayer();
  * @description do all the important stuff when closing. Remember to remove the
  * listeners with jquery off, otherwise it will add new events constantly on each
  * new call...
  *
  * @param from       -     the origin. It can be close from video end, from overlay or close button
  * or from an error.
  */

  closePlayer = (from) => {

    console.log("clossing player");

    this._mainVideo.off('error');

    this._mainVideo.off('ended');

    this._mainVideo.pause();

    this._mainVideo.currentTime(0);

    var referenceListener = this._onVideoEnd;

    var referenceErrorListener = this._onVideoError;

    var origin = from;

    this._isPlayerOpen = false;

    TweenMax.to($('.overlay'), .5, {
      opacity: 0, ease: Power3.easeOut, onComplete: function () {

        console.log("origin: " + origin);



        if (origin == 'error') {

          document.dispatchEvent(referenceErrorListener);

        } else {

          document.dispatchEvent(referenceListener);

        }

        $('.overlay').css("display", "none");

        $('.cont-video').css({ "opacity": "0", "display": "none" });

        $('.cont-image').css({ "opacity": "0", "display": "none" });

      }

    });

  }


  /**
  *
  * @function pauseVideo();
  * @description ...
  */

  pauseVideo = () => {

    this._mainVideo.pause();

    this._isPlaying = false;

  }


  /**
  *
  * @function stopVideo();
  * @description ...
  */

   stopVideo = () => {

    console.log(this._mainVideo);

    this._mainVideo.pause();

    this._mainVideo.currentTime(0);

    this._isPlaying = false;

  }


  /**
  *
  * @function reanudeVideo();
  * @description ...
  */

  reanudeVideo = () => {

    this._mainVideo.play();

    this._isPlaying = true;

  }




  /**
  *
  * @function loadTracks();  desde load video ya?
  * @description Get array of tracks and load on the video.js player
  */

  loadTracks = (trackList, lang) => {

    var player = this._mainVideo;

    var videoTracks = this._mainVideo.textTracks();

    for (var i = 0; i < videoTracks.length; i++) {

      videoTracks.removeTrack(videoTracks[i]);

    }

    $.each(trackList, (i, v) => { player.addRemoteTextTrack({ srclang: i, src: v }, false); });

    this.changeTrack(lang);

  }




  /**
  *
  * @function changeTrack();
  * @description ...
  */

  changeTrack = (lang) => {

    var tracks = this._mainVideo.textTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      track.mode = 'hidden';

      if (track.language === lang) {
        track.mode = 'showing';
      }
    }

  }


  /**
  *
  * @function changeTrack();
  * @description New, added on 07-03-2021
  */
  goToTime = (time) => {

    console.log("Go to time: "+time);

    this._mainVideo.currentTime(time);
    //this._mainVideo.play();

  }


  //getters and setters...

  get currentPlayer() { return this._mainVideo; }

  set currentPlayer(value) { this._mainVideo = value; };

  get isPlaying() { return this._isPlaying; };

  set isPlaying(value) { this._isPlaying = value; };

  get isPlayerOpen() { return this._isPlayerOpen; };

  set isPlayerOpen(value) { this._isPlayerOpen = value; };


}
