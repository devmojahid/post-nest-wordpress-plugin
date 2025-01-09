<?php

namespace PostNest\Api\Controllers;


abstract class BaseController {
    protected $namespace = 'post-nest/v1';
    
    abstract public function register_routes(): void;

    protected function success($data = null, string $message = ''): array {
        return [
            'success' => true,
            'data' => $data,
            'message' => $message
        ];
    }
}
