# Consomé
An AJAX microframework for JSON requests. Everything works as you'd expect (using promises)


## Install

Install it with bower
```
	bower install http://github.com/BraulioVM/Consome.git
```

## Examples
You want to GET some stuff
```javascript
	C.get(url, query_params).then(function(data){
		// data is the json response
		console.log(data);
	});
```

You want to POST some data

```javascript
	C.post("/news", { headline: "...", body: "..." }.then(fn, function errorCallback(err){
		var code = err.status; // HTTP RESPONSE CODE
		var s_response = err.data; // JSON GIVEN BY THE SERVER
		...
	});
```

And so on...

## Stuff to do
* Add jsonp support
