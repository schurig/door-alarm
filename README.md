# Door Alarm System for your Raspberry Pi

Get notified when your door opens.

## Installation

```bash
# clone this repository
git clone https://github.com/schurig/door-alarm.git
cd door-alarm

# install node and bower dependencies
npm install
bower install
```


## Usage

Run the server with

    $ node app.js


## What it supports:

- [x] email notifications
- [x] pushover notifications
- [x] playing sounds
- [ ] pushbullet notifications
- [ ] web-interface log
- [ ] web hooks


## TODO

* make installation and setup easier
* better configuration and database management
* refactor code


## Maintainer

* Martin Schurig (https://github.com/schurig)


## Contributing

1. Fork it ( https://github.com/schurig/door-alarm/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request