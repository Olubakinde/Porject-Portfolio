document.addEventListener('DOMContentLoaded', function() {
    const treasures = document.querySelectorAll('.treasure');
    let currentIndex = 0;

    // Hide all treasures except the first one
    treasures.forEach((treasure, index) => {
        if (index !== currentIndex) {
            treasure.style.display = 'none';
        }
    });

    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', showPrevTreasure);
    nextBtn.addEventListener('click', showNextTreasure);

    // Modal elements
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close');
    const saveHistoryBtn = document.getElementById('save-history-btn');
    const historyInput = document.getElementById('history-input');

    // Event listeners for treasures
    treasures.forEach((treasure, index) => {
        treasure.addEventListener('click', () => {
            currentIndex = index;
            updateModal();
            modal.style.display = 'flex';
        });
    });

    // Close modal on close button click or outside click
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to update modal content with current treasure info
    function updateModal() {
        const currentCaption = treasures[currentIndex].getAttribute('data-info');
        modalContent.querySelector('h2').textContent = currentCaption;

        // Retrieve stored history for current treasure, if available
        const storedHistory = getStoredHistory(currentCaption);
        historyInput.value = storedHistory ? storedHistory : '';
    }

    // Save history button functionality
    saveHistoryBtn.addEventListener('click', () => {
        const history = historyInput.value.trim();
        const currentCaption = treasures[currentIndex].getAttribute('data-info');
        
        // Save history to localStorage
        saveHistory(currentCaption, history);

        // Close the modal
        modal.style.display = 'none';
    });

    // Function to save history to localStorage
    function saveHistory(caption, history) {
        localStorage.setItem(caption, history);
    }

    // Function to retrieve history from localStorage
    function getStoredHistory(caption) {
        return localStorage.getItem(caption);
    }

    // Functions for navigation buttons
    function showPrevTreasure() {
        treasures[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + treasures.length) % treasures.length;
        treasures[currentIndex].style.display = 'block';
        updateModal();
    }

    function showNextTreasure() {
        treasures[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % treasures.length;
        treasures[currentIndex].style.display = 'block';
        updateModal();
    }
});
