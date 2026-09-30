const searchButton = document.getElementById('btnSearch');
const recommendations = document.getElementById('recommendations');

function getRecommendation() {
    const input = document.getElementById('destination_input').value;
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            data["countries"].forEach(country => {
                country['cities'].forEach(city => {
                    if (city.name.toLowerCase().includes(input.toLowerCase())) {
                        recommendations.innerHTML += `<h2>${city.name}</h2>`;
                        recommendations.innerHTML += `<p>${city.description}</p>`;
                        recommendations.innerHTML += `<img src="${city.imageUrl}">`;
                    }
                })
            })
        })
        .catch(error => {
            console.error(error);
            recommendations.innerHTML = "There was an error fetching data";
        });
}

searchButton.addEventListener("click", getRecommendation); 