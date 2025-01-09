<?php

namespace PostNest\Database\Migrations;

/**
 * CreateSettingsTable class
 * 
 * This class is used to create the settings table.
 * @package PostNest\Database\Migrations
 * @author Mojahid Islam
 * @since 1.0.0
 */
class CreateSettingsTable extends AbstractMigration {
    private $table;

    public function __construct() {
        parent::__construct();
        $this->table = $this->wpdb->prefix . 'post_nest_settings';
    }

    public function up(): void {
        $sql = "CREATE TABLE IF NOT EXISTS {$this->table} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            option_group varchar(191) NOT NULL,
            option_name varchar(191) NOT NULL,
            option_value longtext NOT NULL,
            autoload varchar(20) NOT NULL DEFAULT 'yes',
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY unique_option (option_group, option_name),
            KEY autoload (autoload)
        ) {$this->charset_collate};";

        $this->runQuery($sql);
    }

    public function down(): void {
        $this->wpdb->query("DROP TABLE IF EXISTS {$this->table}");
    }
}