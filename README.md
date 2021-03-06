# Xcratch Command to Create Extension
This command supports to create a new code base of an extension for [Xcratch](https://xcratch.github.io/): Extendable Scratch3 Programming Environment.

## Scaffold New Extension Code

`xcratch-create` is a Node executable script to download template code and replace properties with the arguments. The created files can be used as base of your own extension.

```sh
npx xcratch-create --repo=xcx-my-extension --account=github-account --extensionID=myExtension --extensionName='My Extension'
```

- --repo : Name of the repository on GitHub
- --account : Account on GitHub
- --extensionID : ID of the extension in Scratch (allowed RegExp `/^[a-z0-9]+$/i`)
- --extensionName : Label string of the extension on the Editor in English
- --version : Show version of this command

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/xcratch/xcratch-create/issues). 
## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
This project is [MIT](https://github.com/xcratch/xcratch-create/blob/master/LICENSE) licensed.
