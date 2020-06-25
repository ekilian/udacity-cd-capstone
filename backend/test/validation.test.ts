/**
 * Unit tests for the utility script src/utils/validation.ts
 */
import 'mocha';
import { expect } from 'chai';
import { checkNumberParameters } from '../src/utils/validation';


describe('Test checkNumberParameters with valid values', () => {
  it('should return true', () => {
    const year = 2020;
    const month = 6;

    const result = checkNumberParameters(year, month);
    expect(result).to.equal(true);
  });
});

describe('Test checkNumberParameters with invalid param 1', () => {
  it('should return false', () => {
    let year = parseInt("test");
    const month = 6;

    let result = checkNumberParameters(year, month);
    expect(result).to.equal(false);

    year = 1999;
    result = checkNumberParameters(year, month);
    expect(result).to.equal(false);
  });
});

describe('Test checkNumberParameters with invalid param 2', () => {
  it('should return false', () => {
    const year = 2020;
    let month = parseInt("June");
    let result = checkNumberParameters(year, month);
    expect(result).to.equal(false);

    month = 13;
    result = checkNumberParameters(year, month);
    expect(result).to.equal(false);
  });
});