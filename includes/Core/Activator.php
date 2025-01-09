<?php

namespace PostNest\Core;

/**
 * Activator class
 */
class Activator {
    public static function activate(): void {
        self::check_requirements();
        self::create_tables();
        self::set_defaults();
        
        flush_rewrite_rules(); // Flush rewrite rules to ensure new routes are registered
    }

    private static function check_requirements(): void {
        if (version_compare(PHP_VERSION, '7.4', '<')) {
            wp_die(__('Post Nest requires PHP 7.4 or higher. Please upgrade your PHP version.', 'post-nest'));
        }
        
        if (!function_exists('curl_init')) {
            wp_die(__('Post Nest requires cURL extension. Please enable it in your PHP configuration.', 'post-nest'));
        }

        self::check_required_plugins();
    }

    private static function check_required_plugins(): void {
        $required_plugins = [
            // 'WooCommerce' => 'woocommerce/woocommerce.php',
            // 'Elementor' => 'elementor/elementor.php',
        ];

        foreach ($required_plugins as $plugin_name => $plugin_file) {
            if (!is_plugin_active($plugin_file)) {
                wp_die(__('Post Nest requires the following plugins to be active: ' . implode(', ', array_keys($required_plugins)) . '. Please activate them and try again.', 'post-nest'));
            }
        }

        // Check if the required plugins are installed
        foreach ($required_plugins as $plugin_name => $plugin_file) {
            if (!is_plugin_installed($plugin_file)) {
                wp_die(__('Post Nest requires the following plugins to be installed: ' . implode(', ', array_keys($required_plugins)) . '. Please install them and try again.', 'post-nest'));
            }
        }

        // Check if the required plugins are up to date
        foreach ($required_plugins as $plugin_name => $plugin_file) {
            if (!is_plugin_up_to_date($plugin_file)) {
                wp_die(__('Post Nest requires the following plugins to be up to date: ' . implode(', ', array_keys($required_plugins)) . '. Please update them and try again.', 'post-nest'));
            }
        }
        
    }

    private static function create_tables(): void {
        global $wpdb;
       
        $tables = [
            new \PostNest\Database\Migrations\CreateSettingsTable(),
            new \PostNest\Database\Migrations\CreateLogsTable(),
            // new \PostNest\Database\Migrations\CreatePostNestTable(),
        ];

        foreach ($tables as $table) {
            $table->up();
        }
    }

    private static function set_defaults(): void {
        $settings = new \PostNest\Database\Models\Setting();
        $defaults = [
            'general' => [
                'enable_features' => true,
                'cache_duration' => 3600
            ],
            'api' => [
                'timeout' => 30,
                'retries' => 3
            ]
        ];

        foreach ($defaults as $key => $value) {
            foreach ($value as $option_name => $option_value) {
                if (!$settings->get($key, $option_name)) {
                    $settings->set($key, $option_name, $option_value);
                }
            }
        }
    }
}