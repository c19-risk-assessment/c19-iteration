'use strict';

const child = require('child_process');

function npminstall(projectFolder) {
	return std = child.execSync(`cd ${projectFolder} && npm install`);
};

module.exports = npminstall;