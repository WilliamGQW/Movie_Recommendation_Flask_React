(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,a){e.exports={SearchResult:"SearchResult_SearchResult__5QuyZ",Item:"SearchResult_Item__3Y-Cm",Button:"SearchResult_Button__39rp0"}},26:function(e,t,a){e.exports={Toolbar:"Toolbar_Toolbar__ApScI",Logo:"Toolbar_Logo__3Lk47"}},29:function(e,t,a){e.exports={Button:"Button_Button__3R1xi",Save:"Button_Save__2is0_",Delete:"Button_Delete__3VrNe"}},3:function(e,t,a){e.exports={NavigationItems:"NavigationItems_NavigationItems__1fnFX",Item:"NavigationItems_Item__6K2Ni",active:"NavigationItems_active__3EugU"}},41:function(e,t,a){e.exports=a.p+"static/media/movie-logo.71268b6e.png"},42:function(e,t,a){e.exports={Logo:"Logo_Logo__3Ec1t"}},43:function(e,t,a){e.exports={Content:"Layout_Content__PrDi6"}},44:function(e,t,a){e.exports={SearchResults:"SearchResults_SearchResults__2kZpi"}},46:function(e,t,a){e.exports=a(75)},56:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),c=a.n(l),o=a(14),s=(a(23),a(55),a(56),a(4)),i=a(5),u=a(7),m=a(6),d=function(e){return e.children},v=a(26),p=a.n(v),h=a(41),f=a.n(h),g=a(42),E=a.n(g),b=function(e){return r.a.createElement("div",{className:E.a.Logo},r.a.createElement("img",{src:f.a,alt:"WebsiteLogo"}))},y=a(3),_=a.n(y),w=function(e){return r.a.createElement("ul",{className:_.a.NavigationItems},r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/",exact:!0,activeClassName:_.a.active},"Search")),r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/explore",exact:!0,activeClassName:_.a.active},"Explore")),e.isAuthenticated?r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/post",activeClassName:_.a.active},"Post")):null,e.isAuthenticated?r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/recommendations",activeClassName:_.a.active},"Recommendations")):null,e.isAuthenticated?r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/logout",activeClassName:_.a.active},"LogOut")):r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/login",activeClassName:_.a.active},"SignIn")),e.isAuthenticated?null:r.a.createElement("li",{className:_.a.Item},r.a.createElement(o.b,{to:"/register",activeClassName:_.a.active},"Register")))},S=function(e){return r.a.createElement("header",{className:p.a.Toolbar},r.a.createElement("div",{className:p.a.Logo},r.a.createElement(b,null)),r.a.createElement("div",null,r.a.createElement(w,{isAuthenticated:e.isAuthenticated})))},I=a(43),N=a.n(I),j=a(17),O=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",isAuthenticated:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){if(localStorage.usertoken){var e=localStorage.usertoken,t=Object(j.a)(e);this.setState({email:t.identity.email,password:t.identity.password}),""!==this.state.email&&""!==this.state.password&&this.setState({isAuthenticated:!0})}}},{key:"render",value:function(){return r.a.createElement(d,null,r.a.createElement(S,{isAuthenticated:this.props.isAuthenticated}),r.a.createElement("main",{className:N.a.Content},this.props.children))}}]),a}(n.Component),k=a(12),C=a.n(k),x=function(e){return console.log("movie id is"),console.log(e.id),r.a.createElement("div",{className:C.a.SearchResult},r.a.createElement("div",{className:C.a.Item},e.name),r.a.createElement("div",{className:C.a.Item},e.genres),r.a.createElement("div",{className:C.a.Item},e.rating),r.a.createElement("button",{className:C.a.Button,onClick:function(){return e.clicked(e.id)}},"View Details"))},R=a(44),A=a.n(R),L=function(e){var t=e.results;return r.a.createElement("div",{className:A.a.SearchResults},r.a.createElement("div",{className:C.a.SearchResult},r.a.createElement("div",{className:C.a.Item},"Movie Name"),r.a.createElement("div",{className:C.a.Item},"Genres"),r.a.createElement("div",{className:C.a.Item},"Rating"),r.a.createElement("div",{className:C.a.Item},"Movie Page")),t.map((function(t){return r.a.createElement(x,{name:t[0],id:t[1],genres:t[2],rating:t[3],clicked:e.clicked})})))},T=a(15),H=a.n(T),F=function(e){return H.a.get("/search",{params:{name:e.name}}).then((function(e){return console.log("success"),e.data}))},D=function(e){return H.a.post("/login",{email:e.email,password:e.password}).then((function(e){return localStorage.setItem("usertoken",e.data),e.data})).catch((function(e){console.log(e)}))},B=function(e){return H.a.post("/register",{email:e.email,password:e.password}).then((function(e){return window.alert("Successfullt registered!"),e.data})).catch((function(e){window.alert("username or email already exists"),console.log(e)}))},M=function(e){return H.a.get("/getMovieInfo",{params:{mvId:e.mvId}}).then((function(e){return console.log("success"),e.data}))},P=function(e){return H.a.get("/checkUserFav",{params:{email:e.email,mvId:e.mvId}}).then((function(e){return console.log("success"),e.data})).catch((function(e){return e}))},U=function(e){return H.a.post("/addToFav",{email:e.email,mvId:e.mvId}).then((function(e){return console.log("Successfully added to Fav List"),e.data}))},J=function(e){return H.a.delete("/deleteFromFav",{email:e.email,mvId:e.mvId}).then((function(e){return console.log("Successfully delete from Fav List"),e.data}))},V=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={name:"",results:[]},e.componentDidMount=function(){e.setState({name:"",results:[]}),console.log(e.state)},e.onSubmit=function(t){t.preventDefault();var a={name:e.state.name};console.log(a),F(a).then((function(t){if(console.log("returned res",t),t.error)e.setState({results:[]});else{var a=t;e.setState({results:a})}}))},e.changeInputHandler=function(t){e.setState({name:t.target.value})},e.clickHandler=function(t){e.props.history.push("/movie/".concat(t))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{onChange:function(t){return e.changeInputHandler(t)},value:this.state.name}),r.a.createElement("button",null,"Search")),this.state.results?r.a.createElement(L,{results:this.state.results,clicked:this.clickHandler}):null)}}]),a}(n.Component),Y=a(29),Z=a.n(Y),G=function(e){return r.a.createElement("button",{className:[Z.a.Button,Z.a[e.btnType]].join(" "),onClick:function(){return e.clicked()}},e.children)},K=a(45),Q=function(e){var t=Object(n.useState)(!0),a=Object(K.a)(t,2),l=a[0],c=a[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:l?" icon-soucang2 soucang-color":"icon-soucang2",onClick:function(e){c(!l)}}))},W=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={title:"",id:"",genres:"",release_year:"",vote_average:"",original_language:"",runtime:"",directors:"",actors:"",overview:"",savedToFav:!1,btnType:"Save",email:""},e.componentDidMount=function(){console.log(e.props.mvId);var t={mvId:e.props.mvId};if(M(t).then((function(t){if(console.log("returned res",t),!t.error){var a=t[0];console.log(a),e.setState({title:a[0],id:a[1],genres:a[2],release_year:a[3],vote_average:a[4],original_language:a[5],runtime:a[6],directors:a[7],actors:a[8],overview:a[9]})}})),localStorage.usertoken){var a=localStorage.usertoken,n=Object(j.a)(a);e.setState({email:n.identity.email});var r={mvId:e.props.mvId,email:e.state.email};P(r).then((function(t){console.log("returned res",t),t.error||e.setState({savedToFav:!0})}))}},e.clickHandler=function(){if(e.state.savedToFav){if(e.setState({savedToFav:!1,btnType:"Save"}),e.state.email){var t={email:e.state.email,mvId:e.state.id};J(t).then((function(e){console.log(e)}))}}else if(e.setState({savedToFav:!0,btnType:"Delete"}),console.log("changed to delete"),e.state.email){var a={email:e.state.email,mvId:e.state.id};U(a).then((function(e){console.log(e)}))}},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,this.state.title),r.a.createElement("p",null,this.state.genres),r.a.createElement("p",null,"Year: ",this.state.release_year),r.a.createElement("p",null,"Rating: ",this.state.vote_average),r.a.createElement("p",null,"Language: ",this.state.original_language),r.a.createElement("p",null,"Runtime: ",this.state.runtime),r.a.createElement("div",null,"Directors: ",this.state.directors),r.a.createElement("div",null,"Cast: ",this.state.actors),r.a.createElement("p",null,"Overview: ",this.state.overview),r.a.createElement(G,{clicked:this.clickHandler.bind(this),btnType:this.state.btnType},"Like"),r.a.createElement(Q,null))}}]),a}(n.Component),X=a(21),q=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",error:{}},e.changeHandler=function(t){e.setState(Object(X.a)({},t.target.name,t.target.value))},e.submitHandler=function(t){t.preventDefault();var a={email:e.state.email,password:e.state.password};""!==e.state.username&&""!==e.state.password||window.alert("Please fill in all fields!"),D(a).then((function(t){"object"===typeof t?(window.alert("Account not found! Please try again"),localStorage.clear(),window.location.reload()):e.props.history.push("/")}))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){return e.submitHandler(t)}},r.a.createElement("div",null,r.a.createElement("label",null,"email"),r.a.createElement("input",{name:"email",type:"text",value:this.state.email,onChange:function(t){return e.changeHandler(t)}})),r.a.createElement("div",null,r.a.createElement("label",null,"password"),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.changeHandler(t)}})),r.a.createElement("button",null,"Log in")))}}]),a}(n.Component),z=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:""},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.usertoken,t=Object(j.a)(e);this.setState({email:t.identity.email})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("table",{className:"table col-md-6 mx-auto"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{className:"badge badge-dark text-white col-8"},"User: "),r.a.createElement("td",null,this.state.username))))),r.a.createElement("div",null,r.a.createElement("h3",null,"Favorite List")),r.a.createElement("div",null,r.a.createElement("h3",null,"Recommended Movies")))}}]),a}(n.Component),$=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={email:"",password:"",error:{}},e.changeHandler=function(t){e.setState(Object(X.a)({},t.target.name,t.target.value))},e.submitHandler=function(t){t.preventDefault();var a={email:e.state.email,password:e.state.password};""!==e.state.username&&""!==e.state.password||window.alert("Please fill in all fields!"),B(a).then((function(t){"object"===typeof t?e.props.history.push("/login"):localStorage.clear()}))},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){return e.submitHandler(t)}},r.a.createElement("div",null,r.a.createElement("label",null,"email"),r.a.createElement("input",{name:"email",type:"text",value:this.state.email,onChange:function(t){return e.changeHandler(t)}})),r.a.createElement("div",null,r.a.createElement("label",null,"password"),r.a.createElement("input",{name:"password",type:"password",value:this.state.password,onChange:function(t){return e.changeHandler(t)}})),r.a.createElement("button",null,"Register")))}}]),a}(n.Component),ee=a(2),te=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(O,null,r.a.createElement(ee.c,null,r.a.createElement(ee.a,{path:"/",exact:!0,component:V}),r.a.createElement(ee.a,{path:"/movie/:id",exact:!0,component:function(e){return r.a.createElement(W,{mvId:e.match.params.id})}}),r.a.createElement(ee.a,{path:"/login",exact:!0,component:q}),r.a.createElement(ee.a,{path:"/register",exact:!0,component:$}),r.a.createElement(ee.a,{path:"/profile",exact:!0,component:z}))))}}]),a}(n.Component),ae=Object(ee.f)(te);c.a.render(r.a.createElement(o.a,null,r.a.createElement(ae,null)),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.d1602062.chunk.js.map