import XCodeMirror from './src/index.vue';

const install = (Vue, config) => {
  if (config) {
    if (config.options) {
      XCodeMirror.props.globalOptions.default = () => config.options
    }
    if (config.events) {
      XCodeMirror.props.globalEvents.default = () => config.events
    }
  }
  Vue.component(XCodeMirror.name, XCodeMirror)
}

const VueCodemirror = { XCodeMirror, install }

// 导出组件
export default VueCodemirror;
export { XCodeMirror, install }
