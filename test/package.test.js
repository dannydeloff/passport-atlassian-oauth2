const strategy = require('..');

describe('passport-atlassian-oauth2', () => {
  it('should export Strategy constructor', () => {
    expect(strategy.Strategy).to.be.a('function');
  });
});