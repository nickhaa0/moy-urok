// Текущая дата

const dateElement = document.querySelector("#currentDate");



if (dateElement) {

    const days = [

        "Воскресенье",

        "Понедельник",

        "Вторник",

        "Среда",

        "Четверг",

        "Пятница",

        "Суббота"

    ];



    const months = [

        "января", "февраля", "марта", "апреля",

        "мая", "июня", "июля", "августа",

        "сентября", "октября", "ноября", "декабря"

    ];



    const today = new Date();



    dateElement.textContent =

        `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]}`;

}





// Отметка выполненных заданий

const checkboxes = document.querySelectorAll(".task-checkbox");



function updateProgress() {

    const total = checkboxes.length;

    const completed = document.querySelectorAll(".task-checkbox:checked").length;



    const progress = document.querySelector("#progress");



    if (progress && total > 0) {

        progress.textContent = `${completed} из ${total} выполнено`;

    }

}



checkboxes.forEach((checkbox, index) => {

    const saved = localStorage.getItem(`task-${index}`);



    if (saved === "true") {

        checkbox.checked = true;

    }



    checkbox.addEventListener("change", () => {

        localStorage.setItem(

            `task-${index}`,

            checkbox.checked

        );



        updateProgress();

    });

});



updateProgress();





// Модальное окно

const modal = document.querySelector("#lessonModal");

const openButton = document.querySelector("#openModal");

const closeButton = document.querySelector("#closeModal");



if (openButton && modal) {

    openButton.addEventListener("click", () => {

        modal.classList.add("active");

    });

}



if (closeButton && modal) {

    closeButton.addEventListener("click", () => {

        modal.classList.remove("active");

    });

}



if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    });

}





// Добавление нового урока

const lessonForm = document.querySelector("#lessonForm");

const scheduleList = document.querySelector(".schedule-list");



if (lessonForm && scheduleList) {

    lessonForm.addEventListener("submit", (event) => {

        event.preventDefault();



        const subject = document.querySelector("#subject").value;

        const homework = document.querySelector("#homework").value;

        const time = document.querySelector("#time").value;

        const selfStudy = document.querySelector("#selfStudy").checked;



        const lesson = document.createElement("div");



        lesson.className = "lesson-card";



        lesson.innerHTML = `

            <div>

                <h3>${subject}</h3>

                <p>${homework || "Домашнее задание не добавлено"}</p>

                ${

                    selfStudy

                    ? '<span class="tag tag-green">Самостоятельная</span>'

                    : ''

                }

            </div>



            <div class="lesson-right">

                <span class="lesson-time">${time}</span>

                <input type="checkbox" class="task-checkbox">

            </div>

        `;



        scheduleList.appendChild(lesson);



        const checkbox = lesson.querySelector(".task-checkbox");



        checkbox.addEventListener("change", updateProgress);



        if (modal) {

            modal.classList.remove("active");

        }



        lessonForm.reset();

        updateProgress();

    });

}





// Плавное появление блоков

const elements = document.querySelectorAll(

    ".hero, .section, .lesson-card, .important-card"

);



const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.1

    }

);



elements.forEach((element) => {

    element.classList.add("hidden");

    observer.observe(element);

});