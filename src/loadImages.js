import imageData from './imageData.js'; 

export default () => {
    let images = imageData;

    for (let image of images) {
        if (image.type === "FLOOR") continue;
        let imageElement = new Image();
        imageElement.onload = function () {
            image.loaded = true;
            image.handle = imageElement;
        }
        imageElement.src = image.url;
    }

    return images;
}