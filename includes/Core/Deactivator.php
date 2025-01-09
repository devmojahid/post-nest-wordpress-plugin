<?php

namespace PostNest\Core;

/**
 * Deactivator class
 */
class Deactivator {
    public static function deactivate(): void {
        self::clean_temporary_data();

        flush_rewrite_rules();
    }

    private static function clean_temporary_data(): void {
        global $wpdb;
        
        // Clear transients
        $wpdb->query(
            "DELETE FROM {$wpdb->options} 
            WHERE option_name LIKE '%_transient_yp_%'"
        );

        // Clear cache
        wp_cache_flush();
    }
}