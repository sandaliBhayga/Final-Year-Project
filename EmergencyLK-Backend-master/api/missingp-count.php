<?php 
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../config/Database.php';
    include_once '../models/MissingPersons.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    // Instantiate book post object
    $post = new MissingPersons($db);


    // Check USer Locality
    $result = $post->function_Count_MissingPersons();
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
            'Count' => $MISSINGP_COUNT,
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
