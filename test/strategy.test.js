const AtlassianStrategy = require('../lib/strategy');

describe('Strategy', () => {
  const strategy = new AtlassianStrategy({
    clientID: 'ABC123',
    clientSecret: 'secret',
    scope: ['jira:read-user']
  }, () => {});

  it('should be named atlassian', () => {
    expect(strategy.name).to.equal('atlassian');
  });

  it('should have all scopes', () => {
    expect(strategy._scope).to.have.length(2);
    expect(strategy._scope[0]).to.equal('jira:read-user');
    expect(strategy._scope[1]).to.equal('read:me');
  })
})