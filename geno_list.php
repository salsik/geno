<?php
include 'dbConnect.php';
?>
<html>
<head>
  <title>Genograms list</title>
</head>
<link rel="stylesheet" type="text/css" href="css/geno_list.css">
<script>
  function edit(id){
    alert("row "+id+"clicked");
  };
  function del(id){
    alert("row "+id+"clicked");
  };

   function exp(id){
    alert("row "+id+"clicked");
  };
  
</script>
<body>
 <div id="wrapper">
  <h1>List of inserted Genograms</h1>

  <table id="keywords" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th><span>Genogram id</span></th>
        <th><span>Patient name</span></th>
      </tr>
    </thead>
    <tbody id="geno_table">
      <?php
        $res1 = mysqli_query($connect,"select * from node where main_c='yes'");
        $count=0;
        while ($row=mysqli_fetch_array($res1)) {?>
          <tr>
            <td><?php echo $row['geno_id']; ?></td>
            <td class="lalign"><?php echo $row['name']; ?></td>
            <td>
              <form>
              <input type="button" value = "Edit Genogram"
              onclick = "edit(<?php echo $row['geno_id']; ?>)" />
            </form>
            </td>
            <td>
              <input type="button" value = "Delete Genogram"
              onclick= "del(<?php echo $row['geno_id']; ?>)" />
            </td>
			<td>
              <input type="button" value = "export to xml"
              onclick= "exp(<?php echo $row['geno_id']; ?>)" />
            </td>
          </tr>
          <?php $count++;
        }
      ?>
    </tbody>
  </table>
 </div>
</body>
</html>
