function openNav() {
    document.getElementById("sidenav").classList.add("show");
    document.getElementById("main").classList.add("sidenav-open");
}

function closeNav() {
    document.getElementById("sidenav").classList.remove("show");
    document.getElementById("main").classList.remove("sidenav-open");
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    let isValid = true;

    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

    const name = document.getElementById('name').value;
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }

    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email';
        isValid = false;
    }

    const password = document.getElementById('password').value;
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        isValid = false;
    }

    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        isValid = false;
    } else if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    const phone = document.getElementById('phone').value;
    const phonePattern = /^[0-9]{10}$/;
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); 
    }
});

fetch('../index.html')
            .then(response => response.text())
            .then(data => document.getElementById('navbar-container').innerHTML = data);


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');

    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.trim();

        if (query.length === 0) {
            suggestionsContainer.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const data = await response.json();

            suggestionsContainer.innerHTML = '';

            data.results.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = item.name; 
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = item.name;
                    suggestionsContainer.innerHTML = '';
                });

                suggestionsContainer.appendChild(suggestionItem);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.innerHTML = '';
        }
    });
});
