var b=Object.defineProperty;var m=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var y=(s,a,e)=>a in s?b(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,v=(s,a)=>{for(var e in a||(a={}))A.call(a,e)&&y(s,e,a[e]);if(m)for(var e of m(a))B.call(a,e)&&y(s,e,a[e]);return s};import{h as C,f as l,r as L,w as D,k as I,l as g,q as h,A as o,v as i,x as n,T as P,C as x,D as T,u as c,F as V,E as F,G,H as U,I as q}from"./@vue.f3ce316b.js";import{u as $}from"./vue-router.941227db.js";import{i as k}from"./lispress.9248cfd1.js";import{_ as j}from"./main.3ccbc7c2.js";import"./pinia.c1449b88.js";import"./vue-demi.b3a9cad9.js";const z={id:"title-list"},H={class:"article-cart"},M={class:"page-turn"},O=q("\u4E0A\u4E00\u9875"),R=q("\u4E0B\u4E00\u9875"),J=C({setup(s){let a=$(),e=l(()=>{var t;return Number((t=a.query.page)!=null?t:1)}),p=10,r=L([]),w=l(()=>r.value.slice((e.value-1)*p,e.value*p)),_=l(()=>{var t;return(t=a.query.search)!=null?t:""});f(),D(_,()=>{r.value=[],f()});function f(){_.value?k.getSearchArticlesTitle(_.value.split(" ")).then(t=>{r.value=t}):k.getArticlesTitle().then(t=>{r.value=t})}function E(){return e.value<Math.ceil(r.value.length/p)}let N=l(()=>{let t=v({},a.query);return e.value==2?delete t.page:t.page=e.value-1+"",{query:t}}),S=l(()=>{let t=v({},a.query);return t.page=e.value+1+"",{query:t}});return(t,K)=>{const d=I("router-link");return g(),h("div",z,[o("div",H,[i(P,{appear:"","enter-active-class":"fadeInUp","leave-active-class":"fadeOutUp"},{default:n(()=>[(g(!0),h(V,null,F(c(w),u=>(g(),h("div",{key:u},[i(d,{to:`/articles/?article=${u}`},{default:n(()=>[o("div",{style:G({"background-image":`url(https://lisnote.github.io/articles/assets/${u}/background.jpg)`})},[o("h1",null,U(u),1)],4)]),_:2},1032,["to"])]))),128))]),_:1})]),o("div",M,[x(i(d,{to:c(N),class:"pre-page"},{default:n(()=>[O]),_:1},8,["to"]),[[T,c(e)>1]]),x(i(d,{to:c(S),class:"next-page"},{default:n(()=>[R]),_:1},8,["to"]),[[T,E()]])])])}}});var ae=j(J,[["__scopeId","data-v-33cd790c"]]);export{ae as default};
//# sourceMappingURL=TitleList.a81959c8.js.map
