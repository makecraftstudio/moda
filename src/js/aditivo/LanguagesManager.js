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

class LanguagesManager {

    /**
    *
    * @method               constructor();
    * @description          constructor for this class
    */

    constructor(lang) {

        this._currentLanguage = lang;

        this._languageData = [];

        this._textAlign = "left";


    }


    /**
    *
    * @method               getLanguage();
    * @description          ...
    * 
    */

    getLanguage = (url) => {

        fetch(url).then(res => res.json()).then(this.loadDataByLanguage).catch(this.loadDataByDefault);

    }



    /**
    *
    * @method               loadDataByLanguage();
    * @description          ...
    * 
    */

    loadDataByLanguage = (data, isChangingLang) => {

        console.log("loadDataByLanguage");

        if (data != this._currentLanguage) {

            if (typeof data == "string") {
                this._currentLanguage = data;
            } else if (data == undefined) {
                this._currentLanguage = "es";
            } else {
                // entonces es la data del php
                this._currentLanguage = data.lang;
            }

        }

        var jsonRoot = "json/" + this._currentLanguage + "_data.json";

        console.log(jsonRoot);

        if (isChangingLang) {
            $.ajax({ url: jsonRoot, type: 'post', dataType: 'json', success: this.parseChangedData, error: () => { console.log("Error al cargar config.json") } });
        } else {
            $.ajax({ url: jsonRoot, type: 'post', dataType: 'json', success: this.parseDataByLanguage, error: () => { console.log("Error al cargar config.json") } });
        }

    }


    /**
    *
    * @method               loadDataByDefault();
    * @description          ...
    * 
    */

    loadDataByDefault = () => {

        var jsonRoot = "json/" + this._currentLanguage + "_data.json";

        $.ajax({ url: jsonRoot, type: 'post', dataType: 'json', success: this.parseDataByLanguage, error: () => { console.log("Error al cargar config.json") } });

    }




    /**
    *
    * @method               parseDataByLanguage();
    * @description          ...
    * 
    */


    parseDataByLanguage = (data) => {

        this._languageData = data;

        this.textAlign = data.align;

        this.currentLanguageData = data.content;

        var onLoadedByLanguage = new CustomEvent("onLoadByLanguage", { detail: data });

        document.dispatchEvent(onLoadedByLanguage);

    }



    /**
    *
    * @method               parseChangedData();
    * @description          ...
    * 
    */

    parseChangedData = (data) => {

        this._languageData = data;

        this.textAlign = data.align;

        this.currentLanguageData = data.content;

        var onLoadedByLanguage = new CustomEvent("onLoadChangedData", { detail: data });

        document.dispatchEvent(onLoadedByLanguage);

    }



    //getters and setters...

    get currentLanguage() { return this._currentLanguage; };

    set currentLanguage(value) { this._currentLanguage = value; };

    get currentLanguageData() { return this._languageData; };

    set currentLanguageData(value) { this._languageData = value; };

    get textAlign() { return this._textAlign; };

    set textAlign(value) { this._textAlign = value; };


}
