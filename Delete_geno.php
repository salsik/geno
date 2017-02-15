<?php
  include 'dbConnect.php';
  if(isset($_POST['geno_is'])){
    $queryst = "delete from 'node' where geno_id=" + $_POST['geno_id'] + ";";
    $query = mysqli_query($connect,$queryst);
    $queryst = "delete from 'relation' where geno_id=" + $_POST['geno_id'] + ";";
    $query = mysqli_query($connect,$queryst);
  }
 ?>
