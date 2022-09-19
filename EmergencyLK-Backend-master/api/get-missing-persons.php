<?php 
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models//MissingPersons.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    // Instantiate book post object
    $post = new MissingPersons($db);

    // Check USer Locality
    $result = $post->function_Get_MissingPersons();
    // Get row count
    $num = $result->rowCount();

    // Check if any books
    if($num > 0) {
        // Post array
        $posts_arr = array();
        $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $post_item = array(
            'id' => $ID,
            'Reporter_Name' => $Reporter_Name,
            'Reporter_Mobile_Number' => $Reporter_Mobile_Number,
            'Reporter_Address' => $Reporter_Address,
            'Reporter_Email' => $Reporter_Email,
            'Person_Name' => $Person_Name,
            'Person_Type' => $Person_Type,
            'Person_District' => $Person_District,
            'Person_Height' => $Person_Height,
            'Person_Age' => $Person_Age,
            'Last_Seen_Location' => $Last_Seen_Location,
            'Gender' => $Gender,
            'Other_Info' => $Other_Info,
            'status_code' => '200'

        );

    //   array_push($posts_arr, $post_item);
      array_push($posts_arr['data'], $post_item);
    }

    // Turn to JSON & output
    echo json_encode($posts_arr);

  } else {
    echo json_encode(
        array('message'=>'Error Occuered','status_code'=>'401')
    );
  }
