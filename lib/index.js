"use strict";

const noop = require("noop6")
    , pug = require("pug")

exports.init = config => {
    Bloggify.renderer.registerRenderer("pug", exports.render)
}

/*!
 * render
 * Renders the template.
 *
 * @name render
 * @function
 * @param {ctx} lien The request context.
 * @param {Object} data The template data.
 * @param {Object} tmpl The template object.
 * @param {Function} cb The callback function.
 */
exports.render = (ctx, data, tmpl, cb) => {
    cb = cb || noop
    let html = null

    try {
        html = pug.renderFile(tmpl.path, data)
    } catch (err) {
        return cb(err)
    }

    data.statusCode = data.statusCode || (data.error && data.error.statusCode || 200)
    ctx.end(html, data.statusCode)
    cb(null, html)
}
