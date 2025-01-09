<?php

namespace PostNest\Services\Cache;

/**
 * Cache manager class
 */
class Manager {
    private const CACHE_GROUP = 'your_plugin_cache';
    
    public function get(string $key) {
        return wp_cache_get($key, self::CACHE_GROUP);
    }
    
    public function set(string $key, $value, int $expiration = 3600): bool {
        return wp_cache_set($key, $value, self::CACHE_GROUP, $expiration);
    }

    public function delete(string $key): bool {
        return wp_cache_delete($key, self::CACHE_GROUP);
    }

    public function flush(): bool {
        return wp_cache_flush();
    }

    public function has(string $key): bool {
        return wp_cache_get($key, self::CACHE_GROUP) !== false;
    }

    public function getCacheGroup(): string {
        return self::CACHE_GROUP;
    }
}