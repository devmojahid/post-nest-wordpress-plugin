<?php

namespace PostNest\Api;

class Routes {
    public function register(): void {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes(): void {
        register_rest_route('post-nest/v1', '/settings', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_settings'],
                'permission_callback' => [$this, 'check_permissions'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'update_settings'],
                'permission_callback' => [$this, 'check_permissions'],
            ],
        ]);
    }

    public function check_permissions(): bool {
        return current_user_can('manage_options');
    }

    public function get_settings(): \WP_REST_Response {
        $settings = new \PostNest\Database\Models\Setting();
        $data = [
            'general' => $settings->getAllByGroup('general'),
            'api' => $settings->getAllByGroup('api'),
        ];

        return new \WP_REST_Response($data, 200);
    }

    public function update_settings(\WP_REST_Request $request): \WP_REST_Response {
        $settings = new \PostNest\Database\Models\Setting();
        $data = $request->get_json_params();

        foreach ($data as $group => $values) {
            foreach ($values as $key => $value) {
                $settings->set($group, $key, $value);
            }
        }

        return new \WP_REST_Response([
            'message' => __('Settings updated successfully', 'post-nest'),
            'data' => $data
        ], 200);
    }
}
