<?php

namespace PostNest\Admin;

/**
 * Settings class
 */
class Settings {
    public function register(): void {
        add_action('admin_menu', [$this, 'add_settings_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('admin_head', [$this, 'inject_settings_data']);
    }
    
    public function add_settings_page(): void {
        add_menu_page(
            __('Post Nest Settings', 'post-nest'),
            __('Post Nest', 'post-nest'),
            'manage_options',
            'post-nest-settings',
            [$this, 'render_settings_page'],
            'dashicons-share'
        );

        // Add submenu pages
        add_submenu_page(
            'post-nest-settings',
            __('Dashboard', 'post-nest'),
            __('Dashboard', 'post-nest'),
            'manage_options',
            'post-nest-settings'
        );

        add_submenu_page(
            'post-nest-settings',
            __('Social Accounts', 'post-nest'),
            __('Social Accounts', 'post-nest'),
            'manage_options',
            'post-nest-social-accounts',
            [$this, 'render_settings_page']
        );

        // Add more submenu pages as needed
    }

    public function render_settings_page(): void {
        // Add nonce for security
        wp_nonce_field('post_nest_settings', 'post_nest_nonce');
        
        // Add a loading state container
        echo '<div id="post-nest-settings-loading" class="post-nest-loading">
                <div class="post-nest-loading-content">
                    <span class="spinner is-active"></span>
                    ' . esc_html__('Loading Post Nest...', 'post-nest') . '
                </div>
              </div>';
        
        // Main app container
        echo '<div id="post-nest-settings" class="wrap"></div>';

        // In development mode, add the Vite client
        if (defined('WP_DEBUG') && WP_DEBUG) {
            echo '<script type="module">
                import RefreshRuntime from "http://localhost:5173/@react-refresh"
                RefreshRuntime.injectIntoGlobalHook(window)
                window.$RefreshReg$ = () => {}
                window.$RefreshSig$ = () => (type) => type
                window.__vite_plugin_react_preamble_installed__ = true
            </script>';
        }
    }

    public function inject_settings_data(): void {
        $screen = get_current_screen();
        if (!$screen || !$this->is_settings_page($screen)) {
            return;
        }

        // Get the admin URL without query parameters
        $admin_url = admin_url();
        
        // Inject initial state/data
        $settings_data = [
            'apiUrl' => rest_url('post-nest/v1'),
            'nonce' => wp_create_nonce('wp_rest'),
            'adminUrl' => $admin_url,
            'user' => $this->get_user_data(),
            'initialRoute' => $this->get_initial_route(),
            'capabilities' => $this->get_user_capabilities(),
        ];

        printf(
            '<script>window.postNestSettings = %s;</script>',
            wp_json_encode($settings_data)
        );
    }

    public function enqueue_assets($hook): void {
        $is_development = defined('WP_DEBUG') && WP_DEBUG;
        
        if (!$this->is_settings_page_hook($hook)) {
            return;
        }

        // Enqueue WordPress core dependencies
        wp_enqueue_style('wp-components');
        
        // Add loading styles
        wp_add_inline_style(
            'wp-components',
            $this->get_loading_styles()
        );

        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) {
            $this->enqueue_development_assets();
        } else {
            $this->enqueue_production_assets();
        }
    }

    private function enqueue_development_assets(): void {
        // Enqueue React and ReactDOM from WordPress
        wp_enqueue_script('wp-element');
        wp_enqueue_script('wp-components');
        wp_enqueue_script('wp-api-fetch');
        
        // Add development scripts with proper type="module"
        add_filter('script_loader_tag', function($tag, $handle) {
            if (in_array($handle, ['post-nest-settings-dev', 'post-nest-settings'])) {
                return str_replace('<script', '<script type="module" crossorigin="true"', $tag);
            }
            return $tag;
        }, 10, 2);

        // Enqueue Vite's development scripts
        wp_enqueue_script(
            'post-nest-settings-dev',
            'http://localhost:5173/@vite/client',
            [],
            null,
            true
        );

        wp_enqueue_script(
            'post-nest-settings',
            'http://localhost:5173/index.jsx',
            ['post-nest-settings-dev'],
            null,
            true
        );
    }

    private function enqueue_production_assets(): void {
        $asset_file = include POST_NEST_PATH . 'assets/dist/settings.asset.php';
        
        wp_enqueue_style(
            'post-nest-settings',
            POST_NEST_URL . 'assets/dist/settings.css',
            ['wp-components'],
            $asset_file['version']
        );

        // Enqueue React and ReactDOM from WordPress
        wp_enqueue_script('wp-element');
        wp_enqueue_script('wp-components');
        wp_enqueue_script('wp-api-fetch');

        wp_enqueue_script(
            'post-nest-settings',
            POST_NEST_URL . 'assets/dist/settings.js',
            array_merge(['wp-element', 'wp-components', 'wp-api-fetch'], $asset_file['dependencies']),
            $asset_file['version'],
            true
        );

        // Add type="module" to the script tag
        add_filter('script_loader_tag', function($tag, $handle) {
            if ($handle === 'post-nest-settings') {
                return str_replace('<script', '<script type="module"', $tag);
            }
            return $tag;
        }, 10, 2);
    }

    private function is_settings_page_hook(string $hook): bool {
        return strpos($hook, 'post-nest') !== false;
    }

    private function is_settings_page($screen): bool {
        return strpos($screen->id, 'post-nest') !== false;
    }

    private function get_user_data(): array {
        $user = wp_get_current_user();
        return [
            'id' => $user->ID,
            'name' => $user->display_name,
            'email' => $user->user_email,
            'avatar' => get_avatar_url($user->ID),
        ];
    }

    private function get_user_capabilities(): array {
        return [
            'canManageOptions' => current_user_can('manage_options'),
            'canPublishPosts' => current_user_can('publish_posts'),
            // Add more capabilities as needed
        ];
    }

    private function get_initial_route(): string {
        $page = $_GET['page'] ?? 'post-nest-settings';
        return str_replace('post-nest-', '/', $page);
    }

    private function get_loading_styles(): string {
        return '
            .post-nest-loading {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #f0f0f1;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .post-nest-loading-content {
                text-align: center;
                color: #3c434a;
            }
            .post-nest-loading .spinner {
                float: none;
                margin: 0 0 8px;
            }
        ';
    }
}