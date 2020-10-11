// https://stackabuse.com/using-spies-for-testing-in-javascript-with-sinon/
const request = require('request');

// https://www.npmjs.com/package/request
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
});

module.exports = {
    getAlbumById: async function(id) {
        const requestUrl = `https://jsonplaceholder.typicode.com/albums/${id}/photos?_limit=3`;
        return new Promise((resolve, reject) => {
            request.get(requestUrl, (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                resolve(JSON.parse(body));
            });
        });
    }
};