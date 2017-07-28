/*eslint-disable*/
function filterRoutes(permsId, routes) {
  routes.map((route) => {
    if (route.children) {
      route.children = filterRoutes(permsId, route.children);
    } else {
      const id = route.path[0] === '/' ? route.path.slice(1) : route.path;
      if (permsId.indexOf(id) > -1) {
        return route;
      }
    }
  });
  return routes;
}

function getStyle(el, styleName = undefined) {
  if (!el) return false;
  if (!styleName) {
    return document.defaultView.getComputedStyle(el, null);
  }
  const reg = styleName.match(/-(\w)/);
  if (reg) {
    styleName.replace(reg[0], reg[1].toUpperCase());
  }
  let result = document.defaultView.getComputedStyle(el, null)[styleName];
  if (result.indexOf('px') > -1) {
    result = parseInt(result, 10);
  }
  return result;
}

function debounce(fn, delay = 100) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function typeOf(obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[Object.prototype.toString.call(obj)];
}

function deepCopy(data) {
  let o = {};
  if (typeOf(data) === 'array') {
    o = [];
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (typeOf(data) === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i]);
    }
  } else {
    return data;
  }
}

export {
  filterRoutes,
  getStyle,
  debounce,
  typeOf,
  deepCopy
};
