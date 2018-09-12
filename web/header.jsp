<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title> RockJS Framework®</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta name="apple-mobile-Web-app-title" content="RockJS Framework®">
        <meta name="author" content="RockJS Framework®|Focus On Services">
        <meta name="keywords" content="Soporte tecnico,it,ti,soluciones,datacenter,consultoria,centro de datos,empresarial,administracion,proyectos,soporte multimarca, Focus On Services es un proveedor global de servicios con presencia en más de 16 países de Latinoamérica con un amplio portafolio de servicios en Tecnologías de Información y con los mejores tiempos de respuesta de la industria, Software, Desarrollo, app, apps, android, IOS, 
              Transformación digital, Software on demand, Software a la medida, Servicios de desarrollo de software, fabrica de software, Progress, 4GL, ABL, app server, PAS, Servicios Web Síncronos,protocolos REST JSON XML">
        <meta name="description" content="La forma más rápida de adoptar la Transformación Digital">

        <!-- Favicon -->
        <link href="asset/images/favicon.ico" rel="icon">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="asset/css/bootstrap.min.css">

        <!-- sviAxa personalite CSS -->
        <link rel="stylesheet" href="asset/css/sviaxa.css">
        <link rel="stylesheet" href="asset/css/pe-icon-7-stroke/css/pe-icon-7-stroke.css">
        <link rel="stylesheet" href="asset/css/pe-icon-7-stroke/css/helper.css">
        <link href="https://fonts.googleapis.com/css?family=Sniglet:400,500,700|Metric-Light:400,900" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />


        <!-- JQuery Export datatable csv,excel pdf -->
        <link rel="stylesheet" href="asset/css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="asset/css/buttons.dataTables.min.css">
    </head>
    <body>
        <div class="loader"></div>
        <div id="mySidenav" class="sidenav" style="margin-top:40px">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="menu.php">Menu</a>
            <a href="ConsultaVentas.php">Consultar Ventas</a>
            <a href="pedido.php">Crear Pedido</a>
            <a href="resources/logout.php">Salir</a>
        </div>

        <div id="main">
            <div class=" navbar bg-light fixed-top" style="color: #005689 !important; padding-bottom: 0; padding-top: 0;">
                <div class="float-left mn-left">
                    <span class="menuicon" onclick="openNav()" style="text-align: center; font-size: 30px; padding-left: 15px;"><i class="pe-7s-menu"></i></span>
                    <a class="navbar-brand" href="#">&nbsp&nbsp&nbsp<img src="asset/images/sniglet.png" width="7%" alt="RockJS Framework" style="vertical-align: baseline !important;"></a>
                </div>

                <div class="float-right mn-rigth">
                    Focus On Services&nbsp&nbsp&nbsp
                    <!--span class="pe-7s-bell pixeden" title="Setings"></i>
                    <span class="pe-7s-settings" title="Setings"></span>
                    <span class="pe-7s-info" title="Info"></span>
                    <span class="pe-7s-magic-wand white logo circ"></span-->

                    <img src="asset/images/img_avatar3.png" title="<?php echo $usuario; ?>" class="rounded-circle" style="width:30px; vertical-align: baseline !important;">
                </div>
            </div>
        </div>
        <div style="margin-top: 60px" id="todo-content">