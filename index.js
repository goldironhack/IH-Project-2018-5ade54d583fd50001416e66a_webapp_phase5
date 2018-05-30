//kHE3uezJb_yYnUWeScsf quant api key primer dataset de la lista

const GOOGLE_KEY = "AIzaSyCNMkxhK5vwLLb8yg2L3JbvRgdNZMVtEAI";

var map;
var ny = {lat:40.730610, lng:-73.935242}
var broo = {lat: 40.650002, lng:-73.949997}
var nyu = {lat: 40.73, lng:-73.995}
var nyMarker;
var brMarker;


function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 13 ,
         center: nyu
       });

       nyMarker = new google.maps.Marker({
         position: ny,
         map: map
       });

       brMarker = new google.maps.Marker({
         position: nyu,
         map: map
       });

       events_marker(brMarker);
     }


function getRoute(marker){//funcion obtener la ruta
  var originPoint = nyMarker.position;//accedemos a la pos del marcador
  var request = {
    origin:originPoint,
    destination: brMarker.position,//destino posicion
    travelMode: 'DRIVING'
  };

  directionsRenderer.setMap(map);//pinte en el mapa
  directionsService.route(request,function(result,status){
    if(status=='OK'){
      directionsRenderer.setDirections(result);
    }
  })
}

function events_marker(marker){// f eventos del marcador
  if(!(typeof marker === "undefined")){//sacar el tipo de
    marker.addListener('click',function(){
      getRoute(marker);
    });
  }
}


function getHousing() {
    var data = $.get("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD")
    .done(function() {
        console.log(data.responseJSON)
    })
}

var draw = true;
function district() {


    var URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson"


       map.data.loadGeoJson(URL);
}

function example(){

  var data1="https://storage.googleapis.com/mapsdevsite/json/google.json"
  map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
      console.log(data1)
}

$(function() {
     $("#district").on("click", district)
    $("#housing").on("click", getHousing)
    $("#example").on("click", example)

})

$(document).ready(function () {
  //your code here
  
    $("#Search").click(function(){
        var text= "";
        $.getJSON("https://www.quandl.com/api/v3/datasets/ZILLOW/N15706_MRPST.json?api_key=kHE3uezJb_yYnUWeScsf",  function(data){

            console.log(data);
            for (var c=0; c<data.dataset.data.length; c++){
                text += "<tr><td>"+data.dataset.data[c][0]+"</td>";
                text += "<td>"+"$ "+data.dataset.data[c][1]+"</td></tr>"
            }
            $("#tbody").html(text);
              })
        $("#Clean").show();
    });


    $("#Clean").click(function(){
        $("#table tbody tr").remove();
        $("#Clean").hide();

})
});