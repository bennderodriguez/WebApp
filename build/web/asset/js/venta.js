$("#RealizarVenta").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos sondd requeridos");
        alert("Todos los campos son requeridos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
        document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Procesando Solicitud ... <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';
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
    var Cotizacion = $("#Cotizacion").val();
    var Ruta = $("#Ruta").val();
    var Destino = $("#Destino").val();
    var Proyecto = $("#Proyecto").val();
    var Dolares = $("#Dolares").val();
    var Contado = $("#Contado").val();
    var Explorar = $("#Explorar").val();
    var Nota1 = $("#Nota1").val();
    var Nota2 = $("#Nota2").val();
    var Nota3 = $("#Nota3").val();
    var idProd = $("#idProd").val();
    var CantProd = $("#CantProd").val();
    var PrecioProd = $("#PrecioProd").val();
    var DescuentoProd = $("#DescuentoProd").val();
    var DescripcionProd = $("#DescripcionProd").val();

    console.log("Cliente " + Cliente);
    console.log("Descuento " + Descuento);
    console.log("Tipo " + Tipo);
    console.log("Credito " + Credito);
    console.log("Venta " + Venta);
    console.log("Sucursal " + Sucursal);
    console.log("Vendedor " + Vendedor);
    console.log("Precio " + Precio);
    console.log("Ruta " + Ruta);
    console.log("Cotizacion " + Cotizacion);
    console.log("Destino " + Destino);
    console.log("Proyecto " + Proyecto);
    console.log("Dolares " + Dolares);
    console.log("Contado " + Contado);
    console.log("Explorar " + Explorar);
    console.log("Nota1 " + Nota1);
    console.log("Nota2 " + Nota2);
    console.log("Nota3 " + Nota3);
    console.log('idProd ' + idProd);
    console.log('CantProd ' + CantProd);
    console.log("PrecioProd " + PrecioProd);
    console.log("DescuentoProd " + DescuentoProd);
    console.log("DescripcionProd " + DescripcionProd);

    $.ajax({
        type: "POST",
        url: "getJson/setProducto.php",
        data: 'cVenta22=' + Venta + '&xClie22=' + Cliente + '&nCant22=' + CantProd + '&PROD22=' + idProd + '&xdes22=' + DescuentoProd + '&xdesc=' + DescripcionProd,
        success: function (text) {
            //alert(text);
            console.log(text);
            var n = text.includes("impuesto");
            if (n) {
                document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Producto Agregado</div>';
                //addRow();
                //creaVentaTotalJson(text, Venta);
                consultaVentaTotal(Venta, Cliente);
            } else {
                document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Producto no Agregado </div>';

            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Operacion no realizada Presione F12</div>';
        }
    });

}

function formSuccess() {
    $("#RealizarVenta")[0].reset();
    submitMSG(true, "Bienvenido!")
}

function formError() {
    $("#RealizarVenta").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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

function creaVentaTotalJson(data, filename) {
    /*Este servicio contiene espam por lo que separamos en cadenas
     * para extraer unicamente el numero del pedido
     */
    //1. Separo con split todo lo que este entre [
    var str = data;
    var res = str.split("[");
    console.log(res[1]);
    //2. El resultado se parcea nuevamente pero ahoa con ]
    var str2 = res[1];
    var res2 = str2.split("]");
    console.log(res2[0]);
    //3. ahora se agregan corchetes
    var array = '{"data" : [';
    array += res2[0].replace("},]", "}]");
    //array += array.replace("{}", "");
    array += ']}';
    var array2 = array.replace(", {}", "");
    console.log(array2);
    $.ajax({
        type: "POST",
        url: "clean-json/get-url.php",
        data: "dataArray=" + array2 + "&fileName=vt" + filename,
        success: function (text) {
            if (text == "success") {
                document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Producto Agregado  <i class="pe-7s-check pe-2x pe-va"></i></div>';
                //location.href = "venta.php?venta=" + filename;
                cargaVentaTotal(filename);
            } else {
                document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Operacion no realizada Presione F12</div>';
            }
        }
    });

}

function consultaVentaTotal(venta, Cliente) {
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
            //se guarda en un archivo json/NumeroVenta.json
            $.ajax({
                type: "POST",
                url: "clean-json/get-url.php",
                data: "dataArray=" + array2 + "&fileName=vt" + venta,
                success: function (text) {
                    if (text == "success") {
                        document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Acción realizada  <i class="pe-7s-check pe-2x pe-va"></i></div>';
                        location.href = "venta.php?venta=" + venta + "&cliente=" + Cliente;
                    } else {
                        document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Operacion no realizada Presione F12</div>';
                    }
                }
            });
        } else {
            document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... espere <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';
        }

        return array;
    };
    xhttp.open("GET", "getJson/getVentatotal.php?cVenta2=" + venta, true);
    xhttp.send();
    // The function returns the product of p1 and p2
}

function cargaVentaTotal(venta) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj.data);
            //console.log(myObj.data[1].Suma);

            $('#Tieps').val(myObj.data[1].Suma);
            $('#Tiva').val(myObj.data[1].impuesto);
            $('#Tsaldo').val(myObj.data[1].TOTAL);
        }
        if (this.status == 404) {
            console.log("error cargaVentaTotal()");
            document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong>  Numero de venta Inexistente </div>';
        }
    };
    xmlhttp.open("GET", "json/vt" + venta + ".json", true);
    xmlhttp.send();
}


