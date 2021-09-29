exports.parse = (json) => {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  let profile = {};
  profile.id = json.account_id;
  profile.username = json.nickname;
  profile.displayName = json.name;
  profile.email = json.email;
  profile.photo = json.picture;

  return profile;
};