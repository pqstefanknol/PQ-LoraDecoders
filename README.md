# This is for actively used devices in the Purple-Q lora network, to easily import the decoder templates into chirpstack. They are customized for Europe 868 and are checked for similar naming schemes, to keep everything uniform:

    name: Vendor Sensortype - Short description if applicable
  Regions that are not used are commented out so that they can be reused when necessary.

  ## On a chirpstack server:
  
  Make sure git is installed.
  
  ## Pull the files with git:
  
    git clone https://github.com/pqstefanknol/PQ-LoraDecoders /tmp/lorawan-devices

  ## Then import them to chirpstack v4:
  
    chirpstack -c /etc/chirpstack import-legacy-lorawan-devices-repository -d /tmp/lorawan-devices



  ## On the PQ Chirpstack servers these have been made into 2 scripts:
  
    gitpull
  
    loraimport
  
  ## For ease of use. These are located in: /usr/local/bin/
    gitpull:
        rm -rf /tmp/lorawan-devices
        echo "Making sure the target directory is empty"
        echo "Pulling from github"
        git clone https://github.com/pqstefanknol/PQ-LoraDecoders /tmp/lorawan-devices

    loraimport:
        echo "Importing device templates from /tmp/lorawan-devices"
        chirpstack -c /etc/chirpstack import-legacy-lorawan-devices-repository -d /tmp/lorawan-devices


        
