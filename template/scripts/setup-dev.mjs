#!/usr/bin/env node
'use strict'

import path from 'path';
import fs from 'fs-extra';

// modify for your environment
const vmSrcDev = path.resolve(process.cwd(), './src/vm');
const vmSrcOrg = path.resolve(process.cwd(), '../scratch-vm/src');
const vmRefs = [
    'extension-support',
    'util',
];

// Make symbolic link
const makeSymbolicLink = function (to, from) {
    try {
        const stats = fs.lstatSync(from);
        if (stats.isSymbolicLink()) {
            if (fs.readlinkSync(from) === to) {
                console.log(`Already exists link: ${from} -> ${fs.readlinkSync(from)}`);
                return;
            }
            fs.unlink(from);
        } else {
            fs.renameSync(from, `${from}~`);
        }
    } catch (err) {
        // File not exists.
    }
    fs.symlinkSync(to, from, 'dir');
    console.log(`Make link: ${from} -> ${fs.readlinkSync(from)}`);
}

vmRefs.forEach(dir => {
    makeSymbolicLink(path.resolve(vmSrcOrg, dir), path.resolve(vmSrcDev, dir));
});