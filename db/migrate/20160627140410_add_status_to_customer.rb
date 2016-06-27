class AddStatusToCustomer < ActiveRecord::Migration
  def up
    execute %{
              CREATE TYPE
                customer_status
              AS ENUM
                ('signed_up', 'verified', 'inactive')
            }



    add_column :customers, :status, :customer_status, default: 'signed_up', null: false

    execute %{
      ALTER TABLE
      customers
      ADD CONSTRAINT
      allowed_statuses
      CHECK
      (status in ('signed_up', 'verified', 'inactive'))
    }

  end

  def down
    remove_column :customers, :status
    execute %{
              DROP TYPE customer_status
            }
  end
end
