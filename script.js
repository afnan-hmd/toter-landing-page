document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('cardContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let cardData = [];
    let currentIndex = 0;

    function fetchCardData() {
        return fetch('data/services.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(data => data.services)
            .catch(error => {
                console.error('Error fetching the JSON data:', error);
                return [];
            });
    }

    function createCard(data, isActive = false) {
        const card = document.createElement('div');
        card.className = `service-item ${isActive ? 'active' : ''}`;
        card.setAttribute('data-id', data.id);
        card.innerHTML = `
            <div class="img-container">
                <img src="${data.img}" class="service-img img-fluid" alt="${data.name}">
            </div>
            <h3 class="service-name">${data.name}</h3>
        `;
        return card;
    }

    function updateCards() {
        cardContainer.innerHTML = '';
        for (let i = -2; i <= 2; i++) {
            let index = (currentIndex + i + cardData.length) % cardData.length;
            let card = createCard(cardData[index], i === 0);
            cardContainer.appendChild(card);
        }
        updateActiveCardInfo();
    }

    function updateActiveCardInfo() {
        const activeCard = cardData[currentIndex];
        const serviceHeadline = document.getElementById('service-headline');
        const serviceSubhead = document.getElementById('service-subhead');
        
        serviceHeadline.textContent = activeCard.headline;
        serviceSubhead.textContent = activeCard.subhead;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
        updateCards();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % cardData.length;
        updateCards();
    });

    fetchCardData().then(data => {
        cardData = data;
        updateCards();
    });
});