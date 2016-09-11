apt_repository 'nodesource' do
  uri 'https://deb.nodesource.com/node_4.x'
  distribution 'trusty'
  components ['main']
  key 'https://deb.nodesource.com/gpgkey/nodesource.gpg.key'
  action :add
  deb_src true
end