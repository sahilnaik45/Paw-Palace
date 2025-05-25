document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.section-btn');
    const contentSections = document.querySelectorAll('.content');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            
            // Hide all sections
            contentSections.forEach(sectionContent => {
                sectionContent.style.display = 'none';
            });
            
            // Show the selected section
            const activeSection = document.querySelector(`.content.${section}`);
            if (activeSection) {
                activeSection.style.display = 'block';
            }
        });
    });
});
