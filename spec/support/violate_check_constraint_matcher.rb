RSpec::Matchers.define :violate_check_constraint do |constraint_name|
  supports_block_expectations
  match do |ode_to_test|
    begin
      ode_to_test.()
      false
    rescue ActiveRecord::StatementInvalid => ex
      ex.message =~ /#{constraint_name}/
    end
  end
end