module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
            
                target: 'http://110.40.176.151/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}