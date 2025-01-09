<?php

namespace PostNest\Core;

/**
 * Requirements class
 * 
 * This class is used to check if the plugin requirements are met.
 * @package PostNest\Core
 * @author Mojahid Islam
 * @since 1.0.0
 */
class Requirements {
    private static $requirements = [
        'php' => '7.4',
        'wp' => '5.8',
        'extensions' => ['curl', 'json', 'mbstring'],
        'plugins' => [
            'woocommerce/woocommerce.php' => '7.0',
            'elementor/elementor.php' => '3.0'
        ]
    ];

    public static function check(): array {
        $errors = [];

        if (!self::check_php_version()) {
            $errors[] = sprintf(
                'PHP %s or higher is required',
                self::$requirements['php']
            );
        }

        if (!self::check_wp_version()) {
            $errors[] = sprintf(
                'WordPress %s or higher is required',
                self::$requirements['wp']
            );
        }

        $extension_errors = self::check_extensions();
        if (!empty($extension_errors)) {
            $errors = array_merge($errors, $extension_errors);
        }

        $plugin_errors = self::check_plugins();
        if (!empty($plugin_errors)) {
            $errors = array_merge($errors, $plugin_errors);
        }

        return $errors;
    }

    private static function check_php_version(): bool {
        return version_compare(
            PHP_VERSION,
            self::$requirements['php'],
            '>='
        );
    }

    private static function check_wp_version(): bool {
        return version_compare(
            get_bloginfo('version'),
            self::$requirements['wp'],
            '>='
        );
    }

    private static function check_extensions(): array {
        $errors = [];
        foreach (self::$requirements['extensions'] as $extension) {
            if (!extension_loaded($extension)) {
                $errors[] = "PHP {$extension} extension is required";
            }
        }
        return $errors;
    }

    private static function check_plugins(): array {
        $errors = [];
        foreach (self::$requirements['plugins'] as $plugin => $version) {
            if (!is_plugin_active($plugin)) {
                $errors[] = "{$plugin} is required";
            } elseif (!self::check_plugin_version($plugin, $version)) {
                $errors[] = "{$plugin} version {$version} or higher is required";
            }
        }
        return $errors;
    }
}