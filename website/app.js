/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "&APPID=b1092f3e717c5861513554d16c317fe3&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
const userInfo = document.getElementById('userInfo');

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  // disable event
  e.preventDefault();
  // get user input values
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  //call getWeather function
  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
  //reset user input form data
  userInfo.reset();
}


/*Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
	//console.log("userData:>", userData);//My debug
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
	//console.log("data:>", data);//My debug
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
	//console.log("newData:>", newData);//My debug
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp + "&#8457";
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};