(self.webpackChunkhost_0_0_0=self.webpackChunkhost_0_0_0||[]).push([[486],{4104:(e,t,n)=>{"use strict";n.r(t);var a=n(3579),r=n.n(a),l=n(7675);const i={receive:new l.Subject,send:new l.Subject};i.receive.subscribe((e=>{console.log("HOST - Send",e)})),i.send.subscribe((e=>{console.log("HOST - Receive",e)}));const o=i;var c=n(8127),s=n(201),m=n.n(s),p=n(6010),u=n(1120),d=n(5834),E=n(8863),h=n(5258),g=n(8358),Z=n(2822),f=n(2318),y=n(5517),w=n(7812),b=n(9009),v=n(3832),S=n(9895),x=n(8884),N=n(9875),k=n(8825),C=n(998),_=n(6869),A=n(5757),B=n(442),j=n(8346),H=n(3219),I=n(9634),P=n(1195),V=n(282);const D=(0,u.Z)((e=>({root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:{display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px",...e.mixins.toolbar},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - 240px)",transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:{overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7),[e.breakpoints.up("sm")]:{width:e.spacing(9)}},appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:"42%"}})));function L(e){const{ready:t,failed:a}=(e=>{const[t,n]=r().useState(!1),[a,l]=r().useState(!1);return r().useEffect((()=>{if(!e.url)return;const t=document.createElement("script");return t.src=e.url,t.type="text/javascript",t.async=!0,n(!1),l(!1),t.onload=()=>{console.log(`Dynamic Script Loaded: ${e.url}`),n(!0)},t.onerror=()=>{console.error(`Dynamic Script Error: ${e.url}`),n(!1),l(!0)},document.head.appendChild(t),()=>{console.log(`Dynamic Script Removed: ${e.url}`),document.head.removeChild(t)}}),[e.url]),{ready:t,failed:a}})({url:e.system&&e.system.url});if(!e.system)return r().createElement("h2",null,"Not system specified");if(!t)return r().createElement("h2",null,"Loading dynamic script: ",e.system.url);if(a)return r().createElement("h2",null,"Failed to load dynamic script: ",e.system.url);const l=r().lazy((i=e.system.scope,c=e.system.module,async()=>{await n.I("default");const e=window[i];return await e.init(n.S.default),(await window[i].get(c))()}));var i,c;return r().createElement(r().Suspense,{fallback:"Loading System"},r().createElement(l,{serviceComunication:o}))}const R=()=>{o.send.subscribe((n=>{t([...e,n])}));const[e,t]=r().useState([]);return r().createElement(r().Fragment,null,r().createElement("h1",null,"Notifications"),r().createElement(V.Z,{onClick:function(){o.receive.next({id:(0,c.nanoid)(),app:"App1",title:"New Notification From Host",data:{}})},variant:"contained",color:"primary"},"New Notification To App"),r().createElement("ul",null,e.map((e=>r().createElement("li",{key:e.id},e.id," - ",e.app," - ",e.title)))))};function T(){const e=D(),[t,n]=r().useState(!1),a=(0,p.Z)(e.paper,e.fixedHeight),[l,i]=r().useState(void 0);return r().createElement("div",{className:e.root},r().createElement(d.ZP,null),r().createElement(h.Z,{position:"absolute",className:(0,p.Z)(e.appBar,t&&e.appBarShift)},r().createElement(g.Z,{className:e.toolbar},r().createElement(w.Z,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:()=>{n(!0)},className:(0,p.Z)(e.menuButton,t&&e.menuButtonHidden)},r().createElement(x.Z,null)),r().createElement(f.Z,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:e.title},"Host"),r().createElement(w.Z,{color:"inherit"},r().createElement(b.Z,{color:"secondary"},r().createElement(k.Z,null))))),r().createElement(E.ZP,{variant:"permanent",classes:{paper:(0,p.Z)(e.drawerPaper,!1)},open:!0},r().createElement("div",{className:e.toolbarIcon},r().createElement(w.Z,{onClick:()=>{n(!1)}},r().createElement(N.Z,null))),r().createElement(y.Z,null),r().createElement(Z.Z,null,r().createElement(C.Z,{button:!0,onClick:function(){i({url:"http://localhost:3002/1.0.0.remoteEntry.js",scope:"app1_1_0_0",module:"./App1"})}},r().createElement(_.Z,null,r().createElement(B.Z,null)),r().createElement(A.Z,{primary:"App 1 - V: 1.0.0"})),r().createElement(C.Z,{button:!0,onClick:function(){i({url:"http://localhost:3002/1.1.0.remoteEntry.js",scope:"app1_1_1_0",module:"./App1"})}},r().createElement(_.Z,null,r().createElement(j.Z,null)),r().createElement(A.Z,{primary:"App 1 - V: 1.1.0"})),r().createElement(C.Z,{button:!0,onClick:function(){i({url:"http://localhost:3002/1.2.0.remoteEntry.js",scope:"app1_1_2_0",module:"./App1"})}},r().createElement(_.Z,null,r().createElement(H.Z,null)),r().createElement(A.Z,{primary:"App 1 - V: 1.2.0"})),r().createElement(C.Z,{button:!0,onClick:function(){i({url:"http://localhost:3002/remoteEntry.js",scope:"app1",module:"./App1"})}},r().createElement(_.Z,null,r().createElement(I.Z,null)),r().createElement(A.Z,{primary:"App 1 - V: latest"})),r().createElement(C.Z,{button:!0,onClick:function(){i({url:"http://localhost:3003/remoteEntry.js",scope:"app2",module:"./App2"})}},r().createElement(_.Z,null,r().createElement(P.Z,null)),r().createElement(A.Z,{primary:"App 2 - V: latest"})))),r().createElement("main",{className:e.content},r().createElement("div",{className:e.appBarSpacer}),r().createElement(v.Z,{maxWidth:"lg",className:e.container},r().createElement(S.Z,{className:a},r().createElement(L,{system:l})),r().createElement("hr",null),r().createElement(S.Z,{className:a},r().createElement(R,null)))))}m().render(r().createElement(T,null),document.getElementById("root"))}}]);