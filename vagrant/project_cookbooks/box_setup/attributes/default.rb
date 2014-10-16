default[:box_setup][:project_name]					= 'custom_app'
default[:box_setup][:redis]							= false
default[:box_setup][:nodejs]						= true
default[:box_setup][:gruntjs]						= true
default[:box_setup][:bower]							= true
default[:box_setup][:npm][:auto_install_packages]	= true
default[:box_setup][:npm][:package_json_location]	= '/home/vagrant/app'
default[:box_setup][:web][:http_port]				= {:from => 3000, :to => 3000}
default[:box_setup][:web][:server]					= false
default[:box_setup][:web][:doc_root]				= '/home/vagrant/app'
default[:box_setup][:ruby_settings][:version]		= '2.1.0'
default[:box_setup][:ruby_settings][:gems]			= []
default[:box_setup][:postgres][:install]			= false
default[:box_setup][:postgres][:password]			= 'vagrant'
default[:box_setup][:postgres][:port]				= {:from => 3000, :to => 3000}
default[:box_setup][:postgres][:hstore]				= false
default[:box_setup][:postgres][:gis]				= false

# Used in templates
default[:box_setup][:server_name]     = 'localhost'
default[:box_setup][:web][:server]    = false
default[:box_setup][:web][:doc_root]  = '/home/vagrant/app'