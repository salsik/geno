<?php
header('Content-type: text/xml');
$xml = new XMLWriter();
$xml->openURI("php://output");
$xml->startDocument();
$xml->setIndent(true);






include 'dbConnect.php';

$sql = "SELECT * FROM users";
$result=mysqli_query($connect,"select * from node");
 

$xml->startElement('nodes');

while($row=mysqli_fetch_array($result))
{
 
  $xml->startElement("node");

  $xml->writeAttribute('globalid', $row['global_id']);
  $xml->writeAttribute('id', $row['id']);
  $xml->writeAttribute('geno_id', $row['geno_id']);
  $xml->writeAttribute('name', $row['name']);
  $xml->writeAttribute('gender', $row['gender']);
  
  //$xml->writeRaw($row['node']);

  $xml->endElement();
}

$xml->endElement();
$xml->flush();