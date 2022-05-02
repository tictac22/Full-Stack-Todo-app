"use strict";(self.webpackChunktodo_registration=self.webpackChunktodo_registration||[]).push([[139],{8326:function(e,r,t){t.d(r,{e:function(){return u}});var n=t(87522);function o(e,r,t,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void t(e)}u.done?r(s):Promise.resolve(s).then(n,o)}function a(e){return function(){var r=this,t=arguments;return new Promise((function(n,a){var i=e.apply(r,t);function u(e){o(i,n,a,u,s,"next",e)}function s(e){o(i,n,a,u,s,"throw",e)}u(void 0)}))}}function i(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e)}var r,t,o,u,s,c,l,p;return r=e,t=null,o=[{key:"registration",value:(p=a(regeneratorRuntime.mark((function e(r,t,o){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.hi.post("/user/registration",{name:r,password:o,email:t});case 3:return a=e.sent,localStorage.setItem("token",a.data.accessToken),e.abrupt("return",a.data);case 8:if(e.prev=8,e.t0=e.catch(0),!(e.t0.status=500)){e.next=12;break}return e.abrupt("return",e.t0.response.data);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),function(e,r,t){return p.apply(this,arguments)})},{key:"login",value:(l=a(regeneratorRuntime.mark((function e(r,t){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.hi.post("/user/login",{password:t,email:r});case 3:return o=e.sent,localStorage.setItem("token",o.data.accessToken),e.abrupt("return",o.data);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),function(e,r){return l.apply(this,arguments)})},{key:"isAuth",value:(c=a(regeneratorRuntime.mark((function e(){var r,t,o,a,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,localStorage.getItem("token")){e.next=3;break}return e.abrupt("return","");case 3:return e.next=5,n.hi.get("/user/refresh");case 5:return r=e.sent,localStorage.setItem("token",r.data.accessToken),e.abrupt("return",r.data.user);case 10:return e.prev=10,e.t0=e.catch(0),t=e.t0.response.data,o=t.message,a=t.type,i=t.errors,e.abrupt("return",{message:o,type:a,errors:i});case 14:case"end":return e.stop()}}),e,null,[[0,10]])}))),function(){return c.apply(this,arguments)})},{key:"forgotPassword",value:(s=a(regeneratorRuntime.mark((function e(r){var t,o,a,i,u,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.email,o=r.password,e.prev=1,e.next=4,n.hi.post("/user/resetpassword",{email:t,password:o});case 4:e.next=10;break;case 6:throw e.prev=6,e.t0=e.catch(1),a=e.t0.response.data,i=a.message,u=a.type,s=a.errors,new n.qL(i,u,s);case 10:case"end":return e.stop()}}),e,null,[[1,6]])}))),function(e){return s.apply(this,arguments)})},{key:"validateToken",value:(u=a(regeneratorRuntime.mark((function e(r){var t,o,a,i,u,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.hi.post("/user/validatetoken",{token:r});case 3:return t=e.sent,o=t.data,e.abrupt("return",o);case 8:throw e.prev=8,e.t0=e.catch(0),a=e.t0.response.data,i=a.message,u=a.type,s=a.errors,new n.qL(i,u,s);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),function(e){return u.apply(this,arguments)})}],t&&i(r.prototype,t),o&&i(r,o),Object.defineProperty(r,"prototype",{writable:!1}),e}()},87522:function(e,r,t){t.d(r,{hi:function(){return v},qL:function(){return y}});var n=t(9669),o=t.n(n);function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function i(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,r){if(r&&("object"===a(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function s(e){var r="function"==typeof Map?new Map:void 0;return s=function(e){if(null===e||(t=e,-1===Function.toString.call(t).indexOf("[native code]")))return e;var t;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(e))return r.get(e);r.set(e,n)}function n(){return c(e,arguments,f(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,e)},s(e)}function c(e,r,t){return c=l()?Reflect.construct:function(e,r,t){var n=[null];n.push.apply(n,r);var o=new(Function.bind.apply(e,n));return t&&p(o,t.prototype),o},c.apply(null,arguments)}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function p(e,r){return p=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e},p(e,r)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function m(e,r,t,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void t(e)}u.done?r(s):Promise.resolve(s).then(n,o)}var d="http://localhost:5000",v=o().create({withCredentials:!0,baseURL:d});v.interceptors.request.use((function(e){return e.headers.Authorization="Bearer ".concat(localStorage.getItem("token")),e})),v.interceptors.response.use((function(e){return e}),function(){var e,r=(e=regeneratorRuntime.mark((function e(r){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.config,401!==r.response.status||!t||t.retry){e.next=13;break}return t.retry=!0,e.prev=3,e.next=6,o().get("".concat(d,"/user/refresh"),{withCredentials:!0});case 6:return n=e.sent,localStorage.setItem("token",n.data.accessToken),e.abrupt("return",v.request(t));case 11:e.prev=11,e.t0=e.catch(3);case 13:throw r;case 14:case"end":return e.stop()}}),e,null,[[3,11]])})),function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function i(e){m(a,n,o,i,u,"next",e)}function u(e){m(a,n,o,i,u,"throw",e)}i(void 0)}))});return function(e){return r.apply(this,arguments)}}());var y=function(e){!function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&p(e,r)}(c,e);var r,t,n,o,a,s=(r=c,t=l(),function(){var e,n=f(r);if(t){var o=f(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return u(this,e)});function c(e,r,t){var n;return function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,c),(n=s.call(this,e)).message=e,n.type=r,n.errors=t,n}return n=c,o&&i(n.prototype,o),a&&i(n,a),Object.defineProperty(n,"prototype",{writable:!1}),n}(s(Error))},97581:function(e,r,t){t.d(r,{x:function(){return a}});var n=t(67294),o=t(71508),a=function(e){var r=e.children;return n.createElement("div",{className:"form__wrapper"},n.createElement(o.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"800px"}},r))}},6733:function(e,r,t){t.d(r,{U:function(){return u}});var n=t(67294),o=t(87536),a=t(99632);function i(){return i=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},i.apply(this,arguments)}var u=(0,n.memo)((function(e){var r=e.label,t=e.fieldName,u=e.autoComplete,s=e.control,c=e.errors,l=e.register,p=e.type;return n.createElement(o.Qr,{defaultValue:"",name:t,control:s,render:function(){var e,o;return n.createElement(a.Z,i({},l(t),{error:!(null==c||null===(e=c[t])||void 0===e||!e.message),helperText:null==c||null===(o=c[t])||void 0===o?void 0:o.message,margin:"normal",fullWidth:!0,id:t,label:r,name:t,type:null!=p?p:"text",autoComplete:u}))}})}))},72016:function(e,r,t){t.d(r,{M8:function(){return a},NA:function(){return i},tp:function(){return o}});var n=t(19501);n.kM(n.Z_,"stripEmptyString",(function(){return this.transform((function(e){return""===e?" ":e}))}));var o=n.Ry({name:n.Z_().required().min(2,"at least 2 characters"),email:n.Z_().required().email("invalid type of email"),password:n.Z_().required().min(7,"at least 7 characters"),confirmPassword:n.Z_().oneOf([n.iH("password"),null],"passwords are not matched").stripEmptyString()}).required(),a=n.Ry({email:n.Z_().required().email("invalid type of email"),password:n.Z_().required().min(7,"at least 7 characters")}).required(),i=n.Ry({email:n.Z_().required().email("invalid type of email"),password:n.Z_().required().min(7,"at least 7 characters"),confirmPassword:n.Z_().oneOf([n.iH("password"),null],"passwords are not matched").stripEmptyString()}).required()},27139:function(e,r,t){t.r(r),t.d(r,{Login:function(){return v}});var n=t(67294),o=t(96974),a=t(39711),i=t(97581),u=t(2658),s=t(24551),c=t(87536),l=t(28834),p=t(6733),f=t(72016),m=t(8326);function d(e,r,t,n,o,a,i){try{var u=e[a](i),s=u.value}catch(e){return void t(e)}u.done?r(s):Promise.resolve(s).then(n,o)}var v=function(){var e=(0,o.s0)(),r=(0,c.cI)({resolver:(0,l.X)(f.M8),mode:"all"}),t=r.control,v=r.register,y=r.handleSubmit,h=r.formState.errors,g=r.setError,w=function(){var r,t=(r=regeneratorRuntime.mark((function r(t){var n,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,m.e.login(t.email,t.password);case 2:"formFields"===(null==(o=r.sent)||null===(n=o.data)||void 0===n?void 0:n.type)?(g("email",{type:"email",message:o.data.message}),g("password",{type:"password",message:o.data.message})):e("/",{replace:!0});case 4:case"end":return r.stop()}}),r)})),function(){var e=this,t=arguments;return new Promise((function(n,o){var a=r.apply(e,t);function i(e){d(a,n,o,i,u,"next",e)}function u(e){d(a,n,o,i,u,"throw",e)}i(void 0)}))});return function(e){return t.apply(this,arguments)}}();return n.createElement(i.x,null,n.createElement(u.Z,{component:"h1"},"Sign In"),n.createElement("form",{onSubmit:y(w)},n.createElement(p.U,{label:"Email",fieldName:"email",autoComplete:"email",control:t,register:v,errors:h}),n.createElement(p.U,{type:"password",label:"Password",fieldName:"password",autoComplete:"current-password",control:t,register:v,errors:h}),n.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}},n.createElement(a.rU,{to:"/password"},n.createElement(u.Z,{sx:{marginRight:"20px",textAlign:"right",display:"block",textDecoration:"underline",color:"rgb(38 128 216)"}},"Forgot password?")),n.createElement(a.rU,{to:"/registration"},n.createElement(u.Z,{sx:{textAlign:"right",display:"block",textDecoration:"underline",color:"rgb(38 128 216)"}},"Don't have an account? Sign Up"))),n.createElement(s.Z,{sx:{marginTop:"15px",width:"100%"},type:"submit",variant:"contained"},"SIGN IN")))}}}]);