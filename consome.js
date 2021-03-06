var C = (function(){
	var c = {};

	function _getRequestObject(){
		var request;
		if (window.XMLHttpRequest){
			request = new XMLHttpRequest();
		} 
		else if (window.ActiveXObject){
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		return request;
	};

	function _getResponseDataObject(responseText){
		var data;
		try {
			data = JSON.parse(responseText);
			}
		catch (e){
			data = { responseText: responseText };
		}
		return data;
	};

	function _readyStateChangeCB(request, fn, err_fn){
		var result = function(){
			if (request.readyState == 4){
				
				var data = _getResponseDataObject(request.responseText);

				if (request.status == 200){
					fn(data);
				}
				else {
					var e_data = { error: request.status, data: data };

					if(err_fn instanceof Function){
						err_fn(e_data);
					}
					else {
						console.error(e_data);
					}
				}
			}
		};

		return result;
	};

	function _serializeParams(obj){
		var params = [];
		for(var key in obj){
			params.push(key + "=" + obj[key]);
		}
		return params.join("&");
	}

	function getFunctionForMethod(method_name, parameters_in_url){
		var result = function(url, params){

			return new Promise(function(fullfill, reject){
				var request = _getRequestObject();
				request.onreadystatechange = _readyStateChangeCB(request, fullfill, reject);

				var request_params;

				if(parameters_in_url === true){
					url += "?" + _serializeParams(params);
					request_params = null;
				}
				else {
					request_params = _serializeParams(params);
				}

				request.open(method_name, url, true);
				request.send(request_params);

			});;

		};


		return result;
	};


	c.get = getFunctionForMethod("GET", true);
	c.post = getFunctionForMethod("POST", false);
	c.put = getFunctionForMethod("PUT", false);
	c.delete = getFunctionForMethod("DELETE", false);


	return c;
})();