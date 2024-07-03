const apiKey = '1cbc83e2edef8639cf9b4c7d39c41077'; 
const city = 'mangalagiri'; 
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
  

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();

    calendarElement.textContent = `${day}-${month}-${year}`;
}

function updateWeather() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherElement = document.getElementById('weather');
            const cityElement = document.getElementById('city');
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            weatherElement.textContent = `Temperature: ${temperature}°C, ${description}`;
            cityElement.textContent = data.name; // Update the city name based on API response
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function updateClockAndCalendarAndWeather() {
    updateClock();
    updateCalendar();
    updateWeather();
}

setInterval(updateClockAndCalendarAndWeather, 1000);
updateClockAndCalendarAndWeather(); // Initial call to display clock, calendar, and weather immediately on load

// Task Manager
const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-task-button';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = ''; // Clear the input
    }
});