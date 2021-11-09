/**
 * @param {any} node
 * @param {any} human_readable
 * @param {any} indent
 * @returns {string}
 */
export function json_node_to_xml(node, human_readable, indent) {
    // For debugging purpose, this function will convert a json node back to xml
    indent = indent || 0;
    var sindent = (human_readable ? (new Array(indent + 1).join('\t')) : ''),
        r = sindent + '<' + node.tag,
        cr = human_readable ? '\n' : '';

    if (typeof (node) === 'string') {
        return sindent + node.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    } else if (typeof (node.tag) !== 'string' || !node.children instanceof Array || !node.attrs instanceof Object) {
        throw new Error(
            `Node ${JSON.stringify(node)} is not a JSONified XML node`);
    }
    for (var attr in node.attrs) {
        var vattr = node.attrs[attr];
        if (typeof (vattr) !== 'string') {
            // domains, ...
            vattr = JSON.stringify(vattr);
        }
        vattr = vattr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        if (human_readable) {
            vattr = vattr.replace(/&quot;/g, "'");
        }
        r += ' ' + attr + '="' + vattr + '"';
    }
    if (node.children && node.children.length) {
        r += '>' + cr;
        var childs = [];
        for (var i = 0, ii = node.children.length; i < ii; i++) {
            childs.push(json_node_to_xml(node.children[i], human_readable, indent + 1));
        }
        r += childs.join(cr);
        r += cr + sindent + '</' + node.tag + '>';
        return r;
    } else {
        return r + '/>';
    }
}
