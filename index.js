require("dotenv").config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { NextApp } = require('@keystonejs/app-next');
const PROJECT_NAME = 'theOldSchool';
const adapterConfig = { mongoUri: process.env.MONGODB_ATLAS_URI };


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(), 
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: false }),
    new NextApp({ dir: 'app' }),
  ],
};
