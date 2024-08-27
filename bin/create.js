#!/usr/bin/env node

import path from 'path';
import { replaceInFile } from 'replace-in-file';
import fs from 'fs-extra';
import AdmZip from 'adm-zip';
import projectJson from '../package.json' assert { type: 'json' };

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function getArgs() {
    const args = {};
    process.argv
        .slice(2) // Start from the third argument (ignoring Node and script path)
        .forEach(arg => {
            if (arg.startsWith('--')) {
                // Long argument (e.g., --account=my-account)
                const [longArgFlag, ...rest] = arg.slice(2).split('=');
                args[longArgFlag] = rest.join('=') || true; // Handle arguments with and without values
            } else if (arg.startsWith('-')) {
                // Flags (e.g., -abc becomes args.a = args.b = args.c = true)
                arg.slice(1).split('').forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

const args = getArgs();

// Check for version request
if (args.version || args.V) {
    process.stdout.write(`v${projectJson.version}\n`);
    process.exit(0); // Exit successfully after displaying version
}

// Validate required arguments
if (!args.account) {
    process.stderr.write('"--account=<github account>" is not set\n');
    process.exit(1); // Exit with an error code
}
const account = args.account;

if (!args.repo) {
    process.stderr.write('"--repo=<github repository>" is not set\n');
    process.exit(1);
}
const repo = args.repo;

if (!args.extensionID) {
    process.stderr.write('"--extensionID=<extension ID>" is not set\n');
    process.exit(1);
}
const extensionID = args.extensionID;

if (!args.extensionName) {
    process.stderr.write('"--extensionName=<extension name>" is not set\n');
    process.exit(1);
}
const extensionName = args.extensionName;

// Determine output directory
const outputDir = args.out
    ? path.resolve(process.cwd(), args.out)
    : path.resolve(process.cwd(), repo);

// Fetch the project template
async function fetchTemplate() {
    try {
        await fs.copy(path.resolve(__dirname, '../template'), outputDir);
    } catch (error) {
        console.error('Error fetching template:', error);
        process.exit(1);
    }
}

// Replacement options for template files
const options = {
    files: ['./**/*'], // Target all files in the output directory
    from: [
        /<<account>>/g,
        /<<repo>>/g,
        /<<extensionID>>/g,
        /<<extensionName>>/g,
    ],
    to: [account, repo, extensionID, extensionName],
};

// Customize the template with provided arguments
async function resetRepo() {
    try {
        process.chdir(outputDir); // Change working directory to the output directory

        // Rename .gitignore file
        await fs.rename('dot_gitignore', '.gitignore');

        // Replace placeholders in template files
        await replaceInFile(options);

        // Zip the example project directory
        const zip = new AdmZip();
        const examplePath = path.resolve(outputDir, 'projects/example');
        zip.addLocalFolder(examplePath);
        zip.writeZip(path.resolve(outputDir, 'projects/example.sb3'));

        // Remove the original example directory
        await fs.rm(examplePath, { recursive: true, force: true });

        console.log(`Scaffolding project created at: ${outputDir}`);

    } catch (error) {
        console.error('Error occurred:', error);
        process.exit(1);
    }
}

// Execute the setup process
fetchTemplate()
    .then(resetRepo) 
    .catch(error => {
        console.error('Error during setup:', error);
        process.exit(1); 
    });

