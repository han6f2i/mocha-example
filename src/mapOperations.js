// https://stackabuse.com/using-spies-for-testing-in-javascript-with-sinon/
const map = (array, operation) => {
    let arrayOfMappedItems = [];
    for (let item of array) {
        arrayOfMappedItems.push(operation(item));
    }
    return arrayOfMappedItems;
};

console.log(map([{ name: 'john', role: 'author'}, { name: 'jane', role: 'owner'}], user => user.name));

module.exports = { map };

