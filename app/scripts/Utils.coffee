define([], () ->
    'use strict'
    
    class Utils
        @parseParams: (query) ->
            re = /([^&=]+)=?([^&]*)/g
            decode = (str) ->
                decodeURIComponent(str.replace(/\+/g, ' '))
                
            params = {}
            
            if (query)
                if query.substr(0, 1) == "?"
                    query = query.substr(1)
            
                while e = re.exec(query)
                    k = decode(e[1])
                    v = decode(e[2])
                    if params[k] != undefined
                        if !$.isArray(params[k])
                            params[k] = [params[k]]
                        params[k].push(v)
                    else
                        params[k] = v
                        
            params
            
        @preciseRound: (num, decimals) ->
            Math.round(num*Math.pow(10, decimals)) / Math.pow(10, decimals)
            
        @cssify: (_string) ->
            _string.replace(/\//g, "").replace(/-/g, "")
)