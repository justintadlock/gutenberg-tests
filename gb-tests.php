<?php
/**
 * Plugin Name: Gutenberg Tests
 * Plugin URI:  https://github.com/justintadlock/gutenberg-tests
 * Description: Playing around with Gutenberg.
 * Version:     1.0.0-alpha-1
 * Author:      Justin Tadlock
 * Author URI:  http://justintadlock.com
 */

/**
 * Singleton class for setting up the plugin.
 *
 * @since  1.0.0
 * @access public
 */
final class GB_Tests {

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self;
			$instance->includes();
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	private function includes() {

		require_once( plugin_dir_path( __FILE__ ) . 'inc/block-types.php' );
	}

	/**
	 * Sets up main plugin actions and filters.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	private function setup_actions() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue' ) );
	}

	public function enqueue() {

		wp_enqueue_script(
			'gb-tests-gutenberg',
			plugins_url( 'js/blocks.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element' )
		);

		wp_enqueue_style(
			'gb-tests-gutenberg',
			plugins_url( 'css/editor.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'css/editor.css' )
		);
	}
}

GB_Tests::get_instance();
