/**
* @summary Helpers for the framework :) - 360 utilities
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

var MarzipanoUtils = function() {

  return {

    /**
    * getInitialView();
    * @description 									-						get an object with the initial view...
    * @return {Object}					    -						...
    */

    getInitialView: function(options){

      var object = $.extend(true,

        {

          yaw: 0 * Math.PI / 180,

          pitch: 0 * Math.PI / 180,

          fov: 90 * Math.PI / 180

			}, options);

    },

    /**
    * getGeometry();
    * @description 									-						get the viewer geometry...
    * @return {Array}			  		    -						array with object...
    */

    getGeometry: function(){

      var array = [

        { tileSize: 256, size: 256, fallbackOnly: true },

        { size: 512, tileSize: 512 },

        { size: 1024, tileSize: 512 },

        { size: 2048, tileSize: 512 },

        { size: 4096, tileSize: 512 },

        { size: 8192, tileSize: 512 }];

      return array;

    },

    /**
    * getAutorotateObject();
    * @description 									-						get an object with the autorotate data...
    * @return {Object}			  		  -						object with the aurototate config...
    */

    getAutorotateObject: function(){

      var object = { yawSpeed: 0.03, targetPitch: 0, targetFov: Math.PI / 2 };

      return object;


    },

    /**
  	* @function findSceneById();
  	* @description find scene by its id...
  	*
  	* @param id - the id of the scene to find...
  	*/

  	findSceneById : function(id) {

  		for (var i = 0; i < scenes.length; i++) {

  			if (scenes[i].data.id === id)  return scenes[i];

  	  }

  	  return null;

  	},

    /**
  	* @function findSceneDataById();
  	* @description find scene data by its id...
  	*
  	* @param id - the id of the scene to find the data of...
  	*/

    findSceneDataById : function (id) {

  		for (var i = 0; i < data.scenes.length; i++) {

  			if (data.scenes[i].id === id)  return data.scenes[i];

  		}

  		return null;

  	},

    stopTouchAndScrollEventPropagation : function(element, eventList) {

   	 var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel','wheel', 'mousewheel' ];

   	 for (var i = 0; i < eventList.length; i++) {

   		 element.addEventListener(eventList[i], function(event) { event.stopPropagation(); });
   	 }
   },

    /**
  	* @function createLinkHotspotElement
  	* @description create a link for the hotspot element...
  	*
  	* @param hotspots		-			hostpot object...
  	* @return ref		    -			ref to this class. Should think in a singleton?
  	*/

  	createLinkHotspotElement : function (hotspot, ref) {

  		var wrapper = document.createElement("div");

  		wrapper.classList.add('hotspot');

  		wrapper.classList.add('link-hotspot');

  		wrapper.setAttribute("data-goto", hotspot.target);

      wrapper.setAttribute("data-lookat", hotspot.lookAt);

  		wrapper.setAttribute("data-type", hotspot.type);

  		var icon = document.createElement('img');

  		icon.src = 'images/assets/hotspot.svg';

  		icon.classList.add('link-hotspot-icon');

      var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];

  		for (var i = 0; i < transformProperties.length; i++) { icon.style[transformProperties[i]] = 'rotate(' + hotspot.rotation + 'rad)'; }

      var tooltip = document.createElement('div');

  		tooltip.classList.add('hotspot-tooltip');

  		tooltip.classList.add('link-hotspot-tooltip');

  		tooltip.classList.add('text-uppercase');

  		ref.stopTouchAndScrollEventPropagation(wrapper);

  		tooltip.innerHTML = ref.findSceneDataById(hotspot.target).name;

  		wrapper.appendChild(icon);

  		wrapper.appendChild(tooltip);

  		return wrapper;

  	},

    /**
  	* @function createInfoHotSpot
  	* @description create a link element...
  	*
  	* @param hotspots		-			hostpot object...
  	* @return ref		    -			ref to this class. Should think in a singleton?
  	*/

    createInfoHotSpot : function(hotspot, ref){

      var wrapper = document.createElement("div");

			wrapper.classList.add('hotspot');

			wrapper.classList.add('info-hotspot');

			var header = document.createElement('div')

			header.classList.add('info-hotspot-header');

			var iconWrapper = document.createElement('div');

			iconWrapper.classList.add('info-hotspot-icon-wrapper');

			var icon = document.createElement('img');

			icon.src = 'images/assets/info.svg';

			icon.classList.add('info-hotspot-icon');

			iconWrapper.appendChild(icon);

			var titleWrapper = document.createElement('div');

			titleWrapper.classList.add('info-hotspot-title-wrapper');

			var title = document.createElement('div');

			title.classList.add('info-hotspot-title');

			title.classList.add('text-uppercase');

			title.innerHTML = hotspot.title;

			titleWrapper.appendChild(title);

			var closeWrapper = document.createElement('div');

		 closeWrapper.classList.add('info-hotspot-close-wrapper');

		 var closeIcon = document.createElement('img');

		 closeIcon.src = 'images/assets/close.svg';

		 closeIcon.classList.add('info-hotspot-close-icon');

		 closeWrapper.appendChild(closeIcon);

		 header.appendChild(iconWrapper);

		 header.appendChild(titleWrapper);

		 header.appendChild(closeWrapper);

		 var text = document.createElement('div');

		 var int = document.createElement('div');

		 int.classList.add('info-hotspot-text-container');

		 var par = document.createElement('p');

		 text.appendChild(int);

		 int.appendChild(par);

		 text.classList.add('info-hotspot-text');

		 par.innerHTML = hotspot.text;

		 wrapper.appendChild(header);

		 wrapper.appendChild(text);

		 var modal = document.createElement('div');

		 modal.innerHTML = wrapper.innerHTML;

		 modal.classList.add('info-hotspot-modal');

		 document.body.appendChild(modal);

		 var toggle = function() {

			 wrapper.classList.toggle('visible');

			 modal.classList.toggle('visible');

		 };

		 wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

		 modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

		 ref.stopTouchAndScrollEventPropagation(wrapper);

     return wrapper;

   },

   /**
   * @function createGenericHotSpot
   * @description generic approach to create various types of content with the same logic...
   *
   * @param hotspots		-			hostpot object...
   * @param type		    -		  video, audio, image
   * @return isMobile	  -			if there is an alternative src, it will load it.
   */

  createGenericHotSpot : function(hotspot, type, isMobile = false){

    var wrapper = document.createElement("div");

    wrapper.classList.add('hotspot');

    wrapper.classList.add('info-hotspot');

    wrapper.classList.add('trigger-' + type);

    if(isMobile && hotspot.srcMobile != undefined){

      wrapper.setAttribute("data-src", hotspot.srcMobile);

    }else{

      wrapper.setAttribute("data-src", hotspot.src);

    }

    wrapper.setAttribute("data-title", hotspot.title);

    wrapper.setAttribute("data-description", hotspot.description);

    wrapper.setAttribute("trigger", hotspot.trigger);

    var header = document.createElement('div')

    header.classList.add('info-hotspot-header');

    var iconWrapper = document.createElement('div');

    iconWrapper.classList.add('info-hotspot-icon-wrapper');

    var icon = document.createElement('img');

    icon.src = 'images/assets/' + type + '.svg';

    icon.classList.add('info-hotspot-icon');

    iconWrapper.appendChild(icon);

    var titleWrapper = document.createElement('div');

    titleWrapper.classList.add('info-hotspot-title-wrapper');

    //titleWrapper.classList.add('active-stat-text');

    //wrapper.classList.add('active-stat');

    //header.classList.add('active-stat');

    var title = document.createElement('div');

    title.classList.add('info-hotspot-title');

    title.classList.add('text-uppercase');

    title.innerHTML = hotspot.title;

    titleWrapper.appendChild(title);

    header.appendChild(iconWrapper);

    header.appendChild(titleWrapper);

    wrapper.appendChild(header);

    return wrapper;
  },

  createRevealImage: function(hotspot, isMobile = false){

    var wrapper = document.createElement("div");

    wrapper.classList.add('reveal');

    var icon = document.createElement('img');

    icon.src = 'images/assets/image.svg';

    var imageWrapper = document.createElement('div');

    imageWrapper.classList.add('reveal-content');

    var image = document.createElement('img');

    image.src = (isMobile && hotspot.srcMobile != undefined) ? hotspot.srcMobile : hotspot.src;

    var title = document.createElement('h5');

    title.classList.add('text-uppercase');

    title.classList.add('reveal-content-title');

    title.classList.add('mt-3');

    title.innerHTML = hotspot.title;

    var description = document.createElement('p');

    description.classList.add('text-uppercase');

    description.classList.add('reveal-content-description');

    description.innerHTML = hotspot.description;

    imageWrapper.appendChild(image);

    imageWrapper.appendChild(title);

    imageWrapper.appendChild(description);

    wrapper.appendChild(icon);

    wrapper.appendChild(imageWrapper);

    return wrapper;

  },

  createSelectHotSpot : function(hotspot){

    var wrapper = document.createElement("div");

    wrapper.classList.add('select-container');

    //...

    var indicator = document.createElement('div');

    indicator.classList.add('indicator');

    indicator.classList.add('mr-2');

    var icon = document.createElement('img');

    icon.src = 'images/assets/video.svg';

    indicator.appendChild(icon);


    //...

    var selectContainer = document.createElement('div');

    selectContainer.classList.add('select');

    //...

    var select = document.createElement('select');

    select.setAttribute('name', 'slct');

    //select.setAttribute('id', 'testimonials-select');

    select.classList.add('testimonials-select');

    select.classList.add('text-uppercase');

    var option = document.createElement('option');

    option.setAttribute("selected", "selected");

    option.setAttribute("disabled", "disabled");

    option.innerHTML = hotspot.title;

    select.appendChild(option);

    for(var i=0; i<hotspot.itemsList.length; i++){

      var dynamicOption = document.createElement('option');

      dynamicOption.innerHTML = hotspot.itemsList[i].title;

      dynamicOption.setAttribute('data-video', hotspot.itemsList[i].link);

      select.appendChild(dynamicOption);

    }

    selectContainer.appendChild(select);

    wrapper.appendChild(indicator);

    wrapper.appendChild(selectContainer);

    return wrapper;

  },

  createQuoteHotSpot : function(hotspot){

    var wrapper = document.createElement("div");

    wrapper.classList.add('expand');

    var title = document.createElement("div");

    title.classList.add('title');

    var icon = document.createElement('img');

    icon.src = 'images/assets/quote.svg';

    icon.classList.add('icon');

    icon.classList.add('change-color');

    icon.classList.add('svg-icon');

    var content = document.createElement("p");

    content.innerHTML = hotspot.text;

    wrapper.appendChild(title);

    title.appendChild(icon);

    wrapper.appendChild(content);

    return wrapper;

  },

  createLogoHotSpot : function(hotspot){

    var wrapper = document.createElement("div");

    wrapper.classList.add('ih-item');

    wrapper.classList.add('circle');

    wrapper.classList.add('effect1');

    var link = document.createElement("a");

    link.setAttribute("href", "#");

    wrapper.appendChild(link);

    var spinner = document.createElement("div");

    spinner.classList.add('spinner');

    link.appendChild(spinner);

    //...

    var imgContainer = document.createElement("div");

    imgContainer.classList.add('img');

    //imgContainer.appendChild(spinner);

    //

    var image = document.createElement('img');

    image.src = 'images/assets/hotspot.svg';

    imgContainer.appendChild(image);

    link.appendChild(imgContainer);

    //...

    var info = document.createElement("div");

    info.classList.add('info-jacob');

    link.appendChild(info);

    //...

    var infoBlock = document.createElement("div");

    infoBlock.classList.add('info-block');

    info.appendChild(infoBlock);

    var title = document.createElement("h3");

    title.innerHTML = 'HOLA';

    infoBlock.appendChild(title);

    var description = document.createElement("p");

    description.innerHTML = 'HOLA';

    infoBlock.appendChild(description);

    console.log(wrapper);

    return wrapper;

    //<div class="ih-item circle effect1">

    //<a href="#">
       //<div class="spinner"></div>
       //<div class="img">

       //<img src="images/assets/2.jpg" alt="img">

       //</div>
       //<div class="info">
        // <div class="info-back">
        //   <h3>Heading here</h3>
        //   <p>Description goes here</p>
        // </div>
      // </div></a></div>

  },

  createHintHotSpot : function(hotspot){

    var wrapper = document.createElement("div");

    wrapper.classList.add('textInfo');

    //...

    var cont = document.createElement('div');

    cont.classList.add('hotspot');

    //...

    var out = document.createElement('div');

    out.classList.add('out');

    //...

    var inItem = document.createElement('div');

    inItem.classList.add('in');

    cont.appendChild(out);

    cont.appendChild(inItem);

    var tooltip = document.createElement('div');

    tooltip.classList.add('tooltip-content');

    var tooltipTitle = document.createElement('h5');

    tooltipTitle.innerHTML = hotspot.title;

    var tooltipContent = document.createElement('p');

    tooltipContent.innerHTML = hotspot.text;

    if(hotspot.title != undefined) tooltip.appendChild(tooltipTitle);

    tooltip.appendChild(tooltipContent);

    wrapper.appendChild(cont);

    wrapper.appendChild(tooltip);

    return wrapper;

  }

}

}
