<?php

include("DataLang.class.php");
include("DataSantos.class.php");

  if(isset($_POST['getServerData'])){
    $objDataSantos = new DataSantos();
    echo json_encode($objDataSantos->getData());
  }

  if(isset($_POST['getbuttonData'])){
    $objDataSantos = new DataSantos();
    echo json_encode($objDataSantos->getButtonData($_POST['getButtonId']));
  }


  if(isset($_POST['getLangData'])){
    $objDataLang = new DataLang();
    echo json_encode($objDataLang->getLangData());
  }

  
  if(isset($_POST['getLangButtonData'])){
    $objDataLang = new DataLang();
    echo json_encode($objDataLang->getLangButtonData($_POST['getButtonId']));
  }


?>
