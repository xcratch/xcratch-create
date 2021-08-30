#!/usr/bin/env node
'use strict'

const path = require('path');
const replace = require('replace-in-file');
const fs = require('fs');
const admZip = require('adm-zip');

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

if (!args['extensionClass']) {
    process.stderr.write('"--extensionClass=<extension class name>" is not set\n');
    process.exit(1);
}
const extensionClass = args['extensionClass'];

const outputDir = args['out'] ?
    path.resolve(process.cwd(), args['out']) :
    path.resolve(process.cwd(), repo);

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        entry.isDirectory() ?
            copyDir(srcPath, destPath) :
            fs.copyFileSync(srcPath, destPath);
    }
}

/**
 * Fetch template files
 * 
 */
async function fetchTemplate() {
    copyDir(path.resolve(__dirname, '../template'), outputDir);
}

const options = {
    files: [
        'README.md',
        'package.json',
        'src/**/*.js',
        'src/**/*.jsx',
        'projects/example/project.json',
    ],
    from: [
        /<<account>>/g,
        /<<repo>>/g,
        /<<extensionID>>/g,
        /<<extensionName>>/g,
        /<<extensionClass>>/g,
    ],
    to: [
        account,
        repo,
        extensionID,
        extensionName,
        extensionClass,
    ],
};

async function resetRepo() {
    process.chdir(outputDir);
    try {
        const results = await replace(options)
        console.log('Replacement results:', results);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
    try {
        const zip = new admZip();
        const examplePath = path.resolve(outputDir, 'projects/example');
        zip.addLocalFolder(examplePath);
        zip.writeZip(path.resolve(outputDir, 'projects/example.sb3'));
        fs.rmdirSync(examplePath, {recursive:true, force:true});
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchTemplate()
    .then(() => resetRepo());
