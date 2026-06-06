# Xcratch Command to Create Extension
This command supports to create a new code base of an extension for [Xcratch](https://xcratch.github.io/): Extendable Scratch3 Programming Environment.

## Scaffold New Extension Code

`xcratch-create` is a Node executable script to download template code and replace properties with the arguments. The created files can be used as base of your own extension.

### Create a new project directory

```sh
npx xcratch-create --repo=xcx-my-extension --account=github-account --extensionID=myExtension --extensionName='My Extension'
```

### Scaffold in the current directory (init mode)

Use `--init` to expand the template into the current working directory. `--repo` can be omitted and will be inferred from the directory name.

```sh
mkdir xcx-my-extension && cd xcx-my-extension
npx xcratch-create --init --account=github-account --extensionID=myExtension --extensionName='My Extension'
```

This is useful when you have already cloned a repository and want to scaffold the extension files inside it.

- --init : Scaffold in the current (or `--out`) directory instead of creating a new subdirectory
- --repo : Name of the repository on GitHub (inferred from the directory name when `--init` is used)
- --account : Account on GitHub
- --extensionID : ID of the extension in Scratch (allowed RegExp `/^[a-z0-9]+$/i`)
- --extensionName : Label string of the extension on the Editor in English
- --out : Output directory (default: current directory when `--init`, otherwise `--repo` name)
- --force : Overwrite existing files when using `--init` (default: skip existing files)
- --version : Show version of this command

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/xcratch/xcratch-create/issues). 
## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
This project is [MIT](https://github.com/xcratch/xcratch-create/blob/master/LICENSE) licensed.
