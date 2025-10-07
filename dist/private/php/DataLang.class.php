<?php

class DataLang
{


  private $arrayDataResponse = array(
    "es"  => array(
      "title"            => "Hermanos Lasallanos",
      "esButton"         => "Español",
      "enButton"         => "Inglés",
      "filters"          => array("Todos","Destacados","Santos y Beatos","Hermanos de la Argentina"),
      "filtersValue"     => array("*","destacados","santos","hermanos"),
    ),
    "en"  => array(
        "title"            => "De La Salle Brothers",
        "esButton"         => "Spanish",
        "enButton"         => "English",
        "filters"          => array("All","Highlighted","Saints and Blesseds","Brothers of Argentina"),
        "filtersValue"     => array("*","destacados","santos","hermanos"),
      ),
  );


  public function __construct()
  {
  }


  public function getLangData()
  {
    return $this->arrayDataResponse;
  }

  public function getLangButtonData($contentID)
  {
    return $this->arrayDataResponse[$contentID];
  }
}// End class
