let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function changeSlide(step) {
    showSlide(currentSlide + step);
}

// Auto slide change every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initialize first slide
showSlide(currentSlide);

function filterProperties() {
    const listingId = document.getElementById('listing-id').value.toLowerCase();
    const status = document.getElementById('property-status').value.toLowerCase();
    const type = document.getElementById('property-type').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();
    const bedrooms = document.getElementById('bedrooms').value;

    const properties = document.querySelectorAll('.property');

    properties.forEach(property => {
        const propertyId = property.getAttribute('data-id').toLowerCase();
        const propertyStatus = property.getAttribute('data-status').toLowerCase();
        const propertyType = property.getAttribute('data-type').toLowerCase();
        const propertyLocation = property.getAttribute('data-location').toLowerCase();
        const propertyBedrooms = property.getAttribute('data-bedrooms');

        const matches = (!listingId || propertyId.includes(listingId)) &&
            (!status || propertyStatus.includes(status)) &&
            (!type || propertyType.includes(type)) &&
            (!location || propertyLocation.includes(location)) &&
            (!bedrooms || propertyBedrooms === bedrooms);

        if (matches) {
            property.style.display = 'block';
        } else {
            property.style.display = 'none';
        }
    });
}