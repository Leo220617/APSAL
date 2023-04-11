$(document).ready(function () {


    Recuperar();

});

var Comidas = [];

var ImageBae64 = '';
var IMG2 = '';

var position = 0;

async function readFilePrincipal(input) {
    if (input.files && input.files[0]) {
        /*const maxAllowSize = 512000;*/
        //const maxAllowSize = 2800000;
        const maxAllowSize = 5000000;
        if (input.files[0].size > maxAllowSize) {
            alert("Esta imagen es muy pesada");
            input.value = '';
        } else {
            var reader = new FileReader();
            var img = document.createElement("img");
            var canvas = document.createElement('canvas');

            reader.onload = function (e) {
                img.src = e.target.result;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 600;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var dataurl = canvas.toDataURL("image/jpg");
                document.getElementById('imgPrincipalG').src = e.target.result;

                // console.log(dataurl);
                ImageBae64 = dataurl;//e.target.result;
                IMG2 = e.target.result;
                //var idF = setInterval(cancelar, 3000);

                //function cancelar() {
                //    //alert("cancelar -> " + ImageBae64);

                //    if (ImageBae64 != "data:,") {
                //        alert("Imagen agregada con éxito");
                //        clearInterval(idF);
                //    }
                //}

            }

        }

        reader.readAsDataURL(input.files[0]);
    }



}
//  var idF;
var fileUploadPrincipal = document.getElementById('imgPrincipalUploadG');
fileUploadPrincipal.onchange = async function (e) {

    await readFilePrincipal(e.srcElement);
    // idF = setInterval(cancelar(e), 2000);

    var idF = setInterval(async function () {

        if (ImageBae64 != "data:,") {
            //alert("Imagen agregada con éxito");
            clearInterval(idF);
        } else {
            await readFilePrincipal(e.srcElement);
        }
    }, 1500);


    //await readFilePrincipal(e.srcElement);
    //sleep(3000);
    //await readFilePrincipal(e.srcElement);

}



// Get the modal
var modal = document.getElementById('myModal');


// Get the image and insert it inside the modal - use its "alt" text as a caption
//   var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
//var captionText = document.getElementById("caption");
function onclickImage(id) {
    modal.style.display = "block";
    modalImg.src = $("#idImagen" + id).attr('src');

}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}


function Recuperar() {
    try {
        Comidas = JSON.parse($("#Comidas").val());
        rellenaTablaComidas();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}
function AgregarComida() {
    try {

        var comida =
        {
            id: 0,
            idDia: $("#idDia").val(),
            Foto: IMG2,
            Descripcion: $("#descripcionComida").val(),
            Calorias: $("#caloriasComida").val()

        };
        if (ValidarComida(comida)) {
            Comidas.push(comida);
            LimpiarComida();
            rellenaTablaComidas();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Faltan datos por llenar '

            })
        }

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}
function ValidarComida(comida) {
    try {
        if (comida.Descripcion == "" || comida.Descripcion == undefined) {
            return false;
        } else if (comida.Calorias < 0 || comida.Calorias == null) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}
function LimpiarComida() {
    try {
        $("#descripcionComida").val("");
        $("#caloriasComida").val(0);
        document.getElementById('imgPrincipalG').src = "/avatar-1.jpg";
        ImageBae64 = '';
        IMG2 = '';
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}

function EliminarComida(i) {
    try {
        Comidas.splice(i, 1);
        rellenaTablaComidas();
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}

function rellenaTablaComidas() {
    try {
        var texto = "";
        var sumatoriaCalorias = 0;
        $("#tbodyComidas").html(texto);

        for (var i = 0; i < Comidas.length; i++) {
            texto += "<tr>";
            if (Comidas[i].Foto == null) {
                texto += "<td align='center'>Sin foto</td>";

            } else {
                if (Comidas[i].Foto.includes("data:image/png;base64,") || Comidas[i].Foto.includes("data:image/jpg;base64,") ) {
                    texto += "<td align='center'>" + "<img src='" + Comidas[i].Foto + "' style='max-width: 50%; max-height: 50%;' id='idImagen" + i + "' onclick='javascript:onclickImage(" + i +")'/>" + "</td>";

                } else {
                    var src = "data:image/png;base64," + Comidas[i].Foto;
                    texto += "<td align='center'>" + "<img src='" + src + "' style='max-width: 50%; max-height: 50%;' id='idImagen" + i + "' onclick='javascript:onclickImage(" + i + ")'/>" + "</td>";
                     

                }

            }
            texto += "<td>" + Comidas[i].Descripcion + "</td>";
            texto += "<td>" + Comidas[i].Calorias + "</td>";
            sumatoriaCalorias += parseFloat(Comidas[i].Calorias);
            texto += "<td>" + "<button class='btn btn-danger' onclick='javascript: EliminarComida(" + i + "); '> X </button>" + "</td>";

            texto += "</tr>";

        }

        texto += "<tr><td> </td><td> <b>Total Calorias</b> </td><td> " + sumatoriaCalorias + " </td> <td> </td>  </tr>"

        $("#tbodyComidas").html(texto);


    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}

function Generar() {
    try {
        var btn = document.getElementById('btnGuardar');
        btn.disabled = true;

        var recibido =
        {
            id: $("#idDia").val(),
            idUsuario: 0,
            Dia: 0,
            Mes: 0,
            Anno: 0,
            Fecha: new Date(),
            Observaciones: $("#ObservacionesGenerales").val(),
            Comidas: Comidas

        }

        $.ajax({
            type: 'POST',

            url: $("#urlGuardar").val(),
            dataType: 'json',
            data: { recibidos: recibido  },
            headers: {
                RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            success: function (json) {

                $("#divProcesando").hide();

                if ($('.modal-backdrop').is(':visible')) {

                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').hide();
                }
                console.log("resultado " + json.mensaje);
                if (json.success == true) {
                    Swal.fire({
                        title: "Ha sido generado con éxito",

                        icon: 'success',
                        showCancelButton: false,

                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'swalBtnColor',

                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //location.reload();
                            window.location.href = window.location.href.split("/Editar")[0];
                        }
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha ocurrido un error al intentar guardar ' + json.mensaje

                    });
                    btn.disabled = false;

                }
            },

            beforeSend: function (xhr) {

                $("#divProcesando").modal("show");
            },
            complete: function () {

            },
            error: function (error) {
                btn.disabled = false;

            }
        });

    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error  ' + e

        })
    }
}

