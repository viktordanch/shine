class CustomerDetail < ActiveRecord::Base
  self.primary_key = 'customer_id'

  def update(params)
    Customer.find(self.customer_id).update(
        first_name: params[:customer_first_name],
        last_name: params[:customer_last_name],
        username: params[:customer_username],
        email: params[:customer_email]
    )
    # require 'pry'; binding.pry
    Address.find(self.billing_address_id).update(
                      address_attributes(params, "billing_address")
    )
    Address.find(self.shipping_address_id).update(
                      address_attributes(params, "shipping_address")
    )
  end

  def address_attributes(params, type)
    {
        street: params["#{type}_street"],
        city: params["#{type}_city"],
        state: State.find_by_code(params["#{type}_code"]),
        zipcode: params["#{type}_zipcode"],
    }
  end
end