<?php

namespace PostNest\Database\Models;
    
/**
 * Log Model
 * 
 * This class is used to manage logs.
 * @package PostNest\Database\Models
 * @author Mojahid Islam
 * @since 1.0.0
 */
class Log extends Model {
    protected $table;

    protected $fillable = [
        'level',
        'message',
        'context',
        'user_id',
        'ip_address',
        'user_agent'
    ];

    protected function getTable(): string {
        return $this->wpdb->prefix . 'post_nest_logs';
    }

    public function log(
        string $level,
        string $message,
        array $context = [],
        ?int $userId = null
    ): bool {
        return $this->create([
            'level' => $level,
            'message' => $message,
            'context' => maybe_serialize($context),
            'user_id' => $userId ?? get_current_user_id(),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
        ]) !== false;
    }
}