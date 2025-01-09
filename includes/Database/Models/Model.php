<?php

namespace PostNest\Database\Models;

/**
 * Model class
 * 
 * This class is used as a base for all models.
 * @package PostNest\Database\Models
 * @author Mojahid Islam
 * @since 1.0.0
 */
abstract class Model {
    protected $wpdb;
    protected $table;
    protected $primaryKey = 'id';
    protected $fillable = [];

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table = $wpdb->prefix . $this->getTable();
    }

    abstract protected function getTable(): string;

    public function find($id) {
        return $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = %d",
                $id
            )
        );
    }

    public function create(array $data) {
        $data = array_intersect_key($data, array_flip($this->fillable));
        
        if ($this->wpdb->insert($this->table, $data)) {
            return $this->find($this->wpdb->insert_id);
        }
        
        return false;
    }

    public function update($id, array $data) {
        $data = array_intersect_key($data, array_flip($this->fillable));
        
        return $this->wpdb->update(
            $this->table,
            $data,
            [$this->primaryKey => $id]
        );
    }

    public function delete($id) {
        return $this->wpdb->delete(
            $this->table,
            [$this->primaryKey => $id]
        );
    }
}