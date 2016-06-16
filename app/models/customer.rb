class Customer < ActiveRecord::Base
  has_many :customers_shipping_addresses

  has_one :customers_billing_address
  has_one :billing_address, through: :customers_billing_address, source: :address
end
