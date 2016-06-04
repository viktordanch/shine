class AddLowerIndexesToCustomers < ActiveRecord::Migration
  def up
    execute %{
      CREATE INDEX
        customers_lower_last_name
      ON
        customers (lower(last_name) varchar_pattern_ops)
      }
    execute %{
      CREATE INDEX
        customers_lower_first_name
      ON
        customers (lower(first_name) varchar_pattern_ops)
      }
    execute %{
      CREATE INDEX
        customers_lower_email
      ON
        customers (lower(email))
      }
  end

  def down
    remove_index :customers, name: :customers_lower_last_name
    remove_index :customers, name: :customers_lower_first_name
    remove_index :customers, name: :customers_lower_email
  end

  # EXPLAIN ANALYZE
  # SELECT *
  #     FROM customers WHERE
  # lower(first_name) like 'bob%' OR lower(last_name) like 'bob%' OR lower(email) = 'bob@example.com' ORDER BY email = 'bob@example.com' DESC, last_name ASC;
end
