# w

w-cli is a cli application to spin up WordBox instances.

[WordBox](https://github.com/codefeathers/WordBox) is a quick development (and deployment) environment for PHP.

## Install

> Before you install! `p7zip` must be in your PATH. `7z --help` to verify. On Debian or Ubuntu, use `sudo apt-get install p7zip`. Currently `w-cli` only works in Linux.

Install `w` from npm!

`npm install w --global`

## Usage

`w new <appname>`

Creates a new project at current folder with name `appname`. Downloads WordBox and extracts it to the folder and does `npm install` to resolve dependencies. You should download or compile `php` and `php-cgi` binaries and place them at `appname/php`. Place your public `.php` files at `appname/public`. Check `config.js` to see if all's perfect, then do `node .` to start a new Express server that runs PHP.

You should probably use `nginx` to reverse-proxy the server in production. Check out my other project `up-serve` [[npm]](https://npmjs.com/package/up-serve) [[Github]](https://github.com/codefeathers/up-serve) to setup nginx servers with a single command.

## Version

Current version is `v 1.1.0`. This is an MVP.

> Note: Because npm versions are immutable, our public version number starts directly from v.1.0.1. The project should be considered unstable until v.2.0.0 which will be `w-cli`'s first stable release version.

### Credits

I humbly thank [@wbhob](https://github.com/wbhob) for donating the package name `w` on npm.
