# global define
define(["Config", "Utils", "jquery", "moment", "momentlangde", "handlebars"], (Config, Utils) ->
    'use strict'
            
    class App
        constructor: (greeting) ->
            moment.lang("de")
            console.log "#{greeting}, #{Config.awesomeCats.join(", ")}"
            console.log """
                Heute ist der #{moment().format("D. MMMM YYYY")}
            """
            @hotTemplateAction()
        
        hotTemplateAction: ->
            source = $("#sample-template").html()
            template = Handlebars.compile(source)
            
            $element = $($.trim(template
                someNumber: someData.testArray.length
            ))
            $("body").append $element
)