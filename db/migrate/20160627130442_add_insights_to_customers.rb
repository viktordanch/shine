class AddInsightsToCustomers < ActiveRecord::Migration
  def change
    add_column :customers, :insights, :json, default: {}

    Customer.where("(insights->> 'spendiness')::decimal > 4")
    Customer.where("(insights->'curiosity'->>'shues')::decimal > 2").all.count

    # SELECT
    # id,insights
    # FROM
    # customers
    # WHERE
    # (insights->>'spendiness')::decimal > 4;

    # SELECT
    # id,insights
    # FROM
    # customers
    # WHERE
    # (insights->'curiosity'->>'shoes')::decimal > 2;

    # select id,insights from customers
    # where insights@>'{ "curiosity": { "accessories": true }}';

    # create index on customers using GIN (insights);
  end
end
