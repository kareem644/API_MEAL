fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
  .then(response => response.json())
  .then(data => {
    const areas = data.meals;
    displayAreas(areas);
  })
  .catch(error => console.error('Error fetching areas:', error));


  function displayAreas(areas) {
    const areasRow = document.getElementById('areasRow');
    areas.forEach(area => {
      const areaHTML = `
        <div class="col-md-3 mb-4">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">${area.strArea}</h5>
              <a href="#" class="btn btn-primary btn-sm" onclick="fetchMealDetails('${area.strArea}')">
                View Details
              </a>
            </div>
          </div>
        </div>
      `;
      areasRow.innerHTML += areaHTML;
    });
  }

  function fetchAndDisplayDetails(area) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        displayMealDetails(meal);
      })
      .catch(error => console.error('Error fetching meal details:', error));
  }
  
  function displayMealDetails(meal) {
    const detailsContainer = document.getElementById('mealDetails');
    detailsContainer.innerHTML = `
      <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text"><strong>Instructions:</strong> ${meal.strInstructions}</p>
          <p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>
          <p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>
          <p class="card-text"><strong>Tags:</strong> ${meal.strTags}</p>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Watch Recipe</a>
        </div>
      </div>
    `;
  }
  fetch('../index.html')
            .then(response => response.text())
            .then(data => document.getElementById('navbar-container').innerHTML = data);