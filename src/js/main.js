/**
* @summary MUCBA / Buenos Aires / Argentina.
*
* @description - then i will add this.
*
* @author Aditivo Interactive Group S.A.
*
*
* @since  1.0.0
*
* @see {@link http://www.aditivointeractivegroup.com}
*
* @todo Complete documentation.
*/

//usemos el modo estricto siempre que laburemos en JS > https://www.w3schools.com/js/js_strict.asp

"use strict";


/**
* @function Project
* @description Initialize project...
*/

var artists;

var Project = function () {

    //No modificar estas variables. Son parte del core de Aditivo

    var config = new ProjectConfig();

    var languagesManager;

    var projectUtils = new ProjectUtils();

    var helper = new Helpers();

    var iddle = new IddleManager();

    var iddleTimeOut;

    var isInMain = true;

    var uiSounds = new AudioManager();

    uiSounds.instanceName = "uiSounds";

    uiSounds.playerId = 0;

    var currentSection = 0;

    var mainVideo = new VideoManager();

    mainVideo.currentPlayer = videojs("videoReference", { language: 'es' });

    //**** Aca tus variables *****


    var is_stageBlocked = false;


    //***************************/



    /**
    * @function addListeners
    * @description ...
    *
    */

    var addListeners = function () {

        //$(".iddle").on("touchstart mousedown", activeApp);

        $(".grid-container").on("touchstart", ".grid__item-home", activeApp);

        //$(".grid-container").on("touchstart mousedown", ".grid__item--nav-home", activeApp);

       $(".grid-container").on("touchstart", ".grid__item-expand", openPhotoGallery);

        //Eventos 2 divs delante de carousel para obtener para que lado se scrollea
        //$(".carousel-move").on("touchstart", moveCarousel);

        $(".grid-container").on("touchstart", ".grid__item--nav", selectSection);

        $(".grid-container").on("touchstart", ".grid__item-video", loadVideo);

        $(".btn-lola").on("touchstart", openLolaVideo);

        $(".close-video-container").on("touchstart", closeVideo);

        /*
            OJO ACA. COMENTE porque esta asociado al contenedor de la gallerya el cerrar....
        */
        //$(".gallery-container").on("touchstart", closeGallery);

        $(".close-gallery").on("touchstart", closeGallery);




        /*
        *   No borrar - Parte del core de Aditivo
        */
        $(document).keypress(function (event) {

            var keycode = (event.keyCode ? event.keyCode : event.which);

            switch (keycode) {

                case 109: // M
                    config.toggleMouse();
                    break;
                case 110: // N
                    config.toggleContextMenu();
                    break;
                default:
                    break;

            }

        });


        //No borrar. Eventos custom de Aditivo.

        //window.addEventListener("mousedown", resetTimer);

        window.addEventListener("touchstart", resetTimer);

        document.addEventListener("onLoad", onDataLoaded);

        document.addEventListener("onLoadByLanguage", parseLanguageData);

        document.addEventListener('onEnter', onEnterIddleMode);

        document.addEventListener("onIddleMode", startIddleMode);

        document.addEventListener("offIddleMode", stopIddleMode);

         document.addEventListener("onVideoStart", onVideoStart);

        document.addEventListener("onVideoEnd", onVideoEnd);


    }

    /**
    * @function onVideoStart();
    * @description a generic video start playing...
    */

    var onVideoStart = function(e){

        alert('start');



    }


    /**
    * @function onVideoEnd();
    * @description a video ended. Resume audio if there is one playing.
    */

    var onVideoEnd = function(e){

       alert("end");

    }



    /**
    * @function loadConfigData
    * @description Carga los json correspondientes el config y despues la data segun el lenguaje
    *
    */

    var loadConfigData = function () {

        config.getData();

    }


    /**
    * @function onDataLoaded
    * @description Callback cuando se confirma la carga de data del config.json
    *
    */

    var onDataLoaded = function (e) {


        config.setDefaults();

        var lang;

        if (config.rememberLanguage == true) {

            lang = localStorage.getItem('language');

            if (lang == null || lang == undefined) {
                lang = config.defaultLanguage;
            }

        } else {
            lang = config.defaultLanguage;
        }


        languagesManager = new LanguagesManager(config.defaultLanguage);

        languagesManager.loadDataByLanguage(config.defaultLanguage, false);

    }


    /**
    * @function onEnterIddleMode
    * @description Callback de cuando se confirma la carga del json por lenguaje
    *
    */
    var onEnterIddleMode = function (e) {

        console.log("onEnterIddleMode callback");

    }



    /**
    * @function parseLanguageData
    * @description Callback de cuando se confirma la carga del json por lenguaje
    *
    */

    var parseLanguageData = function (e) {

        var content = e.detail.content;

        entryPoint();

    }


    /**
    * @function entryPoint
    * @description Punto de entrada. Aca se asigna el contenido de json a las variables a utilizar.
    *              Desde aca arrancas vos
    *
    */

    var entryPoint = () => {

        parseJson();

    }


    /**
    * @function parseJsonExample
    * @description example
    *
    */
    var parseJson = () => {

        sections = languagesManager.currentLanguageData.sections

        loadSections(sections);

        iddle.setIddleMode(config.iddleTimeCheck);

    }





    /**
    * @function loadSections
    * @description ...
    *
    */

    var loadSections = (sections) => {

        var strHomeElmt = "";

        $.each(sections, function (i, v) {

            var currentID = parseInt(i) + 1;

            var prevSection = parseInt(i) - 1;
            var nextSection = parseInt(i) + 1;

            /*if (prevSection < 1) {
                prevSection = 9;
            }

            if (nextSection > 9) {
                nextSection = 1;
            }*/

            if (v.isHome) {

                strHomeElmt += '<div class="grid grid--layout-' + i + ' grid--current">';


                $.each(v.photos, function (j, k) {

                    strHomeElmt += '<h3 class="grid__item grid__item--title grid__item--title-home" style="grid-area: ' + k.sectionNameGrid + '"">' + k.sectionName + '</h3>';
                    strHomeElmt += '<div class="grid__item grid__item-home" data-section="' + k.section + '" data-direction="' + k.direction + '" data-delay="' + k.delay + '" style="background-image: url(images/webp/' + k.jpg + '); grid-area: ' + k.gridArea + '"></div>';

                });

                //FLECHAS AGREGADAS
                //strHomeElmt += '<div class="grid__item grid__item--nav grid__item--nav-prev grid__item--nav-home" data-section="' + prevSection + '" style="grid-area: ' + v.navPrevGrid + '"><svg class="icon icon--nav-arrow"><use xlink:href="#icon-nav-arrow"></use></svg></div>';
                //strHomeElmt += '<div class="grid__item grid__item--nav grid__item--nav-next grid__item--nav-home" data-section="' + nextSection + '" style="grid-area: ' + v.navNextGrid + '"><svg class="icon icon--nav-arrow"><use xlink:href="#icon-nav-arrow"></use></svg></div>';


                strHomeElmt += '<h2 class="grid__item grid__item--name"></h2>';
                strHomeElmt += '<p class="grid__item grid__item--text"></p>';

                strHomeElmt += '</div>';

            } else {

                strHomeElmt += '<div class="grid grid--layout-' + i + '">';

                if (v.hasVideo) {

                    $.each(v.photos, function (j, k) {

                        if (k.isVideo == false || k.isVideo == undefined) {
                            strHomeElmt += '<div class="grid__item grid__item-expand" data-photo="' + j + '" data-direction="' + k.direction + '" data-delay="' + k.delay + '" style="background-image: url(images/webp/' + k.jpg + '); grid-area: ' + k.gridArea + '"></div>';
                        } else {
                            strHomeElmt += '<div class="grid__item grid__item-video" data-video="' + j + '" data-direction="' + k.direction + '" data-delay="' + k.delay + '" style="background-image: url(images/webp/' + k.jpg + '); grid-area: ' + k.gridArea + '"><span><i class="fas fa-play"></i></span></div>';
                        }


                    });

                } else {

                    $.each(v.photos, function (j, k) {

                        strHomeElmt += '<div class="grid__item grid__item-expand" data-photo="' + j + '" data-direction="' + k.direction + '" data-delay="' + k.delay + '" style="background-image: url(images/webp/' + k.jpg + '); grid-area: ' + k.gridArea + '"></div>';

                    });

                }

                strHomeElmt += '<div class="grid__item grid__item--nav grid__item--nav-prev" data-section="' + prevSection + '" style="grid-area: ' + v.navPrevGrid + '"><svg class="icon icon--nav-arrow"><use xlink:href="#icon-nav-arrow"></use></svg></div>';
                strHomeElmt += '<div class="grid__item grid__item--nav grid__item--nav-next" data-section="' + nextSection + '" style="grid-area: ' + v.navNextGrid + '"><svg class="icon icon--nav-arrow"><use xlink:href="#icon-nav-arrow"></use></svg></div>';
                strHomeElmt += '<h2 class="grid__item grid__item--name"></h2>';
                strHomeElmt += '<h3 class="grid__item grid__item--title"style=" grid-area: ' + v.titleGrid + '">' + v.title + '</h3>';
                strHomeElmt += '<p class="grid__item grid__item--text">' + v.subtitle + '</p>';

                strHomeElmt += '</div>';

            }

        });


        $(".grid-container").html(strHomeElmt);


    }






    var selectSection = function (e) {

        var dataSection = $(this).attr("data-section");

        currentSection = dataSection;

        console.log("currentSection");
        console.log(currentSection);
    }







    /**
    * @function openPhotoGallery
    * @description open the bootstrap carousel with the section's photos
    *
    */


    var openPhotoGallery = function () {
        console.log(`open photo gallery`);
        blockStage();

        var currentSlide = $(this).attr("data-photo");

        var strGalleryElmt = "";
        var strDotsElmt = "";

        $.each(sections, function (i, v) {

            if (i == currentSection) {

                $.each(v.photos, function (j, k) {

                    if (k.isVideo == false || k.isVideo == undefined) {


                        if (j == 0) {
                            strGalleryElmt += '<div class="carousel-item active">';
                            strDotsElmt += '<li data-target="#gallery" data-slide-to="' + j + '" class="active"></li>';
                        } else {
                            strGalleryElmt += '<div class="carousel-item">';
                            strDotsElmt += '<li data-target="#gallery" data-slide-to="' + j + '"></li>';
                        }

                        strGalleryElmt += '<div class="image-container">';
                        strGalleryElmt += '<img src="images/webp/' + k.jpg + '" class="d-block img-fluid" alt="Casa Rosada">';
                        strGalleryElmt += '<div class="carousel-caption d-none d-block">';
                        strGalleryElmt += '<span class="epigraph">' + k.epigraph + '</span>';
                        strGalleryElmt += '</div>';
                        strGalleryElmt += '</div>';
                        strGalleryElmt += '</div>';

                    }

                });

            }

        });


        $("#gallery .carousel-inner").html(strGalleryElmt);
        $("#gallery .carousel-indicators").html(strDotsElmt);

        setTimeout(() => {
            TweenMax.to($(".gallery-container"), .5, {
                opacity: "1", ease: Power3.easeOut, onStart: () => {

                    $('.carousel').carousel(parseInt(currentSlide));
                    $(".gallery-container").css("display", "block");

                },
                onComplete: () =>{

                    unBlockStage();

                }
            });
        //}, 750);
      }, 2000);

    }





    /**
    * @function moveCarousel
    * @description ...
    *
    */

    var moveCarousel = function () {

        if ($(this).hasClass("prev")) {
            $('.carousel').carousel('prev');
        } else {
            $('.carousel').carousel('next');
        }

    }




    /**
    * @function closeGallery
    * @description close the bootstrap carousel
    *
    */


    var closeGallery = function (e) {
        console.log(`close gallery`);
        blockStage();

        if (e.target !== this)
            return;

        TweenMax.to($(".gallery-container"), .5, { opacity: "0", ease: Power3.easeOut,

            onComplete: () => {

                $(".gallery-container").css("display", "none");

                unBlockStage();


            }

        });
    }






    /**
    * @function goToHome
    * @description return to homepage
    *
    */



    var goToHome = function () {

        isInMain = true;

        console.log("gotohome");

        //TweenMax.to($(".iddle"), .5, { opacity: "1", ease: Power3.easeOut, onStart: () => { $(".iddle").css("display", "block"); isInMain = true; } });

    }





    /**
    * @function loadVideo
    * @description .....
    *
    */




    var loadVideo = function () {

        var currentVideo = $(this).attr("data-video");

        var videoSrc;


        $.each(sections, function (i, v) {

            if (i == currentSection) {

                $.each(v.photos, function (j, k) {

                    if (j == currentVideo) {
                        videoSrc = k.video;

                        $(".video-epigraph").html(k.epigraph);
                    }

                });
            }

        });

        $(".vjs-tech").attr("src", "videos/" + videoSrc);

        $(".vjs-tech").on("ended", function(){

            closeVideo();

             $(".vjs-tech").off("ended");//


           // window.location.reload();


        });

         $(".vjs-tech").on("start", function(){


        });


        TweenMax.to($(".video-container"), .5, {
            opacity: "1", ease: Power3.easeOut, onStart: () => {
                $(".video-container").css("display", "block");

                mainVideo.goToTime(0);

            }, onComplete: () => {
                mainVideo.reanudeVideo();



            }
        });

    }





    /**
    * @function closeVideo
    * @description ....
    *
    */


    var closeVideo = function () {
        console.log(`closeVideo`);
        blockStage();

        TweenMax.to($(".video-container"), .5, { opacity: "0", ease: Power3.easeOut,

            onComplete: () => {

                $(".video-container").css("display", "none");

                unBlockStage();

            }

        });

        mainVideo.stopVideo();

    }




    var openLolaVideo = function () {

        console.log(`open lola video`);

        blockStage();

        $(".vjs-tech").attr("src", "videos/" + languagesManager.currentLanguageData.lolaVideo);

        $(".vjs-tech").on("ended", function(){

            closeVideo();

            $(".vjs-tech").off("ended");//, function(){

           // window.location.reload();


        });

        $(".video-epigraph").html("");

        TweenMax.to($(".video-container"), .5, { opacity: "1", ease: Power3.easeOut,

            onStart: () => {

                $(".video-container").css("display", "block");

            }, onComplete: () => {

                mainVideo.reanudeVideo();

                unBlockStage();
            }

        });

    }



    // IDDLE
    /**********************************************
    *
    *
    */




    /**
    * @function initApp
    * @description start app when click on iddle
    *
    */



    var activeApp = function () {

        console.log("active app");

        var dataSection = $(this).attr("data-section");

        currentSection = dataSection;

        console.log(currentSection);

        iddle.returnFromIddle();

    }


    /**
    * @function setIddleMode
    * @description callback de que la pantalla empezo el timeout hacia el iddle
    *
    */

    var startIddleMode = function () {

        if (!iddle.isIddle) {

            iddleTimeOut = setTimeout(() => {

                iddle.isIddle = true;

                if (!isInMain) {

                    goToHome();
                }

            }, iddle.timeToIddle);
        }
    }



    var resetTimer = function () {

        window.clearTimeout(iddleTimeOut);

        startIddleMode();

    }



    /**
    * @function stopIddleMode
    * @description callback de que la pantalla esta activa
    *
    */

    var stopIddleMode = function () {

        console.log("iddle.isIddle");

        console.log(iddle.isIddle);

        if (iddle.isIddle) {

            iddle.isIddle = false;

            isInMain = false;

            //TweenMax.to($(".iddle"), .5, { opacity: "0", ease: Power3.easeOut, onComplete: () => { $(".iddle").css("display", "none"); isInMain = false; } });

        }
    }



    /**
	* @function blockStage
	* @description
	*/
	var blockStage = function(){

		console.log(`blockUi... from main.js`);

        if(!is_stageBlocked){

            is_stageBlocked = true;

            //$.blockUI({ message: null, overlayCSS: { backgroundColor: '#00f' } });

            $.blockUI({ message: null, overlayCSS: { backgroundColor: '#000', opacity:'0' } });

        }



	}

	/**
	* @function unBlockStage
	* @description
	*/
	var unBlockStage = function(){

		console.log(`unBlockUi...from main.js`);

        if(is_stageBlocked){

            is_stageBlocked = false;

            $.unblockUI();

        }



	}


    return {

        init: function () {

            loadConfigData();

            addListeners();

        }

    }

}();

$(document).ready(function () { Project.init(); });
