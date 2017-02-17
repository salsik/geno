var num = 0;
function clear_fields(){
  document.getElementById("name_id").value="";
  document.getElementById("gay_id").checked = false;
  document.getElementById("twins_id").value="";
  document.getElementById("male_id").checked = true;
  document.getElementById("alive_id").checked = true;
  document.getElementById("mainc_no").checked = true;
  document.getElementById("mother_id").value="";
  document.getElementById("father_id").value = "";
  document.getElementById("partners_id").value = "";
  document.getElementById("status_id").value = "";
  document.getElementById("cstatus_id").value = "";
  document.getElementById("age_id").value = "";
  document.getElementById("bdate_id").value = "";
  document.getElementById("ddate_id").value = "";
}
edit_id=0;
function preview_node(id){
  node = nodes[id];
  edit_id = id;
  if(node["n"] !== undefined){
    document.getElementById("name_id").value=node["n"];
  }
  if(node["s"]==="M" || node["s"]==="SM"){
    document.getElementById("male_id").checked = true;
  }
  if(node["s"]==="F" || node["s"]==="SF"){
    document.getElementById("female_id").checked = true;
  }
  if(node["a"] !== undefined && node["a"] === "S"){
    document.getElementById("dead_id").checked = true;
  }
  else{
    document.getElementById("alive_id").checked = true;
  }
  if(node["s"] === "SM" || node["s"] === "SF"){
    main_c_exist = false;
    document.getElementById("mainc_yes").checked = true;
  }
  else{
    document.getElementById("mainc_no").checked = true;
  }
  if(node["s"] === "GM" || node["s"] === "GF" || node["s"] === "GSM" || node["s"] === "GSF"){
    document.getElementById("gay_id").checked = true;
  }
  if(node["m"] !==undefined){
    document.getElementById("mother_id").value=node["m"];
  }
  if(node["f"] !==undefined){
    document.getElementById("father_id").value=node["f"];
  }
  if(node["ux"] !== undefined){
    i=0;
    for(i=0;i<node["ux"].length-1;i++){
      document.getElementById("partners_id").value += node["ux"][i] + ",";
      document.getElementById("status_id").value += node["rs"][i] + ",";
      document.getElementById("cstatus_id").value += node["st"][i] + ",";
    }
    document.getElementById("partners_id").value += node["ux"][i];
    document.getElementById("status_id").value += node["rs"][i];
    document.getElementById("cstatus_id").value += node["st"][i];
  }
  if(node["vir"] !== undefined){
    i=0;
    for(i=0;i<node["vir"].length-1;i++){
      document.getElementById("partners_id").value += node["vir"][i] + ",";
      document.getElementById("status_id").value += node["rs"][i] + ",";
      document.getElementById("cstatus_id").value += node["st"][i] + ",";
    }
    document.getElementById("partners_id").value += node["vir"][i];
    document.getElementById("status_id").value += node["rs"][i];
    document.getElementById("cstatus_id").value += node["st"][i];
  }
  if(node["age_id"] !== undefined){
    document.getElementById("age_id").value = node["age"];
  }
  if(node["bdate"] !== undefined){
    document.getElementById("bdate_id").value = node["bdate"];
  }
  if(node["ddate"] !== undefined){
    document.getElementById("ddate_id").value = node["ddate"];
  }
  document.getElementById("add_edit_node_button").innerHTML = "Edit node";
  document.getElementById("add_edit_node_button").setAttribute('onclick', "edit_node()");
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}
function edit_node(){
  console.debug("Edit_node Function");
  var node = [];
  node["key"] = edit_id;
  node["noc"] ="1";
  node["n"] = document.getElementById("name_id").value;
  if(document.getElementById("male_id").checked){
    node["s"] = "M";
  }
  if(document.getElementById("female_id").checked){
    node["s"] = "F";
  }
  if(document.getElementById("mainc_yes").checked){
    if(main_c_exist){
      alert("There is another main charecter in this genogram");
      return;
    }
    main_c_exist = true;
    node["s"] = "S"+node["s"];
  }
  if(document.getElementById("gay_id").checked){
    node["s"] = "G"+node["s"];
  }
  if(document.getElementById("gay_id").checked){
    node["s"] = "G"+node["s"];
  }
  if(document.getElementById("dead_id").checked){
    node["a"] = "S";
  }
  if(document.getElementById("twins_id").value.length !== 0){
    node["twins"] = document.getElementById("twins_id").value.split(",");
  }
  if(document.getElementById("mother_id").value.length !== 0){
    node["m"] = document.getElementById("mother_id").value;
  }
  document.getElementById("mother_id").value="";
  if(document.getElementById("father_id").value.length !== 0){
    node["f"] = document.getElementById("father_id").value;
  }
  document.getElementById("father_id").value = "";
  if(document.getElementById("partners_id").value.length !== 0){
    if(node["s"] === "M" || node["s"] === "SM"){
      res = document.getElementById("partners_id").value.split(",");
      node["ux"] = res;
    }
    if(node["s"] === "F" || node["s"] === "SF"){
      node["vir"] = document.getElementById("partners_id").value.split(",");;
    }
    var part = document.getElementById("partners_id").value.split(",");
    var sts = document.getElementById("status_id").value.split(",");
    var csts = document.getElementById("cstatus_id").value.split(",");
    if(part.length > sts.length){
      alert("Please Enter Status for each partner!");
      return;
    }
    if(part.length > csts.length){
      alert("Please Enter Current Status for each partner!");
      return;
    }
    node["rs"] = document.getElementById("status_id").value.split(",");
    node["st"] = document.getElementById("cstatus_id").value.split(",");
  }
  node["age"] = document.getElementById("age_id").value;
  node["bdate"] = document.getElementById("bdate_id").value;
  if(document.getElementById("ddate_id").value.length !== 0){
    node["bdate"] = node["bdate"]+"-"+document.getElementById("ddate_id").value;
  }
  nodes[edit_id] = node;
  document.getElementById("add_edit_node_button").innerHTML = "Add node";
  document.getElementById("add_edit_node_button").setAttribute('onclick', "add_node()");
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  clear_fields();
  update_table();
}
main_c_exist = false;
function add_node(){
  var node = [];
  node["key"] = num;
  node["noc"] ="1";
  node["n"] = document.getElementById("name_id").value;
  if(document.getElementById("male_id").checked){
    node["s"] = "M";
  }
  if(document.getElementById("female_id").checked){
    node["s"] = "F";
  }
  if(document.getElementById("mainc_yes").checked){
    if(main_c_exist){
      alert("There is another main charecter in this genogram");
      return;
    }
    main_c_exist = true;
    node["s"] = "S"+node["s"];
  }
  if(document.getElementById("gay_id").checked){
    node["s"] = "G"+node["s"];
  }
  if(document.getElementById("dead_id").checked){
    node["a"] = "S";
  }
  if(document.getElementById("mother_id").value.length !== 0){
    node["m"] = document.getElementById("mother_id").value;
  }
  document.getElementById("mother_id").value="";
  if(document.getElementById("father_id").value.length !== 0){
    node["f"] = document.getElementById("father_id").value;
  }
  document.getElementById("father_id").value = "";
  if(document.getElementById("twins_id").value.length !== 0){
    node["twins"] = document.getElementById("twins_id").value.split(",");
    document.getElementById("twins_id").value = "";
  }
  if(document.getElementById("partners_id").value.length !== 0){
    if(node["s"] === "M" || node["s"] === "SM"){
      res = document.getElementById("partners_id").value.split(",");
      node["ux"] = res;
    }
    if(node["s"] === "F" || node["s"] === "SF"){
      node["vir"] = document.getElementById("partners_id").value.split(",");;
    }
    var part = document.getElementById("partners_id").value.split(",");
    var sts = document.getElementById("status_id").value.split(",");
    var csts = document.getElementById("cstatus_id").value.split(",");
    if(part.length > sts.length){
      alert("Please Enter Status for each partner!");
      clear_fields();
      return;
    }
    if(part.length > csts.length){
      alert("Please Enter Current Status for each partner!");
      clear_fields();
      return;
    }
    node["rs"] = document.getElementById("status_id").value.split(",");
    node["st"] = document.getElementById("cstatus_id").value.split(",");
  }
  if(document.getElementById("age_id").value.length !== 0){
    node["age"] = document.getElementById("age_id").value;
  }
  // else{
  //   alert("you must insert age!");
  //   return;
  // }
  if(document.getElementById("bdate_id").value.length !== 0){
    node["bdate"] = document.getElementById("bdate_id").value;
  }
  // else{
  //   alert("you must insert birthday date!");
  //   return;
  // }
  if(document.getElementById("ddate_id").value.length !== 0){
    node["bdate"] = node["bdate"]+"-"+document.getElementById("ddate_id").value;
  }
  console.debug(node);
  nodes.splice(num,0,node);
  num++;
  clear_fields();
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  update_table();
};
function update_table(){
  console.debug(nodes);
  var table = document.getElementById("table_body");
  table.innerHTML = "";
  for(i=0;i<nodes.length;i++){
    node = nodes[i];
    if(node["key"] === undefined)continue;
    var row = table.insertRow(i);
    var cell = row.insertCell(0);
    cell.innerHTML = node["key"];
    cell = row.insertCell(1);
    cell.innerHTML = node["n"];
    if(node["s"] === "SM" || node["s"] ==="SF"){
      cell.style.color = "#FF0000";
    }
    cell = row.insertCell(2);
    cell.innerHTML = node["f"];
    cell = row.insertCell(3);
    cell.innerHTML = node["m"];
    cell = row.insertCell(4);
    cell.innerHTML = "<button onclick='delete_node("+node["key"]+")'>Delete Node</button>";
    cell = row.insertCell(5);
    cell.innerHTML = "<button onclick='preview_node("+node["key"]+")'>Edit Node</button>";

  }
}
function delete_node(id){
  nodes.splice(id,1);
  num--;
  for(i=0;i<nodes.length;i++){
    if(nodes[i]["f"]===id || nodes[i]["m"]===id){
      nodes[i]["f"].splice(0,1);
      nodes[i]["m"].splice(0,1);
    }
    if(nodes[i]["ux"]!==undefined){
      for(j=0;j<nodes["ux"].length;j++){
        if(ndoes[i]["ux"][j]===id){
          nodes[i]["ux"].splice(j,1);
          nodes[i]["rs"].splice(j,1);
          nodes[i]["st"].splice(j,1);
          j--;
        }
        if(nodes["ux"]===undefined)break;
      }
    }
    if(nodes[i]["vir"]!==undefined){
      for(j=0;j<nodes["vir"].length;j++){
        if(ndoes[i]["vir"][j]===id){
          nodes[i]["vir"].splice(j,1);
          nodes[i]["rs"].splice(j,1);
          nodes[i]["st"].splice(j,1);
          j--;
        }
        if(nodes[i]["vir"]===undefined)break;
      }
    }
  }
  for(i=0;i<nodes.length;i++){
    if(nodes[i]["key"]>id)nodes[i]["key"]--;
    if(nodes[i]["f"]>id)nodes[i]["f"]--;
    if(nodes[i]["m"]>id)nodes[i]["m"]--;
    if(nodes[i]["ux"]!==undefined){
      for(j=0;j<nodes["ux"].length;j++){
        if(ndoes[i]["ux"][j]>id){
          nodes[i]["ux"][j]--;
        }
      }
    }
    if(nodes[i]["vir"]!==undefined){
      for(j=0;j<nodes["vir"].length;j++){
        if(ndoes[i]["vir"][j]>id){
          nodes[i]["vir"][j]--;
        }
      }
    }
  }
  update_table();
}
                                                  //load from database
function load(){
  $.ajax({
      url:"ajaxarr.php",
      type:"POST",
      success:function(msg){
          console.debug(msg);
          for(var i=0; i<msg.length;i++){
            node = [];
            node["key"] = msg[i][0];
            node["n"] = msg[i][1];
            node["s"] == msg[i][2];
            if(msg[i][3] === "dead"){
              node["a"] = "S";
            }
            if(node["s"] === "M" || node["s"] === "SM"){
              node["ux"] = msg[i][5];
            }
            else{
              node["vir"] = msg[i][5];
            }
            node["rs"] = msg[i][6];
            node["st"] = msg[i][7];
            if(msg[i][8]!=="-1"){
              node["f"] = msg[i][8];
            }
            if(msg[i][9]!=="-1"){
              node["m"] = msg[i][9];
            }
            if(msg[i][10]!="-1")
              node["age"] = msg[i][10];
            if(msg[i][11]!="-1")
              node["bdate"] = msg[i][11];
            node["noc"] = "1";
            nodes.push(node);
          }
      },
      dataType:"JSON"
  });
  console.debug(nodes);
}
function search()
{
  nodes = [];
  $.post('ajaxarr.php', { patient: document.getElementById("patientname").value},
    function(msg){
          console.debug(msg);
            for(var i=0; i<msg.length;i++){
              node = [];
              node["key"] = msg[i][0];
              node["n"] = msg[i][1];
              if(msg[i][2] === "m"){
                node["s"] = "M";
              }
              if(msg[i][2] === "f"){
                node["s"] = "F";
              }
              if(msg[i][3] === "dead"){
                node["a"] = "S";
              }
              if(msg[i][4] === "yes"){
                if(node["s"] === "M")node["s"] = "SM";
                else node["s"] = "SF";
              }
              if(node["s"] === "M" || node["s"] === "SM"){
                node["ux"] = msg[i][5];
              }
              else{
                node["vir"] = msg[i][5];
              }
              node["rs"] = msg[i][6];
              node["st"] = msg[i][7];
              if(msg[i][8]!=="-1"){
                node["f"] = msg[i][8];
              }
              if(msg[i][9]!=="-1"){
                node["m"] = msg[i][9];
              }
              node["age"] = msg[i][10];
              node["bdate"] = msg[i][11];
              node["noc"] = "1";
              nodes.push(node);
            }
            init();

  },"json").fail(function(){
      if(myDiagram.div!==undefined)
        myDiagram.div=null;
      alert("Patient not found");
  });

  //alert('hello  ' + document.getElementById("patientname").value );



}

function importxml()
{
  var xmlfile = document.getElementById('my_xml').click();

  document.getElementById('my_xml').onchange = function () {
    alert('Selected file: ' + this.value);
  };



}
function save(){
  d = new Date();
  if(!main_c_exist){
    alert("There must be a main charecter!");
    return;
  }
  geno_id = d.getTime();
  for(i =0 ;i<nodes.length;i++){
    if(nodes[i].n === undefined) return;
    gender = nodes[i].s;
    if(nodes[i].s === "SM" || nodes[i].s==="SF") mainc = "yes";
    else mainc = "no";
    if(nodes[i].f !== undefined)father = nodes[i].f;
    else father = "-1";
    if(nodes[i].m !== undefined)mother = nodes[i].m;
    else mother = "-1";
    if(gender==="m")partners = nodes[i].ux;
    else partners = nodes[i].vir;
    if(nodes[i].a === "S")status = "dead";
    else status = "alive";
    $.ajax({url: "upload_nodes.php",
        type: "post",
        data: {
          'id' : nodes[i].key,
          'name' : nodes[i].n,
          'gender' : gender,
          'mainc' : mainc,
          'mother' : mother,
          'father' : father,
          'partners' : partners,
          'status' : status,
          'partners_status' : nodes[i].rs,
          'current_status' : nodes[i].st,
          'age' : nodes[i].age,
          'date' : nodes[i].bdate,
          'geno_id' : geno_id

      },success: function(res){
        console.debug(res);
      }
    });

  }
  nodes = [];
  update_table();
  alert("Genogram saved successfully");
}


  function getWidth() {
      if (self.innerWidth) {
        return self.innerWidth;
      }

      if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
      }

      if (document.body) {
        return document.body.clientWidth;
      }
    }
    // if width or height are below 50, they are set to 50
    function generateImages() {

      // sanitize input
      var genoDiv = document.getElementById('myDiagramDiv');
      var width = 2000;
      var height = 1000;
      if (isNaN(width)) width = 100;
      if (isNaN(height)) height = 100;
      // Give a minimum size of 50x50
      width = Math.max(width, 50);
      height = Math.max(height, 50);



      var imgDiv = document.getElementById('myImages');
      imgDiv.innerHTML = ''; // clear out the old images, if any
      var db = myDiagram.documentBounds.copy();
      var boundswidth = db.width;
      var boundsheight = db.height;
      var imgWidth = width;
      var imgHeight = height;
      var p = db.position.copy();
      for (var i = 0; i < boundsheight; i += imgHeight) {
        for (var j = 0; j < boundswidth; j += imgWidth) {
          img = myDiagram.makeImage({
            scale: 1,
            position: new go.Point(p.x + j, p.y + i),
            size: new go.Size(imgWidth, imgHeight)
          });
          // Append the new HTMLImageElement to the #myImages div
          img.className = 'images';
          imgDiv.appendChild(img);
          imgDiv.appendChild(document.createElement('br'));
        }
      }
      window.print();
      imgDiv.innerHTML="";
    }
                                                    //READING INPUT
    var nodes = [] /*[
      { key: 0, n: "Aaron", s: "SM", m:23, f:24, ux: [1] , rs: ["R"], st: ["S"], age:50, bdate: 1960, noc:3},
      { key: 1, n: "Alice", s: "F", m:30, f:31 , age:50, bdate: 1960, noc:3},
      { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: [3] , age:50, bdate: 1960, noc:1},
      { key: 3, n: "Barbara", s: "F" , age:50, bdate: 1960, noc:1},
      { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: [5] , age:50, bdate: "19602910", noc:2},
      { key: 5, n: "Brooke", s: "F" , age:50, bdate: 1960, noc:2},
      { key: 6, n: "Claire", s: "F", m: 1, f: 0 , age:50, bdate: 1960, noc:2},
      { key: 7, n: "Carol", s: "F", m: 1, f: 0 , age:50, bdate: 1960, noc:2},
      { key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9 , age:50, bdate: 1960,noc:2},
      { key: 9, n: "Chris", s: "M" , age:50, bdate: 1960,noc:2},
      { key: 10, n: "Ellie", s: "F", m: 3, f: 2 , age:50,bdate: 1960, noc:2},
      { key: 11, n: "Dan", s: "M", m: 3, f: 2 , age:50,bdate: 1960, noc:2},
      { key: 12, n: "Elizabeth", s: "F", vir: [13] , age:50,bdate: 1960, noc:2},
      { key: 13, n: "David", s: "M", m: 5, f: 4 , age:50,bdate: 1960, noc:2},
      { key: 14, n: "Emma", s: "F", m: 5, f: 4 , age:50, noc:2,bdate: 1960},
      { key: 15, n: "Evan", s: "M", m: 8, f: 9 , age:50,bdate: 1960, noc:2},
      { key: 16, n: "Ethan", s: "M", m: 8, f: 9 , age:50,bdate: 1960, noc:2},
      { key: 17, n: "Eve", s: "F", vir: [16] , age:50,bdate: 1960, noc:2},
      { key: 18, n: "Emily", s: "F", m: 8, f: 9 , age:50,bdate: 1960, noc:2},
      { key: 19, n: "Fred", s: "M", m: 17, f: 16 , age:50,bdate: 1960, noc:2},
      { key: 20, n: "Faith", s: "F", m: 17, f: 16 , age:50,bdate: 1960, noc:2},
      { key: 21, n: "Felicia", s: "F", m: 12, f: 13 , age:50,bdate: 1960, noc:2},
      { key: 22, n: "Frank", s: "M", m: 12, f: 13 , age:50,bdate: 1960, noc:2},

      // "Aaron"'s ancestors
      { key: 23, n: "Paternal Grandfather", s: "M", m: 26, f: 25, ux: [24] ,bdate: 1960, age:50, noc:2},
      { key: 24, n: "Paternal Grandmother", s: "F" , age:50,bdate: 1960, noc:2},
      { key: 25, n: "Paternal Great", s: "M", ux: [26] , age:50,bdate: 1960, noc:2},
      { key: 26, n: "Paternal Great", s: "F", a: ["S"] , age:50,bdate: 1960, noc:2},
      { key: 27, n: "Great Uncle", s: "M", m: 26, f: 25 , age:50,bdate: 1960, noc:2},
      { key: 28, n: "Great Aunt", s: "F", m: 26, f: 25 ,age:50,bdate: 1960, noc:2},
      { key: 29, n: "Uncle", s: "M", m: 24, f: 23 ,age:50,bdate: 1960, noc:2},

      // "Alice"'s ancestors
      { key: 30, n: "Maternal Grandfather", s: "M", ux: [31] ,age:50,bdate: 1960, noc:2},
      { key: 31, n: "Maternal Grandmother", s: "F", m: 36,age:50, f: 35 ,bdate: 1960, noc:2},
      { key: 32, n: "Aunt", s: "F", m: 31, f: 30 ,age:50,bdate: 1960, noc:2},
      { key: 33, n: "Uncle", s: "M", ux: [32] ,bdate: 1960,age:50, noc:2},
      { key: 34, n: "Cousin", s: "M", m: 32, f: 33 ,bdate: 1960,age:50, noc:2},
      { key: 35, n: "Maternal Great", s: "M", ux: [36] ,bdate: 1960,age:50, noc:2},
      { key: 36, n: "Maternal Great", s: "F", m: 39, f: 40 ,bdate: 1960,age:50, noc:2},
      { key: 37, n: "Great Uncle", s: "M", m: 35, f: 36 ,bdate: 1960,age:50, noc:2},
      { key: 38, n: "Great Aunt", s: "F", m: 35, f: 36 ,bdate: 1960,age:50, noc:2},
      { key: 39, n: "Maternal Great Great", s: "F", vir: [40] ,bdate: 1960,age:50, noc:2},
      { key: 40, n: "Maternal Great Great", s: "M" ,bdate: 1960,age:50, noc:2}
    ]*/;
                                                          //CREATING GENOGRAM
    var myDiagram;
    function init() {
      nodes1 = nodes.slice(0);
      if(myDiagram !== undefined) myDiagram.div = null;
      if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;
      myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            initialAutoScale: go.Diagram.Uniform,
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true,
            allowSelect: true,
            // when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, "Auto",
                { layerName: "Grid" },  // the predefined layer that is behind everything else
                $(go.Shape, "Circle", { fill: "yellow", stroke: null }),
                $(go.Placeholder)
              ),
            layout:  // use a custom layout, defined below
              $(GenogramLayout, { direction: 90, layerSpacing: 50, columnSpacing: 10 })
          });
      // determine the color for each attribute shape
      function attrFill(a) {
        switch (a) {
          case "A": return "green";
          case "B": return "orange";
          case "C": return "red";
          case "D": return "cyan";
          case "E": return "gold";
          case "F": return "pink";
          case "G": return "blue";
          case "H": return "brown";
          case "I": return "purple";
          case "J": return "chartreuse";
          case "K": return "lightgray";
          case "L": return "magenta";
          case "S": return "black";
          default: return "transparent";
        }
      }
      // determine the geometry for each attribute shape in a male;
      // except for the slash these are all squares at each of the four corners of the overall square
      var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
      var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
      var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
      var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
      var slash = go.Geometry.parse("F M39 0 L40 0 40 1 1 40 0 40 0 39z" +
      "F M1 0 L40 39 40 40 39 40 0 1 0 0z");
      function maleGeometry(a) {
        switch (a) {
          case "A": return tlsq;
          case "B": return tlsq;
          case "C": return tlsq;
          case "D": return trsq;
          case "E": return trsq;
          case "F": return trsq;
          case "G": return brsq;
          case "H": return brsq;
          case "I": return brsq;
          case "J": return blsq;
          case "K": return blsq;
          case "L": return blsq;
          case "S": return slash;
          default: return tlsq;
        }
      }
      // determine the geometry for each attribute shape in a female;
      // except for the slash these are all pie shapes at each of the four quadrants of the overall circle
      var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
      var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
      var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
      var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
      function femaleGeometry(a) {
        switch (a) {
          case "A": return tlarc;
          case "B": return tlarc;
          case "C": return tlarc;
          case "D": return trarc;
          case "E": return trarc;
          case "F": return trarc;
          case "G": return brarc;
          case "H": return brarc;
          case "I": return brarc;
          case "J": return blarc;
          case "K": return blarc;
          case "L": return blarc;
          case "S": return slash;
          default: return tlarc;
        }
      }

      function divorce(){
        return go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
      }
      // two different node templates, one for each sex,
      // named by the category value in the node data object
      myDiagram.nodeTemplateMap.add("M",  // male
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,"Vertical",
            $(go.TextBlock,
              {
                width: 70,
                textAlign: "left",
                editable : true,
                isMultiline : false,
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center
              },
                new go.Binding("text", "bdate")
              ),
          $(go.Panel,
            { name: "ICON" },
            $(go.Shape, "Square",
              { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the overall square
                itemTemplate:
                  $(go.Panel,
                    $(go.Shape,
                      { width: 80,height: 80,stroke: null, strokeWidth: 0 },
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", maleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            ),
          $(go.Panel,go.Panel.Vertical,{
            width: 80
          },
            $(go.TextBlock,
            {
              margin : new go.Margin(35,0,0,10),
              editable : true,
              isMultiline : false,
              textAlign: "center",
              background: "white",
              font: "small-caps 15px Georgia, Serif",
              alignment: go.Spot.Center
            },
              new go.Binding("text", "age")
            )
          )

            ),$(go.TextBlock,
            {
              textAlign: "center",
              editable : true,
              isMultiline : false,
             font: "small-caps 15px Georgia, Serif",
             alignment: go.Spot.Center,
             background: "white",
             maxSize: new go.Size(NaN, NaN) },
            new go.Binding("text", "n")
            )
          ),new go.Binding("noc","noc")
        ));
        myDiagram.nodeTemplateMap.add("GM",  // gay male
          $(go.Node, "Vertical",
            { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
            $(go.Panel,"Vertical",
              $(go.TextBlock,
                {
                  width: 70,
                  textAlign: "left",
                  editable : true,
                  isMultiline : false,
                  font: "small-caps 15px Georgia, Serif",
                  alignment: go.Spot.Center
                },
                  new go.Binding("text", "bdate")
                ),
            $(go.Panel,
              { name: "ICON" },
              $(go.Shape, "Square",
                { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
              $(go.Shape, "Triangle",
                { width: 60, height: 60, strokeWidth: 2,margin: new go.Margin(10,0,0,10), fill: "white" })
              ,
              $(go.Panel,
                { // for each attribute show a Shape at a particular place in the overall square
                  itemTemplate:
                    $(go.Panel,
                      $(go.Shape,
                        { width: 80,height: 80,stroke: null, strokeWidth: 0 },
                        new go.Binding("fill", "", attrFill),
                        new go.Binding("geometry", "", maleGeometry))
                    ),
                  margin: 1
                },
                new go.Binding("itemArray", "a")
              ),
            $(go.Panel,go.Panel.Vertical,{
              width: 80
            },
              $(go.TextBlock,
              {
                margin : new go.Margin(35,0,0,10),
                editable : true,
                isMultiline : false,
                textAlign: "center",
                background: "white",
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center
              },
                new go.Binding("text", "age")
              )
            )
              ),$(go.TextBlock,
              {
                textAlign: "center",
                editable : true,
                isMultiline : false,
               font: "small-caps 15px Georgia, Serif",
               alignment: go.Spot.Center,
               background: "white",
               maxSize: new go.Size(NaN, NaN) },
              new go.Binding("text", "n")
              )
            ),new go.Binding("noc","noc")
          ));
      myDiagram.nodeTemplateMap.add("SM",  // main male
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,"Vertical",
            $(go.TextBlock,
              {
                width: 70,
                textAlign: "left",
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center,
                editable : true,
                isMultiline : false
              },
                new go.Binding("text", "bdate")
              ),
          $(go.Panel,
            { name: "ICON" },
            $(go.Shape, "Square",
              { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Shape, "Square",
              { width: 70, height: 70, margin: 5, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the overall square
                itemTemplate:
                  $(go.Panel,
                    $(go.Shape,
                      { width: 80,height: 80,stroke: null, strokeWidth: 0 },
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", maleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            ),
          $(go.Panel,go.Panel.Vertical,{
            width: 80
          },
            $(go.TextBlock,
            {
              textAlign: "center",
              font: "small-caps 15px Georgia, Serif",
              alignment: go.Spot.Center,
              editable : true,
              background: "white",
              isMultiline : false,
              margin : new go.Margin(35,0,0,10)
            },
              new go.Binding("text", "age")
            )
          )

            ),$(go.TextBlock,
            {
              textAlign: "center",
              editable : true,
              isMultiline : false,
             font: "small-caps 15px Georgia, Serif",
             alignment: go.Spot.Center,
             background: "white",
             maxSize: new go.Size(NaN, NaN) },
            new go.Binding("text", "n")
            )
          ),new go.Binding("noc","noc")
        ));
        myDiagram.nodeTemplateMap.add("GSM",  // gay main male
          $(go.Node, "Vertical",
            { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
            $(go.Panel,"Vertical",
              $(go.TextBlock,
                {
                  width: 70,
                  textAlign: "left",
                  editable : true,
                  isMultiline : false,
                  font: "small-caps 15px Georgia, Serif",
                  alignment: go.Spot.Center
                },
                  new go.Binding("text", "bdate")
                ),
            $(go.Panel,
              { name: "ICON" },
              $(go.Shape, "Square",
                { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
              $(go.Shape, "Square",
                { width: 70, height: 70, margin: 5, strokeWidth: 2, fill: "white", portId: "" }),
              $(go.Shape, "Triangle",
                { width: 60, height: 60, strokeWidth: 2,margin: new go.Margin(10,0,0,10), fill: "white" }),
              $(go.Panel,
                { // for each attribute show a Shape at a particular place in the overall square
                  itemTemplate:
                    $(go.Panel,
                      $(go.Shape,
                        { width: 80,height: 80,stroke: null, strokeWidth: 0 },
                        new go.Binding("fill", "", attrFill),
                        new go.Binding("geometry", "", maleGeometry))
                    ),
                  margin: 1
                },
                new go.Binding("itemArray", "a")
              ),
            $(go.Panel,go.Panel.Vertical,{
              width: 80
            },
              $(go.TextBlock,
              {
                margin : new go.Margin(30,0,0,10),
                editable : true,
                isMultiline : false,
                textAlign: "center",
                background: "white",
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center
              },
                new go.Binding("text", "age")
              )
            )

            ),$(go.TextBlock,
              {
                textAlign: "center",
                editable : true,
                isMultiline : false,
               font: "small-caps 15px Georgia, Serif",
               alignment: go.Spot.Center,
               background: "white",
               maxSize: new go.Size(NaN, NaN) },
              new go.Binding("text", "n")
              )
            ),new go.Binding("noc","noc")
          ));
      myDiagram.nodeTemplateMap.add("F",  // female
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,"Vertical",
            $(go.TextBlock,
              {
                width: 70,
                textAlign: "left",
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center,
                editable : true,
                isMultiline : false
              },
                new go.Binding("text", "bdate")
              ),

          $(go.Panel,
            { name: "ICON" },

            $(go.Shape, "Circle",
              { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the overall circle
                itemTemplate:
                  $(go.Panel,
                    {width: 80,height: 80},
                    $(go.Shape,
                      { width: 56.5, height: 56.5, stroke: null, strokeWidth: 0, margin: 12},
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", femaleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            ),
           $(go.Panel,go.Panel.Vertical,

            $(go.TextBlock,
            {
              margin : new go.Margin(30,0,0,30),
              textAlign: "center",
              font: "small-caps 15px Georgia, Serif",
              editable : true,
              background: "white",
              isMultiline : false
            },

              new go.Binding("text", "age")

            )
          )
          ),$(go.TextBlock,
          {
            textAlign: "center",
            editable : true,
            isMultiline : false,
           font: "small-caps 15px Georgia, Serif",
           alignment: go.Spot.Center,
           background: "white",
           maxSize: new go.Size(NaN, NaN) },
          new go.Binding("text", "n")
          )
          ),new go.Binding("noc","noc")
        ));
        myDiagram.nodeTemplateMap.add("GF",  // lesbien female
          $(go.Node, "Vertical",
            { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
            $(go.Panel,"Vertical",
              $(go.TextBlock,
                {
                  width: 70,
                  textAlign: "left",
                  font: "small-caps 15px Georgia, Serif",
                  alignment: go.Spot.Center,
                  editable : true,
                  isMultiline : false
                },
                  new go.Binding("text", "bdate")
                ),

            $(go.Panel,
              { name: "ICON" },

              $(go.Shape, "Circle",
                { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
              $(go.Shape, "Triangle",
                  { width: 50, height: 50, strokeWidth: 2,margin: new go.Margin(10,0,0,15), fill: "white"}),
              $(go.Panel,
                { // for each attribute show a Shape at a particular place in the overall circle
                  itemTemplate:
                    $(go.Panel,
                      {width: 80,height: 80},
                      $(go.Shape,
                        { width: 56.5, height: 56.5, stroke: null, strokeWidth: 0, margin: 12},
                        new go.Binding("fill", "", attrFill),
                        new go.Binding("geometry", "", femaleGeometry))
                    ),
                  margin: 1
                },
                new go.Binding("itemArray", "a")
              ),
          $(go.Panel,go.Panel.Vertical,

            $(go.TextBlock,
            {
              margin : new go.Margin(30,0,0,30),
              textAlign: "center",
              font: "small-caps 15px Georgia, Serif",
              editable : true,
              background: "white",
              isMultiline : false
            },

              new go.Binding("text", "age")

            )
          )
            ),$(go.TextBlock,
            {
              textAlign: "center",
              editable : true,
              isMultiline : false,
             font: "small-caps 15px Georgia, Serif",
             alignment: go.Spot.Center,
             background: "white",
             maxSize: new go.Size(NaN, NaN) },
            new go.Binding("text", "n")
            )
            ),new go.Binding("noc","noc")
          ));
          myDiagram.nodeTemplateMap.add("GSF",  // lesbien female
            $(go.Node, "Vertical",
              { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
              $(go.Panel,"Vertical",
                $(go.TextBlock,
                  {
                    width: 70,
                    textAlign: "left",
                    font: "small-caps 15px Georgia, Serif",
                    alignment: go.Spot.Center,
                    editable : true,
                    isMultiline : false
                  },
                    new go.Binding("text", "bdate")
                  ),

              $(go.Panel,
                { name: "ICON" },

                $(go.Shape, "Circle",
                  { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),

                $(go.Shape, "Circle",
                  { width: 70, height: 70, margin: 5, strokeWidth: 2, fill: "white", portId: "" }),
                $(go.Shape, "Triangle",
                    { width: 50, height: 50, strokeWidth: 2,margin: new go.Margin(10,0,0,15), fill: "white"}),
                $(go.Panel,
                  { // for each attribute show a Shape at a particular place in the overall circle
                    itemTemplate:
                      $(go.Panel,
                        {width: 80,height: 80},
                        $(go.Shape,
                          { width: 56.5, height: 56.5, stroke: null, strokeWidth: 0, margin: 12},
                          new go.Binding("fill", "", attrFill),
                          new go.Binding("geometry", "", femaleGeometry))
                      ),
                    margin: 1
                  },
                  new go.Binding("itemArray", "a")
                ),
            $(go.Panel,go.Panel.Vertical,

              $(go.TextBlock,
              {
                margin : new go.Margin(30,0,0,30),
                textAlign: "center",
                font: "small-caps 15px Georgia, Serif",
                editable : true,
                background: "white",
                isMultiline : false
              },

                new go.Binding("text", "age")

              )
            )
              ),$(go.TextBlock,
              {
                textAlign: "center",
                editable : true,
                isMultiline : false,
               font: "small-caps 15px Georgia, Serif",
               alignment: go.Spot.Center,
               background: "white",
               maxSize: new go.Size(NaN, NaN) },
              new go.Binding("text", "n")
              )
              ),new go.Binding("noc","noc")
            ));
      myDiagram.nodeTemplateMap.add("SF",  // main female
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,"Vertical",
            $(go.TextBlock,
              {
                width: 70,
                textAlign: "left",
                font: "small-caps 15px Georgia, Serif",
                alignment: go.Spot.Center,
                editable : true,
                isMultiline : false
              },
                new go.Binding("text", "bdate")
              ),

          $(go.Panel,
            { name: "ICON" },

            $(go.Shape, "Circle",
              { width: 80, height: 80, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Shape, "Circle",
              { width: 70, height: 70, margin: 5, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the overall circle
                itemTemplate:
                  $(go.Panel,
                    {width: 80,height: 80},
                    $(go.Shape,
                      { width: 56.5, height: 56.5, stroke: null, strokeWidth: 0, margin: 12},
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", femaleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            ),
           $(go.Panel,go.Panel.Vertical,
            {margin: new go.Margin(6,0,0,0)},
            $(go.TextBlock,
            {
              margin : new go.Margin(30,0,0,30),
              textAlign: "center",
              editable : true,
              isMultiline : false,
              background: "white",
              font: "small-caps 15px Georgia, Serif",
              alignment: go.Spot.Center},
              new go.Binding("text", "age")

            )
          )
          ),$(go.TextBlock,
          {
            textAlign: "center",
            editable : true,
            isMultiline : false,
           font: "small-caps 15px Georgia, Serif",
           alignment: go.Spot.Center,
           background: "white",
           maxSize: new go.Size(NaN, NaN) },
          new go.Binding("text", "n")
          )
          ),new go.Binding("noc","noc")
        ));
      // the representation of each label node -- nothing shows on a Marriage Link
      myDiagram.nodeTemplateMap.add("LinkLabel",
        $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 10}));
      myDiagram.linkTemplate =  // for parent-child relationships
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 0,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
          },
          $(go.Shape, { strokeWidth: 2 })
        );""
        myDiagram.linkTemplateMap.add("Divorce",
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 0,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
          },
          $(go.Shape, { strokeWidth: 2, stroke: "blue"}),
          $(go.TextBlock,{
            text: "//",font: "bold 30pt serif"
          })
        )
      );
      myDiagram.linkTemplateMap.add("SMarriage",
      $(go.Link,
        {
          routing: go.Link.Orthogonal,curviness: 0,
          layerName: "Background", selectable: false,
          fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
        },
        $(go.Shape, { strokeWidth: 2, stroke: "blue"}),
        $(go.TextBlock,{
          text: "/",font: "bold 30pt serif"
        })
      )
    );
      myDiagram.linkTemplateMap.add("Twin",
      $(go.Link,
        {
          curviness: 0,
          layerName: "Background", selectable: false,
          fromSpot: go.Spot.Center, toSpot: go.Spot.Center
        },
        $(go.Shape, { strokeWidth: 2, stroke: "blue"}),
        $(go.TextBlock,{
          width: 60,
          text: "TWINS"
        })
      )
    );
        myDiagram.linkTemplateMap.add("CRealationship",
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 15,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
          },
          $(go.Shape,  // the link's path shape
          { isPanelMain: true, stroke: "transparent", pathPattern: $(go.Shape,{geometryString: "M0 0 M4 0 L8 0 M0 5 L8 5"})})
          /*$(go.Shape, { strokeWidth: 2, stroke: "blue"})*/
        )
      );
      myDiagram.linkTemplateMap.add("CSeperated",
      $(go.Link,
        {
          routing: go.Link.Orthogonal,curviness: 0,
          layerName: "Background", selectable: false,
          fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
        },
        $(go.Shape,  // the link's path shape
        { isPanelMain: true, stroke: "transparent", pathPattern: $(go.Shape,{geometryString: "M0 0 M4 0 L8 0 M0 5 L8 5"})})
        /*$(go.Shape, { strokeWidth: 2, stroke: "blue"})*/,
        $(go.TextBlock,{
          text: "/",font: "bold 30pt serif"
        })
      )
    );
      myDiagram.linkTemplateMap.add("Marriage",  // for marriage relationships
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 0,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
          },
          $(go.Shape, { strokeWidth: 2, stroke: "blue"}))
      );
      myDiagram.linkTemplateMap.add("Inrelationship",  // for in relationship relationships
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 0,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
          },
          $(go.Shape, { strokeWidth: 2, stroke: "blue", strokeDashArray: [5,10]})
      ));
      myDiagram.linkTemplateMap.add("Sinrelationship",  // for in relationship relationships
        $(go.Link,
          {
            routing: go.Link.Orthogonal,curviness: 0,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom
          },
          $(go.Shape, { strokeWidth: 2, stroke: "blue", strokeDashArray: [5,10]}),
          $(go.TextBlock,{
            text: "/", font: "bold 30pt serif"
          })
      ));
      // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a: attributes/markers
      setupDiagram(myDiagram, nodes1,
        -1 /* focus on this person */);
    }
    // create and initialize the Diagram.model given an array of node data representing people
    function setupDiagram(diagram, array, focusId) {
      diagram.model =
        go.GraphObject.make(go.GraphLinksModel,
          { // declare support for link label nodes
            linkLabelKeysProperty: "labelKeys",
            // this property determines which template is used
            nodeCategoryProperty: "s",
            // create all of the nodes for people
            nodeDataArray: array
          });
      setupMarriages(diagram);
      setupParents(diagram);
      setupTwins(diagram);
    }
    function findMarriage(diagram, a, b) {  // A and B are node keys
      var nodeA = diagram.findNodeForKey(a);
      var nodeB = diagram.findNodeForKey(b);
      if (nodeA !== null && nodeB !== null) {
        var it = nodeA.findLinksBetween(nodeB);  // in either direction
        while (it.next()) {
          var link = it.value;
          // Link.data.category === "Marriage" means it's a marriage relationship
          if (link.data !== null && (link.data.category === "SMarriage" || link.data.category === "CSeperated" || link.data.category === "CRealationship" || link.data.category === "Divorce" || link.data.category === "Marriage" || link.data.category === "Inrelationship" || link.data.category === "Sinrelationship")) return link;
        }
      }
      return null;
    }
    function findTwins(diagram, a, b) {  // A and B are node keys
      var nodeA = diagram.findNodeForKey(a);
      var nodeB = diagram.findNodeForKey(b);
      if (nodeA !== null && nodeB !== null) {
        var it = nodeA.findLinksBetween(nodeB);  // in either direction
        while (it.next()) {
          console.debug("while");
          var link = it.value;
          // Link.data.category === "Marriage" means it's a marriage relationship
          if (link.data.category === "Twin") return link;
        }
      }
      console.debug("Creating Link");
      return null;
    }
    function setupTwins(diagram){
      var model = diagram.model;
      var nodeDataArray = model.nodeDataArray;
      for(var i = 0; i < nodeDataArray.length; i++){
        var data = nodeDataArray[i];
        var key = data.key;
        var twins = data.twins;
        console.debug(twins);
        if (twins !== undefined){
          for(var j = 0;j < twins.length; j++){
            var twin = twins[j];
            var link = findTwins(diagram, key, twin);
            if(link === null){
              var mlab = {s: "LinkLabel"}
              model.addNodeData(mlab);
              var mdata = { from: key, to: twin,labelKeys: [mlab.key], category: "Twin" };
              model.addLinkData(mdata);
            }
          }
        }
      }
    }
    // now process the node data to determine marriages
    function setupMarriages(diagram) {
      var model = diagram.model;
      var nodeDataArray = model.nodeDataArray;
      for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        if (uxs !== undefined) {
          if (typeof uxs === "number") uxs = [ uxs ];
          for (var j = 0; j < uxs.length; j++) {
            var wife = uxs[j];
            if (key === wife) {
              // or warn no reflexive marriages
              continue;
            }
            var link = findMarriage(diagram, key, wife);
            if (link === null) {
                // handeling divorces
                var sts = data.st;
                console.debug(sts);
                if(sts !== undefined && (sts[j] === "D" || sts[j] === "S")){
                  // add a label node for the marriage link
                  var mlab = { s: "LinkLabel" };
                  console.debug(mlab.key);
                  model.addNodeData(mlab);
                  // add the marriage link itself, also referring to the label node
                  var rs = data.rs;
                  var mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Divorce" };
                  if(sts[j] === "S"){
                    if(rs !== undefined && rs[j] === "R"){
                      mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Sinrelationship" }
                    }
                    if(rs !== undefined && rs[j] === "C"){
                      mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "CSeperated" }
                    }
                    if(rs !== undefined && rs[j] === "M"){
                      mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "SMarriage" }
                    }
                  }
                  model.addLinkData(mdata);
                }
                else{
                  // add a label node for the marriage link
                  var mlab = { s: "LinkLabel" };
                  console.debug(mlab.key);
                  model.addNodeData(mlab);
                  // add the marriage link itself, also referring to the label node
                  var rs = data.rs;
                  var mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Marriage" };
                  if(rs !== undefined && rs[j] === "R"){
                    mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Inrelationship" }
                  }
                  if(rs !== undefined && rs[j] === "C"){
                    mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "CRealationship" }
                  }
                  model.addLinkData(mdata);
              }
            }
          }
        }
        var virs = data.vir;
        if (virs !== undefined) {
          if (typeof virs === "number") virs = [ virs ];
          for (var j = 0; j < virs.length; j++) {
            var husband = virs[j];
            if (key === husband) {
              // or warn no reflexive marriages
              continue;
            }
            var link = findMarriage(diagram, key, husband);
            if (link === null) {
              // handeling divorces
              var sts = data.st;
              console.debug(sts[j]);
              if(sts !== undefined && (sts[j] === "D" || sts[j]==="S")){
                // add a label node for the marriage link
                var mlab = { s: "LinkLabel" };
                model.addNodeData(mlab);
                // add the marriage link itself, also referring to the label node
                var rs = data.rs;
                var mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Divorce" };
                if(sts[j] === "S"){
                  if(rs !== undefined && rs[j] === "M"){
                    mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "SMarriage" }
                  }
                  if(rs !== undefined && rs[j] === "R"){
                    mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Divorce" }
                  }
                  if(rs !== undefined && rs[j] === "C"){
                    mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "CSeperated" }
                  }
                }
                model.addLinkData(mdata);
              }
              // add a label node for the marriage link
              else{
                var mlab = { s: "LinkLabel" };
                model.addNodeData(mlab);
                // add the marriage link itself, also referring to the label node
                var rs = data.rs;
                var mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Marriage" };
                if(rs !== undefined && rs[j] === "R"){
                  mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Inrelationship" }
                }
                if(rs !== undefined && rs[j] === "C"){
                  mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "CRealationship" }
                }
                model.addLinkData(mdata);
              }
            }
          }
        }
      }
    }
    // process parent-child relationships once all marriages are known
    function setupParents(diagram) {
      var model = diagram.model;
      var nodeDataArray = model.nodeDataArray;
      for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var mother = data.m;
        var father = data.f;
        if (mother !== undefined && father !== undefined) {
          var link = findMarriage(diagram, mother, father);
          if (link === null) {
            // or warn no known mother or no known father or no known marriage between them
            if (window.console) window.console.log("unknown marriage: " + mother + " & " + father);
            continue;
          }
          var mdata = link.data;
          var mlabkey = mdata.labelKeys[0];
          var cdata = { from: mlabkey, to: key };
          myDiagram.model.addLinkData(cdata);
        }
      }
    }
    // A custom layout that shows the two families related to a person's parents
    function GenogramLayout() {
      go.LayeredDigraphLayout.call(this);
      this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
      this.spouseSpacing = 50;  // minimum space between spouses
    }
    go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);
    /** @override */
    GenogramLayout.prototype.makeNetwork = function(coll) {
      // generate LayoutEdges for each parent-child Link
      var net = this.createNetwork();
      if (coll instanceof go.Diagram) {
        this.add(net, coll.nodes, true);
        this.add(net, coll.links, true);
      } else if (coll instanceof go.Group) {
        this.add(net, coll.memberParts, false);
      } else if (coll.iterator) {
        this.add(net, coll.iterator, false);
      }
      return net;
    };

    // internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
    // by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
    GenogramLayout.prototype.add = function(net, coll, nonmemberonly) {
      var multiSpousePeople = new go.Set();
      // consider all Nodes in the given collection
      var it = coll.iterator;
      while (it.next()) {
        var node = it.value;
        if (!(node instanceof go.Node)) continue;
        if (!node.isLayoutPositioned || !node.isVisible()) continue;
        if (nonmemberonly && node.containingGroup !== null) continue;
        // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
        if (node.isLinkLabel) {
          // get marriage Link
          var link = node.labeledLink;
          var spouseA = link.fromNode;
          var spouseB = link.toNode;
          // create vertex representing both husband and wife
          var vertex = net.addNode(node);
          // now define the vertex size to be big enough to hold both spouses
          vertex.width = spouseA.actualBounds.width + Math.max(this.spouseSpacing * spouseA.noc,1) + spouseB.actualBounds.width;
          vertex.height = Math.max(spouseA.actualBounds.height, spouseB.actualBounds.height);
          vertex.focus = new go.Point(spouseA.actualBounds.width + Math.max(this.spouseSpacing * spouseA.noc, 1) / 2, vertex.height / 2);
        } else {
          // don't add a vertex for any married person!
          // instead, code above adds label node for marriage link
          // assume a marriage Link has a label Node
          var marriages = 0;
          node.linksConnected.each(function(l) { if (l.isLabeledLink) marriages++; });
          if (marriages === 0) {
            var vertex = net.addNode(node);
          } else if (marriages > 1) {
            multiSpousePeople.add(node);
          }
        }
      }
      // now do all Links
      it.reset();
      while (it.next()) {
        var link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if it's a parent-child link, add a LayoutEdge for it
        if (!link.isLabeledLink) {
          var parent = net.findVertex(link.fromNode);  // should be a label node
          var child = net.findVertex(link.toNode);
          if (child !== null) {  // an unmarried child
            net.linkVertexes(parent, child, link);
          } else {  // a married child
            link.toNode.linksConnected.each(function(l) {
              if (!l.isLabeledLink) return;  // if it has no label node, it's a parent-child link
              // found the Marriage Link, now get its label Node
              var mlab = l.labelNodes.first();
              // parent-child link should connect with the label node,
              // so the LayoutEdge should connect with the LayoutVertex representing the label node
              var mlabvert = net.findVertex(mlab);
              if (mlabvert !== null) {
                net.linkVertexes(parent, mlabvert, link);
              }
            });
          }
        }
      }
      while (multiSpousePeople.count > 0) {
        // find all collections of people that are indirectly married to each other
        var node = multiSpousePeople.first();
        var cohort = new go.Set();
        this.extendCohort(cohort, node);
        // then encourage them all to be the same generation by connecting them all with a common vertex
        var dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        var marriages = new go.Set();
        cohort.each(function(n) {
          n.linksConnected.each(function(l) {
            marriages.add(l);
          })
        });
        marriages.each(function(link) {
          // find the vertex for the marriage link (i.e. for the label node)
          var mlab = link.labelNodes.first()
          var v = net.findVertex(mlab);
          if (v !== null) {
            net.linkVertexes(dummyvert, v, null);
          }
        });
        // done with these people, now see if there are any other multiple-married people
        multiSpousePeople.removeAll(cohort);
      }
    };
    // collect all of the people indirectly married with a person
    GenogramLayout.prototype.extendCohort = function(coll, node) {
      if (coll.contains(node)) return;
      coll.add(node);
      var lay = this;
      node.linksConnected.each(function(l) {
        if (l.isLabeledLink) {  // if it's a marriage link, continue with both spouses
          lay.extendCohort(coll, l.fromNode);
          lay.extendCohort(coll, l.toNode);
        }
      });
    };
    /** @override */
    GenogramLayout.prototype.assignLayers = function() {
      go.LayeredDigraphLayout.prototype.assignLayers.call(this);
      var horiz = this.direction == 0.0 || this.direction == 180.0;
      // for every vertex, record the maximum vertex width or height for the vertex's layer
      var maxsizes = [];
      this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (max === undefined) max = 0;
        var sz = (horiz ? v.width : v.height);
        if (sz > max) maxsizes[lay] = sz;
      });
      // now make sure every vertex has the maximum width or height according to which layer it is in,
      // and aligned on the left (if horizontal) or the top (if vertical)
      this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (horiz) {
          v.focus = new go.Point(0, v.height / 2);
          v.width = max;
        } else {
          v.focus = new go.Point(v.width / 2, 0);
          v.height = max;
        }
      });
      // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
      // (other than the ones that are the widest or tallest in their respective layer).
    };
    /** @override */
    GenogramLayout.prototype.commitNodes = function() {
      go.LayeredDigraphLayout.prototype.commitNodes.call(this);
      // position regular nodes
      this.network.vertexes.each(function(v) {
        if (v.node !== null && !v.node.isLinkLabel) {
          v.node.position = new go.Point(v.x, v.y);
        }
      });
      // position the spouses of each marriage vertex
      var layout = this;
      this.network.vertexes.each(function(v) {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        var labnode = v.node;
        var lablink = labnode.labeledLink;
        // In case the spouses are not actually moved, we need to have the marriage link
        // position the label node, because LayoutVertex.commit() was called above on these vertexes.
        // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
        lablink.invalidateRoute();
        var spouseA = lablink.fromNode;
        var spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.s === "F") {  // sex is female
          var temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        // see if the parents are on the desired sides, to avoid a link crossing
        var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
        var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
        if (aParentsNode !== null && bParentsNode !== null && aParentsNode.position.x > bParentsNode.position.x) {
          // swap the spouses
          var temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        spouseA.position = new go.Point(v.x, v.y);
        spouseB.position = new go.Point(v.x + spouseA.actualBounds.width + layout.spouseSpacing*Math.max(spouseA.noc,1), v.y);
        if (spouseA.opacity === 0) {
          var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
          spouseA.position = pos;
          spouseB.position = pos;
        } else if (spouseB.opacity === 0) {
          var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
          spouseA.position = pos;
          spouseB.position = pos;
        }
      });
      // position only-child nodes to be under the marriage label node
      this.network.vertexes.each(function(v) {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        var mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {  // if only one child
          var mvert = layout.network.findVertex(mnode);
          var newbnds = v.node.actualBounds.copy();
          newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
          // see if there's any empty space at the horizontal mid-point in that layer
          var overlaps = layout.diagram.findObjectsIn(newbnds, function(x) { return x.part; }, function(p) { return p !== v.node; }, true);
          if (overlaps.count === 0) {
            v.node.move(newbnds.position);
          }
        }
      });
    };
    GenogramLayout.prototype.findParentsMarriageLabelNode = function(node) {
      var it = node.findNodesInto();
      while (it.next()) {
        var n = it.value;
        if (n.isLinkLabel) return n;
      }
      return null;
    };
