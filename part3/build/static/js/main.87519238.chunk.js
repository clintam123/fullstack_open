(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t(17),a=t.n(c),o=t(8),u=t(3),i=t(0),s=function(e){var n=e.newSearch,t=e.handleSearchChange;return Object(i.jsxs)("form",{children:["filter shown with",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){return Object(i.jsxs)("form",{onSubmit:e.addPerson,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["number:"," ",Object(i.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.person,t=e.deletePerson;return Object(i.jsxs)("li",{children:[n.name," ",n.number," ",Object(i.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},h=function(e){return Object(i.jsx)("ul",{children:e.persons.filter((function(n){return n.name.toUpperCase().includes(e.newSearch.toUpperCase())})).map((function(n){return Object(i.jsx)(l,{person:n,deletePerson:e.deletePerson},n.id)}))})},b={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,margin:10},j={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,margin:10},f=function(e){var n=e.message;return null==n?null:n.includes("ERROR")?Object(i.jsx)("div",{style:j,children:n}):Object(i.jsx)("div",{style:b,children:n})},m=t(4),O=t.n(m),p="api/persons",g={getAll:function(){return O.a.get(p).then((function(e){return e.data}))},create:function(e){return O.a.post(p,e).then((function(e){return e.data}))},erase:function(e){return O.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return O.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))}},x=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(""),l=Object(u.a)(a,2),b=l[0],j=l[1],m=Object(r.useState)(""),O=Object(u.a)(m,2),p=O[0],x=O[1],w=Object(r.useState)(""),v=Object(u.a)(w,2),S=v[0],y=v[1],C=Object(r.useState)(null),R=Object(u.a)(C,2),k=R[0],N=R[1];Object(r.useEffect)((function(){g.getAll().then((function(e){c(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(f,{message:k}),Object(i.jsx)(s,{newSearch:S,handleSearchChange:function(e){y(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(d,{addPerson:function(e){e.preventDefault();var n={name:b,number:p,id:Math.floor(101*Math.random())};if(t.filter((function(e){return e.name===n.name})).length>0){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with the new one?"))){var r=t.find((function(e){return e.name===b}));g.update(r.id,Object(o.a)(Object(o.a)({},r),{},{number:p})).then((function(e){c(t.map((function(n){return n.name===b?e:n})))})).catch((function(e){N("ERROR: ".concat(e.response.data.error)),console.log(e.response.data)})),c(t),j(""),x(""),N("".concat(r.name," was successfully updated")),setTimeout((function(){N(null)}),6e3)}}else g.create(n).then((function(e){c(t.concat(e)),j(""),x(""),N("".concat(b," was successfully added")),setTimeout((function(){N(null)}),6e3)})).catch((function(e){N("ERROR: ".concat(e.response.data.error)),console.log(e.response.data)})),setTimeout((function(){N(null)}),6e3)},newName:b,handleNameChange:function(e){j(e.target.value)},newNumber:p,handleNumberChange:function(e){x(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(h,{persons:t,newSearch:S,deletePerson:function(e){var n=t.filter((function(n){return n.id===e})),r=n[0].name,a=n[0].id;window.confirm("Delete ".concat(r," ?"))&&(g.erase(a),N("".concat(r," was successfully deleted")),c(t.filter((function(n){return n.id!==e}))),setTimeout((function(){N(null)}),6e3))}})]})};a.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.87519238.chunk.js.map