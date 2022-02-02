(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var jquery = {exports: {}};

	/*!
	 * jQuery JavaScript Library v3.6.0
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright OpenJS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2021-03-02T17:08Z
	 */

	(function (module) {
	  (function (global, factory) {

	    {
	      // For CommonJS and CommonJS-like environments where a proper `window`
	      // is present, execute the factory and get jQuery.
	      // For environments that do not have a `window` with a `document`
	      // (such as Node.js), expose a factory as module.exports.
	      // This accentuates the need for the creation of a real `window`.
	      // e.g. var jQuery = require("jquery")(window);
	      // See ticket #14549 for more info.
	      module.exports = global.document ? factory(global, true) : function (w) {
	        if (!w.document) {
	          throw new Error("jQuery requires a window with a document");
	        }

	        return factory(w);
	      };
	    } // Pass this if window is not defined yet

	  })(typeof window !== "undefined" ? window : commonjsGlobal, function (window, noGlobal) {

	    var arr = [];
	    var getProto = Object.getPrototypeOf;
	    var slice = arr.slice;
	    var flat = arr.flat ? function (array) {
	      return arr.flat.call(array);
	    } : function (array) {
	      return arr.concat.apply([], array);
	    };
	    var push = arr.push;
	    var indexOf = arr.indexOf;
	    var class2type = {};
	    var toString = class2type.toString;
	    var hasOwn = class2type.hasOwnProperty;
	    var fnToString = hasOwn.toString;
	    var ObjectFunctionString = fnToString.call(Object);
	    var support = {};

	    var isFunction = function isFunction(obj) {
	      // Support: Chrome <=57, Firefox <=52
	      // In some browsers, typeof returns "function" for HTML <object> elements
	      // (i.e., `typeof document.createElement( "object" ) === "function"`).
	      // We don't want to classify *any* DOM node as a function.
	      // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
	      // Plus for old WebKit, typeof returns "function" for HTML collections
	      // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
	      return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
	    };

	    var isWindow = function isWindow(obj) {
	      return obj != null && obj === obj.window;
	    };

	    var document = window.document;
	    var preservedScriptAttributes = {
	      type: true,
	      src: true,
	      nonce: true,
	      noModule: true
	    };

	    function DOMEval(code, node, doc) {
	      doc = doc || document;
	      var i,
	          val,
	          script = doc.createElement("script");
	      script.text = code;

	      if (node) {
	        for (i in preservedScriptAttributes) {
	          // Support: Firefox 64+, Edge 18+
	          // Some browsers don't support the "nonce" property on scripts.
	          // On the other hand, just using `getAttribute` is not enough as
	          // the `nonce` attribute is reset to an empty string whenever it
	          // becomes browsing-context connected.
	          // See https://github.com/whatwg/html/issues/2369
	          // See https://html.spec.whatwg.org/#nonce-attributes
	          // The `node.getAttribute` check was added for the sake of
	          // `jQuery.globalEval` so that it can fake a nonce-containing node
	          // via an object.
	          val = node[i] || node.getAttribute && node.getAttribute(i);

	          if (val) {
	            script.setAttribute(i, val);
	          }
	        }
	      }

	      doc.head.appendChild(script).parentNode.removeChild(script);
	    }

	    function toType(obj) {
	      if (obj == null) {
	        return obj + "";
	      } // Support: Android <=2.3 only (functionish RegExp)


	      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	    }
	    /* global Symbol */
	    // Defining this global in .eslintrc.json would create a danger of using the global
	    // unguarded in another place, it seems safer to define global only for this module


	    var version = "3.6.0",
	        // Define a local copy of jQuery
	    jQuery = function (selector, context) {
	      // The jQuery object is actually just the init constructor 'enhanced'
	      // Need init if jQuery is called (just allow error to be thrown if not included)
	      return new jQuery.fn.init(selector, context);
	    };

	    jQuery.fn = jQuery.prototype = {
	      // The current version of jQuery being used
	      jquery: version,
	      constructor: jQuery,
	      // The default length of a jQuery object is 0
	      length: 0,
	      toArray: function () {
	        return slice.call(this);
	      },
	      // Get the Nth element in the matched element set OR
	      // Get the whole matched element set as a clean array
	      get: function (num) {
	        // Return all the elements in a clean array
	        if (num == null) {
	          return slice.call(this);
	        } // Return just the one element from the set


	        return num < 0 ? this[num + this.length] : this[num];
	      },
	      // Take an array of elements and push it onto the stack
	      // (returning the new matched element set)
	      pushStack: function (elems) {
	        // Build a new jQuery matched element set
	        var ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

	        ret.prevObject = this; // Return the newly-formed element set

	        return ret;
	      },
	      // Execute a callback for every element in the matched set.
	      each: function (callback) {
	        return jQuery.each(this, callback);
	      },
	      map: function (callback) {
	        return this.pushStack(jQuery.map(this, function (elem, i) {
	          return callback.call(elem, i, elem);
	        }));
	      },
	      slice: function () {
	        return this.pushStack(slice.apply(this, arguments));
	      },
	      first: function () {
	        return this.eq(0);
	      },
	      last: function () {
	        return this.eq(-1);
	      },
	      even: function () {
	        return this.pushStack(jQuery.grep(this, function (_elem, i) {
	          return (i + 1) % 2;
	        }));
	      },
	      odd: function () {
	        return this.pushStack(jQuery.grep(this, function (_elem, i) {
	          return i % 2;
	        }));
	      },
	      eq: function (i) {
	        var len = this.length,
	            j = +i + (i < 0 ? len : 0);
	        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	      },
	      end: function () {
	        return this.prevObject || this.constructor();
	      },
	      // For internal use only.
	      // Behaves like an Array's method, not like a jQuery method.
	      push: push,
	      sort: arr.sort,
	      splice: arr.splice
	    };

	    jQuery.extend = jQuery.fn.extend = function () {
	      var options,
	          name,
	          src,
	          copy,
	          copyIsArray,
	          clone,
	          target = arguments[0] || {},
	          i = 1,
	          length = arguments.length,
	          deep = false; // Handle a deep copy situation

	      if (typeof target === "boolean") {
	        deep = target; // Skip the boolean and the target

	        target = arguments[i] || {};
	        i++;
	      } // Handle case when target is a string or something (possible in deep copy)


	      if (typeof target !== "object" && !isFunction(target)) {
	        target = {};
	      } // Extend jQuery itself if only one argument is passed


	      if (i === length) {
	        target = this;
	        i--;
	      }

	      for (; i < length; i++) {
	        // Only deal with non-null/undefined values
	        if ((options = arguments[i]) != null) {
	          // Extend the base object
	          for (name in options) {
	            copy = options[name]; // Prevent Object.prototype pollution
	            // Prevent never-ending loop

	            if (name === "__proto__" || target === copy) {
	              continue;
	            } // Recurse if we're merging plain objects or arrays


	            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
	              src = target[name]; // Ensure proper type for the source value

	              if (copyIsArray && !Array.isArray(src)) {
	                clone = [];
	              } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
	                clone = {};
	              } else {
	                clone = src;
	              }

	              copyIsArray = false; // Never move original objects, clone them

	              target[name] = jQuery.extend(deep, clone, copy); // Don't bring in undefined values
	            } else if (copy !== undefined) {
	              target[name] = copy;
	            }
	          }
	        }
	      } // Return the modified object


	      return target;
	    };

	    jQuery.extend({
	      // Unique for each copy of jQuery on the page
	      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
	      // Assume jQuery is ready without the ready module
	      isReady: true,
	      error: function (msg) {
	        throw new Error(msg);
	      },
	      noop: function () {},
	      isPlainObject: function (obj) {
	        var proto, Ctor; // Detect obvious negatives
	        // Use toString instead of jQuery.type to catch host objects

	        if (!obj || toString.call(obj) !== "[object Object]") {
	          return false;
	        }

	        proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

	        if (!proto) {
	          return true;
	        } // Objects with prototype are plain iff they were constructed by a global Object function


	        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
	      },
	      isEmptyObject: function (obj) {
	        var name;

	        for (name in obj) {
	          return false;
	        }

	        return true;
	      },
	      // Evaluates a script in a provided context; falls back to the global one
	      // if not specified.
	      globalEval: function (code, options, doc) {
	        DOMEval(code, {
	          nonce: options && options.nonce
	        }, doc);
	      },
	      each: function (obj, callback) {
	        var length,
	            i = 0;

	        if (isArrayLike(obj)) {
	          length = obj.length;

	          for (; i < length; i++) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            if (callback.call(obj[i], i, obj[i]) === false) {
	              break;
	            }
	          }
	        }

	        return obj;
	      },
	      // results is for internal usage only
	      makeArray: function (arr, results) {
	        var ret = results || [];

	        if (arr != null) {
	          if (isArrayLike(Object(arr))) {
	            jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
	          } else {
	            push.call(ret, arr);
	          }
	        }

	        return ret;
	      },
	      inArray: function (elem, arr, i) {
	        return arr == null ? -1 : indexOf.call(arr, elem, i);
	      },
	      // Support: Android <=4.0 only, PhantomJS 1 only
	      // push.apply(_, arraylike) throws on ancient WebKit
	      merge: function (first, second) {
	        var len = +second.length,
	            j = 0,
	            i = first.length;

	        for (; j < len; j++) {
	          first[i++] = second[j];
	        }

	        first.length = i;
	        return first;
	      },
	      grep: function (elems, callback, invert) {
	        var callbackInverse,
	            matches = [],
	            i = 0,
	            length = elems.length,
	            callbackExpect = !invert; // Go through the array, only saving the items
	        // that pass the validator function

	        for (; i < length; i++) {
	          callbackInverse = !callback(elems[i], i);

	          if (callbackInverse !== callbackExpect) {
	            matches.push(elems[i]);
	          }
	        }

	        return matches;
	      },
	      // arg is for internal usage only
	      map: function (elems, callback, arg) {
	        var length,
	            value,
	            i = 0,
	            ret = []; // Go through the array, translating each of the items to their new values

	        if (isArrayLike(elems)) {
	          length = elems.length;

	          for (; i < length; i++) {
	            value = callback(elems[i], i, arg);

	            if (value != null) {
	              ret.push(value);
	            }
	          } // Go through every key on the object,

	        } else {
	          for (i in elems) {
	            value = callback(elems[i], i, arg);

	            if (value != null) {
	              ret.push(value);
	            }
	          }
	        } // Flatten any nested arrays


	        return flat(ret);
	      },
	      // A global GUID counter for objects
	      guid: 1,
	      // jQuery.support is not used in Core but other projects attach their
	      // properties to it so it needs to exist.
	      support: support
	    });

	    if (typeof Symbol === "function") {
	      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	    } // Populate the class2type map


	    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
	      class2type["[object " + name + "]"] = name.toLowerCase();
	    });

	    function isArrayLike(obj) {
	      // Support: real iOS 8.2 only (not reproducible in simulator)
	      // `in` check used to prevent JIT error (gh-2145)
	      // hasOwn isn't used here due to false negatives
	      // regarding Nodelist length in IE
	      var length = !!obj && "length" in obj && obj.length,
	          type = toType(obj);

	      if (isFunction(obj) || isWindow(obj)) {
	        return false;
	      }

	      return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	    }

	    var Sizzle =
	    /*!
	     * Sizzle CSS Selector Engine v2.3.6
	     * https://sizzlejs.com/
	     *
	     * Copyright JS Foundation and other contributors
	     * Released under the MIT license
	     * https://js.foundation/
	     *
	     * Date: 2021-02-16
	     */
	    function (window) {
	      var i,
	          support,
	          Expr,
	          getText,
	          isXML,
	          tokenize,
	          compile,
	          select,
	          outermostContext,
	          sortInput,
	          hasDuplicate,
	          // Local document vars
	      setDocument,
	          document,
	          docElem,
	          documentIsHTML,
	          rbuggyQSA,
	          rbuggyMatches,
	          matches,
	          contains,
	          // Instance-specific data
	      expando = "sizzle" + 1 * new Date(),
	          preferredDoc = window.document,
	          dirruns = 0,
	          done = 0,
	          classCache = createCache(),
	          tokenCache = createCache(),
	          compilerCache = createCache(),
	          nonnativeSelectorCache = createCache(),
	          sortOrder = function (a, b) {
	        if (a === b) {
	          hasDuplicate = true;
	        }

	        return 0;
	      },
	          // Instance methods
	      hasOwn = {}.hasOwnProperty,
	          arr = [],
	          pop = arr.pop,
	          pushNative = arr.push,
	          push = arr.push,
	          slice = arr.slice,
	          // Use a stripped-down indexOf as it's faster than native
	      // https://jsperf.com/thor-indexof-vs-for/5
	      indexOf = function (list, elem) {
	        var i = 0,
	            len = list.length;

	        for (; i < len; i++) {
	          if (list[i] === elem) {
	            return i;
	          }
	        }

	        return -1;
	      },
	          booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" + "ismap|loop|multiple|open|readonly|required|scoped",
	          // Regular expressions
	      // http://www.w3.org/TR/css3-selectors/#whitespace
	      whitespace = "[\\x20\\t\\r\\n\\f]",
	          // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	      identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
	          // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	      attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
	      "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5]
	      // or strings [capture 3 or capture 4]"
	      "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	          pseudos = ":(" + identifier + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
	      // 1. quoted (capture 3; capture 4 or capture 5)
	      "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
	      "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
	      ".*" + ")\\)|)",
	          // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	      rwhitespace = new RegExp(whitespace + "+", "g"),
	          rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	          rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	          rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	          rdescend = new RegExp(whitespace + "|>"),
	          rpseudo = new RegExp(pseudos),
	          ridentifier = new RegExp("^" + identifier + "$"),
	          matchExpr = {
	        "ID": new RegExp("^#(" + identifier + ")"),
	        "CLASS": new RegExp("^\\.(" + identifier + ")"),
	        "TAG": new RegExp("^(" + identifier + "|[*])"),
	        "ATTR": new RegExp("^" + attributes),
	        "PSEUDO": new RegExp("^" + pseudos),
	        "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	        "bool": new RegExp("^(?:" + booleans + ")$", "i"),
	        // For use in libraries implementing .is()
	        // We use this for POS matching in `select`
	        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	      },
	          rhtml = /HTML$/i,
	          rinputs = /^(?:input|select|textarea|button)$/i,
	          rheader = /^h\d$/i,
	          rnative = /^[^{]+\{\s*\[native \w/,
	          // Easily-parseable/retrievable ID or TAG or CLASS selectors
	      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	          rsibling = /[+~]/,
	          // CSS escapes
	      // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	      runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
	          funescape = function (escape, nonHex) {
	        var high = "0x" + escape.slice(1) - 0x10000;
	        return nonHex ? // Strip the backslash prefix from a non-hex escape sequence
	        nonHex : // Replace a hexadecimal escape sequence with the encoded Unicode code point
	        // Support: IE <=11+
	        // For values outside the Basic Multilingual Plane (BMP), manually construct a
	        // surrogate pair
	        high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	      },
	          // CSS string/identifier serialization
	      // https://drafts.csswg.org/cssom/#common-serializing-idioms
	      rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	          fcssescape = function (ch, asCodePoint) {
	        if (asCodePoint) {
	          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
	          if (ch === "\0") {
	            return "\uFFFD";
	          } // Control characters and (dependent upon position) numbers get escaped as code points


	          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
	        } // Other potentially-special ASCII characters get backslash-escaped


	        return "\\" + ch;
	      },
	          // Used for iframes
	      // See setDocument()
	      // Removing the function wrapper causes a "Permission Denied"
	      // error in IE
	      unloadHandler = function () {
	        setDocument();
	      },
	          inDisabledFieldset = addCombinator(function (elem) {
	        return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
	      }, {
	        dir: "parentNode",
	        next: "legend"
	      }); // Optimize for push.apply( _, NodeList )


	      try {
	        push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes); // Support: Android<4.0
	        // Detect silently failing push.apply
	        // eslint-disable-next-line no-unused-expressions

	        arr[preferredDoc.childNodes.length].nodeType;
	      } catch (e) {
	        push = {
	          apply: arr.length ? // Leverage slice if possible
	          function (target, els) {
	            pushNative.apply(target, slice.call(els));
	          } : // Support: IE<9
	          // Otherwise append directly
	          function (target, els) {
	            var j = target.length,
	                i = 0; // Can't trust NodeList.length

	            while (target[j++] = els[i++]) {}

	            target.length = j - 1;
	          }
	        };
	      }

	      function Sizzle(selector, context, results, seed) {
	        var m,
	            i,
	            elem,
	            nid,
	            match,
	            groups,
	            newSelector,
	            newContext = context && context.ownerDocument,
	            // nodeType defaults to 9, since context defaults to document
	        nodeType = context ? context.nodeType : 9;
	        results = results || []; // Return early from calls with invalid selector or context

	        if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
	          return results;
	        } // Try to shortcut find operations (as opposed to filters) in HTML documents


	        if (!seed) {
	          setDocument(context);
	          context = context || document;

	          if (documentIsHTML) {
	            // If the selector is sufficiently simple, try using a "get*By*" DOM method
	            // (excepting DocumentFragment context, where the methods don't exist)
	            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
	              // ID selector
	              if (m = match[1]) {
	                // Document context
	                if (nodeType === 9) {
	                  if (elem = context.getElementById(m)) {
	                    // Support: IE, Opera, Webkit
	                    // TODO: identify versions
	                    // getElementById can match elements by name instead of ID
	                    if (elem.id === m) {
	                      results.push(elem);
	                      return results;
	                    }
	                  } else {
	                    return results;
	                  } // Element context

	                } else {
	                  // Support: IE, Opera, Webkit
	                  // TODO: identify versions
	                  // getElementById can match elements by name instead of ID
	                  if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
	                    results.push(elem);
	                    return results;
	                  }
	                } // Type selector

	              } else if (match[2]) {
	                push.apply(results, context.getElementsByTagName(selector));
	                return results; // Class selector
	              } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
	                push.apply(results, context.getElementsByClassName(m));
	                return results;
	              }
	            } // Take advantage of querySelectorAll


	            if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && ( // Support: IE 8 only
	            // Exclude object elements
	            nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
	              newSelector = selector;
	              newContext = context; // qSA considers elements outside a scoping root when evaluating child or
	              // descendant combinators, which is not what we want.
	              // In such cases, we work around the behavior by prefixing every selector in the
	              // list with an ID selector referencing the scope context.
	              // The technique has to be used as well when a leading combinator is used
	              // as such selectors are not recognized by querySelectorAll.
	              // Thanks to Andrew Dupont for this technique.

	              if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
	                // Expand context for sibling selectors
	                newContext = rsibling.test(selector) && testContext(context.parentNode) || context; // We can use :scope instead of the ID hack if the browser
	                // supports it & if we're not changing the context.

	                if (newContext !== context || !support.scope) {
	                  // Capture the context ID, setting it first if necessary
	                  if (nid = context.getAttribute("id")) {
	                    nid = nid.replace(rcssescape, fcssescape);
	                  } else {
	                    context.setAttribute("id", nid = expando);
	                  }
	                } // Prefix every selector in the list


	                groups = tokenize(selector);
	                i = groups.length;

	                while (i--) {
	                  groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
	                }

	                newSelector = groups.join(",");
	              }

	              try {
	                push.apply(results, newContext.querySelectorAll(newSelector));
	                return results;
	              } catch (qsaError) {
	                nonnativeSelectorCache(selector, true);
	              } finally {
	                if (nid === expando) {
	                  context.removeAttribute("id");
	                }
	              }
	            }
	          }
	        } // All others


	        return select(selector.replace(rtrim, "$1"), context, results, seed);
	      }
	      /**
	       * Create key-value caches of limited size
	       * @returns {function(string, object)} Returns the Object data after storing it on itself with
	       *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	       *	deleting the oldest entry
	       */


	      function createCache() {
	        var keys = [];

	        function cache(key, value) {
	          // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
	          if (keys.push(key + " ") > Expr.cacheLength) {
	            // Only keep the most recent entries
	            delete cache[keys.shift()];
	          }

	          return cache[key + " "] = value;
	        }

	        return cache;
	      }
	      /**
	       * Mark a function for special use by Sizzle
	       * @param {Function} fn The function to mark
	       */


	      function markFunction(fn) {
	        fn[expando] = true;
	        return fn;
	      }
	      /**
	       * Support testing using an element
	       * @param {Function} fn Passed the created element and returns a boolean result
	       */


	      function assert(fn) {
	        var el = document.createElement("fieldset");

	        try {
	          return !!fn(el);
	        } catch (e) {
	          return false;
	        } finally {
	          // Remove from its parent by default
	          if (el.parentNode) {
	            el.parentNode.removeChild(el);
	          } // release memory in IE


	          el = null;
	        }
	      }
	      /**
	       * Adds the same handler for all of the specified attrs
	       * @param {String} attrs Pipe-separated list of attributes
	       * @param {Function} handler The method that will be applied
	       */


	      function addHandle(attrs, handler) {
	        var arr = attrs.split("|"),
	            i = arr.length;

	        while (i--) {
	          Expr.attrHandle[arr[i]] = handler;
	        }
	      }
	      /**
	       * Checks document order of two siblings
	       * @param {Element} a
	       * @param {Element} b
	       * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	       */


	      function siblingCheck(a, b) {
	        var cur = b && a,
	            diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex; // Use IE sourceIndex if available on both nodes

	        if (diff) {
	          return diff;
	        } // Check if b follows a


	        if (cur) {
	          while (cur = cur.nextSibling) {
	            if (cur === b) {
	              return -1;
	            }
	          }
	        }

	        return a ? 1 : -1;
	      }
	      /**
	       * Returns a function to use in pseudos for input types
	       * @param {String} type
	       */


	      function createInputPseudo(type) {
	        return function (elem) {
	          var name = elem.nodeName.toLowerCase();
	          return name === "input" && elem.type === type;
	        };
	      }
	      /**
	       * Returns a function to use in pseudos for buttons
	       * @param {String} type
	       */


	      function createButtonPseudo(type) {
	        return function (elem) {
	          var name = elem.nodeName.toLowerCase();
	          return (name === "input" || name === "button") && elem.type === type;
	        };
	      }
	      /**
	       * Returns a function to use in pseudos for :enabled/:disabled
	       * @param {Boolean} disabled true for :disabled; false for :enabled
	       */


	      function createDisabledPseudo(disabled) {
	        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	        return function (elem) {
	          // Only certain elements can match :enabled or :disabled
	          // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
	          // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
	          if ("form" in elem) {
	            // Check for inherited disabledness on relevant non-disabled elements:
	            // * listed form-associated elements in a disabled fieldset
	            //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
	            //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
	            // * option elements in a disabled optgroup
	            //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
	            // All such elements have a "form" property.
	            if (elem.parentNode && elem.disabled === false) {
	              // Option elements defer to a parent optgroup if present
	              if ("label" in elem) {
	                if ("label" in elem.parentNode) {
	                  return elem.parentNode.disabled === disabled;
	                } else {
	                  return elem.disabled === disabled;
	                }
	              } // Support: IE 6 - 11
	              // Use the isDisabled shortcut property to check for disabled fieldset ancestors


	              return elem.isDisabled === disabled || // Where there is no isDisabled, check manually

	              /* jshint -W018 */
	              elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
	            }

	            return elem.disabled === disabled; // Try to winnow out elements that can't be disabled before trusting the disabled property.
	            // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
	            // even exist on them, let alone have a boolean value.
	          } else if ("label" in elem) {
	            return elem.disabled === disabled;
	          } // Remaining elements are neither :enabled nor :disabled


	          return false;
	        };
	      }
	      /**
	       * Returns a function to use in pseudos for positionals
	       * @param {Function} fn
	       */


	      function createPositionalPseudo(fn) {
	        return markFunction(function (argument) {
	          argument = +argument;
	          return markFunction(function (seed, matches) {
	            var j,
	                matchIndexes = fn([], seed.length, argument),
	                i = matchIndexes.length; // Match elements found at the specified indexes

	            while (i--) {
	              if (seed[j = matchIndexes[i]]) {
	                seed[j] = !(matches[j] = seed[j]);
	              }
	            }
	          });
	        });
	      }
	      /**
	       * Checks a node for validity as a Sizzle context
	       * @param {Element|Object=} context
	       * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	       */


	      function testContext(context) {
	        return context && typeof context.getElementsByTagName !== "undefined" && context;
	      } // Expose support vars for convenience


	      support = Sizzle.support = {};
	      /**
	       * Detects XML nodes
	       * @param {Element|Object} elem An element or a document
	       * @returns {Boolean} True iff elem is a non-HTML XML node
	       */

	      isXML = Sizzle.isXML = function (elem) {
	        var namespace = elem && elem.namespaceURI,
	            docElem = elem && (elem.ownerDocument || elem).documentElement; // Support: IE <=8
	        // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	        // https://bugs.jquery.com/ticket/4833

	        return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
	      };
	      /**
	       * Sets document-related variables once based on the current document
	       * @param {Element|Object} [doc] An element or document object to use to set the document
	       * @returns {Object} Returns the current document
	       */


	      setDocument = Sizzle.setDocument = function (node) {
	        var hasCompare,
	            subWindow,
	            doc = node ? node.ownerDocument || node : preferredDoc; // Return early if doc is invalid or already selected
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq

	        if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
	          return document;
	        } // Update global variables


	        document = doc;
	        docElem = document.documentElement;
	        documentIsHTML = !isXML(document); // Support: IE 9 - 11+, Edge 12 - 18+
	        // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq

	        if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
	          // Support: IE 11, Edge
	          if (subWindow.addEventListener) {
	            subWindow.addEventListener("unload", unloadHandler, false); // Support: IE 9 - 10 only
	          } else if (subWindow.attachEvent) {
	            subWindow.attachEvent("onunload", unloadHandler);
	          }
	        } // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	        // Safari 4 - 5 only, Opera <=11.6 - 12.x only
	        // IE/Edge & older browsers don't support the :scope pseudo-class.
	        // Support: Safari 6.0 only
	        // Safari 6.0 supports :scope but it's an alias of :root there.


	        support.scope = assert(function (el) {
	          docElem.appendChild(el).appendChild(document.createElement("div"));
	          return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
	        });
	        /* Attributes
	        ---------------------------------------------------------------------- */
	        // Support: IE<8
	        // Verify that getAttribute really returns attributes and not properties
	        // (excepting IE8 booleans)

	        support.attributes = assert(function (el) {
	          el.className = "i";
	          return !el.getAttribute("className");
	        });
	        /* getElement(s)By*
	        ---------------------------------------------------------------------- */
	        // Check if getElementsByTagName("*") returns only elements

	        support.getElementsByTagName = assert(function (el) {
	          el.appendChild(document.createComment(""));
	          return !el.getElementsByTagName("*").length;
	        }); // Support: IE<9

	        support.getElementsByClassName = rnative.test(document.getElementsByClassName); // Support: IE<10
	        // Check if getElementById returns elements by name
	        // The broken getElementById methods don't pick up programmatically-set names,
	        // so use a roundabout getElementsByName test

	        support.getById = assert(function (el) {
	          docElem.appendChild(el).id = expando;
	          return !document.getElementsByName || !document.getElementsByName(expando).length;
	        }); // ID filter and find

	        if (support.getById) {
	          Expr.filter["ID"] = function (id) {
	            var attrId = id.replace(runescape, funescape);
	            return function (elem) {
	              return elem.getAttribute("id") === attrId;
	            };
	          };

	          Expr.find["ID"] = function (id, context) {
	            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	              var elem = context.getElementById(id);
	              return elem ? [elem] : [];
	            }
	          };
	        } else {
	          Expr.filter["ID"] = function (id) {
	            var attrId = id.replace(runescape, funescape);
	            return function (elem) {
	              var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
	              return node && node.value === attrId;
	            };
	          }; // Support: IE 6 - 7 only
	          // getElementById is not reliable as a find shortcut


	          Expr.find["ID"] = function (id, context) {
	            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
	              var node,
	                  i,
	                  elems,
	                  elem = context.getElementById(id);

	              if (elem) {
	                // Verify the id attribute
	                node = elem.getAttributeNode("id");

	                if (node && node.value === id) {
	                  return [elem];
	                } // Fall back on getElementsByName


	                elems = context.getElementsByName(id);
	                i = 0;

	                while (elem = elems[i++]) {
	                  node = elem.getAttributeNode("id");

	                  if (node && node.value === id) {
	                    return [elem];
	                  }
	                }
	              }

	              return [];
	            }
	          };
	        } // Tag


	        Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
	          if (typeof context.getElementsByTagName !== "undefined") {
	            return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
	          } else if (support.qsa) {
	            return context.querySelectorAll(tag);
	          }
	        } : function (tag, context) {
	          var elem,
	              tmp = [],
	              i = 0,
	              // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
	          results = context.getElementsByTagName(tag); // Filter out possible comments

	          if (tag === "*") {
	            while (elem = results[i++]) {
	              if (elem.nodeType === 1) {
	                tmp.push(elem);
	              }
	            }

	            return tmp;
	          }

	          return results;
	        }; // Class

	        Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
	          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
	            return context.getElementsByClassName(className);
	          }
	        };
	        /* QSA/matchesSelector
	        ---------------------------------------------------------------------- */
	        // QSA and matchesSelector support
	        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)


	        rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
	        // We allow this because of a bug in IE8/9 that throws an error
	        // whenever `document.activeElement` is accessed on an iframe
	        // So, we allow :focus to pass through QSA all the time to avoid the IE error
	        // See https://bugs.jquery.com/ticket/13378

	        rbuggyQSA = [];

	        if (support.qsa = rnative.test(document.querySelectorAll)) {
	          // Build QSA regex
	          // Regex strategy adopted from Diego Perini
	          assert(function (el) {
	            var input; // Select is set to empty string on purpose
	            // This is to test IE's treatment of not explicitly
	            // setting a boolean content attribute,
	            // since its presence should be enough
	            // https://bugs.jquery.com/ticket/12359

	            docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
	            // Nothing should be selected when empty strings follow ^= or $= or *=
	            // The test attribute must be unknown in Opera but "safe" for WinRT
	            // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

	            if (el.querySelectorAll("[msallowcapture^='']").length) {
	              rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
	            } // Support: IE8
	            // Boolean attributes and "value" are not treated correctly


	            if (!el.querySelectorAll("[selected]").length) {
	              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
	            } // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+


	            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
	              rbuggyQSA.push("~=");
	            } // Support: IE 11+, Edge 15 - 18+
	            // IE 11/Edge don't find elements on a `[name='']` query in some cases.
	            // Adding a temporary attribute to the document before the selection works
	            // around the issue.
	            // Interestingly, IE 10 & older don't seem to have the issue.


	            input = document.createElement("input");
	            input.setAttribute("name", "");
	            el.appendChild(input);

	            if (!el.querySelectorAll("[name='']").length) {
	              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
	            } // Webkit/Opera - :checked should return selected option elements
	            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	            // IE8 throws error here and will not see later tests


	            if (!el.querySelectorAll(":checked").length) {
	              rbuggyQSA.push(":checked");
	            } // Support: Safari 8+, iOS 8+
	            // https://bugs.webkit.org/show_bug.cgi?id=136851
	            // In-page `selector#id sibling-combinator selector` fails


	            if (!el.querySelectorAll("a#" + expando + "+*").length) {
	              rbuggyQSA.push(".#.+[+~]");
	            } // Support: Firefox <=3.6 - 5 only
	            // Old Firefox doesn't throw on a badly-escaped identifier.


	            el.querySelectorAll("\\\f");
	            rbuggyQSA.push("[\\r\\n\\f]");
	          });
	          assert(function (el) {
	            el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>"; // Support: Windows 8 Native Apps
	            // The type and name attributes are restricted during .innerHTML assignment

	            var input = document.createElement("input");
	            input.setAttribute("type", "hidden");
	            el.appendChild(input).setAttribute("name", "D"); // Support: IE8
	            // Enforce case-sensitivity of name attribute

	            if (el.querySelectorAll("[name=d]").length) {
	              rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
	            } // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
	            // IE8 throws error here and will not see later tests


	            if (el.querySelectorAll(":enabled").length !== 2) {
	              rbuggyQSA.push(":enabled", ":disabled");
	            } // Support: IE9-11+
	            // IE's :disabled selector does not pick up the children of disabled fieldsets


	            docElem.appendChild(el).disabled = true;

	            if (el.querySelectorAll(":disabled").length !== 2) {
	              rbuggyQSA.push(":enabled", ":disabled");
	            } // Support: Opera 10 - 11 only
	            // Opera 10-11 does not throw on post-comma invalid pseudos


	            el.querySelectorAll("*,:x");
	            rbuggyQSA.push(",.*:");
	          });
	        }

	        if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
	          assert(function (el) {
	            // Check to see if it's possible to do matchesSelector
	            // on a disconnected node (IE 9)
	            support.disconnectedMatch = matches.call(el, "*"); // This should fail with an exception
	            // Gecko does not error, returns false instead

	            matches.call(el, "[s!='']:x");
	            rbuggyMatches.push("!=", pseudos);
	          });
	        }

	        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
	        rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
	        /* Contains
	        ---------------------------------------------------------------------- */

	        hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
	        // Purposefully self-exclusive
	        // As in, an element does not contain itself

	        contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
	          var adown = a.nodeType === 9 ? a.documentElement : a,
	              bup = b && b.parentNode;
	          return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	        } : function (a, b) {
	          if (b) {
	            while (b = b.parentNode) {
	              if (b === a) {
	                return true;
	              }
	            }
	          }

	          return false;
	        };
	        /* Sorting
	        ---------------------------------------------------------------------- */
	        // Document order sorting

	        sortOrder = hasCompare ? function (a, b) {
	          // Flag for duplicate removal
	          if (a === b) {
	            hasDuplicate = true;
	            return 0;
	          } // Sort on method existence if only one input has compareDocumentPosition


	          var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

	          if (compare) {
	            return compare;
	          } // Calculate position if both inputs belong to the same document
	          // Support: IE 11+, Edge 17 - 18+
	          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	          // two documents; shallow comparisons work.
	          // eslint-disable-next-line eqeqeq


	          compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
	          1; // Disconnected nodes

	          if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
	            // Choose the first element that is related to our preferred document
	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq
	            if (a == document || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
	              return -1;
	            } // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq


	            if (b == document || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
	              return 1;
	            } // Maintain original order


	            return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
	          }

	          return compare & 4 ? -1 : 1;
	        } : function (a, b) {
	          // Exit early if the nodes are identical
	          if (a === b) {
	            hasDuplicate = true;
	            return 0;
	          }

	          var cur,
	              i = 0,
	              aup = a.parentNode,
	              bup = b.parentNode,
	              ap = [a],
	              bp = [b]; // Parentless nodes are either documents or disconnected

	          if (!aup || !bup) {
	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.

	            /* eslint-disable eqeqeq */
	            return a == document ? -1 : b == document ? 1 :
	            /* eslint-enable eqeqeq */
	            aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; // If the nodes are siblings, we can do a quick check
	          } else if (aup === bup) {
	            return siblingCheck(a, b);
	          } // Otherwise we need full lists of their ancestors for comparison


	          cur = a;

	          while (cur = cur.parentNode) {
	            ap.unshift(cur);
	          }

	          cur = b;

	          while (cur = cur.parentNode) {
	            bp.unshift(cur);
	          } // Walk down the tree looking for a discrepancy


	          while (ap[i] === bp[i]) {
	            i++;
	          }

	          return i ? // Do a sibling check if the nodes have a common ancestor
	          siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
	          // Support: IE 11+, Edge 17 - 18+
	          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	          // two documents; shallow comparisons work.

	          /* eslint-disable eqeqeq */
	          ap[i] == preferredDoc ? -1 : bp[i] == preferredDoc ? 1 :
	          /* eslint-enable eqeqeq */
	          0;
	        };
	        return document;
	      };

	      Sizzle.matches = function (expr, elements) {
	        return Sizzle(expr, null, null, elements);
	      };

	      Sizzle.matchesSelector = function (elem, expr) {
	        setDocument(elem);

	        if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
	          try {
	            var ret = matches.call(elem, expr); // IE 9's matchesSelector returns false on disconnected nodes

	            if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
	            // fragment in IE 9
	            elem.document && elem.document.nodeType !== 11) {
	              return ret;
	            }
	          } catch (e) {
	            nonnativeSelectorCache(expr, true);
	          }
	        }

	        return Sizzle(expr, document, null, [elem]).length > 0;
	      };

	      Sizzle.contains = function (context, elem) {
	        // Set document vars if needed
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        if ((context.ownerDocument || context) != document) {
	          setDocument(context);
	        }

	        return contains(context, elem);
	      };

	      Sizzle.attr = function (elem, name) {
	        // Set document vars if needed
	        // Support: IE 11+, Edge 17 - 18+
	        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	        // two documents; shallow comparisons work.
	        // eslint-disable-next-line eqeqeq
	        if ((elem.ownerDocument || elem) != document) {
	          setDocument(elem);
	        }

	        var fn = Expr.attrHandle[name.toLowerCase()],
	            // Don't get fooled by Object.prototype properties (jQuery #13807)
	        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
	        return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	      };

	      Sizzle.escape = function (sel) {
	        return (sel + "").replace(rcssescape, fcssescape);
	      };

	      Sizzle.error = function (msg) {
	        throw new Error("Syntax error, unrecognized expression: " + msg);
	      };
	      /**
	       * Document sorting and removing duplicates
	       * @param {ArrayLike} results
	       */


	      Sizzle.uniqueSort = function (results) {
	        var elem,
	            duplicates = [],
	            j = 0,
	            i = 0; // Unless we *know* we can detect duplicates, assume their presence

	        hasDuplicate = !support.detectDuplicates;
	        sortInput = !support.sortStable && results.slice(0);
	        results.sort(sortOrder);

	        if (hasDuplicate) {
	          while (elem = results[i++]) {
	            if (elem === results[i]) {
	              j = duplicates.push(i);
	            }
	          }

	          while (j--) {
	            results.splice(duplicates[j], 1);
	          }
	        } // Clear input after sorting to release objects
	        // See https://github.com/jquery/sizzle/pull/225


	        sortInput = null;
	        return results;
	      };
	      /**
	       * Utility function for retrieving the text value of an array of DOM nodes
	       * @param {Array|Element} elem
	       */


	      getText = Sizzle.getText = function (elem) {
	        var node,
	            ret = "",
	            i = 0,
	            nodeType = elem.nodeType;

	        if (!nodeType) {
	          // If no nodeType, this is expected to be an array
	          while (node = elem[i++]) {
	            // Do not traverse comment nodes
	            ret += getText(node);
	          }
	        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	          // Use textContent for elements
	          // innerText usage removed for consistency of new lines (jQuery #11153)
	          if (typeof elem.textContent === "string") {
	            return elem.textContent;
	          } else {
	            // Traverse its children
	            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	              ret += getText(elem);
	            }
	          }
	        } else if (nodeType === 3 || nodeType === 4) {
	          return elem.nodeValue;
	        } // Do not include comment or processing instruction nodes


	        return ret;
	      };

	      Expr = Sizzle.selectors = {
	        // Can be adjusted by the user
	        cacheLength: 50,
	        createPseudo: markFunction,
	        match: matchExpr,
	        attrHandle: {},
	        find: {},
	        relative: {
	          ">": {
	            dir: "parentNode",
	            first: true
	          },
	          " ": {
	            dir: "parentNode"
	          },
	          "+": {
	            dir: "previousSibling",
	            first: true
	          },
	          "~": {
	            dir: "previousSibling"
	          }
	        },
	        preFilter: {
	          "ATTR": function (match) {
	            match[1] = match[1].replace(runescape, funescape); // Move the given value to match[3] whether quoted or unquoted

	            match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

	            if (match[2] === "~=") {
	              match[3] = " " + match[3] + " ";
	            }

	            return match.slice(0, 4);
	          },
	          "CHILD": function (match) {
	            /* matches from matchExpr["CHILD"]
	            	1 type (only|nth|...)
	            	2 what (child|of-type)
	            	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
	            	4 xn-component of xn+y argument ([+-]?\d*n|)
	            	5 sign of xn-component
	            	6 x of xn-component
	            	7 sign of y-component
	            	8 y of y-component
	            */
	            match[1] = match[1].toLowerCase();

	            if (match[1].slice(0, 3) === "nth") {
	              // nth-* requires argument
	              if (!match[3]) {
	                Sizzle.error(match[0]);
	              } // numeric x and y parameters for Expr.filter.CHILD
	              // remember that false/true cast respectively to 0/1


	              match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
	              match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
	            } else if (match[3]) {
	              Sizzle.error(match[0]);
	            }

	            return match;
	          },
	          "PSEUDO": function (match) {
	            var excess,
	                unquoted = !match[6] && match[2];

	            if (matchExpr["CHILD"].test(match[0])) {
	              return null;
	            } // Accept quoted arguments as-is


	            if (match[3]) {
	              match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
	            } else if (unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
	            excess = tokenize(unquoted, true)) && ( // advance to the next closing parenthesis
	            excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
	              // excess is a negative index
	              match[0] = match[0].slice(0, excess);
	              match[2] = unquoted.slice(0, excess);
	            } // Return only captures needed by the pseudo filter method (type and argument)


	            return match.slice(0, 3);
	          }
	        },
	        filter: {
	          "TAG": function (nodeNameSelector) {
	            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
	            return nodeNameSelector === "*" ? function () {
	              return true;
	            } : function (elem) {
	              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	            };
	          },
	          "CLASS": function (className) {
	            var pattern = classCache[className + " "];
	            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
	              return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
	            });
	          },
	          "ATTR": function (name, operator, check) {
	            return function (elem) {
	              var result = Sizzle.attr(elem, name);

	              if (result == null) {
	                return operator === "!=";
	              }

	              if (!operator) {
	                return true;
	              }

	              result += "";
	              /* eslint-disable max-len */

	              return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
	              /* eslint-enable max-len */
	            };
	          },
	          "CHILD": function (type, what, _argument, first, last) {
	            var simple = type.slice(0, 3) !== "nth",
	                forward = type.slice(-4) !== "last",
	                ofType = what === "of-type";
	            return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
	            function (elem) {
	              return !!elem.parentNode;
	            } : function (elem, _context, xml) {
	              var cache,
	                  uniqueCache,
	                  outerCache,
	                  node,
	                  nodeIndex,
	                  start,
	                  dir = simple !== forward ? "nextSibling" : "previousSibling",
	                  parent = elem.parentNode,
	                  name = ofType && elem.nodeName.toLowerCase(),
	                  useCache = !xml && !ofType,
	                  diff = false;

	              if (parent) {
	                // :(first|last|only)-(child|of-type)
	                if (simple) {
	                  while (dir) {
	                    node = elem;

	                    while (node = node[dir]) {
	                      if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
	                        return false;
	                      }
	                    } // Reverse direction for :only-* (if we haven't yet done so)


	                    start = dir = type === "only" && !start && "nextSibling";
	                  }

	                  return true;
	                }

	                start = [forward ? parent.firstChild : parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`

	                if (forward && useCache) {
	                  // Seek `elem` from a previously-cached index
	                  // ...in a gzip-friendly way
	                  node = parent;
	                  outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
	                  // Defend against cloned attroperties (jQuery gh-1709)

	                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
	                  cache = uniqueCache[type] || [];
	                  nodeIndex = cache[0] === dirruns && cache[1];
	                  diff = nodeIndex && cache[2];
	                  node = nodeIndex && parent.childNodes[nodeIndex];

	                  while (node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
	                  diff = nodeIndex = 0) || start.pop()) {
	                    // When found, cache indexes on `parent` and break
	                    if (node.nodeType === 1 && ++diff && node === elem) {
	                      uniqueCache[type] = [dirruns, nodeIndex, diff];
	                      break;
	                    }
	                  }
	                } else {
	                  // Use previously-cached element index if available
	                  if (useCache) {
	                    // ...in a gzip-friendly way
	                    node = elem;
	                    outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
	                    // Defend against cloned attroperties (jQuery gh-1709)

	                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
	                    cache = uniqueCache[type] || [];
	                    nodeIndex = cache[0] === dirruns && cache[1];
	                    diff = nodeIndex;
	                  } // xml :nth-child(...)
	                  // or :nth-last-child(...) or :nth(-last)?-of-type(...)


	                  if (diff === false) {
	                    // Use the same loop as above to seek `elem` from the start
	                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
	                      if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
	                        // Cache the index of each encountered element
	                        if (useCache) {
	                          outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
	                          // Defend against cloned attroperties (jQuery gh-1709)

	                          uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
	                          uniqueCache[type] = [dirruns, diff];
	                        }

	                        if (node === elem) {
	                          break;
	                        }
	                      }
	                    }
	                  }
	                } // Incorporate the offset, then check against cycle size


	                diff -= last;
	                return diff === first || diff % first === 0 && diff / first >= 0;
	              }
	            };
	          },
	          "PSEUDO": function (pseudo, argument) {
	            // pseudo-class names are case-insensitive
	            // http://www.w3.org/TR/selectors/#pseudo-classes
	            // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
	            // Remember that setFilters inherits from pseudos
	            var args,
	                fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
	            // arguments are needed to create the filter function
	            // just as Sizzle does

	            if (fn[expando]) {
	              return fn(argument);
	            } // But maintain support for old signatures


	            if (fn.length > 1) {
	              args = [pseudo, pseudo, "", argument];
	              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
	                var idx,
	                    matched = fn(seed, argument),
	                    i = matched.length;

	                while (i--) {
	                  idx = indexOf(seed, matched[i]);
	                  seed[idx] = !(matches[idx] = matched[i]);
	                }
	              }) : function (elem) {
	                return fn(elem, 0, args);
	              };
	            }

	            return fn;
	          }
	        },
	        pseudos: {
	          // Potentially complex pseudos
	          "not": markFunction(function (selector) {
	            // Trim the selector passed to compile
	            // to avoid treating leading and trailing
	            // spaces as combinators
	            var input = [],
	                results = [],
	                matcher = compile(selector.replace(rtrim, "$1"));
	            return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
	              var elem,
	                  unmatched = matcher(seed, null, xml, []),
	                  i = seed.length; // Match elements unmatched by `matcher`

	              while (i--) {
	                if (elem = unmatched[i]) {
	                  seed[i] = !(matches[i] = elem);
	                }
	              }
	            }) : function (elem, _context, xml) {
	              input[0] = elem;
	              matcher(input, null, xml, results); // Don't keep the element (issue #299)

	              input[0] = null;
	              return !results.pop();
	            };
	          }),
	          "has": markFunction(function (selector) {
	            return function (elem) {
	              return Sizzle(selector, elem).length > 0;
	            };
	          }),
	          "contains": markFunction(function (text) {
	            text = text.replace(runescape, funescape);
	            return function (elem) {
	              return (elem.textContent || getText(elem)).indexOf(text) > -1;
	            };
	          }),
	          // "Whether an element is represented by a :lang() selector
	          // is based solely on the element's language value
	          // being equal to the identifier C,
	          // or beginning with the identifier C immediately followed by "-".
	          // The matching of C against the element's language value is performed case-insensitively.
	          // The identifier C does not have to be a valid language name."
	          // http://www.w3.org/TR/selectors/#lang-pseudo
	          "lang": markFunction(function (lang) {
	            // lang value must be a valid identifier
	            if (!ridentifier.test(lang || "")) {
	              Sizzle.error("unsupported lang: " + lang);
	            }

	            lang = lang.replace(runescape, funescape).toLowerCase();
	            return function (elem) {
	              var elemLang;

	              do {
	                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
	                  elemLang = elemLang.toLowerCase();
	                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
	                }
	              } while ((elem = elem.parentNode) && elem.nodeType === 1);

	              return false;
	            };
	          }),
	          // Miscellaneous
	          "target": function (elem) {
	            var hash = window.location && window.location.hash;
	            return hash && hash.slice(1) === elem.id;
	          },
	          "root": function (elem) {
	            return elem === docElem;
	          },
	          "focus": function (elem) {
	            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	          },
	          // Boolean properties
	          "enabled": createDisabledPseudo(false),
	          "disabled": createDisabledPseudo(true),
	          "checked": function (elem) {
	            // In CSS3, :checked should return both checked and selected elements
	            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	            var nodeName = elem.nodeName.toLowerCase();
	            return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
	          },
	          "selected": function (elem) {
	            // Accessing this property makes selected-by-default
	            // options in Safari work properly
	            if (elem.parentNode) {
	              // eslint-disable-next-line no-unused-expressions
	              elem.parentNode.selectedIndex;
	            }

	            return elem.selected === true;
	          },
	          // Contents
	          "empty": function (elem) {
	            // http://www.w3.org/TR/selectors/#empty-pseudo
	            // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
	            //   but not by others (comment: 8; processing instruction: 7; etc.)
	            // nodeType < 6 works because attributes (2) do not appear as children
	            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	              if (elem.nodeType < 6) {
	                return false;
	              }
	            }

	            return true;
	          },
	          "parent": function (elem) {
	            return !Expr.pseudos["empty"](elem);
	          },
	          // Element/input types
	          "header": function (elem) {
	            return rheader.test(elem.nodeName);
	          },
	          "input": function (elem) {
	            return rinputs.test(elem.nodeName);
	          },
	          "button": function (elem) {
	            var name = elem.nodeName.toLowerCase();
	            return name === "input" && elem.type === "button" || name === "button";
	          },
	          "text": function (elem) {
	            var attr;
	            return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
	            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
	            (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
	          },
	          // Position-in-collection
	          "first": createPositionalPseudo(function () {
	            return [0];
	          }),
	          "last": createPositionalPseudo(function (_matchIndexes, length) {
	            return [length - 1];
	          }),
	          "eq": createPositionalPseudo(function (_matchIndexes, length, argument) {
	            return [argument < 0 ? argument + length : argument];
	          }),
	          "even": createPositionalPseudo(function (matchIndexes, length) {
	            var i = 0;

	            for (; i < length; i += 2) {
	              matchIndexes.push(i);
	            }

	            return matchIndexes;
	          }),
	          "odd": createPositionalPseudo(function (matchIndexes, length) {
	            var i = 1;

	            for (; i < length; i += 2) {
	              matchIndexes.push(i);
	            }

	            return matchIndexes;
	          }),
	          "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
	            var i = argument < 0 ? argument + length : argument > length ? length : argument;

	            for (; --i >= 0;) {
	              matchIndexes.push(i);
	            }

	            return matchIndexes;
	          }),
	          "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
	            var i = argument < 0 ? argument + length : argument;

	            for (; ++i < length;) {
	              matchIndexes.push(i);
	            }

	            return matchIndexes;
	          })
	        }
	      };
	      Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos

	      for (i in {
	        radio: true,
	        checkbox: true,
	        file: true,
	        password: true,
	        image: true
	      }) {
	        Expr.pseudos[i] = createInputPseudo(i);
	      }

	      for (i in {
	        submit: true,
	        reset: true
	      }) {
	        Expr.pseudos[i] = createButtonPseudo(i);
	      } // Easy API for creating new setFilters


	      function setFilters() {}

	      setFilters.prototype = Expr.filters = Expr.pseudos;
	      Expr.setFilters = new setFilters();

	      tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	        var matched,
	            match,
	            tokens,
	            type,
	            soFar,
	            groups,
	            preFilters,
	            cached = tokenCache[selector + " "];

	        if (cached) {
	          return parseOnly ? 0 : cached.slice(0);
	        }

	        soFar = selector;
	        groups = [];
	        preFilters = Expr.preFilter;

	        while (soFar) {
	          // Comma and first run
	          if (!matched || (match = rcomma.exec(soFar))) {
	            if (match) {
	              // Don't consume trailing commas as valid
	              soFar = soFar.slice(match[0].length) || soFar;
	            }

	            groups.push(tokens = []);
	          }

	          matched = false; // Combinators

	          if (match = rcombinators.exec(soFar)) {
	            matched = match.shift();
	            tokens.push({
	              value: matched,
	              // Cast descendant combinators to space
	              type: match[0].replace(rtrim, " ")
	            });
	            soFar = soFar.slice(matched.length);
	          } // Filters


	          for (type in Expr.filter) {
	            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	              matched = match.shift();
	              tokens.push({
	                value: matched,
	                type: type,
	                matches: match
	              });
	              soFar = soFar.slice(matched.length);
	            }
	          }

	          if (!matched) {
	            break;
	          }
	        } // Return the length of the invalid excess
	        // if we're just parsing
	        // Otherwise, throw an error or return tokens


	        return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
	        tokenCache(selector, groups).slice(0);
	      };

	      function toSelector(tokens) {
	        var i = 0,
	            len = tokens.length,
	            selector = "";

	        for (; i < len; i++) {
	          selector += tokens[i].value;
	        }

	        return selector;
	      }

	      function addCombinator(matcher, combinator, base) {
	        var dir = combinator.dir,
	            skip = combinator.next,
	            key = skip || dir,
	            checkNonElements = base && key === "parentNode",
	            doneName = done++;
	        return combinator.first ? // Check against closest ancestor/preceding element
	        function (elem, context, xml) {
	          while (elem = elem[dir]) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              return matcher(elem, context, xml);
	            }
	          }

	          return false;
	        } : // Check against all ancestor/preceding elements
	        function (elem, context, xml) {
	          var oldCache,
	              uniqueCache,
	              outerCache,
	              newCache = [dirruns, doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

	          if (xml) {
	            while (elem = elem[dir]) {
	              if (elem.nodeType === 1 || checkNonElements) {
	                if (matcher(elem, context, xml)) {
	                  return true;
	                }
	              }
	            }
	          } else {
	            while (elem = elem[dir]) {
	              if (elem.nodeType === 1 || checkNonElements) {
	                outerCache = elem[expando] || (elem[expando] = {}); // Support: IE <9 only
	                // Defend against cloned attroperties (jQuery gh-1709)

	                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

	                if (skip && skip === elem.nodeName.toLowerCase()) {
	                  elem = elem[dir] || elem;
	                } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
	                  // Assign to newCache so results back-propagate to previous elements
	                  return newCache[2] = oldCache[2];
	                } else {
	                  // Reuse newcache so results back-propagate to previous elements
	                  uniqueCache[key] = newCache; // A match means we're done; a fail means we have to keep checking

	                  if (newCache[2] = matcher(elem, context, xml)) {
	                    return true;
	                  }
	                }
	              }
	            }
	          }

	          return false;
	        };
	      }

	      function elementMatcher(matchers) {
	        return matchers.length > 1 ? function (elem, context, xml) {
	          var i = matchers.length;

	          while (i--) {
	            if (!matchers[i](elem, context, xml)) {
	              return false;
	            }
	          }

	          return true;
	        } : matchers[0];
	      }

	      function multipleContexts(selector, contexts, results) {
	        var i = 0,
	            len = contexts.length;

	        for (; i < len; i++) {
	          Sizzle(selector, contexts[i], results);
	        }

	        return results;
	      }

	      function condense(unmatched, map, filter, context, xml) {
	        var elem,
	            newUnmatched = [],
	            i = 0,
	            len = unmatched.length,
	            mapped = map != null;

	        for (; i < len; i++) {
	          if (elem = unmatched[i]) {
	            if (!filter || filter(elem, context, xml)) {
	              newUnmatched.push(elem);

	              if (mapped) {
	                map.push(i);
	              }
	            }
	          }
	        }

	        return newUnmatched;
	      }

	      function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	        if (postFilter && !postFilter[expando]) {
	          postFilter = setMatcher(postFilter);
	        }

	        if (postFinder && !postFinder[expando]) {
	          postFinder = setMatcher(postFinder, postSelector);
	        }

	        return markFunction(function (seed, results, context, xml) {
	          var temp,
	              i,
	              elem,
	              preMap = [],
	              postMap = [],
	              preexisting = results.length,
	              // Get initial elements from seed or context
	          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
	              // Prefilter to get matcher input, preserving a map for seed-results synchronization
	          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
	              matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
	          postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
	          [] : // ...otherwise use results directly
	          results : matcherIn; // Find primary matches

	          if (matcher) {
	            matcher(matcherIn, matcherOut, context, xml);
	          } // Apply postFilter


	          if (postFilter) {
	            temp = condense(matcherOut, postMap);
	            postFilter(temp, [], context, xml); // Un-match failing elements by moving them back to matcherIn

	            i = temp.length;

	            while (i--) {
	              if (elem = temp[i]) {
	                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	              }
	            }
	          }

	          if (seed) {
	            if (postFinder || preFilter) {
	              if (postFinder) {
	                // Get the final matcherOut by condensing this intermediate into postFinder contexts
	                temp = [];
	                i = matcherOut.length;

	                while (i--) {
	                  if (elem = matcherOut[i]) {
	                    // Restore matcherIn since elem is not yet a final match
	                    temp.push(matcherIn[i] = elem);
	                  }
	                }

	                postFinder(null, matcherOut = [], temp, xml);
	              } // Move matched elements from seed to results to keep them synchronized


	              i = matcherOut.length;

	              while (i--) {
	                if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
	                  seed[temp] = !(results[temp] = elem);
	                }
	              }
	            } // Add elements to results, through postFinder if defined

	          } else {
	            matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);

	            if (postFinder) {
	              postFinder(null, results, matcherOut, xml);
	            } else {
	              push.apply(results, matcherOut);
	            }
	          }
	        });
	      }

	      function matcherFromTokens(tokens) {
	        var checkContext,
	            matcher,
	            j,
	            len = tokens.length,
	            leadingRelative = Expr.relative[tokens[0].type],
	            implicitRelative = leadingRelative || Expr.relative[" "],
	            i = leadingRelative ? 1 : 0,
	            // The foundational matcher ensures that elements are reachable from top-level context(s)
	        matchContext = addCombinator(function (elem) {
	          return elem === checkContext;
	        }, implicitRelative, true),
	            matchAnyContext = addCombinator(function (elem) {
	          return indexOf(checkContext, elem) > -1;
	        }, implicitRelative, true),
	            matchers = [function (elem, context, xml) {
	          var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); // Avoid hanging onto element (issue #299)

	          checkContext = null;
	          return ret;
	        }];

	        for (; i < len; i++) {
	          if (matcher = Expr.relative[tokens[i].type]) {
	            matchers = [addCombinator(elementMatcher(matchers), matcher)];
	          } else {
	            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches); // Return special upon seeing a positional matcher

	            if (matcher[expando]) {
	              // Find the next relative operator (if any) for proper handling
	              j = ++i;

	              for (; j < len; j++) {
	                if (Expr.relative[tokens[j].type]) {
	                  break;
	                }
	              }

	              return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
	              tokens.slice(0, i - 1).concat({
	                value: tokens[i - 2].type === " " ? "*" : ""
	              })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
	            }

	            matchers.push(matcher);
	          }
	        }

	        return elementMatcher(matchers);
	      }

	      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	        var bySet = setMatchers.length > 0,
	            byElement = elementMatchers.length > 0,
	            superMatcher = function (seed, context, xml, results, outermost) {
	          var elem,
	              j,
	              matcher,
	              matchedCount = 0,
	              i = "0",
	              unmatched = seed && [],
	              setMatched = [],
	              contextBackup = outermostContext,
	              // We must always have either seed elements or outermost context
	          elems = seed || byElement && Expr.find["TAG"]("*", outermost),
	              // Use integer dirruns iff this is the outermost matcher
	          dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
	              len = elems.length;

	          if (outermost) {
	            // Support: IE 11+, Edge 17 - 18+
	            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	            // two documents; shallow comparisons work.
	            // eslint-disable-next-line eqeqeq
	            outermostContext = context == document || context || outermost;
	          } // Add elements passing elementMatchers directly to results
	          // Support: IE<9, Safari
	          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id


	          for (; i !== len && (elem = elems[i]) != null; i++) {
	            if (byElement && elem) {
	              j = 0; // Support: IE 11+, Edge 17 - 18+
	              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	              // two documents; shallow comparisons work.
	              // eslint-disable-next-line eqeqeq

	              if (!context && elem.ownerDocument != document) {
	                setDocument(elem);
	                xml = !documentIsHTML;
	              }

	              while (matcher = elementMatchers[j++]) {
	                if (matcher(elem, context || document, xml)) {
	                  results.push(elem);
	                  break;
	                }
	              }

	              if (outermost) {
	                dirruns = dirrunsUnique;
	              }
	            } // Track unmatched elements for set filters


	            if (bySet) {
	              // They will have gone through all possible matchers
	              if (elem = !matcher && elem) {
	                matchedCount--;
	              } // Lengthen the array for every element, matched or not


	              if (seed) {
	                unmatched.push(elem);
	              }
	            }
	          } // `i` is now the count of elements visited above, and adding it to `matchedCount`
	          // makes the latter nonnegative.


	          matchedCount += i; // Apply set filters to unmatched elements
	          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
	          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
	          // no element matchers and no seed.
	          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
	          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
	          // numerically zero.

	          if (bySet && i !== matchedCount) {
	            j = 0;

	            while (matcher = setMatchers[j++]) {
	              matcher(unmatched, setMatched, context, xml);
	            }

	            if (seed) {
	              // Reintegrate element matches to eliminate the need for sorting
	              if (matchedCount > 0) {
	                while (i--) {
	                  if (!(unmatched[i] || setMatched[i])) {
	                    setMatched[i] = pop.call(results);
	                  }
	                }
	              } // Discard index placeholder values to get only actual matches


	              setMatched = condense(setMatched);
	            } // Add matches to results


	            push.apply(results, setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting

	            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
	              Sizzle.uniqueSort(results);
	            }
	          } // Override manipulation of globals by nested matchers


	          if (outermost) {
	            dirruns = dirrunsUnique;
	            outermostContext = contextBackup;
	          }

	          return unmatched;
	        };

	        return bySet ? markFunction(superMatcher) : superMatcher;
	      }

	      compile = Sizzle.compile = function (selector, match
	      /* Internal Use Only */
	      ) {
	        var i,
	            setMatchers = [],
	            elementMatchers = [],
	            cached = compilerCache[selector + " "];

	        if (!cached) {
	          // Generate a function of recursive functions that can be used to check each element
	          if (!match) {
	            match = tokenize(selector);
	          }

	          i = match.length;

	          while (i--) {
	            cached = matcherFromTokens(match[i]);

	            if (cached[expando]) {
	              setMatchers.push(cached);
	            } else {
	              elementMatchers.push(cached);
	            }
	          } // Cache the compiled function


	          cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)); // Save selector and tokenization

	          cached.selector = selector;
	        }

	        return cached;
	      };
	      /**
	       * A low-level selection function that works with Sizzle's compiled
	       *  selector functions
	       * @param {String|Function} selector A selector or a pre-compiled
	       *  selector function built with Sizzle.compile
	       * @param {Element} context
	       * @param {Array} [results]
	       * @param {Array} [seed] A set of elements to match against
	       */


	      select = Sizzle.select = function (selector, context, results, seed) {
	        var i,
	            tokens,
	            token,
	            type,
	            find,
	            compiled = typeof selector === "function" && selector,
	            match = !seed && tokenize(selector = compiled.selector || selector);
	        results = results || []; // Try to minimize operations if there is only one selector in the list and no seed
	        // (the latter of which guarantees us context)

	        if (match.length === 1) {
	          // Reduce context if the leading compound selector is an ID
	          tokens = match[0] = match[0].slice(0);

	          if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
	            context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

	            if (!context) {
	              return results; // Precompiled matchers will still verify ancestry, so step up a level
	            } else if (compiled) {
	              context = context.parentNode;
	            }

	            selector = selector.slice(tokens.shift().value.length);
	          } // Fetch a seed set for right-to-left matching


	          i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

	          while (i--) {
	            token = tokens[i]; // Abort if we hit a combinator

	            if (Expr.relative[type = token.type]) {
	              break;
	            }

	            if (find = Expr.find[type]) {
	              // Search, expanding context for leading sibling combinators
	              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
	                // If seed is empty or no tokens remain, we can return early
	                tokens.splice(i, 1);
	                selector = seed.length && toSelector(tokens);

	                if (!selector) {
	                  push.apply(results, seed);
	                  return results;
	                }

	                break;
	              }
	            }
	          }
	        } // Compile and execute a filtering function if one is not provided
	        // Provide `match` to avoid retokenization if we modified the selector above


	        (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
	        return results;
	      }; // One-time assignments
	      // Sort stability


	      support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
	      // Always assume duplicates if they aren't passed to the comparison function

	      support.detectDuplicates = !!hasDuplicate; // Initialize against the default document

	      setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	      // Detached nodes confoundingly follow *each other*

	      support.sortDetached = assert(function (el) {
	        // Should return 1, but returns 4 (following)
	        return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
	      }); // Support: IE<8
	      // Prevent attribute/property "interpolation"
	      // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

	      if (!assert(function (el) {
	        el.innerHTML = "<a href='#'></a>";
	        return el.firstChild.getAttribute("href") === "#";
	      })) {
	        addHandle("type|href|height|width", function (elem, name, isXML) {
	          if (!isXML) {
	            return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
	          }
	        });
	      } // Support: IE<9
	      // Use defaultValue in place of getAttribute("value")


	      if (!support.attributes || !assert(function (el) {
	        el.innerHTML = "<input/>";
	        el.firstChild.setAttribute("value", "");
	        return el.firstChild.getAttribute("value") === "";
	      })) {
	        addHandle("value", function (elem, _name, isXML) {
	          if (!isXML && elem.nodeName.toLowerCase() === "input") {
	            return elem.defaultValue;
	          }
	        });
	      } // Support: IE<9
	      // Use getAttributeNode to fetch booleans when getAttribute lies


	      if (!assert(function (el) {
	        return el.getAttribute("disabled") == null;
	      })) {
	        addHandle(booleans, function (elem, name, isXML) {
	          var val;

	          if (!isXML) {
	            return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	          }
	        });
	      }

	      return Sizzle;
	    }(window);

	    jQuery.find = Sizzle;
	    jQuery.expr = Sizzle.selectors; // Deprecated

	    jQuery.expr[":"] = jQuery.expr.pseudos;
	    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	    jQuery.text = Sizzle.getText;
	    jQuery.isXMLDoc = Sizzle.isXML;
	    jQuery.contains = Sizzle.contains;
	    jQuery.escapeSelector = Sizzle.escape;

	    var dir = function (elem, dir, until) {
	      var matched = [],
	          truncate = until !== undefined;

	      while ((elem = elem[dir]) && elem.nodeType !== 9) {
	        if (elem.nodeType === 1) {
	          if (truncate && jQuery(elem).is(until)) {
	            break;
	          }

	          matched.push(elem);
	        }
	      }

	      return matched;
	    };

	    var siblings = function (n, elem) {
	      var matched = [];

	      for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== elem) {
	          matched.push(n);
	        }
	      }

	      return matched;
	    };

	    var rneedsContext = jQuery.expr.match.needsContext;

	    function nodeName(elem, name) {
	      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	    }

	    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; // Implement the identical functionality for filter and not

	    function winnow(elements, qualifier, not) {
	      if (isFunction(qualifier)) {
	        return jQuery.grep(elements, function (elem, i) {
	          return !!qualifier.call(elem, i, elem) !== not;
	        });
	      } // Single element


	      if (qualifier.nodeType) {
	        return jQuery.grep(elements, function (elem) {
	          return elem === qualifier !== not;
	        });
	      } // Arraylike of elements (jQuery, arguments, Array)


	      if (typeof qualifier !== "string") {
	        return jQuery.grep(elements, function (elem) {
	          return indexOf.call(qualifier, elem) > -1 !== not;
	        });
	      } // Filtered directly for both simple and complex selectors


	      return jQuery.filter(qualifier, elements, not);
	    }

	    jQuery.filter = function (expr, elems, not) {
	      var elem = elems[0];

	      if (not) {
	        expr = ":not(" + expr + ")";
	      }

	      if (elems.length === 1 && elem.nodeType === 1) {
	        return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
	      }

	      return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
	        return elem.nodeType === 1;
	      }));
	    };

	    jQuery.fn.extend({
	      find: function (selector) {
	        var i,
	            ret,
	            len = this.length,
	            self = this;

	        if (typeof selector !== "string") {
	          return this.pushStack(jQuery(selector).filter(function () {
	            for (i = 0; i < len; i++) {
	              if (jQuery.contains(self[i], this)) {
	                return true;
	              }
	            }
	          }));
	        }

	        ret = this.pushStack([]);

	        for (i = 0; i < len; i++) {
	          jQuery.find(selector, self[i], ret);
	        }

	        return len > 1 ? jQuery.uniqueSort(ret) : ret;
	      },
	      filter: function (selector) {
	        return this.pushStack(winnow(this, selector || [], false));
	      },
	      not: function (selector) {
	        return this.pushStack(winnow(this, selector || [], true));
	      },
	      is: function (selector) {
	        return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
	        // so $("p:first").is("p:last") won't return true for a doc with two "p".
	        typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
	      }
	    }); // Initialize a jQuery object
	    // A central reference to the root jQuery(document)

	    var rootjQuery,
	        // A simple way to check for HTML strings
	    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	    // Strict HTML recognition (#11290: must start with <)
	    // Shortcut simple #id case for speed
	    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	        init = jQuery.fn.init = function (selector, context, root) {
	      var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

	      if (!selector) {
	        return this;
	      } // Method init() accepts an alternate rootjQuery
	      // so migrate can support jQuery.sub (gh-2101)


	      root = root || rootjQuery; // Handle HTML strings

	      if (typeof selector === "string") {
	        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
	          // Assume that strings that start and end with <> are HTML and skip the regex check
	          match = [null, selector, null];
	        } else {
	          match = rquickExpr.exec(selector);
	        } // Match html or make sure no context is specified for #id


	        if (match && (match[1] || !context)) {
	          // HANDLE: $(html) -> $(array)
	          if (match[1]) {
	            context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
	            // Intentionally let the error be thrown if parseHTML is not present

	            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

	            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	              for (match in context) {
	                // Properties of context are called as methods if possible
	                if (isFunction(this[match])) {
	                  this[match](context[match]); // ...and otherwise set as attributes
	                } else {
	                  this.attr(match, context[match]);
	                }
	              }
	            }

	            return this; // HANDLE: $(#id)
	          } else {
	            elem = document.getElementById(match[2]);

	            if (elem) {
	              // Inject the element directly into the jQuery object
	              this[0] = elem;
	              this.length = 1;
	            }

	            return this;
	          } // HANDLE: $(expr, $(...))

	        } else if (!context || context.jquery) {
	          return (context || root).find(selector); // HANDLE: $(expr, context)
	          // (which is just equivalent to: $(context).find(expr)
	        } else {
	          return this.constructor(context).find(selector);
	        } // HANDLE: $(DOMElement)

	      } else if (selector.nodeType) {
	        this[0] = selector;
	        this.length = 1;
	        return this; // HANDLE: $(function)
	        // Shortcut for document ready
	      } else if (isFunction(selector)) {
	        return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
	        selector(jQuery);
	      }

	      return jQuery.makeArray(selector, this);
	    }; // Give the init function the jQuery prototype for later instantiation


	    init.prototype = jQuery.fn; // Initialize central reference

	    rootjQuery = jQuery(document);
	    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	        // Methods guaranteed to produce a unique set when starting from a unique set
	    guaranteedUnique = {
	      children: true,
	      contents: true,
	      next: true,
	      prev: true
	    };
	    jQuery.fn.extend({
	      has: function (target) {
	        var targets = jQuery(target, this),
	            l = targets.length;
	        return this.filter(function () {
	          var i = 0;

	          for (; i < l; i++) {
	            if (jQuery.contains(this, targets[i])) {
	              return true;
	            }
	          }
	        });
	      },
	      closest: function (selectors, context) {
	        var cur,
	            i = 0,
	            l = this.length,
	            matched = [],
	            targets = typeof selectors !== "string" && jQuery(selectors); // Positional selectors never match, since there's no _selection_ context

	        if (!rneedsContext.test(selectors)) {
	          for (; i < l; i++) {
	            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
	              // Always skip document fragments
	              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
	              cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
	                matched.push(cur);
	                break;
	              }
	            }
	          }
	        }

	        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
	      },
	      // Determine the position of an element within the set
	      index: function (elem) {
	        // No argument, return index in parent
	        if (!elem) {
	          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
	        } // Index in selector


	        if (typeof elem === "string") {
	          return indexOf.call(jQuery(elem), this[0]);
	        } // Locate the position of the desired element


	        return indexOf.call(this, // If it receives a jQuery object, the first element is used
	        elem.jquery ? elem[0] : elem);
	      },
	      add: function (selector, context) {
	        return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
	      },
	      addBack: function (selector) {
	        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	      }
	    });

	    function sibling(cur, dir) {
	      while ((cur = cur[dir]) && cur.nodeType !== 1) {}

	      return cur;
	    }

	    jQuery.each({
	      parent: function (elem) {
	        var parent = elem.parentNode;
	        return parent && parent.nodeType !== 11 ? parent : null;
	      },
	      parents: function (elem) {
	        return dir(elem, "parentNode");
	      },
	      parentsUntil: function (elem, _i, until) {
	        return dir(elem, "parentNode", until);
	      },
	      next: function (elem) {
	        return sibling(elem, "nextSibling");
	      },
	      prev: function (elem) {
	        return sibling(elem, "previousSibling");
	      },
	      nextAll: function (elem) {
	        return dir(elem, "nextSibling");
	      },
	      prevAll: function (elem) {
	        return dir(elem, "previousSibling");
	      },
	      nextUntil: function (elem, _i, until) {
	        return dir(elem, "nextSibling", until);
	      },
	      prevUntil: function (elem, _i, until) {
	        return dir(elem, "previousSibling", until);
	      },
	      siblings: function (elem) {
	        return siblings((elem.parentNode || {}).firstChild, elem);
	      },
	      children: function (elem) {
	        return siblings(elem.firstChild);
	      },
	      contents: function (elem) {
	        if (elem.contentDocument != null && // Support: IE 11+
	        // <object> elements with no `data` attribute has an object
	        // `contentDocument` with a `null` prototype.
	        getProto(elem.contentDocument)) {
	          return elem.contentDocument;
	        } // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
	        // Treat the template element as a regular one in browsers that
	        // don't support it.


	        if (nodeName(elem, "template")) {
	          elem = elem.content || elem;
	        }

	        return jQuery.merge([], elem.childNodes);
	      }
	    }, function (name, fn) {
	      jQuery.fn[name] = function (until, selector) {
	        var matched = jQuery.map(this, fn, until);

	        if (name.slice(-5) !== "Until") {
	          selector = until;
	        }

	        if (selector && typeof selector === "string") {
	          matched = jQuery.filter(selector, matched);
	        }

	        if (this.length > 1) {
	          // Remove duplicates
	          if (!guaranteedUnique[name]) {
	            jQuery.uniqueSort(matched);
	          } // Reverse order for parents* and prev-derivatives


	          if (rparentsprev.test(name)) {
	            matched.reverse();
	          }
	        }

	        return this.pushStack(matched);
	      };
	    });
	    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g; // Convert String-formatted options into Object-formatted ones

	    function createOptions(options) {
	      var object = {};
	      jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
	        object[flag] = true;
	      });
	      return object;
	    }
	    /*
	     * Create a callback list using the following parameters:
	     *
	     *	options: an optional list of space-separated options that will change how
	     *			the callback list behaves or a more traditional option object
	     *
	     * By default a callback list will act like an event callback list and can be
	     * "fired" multiple times.
	     *
	     * Possible options:
	     *
	     *	once:			will ensure the callback list can only be fired once (like a Deferred)
	     *
	     *	memory:			will keep track of previous values and will call any callback added
	     *					after the list has been fired right away with the latest "memorized"
	     *					values (like a Deferred)
	     *
	     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	     *
	     *	stopOnFalse:	interrupt callings when a callback returns false
	     *
	     */


	    jQuery.Callbacks = function (options) {
	      // Convert options from String-formatted to Object-formatted if needed
	      // (we check in cache first)
	      options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

	      var // Flag to know if list is currently firing
	      firing,
	          // Last fire value for non-forgettable lists
	      memory,
	          // Flag to know if list was already fired
	      fired,
	          // Flag to prevent firing
	      locked,
	          // Actual callback list
	      list = [],
	          // Queue of execution data for repeatable lists
	      queue = [],
	          // Index of currently firing callback (modified by add/remove as needed)
	      firingIndex = -1,
	          // Fire callbacks
	      fire = function () {
	        // Enforce single-firing
	        locked = locked || options.once; // Execute callbacks for all pending executions,
	        // respecting firingIndex overrides and runtime changes

	        fired = firing = true;

	        for (; queue.length; firingIndex = -1) {
	          memory = queue.shift();

	          while (++firingIndex < list.length) {
	            // Run callback and check for early termination
	            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
	              // Jump to end and forget the data so .add doesn't re-fire
	              firingIndex = list.length;
	              memory = false;
	            }
	          }
	        } // Forget the data if we're done with it


	        if (!options.memory) {
	          memory = false;
	        }

	        firing = false; // Clean up if we're done firing for good

	        if (locked) {
	          // Keep an empty list if we have data for future add calls
	          if (memory) {
	            list = []; // Otherwise, this object is spent
	          } else {
	            list = "";
	          }
	        }
	      },
	          // Actual Callbacks object
	      self = {
	        // Add a callback or a collection of callbacks to the list
	        add: function () {
	          if (list) {
	            // If we have memory from a past run, we should fire after adding
	            if (memory && !firing) {
	              firingIndex = list.length - 1;
	              queue.push(memory);
	            }

	            (function add(args) {
	              jQuery.each(args, function (_, arg) {
	                if (isFunction(arg)) {
	                  if (!options.unique || !self.has(arg)) {
	                    list.push(arg);
	                  }
	                } else if (arg && arg.length && toType(arg) !== "string") {
	                  // Inspect recursively
	                  add(arg);
	                }
	              });
	            })(arguments);

	            if (memory && !firing) {
	              fire();
	            }
	          }

	          return this;
	        },
	        // Remove a callback from the list
	        remove: function () {
	          jQuery.each(arguments, function (_, arg) {
	            var index;

	            while ((index = jQuery.inArray(arg, list, index)) > -1) {
	              list.splice(index, 1); // Handle firing indexes

	              if (index <= firingIndex) {
	                firingIndex--;
	              }
	            }
	          });
	          return this;
	        },
	        // Check if a given callback is in the list.
	        // If no argument is given, return whether or not list has callbacks attached.
	        has: function (fn) {
	          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
	        },
	        // Remove all callbacks from the list
	        empty: function () {
	          if (list) {
	            list = [];
	          }

	          return this;
	        },
	        // Disable .fire and .add
	        // Abort any current/pending executions
	        // Clear all callbacks and values
	        disable: function () {
	          locked = queue = [];
	          list = memory = "";
	          return this;
	        },
	        disabled: function () {
	          return !list;
	        },
	        // Disable .fire
	        // Also disable .add unless we have memory (since it would have no effect)
	        // Abort any pending executions
	        lock: function () {
	          locked = queue = [];

	          if (!memory && !firing) {
	            list = memory = "";
	          }

	          return this;
	        },
	        locked: function () {
	          return !!locked;
	        },
	        // Call all callbacks with the given context and arguments
	        fireWith: function (context, args) {
	          if (!locked) {
	            args = args || [];
	            args = [context, args.slice ? args.slice() : args];
	            queue.push(args);

	            if (!firing) {
	              fire();
	            }
	          }

	          return this;
	        },
	        // Call all the callbacks with the given arguments
	        fire: function () {
	          self.fireWith(this, arguments);
	          return this;
	        },
	        // To know if the callbacks have already been called at least once
	        fired: function () {
	          return !!fired;
	        }
	      };

	      return self;
	    };

	    function Identity(v) {
	      return v;
	    }

	    function Thrower(ex) {
	      throw ex;
	    }

	    function adoptValue(value, resolve, reject, noValue) {
	      var method;

	      try {
	        // Check for promise aspect first to privilege synchronous behavior
	        if (value && isFunction(method = value.promise)) {
	          method.call(value).done(resolve).fail(reject); // Other thenables
	        } else if (value && isFunction(method = value.then)) {
	          method.call(value, resolve, reject); // Other non-thenables
	        } else {
	          // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
	          // * false: [ value ].slice( 0 ) => resolve( value )
	          // * true: [ value ].slice( 1 ) => resolve()
	          resolve.apply(undefined, [value].slice(noValue));
	        } // For Promises/A+, convert exceptions into rejections
	        // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	        // Deferred#then to conditionally suppress rejection.

	      } catch (value) {
	        // Support: Android 4.0 only
	        // Strict mode functions invoked without .call/.apply get global-object context
	        reject.apply(undefined, [value]);
	      }
	    }

	    jQuery.extend({
	      Deferred: function (func) {
	        var tuples = [// action, add listener, callbacks,
	        // ... .then handlers, argument index, [final state]
	        ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
	            state = "pending",
	            promise = {
	          state: function () {
	            return state;
	          },
	          always: function () {
	            deferred.done(arguments).fail(arguments);
	            return this;
	          },
	          "catch": function (fn) {
	            return promise.then(null, fn);
	          },
	          // Keep pipe for back-compat
	          pipe: function
	            /* fnDone, fnFail, fnProgress */
	          () {
	            var fns = arguments;
	            return jQuery.Deferred(function (newDefer) {
	              jQuery.each(tuples, function (_i, tuple) {
	                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
	                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]]; // deferred.progress(function() { bind to newDefer or newDefer.notify })
	                // deferred.done(function() { bind to newDefer or newDefer.resolve })
	                // deferred.fail(function() { bind to newDefer or newDefer.reject })

	                deferred[tuple[1]](function () {
	                  var returned = fn && fn.apply(this, arguments);

	                  if (returned && isFunction(returned.promise)) {
	                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
	                  } else {
	                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
	                  }
	                });
	              });
	              fns = null;
	            }).promise();
	          },
	          then: function (onFulfilled, onRejected, onProgress) {
	            var maxDepth = 0;

	            function resolve(depth, deferred, handler, special) {
	              return function () {
	                var that = this,
	                    args = arguments,
	                    mightThrow = function () {
	                  var returned, then; // Support: Promises/A+ section 2.3.3.3.3
	                  // https://promisesaplus.com/#point-59
	                  // Ignore double-resolution attempts

	                  if (depth < maxDepth) {
	                    return;
	                  }

	                  returned = handler.apply(that, args); // Support: Promises/A+ section 2.3.1
	                  // https://promisesaplus.com/#point-48

	                  if (returned === deferred.promise()) {
	                    throw new TypeError("Thenable self-resolution");
	                  } // Support: Promises/A+ sections 2.3.3.1, 3.5
	                  // https://promisesaplus.com/#point-54
	                  // https://promisesaplus.com/#point-75
	                  // Retrieve `then` only once


	                  then = returned && ( // Support: Promises/A+ section 2.3.4
	                  // https://promisesaplus.com/#point-64
	                  // Only check objects and functions for thenability
	                  typeof returned === "object" || typeof returned === "function") && returned.then; // Handle a returned thenable

	                  if (isFunction(then)) {
	                    // Special processors (notify) just wait for resolution
	                    if (special) {
	                      then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)); // Normal processors (resolve) also hook into progress
	                    } else {
	                      // ...and disregard older resolution values
	                      maxDepth++;
	                      then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
	                    } // Handle all other returned values

	                  } else {
	                    // Only substitute handlers pass on context
	                    // and multiple values (non-spec behavior)
	                    if (handler !== Identity) {
	                      that = undefined;
	                      args = [returned];
	                    } // Process the value(s)
	                    // Default process is resolve


	                    (special || deferred.resolveWith)(that, args);
	                  }
	                },
	                    // Only normal processors (resolve) catch and reject exceptions
	                process = special ? mightThrow : function () {
	                  try {
	                    mightThrow();
	                  } catch (e) {
	                    if (jQuery.Deferred.exceptionHook) {
	                      jQuery.Deferred.exceptionHook(e, process.stackTrace);
	                    } // Support: Promises/A+ section 2.3.3.3.4.1
	                    // https://promisesaplus.com/#point-61
	                    // Ignore post-resolution exceptions


	                    if (depth + 1 >= maxDepth) {
	                      // Only substitute handlers pass on context
	                      // and multiple values (non-spec behavior)
	                      if (handler !== Thrower) {
	                        that = undefined;
	                        args = [e];
	                      }

	                      deferred.rejectWith(that, args);
	                    }
	                  }
	                }; // Support: Promises/A+ section 2.3.3.3.1
	                // https://promisesaplus.com/#point-57
	                // Re-resolve promises immediately to dodge false rejection from
	                // subsequent errors


	                if (depth) {
	                  process();
	                } else {
	                  // Call an optional hook to record the stack, in case of exception
	                  // since it's otherwise lost when execution goes async
	                  if (jQuery.Deferred.getStackHook) {
	                    process.stackTrace = jQuery.Deferred.getStackHook();
	                  }

	                  window.setTimeout(process);
	                }
	              };
	            }

	            return jQuery.Deferred(function (newDefer) {
	              // progress_handlers.add( ... )
	              tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)); // fulfilled_handlers.add( ... )

	              tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)); // rejected_handlers.add( ... )

	              tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
	            }).promise();
	          },
	          // Get a promise for this deferred
	          // If obj is provided, the promise aspect is added to the object
	          promise: function (obj) {
	            return obj != null ? jQuery.extend(obj, promise) : promise;
	          }
	        },
	            deferred = {}; // Add list-specific methods

	        jQuery.each(tuples, function (i, tuple) {
	          var list = tuple[2],
	              stateString = tuple[5]; // promise.progress = list.add
	          // promise.done = list.add
	          // promise.fail = list.add

	          promise[tuple[1]] = list.add; // Handle state

	          if (stateString) {
	            list.add(function () {
	              // state = "resolved" (i.e., fulfilled)
	              // state = "rejected"
	              state = stateString;
	            }, // rejected_callbacks.disable
	            // fulfilled_callbacks.disable
	            tuples[3 - i][2].disable, // rejected_handlers.disable
	            // fulfilled_handlers.disable
	            tuples[3 - i][3].disable, // progress_callbacks.lock
	            tuples[0][2].lock, // progress_handlers.lock
	            tuples[0][3].lock);
	          } // progress_handlers.fire
	          // fulfilled_handlers.fire
	          // rejected_handlers.fire


	          list.add(tuple[3].fire); // deferred.notify = function() { deferred.notifyWith(...) }
	          // deferred.resolve = function() { deferred.resolveWith(...) }
	          // deferred.reject = function() { deferred.rejectWith(...) }

	          deferred[tuple[0]] = function () {
	            deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
	            return this;
	          }; // deferred.notifyWith = list.fireWith
	          // deferred.resolveWith = list.fireWith
	          // deferred.rejectWith = list.fireWith


	          deferred[tuple[0] + "With"] = list.fireWith;
	        }); // Make the deferred a promise

	        promise.promise(deferred); // Call given func if any

	        if (func) {
	          func.call(deferred, deferred);
	        } // All done!


	        return deferred;
	      },
	      // Deferred helper
	      when: function (singleValue) {
	        var // count of uncompleted subordinates
	        remaining = arguments.length,
	            // count of unprocessed arguments
	        i = remaining,
	            // subordinate fulfillment data
	        resolveContexts = Array(i),
	            resolveValues = slice.call(arguments),
	            // the primary Deferred
	        primary = jQuery.Deferred(),
	            // subordinate callback factory
	        updateFunc = function (i) {
	          return function (value) {
	            resolveContexts[i] = this;
	            resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;

	            if (! --remaining) {
	              primary.resolveWith(resolveContexts, resolveValues);
	            }
	          };
	        }; // Single- and empty arguments are adopted like Promise.resolve


	        if (remaining <= 1) {
	          adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining); // Use .then() to unwrap secondary thenables (cf. gh-3000)

	          if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
	            return primary.then();
	          }
	        } // Multiple arguments are aggregated like Promise.all array elements


	        while (i--) {
	          adoptValue(resolveValues[i], updateFunc(i), primary.reject);
	        }

	        return primary.promise();
	      }
	    }); // These usually indicate a programmer mistake during development,
	    // warn about them ASAP rather than swallowing them by default.

	    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	    jQuery.Deferred.exceptionHook = function (error, stack) {
	      // Support: IE 8 - 9 only
	      // Console exists when dev tools are open, which can happen at any time
	      if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
	        window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
	      }
	    };

	    jQuery.readyException = function (error) {
	      window.setTimeout(function () {
	        throw error;
	      });
	    }; // The deferred used on DOM ready


	    var readyList = jQuery.Deferred();

	    jQuery.fn.ready = function (fn) {
	      readyList.then(fn) // Wrap jQuery.readyException in a function so that the lookup
	      // happens at the time of error handling instead of callback
	      // registration.
	      .catch(function (error) {
	        jQuery.readyException(error);
	      });
	      return this;
	    };

	    jQuery.extend({
	      // Is the DOM ready to be used? Set to true once it occurs.
	      isReady: false,
	      // A counter to track how many items to wait for before
	      // the ready event fires. See #6781
	      readyWait: 1,
	      // Handle when the DOM is ready
	      ready: function (wait) {
	        // Abort if there are pending holds or we're already ready
	        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	          return;
	        } // Remember that the DOM is ready


	        jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be

	        if (wait !== true && --jQuery.readyWait > 0) {
	          return;
	        } // If there are functions bound, to execute


	        readyList.resolveWith(document, [jQuery]);
	      }
	    });
	    jQuery.ready.then = readyList.then; // The ready event handler and self cleanup method

	    function completed() {
	      document.removeEventListener("DOMContentLoaded", completed);
	      window.removeEventListener("load", completed);
	      jQuery.ready();
	    } // Catch cases where $(document).ready() is called
	    // after the browser event has already occurred.
	    // Support: IE <=9 - 10 only
	    // Older IE sometimes signals "interactive" too soon


	    if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
	      // Handle it asynchronously to allow scripts the opportunity to delay ready
	      window.setTimeout(jQuery.ready);
	    } else {
	      // Use the handy event callback
	      document.addEventListener("DOMContentLoaded", completed); // A fallback to window.onload, that will always work

	      window.addEventListener("load", completed);
	    } // Multifunctional method to get and set values of a collection
	    // The value/s can optionally be executed if it's a function


	    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	      var i = 0,
	          len = elems.length,
	          bulk = key == null; // Sets many values

	      if (toType(key) === "object") {
	        chainable = true;

	        for (i in key) {
	          access(elems, fn, i, key[i], true, emptyGet, raw);
	        } // Sets one value

	      } else if (value !== undefined) {
	        chainable = true;

	        if (!isFunction(value)) {
	          raw = true;
	        }

	        if (bulk) {
	          // Bulk operations run against the entire set
	          if (raw) {
	            fn.call(elems, value);
	            fn = null; // ...except when executing function values
	          } else {
	            bulk = fn;

	            fn = function (elem, _key, value) {
	              return bulk.call(jQuery(elem), value);
	            };
	          }
	        }

	        if (fn) {
	          for (; i < len; i++) {
	            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	          }
	        }
	      }

	      if (chainable) {
	        return elems;
	      } // Gets


	      if (bulk) {
	        return fn.call(elems);
	      }

	      return len ? fn(elems[0], key) : emptyGet;
	    }; // Matches dashed string for camelizing


	    var rmsPrefix = /^-ms-/,
	        rdashAlpha = /-([a-z])/g; // Used by camelCase as callback to replace()

	    function fcamelCase(_all, letter) {
	      return letter.toUpperCase();
	    } // Convert dashed to camelCase; used by the css and data modules
	    // Support: IE <=9 - 11, Edge 12 - 15
	    // Microsoft forgot to hump their vendor prefix (#9572)


	    function camelCase(string) {
	      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	    }

	    var acceptData = function (owner) {
	      // Accepts only:
	      //  - Node
	      //    - Node.ELEMENT_NODE
	      //    - Node.DOCUMENT_NODE
	      //  - Object
	      //    - Any
	      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	    };

	    function Data() {
	      this.expando = jQuery.expando + Data.uid++;
	    }

	    Data.uid = 1;
	    Data.prototype = {
	      cache: function (owner) {
	        // Check if the owner object already has a cache
	        var value = owner[this.expando]; // If not, create one

	        if (!value) {
	          value = {}; // We can accept data for non-element nodes in modern browsers,
	          // but we should not, see #8335.
	          // Always return an empty object.

	          if (acceptData(owner)) {
	            // If it is a node unlikely to be stringify-ed or looped over
	            // use plain assignment
	            if (owner.nodeType) {
	              owner[this.expando] = value; // Otherwise secure it in a non-enumerable property
	              // configurable must be true to allow the property to be
	              // deleted when data is removed
	            } else {
	              Object.defineProperty(owner, this.expando, {
	                value: value,
	                configurable: true
	              });
	            }
	          }
	        }

	        return value;
	      },
	      set: function (owner, data, value) {
	        var prop,
	            cache = this.cache(owner); // Handle: [ owner, key, value ] args
	        // Always use camelCase key (gh-2257)

	        if (typeof data === "string") {
	          cache[camelCase(data)] = value; // Handle: [ owner, { properties } ] args
	        } else {
	          // Copy the properties one-by-one to the cache object
	          for (prop in data) {
	            cache[camelCase(prop)] = data[prop];
	          }
	        }

	        return cache;
	      },
	      get: function (owner, key) {
	        return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
	        owner[this.expando] && owner[this.expando][camelCase(key)];
	      },
	      access: function (owner, key, value) {
	        // In cases where either:
	        //
	        //   1. No key was specified
	        //   2. A string key was specified, but no value provided
	        //
	        // Take the "read" path and allow the get method to determine
	        // which value to return, respectively either:
	        //
	        //   1. The entire cache object
	        //   2. The data stored at the key
	        //
	        if (key === undefined || key && typeof key === "string" && value === undefined) {
	          return this.get(owner, key);
	        } // When the key is not a string, or both a key and value
	        // are specified, set or extend (existing objects) with either:
	        //
	        //   1. An object of properties
	        //   2. A key and value
	        //


	        this.set(owner, key, value); // Since the "set" path can have two possible entry points
	        // return the expected data based on which path was taken[*]

	        return value !== undefined ? value : key;
	      },
	      remove: function (owner, key) {
	        var i,
	            cache = owner[this.expando];

	        if (cache === undefined) {
	          return;
	        }

	        if (key !== undefined) {
	          // Support array or space separated string of keys
	          if (Array.isArray(key)) {
	            // If key is an array of keys...
	            // We always set camelCase keys, so remove that.
	            key = key.map(camelCase);
	          } else {
	            key = camelCase(key); // If a key with the spaces exists, use it.
	            // Otherwise, create an array by matching non-whitespace

	            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
	          }

	          i = key.length;

	          while (i--) {
	            delete cache[key[i]];
	          }
	        } // Remove the expando if there's no more data


	        if (key === undefined || jQuery.isEmptyObject(cache)) {
	          // Support: Chrome <=35 - 45
	          // Webkit & Blink performance suffers when deleting properties
	          // from DOM nodes, so set to undefined instead
	          // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
	          if (owner.nodeType) {
	            owner[this.expando] = undefined;
	          } else {
	            delete owner[this.expando];
	          }
	        }
	      },
	      hasData: function (owner) {
	        var cache = owner[this.expando];
	        return cache !== undefined && !jQuery.isEmptyObject(cache);
	      }
	    };
	    var dataPriv = new Data();
	    var dataUser = new Data(); //	Implementation Summary
	    //
	    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
	    //	2. Improve the module's maintainability by reducing the storage
	    //		paths to a single mechanism.
	    //	3. Use the same single mechanism to support "private" and "user" data.
	    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
	    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	        rmultiDash = /[A-Z]/g;

	    function getData(data) {
	      if (data === "true") {
	        return true;
	      }

	      if (data === "false") {
	        return false;
	      }

	      if (data === "null") {
	        return null;
	      } // Only convert to a number if it doesn't change the string


	      if (data === +data + "") {
	        return +data;
	      }

	      if (rbrace.test(data)) {
	        return JSON.parse(data);
	      }

	      return data;
	    }

	    function dataAttr(elem, key, data) {
	      var name; // If nothing was found internally, try to fetch any
	      // data from the HTML5 data-* attribute

	      if (data === undefined && elem.nodeType === 1) {
	        name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
	        data = elem.getAttribute(name);

	        if (typeof data === "string") {
	          try {
	            data = getData(data);
	          } catch (e) {} // Make sure we set the data so it isn't changed later


	          dataUser.set(elem, key, data);
	        } else {
	          data = undefined;
	        }
	      }

	      return data;
	    }

	    jQuery.extend({
	      hasData: function (elem) {
	        return dataUser.hasData(elem) || dataPriv.hasData(elem);
	      },
	      data: function (elem, name, data) {
	        return dataUser.access(elem, name, data);
	      },
	      removeData: function (elem, name) {
	        dataUser.remove(elem, name);
	      },
	      // TODO: Now that all calls to _data and _removeData have been replaced
	      // with direct calls to dataPriv methods, these can be deprecated.
	      _data: function (elem, name, data) {
	        return dataPriv.access(elem, name, data);
	      },
	      _removeData: function (elem, name) {
	        dataPriv.remove(elem, name);
	      }
	    });
	    jQuery.fn.extend({
	      data: function (key, value) {
	        var i,
	            name,
	            data,
	            elem = this[0],
	            attrs = elem && elem.attributes; // Gets all values

	        if (key === undefined) {
	          if (this.length) {
	            data = dataUser.get(elem);

	            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
	              i = attrs.length;

	              while (i--) {
	                // Support: IE 11 only
	                // The attrs elements can be null (#14894)
	                if (attrs[i]) {
	                  name = attrs[i].name;

	                  if (name.indexOf("data-") === 0) {
	                    name = camelCase(name.slice(5));
	                    dataAttr(elem, name, data[name]);
	                  }
	                }
	              }

	              dataPriv.set(elem, "hasDataAttrs", true);
	            }
	          }

	          return data;
	        } // Sets multiple values


	        if (typeof key === "object") {
	          return this.each(function () {
	            dataUser.set(this, key);
	          });
	        }

	        return access(this, function (value) {
	          var data; // The calling jQuery object (element matches) is not empty
	          // (and therefore has an element appears at this[ 0 ]) and the
	          // `value` parameter was not undefined. An empty jQuery object
	          // will result in `undefined` for elem = this[ 0 ] which will
	          // throw an exception if an attempt to read a data cache is made.

	          if (elem && value === undefined) {
	            // Attempt to get data from the cache
	            // The key will always be camelCased in Data
	            data = dataUser.get(elem, key);

	            if (data !== undefined) {
	              return data;
	            } // Attempt to "discover" the data in
	            // HTML5 custom data-* attrs


	            data = dataAttr(elem, key);

	            if (data !== undefined) {
	              return data;
	            } // We tried really hard, but the data doesn't exist.


	            return;
	          } // Set the data...


	          this.each(function () {
	            // We always store the camelCased key
	            dataUser.set(this, key, value);
	          });
	        }, null, value, arguments.length > 1, null, true);
	      },
	      removeData: function (key) {
	        return this.each(function () {
	          dataUser.remove(this, key);
	        });
	      }
	    });
	    jQuery.extend({
	      queue: function (elem, type, data) {
	        var queue;

	        if (elem) {
	          type = (type || "fx") + "queue";
	          queue = dataPriv.get(elem, type); // Speed up dequeue by getting out quickly if this is just a lookup

	          if (data) {
	            if (!queue || Array.isArray(data)) {
	              queue = dataPriv.access(elem, type, jQuery.makeArray(data));
	            } else {
	              queue.push(data);
	            }
	          }

	          return queue || [];
	        }
	      },
	      dequeue: function (elem, type) {
	        type = type || "fx";

	        var queue = jQuery.queue(elem, type),
	            startLength = queue.length,
	            fn = queue.shift(),
	            hooks = jQuery._queueHooks(elem, type),
	            next = function () {
	          jQuery.dequeue(elem, type);
	        }; // If the fx queue is dequeued, always remove the progress sentinel


	        if (fn === "inprogress") {
	          fn = queue.shift();
	          startLength--;
	        }

	        if (fn) {
	          // Add a progress sentinel to prevent the fx queue from being
	          // automatically dequeued
	          if (type === "fx") {
	            queue.unshift("inprogress");
	          } // Clear up the last queue stop function


	          delete hooks.stop;
	          fn.call(elem, next, hooks);
	        }

	        if (!startLength && hooks) {
	          hooks.empty.fire();
	        }
	      },
	      // Not public - generate a queueHooks object, or return the current one
	      _queueHooks: function (elem, type) {
	        var key = type + "queueHooks";
	        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
	          empty: jQuery.Callbacks("once memory").add(function () {
	            dataPriv.remove(elem, [type + "queue", key]);
	          })
	        });
	      }
	    });
	    jQuery.fn.extend({
	      queue: function (type, data) {
	        var setter = 2;

	        if (typeof type !== "string") {
	          data = type;
	          type = "fx";
	          setter--;
	        }

	        if (arguments.length < setter) {
	          return jQuery.queue(this[0], type);
	        }

	        return data === undefined ? this : this.each(function () {
	          var queue = jQuery.queue(this, type, data); // Ensure a hooks for this queue

	          jQuery._queueHooks(this, type);

	          if (type === "fx" && queue[0] !== "inprogress") {
	            jQuery.dequeue(this, type);
	          }
	        });
	      },
	      dequeue: function (type) {
	        return this.each(function () {
	          jQuery.dequeue(this, type);
	        });
	      },
	      clearQueue: function (type) {
	        return this.queue(type || "fx", []);
	      },
	      // Get a promise resolved when queues of a certain type
	      // are emptied (fx is the type by default)
	      promise: function (type, obj) {
	        var tmp,
	            count = 1,
	            defer = jQuery.Deferred(),
	            elements = this,
	            i = this.length,
	            resolve = function () {
	          if (! --count) {
	            defer.resolveWith(elements, [elements]);
	          }
	        };

	        if (typeof type !== "string") {
	          obj = type;
	          type = undefined;
	        }

	        type = type || "fx";

	        while (i--) {
	          tmp = dataPriv.get(elements[i], type + "queueHooks");

	          if (tmp && tmp.empty) {
	            count++;
	            tmp.empty.add(resolve);
	          }
	        }

	        resolve();
	        return defer.promise(obj);
	      }
	    });
	    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
	    var cssExpand = ["Top", "Right", "Bottom", "Left"];
	    var documentElement = document.documentElement;

	    var isAttached = function (elem) {
	      return jQuery.contains(elem.ownerDocument, elem);
	    },
	        composed = {
	      composed: true
	    }; // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	    // Check attachment across shadow DOM boundaries when possible (gh-3504)
	    // Support: iOS 10.0-10.2 only
	    // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	    // leading to errors. We need to check for `getRootNode`.


	    if (documentElement.getRootNode) {
	      isAttached = function (elem) {
	        return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
	      };
	    }

	    var isHiddenWithinTree = function (elem, el) {
	      // isHiddenWithinTree might be called from jQuery#filter function;
	      // in that case, element will be second argument
	      elem = el || elem; // Inline style trumps all

	      return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
	      // Support: Firefox <=43 - 45
	      // Disconnected elements can have computed display: none, so first confirm that elem is
	      // in the document.
	      isAttached(elem) && jQuery.css(elem, "display") === "none";
	    };

	    function adjustCSS(elem, prop, valueParts, tween) {
	      var adjusted,
	          scale,
	          maxIterations = 20,
	          currentValue = tween ? function () {
	        return tween.cur();
	      } : function () {
	        return jQuery.css(elem, prop, "");
	      },
	          initial = currentValue(),
	          unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
	          // Starting value computation is required for potential unit mismatches
	      initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

	      if (initialInUnit && initialInUnit[3] !== unit) {
	        // Support: Firefox <=54
	        // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
	        initial = initial / 2; // Trust units reported by jQuery.css

	        unit = unit || initialInUnit[3]; // Iteratively approximate from a nonzero starting point

	        initialInUnit = +initial || 1;

	        while (maxIterations--) {
	          // Evaluate and update our best guess (doubling guesses that zero out).
	          // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
	          jQuery.style(elem, prop, initialInUnit + unit);

	          if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
	            maxIterations = 0;
	          }

	          initialInUnit = initialInUnit / scale;
	        }

	        initialInUnit = initialInUnit * 2;
	        jQuery.style(elem, prop, initialInUnit + unit); // Make sure we update the tween properties later on

	        valueParts = valueParts || [];
	      }

	      if (valueParts) {
	        initialInUnit = +initialInUnit || +initial || 0; // Apply relative offset (+=/-=) if specified

	        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];

	        if (tween) {
	          tween.unit = unit;
	          tween.start = initialInUnit;
	          tween.end = adjusted;
	        }
	      }

	      return adjusted;
	    }

	    var defaultDisplayMap = {};

	    function getDefaultDisplay(elem) {
	      var temp,
	          doc = elem.ownerDocument,
	          nodeName = elem.nodeName,
	          display = defaultDisplayMap[nodeName];

	      if (display) {
	        return display;
	      }

	      temp = doc.body.appendChild(doc.createElement(nodeName));
	      display = jQuery.css(temp, "display");
	      temp.parentNode.removeChild(temp);

	      if (display === "none") {
	        display = "block";
	      }

	      defaultDisplayMap[nodeName] = display;
	      return display;
	    }

	    function showHide(elements, show) {
	      var display,
	          elem,
	          values = [],
	          index = 0,
	          length = elements.length; // Determine new display value for elements that need to change

	      for (; index < length; index++) {
	        elem = elements[index];

	        if (!elem.style) {
	          continue;
	        }

	        display = elem.style.display;

	        if (show) {
	          // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
	          // check is required in this first loop unless we have a nonempty display value (either
	          // inline or about-to-be-restored)
	          if (display === "none") {
	            values[index] = dataPriv.get(elem, "display") || null;

	            if (!values[index]) {
	              elem.style.display = "";
	            }
	          }

	          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
	            values[index] = getDefaultDisplay(elem);
	          }
	        } else {
	          if (display !== "none") {
	            values[index] = "none"; // Remember what we're overwriting

	            dataPriv.set(elem, "display", display);
	          }
	        }
	      } // Set the display of the elements in a second loop to avoid constant reflow


	      for (index = 0; index < length; index++) {
	        if (values[index] != null) {
	          elements[index].style.display = values[index];
	        }
	      }

	      return elements;
	    }

	    jQuery.fn.extend({
	      show: function () {
	        return showHide(this, true);
	      },
	      hide: function () {
	        return showHide(this);
	      },
	      toggle: function (state) {
	        if (typeof state === "boolean") {
	          return state ? this.show() : this.hide();
	        }

	        return this.each(function () {
	          if (isHiddenWithinTree(this)) {
	            jQuery(this).show();
	          } else {
	            jQuery(this).hide();
	          }
	        });
	      }
	    });
	    var rcheckableType = /^(?:checkbox|radio)$/i;
	    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
	    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

	    (function () {
	      var fragment = document.createDocumentFragment(),
	          div = fragment.appendChild(document.createElement("div")),
	          input = document.createElement("input"); // Support: Android 4.0 - 4.3 only
	      // Check state lost if the name is set (#11217)
	      // Support: Windows Web Apps (WWA)
	      // `name` and `type` must use .setAttribute for WWA (#14901)

	      input.setAttribute("type", "radio");
	      input.setAttribute("checked", "checked");
	      input.setAttribute("name", "t");
	      div.appendChild(input); // Support: Android <=4.1 only
	      // Older WebKit doesn't clone checked state correctly in fragments

	      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE <=11 only
	      // Make sure textarea (and checkbox) defaultValue is properly cloned

	      div.innerHTML = "<textarea>x</textarea>";
	      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue; // Support: IE <=9 only
	      // IE <=9 replaces <option> tags with their contents when inserted outside of
	      // the select element.

	      div.innerHTML = "<option></option>";
	      support.option = !!div.lastChild;
	    })(); // We have to close these tags to support XHTML (#13200)


	    var wrapMap = {
	      // XHTML parsers do not magically insert elements in the
	      // same way that tag soup parsers do. So we cannot shorten
	      // this by omitting <tbody> or other required elements.
	      thead: [1, "<table>", "</table>"],
	      col: [2, "<table><colgroup>", "</colgroup></table>"],
	      tr: [2, "<table><tbody>", "</tbody></table>"],
	      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	      _default: [0, "", ""]
	    };
	    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	    wrapMap.th = wrapMap.td; // Support: IE <=9 only

	    if (!support.option) {
	      wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
	    }

	    function getAll(context, tag) {
	      // Support: IE <=9 - 11 only
	      // Use typeof to avoid zero-argument method invocation on host objects (#15151)
	      var ret;

	      if (typeof context.getElementsByTagName !== "undefined") {
	        ret = context.getElementsByTagName(tag || "*");
	      } else if (typeof context.querySelectorAll !== "undefined") {
	        ret = context.querySelectorAll(tag || "*");
	      } else {
	        ret = [];
	      }

	      if (tag === undefined || tag && nodeName(context, tag)) {
	        return jQuery.merge([context], ret);
	      }

	      return ret;
	    } // Mark scripts as having already been evaluated


	    function setGlobalEval(elems, refElements) {
	      var i = 0,
	          l = elems.length;

	      for (; i < l; i++) {
	        dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
	      }
	    }

	    var rhtml = /<|&#?\w+;/;

	    function buildFragment(elems, context, scripts, selection, ignored) {
	      var elem,
	          tmp,
	          tag,
	          wrap,
	          attached,
	          j,
	          fragment = context.createDocumentFragment(),
	          nodes = [],
	          i = 0,
	          l = elems.length;

	      for (; i < l; i++) {
	        elem = elems[i];

	        if (elem || elem === 0) {
	          // Add nodes directly
	          if (toType(elem) === "object") {
	            // Support: Android <=4.0 only, PhantomJS 1 only
	            // push.apply(_, arraylike) throws on ancient WebKit
	            jQuery.merge(nodes, elem.nodeType ? [elem] : elem); // Convert non-html into a text node
	          } else if (!rhtml.test(elem)) {
	            nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
	          } else {
	            tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation

	            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	            wrap = wrapMap[tag] || wrapMap._default;
	            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]; // Descend through wrappers to the right content

	            j = wrap[0];

	            while (j--) {
	              tmp = tmp.lastChild;
	            } // Support: Android <=4.0 only, PhantomJS 1 only
	            // push.apply(_, arraylike) throws on ancient WebKit


	            jQuery.merge(nodes, tmp.childNodes); // Remember the top-level container

	            tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)

	            tmp.textContent = "";
	          }
	        }
	      } // Remove wrapper from fragment


	      fragment.textContent = "";
	      i = 0;

	      while (elem = nodes[i++]) {
	        // Skip elements already in the context collection (trac-4087)
	        if (selection && jQuery.inArray(elem, selection) > -1) {
	          if (ignored) {
	            ignored.push(elem);
	          }

	          continue;
	        }

	        attached = isAttached(elem); // Append to fragment

	        tmp = getAll(fragment.appendChild(elem), "script"); // Preserve script evaluation history

	        if (attached) {
	          setGlobalEval(tmp);
	        } // Capture executables


	        if (scripts) {
	          j = 0;

	          while (elem = tmp[j++]) {
	            if (rscriptType.test(elem.type || "")) {
	              scripts.push(elem);
	            }
	          }
	        }
	      }

	      return fragment;
	    }

	    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	    function returnTrue() {
	      return true;
	    }

	    function returnFalse() {
	      return false;
	    } // Support: IE <=9 - 11+
	    // focus() and blur() are asynchronous, except when they are no-op.
	    // So expect focus to be synchronous when the element is already active,
	    // and blur to be synchronous when the element is not already active.
	    // (focus and blur are always synchronous in other supported browsers,
	    // this just defines when we can count on it).


	    function expectSync(elem, type) {
	      return elem === safeActiveElement() === (type === "focus");
	    } // Support: IE <=9 only
	    // Accessing document.activeElement can throw unexpectedly
	    // https://bugs.jquery.com/ticket/13393


	    function safeActiveElement() {
	      try {
	        return document.activeElement;
	      } catch (err) {}
	    }

	    function on(elem, types, selector, data, fn, one) {
	      var origFn, type; // Types can be a map of types/handlers

	      if (typeof types === "object") {
	        // ( types-Object, selector, data )
	        if (typeof selector !== "string") {
	          // ( types-Object, data )
	          data = data || selector;
	          selector = undefined;
	        }

	        for (type in types) {
	          on(elem, type, selector, data, types[type], one);
	        }

	        return elem;
	      }

	      if (data == null && fn == null) {
	        // ( types, fn )
	        fn = selector;
	        data = selector = undefined;
	      } else if (fn == null) {
	        if (typeof selector === "string") {
	          // ( types, selector, fn )
	          fn = data;
	          data = undefined;
	        } else {
	          // ( types, data, fn )
	          fn = data;
	          data = selector;
	          selector = undefined;
	        }
	      }

	      if (fn === false) {
	        fn = returnFalse;
	      } else if (!fn) {
	        return elem;
	      }

	      if (one === 1) {
	        origFn = fn;

	        fn = function (event) {
	          // Can use an empty set, since event contains the info
	          jQuery().off(event);
	          return origFn.apply(this, arguments);
	        }; // Use same guid so caller can remove using origFn


	        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	      }

	      return elem.each(function () {
	        jQuery.event.add(this, types, fn, data, selector);
	      });
	    }
	    /*
	     * Helper functions for managing events -- not part of the public interface.
	     * Props to Dean Edwards' addEvent library for many of the ideas.
	     */


	    jQuery.event = {
	      global: {},
	      add: function (elem, types, handler, data, selector) {
	        var handleObjIn,
	            eventHandle,
	            tmp,
	            events,
	            t,
	            handleObj,
	            special,
	            handlers,
	            type,
	            namespaces,
	            origType,
	            elemData = dataPriv.get(elem); // Only attach events to objects that accept data

	        if (!acceptData(elem)) {
	          return;
	        } // Caller can pass in an object of custom data in lieu of the handler


	        if (handler.handler) {
	          handleObjIn = handler;
	          handler = handleObjIn.handler;
	          selector = handleObjIn.selector;
	        } // Ensure that invalid selectors throw exceptions at attach time
	        // Evaluate against documentElement in case elem is a non-element node (e.g., document)


	        if (selector) {
	          jQuery.find.matchesSelector(documentElement, selector);
	        } // Make sure that the handler has a unique ID, used to find/remove it later


	        if (!handler.guid) {
	          handler.guid = jQuery.guid++;
	        } // Init the element's event structure and main handler, if this is the first


	        if (!(events = elemData.events)) {
	          events = elemData.events = Object.create(null);
	        }

	        if (!(eventHandle = elemData.handle)) {
	          eventHandle = elemData.handle = function (e) {
	            // Discard the second event of a jQuery.event.trigger() and
	            // when an event is called after a page has unloaded
	            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
	          };
	        } // Handle multiple events separated by a space


	        types = (types || "").match(rnothtmlwhite) || [""];
	        t = types.length;

	        while (t--) {
	          tmp = rtypenamespace.exec(types[t]) || [];
	          type = origType = tmp[1];
	          namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers

	          if (!type) {
	            continue;
	          } // If event changes its type, use the special event handlers for the changed type


	          special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type

	          type = (selector ? special.delegateType : special.bindType) || type; // Update special based on newly reset type

	          special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers

	          handleObj = jQuery.extend({
	            type: type,
	            origType: origType,
	            data: data,
	            handler: handler,
	            guid: handler.guid,
	            selector: selector,
	            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	            namespace: namespaces.join(".")
	          }, handleObjIn); // Init the event handler queue if we're the first

	          if (!(handlers = events[type])) {
	            handlers = events[type] = [];
	            handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false

	            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
	              if (elem.addEventListener) {
	                elem.addEventListener(type, eventHandle);
	              }
	            }
	          }

	          if (special.add) {
	            special.add.call(elem, handleObj);

	            if (!handleObj.handler.guid) {
	              handleObj.handler.guid = handler.guid;
	            }
	          } // Add to the element's handler list, delegates in front


	          if (selector) {
	            handlers.splice(handlers.delegateCount++, 0, handleObj);
	          } else {
	            handlers.push(handleObj);
	          } // Keep track of which events have ever been used, for event optimization


	          jQuery.event.global[type] = true;
	        }
	      },
	      // Detach an event or set of events from an element
	      remove: function (elem, types, handler, selector, mappedTypes) {
	        var j,
	            origCount,
	            tmp,
	            events,
	            t,
	            handleObj,
	            special,
	            handlers,
	            type,
	            namespaces,
	            origType,
	            elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

	        if (!elemData || !(events = elemData.events)) {
	          return;
	        } // Once for each type.namespace in types; type may be omitted


	        types = (types || "").match(rnothtmlwhite) || [""];
	        t = types.length;

	        while (t--) {
	          tmp = rtypenamespace.exec(types[t]) || [];
	          type = origType = tmp[1];
	          namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element

	          if (!type) {
	            for (type in events) {
	              jQuery.event.remove(elem, type + types[t], handler, selector, true);
	            }

	            continue;
	          }

	          special = jQuery.event.special[type] || {};
	          type = (selector ? special.delegateType : special.bindType) || type;
	          handlers = events[type] || [];
	          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events

	          origCount = j = handlers.length;

	          while (j--) {
	            handleObj = handlers[j];

	            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
	              handlers.splice(j, 1);

	              if (handleObj.selector) {
	                handlers.delegateCount--;
	              }

	              if (special.remove) {
	                special.remove.call(elem, handleObj);
	              }
	            }
	          } // Remove generic event handler if we removed something and no more handlers exist
	          // (avoids potential for endless recursion during removal of special event handlers)


	          if (origCount && !handlers.length) {
	            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
	              jQuery.removeEvent(elem, type, elemData.handle);
	            }

	            delete events[type];
	          }
	        } // Remove data and the expando if it's no longer used


	        if (jQuery.isEmptyObject(events)) {
	          dataPriv.remove(elem, "handle events");
	        }
	      },
	      dispatch: function (nativeEvent) {
	        var i,
	            j,
	            ret,
	            matched,
	            handleObj,
	            handlerQueue,
	            args = new Array(arguments.length),
	            // Make a writable jQuery.Event from the native event object
	        event = jQuery.event.fix(nativeEvent),
	            handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
	            special = jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event

	        args[0] = event;

	        for (i = 1; i < arguments.length; i++) {
	          args[i] = arguments[i];
	        }

	        event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired

	        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	          return;
	        } // Determine handlers


	        handlerQueue = jQuery.event.handlers.call(this, event, handlers); // Run delegates first; they may want to stop propagation beneath us

	        i = 0;

	        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	          event.currentTarget = matched.elem;
	          j = 0;

	          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
	            // If the event is namespaced, then each handler is only invoked if it is
	            // specially universal or its namespaces are a superset of the event's.
	            if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
	              event.handleObj = handleObj;
	              event.data = handleObj.data;
	              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

	              if (ret !== undefined) {
	                if ((event.result = ret) === false) {
	                  event.preventDefault();
	                  event.stopPropagation();
	                }
	              }
	            }
	          }
	        } // Call the postDispatch hook for the mapped type


	        if (special.postDispatch) {
	          special.postDispatch.call(this, event);
	        }

	        return event.result;
	      },
	      handlers: function (event, handlers) {
	        var i,
	            handleObj,
	            sel,
	            matchedHandlers,
	            matchedSelectors,
	            handlerQueue = [],
	            delegateCount = handlers.delegateCount,
	            cur = event.target; // Find delegate handlers

	        if (delegateCount && // Support: IE <=9
	        // Black-hole SVG <use> instance trees (trac-13180)
	        cur.nodeType && // Support: Firefox <=42
	        // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
	        // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
	        // Support: IE 11 only
	        // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
	        !(event.type === "click" && event.button >= 1)) {
	          for (; cur !== this; cur = cur.parentNode || this) {
	            // Don't check non-elements (#13208)
	            // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
	            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
	              matchedHandlers = [];
	              matchedSelectors = {};

	              for (i = 0; i < delegateCount; i++) {
	                handleObj = handlers[i]; // Don't conflict with Object.prototype properties (#13203)

	                sel = handleObj.selector + " ";

	                if (matchedSelectors[sel] === undefined) {
	                  matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
	                }

	                if (matchedSelectors[sel]) {
	                  matchedHandlers.push(handleObj);
	                }
	              }

	              if (matchedHandlers.length) {
	                handlerQueue.push({
	                  elem: cur,
	                  handlers: matchedHandlers
	                });
	              }
	            }
	          }
	        } // Add the remaining (directly-bound) handlers


	        cur = this;

	        if (delegateCount < handlers.length) {
	          handlerQueue.push({
	            elem: cur,
	            handlers: handlers.slice(delegateCount)
	          });
	        }

	        return handlerQueue;
	      },
	      addProp: function (name, hook) {
	        Object.defineProperty(jQuery.Event.prototype, name, {
	          enumerable: true,
	          configurable: true,
	          get: isFunction(hook) ? function () {
	            if (this.originalEvent) {
	              return hook(this.originalEvent);
	            }
	          } : function () {
	            if (this.originalEvent) {
	              return this.originalEvent[name];
	            }
	          },
	          set: function (value) {
	            Object.defineProperty(this, name, {
	              enumerable: true,
	              configurable: true,
	              writable: true,
	              value: value
	            });
	          }
	        });
	      },
	      fix: function (originalEvent) {
	        return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
	      },
	      special: {
	        load: {
	          // Prevent triggered image.load events from bubbling to window.load
	          noBubble: true
	        },
	        click: {
	          // Utilize native event to ensure correct state for checkable inputs
	          setup: function (data) {
	            // For mutual compressibility with _default, replace `this` access with a local var.
	            // `|| data` is dead code meant only to preserve the variable through minification.
	            var el = this || data; // Claim the first handler

	            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
	              // dataPriv.set( el, "click", ... )
	              leverageNative(el, "click", returnTrue);
	            } // Return false to allow normal processing in the caller


	            return false;
	          },
	          trigger: function (data) {
	            // For mutual compressibility with _default, replace `this` access with a local var.
	            // `|| data` is dead code meant only to preserve the variable through minification.
	            var el = this || data; // Force setup before triggering a click

	            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
	              leverageNative(el, "click");
	            } // Return non-false to allow normal event-path propagation


	            return true;
	          },
	          // For cross-browser consistency, suppress native .click() on links
	          // Also prevent it if we're currently inside a leveraged native-event stack
	          _default: function (event) {
	            var target = event.target;
	            return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
	          }
	        },
	        beforeunload: {
	          postDispatch: function (event) {
	            // Support: Firefox 20+
	            // Firefox doesn't alert if the returnValue field is not set.
	            if (event.result !== undefined && event.originalEvent) {
	              event.originalEvent.returnValue = event.result;
	            }
	          }
	        }
	      }
	    }; // Ensure the presence of an event listener that handles manually-triggered
	    // synthetic events by interrupting progress until reinvoked in response to
	    // *native* events that it fires directly, ensuring that state changes have
	    // already occurred before other listeners are invoked.

	    function leverageNative(el, type, expectSync) {
	      // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	      if (!expectSync) {
	        if (dataPriv.get(el, type) === undefined) {
	          jQuery.event.add(el, type, returnTrue);
	        }

	        return;
	      } // Register the controller as a special universal handler for all event namespaces


	      dataPriv.set(el, type, false);
	      jQuery.event.add(el, type, {
	        namespace: false,
	        handler: function (event) {
	          var notAsync,
	              result,
	              saved = dataPriv.get(this, type);

	          if (event.isTrigger & 1 && this[type]) {
	            // Interrupt processing of the outer synthetic .trigger()ed event
	            // Saved data should be false in such cases, but might be a leftover capture object
	            // from an async native handler (gh-4350)
	            if (!saved.length) {
	              // Store arguments for use when handling the inner native event
	              // There will always be at least one argument (an event object), so this array
	              // will not be confused with a leftover capture object.
	              saved = slice.call(arguments);
	              dataPriv.set(this, type, saved); // Trigger the native event and capture its result
	              // Support: IE <=9 - 11+
	              // focus() and blur() are asynchronous

	              notAsync = expectSync(this, type);
	              this[type]();
	              result = dataPriv.get(this, type);

	              if (saved !== result || notAsync) {
	                dataPriv.set(this, type, false);
	              } else {
	                result = {};
	              }

	              if (saved !== result) {
	                // Cancel the outer synthetic event
	                event.stopImmediatePropagation();
	                event.preventDefault(); // Support: Chrome 86+
	                // In Chrome, if an element having a focusout handler is blurred by
	                // clicking outside of it, it invokes the handler synchronously. If
	                // that handler calls `.remove()` on the element, the data is cleared,
	                // leaving `result` undefined. We need to guard against this.

	                return result && result.value;
	              } // If this is an inner synthetic event for an event with a bubbling surrogate
	              // (focus or blur), assume that the surrogate already propagated from triggering the
	              // native event and prevent that from happening again here.
	              // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
	              // bubbling surrogate propagates *after* the non-bubbling base), but that seems
	              // less bad than duplication.

	            } else if ((jQuery.event.special[type] || {}).delegateType) {
	              event.stopPropagation();
	            } // If this is a native event triggered above, everything is now in order
	            // Fire an inner synthetic event with the original arguments

	          } else if (saved.length) {
	            // ...and capture the result
	            dataPriv.set(this, type, {
	              value: jQuery.event.trigger( // Support: IE <=9 - 11+
	              // Extend with the prototype to reset the above stopImmediatePropagation()
	              jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
	            }); // Abort handling of the native event

	            event.stopImmediatePropagation();
	          }
	        }
	      });
	    }

	    jQuery.removeEvent = function (elem, type, handle) {
	      // This "if" is needed for plain objects
	      if (elem.removeEventListener) {
	        elem.removeEventListener(type, handle);
	      }
	    };

	    jQuery.Event = function (src, props) {
	      // Allow instantiation without the 'new' keyword
	      if (!(this instanceof jQuery.Event)) {
	        return new jQuery.Event(src, props);
	      } // Event object


	      if (src && src.type) {
	        this.originalEvent = src;
	        this.type = src.type; // Events bubbling up the document may have been marked as prevented
	        // by a handler lower down the tree; reflect the correct value.

	        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
	        src.returnValue === false ? returnTrue : returnFalse; // Create target properties
	        // Support: Safari <=6 - 7 only
	        // Target should not be a text node (#504, #13143)

	        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
	        this.currentTarget = src.currentTarget;
	        this.relatedTarget = src.relatedTarget; // Event type
	      } else {
	        this.type = src;
	      } // Put explicitly provided properties onto the event object


	      if (props) {
	        jQuery.extend(this, props);
	      } // Create a timestamp if incoming event doesn't have one


	      this.timeStamp = src && src.timeStamp || Date.now(); // Mark it as fixed

	      this[jQuery.expando] = true;
	    }; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html


	    jQuery.Event.prototype = {
	      constructor: jQuery.Event,
	      isDefaultPrevented: returnFalse,
	      isPropagationStopped: returnFalse,
	      isImmediatePropagationStopped: returnFalse,
	      isSimulated: false,
	      preventDefault: function () {
	        var e = this.originalEvent;
	        this.isDefaultPrevented = returnTrue;

	        if (e && !this.isSimulated) {
	          e.preventDefault();
	        }
	      },
	      stopPropagation: function () {
	        var e = this.originalEvent;
	        this.isPropagationStopped = returnTrue;

	        if (e && !this.isSimulated) {
	          e.stopPropagation();
	        }
	      },
	      stopImmediatePropagation: function () {
	        var e = this.originalEvent;
	        this.isImmediatePropagationStopped = returnTrue;

	        if (e && !this.isSimulated) {
	          e.stopImmediatePropagation();
	        }

	        this.stopPropagation();
	      }
	    }; // Includes all common event props including KeyEvent and MouseEvent specific props

	    jQuery.each({
	      altKey: true,
	      bubbles: true,
	      cancelable: true,
	      changedTouches: true,
	      ctrlKey: true,
	      detail: true,
	      eventPhase: true,
	      metaKey: true,
	      pageX: true,
	      pageY: true,
	      shiftKey: true,
	      view: true,
	      "char": true,
	      code: true,
	      charCode: true,
	      key: true,
	      keyCode: true,
	      button: true,
	      buttons: true,
	      clientX: true,
	      clientY: true,
	      offsetX: true,
	      offsetY: true,
	      pointerId: true,
	      pointerType: true,
	      screenX: true,
	      screenY: true,
	      targetTouches: true,
	      toElement: true,
	      touches: true,
	      which: true
	    }, jQuery.event.addProp);
	    jQuery.each({
	      focus: "focusin",
	      blur: "focusout"
	    }, function (type, delegateType) {
	      jQuery.event.special[type] = {
	        // Utilize native event if possible so blur/focus sequence is correct
	        setup: function () {
	          // Claim the first handler
	          // dataPriv.set( this, "focus", ... )
	          // dataPriv.set( this, "blur", ... )
	          leverageNative(this, type, expectSync); // Return false to allow normal processing in the caller

	          return false;
	        },
	        trigger: function () {
	          // Force setup before trigger
	          leverageNative(this, type); // Return non-false to allow normal event-path propagation

	          return true;
	        },
	        // Suppress native focus or blur as it's already being fired
	        // in leverageNative.
	        _default: function () {
	          return true;
	        },
	        delegateType: delegateType
	      };
	    }); // Create mouseenter/leave events using mouseover/out and event-time checks
	    // so that event delegation works in jQuery.
	    // Do the same for pointerenter/pointerleave and pointerover/pointerout
	    //
	    // Support: Safari 7 only
	    // Safari sends mouseenter too often; see:
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	    // for the description of the bug (it existed in older Chrome versions as well).

	    jQuery.each({
	      mouseenter: "mouseover",
	      mouseleave: "mouseout",
	      pointerenter: "pointerover",
	      pointerleave: "pointerout"
	    }, function (orig, fix) {
	      jQuery.event.special[orig] = {
	        delegateType: fix,
	        bindType: fix,
	        handle: function (event) {
	          var ret,
	              target = this,
	              related = event.relatedTarget,
	              handleObj = event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
	          // NB: No relatedTarget if the mouse left/entered the browser window

	          if (!related || related !== target && !jQuery.contains(target, related)) {
	            event.type = handleObj.origType;
	            ret = handleObj.handler.apply(this, arguments);
	            event.type = fix;
	          }

	          return ret;
	        }
	      };
	    });
	    jQuery.fn.extend({
	      on: function (types, selector, data, fn) {
	        return on(this, types, selector, data, fn);
	      },
	      one: function (types, selector, data, fn) {
	        return on(this, types, selector, data, fn, 1);
	      },
	      off: function (types, selector, fn) {
	        var handleObj, type;

	        if (types && types.preventDefault && types.handleObj) {
	          // ( event )  dispatched jQuery.Event
	          handleObj = types.handleObj;
	          jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	          return this;
	        }

	        if (typeof types === "object") {
	          // ( types-object [, selector] )
	          for (type in types) {
	            this.off(type, selector, types[type]);
	          }

	          return this;
	        }

	        if (selector === false || typeof selector === "function") {
	          // ( types [, fn] )
	          fn = selector;
	          selector = undefined;
	        }

	        if (fn === false) {
	          fn = returnFalse;
	        }

	        return this.each(function () {
	          jQuery.event.remove(this, types, fn, selector);
	        });
	      }
	    });
	    var // Support: IE <=10 - 11, Edge 12 - 13 only
	    // In IE/Edge using regex groups here causes severe slowdowns.
	    // See https://connect.microsoft.com/IE/feedback/details/1736512/
	    rnoInnerhtml = /<script|<style|<link/i,
	        // checked="checked" or checked
	    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Prefer a tbody over its parent table for containing new rows

	    function manipulationTarget(elem, content) {
	      if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
	        return jQuery(elem).children("tbody")[0] || elem;
	      }

	      return elem;
	    } // Replace/restore the type attribute of script elements for safe DOM manipulation


	    function disableScript(elem) {
	      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	      return elem;
	    }

	    function restoreScript(elem) {
	      if ((elem.type || "").slice(0, 5) === "true/") {
	        elem.type = elem.type.slice(5);
	      } else {
	        elem.removeAttribute("type");
	      }

	      return elem;
	    }

	    function cloneCopyEvent(src, dest) {
	      var i, l, type, pdataOld, udataOld, udataCur, events;

	      if (dest.nodeType !== 1) {
	        return;
	      } // 1. Copy private data: events, handlers, etc.


	      if (dataPriv.hasData(src)) {
	        pdataOld = dataPriv.get(src);
	        events = pdataOld.events;

	        if (events) {
	          dataPriv.remove(dest, "handle events");

	          for (type in events) {
	            for (i = 0, l = events[type].length; i < l; i++) {
	              jQuery.event.add(dest, type, events[type][i]);
	            }
	          }
	        }
	      } // 2. Copy user data


	      if (dataUser.hasData(src)) {
	        udataOld = dataUser.access(src);
	        udataCur = jQuery.extend({}, udataOld);
	        dataUser.set(dest, udataCur);
	      }
	    } // Fix IE bugs, see support tests


	    function fixInput(src, dest) {
	      var nodeName = dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.

	      if (nodeName === "input" && rcheckableType.test(src.type)) {
	        dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
	      } else if (nodeName === "input" || nodeName === "textarea") {
	        dest.defaultValue = src.defaultValue;
	      }
	    }

	    function domManip(collection, args, callback, ignored) {
	      // Flatten any nested arrays
	      args = flat(args);
	      var fragment,
	          first,
	          scripts,
	          hasScripts,
	          node,
	          doc,
	          i = 0,
	          l = collection.length,
	          iNoClone = l - 1,
	          value = args[0],
	          valueIsFunction = isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit

	      if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
	        return collection.each(function (index) {
	          var self = collection.eq(index);

	          if (valueIsFunction) {
	            args[0] = value.call(this, index, self.html());
	          }

	          domManip(self, args, callback, ignored);
	        });
	      }

	      if (l) {
	        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
	        first = fragment.firstChild;

	        if (fragment.childNodes.length === 1) {
	          fragment = first;
	        } // Require either new content or an interest in ignored elements to invoke the callback


	        if (first || ignored) {
	          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
	          hasScripts = scripts.length; // Use the original fragment for the last item
	          // instead of the first because it can end up
	          // being emptied incorrectly in certain situations (#8070).

	          for (; i < l; i++) {
	            node = fragment;

	            if (i !== iNoClone) {
	              node = jQuery.clone(node, true, true); // Keep references to cloned scripts for later restoration

	              if (hasScripts) {
	                // Support: Android <=4.0 only, PhantomJS 1 only
	                // push.apply(_, arraylike) throws on ancient WebKit
	                jQuery.merge(scripts, getAll(node, "script"));
	              }
	            }

	            callback.call(collection[i], node, i);
	          }

	          if (hasScripts) {
	            doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts

	            jQuery.map(scripts, restoreScript); // Evaluate executable scripts on first document insertion

	            for (i = 0; i < hasScripts; i++) {
	              node = scripts[i];

	              if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
	                if (node.src && (node.type || "").toLowerCase() !== "module") {
	                  // Optional AJAX dependency, but won't run scripts if not present
	                  if (jQuery._evalUrl && !node.noModule) {
	                    jQuery._evalUrl(node.src, {
	                      nonce: node.nonce || node.getAttribute("nonce")
	                    }, doc);
	                  }
	                } else {
	                  DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
	                }
	              }
	            }
	          }
	        }
	      }

	      return collection;
	    }

	    function remove(elem, selector, keepData) {
	      var node,
	          nodes = selector ? jQuery.filter(selector, elem) : elem,
	          i = 0;

	      for (; (node = nodes[i]) != null; i++) {
	        if (!keepData && node.nodeType === 1) {
	          jQuery.cleanData(getAll(node));
	        }

	        if (node.parentNode) {
	          if (keepData && isAttached(node)) {
	            setGlobalEval(getAll(node, "script"));
	          }

	          node.parentNode.removeChild(node);
	        }
	      }

	      return elem;
	    }

	    jQuery.extend({
	      htmlPrefilter: function (html) {
	        return html;
	      },
	      clone: function (elem, dataAndEvents, deepDataAndEvents) {
	        var i,
	            l,
	            srcElements,
	            destElements,
	            clone = elem.cloneNode(true),
	            inPage = isAttached(elem); // Fix IE cloning issues

	        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
	          // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
	          destElements = getAll(clone);
	          srcElements = getAll(elem);

	          for (i = 0, l = srcElements.length; i < l; i++) {
	            fixInput(srcElements[i], destElements[i]);
	          }
	        } // Copy the events from the original to the clone


	        if (dataAndEvents) {
	          if (deepDataAndEvents) {
	            srcElements = srcElements || getAll(elem);
	            destElements = destElements || getAll(clone);

	            for (i = 0, l = srcElements.length; i < l; i++) {
	              cloneCopyEvent(srcElements[i], destElements[i]);
	            }
	          } else {
	            cloneCopyEvent(elem, clone);
	          }
	        } // Preserve script evaluation history


	        destElements = getAll(clone, "script");

	        if (destElements.length > 0) {
	          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
	        } // Return the cloned set


	        return clone;
	      },
	      cleanData: function (elems) {
	        var data,
	            elem,
	            type,
	            special = jQuery.event.special,
	            i = 0;

	        for (; (elem = elems[i]) !== undefined; i++) {
	          if (acceptData(elem)) {
	            if (data = elem[dataPriv.expando]) {
	              if (data.events) {
	                for (type in data.events) {
	                  if (special[type]) {
	                    jQuery.event.remove(elem, type); // This is a shortcut to avoid jQuery.event.remove's overhead
	                  } else {
	                    jQuery.removeEvent(elem, type, data.handle);
	                  }
	                }
	              } // Support: Chrome <=35 - 45+
	              // Assign undefined instead of using delete, see Data#remove


	              elem[dataPriv.expando] = undefined;
	            }

	            if (elem[dataUser.expando]) {
	              // Support: Chrome <=35 - 45+
	              // Assign undefined instead of using delete, see Data#remove
	              elem[dataUser.expando] = undefined;
	            }
	          }
	        }
	      }
	    });
	    jQuery.fn.extend({
	      detach: function (selector) {
	        return remove(this, selector, true);
	      },
	      remove: function (selector) {
	        return remove(this, selector);
	      },
	      text: function (value) {
	        return access(this, function (value) {
	          return value === undefined ? jQuery.text(this) : this.empty().each(function () {
	            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	              this.textContent = value;
	            }
	          });
	        }, null, value, arguments.length);
	      },
	      append: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            var target = manipulationTarget(this, elem);
	            target.appendChild(elem);
	          }
	        });
	      },
	      prepend: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            var target = manipulationTarget(this, elem);
	            target.insertBefore(elem, target.firstChild);
	          }
	        });
	      },
	      before: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.parentNode) {
	            this.parentNode.insertBefore(elem, this);
	          }
	        });
	      },
	      after: function () {
	        return domManip(this, arguments, function (elem) {
	          if (this.parentNode) {
	            this.parentNode.insertBefore(elem, this.nextSibling);
	          }
	        });
	      },
	      empty: function () {
	        var elem,
	            i = 0;

	        for (; (elem = this[i]) != null; i++) {
	          if (elem.nodeType === 1) {
	            // Prevent memory leaks
	            jQuery.cleanData(getAll(elem, false)); // Remove any remaining nodes

	            elem.textContent = "";
	          }
	        }

	        return this;
	      },
	      clone: function (dataAndEvents, deepDataAndEvents) {
	        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	        return this.map(function () {
	          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	        });
	      },
	      html: function (value) {
	        return access(this, function (value) {
	          var elem = this[0] || {},
	              i = 0,
	              l = this.length;

	          if (value === undefined && elem.nodeType === 1) {
	            return elem.innerHTML;
	          } // See if we can take a shortcut and just use innerHTML


	          if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
	            value = jQuery.htmlPrefilter(value);

	            try {
	              for (; i < l; i++) {
	                elem = this[i] || {}; // Remove element nodes and prevent memory leaks

	                if (elem.nodeType === 1) {
	                  jQuery.cleanData(getAll(elem, false));
	                  elem.innerHTML = value;
	                }
	              }

	              elem = 0; // If using innerHTML throws an exception, use the fallback method
	            } catch (e) {}
	          }

	          if (elem) {
	            this.empty().append(value);
	          }
	        }, null, value, arguments.length);
	      },
	      replaceWith: function () {
	        var ignored = []; // Make the changes, replacing each non-ignored context element with the new content

	        return domManip(this, arguments, function (elem) {
	          var parent = this.parentNode;

	          if (jQuery.inArray(this, ignored) < 0) {
	            jQuery.cleanData(getAll(this));

	            if (parent) {
	              parent.replaceChild(elem, this);
	            }
	          } // Force callback invocation

	        }, ignored);
	      }
	    });
	    jQuery.each({
	      appendTo: "append",
	      prependTo: "prepend",
	      insertBefore: "before",
	      insertAfter: "after",
	      replaceAll: "replaceWith"
	    }, function (name, original) {
	      jQuery.fn[name] = function (selector) {
	        var elems,
	            ret = [],
	            insert = jQuery(selector),
	            last = insert.length - 1,
	            i = 0;

	        for (; i <= last; i++) {
	          elems = i === last ? this : this.clone(true);
	          jQuery(insert[i])[original](elems); // Support: Android <=4.0 only, PhantomJS 1 only
	          // .get() because push.apply(_, arraylike) throws on ancient WebKit

	          push.apply(ret, elems.get());
	        }

	        return this.pushStack(ret);
	      };
	    });
	    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	    var getStyles = function (elem) {
	      // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
	      // IE throws on elements created in popups
	      // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
	      var view = elem.ownerDocument.defaultView;

	      if (!view || !view.opener) {
	        view = window;
	      }

	      return view.getComputedStyle(elem);
	    };

	    var swap = function (elem, options, callback) {
	      var ret,
	          name,
	          old = {}; // Remember the old values, and insert the new ones

	      for (name in options) {
	        old[name] = elem.style[name];
	        elem.style[name] = options[name];
	      }

	      ret = callback.call(elem); // Revert the old values

	      for (name in options) {
	        elem.style[name] = old[name];
	      }

	      return ret;
	    };

	    var rboxStyle = new RegExp(cssExpand.join("|"), "i");

	    (function () {
	      // Executing both pixelPosition & boxSizingReliable tests require only one layout
	      // so they're executed at the same time to save the second computation.
	      function computeStyleTests() {
	        // This is a singleton, we need to execute it only once
	        if (!div) {
	          return;
	        }

	        container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
	        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
	        documentElement.appendChild(container).appendChild(div);
	        var divStyle = window.getComputedStyle(div);
	        pixelPositionVal = divStyle.top !== "1%"; // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

	        reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12; // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
	        // Some styles come back with percentage values, even though they shouldn't

	        div.style.right = "60%";
	        pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36; // Support: IE 9 - 11 only
	        // Detect misreporting of content dimensions for box-sizing:border-box elements

	        boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36; // Support: IE 9 only
	        // Detect overflow:scroll screwiness (gh-3699)
	        // Support: Chrome <=64
	        // Don't get tricked when zoom affects offsetWidth (gh-4029)

	        div.style.position = "absolute";
	        scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
	        documentElement.removeChild(container); // Nullify the div so it wouldn't be stored in the memory and
	        // it will also be a sign that checks already performed

	        div = null;
	      }

	      function roundPixelMeasures(measure) {
	        return Math.round(parseFloat(measure));
	      }

	      var pixelPositionVal,
	          boxSizingReliableVal,
	          scrollboxSizeVal,
	          pixelBoxStylesVal,
	          reliableTrDimensionsVal,
	          reliableMarginLeftVal,
	          container = document.createElement("div"),
	          div = document.createElement("div"); // Finish early in limited (non-browser) environments

	      if (!div.style) {
	        return;
	      } // Support: IE <=9 - 11 only
	      // Style of cloned element affects source element cloned (#8908)


	      div.style.backgroundClip = "content-box";
	      div.cloneNode(true).style.backgroundClip = "";
	      support.clearCloneStyle = div.style.backgroundClip === "content-box";
	      jQuery.extend(support, {
	        boxSizingReliable: function () {
	          computeStyleTests();
	          return boxSizingReliableVal;
	        },
	        pixelBoxStyles: function () {
	          computeStyleTests();
	          return pixelBoxStylesVal;
	        },
	        pixelPosition: function () {
	          computeStyleTests();
	          return pixelPositionVal;
	        },
	        reliableMarginLeft: function () {
	          computeStyleTests();
	          return reliableMarginLeftVal;
	        },
	        scrollboxSize: function () {
	          computeStyleTests();
	          return scrollboxSizeVal;
	        },
	        // Support: IE 9 - 11+, Edge 15 - 18+
	        // IE/Edge misreport `getComputedStyle` of table rows with width/height
	        // set in CSS while `offset*` properties report correct values.
	        // Behavior in IE 9 is more subtle than in newer versions & it passes
	        // some versions of this test; make sure not to make it pass there!
	        //
	        // Support: Firefox 70+
	        // Only Firefox includes border widths
	        // in computed dimensions. (gh-4529)
	        reliableTrDimensions: function () {
	          var table, tr, trChild, trStyle;

	          if (reliableTrDimensionsVal == null) {
	            table = document.createElement("table");
	            tr = document.createElement("tr");
	            trChild = document.createElement("div");
	            table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
	            tr.style.cssText = "border:1px solid"; // Support: Chrome 86+
	            // Height set through cssText does not get applied.
	            // Computed height then comes back as 0.

	            tr.style.height = "1px";
	            trChild.style.height = "9px"; // Support: Android 8 Chrome 86+
	            // In our bodyBackground.html iframe,
	            // display for all div elements is set to "inline",
	            // which causes a problem only in Android 8 Chrome 86.
	            // Ensuring the div is display: block
	            // gets around this issue.

	            trChild.style.display = "block";
	            documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
	            trStyle = window.getComputedStyle(tr);
	            reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
	            documentElement.removeChild(table);
	          }

	          return reliableTrDimensionsVal;
	        }
	      });
	    })();

	    function curCSS(elem, name, computed) {
	      var width,
	          minWidth,
	          maxWidth,
	          ret,
	          // Support: Firefox 51+
	      // Retrieving style before computed somehow
	      // fixes an issue with getting wrong values
	      // on detached elements
	      style = elem.style;
	      computed = computed || getStyles(elem); // getPropertyValue is needed for:
	      //   .css('filter') (IE 9 only, #12537)
	      //   .css('--customProperty) (#3144)

	      if (computed) {
	        ret = computed.getPropertyValue(name) || computed[name];

	        if (ret === "" && !isAttached(elem)) {
	          ret = jQuery.style(elem, name);
	        } // A tribute to the "awesome hack by Dean Edwards"
	        // Android Browser returns percentage for some values,
	        // but width seems to be reliably pixels.
	        // This is against the CSSOM draft spec:
	        // https://drafts.csswg.org/cssom/#resolved-values


	        if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
	          // Remember the original values
	          width = style.width;
	          minWidth = style.minWidth;
	          maxWidth = style.maxWidth; // Put in the new values to get a computed value out

	          style.minWidth = style.maxWidth = style.width = ret;
	          ret = computed.width; // Revert the changed values

	          style.width = width;
	          style.minWidth = minWidth;
	          style.maxWidth = maxWidth;
	        }
	      }

	      return ret !== undefined ? // Support: IE <=9 - 11 only
	      // IE returns zIndex value as an integer.
	      ret + "" : ret;
	    }

	    function addGetHookIf(conditionFn, hookFn) {
	      // Define the hook, we'll check on the first run if it's really needed.
	      return {
	        get: function () {
	          if (conditionFn()) {
	            // Hook not needed (or it's not possible to use it due
	            // to missing dependency), remove it.
	            delete this.get;
	            return;
	          } // Hook needed; redefine it so that the support test is not executed again.


	          return (this.get = hookFn).apply(this, arguments);
	        }
	      };
	    }

	    var cssPrefixes = ["Webkit", "Moz", "ms"],
	        emptyStyle = document.createElement("div").style,
	        vendorProps = {}; // Return a vendor-prefixed property or undefined

	    function vendorPropName(name) {
	      // Check for vendor prefixed names
	      var capName = name[0].toUpperCase() + name.slice(1),
	          i = cssPrefixes.length;

	      while (i--) {
	        name = cssPrefixes[i] + capName;

	        if (name in emptyStyle) {
	          return name;
	        }
	      }
	    } // Return a potentially-mapped jQuery.cssProps or vendor prefixed property


	    function finalPropName(name) {
	      var final = jQuery.cssProps[name] || vendorProps[name];

	      if (final) {
	        return final;
	      }

	      if (name in emptyStyle) {
	        return name;
	      }

	      return vendorProps[name] = vendorPropName(name) || name;
	    }

	    var // Swappable if display is none or starts with table
	    // except "table", "table-cell", or "table-caption"
	    // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	        rcustomProp = /^--/,
	        cssShow = {
	      position: "absolute",
	      visibility: "hidden",
	      display: "block"
	    },
	        cssNormalTransform = {
	      letterSpacing: "0",
	      fontWeight: "400"
	    };

	    function setPositiveNumber(_elem, value, subtract) {
	      // Any relative (+/-) values have already been
	      // normalized at this point
	      var matches = rcssNum.exec(value);
	      return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
	      Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	    }

	    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
	      var i = dimension === "width" ? 1 : 0,
	          extra = 0,
	          delta = 0; // Adjustment may not be necessary

	      if (box === (isBorderBox ? "border" : "content")) {
	        return 0;
	      }

	      for (; i < 4; i += 2) {
	        // Both box models exclude margin
	        if (box === "margin") {
	          delta += jQuery.css(elem, box + cssExpand[i], true, styles);
	        } // If we get here with a content-box, we're seeking "padding" or "border" or "margin"


	        if (!isBorderBox) {
	          // Add padding
	          delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles); // For "border" or "margin", add border

	          if (box !== "padding") {
	            delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles); // But still keep track of it otherwise
	          } else {
	            extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	          } // If we get here with a border-box (content + padding + border), we're seeking "content" or
	          // "padding" or "margin"

	        } else {
	          // For "content", subtract padding
	          if (box === "content") {
	            delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	          } // For "content" or "padding", subtract border


	          if (box !== "margin") {
	            delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	          }
	        }
	      } // Account for positive content-box scroll gutter when requested by providing computedVal


	      if (!isBorderBox && computedVal >= 0) {
	        // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
	        // Assuming integer scroll gutter, subtract the rest and round down
	        delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5 // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
	        // Use an explicit zero to avoid NaN (gh-3964)
	        )) || 0;
	      }

	      return delta;
	    }

	    function getWidthOrHeight(elem, dimension, extra) {
	      // Start with computed style
	      var styles = getStyles(elem),
	          // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
	      // Fake content-box until we know it's needed to know the true value.
	      boxSizingNeeded = !support.boxSizingReliable() || extra,
	          isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
	          valueIsBorderBox = isBorderBox,
	          val = curCSS(elem, dimension, styles),
	          offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1); // Support: Firefox <=54
	      // Return a confounding non-pixel value or feign ignorance, as appropriate.

	      if (rnumnonpx.test(val)) {
	        if (!extra) {
	          return val;
	        }

	        val = "auto";
	      } // Support: IE 9 - 11 only
	      // Use offsetWidth/offsetHeight for when box sizing is unreliable.
	      // In those cases, the computed value can be trusted to be border-box.


	      if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
	      // IE/Edge misreport `getComputedStyle` of table rows with width/height
	      // set in CSS while `offset*` properties report correct values.
	      // Interestingly, in some cases IE 9 doesn't suffer from this issue.
	      !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
	      // This happens for inline elements with no explicit setting (gh-3571)
	      val === "auto" || // Support: Android <=4.1 - 4.3 only
	      // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	      !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
	      elem.getClientRects().length) {
	        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box"; // Where available, offsetWidth/offsetHeight approximate border box dimensions.
	        // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
	        // retrieved value as a content box dimension.

	        valueIsBorderBox = offsetProp in elem;

	        if (valueIsBorderBox) {
	          val = elem[offsetProp];
	        }
	      } // Normalize "" and auto


	      val = parseFloat(val) || 0; // Adjust for the element's box model

	      return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, // Provide the current computed size to request scroll gutter calculation (gh-3589)
	      val) + "px";
	    }

	    jQuery.extend({
	      // Add in style property hooks for overriding the default
	      // behavior of getting and setting a style property
	      cssHooks: {
	        opacity: {
	          get: function (elem, computed) {
	            if (computed) {
	              // We should always get a number back from opacity
	              var ret = curCSS(elem, "opacity");
	              return ret === "" ? "1" : ret;
	            }
	          }
	        }
	      },
	      // Don't automatically add "px" to these possibly-unitless properties
	      cssNumber: {
	        "animationIterationCount": true,
	        "columnCount": true,
	        "fillOpacity": true,
	        "flexGrow": true,
	        "flexShrink": true,
	        "fontWeight": true,
	        "gridArea": true,
	        "gridColumn": true,
	        "gridColumnEnd": true,
	        "gridColumnStart": true,
	        "gridRow": true,
	        "gridRowEnd": true,
	        "gridRowStart": true,
	        "lineHeight": true,
	        "opacity": true,
	        "order": true,
	        "orphans": true,
	        "widows": true,
	        "zIndex": true,
	        "zoom": true
	      },
	      // Add in properties whose names you wish to fix before
	      // setting or getting the value
	      cssProps: {},
	      // Get and set the style property on a DOM Node
	      style: function (elem, name, value, extra) {
	        // Don't set styles on text and comment nodes
	        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	          return;
	        } // Make sure that we're working with the right name


	        var ret,
	            type,
	            hooks,
	            origName = camelCase(name),
	            isCustomProp = rcustomProp.test(name),
	            style = elem.style; // Make sure that we're working with the right name. We don't
	        // want to query the value if it is a CSS custom property
	        // since they are user-defined.

	        if (!isCustomProp) {
	          name = finalPropName(origName);
	        } // Gets hook for the prefixed version, then unprefixed version


	        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value

	        if (value !== undefined) {
	          type = typeof value; // Convert "+=" or "-=" to relative numbers (#7345)

	          if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
	            value = adjustCSS(elem, name, ret); // Fixes bug #9237

	            type = "number";
	          } // Make sure that null and NaN values aren't set (#7116)


	          if (value == null || value !== value) {
	            return;
	          } // If a number was passed in, add the unit (except for certain CSS properties)
	          // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
	          // "px" to a few hardcoded values.


	          if (type === "number" && !isCustomProp) {
	            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
	          } // background-* props affect original clone's values


	          if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	            style[name] = "inherit";
	          } // If a hook was provided, use that value, otherwise just set the specified value


	          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	            if (isCustomProp) {
	              style.setProperty(name, value);
	            } else {
	              style[name] = value;
	            }
	          }
	        } else {
	          // If a hook was provided get the non-computed value from there
	          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	            return ret;
	          } // Otherwise just get the value from the style object


	          return style[name];
	        }
	      },
	      css: function (elem, name, extra, styles) {
	        var val,
	            num,
	            hooks,
	            origName = camelCase(name),
	            isCustomProp = rcustomProp.test(name); // Make sure that we're working with the right name. We don't
	        // want to modify the value if it is a CSS custom property
	        // since they are user-defined.

	        if (!isCustomProp) {
	          name = finalPropName(origName);
	        } // Try prefixed name followed by the unprefixed name


	        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there

	        if (hooks && "get" in hooks) {
	          val = hooks.get(elem, true, extra);
	        } // Otherwise, if a way to get the computed value exists, use that


	        if (val === undefined) {
	          val = curCSS(elem, name, styles);
	        } // Convert "normal" to computed value


	        if (val === "normal" && name in cssNormalTransform) {
	          val = cssNormalTransform[name];
	        } // Make numeric if forced or a qualifier was provided and val looks numeric


	        if (extra === "" || extra) {
	          num = parseFloat(val);
	          return extra === true || isFinite(num) ? num || 0 : val;
	        }

	        return val;
	      }
	    });
	    jQuery.each(["height", "width"], function (_i, dimension) {
	      jQuery.cssHooks[dimension] = {
	        get: function (elem, computed, extra) {
	          if (computed) {
	            // Certain elements can have dimension info if we invisibly show them
	            // but it must have a current display style that would benefit
	            return rdisplayswap.test(jQuery.css(elem, "display")) && ( // Support: Safari 8+
	            // Table columns in Safari have non-zero offsetWidth & zero
	            // getBoundingClientRect().width unless display is changed.
	            // Support: IE <=11 only
	            // Running getBoundingClientRect on a disconnected node
	            // in IE throws an error.
	            !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
	              return getWidthOrHeight(elem, dimension, extra);
	            }) : getWidthOrHeight(elem, dimension, extra);
	          }
	        },
	        set: function (elem, value, extra) {
	          var matches,
	              styles = getStyles(elem),
	              // Only read styles.position if the test has a chance to fail
	          // to avoid forcing a reflow.
	          scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
	              // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
	          boxSizingNeeded = scrollboxSizeBuggy || extra,
	              isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
	              subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0; // Account for unreliable border-box dimensions by comparing offset* to computed and
	          // faking a content-box to get border and padding (gh-3699)

	          if (isBorderBox && scrollboxSizeBuggy) {
	            subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
	          } // Convert to pixels if value adjustment is needed


	          if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
	            elem.style[dimension] = value;
	            value = jQuery.css(elem, dimension);
	          }

	          return setPositiveNumber(elem, value, subtract);
	        }
	      };
	    });
	    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
	      if (computed) {
	        return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
	          marginLeft: 0
	        }, function () {
	          return elem.getBoundingClientRect().left;
	        })) + "px";
	      }
	    }); // These hooks are used by animate to expand properties

	    jQuery.each({
	      margin: "",
	      padding: "",
	      border: "Width"
	    }, function (prefix, suffix) {
	      jQuery.cssHooks[prefix + suffix] = {
	        expand: function (value) {
	          var i = 0,
	              expanded = {},
	              // Assumes a single number if not a string
	          parts = typeof value === "string" ? value.split(" ") : [value];

	          for (; i < 4; i++) {
	            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	          }

	          return expanded;
	        }
	      };

	      if (prefix !== "margin") {
	        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	      }
	    });
	    jQuery.fn.extend({
	      css: function (name, value) {
	        return access(this, function (elem, name, value) {
	          var styles,
	              len,
	              map = {},
	              i = 0;

	          if (Array.isArray(name)) {
	            styles = getStyles(elem);
	            len = name.length;

	            for (; i < len; i++) {
	              map[name[i]] = jQuery.css(elem, name[i], false, styles);
	            }

	            return map;
	          }

	          return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	        }, name, value, arguments.length > 1);
	      }
	    });

	    function Tween(elem, options, prop, end, easing) {
	      return new Tween.prototype.init(elem, options, prop, end, easing);
	    }

	    jQuery.Tween = Tween;
	    Tween.prototype = {
	      constructor: Tween,
	      init: function (elem, options, prop, end, easing, unit) {
	        this.elem = elem;
	        this.prop = prop;
	        this.easing = easing || jQuery.easing._default;
	        this.options = options;
	        this.start = this.now = this.cur();
	        this.end = end;
	        this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	      },
	      cur: function () {
	        var hooks = Tween.propHooks[this.prop];
	        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	      },
	      run: function (percent) {
	        var eased,
	            hooks = Tween.propHooks[this.prop];

	        if (this.options.duration) {
	          this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	        } else {
	          this.pos = eased = percent;
	        }

	        this.now = (this.end - this.start) * eased + this.start;

	        if (this.options.step) {
	          this.options.step.call(this.elem, this.now, this);
	        }

	        if (hooks && hooks.set) {
	          hooks.set(this);
	        } else {
	          Tween.propHooks._default.set(this);
	        }

	        return this;
	      }
	    };
	    Tween.prototype.init.prototype = Tween.prototype;
	    Tween.propHooks = {
	      _default: {
	        get: function (tween) {
	          var result; // Use a property on the element directly when it is not a DOM element,
	          // or when there is no matching style property that exists.

	          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
	            return tween.elem[tween.prop];
	          } // Passing an empty string as a 3rd parameter to .css will automatically
	          // attempt a parseFloat and fallback to a string if the parse fails.
	          // Simple values such as "10px" are parsed to Float;
	          // complex values such as "rotate(1rad)" are returned as-is.


	          result = jQuery.css(tween.elem, tween.prop, ""); // Empty strings, null, undefined and "auto" are converted to 0.

	          return !result || result === "auto" ? 0 : result;
	        },
	        set: function (tween) {
	          // Use step hook for back compat.
	          // Use cssHook if its there.
	          // Use .style if available and use plain properties where available.
	          if (jQuery.fx.step[tween.prop]) {
	            jQuery.fx.step[tween.prop](tween);
	          } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
	            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	          } else {
	            tween.elem[tween.prop] = tween.now;
	          }
	        }
	      }
	    }; // Support: IE <=9 only
	    // Panic based approach to setting things on disconnected nodes

	    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	      set: function (tween) {
	        if (tween.elem.nodeType && tween.elem.parentNode) {
	          tween.elem[tween.prop] = tween.now;
	        }
	      }
	    };
	    jQuery.easing = {
	      linear: function (p) {
	        return p;
	      },
	      swing: function (p) {
	        return 0.5 - Math.cos(p * Math.PI) / 2;
	      },
	      _default: "swing"
	    };
	    jQuery.fx = Tween.prototype.init; // Back compat <1.8 extension point

	    jQuery.fx.step = {};
	    var fxNow,
	        inProgress,
	        rfxtypes = /^(?:toggle|show|hide)$/,
	        rrun = /queueHooks$/;

	    function schedule() {
	      if (inProgress) {
	        if (document.hidden === false && window.requestAnimationFrame) {
	          window.requestAnimationFrame(schedule);
	        } else {
	          window.setTimeout(schedule, jQuery.fx.interval);
	        }

	        jQuery.fx.tick();
	      }
	    } // Animations created synchronously will run synchronously


	    function createFxNow() {
	      window.setTimeout(function () {
	        fxNow = undefined;
	      });
	      return fxNow = Date.now();
	    } // Generate parameters to create a standard animation


	    function genFx(type, includeWidth) {
	      var which,
	          i = 0,
	          attrs = {
	        height: type
	      }; // If we include width, step value is 1 to do all cssExpand values,
	      // otherwise step value is 2 to skip over Left and Right

	      includeWidth = includeWidth ? 1 : 0;

	      for (; i < 4; i += 2 - includeWidth) {
	        which = cssExpand[i];
	        attrs["margin" + which] = attrs["padding" + which] = type;
	      }

	      if (includeWidth) {
	        attrs.opacity = attrs.width = type;
	      }

	      return attrs;
	    }

	    function createTween(value, prop, animation) {
	      var tween,
	          collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
	          index = 0,
	          length = collection.length;

	      for (; index < length; index++) {
	        if (tween = collection[index].call(animation, prop, value)) {
	          // We're done with this property
	          return tween;
	        }
	      }
	    }

	    function defaultPrefilter(elem, props, opts) {
	      var prop,
	          value,
	          toggle,
	          hooks,
	          oldfire,
	          propTween,
	          restoreDisplay,
	          display,
	          isBox = "width" in props || "height" in props,
	          anim = this,
	          orig = {},
	          style = elem.style,
	          hidden = elem.nodeType && isHiddenWithinTree(elem),
	          dataShow = dataPriv.get(elem, "fxshow"); // Queue-skipping animations hijack the fx hooks

	      if (!opts.queue) {
	        hooks = jQuery._queueHooks(elem, "fx");

	        if (hooks.unqueued == null) {
	          hooks.unqueued = 0;
	          oldfire = hooks.empty.fire;

	          hooks.empty.fire = function () {
	            if (!hooks.unqueued) {
	              oldfire();
	            }
	          };
	        }

	        hooks.unqueued++;
	        anim.always(function () {
	          // Ensure the complete handler is called before this completes
	          anim.always(function () {
	            hooks.unqueued--;

	            if (!jQuery.queue(elem, "fx").length) {
	              hooks.empty.fire();
	            }
	          });
	        });
	      } // Detect show/hide animations


	      for (prop in props) {
	        value = props[prop];

	        if (rfxtypes.test(value)) {
	          delete props[prop];
	          toggle = toggle || value === "toggle";

	          if (value === (hidden ? "hide" : "show")) {
	            // Pretend to be hidden if this is a "show" and
	            // there is still data from a stopped show/hide
	            if (value === "show" && dataShow && dataShow[prop] !== undefined) {
	              hidden = true; // Ignore all other no-op show/hide data
	            } else {
	              continue;
	            }
	          }

	          orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
	        }
	      } // Bail out if this is a no-op like .hide().hide()


	      propTween = !jQuery.isEmptyObject(props);

	      if (!propTween && jQuery.isEmptyObject(orig)) {
	        return;
	      } // Restrict "overflow" and "display" styles during box animations


	      if (isBox && elem.nodeType === 1) {
	        // Support: IE <=9 - 11, Edge 12 - 15
	        // Record all 3 overflow attributes because IE does not infer the shorthand
	        // from identically-valued overflowX and overflowY and Edge just mirrors
	        // the overflowX value there.
	        opts.overflow = [style.overflow, style.overflowX, style.overflowY]; // Identify a display type, preferring old show/hide data over the CSS cascade

	        restoreDisplay = dataShow && dataShow.display;

	        if (restoreDisplay == null) {
	          restoreDisplay = dataPriv.get(elem, "display");
	        }

	        display = jQuery.css(elem, "display");

	        if (display === "none") {
	          if (restoreDisplay) {
	            display = restoreDisplay;
	          } else {
	            // Get nonempty value(s) by temporarily forcing visibility
	            showHide([elem], true);
	            restoreDisplay = elem.style.display || restoreDisplay;
	            display = jQuery.css(elem, "display");
	            showHide([elem]);
	          }
	        } // Animate inline elements as inline-block


	        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
	          if (jQuery.css(elem, "float") === "none") {
	            // Restore the original display value at the end of pure show/hide animations
	            if (!propTween) {
	              anim.done(function () {
	                style.display = restoreDisplay;
	              });

	              if (restoreDisplay == null) {
	                display = style.display;
	                restoreDisplay = display === "none" ? "" : display;
	              }
	            }

	            style.display = "inline-block";
	          }
	        }
	      }

	      if (opts.overflow) {
	        style.overflow = "hidden";
	        anim.always(function () {
	          style.overflow = opts.overflow[0];
	          style.overflowX = opts.overflow[1];
	          style.overflowY = opts.overflow[2];
	        });
	      } // Implement show/hide animations


	      propTween = false;

	      for (prop in orig) {
	        // General show/hide setup for this element animation
	        if (!propTween) {
	          if (dataShow) {
	            if ("hidden" in dataShow) {
	              hidden = dataShow.hidden;
	            }
	          } else {
	            dataShow = dataPriv.access(elem, "fxshow", {
	              display: restoreDisplay
	            });
	          } // Store hidden/visible for toggle so `.stop().toggle()` "reverses"


	          if (toggle) {
	            dataShow.hidden = !hidden;
	          } // Show elements before animating them


	          if (hidden) {
	            showHide([elem], true);
	          }
	          /* eslint-disable no-loop-func */


	          anim.done(function () {
	            /* eslint-enable no-loop-func */
	            // The final step of a "hide" animation is actually hiding the element
	            if (!hidden) {
	              showHide([elem]);
	            }

	            dataPriv.remove(elem, "fxshow");

	            for (prop in orig) {
	              jQuery.style(elem, prop, orig[prop]);
	            }
	          });
	        } // Per-property setup


	        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

	        if (!(prop in dataShow)) {
	          dataShow[prop] = propTween.start;

	          if (hidden) {
	            propTween.end = propTween.start;
	            propTween.start = 0;
	          }
	        }
	      }
	    }

	    function propFilter(props, specialEasing) {
	      var index, name, easing, value, hooks; // camelCase, specialEasing and expand cssHook pass

	      for (index in props) {
	        name = camelCase(index);
	        easing = specialEasing[name];
	        value = props[index];

	        if (Array.isArray(value)) {
	          easing = value[1];
	          value = props[index] = value[0];
	        }

	        if (index !== name) {
	          props[name] = value;
	          delete props[index];
	        }

	        hooks = jQuery.cssHooks[name];

	        if (hooks && "expand" in hooks) {
	          value = hooks.expand(value);
	          delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
	          // Reusing 'index' because we have the correct "name"

	          for (index in value) {
	            if (!(index in props)) {
	              props[index] = value[index];
	              specialEasing[index] = easing;
	            }
	          }
	        } else {
	          specialEasing[name] = easing;
	        }
	      }
	    }

	    function Animation(elem, properties, options) {
	      var result,
	          stopped,
	          index = 0,
	          length = Animation.prefilters.length,
	          deferred = jQuery.Deferred().always(function () {
	        // Don't match elem in the :animated selector
	        delete tick.elem;
	      }),
	          tick = function () {
	        if (stopped) {
	          return false;
	        }

	        var currentTime = fxNow || createFxNow(),
	            remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
	            // Support: Android 2.3 only
	        // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
	        temp = remaining / animation.duration || 0,
	            percent = 1 - temp,
	            index = 0,
	            length = animation.tweens.length;

	        for (; index < length; index++) {
	          animation.tweens[index].run(percent);
	        }

	        deferred.notifyWith(elem, [animation, percent, remaining]); // If there's more to do, yield

	        if (percent < 1 && length) {
	          return remaining;
	        } // If this was an empty animation, synthesize a final progress notification


	        if (!length) {
	          deferred.notifyWith(elem, [animation, 1, 0]);
	        } // Resolve the animation and report its conclusion


	        deferred.resolveWith(elem, [animation]);
	        return false;
	      },
	          animation = deferred.promise({
	        elem: elem,
	        props: jQuery.extend({}, properties),
	        opts: jQuery.extend(true, {
	          specialEasing: {},
	          easing: jQuery.easing._default
	        }, options),
	        originalProperties: properties,
	        originalOptions: options,
	        startTime: fxNow || createFxNow(),
	        duration: options.duration,
	        tweens: [],
	        createTween: function (prop, end) {
	          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	          animation.tweens.push(tween);
	          return tween;
	        },
	        stop: function (gotoEnd) {
	          var index = 0,
	              // If we are going to the end, we want to run all the tweens
	          // otherwise we skip this part
	          length = gotoEnd ? animation.tweens.length : 0;

	          if (stopped) {
	            return this;
	          }

	          stopped = true;

	          for (; index < length; index++) {
	            animation.tweens[index].run(1);
	          } // Resolve when we played the last frame; otherwise, reject


	          if (gotoEnd) {
	            deferred.notifyWith(elem, [animation, 1, 0]);
	            deferred.resolveWith(elem, [animation, gotoEnd]);
	          } else {
	            deferred.rejectWith(elem, [animation, gotoEnd]);
	          }

	          return this;
	        }
	      }),
	          props = animation.props;

	      propFilter(props, animation.opts.specialEasing);

	      for (; index < length; index++) {
	        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);

	        if (result) {
	          if (isFunction(result.stop)) {
	            jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
	          }

	          return result;
	        }
	      }

	      jQuery.map(props, createTween, animation);

	      if (isFunction(animation.opts.start)) {
	        animation.opts.start.call(elem, animation);
	      } // Attach callbacks from options


	      animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	      jQuery.fx.timer(jQuery.extend(tick, {
	        elem: elem,
	        anim: animation,
	        queue: animation.opts.queue
	      }));
	      return animation;
	    }

	    jQuery.Animation = jQuery.extend(Animation, {
	      tweeners: {
	        "*": [function (prop, value) {
	          var tween = this.createTween(prop, value);
	          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
	          return tween;
	        }]
	      },
	      tweener: function (props, callback) {
	        if (isFunction(props)) {
	          callback = props;
	          props = ["*"];
	        } else {
	          props = props.match(rnothtmlwhite);
	        }

	        var prop,
	            index = 0,
	            length = props.length;

	        for (; index < length; index++) {
	          prop = props[index];
	          Animation.tweeners[prop] = Animation.tweeners[prop] || [];
	          Animation.tweeners[prop].unshift(callback);
	        }
	      },
	      prefilters: [defaultPrefilter],
	      prefilter: function (callback, prepend) {
	        if (prepend) {
	          Animation.prefilters.unshift(callback);
	        } else {
	          Animation.prefilters.push(callback);
	        }
	      }
	    });

	    jQuery.speed = function (speed, easing, fn) {
	      var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
	        complete: fn || !fn && easing || isFunction(speed) && speed,
	        duration: speed,
	        easing: fn && easing || easing && !isFunction(easing) && easing
	      }; // Go to the end state if fx are off

	      if (jQuery.fx.off) {
	        opt.duration = 0;
	      } else {
	        if (typeof opt.duration !== "number") {
	          if (opt.duration in jQuery.fx.speeds) {
	            opt.duration = jQuery.fx.speeds[opt.duration];
	          } else {
	            opt.duration = jQuery.fx.speeds._default;
	          }
	        }
	      } // Normalize opt.queue - true/undefined/null -> "fx"


	      if (opt.queue == null || opt.queue === true) {
	        opt.queue = "fx";
	      } // Queueing


	      opt.old = opt.complete;

	      opt.complete = function () {
	        if (isFunction(opt.old)) {
	          opt.old.call(this);
	        }

	        if (opt.queue) {
	          jQuery.dequeue(this, opt.queue);
	        }
	      };

	      return opt;
	    };

	    jQuery.fn.extend({
	      fadeTo: function (speed, to, easing, callback) {
	        // Show any hidden elements after setting opacity to 0
	        return this.filter(isHiddenWithinTree).css("opacity", 0).show() // Animate to the value specified
	        .end().animate({
	          opacity: to
	        }, speed, easing, callback);
	      },
	      animate: function (prop, speed, easing, callback) {
	        var empty = jQuery.isEmptyObject(prop),
	            optall = jQuery.speed(speed, easing, callback),
	            doAnimation = function () {
	          // Operate on a copy of prop so per-property easing won't be lost
	          var anim = Animation(this, jQuery.extend({}, prop), optall); // Empty animations, or finishing resolves immediately

	          if (empty || dataPriv.get(this, "finish")) {
	            anim.stop(true);
	          }
	        };

	        doAnimation.finish = doAnimation;
	        return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	      },
	      stop: function (type, clearQueue, gotoEnd) {
	        var stopQueue = function (hooks) {
	          var stop = hooks.stop;
	          delete hooks.stop;
	          stop(gotoEnd);
	        };

	        if (typeof type !== "string") {
	          gotoEnd = clearQueue;
	          clearQueue = type;
	          type = undefined;
	        }

	        if (clearQueue) {
	          this.queue(type || "fx", []);
	        }

	        return this.each(function () {
	          var dequeue = true,
	              index = type != null && type + "queueHooks",
	              timers = jQuery.timers,
	              data = dataPriv.get(this);

	          if (index) {
	            if (data[index] && data[index].stop) {
	              stopQueue(data[index]);
	            }
	          } else {
	            for (index in data) {
	              if (data[index] && data[index].stop && rrun.test(index)) {
	                stopQueue(data[index]);
	              }
	            }
	          }

	          for (index = timers.length; index--;) {
	            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
	              timers[index].anim.stop(gotoEnd);
	              dequeue = false;
	              timers.splice(index, 1);
	            }
	          } // Start the next in the queue if the last step wasn't forced.
	          // Timers currently will call their complete callbacks, which
	          // will dequeue but only if they were gotoEnd.


	          if (dequeue || !gotoEnd) {
	            jQuery.dequeue(this, type);
	          }
	        });
	      },
	      finish: function (type) {
	        if (type !== false) {
	          type = type || "fx";
	        }

	        return this.each(function () {
	          var index,
	              data = dataPriv.get(this),
	              queue = data[type + "queue"],
	              hooks = data[type + "queueHooks"],
	              timers = jQuery.timers,
	              length = queue ? queue.length : 0; // Enable finishing flag on private data

	          data.finish = true; // Empty the queue first

	          jQuery.queue(this, type, []);

	          if (hooks && hooks.stop) {
	            hooks.stop.call(this, true);
	          } // Look for any active animations, and finish them


	          for (index = timers.length; index--;) {
	            if (timers[index].elem === this && timers[index].queue === type) {
	              timers[index].anim.stop(true);
	              timers.splice(index, 1);
	            }
	          } // Look for any animations in the old queue and finish them


	          for (index = 0; index < length; index++) {
	            if (queue[index] && queue[index].finish) {
	              queue[index].finish.call(this);
	            }
	          } // Turn off finishing flag


	          delete data.finish;
	        });
	      }
	    });
	    jQuery.each(["toggle", "show", "hide"], function (_i, name) {
	      var cssFn = jQuery.fn[name];

	      jQuery.fn[name] = function (speed, easing, callback) {
	        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	      };
	    }); // Generate shortcuts for custom animations

	    jQuery.each({
	      slideDown: genFx("show"),
	      slideUp: genFx("hide"),
	      slideToggle: genFx("toggle"),
	      fadeIn: {
	        opacity: "show"
	      },
	      fadeOut: {
	        opacity: "hide"
	      },
	      fadeToggle: {
	        opacity: "toggle"
	      }
	    }, function (name, props) {
	      jQuery.fn[name] = function (speed, easing, callback) {
	        return this.animate(props, speed, easing, callback);
	      };
	    });
	    jQuery.timers = [];

	    jQuery.fx.tick = function () {
	      var timer,
	          i = 0,
	          timers = jQuery.timers;
	      fxNow = Date.now();

	      for (; i < timers.length; i++) {
	        timer = timers[i]; // Run the timer and safely remove it when done (allowing for external removal)

	        if (!timer() && timers[i] === timer) {
	          timers.splice(i--, 1);
	        }
	      }

	      if (!timers.length) {
	        jQuery.fx.stop();
	      }

	      fxNow = undefined;
	    };

	    jQuery.fx.timer = function (timer) {
	      jQuery.timers.push(timer);
	      jQuery.fx.start();
	    };

	    jQuery.fx.interval = 13;

	    jQuery.fx.start = function () {
	      if (inProgress) {
	        return;
	      }

	      inProgress = true;
	      schedule();
	    };

	    jQuery.fx.stop = function () {
	      inProgress = null;
	    };

	    jQuery.fx.speeds = {
	      slow: 600,
	      fast: 200,
	      // Default speed
	      _default: 400
	    }; // Based off of the plugin by Clint Helfers, with permission.
	    // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

	    jQuery.fn.delay = function (time, type) {
	      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	      type = type || "fx";
	      return this.queue(type, function (next, hooks) {
	        var timeout = window.setTimeout(next, time);

	        hooks.stop = function () {
	          window.clearTimeout(timeout);
	        };
	      });
	    };

	    (function () {
	      var input = document.createElement("input"),
	          select = document.createElement("select"),
	          opt = select.appendChild(document.createElement("option"));
	      input.type = "checkbox"; // Support: Android <=4.3 only
	      // Default value for a checkbox should be "on"

	      support.checkOn = input.value !== ""; // Support: IE <=11 only
	      // Must access selectedIndex to make default options select

	      support.optSelected = opt.selected; // Support: IE <=11 only
	      // An input loses its value after becoming a radio

	      input = document.createElement("input");
	      input.value = "t";
	      input.type = "radio";
	      support.radioValue = input.value === "t";
	    })();

	    var boolHook,
	        attrHandle = jQuery.expr.attrHandle;
	    jQuery.fn.extend({
	      attr: function (name, value) {
	        return access(this, jQuery.attr, name, value, arguments.length > 1);
	      },
	      removeAttr: function (name) {
	        return this.each(function () {
	          jQuery.removeAttr(this, name);
	        });
	      }
	    });
	    jQuery.extend({
	      attr: function (elem, name, value) {
	        var ret,
	            hooks,
	            nType = elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes

	        if (nType === 3 || nType === 8 || nType === 2) {
	          return;
	        } // Fallback to prop when attributes are not supported


	        if (typeof elem.getAttribute === "undefined") {
	          return jQuery.prop(elem, name, value);
	        } // Attribute hooks are determined by the lowercase version
	        // Grab necessary hook if one is defined


	        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	          hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
	        }

	        if (value !== undefined) {
	          if (value === null) {
	            jQuery.removeAttr(elem, name);
	            return;
	          }

	          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	            return ret;
	          }

	          elem.setAttribute(name, value + "");
	          return value;
	        }

	        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	          return ret;
	        }

	        ret = jQuery.find.attr(elem, name); // Non-existent attributes return null, we normalize to undefined

	        return ret == null ? undefined : ret;
	      },
	      attrHooks: {
	        type: {
	          set: function (elem, value) {
	            if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
	              var val = elem.value;
	              elem.setAttribute("type", value);

	              if (val) {
	                elem.value = val;
	              }

	              return value;
	            }
	          }
	        }
	      },
	      removeAttr: function (elem, value) {
	        var name,
	            i = 0,
	            // Attribute names can contain non-HTML whitespace characters
	        // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
	        attrNames = value && value.match(rnothtmlwhite);

	        if (attrNames && elem.nodeType === 1) {
	          while (name = attrNames[i++]) {
	            elem.removeAttribute(name);
	          }
	        }
	      }
	    }); // Hooks for boolean attributes

	    boolHook = {
	      set: function (elem, value, name) {
	        if (value === false) {
	          // Remove boolean attributes when set to false
	          jQuery.removeAttr(elem, name);
	        } else {
	          elem.setAttribute(name, name);
	        }

	        return name;
	      }
	    };
	    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
	      var getter = attrHandle[name] || jQuery.find.attr;

	      attrHandle[name] = function (elem, name, isXML) {
	        var ret,
	            handle,
	            lowercaseName = name.toLowerCase();

	        if (!isXML) {
	          // Avoid an infinite loop by temporarily removing this function from the getter
	          handle = attrHandle[lowercaseName];
	          attrHandle[lowercaseName] = ret;
	          ret = getter(elem, name, isXML) != null ? lowercaseName : null;
	          attrHandle[lowercaseName] = handle;
	        }

	        return ret;
	      };
	    });
	    var rfocusable = /^(?:input|select|textarea|button)$/i,
	        rclickable = /^(?:a|area)$/i;
	    jQuery.fn.extend({
	      prop: function (name, value) {
	        return access(this, jQuery.prop, name, value, arguments.length > 1);
	      },
	      removeProp: function (name) {
	        return this.each(function () {
	          delete this[jQuery.propFix[name] || name];
	        });
	      }
	    });
	    jQuery.extend({
	      prop: function (elem, name, value) {
	        var ret,
	            hooks,
	            nType = elem.nodeType; // Don't get/set properties on text, comment and attribute nodes

	        if (nType === 3 || nType === 8 || nType === 2) {
	          return;
	        }

	        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	          // Fix name and attach hooks
	          name = jQuery.propFix[name] || name;
	          hooks = jQuery.propHooks[name];
	        }

	        if (value !== undefined) {
	          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	            return ret;
	          }

	          return elem[name] = value;
	        }

	        if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	          return ret;
	        }

	        return elem[name];
	      },
	      propHooks: {
	        tabIndex: {
	          get: function (elem) {
	            // Support: IE <=9 - 11 only
	            // elem.tabIndex doesn't always return the
	            // correct value when it hasn't been explicitly set
	            // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
	            // Use proper attribute retrieval(#12072)
	            var tabindex = jQuery.find.attr(elem, "tabindex");

	            if (tabindex) {
	              return parseInt(tabindex, 10);
	            }

	            if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
	              return 0;
	            }

	            return -1;
	          }
	        }
	      },
	      propFix: {
	        "for": "htmlFor",
	        "class": "className"
	      }
	    }); // Support: IE <=11 only
	    // Accessing the selectedIndex property
	    // forces the browser to respect setting selected
	    // on the option
	    // The getter ensures a default option is selected
	    // when in an optgroup
	    // eslint rule "no-unused-expressions" is disabled for this code
	    // since it considers such accessions noop

	    if (!support.optSelected) {
	      jQuery.propHooks.selected = {
	        get: function (elem) {
	          /* eslint no-unused-expressions: "off" */
	          var parent = elem.parentNode;

	          if (parent && parent.parentNode) {
	            parent.parentNode.selectedIndex;
	          }

	          return null;
	        },
	        set: function (elem) {
	          /* eslint no-unused-expressions: "off" */
	          var parent = elem.parentNode;

	          if (parent) {
	            parent.selectedIndex;

	            if (parent.parentNode) {
	              parent.parentNode.selectedIndex;
	            }
	          }
	        }
	      };
	    }

	    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
	      jQuery.propFix[this.toLowerCase()] = this;
	    }); // Strip and collapse whitespace according to HTML spec
	    // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

	    function stripAndCollapse(value) {
	      var tokens = value.match(rnothtmlwhite) || [];
	      return tokens.join(" ");
	    }

	    function getClass(elem) {
	      return elem.getAttribute && elem.getAttribute("class") || "";
	    }

	    function classesToArray(value) {
	      if (Array.isArray(value)) {
	        return value;
	      }

	      if (typeof value === "string") {
	        return value.match(rnothtmlwhite) || [];
	      }

	      return [];
	    }

	    jQuery.fn.extend({
	      addClass: function (value) {
	        var classes,
	            elem,
	            cur,
	            curValue,
	            clazz,
	            j,
	            finalValue,
	            i = 0;

	        if (isFunction(value)) {
	          return this.each(function (j) {
	            jQuery(this).addClass(value.call(this, j, getClass(this)));
	          });
	        }

	        classes = classesToArray(value);

	        if (classes.length) {
	          while (elem = this[i++]) {
	            curValue = getClass(elem);
	            cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

	            if (cur) {
	              j = 0;

	              while (clazz = classes[j++]) {
	                if (cur.indexOf(" " + clazz + " ") < 0) {
	                  cur += clazz + " ";
	                }
	              } // Only assign if different to avoid unneeded rendering.


	              finalValue = stripAndCollapse(cur);

	              if (curValue !== finalValue) {
	                elem.setAttribute("class", finalValue);
	              }
	            }
	          }
	        }

	        return this;
	      },
	      removeClass: function (value) {
	        var classes,
	            elem,
	            cur,
	            curValue,
	            clazz,
	            j,
	            finalValue,
	            i = 0;

	        if (isFunction(value)) {
	          return this.each(function (j) {
	            jQuery(this).removeClass(value.call(this, j, getClass(this)));
	          });
	        }

	        if (!arguments.length) {
	          return this.attr("class", "");
	        }

	        classes = classesToArray(value);

	        if (classes.length) {
	          while (elem = this[i++]) {
	            curValue = getClass(elem); // This expression is here for better compressibility (see addClass)

	            cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

	            if (cur) {
	              j = 0;

	              while (clazz = classes[j++]) {
	                // Remove *all* instances
	                while (cur.indexOf(" " + clazz + " ") > -1) {
	                  cur = cur.replace(" " + clazz + " ", " ");
	                }
	              } // Only assign if different to avoid unneeded rendering.


	              finalValue = stripAndCollapse(cur);

	              if (curValue !== finalValue) {
	                elem.setAttribute("class", finalValue);
	              }
	            }
	          }
	        }

	        return this;
	      },
	      toggleClass: function (value, stateVal) {
	        var type = typeof value,
	            isValidValue = type === "string" || Array.isArray(value);

	        if (typeof stateVal === "boolean" && isValidValue) {
	          return stateVal ? this.addClass(value) : this.removeClass(value);
	        }

	        if (isFunction(value)) {
	          return this.each(function (i) {
	            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
	          });
	        }

	        return this.each(function () {
	          var className, i, self, classNames;

	          if (isValidValue) {
	            // Toggle individual class names
	            i = 0;
	            self = jQuery(this);
	            classNames = classesToArray(value);

	            while (className = classNames[i++]) {
	              // Check each className given, space separated list
	              if (self.hasClass(className)) {
	                self.removeClass(className);
	              } else {
	                self.addClass(className);
	              }
	            } // Toggle whole class name

	          } else if (value === undefined || type === "boolean") {
	            className = getClass(this);

	            if (className) {
	              // Store className if set
	              dataPriv.set(this, "__className__", className);
	            } // If the element has a class name or if we're passed `false`,
	            // then remove the whole classname (if there was one, the above saved it).
	            // Otherwise bring back whatever was previously saved (if anything),
	            // falling back to the empty string if nothing was stored.


	            if (this.setAttribute) {
	              this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
	            }
	          }
	        });
	      },
	      hasClass: function (selector) {
	        var className,
	            elem,
	            i = 0;
	        className = " " + selector + " ";

	        while (elem = this[i++]) {
	          if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
	            return true;
	          }
	        }

	        return false;
	      }
	    });
	    var rreturn = /\r/g;
	    jQuery.fn.extend({
	      val: function (value) {
	        var hooks,
	            ret,
	            valueIsFunction,
	            elem = this[0];

	        if (!arguments.length) {
	          if (elem) {
	            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

	            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	              return ret;
	            }

	            ret = elem.value; // Handle most common string cases

	            if (typeof ret === "string") {
	              return ret.replace(rreturn, "");
	            } // Handle cases where value is null/undef or number


	            return ret == null ? "" : ret;
	          }

	          return;
	        }

	        valueIsFunction = isFunction(value);
	        return this.each(function (i) {
	          var val;

	          if (this.nodeType !== 1) {
	            return;
	          }

	          if (valueIsFunction) {
	            val = value.call(this, i, jQuery(this).val());
	          } else {
	            val = value;
	          } // Treat null/undefined as ""; convert numbers to string


	          if (val == null) {
	            val = "";
	          } else if (typeof val === "number") {
	            val += "";
	          } else if (Array.isArray(val)) {
	            val = jQuery.map(val, function (value) {
	              return value == null ? "" : value + "";
	            });
	          }

	          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting

	          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
	            this.value = val;
	          }
	        });
	      }
	    });
	    jQuery.extend({
	      valHooks: {
	        option: {
	          get: function (elem) {
	            var val = jQuery.find.attr(elem, "value");
	            return val != null ? val : // Support: IE <=10 - 11 only
	            // option.text throws exceptions (#14686, #14858)
	            // Strip and collapse whitespace
	            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
	            stripAndCollapse(jQuery.text(elem));
	          }
	        },
	        select: {
	          get: function (elem) {
	            var value,
	                option,
	                i,
	                options = elem.options,
	                index = elem.selectedIndex,
	                one = elem.type === "select-one",
	                values = one ? null : [],
	                max = one ? index + 1 : options.length;

	            if (index < 0) {
	              i = max;
	            } else {
	              i = one ? index : 0;
	            } // Loop through all the selected options


	            for (; i < max; i++) {
	              option = options[i]; // Support: IE <=9 only
	              // IE8-9 doesn't update selected after form reset (#2551)

	              if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
	              !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
	                // Get the specific value for the option
	                value = jQuery(option).val(); // We don't need an array for one selects

	                if (one) {
	                  return value;
	                } // Multi-Selects return an array


	                values.push(value);
	              }
	            }

	            return values;
	          },
	          set: function (elem, value) {
	            var optionSet,
	                option,
	                options = elem.options,
	                values = jQuery.makeArray(value),
	                i = options.length;

	            while (i--) {
	              option = options[i];
	              /* eslint-disable no-cond-assign */

	              if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
	                optionSet = true;
	              }
	              /* eslint-enable no-cond-assign */

	            } // Force browsers to behave consistently when non-matching value is set


	            if (!optionSet) {
	              elem.selectedIndex = -1;
	            }

	            return values;
	          }
	        }
	      }
	    }); // Radios and checkboxes getter/setter

	    jQuery.each(["radio", "checkbox"], function () {
	      jQuery.valHooks[this] = {
	        set: function (elem, value) {
	          if (Array.isArray(value)) {
	            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
	          }
	        }
	      };

	      if (!support.checkOn) {
	        jQuery.valHooks[this].get = function (elem) {
	          return elem.getAttribute("value") === null ? "on" : elem.value;
	        };
	      }
	    }); // Return jQuery for attributes-only inclusion

	    support.focusin = "onfocusin" in window;

	    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	        stopPropagationCallback = function (e) {
	      e.stopPropagation();
	    };

	    jQuery.extend(jQuery.event, {
	      trigger: function (event, data, elem, onlyHandlers) {
	        var i,
	            cur,
	            tmp,
	            bubbleType,
	            ontype,
	            handle,
	            special,
	            lastElement,
	            eventPath = [elem || document],
	            type = hasOwn.call(event, "type") ? event.type : event,
	            namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
	        cur = lastElement = tmp = elem = elem || document; // Don't do events on text and comment nodes

	        if (elem.nodeType === 3 || elem.nodeType === 8) {
	          return;
	        } // focus/blur morphs to focusin/out; ensure we're not firing them right now


	        if (rfocusMorph.test(type + jQuery.event.triggered)) {
	          return;
	        }

	        if (type.indexOf(".") > -1) {
	          // Namespaced trigger; create a regexp to match event type in handle()
	          namespaces = type.split(".");
	          type = namespaces.shift();
	          namespaces.sort();
	        }

	        ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string

	        event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

	        event.isTrigger = onlyHandlers ? 2 : 3;
	        event.namespace = namespaces.join(".");
	        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; // Clean up the event in case it is being reused

	        event.result = undefined;

	        if (!event.target) {
	          event.target = elem;
	        } // Clone any incoming data and prepend the event, creating the handler arg list


	        data = data == null ? [event] : jQuery.makeArray(data, [event]); // Allow special events to draw outside the lines

	        special = jQuery.event.special[type] || {};

	        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	          return;
	        } // Determine event propagation path in advance, per W3C events spec (#9951)
	        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)


	        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
	          bubbleType = special.delegateType || type;

	          if (!rfocusMorph.test(bubbleType + type)) {
	            cur = cur.parentNode;
	          }

	          for (; cur; cur = cur.parentNode) {
	            eventPath.push(cur);
	            tmp = cur;
	          } // Only add window if we got to document (e.g., not plain obj or detached DOM)


	          if (tmp === (elem.ownerDocument || document)) {
	            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	          }
	        } // Fire handlers on the event path


	        i = 0;

	        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
	          lastElement = cur;
	          event.type = i > 1 ? bubbleType : special.bindType || type; // jQuery handler

	          handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");

	          if (handle) {
	            handle.apply(cur, data);
	          } // Native handler


	          handle = ontype && cur[ontype];

	          if (handle && handle.apply && acceptData(cur)) {
	            event.result = handle.apply(cur, data);

	            if (event.result === false) {
	              event.preventDefault();
	            }
	          }
	        }

	        event.type = type; // If nobody prevented the default action, do it now

	        if (!onlyHandlers && !event.isDefaultPrevented()) {
	          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
	            // Call a native DOM method on the target with the same name as the event.
	            // Don't do default actions on window, that's where global variables be (#6170)
	            if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
	              // Don't re-trigger an onFOO event when we call its FOO() method
	              tmp = elem[ontype];

	              if (tmp) {
	                elem[ontype] = null;
	              } // Prevent re-triggering of the same event, since we already bubbled it above


	              jQuery.event.triggered = type;

	              if (event.isPropagationStopped()) {
	                lastElement.addEventListener(type, stopPropagationCallback);
	              }

	              elem[type]();

	              if (event.isPropagationStopped()) {
	                lastElement.removeEventListener(type, stopPropagationCallback);
	              }

	              jQuery.event.triggered = undefined;

	              if (tmp) {
	                elem[ontype] = tmp;
	              }
	            }
	          }
	        }

	        return event.result;
	      },
	      // Piggyback on a donor event to simulate a different one
	      // Used only for `focus(in | out)` events
	      simulate: function (type, elem, event) {
	        var e = jQuery.extend(new jQuery.Event(), event, {
	          type: type,
	          isSimulated: true
	        });
	        jQuery.event.trigger(e, null, elem);
	      }
	    });
	    jQuery.fn.extend({
	      trigger: function (type, data) {
	        return this.each(function () {
	          jQuery.event.trigger(type, data, this);
	        });
	      },
	      triggerHandler: function (type, data) {
	        var elem = this[0];

	        if (elem) {
	          return jQuery.event.trigger(type, data, elem, true);
	        }
	      }
	    }); // Support: Firefox <=44
	    // Firefox doesn't have focus(in | out) events
	    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	    //
	    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	    // focus(in | out) events fire after focus & blur events,
	    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

	    if (!support.focusin) {
	      jQuery.each({
	        focus: "focusin",
	        blur: "focusout"
	      }, function (orig, fix) {
	        // Attach a single capturing handler on the document while someone wants focusin/focusout
	        var handler = function (event) {
	          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
	        };

	        jQuery.event.special[fix] = {
	          setup: function () {
	            // Handle: regular nodes (via `this.ownerDocument`), window
	            // (via `this.document`) & document (via `this`).
	            var doc = this.ownerDocument || this.document || this,
	                attaches = dataPriv.access(doc, fix);

	            if (!attaches) {
	              doc.addEventListener(orig, handler, true);
	            }

	            dataPriv.access(doc, fix, (attaches || 0) + 1);
	          },
	          teardown: function () {
	            var doc = this.ownerDocument || this.document || this,
	                attaches = dataPriv.access(doc, fix) - 1;

	            if (!attaches) {
	              doc.removeEventListener(orig, handler, true);
	              dataPriv.remove(doc, fix);
	            } else {
	              dataPriv.access(doc, fix, attaches);
	            }
	          }
	        };
	      });
	    }

	    var location = window.location;
	    var nonce = {
	      guid: Date.now()
	    };
	    var rquery = /\?/; // Cross-browser xml parsing

	    jQuery.parseXML = function (data) {
	      var xml, parserErrorElem;

	      if (!data || typeof data !== "string") {
	        return null;
	      } // Support: IE 9 - 11 only
	      // IE throws on parseFromString with invalid input.


	      try {
	        xml = new window.DOMParser().parseFromString(data, "text/xml");
	      } catch (e) {}

	      parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];

	      if (!xml || parserErrorElem) {
	        jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function (el) {
	          return el.textContent;
	        }).join("\n") : data));
	      }

	      return xml;
	    };

	    var rbracket = /\[\]$/,
	        rCRLF = /\r?\n/g,
	        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	        rsubmittable = /^(?:input|select|textarea|keygen)/i;

	    function buildParams(prefix, obj, traditional, add) {
	      var name;

	      if (Array.isArray(obj)) {
	        // Serialize array item.
	        jQuery.each(obj, function (i, v) {
	          if (traditional || rbracket.test(prefix)) {
	            // Treat each array item as a scalar.
	            add(prefix, v);
	          } else {
	            // Item is non-scalar (array or object), encode its numeric index.
	            buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
	          }
	        });
	      } else if (!traditional && toType(obj) === "object") {
	        // Serialize object item.
	        for (name in obj) {
	          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
	        }
	      } else {
	        // Serialize scalar item.
	        add(prefix, obj);
	      }
	    } // Serialize an array of form elements or a set of
	    // key/values into a query string


	    jQuery.param = function (a, traditional) {
	      var prefix,
	          s = [],
	          add = function (key, valueOrFunction) {
	        // If value is a function, invoke it and use its return value
	        var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
	        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
	      };

	      if (a == null) {
	        return "";
	      } // If an array was passed in, assume that it is an array of form elements.


	      if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
	        // Serialize the form elements
	        jQuery.each(a, function () {
	          add(this.name, this.value);
	        });
	      } else {
	        // If traditional, encode the "old" way (the way 1.3.2 or older
	        // did it), otherwise encode params recursively.
	        for (prefix in a) {
	          buildParams(prefix, a[prefix], traditional, add);
	        }
	      } // Return the resulting serialization


	      return s.join("&");
	    };

	    jQuery.fn.extend({
	      serialize: function () {
	        return jQuery.param(this.serializeArray());
	      },
	      serializeArray: function () {
	        return this.map(function () {
	          // Can add propHook for "elements" to filter or add form elements
	          var elements = jQuery.prop(this, "elements");
	          return elements ? jQuery.makeArray(elements) : this;
	        }).filter(function () {
	          var type = this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works

	          return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
	        }).map(function (_i, elem) {
	          var val = jQuery(this).val();

	          if (val == null) {
	            return null;
	          }

	          if (Array.isArray(val)) {
	            return jQuery.map(val, function (val) {
	              return {
	                name: elem.name,
	                value: val.replace(rCRLF, "\r\n")
	              };
	            });
	          }

	          return {
	            name: elem.name,
	            value: val.replace(rCRLF, "\r\n")
	          };
	        }).get();
	      }
	    });
	    var r20 = /%20/g,
	        rhash = /#.*$/,
	        rantiCache = /([?&])_=[^&]*/,
	        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	        // #7653, #8125, #8152: local protocol detection
	    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	        rnoContent = /^(?:GET|HEAD)$/,
	        rprotocol = /^\/\//,

	    /* Prefilters
	     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	     * 2) These are called:
	     *    - BEFORE asking for a transport
	     *    - AFTER param serialization (s.data is a string if s.processData is true)
	     * 3) key is the dataType
	     * 4) the catchall symbol "*" can be used
	     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	     */
	    prefilters = {},

	    /* Transports bindings
	     * 1) key is the dataType
	     * 2) the catchall symbol "*" can be used
	     * 3) selection will start with transport dataType and THEN go to "*" if needed
	     */
	    transports = {},
	        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	    allTypes = "*/".concat("*"),
	        // Anchor tag for parsing the document origin
	    originAnchor = document.createElement("a");
	    originAnchor.href = location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport

	    function addToPrefiltersOrTransports(structure) {
	      // dataTypeExpression is optional and defaults to "*"
	      return function (dataTypeExpression, func) {
	        if (typeof dataTypeExpression !== "string") {
	          func = dataTypeExpression;
	          dataTypeExpression = "*";
	        }

	        var dataType,
	            i = 0,
	            dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

	        if (isFunction(func)) {
	          // For each dataType in the dataTypeExpression
	          while (dataType = dataTypes[i++]) {
	            // Prepend if requested
	            if (dataType[0] === "+") {
	              dataType = dataType.slice(1) || "*";
	              (structure[dataType] = structure[dataType] || []).unshift(func); // Otherwise append
	            } else {
	              (structure[dataType] = structure[dataType] || []).push(func);
	            }
	          }
	        }
	      };
	    } // Base inspection function for prefilters and transports


	    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
	      var inspected = {},
	          seekingTransport = structure === transports;

	      function inspect(dataType) {
	        var selected;
	        inspected[dataType] = true;
	        jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
	          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);

	          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
	            options.dataTypes.unshift(dataTypeOrTransport);
	            inspect(dataTypeOrTransport);
	            return false;
	          } else if (seekingTransport) {
	            return !(selected = dataTypeOrTransport);
	          }
	        });
	        return selected;
	      }

	      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	    } // A special extend for ajax options
	    // that takes "flat" options (not to be deep extended)
	    // Fixes #9887


	    function ajaxExtend(target, src) {
	      var key,
	          deep,
	          flatOptions = jQuery.ajaxSettings.flatOptions || {};

	      for (key in src) {
	        if (src[key] !== undefined) {
	          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
	        }
	      }

	      if (deep) {
	        jQuery.extend(true, target, deep);
	      }

	      return target;
	    }
	    /* Handles responses to an ajax request:
	     * - finds the right dataType (mediates between content-type and expected dataType)
	     * - returns the corresponding response
	     */


	    function ajaxHandleResponses(s, jqXHR, responses) {
	      var ct,
	          type,
	          finalDataType,
	          firstDataType,
	          contents = s.contents,
	          dataTypes = s.dataTypes; // Remove auto dataType and get content-type in the process

	      while (dataTypes[0] === "*") {
	        dataTypes.shift();

	        if (ct === undefined) {
	          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	        }
	      } // Check if we're dealing with a known content-type


	      if (ct) {
	        for (type in contents) {
	          if (contents[type] && contents[type].test(ct)) {
	            dataTypes.unshift(type);
	            break;
	          }
	        }
	      } // Check to see if we have a response for the expected dataType


	      if (dataTypes[0] in responses) {
	        finalDataType = dataTypes[0];
	      } else {
	        // Try convertible dataTypes
	        for (type in responses) {
	          if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
	            finalDataType = type;
	            break;
	          }

	          if (!firstDataType) {
	            firstDataType = type;
	          }
	        } // Or just use first one


	        finalDataType = finalDataType || firstDataType;
	      } // If we found a dataType
	      // We add the dataType to the list if needed
	      // and return the corresponding response


	      if (finalDataType) {
	        if (finalDataType !== dataTypes[0]) {
	          dataTypes.unshift(finalDataType);
	        }

	        return responses[finalDataType];
	      }
	    }
	    /* Chain conversions given the request and the original response
	     * Also sets the responseXXX fields on the jqXHR instance
	     */


	    function ajaxConvert(s, response, jqXHR, isSuccess) {
	      var conv2,
	          current,
	          conv,
	          tmp,
	          prev,
	          converters = {},
	          // Work with a copy of dataTypes in case we need to modify it for conversion
	      dataTypes = s.dataTypes.slice(); // Create converters map with lowercased keys

	      if (dataTypes[1]) {
	        for (conv in s.converters) {
	          converters[conv.toLowerCase()] = s.converters[conv];
	        }
	      }

	      current = dataTypes.shift(); // Convert to each sequential dataType

	      while (current) {
	        if (s.responseFields[current]) {
	          jqXHR[s.responseFields[current]] = response;
	        } // Apply the dataFilter if provided


	        if (!prev && isSuccess && s.dataFilter) {
	          response = s.dataFilter(response, s.dataType);
	        }

	        prev = current;
	        current = dataTypes.shift();

	        if (current) {
	          // There's only work to do if current dataType is non-auto
	          if (current === "*") {
	            current = prev; // Convert response if prev dataType is non-auto and differs from current
	          } else if (prev !== "*" && prev !== current) {
	            // Seek a direct converter
	            conv = converters[prev + " " + current] || converters["* " + current]; // If none found, seek a pair

	            if (!conv) {
	              for (conv2 in converters) {
	                // If conv2 outputs current
	                tmp = conv2.split(" ");

	                if (tmp[1] === current) {
	                  // If prev can be converted to accepted input
	                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];

	                  if (conv) {
	                    // Condense equivalence converters
	                    if (conv === true) {
	                      conv = converters[conv2]; // Otherwise, insert the intermediate dataType
	                    } else if (converters[conv2] !== true) {
	                      current = tmp[0];
	                      dataTypes.unshift(tmp[1]);
	                    }

	                    break;
	                  }
	                }
	              }
	            } // Apply converter (if not an equivalence)


	            if (conv !== true) {
	              // Unless errors are allowed to bubble, catch and return them
	              if (conv && s.throws) {
	                response = conv(response);
	              } else {
	                try {
	                  response = conv(response);
	                } catch (e) {
	                  return {
	                    state: "parsererror",
	                    error: conv ? e : "No conversion from " + prev + " to " + current
	                  };
	                }
	              }
	            }
	          }
	        }
	      }

	      return {
	        state: "success",
	        data: response
	      };
	    }

	    jQuery.extend({
	      // Counter for holding the number of active queries
	      active: 0,
	      // Last-Modified header cache for next request
	      lastModified: {},
	      etag: {},
	      ajaxSettings: {
	        url: location.href,
	        type: "GET",
	        isLocal: rlocalProtocol.test(location.protocol),
	        global: true,
	        processData: true,
	        async: true,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

	        /*
	        timeout: 0,
	        data: null,
	        dataType: null,
	        username: null,
	        password: null,
	        cache: null,
	        throws: false,
	        traditional: false,
	        headers: {},
	        */
	        accepts: {
	          "*": allTypes,
	          text: "text/plain",
	          html: "text/html",
	          xml: "application/xml, text/xml",
	          json: "application/json, text/javascript"
	        },
	        contents: {
	          xml: /\bxml\b/,
	          html: /\bhtml/,
	          json: /\bjson\b/
	        },
	        responseFields: {
	          xml: "responseXML",
	          text: "responseText",
	          json: "responseJSON"
	        },
	        // Data converters
	        // Keys separate source (or catchall "*") and destination types with a single space
	        converters: {
	          // Convert anything to text
	          "* text": String,
	          // Text to html (true = no transformation)
	          "text html": true,
	          // Evaluate text as a json expression
	          "text json": JSON.parse,
	          // Parse text as xml
	          "text xml": jQuery.parseXML
	        },
	        // For options that shouldn't be deep extended:
	        // you can add your own custom options here if
	        // and when you create one that shouldn't be
	        // deep extended (see ajaxExtend)
	        flatOptions: {
	          url: true,
	          context: true
	        }
	      },
	      // Creates a full fledged settings object into target
	      // with both ajaxSettings and settings fields.
	      // If target is omitted, writes into ajaxSettings.
	      ajaxSetup: function (target, settings) {
	        return settings ? // Building a settings object
	        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
	        ajaxExtend(jQuery.ajaxSettings, target);
	      },
	      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	      ajaxTransport: addToPrefiltersOrTransports(transports),
	      // Main method
	      ajax: function (url, options) {
	        // If url is an object, simulate pre-1.5 signature
	        if (typeof url === "object") {
	          options = url;
	          url = undefined;
	        } // Force options to be an object


	        options = options || {};
	        var transport,
	            // URL without anti-cache param
	        cacheURL,
	            // Response headers
	        responseHeadersString,
	            responseHeaders,
	            // timeout handle
	        timeoutTimer,
	            // Url cleanup var
	        urlAnchor,
	            // Request state (becomes false upon send and true upon completion)
	        completed,
	            // To know if global events are to be dispatched
	        fireGlobals,
	            // Loop variable
	        i,
	            // uncached part of the url
	        uncached,
	            // Create the final options object
	        s = jQuery.ajaxSetup({}, options),
	            // Callbacks context
	        callbackContext = s.context || s,
	            // Context for global events is callbackContext if it is a DOM node or jQuery collection
	        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
	            // Deferreds
	        deferred = jQuery.Deferred(),
	            completeDeferred = jQuery.Callbacks("once memory"),
	            // Status-dependent callbacks
	        statusCode = s.statusCode || {},
	            // Headers (they are sent all at once)
	        requestHeaders = {},
	            requestHeadersNames = {},
	            // Default abort message
	        strAbort = "canceled",
	            // Fake xhr
	        jqXHR = {
	          readyState: 0,
	          // Builds headers hashtable if needed
	          getResponseHeader: function (key) {
	            var match;

	            if (completed) {
	              if (!responseHeaders) {
	                responseHeaders = {};

	                while (match = rheaders.exec(responseHeadersString)) {
	                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
	                }
	              }

	              match = responseHeaders[key.toLowerCase() + " "];
	            }

	            return match == null ? null : match.join(", ");
	          },
	          // Raw string
	          getAllResponseHeaders: function () {
	            return completed ? responseHeadersString : null;
	          },
	          // Caches the header
	          setRequestHeader: function (name, value) {
	            if (completed == null) {
	              name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
	              requestHeaders[name] = value;
	            }

	            return this;
	          },
	          // Overrides response content-type header
	          overrideMimeType: function (type) {
	            if (completed == null) {
	              s.mimeType = type;
	            }

	            return this;
	          },
	          // Status-dependent callbacks
	          statusCode: function (map) {
	            var code;

	            if (map) {
	              if (completed) {
	                // Execute the appropriate callbacks
	                jqXHR.always(map[jqXHR.status]);
	              } else {
	                // Lazy-add the new callbacks in a way that preserves old ones
	                for (code in map) {
	                  statusCode[code] = [statusCode[code], map[code]];
	                }
	              }
	            }

	            return this;
	          },
	          // Cancel the request
	          abort: function (statusText) {
	            var finalText = statusText || strAbort;

	            if (transport) {
	              transport.abort(finalText);
	            }

	            done(0, finalText);
	            return this;
	          }
	        }; // Attach deferreds

	        deferred.promise(jqXHR); // Add protocol if not provided (prefilters might expect it)
	        // Handle falsy url in the settings object (#10093: consistency with old signature)
	        // We also use the url parameter if available

	        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"); // Alias method option to type as per ticket #12004

	        s.type = options.method || options.type || s.method || s.type; // Extract dataTypes list

	        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""]; // A cross-domain request is in order when the origin doesn't match the current origin.

	        if (s.crossDomain == null) {
	          urlAnchor = document.createElement("a"); // Support: IE <=8 - 11, Edge 12 - 15
	          // IE throws exception on accessing the href property if url is malformed,
	          // e.g. http://example.com:80x/

	          try {
	            urlAnchor.href = s.url; // Support: IE <=8 - 11 only
	            // Anchor's host property isn't correctly set when s.url is relative

	            urlAnchor.href = urlAnchor.href;
	            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
	          } catch (e) {
	            // If there is an error parsing the URL, assume it is crossDomain,
	            // it can be rejected by the transport if it is invalid
	            s.crossDomain = true;
	          }
	        } // Convert data if not already a string


	        if (s.data && s.processData && typeof s.data !== "string") {
	          s.data = jQuery.param(s.data, s.traditional);
	        } // Apply prefilters


	        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR); // If request was aborted inside a prefilter, stop there

	        if (completed) {
	          return jqXHR;
	        } // We can fire global events as of now if asked to
	        // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)


	        fireGlobals = jQuery.event && s.global; // Watch for a new set of requests

	        if (fireGlobals && jQuery.active++ === 0) {
	          jQuery.event.trigger("ajaxStart");
	        } // Uppercase the type


	        s.type = s.type.toUpperCase(); // Determine if request has content

	        s.hasContent = !rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
	        // and/or If-None-Match header later on
	        // Remove hash to simplify url manipulation

	        cacheURL = s.url.replace(rhash, ""); // More options handling for requests with no content

	        if (!s.hasContent) {
	          // Remember the hash so we can put it back
	          uncached = s.url.slice(cacheURL.length); // If data is available and should be processed, append data to url

	          if (s.data && (s.processData || typeof s.data === "string")) {
	            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data; // #9682: remove data so that it's not used in an eventual retry

	            delete s.data;
	          } // Add or update anti-cache param if needed


	          if (s.cache === false) {
	            cacheURL = cacheURL.replace(rantiCache, "$1");
	            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
	          } // Put hash and anti-cache on the URL that will be requested (gh-1732)


	          s.url = cacheURL + uncached; // Change '%20' to '+' if this is encoded form body content (gh-2658)
	        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
	          s.data = s.data.replace(r20, "+");
	        } // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.


	        if (s.ifModified) {
	          if (jQuery.lastModified[cacheURL]) {
	            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
	          }

	          if (jQuery.etag[cacheURL]) {
	            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
	          }
	        } // Set the correct header, if data is being sent


	        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	          jqXHR.setRequestHeader("Content-Type", s.contentType);
	        } // Set the Accepts header for the server, depending on the dataType


	        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]); // Check for headers option

	        for (i in s.headers) {
	          jqXHR.setRequestHeader(i, s.headers[i]);
	        } // Allow custom headers/mimetypes and early abort


	        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
	          // Abort if not done already and return
	          return jqXHR.abort();
	        } // Aborting is no longer a cancellation


	        strAbort = "abort"; // Install callbacks on deferreds

	        completeDeferred.add(s.complete);
	        jqXHR.done(s.success);
	        jqXHR.fail(s.error); // Get transport

	        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR); // If no transport, we auto-abort

	        if (!transport) {
	          done(-1, "No Transport");
	        } else {
	          jqXHR.readyState = 1; // Send global event

	          if (fireGlobals) {
	            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
	          } // If request was aborted inside ajaxSend, stop there


	          if (completed) {
	            return jqXHR;
	          } // Timeout


	          if (s.async && s.timeout > 0) {
	            timeoutTimer = window.setTimeout(function () {
	              jqXHR.abort("timeout");
	            }, s.timeout);
	          }

	          try {
	            completed = false;
	            transport.send(requestHeaders, done);
	          } catch (e) {
	            // Rethrow post-completion exceptions
	            if (completed) {
	              throw e;
	            } // Propagate others as results


	            done(-1, e);
	          }
	        } // Callback for when everything is done


	        function done(status, nativeStatusText, responses, headers) {
	          var isSuccess,
	              success,
	              error,
	              response,
	              modified,
	              statusText = nativeStatusText; // Ignore repeat invocations

	          if (completed) {
	            return;
	          }

	          completed = true; // Clear timeout if it exists

	          if (timeoutTimer) {
	            window.clearTimeout(timeoutTimer);
	          } // Dereference transport for early garbage collection
	          // (no matter how long the jqXHR object will be used)


	          transport = undefined; // Cache response headers

	          responseHeadersString = headers || ""; // Set readyState

	          jqXHR.readyState = status > 0 ? 4 : 0; // Determine if successful

	          isSuccess = status >= 200 && status < 300 || status === 304; // Get response data

	          if (responses) {
	            response = ajaxHandleResponses(s, jqXHR, responses);
	          } // Use a noop converter for missing script but not if jsonp


	          if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
	            s.converters["text script"] = function () {};
	          } // Convert no matter what (that way responseXXX fields are always set)


	          response = ajaxConvert(s, response, jqXHR, isSuccess); // If successful, handle type chaining

	          if (isSuccess) {
	            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
	            if (s.ifModified) {
	              modified = jqXHR.getResponseHeader("Last-Modified");

	              if (modified) {
	                jQuery.lastModified[cacheURL] = modified;
	              }

	              modified = jqXHR.getResponseHeader("etag");

	              if (modified) {
	                jQuery.etag[cacheURL] = modified;
	              }
	            } // if no content


	            if (status === 204 || s.type === "HEAD") {
	              statusText = "nocontent"; // if not modified
	            } else if (status === 304) {
	              statusText = "notmodified"; // If we have data, let's convert it
	            } else {
	              statusText = response.state;
	              success = response.data;
	              error = response.error;
	              isSuccess = !error;
	            }
	          } else {
	            // Extract error from statusText and normalize for non-aborts
	            error = statusText;

	            if (status || !statusText) {
	              statusText = "error";

	              if (status < 0) {
	                status = 0;
	              }
	            }
	          } // Set data for the fake xhr object


	          jqXHR.status = status;
	          jqXHR.statusText = (nativeStatusText || statusText) + ""; // Success/Error

	          if (isSuccess) {
	            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
	          } else {
	            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
	          } // Status-dependent callbacks


	          jqXHR.statusCode(statusCode);
	          statusCode = undefined;

	          if (fireGlobals) {
	            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
	          } // Complete


	          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

	          if (fireGlobals) {
	            globalEventContext.trigger("ajaxComplete", [jqXHR, s]); // Handle the global AJAX counter

	            if (! --jQuery.active) {
	              jQuery.event.trigger("ajaxStop");
	            }
	          }
	        }

	        return jqXHR;
	      },
	      getJSON: function (url, data, callback) {
	        return jQuery.get(url, data, callback, "json");
	      },
	      getScript: function (url, callback) {
	        return jQuery.get(url, undefined, callback, "script");
	      }
	    });
	    jQuery.each(["get", "post"], function (_i, method) {
	      jQuery[method] = function (url, data, callback, type) {
	        // Shift arguments if data argument was omitted
	        if (isFunction(data)) {
	          type = type || callback;
	          callback = data;
	          data = undefined;
	        } // The url can be an options object (which then must have .url)


	        return jQuery.ajax(jQuery.extend({
	          url: url,
	          type: method,
	          dataType: type,
	          data: data,
	          success: callback
	        }, jQuery.isPlainObject(url) && url));
	      };
	    });
	    jQuery.ajaxPrefilter(function (s) {
	      var i;

	      for (i in s.headers) {
	        if (i.toLowerCase() === "content-type") {
	          s.contentType = s.headers[i] || "";
	        }
	      }
	    });

	    jQuery._evalUrl = function (url, options, doc) {
	      return jQuery.ajax({
	        url: url,
	        // Make this explicit, since user can override this through ajaxSetup (#11264)
	        type: "GET",
	        dataType: "script",
	        cache: true,
	        async: false,
	        global: false,
	        // Only evaluate the response if it is successful (gh-4126)
	        // dataFilter is not invoked for failure responses, so using it instead
	        // of the default converter is kludgy but it works.
	        converters: {
	          "text script": function () {}
	        },
	        dataFilter: function (response) {
	          jQuery.globalEval(response, options, doc);
	        }
	      });
	    };

	    jQuery.fn.extend({
	      wrapAll: function (html) {
	        var wrap;

	        if (this[0]) {
	          if (isFunction(html)) {
	            html = html.call(this[0]);
	          } // The elements to wrap the target around


	          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

	          if (this[0].parentNode) {
	            wrap.insertBefore(this[0]);
	          }

	          wrap.map(function () {
	            var elem = this;

	            while (elem.firstElementChild) {
	              elem = elem.firstElementChild;
	            }

	            return elem;
	          }).append(this);
	        }

	        return this;
	      },
	      wrapInner: function (html) {
	        if (isFunction(html)) {
	          return this.each(function (i) {
	            jQuery(this).wrapInner(html.call(this, i));
	          });
	        }

	        return this.each(function () {
	          var self = jQuery(this),
	              contents = self.contents();

	          if (contents.length) {
	            contents.wrapAll(html);
	          } else {
	            self.append(html);
	          }
	        });
	      },
	      wrap: function (html) {
	        var htmlIsFunction = isFunction(html);
	        return this.each(function (i) {
	          jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
	        });
	      },
	      unwrap: function (selector) {
	        this.parent(selector).not("body").each(function () {
	          jQuery(this).replaceWith(this.childNodes);
	        });
	        return this;
	      }
	    });

	    jQuery.expr.pseudos.hidden = function (elem) {
	      return !jQuery.expr.pseudos.visible(elem);
	    };

	    jQuery.expr.pseudos.visible = function (elem) {
	      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	    };

	    jQuery.ajaxSettings.xhr = function () {
	      try {
	        return new window.XMLHttpRequest();
	      } catch (e) {}
	    };

	    var xhrSuccessStatus = {
	      // File protocol always yields status code 0, assume 200
	      0: 200,
	      // Support: IE <=9 only
	      // #1450: sometimes IE returns 1223 when it should be 204
	      1223: 204
	    },
	        xhrSupported = jQuery.ajaxSettings.xhr();
	    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	    support.ajax = xhrSupported = !!xhrSupported;
	    jQuery.ajaxTransport(function (options) {
	      var callback, errorCallback; // Cross domain only allowed if supported through XMLHttpRequest

	      if (support.cors || xhrSupported && !options.crossDomain) {
	        return {
	          send: function (headers, complete) {
	            var i,
	                xhr = options.xhr();
	            xhr.open(options.type, options.url, options.async, options.username, options.password); // Apply custom fields if provided

	            if (options.xhrFields) {
	              for (i in options.xhrFields) {
	                xhr[i] = options.xhrFields[i];
	              }
	            } // Override mime type if needed


	            if (options.mimeType && xhr.overrideMimeType) {
	              xhr.overrideMimeType(options.mimeType);
	            } // X-Requested-With header
	            // For cross-domain requests, seeing as conditions for a preflight are
	            // akin to a jigsaw puzzle, we simply never set it to be sure.
	            // (it can always be set on a per-request basis or even using ajaxSetup)
	            // For same-domain requests, won't change header if already provided.


	            if (!options.crossDomain && !headers["X-Requested-With"]) {
	              headers["X-Requested-With"] = "XMLHttpRequest";
	            } // Set headers


	            for (i in headers) {
	              xhr.setRequestHeader(i, headers[i]);
	            } // Callback


	            callback = function (type) {
	              return function () {
	                if (callback) {
	                  callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

	                  if (type === "abort") {
	                    xhr.abort();
	                  } else if (type === "error") {
	                    // Support: IE <=9 only
	                    // On a manual native abort, IE9 throws
	                    // errors on any property access that is not readyState
	                    if (typeof xhr.status !== "number") {
	                      complete(0, "error");
	                    } else {
	                      complete( // File: protocol always yields status 0; see #8605, #14207
	                      xhr.status, xhr.statusText);
	                    }
	                  } else {
	                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, // Support: IE <=9 only
	                    // IE9 has no XHR2 but throws on binary (trac-11426)
	                    // For XHR2 non-text, let the caller handle it (gh-2498)
	                    (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
	                      binary: xhr.response
	                    } : {
	                      text: xhr.responseText
	                    }, xhr.getAllResponseHeaders());
	                  }
	                }
	              };
	            }; // Listen to events


	            xhr.onload = callback();
	            errorCallback = xhr.onerror = xhr.ontimeout = callback("error"); // Support: IE 9 only
	            // Use onreadystatechange to replace onabort
	            // to handle uncaught aborts

	            if (xhr.onabort !== undefined) {
	              xhr.onabort = errorCallback;
	            } else {
	              xhr.onreadystatechange = function () {
	                // Check readyState before timeout as it changes
	                if (xhr.readyState === 4) {
	                  // Allow onerror to be called first,
	                  // but that will not handle a native abort
	                  // Also, save errorCallback to a variable
	                  // as xhr.onerror cannot be accessed
	                  window.setTimeout(function () {
	                    if (callback) {
	                      errorCallback();
	                    }
	                  });
	                }
	              };
	            } // Create the abort callback


	            callback = callback("abort");

	            try {
	              // Do send the request (this may raise an exception)
	              xhr.send(options.hasContent && options.data || null);
	            } catch (e) {
	              // #14683: Only rethrow if this hasn't been notified as an error yet
	              if (callback) {
	                throw e;
	              }
	            }
	          },
	          abort: function () {
	            if (callback) {
	              callback();
	            }
	          }
	        };
	      }
	    }); // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)

	    jQuery.ajaxPrefilter(function (s) {
	      if (s.crossDomain) {
	        s.contents.script = false;
	      }
	    }); // Install script dataType

	    jQuery.ajaxSetup({
	      accepts: {
	        script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
	      },
	      contents: {
	        script: /\b(?:java|ecma)script\b/
	      },
	      converters: {
	        "text script": function (text) {
	          jQuery.globalEval(text);
	          return text;
	        }
	      }
	    }); // Handle cache's special case and crossDomain

	    jQuery.ajaxPrefilter("script", function (s) {
	      if (s.cache === undefined) {
	        s.cache = false;
	      }

	      if (s.crossDomain) {
	        s.type = "GET";
	      }
	    }); // Bind script tag hack transport

	    jQuery.ajaxTransport("script", function (s) {
	      // This transport only deals with cross domain or forced-by-attrs requests
	      if (s.crossDomain || s.scriptAttrs) {
	        var script, callback;
	        return {
	          send: function (_, complete) {
	            script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
	              charset: s.scriptCharset,
	              src: s.url
	            }).on("load error", callback = function (evt) {
	              script.remove();
	              callback = null;

	              if (evt) {
	                complete(evt.type === "error" ? 404 : 200, evt.type);
	              }
	            }); // Use native DOM manipulation to avoid our domManip AJAX trickery

	            document.head.appendChild(script[0]);
	          },
	          abort: function () {
	            if (callback) {
	              callback();
	            }
	          }
	        };
	      }
	    });
	    var oldCallbacks = [],
	        rjsonp = /(=)\?(?=&|$)|\?\?/; // Default jsonp settings

	    jQuery.ajaxSetup({
	      jsonp: "callback",
	      jsonpCallback: function () {
	        var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
	        this[callback] = true;
	        return callback;
	      }
	    }); // Detect, normalize options and install callbacks for jsonp requests

	    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
	      var callbackName,
	          overwritten,
	          responseContainer,
	          jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set

	      if (jsonProp || s.dataTypes[0] === "jsonp") {
	        // Get callback name, remembering preexisting value associated with it
	        callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback; // Insert callback into url or form data

	        if (jsonProp) {
	          s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
	        } else if (s.jsonp !== false) {
	          s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
	        } // Use data converter to retrieve json after script execution


	        s.converters["script json"] = function () {
	          if (!responseContainer) {
	            jQuery.error(callbackName + " was not called");
	          }

	          return responseContainer[0];
	        }; // Force json dataType


	        s.dataTypes[0] = "json"; // Install callback

	        overwritten = window[callbackName];

	        window[callbackName] = function () {
	          responseContainer = arguments;
	        }; // Clean-up function (fires after converters)


	        jqXHR.always(function () {
	          // If previous value didn't exist - remove it
	          if (overwritten === undefined) {
	            jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
	          } else {
	            window[callbackName] = overwritten;
	          } // Save back as free


	          if (s[callbackName]) {
	            // Make sure that re-using the options doesn't screw things around
	            s.jsonpCallback = originalSettings.jsonpCallback; // Save the callback name for future use

	            oldCallbacks.push(callbackName);
	          } // Call if it was a function and we have a response


	          if (responseContainer && isFunction(overwritten)) {
	            overwritten(responseContainer[0]);
	          }

	          responseContainer = overwritten = undefined;
	        }); // Delegate to script

	        return "script";
	      }
	    }); // Support: Safari 8 only
	    // In Safari 8 documents created via document.implementation.createHTMLDocument
	    // collapse sibling forms: the second one becomes a child of the first one.
	    // Because of that, this security measure has to be disabled in Safari 8.
	    // https://bugs.webkit.org/show_bug.cgi?id=137337

	    support.createHTMLDocument = function () {
	      var body = document.implementation.createHTMLDocument("").body;
	      body.innerHTML = "<form></form><form></form>";
	      return body.childNodes.length === 2;
	    }(); // Argument "data" should be string of html
	    // context (optional): If specified, the fragment will be created in this context,
	    // defaults to document
	    // keepScripts (optional): If true, will include scripts passed in the html string


	    jQuery.parseHTML = function (data, context, keepScripts) {
	      if (typeof data !== "string") {
	        return [];
	      }

	      if (typeof context === "boolean") {
	        keepScripts = context;
	        context = false;
	      }

	      var base, parsed, scripts;

	      if (!context) {
	        // Stop scripts or inline event handlers from being executed immediately
	        // by using document.implementation
	        if (support.createHTMLDocument) {
	          context = document.implementation.createHTMLDocument(""); // Set the base href for the created document
	          // so any parsed elements with URLs
	          // are based on the document's URL (gh-2965)

	          base = context.createElement("base");
	          base.href = document.location.href;
	          context.head.appendChild(base);
	        } else {
	          context = document;
	        }
	      }

	      parsed = rsingleTag.exec(data);
	      scripts = !keepScripts && []; // Single tag

	      if (parsed) {
	        return [context.createElement(parsed[1])];
	      }

	      parsed = buildFragment([data], context, scripts);

	      if (scripts && scripts.length) {
	        jQuery(scripts).remove();
	      }

	      return jQuery.merge([], parsed.childNodes);
	    };
	    /**
	     * Load a url into a page
	     */


	    jQuery.fn.load = function (url, params, callback) {
	      var selector,
	          type,
	          response,
	          self = this,
	          off = url.indexOf(" ");

	      if (off > -1) {
	        selector = stripAndCollapse(url.slice(off));
	        url = url.slice(0, off);
	      } // If it's a function


	      if (isFunction(params)) {
	        // We assume that it's the callback
	        callback = params;
	        params = undefined; // Otherwise, build a param string
	      } else if (params && typeof params === "object") {
	        type = "POST";
	      } // If we have elements to modify, make the request


	      if (self.length > 0) {
	        jQuery.ajax({
	          url: url,
	          // If "type" variable is undefined, then "GET" method will be used.
	          // Make value of this field explicit since
	          // user can override it through ajaxSetup method
	          type: type || "GET",
	          dataType: "html",
	          data: params
	        }).done(function (responseText) {
	          // Save response for use in complete callback
	          response = arguments;
	          self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
	          // Exclude scripts to avoid IE 'Permission Denied' errors
	          jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
	          responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
	          // but they are ignored because response was set above.
	          // If it fails, this function gets "jqXHR", "status", "error"
	        }).always(callback && function (jqXHR, status) {
	          self.each(function () {
	            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
	          });
	        });
	      }

	      return this;
	    };

	    jQuery.expr.pseudos.animated = function (elem) {
	      return jQuery.grep(jQuery.timers, function (fn) {
	        return elem === fn.elem;
	      }).length;
	    };

	    jQuery.offset = {
	      setOffset: function (elem, options, i) {
	        var curPosition,
	            curLeft,
	            curCSSTop,
	            curTop,
	            curOffset,
	            curCSSLeft,
	            calculatePosition,
	            position = jQuery.css(elem, "position"),
	            curElem = jQuery(elem),
	            props = {}; // Set position first, in-case top/left are set even on static elem

	        if (position === "static") {
	          elem.style.position = "relative";
	        }

	        curOffset = curElem.offset();
	        curCSSTop = jQuery.css(elem, "top");
	        curCSSLeft = jQuery.css(elem, "left");
	        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
	        // top or left is auto and position is either absolute or fixed

	        if (calculatePosition) {
	          curPosition = curElem.position();
	          curTop = curPosition.top;
	          curLeft = curPosition.left;
	        } else {
	          curTop = parseFloat(curCSSTop) || 0;
	          curLeft = parseFloat(curCSSLeft) || 0;
	        }

	        if (isFunction(options)) {
	          // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
	          options = options.call(elem, i, jQuery.extend({}, curOffset));
	        }

	        if (options.top != null) {
	          props.top = options.top - curOffset.top + curTop;
	        }

	        if (options.left != null) {
	          props.left = options.left - curOffset.left + curLeft;
	        }

	        if ("using" in options) {
	          options.using.call(elem, props);
	        } else {
	          curElem.css(props);
	        }
	      }
	    };
	    jQuery.fn.extend({
	      // offset() relates an element's border box to the document origin
	      offset: function (options) {
	        // Preserve chaining for setter
	        if (arguments.length) {
	          return options === undefined ? this : this.each(function (i) {
	            jQuery.offset.setOffset(this, options, i);
	          });
	        }

	        var rect,
	            win,
	            elem = this[0];

	        if (!elem) {
	          return;
	        } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
	        // Support: IE <=11 only
	        // Running getBoundingClientRect on a
	        // disconnected node in IE throws an error


	        if (!elem.getClientRects().length) {
	          return {
	            top: 0,
	            left: 0
	          };
	        } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


	        rect = elem.getBoundingClientRect();
	        win = elem.ownerDocument.defaultView;
	        return {
	          top: rect.top + win.pageYOffset,
	          left: rect.left + win.pageXOffset
	        };
	      },
	      // position() relates an element's margin box to its offset parent's padding box
	      // This corresponds to the behavior of CSS absolute positioning
	      position: function () {
	        if (!this[0]) {
	          return;
	        }

	        var offsetParent,
	            offset,
	            doc,
	            elem = this[0],
	            parentOffset = {
	          top: 0,
	          left: 0
	        }; // position:fixed elements are offset from the viewport, which itself always has zero offset

	        if (jQuery.css(elem, "position") === "fixed") {
	          // Assume position:fixed implies availability of getBoundingClientRect
	          offset = elem.getBoundingClientRect();
	        } else {
	          offset = this.offset(); // Account for the *real* offset parent, which can be the document or its root element
	          // when a statically positioned element is identified

	          doc = elem.ownerDocument;
	          offsetParent = elem.offsetParent || doc.documentElement;

	          while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
	            offsetParent = offsetParent.parentNode;
	          }

	          if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
	            // Incorporate borders into its offset, since they are outside its content origin
	            parentOffset = jQuery(offsetParent).offset();
	            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
	            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
	          }
	        } // Subtract parent offsets and element margins


	        return {
	          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
	          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
	        };
	      },
	      // This method will return documentElement in the following cases:
	      // 1) For the element inside the iframe without offsetParent, this method will return
	      //    documentElement of the parent window
	      // 2) For the hidden or detached element
	      // 3) For body or html element, i.e. in case of the html node - it will return itself
	      //
	      // but those exceptions were never presented as a real life use-cases
	      // and might be considered as more preferable results.
	      //
	      // This logic, however, is not guaranteed and can change at any point in the future
	      offsetParent: function () {
	        return this.map(function () {
	          var offsetParent = this.offsetParent;

	          while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
	            offsetParent = offsetParent.offsetParent;
	          }

	          return offsetParent || documentElement;
	        });
	      }
	    }); // Create scrollLeft and scrollTop methods

	    jQuery.each({
	      scrollLeft: "pageXOffset",
	      scrollTop: "pageYOffset"
	    }, function (method, prop) {
	      var top = "pageYOffset" === prop;

	      jQuery.fn[method] = function (val) {
	        return access(this, function (elem, method, val) {
	          // Coalesce documents and windows
	          var win;

	          if (isWindow(elem)) {
	            win = elem;
	          } else if (elem.nodeType === 9) {
	            win = elem.defaultView;
	          }

	          if (val === undefined) {
	            return win ? win[prop] : elem[method];
	          }

	          if (win) {
	            win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
	          } else {
	            elem[method] = val;
	          }
	        }, method, val, arguments.length);
	      };
	    }); // Support: Safari <=7 - 9.1, Chrome <=37 - 49
	    // Add the top/left cssHooks using jQuery.fn.position
	    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	    // getComputedStyle returns percent when specified for top/left/bottom/right;
	    // rather than make the css module depend on the offset module, just check for it here

	    jQuery.each(["top", "left"], function (_i, prop) {
	      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
	        if (computed) {
	          computed = curCSS(elem, prop); // If curCSS returns percentage, fallback to offset

	          return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
	        }
	      });
	    }); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

	    jQuery.each({
	      Height: "height",
	      Width: "width"
	    }, function (name, type) {
	      jQuery.each({
	        padding: "inner" + name,
	        content: type,
	        "": "outer" + name
	      }, function (defaultExtra, funcName) {
	        // Margin is only for outerHeight, outerWidth
	        jQuery.fn[funcName] = function (margin, value) {
	          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
	              extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
	          return access(this, function (elem, type, value) {
	            var doc;

	            if (isWindow(elem)) {
	              // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
	              return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
	            } // Get document width or height


	            if (elem.nodeType === 9) {
	              doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
	              // whichever is greatest

	              return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
	            }

	            return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
	            jQuery.css(elem, type, extra) : // Set width or height on the element
	            jQuery.style(elem, type, value, extra);
	          }, type, chainable ? margin : undefined, chainable);
	        };
	      });
	    });
	    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
	      jQuery.fn[type] = function (fn) {
	        return this.on(type, fn);
	      };
	    });
	    jQuery.fn.extend({
	      bind: function (types, data, fn) {
	        return this.on(types, null, data, fn);
	      },
	      unbind: function (types, fn) {
	        return this.off(types, null, fn);
	      },
	      delegate: function (selector, types, data, fn) {
	        return this.on(types, selector, data, fn);
	      },
	      undelegate: function (selector, types, fn) {
	        // ( namespace ) or ( selector, types [, fn] )
	        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	      },
	      hover: function (fnOver, fnOut) {
	        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	      }
	    });
	    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
	      // Handle event binding
	      jQuery.fn[name] = function (data, fn) {
	        return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	      };
	    }); // Support: Android <=4.0 only
	    // Make sure we trim BOM and NBSP

	    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; // Bind a function to a context, optionally partially applying any
	    // arguments.
	    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	    // However, it is not slated for removal any time soon

	    jQuery.proxy = function (fn, context) {
	      var tmp, args, proxy;

	      if (typeof context === "string") {
	        tmp = fn[context];
	        context = fn;
	        fn = tmp;
	      } // Quick check to determine if target is callable, in the spec
	      // this throws a TypeError, but we will just return undefined.


	      if (!isFunction(fn)) {
	        return undefined;
	      } // Simulated bind


	      args = slice.call(arguments, 2);

	      proxy = function () {
	        return fn.apply(context || this, args.concat(slice.call(arguments)));
	      }; // Set the guid of unique handler to the same of original handler, so it can be removed


	      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	      return proxy;
	    };

	    jQuery.holdReady = function (hold) {
	      if (hold) {
	        jQuery.readyWait++;
	      } else {
	        jQuery.ready(true);
	      }
	    };

	    jQuery.isArray = Array.isArray;
	    jQuery.parseJSON = JSON.parse;
	    jQuery.nodeName = nodeName;
	    jQuery.isFunction = isFunction;
	    jQuery.isWindow = isWindow;
	    jQuery.camelCase = camelCase;
	    jQuery.type = toType;
	    jQuery.now = Date.now;

	    jQuery.isNumeric = function (obj) {
	      // As of jQuery 3.0, isNumeric is limited to
	      // strings and numbers (primitives or objects)
	      // that can be coerced to finite numbers (gh-2662)
	      var type = jQuery.type(obj);
	      return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
	      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	      // subtraction forces infinities to NaN
	      !isNaN(obj - parseFloat(obj));
	    };

	    jQuery.trim = function (text) {
	      return text == null ? "" : (text + "").replace(rtrim, "");
	    }; // Register as a named AMD module, since jQuery can be concatenated with other

	    var // Map over jQuery in case of overwrite
	    _jQuery = window.jQuery,
	        // Map over the $ in case of overwrite
	    _$ = window.$;

	    jQuery.noConflict = function (deep) {
	      if (window.$ === jQuery) {
	        window.$ = _$;
	      }

	      if (deep && window.jQuery === jQuery) {
	        window.jQuery = _jQuery;
	      }

	      return jQuery;
	    }; // Expose jQuery and $ identifiers, even in AMD
	    // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	    // and CommonJS for browser emulators (#13566)


	    if (typeof noGlobal === "undefined") {
	      window.jQuery = window.$ = jQuery;
	    }

	    return jQuery;
	  });
	})(jquery);

	var $ = jquery.exports;

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	(function (e) {
	  if (typeof exports === "object" && typeof module !== "undefined") {
	    module.exports = e();
	  } else if (typeof define === "function" && define.amd) {
	    define([], e);
	  } else {
	    var t;

	    if (typeof window !== "undefined") {
	      t = window;
	    } else if (typeof global$1 !== "undefined") {
	      t = global$1;
	    } else if (typeof self !== "undefined") {
	      t = self;
	    } else {
	      t = this;
	    }

	    t.SimplePeer = e();
	  }
	})(function () {
	  return function () {
	    function e(t, r, n) {
	      function i(a, s) {
	        if (!r[a]) {
	          if (!t[a]) {
	            var f = typeof require == "function" && require;
	            if (!s && f) return f(a, !0);
	            if (o) return o(a, !0);
	            var u = new Error("Cannot find module '" + a + "'");
	            throw u.code = "MODULE_NOT_FOUND", u;
	          }

	          var l = r[a] = {
	            exports: {}
	          };
	          t[a][0].call(l.exports, function (e) {
	            var r = t[a][1][e];
	            return i(r ? r : e);
	          }, l, l.exports, e, t, r, n);
	        }

	        return r[a].exports;
	      }

	      var o = typeof require == "function" && require;

	      for (var a = 0; a < n.length; a++) i(n[a]);

	      return i;
	    }

	    return e;
	  }()({
	    1: [function (e, t, r) {

	      r.byteLength = l;
	      r.toByteArray = c;
	      r.fromByteArray = p;
	      var n = [];
	      var i = [];
	      var o = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	      var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	      for (var s = 0, f = a.length; s < f; ++s) {
	        n[s] = a[s];
	        i[a.charCodeAt(s)] = s;
	      }

	      i["-".charCodeAt(0)] = 62;
	      i["_".charCodeAt(0)] = 63;

	      function u(e) {
	        var t = e.length;

	        if (t % 4 > 0) {
	          throw new Error("Invalid string. Length must be a multiple of 4");
	        }

	        return e[t - 2] === "=" ? 2 : e[t - 1] === "=" ? 1 : 0;
	      }

	      function l(e) {
	        return e.length * 3 / 4 - u(e);
	      }

	      function c(e) {
	        var t, r, n, a, s;
	        var f = e.length;
	        a = u(e);
	        s = new o(f * 3 / 4 - a);
	        r = a > 0 ? f - 4 : f;
	        var l = 0;

	        for (t = 0; t < r; t += 4) {
	          n = i[e.charCodeAt(t)] << 18 | i[e.charCodeAt(t + 1)] << 12 | i[e.charCodeAt(t + 2)] << 6 | i[e.charCodeAt(t + 3)];
	          s[l++] = n >> 16 & 255;
	          s[l++] = n >> 8 & 255;
	          s[l++] = n & 255;
	        }

	        if (a === 2) {
	          n = i[e.charCodeAt(t)] << 2 | i[e.charCodeAt(t + 1)] >> 4;
	          s[l++] = n & 255;
	        } else if (a === 1) {
	          n = i[e.charCodeAt(t)] << 10 | i[e.charCodeAt(t + 1)] << 4 | i[e.charCodeAt(t + 2)] >> 2;
	          s[l++] = n >> 8 & 255;
	          s[l++] = n & 255;
	        }

	        return s;
	      }

	      function h(e) {
	        return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[e & 63];
	      }

	      function d(e, t, r) {
	        var n;
	        var i = [];

	        for (var o = t; o < r; o += 3) {
	          n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255);
	          i.push(h(n));
	        }

	        return i.join("");
	      }

	      function p(e) {
	        var t;
	        var r = e.length;
	        var i = r % 3;
	        var o = "";
	        var a = [];
	        var s = 16383;

	        for (var f = 0, u = r - i; f < u; f += s) {
	          a.push(d(e, f, f + s > u ? u : f + s));
	        }

	        if (i === 1) {
	          t = e[r - 1];
	          o += n[t >> 2];
	          o += n[t << 4 & 63];
	          o += "==";
	        } else if (i === 2) {
	          t = (e[r - 2] << 8) + e[r - 1];
	          o += n[t >> 10];
	          o += n[t >> 4 & 63];
	          o += n[t << 2 & 63];
	          o += "=";
	        }

	        a.push(o);
	        return a.join("");
	      }
	    }, {}],
	    2: [function (e, t, r) {}, {}],
	    3: [function (e, t, r) {

	      var n = e("base64-js");
	      var i = e("ieee754");
	      r.Buffer = f;
	      r.SlowBuffer = m;
	      r.INSPECT_MAX_BYTES = 50;
	      var o = 2147483647;
	      r.kMaxLength = o;
	      f.TYPED_ARRAY_SUPPORT = a();

	      if (!f.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
	        console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
	      }

	      function a() {
	        try {
	          var e = new Uint8Array(1);
	          e.__proto__ = {
	            __proto__: Uint8Array.prototype,
	            foo: function () {
	              return 42;
	            }
	          };
	          return e.foo() === 42;
	        } catch (e) {
	          return false;
	        }
	      }

	      Object.defineProperty(f.prototype, "parent", {
	        get: function () {
	          if (!(this instanceof f)) {
	            return undefined;
	          }

	          return this.buffer;
	        }
	      });
	      Object.defineProperty(f.prototype, "offset", {
	        get: function () {
	          if (!(this instanceof f)) {
	            return undefined;
	          }

	          return this.byteOffset;
	        }
	      });

	      function s(e) {
	        if (e > o) {
	          throw new RangeError("Invalid typed array length");
	        }

	        var t = new Uint8Array(e);
	        t.__proto__ = f.prototype;
	        return t;
	      }

	      function f(e, t, r) {
	        if (typeof e === "number") {
	          if (typeof t === "string") {
	            throw new Error("If encoding is specified then the first argument must be a string");
	          }

	          return h(e);
	        }

	        return u(e, t, r);
	      }

	      if (typeof Symbol !== "undefined" && Symbol.species && f[Symbol.species] === f) {
	        Object.defineProperty(f, Symbol.species, {
	          value: null,
	          configurable: true,
	          enumerable: false,
	          writable: false
	        });
	      }

	      f.poolSize = 8192;

	      function u(e, t, r) {
	        if (typeof e === "number") {
	          throw new TypeError('"value" argument must not be a number');
	        }

	        if (X(e) || e && X(e.buffer)) {
	          return g(e, t, r);
	        }

	        if (typeof e === "string") {
	          return d(e, t);
	        }

	        return y(e);
	      }

	      f.from = function (e, t, r) {
	        return u(e, t, r);
	      };

	      f.prototype.__proto__ = Uint8Array.prototype;
	      f.__proto__ = Uint8Array;

	      function l(e) {
	        if (typeof e !== "number") {
	          throw new TypeError('"size" argument must be of type number');
	        } else if (e < 0) {
	          throw new RangeError('"size" argument must not be negative');
	        }
	      }

	      function c(e, t, r) {
	        l(e);

	        if (e <= 0) {
	          return s(e);
	        }

	        if (t !== undefined) {
	          return typeof r === "string" ? s(e).fill(t, r) : s(e).fill(t);
	        }

	        return s(e);
	      }

	      f.alloc = function (e, t, r) {
	        return c(e, t, r);
	      };

	      function h(e) {
	        l(e);
	        return s(e < 0 ? 0 : v(e) | 0);
	      }

	      f.allocUnsafe = function (e) {
	        return h(e);
	      };

	      f.allocUnsafeSlow = function (e) {
	        return h(e);
	      };

	      function d(e, t) {
	        if (typeof t !== "string" || t === "") {
	          t = "utf8";
	        }

	        if (!f.isEncoding(t)) {
	          throw new TypeError("Unknown encoding: " + t);
	        }

	        var r = b(e, t) | 0;
	        var n = s(r);
	        var i = n.write(e, t);

	        if (i !== r) {
	          n = n.slice(0, i);
	        }

	        return n;
	      }

	      function p(e) {
	        var t = e.length < 0 ? 0 : v(e.length) | 0;
	        var r = s(t);

	        for (var n = 0; n < t; n += 1) {
	          r[n] = e[n] & 255;
	        }

	        return r;
	      }

	      function g(e, t, r) {
	        if (t < 0 || e.byteLength < t) {
	          throw new RangeError('"offset" is outside of buffer bounds');
	        }

	        if (e.byteLength < t + (r || 0)) {
	          throw new RangeError('"length" is outside of buffer bounds');
	        }

	        var n;

	        if (t === undefined && r === undefined) {
	          n = new Uint8Array(e);
	        } else if (r === undefined) {
	          n = new Uint8Array(e, t);
	        } else {
	          n = new Uint8Array(e, t, r);
	        }

	        n.__proto__ = f.prototype;
	        return n;
	      }

	      function y(e) {
	        if (f.isBuffer(e)) {
	          var t = v(e.length) | 0;
	          var r = s(t);

	          if (r.length === 0) {
	            return r;
	          }

	          e.copy(r, 0, 0, t);
	          return r;
	        }

	        if (e) {
	          if (ArrayBuffer.isView(e) || "length" in e) {
	            if (typeof e.length !== "number" || K(e.length)) {
	              return s(0);
	            }

	            return p(e);
	          }

	          if (e.type === "Buffer" && Array.isArray(e.data)) {
	            return p(e.data);
	          }
	        }

	        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.");
	      }

	      function v(e) {
	        if (e >= o) {
	          throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + o.toString(16) + " bytes");
	        }

	        return e | 0;
	      }

	      function m(e) {
	        if (+e != e) {
	          e = 0;
	        }

	        return f.alloc(+e);
	      }

	      f.isBuffer = function e(t) {
	        return t != null && t._isBuffer === true;
	      };

	      f.compare = function e(t, r) {
	        if (!f.isBuffer(t) || !f.isBuffer(r)) {
	          throw new TypeError("Arguments must be Buffers");
	        }

	        if (t === r) return 0;
	        var n = t.length;
	        var i = r.length;

	        for (var o = 0, a = Math.min(n, i); o < a; ++o) {
	          if (t[o] !== r[o]) {
	            n = t[o];
	            i = r[o];
	            break;
	          }
	        }

	        if (n < i) return -1;
	        if (i < n) return 1;
	        return 0;
	      };

	      f.isEncoding = function e(t) {
	        switch (String(t).toLowerCase()) {
	          case "hex":
	          case "utf8":
	          case "utf-8":
	          case "ascii":
	          case "latin1":
	          case "binary":
	          case "base64":
	          case "ucs2":
	          case "ucs-2":
	          case "utf16le":
	          case "utf-16le":
	            return true;

	          default:
	            return false;
	        }
	      };

	      f.concat = function e(t, r) {
	        if (!Array.isArray(t)) {
	          throw new TypeError('"list" argument must be an Array of Buffers');
	        }

	        if (t.length === 0) {
	          return f.alloc(0);
	        }

	        var n;

	        if (r === undefined) {
	          r = 0;

	          for (n = 0; n < t.length; ++n) {
	            r += t[n].length;
	          }
	        }

	        var i = f.allocUnsafe(r);
	        var o = 0;

	        for (n = 0; n < t.length; ++n) {
	          var a = t[n];

	          if (ArrayBuffer.isView(a)) {
	            a = f.from(a);
	          }

	          if (!f.isBuffer(a)) {
	            throw new TypeError('"list" argument must be an Array of Buffers');
	          }

	          a.copy(i, o);
	          o += a.length;
	        }

	        return i;
	      };

	      function b(e, t) {
	        if (f.isBuffer(e)) {
	          return e.length;
	        }

	        if (ArrayBuffer.isView(e) || X(e)) {
	          return e.byteLength;
	        }

	        if (typeof e !== "string") {
	          e = "" + e;
	        }

	        var r = e.length;
	        if (r === 0) return 0;
	        var n = false;

	        for (;;) {
	          switch (t) {
	            case "ascii":
	            case "latin1":
	            case "binary":
	              return r;

	            case "utf8":
	            case "utf-8":
	            case undefined:
	              return Y(e).length;

	            case "ucs2":
	            case "ucs-2":
	            case "utf16le":
	            case "utf-16le":
	              return r * 2;

	            case "hex":
	              return r >>> 1;

	            case "base64":
	              return $(e).length;

	            default:
	              if (n) return Y(e).length;
	              t = ("" + t).toLowerCase();
	              n = true;
	          }
	        }
	      }

	      f.byteLength = b;

	      function w(e, t, r) {
	        var n = false;

	        if (t === undefined || t < 0) {
	          t = 0;
	        }

	        if (t > this.length) {
	          return "";
	        }

	        if (r === undefined || r > this.length) {
	          r = this.length;
	        }

	        if (r <= 0) {
	          return "";
	        }

	        r >>>= 0;
	        t >>>= 0;

	        if (r <= t) {
	          return "";
	        }

	        if (!e) e = "utf8";

	        while (true) {
	          switch (e) {
	            case "hex":
	              return O(this, t, r);

	            case "utf8":
	            case "utf-8":
	              return M(this, t, r);

	            case "ascii":
	              return j(this, t, r);

	            case "latin1":
	            case "binary":
	              return I(this, t, r);

	            case "base64":
	              return L(this, t, r);

	            case "ucs2":
	            case "ucs-2":
	            case "utf16le":
	            case "utf-16le":
	              return N(this, t, r);

	            default:
	              if (n) throw new TypeError("Unknown encoding: " + e);
	              e = (e + "").toLowerCase();
	              n = true;
	          }
	        }
	      }

	      f.prototype._isBuffer = true;

	      function _(e, t, r) {
	        var n = e[t];
	        e[t] = e[r];
	        e[r] = n;
	      }

	      f.prototype.swap16 = function e() {
	        var t = this.length;

	        if (t % 2 !== 0) {
	          throw new RangeError("Buffer size must be a multiple of 16-bits");
	        }

	        for (var r = 0; r < t; r += 2) {
	          _(this, r, r + 1);
	        }

	        return this;
	      };

	      f.prototype.swap32 = function e() {
	        var t = this.length;

	        if (t % 4 !== 0) {
	          throw new RangeError("Buffer size must be a multiple of 32-bits");
	        }

	        for (var r = 0; r < t; r += 4) {
	          _(this, r, r + 3);

	          _(this, r + 1, r + 2);
	        }

	        return this;
	      };

	      f.prototype.swap64 = function e() {
	        var t = this.length;

	        if (t % 8 !== 0) {
	          throw new RangeError("Buffer size must be a multiple of 64-bits");
	        }

	        for (var r = 0; r < t; r += 8) {
	          _(this, r, r + 7);

	          _(this, r + 1, r + 6);

	          _(this, r + 2, r + 5);

	          _(this, r + 3, r + 4);
	        }

	        return this;
	      };

	      f.prototype.toString = function e() {
	        var t = this.length;
	        if (t === 0) return "";
	        if (arguments.length === 0) return M(this, 0, t);
	        return w.apply(this, arguments);
	      };

	      f.prototype.toLocaleString = f.prototype.toString;

	      f.prototype.equals = function e(t) {
	        if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
	        if (this === t) return true;
	        return f.compare(this, t) === 0;
	      };

	      f.prototype.inspect = function e() {
	        var t = "";
	        var n = r.INSPECT_MAX_BYTES;

	        if (this.length > 0) {
	          t = this.toString("hex", 0, n).match(/.{2}/g).join(" ");
	          if (this.length > n) t += " ... ";
	        }

	        return "<Buffer " + t + ">";
	      };

	      f.prototype.compare = function e(t, r, n, i, o) {
	        if (!f.isBuffer(t)) {
	          throw new TypeError("Argument must be a Buffer");
	        }

	        if (r === undefined) {
	          r = 0;
	        }

	        if (n === undefined) {
	          n = t ? t.length : 0;
	        }

	        if (i === undefined) {
	          i = 0;
	        }

	        if (o === undefined) {
	          o = this.length;
	        }

	        if (r < 0 || n > t.length || i < 0 || o > this.length) {
	          throw new RangeError("out of range index");
	        }

	        if (i >= o && r >= n) {
	          return 0;
	        }

	        if (i >= o) {
	          return -1;
	        }

	        if (r >= n) {
	          return 1;
	        }

	        r >>>= 0;
	        n >>>= 0;
	        i >>>= 0;
	        o >>>= 0;
	        if (this === t) return 0;
	        var a = o - i;
	        var s = n - r;
	        var u = Math.min(a, s);
	        var l = this.slice(i, o);
	        var c = t.slice(r, n);

	        for (var h = 0; h < u; ++h) {
	          if (l[h] !== c[h]) {
	            a = l[h];
	            s = c[h];
	            break;
	          }
	        }

	        if (a < s) return -1;
	        if (s < a) return 1;
	        return 0;
	      };

	      function C(e, t, r, n, i) {
	        if (e.length === 0) return -1;

	        if (typeof r === "string") {
	          n = r;
	          r = 0;
	        } else if (r > 2147483647) {
	          r = 2147483647;
	        } else if (r < -2147483648) {
	          r = -2147483648;
	        }

	        r = +r;

	        if (K(r)) {
	          r = i ? 0 : e.length - 1;
	        }

	        if (r < 0) r = e.length + r;

	        if (r >= e.length) {
	          if (i) return -1;else r = e.length - 1;
	        } else if (r < 0) {
	          if (i) r = 0;else return -1;
	        }

	        if (typeof t === "string") {
	          t = f.from(t, n);
	        }

	        if (f.isBuffer(t)) {
	          if (t.length === 0) {
	            return -1;
	          }

	          return S(e, t, r, n, i);
	        } else if (typeof t === "number") {
	          t = t & 255;

	          if (typeof Uint8Array.prototype.indexOf === "function") {
	            if (i) {
	              return Uint8Array.prototype.indexOf.call(e, t, r);
	            } else {
	              return Uint8Array.prototype.lastIndexOf.call(e, t, r);
	            }
	          }

	          return S(e, [t], r, n, i);
	        }

	        throw new TypeError("val must be string, number or Buffer");
	      }

	      function S(e, t, r, n, i) {
	        var o = 1;
	        var a = e.length;
	        var s = t.length;

	        if (n !== undefined) {
	          n = String(n).toLowerCase();

	          if (n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le") {
	            if (e.length < 2 || t.length < 2) {
	              return -1;
	            }

	            o = 2;
	            a /= 2;
	            s /= 2;
	            r /= 2;
	          }
	        }

	        function f(e, t) {
	          if (o === 1) {
	            return e[t];
	          } else {
	            return e.readUInt16BE(t * o);
	          }
	        }

	        var u;

	        if (i) {
	          var l = -1;

	          for (u = r; u < a; u++) {
	            if (f(e, u) === f(t, l === -1 ? 0 : u - l)) {
	              if (l === -1) l = u;
	              if (u - l + 1 === s) return l * o;
	            } else {
	              if (l !== -1) u -= u - l;
	              l = -1;
	            }
	          }
	        } else {
	          if (r + s > a) r = a - s;

	          for (u = r; u >= 0; u--) {
	            var c = true;

	            for (var h = 0; h < s; h++) {
	              if (f(e, u + h) !== f(t, h)) {
	                c = false;
	                break;
	              }
	            }

	            if (c) return u;
	          }
	        }

	        return -1;
	      }

	      f.prototype.includes = function e(t, r, n) {
	        return this.indexOf(t, r, n) !== -1;
	      };

	      f.prototype.indexOf = function e(t, r, n) {
	        return C(this, t, r, n, true);
	      };

	      f.prototype.lastIndexOf = function e(t, r, n) {
	        return C(this, t, r, n, false);
	      };

	      function E(e, t, r, n) {
	        r = Number(r) || 0;
	        var i = e.length - r;

	        if (!n) {
	          n = i;
	        } else {
	          n = Number(n);

	          if (n > i) {
	            n = i;
	          }
	        }

	        var o = t.length;

	        if (n > o / 2) {
	          n = o / 2;
	        }

	        for (var a = 0; a < n; ++a) {
	          var s = parseInt(t.substr(a * 2, 2), 16);
	          if (K(s)) return a;
	          e[r + a] = s;
	        }

	        return a;
	      }

	      function x(e, t, r, n) {
	        return G(Y(t, e.length - r), e, r, n);
	      }

	      function k(e, t, r, n) {
	        return G(J(t), e, r, n);
	      }

	      function T(e, t, r, n) {
	        return k(e, t, r, n);
	      }

	      function A(e, t, r, n) {
	        return G($(t), e, r, n);
	      }

	      function R(e, t, r, n) {
	        return G(Z(t, e.length - r), e, r, n);
	      }

	      f.prototype.write = function e(t, r, n, i) {
	        if (r === undefined) {
	          i = "utf8";
	          n = this.length;
	          r = 0;
	        } else if (n === undefined && typeof r === "string") {
	          i = r;
	          n = this.length;
	          r = 0;
	        } else if (isFinite(r)) {
	          r = r >>> 0;

	          if (isFinite(n)) {
	            n = n >>> 0;
	            if (i === undefined) i = "utf8";
	          } else {
	            i = n;
	            n = undefined;
	          }
	        } else {
	          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
	        }

	        var o = this.length - r;
	        if (n === undefined || n > o) n = o;

	        if (t.length > 0 && (n < 0 || r < 0) || r > this.length) {
	          throw new RangeError("Attempt to write outside buffer bounds");
	        }

	        if (!i) i = "utf8";
	        var a = false;

	        for (;;) {
	          switch (i) {
	            case "hex":
	              return E(this, t, r, n);

	            case "utf8":
	            case "utf-8":
	              return x(this, t, r, n);

	            case "ascii":
	              return k(this, t, r, n);

	            case "latin1":
	            case "binary":
	              return T(this, t, r, n);

	            case "base64":
	              return A(this, t, r, n);

	            case "ucs2":
	            case "ucs-2":
	            case "utf16le":
	            case "utf-16le":
	              return R(this, t, r, n);

	            default:
	              if (a) throw new TypeError("Unknown encoding: " + i);
	              i = ("" + i).toLowerCase();
	              a = true;
	          }
	        }
	      };

	      f.prototype.toJSON = function e() {
	        return {
	          type: "Buffer",
	          data: Array.prototype.slice.call(this._arr || this, 0)
	        };
	      };

	      function L(e, t, r) {
	        if (t === 0 && r === e.length) {
	          return n.fromByteArray(e);
	        } else {
	          return n.fromByteArray(e.slice(t, r));
	        }
	      }

	      function M(e, t, r) {
	        r = Math.min(e.length, r);
	        var n = [];
	        var i = t;

	        while (i < r) {
	          var o = e[i];
	          var a = null;
	          var s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;

	          if (i + s <= r) {
	            var f, u, l, c;

	            switch (s) {
	              case 1:
	                if (o < 128) {
	                  a = o;
	                }

	                break;

	              case 2:
	                f = e[i + 1];

	                if ((f & 192) === 128) {
	                  c = (o & 31) << 6 | f & 63;

	                  if (c > 127) {
	                    a = c;
	                  }
	                }

	                break;

	              case 3:
	                f = e[i + 1];
	                u = e[i + 2];

	                if ((f & 192) === 128 && (u & 192) === 128) {
	                  c = (o & 15) << 12 | (f & 63) << 6 | u & 63;

	                  if (c > 2047 && (c < 55296 || c > 57343)) {
	                    a = c;
	                  }
	                }

	                break;

	              case 4:
	                f = e[i + 1];
	                u = e[i + 2];
	                l = e[i + 3];

	                if ((f & 192) === 128 && (u & 192) === 128 && (l & 192) === 128) {
	                  c = (o & 15) << 18 | (f & 63) << 12 | (u & 63) << 6 | l & 63;

	                  if (c > 65535 && c < 1114112) {
	                    a = c;
	                  }
	                }

	            }
	          }

	          if (a === null) {
	            a = 65533;
	            s = 1;
	          } else if (a > 65535) {
	            a -= 65536;
	            n.push(a >>> 10 & 1023 | 55296);
	            a = 56320 | a & 1023;
	          }

	          n.push(a);
	          i += s;
	        }

	        return F(n);
	      }

	      var B = 4096;

	      function F(e) {
	        var t = e.length;

	        if (t <= B) {
	          return String.fromCharCode.apply(String, e);
	        }

	        var r = "";
	        var n = 0;

	        while (n < t) {
	          r += String.fromCharCode.apply(String, e.slice(n, n += B));
	        }

	        return r;
	      }

	      function j(e, t, r) {
	        var n = "";
	        r = Math.min(e.length, r);

	        for (var i = t; i < r; ++i) {
	          n += String.fromCharCode(e[i] & 127);
	        }

	        return n;
	      }

	      function I(e, t, r) {
	        var n = "";
	        r = Math.min(e.length, r);

	        for (var i = t; i < r; ++i) {
	          n += String.fromCharCode(e[i]);
	        }

	        return n;
	      }

	      function O(e, t, r) {
	        var n = e.length;
	        if (!t || t < 0) t = 0;
	        if (!r || r < 0 || r > n) r = n;
	        var i = "";

	        for (var o = t; o < r; ++o) {
	          i += H(e[o]);
	        }

	        return i;
	      }

	      function N(e, t, r) {
	        var n = e.slice(t, r);
	        var i = "";

	        for (var o = 0; o < n.length; o += 2) {
	          i += String.fromCharCode(n[o] + n[o + 1] * 256);
	        }

	        return i;
	      }

	      f.prototype.slice = function e(t, r) {
	        var n = this.length;
	        t = ~~t;
	        r = r === undefined ? n : ~~r;

	        if (t < 0) {
	          t += n;
	          if (t < 0) t = 0;
	        } else if (t > n) {
	          t = n;
	        }

	        if (r < 0) {
	          r += n;
	          if (r < 0) r = 0;
	        } else if (r > n) {
	          r = n;
	        }

	        if (r < t) r = t;
	        var i = this.subarray(t, r);
	        i.__proto__ = f.prototype;
	        return i;
	      };

	      function U(e, t, r) {
	        if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
	        if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
	      }

	      f.prototype.readUIntLE = function e(t, r, n) {
	        t = t >>> 0;
	        r = r >>> 0;
	        if (!n) U(t, r, this.length);
	        var i = this[t];
	        var o = 1;
	        var a = 0;

	        while (++a < r && (o *= 256)) {
	          i += this[t + a] * o;
	        }

	        return i;
	      };

	      f.prototype.readUIntBE = function e(t, r, n) {
	        t = t >>> 0;
	        r = r >>> 0;

	        if (!n) {
	          U(t, r, this.length);
	        }

	        var i = this[t + --r];
	        var o = 1;

	        while (r > 0 && (o *= 256)) {
	          i += this[t + --r] * o;
	        }

	        return i;
	      };

	      f.prototype.readUInt8 = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 1, this.length);
	        return this[t];
	      };

	      f.prototype.readUInt16LE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 2, this.length);
	        return this[t] | this[t + 1] << 8;
	      };

	      f.prototype.readUInt16BE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 2, this.length);
	        return this[t] << 8 | this[t + 1];
	      };

	      f.prototype.readUInt32LE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
	      };

	      f.prototype.readUInt32BE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
	      };

	      f.prototype.readIntLE = function e(t, r, n) {
	        t = t >>> 0;
	        r = r >>> 0;
	        if (!n) U(t, r, this.length);
	        var i = this[t];
	        var o = 1;
	        var a = 0;

	        while (++a < r && (o *= 256)) {
	          i += this[t + a] * o;
	        }

	        o *= 128;
	        if (i >= o) i -= Math.pow(2, 8 * r);
	        return i;
	      };

	      f.prototype.readIntBE = function e(t, r, n) {
	        t = t >>> 0;
	        r = r >>> 0;
	        if (!n) U(t, r, this.length);
	        var i = r;
	        var o = 1;
	        var a = this[t + --i];

	        while (i > 0 && (o *= 256)) {
	          a += this[t + --i] * o;
	        }

	        o *= 128;
	        if (a >= o) a -= Math.pow(2, 8 * r);
	        return a;
	      };

	      f.prototype.readInt8 = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 1, this.length);
	        if (!(this[t] & 128)) return this[t];
	        return (255 - this[t] + 1) * -1;
	      };

	      f.prototype.readInt16LE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 2, this.length);
	        var n = this[t] | this[t + 1] << 8;
	        return n & 32768 ? n | 4294901760 : n;
	      };

	      f.prototype.readInt16BE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 2, this.length);
	        var n = this[t + 1] | this[t] << 8;
	        return n & 32768 ? n | 4294901760 : n;
	      };

	      f.prototype.readInt32LE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
	      };

	      f.prototype.readInt32BE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
	      };

	      f.prototype.readFloatLE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return i.read(this, t, true, 23, 4);
	      };

	      f.prototype.readFloatBE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 4, this.length);
	        return i.read(this, t, false, 23, 4);
	      };

	      f.prototype.readDoubleLE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 8, this.length);
	        return i.read(this, t, true, 52, 8);
	      };

	      f.prototype.readDoubleBE = function e(t, r) {
	        t = t >>> 0;
	        if (!r) U(t, 8, this.length);
	        return i.read(this, t, false, 52, 8);
	      };

	      function P(e, t, r, n, i, o) {
	        if (!f.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
	        if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
	        if (r + n > e.length) throw new RangeError("Index out of range");
	      }

	      f.prototype.writeUIntLE = function e(t, r, n, i) {
	        t = +t;
	        r = r >>> 0;
	        n = n >>> 0;

	        if (!i) {
	          var o = Math.pow(2, 8 * n) - 1;
	          P(this, t, r, n, o, 0);
	        }

	        var a = 1;
	        var s = 0;
	        this[r] = t & 255;

	        while (++s < n && (a *= 256)) {
	          this[r + s] = t / a & 255;
	        }

	        return r + n;
	      };

	      f.prototype.writeUIntBE = function e(t, r, n, i) {
	        t = +t;
	        r = r >>> 0;
	        n = n >>> 0;

	        if (!i) {
	          var o = Math.pow(2, 8 * n) - 1;
	          P(this, t, r, n, o, 0);
	        }

	        var a = n - 1;
	        var s = 1;
	        this[r + a] = t & 255;

	        while (--a >= 0 && (s *= 256)) {
	          this[r + a] = t / s & 255;
	        }

	        return r + n;
	      };

	      f.prototype.writeUInt8 = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 1, 255, 0);
	        this[r] = t & 255;
	        return r + 1;
	      };

	      f.prototype.writeUInt16LE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 2, 65535, 0);
	        this[r] = t & 255;
	        this[r + 1] = t >>> 8;
	        return r + 2;
	      };

	      f.prototype.writeUInt16BE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 2, 65535, 0);
	        this[r] = t >>> 8;
	        this[r + 1] = t & 255;
	        return r + 2;
	      };

	      f.prototype.writeUInt32LE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 4, 4294967295, 0);
	        this[r + 3] = t >>> 24;
	        this[r + 2] = t >>> 16;
	        this[r + 1] = t >>> 8;
	        this[r] = t & 255;
	        return r + 4;
	      };

	      f.prototype.writeUInt32BE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 4, 4294967295, 0);
	        this[r] = t >>> 24;
	        this[r + 1] = t >>> 16;
	        this[r + 2] = t >>> 8;
	        this[r + 3] = t & 255;
	        return r + 4;
	      };

	      f.prototype.writeIntLE = function e(t, r, n, i) {
	        t = +t;
	        r = r >>> 0;

	        if (!i) {
	          var o = Math.pow(2, 8 * n - 1);
	          P(this, t, r, n, o - 1, -o);
	        }

	        var a = 0;
	        var s = 1;
	        var f = 0;
	        this[r] = t & 255;

	        while (++a < n && (s *= 256)) {
	          if (t < 0 && f === 0 && this[r + a - 1] !== 0) {
	            f = 1;
	          }

	          this[r + a] = (t / s >> 0) - f & 255;
	        }

	        return r + n;
	      };

	      f.prototype.writeIntBE = function e(t, r, n, i) {
	        t = +t;
	        r = r >>> 0;

	        if (!i) {
	          var o = Math.pow(2, 8 * n - 1);
	          P(this, t, r, n, o - 1, -o);
	        }

	        var a = n - 1;
	        var s = 1;
	        var f = 0;
	        this[r + a] = t & 255;

	        while (--a >= 0 && (s *= 256)) {
	          if (t < 0 && f === 0 && this[r + a + 1] !== 0) {
	            f = 1;
	          }

	          this[r + a] = (t / s >> 0) - f & 255;
	        }

	        return r + n;
	      };

	      f.prototype.writeInt8 = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 1, 127, -128);
	        if (t < 0) t = 255 + t + 1;
	        this[r] = t & 255;
	        return r + 1;
	      };

	      f.prototype.writeInt16LE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 2, 32767, -32768);
	        this[r] = t & 255;
	        this[r + 1] = t >>> 8;
	        return r + 2;
	      };

	      f.prototype.writeInt16BE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 2, 32767, -32768);
	        this[r] = t >>> 8;
	        this[r + 1] = t & 255;
	        return r + 2;
	      };

	      f.prototype.writeInt32LE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 4, 2147483647, -2147483648);
	        this[r] = t & 255;
	        this[r + 1] = t >>> 8;
	        this[r + 2] = t >>> 16;
	        this[r + 3] = t >>> 24;
	        return r + 4;
	      };

	      f.prototype.writeInt32BE = function e(t, r, n) {
	        t = +t;
	        r = r >>> 0;
	        if (!n) P(this, t, r, 4, 2147483647, -2147483648);
	        if (t < 0) t = 4294967295 + t + 1;
	        this[r] = t >>> 24;
	        this[r + 1] = t >>> 16;
	        this[r + 2] = t >>> 8;
	        this[r + 3] = t & 255;
	        return r + 4;
	      };

	      function D(e, t, r, n, i, o) {
	        if (r + n > e.length) throw new RangeError("Index out of range");
	        if (r < 0) throw new RangeError("Index out of range");
	      }

	      function W(e, t, r, n, o) {
	        t = +t;
	        r = r >>> 0;

	        if (!o) {
	          D(e, t, r, 4);
	        }

	        i.write(e, t, r, n, 23, 4);
	        return r + 4;
	      }

	      f.prototype.writeFloatLE = function e(t, r, n) {
	        return W(this, t, r, true, n);
	      };

	      f.prototype.writeFloatBE = function e(t, r, n) {
	        return W(this, t, r, false, n);
	      };

	      function q(e, t, r, n, o) {
	        t = +t;
	        r = r >>> 0;

	        if (!o) {
	          D(e, t, r, 8);
	        }

	        i.write(e, t, r, n, 52, 8);
	        return r + 8;
	      }

	      f.prototype.writeDoubleLE = function e(t, r, n) {
	        return q(this, t, r, true, n);
	      };

	      f.prototype.writeDoubleBE = function e(t, r, n) {
	        return q(this, t, r, false, n);
	      };

	      f.prototype.copy = function e(t, r, n, i) {
	        if (!f.isBuffer(t)) throw new TypeError("argument should be a Buffer");
	        if (!n) n = 0;
	        if (!i && i !== 0) i = this.length;
	        if (r >= t.length) r = t.length;
	        if (!r) r = 0;
	        if (i > 0 && i < n) i = n;
	        if (i === n) return 0;
	        if (t.length === 0 || this.length === 0) return 0;

	        if (r < 0) {
	          throw new RangeError("targetStart out of bounds");
	        }

	        if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
	        if (i < 0) throw new RangeError("sourceEnd out of bounds");
	        if (i > this.length) i = this.length;

	        if (t.length - r < i - n) {
	          i = t.length - r + n;
	        }

	        var o = i - n;

	        if (this === t && typeof Uint8Array.prototype.copyWithin === "function") {
	          this.copyWithin(r, n, i);
	        } else if (this === t && n < r && r < i) {
	          for (var a = o - 1; a >= 0; --a) {
	            t[a + r] = this[a + n];
	          }
	        } else {
	          Uint8Array.prototype.set.call(t, this.subarray(n, i), r);
	        }

	        return o;
	      };

	      f.prototype.fill = function e(t, r, n, i) {
	        if (typeof t === "string") {
	          if (typeof r === "string") {
	            i = r;
	            r = 0;
	            n = this.length;
	          } else if (typeof n === "string") {
	            i = n;
	            n = this.length;
	          }

	          if (i !== undefined && typeof i !== "string") {
	            throw new TypeError("encoding must be a string");
	          }

	          if (typeof i === "string" && !f.isEncoding(i)) {
	            throw new TypeError("Unknown encoding: " + i);
	          }

	          if (t.length === 1) {
	            var o = t.charCodeAt(0);

	            if (i === "utf8" && o < 128 || i === "latin1") {
	              t = o;
	            }
	          }
	        } else if (typeof t === "number") {
	          t = t & 255;
	        }

	        if (r < 0 || this.length < r || this.length < n) {
	          throw new RangeError("Out of range index");
	        }

	        if (n <= r) {
	          return this;
	        }

	        r = r >>> 0;
	        n = n === undefined ? this.length : n >>> 0;
	        if (!t) t = 0;
	        var a;

	        if (typeof t === "number") {
	          for (a = r; a < n; ++a) {
	            this[a] = t;
	          }
	        } else {
	          var s = f.isBuffer(t) ? t : new f(t, i);
	          var u = s.length;

	          if (u === 0) {
	            throw new TypeError('The value "' + t + '" is invalid for argument "value"');
	          }

	          for (a = 0; a < n - r; ++a) {
	            this[a + r] = s[a % u];
	          }
	        }

	        return this;
	      };

	      var z = /[^+/0-9A-Za-z-_]/g;

	      function V(e) {
	        e = e.split("=")[0];
	        e = e.trim().replace(z, "");
	        if (e.length < 2) return "";

	        while (e.length % 4 !== 0) {
	          e = e + "=";
	        }

	        return e;
	      }

	      function H(e) {
	        if (e < 16) return "0" + e.toString(16);
	        return e.toString(16);
	      }

	      function Y(e, t) {
	        t = t || Infinity;
	        var r;
	        var n = e.length;
	        var i = null;
	        var o = [];

	        for (var a = 0; a < n; ++a) {
	          r = e.charCodeAt(a);

	          if (r > 55295 && r < 57344) {
	            if (!i) {
	              if (r > 56319) {
	                if ((t -= 3) > -1) o.push(239, 191, 189);
	                continue;
	              } else if (a + 1 === n) {
	                if ((t -= 3) > -1) o.push(239, 191, 189);
	                continue;
	              }

	              i = r;
	              continue;
	            }

	            if (r < 56320) {
	              if ((t -= 3) > -1) o.push(239, 191, 189);
	              i = r;
	              continue;
	            }

	            r = (i - 55296 << 10 | r - 56320) + 65536;
	          } else if (i) {
	            if ((t -= 3) > -1) o.push(239, 191, 189);
	          }

	          i = null;

	          if (r < 128) {
	            if ((t -= 1) < 0) break;
	            o.push(r);
	          } else if (r < 2048) {
	            if ((t -= 2) < 0) break;
	            o.push(r >> 6 | 192, r & 63 | 128);
	          } else if (r < 65536) {
	            if ((t -= 3) < 0) break;
	            o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
	          } else if (r < 1114112) {
	            if ((t -= 4) < 0) break;
	            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
	          } else {
	            throw new Error("Invalid code point");
	          }
	        }

	        return o;
	      }

	      function J(e) {
	        var t = [];

	        for (var r = 0; r < e.length; ++r) {
	          t.push(e.charCodeAt(r) & 255);
	        }

	        return t;
	      }

	      function Z(e, t) {
	        var r, n, i;
	        var o = [];

	        for (var a = 0; a < e.length; ++a) {
	          if ((t -= 2) < 0) break;
	          r = e.charCodeAt(a);
	          n = r >> 8;
	          i = r % 256;
	          o.push(i);
	          o.push(n);
	        }

	        return o;
	      }

	      function $(e) {
	        return n.toByteArray(V(e));
	      }

	      function G(e, t, r, n) {
	        for (var i = 0; i < n; ++i) {
	          if (i + r >= t.length || i >= e.length) break;
	          t[i + r] = e[i];
	        }

	        return i;
	      }

	      function X(e) {
	        return e instanceof ArrayBuffer || e != null && e.constructor != null && e.constructor.name === "ArrayBuffer" && typeof e.byteLength === "number";
	      }

	      function K(e) {
	        return e !== e;
	      }
	    }, {
	      "base64-js": 1,
	      ieee754: 9
	    }],
	    4: [function (e, t, r) {
	      (function (e) {
	        function t(e) {
	          if (Array.isArray) {
	            return Array.isArray(e);
	          }

	          return y(e) === "[object Array]";
	        }

	        r.isArray = t;

	        function n(e) {
	          return typeof e === "boolean";
	        }

	        r.isBoolean = n;

	        function i(e) {
	          return e === null;
	        }

	        r.isNull = i;

	        function o(e) {
	          return e == null;
	        }

	        r.isNullOrUndefined = o;

	        function a(e) {
	          return typeof e === "number";
	        }

	        r.isNumber = a;

	        function s(e) {
	          return typeof e === "string";
	        }

	        r.isString = s;

	        function f(e) {
	          return typeof e === "symbol";
	        }

	        r.isSymbol = f;

	        function u(e) {
	          return e === void 0;
	        }

	        r.isUndefined = u;

	        function l(e) {
	          return y(e) === "[object RegExp]";
	        }

	        r.isRegExp = l;

	        function c(e) {
	          return typeof e === "object" && e !== null;
	        }

	        r.isObject = c;

	        function h(e) {
	          return y(e) === "[object Date]";
	        }

	        r.isDate = h;

	        function d(e) {
	          return y(e) === "[object Error]" || e instanceof Error;
	        }

	        r.isError = d;

	        function p(e) {
	          return typeof e === "function";
	        }

	        r.isFunction = p;

	        function g(e) {
	          return e === null || typeof e === "boolean" || typeof e === "number" || typeof e === "string" || typeof e === "symbol" || typeof e === "undefined";
	        }

	        r.isPrimitive = g;
	        r.isBuffer = e.isBuffer;

	        function y(e) {
	          return Object.prototype.toString.call(e);
	        }
	      }).call(this, {
	        isBuffer: e("../../is-buffer/index.js")
	      });
	    }, {
	      "../../is-buffer/index.js": 11
	    }],
	    5: [function (e, t, r) {
	      (function (n) {
	        r = t.exports = e("./debug");
	        r.log = a;
	        r.formatArgs = o;
	        r.save = s;
	        r.load = f;
	        r.useColors = i;
	        r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : u();
	        r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];

	        function i() {
	          if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
	            return true;
	          }

	          if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	            return false;
	          }

	          return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	        }

	        r.formatters.j = function (e) {
	          try {
	            return JSON.stringify(e);
	          } catch (e) {
	            return "[UnexpectedJSONParseError]: " + e.message;
	          }
	        };

	        function o(e) {
	          var t = this.useColors;
	          e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff);
	          if (!t) return;
	          var n = "color: " + this.color;
	          e.splice(1, 0, n, "color: inherit");
	          var i = 0;
	          var o = 0;
	          e[0].replace(/%[a-zA-Z%]/g, function (e) {
	            if ("%%" === e) return;
	            i++;

	            if ("%c" === e) {
	              o = i;
	            }
	          });
	          e.splice(o, 0, n);
	        }

	        function a() {
	          return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
	        }

	        function s(e) {
	          try {
	            if (null == e) {
	              r.storage.removeItem("debug");
	            } else {
	              r.storage.debug = e;
	            }
	          } catch (e) {}
	        }

	        function f() {
	          var e;

	          try {
	            e = r.storage.debug;
	          } catch (e) {}

	          if (!e && typeof n !== "undefined" && "env" in n) {
	            e = n.env.DEBUG;
	          }

	          return e;
	        }

	        r.enable(f());

	        function u() {
	          try {
	            return window.localStorage;
	          } catch (e) {}
	        }
	      }).call(this, e("_process"));
	    }, {
	      "./debug": 6,
	      _process: 15
	    }],
	    6: [function (e, t, r) {
	      r = t.exports = i.debug = i["default"] = i;
	      r.coerce = u;
	      r.disable = s;
	      r.enable = a;
	      r.enabled = f;
	      r.humanize = e("ms");
	      r.instances = [];
	      r.names = [];
	      r.skips = [];
	      r.formatters = {};

	      function n(e) {
	        var t = 0,
	            n;

	        for (n in e) {
	          t = (t << 5) - t + e.charCodeAt(n);
	          t |= 0;
	        }

	        return r.colors[Math.abs(t) % r.colors.length];
	      }

	      function i(e) {
	        var t;

	        function i() {
	          if (!i.enabled) return;
	          var e = i;
	          var n = +new Date();
	          var o = n - (t || n);
	          e.diff = o;
	          e.prev = t;
	          e.curr = n;
	          t = n;
	          var a = new Array(arguments.length);

	          for (var s = 0; s < a.length; s++) {
	            a[s] = arguments[s];
	          }

	          a[0] = r.coerce(a[0]);

	          if ("string" !== typeof a[0]) {
	            a.unshift("%O");
	          }

	          var f = 0;
	          a[0] = a[0].replace(/%([a-zA-Z%])/g, function (t, n) {
	            if (t === "%%") return t;
	            f++;
	            var i = r.formatters[n];

	            if ("function" === typeof i) {
	              var o = a[f];
	              t = i.call(e, o);
	              a.splice(f, 1);
	              f--;
	            }

	            return t;
	          });
	          r.formatArgs.call(e, a);
	          var u = i.log || r.log || console.log.bind(console);
	          u.apply(e, a);
	        }

	        i.namespace = e;
	        i.enabled = r.enabled(e);
	        i.useColors = r.useColors();
	        i.color = n(e);
	        i.destroy = o;

	        if ("function" === typeof r.init) {
	          r.init(i);
	        }

	        r.instances.push(i);
	        return i;
	      }

	      function o() {
	        var e = r.instances.indexOf(this);

	        if (e !== -1) {
	          r.instances.splice(e, 1);
	          return true;
	        } else {
	          return false;
	        }
	      }

	      function a(e) {
	        r.save(e);
	        r.names = [];
	        r.skips = [];
	        var t;
	        var n = (typeof e === "string" ? e : "").split(/[\s,]+/);
	        var i = n.length;

	        for (t = 0; t < i; t++) {
	          if (!n[t]) continue;
	          e = n[t].replace(/\*/g, ".*?");

	          if (e[0] === "-") {
	            r.skips.push(new RegExp("^" + e.substr(1) + "$"));
	          } else {
	            r.names.push(new RegExp("^" + e + "$"));
	          }
	        }

	        for (t = 0; t < r.instances.length; t++) {
	          var o = r.instances[t];
	          o.enabled = r.enabled(o.namespace);
	        }
	      }

	      function s() {
	        r.enable("");
	      }

	      function f(e) {
	        if (e[e.length - 1] === "*") {
	          return true;
	        }

	        var t, n;

	        for (t = 0, n = r.skips.length; t < n; t++) {
	          if (r.skips[t].test(e)) {
	            return false;
	          }
	        }

	        for (t = 0, n = r.names.length; t < n; t++) {
	          if (r.names[t].test(e)) {
	            return true;
	          }
	        }

	        return false;
	      }

	      function u(e) {
	        if (e instanceof Error) return e.stack || e.message;
	        return e;
	      }
	    }, {
	      ms: 13
	    }],
	    7: [function (e, t, r) {
	      var n = Object.create || S;
	      var i = Object.keys || E;
	      var o = Function.prototype.bind || x;

	      function a() {
	        if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {
	          this._events = n(null);
	          this._eventsCount = 0;
	        }

	        this._maxListeners = this._maxListeners || undefined;
	      }

	      t.exports = a;
	      a.EventEmitter = a;
	      a.prototype._events = undefined;
	      a.prototype._maxListeners = undefined;
	      var s = 10;
	      var f;

	      try {
	        var u = {};
	        if (Object.defineProperty) Object.defineProperty(u, "x", {
	          value: 0
	        });
	        f = u.x === 0;
	      } catch (e) {
	        f = false;
	      }

	      if (f) {
	        Object.defineProperty(a, "defaultMaxListeners", {
	          enumerable: true,
	          get: function () {
	            return s;
	          },
	          set: function (e) {
	            if (typeof e !== "number" || e < 0 || e !== e) throw new TypeError('"defaultMaxListeners" must be a positive number');
	            s = e;
	          }
	        });
	      } else {
	        a.defaultMaxListeners = s;
	      }

	      a.prototype.setMaxListeners = function e(t) {
	        if (typeof t !== "number" || t < 0 || isNaN(t)) throw new TypeError('"n" argument must be a positive number');
	        this._maxListeners = t;
	        return this;
	      };

	      function l(e) {
	        if (e._maxListeners === undefined) return a.defaultMaxListeners;
	        return e._maxListeners;
	      }

	      a.prototype.getMaxListeners = function e() {
	        return l(this);
	      };

	      function c(e, t, r) {
	        if (t) e.call(r);else {
	          var n = e.length;

	          var i = _(e, n);

	          for (var o = 0; o < n; ++o) i[o].call(r);
	        }
	      }

	      function h(e, t, r, n) {
	        if (t) e.call(r, n);else {
	          var i = e.length;

	          var o = _(e, i);

	          for (var a = 0; a < i; ++a) o[a].call(r, n);
	        }
	      }

	      function d(e, t, r, n, i) {
	        if (t) e.call(r, n, i);else {
	          var o = e.length;

	          var a = _(e, o);

	          for (var s = 0; s < o; ++s) a[s].call(r, n, i);
	        }
	      }

	      function p(e, t, r, n, i, o) {
	        if (t) e.call(r, n, i, o);else {
	          var a = e.length;

	          var s = _(e, a);

	          for (var f = 0; f < a; ++f) s[f].call(r, n, i, o);
	        }
	      }

	      function g(e, t, r, n) {
	        if (t) e.apply(r, n);else {
	          var i = e.length;

	          var o = _(e, i);

	          for (var a = 0; a < i; ++a) o[a].apply(r, n);
	        }
	      }

	      a.prototype.emit = function e(t) {
	        var r, n, i, o, a, s;
	        var f = t === "error";
	        s = this._events;
	        if (s) f = f && s.error == null;else if (!f) return false;

	        if (f) {
	          if (arguments.length > 1) r = arguments[1];

	          if (r instanceof Error) {
	            throw r;
	          } else {
	            var u = new Error('Unhandled "error" event. (' + r + ")");
	            u.context = r;
	            throw u;
	          }
	        }

	        n = s[t];
	        if (!n) return false;
	        var l = typeof n === "function";
	        i = arguments.length;

	        switch (i) {
	          case 1:
	            c(n, l, this);
	            break;

	          case 2:
	            h(n, l, this, arguments[1]);
	            break;

	          case 3:
	            d(n, l, this, arguments[1], arguments[2]);
	            break;

	          case 4:
	            p(n, l, this, arguments[1], arguments[2], arguments[3]);
	            break;

	          default:
	            o = new Array(i - 1);

	            for (a = 1; a < i; a++) o[a - 1] = arguments[a];

	            g(n, l, this, o);
	        }

	        return true;
	      };

	      function y(e, t, r, i) {
	        var o;
	        var a;
	        var s;
	        if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
	        a = e._events;

	        if (!a) {
	          a = e._events = n(null);
	          e._eventsCount = 0;
	        } else {
	          if (a.newListener) {
	            e.emit("newListener", t, r.listener ? r.listener : r);
	            a = e._events;
	          }

	          s = a[t];
	        }

	        if (!s) {
	          s = a[t] = r;
	          ++e._eventsCount;
	        } else {
	          if (typeof s === "function") {
	            s = a[t] = i ? [r, s] : [s, r];
	          } else {
	            if (i) {
	              s.unshift(r);
	            } else {
	              s.push(r);
	            }
	          }

	          if (!s.warned) {
	            o = l(e);

	            if (o && o > 0 && s.length > o) {
	              s.warned = true;
	              var f = new Error("Possible EventEmitter memory leak detected. " + s.length + ' "' + String(t) + '" listeners ' + "added. Use emitter.setMaxListeners() to " + "increase limit.");
	              f.name = "MaxListenersExceededWarning";
	              f.emitter = e;
	              f.type = t;
	              f.count = s.length;

	              if (typeof console === "object" && console.warn) {
	                console.warn("%s: %s", f.name, f.message);
	              }
	            }
	          }
	        }

	        return e;
	      }

	      a.prototype.addListener = function e(t, r) {
	        return y(this, t, r, false);
	      };

	      a.prototype.on = a.prototype.addListener;

	      a.prototype.prependListener = function e(t, r) {
	        return y(this, t, r, true);
	      };

	      function v() {
	        if (!this.fired) {
	          this.target.removeListener(this.type, this.wrapFn);
	          this.fired = true;

	          switch (arguments.length) {
	            case 0:
	              return this.listener.call(this.target);

	            case 1:
	              return this.listener.call(this.target, arguments[0]);

	            case 2:
	              return this.listener.call(this.target, arguments[0], arguments[1]);

	            case 3:
	              return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);

	            default:
	              var e = new Array(arguments.length);

	              for (var t = 0; t < e.length; ++t) e[t] = arguments[t];

	              this.listener.apply(this.target, e);
	          }
	        }
	      }

	      function m(e, t, r) {
	        var n = {
	          fired: false,
	          wrapFn: undefined,
	          target: e,
	          type: t,
	          listener: r
	        };
	        var i = o.call(v, n);
	        i.listener = r;
	        n.wrapFn = i;
	        return i;
	      }

	      a.prototype.once = function e(t, r) {
	        if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
	        this.on(t, m(this, t, r));
	        return this;
	      };

	      a.prototype.prependOnceListener = function e(t, r) {
	        if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
	        this.prependListener(t, m(this, t, r));
	        return this;
	      };

	      a.prototype.removeListener = function e(t, r) {
	        var i, o, a, s, f;
	        if (typeof r !== "function") throw new TypeError('"listener" argument must be a function');
	        o = this._events;
	        if (!o) return this;
	        i = o[t];
	        if (!i) return this;

	        if (i === r || i.listener === r) {
	          if (--this._eventsCount === 0) this._events = n(null);else {
	            delete o[t];
	            if (o.removeListener) this.emit("removeListener", t, i.listener || r);
	          }
	        } else if (typeof i !== "function") {
	          a = -1;

	          for (s = i.length - 1; s >= 0; s--) {
	            if (i[s] === r || i[s].listener === r) {
	              f = i[s].listener;
	              a = s;
	              break;
	            }
	          }

	          if (a < 0) return this;
	          if (a === 0) i.shift();else w(i, a);
	          if (i.length === 1) o[t] = i[0];
	          if (o.removeListener) this.emit("removeListener", t, f || r);
	        }

	        return this;
	      };

	      a.prototype.removeAllListeners = function e(t) {
	        var r, o, a;
	        o = this._events;
	        if (!o) return this;

	        if (!o.removeListener) {
	          if (arguments.length === 0) {
	            this._events = n(null);
	            this._eventsCount = 0;
	          } else if (o[t]) {
	            if (--this._eventsCount === 0) this._events = n(null);else delete o[t];
	          }

	          return this;
	        }

	        if (arguments.length === 0) {
	          var s = i(o);
	          var f;

	          for (a = 0; a < s.length; ++a) {
	            f = s[a];
	            if (f === "removeListener") continue;
	            this.removeAllListeners(f);
	          }

	          this.removeAllListeners("removeListener");
	          this._events = n(null);
	          this._eventsCount = 0;
	          return this;
	        }

	        r = o[t];

	        if (typeof r === "function") {
	          this.removeListener(t, r);
	        } else if (r) {
	          for (a = r.length - 1; a >= 0; a--) {
	            this.removeListener(t, r[a]);
	          }
	        }

	        return this;
	      };

	      a.prototype.listeners = function e(t) {
	        var r;
	        var n;
	        var i = this._events;
	        if (!i) n = [];else {
	          r = i[t];
	          if (!r) n = [];else if (typeof r === "function") n = [r.listener || r];else n = C(r);
	        }
	        return n;
	      };

	      a.listenerCount = function (e, t) {
	        if (typeof e.listenerCount === "function") {
	          return e.listenerCount(t);
	        } else {
	          return b.call(e, t);
	        }
	      };

	      a.prototype.listenerCount = b;

	      function b(e) {
	        var t = this._events;

	        if (t) {
	          var r = t[e];

	          if (typeof r === "function") {
	            return 1;
	          } else if (r) {
	            return r.length;
	          }
	        }

	        return 0;
	      }

	      a.prototype.eventNames = function e() {
	        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	      };

	      function w(e, t) {
	        for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];

	        e.pop();
	      }

	      function _(e, t) {
	        var r = new Array(t);

	        for (var n = 0; n < t; ++n) r[n] = e[n];

	        return r;
	      }

	      function C(e) {
	        var t = new Array(e.length);

	        for (var r = 0; r < t.length; ++r) {
	          t[r] = e[r].listener || e[r];
	        }

	        return t;
	      }

	      function S(e) {
	        var t = function () {};

	        t.prototype = e;
	        return new t();
	      }

	      function E(e) {

	        for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) ;

	        return r;
	      }

	      function x(e) {
	        var t = this;
	        return function () {
	          return t.apply(e, arguments);
	        };
	      }
	    }, {}],
	    8: [function (e, t, r) {
	      t.exports = function e() {
	        if (typeof window === "undefined") return null;
	        var t = {
	          RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
	          RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
	          RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
	        };
	        if (!t.RTCPeerConnection) return null;
	        return t;
	      };
	    }, {}],
	    9: [function (e, t, r) {
	      r.read = function (e, t, r, n, i) {
	        var o, a;
	        var s = i * 8 - n - 1;
	        var f = (1 << s) - 1;
	        var u = f >> 1;
	        var l = -7;
	        var c = r ? i - 1 : 0;
	        var h = r ? -1 : 1;
	        var d = e[t + c];
	        c += h;
	        o = d & (1 << -l) - 1;
	        d >>= -l;
	        l += s;

	        for (; l > 0; o = o * 256 + e[t + c], c += h, l -= 8) {}

	        a = o & (1 << -l) - 1;
	        o >>= -l;
	        l += n;

	        for (; l > 0; a = a * 256 + e[t + c], c += h, l -= 8) {}

	        if (o === 0) {
	          o = 1 - u;
	        } else if (o === f) {
	          return a ? NaN : (d ? -1 : 1) * Infinity;
	        } else {
	          a = a + Math.pow(2, n);
	          o = o - u;
	        }

	        return (d ? -1 : 1) * a * Math.pow(2, o - n);
	      };

	      r.write = function (e, t, r, n, i, o) {
	        var a, s, f;
	        var u = o * 8 - i - 1;
	        var l = (1 << u) - 1;
	        var c = l >> 1;
	        var h = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	        var d = n ? 0 : o - 1;
	        var p = n ? 1 : -1;
	        var g = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
	        t = Math.abs(t);

	        if (isNaN(t) || t === Infinity) {
	          s = isNaN(t) ? 1 : 0;
	          a = l;
	        } else {
	          a = Math.floor(Math.log(t) / Math.LN2);

	          if (t * (f = Math.pow(2, -a)) < 1) {
	            a--;
	            f *= 2;
	          }

	          if (a + c >= 1) {
	            t += h / f;
	          } else {
	            t += h * Math.pow(2, 1 - c);
	          }

	          if (t * f >= 2) {
	            a++;
	            f /= 2;
	          }

	          if (a + c >= l) {
	            s = 0;
	            a = l;
	          } else if (a + c >= 1) {
	            s = (t * f - 1) * Math.pow(2, i);
	            a = a + c;
	          } else {
	            s = t * Math.pow(2, c - 1) * Math.pow(2, i);
	            a = 0;
	          }
	        }

	        for (; i >= 8; e[r + d] = s & 255, d += p, s /= 256, i -= 8) {}

	        a = a << i | s;
	        u += i;

	        for (; u > 0; e[r + d] = a & 255, d += p, a /= 256, u -= 8) {}

	        e[r + d - p] |= g * 128;
	      };
	    }, {}],
	    10: [function (e, t, r) {
	      if (typeof Object.create === "function") {
	        t.exports = function e(t, r) {
	          t.super_ = r;
	          t.prototype = Object.create(r.prototype, {
	            constructor: {
	              value: t,
	              enumerable: false,
	              writable: true,
	              configurable: true
	            }
	          });
	        };
	      } else {
	        t.exports = function e(t, r) {
	          t.super_ = r;

	          var n = function () {};

	          n.prototype = r.prototype;
	          t.prototype = new n();
	          t.prototype.constructor = t;
	        };
	      }
	    }, {}],
	    11: [function (e, t, r) {
	      t.exports = function (e) {
	        return e != null && (n(e) || i(e) || !!e._isBuffer);
	      };

	      function n(e) {
	        return !!e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e);
	      }

	      function i(e) {
	        return typeof e.readFloatLE === "function" && typeof e.slice === "function" && n(e.slice(0, 0));
	      }
	    }, {}],
	    12: [function (e, t, r) {
	      var n = {}.toString;

	      t.exports = Array.isArray || function (e) {
	        return n.call(e) == "[object Array]";
	      };
	    }, {}],
	    13: [function (e, t, r) {
	      var n = 1e3;
	      var i = n * 60;
	      var o = i * 60;
	      var a = o * 24;
	      var s = a * 365.25;

	      t.exports = function (e, t) {
	        t = t || {};
	        var r = typeof e;

	        if (r === "string" && e.length > 0) {
	          return f(e);
	        } else if (r === "number" && isNaN(e) === false) {
	          return t.long ? l(e) : u(e);
	        }

	        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
	      };

	      function f(e) {
	        e = String(e);

	        if (e.length > 100) {
	          return;
	        }

	        var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);

	        if (!t) {
	          return;
	        }

	        var r = parseFloat(t[1]);
	        var f = (t[2] || "ms").toLowerCase();

	        switch (f) {
	          case "years":
	          case "year":
	          case "yrs":
	          case "yr":
	          case "y":
	            return r * s;

	          case "days":
	          case "day":
	          case "d":
	            return r * a;

	          case "hours":
	          case "hour":
	          case "hrs":
	          case "hr":
	          case "h":
	            return r * o;

	          case "minutes":
	          case "minute":
	          case "mins":
	          case "min":
	          case "m":
	            return r * i;

	          case "seconds":
	          case "second":
	          case "secs":
	          case "sec":
	          case "s":
	            return r * n;

	          case "milliseconds":
	          case "millisecond":
	          case "msecs":
	          case "msec":
	          case "ms":
	            return r;

	          default:
	            return undefined;
	        }
	      }

	      function u(e) {
	        if (e >= a) {
	          return Math.round(e / a) + "d";
	        }

	        if (e >= o) {
	          return Math.round(e / o) + "h";
	        }

	        if (e >= i) {
	          return Math.round(e / i) + "m";
	        }

	        if (e >= n) {
	          return Math.round(e / n) + "s";
	        }

	        return e + "ms";
	      }

	      function l(e) {
	        return c(e, a, "day") || c(e, o, "hour") || c(e, i, "minute") || c(e, n, "second") || e + " ms";
	      }

	      function c(e, t, r) {
	        if (e < t) {
	          return;
	        }

	        if (e < t * 1.5) {
	          return Math.floor(e / t) + " " + r;
	        }

	        return Math.ceil(e / t) + " " + r + "s";
	      }
	    }, {}],
	    14: [function (e, t, r) {
	      (function (e) {

	        if (!e.version || e.version.indexOf("v0.") === 0 || e.version.indexOf("v1.") === 0 && e.version.indexOf("v1.8.") !== 0) {
	          t.exports = {
	            nextTick: r
	          };
	        } else {
	          t.exports = e;
	        }

	        function r(t, r, n, i) {
	          if (typeof t !== "function") {
	            throw new TypeError('"callback" argument must be a function');
	          }

	          var o = arguments.length;
	          var a, s;

	          switch (o) {
	            case 0:
	            case 1:
	              return e.nextTick(t);

	            case 2:
	              return e.nextTick(function e() {
	                t.call(null, r);
	              });

	            case 3:
	              return e.nextTick(function e() {
	                t.call(null, r, n);
	              });

	            case 4:
	              return e.nextTick(function e() {
	                t.call(null, r, n, i);
	              });

	            default:
	              a = new Array(o - 1);
	              s = 0;

	              while (s < a.length) {
	                a[s++] = arguments[s];
	              }

	              return e.nextTick(function e() {
	                t.apply(null, a);
	              });
	          }
	        }
	      }).call(this, e("_process"));
	    }, {
	      _process: 15
	    }],
	    15: [function (e, t, r) {
	      var n = t.exports = {};
	      var i;
	      var o;

	      function a() {
	        throw new Error("setTimeout has not been defined");
	      }

	      function s() {
	        throw new Error("clearTimeout has not been defined");
	      }

	      (function () {
	        try {
	          if (typeof setTimeout === "function") {
	            i = setTimeout;
	          } else {
	            i = a;
	          }
	        } catch (e) {
	          i = a;
	        }

	        try {
	          if (typeof clearTimeout === "function") {
	            o = clearTimeout;
	          } else {
	            o = s;
	          }
	        } catch (e) {
	          o = s;
	        }
	      })();

	      function f(e) {
	        if (i === setTimeout) {
	          return setTimeout(e, 0);
	        }

	        if ((i === a || !i) && setTimeout) {
	          i = setTimeout;
	          return setTimeout(e, 0);
	        }

	        try {
	          return i(e, 0);
	        } catch (t) {
	          try {
	            return i.call(null, e, 0);
	          } catch (t) {
	            return i.call(this, e, 0);
	          }
	        }
	      }

	      function u(e) {
	        if (o === clearTimeout) {
	          return clearTimeout(e);
	        }

	        if ((o === s || !o) && clearTimeout) {
	          o = clearTimeout;
	          return clearTimeout(e);
	        }

	        try {
	          return o(e);
	        } catch (t) {
	          try {
	            return o.call(null, e);
	          } catch (t) {
	            return o.call(this, e);
	          }
	        }
	      }

	      var l = [];
	      var c = false;
	      var h;
	      var d = -1;

	      function p() {
	        if (!c || !h) {
	          return;
	        }

	        c = false;

	        if (h.length) {
	          l = h.concat(l);
	        } else {
	          d = -1;
	        }

	        if (l.length) {
	          g();
	        }
	      }

	      function g() {
	        if (c) {
	          return;
	        }

	        var e = f(p);
	        c = true;
	        var t = l.length;

	        while (t) {
	          h = l;
	          l = [];

	          while (++d < t) {
	            if (h) {
	              h[d].run();
	            }
	          }

	          d = -1;
	          t = l.length;
	        }

	        h = null;
	        c = false;
	        u(e);
	      }

	      n.nextTick = function (e) {
	        var t = new Array(arguments.length - 1);

	        if (arguments.length > 1) {
	          for (var r = 1; r < arguments.length; r++) {
	            t[r - 1] = arguments[r];
	          }
	        }

	        l.push(new y(e, t));

	        if (l.length === 1 && !c) {
	          f(g);
	        }
	      };

	      function y(e, t) {
	        this.fun = e;
	        this.array = t;
	      }

	      y.prototype.run = function () {
	        this.fun.apply(null, this.array);
	      };

	      n.title = "browser";
	      n.browser = true;
	      n.env = {};
	      n.argv = [];
	      n.version = "";
	      n.versions = {};

	      function v() {}

	      n.on = v;
	      n.addListener = v;
	      n.once = v;
	      n.off = v;
	      n.removeListener = v;
	      n.removeAllListeners = v;
	      n.emit = v;
	      n.prependListener = v;
	      n.prependOnceListener = v;

	      n.listeners = function (e) {
	        return [];
	      };

	      n.binding = function (e) {
	        throw new Error("process.binding is not supported");
	      };

	      n.cwd = function () {
	        return "/";
	      };

	      n.chdir = function (e) {
	        throw new Error("process.chdir is not supported");
	      };

	      n.umask = function () {
	        return 0;
	      };
	    }, {}],
	    16: [function (e, t, r) {
	      (function (r, n) {

	        function i() {
	          throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
	        }

	        var o = e("safe-buffer").Buffer;
	        var a = n.crypto || n.msCrypto;

	        if (a && a.getRandomValues) {
	          t.exports = s;
	        } else {
	          t.exports = i;
	        }

	        function s(e, t) {
	          if (e > 65536) throw new Error("requested too many random bytes");
	          var i = new n.Uint8Array(e);

	          if (e > 0) {
	            a.getRandomValues(i);
	          }

	          var s = o.from(i.buffer);

	          if (typeof t === "function") {
	            return r.nextTick(function () {
	              t(null, s);
	            });
	          }

	          return s;
	        }
	      }).call(this, e("_process"), typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	    }, {
	      _process: 15,
	      "safe-buffer": 26
	    }],
	    17: [function (e, t, r) {

	      var n = e("process-nextick-args").nextTick;

	      var i = Object.keys || function (e) {
	        var t = [];

	        for (var r in e) {
	          t.push(r);
	        }

	        return t;
	      };

	      t.exports = c;
	      var o = e("core-util-is");
	      o.inherits = e("inherits");
	      var a = e("./_stream_readable");
	      var s = e("./_stream_writable");
	      o.inherits(c, a);
	      var f = i(s.prototype);

	      for (var u = 0; u < f.length; u++) {
	        var l = f[u];
	        if (!c.prototype[l]) c.prototype[l] = s.prototype[l];
	      }

	      function c(e) {
	        if (!(this instanceof c)) return new c(e);
	        a.call(this, e);
	        s.call(this, e);
	        if (e && e.readable === false) this.readable = false;
	        if (e && e.writable === false) this.writable = false;
	        this.allowHalfOpen = true;
	        if (e && e.allowHalfOpen === false) this.allowHalfOpen = false;
	        this.once("end", h);
	      }

	      function h() {
	        if (this.allowHalfOpen || this._writableState.ended) return;
	        n(d, this);
	      }

	      function d(e) {
	        e.end();
	      }

	      Object.defineProperty(c.prototype, "destroyed", {
	        get: function () {
	          if (this._readableState === undefined || this._writableState === undefined) {
	            return false;
	          }

	          return this._readableState.destroyed && this._writableState.destroyed;
	        },
	        set: function (e) {
	          if (this._readableState === undefined || this._writableState === undefined) {
	            return;
	          }

	          this._readableState.destroyed = e;
	          this._writableState.destroyed = e;
	        }
	      });

	      c.prototype._destroy = function (e, t) {
	        this.push(null);
	        this.end();
	        n(t, e);
	      };
	    }, {
	      "./_stream_readable": 19,
	      "./_stream_writable": 21,
	      "core-util-is": 4,
	      inherits: 10,
	      "process-nextick-args": 14
	    }],
	    18: [function (e, t, r) {

	      t.exports = o;
	      var n = e("./_stream_transform");
	      var i = e("core-util-is");
	      i.inherits = e("inherits");
	      i.inherits(o, n);

	      function o(e) {
	        if (!(this instanceof o)) return new o(e);
	        n.call(this, e);
	      }

	      o.prototype._transform = function (e, t, r) {
	        r(null, e);
	      };
	    }, {
	      "./_stream_transform": 20,
	      "core-util-is": 4,
	      inherits: 10
	    }],
	    19: [function (e, t, r) {
	      (function (r, n) {

	        var i = e("process-nextick-args").nextTick;
	        t.exports = S;
	        var o = e("isarray");
	        var a;
	        S.ReadableState = C;
	        e("events").EventEmitter;

	        var f = function (e, t) {
	          return e.listeners(t).length;
	        };

	        var u = e("./internal/streams/stream");
	        var l = e("safe-buffer").Buffer;

	        var c = n.Uint8Array || function () {};

	        function h(e) {
	          return l.from(e);
	        }

	        function d(e) {
	          return l.isBuffer(e) || e instanceof c;
	        }

	        var p = e("core-util-is");
	        p.inherits = e("inherits");
	        var g = e("util");
	        var y = void 0;

	        if (g && g.debuglog) {
	          y = g.debuglog("stream");
	        } else {
	          y = function () {};
	        }

	        var v = e("./internal/streams/BufferList");
	        var m = e("./internal/streams/destroy");
	        var b;
	        p.inherits(S, u);
	        var w = ["error", "close", "destroy", "pause", "resume"];

	        function _(e, t, r) {
	          if (typeof e.prependListener === "function") return e.prependListener(t, r);
	          if (!e._events || !e._events[t]) e.on(t, r);else if (o(e._events[t])) e._events[t].unshift(r);else e._events[t] = [r, e._events[t]];
	        }

	        function C(t, r) {
	          a = a || e("./_stream_duplex");
	          t = t || {};
	          var n = r instanceof a;
	          this.objectMode = !!t.objectMode;
	          if (n) this.objectMode = this.objectMode || !!t.readableObjectMode;
	          var i = t.highWaterMark;
	          var o = t.readableHighWaterMark;
	          var s = this.objectMode ? 16 : 16 * 1024;
	          if (i || i === 0) this.highWaterMark = i;else if (n && (o || o === 0)) this.highWaterMark = o;else this.highWaterMark = s;
	          this.highWaterMark = Math.floor(this.highWaterMark);
	          this.buffer = new v();
	          this.length = 0;
	          this.pipes = null;
	          this.pipesCount = 0;
	          this.flowing = null;
	          this.ended = false;
	          this.endEmitted = false;
	          this.reading = false;
	          this.sync = true;
	          this.needReadable = false;
	          this.emittedReadable = false;
	          this.readableListening = false;
	          this.resumeScheduled = false;
	          this.destroyed = false;
	          this.defaultEncoding = t.defaultEncoding || "utf8";
	          this.awaitDrain = 0;
	          this.readingMore = false;
	          this.decoder = null;
	          this.encoding = null;

	          if (t.encoding) {
	            if (!b) b = e("string_decoder/").StringDecoder;
	            this.decoder = new b(t.encoding);
	            this.encoding = t.encoding;
	          }
	        }

	        function S(t) {
	          a = a || e("./_stream_duplex");
	          if (!(this instanceof S)) return new S(t);
	          this._readableState = new C(t, this);
	          this.readable = true;

	          if (t) {
	            if (typeof t.read === "function") this._read = t.read;
	            if (typeof t.destroy === "function") this._destroy = t.destroy;
	          }

	          u.call(this);
	        }

	        Object.defineProperty(S.prototype, "destroyed", {
	          get: function () {
	            if (this._readableState === undefined) {
	              return false;
	            }

	            return this._readableState.destroyed;
	          },
	          set: function (e) {
	            if (!this._readableState) {
	              return;
	            }

	            this._readableState.destroyed = e;
	          }
	        });
	        S.prototype.destroy = m.destroy;
	        S.prototype._undestroy = m.undestroy;

	        S.prototype._destroy = function (e, t) {
	          this.push(null);
	          t(e);
	        };

	        S.prototype.push = function (e, t) {
	          var r = this._readableState;
	          var n;

	          if (!r.objectMode) {
	            if (typeof e === "string") {
	              t = t || r.defaultEncoding;

	              if (t !== r.encoding) {
	                e = l.from(e, t);
	                t = "";
	              }

	              n = true;
	            }
	          } else {
	            n = true;
	          }

	          return E(this, e, t, false, n);
	        };

	        S.prototype.unshift = function (e) {
	          return E(this, e, null, true, false);
	        };

	        function E(e, t, r, n, i) {
	          var o = e._readableState;

	          if (t === null) {
	            o.reading = false;
	            M(e, o);
	          } else {
	            var a;
	            if (!i) a = k(o, t);

	            if (a) {
	              e.emit("error", a);
	            } else if (o.objectMode || t && t.length > 0) {
	              if (typeof t !== "string" && !o.objectMode && Object.getPrototypeOf(t) !== l.prototype) {
	                t = h(t);
	              }

	              if (n) {
	                if (o.endEmitted) e.emit("error", new Error("stream.unshift() after end event"));else x(e, o, t, true);
	              } else if (o.ended) {
	                e.emit("error", new Error("stream.push() after EOF"));
	              } else {
	                o.reading = false;

	                if (o.decoder && !r) {
	                  t = o.decoder.write(t);
	                  if (o.objectMode || t.length !== 0) x(e, o, t, false);else j(e, o);
	                } else {
	                  x(e, o, t, false);
	                }
	              }
	            } else if (!n) {
	              o.reading = false;
	            }
	          }

	          return T(o);
	        }

	        function x(e, t, r, n) {
	          if (t.flowing && t.length === 0 && !t.sync) {
	            e.emit("data", r);
	            e.read(0);
	          } else {
	            t.length += t.objectMode ? 1 : r.length;
	            if (n) t.buffer.unshift(r);else t.buffer.push(r);
	            if (t.needReadable) B(e);
	          }

	          j(e, t);
	        }

	        function k(e, t) {
	          var r;

	          if (!d(t) && typeof t !== "string" && t !== undefined && !e.objectMode) {
	            r = new TypeError("Invalid non-string/buffer chunk");
	          }

	          return r;
	        }

	        function T(e) {
	          return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0);
	        }

	        S.prototype.isPaused = function () {
	          return this._readableState.flowing === false;
	        };

	        S.prototype.setEncoding = function (t) {
	          if (!b) b = e("string_decoder/").StringDecoder;
	          this._readableState.decoder = new b(t);
	          this._readableState.encoding = t;
	          return this;
	        };

	        var A = 8388608;

	        function R(e) {
	          if (e >= A) {
	            e = A;
	          } else {
	            e--;
	            e |= e >>> 1;
	            e |= e >>> 2;
	            e |= e >>> 4;
	            e |= e >>> 8;
	            e |= e >>> 16;
	            e++;
	          }

	          return e;
	        }

	        function L(e, t) {
	          if (e <= 0 || t.length === 0 && t.ended) return 0;
	          if (t.objectMode) return 1;

	          if (e !== e) {
	            if (t.flowing && t.length) return t.buffer.head.data.length;else return t.length;
	          }

	          if (e > t.highWaterMark) t.highWaterMark = R(e);
	          if (e <= t.length) return e;

	          if (!t.ended) {
	            t.needReadable = true;
	            return 0;
	          }

	          return t.length;
	        }

	        S.prototype.read = function (e) {
	          y("read", e);
	          e = parseInt(e, 10);
	          var t = this._readableState;
	          var r = e;
	          if (e !== 0) t.emittedReadable = false;

	          if (e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
	            y("read: emitReadable", t.length, t.ended);
	            if (t.length === 0 && t.ended) H(this);else B(this);
	            return null;
	          }

	          e = L(e, t);

	          if (e === 0 && t.ended) {
	            if (t.length === 0) H(this);
	            return null;
	          }

	          var n = t.needReadable;
	          y("need readable", n);

	          if (t.length === 0 || t.length - e < t.highWaterMark) {
	            n = true;
	            y("length less than watermark", n);
	          }

	          if (t.ended || t.reading) {
	            n = false;
	            y("reading or ended", n);
	          } else if (n) {
	            y("do read");
	            t.reading = true;
	            t.sync = true;
	            if (t.length === 0) t.needReadable = true;

	            this._read(t.highWaterMark);

	            t.sync = false;
	            if (!t.reading) e = L(r, t);
	          }

	          var i;
	          if (e > 0) i = W(e, t);else i = null;

	          if (i === null) {
	            t.needReadable = true;
	            e = 0;
	          } else {
	            t.length -= e;
	          }

	          if (t.length === 0) {
	            if (!t.ended) t.needReadable = true;
	            if (r !== e && t.ended) H(this);
	          }

	          if (i !== null) this.emit("data", i);
	          return i;
	        };

	        function M(e, t) {
	          if (t.ended) return;

	          if (t.decoder) {
	            var r = t.decoder.end();

	            if (r && r.length) {
	              t.buffer.push(r);
	              t.length += t.objectMode ? 1 : r.length;
	            }
	          }

	          t.ended = true;
	          B(e);
	        }

	        function B(e) {
	          var t = e._readableState;
	          t.needReadable = false;

	          if (!t.emittedReadable) {
	            y("emitReadable", t.flowing);
	            t.emittedReadable = true;
	            if (t.sync) i(F, e);else F(e);
	          }
	        }

	        function F(e) {
	          y("emit readable");
	          e.emit("readable");
	          D(e);
	        }

	        function j(e, t) {
	          if (!t.readingMore) {
	            t.readingMore = true;
	            i(I, e, t);
	          }
	        }

	        function I(e, t) {
	          var r = t.length;

	          while (!t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark) {
	            y("maybeReadMore read 0");
	            e.read(0);
	            if (r === t.length) break;else r = t.length;
	          }

	          t.readingMore = false;
	        }

	        S.prototype._read = function (e) {
	          this.emit("error", new Error("_read() is not implemented"));
	        };

	        S.prototype.pipe = function (e, t) {
	          var n = this;
	          var o = this._readableState;

	          switch (o.pipesCount) {
	            case 0:
	              o.pipes = e;
	              break;

	            case 1:
	              o.pipes = [o.pipes, e];
	              break;

	            default:
	              o.pipes.push(e);
	              break;
	          }

	          o.pipesCount += 1;
	          y("pipe count=%d opts=%j", o.pipesCount, t);
	          var a = (!t || t.end !== false) && e !== r.stdout && e !== r.stderr;
	          var s = a ? l : w;
	          if (o.endEmitted) i(s);else n.once("end", s);
	          e.on("unpipe", u);

	          function u(e, t) {
	            y("onunpipe");

	            if (e === n) {
	              if (t && t.hasUnpiped === false) {
	                t.hasUnpiped = true;
	                d();
	              }
	            }
	          }

	          function l() {
	            y("onend");
	            e.end();
	          }

	          var c = O(n);
	          e.on("drain", c);
	          var h = false;

	          function d() {
	            y("cleanup");
	            e.removeListener("close", m);
	            e.removeListener("finish", b);
	            e.removeListener("drain", c);
	            e.removeListener("error", v);
	            e.removeListener("unpipe", u);
	            n.removeListener("end", l);
	            n.removeListener("end", w);
	            n.removeListener("data", g);
	            h = true;
	            if (o.awaitDrain && (!e._writableState || e._writableState.needDrain)) c();
	          }

	          var p = false;
	          n.on("data", g);

	          function g(t) {
	            y("ondata");
	            p = false;
	            var r = e.write(t);

	            if (false === r && !p) {
	              if ((o.pipesCount === 1 && o.pipes === e || o.pipesCount > 1 && Z(o.pipes, e) !== -1) && !h) {
	                y("false write response, pause", n._readableState.awaitDrain);
	                n._readableState.awaitDrain++;
	                p = true;
	              }

	              n.pause();
	            }
	          }

	          function v(t) {
	            y("onerror", t);
	            w();
	            e.removeListener("error", v);
	            if (f(e, "error") === 0) e.emit("error", t);
	          }

	          _(e, "error", v);

	          function m() {
	            e.removeListener("finish", b);
	            w();
	          }

	          e.once("close", m);

	          function b() {
	            y("onfinish");
	            e.removeListener("close", m);
	            w();
	          }

	          e.once("finish", b);

	          function w() {
	            y("unpipe");
	            n.unpipe(e);
	          }

	          e.emit("pipe", n);

	          if (!o.flowing) {
	            y("pipe resume");
	            n.resume();
	          }

	          return e;
	        };

	        function O(e) {
	          return function () {
	            var t = e._readableState;
	            y("pipeOnDrain", t.awaitDrain);
	            if (t.awaitDrain) t.awaitDrain--;

	            if (t.awaitDrain === 0 && f(e, "data")) {
	              t.flowing = true;
	              D(e);
	            }
	          };
	        }

	        S.prototype.unpipe = function (e) {
	          var t = this._readableState;
	          var r = {
	            hasUnpiped: false
	          };
	          if (t.pipesCount === 0) return this;

	          if (t.pipesCount === 1) {
	            if (e && e !== t.pipes) return this;
	            if (!e) e = t.pipes;
	            t.pipes = null;
	            t.pipesCount = 0;
	            t.flowing = false;
	            if (e) e.emit("unpipe", this, r);
	            return this;
	          }

	          if (!e) {
	            var n = t.pipes;
	            var i = t.pipesCount;
	            t.pipes = null;
	            t.pipesCount = 0;
	            t.flowing = false;

	            for (var o = 0; o < i; o++) {
	              n[o].emit("unpipe", this, r);
	            }

	            return this;
	          }

	          var a = Z(t.pipes, e);
	          if (a === -1) return this;
	          t.pipes.splice(a, 1);
	          t.pipesCount -= 1;
	          if (t.pipesCount === 1) t.pipes = t.pipes[0];
	          e.emit("unpipe", this, r);
	          return this;
	        };

	        S.prototype.on = function (e, t) {
	          var r = u.prototype.on.call(this, e, t);

	          if (e === "data") {
	            if (this._readableState.flowing !== false) this.resume();
	          } else if (e === "readable") {
	            var n = this._readableState;

	            if (!n.endEmitted && !n.readableListening) {
	              n.readableListening = n.needReadable = true;
	              n.emittedReadable = false;

	              if (!n.reading) {
	                i(N, this);
	              } else if (n.length) {
	                B(this);
	              }
	            }
	          }

	          return r;
	        };

	        S.prototype.addListener = S.prototype.on;

	        function N(e) {
	          y("readable nexttick read 0");
	          e.read(0);
	        }

	        S.prototype.resume = function () {
	          var e = this._readableState;

	          if (!e.flowing) {
	            y("resume");
	            e.flowing = true;
	            U(this, e);
	          }

	          return this;
	        };

	        function U(e, t) {
	          if (!t.resumeScheduled) {
	            t.resumeScheduled = true;
	            i(P, e, t);
	          }
	        }

	        function P(e, t) {
	          if (!t.reading) {
	            y("resume read 0");
	            e.read(0);
	          }

	          t.resumeScheduled = false;
	          t.awaitDrain = 0;
	          e.emit("resume");
	          D(e);
	          if (t.flowing && !t.reading) e.read(0);
	        }

	        S.prototype.pause = function () {
	          y("call pause flowing=%j", this._readableState.flowing);

	          if (false !== this._readableState.flowing) {
	            y("pause");
	            this._readableState.flowing = false;
	            this.emit("pause");
	          }

	          return this;
	        };

	        function D(e) {
	          var t = e._readableState;
	          y("flow", t.flowing);

	          while (t.flowing && e.read() !== null) {}
	        }

	        S.prototype.wrap = function (e) {
	          var t = this;
	          var r = this._readableState;
	          var n = false;
	          e.on("end", function () {
	            y("wrapped end");

	            if (r.decoder && !r.ended) {
	              var e = r.decoder.end();
	              if (e && e.length) t.push(e);
	            }

	            t.push(null);
	          });
	          e.on("data", function (i) {
	            y("wrapped data");
	            if (r.decoder) i = r.decoder.write(i);
	            if (r.objectMode && (i === null || i === undefined)) return;else if (!r.objectMode && (!i || !i.length)) return;
	            var o = t.push(i);

	            if (!o) {
	              n = true;
	              e.pause();
	            }
	          });

	          for (var i in e) {
	            if (this[i] === undefined && typeof e[i] === "function") {
	              this[i] = function (t) {
	                return function () {
	                  return e[t].apply(e, arguments);
	                };
	              }(i);
	            }
	          }

	          for (var o = 0; o < w.length; o++) {
	            e.on(w[o], this.emit.bind(this, w[o]));
	          }

	          this._read = function (t) {
	            y("wrapped _read", t);

	            if (n) {
	              n = false;
	              e.resume();
	            }
	          };

	          return this;
	        };

	        S._fromList = W;

	        function W(e, t) {
	          if (t.length === 0) return null;
	          var r;
	          if (t.objectMode) r = t.buffer.shift();else if (!e || e >= t.length) {
	            if (t.decoder) r = t.buffer.join("");else if (t.buffer.length === 1) r = t.buffer.head.data;else r = t.buffer.concat(t.length);
	            t.buffer.clear();
	          } else {
	            r = q(e, t.buffer, t.decoder);
	          }
	          return r;
	        }

	        function q(e, t, r) {
	          var n;

	          if (e < t.head.data.length) {
	            n = t.head.data.slice(0, e);
	            t.head.data = t.head.data.slice(e);
	          } else if (e === t.head.data.length) {
	            n = t.shift();
	          } else {
	            n = r ? z(e, t) : V(e, t);
	          }

	          return n;
	        }

	        function z(e, t) {
	          var r = t.head;
	          var n = 1;
	          var i = r.data;
	          e -= i.length;

	          while (r = r.next) {
	            var o = r.data;
	            var a = e > o.length ? o.length : e;
	            if (a === o.length) i += o;else i += o.slice(0, e);
	            e -= a;

	            if (e === 0) {
	              if (a === o.length) {
	                ++n;
	                if (r.next) t.head = r.next;else t.head = t.tail = null;
	              } else {
	                t.head = r;
	                r.data = o.slice(a);
	              }

	              break;
	            }

	            ++n;
	          }

	          t.length -= n;
	          return i;
	        }

	        function V(e, t) {
	          var r = l.allocUnsafe(e);
	          var n = t.head;
	          var i = 1;
	          n.data.copy(r);
	          e -= n.data.length;

	          while (n = n.next) {
	            var o = n.data;
	            var a = e > o.length ? o.length : e;
	            o.copy(r, r.length - e, 0, a);
	            e -= a;

	            if (e === 0) {
	              if (a === o.length) {
	                ++i;
	                if (n.next) t.head = n.next;else t.head = t.tail = null;
	              } else {
	                t.head = n;
	                n.data = o.slice(a);
	              }

	              break;
	            }

	            ++i;
	          }

	          t.length -= i;
	          return r;
	        }

	        function H(e) {
	          var t = e._readableState;
	          if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	          if (!t.endEmitted) {
	            t.ended = true;
	            i(Y, t, e);
	          }
	        }

	        function Y(e, t) {
	          if (!e.endEmitted && e.length === 0) {
	            e.endEmitted = true;
	            t.readable = false;
	            t.emit("end");
	          }
	        }

	        function Z(e, t) {
	          for (var r = 0, n = e.length; r < n; r++) {
	            if (e[r] === t) return r;
	          }

	          return -1;
	        }
	      }).call(this, e("_process"), typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	    }, {
	      "./_stream_duplex": 17,
	      "./internal/streams/BufferList": 22,
	      "./internal/streams/destroy": 23,
	      "./internal/streams/stream": 24,
	      _process: 15,
	      "core-util-is": 4,
	      events: 7,
	      inherits: 10,
	      isarray: 12,
	      "process-nextick-args": 14,
	      "safe-buffer": 26,
	      "string_decoder/": 27,
	      util: 2
	    }],
	    20: [function (e, t, r) {

	      t.exports = a;
	      var n = e("./_stream_duplex");
	      var i = e("core-util-is");
	      i.inherits = e("inherits");
	      i.inherits(a, n);

	      function o(e, t) {
	        var r = this._transformState;
	        r.transforming = false;
	        var n = r.writecb;

	        if (!n) {
	          return this.emit("error", new Error("write callback called multiple times"));
	        }

	        r.writechunk = null;
	        r.writecb = null;
	        if (t != null) this.push(t);
	        n(e);
	        var i = this._readableState;
	        i.reading = false;

	        if (i.needReadable || i.length < i.highWaterMark) {
	          this._read(i.highWaterMark);
	        }
	      }

	      function a(e) {
	        if (!(this instanceof a)) return new a(e);
	        n.call(this, e);
	        this._transformState = {
	          afterTransform: o.bind(this),
	          needTransform: false,
	          transforming: false,
	          writecb: null,
	          writechunk: null,
	          writeencoding: null
	        };
	        this._readableState.needReadable = true;
	        this._readableState.sync = false;

	        if (e) {
	          if (typeof e.transform === "function") this._transform = e.transform;
	          if (typeof e.flush === "function") this._flush = e.flush;
	        }

	        this.on("prefinish", s);
	      }

	      function s() {
	        var e = this;

	        if (typeof this._flush === "function") {
	          this._flush(function (t, r) {
	            f(e, t, r);
	          });
	        } else {
	          f(this, null, null);
	        }
	      }

	      a.prototype.push = function (e, t) {
	        this._transformState.needTransform = false;
	        return n.prototype.push.call(this, e, t);
	      };

	      a.prototype._transform = function (e, t, r) {
	        throw new Error("_transform() is not implemented");
	      };

	      a.prototype._write = function (e, t, r) {
	        var n = this._transformState;
	        n.writecb = r;
	        n.writechunk = e;
	        n.writeencoding = t;

	        if (!n.transforming) {
	          var i = this._readableState;
	          if (n.needTransform || i.needReadable || i.length < i.highWaterMark) this._read(i.highWaterMark);
	        }
	      };

	      a.prototype._read = function (e) {
	        var t = this._transformState;

	        if (t.writechunk !== null && t.writecb && !t.transforming) {
	          t.transforming = true;

	          this._transform(t.writechunk, t.writeencoding, t.afterTransform);
	        } else {
	          t.needTransform = true;
	        }
	      };

	      a.prototype._destroy = function (e, t) {
	        var r = this;

	        n.prototype._destroy.call(this, e, function (e) {
	          t(e);
	          r.emit("close");
	        });
	      };

	      function f(e, t, r) {
	        if (t) return e.emit("error", t);
	        if (r != null) e.push(r);
	        if (e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
	        if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
	        return e.push(null);
	      }
	    }, {
	      "./_stream_duplex": 17,
	      "core-util-is": 4,
	      inherits: 10
	    }],
	    21: [function (e, t, r) {
	      (function (r, n) {

	        var i = e("process-nextick-args").nextTick;
	        t.exports = w;

	        function a(e) {
	          var t = this;
	          this.next = null;
	          this.entry = null;

	          this.finish = function () {
	            N(t, e);
	          };
	        }

	        var s = !r.browser && ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : i;
	        var f;
	        w.WritableState = m;
	        var u = e("core-util-is");
	        u.inherits = e("inherits");
	        var l = {
	          deprecate: e("util-deprecate")
	        };
	        var c = e("./internal/streams/stream");
	        var h = e("safe-buffer").Buffer;

	        var d = n.Uint8Array || function () {};

	        function p(e) {
	          return h.from(e);
	        }

	        function g(e) {
	          return h.isBuffer(e) || e instanceof d;
	        }

	        var y = e("./internal/streams/destroy");
	        u.inherits(w, c);

	        function v() {}

	        function m(t, r) {
	          f = f || e("./_stream_duplex");
	          t = t || {};
	          var n = r instanceof f;
	          this.objectMode = !!t.objectMode;
	          if (n) this.objectMode = this.objectMode || !!t.writableObjectMode;
	          var i = t.highWaterMark;
	          var o = t.writableHighWaterMark;
	          var s = this.objectMode ? 16 : 16 * 1024;
	          if (i || i === 0) this.highWaterMark = i;else if (n && (o || o === 0)) this.highWaterMark = o;else this.highWaterMark = s;
	          this.highWaterMark = Math.floor(this.highWaterMark);
	          this.finalCalled = false;
	          this.needDrain = false;
	          this.ending = false;
	          this.ended = false;
	          this.finished = false;
	          this.destroyed = false;
	          var u = t.decodeStrings === false;
	          this.decodeStrings = !u;
	          this.defaultEncoding = t.defaultEncoding || "utf8";
	          this.length = 0;
	          this.writing = false;
	          this.corked = 0;
	          this.sync = true;
	          this.bufferProcessing = false;

	          this.onwrite = function (e) {
	            A(r, e);
	          };

	          this.writecb = null;
	          this.writelen = 0;
	          this.bufferedRequest = null;
	          this.lastBufferedRequest = null;
	          this.pendingcb = 0;
	          this.prefinished = false;
	          this.errorEmitted = false;
	          this.bufferedRequestCount = 0;
	          this.corkedRequestsFree = new a(this);
	        }

	        m.prototype.getBuffer = function e() {
	          var t = this.bufferedRequest;
	          var r = [];

	          while (t) {
	            r.push(t);
	            t = t.next;
	          }

	          return r;
	        };

	        (function () {
	          try {
	            Object.defineProperty(m.prototype, "buffer", {
	              get: l.deprecate(function () {
	                return this.getBuffer();
	              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003")
	            });
	          } catch (e) {}
	        })();

	        var b;

	        if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
	          b = Function.prototype[Symbol.hasInstance];
	          Object.defineProperty(w, Symbol.hasInstance, {
	            value: function (e) {
	              if (b.call(this, e)) return true;
	              if (this !== w) return false;
	              return e && e._writableState instanceof m;
	            }
	          });
	        } else {
	          b = function (e) {
	            return e instanceof this;
	          };
	        }

	        function w(t) {
	          f = f || e("./_stream_duplex");

	          if (!b.call(w, this) && !(this instanceof f)) {
	            return new w(t);
	          }

	          this._writableState = new m(t, this);
	          this.writable = true;

	          if (t) {
	            if (typeof t.write === "function") this._write = t.write;
	            if (typeof t.writev === "function") this._writev = t.writev;
	            if (typeof t.destroy === "function") this._destroy = t.destroy;
	            if (typeof t.final === "function") this._final = t.final;
	          }

	          c.call(this);
	        }

	        w.prototype.pipe = function () {
	          this.emit("error", new Error("Cannot pipe, not readable"));
	        };

	        function _(e, t) {
	          var r = new Error("write after end");
	          e.emit("error", r);
	          i(t, r);
	        }

	        function C(e, t, r, n) {
	          var o = true;
	          var a = false;

	          if (r === null) {
	            a = new TypeError("May not write null values to stream");
	          } else if (typeof r !== "string" && r !== undefined && !t.objectMode) {
	            a = new TypeError("Invalid non-string/buffer chunk");
	          }

	          if (a) {
	            e.emit("error", a);
	            i(n, a);
	            o = false;
	          }

	          return o;
	        }

	        w.prototype.write = function (e, t, r) {
	          var n = this._writableState;
	          var i = false;
	          var o = !n.objectMode && g(e);

	          if (o && !h.isBuffer(e)) {
	            e = p(e);
	          }

	          if (typeof t === "function") {
	            r = t;
	            t = null;
	          }

	          if (o) t = "buffer";else if (!t) t = n.defaultEncoding;
	          if (typeof r !== "function") r = v;
	          if (n.ended) _(this, r);else if (o || C(this, n, e, r)) {
	            n.pendingcb++;
	            i = E(this, n, o, e, t, r);
	          }
	          return i;
	        };

	        w.prototype.cork = function () {
	          var e = this._writableState;
	          e.corked++;
	        };

	        w.prototype.uncork = function () {
	          var e = this._writableState;

	          if (e.corked) {
	            e.corked--;
	            if (!e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest) M(this, e);
	          }
	        };

	        w.prototype.setDefaultEncoding = function e(t) {
	          if (typeof t === "string") t = t.toLowerCase();
	          if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
	          this._writableState.defaultEncoding = t;
	          return this;
	        };

	        function S(e, t, r) {
	          if (!e.objectMode && e.decodeStrings !== false && typeof t === "string") {
	            t = h.from(t, r);
	          }

	          return t;
	        }

	        function E(e, t, r, n, i, o) {
	          if (!r) {
	            var a = S(t, n, i);

	            if (n !== a) {
	              r = true;
	              i = "buffer";
	              n = a;
	            }
	          }

	          var s = t.objectMode ? 1 : n.length;
	          t.length += s;
	          var f = t.length < t.highWaterMark;
	          if (!f) t.needDrain = true;

	          if (t.writing || t.corked) {
	            var u = t.lastBufferedRequest;
	            t.lastBufferedRequest = {
	              chunk: n,
	              encoding: i,
	              isBuf: r,
	              callback: o,
	              next: null
	            };

	            if (u) {
	              u.next = t.lastBufferedRequest;
	            } else {
	              t.bufferedRequest = t.lastBufferedRequest;
	            }

	            t.bufferedRequestCount += 1;
	          } else {
	            x(e, t, false, s, n, i, o);
	          }

	          return f;
	        }

	        function x(e, t, r, n, i, o, a) {
	          t.writelen = n;
	          t.writecb = a;
	          t.writing = true;
	          t.sync = true;
	          if (r) e._writev(i, t.onwrite);else e._write(i, o, t.onwrite);
	          t.sync = false;
	        }

	        function k(e, t, r, n, o) {
	          --t.pendingcb;

	          if (r) {
	            i(o, n);
	            i(I, e, t);
	            e._writableState.errorEmitted = true;
	            e.emit("error", n);
	          } else {
	            o(n);
	            e._writableState.errorEmitted = true;
	            e.emit("error", n);
	            I(e, t);
	          }
	        }

	        function T(e) {
	          e.writing = false;
	          e.writecb = null;
	          e.length -= e.writelen;
	          e.writelen = 0;
	        }

	        function A(e, t) {
	          var r = e._writableState;
	          var n = r.sync;
	          var i = r.writecb;
	          T(r);
	          if (t) k(e, r, n, t, i);else {
	            var o = B(r);

	            if (!o && !r.corked && !r.bufferProcessing && r.bufferedRequest) {
	              M(e, r);
	            }

	            if (n) {
	              s(R, e, r, o, i);
	            } else {
	              R(e, r, o, i);
	            }
	          }
	        }

	        function R(e, t, r, n) {
	          if (!r) L(e, t);
	          t.pendingcb--;
	          n();
	          I(e, t);
	        }

	        function L(e, t) {
	          if (t.length === 0 && t.needDrain) {
	            t.needDrain = false;
	            e.emit("drain");
	          }
	        }

	        function M(e, t) {
	          t.bufferProcessing = true;
	          var r = t.bufferedRequest;

	          if (e._writev && r && r.next) {
	            var n = t.bufferedRequestCount;
	            var i = new Array(n);
	            var o = t.corkedRequestsFree;
	            o.entry = r;
	            var s = 0;
	            var f = true;

	            while (r) {
	              i[s] = r;
	              if (!r.isBuf) f = false;
	              r = r.next;
	              s += 1;
	            }

	            i.allBuffers = f;
	            x(e, t, true, t.length, i, "", o.finish);
	            t.pendingcb++;
	            t.lastBufferedRequest = null;

	            if (o.next) {
	              t.corkedRequestsFree = o.next;
	              o.next = null;
	            } else {
	              t.corkedRequestsFree = new a(t);
	            }

	            t.bufferedRequestCount = 0;
	          } else {
	            while (r) {
	              var u = r.chunk;
	              var l = r.encoding;
	              var c = r.callback;
	              var h = t.objectMode ? 1 : u.length;
	              x(e, t, false, h, u, l, c);
	              r = r.next;
	              t.bufferedRequestCount--;

	              if (t.writing) {
	                break;
	              }
	            }

	            if (r === null) t.lastBufferedRequest = null;
	          }

	          t.bufferedRequest = r;
	          t.bufferProcessing = false;
	        }

	        w.prototype._write = function (e, t, r) {
	          r(new Error("_write() is not implemented"));
	        };

	        w.prototype._writev = null;

	        w.prototype.end = function (e, t, r) {
	          var n = this._writableState;

	          if (typeof e === "function") {
	            r = e;
	            e = null;
	            t = null;
	          } else if (typeof t === "function") {
	            r = t;
	            t = null;
	          }

	          if (e !== null && e !== undefined) this.write(e, t);

	          if (n.corked) {
	            n.corked = 1;
	            this.uncork();
	          }

	          if (!n.ending && !n.finished) O(this, n, r);
	        };

	        function B(e) {
	          return e.ending && e.length === 0 && e.bufferedRequest === null && !e.finished && !e.writing;
	        }

	        function F(e, t) {
	          e._final(function (r) {
	            t.pendingcb--;

	            if (r) {
	              e.emit("error", r);
	            }

	            t.prefinished = true;
	            e.emit("prefinish");
	            I(e, t);
	          });
	        }

	        function j(e, t) {
	          if (!t.prefinished && !t.finalCalled) {
	            if (typeof e._final === "function") {
	              t.pendingcb++;
	              t.finalCalled = true;
	              i(F, e, t);
	            } else {
	              t.prefinished = true;
	              e.emit("prefinish");
	            }
	          }
	        }

	        function I(e, t) {
	          var r = B(t);

	          if (r) {
	            j(e, t);

	            if (t.pendingcb === 0) {
	              t.finished = true;
	              e.emit("finish");
	            }
	          }

	          return r;
	        }

	        function O(e, t, r) {
	          t.ending = true;
	          I(e, t);

	          if (r) {
	            if (t.finished) i(r);else e.once("finish", r);
	          }

	          t.ended = true;
	          e.writable = false;
	        }

	        function N(e, t, r) {
	          var n = e.entry;
	          e.entry = null;

	          while (n) {
	            var i = n.callback;
	            t.pendingcb--;
	            i(r);
	            n = n.next;
	          }

	          if (t.corkedRequestsFree) {
	            t.corkedRequestsFree.next = e;
	          } else {
	            t.corkedRequestsFree = e;
	          }
	        }

	        Object.defineProperty(w.prototype, "destroyed", {
	          get: function () {
	            if (this._writableState === undefined) {
	              return false;
	            }

	            return this._writableState.destroyed;
	          },
	          set: function (e) {
	            if (!this._writableState) {
	              return;
	            }

	            this._writableState.destroyed = e;
	          }
	        });
	        w.prototype.destroy = y.destroy;
	        w.prototype._undestroy = y.undestroy;

	        w.prototype._destroy = function (e, t) {
	          this.end();
	          t(e);
	        };
	      }).call(this, e("_process"), typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	    }, {
	      "./_stream_duplex": 17,
	      "./internal/streams/destroy": 23,
	      "./internal/streams/stream": 24,
	      _process: 15,
	      "core-util-is": 4,
	      inherits: 10,
	      "process-nextick-args": 14,
	      "safe-buffer": 26,
	      "util-deprecate": 28
	    }],
	    22: [function (e, t, r) {

	      function n(e, t) {
	        if (!(e instanceof t)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var i = e("safe-buffer").Buffer;
	      var o = e("util");

	      function a(e, t, r) {
	        e.copy(t, r);
	      }

	      t.exports = function () {
	        function e() {
	          n(this, e);
	          this.head = null;
	          this.tail = null;
	          this.length = 0;
	        }

	        e.prototype.push = function e(t) {
	          var r = {
	            data: t,
	            next: null
	          };
	          if (this.length > 0) this.tail.next = r;else this.head = r;
	          this.tail = r;
	          ++this.length;
	        };

	        e.prototype.unshift = function e(t) {
	          var r = {
	            data: t,
	            next: this.head
	          };
	          if (this.length === 0) this.tail = r;
	          this.head = r;
	          ++this.length;
	        };

	        e.prototype.shift = function e() {
	          if (this.length === 0) return;
	          var t = this.head.data;
	          if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	          --this.length;
	          return t;
	        };

	        e.prototype.clear = function e() {
	          this.head = this.tail = null;
	          this.length = 0;
	        };

	        e.prototype.join = function e(t) {
	          if (this.length === 0) return "";
	          var r = this.head;
	          var n = "" + r.data;

	          while (r = r.next) {
	            n += t + r.data;
	          }

	          return n;
	        };

	        e.prototype.concat = function e(t) {
	          if (this.length === 0) return i.alloc(0);
	          if (this.length === 1) return this.head.data;
	          var r = i.allocUnsafe(t >>> 0);
	          var n = this.head;
	          var o = 0;

	          while (n) {
	            a(n.data, r, o);
	            o += n.data.length;
	            n = n.next;
	          }

	          return r;
	        };

	        return e;
	      }();

	      if (o && o.inspect && o.inspect.custom) {
	        t.exports.prototype[o.inspect.custom] = function () {
	          var e = o.inspect({
	            length: this.length
	          });
	          return this.constructor.name + " " + e;
	        };
	      }
	    }, {
	      "safe-buffer": 26,
	      util: 2
	    }],
	    23: [function (e, t, r) {

	      var n = e("process-nextick-args").nextTick;

	      function i(e, t) {
	        var r = this;
	        var i = this._readableState && this._readableState.destroyed;
	        var o = this._writableState && this._writableState.destroyed;

	        if (i || o) {
	          if (t) {
	            t(e);
	          } else if (e && (!this._writableState || !this._writableState.errorEmitted)) {
	            n(a, this, e);
	          }

	          return this;
	        }

	        if (this._readableState) {
	          this._readableState.destroyed = true;
	        }

	        if (this._writableState) {
	          this._writableState.destroyed = true;
	        }

	        this._destroy(e || null, function (e) {
	          if (!t && e) {
	            n(a, r, e);

	            if (r._writableState) {
	              r._writableState.errorEmitted = true;
	            }
	          } else if (t) {
	            t(e);
	          }
	        });

	        return this;
	      }

	      function o() {
	        if (this._readableState) {
	          this._readableState.destroyed = false;
	          this._readableState.reading = false;
	          this._readableState.ended = false;
	          this._readableState.endEmitted = false;
	        }

	        if (this._writableState) {
	          this._writableState.destroyed = false;
	          this._writableState.ended = false;
	          this._writableState.ending = false;
	          this._writableState.finished = false;
	          this._writableState.errorEmitted = false;
	        }
	      }

	      function a(e, t) {
	        e.emit("error", t);
	      }

	      t.exports = {
	        destroy: i,
	        undestroy: o
	      };
	    }, {
	      "process-nextick-args": 14
	    }],
	    24: [function (e, t, r) {
	      t.exports = e("events").EventEmitter;
	    }, {
	      events: 7
	    }],
	    25: [function (e, t, r) {
	      r = t.exports = e("./lib/_stream_readable.js");
	      r.Stream = r;
	      r.Readable = r;
	      r.Writable = e("./lib/_stream_writable.js");
	      r.Duplex = e("./lib/_stream_duplex.js");
	      r.Transform = e("./lib/_stream_transform.js");
	      r.PassThrough = e("./lib/_stream_passthrough.js");
	    }, {
	      "./lib/_stream_duplex.js": 17,
	      "./lib/_stream_passthrough.js": 18,
	      "./lib/_stream_readable.js": 19,
	      "./lib/_stream_transform.js": 20,
	      "./lib/_stream_writable.js": 21
	    }],
	    26: [function (e, t, r) {
	      var n = e("buffer");
	      var i = n.Buffer;

	      function o(e, t) {
	        for (var r in e) {
	          t[r] = e[r];
	        }
	      }

	      if (i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow) {
	        t.exports = n;
	      } else {
	        o(n, r);
	        r.Buffer = a;
	      }

	      function a(e, t, r) {
	        return i(e, t, r);
	      }

	      o(i, a);

	      a.from = function (e, t, r) {
	        if (typeof e === "number") {
	          throw new TypeError("Argument must not be a number");
	        }

	        return i(e, t, r);
	      };

	      a.alloc = function (e, t, r) {
	        if (typeof e !== "number") {
	          throw new TypeError("Argument must be a number");
	        }

	        var n = i(e);

	        if (t !== undefined) {
	          if (typeof r === "string") {
	            n.fill(t, r);
	          } else {
	            n.fill(t);
	          }
	        } else {
	          n.fill(0);
	        }

	        return n;
	      };

	      a.allocUnsafe = function (e) {
	        if (typeof e !== "number") {
	          throw new TypeError("Argument must be a number");
	        }

	        return i(e);
	      };

	      a.allocUnsafeSlow = function (e) {
	        if (typeof e !== "number") {
	          throw new TypeError("Argument must be a number");
	        }

	        return n.SlowBuffer(e);
	      };
	    }, {
	      buffer: 3
	    }],
	    27: [function (e, t, r) {

	      var n = e("safe-buffer").Buffer;

	      var i = n.isEncoding || function (e) {
	        e = "" + e;

	        switch (e && e.toLowerCase()) {
	          case "hex":
	          case "utf8":
	          case "utf-8":
	          case "ascii":
	          case "binary":
	          case "base64":
	          case "ucs2":
	          case "ucs-2":
	          case "utf16le":
	          case "utf-16le":
	          case "raw":
	            return true;

	          default:
	            return false;
	        }
	      };

	      function o(e) {
	        if (!e) return "utf8";
	        var t;

	        while (true) {
	          switch (e) {
	            case "utf8":
	            case "utf-8":
	              return "utf8";

	            case "ucs2":
	            case "ucs-2":
	            case "utf16le":
	            case "utf-16le":
	              return "utf16le";

	            case "latin1":
	            case "binary":
	              return "latin1";

	            case "base64":
	            case "ascii":
	            case "hex":
	              return e;

	            default:
	              if (t) return;
	              e = ("" + e).toLowerCase();
	              t = true;
	          }
	        }
	      }

	      function a(e) {
	        var t = o(e);
	        if (typeof t !== "string" && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
	        return t || e;
	      }

	      r.StringDecoder = s;

	      function s(e) {
	        this.encoding = a(e);
	        var t;

	        switch (this.encoding) {
	          case "utf16le":
	            this.text = p;
	            this.end = g;
	            t = 4;
	            break;

	          case "utf8":
	            this.fillLast = c;
	            t = 4;
	            break;

	          case "base64":
	            this.text = y;
	            this.end = v;
	            t = 3;
	            break;

	          default:
	            this.write = m;
	            this.end = b;
	            return;
	        }

	        this.lastNeed = 0;
	        this.lastTotal = 0;
	        this.lastChar = n.allocUnsafe(t);
	      }

	      s.prototype.write = function (e) {
	        if (e.length === 0) return "";
	        var t;
	        var r;

	        if (this.lastNeed) {
	          t = this.fillLast(e);
	          if (t === undefined) return "";
	          r = this.lastNeed;
	          this.lastNeed = 0;
	        } else {
	          r = 0;
	        }

	        if (r < e.length) return t ? t + this.text(e, r) : this.text(e, r);
	        return t || "";
	      };

	      s.prototype.end = d;
	      s.prototype.text = h;

	      s.prototype.fillLast = function (e) {
	        if (this.lastNeed <= e.length) {
	          e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	        }

	        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length);
	        this.lastNeed -= e.length;
	      };

	      function f(e) {
	        if (e <= 127) return 0;else if (e >> 5 === 6) return 2;else if (e >> 4 === 14) return 3;else if (e >> 3 === 30) return 4;
	        return -1;
	      }

	      function u(e, t, r) {
	        var n = t.length - 1;
	        if (n < r) return 0;
	        var i = f(t[n]);

	        if (i >= 0) {
	          if (i > 0) e.lastNeed = i - 1;
	          return i;
	        }

	        if (--n < r) return 0;
	        i = f(t[n]);

	        if (i >= 0) {
	          if (i > 0) e.lastNeed = i - 2;
	          return i;
	        }

	        if (--n < r) return 0;
	        i = f(t[n]);

	        if (i >= 0) {
	          if (i > 0) {
	            if (i === 2) i = 0;else e.lastNeed = i - 3;
	          }

	          return i;
	        }

	        return 0;
	      }

	      function l(e, t, r) {
	        if ((t[0] & 192) !== 128) {
	          e.lastNeed = 0;
	          return "�".repeat(r);
	        }

	        if (e.lastNeed > 1 && t.length > 1) {
	          if ((t[1] & 192) !== 128) {
	            e.lastNeed = 1;
	            return "�".repeat(r + 1);
	          }

	          if (e.lastNeed > 2 && t.length > 2) {
	            if ((t[2] & 192) !== 128) {
	              e.lastNeed = 2;
	              return "�".repeat(r + 2);
	            }
	          }
	        }
	      }

	      function c(e) {
	        var t = this.lastTotal - this.lastNeed;
	        var r = l(this, e, t);
	        if (r !== undefined) return r;

	        if (this.lastNeed <= e.length) {
	          e.copy(this.lastChar, t, 0, this.lastNeed);
	          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	        }

	        e.copy(this.lastChar, t, 0, e.length);
	        this.lastNeed -= e.length;
	      }

	      function h(e, t) {
	        var r = u(this, e, t);
	        if (!this.lastNeed) return e.toString("utf8", t);
	        this.lastTotal = r;
	        var n = e.length - (r - this.lastNeed);
	        e.copy(this.lastChar, 0, n);
	        return e.toString("utf8", t, n);
	      }

	      function d(e) {
	        var t = e && e.length ? this.write(e) : "";
	        if (this.lastNeed) return t + "�".repeat(this.lastTotal - this.lastNeed);
	        return t;
	      }

	      function p(e, t) {
	        if ((e.length - t) % 2 === 0) {
	          var r = e.toString("utf16le", t);

	          if (r) {
	            var n = r.charCodeAt(r.length - 1);

	            if (n >= 55296 && n <= 56319) {
	              this.lastNeed = 2;
	              this.lastTotal = 4;
	              this.lastChar[0] = e[e.length - 2];
	              this.lastChar[1] = e[e.length - 1];
	              return r.slice(0, -1);
	            }
	          }

	          return r;
	        }

	        this.lastNeed = 1;
	        this.lastTotal = 2;
	        this.lastChar[0] = e[e.length - 1];
	        return e.toString("utf16le", t, e.length - 1);
	      }

	      function g(e) {
	        var t = e && e.length ? this.write(e) : "";

	        if (this.lastNeed) {
	          var r = this.lastTotal - this.lastNeed;
	          return t + this.lastChar.toString("utf16le", 0, r);
	        }

	        return t;
	      }

	      function y(e, t) {
	        var r = (e.length - t) % 3;
	        if (r === 0) return e.toString("base64", t);
	        this.lastNeed = 3 - r;
	        this.lastTotal = 3;

	        if (r === 1) {
	          this.lastChar[0] = e[e.length - 1];
	        } else {
	          this.lastChar[0] = e[e.length - 2];
	          this.lastChar[1] = e[e.length - 1];
	        }

	        return e.toString("base64", t, e.length - r);
	      }

	      function v(e) {
	        var t = e && e.length ? this.write(e) : "";
	        if (this.lastNeed) return t + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
	        return t;
	      }

	      function m(e) {
	        return e.toString(this.encoding);
	      }

	      function b(e) {
	        return e && e.length ? this.write(e) : "";
	      }
	    }, {
	      "safe-buffer": 26
	    }],
	    28: [function (e, t, r) {
	      (function (e) {
	        t.exports = r;

	        function r(e, t) {
	          if (n("noDeprecation")) {
	            return e;
	          }

	          var r = false;

	          function i() {
	            if (!r) {
	              if (n("throwDeprecation")) {
	                throw new Error(t);
	              } else if (n("traceDeprecation")) {
	                console.trace(t);
	              } else {
	                console.warn(t);
	              }

	              r = true;
	            }

	            return e.apply(this, arguments);
	          }

	          return i;
	        }

	        function n(t) {
	          try {
	            if (!e.localStorage) return false;
	          } catch (e) {
	            return false;
	          }

	          var r = e.localStorage[t];
	          if (null == r) return false;
	          return String(r).toLowerCase() === "true";
	        }
	      }).call(this, typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	    }, {}],
	    "/": [function (e, t, r) {
	      (function (r) {
	        t.exports = u;
	        var n = e("debug")("simple-peer");
	        var i = e("get-browser-rtc");
	        var o = e("inherits");
	        var a = e("randombytes");
	        var s = e("readable-stream");
	        var f = 64 * 1024;
	        o(u, s.Duplex);

	        function u(e) {
	          var t = this;
	          if (!(t instanceof u)) return new u(e);
	          t._id = a(4).toString("hex").slice(0, 7);

	          t._debug("new peer %o", e);

	          e = Object.assign({
	            allowHalfOpen: false
	          }, e);
	          s.Duplex.call(t, e);
	          t.channelName = e.initiator ? e.channelName || a(20).toString("hex") : null;
	          t._isChromium = typeof window !== "undefined" && !!window.webkitRTCPeerConnection;
	          t.initiator = e.initiator || false;
	          t.channelConfig = e.channelConfig || u.channelConfig;
	          t.config = e.config || u.config;
	          t.constraints = t._transformConstraints(e.constraints || u.constraints);
	          t.offerConstraints = t._transformConstraints(e.offerConstraints || {});
	          t.answerConstraints = t._transformConstraints(e.answerConstraints || {});
	          t.reconnectTimer = e.reconnectTimer || false;

	          t.sdpTransform = e.sdpTransform || function (e) {
	            return e;
	          };

	          t.stream = e.stream || false;
	          t.trickle = e.trickle !== undefined ? e.trickle : true;
	          t.destroyed = false;
	          t.connected = false;
	          t.remoteAddress = undefined;
	          t.remoteFamily = undefined;
	          t.remotePort = undefined;
	          t.localAddress = undefined;
	          t.localPort = undefined;
	          t._wrtc = e.wrtc && typeof e.wrtc === "object" ? e.wrtc : i();

	          if (!t._wrtc) {
	            if (typeof window === "undefined") {
	              throw new Error("No WebRTC support: Specify `opts.wrtc` option in this environment");
	            } else {
	              throw new Error("No WebRTC support: Not a supported browser");
	            }
	          }

	          t._pcReady = false;
	          t._channelReady = false;
	          t._iceComplete = false;
	          t._channel = null;
	          t._pendingCandidates = [];
	          t._previousStreams = [];
	          t._chunk = null;
	          t._cb = null;
	          t._interval = null;
	          t._reconnectTimeout = null;
	          t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints);
	          t._isWrtc = Array.isArray(t._pc.RTCIceConnectionStates);
	          t._isReactNativeWebrtc = typeof t._pc._peerConnectionId === "number";

	          t._pc.oniceconnectionstatechange = function () {
	            t._onIceStateChange();
	          };

	          t._pc.onicegatheringstatechange = function () {
	            t._onIceStateChange();
	          };

	          t._pc.onsignalingstatechange = function () {
	            t._onSignalingStateChange();
	          };

	          t._pc.onicecandidate = function (e) {
	            t._onIceCandidate(e);
	          };

	          if (t.initiator) {
	            var r = false;

	            t._pc.onnegotiationneeded = function () {
	              if (!r) t._createOffer();
	              r = true;
	            };

	            t._setupData({
	              channel: t._pc.createDataChannel(t.channelName, t.channelConfig)
	            });
	          } else {
	            t._pc.ondatachannel = function (e) {
	              t._setupData(e);
	            };
	          }

	          if ("addTrack" in t._pc) {
	            if (t.stream) {
	              t.stream.getTracks().forEach(function (e) {
	                t._pc.addTrack(e, t.stream);
	              });
	            }

	            t._pc.ontrack = function (e) {
	              t._onTrack(e);
	            };
	          } else {
	            if (t.stream) t._pc.addStream(t.stream);

	            t._pc.onaddstream = function (e) {
	              t._onAddStream(e);
	            };
	          }

	          if (t.initiator && t._isWrtc) {
	            t._pc.onnegotiationneeded();
	          }

	          t._onFinishBound = function () {
	            t._onFinish();
	          };

	          t.once("finish", t._onFinishBound);
	        }

	        u.WEBRTC_SUPPORT = !!i();
	        u.config = {
	          iceServers: [{
	            urls: "stun:stun.l.google.com:19302"
	          }, {
	            urls: "stun:global.stun.twilio.com:3478?transport=udp"
	          }]
	        };
	        u.constraints = {};
	        u.channelConfig = {};
	        Object.defineProperty(u.prototype, "bufferSize", {
	          get: function () {
	            var e = this;
	            return e._channel && e._channel.bufferedAmount || 0;
	          }
	        });

	        u.prototype.address = function () {
	          var e = this;
	          return {
	            port: e.localPort,
	            family: "IPv4",
	            address: e.localAddress
	          };
	        };

	        u.prototype.signal = function (e) {
	          var t = this;
	          if (t.destroyed) throw new Error("cannot signal after peer is destroyed");

	          if (typeof e === "string") {
	            try {
	              e = JSON.parse(e);
	            } catch (t) {
	              e = {};
	            }
	          }

	          t._debug("signal()");

	          if (e.candidate) {
	            if (t._pc.remoteDescription && t._pc.remoteDescription.type) t._addIceCandidate(e.candidate);else t._pendingCandidates.push(e.candidate);
	          }

	          if (e.sdp) {
	            t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function () {
	              if (t.destroyed) return;

	              t._pendingCandidates.forEach(function (e) {
	                t._addIceCandidate(e);
	              });

	              t._pendingCandidates = [];
	              if (t._pc.remoteDescription.type === "offer") t._createAnswer();
	            }, function (e) {
	              t._destroy(e);
	            });
	          }

	          if (!e.sdp && !e.candidate) {
	            t._destroy(new Error("signal() called with invalid signal data"));
	          }
	        };

	        u.prototype._addIceCandidate = function (e) {
	          var t = this;

	          try {
	            t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), l, function (e) {
	              t._destroy(e);
	            });
	          } catch (e) {
	            t._destroy(new Error("error adding candidate: " + e.message));
	          }
	        };

	        u.prototype.send = function (e) {
	          var t = this;

	          t._channel.send(e);
	        };

	        u.prototype.destroy = function (e) {
	          var t = this;

	          t._destroy(null, e);
	        };

	        u.prototype._destroy = function (e, t) {
	          var r = this;
	          if (r.destroyed) return;
	          if (t) r.once("close", t);

	          r._debug("destroy (error: %s)", e && (e.message || e));

	          r.readable = r.writable = false;
	          if (!r._readableState.ended) r.push(null);
	          if (!r._writableState.finished) r.end();
	          r.destroyed = true;
	          r.connected = false;
	          r._pcReady = false;
	          r._channelReady = false;
	          r._previousStreams = null;
	          clearInterval(r._interval);
	          clearTimeout(r._reconnectTimeout);
	          r._interval = null;
	          r._reconnectTimeout = null;
	          r._chunk = null;
	          r._cb = null;
	          if (r._onFinishBound) r.removeListener("finish", r._onFinishBound);
	          r._onFinishBound = null;

	          if (r._pc) {
	            try {
	              r._pc.close();
	            } catch (e) {}

	            r._pc.oniceconnectionstatechange = null;
	            r._pc.onicegatheringstatechange = null;
	            r._pc.onsignalingstatechange = null;
	            r._pc.onicecandidate = null;

	            if ("addTrack" in r._pc) {
	              r._pc.ontrack = null;
	            } else {
	              r._pc.onaddstream = null;
	            }

	            r._pc.onnegotiationneeded = null;
	            r._pc.ondatachannel = null;
	          }

	          if (r._channel) {
	            try {
	              r._channel.close();
	            } catch (e) {}

	            r._channel.onmessage = null;
	            r._channel.onopen = null;
	            r._channel.onclose = null;
	            r._channel.onerror = null;
	          }

	          r._pc = null;
	          r._channel = null;
	          if (e) r.emit("error", e);
	          r.emit("close");
	        };

	        u.prototype._setupData = function (e) {
	          var t = this;

	          if (!e.channel) {
	            return t._destroy(new Error("Data channel event is missing `channel` property"));
	          }

	          t._channel = e.channel;
	          t._channel.binaryType = "arraybuffer";

	          if (typeof t._channel.bufferedAmountLowThreshold === "number") {
	            t._channel.bufferedAmountLowThreshold = f;
	          }

	          t.channelName = t._channel.label;

	          t._channel.onmessage = function (e) {
	            t._onChannelMessage(e);
	          };

	          t._channel.onbufferedamountlow = function () {
	            t._onChannelBufferedAmountLow();
	          };

	          t._channel.onopen = function () {
	            t._onChannelOpen();
	          };

	          t._channel.onclose = function () {
	            t._onChannelClose();
	          };

	          t._channel.onerror = function (e) {
	            t._destroy(e);
	          };
	        };

	        u.prototype._read = function () {};

	        u.prototype._write = function (e, t, r) {
	          var n = this;
	          if (n.destroyed) return r(new Error("cannot write after peer is destroyed"));

	          if (n.connected) {
	            try {
	              n.send(e);
	            } catch (e) {
	              return n._destroy(e);
	            }

	            if (n._channel.bufferedAmount > f) {
	              n._debug("start backpressure: bufferedAmount %d", n._channel.bufferedAmount);

	              n._cb = r;
	            } else {
	              r(null);
	            }
	          } else {
	            n._debug("write before connect");

	            n._chunk = e;
	            n._cb = r;
	          }
	        };

	        u.prototype._onFinish = function () {
	          var e = this;
	          if (e.destroyed) return;

	          if (e.connected) {
	            t();
	          } else {
	            e.once("connect", t);
	          }

	          function t() {
	            setTimeout(function () {
	              e._destroy();
	            }, 1e3);
	          }
	        };

	        u.prototype._createOffer = function () {
	          var e = this;
	          if (e.destroyed) return;

	          e._pc.createOffer(function (t) {
	            if (e.destroyed) return;
	            t.sdp = e.sdpTransform(t.sdp);

	            e._pc.setLocalDescription(t, r, n);

	            function r() {
	              if (e.destroyed) return;
	              if (e.trickle || e._iceComplete) i();else e.once("_iceComplete", i);
	            }

	            function n(t) {
	              e._destroy(t);
	            }

	            function i() {
	              var r = e._pc.localDescription || t;

	              e._debug("signal");

	              e.emit("signal", {
	                type: r.type,
	                sdp: r.sdp
	              });
	            }
	          }, function (t) {
	            e._destroy(t);
	          }, e.offerConstraints);
	        };

	        u.prototype._createAnswer = function () {
	          var e = this;
	          if (e.destroyed) return;

	          e._pc.createAnswer(function (t) {
	            if (e.destroyed) return;
	            t.sdp = e.sdpTransform(t.sdp);

	            e._pc.setLocalDescription(t, r, n);

	            function r() {
	              if (e.destroyed) return;
	              if (e.trickle || e._iceComplete) i();else e.once("_iceComplete", i);
	            }

	            function n(t) {
	              e._destroy(t);
	            }

	            function i() {
	              var r = e._pc.localDescription || t;

	              e._debug("signal");

	              e.emit("signal", {
	                type: r.type,
	                sdp: r.sdp
	              });
	            }
	          }, function (t) {
	            e._destroy(t);
	          }, e.answerConstraints);
	        };

	        u.prototype._onIceStateChange = function () {
	          var e = this;
	          if (e.destroyed) return;
	          var t = e._pc.iceConnectionState;
	          var r = e._pc.iceGatheringState;

	          e._debug("iceStateChange (connection: %s) (gathering: %s)", t, r);

	          e.emit("iceStateChange", t, r);

	          if (t === "connected" || t === "completed") {
	            clearTimeout(e._reconnectTimeout);
	            e._pcReady = true;

	            e._maybeReady();
	          }

	          if (t === "disconnected") {
	            if (e.reconnectTimer) {
	              clearTimeout(e._reconnectTimeout);
	              e._reconnectTimeout = setTimeout(function () {
	                e._destroy();
	              }, e.reconnectTimer);
	            } else {
	              e._destroy();
	            }
	          }

	          if (t === "failed") {
	            e._destroy(new Error("Ice connection failed."));
	          }

	          if (t === "closed") {
	            e._destroy();
	          }
	        };

	        u.prototype.getStats = function (e) {
	          var t = this;

	          if (t._pc.getStats.length === 0) {
	            t._pc.getStats().then(function (t) {
	              var r = [];
	              t.forEach(function (e) {
	                r.push(e);
	              });
	              e(null, r);
	            }, function (t) {
	              e(t);
	            });
	          } else if (t._isReactNativeWebrtc) {
	            t._pc.getStats(null, function (t) {
	              var r = [];
	              t.forEach(function (e) {
	                r.push(e);
	              });
	              e(null, r);
	            }, function (t) {
	              e(t);
	            });
	          } else if (t._pc.getStats.length > 0) {
	            t._pc.getStats(function (r) {
	              if (t.destroyed) return;
	              var n = [];
	              r.result().forEach(function (e) {
	                var t = {};
	                e.names().forEach(function (r) {
	                  t[r] = e.stat(r);
	                });
	                t.id = e.id;
	                t.type = e.type;
	                t.timestamp = e.timestamp;
	                n.push(t);
	              });
	              e(null, n);
	            }, function (t) {
	              e(t);
	            });
	          } else {
	            e(null, []);
	          }
	        };

	        u.prototype._maybeReady = function () {
	          var e = this;

	          e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady);

	          if (e.connected || e._connecting || !e._pcReady || !e._channelReady) return;
	          e._connecting = true;

	          function t() {
	            if (e.destroyed) return;
	            e.getStats(function (r, n) {
	              if (e.destroyed) return;
	              if (r) n = [];
	              var i = {};
	              var o = {};
	              var a = {};
	              var s = false;
	              n.forEach(function (e) {
	                if (e.type === "remotecandidate" || e.type === "remote-candidate") {
	                  i[e.id] = e;
	                }

	                if (e.type === "localcandidate" || e.type === "local-candidate") {
	                  o[e.id] = e;
	                }

	                if (e.type === "candidatepair" || e.type === "candidate-pair") {
	                  a[e.id] = e;
	                }
	              });
	              n.forEach(function (e) {
	                if (e.type === "transport") {
	                  f(a[e.selectedCandidatePairId]);
	                }

	                if (e.type === "googCandidatePair" && e.googActiveConnection === "true" || (e.type === "candidatepair" || e.type === "candidate-pair") && e.selected) {
	                  f(e);
	                }
	              });

	              function f(t) {
	                s = true;
	                var r = o[t.localCandidateId];

	                if (r && r.ip) {
	                  e.localAddress = r.ip;
	                  e.localPort = Number(r.port);
	                } else if (r && r.ipAddress) {
	                  e.localAddress = r.ipAddress;
	                  e.localPort = Number(r.portNumber);
	                } else if (typeof t.googLocalAddress === "string") {
	                  r = t.googLocalAddress.split(":");
	                  e.localAddress = r[0];
	                  e.localPort = Number(r[1]);
	                }

	                var n = i[t.remoteCandidateId];

	                if (n && n.ip) {
	                  e.remoteAddress = n.ip;
	                  e.remotePort = Number(n.port);
	                } else if (n && n.ipAddress) {
	                  e.remoteAddress = n.ipAddress;
	                  e.remotePort = Number(n.portNumber);
	                } else if (typeof t.googRemoteAddress === "string") {
	                  n = t.googRemoteAddress.split(":");
	                  e.remoteAddress = n[0];
	                  e.remotePort = Number(n[1]);
	                }

	                e.remoteFamily = "IPv4";

	                e._debug("connect local: %s:%s remote: %s:%s", e.localAddress, e.localPort, e.remoteAddress, e.remotePort);
	              }

	              if (!s && (!Object.keys(a).length || Object.keys(o).length)) {
	                setTimeout(t, 100);
	                return;
	              } else {
	                e._connecting = false;
	                e.connected = true;
	              }

	              if (e._chunk) {
	                try {
	                  e.send(e._chunk);
	                } catch (r) {
	                  return e._destroy(r);
	                }

	                e._chunk = null;

	                e._debug('sent chunk from "write before connect"');

	                var u = e._cb;
	                e._cb = null;
	                u(null);
	              }

	              if (typeof e._channel.bufferedAmountLowThreshold !== "number") {
	                e._interval = setInterval(function () {
	                  e._onInterval();
	                }, 150);
	                if (e._interval.unref) e._interval.unref();
	              }

	              e._debug("connect");

	              e.emit("connect");
	            });
	          }

	          t();
	        };

	        u.prototype._onInterval = function () {
	          if (!this._cb || !this._channel || this._channel.bufferedAmount > f) {
	            return;
	          }

	          this._onChannelBufferedAmountLow();
	        };

	        u.prototype._onSignalingStateChange = function () {
	          var e = this;
	          if (e.destroyed) return;

	          e._debug("signalingStateChange %s", e._pc.signalingState);

	          e.emit("signalingStateChange", e._pc.signalingState);
	        };

	        u.prototype._onIceCandidate = function (e) {
	          var t = this;
	          if (t.destroyed) return;

	          if (e.candidate && t.trickle) {
	            t.emit("signal", {
	              candidate: {
	                candidate: e.candidate.candidate,
	                sdpMLineIndex: e.candidate.sdpMLineIndex,
	                sdpMid: e.candidate.sdpMid
	              }
	            });
	          } else if (!e.candidate) {
	            t._iceComplete = true;
	            t.emit("_iceComplete");
	          }
	        };

	        u.prototype._onChannelMessage = function (e) {
	          var t = this;
	          if (t.destroyed) return;
	          var n = e.data;
	          if (n instanceof ArrayBuffer) n = r.from(n);
	          t.push(n);
	        };

	        u.prototype._onChannelBufferedAmountLow = function () {
	          var e = this;
	          if (e.destroyed || !e._cb) return;

	          e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);

	          var t = e._cb;
	          e._cb = null;
	          t(null);
	        };

	        u.prototype._onChannelOpen = function () {
	          var e = this;
	          if (e.connected || e.destroyed) return;

	          e._debug("on channel open");

	          e._channelReady = true;

	          e._maybeReady();
	        };

	        u.prototype._onChannelClose = function () {
	          var e = this;
	          if (e.destroyed) return;

	          e._debug("on channel close");

	          e._destroy();
	        };

	        u.prototype._onAddStream = function (e) {
	          var t = this;
	          if (t.destroyed) return;

	          t._debug("on add stream");

	          t.emit("stream", e.stream);
	        };

	        u.prototype._onTrack = function (e) {
	          var t = this;
	          if (t.destroyed) return;

	          t._debug("on track");

	          var r = e.streams[0].id;
	          if (t._previousStreams.indexOf(r) !== -1) return;

	          t._previousStreams.push(r);

	          t.emit("stream", e.streams[0]);
	        };

	        u.prototype._debug = function () {
	          var e = this;
	          var t = [].slice.call(arguments);
	          t[0] = "[" + e._id + "] " + t[0];
	          n.apply(null, t);
	        };

	        u.prototype._transformConstraints = function (e) {
	          var t = this;

	          if (Object.keys(e).length === 0) {
	            return e;
	          }

	          if ((e.mandatory || e.optional) && !t._isChromium) {
	            var r = Object.assign({}, e.optional, e.mandatory);

	            if (r.OfferToReceiveVideo !== undefined) {
	              r.offerToReceiveVideo = r.OfferToReceiveVideo;
	              delete r["OfferToReceiveVideo"];
	            }

	            if (r.OfferToReceiveAudio !== undefined) {
	              r.offerToReceiveAudio = r.OfferToReceiveAudio;
	              delete r["OfferToReceiveAudio"];
	            }

	            return r;
	          } else if (!e.mandatory && !e.optional && t._isChromium) {
	            if (e.offerToReceiveVideo !== undefined) {
	              e.OfferToReceiveVideo = e.offerToReceiveVideo;
	              delete e["offerToReceiveVideo"];
	            }

	            if (e.offerToReceiveAudio !== undefined) {
	              e.OfferToReceiveAudio = e.offerToReceiveAudio;
	              delete e["offerToReceiveAudio"];
	            }

	            return {
	              mandatory: e
	            };
	          }

	          return e;
	        };

	        function l() {}
	      }).call(this, e("buffer").Buffer);
	    }, {
	      buffer: 3,
	      debug: 5,
	      "get-browser-rtc": 8,
	      inherits: 10,
	      randombytes: 16,
	      "readable-stream": 25
	    }]
	  }, {}, [])("/");
	});

	$(document).ready(async function () {
	  let peer;
	  let initiator;
	  let joinRequest;
	  let stream;

	  try {
	    stream = await navigator.mediaDevices.getUserMedia({
	      audio: true,
	      video: true
	    });
	  } catch (err) {
	    alert("Getting Audio/Video failed.");
	    console.log("getting user stream failed");
	    throw err;
	  }

	  console.log("got a stream", stream);
	  const localVideo = document.querySelector("#localVideo");
	  localVideo.srcObject = stream;

	  localVideo.onloadedmetadata = function (e) {
	    localVideo.play();
	  };

	  const room = prompt("Type a room name");

	  while (jquery.exports.trim(room) === "") room = prompt("Type a room name");

	  const socket = io();
	  socket.on("connect", function () {
	    console.log("Connected to Server!");
	    joinRequest = true;
	    socket.emit("create or join", room);
	  });
	  socket.on("roomMessage", function (roomMessage) {
	    console.log(`Server sent room message : ${roomMessage.room} - ${roomMessage.data}`);
	    peer.signal(roomMessage.data);
	  });
	  socket.on("joined room", function (joinMessage) {
	    console.log(JSON.stringify(joinMessage));
	    joinRequest = false;
	    initiator = joinMessage.initiator;
	    console.log("initiator value is " + initiator);
	    if (initiator === false) createPeer({
	      stream: stream
	    });
	  });
	  socket.on("newcomer", function (message) {
	    console.log(`A newcomer of the room sent ${message}`);
	    if (initiator === true) createPeer({
	      initiator: true,
	      stream: stream
	    });
	  });
	  socket.on("errorMessage", function (message) {
	    if (joinRequest === true) {
	      alert(`Sorry. Room ${room} is full. Click OK to try another room.`);
	      joinNewRoom();
	    }

	    console.log("Server sent error message : " + JSON.stringify(message));
	  });

	  function joinNewRoom() {
	    room = prompt("Type a room name");

	    while (jquery.exports.trim(room) === "") room = prompt("Type a room name");

	    joinRequest = true;
	    socket.emit("create or join", room);
	  }

	  function createPeer(opts) {
	    console.log("Peer was created with opts " + JSON.stringify(opts));
	    peer = new SimplePeer(opts);
	    peer.on("signal", function (data) {
	      const roomMessage = {
	        room: room,
	        data: data
	      };
	      socket.emit("roomMessage", roomMessage);
	    });
	    peer.on("stream", function (stream) {
	      console.log("Streaming Remote Video!");
	      const remoteVideo = document.querySelector("#remoteVideo");
	      remoteVideo.srcObject = stream;

	      remoteVideo.onloadedmetadata = function (e) {
	        remoteVideo.play();
	      };
	    });
	    peer.on("close", function () {
	      if (initiator === false) initiator = true;
	      console.log("Peer closed");
	      peer.destroy();
	      peer = null;
	    });
	    peer.on("error", function (error) {
	      alert("Sorry. Somme fatal error occured.");
	      console.log("Some fatal error occured : " + error);
	    });
	  }
	});

})();
