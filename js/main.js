// js/main.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Код для E-mail подсказок (существующий) ---
    const emailInput = document.getElementById('emailInput');
    const emailSuggestionsContainer = document.getElementById('emailSuggestions');

    if (emailInput && emailSuggestionsContainer) {
        const popularDomains = ['@gmail.com', '@yandex.ru', '@mail.ru', '@outlook.com', '@icloud.com'];

        emailInput.addEventListener('input', function() {
            const inputValue = this.value;
            emailSuggestionsContainer.innerHTML = '';

            if (inputValue.length > 0 && !inputValue.includes('@')) {
                emailSuggestionsContainer.classList.add('hero__email-suggestions--visible');

                popularDomains.forEach(domain => {
                    const suggestionText = inputValue + domain;
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = suggestionText;

                    suggestionItem.addEventListener('click', function() {
                        emailInput.value = suggestionText;
                        emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible');
                        emailInput.focus();
                    });

                    emailSuggestionsContainer.appendChild(suggestionItem);
                });
            } else {
                emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible');
            }
        });

        document.addEventListener('click', function(event) {
            if (!emailInput.contains(event.target) && !emailSuggestionsContainer.contains(event.target)) {
                emailSuggestionsContainer.classList.remove('hero__email-suggestions--visible');
            }
        });
    } else {
        // Выведем предупреждение, если основные элементы для подсказок не найдены,
        // чтобы было легче отлаживать, если что-то пойдет не так с HTML.
        if (!emailInput) console.warn('Email input field (id="emailInput") not found.');
        if (!emailSuggestionsContainer) console.warn('Email suggestions container (id="emailSuggestions") not found.');
    }

    // --- НОВЫЙ КОД: Плавный скролл ---
    const smoothScrollLinks = document.querySelectorAll('.js-smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение якоря

            const targetId = this.getAttribute('href'); // Получаем id цели (например, "#full-list")
            // Убедимся, что targetId - это действительно якорь, а не внешняя ссылка
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Рассчитываем позицию элемента
                    // Можно добавить смещение, если у вас фиксированный header
                    // const headerOffset = 70; // Пример высоты вашего header
                    // const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

                    // Просто скролл к элементу (современные браузеры поддерживают 'smooth')
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // или 'center' в зависимости от предпочтений
                    });
                } else {
                    console.warn('Smooth scroll target not found for link:', targetId);
                }
            }
        });
    });

    // --- НОВЫЙ КОД: Кнопка "Наверх" ---
    const scrollToTopButton = document.getElementById('scrollToTopButton');

    if (scrollToTopButton) {
        window.addEventListener('scroll', function() {
            // Показать кнопку, если прокрутили больше чем на высоту одного экрана (примерно)
            if (window.pageYOffset > window.innerHeight / 2) {
                scrollToTopButton.classList.add('scroll-to-top--visible');
            } else {
                scrollToTopButton.classList.remove('scroll-to-top--visible');
            }
        });

        // Плавный скролл для кнопки "Наверх" уже должен обрабатываться
        // кодом для .js-smooth-scroll, так как у нее href="#hero" и этот класс.
        // Если нет, можно добавить отдельный обработчик:
        // scrollToTopButton.addEventListener('click', function(e) {
        //     e.preventDefault();
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     });
        // });
    } else {
        console.warn('Scroll to top button (id="scrollToTopButton") not found.');
    }


    // --- НОВЫЙ КОД: Обновление года в футере ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn('Current year span (id="currentYear") not found.');
    }

}); // Конец обработчика DOMContentLoaded