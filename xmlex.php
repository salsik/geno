<?php

include 'dbConnect.php';

$result=mysqli_query($connect,"select * from node");


$xml = new XMLWriter(); 
$xml->openMemory(); 
$xml->setIndent(true);
$xml->startDocument(); 


 $xml->startElement("nodes");

while($row=mysqli_fetch_array($result))
{
 
  $xml->startElement("node");
  $xml->writeElement('id', $row['id']);
  $xml->writeElement('name', $row['name']);
  $xml->writeElement('gender', $row['gender']);
  $xml->writeElement('status', $row['status']);
  $xml->writeElement('mainc', $row['main_c']);
  

  
  
	$res=mysqli_query($connect,"select * from relation where geno_id=1 and first_id=".$row['id']);

	while($rr=mysqli_fetch_array($res))
	{

	$xml->startElement("partner");

  	$xml->writeElement('id', $rr['second_id']);
  	$xml->writeElement('status', $rr['status']);
  	$xml->writeElement('currentstatus', $rr['current_status']);
	
	
	$xml->endElement();
	
	}
	
	$xml->writeElement('father', $row['father_id']);
	$xml->writeElement('mother', $row['mother_id']);
	$xml->writeElement('age', $row['age']);
	$xml->writeElement('date', $row['date']);
  
	
  //$xml->writeRaw($row['node']);

  $xml->endElement();
}


  $xml->endElement();


/*
//Write to the element
$xml->writeElement("id", "1");
$xml->writeElement("name", "Oluwafemi"); 
$xml->writeElement("address", "Cresent Drive, TX");
$xml->endElement(); //End the element

*/

//output the xml (obviosly this output could be written to a file)
//echo htmlentities($xml->outputMemory()); 
file_put_contents("myxmlfile.xml", ($xml->outputMemory())); 


