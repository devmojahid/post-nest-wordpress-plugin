<?php

namespace PostNest\Integrations\Elementor;

/**
 * Elementor Manager
 */
class Manager {
    public function boot(): void {
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/elements/categories_registered', [$this, 'add_category']);
    }

    public function register_widgets($widgets_manager): void {
        $widgets_manager->register(new Widgets\FeaturedContent());
        $widgets_manager->register(new Widgets\DataDisplay());
    }

    public function add_category($elements_manager): void {
        $elements_manager->add_category(
            'post-nest',
            [
                'title' => __('Post Nest', 'post-nest-text-domain'),
                'icon' => 'fa fa-plug',
            ]
        );
    }
}