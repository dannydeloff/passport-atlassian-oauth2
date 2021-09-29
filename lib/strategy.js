const OAuth2Strategy = require('passport-oauth2')
  , Profile = require('./profile')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError;

const defaultOptions = {
  authorizationURL: 'https://auth.atlassian.com/authorize',
  tokenURL: 'https://auth.atlassian.com/oauth/token',
  profileURL: 'https://api.atlassian.com/me'
}

const defaultScope = ['read:me'];

class Strategy extends OAuth2Strategy {
  constructor(options = {}, verify) {
    if (!options.scope) {
      throw new TypeError('Atlassian requires a scope option');
    }

    options = {
      ...defaultOptions,
      ...options,
    };

    super(options, verify);
    this.options = options;
    this.name = 'atlassian';
    this._oauth2.useAuthorizationHeaderforGET(true);
    this._setupDefaultScope();
  }

  userProfile(accessToken, done) {
    this._oauth2.get(this.options.profileURL, accessToken, (err, body) => {
      if (err) {
        return done(new InternalOAuthError(
          'Failed to fetch user profile', err));
      }

      let json;

      try {
        json = JSON.parse(body);
      } catch (e) {
        return done(new Error(
          'Failed to parse user profile'));
      }

      const profile = Profile.parse(json);
      profile.provider = 'atlassian';
      profile._raw = body;
      profile._json = json;

      done(null, profile);
    });
  }

  _setupDefaultScope() {
    let scope = this._scope || [];

    if (!Array.isArray(scope)) {
      scope = scope.split(this._scopeSeparator);
    }

    this._scope = Array.from(new Set([...scope, ...defaultScope]));
  }
}

module.exports = Strategy;