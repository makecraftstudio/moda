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

class AudioManager {

  /**
  *
  * @method               constructor();
  * @description          constructor for tis class
  */

  constructor() {

    this._assetId;

    this._lastId;

    this._audioVolume = { var: 1.0 };

    this._isPlaying = false;

    this._audioIsPaused = false;

    this._fadeInTime = .3;

    this._fadeOutTime = .3;

    this._defaultVolume = 1.0;

    this._isOpen = false;

    this._audio = new Audio();

    this._instanceName = "";

    this._playerId;


  }

  /**
  *
  * @method               setAudio();
  * @description          receive an audio path and an id, and the decide how to proceed.
  *
  * @param                asset - the source to play or pause.
  * @param                assetId - and id to identify the item. It will make easier to check with ids than with strings...
  */

  setAudio(asset, assetId) {

    this._assetId = assetId;

    this._audioPath = asset;

    this._audio.setAttribute('src', this._audioPath);

    this._audio.volume = this._defaultVolume;

    this._audio.load();

    this._audio.play();

    //lo explico aca. Esto es una putada que aun nio le encuetro solucion.
    //si yo pongo this.instanceName dentro de this._audio.onended 
    //el this referencia al audio player. Entonces con este workaround
    //lo que hacemos es declarar unba variable y usar el this.isntanceName
    //por fuera. Eso se que esta llegando proque cuando termino el UISound lo puso.
    //lo repito con el ID.
    //...

    var itemName = this.instanceName;

    var itemId = this.playerId;

    var onAudioStart = new CustomEvent("onAudioStart", { "detail": { "instanceName": itemName, "playerId": itemId } });

    document.dispatchEvent(onAudioStart);


    this._audio.onended = function () {

      this._isOpen = false;

      //var onTimeUpdate = new CustomEvent("onTimeUpdate", { "detail": {"currentTime":this.currentTime,"duration":this.duration } });

      //los custom events te permiten adjuntarle data. Esta es la mejor
      //manera de hacerlo en este caso. Se hace a traves del objeto "detail".
      //detail SI es un nombre propio de la sintaxis y no se puede cambiar.
      //antes de ensuciarnos es preferible siempre chequear que las cosas anden,
      //asi que inicialmente hago llegar cualquier boludez.

      var onEnded = new CustomEvent("onEnded", { "detail": { "instanceName": itemName, "playerId": itemId } });

      document.dispatchEvent(onEnded);

    }

    this._audio.ontimeupdate = function () {

      var onTimeUpdate = new CustomEvent("onTimeUpdate", { "detail": { "currentTime": this.currentTime, "duration": this.duration, "instanceName": itemName } });

      document.dispatchEvent(onTimeUpdate);

    };

    this._isPlaying = true;

    this._lastId = this._assetId;

    this._isOpen = true;

  }

  /**
  *
  * @method               resetPlayer();
  * @description          reset the player and prepare it for next audio.
  */

  resetPlayer = () => {

    this.isPlaying = false;

    this.isOpen = false;

    this._audio.pause();

    this._audio.currentTime = 0;

  }



  /**
  *
  * @method               onPauseAudioCompleted();
  * @description          fade out is completed. Flag class as not playing.
  */

  onPauseAudioCompleted = () => {

    this.isPlaying = false;

    this._audioIsPaused = true;

    this._audio.pause();

    TweenMax.delayedCall(10, this.removePlayer);
  }

  /**
  *
  * @method               removePlayer();
  * @description          useful to remove player when x ammount of time past.
  */

  removePlayer = () => {

    console.log("paso X tiempo desde que se pauso!");

  }

  /**
  *
  * @method               onReanudeAudio();
  * @description          fade in completed. Flag class as playing.
  */

  onReanudeAudio = () => {

    this._audioIsPaused = false;

    this.isPlaying = true;

  }

  /**
  *
  * @method               pauseAudio();
  * @description          fade out the audio till 0. Then flag as not playing.
  */

  pauseAudio = () => {

    var audioRef = this._audio;

    this._audioVolume.var = 1;

    var volumeRef = this._audioVolume;

    TweenMax.to(volumeRef, this._fadeOutTime, { var: 0.0, onUpdate: function () { audioRef.volume = volumeRef.var; }, onComplete: this.onPauseAudioCompleted });

  }

  /**
  *
  * @method               resumeAudio();
  * @description          fade in the audio till10. Then flag as  playing.
  */

  resumeAudio = () => {

    this._audio.play();

    var audioRef = this._audio;

    this._audioVolume.var = 0;

    var volumeRef = this._audioVolume;

    TweenMax.to(volumeRef, this._fadeInTime, { var: 1.0, onUpdate: function () { audioRef.volume = volumeRef.var; }, onComplete: this.onReanudeAudio });

  }

  /**
  *
  * @method               seekAudioTo();
  * @description          play audio to a specitic percent of time...
  */

  seekAudioTo = (percent) => {

    var value = (percent * this._audio.duration / 100);

    if (!isNaN(value)) this._audio.currentTime = percent * this._audio.duration / 100;

  }



  //getters and setters...

  get isPlaying() { return this._isPlaying; };

  set isPlaying(value) { this._isPlaying = value; };

  get audioPath() { return this._audioPath; };

  set audioPath(path) { this._audioPath = path; };

  get isOpen() { return this._isOpen; };

  set isOpen(value) { this._isOpen = value; };

  get instanceName() { return this._instanceName; };

  set instanceName(value) { this._instanceName = value; };

  //nota: estas  variables que se encuentran al final con get y set, son
  //lo que se conocen como getters y setters. Sus nombres son autoexplicativos:
  //lo que te permiten es obtenr y setear informacion a la clase.
  //en OOP, esto generalmente se hace de esta manera. Es una forma de encapsular
  //a la variable en una funcion para evitar riesgos de duplicados y demas.
  //en definitiva, lo que van a hacer estas dos funciones, es setear y obtener el valor
  //de la variable _instanceName.

  get playerId() { return this._playerId; };

  set playerId(value) { this._playerId = value; };

  //misma logica. La variable con _ delante y luego un getter y setter.
  //...


}
