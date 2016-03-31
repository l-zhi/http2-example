var resolve = require('path').resolve,
    fs = require('fs');

var serveStatic = require('koa-static'),
    compress = require('koa-compress'),
    logger = require('koa-logger'),
    koa = require('koa');

const convert = require('koa-convert');

var staticCache = require('koa-static-cache')


var app = module.exports = new koa();
var root = resolve(__dirname, '..');

app.use(convert(logger()))

app.use(convert(compress()))

// app.use(convert(staticCache(resolve(root, 'public'), {
//   maxAge: 365 * 24 * 60 * 60  //去掉缓存更明显
// })))

app.use(convert(serveStatic(resolve(root, 'public'))));

var defaultPage = fs.readFileSync(resolve(process.cwd(), '../public/index.html'), { encoding: 'UTF-8' });


app.use(convert(function *(next) {
    // Defer to later middleware
    yield next;

    // Response is already handled
    if ((this.body && this.body !== null) || this.status !== 404) {
        return;
    } 
    this.body = defaultPage;
}));