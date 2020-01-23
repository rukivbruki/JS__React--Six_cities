const userDataAdapter = (userData) => ({
  avatar: userData[`avatar_url`],
  email: userData[`email`],
  id: userData[`id`],
  isPro: userData[`is_pro`],
  name: userData[`name`],
});

export default userDataAdapter;
