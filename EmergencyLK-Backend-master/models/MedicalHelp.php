<?php

    class MedicalHelp{
        //Db Stuff
        private $conn;

        //Database Tables
        private $Medical_Help_Table = 'emg_medical_help';

        //Missing Person Table Fields --------------
        public $Help_Type;
        public $Reporter_Name;
        public $Reporter_Mobile_Number;
        public $Reporter_Address;
        public $Reporter_Email;
        public $More_Details;
        public $Help_Title;
        //----------------------------

      

        //Constructor with DB
         public function __construct($db){
            $this->conn=$db;
        }


        //Missing Person Adding Function --------------------------------------------------------------
        public function function_Report_MedicalHelp(){
                    //create query
                    $query = 'INSERT INTO '.$this->Medical_Help_Table.'
                    SET
                        Help_Title = :Help_Title,
                        Help_Type = :Help_Type,
                        Reporter_Name = :Reporter_Name,
                        Reporter_Mobile_Number= :Reporter_Mobile_Number,
                        Reporter_Address = :Reporter_Address,
                        Reporter_Email = :Reporter_Email,
                        More_Details = :More_Details';        
             
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Help_Title = htmlspecialchars(strip_tags($this->Help_Title));
                    $this->Help_Type = htmlspecialchars(strip_tags($this->Help_Type));
                    $this->Reporter_Name = htmlspecialchars(strip_tags($this->Reporter_Name));
                    $this->Reporter_Mobile_Number = htmlspecialchars(strip_tags($this->Reporter_Mobile_Number));
                    $this->Reporter_Address = htmlspecialchars(strip_tags($this->Reporter_Address));
                    $this->Reporter_Email = htmlspecialchars(strip_tags($this->Reporter_Email));
                    $this->More_Details = htmlspecialchars(strip_tags($this->More_Details));

                    //Bind Data
                    $stmt->bindParam(":Help_Title",$this->Help_Title);
                    $stmt->bindParam(":Help_Type",$this->Help_Type);
                    $stmt->bindParam(":Reporter_Name",$this->Reporter_Name);
                    $stmt->bindParam(":Reporter_Mobile_Number",$this->Reporter_Mobile_Number);
                    $stmt->bindParam(":Reporter_Address",$this->Reporter_Address);
                    $stmt->bindParam(":Reporter_Email",$this->Reporter_Email);
                    $stmt->bindParam(":More_Details",$this->More_Details);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        //Missing Person Count Function --------------------------------------------------------------
        public function function_Count_MedicalHelp(){
            //create query
            $query = 'SELECT COUNT(*)  AS HELP_COUNT FROM '.$this->Medical_Help_Table.'';        

            //prepare statement
            $stmt = $this->conn->prepare($query);

            //execute query
            $stmt->execute();

            return $stmt;
        }

        //Get All Missing Persons Details --------------------------------------------------------------
        public function function_Get_MedicalHelps(){
        // Create query
        $query = 'SELECT * FROM '.$this->Medical_Help_Table.'';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
        }





      

   
    }

