(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{23:function(e,t,a){e.exports={Toolbar:"Toolbar_Toolbar__ApScI",Logo:"Toolbar_Logo__3Lk47"}},37:function(e,t,a){e.exports=a.p+"static/media/movie-logo.71268b6e.png"},38:function(e,t,a){e.exports={Logo:"Logo_Logo__3Ec1t"}},39:function(e,t,a){e.exports={Content:"Layout_Content__PrDi6"}},4:function(e,t,a){e.exports={NavigationItems:"NavigationItems_NavigationItems__1fnFX",Item:"NavigationItems_Item__6K2Ni",active:"NavigationItems_active__3EugU"}},40:function(e,t,a){e.exports={SearchResults:"SearchResults_SearchResults__2kZpi"}},42:function(e,t,a){e.exports=a(71)},52:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(17),l=a.n(r),s=a(10),o=(a(20),a(51),a(52),a(12)),i=a(13),m=a(15),u=a(14),v=function(e){return e.children},E=a(23),d=a.n(E),h=a(37),p=a.n(h),f=a(38),g=a.n(f),N=function(e){return c.a.createElement("div",{className:g.a.Logo},c.a.createElement("img",{src:p.a,alt:"WebsiteLogo"}))},_=a(4),b=a.n(_),I=function(e){return c.a.createElement("ul",{className:b.a.NavigationItems},c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/",exact:!0,activeClassName:b.a.active},"Search")),c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/explore",exact:!0,activeClassName:b.a.active},"Explore")),e.isAuthenticated?c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/post",activeClassName:b.a.active},"Post")):null,e.isAuthenticated?c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/recommendations",activeClassName:b.a.active},"Recommendations")):null,e.isAuthenticated?c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/logout",activeClassName:b.a.active},"LogOut")):c.a.createElement("li",{className:b.a.Item},c.a.createElement(s.b,{to:"/auth",activeClassName:b.a.active},"SignIn")))},S=function(e){return c.a.createElement("header",{className:d.a.Toolbar},c.a.createElement("div",{className:d.a.Logo},c.a.createElement(N,null)),c.a.createElement("div",null,c.a.createElement(I,{isAuthenticated:e.isAuthenticated})))},k=a(39),C=a.n(k),O=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return c.a.createElement(v,null,c.a.createElement(S,{isAuthenticated:this.props.token}),c.a.createElement("main",{className:C.a.Content},this.props.children))}}]),a}(n.Component),j=a(8),x=a.n(j),R=function(e){return c.a.createElement("div",{className:x.a.SearchResult},c.a.createElement("div",{className:x.a.Item},e.name),c.a.createElement("div",{className:x.a.Item},e.genres),c.a.createElement("div",{className:x.a.Item},e.rating),c.a.createElement("button",{className:x.a.Button,onClick:e.clicked(e.id)},"View Details"))},L=a(40),y=a.n(L),A=function(e){var t=e.results;return c.a.createElement("div",{className:y.a.SearchResults},c.a.createElement("div",{className:x.a.SearchResult},c.a.createElement("div",{className:x.a.Item},"Movie Name"),c.a.createElement("div",{className:x.a.Item},"Genres"),c.a.createElement("div",{className:x.a.Item},"Rating"),c.a.createElement("div",{className:x.a.Item},"Movie Page")),t.map((function(t){return c.a.createElement(R,{name:t.title,id:t.id,genres:t.genres,rating:t.vote_average,clicked:e.clicked})})))},T=a(41),w=a.n(T),B=function(e){return w.a.get("/search",{params:{name:e.name}}).then((function(e){return console.log("success"),e.data}))},D=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={name:"",results:[]},e.componentDidMount=function(){e.setState({name:"",results:[]}),console.log(e.state)},e.onSubmit=function(t){t.preventDefault();var a={name:e.state.name};console.log(a),B(a).then((function(t){if(console.log("returned res",t),t.error)e.setState({results:[]});else{var a=t;e.setState({results:a})}}))},e.changeInputHandler=function(t){e.setState({name:t.target.value})},e.clickHandler=function(e){console.log(e)},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:this.onSubmit},c.a.createElement("input",{onChange:function(t){return e.changeInputHandler(t)},value:this.state.name}),c.a.createElement("button",null,"Search")),this.state.results?c.a.createElement(A,{results:this.state.results,clicked:this.clickHandler}):null)}}]),a}(n.Component),H=a(2),M=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(O,null,c.a.createElement(H.c,null,c.a.createElement(H.a,{path:"/",exact:!0,component:D}))))}}]),a}(n.Component),P=Object(H.f)(M);l.a.render(c.a.createElement(s.a,null,c.a.createElement(P,null)),document.getElementById("root"))},8:function(e,t,a){e.exports={SearchResult:"SearchResult_SearchResult__5QuyZ",Item:"SearchResult_Item__3Y-Cm",Button:"SearchResult_Button__39rp0"}}},[[42,1,2]]]);
//# sourceMappingURL=main.0c40ecbd.chunk.js.map