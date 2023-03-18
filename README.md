# react18 + vite + ts + router6 + redux + antd5 后台管理系统

## 下载

```javascript
npm install
```

## 启动项目

```javascript
npm run dev
```

## 启动 模拟数据

```javascript
cd server

npm run start
```

安装 eslint-config-airbnb-typescript

上面我们使用了 eslint 和 typescript 推荐的代码风格。

extends: [ // 共享推荐的配置风格 'eslint:recommended', 'plugin:@typescript-eslint/recommended', ], 但是受经常使用 antd 库的影响，习惯了 airbnb 代码风格，而且比较流行。因此我们安装下 eslint-config-airbnb-typescript（不喜欢可以忽略这一步）。

安装前我们需要先了解

eslint-config-airbnb 是 Airbnb JavaScript 风格的 eslint 共享配置库，检测规则包括 ES6+ 和 React，它依赖于 eslint-plugin-import、eslint-plugin-react、eslint-plugin-react-hooks、eslint-plugin-jsx-a11y 包。 eslint-config-airbnb-base，如果我们不需要 React，可以安装这个包代替 eslint-config-airbnb eslint-config-airbnb-typescript，支持 typescript，依赖于 eslint-config-airbnb 由于我们现在的项目是 React+Ts，所以要安装 eslint-config-airbnb 和 eslint-config-airbnb-typescript 这两个包。

我们先执行 npm info "eslint-config-airbnb@latest" peerDependencies，了解 eslint-config-airbnb 的依赖包版本

npm info "eslint-config-airbnb@latest" peerDependencies

{ eslint: '^7.32.0 || ^8.2.0', 'eslint-plugin-import': '^2.25.3', 'eslint-plugin-jsx-a11y': '^6.5.1', 'eslint-plugin-react': '^7.28.0', 'eslint-plugin-react-hooks': '^4.3.0' } 知道依赖包版本后，我们安装对应的版本

yarn add --dev eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react@^7.28.0 eslint-plugin-react-hooks@^4.3.0 接着安装 eslint-config-airbnb 和 eslint-config-airbnb-typescript

yarn add --dev eslint-config-airbnb eslint-config-airbnb-typescript 按照 eslint-config-airbnb-typescript 配置步骤, 现在重新调整.eslintrc.js 文件

module.exports = { root: true, env: { browser: true, node: true, es6: true, }, extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended'], parser: '@typescript-eslint/parser', // 由于 eslint 默认使用 espree 来作为 js 的解释器，我们项目使用的是 ts，所以换成了这个 plugins: ['@typescript-eslint'], parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true, }, project: './tsconfig.json', }, rule: { 'react/react-in-jsx-scope': 'off', // React17 后不需要在 jsx 中主动引入 react }, }; 至此，我们可以在 package.json 添加命令

{ "script": { "lint:js": "eslint --ext .js,.jsx,.ts,.tsx ./src" } } 执行 yarn lint:js 检测我们的代码质量

安装 prettier

执行 yarn add --dev prettier

项目目录添加.prettierrc 文件，按照 airbnb 我们添加常用的格式风格

{ "singleQuote": true, // 单引号 "trailingComma": "all", // 在多行逗号分隔的语法结构中，最后一行也添加逗号 "printWidth": 100, // 代码宽度最大为 100 "proseWrap": "never" // 禁止 markdown 文本样式进行折行 } 项目目录添加.prettierignore，忽略一些不需要 prettierg 格式化的文件

**/\*.png **/\*.svg package.json dist .DS_Store node_modules 至此，我们可以在 package.json 添加命令

{ "script": { "lint:prettier": "prettier -c --write \"src/\*_/_\"" } } 执行 yarn lint:prettier 格式化我们项目的代码

eslint-config-prettier 和 eslint-plugin-prettier

我们先了解 eslint 和 prettier 的分工，prettier 用于代码格式化，eslint 配置代码风格、质量的校验（eslint 也能负责代码格式，只是 prettier 更专业），两者具体区别可以参考文章 。

避免 eslint 和 prettier 冲突，我们需要再安装两个包 eslint-config-prettier、eslint-plugin-prettier。

eslint-config-prettier 的作用是关闭 eslint 中所有不必要的或可能与 prettier 冲突的规则，让 eslint 检测代码时不会对这些规则报错或告警。比如 eslint 规定是双引号，而我们用 prettier 格式化代码时是用单引号，会存在冲突。我们在 eslint-config-prettier 代码可以看到，例如缩进、引号等格式规则都被关闭了。关闭后，我们可以完全自定义 prettier 来格式化我们的代码，而不受 eslint 影响。

eslint-plugin-prettier 是一个 ESLint 插件。上面我们说关闭了一些 eslint 的代码格式规则。假设我们约定 prettier 规则使用双引号，然而敲代码写成单引号，我还是希望能够按 prettier 的规则给我一些代码不规范的报错或警告提示。那么 eslint-config-prettier 是关闭了 eslint 中与 prettier 冲突的规则，eslint-plugin-prettier 就是开启了以 prettier 为准的规则，并将报告错误给 eslint。

说完了上面的解释，我们开始安装执行 yarn add --dev eslint-config-prettier eslint-plugin-prettier

安装后我们只需要在.eslintrc.js 文件添加一行即可

{ extends: [ // ... 'plugin:prettier/recommended' ] } plugin:prettier/recommende 的作用会帮我们扩展成下面的代码

{ extends: ['prettier'], plugins: ['prettier'], rules: { 'prettier/prettier': 'error', 'arrow-body-style': 'off', 'prefer-arrow-callback': 'off', }, } 我们也可以自行改变下一些规则，比如

{ rules: { 'prettier/prettier': [ 'error', { singleAttributePerLine: false, // 不强制要求一个属性占一行 } ] } } 至此，我们项目 eslint 和 prettier 的配置就完成了，我们再来看看完整的.eslintrc.js 文件

module.exports = { root: true, // 指定了 root 为 true，eslint 只检查当前项目目录 env: { // 提供预设的全局变量，避免 eslint 检查报错，例如 window browser: true, node: true, es6: true, }, extends: [ // 共享推荐的配置风格 'airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', ], parser: '@typescript-eslint/parser', // 由于 eslint 默认使用 espree 来作为 js 的解释器，我们项目使用的是 ts，所以换成了这个 plugins: ['@typescript-eslint'], parserOptions: { ecmaVersion: 'latest', // 指定 ECMAScript 语法为最新 sourceType: 'module', // 指定代码为 ECMAScript 模块 ecmaFeatures: { jsx: true, // 启用 jsx }, project: './tsconfig.json', }, rules: { 'react/react-in-jsx-scope': 'off', // React17 后不需要在 jsx 中主动引入 react 'prettier/prettier': [ 'error', { singleAttributePerLine: false, // 不强制要求一个属性占一行 }, ], }, }; 安装 stylelint

检测 css 样式代码质量，其实很多项目都是不检测的，如果不做这步可以忽略。

按照官网 docs，我们开始安装

yarn add --dev stylelint stylelint-config-standard 项目目录中添加.stylelintrc.js 文件

module.exports = { extends: ['stylelint-config-standard'], }; 我们使用了官方推荐的 stylelint-config-standard 配置就好

至此，我们可以在 package.json 添加命令

{ "script": { "lint:style": "stylelint \"\*_/_.css\"" } } 执行 yarn lint:style 检测我们的 css 代码质量

同样的，我们统一用 prettier 来格式化 css 代码。 需要安装 stylelint 插件来避免与 prettier 冲突。

stylelint-config-prettier，和 eslint-config-prettier 类似，作用是关闭 stylelint 所有不必要的或可能与 prettier 冲突的规则。但是在 Stylelint v15 版本之后，Stylelint 默认关闭了所有与 prettier 相冲突的风格规则，所以不需要安装 stylelint-config-prettier 了。 stylelint-prettier，和 eslint-plugin-prettier 类似，开启了以 prettier 为准的规则，并将报告错误给 stylelint。上面了解后，我们只需要安装 stylelint-prettier。

安装 stylelint-prettier

执行安装 yarn add --dev stylelint-prettier

修改.stylelintrc.js 文件

module.exports = { extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'], }; 搞定。

代码质量检测小结回顾

至此我们的 package.json 文件添加了三条命令

{ "scripts": { "lint:js": "eslint --ext .js,.jsx,.ts,.tsx ./src", "lint:style": "stylelint \"**/\*.css\"", "lint:prettier": "prettier -c --write \"src/**/\*\"" } } lint:js，检查 js 和 ts 代码质量 lint:style，检查 css 代码质量 lint:prettier，格式化所有代码，包括 js、ts、css、json、md 等。注意 lint:prettier 只管修复代码格式问题。

如果我们要自动修复代码质量问题，例如 js 代码中你使用了 var 声明变量，需要自动修复成 let 或 const。那么我们可以再添加多两条命令。

{ "scripts": { "lint:js:fix": "eslint --ext .js,.jsx,.ts,.tsx ./src --fix", "lint:style:fix": "stylelint \"\*_/_.css\" --fix" } } 那么执行了上面的命令，就是把代码所有质量和格式的问题都会尽可能帮你修复好。按个人喜好来讲，我是不推荐这样做，就是只使用 lint:prettier 就好，对于代码质量问题，应该自身平时要养成良好的代码习惯，尽量减少这类问题。如果有代码质量问题，自己根据错误报告去逐一手动修复即可。

安装 lint-staged

由于检查代码命令是对整个项目代码有效，有时候我们只想对自己改动的代码进行检查，而忽略项目其他代码。我们可以使用 lint-staged，它可以让我们执行检查命令只对 git 缓存区的文件有效。

安装执行 yarn add --dev lint-staged

然后再 package.json 添加代码

{ "scripts": { "lint-staged": "lint-staged" }, "lint-staged": { "**/\*.css": "stylelint \"**/_.css\"", "\*\*/_.{js,jsx,ts,tsx}": "eslint --ext .js,.jsx,.ts,.tsx", "\*_/_.{js,jsx,tsx,ts,css,md,json}": "prettier --ignore-unknown --write" } } 上面的文件匹配规则

{ "lint-staged": { "**/\*.css": "stylelint", // 匹配 css 文件用 stylelint 检查 "**/_.{js,jsx,ts,tsx}": "eslint --ext .js,.jsx,.ts,.tsx", // 匹配 js,jsx,ts,tsx 文件用 eslint 检查 "\*\*/_.{js,jsx,tsx,ts,css,md,json}": "prettier --ignore-unknown --write" // 匹配 js,jsx,tsx,ts,css,md,json 文件统一用 prettier 格式化代码 }, } 这 3 个匹配规则的执行是存在竞争关系，但是不影响，只要 stylelint 或 eslint 谁先检查出错误报告，都会终止匹配执行。我们必须得一一改正才能养成良好习惯，减少类似问题出现。

我们改动代码并 git add .后，可以执行 yarn lint-staged。一旦 prettier 格式化代码成功，并且 stylelint 和 eslint 无错误输出，那么 lint-staged 即执行成功，代表我们的代码通过检测。

安装 husky

由于前面都是需要手动操作的，husky 可以让我们在 git 提交的时候自动执行命令。

我们安装执行 yarn add --dev husky，安装官网步骤

我们在 package.json 添加命令

{ "scripts": { "prepare": "husky install" } } 然后执行这条命令 yarn prepare，husky 执行初始化，可以发现我们的项目目录多了.husky 文件夹，代表初始化成功。

接着我们执行 npx husky add .husky/pre-commit "npm run lint-staged"，大功告成。之后我们 git 提交前会执行 npm run lint-staged 命令，即检查 git 缓存区的代码问题，若存在问题，lint-staged 会终止并报错，git 提交自然不会成功。
