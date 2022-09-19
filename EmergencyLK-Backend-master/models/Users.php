<?php

    class Users{
        //Db Stuff
        private $conn;

        //Database Tables
        private $User_Table = 'emg_users';

        //User Table Fields --------------
        public $Full_Name;
        public $Email;
        public $NIC_Number;
        public $Password;
        public $Gender;
        public $Address;
        public $Unique_ID;
        public $Registration_Date;
        //----------------------------

      

        //Constructor with DB
         public function __construct($db){
            $this->conn=$db;
        }


        //User Register Function --------------------------------------------------------------
        public function function_User_Register(){
                    //create query
                    $query = 'INSERT INTO '.$this->User_Table.'
                    SET
                        Full_Name = :Full_Name,
                        Email = :Email,
                        NIC_Number= :NIC_Number,
                        Password = :Password,
                        Gender = :Gender,
                        Address = :Address,
                        Unique_ID= :Unique_ID,
                        Registration_Date = :Registration_Date';        
             
                    //prepare statement
                    $stmt = $this->conn->prepare($query);

                    //clean data
                    $this->Full_Name = htmlspecialchars(strip_tags($this->Full_Name));
                    $this->Email = htmlspecialchars(strip_tags($this->Email));
                    $this->NIC_Number = htmlspecialchars(strip_tags($this->NIC_Number));
                    $this->Password = htmlspecialchars(strip_tags($this->Password));
                    $this->Gender = htmlspecialchars(strip_tags($this->Gender));
                    $this->Address = htmlspecialchars(strip_tags($this->Address));
                    $this->Unique_ID = htmlspecialchars(strip_tags($this->Unique_ID));
                    $this->Registration_Date = htmlspecialchars(strip_tags($this->Registration_Date));

                    //Bind Data
                    $stmt->bindParam(":Full_Name",$this->Full_Name);
                    $stmt->bindParam(":Email",$this->Email);
                    $stmt->bindParam(":NIC_Number",$this->NIC_Number);
                    $stmt->bindParam(":Password",$this->Password);
                    $stmt->bindParam(":Gender",$this->Gender);
                    $stmt->bindParam(":Address",$this->Address);
                    $stmt->bindParam(":Unique_ID",$this->Unique_ID);
                    $stmt->bindParam(":Registration_Date",$this->Registration_Date);

                    // Execute Query
                    if($stmt->execute()){
                        return true;
                    } 
                    return false;
        }

        //Check user email and NIC number already exists --------------------------------------------------------------
        public function function_User_Validation(){
                //create query
                $query = 'SELECT * FROM '.$this->User_Table.'
                WHERE Email = :Email OR NIC_Number = :NIC_Number';        

                //prepare statement
                $stmt = $this->conn->prepare($query);

                //clean data
                $this->Email = htmlspecialchars(strip_tags($this->Email));
                $this->NIC_Number = htmlspecialchars(strip_tags($this->NIC_Number));

                //Bind Data
                $stmt->bindParam(":Email",$this->Email);
                $stmt->bindParam(":NIC_Number",$this->NIC_Number);

                //execute query
                $stmt->execute();

                return $stmt;
        }


        //Check User Login Details --------------------------------------------------------------
        public function function_User_Login(){
            //create query
            $query = 'SELECT * FROM '.$this->User_Table.'
            WHERE Email = :Email and Password = :Password';        

            //prepare statement
            $stmt = $this->conn->prepare($query);

            $this->Email = htmlspecialchars(strip_tags($this->Email));
            $this->Password = htmlspecialchars(strip_tags($this->Password));


            //Bind Data
            $stmt->bindParam(":Email",$this->Email);
            $stmt->bindParam(":Password",$this->Password);


            $stmt->execute();

            return $stmt;
        }

        //Get User Details By Email
        public function function_Get_UserDetails(){
            // Create query
            $query = 'SELECT * FROM '.$this->User_Table.' WHERE Email = :Email';

            // Prepare statement
            $stmt = $this->conn->prepare($query);
            
            //Clean Data
            $this->Email = htmlspecialchars(strip_tags($this->Email));

            //Bind Data
            $stmt->bindParam(":Email",$this->Email);
    
            // Execute query
            $stmt->execute();

            return $stmt;
        }



      

   
    }

