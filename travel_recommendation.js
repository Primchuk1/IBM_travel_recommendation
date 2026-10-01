const searchButton = document.getElementById('btnSearch');
const clearButton = document.getElementById('btnReset');
const recommendations = document.getElementById('recommendations');
const input = document.getElementById('destination_input');

function getRecommendation() {
    recommendations.innerHTML = "";
    const formattedInput = input.value.trim().toLowerCase();
    if (!formattedInput) {
        recommendations.innerHTML = "Please enter a destination";
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            if ("temples".includes(formattedInput)) {
                results = data["temples"];
            } else if ("beaches".includes(formattedInput)) {
                results = data["beaches"];
            } else {
                results = data["countries"].flatMap(country => country['cities'].filter(city => city.name.toLowerCase().includes(formattedInput)));

            }
            if (results.length === 0) {
                recommendations.innerHTML = "No recommendations found";
                return;
            } else {
                results.forEach(result => {

                    const card = document.createElement('article');
                    card.className = 'recommendation-card';

                    const image = document.createElement('img');
                    image.src = result.imageUrl;
                    image.alt = result.name;
                    image.loading = 'lazy';

                    const content = document.createElement('div');
                    content.className = 'recommendation-card-content';
                    const title = document.createElement('h2');
                    title.textContent = result.name;
                    const description = document.createElement('p');
                    description.textContent = result.description;

                    content.append(title, description);
                    card.append(image, content);
                    recommendations.append(card);
                })
            }
        })
        .catch(error => {
            console.error(error);
            recommendations.innerHTML = "There was an error fetching data";
        });
}

function clearRecommendations() {
    recommendations.innerHTML = "";
    input.value = "";
}

/*
function getLocalTime(city) {
    fetch(`https://timezones.live/api/v1/time?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            return { currentTime: data.data.currentTime, timezone: data.data.timezone };
        })
        .catch(error => console.error(error));
}
        */

searchButton.addEventListener("click", getRecommendation);
clearButton.addEventListener("click", clearRecommendations);