// https://stackabuse.com/using-stubs-for-testing-in-javascript-with-sinon-js/
const request = require('request');

const getPhotosByAlbumId = (id) => {
    const requestUrl = `https://jsonplaceholder.typicode.com/albums/${id}/photos?_limit=3`;
    return new Promise((resolve, reject) => {
        request.get(requestUrl, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(body));
        });
    });
};

module.exports = getPhotosByAlbumId;