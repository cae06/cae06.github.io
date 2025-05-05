document.addEventListener("DOMContentLoaded", () => {
  const imagesContainer = document.getElementById("carouselImages");
  const captionElement = document.getElementById("carouselCaption");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  let gallery = [];
  let currentIndex = 0;

  // Load gallery.json data
  fetch("assets/gallery.json") // adjust path if needed
    .then(response => response.json())
    .then(data => {
      gallery = data;
      displayImage(currentIndex);
    })
    .catch(error => {
      console.error("Error loading gallery data:", error);
    });

  function displayImage(index) {
    const { url, caption } = gallery[index];

    // Clear and update image container
    imagesContainer.innerHTML = `<img src="${url}" alt="${caption}">`;
    captionElement.textContent = caption;
  }

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    displayImage(currentIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % gallery.length;
    displayImage(currentIndex);
  });
});
