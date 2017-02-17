<?php
include 'dbConnect.php';
$geno_id = $_POST['geno_id'];

echo $geno_id;
if(!isset($_POST['age'])) $_POST['age']="-1";
if(!isset($_POST['date'])) $_POST['date']="-1";
$queryst = "insert into node (id,geno_id,name,gender,father_id,mother_id,age,date,status,main_c) values ('".$_POST['id']."','".$geno_id."','".$_POST['name']."','".$_POST['gender']."','".$_POST['father']."','".$_POST['mother']."','".$_POST['age']."','".$_POST['date']."','".$_POST['status']."','".$_POST['mainc']."');";
$query = mysqli_query($connect,$queryst);
echo $queryst;
if(isset($_POST['twins'])){
	for($i = 0;$i < $_POST['twins'].length; $i++){
		$newquery= mysqli_query($connect,"insert into twins (geno_id,first_id,second_id) values ('".$geno_id."','".$_POST['id']."','".$_POST['twins'][$k]."'
	 );");
	}
}
if(isset($_POST['partners'])){
	print_r($_POST['partners']);
	for($k=0 ; $k< count($_POST['partners']); $k++)
		{
			$status = "marriage";
			$cstatus = "none";
			if(isset($_POST['partners_status']) && $_POST['partners_status'][$k] == "M"){
				$status = "marriage";
			}
			if(isset($_POST['partners_status']) && $_POST['partners_status'][$k] == "R"){
				$status = "relationship";
			}
			if(isset($_POST['partners_status']) && $_POST['partners_status'][$k] == "C"){
				$status = "commited";
			}
			if(isset($_POST['current_status']) && $_POST['current_status'][$k] == "D"){
				$cstatus = "divorced";
			}
			if(isset($_POST['current_status']) && $_POST['current_status'][$k] == "S"){
				$cstatus = "sipirated";
			}
			echo $_POST['partners'][$k];
		   $newquery= mysqli_query($connect,"insert into relation (geno_id,first_id,second_id,status,current_status) values ('".$geno_id."','".$_POST['id']."','".$_POST['partners'][$k]."','".$status."','".$cstatus."'
			);");
		}
}
