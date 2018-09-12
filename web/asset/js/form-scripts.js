$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Todos los campos sondd requeridos");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm() {
    // Initiate Variables With Form Content
    var cliente_vida = $("#cliente_vida").val();
    var pass_cv = $("#pass_cv").val();
    
    console.log(cliente_vida);
    console.log(pass_cv);

    $.ajax({
        type: "POST",
        url: "resources/auth.php",
        data: "UserName=" + cliente_vida + "&Password=" + pass_cv,
        success: function (text) {
            if (text == "success") {
                formSuccess();
                $(location).attr('href', 'menu.php')
                $(".loader").fadeIn("slow");
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
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