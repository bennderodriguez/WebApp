$("#ActualizaPedido").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos sondd requeridos");
        alert("Todos los campos sondd requeridos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
        document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Porcesando Solicitud ...</div>';
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var Cliente = $("#Cliente").val();
    var Descuento = $("#Descuento").val();
    var Tipo = $("#Tipo").val();
    var Credito = $("#Credito").val();
    var Venta = $("#Venta").val();
    var Sucursal = $("#Sucursal").val();
    var Vendedor = $("#Vendedor").val();
    var Precio = $("#Precio").val();
    var Ruta = $("#Ruta").val();
    var Destino = $("#Destino").val();
    var Proyecto = $("#Proyecto").val();
    var Dolares = $("#Dolares").val();
    var Contado = $("#Contado").val();
    var Explorar = $("#Explorar").val();
    var Nota1 = $("#Nota1").val();
    var Nota2 = $("#Nota2").val();
    var Nota3 = $("#Nota3").val();

    /*console.log(Cliente);
     console.log(Descuento);
     console.log(Tipo);
     console.log(Credito);
     console.log(Venta);
     console.log(Sucursal);
     console.log(Vendedor);
     console.log(Precio);
     console.log(Ruta);
     console.log(Destino);
     console.log(Proyecto);
     console.log(Dolares);
     console.log(Contado);
     console.log(Explorar);
     console.log(Nota1);
     console.log(Nota2);
     console.log(Nota3);*/

    $.ajax({
        type: "POST",
        url: "http://focus.acceso.crescloud.com/cgi-bwp/BI2/Menu/FocusLab/Oscar/SwPedidoAlt_fc.bwp",
        data: 'xPedido=' + Venta + '&xVendedor=' + Vendedor + '&xSucursal=' + Sucursal
                + '&xEstatus=R&xPrecio=' + Precio + '&xDescuento=' + Descuento
                + '&xTipo=' + Tipo + '&xCredito=' + Credito + '&xRuta=' + Ruta +
                '&xDestino=%' + Destino + '&xProyecto=%' + Proyecto + '&xDolares=%' + Dolares +
                '&xContado=' + Contado + '&xExportar=%' + Explorar +
                '&xNota1=' + Nota1 + '&xNota2=' + Nota2 + '&xNota3=' + Nota3 +
                '&xCliente=' + Cliente,
        success: function (text) {
            //alert(text);
            var n = text.includes("Modificado");
            if (n) {
                document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Actualización realizada </div>';
                myFunction(Cliente, Venta);
                formSuccess();
            } else {
                document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Actualización no realizada </div>';

            }
        }
    });
}

function formSuccess() {
    $("#ActualizaPedido")[0].reset();
    submitMSG(true, "Bienvenido!")
}

function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

function myFunction(Cliente, Perdido) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var serverRequest = this.responseText;
            var array = '{"data" : ';
            array += serverRequest.replace("},]", "}]");
            //array += array.replace("{}", "");
            array += '}';
            var array2 = array.replace(", {}", "");
            console.log(array2);
            //document.getElementById("demo").innerHTML = array;
            $.ajax({
                type: "POST",
                url: "clean-json/get-url.php",
                data: "dataArray=" + array2 + "&fileName=Pedido",
                success: function (text) {
                    if (text == "success") {
                        document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Actualización realizada </div>';
                        //LoadVenta();
                        loadVentas();
                        LoadPedido();
                    } else {
                        document.getElementById("demo").innerHTML = '<div class="alert alert-danger"><strong>Error</strong> Ocurrio un error presione F12</div>';
                    }
                }
            });
        } else {
            document.getElementById("demo").innerHTML = '<div class="alert alert-warning"><strong>Espere</strong> Cargando Contenido ... espere</div>';
        }

        return array;
    };
    xhttp.open("GET", 'http://focus.acceso.crescloud.com/cgi-bwp/BI2/Menu/FocusLab/Oscar/SwPedidoDat_fc.bwp?xVenta2=' + Perdido + '&xClie2=' + Cliente, true);
    xhttp.send();
    // The function returns the product of p1 and p2
}