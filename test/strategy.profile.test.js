const AtlassianStrategy = require('../lib/strategy');

describe('Strategy#userProfile', () => {

  const strategy = new AtlassianStrategy({
    clientID: 'ABC123',
    clientSecret: 'secret',
    scope: ['jira:read-user']
  }, () => {});

  strategy._oauth2.get = (url, accessToken, cb) => {
    const cases = {
      'https://api.atlassian.com/me': '{"account_type":"atlassian","account_id":"112233aa-bb11-cc22-33dd-445566abcabc","email":"mia@example.com","name":"Mia Krystof","picture":"https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/112233aa-bb11-cc22-33dd-445566abcabc/1234abcd-9876-54aa-33aa-1234dfsade9487ds","account_status":"active","nickname":"mkrystof","zoneinfo":"Australia/Sydney","locale":"en-US","extended_profile":{"job_title":"Designer","organization":"mia@example.com","department":"Design team","location":"Sydney"}}',
    }

    const body = cases[url] || null;
    if (!body) {
      return cb(new Error('url argument not found'));
    }

    if (accessToken !== 'token') {
      return cb(new Error('incorrect token argument'));
    }

    cb(null, body, undefined);
  };

  describe('loading profile', () => {
    let profile;

    before((done) => {
      strategy.userProfile('token', (err, p) => {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.provider).to.equal('atlassian');

      expect(profile.id).to.equal('112233aa-bb11-cc22-33dd-445566abcabc');
      expect(profile.username).to.equal('mkrystof');
      expect(profile.displayName).to.equal('Mia Krystof');
      expect(profile.email).to.equal('mia@example.com');
      expect(profile.photo).to.equal('https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/112233aa-bb11-cc22-33dd-445566abcabc/1234abcd-9876-54aa-33aa-1234dfsade9487ds');
    });

    it('should set raw property', () => {
      expect(profile._raw).to.be.a('string');
    });

    it('should set json property', () => {
      expect(profile._json).to.be.a('object');
    });
  });

  describe('encountering an error', () => {
    let err, profile;

    before((done) => {
      strategy.userProfile('wrong-token', (e, p) => {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', () => {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
    });

    it('should not load profile', () => {
      expect(profile).to.be.undefined;
    });
  });
});