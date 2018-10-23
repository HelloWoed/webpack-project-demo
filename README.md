This repo is a collection of simple demos of Webpack.

These demos are purposely written in a simple and clear style. You will find no difficulty in following them to learn the powerful tool.

## How to use

First, install [Webpack](https://www.npmjs.com/package/webpack) and [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) globally.

```bash
$ npm i -g webpack webpack-cli webpack-dev-server
```

Then, clone the repo.

```bash
$ git clone https://github.com/HelloWoed/webpack-project-demo.git
```

Install the dependencies.

```bash
$ cd webpack-project-demo
$ npm install
```

Now, play with the source files under the repo's demo* directories.

```bash
$ cd demo01
$ npm run build
$ npm run dev
```

If the above command doesn't open your browser automaticly, you have to visit http://127.0.0.1:9000 by yourself.


After having `webpack.config.js`, you can invoke Webpack without any arguments.

```bash
$ webpack
```

Some command-line options you should know.

- `webpack` – building for development
- `webpack -p` – building for production (minification)
- `webpack --watch` – for continuous incremental building
- `webpack -d` – including source maps
- `webpack --colors` – making building output pretty

You could customize `scripts` field in your package.json file as following.

```javascript
// package.json
{
  // ...
  "scripts": {
    "build": "webpack --mode production --watch --progress --display-reasons --color",
    "dev": "webpack-dev-server --inline --progress  --mode development"
  }
  // ...
}
```

