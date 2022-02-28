import { expect } from 'chai';
import { array_contains, calculate, Frequencies } from '../app';
import { assert } from '../node_modules/@babel/types/scripts/generators/asserts';

describe('calculation', () => { 
  it('array_contains', function() {
    let result = array_contains(["abc", "cdf"], "abc");
    expect(result).equal(true);
  })
  it('calculate', function() {
    let result = calculate(["abc", "cdf", "abc"])
    let expectedResult: Frequencies[] = [
      { word: 'abc', count: 2 },
      { word: 'cdf', count: 1}
    ]
    expect(result.length).equal(expectedResult.length)

    for (let i=0; i<result.length; i++) {
      expect(result[i].word).equal(expectedResult[i].word)
      expect(result[i].count).equal(expectedResult[i].count)
    }
  })
})