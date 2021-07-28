Rails.application.routes.draw do
  namespace :foreman_inventory_upload do
    get ':organization_id/reports/last', to: 'reports#last', constraints: { organization_id: %r{[^\/]+} }
    post ':organization_id/reports', to: 'reports#generate', constraints: { organization_id: %r{[^\/]+} }
    get ':organization_id/uploads/last', to: 'uploads#last', constraints: { organization_id: %r{[^\/]+} }
    get ':organization_id/uploads/file', to: 'uploads#download_file', constraints: { organization_id: %r{[^\/]+} }
    get 'accounts', to: 'accounts#index'
    get 'settings', to: 'uploads_settings#index'
    post 'setting', to: 'uploads_settings#set_advanced_setting'

    post 'cloud_connector', to: 'uploads#enable_cloud_connector'

    resources :tasks, only: [:create, :show]

    get 'status', to: 'cloud_status#index'
  end

  namespace :insights_cloud do
    resources :tasks, only: [:create]
    resource :settings, only: [:show, :update]
    resources :hits, except: %i[show] do
      collection do
        get 'auto_complete_search'
        get 'resolutions', to: 'hits#resolutions'
      end
    end
    match 'hits/:host_id', to: 'hits#show', via: :get
    post 'save_token_and_sync', to: 'settings#save_token_and_sync'
  end

  namespace :foreman_rh_cloud do
    get 'inventory_upload', to: '/react#index'
    get 'insights_cloud', to: '/react#index' # Uses foreman's react controller
  end

  scope :module => :'insights_cloud/api', :path => :redhat_access do
    scope 'r/insights/v1' do
      get 'branch_info', to: 'machine_telemetries#branch_info'
    end

    scope '/r/insights' do
      match '/*path', :constraints => lambda { |req| !req.path.include?('view/api') }, to: 'machine_telemetries#forward_request', via: [:get, :post, :delete,:put, :patch]
    end
  end

  # API routes

  namespace :api, :defaults => {:format => 'json'} do
    scope '(:apiv)', :module => :v2, :defaults => {:apiv => 'v2'}, :apiv => /v1|v2/, :constraints => ApiConstraints.new(:version => 2, :default => true) do
      resources :organizations, :only => [:show] do
        namespace 'rh_cloud' do
          get 'report', to: 'inventory#download_file'
          post 'report', to: 'inventory#generate_report'

          post 'inventory_sync', to: 'inventory#sync_inventory_status'
        end
      end

      namespace 'rh_cloud' do
        post 'enable_connector', to: 'inventory#enable_cloud_connector'
      end
    end
  end
end
