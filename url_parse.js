(function ( $ ) {
 
    $.URL = function()
    {
    }
    $.URL.parse = function(address)
    {

    	return URL.parse(address)
    }

 
}( jQuery ));

var URL = (function(){

	var o = function(){
        this._set_address = undefined
    }
	o.prototype = 
	{
        set: function(address)
        {
            this._set_address = address;
        },
        unset: function()
        {
            this._set_address = undefined;
        },
		parse: function(string) {
            string = this._set_address?this._set_address : string;
            string = (string)? $('<a>',{href:string})[0] : $('<a>',{href:document.URL})[0]
            if(!string)
            {
                console.error('Cannon initialize address');
                return false;
            }
            var isQuery = string.href.match(/\?(.*)/) == null ? false : true;
            
            var u = {
                hash: {},
                title: document.title,
                hashRaw: string.hash,
                queryRaw: string.search,
                query: {},
                origin: string.origin,
                href: string.href,
                host: string.host,
                port: (string.port)? string.port : 80,
                protocol: string.protocol,
                hostname: string.hostname,
                pathname: string.pathname,
                access_url: string.origin+string.port+string.pathname,
                hashArray: []
            },
            url = (url === undefined) ? document.URL : url;

            if (u.queryRaw !== '') {

                var uQuery = u.queryRaw.substr(1)

                $.each(uQuery.split('&'), function(a, b) {
                    var qName = b.match(/.*?(?=:)|.*?(?=\=)/);
                    qName = (qName)? qName : b;
                    var qVal = (b.match(/=(.*)/) !== null) ? b.match(/=(.*)/)[1] : '';
                    qName = Array.isArray(qName) == true ? qName[0] : qName;
                    u.query[qName] = qVal;
                })

            }

            if (u.hashRaw !== '') {
                
                var uHash = u.hashRaw.match(/\#(.*)/),
                    uHRaw = uHash[0];

	            u.hashData = uHash[1];
	            $.each(u.hashData.split('&'), function(a, b) {
	                if (b !== '' && b !== undefined && b !== null) {
	                    var hName = (b.match(/.*?(?=:)|.*?(?=\=)/) == null) ? b : b.match(/.*?(?=:)|.*?(?=\=)/);
	                    var hVal = (b.match(/=(.*)/) !== null) ? b.match(/=(.*)/)[1] : undefined;
	                    hName = Array.isArray(hName) == true ? hName[0] : hName;
	                    u.hash[hName] = hVal;
	                    u.hashArray.push(b)
	                }
	            })
	        }

	        return u;
        },
        query: function(params, address, config) {
            var obj = {}, i, parts, len, key, value, 
                address = (this._set_address)? this._set_address : address
                uri = this.parse(address);
            
            config = $.extend({
                extend: true
            }, config)

            if (typeof params === 'string') {
                value = location.search.match(new RegExp('[?&]' + params + '=?([^&]*)[&#$]?'));
                return value ? value[1] : undefined;
            }

            


            if(config.extend == true)
            {
                var _params = location.search.substr(1).split('&');
                for (i = 0, len = _params.length; i < len; i++) {
                    parts = _params[i].split('=');
                    if (! parts[0]) {continue;}
                    obj[parts[0]] = parts[1] || true;
                }
            }

            obj = $.extend(uri.query, obj)

            if (typeof params !== 'object') {return obj;}

            for (key in params) {
                value = params[key];
                if (typeof value === 'undefined') {
                    delete obj[key];
                } else {
                    obj[key] = value;
                }
            }

            parts = [];
            for (key in obj) {
                if(key)
                {
                    parts.push(key + (obj[key] === true ? '' : '=' + obj[key]));
                }
            }

            return this.parse(address).access_url+'?'+parts.join('&');
        },
	}

	return new o();

})()