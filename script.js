//your code here
const imagesContainer = document.getElementById("images");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedImages = [];
let identicalIndex;

// Initialize the state
function initialize() {
  selectedImages = [];
  para.innerText = "";
  verifyButton.style.display = "none";
  resetButton.style.display = "none";
  
  // Randomly choose an identical image index
  identicalIndex = Math.floor(Math.random() * imageClasses.length);
  
  // Create image elements
  const images = [];
  for (let i = 0; i < imageClasses.length; i++) {
    images.push(createImageElement(imageClasses[i]));
  }

  // Add a duplicate image
  images.push(createImageElement(imageClasses[identicalIndex]));
  
  // Randomize image positions
  images.sort(() => Math.random() - 0.5);

  // Clear the container and append new images
  imagesContainer.innerHTML = "";
  images.forEach(img => imagesContainer.appendChild(img));
}

// Create image element with a click event listener
function createImageElement(className) {
  const img = document.createElement("img");
  img.className = className;
  img.addEventListener("click", () => handleImageClick(img));
  return img;
}

// Handle image click
function handleImageClick(img) {
  // Avoid adding duplicate images
  if (selectedImages.includes(img)) return;

  // Highlight the selected image
  img.classList.add("selected");
  selectedImages.push(img);

  // Show reset button on first click
  if (selectedImages.length > 0) {
    resetButton.style.display = "inline-block";
  }

  // Show verify button when two images are selected
  if (selectedImages.length === 2) {
    verifyButton.style.display = "inline-block";
  }

  // Prevent more than two images from being selected
  if (selectedImages.length > 2) {
    selectedImages.forEach(image => image.classList.remove("selected"));
    selectedImages = [];
    img.classList.add("selected");
    selectedImages.push(img);
  }
}

// Reset to the initial state
resetButton.addEventListener("click", () => {
  initialize();
  verifyButton.style.display = "none";
  resetButton.style.display = "none";
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
});

// Verify the selected images
verifyButton.addEventListener("click", () => {
  const class1 = selectedImages[0].className;
  const class2 = selectedImages[1].className;
  
  if (class1 === class2) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyButton.style.display = "none";
});

// Initialize the app on load
window.onload = initialize;
