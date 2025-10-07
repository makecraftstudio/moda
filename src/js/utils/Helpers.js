class Helpers{

	constructor(){



	}

	/**
    * @function blockStage
    * @description block the stage using the blockUI library.
    * @param {string} msg       -       the msg for the blocker.
    */

    blockStage = (msg) =>{

        $.blockUI({ message: '<h1><img src="private/css/busy.gif" /> ' + msg + '</h1>' });

    }

    /**
    * @function unblockStage
    * @description unblock the stage.
    */

    unblockStage = () => { $.unblockUI(); }


    ajaxCall = (path, data = undefined, successCallback = undefined, errorCallback = undefined, type = "post", dataType = "json") =>{

        $.ajax({

          headers: {

            "accept": "application/json",

            "Access-Control-Allow-Origin":"*"

          },

          url: path,

          headers: '*',

          type: type,

          dataType: dataType,

          crossDomain: true,

          cache: false,

          data : data,

          success: function(data) { 
          	//

          	if(successCallback != undefined){

				successCallback(data);

          	}else{

          		console.log(data);

          	}
          	
           },

          error: function(xhr, status, error) {

            console.log(xhr, status, error);

            if(errorCallback != undefined){

            	errorCallback(xhr, status, error);

            }else{

            	console.log("Ojo, te falto definir el callback error");

            }
            
        }

      });

    }

}