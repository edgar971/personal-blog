(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{149:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return g});n(52);var a=n(8),r=n.n(a),i=n(0),o=n.n(i),c=n(153),u=n(169),s=n.n(u),l=n(167),d=n.n(l),p=n(164),m=n(166),f=n(152),h=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=s()(this,"props.data.site.siteMetadata.title"),t=s()(this,"props.data.site.siteMetadata.description"),n=s()(this,"props.data.allMarkdownRemark.edges");return o.a.createElement(m.a,{location:this.props.location},o.a.createElement(d.a,{htmlAttributes:{lang:"en"},meta:[{name:"description",content:t}],title:e}),o.a.createElement(p.a,null),n.map(function(e){var t=e.node,n=s()(t,"frontmatter.title")||t.fields.slug;return o.a.createElement("div",{key:t.fields.slug},o.a.createElement("h3",{style:{marginBottom:Object(f.a)(.25)}},o.a.createElement(c.Link,{style:{boxShadow:"none"},to:t.fields.slug},n)),o.a.createElement("small",null,t.frontmatter.date),o.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.excerpt}}))}))},t}(o.a.Component);t.default=h;var g="3352422197"},152:function(e,t,n){"use strict";n.d(t,"a",function(){return u}),n.d(t,"b",function(){return s});var a=n(175),r=n.n(a),i=n(176),o=n.n(i);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var c=new r.a(o.a);var u=c.rhythm,s=c.scale},153:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return m}),n.d(t,"StaticQuery",function(){return f});var a=n(0),r=n.n(a),i=n(5),o=n.n(i),c=n(151),u=n.n(c);n.d(t,"Link",function(){return u.a}),n.d(t,"withPrefix",function(){return c.withPrefix}),n.d(t,"navigate",function(){return c.navigate}),n.d(t,"push",function(){return c.push}),n.d(t,"replace",function(){return c.replace}),n.d(t,"navigateTo",function(){return c.navigateTo});var s=n(27);n.d(t,"waitForRouteChange",function(){return s.c});var l=n(154),d=n.n(l);n.d(t,"PageRenderer",function(){return d.a});var p=n(40);n.d(t,"parsePath",function(){return p.a});var m=r.a.createContext({}),f=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},154:function(e,t,n){var a;e.exports=(a=n(159))&&a.default||a},159:function(e,t,n){"use strict";n.r(t);n(38);var a=n(0),r=n.n(a),i=n(5),o=n.n(i),c=n(56),u=n(1),s=function(e){var t=e.location,n=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},164:function(e,t,n){"use strict";var a=n(8),r=n.n(a),i=n(0),o=n.n(i),c=(n(173),n(174),n(165)),u=n.n(c),s=n(152),l=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{style:{display:"flex",marginBottom:Object(s.a)(2.5)}},o.a.createElement("img",{src:u.a,alt:"Edgar Pino",style:{marginRight:Object(s.a)(.5),marginBottom:0,borderRadius:"50%",width:Object(s.a)(2),height:Object(s.a)(2)}}),o.a.createElement("p",null,"Software Engineer @Pluralsight. Interested in distributed systems, machine learning, and the web."," ",o.a.createElement("a",{href:"https://twitter.com/edgar971"},"Follow me on Twitter.")))},t}(o.a.Component);t.a=l},165:function(e,t,n){e.exports=n.p+"static/profile-pic-d431fbd3a6c128e3f19f18e0e2386b37.jpg"},166:function(e,t,n){"use strict";n(38);var a=n(8),r=n.n(a),i=n(0),o=n.n(i),c=n(153),u=n(152),s=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e,t=this.props,n=t.location,a=t.children;return e="/"===n.pathname?o.a.createElement("h1",{style:Object.assign({},Object(u.b)(1.5),{marginBottom:Object(u.a)(1.5),marginTop:0})},o.a.createElement(c.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Edgar Pino")):o.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:Object(u.a)(-1)}},o.a.createElement(c.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Edgar Pino")),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{background:"#F55",width:"100%",height:Object(u.a)(.07)}}),o.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(u.a)(24),padding:Object(u.a)(1.5)+" "+Object(u.a)(.75)}},e,a))},t}(o.a.Component);t.a=s}}]);
//# sourceMappingURL=component---src-pages-index-js-19bf76cd8180d13cda1a.js.map