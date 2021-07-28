// 导入组件
import XCodeMirrorInstall from './XCodeMirror';
import XCodeMirror from './XCodeMirror/src';

// 组件列表
const components = [
  XCodeMirrorInstall,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const XCodeMirrorIns = { install, ...components }

export default XCodeMirrorIns;
export { XCodeMirror };
