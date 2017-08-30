( function() {

	var blocks = wp.blocks;
	var el     = wp.element.createElement;
	var source = blocks.source;

	var create_element      = wp.element.createElement;
	var register_block_type = wp.blocks.registerBlockType;
	var editable            = wp.blocks.Editable;
	var inspector           = wp.blocks.InspectorControls;
	var controls            = wp.blocks.BlockControls;
	var block_description   = wp.blocks.blockDescription;
	var children            = wp.blocks.source.children;
	var alignment_toolbar   = wp.blocks.AlignmentToolbar;

	blocks.registerBlockType( 'gb-tests/example-01', {

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

			return el( blocks.Editable, {
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


	blocks.registerBlockType( 'gb-tests/example-02', {

		title    : '02 - Logged In',
		description : 'This block is only viewable to logged-in users.',
		icon     : 'admin-generic',
		category : 'common',

		attributes : {
			content : {
				type   : 'array',
				source : children( 'p' )
			},
			dropCap: {
				type: 'boolean',
				default: false,
			},
			url : {
				type : 'string',
				default : ''
			},
			checkbox : {
				type     : 'boolean',
				default : false
			},
			radio : {
				type : 'string',
				default : ''
			},
			select : {
				type     : 'string',
				default : ''
			}

		},

		edit : function( props ) {

			var attr = props.attributes;

			var content = props.attributes.content;
			var dropCap = props.attributes.dropCap;
			var url = props.attributes.url;

			var focus = props.focus;

			var alignment = props.attributes.alignment;

			function onChangeContent( newContent ) {

				props.setAttributes( { content : newContent } );
			}

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			function toggleDropCap( newdropCap ) {
				props.setAttributes( { dropCap : ! dropCap } );
			}

			function onChangeURL( newURL ) {
				props.setAttributes( { url : newURL } );
			}

			function onChangeCheckbox( value ) {
				props.setAttributes( { checkbox : ! attr.checkbox } );
			}

			function onChangeRadio( value ) {
				props.setAttributes( { radio : value } );
			}

			function onChangeSelect( value ) {
				props.setAttributes( { select : value } );
			}

			return [
				!! focus && el( blocks.BlockControls, { key : 'controls' },

					el(
						blocks.AlignmentToolbar,
						{
							value    : alignment,
							onChange : onChangeAlignment
						}
					)
				),

				!! focus && el( blocks.InspectorControls, { key : 'inspector' },

					el(
						blocks.BlockDescription,
						{},
						el( 'p', {}, 'Testing a block description.' )
					),
					el(
						'h3',
						{},
						'Test Inspector Controls'
					),
					el(
						blocks.InspectorControls.ToggleControl,
						{
							label : 'Test Toggle',
							checked : dropCap,
							onChange : toggleDropCap
						}
					),
					el(
						blocks.InspectorControls.TextControl,
						{
							label : 'Test URL',
							value : url,
							onChange : onChangeURL
						}
					),
					el(
						blocks.InspectorControls.CheckboxControl,
						{
							label    : 'Test Checkbox',
							checked  : attr.checkbox,
							onChange : onChangeCheckbox
						}
					),
					el(
						blocks.InspectorControls.RadioControl,
						{
							label    : 'Test Radio',
							selected : attr.radio,
							onChange : onChangeRadio,
							options  : [
								{ value : 'apple',  label : 'Apple'  },
								{ value : 'banana', label : 'Banana' },
								{ value : 'orange', label : 'Orange' }
							]
						}
					),
					el(
						blocks.InspectorControls.SelectControl,
						{
							label    : 'Test Select',
							selected : attr.select,
							onChange : onChangeSelect,
							options  : [
								{ value : 'cherry',     label : 'Cherry'     },
								{ value : 'kiwi',       label : 'Kiwi'       },
								{ value : 'watermelon', label : 'Watermelon' }
							]
						}
					)
				),

				create_element( editable, {
					key       : 'editable',
					tagName   : 'p',
					className : props.className,
					onChange  : onChangeContent,
					value     : content,
					focus     : focus,
					onFocus   : props.setFocus
				} )
			];
		},

		save : function( props ) {

			var content = props.attributes.content;

			return create_element( 'p', { className : props.className }, content );
		}
	} );

}() );
