<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models/MissingPersons.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    //Database Table 
    $post = new MissingPersons($db);

    //Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $post->Reporter_Name = $data->Reporter_Name;
    $post->Reporter_Mobile_Number = $data->Reporter_Mobile_Number;
    $post->Reporter_Address = $data->Reporter_Address;
    $post->Reporter_Email = $data->Reporter_Email;
    $post->Person_Name = $data->Person_Name;
    $post->Person_Type = $data->Person_Type;
    $post->Person_District = $data->Person_District;
    $post->Person_Height = $data->Person_Height;
    $post->Person_Age = $data->Person_Age;
    $post->Last_Seen_Location = $data->Last_Seen_Location;
    $post->Gender = $data->Gender;
    $post->Other_Info = $data->Other_Info;

    //Check email already registered
    $result = $post->function_Report_MissingPerson();

    // $num = $result->rowCount();

    if($result == true){
        echo json_encode(
            array(
                'message'=>'Missing Person Report Added',
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