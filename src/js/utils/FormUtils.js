  /**
  * @summary Helpers for the framework :) - form utilities
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

  var FormUtils = function() {

    return {

      /**
      * ajaxCall();
      * unify the ajax call...
      */

      ajaxCall : function(path, data = undefined, successCallback = undefined, errorCallback = undefined, type = "post", dataType = "json"){

        $.ajax({

          url: path,

          type: 'POST',

          dataType: 'json',

          cache: false,

          data : data,

          success: function(data) { successCallback(data); },

          error: function(xhr, status, error) { errorCallback(xhr, status, error) }

      });

    },

    /**
    * addNotEqualToRule();
    * rule for the validator. Useful for passwords.
    */

    addNotEqualToRule : function(){

      return function(value, element, param) {

          var notEqual = true;

          value = $.trim(value);

          for (var i = 0; i < param.length; i++) { if (value == $.trim($(param[i]).val())) { notEqual = false; } }

          return this.optional(element) || notEqual;

      }

    },

    /**
    * @function passwordScore
    * @description Retrn the strenght of a password.
    * @param {string} string           -       The password.
    * @return {int} result.score       -       The strenght of the password.
    */

    passwordScore:function(string){

      var result = zxcvbn(string);

      return result.score;

    },

    /**
    * addStrenghtRule();
    * check the strenght of a string...
    * @param globalscore          -           the score
    */

    addStrenghtRule : function(globalScore){

      return function (value, element) { return (globalScore >= 4) ? true : false; };

    },

    /**
    * createErrorLabel();
    * create an error label for forms...
    *
    * @param field            -           the name of the field
    * @param type             -           filters...
    * @param params           -           array...
    */

    createErrorLabel: function(field, type, params){

          var string;

          switch(type){

              case 'REQUIRED':

              string = 'El campo <strong>' + field + '</strong> es obligatorio.';

              break;

              case 'TOO_SHORT':

              string = 'El campo <strong>' + field + '</strong> es demasiado corto.';

              break;

              case 'INVALID_URL':

              string = 'la URL de <strong>' + field + '</strong> es inválida.';

              break;

              case 'INDICATE':

              string = 'Debes indicar tu <strong>' + field + '</strong>.';

              break;

              case 'MIN_LENGTH':

              string = '<strong>' + field + '</strong> debe tener por lo menos ' + params[0];

              break;

              case 'STRENGHT':

              string = '<strong>' + field + '</strong> es insegura. Dale, tenés que llenar la barrita!)';

              break;

              case 'MATCH':

              string = 'El campo <strong>' + field + '</strong> debe ser igual al campo ' + params[0];

              break;

              case 'DIFFERENT':

              string = 'El campo <strong>' + field + '</strong> debe ser distinto al campo <strong>' + params[0] + "</strong>";

              break;

              case 'NUMERIC':

              string = 'El campo <strong>' + field + '</strong> debe ser un número';

              break;

              case 'EMAIL':

              string = 'El campo <strong>' + field + '</strong> debe ser un correo electrónico válido.';

              break;

              case 'AT_LEAST_ONE':

              string = 'Debes seleccionar al menos una opción para el campo <strong>' + field + '</strong>.';

              break;

              case 'YOUTUBE_VIDEO':

              string = 'El campo <strong>' + field + '</strong> debe ser un link de <strong>YouTube</strong>.';

              break;

              default:

              string = "";
          }

          return string;
      },

    /**
    * ajaxCall();
    * unify the ajax call...
    */

    ajaxCall : function(path, data = undefined, successCallback = undefined, errorCallback = undefined, type = "post", dataType = "json"){

      $.ajax({

        url: path,

        type: type,

        dataType: dataType,

        data : data,

        success: function(data) { successCallback(data); },

        error: function(xhr, status, error) { errorCallback(xhr, status, error) }

    });

    }
  }
}
