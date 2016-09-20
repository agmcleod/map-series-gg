package ['build-essential', 'git']

directory node['deploy']['app_path'] do
  owner node['deploy']['user']
  group node['deploy']['group']
  mode '0755'
  recursive true
  action :create
end

group node['deploy']['group']

user node['deploy']['user'] do
  group node['deploy']['group']
  system true
  shell '/bin/bash'
end