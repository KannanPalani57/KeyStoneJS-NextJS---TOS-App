// const withMDX = require('@next/mdx')()

module.exports ={
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.node = {
            fs: 'empty', // This is required
        }
        return config
    }
} 
// withMDX: withMDX({
//     pageExtensions: ['js', 'jsx', 'mdx']
// })