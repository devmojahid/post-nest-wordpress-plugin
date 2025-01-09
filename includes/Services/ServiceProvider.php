<?php
namespace PostNest\Services;

class ServiceProvider {
    protected static $services = [];
    
    public static function register($key, $service) {
        self::$services[$key] = $service;
    }
    
    public static function get($key) {
        return self::$services[$key] ?? null;
    }
} 