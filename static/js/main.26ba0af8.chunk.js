(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{24:function(e,t,a){e.exports={Toolbar:"Toolbar_Toolbar__ApScI",Logo:"Toolbar_Logo__3Lk47"}},27:function(e,t,a){e.exports={Button:"Button_Button__3R1xi",Save:"Button_Save__2is0_",Delete:"Button_Delete__3VrNe"}},39:function(e,t,a){e.exports=a.p+"static/media/movie-logo.71268b6e.png"},4:function(e,t,a){e.exports={NavigationItems:"NavigationItems_NavigationItems__1fnFX",Item:"NavigationItems_Item__6K2Ni",active:"NavigationItems_active__3EugU"}},40:function(e,t,a){e.exports={Logo:"Logo_Logo__3Ec1t"}},41:function(e,t,a){e.exports={Content:"Layout_Content__PrDi6"}},42:function(e,t,a){e.exports={SearchResults:"SearchResults_SearchResults__2kZpi"}},44:function(e,t,a){e.exports=a(73)},54:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(18),l=a.n(r),s=a(10),i=(a(21),a(53),a(54),a(11)),o=a(12),u=a(14),m=a(13),v=function(e){return e.children},d=a(24),h=a.n(d),p=a(39),E=a.n(p),g=a(40),f=a.n(g),_=function(e){return c.a.createElement("div",{className:f.a.Logo},c.a.createElement("img",{src:E.a,alt:"WebsiteLogo"}))},b=a(4),N=a.n(b),I=function(e){return c.a.createElement("ul",{className:N.a.NavigationItems},c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/",exact:!0,activeClassName:N.a.active},"Search")),c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/explore",exact:!0,activeClassName:N.a.active},"Explore")),e.isAuthenticated?c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/post",activeClassName:N.a.active},"Post")):null,e.isAuthenticated?c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/recommendations",activeClassName:N.a.active},"Recommendations")):null,e.isAuthenticated?c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/logout",activeClassName:N.a.active},"LogOut")):c.a.createElement("li",{className:N.a.Item},c.a.createElement(s.b,{to:"/auth",activeClassName:N.a.active},"SignIn")))},S=function(e){return c.a.createElement("header",{className:h.a.Toolbar},c.a.createElement("div",{className:h.a.Logo},c.a.createElement(_,null)),c.a.createElement("div",null,c.a.createElement(I,{isAuthenticated:e.isAuthenticated})))},O=a(41),j=a.n(O),k=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement(v,null,c.a.createElement(S,{isAuthenticated:this.props.token}),c.a.createElement("main",{className:j.a.Content},this.props.children))}}]),a}(n.Component),y=a(8),C=a.n(y),x=function(e){return console.log("movie id is"),console.log(e.id),c.a.createElement("div",{className:C.a.SearchResult},c.a.createElement("div",{className:C.a.Item},e.name),c.a.createElement("div",{className:C.a.Item},e.genres),c.a.createElement("div",{className:C.a.Item},e.rating),c.a.createElement("button",{className:C.a.Button,onClick:function(){return e.clicked(e.id)}},"View Details"))},R=a(42),T=a.n(R),L=function(e){var t=e.results;return c.a.createElement("div",{className:T.a.SearchResults},c.a.createElement("div",{className:C.a.SearchResult},c.a.createElement("div",{className:C.a.Item},"Movie Name"),c.a.createElement("div",{className:C.a.Item},"Genres"),c.a.createElement("div",{className:C.a.Item},"Rating"),c.a.createElement("div",{className:C.a.Item},"Movie Page")),t.map((function(t){return c.a.createElement(x,{name:t.title,id:t.id,genres:t.genres,rating:t.vote_average,clicked:e.clicked})})))},B=a(43),A=a.n(B),D=function(e){return A.a.get("/search",{params:{name:e.name}}).then((function(e){return console.log("success"),e.data}))},w=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={name:"",results:[]},e.componentDidMount=function(){e.setState({name:"",results:[]}),console.log(e.state)},e.onSubmit=function(t){t.preventDefault();var a={name:e.state.name};console.log(a),D(a).then((function(t){if(console.log("returned res",t),t.error)e.setState({results:[]});else{var a=t;e.setState({results:a})}}))},e.changeInputHandler=function(t){e.setState({name:t.target.value})},e.clickHandler=function(t){e.props.history.push("/movie/".concat(t))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:this.onSubmit},c.a.createElement("input",{onChange:function(t){return e.changeInputHandler(t)},value:this.state.name}),c.a.createElement("button",null,"Search")),this.state.results?c.a.createElement(L,{results:this.state.results,clicked:this.clickHandler}):null)}}]),a}(n.Component),H=a(17),F=a(27),M=a.n(F),P=function(e){return c.a.createElement("button",{className:[M.a.Button,M.a[e.btnType]].join(" "),onClick:function(){return e.clicked()}},e.children)},J=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e,n;Object(i.a)(this,a);for(var c=arguments.length,r=new Array(c),l=0;l<c;l++)r[l]=arguments[l];return(n=t.call.apply(t,[this].concat(r))).state=(e={id:1,genres:"",release_year:2e3,vote_average:0,original_language:"",runtime:100,directors:"",actors:""},Object(H.a)(e,"actors",""),Object(H.a)(e,"overview",""),Object(H.a)(e,"savedToFav",!1),Object(H.a)(e,"btnType","Save"),e),n.componentDidMount=function(){console.log(n.props.mvId)},n.clickHandler=function(){0==n.savedToFav?n.setState({savedToFav:!0,btnType:"Delete"}):n.setState({savedToFav:!1,btnType:"Save"})},n}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("h3",null,this.state.title),c.a.createElement("p",null,this.state.genres),c.a.createElement("p",null,"Year: ",this.state.release_year),c.a.createElement("p",null,"Rating: ",this.state.vote_average),c.a.createElement("p",null,"Language: ",this.state.original_language),c.a.createElement("p",null,"Runtime: ",this.state.runtime),c.a.createElement("div",null,"Directors: ",this.state.directors),c.a.createElement("div",null,"Cast: ",this.state.actors),c.a.createElement("p",null,"Overview: ",this.state.overview),c.a.createElement(P,{clicked:this.clickHandler,btnType:this.state.btnType},"Like"))}}]),a}(n.Component),V=a(2),Y=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(k,null,c.a.createElement(V.c,null,c.a.createElement(V.a,{path:"/",exact:!0,component:w}),c.a.createElement(V.a,{path:"/movie/:id",exact:!0,component:function(e){return c.a.createElement(J,{mvId:e.match.params.id})}}))))}}]),a}(n.Component),Z=Object(V.f)(Y);l.a.render(c.a.createElement(s.a,null,c.a.createElement(Z,null)),document.getElementById("root"))},8:function(e,t,a){e.exports={SearchResult:"SearchResult_SearchResult__5QuyZ",Item:"SearchResult_Item__3Y-Cm",Button:"SearchResult_Button__39rp0"}}},[[44,1,2]]]);
//# sourceMappingURL=main.26ba0af8.chunk.js.map