'use strict';

const child = require('child_process');
const { normalize } = require('path');

function extract(source, destination) {
	child.execSync(`7z x ${source} -o${destination}`);
	child.execSync(`mv ${normalize(destination + '/WordBox-master/*')} ${destination}`);
	child.execSync(`rm -rf ${normalize(destination + '/WordBox-master/')}`);
};

module.exports = extract;