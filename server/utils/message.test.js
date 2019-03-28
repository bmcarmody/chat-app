const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('Generate Message', () => {
  it('Should generate the correct message object', () => {
    let from = 'Bob';
    let text = 'Hello';

    let message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});

describe('Generate Location Message', () => {
  it('Should generate correct location object', () => {
    let from = 'Jim';
    let lat = 500;
    let long = 1000;

    let locationMessage = generateLocationMessage(from, lat, long);
    expect(locationMessage.from).toMatch(from);
    expect(locationMessage.url).toMatch(
      `https://www.google.com/maps?q=${lat},${long}`
    );
    expect(typeof locationMessage.createdAt).toBe('number');
  });
});
