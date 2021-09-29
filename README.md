# passport-atlassian-oauth20

[![Known Vulnerabilities](https://snyk.io/test/github/dannydeloff/passport-atlassian-oauth20/badge.svg)](https://snyk.io/test/github/dannydeloff/passport-atlassian-oauth20)

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Atlassian](https://atlassian.com) services using OAuth 2 3LO (three-legged OAuth).


## Install
```shell
$ npm install passport-atlassian-oauth20
```

## Usage

#### Create Application

Before using `passport-atlassian-oauth20` you must register an application within [App Management](https://developer.atlassian.com/apps/). If you don't have one follow ["Enabling OAuth 2.0 authorization code grants"](https://developer.atlassian.com/cloud/jira/platform/oauth-2-authorization-code-grants-3lo-for-apps/#enabling-oauth-2-0--3lo-) instructions from Jira documentation page.

⚠️Important: "User identity API" should be enabled in App Management for this strategy to work.

#### Configure Strategy

The client ID and secret obtained when creating an application are supplied as options when creating the strategy.

```js
const AtlassianStrategy = require('passport-atlassian-oauth20');

passport.use(new AtlassianStrategy({
    clientID: '<ATLASSIAN_CLIENT_ID>',
    clientSecret: '<ATLASSIAN_CLIENT_SECRET>',
    callbackURL: 'http://localhost:8080/auth/atlassian/callback',
    scope: 'read:jira-user',
  },
  (accessToken, refreshToken, profile, cb) => {
    // optionally save profile data to db
    done(null, profile);
  }
));
```

## Sample Profile
```json
{
  "id": "112233aa-bb11-cc22-33dd-445566abcabc",
  "username": "mkrystof",
  "displayName": "Mia Krystof",
  "email": "mia@example.com",
  "photo": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/112233aa-bb11-cc22-33dd-445566abcabc/1234abcd-9876-54aa-33aa-1234dfsade9487ds",
  "provider": "atlassian"
}
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 [Dan Deloff](http://github.com/dannydeloff)