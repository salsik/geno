
function runAjax()
{

id_numbers = new Array();
$.ajax({
    url:"parsexml.php",
    type:"POST",
    success:function(msg){
        id_numbers = msg;
    },
    dataType:"json"
});

alert(id_numbers);
}
