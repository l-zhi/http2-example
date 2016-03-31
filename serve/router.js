var app = require('./app'),
    router = module.exports = require('koa-router')(),
	resolve = require('path').resolve,
    fs = require('fs'),
	zlib = require('zlib');   
	 
var root = resolve(__dirname, '..');
var gzip = zlib.createGzip();

router.get('/serverpush', function (ctx, next){
	var zepto = fs.readFileSync(resolve(root, 'public/js/zepto.js'), { encoding: 'UTF-8' })
	var underscore = fs.readFileSync(resolve(root, 'public/js/underscore.js'), { encoding: 'UTF-8' })
	var backbone = fs.readFileSync(resolve(root, 'public/js/backbone.js'), { encoding: 'UTF-8' })
	var html = fs.readFileSync(resolve(root, 'public/item2_1.html'), { encoding: 'UTF-8' })

	var options = {

		request:{
			accept: '*/*',
		},response: {
	  		'content-type': 'application/javascript',
	  		'content-encoding':'gzip',
	  		'vary':'Accept-Encoding'
		}
	}
	ctx.res.push('/zepto.js', options, function(err, stream){
	    if (err) return;
	    zlib.gzip(zepto,function(err, buf){
	    	stream.end(buf)
	    })
	});
	ctx.res.push('/underscore.js', options, function(err, stream){
	    if (err) return;
	    zlib.gzip(underscore,function(err, buf){
	    	stream.end(buf)
	    })
	});
	ctx.res.push('/backbone.js', options, function(err, stream){
	    if (err) return;
	    zlib.gzip(underscore,function(err, buf){
	    	stream.end(buf)
	    })
	});
	ctx.body = html
})

