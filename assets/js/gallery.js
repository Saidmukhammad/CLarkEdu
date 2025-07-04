document.addEventListener('DOMContentLoaded', () => {
   // Данные о преподавателях и курсах с новым списком и структурированным расписанием
   const teachers = [
       {
           name: "Анна Иванова",
           course: "Английский",
           description: "Опытный преподаватель английского языка с сертификатом TEFL. Специализируется на разговорной практике и подготовке к международным экзаменам.",
           backgroundUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?fit=crop&w=1280&h=720&q=80",
           profileLink: "#",
           courseDescription: "Курсы английского языка для всех уровней, от начального до продвинутого. Фокус на разговорной речи и грамматике.",
           schedule: [
               { day: "Понедельник", time: "10:00 - 12:00", group: "Начальный уровень" },
               { day: "Среда", time: "10:00 - 12:00", group: "Начальный уровень" },
               { day: "Вторник", time: "14:00 - 16:00", group: "Средний уровень" },
               { day: "Четверг", time: "14:00 - 16:00", group: "Средний уровень" }
           ]
       },
       {
           name: "Петр Сидоров",
           course: "Немецкий",
           description: "Носитель немецкого языка, преподаватель с многолетним стажем. Поможет освоить немецкий для путешествий, работы или учебы.",
           backgroundUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=1280&h=720&q=80",
           profileLink: "#",
           courseDescription: "Изучение немецкого языка: основы грамматики, лексики и разговорной практики. Подготовка к экзаменам TestDaF и Goethe-Zertifikat.",
           schedule: [
               { day: "Вторник", time: "09:00 - 11:00", group: "Начальный уровень" },
               { day: "Четверг", time: "09:00 - 11:00", group: "Начальный уровень" },
               { day: "Среда", time: "15:00 - 17:00", group: "Продвинутый уровень" },
               { day: "Пятница", time: "15:00 - 17:00", group: "Продвинутый уровень" }
           ]
       },
       {
           name: "Елена Смирнова",
           course: "Китайский",
           description: "Переводчик и преподаватель китайского языка с опытом проживания в Китае. Поможет освоить язык с нуля до уверенного общения.",
           backgroundUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?fit=crop&w=1280&h=720&q=80",
           profileLink: "#",
           courseDescription: "Курс китайского языка, включая иероглифы, произношение и культурные особенности. Подготовка к HSK.",
           schedule: [
               { day: "Понедельник", time: "18:00 - 20:00", group: "Начальный уровень" },
               { day: "Среда", time: "18:00 - 20:00", group: "Начальный уровень" },
               { day: "Суббота", time: "10:00 - 13:00", group: "Разговорный клуб" }
           ]
       },
       {
           name: "Дмитрий Козлов",
           course: "IT",
           description: "Ведущий IT-специалист, наставник по разработке и IT-инфраструктуре. Поможет разобраться в мире технологий и начать карьеру.",
           backgroundUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=1280&h=720&q=80",
           profileLink: "#",
           courseDescription: "Обзорные курсы по основам IT, включая программирование, сети, базы данных и кибербезопасность.",
           schedule: [
               { day: "Вторник", time: "19:00 - 21:00", group: "Основы IT" },
               { day: "Четверг", time: "19:00 - 21:00", group: "Основы IT" },
               { day: "Суббота", time: "14:00 - 17:00", group: "Практикум по программированию" }
           ]
       },
       {
           name: "Мария Волкова",
           course: "Робототехника",
           description: "Инженер-робототехник, страстно увлеченная созданием и программированием роботов. Ее курсы вдохновляют на новые открытия.",
           backgroundUrl: "https://images.unsplash.com/photo-1555212697-cd45778a48b5?fit=crop&w=1280&h=720&q=80",
           profileLink: "#",
           courseDescription: "Введение в робототехнику: конструирование, основы электроники и программирование роботов.",
           schedule: [
               { day: "Среда", time: "16:00 - 18:00", group: "Начальный уровень" },
               { day: "Пятница", time: "16:00 - 18:00", group: "Начальный уровень" },
               { day: "Воскресенье", time: "11:00 - 14:00", group: "Продвинутый проект" }
           ]
       }
   ];

   const teachersList = document.getElementById('teachers-list');
   const scheduleModal = document.getElementById('schedule-modal');
   const modalCloseBtn = document.getElementById('modal-close-btn');
   const modalScheduleContent = document.getElementById('modal-schedule-content'); // Теперь это будет контейнер для таблицы
   let activeIndex = 0; // Индекс активного элемента

   // Функция для открытия модального окна
   function openModal(teacherName, scheduleData) {
       modalScheduleContent.innerHTML = ''; // Очищаем содержимое перед добавлением новой таблицы

       // Добавляем заголовок расписания в модальное окно
       const modalTitle = scheduleModal.querySelector('.modal-title');
       modalTitle.innerText = `Расписание преподавателя ${teacherName}`;

       if (scheduleData && scheduleData.length > 0) {
           const table = document.createElement('table');
           table.classList.add('schedule-table'); // Добавляем класс для стилизации

           // Создаем заголовок таблицы
           const thead = document.createElement('thead');
           const headerRow = document.createElement('tr');
           const thDay = document.createElement('th');
           thDay.innerText = "День";
           const thTimeGroup = document.createElement('th');
           thTimeGroup.innerText = "Время / Группа";
           
           headerRow.appendChild(thDay);
           headerRow.appendChild(thTimeGroup);
           thead.appendChild(headerRow);
           table.appendChild(thead);

           // Создаем тело таблицы
           const tbody = document.createElement('tbody');
           scheduleData.forEach(item => {
               const row = document.createElement('tr');
               const tdDay = document.createElement('td');
               tdDay.innerText = item.day;
               const tdTimeGroup = document.createElement('td');
               tdTimeGroup.innerHTML = `${item.time} <br> <span class="schedule-group">${item.group}</span>`; // Комбинируем время и группу

               row.appendChild(tdDay);
               row.appendChild(tdTimeGroup);
               tbody.appendChild(row);
           });
           table.appendChild(tbody);

           modalScheduleContent.appendChild(table);
       } else {
           modalScheduleContent.innerText = "Расписание отсутствует.";
       }

       scheduleModal.classList.add('is-visible');
       document.body.style.overflow = 'hidden'; // Запретить прокрутку фона
   }

   // Функция для закрытия модального окна
   function closeModal() {
       scheduleModal.classList.remove('is-visible');
       document.body.style.overflow = ''; // Разрешить прокрутку фона
   }

   // Обработчик закрытия модального окна
   modalCloseBtn.addEventListener('click', closeModal);
   scheduleModal.addEventListener('click', (e) => {
       if (e.target === scheduleModal) { // Закрыть, если клик вне содержимого модала
           closeModal();
       }
   });

   // Функция для рендеринга элементов галереи
   function renderGallery() {
       teachersList.innerHTML = ''; // Очищаем список перед рендерингом

       teachers.forEach((artist, i) => {
           const listItem = document.createElement('li');
           listItem.style.backgroundImage = `url(${artist.backgroundUrl})`;
           listItem.setAttribute('role', 'button');
           listItem.classList.add('teacher-item');

           if (i === activeIndex) {
               listItem.classList.add('active');
           }

           listItem.innerHTML = `
               <h3>${artist.name}</h3>
               <div class="section-content">
                   <div class="inner">
                       <div class="bio">
                           <h2>${artist.name}</h2>
                           <p>${artist.description}</p>
                           <h3>Курс: ${artist.course}</h3>
                           <p>${artist.courseDescription}</p>
                           <a href="${artist.profileLink}" target="_blank" class="artist-profile-link md:hidden">
                               <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                                   Подробнее о преподавателе
                               </button>
                           </a>
                           <button class="view-schedule-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                               Узнать расписание
                           </button>
                       </div>
                   </div>
               </div>
           `;

           // Обработчик клика для активации элемента галереи
           listItem.addEventListener('click', (e) => {
               // Предотвращаем срабатывание клика по всему li при клике на кнопку расписания
               if (e.target.classList.contains('view-schedule-btn')) {
                   return;
               }

               if (activeIndex === i) return;

               document.querySelectorAll('.teacher-item').forEach(item => {
                   item.classList.remove('active');
               });

               listItem.classList.add('active');
               activeIndex = i;
           });

           // Обработчик клика для кнопки "Узнать расписание"
           const viewScheduleBtn = listItem.querySelector('.view-schedule-btn');
           if (viewScheduleBtn) {
               viewScheduleBtn.addEventListener('click', () => {
                   // Передаем имя преподавателя и его расписание
                   openModal(artist.name, artist.schedule);
               });
           }

           teachersList.appendChild(listItem);
       });
   }

   // Рендерим галерею при загрузке страницы
   renderGallery();

   // Устанавливаем активный элемент после первого рендера
   if (teachers.length > 0) {
       teachersList.children[activeIndex].classList.add('active');
       const activeInner = teachersList.children[activeIndex].querySelector('.section-content .inner');
       if (activeInner) {
           activeInner.style.opacity = 1;
       }
   }
});