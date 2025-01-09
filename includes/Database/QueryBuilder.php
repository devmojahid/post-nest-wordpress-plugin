<?php

namespace PostNest\Database;

/**
 * Query builder class
 */
class QueryBuilder {
    private $wpdb;
    private $table;
    
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }

    public function table(string $table): self {
        $this->table = $this->wpdb->prefix . $table;
        return $this;
    }

    public function create(array $data): int {
        $this->wpdb->insert($this->table, $data);
        return $this->wpdb->insert_id;
    }

    public function update(array $data, int $id): bool {
        return $this->wpdb->update($this->table, $data, ['id' => $id]);
    }

    public function delete(int $id): bool {
        return $this->wpdb->delete($this->table, ['id' => $id]);
    }

    public function get(int $id): array {
        return $this->wpdb->get_row($this->wpdb->prepare("SELECT * FROM $this->table WHERE id = %d", $id), ARRAY_A);
    }

    public function all(): array {
        return $this->wpdb->get_results("SELECT * FROM $this->table", ARRAY_A);
    }

    public function where(string $column, string $value): self {
        $this->where[] = "{$column} = {$value}";
        return $this;
    }

    public function find(): array {
        $where = implode(' AND ', $this->where);
        $sql = "SELECT * FROM $this->table WHERE $where";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }

    public function first(): array {
        $results = $this->get();
        return $results ? $results[0] : [];
    }

    public function count(): int {
        $where = implode(' AND ', $this->where);
        return $this->wpdb->get_var("SELECT COUNT(*) FROM $this->table WHERE $where");
    }

    public function paginate(int $perPage, int $page): array {
        $offset = ($page - 1) * $perPage;
        $this->limit($perPage)->offset($offset);
        return $this->get();
    }

    public function limit(int $limit): self {
        $this->limit = $limit;
        return $this;
    }

    public function offset(int $offset): self {
        $this->offset = $offset;
        return $this;
    }

    public function orderBy(string $column, string $direction = 'asc'): self {
        $this->orderBy = "{$column} {$direction}";
        return $this;
    }

    public function build(): string {
        $sql = "SELECT * FROM $this->table";
        if (!empty($this->where)) {
            $sql .= " WHERE " . implode(' AND ', $this->where);
        }
        return $sql;
    }

    public function execute(): bool {
        return $this->wpdb->query($this->build());
    }

    public function getLastQuery(): string {
        return $this->wpdb->last_query;
    }

    public function getLastInsertId(): int {
        return $this->wpdb->insert_id;
    }
}