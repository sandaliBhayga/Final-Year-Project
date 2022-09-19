<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models/CrimeReporting.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    //Database Table 
    $post = new CrimeReporting($db);

    //Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $post->Reporter_Name = $data->Reporter_Name;
    $post->Reporter_Mobile_Number = $data->Reporter_Mobile_Number;
    $post->Reporter_Location = $data->Reporter_Location;
    $post->Crime_Location = $data->Crime_Location;
    $post->Report_Time = $data->Report_Time;
    $post->Report_Date = $data->Report_Date;
    $post->Prority_Level = $data->Prority_Level;
    $post->More_Details = $data->More_Details;

    //Check email already registered
    $result = $post->function_Report_Crime();

    // $num = $result->rowCount();

    if($result == true){
        echo json_encode(
            array(
                'message'=>'Crime Report Success',
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