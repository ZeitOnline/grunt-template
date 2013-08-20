require.config(
    paths:
        jquery: "../bower_components/jquery/jquery"
        handlebars: "../bower_components/handlebars/handlebars"
        moment: "../bower_components/momentjs/moment"
        momentlangde: "vendor/moments-lang-de"
    shim:
        handlebars:
            exports: "Handlebars"
        moment:
            exports: "moment"
        momentlangde:
            deps: ["moment"]
)

require(["App"], (App) ->
    "use strict"
    
    app = new App("Howdy")
)
