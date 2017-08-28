( function() {

	var create_element      = wp.element.createElement;
	var register_block_type = wp.blocks.registerBlockType;
	var editable            = wp.blocks.Editable;
	var children            = wp.blocks.source.children;

	register_block_type( 'gb-tests/example-01', {

		title    : 'Example 01',
		icon     : 'admin-generic',
		category : 'common',

		attributes : {
			content : {
				type   : 'array',
				source : children( 'p' )
			}
		},

		edit : function( props ) {

			var content = props.attributes.content;

			var focus = props.focus;

			function onChangeContent( newContent ) {

				props.setAttributes( { content : newContent } );
			}

			return create_element( editable, {
				tagName   : 'p',
				className : props.className,
				onChange  : onChangeContent,
				value     : content,
				focus     : focus,
				onFocus   : props.setFocus
			} );
		},

		save : function( props ) {

			var content = props.attributes.content;

			return create_element( 'p', { className : props.className }, content );
		}
	} );

}() );