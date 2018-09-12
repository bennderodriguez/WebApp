/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadVentas() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            //document.getElementById("des").innerHTML = myObj.Total.Venta;
            document.getElementById("NumVent").innerHTML = myObj.Total.Venta;
            document.getElementById("TCantidad").innerHTML = myObj.Total.TCantidad;
            document.getElementById("TImporte").innerHTML = myObj.Total.TImporte;
            document.getElementById("TNeto").innerHTML = myObj.Total.TNeto;
            $('#Tiva').val(myObj.Total.Tiva);
            $('#Tsaldo').val(myObj.Total.Tsaldo);
            $('#Tieps').val(myObj.Total.Tieps);
        }
    };
    xmlhttp.open("GET", "json/Ventas.json", true);
    xmlhttp.send();

}

function LoadPedido() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            $('#Nombre').val(myObj.data[0].Nombre);
            $('#Nombre2').val(myObj.data[0].Nombre2);
            $('#Calle').val(myObj.data[0].Calle);
            $('#Colonia').val(myObj.data[0].Colonia);
            $('#Ciudad').val(myObj.data[0].Ciudad);


            $('#Venta').val(myObj.data[0].Pedido);
            $('#Cliente').val(myObj.data[0].Cliente);
            $('#Vendedor').val(myObj.data[0].Vendedor);
            $('#Sucursal').val(myObj.data[0].Sucursal);
            //estatus
            $('#Precio').val(myObj.data[0].Precio);
            $('#Descuento').val(myObj.data[0].Descuento);
            $('#Tipo').val(myObj.data[0].Tipo);
            $('#Credito').val(myObj.data[0].Credito);
            $('#Ruta').val(myObj.data[0].Ruta);
            //destino
            //Proyecto
            //Dolares
            //contado
            //Explorar
            $('#Nota1').val(myObj.data[0].Nota1);
            $('#Nota2').val(myObj.data[0].Nota3);
            $('#Nota3').val(myObj.data[0].Nota3);


            console.log(myObj.data);
        }
    };
    xmlhttp.open("GET", "json/Pedido.json", true);
    xmlhttp.send();
}

/*
 Orden de campos:
 xPedido   := '*'
 xCliente  := '*'
 xVendedor := ''
 xSucursal := ''
 xEstatus  := '' 
 xPrecio   := ''
 xDescuento := ''
 xTipo      := ''
 xCredito   := ''
 xRuta      := ''
 xDestino   := ''
 xProyecto  := ''
 xDolares   := ''
 xContado   := ''
 xExportar  := ''
 xNota1     := ''
 xNota2     := ''
 xNota3     := ''
 
 */