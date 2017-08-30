<?php

add_action( 'init', 'gb_tests_register_block_types' );

function gb_tests_register_block_types() {

	register_block_type(
		'gb-tests/example-02',
		array(
			'render_callback' => 'gb_tests_render_example_02'
		)
	);
}

function gb_tests_render_example_02( $attr, $content ) {


	if ( is_user_logged_in() )
		return $content;


	return sprintf(
		'<p class="notice-error">%s</p>',
		esc_html__( 'You must be logged into view this content.', 'members' )
	);
}
