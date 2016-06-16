namespace :refresh_materialized_views do
  desc "Refresh Materialized Views"
  task refresh_materialized_views: :environment do
    ActiveRecord::Base.connection.execute %{
      REFRESH MATERIALIZED VIEW CONCURRENTLY customer_details
    }
  end
end
