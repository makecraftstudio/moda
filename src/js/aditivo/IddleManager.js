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

class IddleManager {

    /**
    *
    * @method               constructor();
    * @description          constructor for this class
    */

    constructor() {

        this._isIddle = true;

        this._timeToIddle;

        this._onIddleMode = new CustomEvent("onIddleMode");

        this._offIddleMode = new CustomEvent("offIddleMode");

    }


    /**
    *
    * @method               setIddleMode();
    * @description          ...
    * 
    */

    setIddleMode = (time) => {

        this.timeToIddle = time;

        document.dispatchEvent(this._onIddleMode);

    }


    /**
   *
   * @method               returnFromIddle();
   * @description          ...
   * 
   */

    returnFromIddle = () => {

        document.dispatchEvent(this._offIddleMode);

    }


    //getters and setters...

    get isIddle() { return this._isIddle; };

    set isIddle(value) { this._isIddle = value; };

    get timeToIddle() { return this._timeToIddle; };

    set timeToIddle(value) { this._timeToIddle = value; };


}
