<?php


include 'dbConnect.php';

$result=mysqli_query($connect,"select * from node");


$nodes = array();


while($row=mysqli_fetch_array($result))
{
 
array_push($nodes, $row['global_id']); 
array_push($nodes, $row['id']); 
array_push($nodes, $row['geno_id']); 
array_push($nodes, $row['name']); 
array_push($nodes, $row['gender']);
 
}

	//print_r($nodes);
	
 echo json_encode($nodes);
  
  
  