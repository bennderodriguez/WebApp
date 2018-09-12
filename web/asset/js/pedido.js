$("#crearPedido").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos sondd requeridos");
        alert("Complete los campos requeridos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
        document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Procesando... <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';
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


    /**
     * Creo Canal de comunicacion con el SW para asignar pedido
     * URI: http://focus.acceso.crescloud.com/cgi-bwp/BI2/Menu/FocusLab/rockjs/swcravt02.bwp?xVenta2=0051997&xClie2=000010
     * (swcravt02)
     */
    $.ajax({
        type: "POST",
        url: "getJson/setCreaVenta.php",
        data: 'xVenta2=' + Venta + '&xClie2=' + Cliente,
        success: function (text) {
            //alert(text);
            console.log(text);
            console.log("************************** swcravt02 ************************");
            var n = text.includes("Credito");
            if (n) {
                document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Procesando... Asignando Pedido <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';
                creaJsonVenta(text, Venta, Cliente)
                /***********************************************/
                /**
                 * Invoca SetDataVent (swcravt03)
                 */
                $.ajax({
                    type: "POST",
                    url: "getJson/setDataVent.php",
                    data: "20&xContado=" + Contado + "&xExportar=" + Explorar + "&xNota1=" + Nota1 + "&xNota2=" + Nota2 + "&xNota3=" + Nota3 + "&xCliente=" + Cliente + "&xpedido=" + Venta,
                    success: function (text) {
                        //alert(text);
                        var m = text.includes("Modificado");
                        if (n) {
                            console.log("SetDataVent ok");
                            console.log("************************** swcravt03 ************************");
                        }
                    }
                });
                /***********************************************/
                formSuccess();
            } else {
                document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Pedido no asignado Presione F12</div>';

            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Operacion no realizada Presione F12</div>';
        }
    });
}

function formSuccess() {
    $("#crearPedido")[0].reset();
    submitMSG(true, "Bienvenido!")
}

function formError() {
    $("#crearPedido").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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

function creaJsonVenta(data, filename, Cliente) {
    console.log(data);
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
        data: "dataArray=" + array2 + "&fileName=" + filename,
        success: function (text) {
            if (text == "success") {
                console.log("************************** creaJsonVenta ************************");
                document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Pedido asignado <i class="pe-7s-check"></i></div>';
                location.href = "venta.php?venta=" + filename + "&cliente=" + Cliente;
            } else {
                document.getElementById("demo").innerHTML = '<div class="alert alert-danger alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Error!</strong> Operacion no realizada Presione F12</div>';
            }
        }
    });
}

function consultaDatosCliente(venta, cliente) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var serverRequest = this.responseText;

            /*Este servicio contiene espam por lo que separamos en cadenas
             * para extraer unicamente el numero del pedido
             */
            //1. Separo con split todo lo que este entre [
            var str = serverRequest;
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

            document.getElementById("demo").innerHTML = array;
            //se guarda en un archivo json/NumeroVenta.json
            $.ajax({
                type: "POST",
                url: "clean-json/get-url.php",
                data: "dataArray=" + array2 + "&fileName=" + venta,
                success: function (text) {
                    console.log("************************** consultaDatosCliente ************************");
                    console.log(text);
                    document.getElementById("demo").innerHTML = '<div class="alert alert-success alert-dismissible">   <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>   <strong>Success!</strong> Pedido asignado <i class="pe-7s-check"></i></div>';
                    location.href = "venta.php?venta=" + venta + "&cliente=" + cliente;
                }
            });
        } else {
            document.getElementById("demo").innerHTML = '<div class="alert alert-info"><strong>Espere</strong> Cargando Contenido ... espere <i class="pe-7s-config pe-spin pe-2x pe-va"></i></div>';
        }

        return array;
    };
    xhttp.open("GET", "getJson/getConsultaCliente.php?xVenta2=" + venta + "&xClie2=" + cliente, true);
    xhttp.send();
    // The function returns the product of p1 and p2
}