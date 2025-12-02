document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipe-submission-form');
    const successMessage = document.getElementById('success-message');

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        recipeForm.style.display = 'none';

        successMessage.style.display = 'block';
    });
});