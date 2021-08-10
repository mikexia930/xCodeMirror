# x-codemirror-vue
> CodeMirror 的 VUE 实现
> 
> 详细可以查看源码中的示例代码

[Demo](https://mikexia930.github.io/xCodeMirror/)

### 版本 version
***
* v1.1.2

### 基于 based
***
* VUE 2
* CodeMirror 5.6 ([CodeMirror手册](https://codemirror.net/doc/manual.html))

## 安装
***
**直接用 script 引入 use cdn**

[[下载codemirror.js](https://codemirror.net/codemirror.zip)]
```
<link rel="stylesheet" href="codemirror/lib/codemirror.css">
<script type="text/javascript" src="codemirror.js"></script>
<script type="text/javascript" src="vue.min.js"></script>
<script type="text/javascript" src="lib/xcodemirror.umd.js"></script>
<script type="text/javascript" src="codemirror/mode/..."></script>
```
**NPM**
```
npm install codemirror
npm install x-codemirror-vue
```
如果使用 merge 模式，需要
```
npm install diff-match-patch
```

## 使用 how to use
***
**全局引用**

在main.js中引入 import in main.js

```
import xCodeMirror from 'x-codemirror-vue';
vue.use(xCodeMirror);
```
**或者 在组件中引用**
```
import { XCodeMirror } from 'x-codemirror-vue';
```

**组件中使用**

[[支持的语言模型 support languages](https://codemirror.net/doc/manual.html#addons)]

载入主题样式和对应的语言模型 import theme and mode which you want use first
```
import 'codemirror/lib/codemirror.css' // 主样式
import 'codemirror/theme/[主题].css' // 主题样式，对应 optins 里的 theme
import 'codemirror/mode/[语言].js' // 对应 optins 里的 mode
```
***如果是合并对比模式 if merge type***
```
import 'codemirror/addon/merge/merge.js'
import 'codemirror/addon/merge/merge.css'
import DiffMatchPatch from 'diff-match-patch' // google DiffMatchPatch，用于代码对比

window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0
```
组件 component
```
<x-code-mirror
  :placeholder="" // 提示文描 String 类型，需提取载入 import 'codemirror/addon/display/placeholder.js'
  :options="options" // 初始配置，具体配置如下 Object
  :events="events" // 需要监听的事件 Array 类型
  :code="code" // 初始代码 String 类型
  :is-merge="isMerge" 是否为代码对比合并，合并的 options 见下方的 mergeOptions
  emit="handleCodeMirror" // 接收监听的 emit 方法名
  @handleCodeMirror="handleCodeMirror"
/>
```

**options**

* [[更多配置选项 more options](https://codemirror.net/doc/manual.html)]

* [[更多主题 more themes](https://codemirror.net/demo/theme.html)]

* [[支持的语言 more languages](https://codemirror.net/mode/index.html)]

```
options: {
    mode: 'text/javascript', // 当前编辑器对应的语言
    theme: 'eclipse', // 主题必须提取载入 例如：import 'codemirror/theme/eclipse.css',
    tabSize: 2,
    lineNumbers: true,
    line: true,
}
```
TIPS：options被动态监听，选项的变化，会触发组件的更新，可以动态更改mode来切换不同语言。

**events**

组件支持的监听的事件，[[事件说明 events manual](https://codemirror.net/doc/manual.html#events)]

可把需要被监听的事件传入组件，也可不传，不传时传空数组[]。

```
[
    'focus',
    'blur',
    'update'
    'scroll',
    'changes',
    'beforeChange',
    'cursorActivity',
    'keyHandled',
    'inputRead',
    'electricInput',
    'beforeSelectionChange',
    'viewportChange',
    'swapDoc',
    'gutterClick',
    'gutterContextMenu',
    'refresh',
    'optionChange',
    'scrollCursorIntoView',
]
```

**handleCodeMirror（对应emit的方法名，可自定义）**

组件里事件返回

```
handleCodeMirror(emitData) {
  const { type, data } = emitData;
  switch (type) {
    case 'ready': // CodeMirror初始完成，返回的CodeMirror实例对象
      this.codeMirrorIns = data;
      break;
    case 'change':
      // data 为当前的 textarea 内容
      break;
    case  ...events: // 事件列表中的事件
      // 支持监听事件的返回
      console.log(data);
      break;
  }
}
```

**对比的 options**
[[对比demo](https://codemirror.net/demo/merge.html)]

```
option: {
    value: '<p>hello</p>', // 对比的代码
    origLeft: null,
    orig: '<p>hello world</p>', //被对比的代码
    connect: 'align',
    mode: 'text/html',
    lineNumbers: true,
    collapseIdentical: false,
    highlightDifferences: true
},
```

**代码提示**
[[hint配置](https://codemirror.net/doc/manual.html#config)]
```
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/[当前mode]-hint.js"
```
options里配置
```
options: {
    hintOptions: {
      completeSingle: false
    },
}
```
TIPS: 这个completeSingle的作用是当只敲击了一个单个的字母时，在不打开提示框的情况下，是否认为这个字母是提示语的一部分。默认为true。
如果是true，那么如果我们只输入了S，输入结束的时候会变成Select。如果为False，那么就不会这样，而是正常的和其他代码编辑器一样单个处理。
所以我们将其设置为 false。

**语言模型载入的方式 language mode types**

Codemirror language mode have string | object types.

```
// name
mode: {
  name: 'javascript',
  json: true
}

// MIME types
mode: 'text/javascript'

// ext
mode: {
  ext: 'js'
}

// mime
mode: {
  mime: 'text/javascript'
}

// filename
mode: {
  filename: 'index.js'
}
```
