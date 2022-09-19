<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../../config/Database.php';
    include_once '../../models/Admin.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    //Database Table 
    $post = new Admin($db);

    //Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $post->Alert_Country = $data->Alert_Country;
    $post->Alert_Location = $data->Alert_Location;
    $post->Alert_Date = $data->Alert_Date;
    $post->Alert_Time = $data->Alert_Time;
    $post->Alert_Level = $data->Alert_Level;

    //Check email already registered
    $result = $post->function_Add_FloodAlert();

    // $num = $result->rowCount();

    if($result == true){
        echo json_encode(
            array(
                'message'=>'Alert Added',
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