// https://dev.to/girlsincode/setup-mocha-8-chai-4-and-babel-7-for-javascript-tdd-i6m
import {
  expect
} from 'chai';
import changeStr from '../src/index';

describe('#changeStr', () => {

  before(() => {
    // 在所有測試開始前會執行的程式碼區塊
    console.log('before')
  });

  after(() => {
    // 在所有測試結束後會執行的程式碼區塊
    console.log('after')
  });

  beforeEach(() => {
    // 在每個 Test Case 開始前執行的程式碼區塊
    console.log('beforeEach')
  });

  afterEach(() => {
    // 在每個 Test Case 結束後執行的程式碼區塊
    console.log('afterEach')
  });

  it('should not change empty string', () => {
    expect(changeStr('')).to.equal('');
  });

  it('should not change words with no vowels', () => {
    expect(changeStr('ntv')).to.equal('ntv');
  });

  it('should change a vowel', () => {
    expect(changeStr('a')).to.equal('summer');
  });

  it('should change consonents and a vowel', () => {
    expect(changeStr('bla')).to.equal('blsummer');
  });

  it('should not change less than 30 percent vowels', () => {
    expect(changeStr('blah')).to.equal('blah');
  });

  it('should change continuous vowels once', () => {
    expect(changeStr('hear')).to.equal('hsummerr');
  });

  it('should change multiple sets of vowels', () => {
    expect(changeStr('blaahah')).to.equal('blsummerhsummerh');
  });

  it('should change capital vowels', () => {
    expect(changeStr('blAhE')).to.equal('blsummerhsummer');
  });

  it('should error on undefined input', () => {
    expect(() => changeStr()).to.throw();
  });
});