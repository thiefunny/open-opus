const getBirthDates = inputArray => {
    const birthDates = [];

    inputArray.forEach(composer => {
        let composerIndex = inputArray.indexOf(composer);
        let birthYear = composer.birth.slice(0, 4);
        birthDates.push([composerIndex, Number(birthYear)]);
    })

    return birthDates;
}

const sortBirthDates = birthDates => {

    const birthDatesSorted = [...birthDates];
    birthDatesSorted.sort((a, b) => a[1] - b[1])

    return birthDatesSorted;

}

const show = inputArray => {
    const images = [];
    let composerImage;
    
    for (i = 0; i < inputArray.length; i++) {
        composerImage = document.createElement('img');
        document.body.appendChild(composerImage);
        images.push(composerImage);
        images[i].setAttribute('src', `${inputArray[i].portrait}`)
    }
}

fetch('https://api.openopus.org/composer/list/pop.json')
    .then((response) => response.json())
    .then((result) => {

        console.log(result.composers)
        // getBirthDates(result.composers);
        // console.log(sortBirthDates(getBirthDates(result.composers)));
        // show(result.composers);

    })