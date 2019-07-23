const { expect } = require('chai');
const add = require('../dist/upload/parseMidi');

describe('add', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 4)).to.equal(6);
  });

  it('should return the sum of two negative numbers', () => {
    expect(add(-2, -4)).to.equal(-6);
  });

  it('should return the sum of an array of numbers', () => {
    expect(add([1, 2, 3, 4, 5])).to.equal(15);
  });
});
