# <<extensionName>>
An example extension for [Xcratch](https://xcratch.github.io/)

This extension add extra-block "do it", that executes string in its input field as a sentence in Javascript and return the result.


## ✨ What You Can Do With This Extension

Play [Example Project](https://xcratch.github.io/editor/#https://<<account>>.github.io/<<repo>>/projects/example.sb3) to look at what you can do with "<<extensionName>>" extension. 
<iframe src="https://xcratch.github.io/editor/player#https://<<account>>.github.io/<<repo>>/projects/example.sb3" width="540px" height="460px"></iframe>


## How to Use in Xcratch

This extension can be used with other extension in [Xcratch](https://xcratch.github.io/). 
1. Open [Xcratch Editor](https://xcratch.github.io/editor)
2. Click 'Add Extension' button
3. Select 'Extension Loader' extension
4. Type the module URL in the input field 
```
https://<<account>>.github.io/<<repo>>/dist/<<extensionID>>.mjs
```
5. Click 'OK' button
6. Now you can use the blocks of this extension


## Development

### Install Dependencies

```sh
npm install
```

### Setup Development Environment

Change ```vmSrcOrg``` to your local ```scratch-vm``` directory in ```./scripts/setup-dev.js``` then run setup-dev script to setup development environment.

```sh
npm run setup-dev
```

### Bundle into a Module

Run build script to bundle this extension into a module file which could be loaded on Xcratch.

```sh
npm run build
```

### Watch and Bundle

Run watch script to watch the changes of source files and bundle automatically.

```sh
npm run watch
```

### Test

Run test script to test this extension.

```sh
npm run test
```


## 🏠 Home Page

Open this page from [https://<<account>>.github.io/<<repo>>/](https://<<account>>.github.io/<<repo>>/)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/<<account>>/<<repo>>/issues). 
