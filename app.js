var http = require('http'),
	  cheerio = require('cheerio');

var args = process.argv;
var url = process.argv[2].substring(7);
var options = {
	host:url,
	port:80,
  path:'/',
  method:'GET'
}

if (args.length < 3) {
	console.log('Too few argument.');
} else {
	if (args.length > 3) {
		console.log("Too many argument. The first input will be used.")
	}

	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
		  $ = cheerio.load(chunk);
		  images = $("img");
		  for (var i=0; i<images.length; i++) {
		  	console.log(images[i].attribs.src);
		  }
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
}

