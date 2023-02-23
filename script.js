function Button_click(){
    let apiKey = 'a41708de4fe535766b84d85e1bff3367';
    let coordinatesApi = 'ZipOSCfz58+18tBYfe/E5A==3txEoET32gRbzdqz';
    let temperature = document.getElementById("temperature")
    let city = document.getElementById("city")
    let sky = document.getElementById("sky")
    let wind = document.getElementById("wind")
    let humidity = document.getElementById("humidity")
    let city_name = document.getElementById("city_name")
    //let state_name = document.getElementById("state_name")
    let visibility = document.getElementById("visibility")

    let nameToCoordinates = (`https://api.api-ninjas.com/v1/geocoding?city=${city_name.value} `)
    let req_1 = new XMLHttpRequest();
    req_1.open("GET", nameToCoordinates, true)
    req_1.responseType = 'json'
    req_1.setRequestHeader('X-Api-Key', coordinatesApi )
    req_1.onload = () =>{
        appendData (req_1.response)
        console.log(req_1.response)
    }

    function appendData(data){

        let link = (`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].latitude}&lon=${data[0].longitude}&units=metric&exclude=daily&appid=${apiKey}`).replaceAll('-', '%2D');
        
        let req = new XMLHttpRequest();
        req.open("GET", link,true)
        req.responseType = 'json'
        req.onload = () =>{
            appendData_1 (req.response)
            console.log(req.response)
        }

        function appendData_1(data){
            let icon_src = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon+'.png'
            console.log(icon_src)
            document.querySelector(".icon").src = icon_src;
            temperature.innerHTML =  data.current.temp + '°C';
            let  sky_1 = data.current.weather[0].description;
            sky.innerHTML  = sky_1.charAt(0).toUpperCase() + sky_1.slice(1);
            city.innerHTML = 'Weather in ' + city_name.value;
            humidity.innerHTML = 'Humidity: ' + data.current.humidity + ' %';
            wind.innerHTML = 'Wind Gusts: ' + data.current.wind_speed + ' m/s';
            visibility.innerHTML = 'Visibility: ' + Number(data.current.visibility/1000)+' km';
        }

        req.send()
    }
    req_1.send()
    
}