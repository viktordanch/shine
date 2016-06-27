class AddBioToCustomers < ActiveRecord::Migration
  def up
    add_column :customers, :bio, :text

    execute %{
      CREATE INDEX
        customer_bio_index ON customers
      USING
        gin(to_tsvector('english', bio))
            }

    # Customer.where("to_tsvector('english', bio) @@ plainto_tsquery(?)", "Postgres").all.count

    # execute %{
    # \COPY (
    #           SELECT
    # id, first_name, last_name, email
    # FROM
    # customers
    # ) TO 'tmp/customers.csv' WITH CSV HEADER;
    # }
  end

  def down
    remove_column :customers, :bio
  end
end
