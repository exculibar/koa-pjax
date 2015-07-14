# koa-pjax
A middleware enable the use of PJAX in koa.

## Install
```Bash
npm install koa-pjax
```

## Usage
Demo: [koa-pjax-demo](https://github.com/exculibar/koa-pjax-demo)<br>

```javascript
var koa = require('koa');
var staticServer = require('koa-static');
var path = require('path');
var app = koa();
var pjax = require('koa-pjax');
var views = require('co-views');
var render = views(__dirname + '/../views', {
    map: { html: 'swig' }
});
var route = require('koa-route');
app.use(pjax());
app.use(staticServer(path.join(__dirname, 'static')));
app.use(route.get('/', p1));
app.use(route.get('/2', p2));

function *p1() {
    this.body = yield render('p1');
}

function *p2() {
    this.body = yield render('p2');
}

app.listen(3000);

```
