# ghost-config
Custom config.js file for ghost created with docker in mind.
Instead of having development and production config objects a single one is created which reads the settings from environment variables.
It is responsability of the runner of the container to determine the settings of the ghost blog and no files should be manually modified to accommodate environment switching.
