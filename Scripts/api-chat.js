$(document).ready(function () {                
    setInterval(function(){ leerMensajes(); }, 1000);
})

var btnEnviar = document.getElementById('botonEnviar');

function limpiarMensaje(){

    var pantalla = document.getElementById('mensajeTXT');

    pantalla.value = ' ';
}

btnEnviar.addEventListener('click', function(){

    var usuario = document.getElementById('username').value;
    var mensaje = document.getElementById('mensajeTXT').value;


    $.ajax({
        type: 'POST',
        url: 'http://ticosoftcr.website/chat/chat.php',
        data: { "opcion": 2, "username": usuario, "mensaje": mensaje },
        dataType: "json",
        success: function (data) {
            console.log("Envio");
        }
    });
    
    leerMensajes();
    limpiarMensaje();
});

function leerMensajes() {
    $.ajax({
        type: 'Get',
        url: 'http://ticosoftcr.website/chat/chat.php?opcion=1',
        dataType: "json",
        success: function (data) {
            let HTML = "";
            let linea = 0;

            for (i = 0; i < data.length; i++){

                linea += 1;

                HTML += "<div class = 'mensaje'>";
                    HTML += "<b class = 'user'>" + data[i]["username"] + "</b>";
                    HTML += "<br>";
                    HTML += "<div class = 'caja-mensaje'>";
                        HTML += linea + ": "  + "<b class = 'campo-msg'>" + data[i]["mensaje"] + "</b>" + "<br>" + "<br>" + "<b class = 'campo-hora'>" + data[i]["hora"] + "</b";
                    HTML += "</div>";
                HTML += "</div>";
            }

            document.getElementById("mensajes").innerHTML = HTML;
        },
        error: function() {
            alert("Esto fallo");
        }
    });
}