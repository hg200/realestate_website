let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('#hero .carousel-slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('#hero .carousel').style.transform = `translateX(${offset}%)`;
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

function openPopup() {
    document.getElementById('popup-form').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup-form').style.display = 'none';
}

// Get property ID from URL query string
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');

// Load property details dynamically
if (propertyId) {
    // Fetch property details from backend or static data
    const propertyDetails = {
        1: {
            id: 1,
            images: ["https://source.unsplash.com/random/800x600/?house"],
            description: "Luxury villa in Nairobi with stunning views and modern amenities.",
            similarProperties: [
                { id: 2, image: "https://source.unsplash.com/random/300x200/?apartment,mombasa", title: "Modern Apartment in Mombasa", price: "150,000 KES/month" },
                { id: 3, image: "https://source.unsplash.com/random/300x200/?house,kisumu", title: "Cozy House in Kisumu", price: "25,000,000 KES" }
            ]
        }
    };

    const property = propertyDetails[propertyId];
    if (property) {
        // Populate property details
        document.getElementById('property-gallery').innerHTML = property.images.map(img => `<img src="${img}" alt="Property Image">`).join('');
        document.getElementById('property-description-text').innerText = property.description;

        // Populate similar properties
        document.querySelector('#similar-properties .property-grid').innerHTML = property.similarProperties.map(p => `
            <div class="property" onclick="window.location.href='property.html?id=${p.id}'">
                <img src="${p.image}" alt="${p.title}">
                <h3>${p.title}</h3>
                <p>${p.price}</p>
            </div>
        `).join('');
    }
}

// Load filtered properties dynamically
const type = urlParams.get('type');
const location = urlParams.get('location');

if (type || location) {
    // Fetch filtered properties from backend or static data
    const filteredProperties = [
        { id: 1, image: "https://source.unsplash.com/random/300x200/?villa,nairobi", title: "Luxury Villa in Nairobi", price: "120,000,000 KES" },
        { id: 2, image: "https://source.unsplash.com/random/300x200/?apartment,mombasa", title: "Modern Apartment in Mombasa", price: "150,000 KES/month" }
    ];

    document.querySelector('#filtered-properties .property-grid').innerHTML = filteredProperties.map(p => `
        <div class="property" onclick="window.location.href='property.html?id=${p.id}'">
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.price}</p>
        </div>
    `).join('');
}