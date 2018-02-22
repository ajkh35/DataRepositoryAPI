Rails.application.routes.draw do

  scope module: 'api', format: 'json' do
    namespace 'v1' do
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]
    end
  end
end
