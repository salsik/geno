<?php


include 'dbConnect.php';

//if(!isset($_POST['patient']))
//$_POST['patient'] ="bassel";



//echo $_POST['patient'];
$res1 = mysqli_query($connect,"select * from node where name='".$_POST['patient']."'");


//print_r($res1);


if($geo = mysqli_fetch_array($res1)){
	$result=mysqli_query($connect,"select * from node where geno_id=".$geo['geno_id']);



$nodes = array();

$i=0;

while($row=mysqli_fetch_array($result))
{
$nodes[$i] = array();
array_push($nodes[$i], $row['id']);
array_push($nodes[$i], $row['name']);
array_push($nodes[$i], $row['gender']);
array_push($nodes[$i], $row['status']);
array_push($nodes[$i], $row['main_c']);
$result1 = mysqli_query($connect,"select * from twins where geno_id=".$row['geno_id']." and first_id=".$row['id']);
$twins = array();
while($row2 = mysqli_fetch_array($result1)){
	array_push($twins,$row2['second_id']);
}

$result1 = mysqli_query($connect,"select * from relation where geno_id=".$row['geno_id']." and first_id=".$row['id']);
$partners_id = array();
$partners_status = array();
$partners_cstatus = array();
while($row2=mysqli_fetch_array($result1))
{
	array_push($partners_id,$row2['second_id']);
	if($row2['status'] == "marriage"){
		array_push($partners_status,"M");
	}
	if($row2['status'] == "relationship"){
		array_push($partners_status,"R");
	}
	if($row2['status'] == "commited"){
		array_push($partners_status,"C");
	}
	if($row2['current_status'] == "divorced"){
		array_push($partners_cstatus,"D");
	}
	if($row2['current_status'] == "sipirated"){
		array_push($partners_cstatus,"S");
	}
	if($row2['current_status'] == "none"){
		array_push($partners_cstatus,"T");
	}
}
array_push($nodes[$i], $partners_id);
array_push($nodes[$i], $partners_status);
array_push($nodes[$i], $partners_cstatus);

array_push($nodes[$i], $row['father_id']);
array_push($nodes[$i], $row['mother_id']);
array_push($nodes[$i], $row['age']);
array_push($nodes[$i], $row['date']);

array_push($nodes[$i], $twins);


 $i++;
}

	//print_r($nodes);

 echo json_encode($nodes);
}
