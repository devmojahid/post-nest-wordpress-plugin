<?php

namespace PostNest\Integrations\Elementor\Widgets;

/**
 * Featured Content Widget
 */
class FeaturedContent extends \Elementor\Widget_Base{
    public function get_name(): string {
        return 'post_nest_featured_content';
    }

    public function get_title(): string {
        return __('Featured Content', 'post-nest');
    }

    public function get_categories(): array {
        return ['post-nest'];
    }

    protected function register_controls(): void {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Content', 'post-nest'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label' => __('Title', 'post-nest'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Featured Content', 'post-nest'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render(): void {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="post-nest-featured-content">
            <h2 class="post-nest-text-2xl post-nest-font-bold"><?php echo esc_html($settings['title']); ?></h2>
            <div class="post-nest-content">
                <?php echo wp_kses_post($settings['content']); ?>
            </div>
        </div>
        <?php
    }
}