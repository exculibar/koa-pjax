var cheerio = require('cheerio');

function isRedirect(response) {
    if (response.status != 301 && response.status != 302) {
        return false;
    }
    return true;
}

function isPjax(request) {
    if (request.headers['X-PJAX'.toLowerCase()] == 'true') {
        return true;
    }
    if (request.querystring && request.querystring.indexOf('_pjax=') != -1) {
        return true;
    }
    return false;
}

function getPjaxContainer(request) {
    if ( !! request.headers['X-PJAX-Container'.toLowerCase()]) {
        return request.headers['X-PJAX-Container'.toLowerCase()];
    }
    if (request.querystring.indexOf('_pjax=') != -1) {
        var container = request.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if (container != null && container.length < 1) {
            return container[1];
        }
    }
    return false;
}

module.exports = function(opts) {
    return function *(next) {
        yield next;
        if ( ! isRedirect(this.res) && isPjax(this.req)) {
            yield next;
            var $ = cheerio.load(this.body);
            var title = $.html('title');
            var pjaxContainer = getPjaxContainer(this.req);
            if (pjaxContainer) {
                var container = $.html(pjaxContainer);
                this.set('X-PJAX-URL', this.href);
                this.body = title + container;
            }
        }
    }
}