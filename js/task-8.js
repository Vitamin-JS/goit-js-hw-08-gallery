// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения
// в модальном окне. Превью результата посмотри по ссылке.

// Разбей задание на несколько подзадач:

// 1) Создание и рендер разметки по массиву данных и предоставленному шаблону. ====== OK
// 2) Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3) Открытие модального окна по клику на элементе галереи.
// 4) Подмена значения атрибута src элемента img.lightbox__image.
// 5) Закрытие модального окна по клику на кнопку button [data-action= "close-lightbox"].
// 6) Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
//     чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели
//      предыдущее.

// Стартовые файлы
// В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
// В файле gallery-items.js есть массив объектов содержащих информацию о изображениях:
// маленькое изображение, оригинальное и описание.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на
// элементе img, и указываться в href ссылки(это необходимо для доступности).

//
//   <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>;
//

//     Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой
// по работе с событиями.

// 1) Закрытие модального окна по клику на div.lightbox__overlay.
// 2) Закрытие модального окна по нажатию клавиши ESC.
// 3) Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import galleryArrayOfItems from "/gallery-items.js";
// console.log(galleryArrayOfItems);

const galleryRef = document.querySelector(".js-gallery"); // ref at UL
const modalWindowRef = document.querySelector(".js-lightbox"); // ref at div
const galleryCollection = createGalleryItems(galleryArrayOfItems);
const modalWindowCloseBtn = document.querySelector(
  '[data-action="close-lightbox"]'
);
const gallerySingleImage = document.querySelector(".lightbox__image");

// ============== Creating images on page====================================
function createGalleryItems(galleryArrayOfItems) {
  return galleryArrayOfItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link"
        href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li> `;
    })
    .join("");
}

galleryRef.insertAdjacentHTML("beforeend", galleryCollection);

// ================= Delegating =============================================
galleryRef.addEventListener("click", onGaleryClick);

function onGaleryClick(evt) {
  if (evt.target.nodeName !== "IMG") {
    //  используем IMG т.к. он самый верхний элемент
    return;
  }
  evt.preventDefault();
}

// ================= Open Modal window ===================================
galleryRef.addEventListener("click", onOpenModal);

function onOpenModal(evt) {
  modalWindowRef.classList.add("is-open");
  // console.log(evt.target.src);
  // console.log(evt.target.dataset.source);
  gallerySingleImage.src = evt.target.dataset.source;
  gallerySingleImage.alt = evt.target.alt;
}

// ================= Close Modal window ===================================
modalWindowCloseBtn.addEventListener("click", onCloseModal);
function onCloseModal() {
  modalWindowRef.classList.replace("lightbox.is-open", "lightbox");
}
