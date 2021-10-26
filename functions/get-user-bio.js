const UserConnection = require('../data/UserConnection');
const { requireAuth, getUserId } = require('../lib/auth');

exports.handler = requireAuth(async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { claims } = context.identityContext;

    console.log('claims sub before substring' + claims.sub);
    const userId = getUserId(claims);
    console.log('claims sub after substring' + userId);

    const User = await UserConnection.createConnection();
    const foundUser = await User.findOne({
      _id: userId,
    })
      .lean()
      .select('bio');

    console.log('user found is ' + foundUser);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ bio: foundUser.bio }),
    });
  } catch (err) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: err,
      }),
    });
  }
});
