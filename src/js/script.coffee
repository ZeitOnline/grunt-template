$ = jQuery

$ ->	
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

	
	
	class App
		constructor: (greeting) ->
			console.log greeting
			console.log "There are #{someData.testArray.length} items in the test data."
			
			@hotTemplateAction()
			
		hotTemplateAction: ->
			source = $("#sample-template").html()
			template = Handlebars.compile(source)
			
			$element = $(template
				someNumber: someData.testArray.length
			)
			$("body").append $element

	app = new App "Hello world!"
