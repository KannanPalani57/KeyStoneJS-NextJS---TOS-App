const { Text, Password, Checkbox, File } = require("@keystonejs/fields")
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: "./images",
    path: '/images',
}); 

const userFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        authorImage: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                  if (existingItem && existingItem.file) {
                    await fileAdapter.delete(existingItem.file);
                  }
                },
            },
        },
        email: {
            type: Text,
            isRequired: true,
            isUnique: true
        },
        password: {
            type: Password,
            isRequired: true,
        },
        isAdmin: {
            type: Checkbox,
            isRequired: true,
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
          if (existingItem.file) {
            await fileAdapter.delete(existingItem.file);
          }
        },
    },
}

module.exports = userFields;