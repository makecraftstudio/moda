/**
* @summary Helpers for the framework :) - mobile utilities
*
* @description -
*
* @author Mariano Makedonsky <info@aditivointeractivegroup.com>
*
* @version 1.0.1
*
* @see {@link http://www.aditivointeractivegroup.com}
*
*/

var ProjectUtils = function() {

  return {

    /**
    * getSlickSliderObject();
    * @description 									-						get an object for the slickslider initialization...
    * @return                       -           object...
    */

    getSlickSliderObject: function(options){

      var object = $.extend(true,{

        infinite: false,

        slidesToShow: 4,

        slidesToScroll: 4,

        arrows: true,

        //prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",

        //nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",

        responsive: [{

          breakpoint: 1024,

          settings:

          {slidesToShow: 2, slidesToScroll: 1 }

        },

          {breakpoint: 480,

            settings: { slidesToShow: 1, slidesToScroll: 1  }

          }
        ]

      }, options);

      return object;

    },

    replaceUrlParam : function(url, paramName, paramValue)
    {
        if (paramValue == null) {
            paramValue = '';
        }
        var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');

        if (url.search(pattern)>=0)  return url.replace(pattern,'$1' + paramValue + '$2');

        url = url.replace(/[?#]$/,'');

        return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
    },

    /**
    * @param String name
    * @return String
    */

    getParameterByName : function(name) {

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),

      results = regex.exec(location.search);

      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    toastr:function(title, message){

      toastr.options = {

        "closeButton": true,

        "debug": false,

        "newestOnTop": false,

        //"progressBar": true,

        "positionClass": "toast-bottom-left",

        "preventDuplicates": false,

        "onclick": null,

        "showDuration": "300",

        "hideDuration": "1000",

        "timeOut": "5000",

        "extendedTimeOut": "1000",

        "showEasing": "swing",

        "hideEasing": "linear",

        "showMethod": "fadeIn",

        "hideMethod": "fadeOut"

      }

      toastr.info(message, title);

    },

    /**
    * alert();
    * @description 									-						manage alerts with styles, callbacks, etc...
    * @param title 	      					-						the title for the alert...
    * @param message 	     					-						the message for the alert...
    * @param buttonOptions 	     		-						array with the options for buttons. We use it to decide if we use two buttons or just one...
    * @param callbacks 	     		    -  					callback functions in the scope function....
    * @param type   	     					-						the type if alert (success, warning, info, error)
    * @param cancelable   	     		-						useful for important alerts :)
    */

    alert : function(title, message, buttonOptions = ['cerrar'], callbacks = [undefined, undefined] , type = 'success', cancelable = false, confirmButtonClass = "", cancelButtonClass = ""){

      var options;

      if(buttonOptions.length >1){

        options = {title: title, html: message, type: type, showCancelButton: true, confirmButtonText: buttonOptions[0], cancelButtonText: buttonOptions[1], reverseButtons: true, timerProgressBar: true}

      }else{

        options = {title: title, html: message, type: type, confirmButtonText: buttonOptions[0], reverseButtons: false, timerProgressBar: true}

      }

      options.confirmButtonColor = '#0c6a8d';

      options.cancelButtonColor = '#d33';

      if(cancelable) options.allowOutsideClick = options.allowEscapeKey = options.allowEnterKey = false;

      Swal.fire(options).then(function(result){

        if (result.value) {

          if(callbacks[0] != undefined) callbacks[0]();

        }else{

          if(buttonOptions.length >1 && callbacks[1] != undefined){

            callbacks[1]();

          }

        }

    });

  },

  /**
  * distanceBetweenTwoPoints();
  * @description 									-						Calculate distance between two points...
  * @param x1                     -           x1...
  * @param y1                     -           y1...
  * @param x2                     -           x2...
  * @param y2                     -           y2...
  *
  * @todo - convert to math utils.
  *
  */

  distanceBetweenTwoPoints: function(x1, y1, x2, y2){ return Math.hypot(x2-x1, y2-y1); },

  /**
  * percentToPixels();
  * @description 									-						convert a percent to pixels
  * @param value                  -           the percent of
  * @param of                     -           this value...
  *
  * @todo - convert to math utils.
  */

  percentToPixels : function(value, of){ return value * $(document).width() / 100;},

  /**
  * addConsoleLogForMobile();
  * @description 									-						console for mobile utils...
  */

  addConsoleLogForMobile : function(){

    let el = document.createElement('div');

    document.body.appendChild(el);

    eruda.init({container: el, tool: ['console', 'elements', 'network', 'resource', 'info', 'sources'] });

  },

  /**
  * fullScreenMode();
  * @description 									-						go to fullscreen mode...
  */

  fullScreenMode : function(){

    var elem = document.documentElement;

    if (elem.requestFullscreen) {

      elem.requestFullscreen();

    } else if (elem.mozRequestFullScreen) { /* Firefox */

      elem.mozRequestFullScreen();

    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */

      elem.webkitRequestFullscreen();

    } else if (elem.msRequestFullscreen) { /* IE/Edge */

      elem.msRequestFullscreen();

    }

  },

  copyToClipboard : function(){

    var copyText = document.getElementById("share-url");

    copyText.select();

    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    return 'texto copiado al portapapeles';
  },

  exitFullScreenMode : function(){

    if (document.exitFullscreen) {

      document.exitFullscreen();

    } else if (document.mozCancelFullScreen) { /* Firefox */

      document.mozCancelFullScreen();

    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */

      document.webkitExitFullscreen();

    } else if (document.msExitFullscreen) { /* IE/Edge */

      document.msExitFullscreen();

    }

  }

}

}
