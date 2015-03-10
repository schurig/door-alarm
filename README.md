# Door Alarm System for your Raspberry Pi

Get notifications every time your door opens.

**Want to help? [Feel free to push this project forward :)](#contributing)**

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

- [x] pushover notifications
- [x] playing sounds
- [ ] email notifications [#1](/../../issues/1)
- [ ] pushbullet notifications
- [ ] web-interface log
- [ ] Piwik/Google Analytics support
- [ ] web hooks
- [ ] set certain periods of time/ rules for notifications


## TODO

* make installation and setup easier
* better configuration and database management
* refactor code
* write tests!!!!!!!11


## Maintainers

* Martin Schurig (https://github.com/schurig, https://martinschurig.com)
* Pascal Weiland (https://github.com/weiland)


## Contributing

1. Fork it ( https://github.com/schurig/door-alarm/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
