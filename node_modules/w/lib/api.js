'use strict';

const fs = require('fs');
const normalize = require('path').normalize;

const axios = require('axios');

const extract = require('../utils/extract');
const npminstall = require('../utils/npminstall');

const newapp = (appname, options) => {
	console.log(`Spinning up a new WordBox app at ${appname}...`);

	const tmp = normalize(process.cwd() + '/wordbox.zip');
	console.log(`Downloading wordbox.zip`);
	axios({
			method: 'get',
			url: 'https://github.com/codefeathers/WordBox/archive/master.zip',
			responseType: 'stream'
		})
		.then(responseStream => new Promise((resolve, reject) => {
			responseStream.data.once('error', reject);
			let fileStream = fs.createWriteStream(tmp);
			fileStream.once('error', reject);
			fileStream.once('finish', resolve);
			return responseStream.data.pipe(fileStream);
		}))
		.then(() => extract(tmp, normalize(process.cwd() + '/' + appname)))
		.then(() => fs.unlink(tmp, (err) => { if(err) throw new Error(err) }))
		.then(() => npminstall(appname))
		.catch((err) => { if(err) throw new Error(err) });
};

module.exports.newapp = newapp;