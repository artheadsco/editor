(function( exports, $ ){
	var api = sedApp.editor,debounce;

	debounce = function( fn, delay, context ) {
		var timeout;
		return function() {
			var args = arguments;

			context = context || this;

			clearTimeout( timeout );
			timeout = setTimeout( function() {
				timeout = null;
				fn.apply( context, args );
			}, delay );
		};
	};

	api.Preview = api.Messenger.extend({
		/**
		 * Requires params:
		 *  - url    - the URL of preview frame
		 */
		initialize: function( params, options ) {
			var self = this;

			api.Messenger.prototype.initialize.call( this, params, options );

			this.body = $( document.body ); //, a *
			/*this.body.find("a").livequery(function(){
    			$(this).on( 'click.preview', function( event ) {
    				event.preventDefault();
    				self.send( 'scroll', 0 );
    				//self.send( 'url', $(this).prop('href') );
    			});
                $(this).attr('data-href' , $(this).prop('href') );
                $(this).removeAttr('href');
            });*/

			this.body.on( 'click.preview', 'a', function( event ) { 
				event.preventDefault();
				//self.send( 'scroll', 0 );
				//self.send( 'url', $(this).prop('href') );
			});

			// You cannot submit forms.
			// @todo: Allow form submissions by mixing $_POST data with the customize setting $_POST data.
			this.body.on( 'submit.preview', 'form', function( event ) {
				event.preventDefault();
			});

			this.window = $( window );
			this.window.on( 'scroll.preview', debounce( function() {
				self.send( 'scroll', self.window.scrollTop() );
			}, 200 ));

			this.bind( 'scroll', function( distance ) {
				self.window.scrollTop( distance );
			});
		}
	});

	/*var hoverBox = $("#static-module-hover-box" , window.parent.document);
	var iframe = $("#website" , window.parent.document);
	var ifrTop = iframe.offset().top;
	var ifrLeft = iframe.offset().left;

	$('[sed-role="static-template-content"]').hover(function(e){
		var w = $( this ).outerWidth() , h = $( this ).outerHeight() ,
			offset = $( this ).offset() , l = offset.left ,
			t = offset.top;
		////api.log(x +","+ y);
		l = l - $( window ).scrollLeft() + ifrLeft;
		t = t - $( window ).scrollTop() + ifrTop;

		hoverBox.show();

		hoverBox.css({
			width  : w,
			height : h,
			left   : l,
			top    : t ,
			backgroundColor : "blue" ,
			opacity : 0.4
		});

	},function(e){
		hoverBox.css({
			backgroundColor : "transparent" ,
			opacity : 1
		});
		hoverBox.hide();
	});*/

	/**
	 * api.template( id )
	 *
	 * Fetches a template by id.
	 *
	 * @param  {string} id   A string that corresponds to a DOM element with an id prefixed with "tmpl-".
	 *                       For example, "attachment" maps to "tmpl-attachment".
	 * @return {function}    A function that lazily-compiles the template requested.
	 */
	api.template = _.memoize(function ( id ) {
		var compiled,
			options = {
				evaluate:    /<#([\s\S]+?)#>/g,
				interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
				escape:      /\{\{([^\}]+?)\}\}(?!\})/g
			};

		return function ( data ) {
			compiled = compiled || _.template( $( '#' + id ).html(), null, options );
			return compiled( data );
		};
	});


})( sedApp, jQuery );