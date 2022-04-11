$(document).ready(function(){
  $("#superhero").hide();
  /* al enviar fomulario buscar*/
  $("#formBuscar").submit(function(event) {
    event.preventDefault();

    var nroHero = $("#inputBuscar").val();
    

    let resultado = validar(nroHero);
    
    if(resultado){
      $("#inputBuscar").val("");
      $.ajax({
          url: "https://www.superheroapi.com/api.php/3525635500807579/" + nroHero,
          success: function(result){

            /* Info del heroe */

            $(".encuentra").hide();

            $("#superhero").show();

            setTimeout(function(){
              $(".alert").hide();
            }, 5000);

            $(".name").html("Nombre: " + result["name"]);

            $(".photo").attr("src", result["image"]["url"]);

            $(".conex").html("Conexiones: " + result["connections"]["group-affiliation"]);

            $(".published").html("Publicado por: " + result["biography"]["publisher"]);

            $(".occupy").html("Ocupación: " + result["work"]["occupation"]);

            $(".appear").html("Primera Aparición: " + result["biography"]["first-appearance"]);

            $(".height").html("Altura: " + result["appearance"]["height"]);
            $(".weight").html("Peso: " + result["appearance"]["weight"]);

            $(".ally").html("Alianzas: " + result["biography"]["aliases"]);

            /* Chart */

            var powerNames = Object.keys(result["powerstats"]);

            var options = {
              title: {
                text: "Estadisticas de poder para " + result["name"]
              },
              data: [{
                  type: "pie",
                  startAngle: 45,
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabel: "{label} ({y})",
                  yValueFormatString:"#,##0.#"%"",
                  dataPoints: [
                    { label: powerNames[0], y: result["powerstats"]["intelligence"] },
                    { label: powerNames[1], y: result["powerstats"]["strength"] },
                    { label: powerNames[2], y: result["powerstats"]["speed"] },
                    { label: powerNames[3], y: result["powerstats"]["durability"] },
                    { label: powerNames[4], y: result["powerstats"]["power"] },
                    { label: powerNames[5], y: result["powerstats"]["combat"] }
                  ]
              }]
            };

            $("#chartContainer").CanvasJSChart(options);

            /* *** Acciones despues de Boton buscar otro heroe *** */
            $(".another").click(function(){
              $(".encuentra").show();
              $(".alert").show();
              $("#superhero").hide();
            });
            
          }
      });
    }
  });
});

function validar(_nro){
  let pasaValidacion = true;
  let validacionTexto = /[0-9]/gim;

  if(validacionTexto.test(_nro) == false){
    document.querySelector('.errorNro').innerHTML = "Solo se permiten números";
    pasaValidacion = false;
  }

  return pasaValidacion;
}