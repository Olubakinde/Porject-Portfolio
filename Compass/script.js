const needle = document.getElementById('needle');
const directionDisplay = document.getElementById('direction');
const colorPicker = document.getElementById('colorPicker');
const toggleNeedleButton = document.getElementById('toggleNeedle');
const toggleThemeButton = document.getElementById('toggleTheme');
const toggleModeButton = document.getElementById('toggleMode');

let isClassicMode = true;
let soundEnabled = false;

function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/sounds/button-4.mp3');
    audio.play();
}

function updateCompass(heading) {
    const direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const directionIndex = Math.floor((heading / 45) + 0.5) % 8;
    const compassDirection = direction[directionIndex];
    
    needle.style.transform = `translateX(-50%) rotate(${heading}deg)`;
    directionDisplay.textContent = `Heading: ${Math.round(heading)}° (${compassDirection})`;
    if (soundEnabled) playSound();
}

// Simulate rotation for demonstration
let simulatedHeading = 0;
setInterval(() => {
    simulatedHeading = (simulatedHeading + 1) % 360;
    updateCompass(simulatedHeading);
}, 100);

// Use device orientation if available
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
        if (event.alpha !== null) {
            // For iOS, alpha is relative to true north
            // For Android, alpha is relative to the direction the device is pointing
            const heading = event.webkitCompassHeading || 360 - event.alpha; // Alpha is the compass heading in degrees
            updateCompass(heading);
        }
    });

    // Request permission for iOS 13+ devices
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', (event) => {
                    if (event.alpha !== null) {
                        const heading = event.webkitCompassHeading || 360 - event.alpha;
                        updateCompass(heading);
                    }
                });
            } else {
                directionDisplay.textContent = 'Permission to access device orientation was denied';
            }
        }).catch(console.error);
    }
} else {
    directionDisplay.textContent = 'Device orientation not supported';
}

// Change needle color
colorPicker.addEventListener('input', (event) => {
    const color = event.target.value;
    needle.style.background = `linear-gradient(to top, ${color}, transparent)`;
});

// Toggle needle visibility
toggleNeedleButton.addEventListener('click', () => {
    if (needle.style.display === 'none') {
        needle.style.display = 'block';
    } else {
        needle.style.display = 'none';
    }
});

// Toggle theme
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
});

// Toggle compass mode
toggleModeButton.addEventListener('click', () => {
    const compass = document.getElementById('compass');
    if (isClassicMode) {
        compass.style.transform = 'rotate(45deg)';
    } else {
        compass.style.transform = 'rotate(0deg)';
    }
    isClassicMode = !isClassicMode;
});
