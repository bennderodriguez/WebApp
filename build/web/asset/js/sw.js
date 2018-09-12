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

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "p=loginPVI&cliente_vida=" + cliente_vida + "&pass_cv=" + pass_cv,
        success: function (text) {
            if (text == "success") {
                formSuccess();
                $(location).attr('href', 'Rockjs1.0/?p=holaProgress')
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