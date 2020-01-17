(this.webpackJsonptest2=this.webpackJsonptest2||[]).push([[0],{15:function(e,n,t){e.exports=t(42)},41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),o=t(4),l=t(2),i=function(e){var n=e.persons,t=e.filterName,a=e.deletePerson,u=n.filter((function(e){return""===t||e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return e.isActive?r.a.createElement("li",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{id:e.id,value:e.name,onClick:function(){return a(e.id)},type:"button"},"delete")):""}));return r.a.createElement("ul",null,u)},m=function(e){var n=e.searchName,t=e.filterName;return r.a.createElement("div",null,r.a.createElement("h2",null,"Search"),"Search by name: ",r.a.createElement("input",{value:t,onChange:n}))},d=function(e){var n=e.addNumber,t=e.newName,a=e.newNumber,u=e.handleNameOnChange,c=e.handleNumberOnChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:t,placeholder:"name",required:!0,onChange:u})),r.a.createElement("br",null),r.a.createElement("div",null,"Number: ",r.a.createElement("input",{value:a,placeholder:"number",required:!0,onChange:c})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")),r.a.createElement("br",null)))},f=t(3),s=t.n(f),h="http://localhost:3001/api/persons",b=function(){return s.a.get(h).then((function(e){return e.data}))},v=function(e){return s.a.post(h,e).then((function(e){return e.data}))},E=function(e,n){return s.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},p=function(e,n){return s.a.delete("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)(""),n=Object(l.a)(e,2),u=n[0],c=n[1],f=Object(a.useState)(""),s=Object(l.a)(f,2),h=s[0],g=s[1],w=Object(a.useState)(""),N=Object(l.a)(w,2),O=N[0],j=N[1],y=Object(a.useState)([]),S=Object(l.a)(y,2),C=S[0],k=S[1],T=Object(a.useState)(null),A=Object(l.a)(T,2),P=A[0],q=A[1],J=Object(a.useState)(null),L=Object(l.a)(J,2),x=L[0],B=L[1],D=t(38);Object(a.useEffect)((function(){b().then((function(e){k(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement((function(e){var n,t=e.message,a=e.error;return t&&(n="confirm"),a&&(n="error"),r.a.createElement("div",{className:n},a,t)}),{message:P,error:x}),r.a.createElement(m,{searchName:function(e){j(e.target.value)},filterName:O}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(d,{addNumber:function(e){e.preventDefault();for(var n=0;n<C.length;n++)if(e.target[0].value===C[n].name){if(!window.confirm("".concat(C[n].name," is already added to phonebook, would you like to replace the old number with a new one?")))return;var t=function(){var t=C[n].id,a=C.find((function(e){return e.id===t})),r=Object(o.a)({},a,{number:e.target[1].value});return E(t,r).then((function(e){k(C.map((function(n){return n.id!==t?n:e}))),q("Number has been changed for ".concat(a.name)),setTimeout((function(){q(null)}),5e3)})).catch((function(e){B("Something went wrong and we couldn't add ".concat(a.name," to list")),setTimeout((function(){B(null)}),5e3)})),{v:void 0}}();if("object"===typeof t)return t.v}var a={name:u,number:h.toString(),isActive:!0,id:D()};v(a).then((function(e){k(C.concat(e)),c(""),g(""),q("".concat(e.name," has been successfully added to list")),setTimeout((function(){q(null)}),5e3)})).catch((function(e){B("Something went wrong and we couldn't add ".concat(a.name," to list")),setTimeout((function(){B(null)}),5e3)}))},newName:u,newNumber:h,handleNameOnChange:function(e){c(e.target.value)},handleNumberOnChange:function(e){g(e.target.value),console.log(h)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{persons:C,filterName:O,deletePerson:function(e){var n=C.find((function(n){return n.id===e})),t=Object(o.a)({},n,{isActive:!n.isActive});window.confirm("Are you sure you want to delete ".concat(t.name))&&p(e,t).then((function(t){k(C.map((function(n){return n.id!==e?n:t}))),q("".concat(n.name," has been deleted successfully")),c(""),g(""),setTimeout((function(){q(null)}),5e3)})).catch((function(t){B("The person ".concat(n.name," was already been removed from the server")),setTimeout((function(){B(null)}),5e3),k(C.filter((function(n){return n.id!==e})))}))}}))};t(41);c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f73012f3.chunk.js.map