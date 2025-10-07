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

class ProjectConfig {

    /**
    *
    * @method               constructor();
    * @description          constructor for this class
    */

    constructor() {

        this._isMuseum = true;

        this._rememberLanguage = false;

        this._defaultLanguage = "es";

        this._updateTime = 1000 * 60 * 10;

        this.defaultApp = 0;

        this._exitScreenSaverTime = "18:00";

        this._isDebug;

        this._showContextMenu;

        this._showMouse = false;

        this._isFullScreen = true;

        this._iddleTimeCheck = 1000 * 5 * 60;

        this._dataURL;

        this._isAppClosed = false;

        this._closingHour = 22;

        this._logoPath = "logo.svg";

        this._questionTime = 5000;

        this._tipTime = 5000;

        this._qrTime = 15;


    }


    /**
    *
    * @method               getData();
    * @description          ...
    * 
    */

    getData = () => {

        $.ajax({ url: "json/config.json", type: 'post', dataType: 'json', success: this.loadData, error: () => { console.log("Error al cargar config.json") } });

    }



    /**
    *
    * @method               loadJson();
    * @description          ...
    * 
    */

    loadData = (data) => {

        this._isMuseum = data.isMuseum;

        this._rememberLanguage = data.rememberLanguage;

        this._defaultLanguage = data.defaultLanguage;

        if (this._rememberLanguage) localStorage.setItem('language', this._defaultLanguage);

        this._updateTime = data.updateTime;

        this._defaultApp = data.defaultApp;

        this._exitScreenSaverTime = data.exitScreenSaverTime;

        this._isDebug = data.isDebug;

        this._showContextMenu = data.showContextMenu;

        this._showMouse = data.showMouse;

        this._isFullScreen = data.isFullScreen;

        this._dataURL = data.dataURL;

        this._iddleTimeCheck = data.iddleTimeCheck;

        this._closingHour = data.closingHour;

        this._questionTime = data.questionTime;

        this._tipTime = data.tipTime;

        this._qrTime = data.qrTime;

        var onJsonLoaded = new CustomEvent("onLoad", { detail: data });

        document.dispatchEvent(onJsonLoaded);

    }


    /**
    *
    * @method               closeApp();
    * @description          Start the time checker to close the app
    * 
    */

    closeApp = () => {

        var checker = this._iddleTimeCheck;

        var dt;

        var time;

        setInterval(() => {

            dt = new Date();
            time = dt.getHours();

            if (time >= this._closingHour) {

                console.log("is closing time");

                this._isAppClosed = true;

                var isClosingTime = new CustomEvent("isClosingTime");

                document.dispatchEvent(isClosingTime);
            }

        }, checker);

    }


     /**
    *
    * @method               setDefaults();
    * @description          Start the time checker to close the app
    * 
    */

    setDefaults = () => {



        if(!this.showMouse){


            if (!$("*").hasClass("cursor-none")) {
                $("*").addClass("cursor-none");
            }

            //document.body.style.cursor = 'none';

        }else{

            //document.body.style.cursor = 'auto';
 
            
            if ($("*").hasClass("cursor-none")) {
                $("*").removeClass("cursor-none");
            }

        }

        console.log("on show mouse");

        if(!this.showContextMenu){

            window.addEventListener('contextmenu', function (e) { 
              
              e.preventDefault(); 

            }, false);

        }else{

            window.addEventListener('contextmenu', function (e) { 
              
            }, false);

        }



    }

    toggleMouse = () => {

        this.showMouse = !this.showMouse;

        this.setDefaults();

        console.log(this.showMouse);

    }

    toggleContextMenu = () => {

        this.showContextMenu = !this.showContextMenu;

        this.setDefaults();

    }


    //getters and setters...

    get isMuseum() { return this._isMuseum; };

    set isMuseum(value) { this._isMuseum = value; };

    get rememberLanguage() { return this._rememberLanguage; };

    set rememberLanguage(value) { this._rememberLanguage = value; };

    get defaultLanguage() { return this._defaultLanguage; };

    set defaultLanguage(value) { this._defaultLanguage = value; };

    get updateTime() { return this._updateTime; };

    set updateTime(value) { this._updateTime = value; };

    get dataURL() { return this._dataURL; };

    set dataURL(value) { this._dataURL = value; };

    get iddleTimeCheck() { return this._iddleTimeCheck; };

    set iddleTimeCheck(value) { this._iddleTimeCheck = value; };

    get isAppClosed() { return this._isAppClosed; };

    set isAppClosed(value) { this._isAppClosed = value; };

    get closingHour() { return this._closingHour; };

    set closingHour(value) { this._closingHour = value; };

    get questionTime() { return this._questionTime; };

    set questionTime(value) { this._questionTime = value; };

    get tipTime() { return this._tipTime; };

    set tipTime(value) { this._tipTime = value; };

    get qrTime() { return this._qrTime; };

    set qrTime(value) { this._qrTime = value; };

    get showContextMenu() { return this._showContextMenu; };

    set showContextMenu(value) { this._showContextMenu = value; };

    get showMouse() { return this._showMouse; };

    set showMouse(value) { this._showMouse = value; };

    get isDebug() { return this._isDebug; };

    set isDebug(value) { this._isDebug = value; };
    
}
