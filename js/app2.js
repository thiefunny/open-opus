const sortComposersByBirthDate = inputArray => {

    sortedArray = [...inputArray]
    sortedArray.sort((a, b) => Number(a.birth.slice(0, 4)) - Number(b.birth.slice(0, 4)))
    return sortedArray
}

const show = inputArray => {

    inputArray.forEach(composer => {
        let createImgElement = document.createElement('img');
        let appendImgElement = document.body.appendChild(createImgElement);
        appendImgElement.setAttribute('src', `${composer.portrait}`);
        appendImgElement.setAttribute('id', `${composer.id}`);
        appendImgElement.setAttribute('width', `${appendImgElement.naturalWidth}`);
        appendImgElement.setAttribute('height', `${appendImgElement.naturalHeight}`);
    })
}

const animateImages = _ => {

    const coordinatesPanel = document.querySelector(".coordinates-panel");
    const imageAnimated = document.querySelectorAll('img');
    // const imageCenter = [imageAnimated.getBoundingClientRect().x + imageAnimated.naturalWidth / 2, imageAnimated.getBoundingClientRect().y + imageAnimated.naturalHeight / 2];

    // imageAnimated.addEventListener("mousemove", event => {
    //     // console.log(event)
    //     // imageAnimated.setAttribute('width', '300px');
    // })

// console.log([...imageAnimated])

    window.addEventListener('mousemove', event => {
        // coordinatesPanel.innerText = `${event.clientX}, ${event.clientY}`
            
        [...imageAnimated].forEach(picture => {

            let imageCenter = [picture.getBoundingClientRect().x + picture.naturalWidth / 2, picture.getBoundingClientRect().y + picture.naturalHeight / 2];
            let distance = Math.round(Math.sqrt(Math.pow(event.clientX - imageCenter[0], 2) + Math.pow(event.clientY - imageCenter[1], 2)))
            // coordinatesPanel.innerText = `${distance}`
            picture.setAttribute("width", `${(1/distance)*10000}`);
            picture.setAttribute("height", `${(1/distance)*10000}`);
            
        })


        // let imageCenter = [imageAnimated.getBoundingClientRect().x + imageAnimated.naturalWidth / 2, imageAnimated.getBoundingClientRect().y + imageAnimated.naturalHeight / 2];
        // let distance = Math.round(Math.sqrt(Math.pow(event.clientX - imageCenter[0], 2) + Math.pow(event.clientY - imageCenter[1], 2)))
        // coordinatesPanel.innerText = `${distance}`
        // imageAnimated.setAttribute("width", `${distance}`);
        // imageAnimated.setAttribute("height", `${distance}`);

    })



}

fetch('https://api.openopus.org/composer/list/pop.json')
    .then((response) => response.json())
    .then((result) => {

        let sortedComposers = sortComposersByBirthDate(result.composers);
        show(sortedComposers);
        animateImages();

    })

// addEventListener