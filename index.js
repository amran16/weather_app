var Api_Key = '0ecd65091ca9c34ed5953e2be578f1ff';
var cel = false;

$(document).ready(function(){

  //IP Geolocation API: http://ip-api.com/

  var Geo_Ip = 'https://crossorigin.me/http://ip-api.com/json';

  $.getJSON(Geo_Ip, function(data){

    var city = data.city;

    var api = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=' + Api_Key;

   $.getJSON(api, function(wea_data){

      show(wea_data, cel);

      $('#fTemp').click(function(){
          cel = !cel;
          show(wea_data, cel);
      });
    });
  });
});

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) *(5/9)) + '&degC';
  return Math.round(fTemp) + '&degF';
}


function show(data, cel){
         var city = data.name;
         var country = data.sys.country;
         var icon = data.weather[0].icon;
         var fTemp = displayTemp(data.main.temp, cel);
         var fTemp_low = displayTemp(data.main.temp_min, cel);
         var fTemp_high = displayTemp(data.main.temp_max, cel);
         var weathertype = data.weather[0].description;
         var windSpeed = data.wind.speed.toFixed(0);

         $('#city').html(city + ', ' + country);
         $('#fTemp').html(fTemp);
         $('#high-low').html(fTemp_high + ' / ' + fTemp_low);
         $('#windSpeed').html(windSpeed + ' mph');

         var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";

         $('#icon').html('<img src="' + iconSrc + '">' + weathertype);

}
