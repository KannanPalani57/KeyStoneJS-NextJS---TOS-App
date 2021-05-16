const dotenv = require("dotenv").config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { NextApp } = require('@keystonejs/app-next');
const PROJECT_NAME = 'theOldSchool';
const adapterConfig = { mongoUri: process.env.MONGODB_ATLAS_URI };

//Lists
const PostSchema = require("./lists/Post")
const UserSchema = require("./lists/User")
/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET
});

const isLoggedIn = ({ authentication: { item: user } }) => {
  return !!user;
}

const isAdmin = ({ authentication: { item: user } }) => {
  if(user && user.isAdmin){
    return true;
  }
}

keystone.createList("Post", {
  fields: PostSchema.fields,
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
})
keystone.createList("User", {
  fields: UserSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,  
    delete: isAdmin,
  }
})

//auth strategy
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identifyField: 'name',
    secretField: "password"
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(), 
    new AdminUIApp({ 
      name: PROJECT_NAME, 
      enableDefaultRoute: false, 
      authStrategy, 
      isAccessAllowed: isAdmin
    }),
    new StaticApp({
      path: '/images',
      src: './images',
      fallback: false
    }),
    new NextApp({ dir: 'app' }),
  ],
};
