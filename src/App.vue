<template>
  <div>
    <select @change="handleChangeMode">
      <option :key="index" :value="item.value" v-for="(item, index) in modes">{{ item.label }}</option>
    </select>
    <div class="in-coder-panel">
      <x-code-mirror
        :placeholder="placeholder"
        :options="options"
        :events="events"
        :code="code"
        :is-merge="isMerge"
        emit="handleCodeMirror"
        @handleCodeMirror="handleCodeMirror"
      />
    </div>
  </div>
</template>

<script>
import XCodeMirror from '../packages/XCodeMirror/src';
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/eclipse.css'
import 'codemirror/addon/display/placeholder.js'

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'

// 代码提示
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/sql-hint.js"

// 对比合并
import 'codemirror/addon/merge/merge.js'
import 'codemirror/addon/merge/merge.css'
import DiffMatchPatch from 'diff-match-patch' // google DiffMatchPatch
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

export default {
  name: 'App',
  components: {
    XCodeMirror,
  },
  data () {
    return {
      codeMirrorIns: null,
      placeholder: 'insert here',
      code: '', // 内部真实的内容
      // 默认配置
      options: {
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: 'eclipse',
        // 显示行号
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql',
        hintOptions: {
          completeSingle: false
        },
      },
      isMerge: false,
      mergeOption: {
        value: '<p>hello</p>',
        origLeft: null,
        orig: '<p>hello world</p>',
        connect: 'align',
        mode: 'text/html',
        lineNumbers: true,
        collapseIdentical: false,
        highlightDifferences: true
      },
      events: [
        'changes',
        'scroll',
        'cursorActivity',
        'inputRead'
      ],
      // 支持切换的语法高亮类型，对应 JS 已经提前引入
      // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      modes: [
        {
          value: 'x-sql',
          label: 'SQL'
        },
        {
          value: 'javascript',
          label: 'Javascript'
        },
        {
          value: 'css',
          label: 'CSS'
        },
        {
          value: 'html',
          label: 'XML/HTML'
        },
        {
          value: 'x-java',
          label: 'Java'
        },
        {
          value: 'x-objectivec',
          label: 'Objective-C'
        },
        {
          value: 'x-python',
          label: 'Python'
        },
        {
          value: 'x-rsrc',
          label: 'R'
        },
        {
          value: 'x-sh',
          label: 'Shell'
        },
        {
          value: 'x-swift',
          label: 'Swift'
        },
        {
          value: 'x-vue',
          label: 'Vue'
        },
        {
          value: 'markdown',
          label: 'Markdown'
        }
      ]
    }
  },
  methods: {
    handleCodeMirror(emitData) {
      const { type, data } = emitData;
      switch (type) {
        case 'ready':
          this.codeMirrorIns = data;
          break;
        case 'cursorActivity':
          this.codeMirrorIns.showHint();
          break;
        case 'inputRead':
          this.codeMirrorIns.showHint();
          break;
        default:
          console.log('emitData', emitData);
          break;
      }
    },
    handleChangeMode(event) {
      this.options.mode = `text/${event.target.value}`;
    }
  }
}
</script>

<style>
.in-coder-panel {
  margin-top: 20px;
  flex-grow: 1;
  display: flex;
  position:relative;
}
.in-coder-panel > div {
  width: 100%;
}
textarea {
  width: 100%;
}
.CodeMirror {
  flex-grow: 1;
  z-index: 1;
}
.CodeMirror-code {
  line-height: 19px;
}
</style>
