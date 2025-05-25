// Array to store reviews
let reviews = [
    { name: 'Riya Lalbeg', review: 'Amazing! My dog loves the products.', rating: 5, date: new Date() },
    { name: 'Abhishek Raut', review: 'Great service, fast delivery.', rating: 4, date: new Date() },
    { name: 'Atharva Tapkir', review: 'Highly recommend Paw Palace!', rating: 5, date: new Date() },
    { name: 'Mudra Bamne', review: 'Excellent quality products.', rating: 5, date: new Date() }
];

// Render reviews
function renderReviews(reviewsToShow) {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';

    reviewsToShow.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="review-name">${review.name}</span>
                <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
            </div>
            <p>${review.review}</p>
        `;
        reviewList.appendChild(reviewDiv);
    });
}

// Submit a review
document.getElementById('reviewForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('reviewText').value;

    // Get selected rating
    const selectedStars = document.querySelectorAll('.star-rating .selected');
    const rating = selectedStars.length; // Count selected stars

    // Create a new review object
    const newReview = {
        name: name,
        review: reviewText,
        rating: rating,
        date: new Date()
    };

    // Add to reviews array and re-render
    reviews.push(newReview);
    renderReviews(reviews.slice(-5)); // Show only latest 5 reviews

    // Reset form
    document.getElementById('reviewForm').reset();
    document.querySelectorAll('.star-rating .star').forEach(star => star.classList.remove('selected'));
});

// Handle star rating selection
const stars = document.querySelectorAll('.star-rating .star');
stars.forEach(star => {
    star.addEventListener('click', function () {
        const rating = parseInt(this.getAttribute('data-value'));
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('selected');
        }
    });
});

// Open all reviews slider
function openReviewsSlide() {
    const slide = document.getElementById('reviewsSlide');
    slide.style.bottom = '0';
    const allReviewsList = document.getElementById('all-reviews-list');
    allReviewsList.innerHTML = '';
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="review-name">${review.name}</span>
                <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
            </div>
            <p>${review.review}</p>
        `;
        allReviewsList.appendChild(reviewDiv);
    });
}

// Close all reviews slider
function closeReviewsSlide() {
    document.getElementById('reviewsSlide').style.bottom = '-100%';
}

// Render initial reviews
renderReviews(reviews.slice(-5));
