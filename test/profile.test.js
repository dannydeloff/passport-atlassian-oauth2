const fs = require('fs')
  , parse = require('../lib/profile').parse;

describe('profile.parse', () => {
  describe('example profile', () => {
    let profile;

    before((done) => {
      fs.readFile('test/data/example.json', 'utf8', (err, data) => {
        if (err) { return done(err) }
        profile = parse(data);
        done();
      });
    });

    it('should parse profile', () => {
      expect(profile.id).to.equal('112233aa-bb11-cc22-33dd-445566abcabc');
      expect(profile.username).to.equal('mkrystof');
      expect(profile.displayName).to.equal('Mia Krystof');
      expect(profile.email).to.equal('mia@example.com');
      expect(profile.photo).to.equal('https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/112233aa-bb11-cc22-33dd-445566abcabc/1234abcd-9876-54aa-33aa-1234dfsade9487ds');
    })
  })
})