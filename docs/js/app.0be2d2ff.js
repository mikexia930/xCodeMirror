(function(e){function t(t){for(var n,a,s=t[0],c=t[1],l=t[2],d=0,h=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/xCodeMirror/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("select",{on:{change:e.handleChangeMode}},e._l(e.modes,(function(t,n){return r("option",{key:n,domProps:{value:t.value}},[e._v(e._s(t.label))])})),0),r("div",{staticClass:"in-coder-panel"},[r("x-code-mirror",{attrs:{placeholder:e.placeholder,options:e.options,events:e.events,code:e.code,"is-merge":e.isMerge,emit:"handleCodeMirror"},on:{handleCodeMirror:e.handleCodeMirror}})],1)])},i=[],a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.isMerge?r("div",{ref:"merge"}):r("textarea",{ref:"textarea",attrs:{placeholder:e.placeholder}})])},s=[],c=(r("4de4"),r("caad"),r("99af"),r("56b3")),l=r.n(c),u=window.CodeMirror||l.a,d={name:"x-code-mirror",props:{emit:String,placeholder:String,code:String,options:Object,isMerge:Boolean,events:Array},data:function(){return{curCode:"",codemirrorIns:null}},watch:{code:function(e){this.setCodeChange(e)},isMerge:function(e){var t=this;e?this.$nextTick((function(){t.setMerge(e)})):this.init()},options:{deep:!0,handler:function(e){for(var t in e)this.changeOption(t,e[t])}}},mounted:function(){this.init(),this.bindEvents(),this.emitTo("ready",this.codemirrorIns)},methods:{init:function(){var e=this;this.isMerge?this.codemirrorIns=this.initMerge():this.codemirrorIns=this.initCode(),this.codemirrorIns.on("change",(function(t){e.curCode=t.getValue(),e.$emit&&e.emitTo("change",e.curCode)})),this.refresh()},initCode:function(){var e=u.fromTextArea(this.$refs.textarea,this.options);return e.setValue(this.code||this.curCode),e},initMerge:function(){var e=u.MergeView(this.$refs.merge,this.options);return e.edit},changeOption:function(e,t){this.codemirrorIns.setOption(e,t)},bindEvents:function(){var e=this,t=[],r=["scroll","changes","beforeChange","cursorActivity","keyHandled","inputRead","electricInput","beforeSelectionChange","viewportChange","swapDoc","gutterClick","gutterContextMenu","focus","blur","refresh","optionChange","scrollCursorIntoView","update"];this.events.filter((function(e){r.includes(e)&&!t.includes(e)&&t.push(e)})),t.forEach((function(t){e.codemirrorIns.on(t,(function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];e.emitTo.apply(e,[t].concat(n))}))}))},setCodeChange:function(e){var t=this.codemirrorIns.getValue();if(e!==t){this.codemirrorIns.setValue(e),this.content=e;var r=this.codemirrorIns.getScrollInfo();this.codemirrorIns.scrollTo(r.left,r.top)}},setMerge:function(){var e=this.codemirrorIns.doc.history,t=this.codemirrorIns.doc.cleanGeneration;this.options.value=this.codemirrorIns.getValue(),this.destroy(),this.init(),this.codemirrorIns.doc.history=e,this.codemirrorIns.doc.cleanGeneration=t},refresh:function(){var e=this;this.$nextTick((function(){e.codemirrorIns.refresh()}))},emitTo:function(e,t){this.$emit(this.emit,{type:e,data:t})},beforeDestroy:function(){this.destroy()},destroy:function(){var e=this.codemirrorIns.doc.cm.getWrapperElement();e&&e.remove&&e.remove()}}},h=d,f=r("2877"),p=Object(f["a"])(h,a,s,!1,null,null,null),v=p.exports,m=(r("a7be"),r("01cb"),r("d7d5"),r("f9d4"),r("7b00"),r("d5e0"),r("4ba6"),r("959b"),r("db91"),r("903e"),r("02f0"),r("ffda"),r("c0e2"),r("693d"),r("f6b6"),r("9b74"),r("991c"),r("c885"),r("bb47"),r("641c")),b=r.n(m);window.diff_match_patch=b.a,window.DIFF_DELETE=-1,window.DIFF_INSERT=1,window.DIFF_EQUAL=0;var g={name:"App",components:{XCodeMirror:v},data:function(){return{codeMirrorIns:null,placeholder:"insert here",code:"",options:{tabSize:2,theme:"eclipse",lineNumbers:!0,line:!0,mode:"text/x-mysql",hintOptions:{completeSingle:!1}},isMerge:!1,mergeOption:{value:"<p>hello</p>",origLeft:null,orig:"<p>hello world</p>",connect:"align",mode:"text/html",lineNumbers:!0,collapseIdentical:!1,highlightDifferences:!0},events:["changes","scroll","cursorActivity","inputRead"],modes:[{value:"x-sql",label:"SQL"},{value:"javascript",label:"Javascript"},{value:"css",label:"CSS"},{value:"html",label:"XML/HTML"},{value:"x-java",label:"Java"},{value:"x-objectivec",label:"Objective-C"},{value:"x-python",label:"Python"},{value:"x-rsrc",label:"R"},{value:"x-sh",label:"Shell"},{value:"x-swift",label:"Swift"},{value:"x-vue",label:"Vue"},{value:"markdown",label:"Markdown"}]}},methods:{handleCodeMirror:function(e){var t=e.type,r=e.data;switch(t){case"ready":this.codeMirrorIns=r;break;case"cursorActivity":this.codeMirrorIns.showHint();break;case"inputRead":this.codeMirrorIns.showHint();break;default:console.log("emitData",e);break}},handleChangeMode:function(e){this.options.mode="text/".concat(e.target.value)}}},y=g,w=(r("034f"),Object(f["a"])(y,o,i,!1,null,null,null)),M=w.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(M)}}).$mount("#app")},"85ec":function(e,t,r){}});