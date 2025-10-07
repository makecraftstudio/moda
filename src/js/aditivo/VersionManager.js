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

class VersionManager {

    /**
    *
    * @method               constructor();
    * @description          constructor for this class
    */

    constructor() {

        this._currentVersion = 0;


    }


    /**
    *
    * @method               getVersion();
    * @description          ...
    * 
    */

    getVersion = (url) => {
        
        fetch(url).then(res => res.json()).then(this.parseVersion).catch(this.parseVersion(this._currentVersion));

    }




    parseVersion = (data) => {

        if (data == this._currentVersion) {
            this._currentVersion = data;
        } else {
            this._currentVersion = data.sid;
        }

        var onVersionLoaded = new CustomEvent("onVersionLoaded");

        document.dispatchEvent(onVersionLoaded);

    }


    //getters and setters...

    get currentVersion() { return this._currentVersion; };

    set currentVersion(value) { this._currentVersion = value; };


}
