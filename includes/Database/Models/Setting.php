<?php

namespace PostNest\Database\Models;

/**
 * Setting Model
 * 
 * This class is used to manage settings.
 * @package PostNest\Database\Models
 * @author Mojahid Islam
 * @since 1.0.0
 */
class Setting extends Model {
    protected $table;

    protected $fillable = [
        'option_group',
        'option_name',
        'option_value',
        'autoload'
    ];

    protected function getTable(): string {
        return $this->wpdb->prefix . 'post_nest_settings';
    }

    public function get(string $group, string $name, $default = null) {
        $result = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT option_value FROM {$this->table} 
                WHERE option_group = %s AND option_name = %s",
                $group,
                $name
            )
        );

        return $result ? maybe_unserialize($result->option_value) : $default;
    }

    public function set(string $group, string $name, $value): bool {
        $exists = $this->get($group, $name) !== null;
        $serialized = maybe_serialize($value);

        if ($exists) {
            return $this->wpdb->update(
                $this->table,
                ['option_value' => $serialized],
                [
                    'option_group' => $group,
                    'option_name' => $name
                ]
            ) !== false;
        }

        return $this->wpdb->insert(
            $this->table,
            [
                'option_group' => $group,
                'option_name' => $name,
                'option_value' => $serialized,
                'autoload' => 'yes'
            ]
        ) !== false;
    }

    public function getAllByGroup(string $group): array {
        return $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table} WHERE option_group = %s",
                $group
            )
        );
    }
}