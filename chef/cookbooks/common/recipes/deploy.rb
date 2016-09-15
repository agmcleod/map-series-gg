include_recipe 'pm2::default'

app = search("aws_opsworks_app").first
Chef::Log.info("*** app - shortname              = '#{app['shortname']}' **********")
Chef::Log.info("*** app - source                 = '#{app['app_source']}' **********")
Chef::Log.info("*** app - environment            = '#{app['environment']}' **********")
Chef::Log.info("*** app - url                    = '#{app['app_source']['url']}' **********")
Chef::Log.info("*** app - user                   = '#{app['app_source']['user']}' **********")
Chef::Log.info("*** app - password               = '#{app['app_source']['password']}' **********")
Chef::Log.info("*** node - deploy                = '#{node['deploy']}' **********")
Chef::Log.info("*** node - deploy - install_path = '#{node['deploy']['install_path']}' **********")
Chef::Log.info("*** node - deploy - releases_dir = '#{node['deploy']['releases_dir']}' **********")

# cheat:
# node = {
#   'deploy' => {
#     'releases_dir' => '/var/www/map-series-gg/releases',
#     'install_path' => '/var/www/map-series-gg/current',
#     'shared_dir' => '/var/www/map-series-gg/shared',
#     'user' => 'vagrant',
#     'group' => 'vagrant'
#   },
#   'git_repository' => 'git://github.com/agmcleod/map-series-gg.git',
#   'git_revision' => 'master'
# }

def create_dir(node, path, recursive_create = false)
  directory path do
    owner node['deploy']['user']
    group node['deploy']['group']
    mode '0755'
    recursive recursive_create
    action :create
  end
end

install_path = node['deploy']['install_path']
shared_dir = node['deploy']['shared_dir']

create_dir node, "#{shared_dir}/node_modules", true
create_dir node, node['deploy']['releases_dir']
release_dir = "#{node['deploy']['releases_dir']}/#{DateTime.now.strftime '%Y%m%d%H%M%S'}"
create_dir node, release_dir

git release_dir do
  repository node['git_repository']
  revision node['git_revision']
  action :sync
end

execute "chown-release" do
  command "chown -R #{node['deploy']['user']}:#{node['deploy']['group']} #{release_dir}"
  user "root"
  action :run
end

link install_path do
  to release_dir
  link_type :symbolic
  owner node['deploy']['user']
  group node['deploy']['group']
end

link "#{install_path}/node_modules" do
  to "#{shared_dir}/node_modules"
  link_type :symbolic
  owner node['deploy']['user']
  group node['deploy']['group']
end

bash 'install node deps' do
  user node['deploy']['user']
  cwd release_dir
  code <<-EOH
  npm install
  EOH
  environment 'HOME' => "/home/#{node['deploy']['user']}"
end

bash 'build client js' do
  user node['deploy']['user']
  cwd install_path
  code <<-EOH
  ./node_modules/webpack/bin/webpack.js --config webpack.production.config.js
  EOH
  environment 'HOME' => "/home/#{node['deploy']['user']}"
end

pm2_application 'map-series-gg' do
  script 'index.js'
  cwd "#{install_path}/server"
  action [:deploy, :start_or_restart]
end