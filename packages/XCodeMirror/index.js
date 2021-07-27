import XCodeMirror from './src/index.vue';

// 为组件提供 install 安装方法，供按需引入
XCodeMirror.install = function (Vue) {
  Vue.component(XCodeMirror.name, XCodeMirror);
};

// 导出组件
export default XCodeMirror;
