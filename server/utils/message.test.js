const expect = require('expect');

const { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('Should generate the correct message object', () => {
    let from = 'Bob';
    let text = 'Hello';

    let message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});
