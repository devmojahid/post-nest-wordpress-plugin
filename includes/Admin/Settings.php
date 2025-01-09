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
                <div class="post-nest-loading-logo"></div>
                <div class="spinner"></div>
                <span>' . esc_html__('Loading Post Nest...', 'post-nest') . '</span>
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

        // Check if we're in development mode
        $is_development = defined('WP_DEBUG') && WP_DEBUG && file_exists(POST_NEST_PATH . 'src/admin/settings/index.jsx');

        if ($is_development) {
            $this->enqueue_development_assets();
        } else {
            $this->enqueue_production_assets();
        }
    }

    private function enqueue_development_assets(): void {
        // Basic WordPress dependencies
        wp_enqueue_script('wp-element');
        wp_enqueue_script('wp-components');
        wp_enqueue_script('wp-api-fetch');

        // Check if Vite server is running
        $vite_server_url = 'http://localhost:5173';
        $vite_server_running = $this->check_vite_server();

        if ($vite_server_running) {
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
                $vite_server_url . '/@vite/client',
                [],
                null,
                true
            );

            wp_enqueue_script(
                'post-nest-settings',
                $vite_server_url . '/index.jsx',
                ['post-nest-settings-dev'],
                null,
                true
            );
        } else {
            // Fallback to production assets if Vite server is not running
            $this->enqueue_production_assets();
        }
    }

    private function enqueue_production_assets(): void {
        $manifest_path = POST_NEST_PATH . 'assets/dist/.vite/manifest.json';
        $asset_file = POST_NEST_PATH . 'assets/dist/index.js';
        $css_file = POST_NEST_PATH . 'assets/dist/assets/index.css';
        
        if (!file_exists($asset_file)) {
            wp_die('Required Post Nest assets are missing. Please run npm run build.');
        }

        // Get version from file modification time
        $version = file_exists($manifest_path) 
            ? md5_file($manifest_path) 
            : filemtime($asset_file);

        // Enqueue main CSS file
        if (file_exists($css_file)) {
            wp_enqueue_style(
                'post-nest-settings',
                POST_NEST_URL . 'assets/dist/assets/index.css',
                [],
                $version
            );
        }

        // Enqueue WordPress dependencies
        wp_enqueue_script('wp-element');
        wp_enqueue_script('wp-components');
        wp_enqueue_script('wp-api-fetch');

        // Enqueue main JS file
        wp_enqueue_script(
            'post-nest-settings',
            POST_NEST_URL . 'assets/dist/index.js',
            ['wp-element', 'wp-components', 'wp-api-fetch'],
            $version,
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

    private function enqueue_development_assets_old(): void {
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

    private function enqueue_production_assets_old(): void {
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

    // private function get_initial_route(): string {
    //     $page = $_GET['page'] ?? 'post-nest-settings';
    //     return str_replace('post-nest-', '/', $page);
    // }

    private function get_initial_route(): string {
        $page = $_GET['page'] ?? 'post-nest-settings';
        
        // Map WordPress page parameters to React routes
        $routes = [
            'post-nest-settings' => '/',
            'post-nest-social-accounts' => '/social-accounts',
            // Add more route mappings as needed
        ];
        
        return $routes[$page] ?? '/';
    }

    private function get_page_title(): string {
        $page = $_GET['page'] ?? 'post-nest-settings';
        
        $titles = [
            'post-nest-settings' => __('Dashboard', 'post-nest'),
            'post-nest-social-accounts' => __('Social Accounts', 'post-nest'),
            // Add more title mappings as needed
        ];
        
        return $titles[$page] ?? __('Post Nest', 'post-nest');
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

    private function check_vite_server(): bool {
        $vite_server_url = 'http://localhost:5173';
        
        $response = wp_remote_get($vite_server_url . '/@vite/client', [
            'timeout' => 1,
            'sslverify' => false
        ]);
        
        return !is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200;
    }

    private function verify_build(): bool {
        $required_files = [
            'assets/dist/index.js',
            'assets/dist/assets/index.css',
        ];
        
        foreach ($required_files as $file) {
            if (!file_exists(POST_NEST_PATH . $file)) {
                return false;
            }
        }
        
        return true;
    }

    public function handle_missing_assets(): void {
        if (current_user_can('manage_options')) {
            add_action('admin_notices', function() {
                echo '<div class="notice notice-error">';
                echo '<p>Post Nest: Required assets are missing. Please run npm run build.</p>';
                echo '</div>';
            });
        }
    }
}