"use strict";(self.webpackChunkapp1_1_2_0=self.webpackChunkapp1_1_2_0||[]).push([[234],{234:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var r=n(264);const o={border:"10px solid red",padding:"10px"},l=e=>{const[t,n]=r.useState([]);return e.serviceComunication.receive.subscribe((e=>{n([...t,e])})),function(e){const{ready:t,failed:n}=(e=>{const[t,n]=r.useState(!1),[o,l]=r.useState(!1);return r.useEffect((()=>{if(!e.url)return;const t=document.createElement("script");return t.src=e.url,t.type="text/javascript",t.async=!0,n(!1),l(!1),t.onload=()=>{console.log(`Dynamic Script Loaded: ${e.url}`),n(!0)},t.onerror=()=>{console.error(`Dynamic Script Error: ${e.url}`),n(!1),l(!0)},document.head.appendChild(t),()=>{console.log(`Dynamic Script Removed: ${e.url}`),document.head.removeChild(t)}}),[e.url]),{ready:t,failed:o}})({url:e&&e.url});if(!e)return r.createElement("h2",null,"Please select one app");if(!t)return r.createElement("h2",null,"Loading dynamic script: ",e.url);if(n)return r.createElement("h2",null,"Failed to load dynamic script: ",e.url);const o=r.lazy((l=e.scope,a=e.module,console.log("loadComponent"),async()=>{await window.__webpack_init_sharing__("default");const e=window[l];return await e.init(window.__webpack_share_scopes__.default),(await window[l].get(a))()}));var l,a;r.Suspense,e.componentProps}({componentProps:{onNotification:t=>{e.serviceComunication.send.next(t)}},module:"ButtonNotification",scope:"components",url:"http://localhost:3004/remoteEntry.js"}),r.createElement("div",{style:o},r.createElement("h1",null,"App1"),r.createElement("hr",null),r.createElement("ul",null," ",t.map((e=>r.createElement("li",{key:e.id},e.id," - ",e.title)))))}}}]);