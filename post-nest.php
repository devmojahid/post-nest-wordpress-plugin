<?php
/**
 * Plugin Name: Post Nest
 * Description: A powerful WordPress plugin for managing social media accounts and posts.
 * Plugin URI: https://postnest.com
 * Version: 1.0.0
 * Author: Mojahid Islam
 * Author URI: https://devmojahid.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: post-nest
 * Domain Path: /languages
 * Requires PHP: 7.4
 */

 // Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}


/**
 * Composer Autoloader
 */

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
    require_once dirname(__FILE__) . '/vendor/autoload.php';
}

/**
 * Plugin Activation/Deactivation Hooks
 */
register_activation_hook(__FILE__, function() {
    \PostNest\Core\Activator::activate();
});

register_deactivation_hook(__FILE__, function() {
    \PostNest\Core\Deactivator::deactivate();
});

/**
 * Initialize PostNest Plugin
 */
if (!class_exists('PostNest')) {
     /**
     * Main Plugin Class
     */
    final class PostNest {
        /**
         * Plugin Version
         * 
         * @var String
         */
        const VERSION = '1.0.0';

         /**
         * Instance
         * 
         * @var PostNest
         */
        private static $instance = null;

        /**
         * Get Instance
         */
        public static function instance() {
            if (is_null(self::$instance)) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Constructor
         */
        private function __construct() {
            $this->define_constants();
            // $this->check_requirements();
            $this->init_hooks();
            // $this->load_dependencies();
            $this->init();
            \PostNest\Core\Init::register_services();
        }

        /**
         * Define Plugin Constants
         * 
         */
        public function define_constants() {
            // Plugin File Path
            if (!defined('POST_NEST_FILE')) {
                define('POST_NEST_FILE', __FILE__);
            }

            // Plugin Directory Path
            if (!defined('POST_NEST_PATH')) {
                define('POST_NEST_PATH', plugin_dir_path(POST_NEST_FILE));
            }

            // Plugin Directory URL
            if (!defined('POST_NEST_URL')) {
                define('POST_NEST_URL', plugin_dir_url(POST_NEST_FILE));
            }

            // Plugin Version
            if (!defined('POST_NEST_VERSION')) {
                define('POST_NEST_VERSION', self::VERSION);
            }

            // Plugin Text Domain
            if (!defined('POST_NEST_TEXT_DOMAIN')) {
                define('POST_NEST_TEXT_DOMAIN', 'post-nest');
            }

            // Plugin Prefix
            if (!defined('POST_NEST_PREFIX')) {
                define('POST_NEST_PREFIX', 'post_nest_');
            }

            // Plugin Assets Directory
            if (!defined('POST_NEST_ASSETS')) {
                define('POST_NEST_ASSETS', POST_NEST_URL . 'assets/');
            }

            // Plugin Includes Directory
            if (!defined('POST_NEST_INCLUDES')) {
                define('POST_NEST_INCLUDES', POST_NEST_PATH . 'includes/');
            }

            // Plugin Templates Directory
            if (!defined('POST_NEST_TEMPLATES')) {
                define('POST_NEST_TEMPLATES', POST_NEST_PATH . 'templates/');
            }

            // Debug Mode
            if (!defined('POST_NEST_DEBUG')) {
                define('POST_NEST_DEBUG', WP_DEBUG);
            }
            
            if(!defined('POST_NEST_DEV_MODE')) {
                define('POST_NEST_DEV_MODE', defined('WP_DEBUG') && WP_DEBUG && file_exists(__DIR__ . '/src'));
            }
        }
        /**
         * Initialize Hooks
         */
        private function init_hooks() {
            add_action('plugins_loaded', [$this, 'load_plugin_textdomain']);
            add_action('init', [$this, 'init']);
        }

        /**
         * Initialize Plugin
         */
        public function init() {
            // Initialize Components
            new \PostNest\Core\Init();
        }

        /**
         * Load Text Domain
         */
        public function load_plugin_textdomain() {
            load_plugin_textdomain(
                'post-nest',
                false,
                dirname(plugin_basename(__FILE__)) . '/languages/'
            );
        }
    }
}


// Start the plugin
function post_nest() {
    return PostNest::instance();
}

/**
 * Initialize the Plugin
 */
post_nest();
