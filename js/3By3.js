// Function to load images dynamically
function loadGallery() {
    fetch('assets/story.json')  
      .then(response => response.json())
      .then(data => {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Clear gallery
  
        data.images.forEach(item => {
          // Create gallery item
          const galleryItem = document.createElement('div');
          galleryItem.classList.add('gallery-item');
          
          const img = document.createElement('img');
          img.src = item.src; 
          img.alt = item.description;
  
          // Add description text under the image
          const description = document.createElement('p');
          description.textContent = item.description;
          description.classList.add('gallery-description');
  
          galleryItem.addEventListener('click', () => {
            openModal(item.src, item.description);
          });
  
          galleryItem.appendChild(img);
          galleryItem.appendChild(description);
          gallery.appendChild(galleryItem);
        });
      })
      .catch(error => {
        console.error('Error loading story.json:', error);
      });
  }
  
 // Open the modal to display the enlarged image and description
function openModal(imgSrc, description) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalDescription = document.getElementById('modal-description');
    
    modal.style.display = 'flex';  // Show the modal
    modalImg.src = imgSrc;       // Set the image source
    modalDescription.textContent = description;  // Set the description
  }
  
  // Close the modal when clicking outside the image or on the close button
  document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('close')) {
      closeModal();
    }
  });
  
  // Close the modal function
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';  // Hide the modal
  }
  
  
  // Load the gallery when the page loads
  window.onload = loadGallery;
  