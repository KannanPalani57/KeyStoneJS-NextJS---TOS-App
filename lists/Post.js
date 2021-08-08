const { Text, Select, Relationship, File, DateTime } = require("@keystonejs/fields")
const { Markdown } = require('@keystonejs/fields-markdown');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: "./images",
    path: '/images',
}); 

const postFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true,
        },
        coverImage: {
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
        body: {
            type: Markdown,
            isRequired: true,
        },
        status: {
            type: Select,
            options: [
                { value: "PUBLISHED", label: "Published" },
                { value: "UNPUBLISHED", label: "UnPublished" }
            ],
            defaultValue: "PUBLISHED"
        },
        author: {
            type: Relationship,
            ref: "User",
            many: false,
            isRequired: true,
        },
        createdAt: {
            type: DateTime,
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

module.exports = postFields;


