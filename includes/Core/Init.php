<?php

namespace PostNest\Core;

use PostNest\{
    Admin\Menu,
    Admin\Settings,
    Api\Routes,
    Frontend\ShortcodeManager,
    Integrations\Gutenberg\Blocks,
    Integrations\Elementor\Widgets,
    Services\Cache\Manager,
    Services\Queue\Processor
};

/**
 * Register services
 */
class Init {
    private static $services = [
        Menu::class,
        Settings::class,
        // Routes::class,
        // ShortcodeManager::class,
        // Blocks::class,
        // Widgets::class,
        // Manager::class,
        // Processor::class,
    ];

    public static function register_services(): void {
        foreach (self::$services as $service) {
            $instance = new $service();
            if (method_exists($instance, 'register')) {
                $instance->register();
            }
        }
    }
}