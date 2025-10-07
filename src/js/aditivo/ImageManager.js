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

class ImageManager{

  /**
  *
  * @function constructor
	* @description initial settings...
	*/

  constructor(){

    this._preload = new createjs.LoadQueue();

    this._asset;

    this._title;

    this._description;

    this._mobileUtils = new MobileUtils();
  }

  /**
  *
  * @function setIImage();
	* @description receive an imge and start preloading it...
  *
  * @param asset  -   the source to load...
	*/

  setImage(asset, title, description){

    this._asset = asset;

    this._title = title;

    this._description = description;

    this._preload.addEventListener("fileload", this.handleFileComplete);

    this._preload.addEventListener("progress", this.handleProgress);

    this._preload.loadFile(this._asset);
  }

  /**
  *
  * @function handleProgress();
	* @description use the preloader in order to create some kind of animation....
	*/

  handleProgress = (e) => {

    var percentProgress = e.progress * 100;

    TweenMax.to($('.image-preloader'), .3, {width:percentProgress + '%'});
  }

  /**
  *
  * @function handleFileComplete();
	* @description add the image when it was loaded...
	*/

  handleFileComplete = (e) => {

    $('#imagePlayer').css("pointer-events", "auto");

    $(e.result).attr('id', 'main-image');

    $('.image-loader-source').append(e.result);

    var orientation = (e.result.width >= e.result.height) ? 'landscape' : 'portrait';

    var setSize;

    if(orientation == 'landscape'){

      var mult = (this._mobileUtils.isMobile()) ? 80 : 40;

      setSize = $(window).width() * mult / 100;

      $('.image-loader-source img').width(setSize);

    }else{

      var mult = (this._mobileUtils.isMobile()) ? 60 : 50;

      setSize = $(window).height() * mult / 100;

      $('.image-loader-source img').height(setSize);

    }

    if(orientation == 'portrait'){

      var newHeight = setSize;

      var height = e.result.height;

      var proportion = newHeight/height;

      var newWidth =  e.result.width * proportion;

      $(".thumb").css("maxWidth", newWidth);

    }else{

      $(".thumb").css("maxWidth", setSize);

    }

    this.animateIn();
  }

  /**
  *
  * @function animateIn();
	* @description animate all the content...
	*/


  animateIn = () => {

    $('.imager-loader-title').text(this._title);

    $('.image-loader-description').html(this._description);

    TweenMax.set($('.image-loader-container'), {alpha:0});

    $('#imagePlayer').show();

    TweenMax.to($('.image-loader-container'), 1, {alpha:1});

    TweenMax.to($('.image-preloader'), .3, {alpha:0});

    TweenMax.to($('.image-overlay'), .3, {alpha:1, onComplete: this.addListeners});

  }

  /**
  *
  * @function addListeners();
	* @description add all the listeners for this class. Work them separatedly for readable purposes.
	*/

  addListeners = () => {

    var clearData = this.clearImage;

    $('.generic-close-icon').on('click', function(e){

      e.preventDefault();

      $('.image-overlay').click();

    });

    $('.generic-close-icon').on('mouseover', function(){

      TweenLite.to($(this), .3, {rotation:90, transformOrigin:"50% 50%"});

    });

    $('.generic-close-icon').on('mouseout', function(){

      TweenLite.to($(this), .3, {rotation:0, transformOrigin:"50% 50%"});

    });

    $('.image-overlay').on('click', function(){

      TweenMax.to($(this), .3, {alpha:0});

      TweenMax.to($('.image-loader-container'), .3, {alpha:0, delay:.05, onComplete:clearData});

    })

  }

  /**
  *
  * @function clearImage();
	* @description once we close, remove class, content, sources, etc...
	*/

  clearImage = () => {

    $('.imager-loader-title').text('');

    $('.image-loader-description').html('');

    $('.image-overlay').css({'opacity':1});

    $('.image-preloader').css({'opacity':1});

    $('#imagePlayer').css("pointer-events", "none");

    $('#imagePlayer').hide();

    $('.image-loader-source img').remove();

  }

}
