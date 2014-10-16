if node[:box_setup][:nodejs][:install]
  # Fix the self-signed cert issue for NPM; https://twitter.com/npmjs/status/439279809307242496
  execute "Auto-correcting NPM Self-Signed Cert Issue..." do
    cwd   '/home/vagrant'
    user  'root'
    command '/usr/local/bin/npm config set ca=""'
    action  :run
  end

  # If nodejs is enabled, install GruntJS?
  if node[:box_setup][:nodejs][:gruntjs]
    execute "Installing GruntJS via NPM..." do
      cwd     '/home/vagrant'
      user    'root'
      command '/usr/local/bin/npm install -g grunt-cli'
      action  :run
    end
  end

  # If nodejs enabled, install Gulp?
  if node[:box_setup][:nodejs][:gulpjs]
    execute "Installing GULP via NPM..." do
      cwd   '/home/vagrant'
      user  'root'
      command '/usr/local/bin/npm install -g gulp'
      action  :run
    end
  end

  # If nodejs enabled, install bower?
  if node[:box_setup][:nodejs][:bower]
    execute "Installing Bower via NPM..." do
      cwd   '/home/vagrant'
      user  'root'
      command '/usr/local/bin/npm install -g bower'
      action  :run
    end
  end

  # If nodejs enabled, auto-install all dependencies in package.json?
  if node[:box_setup][:nodejs][:npm][:auto_install_packages]
    execute "Auto-installing all NPM dependencies in package.json..." do
      cwd   node[:box_setup][:nodejs][:npm][:package_json_location]
      user  'root'
      command '/usr/local/bin/npm install'
      action  :run
    end
  end

end