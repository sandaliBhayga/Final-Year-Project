<?php

    class CrimeReporting{
        //Db Stuff
        private $conn;

        //Database Tables
        private $Crime_Table = 'emg_crime_reports';

        //Crime Reports Table Fields --------------
        public $Reporter_Name;
        public $Reporter_Mobile_Number;
        public $Reporter_Location;
        public $Crime_Location;
        public $Report_Time;
        public $Report_Date;
        public $Prority_Level;
        public $More_Details;
        //----------------------------

      

        //Constructor with DB
         public function __construct($db){
            $this->conn=$db;
        }


        //Crime Reporting Function--------------------------------------------------------------
        public function function_Report_Crime(){
                    //create query
                    $query = 'INSERT INTO '.$this->Crime_Table.'
                    SET
                        Reporter_Name = :Reporter_Name,
                        Reporter_Mobile_Number = :Reporter_Mobile_Number,
                        Reporter_Location= :Reporter_Location,
                        Crime_Location = :Crime_Location,
                        Report_Time = :Report_Time,
                        Report_Date = :Report_Date,
                        Prority_Level= :Prority_Level,
                        More_Details = :More_Details';        
             
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Reporter_Name = htmlspecialchars(strip_tags($this->Reporter_Name));
                    $this->Reporter_Mobile_Number = htmlspecialchars(strip_tags($this->Reporter_Mobile_Number));
                    $this->Reporter_Location = htmlspecialchars(strip_tags($this->Reporter_Location));
                    $this->Crime_Location = htmlspecialchars(strip_tags($this->Crime_Location));
                    $this->Report_Time = htmlspecialchars(strip_tags($this->Report_Time));
                    $this->Report_Date = htmlspecialchars(strip_tags($this->Report_Date));
                    $this->Prority_Level = htmlspecialchars(strip_tags($this->Prority_Level));
                    $this->More_Details = htmlspecialchars(strip_tags($this->More_Details));

                    //Bind Data
                    $stmt->bindParam(":Reporter_Name",$this->Reporter_Name);
                    $stmt->bindParam(":Reporter_Mobile_Number",$this->Reporter_Mobile_Number);
                    $stmt->bindParam(":Reporter_Location",$this->Reporter_Location);
                    $stmt->bindParam(":Crime_Location",$this->Crime_Location);
                    $stmt->bindParam(":Report_Time",$this->Report_Time);
                    $stmt->bindParam(":Report_Date",$this->Report_Date);
                    $stmt->bindParam(":Prority_Level",$this->Prority_Level);
                    $stmt->bindParam(":More_Details",$this->More_Details);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        public function function_Get_CrimeReports(){
            // Create query
            $query = 'SELECT * FROM '.$this->Crime_Table.'';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
        
            // Execute query
            $stmt->execute();

            return $stmt;
        }




      

   
    }

