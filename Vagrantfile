# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = '2'

Vagrant.require_version '>= 1.5.0'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.hostname = 'map-series-gg'

  if Vagrant.has_plugin?("vagrant-omnibus")
    config.omnibus.chef_version = '12.10.24'
  end

  config.vm.box = 'ubuntu/trusty64'
  config.vm.network "private_network", ip: '192.168.10.10'
  config.vm.network "forwarded_port", guest: 8200, host: 8200
  # config.vm.synced_folder '.', '/var/www/map-series-gg', type: 'nfs'

  config.vm.provider 'virtualbox' do |v|
    v.memory = 4096
    v.cpus = 2
  end

  config.berkshelf.enabled = true
  config.berkshelf.berksfile_path = "./chef/Berksfile"

  # Make sure that the newest version of Chef has been installed
  config.vm.provision :shell, :inline => "apt-get update -qq && apt-get install --no-upgrade --yes"

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "./chef"

    chef.run_list = [
      'recipe[apt]',
      'recipe[common::setup]',
      'recipe[nodejs_local::nodesource_repo]',
      'recipe[nodejs_local::install_nodejs]',
      'recipe[nodejs_local::global_npm_packages]',
      'recipe[common::deploy]'
    ]
  end
end