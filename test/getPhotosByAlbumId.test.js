// https://stackabuse.com/using-stubs-for-testing-in-javascript-with-sinon-js/
const expect = require('chai').expect;
const getPhotosByAlbumId = require('../src/getPhotosByAlbumId.js');
const sinon = require('sinon');
const request = require('request');

describe('withoutStub: getPhotosByAlbumId', () => {
    it('should getPhotosByAlbumId', (done) => {
        getPhotosByAlbumId(1).then((photos) => {
            expect(photos.length).to.equal(3);
            photos.forEach(photo => {
                expect(photo).to.have.property('id');
                expect(photo).to.have.property('title');
                expect(photo).to.have.property('url');
            });
            done();
        });
    });
});

describe('with Stub: getPhotosByAlbumId', () => {
    before(() => {
        sinon.stub(request, 'get')
            // https://sinonjs.org/releases/latest/stubs/
            // stub.yields([arg1, arg2, ...])
            // Similar to callsArg.
            // Causes the stub to call the first callback it receives with the provided arguments (if any).
            // If a method accepts more than one callback, you need to use yieldsRight to call the last callback or callsArg to have the stub invoke other callbacks than the first or last one.

            // https://www.coder.work/article/2595822
            // javascript - sinon的stub.yields有什么作用？
            // 如果您要存根的函数接受回调，例如异步数据库请求，这将允许存根伪造该函数通常传递给您的回调的结果。

            // 在 getPhotosByAlbumId.js - request.get(requestUrl, (err, res, body) => { });
            // 所以是三個參數 - (err, res, body)
            .yields(null, null, JSON.stringify([{
                    "albumId": 1,
                    "id": 1,
                    "title": "accusamus beatae ad facilis cum similique qui sunt",
                    "url": "https://via.placeholder.com/600/92c952",
                    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
                },
                {
                    "albumId": 1,
                    "id": 2,
                    "title": "reprehenderit est deserunt velit ipsam",
                    "url": "https://via.placeholder.com/600/771796",
                    "thumbnailUrl": "https://via.placeholder.com/150/771796"
                },
                {
                    "albumId": 1,
                    "id": 3,
                    "title": "officia porro iure quia iusto qui ipsa ut modi",
                    "url": "https://via.placeholder.com/600/24f355",
                    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
                }
            ]));
    });

    after(() => {
        request.get.restore();
    });

    it('should getPhotosByAlbumId', (done) => {
        getPhotosByAlbumId(1).then((photos) => {
            expect(photos.length).to.equal(3);
            photos.forEach(photo => {
                expect(photo).to.have.property('id');
                expect(photo).to.have.property('title');
                expect(photo).to.have.property('url');
            });
            done();
        });
    });
});