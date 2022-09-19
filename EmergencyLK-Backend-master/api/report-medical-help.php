<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models/MedicalHelp.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    //Database Table 
    $post = new MedicalHelp($db);

    //Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $post->Help_Title = $data->Help_Title;
    $post->Help_Type = $data->Help_Type;
    $post->Reporter_Name = $data->Reporter_Name;
    $post->Reporter_Mobile_Number = $data->Reporter_Mobile_Number;
    $post->Reporter_Address = $data->Reporter_Address;
    $post->Reporter_Email = $data->Reporter_Email;
    $post->More_Details = $data->More_Details;

    //Check email already registered
    $result = $post->function_Report_MedicalHelp();

    // $num = $result->rowCount();

    if($result == true){
        echo json_encode(
            array(
                'message'=>'Medical Help Added',
                'status_code'=>'200'
            )
        );
    }else{
        echo json_encode(
            array(
                'message'=>'Error Occured',
                'status_code'=>'401'
            )
        );
    
    }