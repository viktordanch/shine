class Address < ActiveRecord::Base
  belongs_to :state
  has_one :customers_billing_address
  has_one :customers_shipping_address
end