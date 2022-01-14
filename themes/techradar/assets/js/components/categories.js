(() => {
    const baseURL = document.head.querySelector('meta[name=baseURL]').content;

    const cpCardCarousel = document.getElementsByClassName('cp-card-carousel');
    const cpCardCarouselDots = document.getElementsByClassName('cp-card-carousel-dots')[0];

    let currentSelect = 0;
    const dataTitles = []
    
    if (cpCardCarousel.length && cpCardCarouselDots) {
        for (const elem of cpCardCarousel[0].children) {
            dataTitles.push({ title: elem.dataset.title })
        }

        createDots();
    }

    function createDots() {

        const previous = document.createElement('img');
        previous.src = baseURL + "images/icons/chevron-left.svg";
        previous.onclick = () => previousCard()
    
        const next = document.createElement('img');
        next.src = baseURL + "images/icons/chevron-right.svg";
        next.onclick = () => nextCard()
    
        cpCardCarouselDots.append(previous);
    
        dataTitles.forEach((el, index) => {
            const dot = document.createElement('input');
            dot.type = 'radio';
            dot.name = "cp-card-carousel-dot";
            dot.value = el.title;
            dot.onclick = () => scrollToCard(el.title);
            dot.checked = index === 0;
            cpCardCarouselDots.append(dot);
        });
    
        cpCardCarouselDots.append(next);
    }

    function previousCard() {
        if (currentSelect >= 0 && dataTitles[currentSelect - 1]) {
            scrollToCard(dataTitles[currentSelect - 1].title)
        } 
    }

    function nextCard() {
        if (currentSelect >= 0 && dataTitles[currentSelect + 1]) {
           scrollToCard(dataTitles[currentSelect + 1].title)
        }
    }

    function scrollToCard(title) {
        const card = document.querySelectorAll(`div[data-title="${title}"]`)[0];
        const dot = document.querySelectorAll(`input[value="${title}"]`)[0];

        if (card &&  dot) {
            dot.checked = true;
            card.scrollIntoView({
                behavior: 'smooth',
                inline: 'start'
            });
            currentSelect = dataTitles.findIndex(x => x.title === title);
        }
    }
})();