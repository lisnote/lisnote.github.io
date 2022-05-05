function F(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let C=F();function J(l){C=l}const K=/[&<>"']/,Y=/[&<>"']/g,ee=/[<>"']|&(?!#?\w+;)/,te=/[<>"']|&(?!#?\w+;)/g,ne={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},v=l=>ne[l];function x(l,e){if(e){if(K.test(l))return l.replace(Y,v)}else if(ee.test(l))return l.replace(te,v);return l}const ie=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function W(l){return l.replace(ie,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}const se=/(^|[^\[])\^/g;function d(l,e){l=typeof l=="string"?l:l.source,e=e||"";const n={replace:(t,i)=>(i=i.source||i,i=i.replace(se,"$1"),l=l.replace(t,i),n),getRegex:()=>new RegExp(l,e)};return n}const re=/[^\w:]/g,le=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function j(l,e,n){if(l){let t;try{t=decodeURIComponent(W(n)).replace(re,"").toLowerCase()}catch{return null}if(t.indexOf("javascript:")===0||t.indexOf("vbscript:")===0||t.indexOf("data:")===0)return null}e&&!le.test(n)&&(n=ce(e,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const q={},ae=/^[^:]+:\/*[^/]*$/,oe=/^([^:]+:)[\s\S]*$/,he=/^([^:]+:\/*[^/]*)[\s\S]*$/;function ce(l,e){q[" "+l]||(ae.test(l)?q[" "+l]=l+"/":q[" "+l]=D(l,"/",!0)),l=q[" "+l];const n=l.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:l.replace(oe,"$1")+e:e.charAt(0)==="/"?n?e:l.replace(he,"$1")+e:l+e}const B={exec:function(){}};function y(l){let e=1,n,t;for(;e<arguments.length;e++){n=arguments[e];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(l[t]=n[t])}return l}function Q(l,e){const n=l.replace(/\|/g,(s,r,a)=>{let h=!1,u=r;for(;--u>=0&&a[u]==="\\";)h=!h;return h?"|":" |"}),t=n.split(/ \|/);let i=0;if(t[0].trim()||t.shift(),t.length>0&&!t[t.length-1].trim()&&t.pop(),t.length>e)t.splice(e);else for(;t.length<e;)t.push("");for(;i<t.length;i++)t[i]=t[i].trim().replace(/\\\|/g,"|");return t}function D(l,e,n){const t=l.length;if(t===0)return"";let i=0;for(;i<t;){const s=l.charAt(t-i-1);if(s===e&&!n)i++;else if(s!==e&&n)i++;else break}return l.slice(0,t-i)}function pe(l,e){if(l.indexOf(e[1])===-1)return-1;const n=l.length;let t=0,i=0;for(;i<n;i++)if(l[i]==="\\")i++;else if(l[i]===e[0])t++;else if(l[i]===e[1]&&(t--,t<0))return i;return-1}function X(l){l&&l.sanitize&&!l.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function P(l,e){if(e<1)return"";let n="";for(;e>1;)e&1&&(n+=l),e>>=1,l+=l;return n+l}function M(l,e,n,t){const i=e.href,s=e.title?x(e.title):null,r=l[1].replace(/\\([\[\]])/g,"$1");if(l[0].charAt(0)!=="!"){t.state.inLink=!0;const a={type:"link",raw:n,href:i,title:s,text:r,tokens:t.inlineTokens(r,[])};return t.state.inLink=!1,a}else return{type:"image",raw:n,href:i,title:s,text:x(r)}}function ue(l,e){const n=l.match(/^(\s+)(?:```)/);if(n===null)return e;const t=n[1];return e.split(`
`).map(i=>{const s=i.match(/^\s+/);if(s===null)return i;const[r]=s;return r.length>=t.length?i.slice(t.length):i}).join(`
`)}class O{constructor(e){this.options=e||C}space(e){const n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){const n=this.rules.block.code.exec(e);if(n){const t=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?t:D(t,`
`)}}}fences(e){const n=this.rules.block.fences.exec(e);if(n){const t=n[0],i=ue(t,n[3]||"");return{type:"code",raw:t,lang:n[2]?n[2].trim():n[2],text:i}}}heading(e){const n=this.rules.block.heading.exec(e);if(n){let t=n[2].trim();if(/#$/.test(t)){const s=D(t,"#");(this.options.pedantic||!s||/ $/.test(s))&&(t=s.trim())}const i={type:"heading",raw:n[0],depth:n[1].length,text:t,tokens:[]};return this.lexer.inline(i.text,i.tokens),i}}hr(e){const n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){const n=this.rules.block.blockquote.exec(e);if(n){const t=n[0].replace(/^ *>[ \t]?/gm,"");return{type:"blockquote",raw:n[0],tokens:this.lexer.blockTokens(t,[]),text:t}}}list(e){let n=this.rules.block.list.exec(e);if(n){let t,i,s,r,a,h,u,g,b,k,p,I,_=n[1].trim();const S=_.length>1,m={type:"list",raw:"",ordered:S,start:S?+_.slice(0,-1):"",loose:!1,items:[]};_=S?`\\d{1,9}\\${_.slice(-1)}`:`\\${_}`,this.options.pedantic&&(_=S?_:"[*+-]");const w=new RegExp(`^( {0,3}${_})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(I=!1,!(!(n=w.exec(e))||this.rules.block.hr.test(e)));){if(t=n[0],e=e.substring(t.length),g=n[2].split(`
`,1)[0],b=e.split(`
`,1)[0],this.options.pedantic?(r=2,p=g.trimLeft()):(r=n[2].search(/[^ ]/),r=r>4?1:r,p=g.slice(r),r+=n[1].length),h=!1,!g&&/^ *$/.test(b)&&(t+=b+`
`,e=e.substring(b.length+1),I=!0),!I){const T=new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])`);for(;e&&(k=e.split(`
`,1)[0],g=k,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!T.test(g));){if(g.search(/[^ ]/)>=r||!g.trim())p+=`
`+g.slice(r);else if(!h)p+=`
`+g;else break;!h&&!g.trim()&&(h=!0),t+=k+`
`,e=e.substring(k.length+1)}}m.loose||(u?m.loose=!0:/\n *\n *$/.test(t)&&(u=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(p),i&&(s=i[0]!=="[ ] ",p=p.replace(/^\[[ xX]\] +/,""))),m.items.push({type:"list_item",raw:t,task:!!i,checked:s,loose:!1,text:p}),m.raw+=t}m.items[m.items.length-1].raw=t.trimRight(),m.items[m.items.length-1].text=p.trimRight(),m.raw=m.raw.trimRight();const E=m.items.length;for(a=0;a<E;a++){this.lexer.state.top=!1,m.items[a].tokens=this.lexer.blockTokens(m.items[a].text,[]);const T=m.items[a].tokens.filter(A=>A.type==="space"),R=T.every(A=>{const Z=A.raw.split("");let L=0;for(const H of Z)if(H===`
`&&(L+=1),L>1)return!0;return!1});!m.loose&&T.length&&R&&(m.loose=!0,m.items[a].loose=!0)}return m}}html(e){const n=this.rules.block.html.exec(e);if(n){const t={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};return this.options.sanitize&&(t.type="paragraph",t.text=this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]),t.tokens=[],this.lexer.inline(t.text,t.tokens)),t}}def(e){const n=this.rules.block.def.exec(e);if(n){n[3]&&(n[3]=n[3].substring(1,n[3].length-1));const t=n[1].toLowerCase().replace(/\s+/g," ");return{type:"def",tag:t,raw:n[0],href:n[2],title:n[3]}}}table(e){const n=this.rules.block.table.exec(e);if(n){const t={type:"table",header:Q(n[1]).map(i=>({text:i})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(t.header.length===t.align.length){t.raw=n[0];let i=t.align.length,s,r,a,h;for(s=0;s<i;s++)/^ *-+: *$/.test(t.align[s])?t.align[s]="right":/^ *:-+: *$/.test(t.align[s])?t.align[s]="center":/^ *:-+ *$/.test(t.align[s])?t.align[s]="left":t.align[s]=null;for(i=t.rows.length,s=0;s<i;s++)t.rows[s]=Q(t.rows[s],t.header.length).map(u=>({text:u}));for(i=t.header.length,r=0;r<i;r++)t.header[r].tokens=[],this.lexer.inlineTokens(t.header[r].text,t.header[r].tokens);for(i=t.rows.length,r=0;r<i;r++)for(h=t.rows[r],a=0;a<h.length;a++)h[a].tokens=[],this.lexer.inlineTokens(h[a].text,h[a].tokens);return t}}}lheading(e){const n=this.rules.block.lheading.exec(e);if(n){const t={type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}paragraph(e){const n=this.rules.block.paragraph.exec(e);if(n){const t={type:"paragraph",raw:n[0],text:n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}text(e){const n=this.rules.block.text.exec(e);if(n){const t={type:"text",raw:n[0],text:n[0],tokens:[]};return this.lexer.inline(t.text,t.tokens),t}}escape(e){const n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:x(n[1])}}tag(e){const n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):x(n[0]):n[0]}}link(e){const n=this.rules.inline.link.exec(e);if(n){const t=n[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;const r=D(t.slice(0,-1),"\\");if((t.length-r.length)%2===0)return}else{const r=pe(n[2],"()");if(r>-1){const h=(n[0].indexOf("!")===0?5:4)+n[1].length+r;n[2]=n[2].substring(0,r),n[0]=n[0].substring(0,h).trim(),n[3]=""}}let i=n[2],s="";if(this.options.pedantic){const r=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);r&&(i=r[1],s=r[3])}else s=n[3]?n[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(t)?i=i.slice(1):i=i.slice(1,-1)),M(n,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(e,n){let t;if((t=this.rules.inline.reflink.exec(e))||(t=this.rules.inline.nolink.exec(e))){let i=(t[2]||t[1]).replace(/\s+/g," ");if(i=n[i.toLowerCase()],!i||!i.href){const s=t[0].charAt(0);return{type:"text",raw:s,text:s}}return M(t,i,t[0],this.lexer)}}emStrong(e,n,t=""){let i=this.rules.inline.emStrong.lDelim.exec(e);if(!i||i[3]&&t.match(/[\p{L}\p{N}]/u))return;const s=i[1]||i[2]||"";if(!s||s&&(t===""||this.rules.inline.punctuation.exec(t))){const r=i[0].length-1;let a,h,u=r,g=0;const b=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(b.lastIndex=0,n=n.slice(-1*e.length+r);(i=b.exec(n))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(h=a.length,i[3]||i[4]){u+=h;continue}else if((i[5]||i[6])&&r%3&&!((r+h)%3)){g+=h;continue}if(u-=h,u>0)continue;if(h=Math.min(h,h+u+g),Math.min(r,h)%2){const p=e.slice(1,r+i.index+h);return{type:"em",raw:e.slice(0,r+i.index+h+1),text:p,tokens:this.lexer.inlineTokens(p,[])}}const k=e.slice(2,r+i.index+h-1);return{type:"strong",raw:e.slice(0,r+i.index+h+1),text:k,tokens:this.lexer.inlineTokens(k,[])}}}}codespan(e){const n=this.rules.inline.code.exec(e);if(n){let t=n[2].replace(/\n/g," ");const i=/[^ ]/.test(t),s=/^ /.test(t)&&/ $/.test(t);return i&&s&&(t=t.substring(1,t.length-1)),t=x(t,!0),{type:"codespan",raw:n[0],text:t}}}br(e){const n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){const n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2],[])}}autolink(e,n){const t=this.rules.inline.autolink.exec(e);if(t){let i,s;return t[2]==="@"?(i=x(this.options.mangle?n(t[1]):t[1]),s="mailto:"+i):(i=x(t[1]),s=i),{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}url(e,n){let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=x(this.options.mangle?n(t[0]):t[0]),s="mailto:"+i;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])[0];while(r!==t[0]);i=x(t[0]),t[1]==="www."?s="http://"+i:s=i}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e,n){const t=this.rules.inline.text.exec(e);if(t){let i;return this.lexer.state.inRawBlock?i=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):x(t[0]):t[0]:i=x(this.options.smartypants?n(t[0]):t[0]),{type:"text",raw:t[0],text:i}}}}const c={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:B,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};c._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;c._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;c.def=d(c.def).replace("label",c._label).replace("title",c._title).getRegex();c.bullet=/(?:[*+-]|\d{1,9}[.)])/;c.listItemStart=d(/^( *)(bull) */).replace("bull",c.bullet).getRegex();c.list=d(c.list).replace(/bull/g,c.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+c.def.source+")").getRegex();c._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";c._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;c.html=d(c.html,"i").replace("comment",c._comment).replace("tag",c._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();c.paragraph=d(c._paragraph).replace("hr",c.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",c._tag).getRegex();c.blockquote=d(c.blockquote).replace("paragraph",c.paragraph).getRegex();c.normal=y({},c);c.gfm=y({},c.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});c.gfm.table=d(c.gfm.table).replace("hr",c.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",c._tag).getRegex();c.gfm.paragraph=d(c._paragraph).replace("hr",c.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",c.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",c._tag).getRegex();c.pedantic=y({},c.normal,{html:d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",c._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:B,paragraph:d(c.normal._paragraph).replace("hr",c.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",c.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const o={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:B,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:B,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};o._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";o.punctuation=d(o.punctuation).replace(/punctuation/g,o._punctuation).getRegex();o.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;o.escapedEmSt=/\\\*|\\_/g;o._comment=d(c._comment).replace("(?:-->|$)","-->").getRegex();o.emStrong.lDelim=d(o.emStrong.lDelim).replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimAst=d(o.emStrong.rDelimAst,"g").replace(/punct/g,o._punctuation).getRegex();o.emStrong.rDelimUnd=d(o.emStrong.rDelimUnd,"g").replace(/punct/g,o._punctuation).getRegex();o._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;o._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;o._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;o.autolink=d(o.autolink).replace("scheme",o._scheme).replace("email",o._email).getRegex();o._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;o.tag=d(o.tag).replace("comment",o._comment).replace("attribute",o._attribute).getRegex();o._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;o._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;o._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;o.link=d(o.link).replace("label",o._label).replace("href",o._href).replace("title",o._title).getRegex();o.reflink=d(o.reflink).replace("label",o._label).replace("ref",c._label).getRegex();o.nolink=d(o.nolink).replace("ref",c._label).getRegex();o.reflinkSearch=d(o.reflinkSearch,"g").replace("reflink",o.reflink).replace("nolink",o.nolink).getRegex();o.normal=y({},o);o.pedantic=y({},o.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",o._label).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",o._label).getRegex()});o.gfm=y({},o.normal,{escape:d(o.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});o.gfm.url=d(o.gfm.url,"i").replace("email",o.gfm._extended_email).getRegex();o.breaks=y({},o.gfm,{br:d(o.br).replace("{2,}","*").getRegex(),text:d(o.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function fe(l){return l.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function N(l){let e="",n,t;const i=l.length;for(n=0;n<i;n++)t=l.charCodeAt(n),Math.random()>.5&&(t="x"+t.toString(16)),e+="&#"+t+";";return e}class ${constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||C,this.options.tokenizer=this.options.tokenizer||new O,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:c.normal,inline:o.normal};this.options.pedantic?(n.block=c.pedantic,n.inline=o.pedantic):this.options.gfm&&(n.block=c.gfm,this.options.breaks?n.inline=o.breaks:n.inline=o.gfm),this.tokenizer.rules=n}static get rules(){return{block:c,inline:o}}static lex(e,n){return new $(n).lex(e)}static lexInline(e,n){return new $(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(a,h,u)=>h+"    ".repeat(u.length));let t,i,s,r;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(t=a.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length),t.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+t.raw,i.text+=`
`+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title});continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const h=e.slice(1);let u;this.options.extensions.startBlock.forEach(function(g){u=g.call({lexer:this},h),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(s=e.substring(0,a+1))}if(this.state.top&&(t=this.tokenizer.paragraph(s))){i=n[n.length-1],r&&i.type==="paragraph"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t),r=s.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&i.type==="text"?(i.raw+=`
`+t.raw,i.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):n.push(t);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(e,n){this.inlineQueue.push({src:e,tokens:n})}inlineTokens(e,n=[]){let t,i,s,r=e,a,h,u;if(this.tokens.links){const g=Object.keys(this.tokens.links);if(g.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)g.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,a.index)+"["+P("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)r=r.slice(0,a.index)+"["+P("a",a[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.escapedEmSt.exec(r))!=null;)r=r.slice(0,a.index)+"++"+r.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(h||(u=""),h=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(g=>(t=g.call({lexer:this},e,n))?(e=e.substring(t.raw.length),n.push(t),!0):!1))){if(t=this.tokenizer.escape(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.tag(e)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.link(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(t.raw.length),i=n[n.length-1],i&&t.type==="text"&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(t=this.tokenizer.emStrong(e,r,u)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.codespan(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.br(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.del(e)){e=e.substring(t.raw.length),n.push(t);continue}if(t=this.tokenizer.autolink(e,N)){e=e.substring(t.raw.length),n.push(t);continue}if(!this.state.inLink&&(t=this.tokenizer.url(e,N))){e=e.substring(t.raw.length),n.push(t);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let g=1/0;const b=e.slice(1);let k;this.options.extensions.startInline.forEach(function(p){k=p.call({lexer:this},b),typeof k=="number"&&k>=0&&(g=Math.min(g,k))}),g<1/0&&g>=0&&(s=e.substring(0,g+1))}if(t=this.tokenizer.inlineText(s,fe)){e=e.substring(t.raw.length),t.raw.slice(-1)!=="_"&&(u=t.raw.slice(-1)),h=!0,i=n[n.length-1],i&&i.type==="text"?(i.raw+=t.raw,i.text+=t.text):n.push(t);continue}if(e){const g="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}}class U{constructor(e){this.options=e||C}code(e,n,t){const i=(n||"").match(/\S*/)[0];if(this.options.highlight){const s=this.options.highlight(e,i);s!=null&&s!==e&&(t=!0,e=s)}return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+x(i,!0)+'">'+(t?e:x(e,!0))+`</code></pre>
`:"<pre><code>"+(t?e:x(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e){return e}heading(e,n,t,i){if(this.options.headerIds){const s=this.options.headerPrefix+i.slug(t);return`<h${n} id="${s}">${e}</h${n}>
`}return`<h${n}>${e}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,n,t){const i=n?"ol":"ul",s=n&&t!==1?' start="'+t+'"':"";return"<"+i+s+`>
`+e+"</"+i+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,n){const t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,n,t){if(e=j(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i='<a href="'+x(e)+'"';return n&&(i+=' title="'+n+'"'),i+=">"+t+"</a>",i}image(e,n,t){if(e=j(this.options.sanitize,this.options.baseUrl,e),e===null)return t;let i=`<img src="${e}" alt="${t}"`;return n&&(i+=` title="${n}"`),i+=this.options.xhtml?"/>":">",i}text(e){return e}}class G{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,t){return""+t}image(e,n,t){return""+t}br(){return""}}class V{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,n){let t=e,i=0;if(this.seen.hasOwnProperty(t)){i=this.seen[e];do i++,t=e+"-"+i;while(this.seen.hasOwnProperty(t))}return n||(this.seen[e]=i,this.seen[t]=0),t}slug(e,n={}){const t=this.serialize(e);return this.getNextSafeSlug(t,n.dryrun)}}class z{constructor(e){this.options=e||C,this.options.renderer=this.options.renderer||new U,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new G,this.slugger=new V}static parse(e,n){return new z(n).parse(e)}static parseInline(e,n){return new z(n).parseInline(e)}parse(e,n=!0){let t="",i,s,r,a,h,u,g,b,k,p,I,_,S,m,w,E,T,R,A;const Z=e.length;for(i=0;i<Z;i++){if(p=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[p.type]&&(A=this.options.extensions.renderers[p.type].call({parser:this},p),A!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(p.type))){t+=A||"";continue}switch(p.type){case"space":continue;case"hr":{t+=this.renderer.hr();continue}case"heading":{t+=this.renderer.heading(this.parseInline(p.tokens),p.depth,W(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue}case"code":{t+=this.renderer.code(p.text,p.lang,p.escaped);continue}case"table":{for(b="",g="",a=p.header.length,s=0;s<a;s++)g+=this.renderer.tablecell(this.parseInline(p.header[s].tokens),{header:!0,align:p.align[s]});for(b+=this.renderer.tablerow(g),k="",a=p.rows.length,s=0;s<a;s++){for(u=p.rows[s],g="",h=u.length,r=0;r<h;r++)g+=this.renderer.tablecell(this.parseInline(u[r].tokens),{header:!1,align:p.align[r]});k+=this.renderer.tablerow(g)}t+=this.renderer.table(b,k);continue}case"blockquote":{k=this.parse(p.tokens),t+=this.renderer.blockquote(k);continue}case"list":{for(I=p.ordered,_=p.start,S=p.loose,a=p.items.length,k="",s=0;s<a;s++)w=p.items[s],E=w.checked,T=w.task,m="",w.task&&(R=this.renderer.checkbox(E),S?w.tokens.length>0&&w.tokens[0].type==="paragraph"?(w.tokens[0].text=R+" "+w.tokens[0].text,w.tokens[0].tokens&&w.tokens[0].tokens.length>0&&w.tokens[0].tokens[0].type==="text"&&(w.tokens[0].tokens[0].text=R+" "+w.tokens[0].tokens[0].text)):w.tokens.unshift({type:"text",text:R}):m+=R),m+=this.parse(w.tokens,S),k+=this.renderer.listitem(m,T,E);t+=this.renderer.list(k,I,_);continue}case"html":{t+=this.renderer.html(p.text);continue}case"paragraph":{t+=this.renderer.paragraph(this.parseInline(p.tokens));continue}case"text":{for(k=p.tokens?this.parseInline(p.tokens):p.text;i+1<Z&&e[i+1].type==="text";)p=e[++i],k+=`
`+(p.tokens?this.parseInline(p.tokens):p.text);t+=n?this.renderer.paragraph(k):k;continue}default:{const L='Token with "'+p.type+'" type was not found.';if(this.options.silent){console.error(L);return}else throw new Error(L)}}}return t}parseInline(e,n){n=n||this.renderer;let t="",i,s,r;const a=e.length;for(i=0;i<a;i++){if(s=e[i],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(r=this.options.extensions.renderers[s.type].call({parser:this},s),r!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){t+=r||"";continue}switch(s.type){case"escape":{t+=n.text(s.text);break}case"html":{t+=n.html(s.text);break}case"link":{t+=n.link(s.href,s.title,this.parseInline(s.tokens,n));break}case"image":{t+=n.image(s.href,s.title,s.text);break}case"strong":{t+=n.strong(this.parseInline(s.tokens,n));break}case"em":{t+=n.em(this.parseInline(s.tokens,n));break}case"codespan":{t+=n.codespan(s.text);break}case"br":{t+=n.br();break}case"del":{t+=n.del(this.parseInline(s.tokens,n));break}case"text":{t+=n.text(s.text);break}default:{const h='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(h);return}else throw new Error(h)}}}return t}}function f(l,e,n){if(typeof l=="undefined"||l===null)throw new Error("marked(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");if(typeof e=="function"&&(n=e,e=null),e=y({},f.defaults,e||{}),X(e),n){const t=e.highlight;let i;try{i=$.lex(l,e)}catch(a){return n(a)}const s=function(a){let h;if(!a)try{e.walkTokens&&f.walkTokens(i,e.walkTokens),h=z.parse(i,e)}catch(u){a=u}return e.highlight=t,a?n(a):n(null,h)};if(!t||t.length<3||(delete e.highlight,!i.length))return s();let r=0;f.walkTokens(i,function(a){a.type==="code"&&(r++,setTimeout(()=>{t(a.text,a.lang,function(h,u){if(h)return s(h);u!=null&&u!==a.text&&(a.text=u,a.escaped=!0),r--,r===0&&s()})},0))}),r===0&&s();return}try{const t=$.lex(l,e);return e.walkTokens&&f.walkTokens(t,e.walkTokens),z.parse(t,e)}catch(t){if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(t.message+"",!0)+"</pre>";throw t}}f.options=f.setOptions=function(l){return y(f.defaults,l),J(f.defaults),f};f.getDefaults=F;f.defaults=C;f.use=function(...l){const e=y({},...l),n=f.defaults.extensions||{renderers:{},childTokens:{}};let t;l.forEach(i=>{if(i.extensions&&(t=!0,i.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if(s.renderer){const r=n.renderers?n.renderers[s.name]:null;r?n.renderers[s.name]=function(...a){let h=s.renderer.apply(this,a);return h===!1&&(h=r.apply(this,a)),h}:n.renderers[s.name]=s.renderer}if(s.tokenizer){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");n[s.level]?n[s.level].unshift(s.tokenizer):n[s.level]=[s.tokenizer],s.start&&(s.level==="block"?n.startBlock?n.startBlock.push(s.start):n.startBlock=[s.start]:s.level==="inline"&&(n.startInline?n.startInline.push(s.start):n.startInline=[s.start]))}s.childTokens&&(n.childTokens[s.name]=s.childTokens)})),i.renderer){const s=f.defaults.renderer||new U;for(const r in i.renderer){const a=s[r];s[r]=(...h)=>{let u=i.renderer[r].apply(s,h);return u===!1&&(u=a.apply(s,h)),u}}e.renderer=s}if(i.tokenizer){const s=f.defaults.tokenizer||new O;for(const r in i.tokenizer){const a=s[r];s[r]=(...h)=>{let u=i.tokenizer[r].apply(s,h);return u===!1&&(u=a.apply(s,h)),u}}e.tokenizer=s}if(i.walkTokens){const s=f.defaults.walkTokens;e.walkTokens=function(r){i.walkTokens.call(this,r),s&&s.call(this,r)}}t&&(e.extensions=n),f.setOptions(e)})};f.walkTokens=function(l,e){for(const n of l)switch(e.call(f,n),n.type){case"table":{for(const t of n.header)f.walkTokens(t.tokens,e);for(const t of n.rows)for(const i of t)f.walkTokens(i.tokens,e);break}case"list":{f.walkTokens(n.items,e);break}default:f.defaults.extensions&&f.defaults.extensions.childTokens&&f.defaults.extensions.childTokens[n.type]?f.defaults.extensions.childTokens[n.type].forEach(function(t){f.walkTokens(n[t],e)}):n.tokens&&f.walkTokens(n.tokens,e)}};f.parseInline=function(l,e){if(typeof l=="undefined"||l===null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof l!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(l)+", string expected");e=y({},f.defaults,e||{}),X(e);try{const n=$.lexInline(l,e);return e.walkTokens&&f.walkTokens(n,e.walkTokens),z.parseInline(n,e)}catch(n){if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+x(n.message+"",!0)+"</pre>";throw n}};f.Parser=z;f.parser=z.parse;f.Renderer=U;f.TextRenderer=G;f.Lexer=$;f.lexer=$.lex;f.Tokenizer=O;f.Slugger=V;f.parse=f;z.parse;$.lex;export{f as m};
//# sourceMappingURL=marked.89478e4e.js.map
