const { createProxyMiddleware: proxy } = require('http-proxy-middleware')

// 通常使用这种方式就够了，如果报错，可以使用下面的方法
module.exports = function (app) {
    app.use(
        proxy('/api', {     // 遇见/api1开头的请求，触发改代理配置
            target: 'http://ihrm-java.itheima.net',       // 请求转发给谁
            secure: false,
            changeOrigin: true,     // 控制服务器收到的请求头中的Host值，默认false，意思为服务端收到的Host值是我们自己本的地址，开启以后，服务端收到的就会他自己的地址
        })
    )
}

// module.exports = function (app) {
//     app.use(
//         createProxyMiddleware('/api', {
//             target: 'http://172.16.136.249:8080',
//             secure: false,
//             changeOrigin: true,
//             pathRewrite: {
//               "^/api": "/api"
//             }
//         })
//     )
// }
