mxmz.utilsHelper = {}

mxmz.utilsHelper.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

mxmz.utilsHelper.cloneObj = function (obj) {
    if (null == obj || "object" != typeof obj) {
        return obj;
    };
    var copy = obj.constructor();
    for (var attr in obj) {
        if ("object" == typeof obj[attr]) {
            copy[attr] = mxmz.utilsHelper.cloneObj(obj[attr]);
        } else {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
    }
    return copy;
}