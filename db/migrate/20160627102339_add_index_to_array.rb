class AddIndexToArray < ActiveRecord::Migration
  def up
    execute %{
      CREATE INDEX
        users_roles
      ON
        users
      USING GIN (roles)
    }

    # EXPLAIN ANALYZE
    # SELECT * FROM users
    # WHERE roles @> ARRAY['edit_shipping'::varchar];
  end

  def down
    remove_index :users, name: :users_roles
  end
end
