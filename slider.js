
const slider = document.querySelector(".slider");
const track = document.querySelector(".slider-track");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

const originalSlides = Array.from(
    track.querySelectorAll(".slide")
);

const totalSlides = originalSlides.length;

// Create copies for infinite looping
track.appendChild(originalSlides[0].cloneNode(true));
track.insertBefore(
    originalSlides[totalSlides - 1].cloneNode(true),
    originalSlides[0]
);

let currentIndex = 1;

// Create navigation dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", "Go to bike " + (i + 1));

    dot.addEventListener("click", function () {
        currentIndex = i + 1;
        updateSlider();
    });

    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll(".dot");

// Update image position and active dot
function updateSlider() {
    const slideWidth = slider.clientWidth;

    track.style.transform =
        `translateX(-${currentIndex * slideWidth}px)`;

    let dotIndex = currentIndex - 1;

    if (dotIndex < 0) {
        dotIndex = totalSlides - 1;
    }

    if (dotIndex >= totalSlides) {
        dotIndex = 0;
    }

    dots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === dotIndex);
    });
}

// Move to the next bike
nextButton.addEventListener("click", function () {
    currentIndex++;
    updateSlider();
});

// Move to the previous bike
prevButton.addEventListener("click", function () {
    currentIndex--;
    updateSlider();
});

// Handle infinite looping
track.addEventListener("transitionend", function () {
    if (currentIndex === totalSlides + 1) {
        resetSlider(1);
    } else if (currentIndex === 0) {
        resetSlider(totalSlides);
    }
});

function resetSlider(newIndex) {
    track.style.transition = "none";
    currentIndex = newIndex;
    updateSlider();

    // Restore the sliding animation
    track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
}

// Adjust the position when the screen resizes
window.addEventListener("resize", function () {
    track.style.transition = "none";
    updateSlider();

    requestAnimationFrame(function () {
        track.style.transition = "transform 0.5s ease";
    });
});

// Show the first bike
updateSlider();
