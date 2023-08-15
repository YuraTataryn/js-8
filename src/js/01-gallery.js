import { galleryItems } from "./gallery-items.js";
const galleryListItem = document.querySelector(".gallery");

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      width="250px"
    />
  </a>
</li>`
    )
    .join("");
}

galleryListItem.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

const galleryLinks = document.querySelectorAll(".gallery__link");

galleryLinks.forEach((galleryLink) => {
  galleryLink.addEventListener("click", function (clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.target.tagName !== 'IMG') {
      return;
    }

    const bigImage = {
      original: clickEvent.target.dataset.source,
      description: clickEvent.target.alt
    };
    const modalWindow = basicLightbox.create(
        `<div class="modal">
          <img src="${bigImage.original}" alt="${bigImage.description}" width="800px">
        </div>`,
        {
          onClose: (instance) => {
            instance.element().remove();
          },
          onShow: (instance) => {
            const escapeWindow = (escEvent) => {
              if (escEvent.key === "Escape") {
                instance.close();
              }
            };
            document.addEventListener("keydown", escapeWindow);
          }
        }
    );
      modalWindow.show();
    });
});