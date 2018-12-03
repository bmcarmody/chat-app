const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        let test = isRealString(1);
        expect(test).toBeFalsy();
    });

    it('Should reject string with only spaces', () => {
        let test = isRealString('        ');
        expect(test).toBeFalsy();
    });

    it('Should allow string with non-space characters', () => {
        let test = isRealString('Test123');
        expect(test).toBeTruthy();
    });
});
