// https://stackabuse.com/using-spies-for-testing-in-javascript-with-sinon/
const {
    map
} = require('../src/mapOperations');
const sinon = require('sinon');
const expect = require('chai').expect;

describe('test map', () => {
    const operation = sinon.spy();

    it('calls-operation', () => {
        map([{
            name: 'foo',
            role: 'author'
        }, {
            name: 'bar',
            role: 'owner'
        }], operation);

        // https://sinonjs.org/releases/latest/spies/
        // spy.called
        // true if the spy was called at least once
        expect(operation.called);
    });
});