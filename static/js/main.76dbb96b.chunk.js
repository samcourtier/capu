(this["webpackJsonpcapu-client"]=this["webpackJsonpcapu-client"]||[]).push([[0],{42:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var i=n(2),c=n.n(i),r=n(15),d=n.n(r),a=(n(42),n(28)),s=n(18),l=n(5),j=n(12),o=n(37),u=n(32),b=n(33),h=n(34);function m(e){return function(){return Object.values(e)}}function O(e){return function(t){return Object.values(e).find((function(e){return e.id===t}))}}var x={alice:{id:"191315df-2a80-46f6-977c-058b5a8719c5",displayName:"Alice A"},bob:{id:"1a31ec6c-5c02-4c16-8c2f-59c220e0a31e",displayName:"Bob B"},carol:{id:"158c5b1f-34e5-40ad-a5da-3f5da775e52a",displayName:"Carol C"}},f=m(x),p=O(x),v=m({0:{id:"da7fcf43-830b-4776-9d0e-22c7902048b8",submittedAt:new Date("2021-06-05 9:00"),submittedBy:x.alice,title:"Announcement 2",body:"Bob Loblau Law"},1:{id:"96483807-83f2-42fb-8837-ccc40910edf5",submittedAt:new Date("2021-06-01 9:00"),submittedBy:x.carol,title:"Announcement 1",body:"Blah blah blah blah"}}),g={mndot:{id:"886f18d2-8dbe-4d5e-85e4-63f9925c6668",name:"MnDOT"}},y=m(g),w={0:{sky:"Sunny",tempDegrees:65,dewpoint:50,wind:"E 1 mph",precipProb:5,expectedPrecipInches:.01}},A={mondo:{id:"08508be8-7850-4792-a7af-3b47fb1e6e6e",name:"Mondo"},midi:{id:"412e88e3-4358-4ac3-83f1-fac665cb3c20",name:"Midi"}},F=(m(A),{0:{id:"be819e33-1510-4ab4-867d-bccd8d6c1794",name:"Route A",description:"A route description",expectedMiles:50,expectedClimbingDifficulty:"hard"},1:{id:"30e14365-af7b-4907-9ff9-c509f4e78286",name:"Route B",description:"Another route description",expectedMiles:30,expectedClimbingDifficulty:"easy"}}),C=m(F),N={planned:{id:"01d3586b-cc73-4672-9669-71e504abbd7d",name:"Planned",description:"asdfad"},tentative:{id:"8d50e334-dbec-4fb7-a46e-04ee4ece0311",name:"Tentative",description:"fdsa"},canceled:{id:"e014a8c5-e245-48a4-848c-a095d210bae6",name:"Canceled",description:"qwer"}},S=m(N),T={0:{id:"0b3117e1-4309-4c46-84ad-bd25ecadf708",title:"A Mondo Ride",meetTime:new Date("2021-05-01 16:30"),meetPlace:g.mndot,description:"A ride description",weatherForecast:w[0],status:N.tentative,rideLevel:A.mondo,leaders:[x.alice,x.bob],route:F[0]},1:{id:"284d7258-ad88-454d-b8a6-e09589d0742e",title:"A Midi Ride",meetTime:new Date("2021-05-01 16:45"),meetPlace:g.mndot,weatherForecast:w[0],status:N.canceled,description:"Another ride description",rideLevel:A.midi,leaders:[x.carol],route:F[1]}},D=m(T),R=O(T),M={0:{id:"e41c27c6-7f10-49d3-9b26-07cf3556f3d6",title:"Trivia Night",meetTimeDescription:"After the rides",description:"Come drink with us!",meetPlace:{id:"d31473b3-dcdf-42b4-9816-f4b3ae8d9555",name:"Tin Whiskers"}}},B={wednesdayNightRides:{id:"5cdc401c-313e-479e-8ec6-5adf84a78027",name:"Wednesday Night Rides"}},E={0:{id:"951badf6-ab50-41f5-8320-1f4ea1f437d5",title:"Wednesday Night Ride",series:B.wednesdayNightRides,rides:Object.values(T),hangouts:Object.values(M)},1:{id:"Not 951badf6-ab50-41f5-8320-1f4ea1f437d5",title:"A Temporary Copypasta of the Other Event for Illustration",series:B.wednesdayNightRides,rides:Object.values(T),hangouts:Object.values(M)}},L=(m(E),[{year:2021,months:[{name:"July",dates:[{date:new Date("2021-07-01"),events:[E[0],E[1]]}]}]}]),P=n(3);function k(e){var t=e.user;return Object(P.jsxs)("nav",{children:[Object(P.jsx)(s.b,{to:"/",className:"text-blue-200",children:"[Cap U logo]"}),Object(P.jsxs)("ul",{children:[Object(P.jsx)("li",{children:Object(P.jsx)(s.b,{to:"/about",children:"About"})}),Object(P.jsx)("li",{children:Object(P.jsx)(s.b,{to:"/calendar",children:"Calendar"})})]}),t?Object(P.jsxs)(P.Fragment,{children:[t.displayName,Object(P.jsx)("button",{children:"Sign out"})]}):Object(P.jsx)(P.Fragment,{children:Object(P.jsx)("button",{children:"Sign in"})})]})}function W(e){var t=e.announcement;return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{children:t.title}),Object(P.jsxs)("div",{children:["Submitted ",t.submittedAt.toLocaleString()," by"," ",t.submittedBy.displayName]}),Object(P.jsx)("div",{children:t.body})]})}function I(){return Object(P.jsx)("ul",{children:v().map((function(e){return Object(P.jsx)("li",{children:Object(P.jsx)(W,{announcement:e})},e.id)}))})}function J(e){var t,n=e.ride;return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsxs)("div",{children:[n.rideLevel.name,": ",n.title]}),Object(P.jsxs)("div",{children:[(null===(t=n.meetTime)||void 0===t?void 0:t.toLocaleString())||n.meetTimeDescription," at"," ",n.meetPlace.name]}),Object(P.jsx)("p",{children:n.description}),Object(P.jsxs)("dl",{children:[Object(P.jsx)("dt",{children:"Status:"}),Object(P.jsx)("dd",{children:n.status.name}),Object(P.jsx)("dt",{children:"Route:"}),Object(P.jsxs)("dd",{children:[Object(P.jsx)("div",{children:n.route.name}),Object(P.jsx)("div",{children:n.route.description}),Object(P.jsxs)("dl",{children:[Object(P.jsx)("dt",{children:"Expected distance:"}),Object(P.jsxs)("dd",{children:["(about ",n.route.expectedMiles," miles)"]}),Object(P.jsx)("dt",{children:"Expected Climbing difficulty:"}),Object(P.jsx)("dd",{children:n.route.expectedClimbingDifficulty})]})]}),Object(P.jsx)("dt",{children:"Ride leaders:"}),Object(P.jsx)("dd",{children:Object(P.jsx)("ul",{children:n.leaders.map((function(e){return Object(P.jsx)("li",{children:e.displayName},e.id)}))})})]})]})}function U(e){var t=e.ride;return Object(P.jsx)(j.d,{initialValues:t,onSubmit:function(e,t){console.log({values:e,actions:t}),alert(JSON.stringify(e,null,2)),t.setSubmitting(!1)},children:function(e){var t=e.values;return Object(P.jsxs)(j.c,{children:[Object(P.jsx)("label",{htmlFor:"title",children:"Title"}),Object(P.jsx)(j.a,{id:"title",name:"title"}),Object(P.jsx)("label",{htmlFor:"meet-time",children:"Meet time"}),Object(P.jsx)(j.a,{type:"datetime-local",id:"meet-time",name:"meetTime"}),Object(P.jsx)("label",{htmlFor:"meet-place",children:"Meet place"}),Object(P.jsx)(j.a,{as:"select",id:"meet-place",name:"meetPlace.id",children:y().map((function(e){var t=e.id,n=e.name;return Object(P.jsx)("option",{value:t,children:n},t)}))}),Object(P.jsx)("label",{htmlFor:"description",children:"Description"}),Object(P.jsx)(j.a,{as:"textarea",id:"description",name:"description"}),Object(P.jsx)("label",{htmlFor:"status",children:"Status"}),Object(P.jsx)(j.a,{as:"select",id:"status",name:"status.id",children:S().map((function(e){var t=e.id,n=e.name;return Object(P.jsx)("option",{value:t,children:n},t)}))}),Object(P.jsx)("label",{htmlFor:"ride-level",children:"Ride Level"}),Object(P.jsx)(j.a,{as:"select",id:"ride-level",name:"rideLevel.id",children:S().map((function(e){var t=e.id,n=e.name;return Object(P.jsx)("option",{value:t,children:n},t)}))}),Object(P.jsx)(j.b,{name:"leaders",children:function(e){var n=e.remove,i=e.push;return Object(P.jsxs)("div",{children:[Object(P.jsx)("label",{htmlFor:"add-leader",children:"Add a leader"}),Object(P.jsxs)("select",{id:"add-leader",onChange:function(e){return i(p(e.target.value))},children:[Object(P.jsx)("option",{}),f().filter((function(e){var n=e.id;return!t.leaders.find((function(e){return e.id===n}))})).map((function(e){var t=e.id,n=e.displayName;return Object(P.jsx)("option",{value:t,children:n},t)}))]}),t.leaders.map((function(e,t){var i=e.id,c=e.displayName;return Object(P.jsxs)("li",{children:[Object(P.jsx)("label",{htmlFor:"values.".concat(t,".id"),children:c}),Object(P.jsx)(j.a,{name:"values.".concat(t,".id"),hidden:!0}),Object(P.jsx)("button",{onClick:function(){return n(t)},children:"X"})]},i)}))]})}}),Object(P.jsx)("label",{htmlFor:"route",children:"Route"}),Object(P.jsx)(j.a,{as:"select",id:"route",name:"route.id",children:C().map((function(e){var t=e.id,n=e.name;return Object(P.jsx)("option",{value:t,children:n},t)}))}),Object(P.jsx)("button",{type:"submit",children:"Submit"})]})}})}function V(e){var t=e.rides;return Object(P.jsx)("ul",{children:t.map((function(e){return Object(P.jsx)("li",{children:Object(P.jsx)(J,{ride:e})},e.id)}))})}function q(e){var t,n=e.hangout;return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{children:n.title}),Object(P.jsxs)("div",{children:[(null===(t=n.meetTime)||void 0===t?void 0:t.toLocaleString())||n.meetTimeDescription," at"," ",n.meetPlace.name]}),Object(P.jsx)("p",{children:n.description})]})}function G(e){var t=e.hangouts;return Object(P.jsx)("ul",{children:t.map((function(e){return Object(P.jsx)("li",{children:Object(P.jsx)(q,{hangout:e})},e.id)}))})}function H(e){var t=e.groupEvent;return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{children:t.title}),Object(P.jsxs)("dl",{children:[Object(P.jsx)("dt",{children:"Event series:"}),Object(P.jsx)("dd",{children:t.series.name})]}),Object(P.jsxs)("dl",{children:[Object(P.jsx)("dt",{children:"Event Rides: "}),Object(P.jsx)("dd",{children:Object(P.jsx)(V,{rides:t.rides})}),Object(P.jsx)("dt",{children:"Event Hangouts: "}),Object(P.jsx)("dd",{children:Object(P.jsx)(G,{hangouts:t.hangouts})})]})]})}function X(e){var t=e.groupEvents;return Object(P.jsx)("ul",{children:t.map((function(e){return Object(P.jsx)("li",{children:Object(P.jsx)(H,{groupEvent:e})},e.id)}))})}function $(){var e=Object(l.f)();return Object(P.jsx)(o.a,{plugins:[u.a,b.a,h.a],headerToolbar:{left:"prev,next today",center:"title",right:"listMonth,dayGridMonth"},initialView:"listMonth",events:D().map((function(e){return Object(a.a)(Object(a.a)({},e),{},{start:e.meetTime})})),eventContent:function(e){return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("b",{children:e.timeText}),e.event.title," (",e.event.extendedProps.rideLevel.name,")"]})},eventClick:function(t){return e.push("/rides/"+t.event.id)}})}function z(){return Object(P.jsx)("ul",{children:L.map((function(e){return Object(P.jsxs)("li",{children:[e.year,Object(P.jsx)("ul",{children:e.months.map((function(e){return Object(P.jsxs)("li",{children:[e.name,Object(P.jsx)("ul",{children:e.dates.map((function(e){return Object(P.jsxs)("li",{children:[e.date.toLocaleDateString(),Object(P.jsx)(X,{groupEvents:e.events})]},e.date.toISOString())}))})]},e.name)}))})]},e.year)}))})}function K(){return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("h2",{children:"Announcements"}),Object(P.jsx)(I,{}),Object(P.jsx)("h2",{children:"Upcoming events"}),"[Some abbreviated version of the event calendar]"]})}function Q(){return Object(P.jsx)(P.Fragment,{children:"Cap U is such and such..."})}function Y(){var e=Object(l.g)();return Object(P.jsx)("div",{children:Object(P.jsxs)("h3",{children:["No match for ",Object(P.jsx)("code",{children:e.pathname})]})})}var Z=function(){var e=function(){var e=Object(l.h)().id,t=R(e);return t?Object(P.jsx)(J,{ride:t}):Object(P.jsx)(Y,{})};return Object(P.jsxs)(s.a,{basename:"/capu",children:[Object(P.jsx)(k,{user:{id:"asdf",displayName:"Test User"}}),Object(P.jsxs)(l.c,{children:[Object(P.jsxs)(l.a,{exact:!0,path:"/",children:[Object(P.jsx)(K,{}),Object(P.jsx)("h2",{children:"Add ride form draft"}),Object(P.jsx)(U,{ride:T[0]}),Object(P.jsx)("h2",{children:"First Draft of Calendar"}),Object(P.jsx)(z,{})]}),Object(P.jsx)(l.a,{path:"/about",children:Object(P.jsx)(Q,{})}),Object(P.jsx)(l.a,{path:"/calendar",children:Object(P.jsx)($,{})}),Object(P.jsx)(l.a,{path:"/rides/:id",children:Object(P.jsx)(e,{})}),Object(P.jsx)(l.a,{path:"*",children:Object(P.jsx)(Y,{})})]})]})},_=n(19),ee=n(27),te=n.n(ee),ne=n(35);function ie(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var ce=Object(_.b)("counter/fetchCount",function(){var e=Object(ne.a)(te.a.mark((function e(t){var n;return te.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ie(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),re=Object(_.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(ce.pending,(function(e){e.status="loading"})).addCase(ce.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),de=re.actions,ae=(de.increment,de.decrement,de.incrementByAmount,re.reducer),se=Object(_.a)({reducer:{counter:ae}}),le=n(36);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));d.a.render(Object(P.jsx)(c.a.StrictMode,{children:Object(P.jsx)(le.a,{store:se,children:Object(P.jsx)(Z,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[52,1,2]]]);
//# sourceMappingURL=main.76dbb96b.chunk.js.map