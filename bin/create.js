#!/usr/bin/env node
'use strict'

const path = require('path');
const replace = require('replace-in-file');
const fs = require('fs-extra');
const admZip = require('adm-zip');
const projectJson = require('../package.json');

function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            if (arg.slice(0, 2) === '--') {
                // long arg
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2, longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            else if (arg[0] === '-') {
                // flags
                const flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs();

if (args['version'] || args['V']) {
    process.stdout.write(`v${projectJson.version}\n`);
    process.exit(0);
}

if (!args['account']) {
    process.stderr.write('"--account=<github account>" is not set\n');
    process.exit(1);
}
const account = args['account'];

if (!args['repo']) {
    process.stderr.write('"--repo=<github repository>" is not set\n');
    process.exit(1);
}
const repo = args['repo'];

if (!args['extensionID']) {
    process.stderr.write('"--extensionID=<extension ID>" is not set\n');
    process.exit(1);
}
const extensionID = args['extensionID'];

if (!args['extensionName']) {
    process.stderr.write('"--extensionName=<extension name>" is not set\n');
    process.exit(1);
}
const extensionName = args['extensionName'];

const outputDir = args['out'] ?
    path.resolve(process.cwd(), args['out']) :
    path.resolve(process.cwd(), repo);

/**
 * Fetch template files
 * 
 */
async function fetchTemplate() {
    fs.copySync(path.resolve(__dirname, '../template'), outputDir);
}

const options = {
    files: [
        './**/*',
    ],
    from: [
        /<<account>>/g,
        /<<repo>>/g,
        /<<extensionID>>/g,
        /<<extensionName>>/g,
    ],
    to: [
        account,
        repo,
        extensionID,
        extensionName,
    ],
};

async function resetRepo() {
    process.chdir(outputDir);
    fs.renameSync('dot_gitignore', '.gitignore');
    try {
        await replace(options)
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
    try {
        const zip = new admZip();
        const examplePath = path.resolve(outputDir, 'projects/example');
        zip.addLocalFolder(examplePath);
        zip.writeZip(path.resolve(outputDir, 'projects/example.sb3'));
        return fs.rm(examplePath, { recursive: true, force: true });
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchTemplate()
    .then(() => resetRepo())
    .then(() => {
        process.stdout.write(`Create scaffolding project: ${outputDir}\n`);
    })
