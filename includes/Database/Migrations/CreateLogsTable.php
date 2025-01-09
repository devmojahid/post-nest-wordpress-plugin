<?php

namespace PostNest\Database\Migrations;

/**
 * CreateLogsTable class
 * 
 * This class is used to create the logs table.
 * @package PostNest\Database\Migrations
 * @author Mojahid Islam
 * @since 1.0.0
 */
class CreateLogsTable extends AbstractMigration {
    private $table;

    public function __construct() {
        parent::__construct();
        $this->table = $this->wpdb->prefix . 'post_nest_logs';
    }

    public function up(): void {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->table} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            level varchar(20) NOT NULL,
            message text NOT NULL,
            context longtext,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            user_id bigint(20) unsigned NULL,
            ip_address varchar(45) NULL,
            user_agent text NULL,
            PRIMARY KEY  (id),
            KEY level (level),
            KEY created_at (created_at),
            KEY user_id (user_id)
        ) {$this->charset_collate};";

        $this->runQuery($sql);
    }

    public function down(): void {
        $this->wpdb->query("DROP TABLE IF EXISTS {$this->table}");
    }
}