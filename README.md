<center>
  <h1>
    组件库搭建
  </h1>
</center>



# 一 搭建 pnpm monorepo



#### 1 环境

```
node -v
npm -v
pnpm -v
```

```
v16.19.0
8.19.3
7.27.0
```

### 2 搭建 monorepo 项目

##### 2.1 创建项目

1. 初始化 package.json

   ```
   pnpm init
   ```

   设置 package.json `type` 属性为 `module`

   ```
   {
   	...
   	"type":"module"
   	...
   }
   ```



2. 创建目录

   ```
   mkdir -p cli docs example packages/foo packages/yyg-demo-ui
   ```

   目录结构：

   ```markdown
   www-demo-ui/
   |- cli/
   |- docs/
   |- example/
   |- packages/
   		|- foo/
   		|- www-demo-ui/
   ```

##### 2.2 配置 workspace

pnpm 提供了配置文件来配置 monorepo

1. 在项目根目录创建配置文件 `pnpm-workspace.yaml`

   ```yaml
   packages:
     - packages/*
     - cli
     - docs
     - example
     # exclude packages that are inside test directories
     - '!**/test/**'

   ```

2. 指定 package.json 中 workspace

   ```
   {
   	...
     "workspaces": [
       "packages/*",
       "cli",
       "docs",
       "example"
     ]
   }
   ```

   至此， pnpm+monorepo搭建完成。



# 二 初始化 workspace-root

通用配置文件、公共依赖、ESLint。



## 1 通用配置文件

根目录添加以下配置文件。

1. 添加 .editorconfig 编辑器格式配置文件

   ```
   [*.{js,cjs,ts,jsx,tsx,vue,html,css,scss,md}]
   indent_style = space
   indent_size = 2
   trim_trailing_whitespace = true
   insert_final_newline = true
   ```



2. 添加 `.gitignore` git 忽略文件

   ```
   logs
   *.log*
   node_modules
   dist
   lib
   dist-ssr
   *.local

   .vscode/*
   !.vscode/extensions.json
   .idea
   .DS_Store
   *.suo
   *.ntvs*
   *.njsproj
   *.sln
   *.sw?
   ```

   在有些文章中还会创建一个 *.npmrc* 文件，配置 *shamefully-hoist* 为 *true*，该操作的目的是进行依赖提升，但 *pnpm* 不建议这么做，所以咱不配置它



## 2 安装公共依赖

在根目录下按照的依赖，在子模块里面都可以使用，所以为了避免在不同的模块中安装相同的依赖，相同的依赖咱们都提取到根项目中。

```
pnpm install vue -w
pnpm install @types/node sass typescript vite vue-tsc @vitejs/plugin-vue @vitejs/plugin-vue-jsx -D -w
```

由于咱们项目配置了 *monorepo*，在根目录（*workspace-root*）下安装依赖需要指定 *-w*，否则安装失败。



## 3 ESLint 配置

1. 安装依赖

   ```
   pnpm install eslint -D -w
   ```

2. 初始化 `ESLint` 配置

   ```
   npx eslint --init
   ```

   执行上述命令后， 控制台中会有如下步骤：

   ```
   1）需要安装 @eslint/create-config，问是否继续： 当然需要继续，直接回车；
   2）使用 ESLint 来干嘛：我选最后一个 To check syntax, find problems, and enforce code style（检查语法、寻找问题、强制代码风格）
   3）使用哪种模块化的方式：肯定选 JavaScript modules (import/export) （几乎我参与的 vue 项目都是 ESModule）
   4）项目使用什么框架：Vue.js
   5）项目是否使用 TypeScript：Yes
   6）项目运行在什么环境：Browser
   7）如何定义项目的代码风格：Use a popular style guide 使用流行的风格
   8）在流行的风格中选择其中一种：Standard
   9）ESLint 配置文件的格式：JavaScript
   10）根据上面选择的，提示需要安装一大堆依赖，是否安装？Yes
   11）选择使用什么包管理工具安装：pnpm
   ```

   选择 *pnpm* 回车后，项目根目录下会生成 *.eslintrc.cjs* 文件，但控制台会报 *ERR_PNPM_ADDING_TO_ROOT* 的错误，如下图：

   这是因为自动安装依赖没有携带 *-w*，所以需要将红框中的依赖复制出来，重新安装：

   ```
   pnpm install eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-standard@latest eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 @typescript-eslint/parser@latest -D -w
   ```

3. 安装 *vite-plugin-eslint* 插件:

   ```
   pnpm install vite-plugin-eslint -D -w
   ```

   由于不同的 package，vite 的配置不同，所以该插件在后面开发各个模块时才去配置。

4. 修改 ESLint 配置文件 *.eslintrc.cjs*

   ```
   module.exports = {
     root: true,
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       'plugin:vue/vue3-essential',
       'standard'
     ],
     parserOptions: {
       ecmaVersion: 'latest',
       parser: '@typescript-eslint/parser',
       sourceType: 'module'
     },
     plugins: [
       'vue',
       '@typescript-eslint'
     ],
     rules: {
       'vue/multi-word-component-names': 'off'
     }
   }
   ```

5. 添加 ESLint 忽略文件，忽略打包生成的目录 *dist* 和 *lib*。在项目根目录下创建 *.eslintignore*，内容如下：

   ```
   lib/
   dist/
   ```



6. 在 IDE 中配置 ESLint。





# 三 搭建组件库开发环境

依次搭建组件库、example、文档、cli



## 1. packages 目录

##### foo 目录

foo 目录代表一个示例组件，后面咱们会使用该组件来测试组件库在 example 和组件库文档中是否能正常运行。后续要开发的所有组件（如高级卡片组件、JSON Schema 表单组件等）都与 *foo* 组件的文件目录结构保持一致。

##### www-demo-ui 目录

该目录与整个组件库工程的名称相同，所以你本地的这个目录不一定叫这个名称。该目录是组件库的入口模块，该模块会安装组件库的所有组件（即 *packages* 目录下的其他包）作为依赖，并引入全部组件，统一暴露。此外还是打包组件库的入口。可以将它理解为组件库的聚合模块。



## 2. 实现 foo 示例组件



##### 2-1初始化 package.json

 *foo* 目录存放示例组件，它也是一个包，所以需要在命令行中进入 *packages/foo* 目录，使用 *pnpm* 初始化：

```
pnpm init
```

修改生成的 *package.json* 中的 *name* 属性值为 *foo*，在 *monorepo* 中，子包的 *name* 属性通常会命名为 *@组织名/foo*，由于咱是个组件库，可以将其命名为 *@组件库名/foo*，即 *@yyg-demo-ui/foo*。我修改了 *package.json* 的下面几个属性：

```
{
  "name": "@www-demo-ui/foo",
  "version": "1.0.0",
  "description": "示例组件",
  "author": "www",
  "main": "index.ts",
...
}
```

##### 2-2 初始化 foo 目录结构

命令行进入 foo 目录

1. 新建 index.ts ，组件的入口文件

   ```
   touch index.ts
   ```



2. 新建 src 目录，目录存放组件的实现源码； 在 foo/src/ 中创建 `index.tsx` 和 `types.ts` ，前者是组件的具体实现， 后者是组件的 props 定义及类型

   ```
   mkdir src
   touch src/index.tsx src/types.ts
   ```

如此一来， 示例组件 foo 的目录结构便创建完成， 目录结构：

```
packages/
|- foo/
		|- index.ts
		|- src/
				|- index.ts
				|- types.ts
|- yyg-demo-ui/

```

##### 2-3 定义 foo 组件的props

在 foo/src/types.ts 中定义 foo 组件的 props，并提取其类型：

```typescript
import { ExtractPropTypes } from "vue";

export const fooProps = {
    msg:{
        type:String,
        required:false,
        default:''
    }
}

export type FooProps = ExtractPropTypes<typeof fooProps>
```

面的代码定义了一个非必填的属性 *msg*，并使用 *vue* 中提供的 *ExtractPropTypes* 提取 *props* 的类型

##### 2-4 实现 foo 组件

在 *foo/src/index.tsx* 中实现 *foo* 组件：

```
import { defineComponent } from 'vue'
import { fooProps } from './types'

const NAME = 'yyg-foo'

export default defineComponent({
  name: NAME,
  props: fooProps,
  setup (props, context) {
    console.log(props, context)
    const onBtnClick = () => {
      console.log('点击按钮测试', props.msg)
    }
    return () => (
      <div class={NAME}>
        <h1>yyg-demo-ui Foo</h1>
        <p class={NAME + '__description'}>msg is: { props.msg }</p>
        <el-button type='primary' onClick={onBtnClick}>点击我</el-button>
      </div>
    )
  }
})

```

该组件仅简单展示文本和 *Element Plus* 的按钮，用于测试。

### 2.5 定义 foo 组件入口文件

*foo/index.ts* ：

```typescript
import { App } from 'vue'
import Foo from './src'

Foo.install = (app: App) => {
  app.component(Foo.name, Foo)
}

export default Foo
```

该文件将组件导入并导出，并且为该组件提供 *install* 方法。这样便完成了  *foo* 组件的代码编写。

## 3 实现 yyg-demo-ui

完成 *foo* 示例组件后，就需要开始开发组件库入口 yyg-demo-ui 了。第一步仍是初始化 package.json

### 3.1 初始化 package.json

在命令行中进入 *packages/yyg-demo-ui* 目录：

```shell
pnpm init
```

同上修改生成的 *package.json* 文件的 *name* 属性：

```json
{
  "name": "@yyg-demo-ui/yyg-demo-ui",
  "version": "1.0.0",
  "description": "组件库入口",
  "author": "程序员优雅哥 youyacoder",
  "main": "index.ts",
  ...
}
```

### 3.2 安装依赖

*foo* 和 *yyg-demo-ui* 都是独立的包，*yyg-demo-ui* 需要安装 *foo* 到依赖中，才能引入 *foo* 组件。在 2.1 中将 *foo* 的 *package.json* name 属性修改为 *@yyg-demo-ui/foo*，安装时要使用该名称。从控制台中进入  *packages/yyg-demo-ui* ，执行命令：

```shell
shell

复制代码pnpm install @yyg-demo-ui/foo
```

此时查看 *packages/yyg-demo-ui/package.json* 的 *dependencies*，会看到使用 workspace协议依赖了 *foo*

```json
"dependencies": {
  "@yyg-demo-ui/foo": "workspace:^1.0.0"
}
```

同时在 *node_modules* 中也可以看到多了一个 *@yyg-demo-ui/foo*：

![image-20221105001615752](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e69c733fad7c4593ae8e18d1e12fa04d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 3.3 定义入口文件

在 *packages/yyg-demo-ui* 下创建 *index.ts*，导入组件并导出：

```typescript
import { App } from 'vue'
import Foo from '@yyg-demo-ui/foo'
// import component end
import '../scss/index.scss'

const components = [
  Foo
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
```



# 四 组件库 css 架构



## 1 常见的 CSS 架构模式

常见的 CSS 架构模式有很多：*OOCSS*、*ACSS*、*BEM*、*SMACSS*、*ITCSS* 等，其中 *SMACSS* 和 *ITCSS* 很相似。我在企业级项目中最常使用的是简化版的 *ITCSS* + *BEM* + *ACSS*，所以本文首先介绍这三种模式，其他模式大家自己上网查看。

### 1.1 ACSS

ACSS 模式几乎是一个样式属性就对应了一个样式类。这种方式非常灵活，复用性很强、维护成本低，但破坏了 CSS 命名语义化。常见的名称如：d-flex、m-10、w-20 等。

### 1.2 BEM

BEM 模式是一种命名方法论，其命名层级为：*块 **B**lock*、*元素 **E**lement*、*修饰符 **M**odifier*，这也是 “BEM” 这个名字的由来。元素 Element 使用两个短下划线（__），修饰符 Modifier 使用两个短中划线（--），如下面的 HTML 片段和对应的类名：

```xml
<div class="demo-block">
  <a class="demo-block__element1">Link</a>
  <a class="demo-block__element1 demo-block__element1--modifier">Link</a>
</div>

<style>
  .demo-block {} // 块
    .demo-block__element1 {} // 元素
    .demo-block__element1--modifier1 {} // 修饰符
</style>
```

使用 BEM 可以规范命令，页面结构也比较清晰。

### 1.3 ITCSS

ITCSS 是一种样式的分层结构，一共有七层，七个层次从上到下依次为：

- Settings 层：通常是一些样式变量，如定义通用的颜色值、字体大小的数值等；
- Tools 层：通用工具函数，包括 mixins、function 等；
- Generic 层：通用基础样式，一般是对浏览器默认样式进行重置，如 normalize.css、resets 等库；
- Base 层：对某些全局使用的元素进行通用的定制化样式，如页面的设置、ul 标签的设置等；
- Objects 层：所有使用 OOCSS 的地方，即某些结构和样式相分离的专用类；
- Components 层：具体的组件，其实可以对应到组件库中的每个组件；
- Trumps 层：重写某些样式，如 width 重新设置为 100px，只会影响某一小块的 DOM 元素，权重最高，类似 ACSS，但通常会加上 *!important*。

## 2 组件库的 CSS 架构

ITCSS 分层非常细致，咱们组件库的样式在其基础上进行了简化，省略了 Base 层 或 Objects 层。而对于 Trumps 层，咱使用 ACSS 来替代，对于 Components 层，里面的每个组件内部又使用 BEM。所以咱们组件库的样式架构为：简化版的 ITCSS + BEM + ACSS。

### 2.1 CSS 结构概览

组件库的样式使用预处理器 SCSS，从结构整体来看，分为如下层级：

- **base** 层：整个 CSS 结构的最基础的层级，对应了 *ITCSS* 的 Settings、Generic 和 Base。即包括变量定义、通用基础样式和定制基础样式。
- **tools** 层：与 *ITCSS* 的 Tools 一样，提供通用工具函数。
- **acss** 层：类似 *ITCSS* 的 Trumps，定义一些原子样式类，如 flex、margin、padding 相关的样式基础类。
- **components** 层：与 ITCSS 的 Components 一样，实现各个组件的样式，其中每个组件的样式又使用 *BEM* 方式来组织命名。

### 2.2 base 层的实现

前面说过，base 层包括样式变量定义、通用基础样式、定制基础样式。

首先在 *packages/scss* 目录下创建 *base* 目录，存放 *base* 层的 scss 文件。

1. ***settings***

*settings* 是一些变量的定义，在 *packages/scss/base/* 目录中创建 *_var.module.scss* 文件，该文件定义样式变量。

```css
$primary-color: #488019;
$common-padding: 20px;

:export {
  primaryColor: $primary-color;
}
```

1. ***Generic***

*Generic* 通常是对浏览器样式的重置，统一 HTML 标签在不同浏览器中的展示，屏蔽浏览器间的差异。在这个部分可以使用开源库*normalize.css*、*reset.css* 等。这一层可以在组件库中省略，在各个具体的应用中引入对应css。不过程序员优雅哥还是将浏览器样式重置引入到组件库中，这样应用开发过程中省点事。咱使用开源的 *normalize.css* 作为 *Generic*。*normalize.css* 的代码可以在 GitHub 上搜索获取。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd4c0fb775cb43a2b368125b35425aa9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

继续在 *packages/scss/base/* 目录中创建 *_normalize.scss* 文件，将 *normalize.css* 的内容直接复制进去就可以了。

1. ***Base***

Base 主要是存放部分重置样式的自定义，如 html、body、section 等，这部分咱们暂时没有自定义的内容，就无需编写了。

1. ***入口文件***

最后需要将 **base** 层所有 scss 以统一的入口引入。在 *packages/scss/base/* 目录下创建 *index.scss*，该文件导入上面创建的两个 scss 文件：

```less
@use "var.module";
@use "normalize";
```

### 2.3 tools 层的实现

tools 层用于存放工具函数和 mixins，github 上有个优秀的开源项目 *sassMagic*，咱们就使用它作为 tools 层。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2119f0fb2e524ab08052dc588855f9d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

将该项目 src 中的代码拷贝到 *packages/scss/tools/* 目录下即可（如果 _sassMagic.scss 文件中有报错，将里面对不存在文件的引入删除即可）。我在这里将 _sassMagic.scss 文件重命名为 *index.scss*，这样后面在使用时只需要使用 *@use "../tools"* 即可。

### 2.4 acss 层的实现

acss 层用于定义一些原子样式，这里咱们定义 flex 布局和 margin/padding 的原子类。

在 *packages/scss/* 中创建目录 *acss*，并在该目录下创建两个文件： *_flex.scss* 和 *_mp.scss*。

*packages/scss/acss/_flex.scss*：

```css
.f {
  display: flex;
}
.f-c {
  display: flex;
  flex-direction: column;
}
.f-r {
  display: flex;
  flex-direction: row;
}
.f-1 {
  flex: 1 1 0;
}
.oy-h {
  overflow-y: hidden;
}
.oy-a {
  overflow-y: auto !important;
}
.ox-h {
  overflow-x: hidden;
}
.o-h {
  overflow: hidden;
}
```

*packages/scss/acss/_mp.scss*：

```css
$direction: (l left, r right, t top, b bottom);

@for $i from 1 through 30 {
  @each $type in m, p, v, h, a {
    // margin
    @if ($type == m) {
      @each $d in $direction {
        .m#{nth($d, 1)}-#{$i} {
          margin-#{nth($d, 2)}: #{$i}px;
        }
      }
    }
    // padding
    @else if ($type == p) {
      @each $d in $direction {
        .p#{nth($d, 1)}-#{$i} {
          padding-#{nth($d, 2)}: #{$i}px;
        }
      }
    }
    // margin/padding left/right
    @else if ($type == h) {
      .ph-#{$i} {
        padding-left: #{$i}px;
        padding-right: #{$i}px;
      }
      .mh-#{$i} {
        margin-left: #{$i}px;
        margin-right: #{$i}px;
      }
    }
    // margin/padding top/bottom
    @else if ($type == v) {
      .mv-#{$i} {
        margin-top: #{$i}px;
        margin-bottom: #{$i}px;
      }
      .pv-#{$i} {
        padding-top: #{$i}px;
        padding-bottom: #{$i}px;
      }
    }

    // all
    @else {
      .pa-#{$i} {
        padding: #{$i}px;
      }
    }
  }
}
```

### 2.5 components 层的实现

components 层对应组件库中每个具体组件的样式。在 *packages/scss* 中创建目录 *components*。首先为上一篇文章中创建的 *foo* 组件创建样式：在 *packages/scss/components/* 目录下创建 *_foo.module.scss* 文件：

```less
@import "../tools";
@import "../acss/mp";
@import "../base/var.module";

@include b('yyg-foo') {
  color: $primary-color;

  @include e('description') {
    color: #333333;
    @extend .mv-20;
  }
}
```

继续在 *packages/scss/components/* 目录下创建 *index.scss* 文件，该文件中引入 *components* 目录下所有组件的 scss 文件：

```less
@use "foo.module";
```

如果新增了其他组件，需要在 *components* 目录下创建该组件的样式文件，并在 *components/index.scss* 中引入该 scss 文件。

### 2.6 样式入口

在 *packages/scss* 下创建 *index.scss*，在里面导入所有的 scss，使用组件库时只需要引入该文件即可。

```scss
@import "./acss/flex";
@import "./base";
@import "./components";
```

## 3 在组件库中引入样式

最后只需要在组件库中引入 *scss/index.scss* 即可。在组件库的入口模块 *packages/yyg-demo-ui/index.ts* 中引入 *index.scss*：

```arduino
import '../scss/index.scss'
```

（在上文中的代码已经包括这一句引入了）

到此便完成了组件库样式架构的搭建，整个样式的目录结构如下：

![微信图片_20221114144308.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f362d605ab594cc798c931646379196f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)



# 五 组件库通用工具包



## 1 创建工具包

##### 1-1 初始化工具包

到目前为止，*packages* 目录下有三个包：*foo* 示例组件、*scss* 样式、*yyg-demo-ui* 组件库聚合，现创建第四个：*utils*。



```
{
     "compilerOptions": {
       "target": "es2015",
       "lib": [
         "es2015"
       ],
       "module": "commonjs",
       "rootDir": "./",
       "allowJs": true,
       "isolatedModules": false,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
     }
   }

```

