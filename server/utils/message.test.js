const expect = require('expect');

const { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('Should generate the correct message object', () => {
    const from = 'Bob';
    const text = 'Hello';

    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});
