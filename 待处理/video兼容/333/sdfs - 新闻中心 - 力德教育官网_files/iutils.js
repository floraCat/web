// --------------------------------------------------------------------------------------------------------------------------------- //
(function ($) {
    'use strict';

    var Iconfig = window.Iconfig;
    var WebApp = window.WebApp;
    var Iutils = window.Iutils;


    function extendIutils() {

        $.extend(Iutils, {
            Attr: function (target, attrChain, value) {
                var self = this;
                if (!target) return;

                var isAttr = typeof attrChain !== 'undefined' && attrChain !== null;
                var isValue = typeof value !== 'undefined';
                if (isValue && !isAttr) {
                    target = value;
                    return self;
                }

                if (!isValue && !attrChain) return self;


                var attrChains = attrChain.split('.');
                var length = attrChains.length;
                var idx = 0;
                var o = target;
                if (isValue) {
                    while (idx < length - 1) {
                        if (o === null || typeof o[attrChains[idx]] === 'undefined') {
                            o[attrChains[idx]] = {};
                        }
                        o = o[attrChains[idx]];
                        idx++;
                    }
                    o[attrChains[idx]] = value;

                    return self;
                } else {
                    while (idx < length) {
                        o = o[attrChains[idx]];
                        if (typeof o === 'undefined' || o === null) {
                            return;
                        }
                        idx++;
                    }
                    return o;
                }

            },
            ParseBool: function (value) {
                value = $.trim(value).toLowerCase();
                switch (value) {
                    case "true":
                    case "1":
                    case "yes":
                    case "y":
                        return true;
                    case "false":
                    case "0":
                    case "no":
                    case "n":
                        return false;
                    default:
                        return undefined;
                }
            },
            Ajax: function (opts) {
                var o = $.extend({type: "POST", url: "", data: null, dataType: "json", cache: "false", custom: {}}, opts);

                var beforeAjax = Iutils.Attr(o, "custom.beforeAjax");
                var callback = Iutils.Attr(o, "custom.callback");
                var beforeSuccess = Iutils.Attr(o, "custom.beforeSuccess");
                var afterSuccess = Iutils.Attr(o, "custom.afterSuccess");
                var beforeError = Iutils.Attr(o, "custom.beforeError");
                var afterError = Iutils.Attr(o, "custom.afterError");
                var call = Iutils.Attr(o, "custom.call");

                var success = o.success;
                var error = o.error;

                if ($.isFunction(callback)) {
                    o.success = callback;
                } else {
                    o.success = function (data, textStatus, jqXHR) {
                        if ($.isFunction(beforeSuccess) && beforeSuccess(data, textStatus, jqXHR) === false) {
                            return false;
                        }
                        if ($.isFunction(success) && success(data, textStatus, jqXHR) === false) {
                            return false;
                        } else if (call && !$.isEmptyObject(call) && $.isPlainObject(call)) {
                            call.data = data;
                            Iutils.Call.Normal(call);
                        }
                        if ($.isFunction(afterSuccess)) afterSuccess(data, textStatus, jqXHR);
                    };
                }

                o.error = function (xhr, textStatus, thrownError) {
                    if ($.isFunction(beforeError) && beforeError(xhr, textStatus, thrownError) === false) {
                        return false;
                    }
                    if ($.isFunction(error) && error(xhr, textStatus, thrownError) === false) {
                        return false;
                    }
                    if ($.isFunction(afterError)) afterError(xhr, textStatus, thrownError);
                };

                if ($.isFunction(beforeAjax) && beforeAjax(o) === false) {
                    return false;
                }

                return $.ajax(o);
            },
            Load: function (opts) {
                var self = this;
                var o = $.extend({type: "GET", url: "", data: null, dataType: "html", cache: "false"}, opts);
                return self.Ajax(o);
            },
            Json: function (data) {
                try {
                    if ($.type(data) == 'string')
                        return eval('(' + data + ')');
                    else return data;
                } catch (e) {
                    return {};
                }
            },
            Eval: function (data) {
                try {
                    if ($.type(data) == 'string')
                        return eval(data);
                    else return data;
                } catch (e) {
                    return null;
                }
            },
            Call: {
                Normal: function (opts) {
                    var self = this;
                    var o = $.extend({selector: null, data: null}, opts);
                    if ($.isFunction(o.callback)) {
                        return o.callback();
                    } else {
                        var status = Iutils.Attr(o.data, "status");
                        var msg = Iutils.Attr(o.data, "msg");

                        if (status != 0) {
                            if ($.isFunction(o.beforeError) && o.beforeError(o) === false) {
                                return false;
                            }
                            if ($.isFunction(o.error) && o.error(o) === false) {
                                return false;
                            } else {

                            }
                            if ($.isFunction(o.afterError)) o.afterError(o);
                        } else {
                            if ($.isFunction(o.beforeSuccess) && o.beforeSuccess(o) === false) {
                                return false;
                            }
                            if ($.isFunction(o.success) && o.success(o)) {
                                return false;
                            } else {

                            }
                            if ($.isFunction(o.afterSuccess)) o.afterSuccess(o);
                        }
                    }
                }

            }
        });

    }

    function extendString() {
        $.extend(String.prototype, {
            wrapUrl: function () {
                var cxt = Iconfig.CXT || "";
                return cxt + this.trim();
            },
            getRel: function () {
                /.*\/([\w]+)\/([\w]+)/.exec(this.trim());
                return RegExp.$2 + "_" + RegExp.$1;
            },
            trimLeft: function (startsWith) {
                var pattern = startsWith ? new RegExp('^[' + startsWith + ']+', 'g') : /^\s+/g;
                return this.replace(pattern, '');
            },
            trimRight: function (endsWith) {
                var pattern = endsWith ? new RegExp('[' + endsWith + ']+$', 'g') : /\s+$/g;
                return this.replace(pattern, '');
            },
            startsWith: function (pattern) {
                return this.indexOf(pattern) === 0;
            },
            endsWith: function (pattern) {
                var d = this.length - pattern.length;
                return d >= 0 && this.lastIndexOf(pattern) === d;
            },
            trim: function () {
                return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
            },
            isEmpty: function () {
                if (!this || this.length === 0) {
                    return true
                }
                return false;
            },
            isBlank: function () {
                if (this.isEmpty()) return true;
                return this.trim().isEmpty();
            }
        });
    }

    // --------------------------------------------------------------------------------------------------------------------------------- //
    extendString();
    extendIutils();

}(jQuery));



















































