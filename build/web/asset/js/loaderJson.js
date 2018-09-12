function LoadDataJson() {
    $('#example').DataTable({
        "ajax": "php/productos.php",
        "columns": [
            {"data": "Producto"},
            {"data": "Descripcion"},
            {"data": "Cantidad"},
            {"data": "Precio"},
            {"data": "Porcentaje"},
            {"data": "Importe"},
            {"data": "Neto"}
        ]
    });
}
function myFunction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var serverRequest = this.responseText;
            //var array = '{"data" : ';
            var array = serverRequest.replace("},]", "}]");
            //array += '}';
            console.log(array);
            //document.getElementById("demo").innerHTML = array;
            $.ajax({
                type: "POST",
                url: "php/savejson.php",
                data: "jsonRespuestas=" + array,
                success: function (text) {
                    if (text == "success") {
                        document.getElementById("demo").innerHTML = "success";
                        LoadDataJson();
                    } else {
                        document.getElementById("demo").innerHTML = "error";
                    }
                }
            });
        } else {
            document.getElementById("demo").innerHTML = "Cargando Contenido...";
        }

        return array;
    };
    xhttp.open("GET", "http://focus.acceso.crescloud.com/cgi-bwp/BI2/Menu/FocusLab/Berna/Check3.bwp?cVenta2=004341", true);
    xhttp.send();
    // The function returns the product of p1 and p2
}

$(document).ready(function () {
    myFunction();
});