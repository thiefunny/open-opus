const imageContainerEl = document.querySelector('.images-container')

const sortComposersByBirthDate = inputArray => {

    sortedArray = [...inputArray];
    sortedArray.sort((a, b) => Number(a.birth.slice(0, 4)) - Number(b.birth.slice(0, 4)));
    return sortedArray;
}

const show = inputArray => {

    inputArray.forEach(composer => {

        const createImgElement = document.createElement('img');
        const appendImgElement = imageContainerEl.appendChild(createImgElement);
        appendImgElement.setAttribute('src', `${composer.portrait}`);
        appendImgElement.setAttribute('id', `${composer.id}`);
        appendImgElement.setAttribute('width', `${appendImgElement.naturalWidth}`);
        appendImgElement.setAttribute('height', `${appendImgElement.naturalHeight}`);
    })
}

const animateImages = _ => {

    const coordinatesPanel = document.querySelector(".coordinates-panel");
    const imageAnimated = document.querySelectorAll('img');

    window.addEventListener('mousemove', event => {



        imageContainerEl.style.left = window.innerWidth / 2 - event.clientX;

        [...imageAnimated].forEach(picture => {

            let imageCenter = [picture.getBoundingClientRect().x + picture.naturalWidth / 2, picture.getBoundingClientRect().y + picture.naturalHeight / 2];

            // odległość X-Y
            // let distance = Math.round(Math.sqrt(Math.pow(event.clientX - imageCenter[0], 2) + Math.pow(event.clientY - imageCenter[1], 2)));

            //odległość X
            let distanceX = Math.round(event.clientX - imageCenter[0]);

            if (Math.abs(distanceX) > 200) {
                picture.width = Math.abs(picture.naturalWidth * 1 / distanceX * 1000)
            }

        })
    })


}

fetch('https://api.openopus.org/composer/list/pop.json')
    .then((response) => response.json())
    .then((result) => {

        const sortedComposers = sortComposersByBirthDate(result.composers);
        show(sortedComposers);
        animateImages();

    })