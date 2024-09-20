document.addEventListener('DOMContentLoaded', () => {
    fetch('services.json')
        .then(response => response.json())
        .then(data => {
            const services = data.services;
            
            // Add click event listeners to each service item
            document.querySelectorAll('.service-item').forEach(item => {
                item.addEventListener('click', () => {
                    // Get the service ID from the clicked item
                    const serviceId = item.getAttribute('data-id');
                    
                    // Find the corresponding service in the JSON data
                    const serviceData = services.find(service => service.id == serviceId);

                    if (serviceData) {
                        // Update the service info section with the JSON data
                        document.getElementById('service-headline').textContent = serviceData.headline;
                        document.getElementById('service-subhead').textContent = serviceData.subhead;

                        // Remove active class from other items and add it to the clicked one
                        document.querySelectorAll('.service-item').forEach(s => s.classList.remove('active'));
                        item.classList.add('active');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching services:', error));
});
