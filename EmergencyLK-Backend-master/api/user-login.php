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

    $post->Email = $data->Email;
    $post->Password = md5($data->Password);

    $result = $post->function_User_Login();

    $num = $result->rowCount();

    if($num > 0){
            echo json_encode(
                array(
                'message'=>'Login Successfull',
                 'status_code'=>'200'
                 )
            );
    
    }else{
        echo json_encode(
            array(
                'message'=>'Invalid Credentials',
                'status_code'=>'401'
                )
        );
    }






