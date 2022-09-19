<?php

    class MissingPersons{
        //Db Stuff
        private $conn;

        //Database Tables
        private $Missing_Persons_Table = 'emg_missing_persons';

        //Missing Person Table Fields --------------
        public $Reporter_Name;
        public $Reporter_Mobile_Number;
        public $Reporter_Address;
        public $Reporter_Email;
        public $Person_Name;
        public $Person_Type;
        public $Person_District;
        public $Person_Height;
        public $Person_Age;
        public $Last_Seen_Location;
        public $Gender;
        public $Other_Info;
        //----------------------------

      

        //Constructor with DB
         public function __construct($db){
            $this->conn=$db;
        }


        //Missing Person Adding Function --------------------------------------------------------------
        public function function_Report_MissingPerson(){
                    //create query
                    $query = 'INSERT INTO '.$this->Missing_Persons_Table.'
                    SET
                        Reporter_Name = :Reporter_Name,
                        Reporter_Mobile_Number = :Reporter_Mobile_Number,
                        Reporter_Address= :Reporter_Address,
                        Reporter_Email = :Reporter_Email,
                        Person_Name = :Person_Name,
                        Person_Type = :Person_Type,
                        Person_District = :Person_District,
                        Person_Height= :Person_Height,
                        Person_Age = :Person_Age,
                        Last_Seen_Location = :Last_Seen_Location,
                        Gender= :Gender,
                        Other_Info = :Other_Info';        
             
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Reporter_Name = htmlspecialchars(strip_tags($this->Reporter_Name));
                    $this->Reporter_Mobile_Number = htmlspecialchars(strip_tags($this->Reporter_Mobile_Number));
                    $this->Reporter_Address = htmlspecialchars(strip_tags($this->Reporter_Address));
                    $this->Reporter_Email = htmlspecialchars(strip_tags($this->Reporter_Email));
                    $this->Person_Name = htmlspecialchars(strip_tags($this->Person_Name));
                    $this->Person_Type = htmlspecialchars(strip_tags($this->Person_Type));
                    $this->Person_District = htmlspecialchars(strip_tags($this->Person_District));
                    $this->Person_Height = htmlspecialchars(strip_tags($this->Person_Height));
                    $this->Person_Age = htmlspecialchars(strip_tags($this->Person_Age));
                    $this->Last_Seen_Location = htmlspecialchars(strip_tags($this->Last_Seen_Location));
                    $this->Gender = htmlspecialchars(strip_tags($this->Gender));
                    $this->Other_Info = htmlspecialchars(strip_tags($this->Other_Info));

                    //Bind Data
                    $stmt->bindParam(":Reporter_Name",$this->Reporter_Name);
                    $stmt->bindParam(":Reporter_Mobile_Number",$this->Reporter_Mobile_Number);
                    $stmt->bindParam(":Reporter_Address",$this->Reporter_Address);
                    $stmt->bindParam(":Reporter_Email",$this->Reporter_Email);
                    $stmt->bindParam(":Person_Name",$this->Person_Name);
                    $stmt->bindParam(":Person_Type",$this->Person_Type);
                    $stmt->bindParam(":Person_District",$this->Person_District);
                    $stmt->bindParam(":Person_Height",$this->Person_Height);
                    $stmt->bindParam(":Person_Age",$this->Person_Age);
                    $stmt->bindParam(":Last_Seen_Location",$this->Last_Seen_Location);
                    $stmt->bindParam(":Gender",$this->Gender);
                    $stmt->bindParam(":Other_Info",$this->Other_Info);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        //Missing Person Count Function --------------------------------------------------------------
        public function function_Count_MissingPersons(){
                //create query
                $query = 'SELECT COUNT(*)  AS MISSINGP_COUNT FROM '.$this->Missing_Persons_Table.'';        

                //prepare statement
                $stmt = $this->conn->prepare($query);

                //execute query
                $stmt->execute();

                return $stmt;
        }

         //Get All Missing Persons Details --------------------------------------------------------------
        public function function_Get_MissingPersons(){
            // Create query
            $query = 'SELECT * FROM '.$this->Missing_Persons_Table.'';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
    
            // Execute query
            $stmt->execute();

            return $stmt;
        }


      

   
    }

