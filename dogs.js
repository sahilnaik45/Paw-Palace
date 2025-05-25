// JavaScript for dynamic behavior in the Paw Palace theme

document.addEventListener("DOMContentLoaded", () => {
    // Highlight active tab
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Smooth scroll for tabs
    const tabs = document.querySelector("#info-tabs");
    if (tabs) {
        tabs.addEventListener("click", event => {
            if (event.target.tagName === "A") {
                const targetId = event.target.getAttribute("href").slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    }

    // Photo gallery zoom effect
    const galleryImages = document.querySelectorAll(".gallery img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.className = "image-overlay";
            overlay.innerHTML = `
                <div class="overlay-content">
                    <img src="${img.src}" alt="Zoomed image">
                    <button class="close-overlay">&times;</button>
                </div>
            `;
            document.body.appendChild(overlay);

            const closeButton = overlay.querySelector(".close-overlay");
            closeButton.addEventListener("click", () => {
                document.body.removeChild(overlay);
            });

            overlay.addEventListener("click", event => {
                if (event.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });

    // Tooltip initialization (if needed for additional features)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
