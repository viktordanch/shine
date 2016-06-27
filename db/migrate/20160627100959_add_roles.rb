class AddRoles < ActiveRecord::Migration
  def change
    add_column :users, :roles, :string, array: true, default: []
    # User.where("roles @> ARRAY['admin'::varchar]")

  end
end
