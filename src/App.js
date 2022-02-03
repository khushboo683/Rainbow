import React,{useState} from 'react'

import './app.css'






function App() {
  

const[query,setQuery]=useState('');
const[lat,setLat]=useState();
const[lon,setLon]=useState();
const[text,setText]=useState('');
const[view,setView]=useState(60);
const[data,setData]=useState({});
const[data1,setData1]=useState({});

const handleChange=(e)=>{
  setQuery(e.target.value);
}

const handleClick=async()=>{
  const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=2be1f1e49570c72ca21bafa4dbda1d4f`)
  const actualRes=await res.json();
  console.log(actualRes);
  setData(actualRes);
  setQuery("");
  if(actualRes.cod!=='404'){
    setLat(actualRes.coord.lat);
    setLon(actualRes.coord.lon);
    setText('more details')
  }
  

}
const getQuality=(num)=>{
  let q=['good 🤩','fair 😃','moderate 😅','poor 🙁','very poor 😥']
  return q[num-1]
}
const dateBuilder=(d)=>{
let days=['Sunday', 'Monday','Tueday','Wednesday','Thursday','Friday','Saturday']

let months=['January','February','March','April','May','June','July','August','September','October','November','December']

let day= days[d.getDay()];
let month= months[d.getMonth()];
let date=d.getDate();
let year=d.getFullYear();
return `${day}, ${date} ${month} ${year}`

}
const formatAMPM=(date)=> {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  // var ampm = hours >= 12 ? 'P.M.' : 'A.M.';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' ;
  return strTime;
}
const getUrl=(type)=>{
  if(type==='Clouds')
  return "https://img.icons8.com/office/16/000000/cloud.png"
  else if(type==='Sunny')
  return "https://img.icons8.com/office/16/000000/sun--v1.png"
  else if(type==='Rain')
  return "https://img.icons8.com/office/16/000000/rain.png"
  else if(type==='Haze')
  return "https://img.icons8.com/office/16/000000/fog-day--v1.png"
  else if(type==='Mist')
  return "https://img.icons8.com/office/16/000000/fog-night.png"
  else if(type==='Smoke')
  return "https://img.icons8.com/office/16/000000/light-rain.png"
  else if(type==='Clear')
  return "https://img.icons8.com/office/16/000000/sun--v1.png"
}
const handleButton=async()=>{
  console.log('clicked')
  const res1=await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=2be1f1e49570c72ca21bafa4dbda1d4f`)
  const actualRes1=await res1.json();
setData1(actualRes1);
setText('less')
setView(100)
}
const handleButton1=()=>{
  setData1({});
  setText('more details')
  setView(60)
}
  return (
    <>
    <div className='app container'>

    <div className="input-group input-group-lg mt-3">
  
  <input onChange={handleChange} type="text" placeholder="Search..." value={query} className="form-control focus-none" />
  <button onClick={handleClick} className='btn btn-primary'>🔍</button>
</div>
<div className="card  box" style={{width:'100%',height:`${view}vh`}}>

{
  (typeof data.main!=='undefined'?(<div className='card-body'>
  <h1 class="card-title text-center">{data.name}, {data.sys.country}<br/><span style={{fontSize:'10.9px'}}>{dateBuilder(new Date())}</span></h1>
  <br/>
  <div className='row '>
  
  <div className='col-6'>
  
  <div className='temp'><h4>🌡{Math.ceil(data.main.temp - 273.15)} &#176;C</h4><h6>Feels like {Math.ceil(data.main.feels_like - 273.15)} &#176;C</h6><br/>
  <h6>Min. {Math.ceil(data.main.temp_min - 273.15)} &#176;C</h6>
  <h6>Max. {Math.ceil(data.main.temp_max - 273.15)} &#176;C</h6>
  <br/>
  </div>
  <h6>🌅Sunrise: {formatAMPM(new Date(data.sys.sunrise))}A.M.</h6><br/>
  <h6>🌇 Sunset: {formatAMPM(new Date(data.sys.sunset))}P.M.</h6>
  
  </div>
  <div className='col-6'>
  <div className='main-weather'>
  <h4>{data.weather[0].main}</h4>
  <img src={(getUrl(data.weather[0].main))} alt="weather" style={{width:'30px',marginLeft:'20px'}}></img>
  <h6>{data.weather[0].description}</h6>
  </div>
  
  <br/>
  <h6>&#8595; Pressure: {data.main.pressure} hPa</h6>
  <br/><br/>
  <h6>💧 Humidity: {data.main.humidity} %</h6>
  <br/>
  <h6>💨 Wind: {data.wind.speed} km/h</h6>
  
  </div>
  </div><div className='text-center mt-5'> <button onClick={text==='less'?handleButton1:handleButton} className='btn-sm btn-primary'>View {text}</button></div>
 
{
  text==='less'?(<div className='row'><div className='text-center mt-3'><h3>Air Quality</h3><br/><br/><h5>The air quality is {getQuality(data1.list[0].main.aqi)}</h5></div><div className='col-6'><br/><h5>Air composition:</h5></div><div className='col-6'>
  <br/>
  <ul>
  <li>CO: &nbsp;&nbsp;    {data1.list[0].components.co} </li>
  <li>NO:  &nbsp;&nbsp;    {data1.list[0].components.no}</li>
  <li>NO<sub>2</sub>:   &nbsp;&nbsp;  {data1.list[0].components.no2}</li>
  <li>O<sub>3</sub>:    &nbsp;&nbsp;&nbsp;  {data1.list[0].components.o3}</li>
  <li>SO<sub>2</sub>:    &nbsp;&nbsp; {data1.list[0].components.so2}</li>
  </ul>
  </div><h6>* All measurements are in &#181;/m<sup>3</sup></h6></div>):('')
}

  </div>):('Search a valid city name...'))
}


<br/>



</div>
    
    </div>
    </>
    
  );
}

export default App;
