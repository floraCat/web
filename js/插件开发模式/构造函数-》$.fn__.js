
;(function ( $, window, document, undefined ) {

		var pluginName = "defaultPluginName",
				defaults = {
				propertyName: "value"
		};

		// ¹¹Ôìº¯Êý
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		$.extend(Plugin.prototype, {
				init: function () {
						console.log("xD");
				},
				yourOtherFunction: function () {
						// some logic
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
				return this;
		};

})( jQuery, window, document );