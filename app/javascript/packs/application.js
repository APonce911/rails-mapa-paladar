import "bootstrap";

jQuery(".alert-info" ).slideUp({duration:3000});

// Function to disable share button
const shareButton = document.getElementById("share-btn")
shareButton.addEventListener('click', function() {
  shareButton.style.display = 'none';
});


