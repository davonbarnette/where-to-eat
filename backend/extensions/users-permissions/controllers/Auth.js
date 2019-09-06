module.exports = {
  me: async function(ctx) {

    let auth = ctx.request.headers['authorization'];
    let [_, token] = auth.split(' ');
    if (!token) return ctx.badRequest('`token` param is missing');

    try {
      // decrypt the jwt
      const obj = await strapi.plugins[
        'users-permissions'
      ].services.jwt.verify(token);

      const {exp} = obj;

      // send the decrypted object
      return {exp, user:ctx.state.user};
    } catch (err) {
      // if the token is not a valid token it will throw and error
      return ctx.badRequest(err.toString());
    }
  }
};
