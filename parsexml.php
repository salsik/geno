<?php



include 'dbConnect.php';

if (!isset($_POST['filename']))
	die("Error: no post parameters");

	$filename = $_POST['filename'] ;
	
   $data = simplexml_load_file($filename) or die("Error: Cannot create object");


	$geno_id= time() ;

	for($i=0 ; $i< count($data) ; $i++)
	{
	   echo $data->node[$i]->id ." , ";
	   echo $data->node[$i]->name ." , ";
	   echo $data->node[$i]->gender ." , ";
	   echo $data->node[$i]->status ." , ";
	   echo $data->node[$i]->mainc ." , ";


	   if($data->node[$i]->father =="")
		  $data->node[$i]->father =-1;
	  if($data->node[$i]->mother =="")
		  $data->node[$i]->mother =-1;

	 $insertTable= mysqli_query($connect,"insert into node (id,geno_id,name,gender,father_id,mother_id,age,date,status,main_c) values ('".$data->node[$i]->id."','".$geno_id."','".$data->node[$i]->name."','".$data->node[$i]->gender."','".$data->node[$i]->father."','".$data->node[$i]->mother."','".$data->node[$i]->age."','".$data->node[$i]->date."','".$data->node[$i]->status."','".$data->node[$i]->mainc."'
	);");


	//date("Y-m-d H:i:s", strtotime($data->node[$i]->date))


	if($insertTable!=null)
		echo(" suceess <br>");
	else
	{
		   printf("Error - SQLSTATE %s.\n", mysqli_error($connect));
	       //echo "father ". $data->node[$i]->father . "<<<>>>";

	}

	   echo "partners : ".count($data->node[$i]->partner);


	 $arr_part=[];




    for($k=0 ; $k< count($data->node[$i]->partner); $k++)
	{

	 echo "( " ;
	   echo $data->node[$i]->partner[$k]->id ." , ";

	   echo $data->node[$i]->partner[$k]->status ." , ";
	   echo $data->node[$i]->partner[$k]->currentstatus ." ";
	   echo " ), ";


	   $newquery= mysqli_query($connect,"insert into relation (geno_id,first_id,second_id,status,current_status) values ('".$geno_id."','".$data->node[$i]->id."','".$data->node[$i]->partner[$k]->id."','".$data->node[$i]->partner[$k]->status."','".$data->node[$i]->partner[$k]->currentstatus."'

		);");


	if($newquery!=null)
		echo(" suceess ...");
	else

		echo(" unsuceess < >");




	}


	   echo $data->node[$i]->age ." , ";
	   echo $data->node[$i]->date.".";


	echo "<br>";





	}
