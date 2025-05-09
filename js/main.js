// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailInput');
    const emailSuggestionsContainer = document.getElementById('emailSuggestions');
    const popularDomains = ['@gmail.com', '@yandex.ru', '@mail.ru', '@outlook.com', '@icloud.com']; // Список популярных доменов

    if (emailInput && emailSuggestionsContainer) {
        emailInput.addEventListener('input', function() {
            const inputValue = this.value;
            emailSuggestionsContainer.innerHTML = ''; // Очищаем предыдущие подсказки

            if (inputValue.length > 0 && !inputValue.includes('@')) {
                emailSuggestionsContainer.classList.add('hero__email-suggestions--visible'); // Показываем контейнер

                popularDomains.forEach(domain => {
                    const suggestionText = inputValue + domain;
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = suggestionText;

                    suggestionItem.addEventListener('click', function() {
                        emailInput.value = suggestionText;
                        emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible'); // Скрываем подсказки
                        emailInput.focus();
                    });

                    emailSuggestionsContainer.appendChild(suggestionItem);
                });
            } else {
                emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible'); // Скрываем контейнер
            }
        });

        // Скрывать подсказки при клике вне инпута и подсказок
        document.addEventListener('click', function(event) {
            if (!emailInput.contains(event.target) && !emailSuggestionsContainer.contains(event.target)) {
                emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible');
            }
        });

        // Опционально: скрывать подсказки при потере фокуса с инпута,
        // но это может конфликтовать с кликом по самой подсказке, если сделано неосторожно.
        // Клик вне элемента уже должен покрывать большинство случаев.
        // emailInput.addEventListener('blur', function() {
        //     // Небольшая задержка, чтобы успел сработать клик по подсказке
        //     setTimeout(() => {
        //         if (!emailSuggestionsContainer.matches(':hover')) { // Если мышь не над подсказками
        //             emailSuggestionsContainer.style.display = 'none';
        //         }
        //     }, 150);
        // });
    }

    // Сюда можно будет добавить другую JS логику для страницы, например, плавный скролл, валидацию и т.д.
    // Если у вас уже есть код для валидации email, эта новая функция должна быть до него или после,
    // главное, чтобы они не конфликтовали.
});