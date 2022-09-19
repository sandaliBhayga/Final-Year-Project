<?php 
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods:GET');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    include_once '../../config/Database.php';
    include_once '../../models/Admin.php';

    //DB Connection
    $database = new Database();
    $db=$database->connect();

    $post = new Admin($db);

    $result = $post->function_Get_EarthquakeAlerts();
    
    // Get row count
    $num = $result->rowCount();

    if($num > 0) {
        // Post array
        $posts_arr = array();
        $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $post_item = array(
            'id' => $ID,
            'Alert_Country' => $Alert_Country,
            'Alert_Location' => $Alert_Location,
            'Alert_Date' => $Alert_Date,
            'Alert_Time' => $Alert_Time,
            'Alert_Level' => $Alert_Level,
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
