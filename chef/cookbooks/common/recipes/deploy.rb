include_recipe 'pm2::default'

# app = search("aws_opsworks_app").first
# Chef::Log.info("*** app - shortname              = '#{app['shortname']}' **********")
# Chef::Log.info("*** app - source                 = '#{app['app_source']}' **********")
# Chef::Log.info("*** app - environment            = '#{app['environment']}' **********")
# Chef::Log.info("*** app - url                    = '#{app['app_source']['url']}' **********")
# Chef::Log.info("*** app - user                   = '#{app['app_source']['user']}' **********")
# Chef::Log.info("*** app - password               = '#{app['app_source']['password']}' **********")
# Chef::Log.info("*** node - deploy                = '#{node['deploy']}' **********")
# Chef::Log.info("*** node - deploy - install_path = '#{node['deploy']['install_path']}' **********")
# Chef::Log.info("*** node - deploy - releases_dir = '#{node['deploy']['releases_dir']}' **********")

# cheat:
node = {
  'deploy' => {
    'releases_dir' => '/var/www/map-series-gg/releases',
    'install_path' => '/var/www/map-series-gg',
    'user' => 'vagrant',
    'group' => 'vagrant'
  }
}

directory node['deploy']['releases_dir'] do
  owner node['deploy']['user']
  group node['deploy']['group']
  mode '0755'
  recursive true
  action :create
end

release_dir = "#{node['deploy']['releases_dir']}/#{DateTime.now.strftime '%Y%m%d%H%M%S'}"

git release_dir do
  repository node[:app_name][:git_repository]
  revision node[:app_name][:git_revision]
  action :sync
end

install_path = node['deploy']['install_path']

link install_path do
  to release_dir
  link_type :symbolic
  owner node['deploy']['user']
  group node['deploy']['group']
end

bash 'install node deps, and build' do
  cwd install_path
  user node['deploy']['user']
  code <<-EOH
    npm install
    ./node_modules/webpack/bin/webpack.js --config webpack.production.config.js
  EOH
end

pm2_application 'map-series-gg' do
  script 'index.js'
  cwd "#{install_path}/server"
  action [:deploy, :start_or_restart]
end