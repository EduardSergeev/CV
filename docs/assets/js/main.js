!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=5)}([function(t,e){t.exports=jQuery},function(t,e,s){"use strict";var n=s(0),i=s.n(n);const r="transitionend";function l(t){let e=!1;return i()(this).one(o.TRANSITION_END,(()=>{e=!0})),setTimeout((()=>{e||o.triggerTransitionEnd(this)}),t),this}const o={TRANSITION_END:"bsTransitionEnd",getUID(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement(t){let e=t.getAttribute("data-target");if(!e||"#"===e){const s=t.getAttribute("href");e=s&&"#"!==s?s.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement(t){if(!t)return 0;let e=i()(t).css("transition-duration"),s=i()(t).css("transition-delay");const n=parseFloat(e),r=parseFloat(s);return n||r?(e=e.split(",")[0],s=s.split(",")[0],1e3*(parseFloat(e)+parseFloat(s))):0},reflow:t=>t.offsetHeight,triggerTransitionEnd(t){i()(t).trigger(r)},supportsTransitionEnd:()=>Boolean(r),isElement:t=>(t[0]||t).nodeType,typeCheckConfig(t,e,s){for(const i in s)if(Object.prototype.hasOwnProperty.call(s,i)){const r=s[i],l=e[i],a=l&&o.isElement(l)?"element":null==(n=l)?""+n:{}.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(r).test(a))throw new Error(t.toUpperCase()+": "+`Option "${i}" provided type "${a}" `+`but expected type "${r}".`)}var n},findShadowRoot(t){if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?o.findShadowRoot(t.parentNode):null},jQueryDetection(){if(void 0===i.a)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");const t=i.a.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||t[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};o.jQueryDetection(),i.a.fn.emulateTransitionEnd=l,i.a.event.special[o.TRANSITION_END]={bindType:r,delegateType:r,handle(t){if(i()(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}},e.a=o},,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const n=s(0);s(6),s(7),n((function(){n("#content h2, #content h3").not(".nav-exclude").each((function(){n("nav ul").append("<li class='nav-item tag-"+this.nodeName.toLowerCase()+"'><a class='nav-link' href='#"+n(this).text().toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")+"'>"+n(this).text()+"</a></li>"),n(this).attr("id",n(this).text().toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,""))})),n("nav ul li").on("click","a",(function(t){var e=n(n(this).attr("href")).position().top+n("#scrollable").scrollTop();e=e<50?0:e,n("#scrollable").animate({scrollTop:e},500),n(".collapse").collapse("hide"),t.preventDefault()}))}))},function(t,e,s){"use strict";s.r(e);var n=s(0),i=s.n(n),r=s(1);const l="scrollspy",o="bs.scrollspy",a="."+o,c=i.a.fn[l],h={offset:10,method:"auto",target:""},g={offset:"number",method:"string",target:"(string|element)"},u=`load${a}.data-api`,f="active",d=".nav, .list-group",_=".nav-link",p="position";class m{constructor(t,e){this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" .nav-link,"+this._config.target+" .list-group-item,"+this._config.target+" .dropdown-item",this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,i()(this._scrollElement).on("scroll.bs.scrollspy",(t=>this._process(t))),this.refresh(),this._process()}static get VERSION(){return"4.5.2"}static get Default(){return h}refresh(){const t=this._scrollElement===this._scrollElement.window?"offset":p,e="auto"===this._config.method?t:this._config.method,s=e===p?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight();[].slice.call(document.querySelectorAll(this._selector)).map((t=>{let n;const l=r.a.getSelectorFromElement(t);if(l&&(n=document.querySelector(l)),n){const t=n.getBoundingClientRect();if(t.width||t.height)return[i()(n)[e]().top+s,l]}return null})).filter((t=>t)).sort(((t,e)=>t[0]-e[0])).forEach((t=>{this._offsets.push(t[0]),this._targets.push(t[1])}))}dispose(){i.a.removeData(this._element,o),i()(this._scrollElement).off(a),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null}_getConfig(t){if("string"!=typeof(t={...h,..."object"==typeof t&&t?t:{}}).target&&r.a.isElement(t.target)){let e=i()(t.target).attr("id");e||(e=r.a.getUID(l),i()(t.target).attr("id",e)),t.target="#"+e}return r.a.typeCheckConfig(l,t,g),t}_getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}_getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}_getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}_process(){const t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),s=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=s){const t=this._targets[this._targets.length-1];this._activeTarget!==t&&this._activate(t)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(let e=this._offsets.length;e--;){this._activeTarget!==this._targets[e]&&t>=this._offsets[e]&&(void 0===this._offsets[e+1]||t<this._offsets[e+1])&&this._activate(this._targets[e])}}}_activate(t){this._activeTarget=t,this._clear();const e=this._selector.split(",").map((e=>`${e}[data-target="${t}"],${e}[href="${t}"]`)),s=i()([].slice.call(document.querySelectorAll(e.join(","))));s.hasClass("dropdown-item")?(s.closest(".dropdown").find(".dropdown-toggle").addClass(f),s.addClass(f)):(s.addClass(f),s.parents(d).prev(".nav-link, .list-group-item").addClass(f),s.parents(d).prev(".nav-item").children(_).addClass(f)),i()(this._scrollElement).trigger("activate.bs.scrollspy",{relatedTarget:t})}_clear(){[].slice.call(document.querySelectorAll(this._selector)).filter((t=>t.classList.contains(f))).forEach((t=>t.classList.remove(f)))}static _jQueryInterface(t){return this.each((function(){let e=i()(this).data(o);if(e||(e=new m(this,"object"==typeof t&&t),i()(this).data(o,e)),"string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}i()(window).on(u,(()=>{const t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]'));for(let e=t.length;e--;){const s=i()(t[e]);m._jQueryInterface.call(s,s.data())}})),i.a.fn[l]=m._jQueryInterface,i.a.fn[l].Constructor=m,i.a.fn[l].noConflict=()=>(i.a.fn[l]=c,m._jQueryInterface),e.default=m},function(t,e,s){"use strict";s.r(e);var n=s(0),i=s.n(n),r=s(1);const l="collapse",o="bs.collapse",a=i.a.fn[l],c={toggle:!0,parent:""},h={toggle:"boolean",parent:"(string|element)"},g="show",u="collapse",f="collapsing",d="collapsed",_="width",p='[data-toggle="collapse"]';class m{constructor(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll(`[data-toggle="collapse"][href="#${t.id}"],[data-toggle="collapse"][data-target="#${t.id}"]`));const s=[].slice.call(document.querySelectorAll(p));for(let e=0,n=s.length;e<n;e++){const n=s[e],i=r.a.getSelectorFromElement(n),l=[].slice.call(document.querySelectorAll(i)).filter((e=>e===t));null!==i&&l.length>0&&(this._selector=i,this._triggerArray.push(n))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}static get VERSION(){return"4.5.2"}static get Default(){return c}toggle(){i()(this._element).hasClass(g)?this.hide():this.show()}show(){if(this._isTransitioning||i()(this._element).hasClass(g))return;let t,e;if(this._parent&&(t=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((t=>"string"==typeof this._config.parent?t.getAttribute("data-parent")===this._config.parent:t.classList.contains(u))),0===t.length&&(t=null)),t&&(e=i()(t).not(this._selector).data(o),e&&e._isTransitioning))return;const s=i.a.Event("show.bs.collapse");if(i()(this._element).trigger(s),s.isDefaultPrevented())return;t&&(m._jQueryInterface.call(i()(t).not(this._selector),"hide"),e||i()(t).data(o,null));const n=this._getDimension();i()(this._element).removeClass(u).addClass(f),this._element.style[n]=0,this._triggerArray.length&&i()(this._triggerArray).removeClass(d).attr("aria-expanded",!0),this.setTransitioning(!0);const l="scroll"+(n[0].toUpperCase()+n.slice(1)),a=r.a.getTransitionDurationFromElement(this._element);i()(this._element).one(r.a.TRANSITION_END,(()=>{i()(this._element).removeClass(f).addClass("collapse show"),this._element.style[n]="",this.setTransitioning(!1),i()(this._element).trigger("shown.bs.collapse")})).emulateTransitionEnd(a),this._element.style[n]=this._element[l]+"px"}hide(){if(this._isTransitioning||!i()(this._element).hasClass(g))return;const t=i.a.Event("hide.bs.collapse");if(i()(this._element).trigger(t),t.isDefaultPrevented())return;const e=this._getDimension();this._element.style[e]=this._element.getBoundingClientRect()[e]+"px",r.a.reflow(this._element),i()(this._element).addClass(f).removeClass("collapse show");const s=this._triggerArray.length;if(s>0)for(let t=0;t<s;t++){const e=this._triggerArray[t],s=r.a.getSelectorFromElement(e);if(null!==s){i()([].slice.call(document.querySelectorAll(s))).hasClass(g)||i()(e).addClass(d).attr("aria-expanded",!1)}}this.setTransitioning(!0);this._element.style[e]="";const n=r.a.getTransitionDurationFromElement(this._element);i()(this._element).one(r.a.TRANSITION_END,(()=>{this.setTransitioning(!1),i()(this._element).removeClass(f).addClass(u).trigger("hidden.bs.collapse")})).emulateTransitionEnd(n)}setTransitioning(t){this._isTransitioning=t}dispose(){i.a.removeData(this._element,o),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null}_getConfig(t){return(t={...c,...t}).toggle=Boolean(t.toggle),r.a.typeCheckConfig(l,t,h),t}_getDimension(){return i()(this._element).hasClass(_)?_:"height"}_getParent(){let t;r.a.isElement(this._config.parent)?(t=this._config.parent,void 0!==this._config.parent.jquery&&(t=this._config.parent[0])):t=document.querySelector(this._config.parent);const e=`[data-toggle="collapse"][data-parent="${this._config.parent}"]`,s=[].slice.call(t.querySelectorAll(e));return i()(s).each(((t,e)=>{this._addAriaAndCollapsedClass(m._getTargetFromElement(e),[e])})),t}_addAriaAndCollapsedClass(t,e){const s=i()(t).hasClass(g);e.length&&i()(e).toggleClass(d,!s).attr("aria-expanded",s)}static _getTargetFromElement(t){const e=r.a.getSelectorFromElement(t);return e?document.querySelector(e):null}static _jQueryInterface(t){return this.each((function(){const e=i()(this);let s=e.data(o);const n={...c,...e.data(),..."object"==typeof t&&t?t:{}};if(!s&&n.toggle&&"string"==typeof t&&/show|hide/.test(t)&&(n.toggle=!1),s||(s=new m(this,n),e.data(o,s)),"string"==typeof t){if(void 0===s[t])throw new TypeError(`No method named "${t}"`);s[t]()}}))}}i()(document).on("click.bs.collapse.data-api",p,(function(t){"A"===t.currentTarget.tagName&&t.preventDefault();const e=i()(this),s=r.a.getSelectorFromElement(this),n=[].slice.call(document.querySelectorAll(s));i()(n).each((function(){const t=i()(this),s=t.data(o)?"toggle":e.data();m._jQueryInterface.call(t,s)}))})),i.a.fn[l]=m._jQueryInterface,i.a.fn[l].Constructor=m,i.a.fn[l].noConflict=()=>(i.a.fn[l]=a,m._jQueryInterface),e.default=m}]);