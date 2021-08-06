<template>
  <div class="x-codemirror-wrap">
    <div
      ref="merge"
      v-if="isMerge"
    ></div>
    <textarea
      v-else
      ref="textarea"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
import _CodeMirror from 'codemirror';

const CodeMirror = window.CodeMirror || _CodeMirror

export default {
  name: 'x-code-mirror',
  props: {
    emit: String,
    placeholder: String,
    code: String,
    options: Object,
    isMerge: Boolean,
    events: Array,
  },
  data() {
    return {
      curCode: '',
      codemirrorIns: null,
    };
  },
  watch: {
    code(newVal) {
      this.setCodeChange(newVal);
    },
    isMerge(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.setMerge(newVal);
        })
      } else {
        this.init();
      }
    },
    options: {
      deep: true,
      handler(options) {
        for (const key in options) {
          this.changeOption(key, options[key]);
        }
      },
    }
  },
  mounted() {
    this.init();
    this.bindEvents();
    this.emitTo('ready', this.codemirrorIns);
  },
  methods: {
    init() {
      if (this.isMerge) {
        this.codemirrorIns = this.initMerge();
      } else {
        this.codemirrorIns = this.initCode();
      }
      // 支持双向绑定
      this.codemirrorIns.on('change', (coder) => {
        this.curCode = coder.getValue();
        if (this.$emit) {
          this.emitTo('change', this.curCode);
        }
      });
      this.refresh();
    },
    initCode() {
      const codemirrorIns = CodeMirror.fromTextArea(this.$refs.textarea, this.options);
      codemirrorIns.setValue(this.code || this.curCode);
      return codemirrorIns;
    },
    initMerge() {
      const codemirrorIns = CodeMirror.MergeView(this.$refs.merge, this.options);
      return codemirrorIns.edit;
    },
    changeOption(opt, value) {
      // 修改编辑器的语法配置
      this.codemirrorIns.setOption(opt, value);
    },
    bindEvents() {
      const filterEvent = [];
      const allowEvents = [
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
        'focus',
        'blur',
        'refresh',
        'optionChange',
        'scrollCursorIntoView',
        'update'
      ];
      this.events.filter((event) => {
        if (allowEvents.includes(event) && !filterEvent.includes(event)) {
          filterEvent.push(event);
        }
      });
      filterEvent.forEach(event => {
        // 循环事件，并兼容 run-time 事件命名
        this.codemirrorIns.on(event, (...args) => {
          this.emitTo(event, { ...args });
        })
      })
    },
    setCodeChange(newVal) {
      const curValue = this.codemirrorIns.getValue()
      if (newVal !== curValue) {
        this.codemirrorIns.setValue(newVal);
        const scrollInfo = this.codemirrorIns.getScrollInfo();
        this.codemirrorIns.scrollTo(scrollInfo.left, scrollInfo.top);
      }
    },
    setMerge() {
      const history = this.codemirrorIns.doc.history;
      const cleanGeneration = this.codemirrorIns.doc.cleanGeneration;
      this.options.value = this.codemirrorIns.getValue();
      this.destroy();
      this.init();
      this.codemirrorIns.doc.history = history;
      this.codemirrorIns.doc.cleanGeneration = cleanGeneration;
    },
    refresh() {
      this.$nextTick(() => {
        this.codemirrorIns.refresh();
      })
    },
    emitTo(type, data) {
      this.$emit(this.emit, {
        type,
        data,
      });
    },
    beforeDestroy() {
      this.destroy();
    },
    destroy() {
      const cmDom = this.codemirrorIns?.doc?.cm?.getWrapperElement();
      cmDom && cmDom.remove && cmDom.remove();
    },
  },
}
</script>

<style scoped>
.x-codemirror-wrap{
  width: 100%;
}
</style>
