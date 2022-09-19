<?php

    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models/Users.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    //Database Table 
    $post = new Users($db);

    //Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $post->Full_Name = $data->Full_Name;
    $post->Email = $data->Email;
    $post->NIC_Number = $data->NIC_Number;
    $post->Password = md5($data->Password);
    $post->Gender = $data->Gender;
    $post->Address = $data->Address;
    $post->Unique_ID = $data->Unique_ID;
    $post->Registration_Date = $data->Registration_Date;

    //Check email already registered
    $result = $post->function_User_Validation();

    $num = $result->rowCount();

    if($num > 0){
        echo json_encode(
            array('message'=>'User Already Exists','status_code'=>'401')
        );
    }else{
        $post->function_User_Register();
        echo json_encode(
            array('message'=>'Registration Sucessfull','status_code'=>'200')
        );
    }