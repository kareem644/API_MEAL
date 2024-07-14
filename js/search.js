// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const resultsContainer = document.getElementById('results-container');
    const mealDetailsContainer = document.getElementById('meal-details-container');

    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.trim();

        if (query.length === 0) {
            suggestionsContainer.innerHTML = '';
            resultsContainer.innerHTML = '';
            return;
        }

        try {
            // Fetch data from MealDB API
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const data = await response.json();

            // Clear previous suggestions and results
            suggestionsContainer.innerHTML = '';
            resultsContainer.innerHTML = '';

            if (data.meals) {
                data.meals.forEach(meal => {
                    // Create a suggestion item
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = meal.strMeal;

                    // Handle click event for suggestions
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = meal.strMeal;
                        suggestionsContainer.innerHTML = '';
                        displayMeal(meal);
                    });

                    suggestionsContainer.appendChild(suggestionItem);
                });
            } else {
                suggestionsContainer.innerHTML = '<div class="suggestion-item">No results found</div>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Function to display meal details
    function displayMeal(meal) {
        resultsContainer.innerHTML = `
            <div class="meal-item">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" data-id="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
        `;

        // Add click event listener to the meal image
        const mealImage = resultsContainer.querySelector('.meal-item img');
        mealImage.addEventListener('click', async () => {
            try {
                // Fetch meal details
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                const data = await response.json();
                const mealDetails = data.meals[0];

                // Display meal details
                mealDetailsContainer.innerHTML = `
                    <button class="close-button">&times;</button>
                    <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}">
                    <h2>${mealDetails.strMeal}</h2>
                    <p><strong>Category:</strong> ${mealDetails.strCategory}</p>
                    <p><strong>Area:</strong> ${mealDetails.strArea}</p>
                    <p><strong>Instructions:</strong> ${mealDetails.strInstructions}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        ${Object.keys(mealDetails)
                            .filter(key => key.startsWith('strIngredient') && mealDetails[key])
                            .map(key => `<li>${mealDetails[key]} - ${mealDetails[`strMeasure${key.slice(13)}`]}</li>`)
                            .join('')}
                    </ul>
                `;
                mealDetailsContainer.classList.remove('hidden');

                // Close button functionality
                mealDetailsContainer.querySelector('.close-button').addEventListener('click', () => {
                    mealDetailsContainer.classList.add('hidden');
                });
            } catch (error) {
                console.error('Error fetching meal details:', error);
            }
        });
    }

    // Clear suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.innerHTML = '';
        }
    });
});


