package ['build-essential', 'git']

directory node['deploy']['app_path'] do
  owner node['deploy']['user']
  group node['deploy']['group']
  mode '0755'
  recursive recursive_create
  action :create
end