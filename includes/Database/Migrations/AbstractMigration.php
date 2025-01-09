<?php

namespace PostNest\Database\Migrations;

/**
 * AbstractMigration class
 * 
 * This class is used as a base for all migrations.
 * @package PostNest\Database\Migrations
 * @author Mojahid Islam
 * @since 1.0.0
 */
abstract class AbstractMigration {
    protected $wpdb;
    protected $charset_collate;

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->charset_collate = $wpdb->get_charset_collate();
    }

    abstract public function up(): void;
    abstract public function down(): void;

    /**
     * Run a query
     * 
     * @param string $sql The SQL query to run
     * @return void
     */
    protected function runQuery(string $sql): void {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}