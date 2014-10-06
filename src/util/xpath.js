function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    xres = xresult.iterateNext();
    while (xres) {
        xnodes.push(xres);
        xres = xresult.iterateNext();
    }

    return xnodes;
}
