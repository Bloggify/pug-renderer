"use strict";

const noop = require("noop6")
    , pug = require("pug")
    ;

exports.init = function (config, bloggify) {
    bloggify.viewer.registerRenderer("pug", exports.render);
};

/**
 * render
 * Renders the template.
 *
 * @name render
 * @function
 * @param {Lien} lien The `Lien` instance.
 * @param {Object} tmpl The template object.
 * @param {Object} data The template data.
 * @param {Function} cb The callback function.
 */
exports.render = function (lien, tmpl, data, cb) {
    cb = cb || noop;
    let html = null;
    try {
        html = pug.renderFile(tmpl.path, data);
    } catch (err) {
        return cb(err);
    }

    data.statusCode = data.statusCode || (data.error && data.error.statusCode || 200);
    lien.end(html, data.statusCode);
    cb(null, html);
};
