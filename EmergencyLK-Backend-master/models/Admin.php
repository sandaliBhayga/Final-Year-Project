<?php

    class Admin{
        //Db Stuff
        private $conn;

        //Database Tables
        private $Tsunami_Alerts = 'emg_tsunami_alerts';
        private $Earthquake_Alerts = 'emg_earthquake_alerts';
        private $Flood_Alerts = 'emg_flood_alerts';

        //User Table Fields --------------
        public $Alert_Country;
        public $Alert_Location;
        public $Alert_Date;
        public $Alert_Time;
        public $Alert_Level;
        //----------------------------

      

        //Constructor with DB
         public function __construct($db){
            $this->conn=$db;
        }


        public function function_Add_TsunamiAlert(){
                    //create query
                    $query = 'INSERT INTO '.$this->Tsunami_Alerts.'
                    SET
                        Alert_Country = :Alert_Country,
                        Alert_Location = :Alert_Location,
                        Alert_Date= :Alert_Date,
                        Alert_Time = :Alert_Time,
                        Alert_Level = :Alert_Level';        
             
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Alert_Country = htmlspecialchars(strip_tags($this->Alert_Country));
                    $this->Alert_Location = htmlspecialchars(strip_tags($this->Alert_Location));
                    $this->Alert_Date = htmlspecialchars(strip_tags($this->Alert_Date));
                    $this->Alert_Time = htmlspecialchars(strip_tags($this->Alert_Time));
                    $this->Alert_Level = htmlspecialchars(strip_tags($this->Alert_Level));

                    //Bind Data
                    $stmt->bindParam(":Alert_Country",$this->Alert_Country);
                    $stmt->bindParam(":Alert_Location",$this->Alert_Location);
                    $stmt->bindParam(":Alert_Date",$this->Alert_Date);
                    $stmt->bindParam(":Alert_Time",$this->Alert_Time);
                    $stmt->bindParam(":Alert_Level",$this->Alert_Level);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        public function function_Add_EarthquakeAlert(){
                    //create query
                    $query = 'INSERT INTO '.$this->Earthquake_Alerts.'
                    SET
                        Alert_Country = :Alert_Country,
                        Alert_Location = :Alert_Location,
                        Alert_Date= :Alert_Date,
                        Alert_Time = :Alert_Time,
                        Alert_Level = :Alert_Level';        
            
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Alert_Country = htmlspecialchars(strip_tags($this->Alert_Country));
                    $this->Alert_Location = htmlspecialchars(strip_tags($this->Alert_Location));
                    $this->Alert_Date = htmlspecialchars(strip_tags($this->Alert_Date));
                    $this->Alert_Time = htmlspecialchars(strip_tags($this->Alert_Time));
                    $this->Alert_Level = htmlspecialchars(strip_tags($this->Alert_Level));

                    //Bind Data
                    $stmt->bindParam(":Alert_Country",$this->Alert_Country);
                    $stmt->bindParam(":Alert_Location",$this->Alert_Location);
                    $stmt->bindParam(":Alert_Date",$this->Alert_Date);
                    $stmt->bindParam(":Alert_Time",$this->Alert_Time);
                    $stmt->bindParam(":Alert_Level",$this->Alert_Level);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        public function function_Add_FloodAlert(){
                    //create query
                    $query = 'INSERT INTO '.$this->Flood_Alerts.'
                    SET
                        Alert_Country = :Alert_Country,
                        Alert_Location = :Alert_Location,
                        Alert_Date= :Alert_Date,
                        Alert_Time = :Alert_Time,
                        Alert_Level = :Alert_Level';        
            
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Alert_Country = htmlspecialchars(strip_tags($this->Alert_Country));
                    $this->Alert_Location = htmlspecialchars(strip_tags($this->Alert_Location));
                    $this->Alert_Date = htmlspecialchars(strip_tags($this->Alert_Date));
                    $this->Alert_Time = htmlspecialchars(strip_tags($this->Alert_Time));
                    $this->Alert_Level = htmlspecialchars(strip_tags($this->Alert_Level));

                    //Bind Data
                    $stmt->bindParam(":Alert_Country",$this->Alert_Country);
                    $stmt->bindParam(":Alert_Location",$this->Alert_Location);
                    $stmt->bindParam(":Alert_Date",$this->Alert_Date);
                    $stmt->bindParam(":Alert_Time",$this->Alert_Time);
                    $stmt->bindParam(":Alert_Level",$this->Alert_Level);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        public function function_Get_TsunamiAlerts(){
            // Create query
            $query = 'SELECT * FROM '.$this->Tsunami_Alerts.'';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
        
            // Execute query
            $stmt->execute();

            return $stmt;
        }


        public function function_Get_EarthquakeAlerts(){
            // Create query
            $query = 'SELECT * FROM '.$this->Earthquake_Alerts.'';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
        
            // Execute query
            $stmt->execute();

            return $stmt;
        }


        public function function_Get_FloodAlerts(){
            // Create query
            $query = 'SELECT * FROM '.$this->Flood_Alerts.'';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
        
            // Execute query
            $stmt->execute();

            return $stmt;
        }

        




      

   
    }

