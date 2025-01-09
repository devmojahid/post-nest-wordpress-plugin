<?php

namespace PostNest\Core;
/**
 * Boot class
 */
class Boot {
    private static $instance = null;
    private $container;
    private $services = [];

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->container = new Container();
        $this->registerServices();
        $this->initializeServices();
    }

    private function registerServices() {
        $this->services = [
            'cache' => \PostNest\Services\Cache\Manager::class,
            'db' => \PostNest\Database\Manager::class,
            'api' => \PostNest\Api\Manager::class,
            'admin' => \PostNest\Admin\Manager::class,
            'assets' => \PostNest\Assets\Manager::class,
            'blocks' => \PostNest\Integrations\Blocks\Manager::class,
            'elementor' => \PostNest\Integrations\Elementor\Manager::class,
            'queue' => \PostNest\Services\Queue\Manager::class,
            'logger' => \PostNest\Services\Logger\Manager::class,
        ];

        foreach ($this->services as $key => $class) {
            $this->container->bind($key, function() use ($class) {
                return new $class();
            });
        }
    }

    private function initializeServices() {
        add_action('plugins_loaded', function() {
            foreach ($this->services as $key => $class) {
                $instance = $this->container->make($key);
                if (method_exists($instance, 'boot')) {
                    $instance->boot();
                }
            }
        });
    }

    public function container() {
        return $this->container;
    }
}