(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */


	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty$f = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
	  if (val === null || val === undefined) {
	    throw new TypeError('Object.assign cannot be called with null or undefined');
	  }

	  return Object(val);
	}

	function shouldUseNative() {
	  try {
	    if (!Object.assign) {
	      return false;
	    } // Detect buggy property enumeration order in older V8 versions.
	    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


	    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

	    test1[5] = 'de';

	    if (Object.getOwnPropertyNames(test1)[0] === '5') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test2 = {};

	    for (var i = 0; i < 10; i++) {
	      test2['_' + String.fromCharCode(i)] = i;
	    }

	    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
	      return test2[n];
	    });

	    if (order2.join('') !== '0123456789') {
	      return false;
	    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


	    var test3 = {};
	    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
	      test3[letter] = letter;
	    });

	    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
	      return false;
	    }

	    return true;
	  } catch (err) {
	    // We don't expect any of the above to throw, but better to be safe.
	    return false;
	  }
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	  var from;
	  var to = toObject(target);
	  var symbols;

	  for (var s = 1; s < arguments.length; s++) {
	    from = Object(arguments[s]);

	    for (var key in from) {
	      if (hasOwnProperty$f.call(from, key)) {
	        to[key] = from[key];
	      }
	    }

	    if (getOwnPropertySymbols) {
	      symbols = getOwnPropertySymbols(from);

	      for (var i = 0; i < symbols.length; i++) {
	        if (propIsEnumerable.call(from, symbols[i])) {
	          to[symbols[i]] = from[symbols[i]];
	        }
	      }
	    }
	  }

	  return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */


	function reactProdInvariant$1(code) {
	  var argCount = arguments.length - 1;
	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';
	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	var reactProdInvariant_1$1 = reactProdInvariant$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */


	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */


	var emptyFunction$7 = function emptyFunction() {};

	emptyFunction$7.thatReturns = makeEmptyFunction;
	emptyFunction$7.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction$7.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction$7.thatReturnsNull = makeEmptyFunction(null);

	emptyFunction$7.thatReturnsThis = function () {
	  return this;
	};

	emptyFunction$7.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction$7;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * This is the abstract API for an update queue.
	 */


	var ReactNoopUpdateQueue$3 = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	  }
	};
	var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyObject$4 = {};

	var emptyObject_1 = emptyObject$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	function invariant$4(condition, format, a, b, c, d, e, f) {

	  if (!condition) {
	    var error;

	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame

	    throw error;
	  }
	}

	var invariant_1 = invariant$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$w = reactProdInvariant_1$1,
	    _assign$k = objectAssign;
	var ReactNoopUpdateQueue$2 = ReactNoopUpdateQueue_1;
	var emptyObject$3 = emptyObject_1;
	/**
	 * Base class helpers for the updating state of a component.
	 */

	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject$3; // We initialize the default updater but the real one gets injected by the
	  // renderer.

	  this.updater = updater || ReactNoopUpdateQueue$2;
	}

	ReactComponent.prototype.isReactComponent = {};
	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */

	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? _prodInvariant$w('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);

	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};
	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */


	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);

	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};
	/**
	 * Base class helpers for the updating state of a component.
	 */


	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject$3; // We initialize the default updater but the real one gets injected by the
	  // renderer.

	  this.updater = updater || ReactNoopUpdateQueue$2;
	}

	function ComponentDummy() {}

	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent; // Avoid an extra prototype jump for these methods.

	_assign$k(ReactPureComponent.prototype, ReactComponent.prototype);

	ReactPureComponent.prototype.isPureReactComponent = true;
	var ReactBaseClasses$1 = {
	  Component: ReactComponent,
	  PureComponent: ReactPureComponent
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$v = reactProdInvariant_1$1;
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */

	var oneArgumentPooler$1 = function (copyFieldsFrom) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler$2 = function (a1, a2) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler$1 = function (a1, a2, a3) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler$2 = function (a1, a2, a3, a4) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var standardReleaser$1 = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? _prodInvariant$v('25') : void 0;
	  instance.destructor();

	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE$1 = 10;
	var DEFAULT_POOLER$1 = oneArgumentPooler$1;
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */

	var addPoolingTo$1 = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER$1;

	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE$1;
	  }

	  NewKlass.release = standardReleaser$1;
	  return NewKlass;
	};

	var PooledClass$9 = {
	  addPoolingTo: addPoolingTo$1,
	  oneArgumentPooler: oneArgumentPooler$1,
	  twoArgumentPooler: twoArgumentPooler$2,
	  threeArgumentPooler: threeArgumentPooler$1,
	  fourArgumentPooler: fourArgumentPooler$2
	};
	var PooledClass_1$1 = PooledClass$9;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */


	var ReactCurrentOwner$2 = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};
	var ReactCurrentOwner_1 = ReactCurrentOwner$2;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	// nor polyfill, then a plain number is used for performance.


	var REACT_ELEMENT_TYPE$4 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
	var ReactElementSymbol$1 = REACT_ELEMENT_TYPE$4;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$j = objectAssign;
	var ReactCurrentOwner$1 = ReactCurrentOwner_1;
	var hasOwnProperty$e = Object.prototype.hasOwnProperty;
	var REACT_ELEMENT_TYPE$3 = ReactElementSymbol$1;
	var RESERVED_PROPS$1 = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	function hasValidRef(config) {

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {

	  return config.key !== undefined;
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */


	var ReactElement$4 = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE$3,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  return element;
	};
	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */


	ReactElement$4.createElement = function (type, config, children) {
	  var propName; // Reserved names are extracted

	  var props = {};
	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }

	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

	    for (propName in config) {
	      if (hasOwnProperty$e.call(config, propName) && !RESERVED_PROPS$1.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  } // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.


	  var childrenLength = arguments.length - 2;

	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);

	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }

	    props.children = childArray;
	  } // Resolve default props


	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;

	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return ReactElement$4(type, key, ref, self, source, ReactCurrentOwner$1.current, props);
	};
	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */


	ReactElement$4.createFactory = function (type) {
	  var factory = ReactElement$4.createElement.bind(null, type); // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed

	  factory.type = type;
	  return factory;
	};

	ReactElement$4.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement$4(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
	  return newElement;
	};
	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */


	ReactElement$4.cloneElement = function (element, config, children) {
	  var propName; // Original props are copied

	  var props = _assign$j({}, element.props); // Reserved names are extracted


	  var key = element.key;
	  var ref = element.ref; // Self is preserved since the owner is preserved.

	  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.

	  var source = element._source; // Owner will be preserved, unless ref is overridden

	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner$1.current;
	    }

	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    } // Remaining properties override existing props


	    var defaultProps;

	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }

	    for (propName in config) {
	      if (hasOwnProperty$e.call(config, propName) && !RESERVED_PROPS$1.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  } // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.


	  var childrenLength = arguments.length - 2;

	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);

	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }

	    props.children = childArray;
	  }

	  return ReactElement$4(element.type, key, ref, self, source, owner, props);
	};
	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */


	ReactElement$4.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$3;
	};

	var ReactElement_1 = ReactElement$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/* global Symbol */


	var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */

	function getIteratorFn$3(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL$1 && maybeIterable[ITERATOR_SYMBOL$1] || maybeIterable[FAUX_ITERATOR_SYMBOL$1]);

	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	var getIteratorFn_1$1 = getIteratorFn$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */


	function escape$1(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	  return '$' + escapedString;
	}
	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */


	function unescape$1(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);
	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils$3 = {
	  escape: escape$1,
	  unescape: unescape$1
	};
	var KeyEscapeUtils_1$1 = KeyEscapeUtils$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$u = reactProdInvariant_1$1;
	var REACT_ELEMENT_TYPE$2 = ReactElementSymbol$1;
	var getIteratorFn$2 = getIteratorFn_1$1;
	var KeyEscapeUtils$2 = KeyEscapeUtils_1$1;
	var SEPARATOR$1 = '.';
	var SUBSEPARATOR$1 = ':';
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */

	function getComponentKey$1(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils$2.escape(component.key);
	  } // Implicit key determined by the index in the set


	  return index.toString(36);
	}
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */


	function traverseAllChildrenImpl$1(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE$2) {
	    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR$1 + getComponentKey$1(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.

	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR$1 : nameSoFar + SUBSEPARATOR$1;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey$1(child, i);
	      subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn$2(children);

	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;

	      if (iteratorFn !== children.entries) {
	        var ii = 0;

	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey$1(child, ii++);
	          subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
	        }
	      } else {


	        while (!(step = iterator.next()).done) {
	          var entry = step.value;

	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils$2.escape(entry[0]) + SUBSEPARATOR$1 + getComponentKey$1(child, 0);
	            subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';

	      var childrenString = String(children);
	      _prodInvariant$u('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) ;
	    }
	  }

	  return subtreeCount;
	}
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */


	function traverseAllChildren$4(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl$1(children, '', callback, traverseContext);
	}

	var traverseAllChildren_1$1 = traverseAllChildren$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var PooledClass$8 = PooledClass_1$1;
	var ReactElement$3 = ReactElement_1;
	var emptyFunction$6 = emptyFunction_1;
	var traverseAllChildren$3 = traverseAllChildren_1$1;
	var twoArgumentPooler$1 = PooledClass$8.twoArgumentPooler;
	var fourArgumentPooler$1 = PooledClass$8.fourArgumentPooler;
	var userProvidedKeyEscapeRegex = /\/+/g;

	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */


	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}

	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};

	PooledClass$8.addPoolingTo(ForEachBookKeeping, twoArgumentPooler$1);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;
	  func.call(context, child, bookKeeping.count++);
	}
	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */


	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }

	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren$3(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */


	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}

	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};

	PooledClass$8.addPoolingTo(MapBookKeeping, fourArgumentPooler$1);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;
	  var mappedChild = func.call(context, child, bookKeeping.count++);

	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction$6.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement$3.isValidElement(mappedChild)) {
	      mappedChild = ReactElement$3.cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }

	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';

	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }

	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren$3(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}
	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */


	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }

	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */


	function countChildren(children, context) {
	  return traverseAllChildren$3(children, forEachSingleChildDummy, null);
	}
	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */


	function toArray$2(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction$6.thatReturnsArgument);
	  return result;
	}

	var ReactChildren$1 = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray$2
	};
	var ReactChildren_1 = ReactChildren$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactElement$2 = ReactElement_1;
	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */

	var createDOMFactory = ReactElement$2.createFactory;
	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 *
	 * @public
	 */


	var ReactDOMFactories$1 = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),
	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};
	var ReactDOMFactories_1 = ReactDOMFactories$1;

	var reactIs = {exports: {}};

	var reactIs_production_min = {};

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var b = "function" === typeof Symbol && Symbol.for,
	    c = b ? Symbol.for("react.element") : 60103,
	    d = b ? Symbol.for("react.portal") : 60106,
	    e = b ? Symbol.for("react.fragment") : 60107,
	    f = b ? Symbol.for("react.strict_mode") : 60108,
	    g = b ? Symbol.for("react.profiler") : 60114,
	    h = b ? Symbol.for("react.provider") : 60109,
	    k = b ? Symbol.for("react.context") : 60110,
	    l = b ? Symbol.for("react.async_mode") : 60111,
	    m = b ? Symbol.for("react.concurrent_mode") : 60111,
	    n = b ? Symbol.for("react.forward_ref") : 60112,
	    p = b ? Symbol.for("react.suspense") : 60113,
	    q = b ? Symbol.for("react.suspense_list") : 60120,
	    r = b ? Symbol.for("react.memo") : 60115,
	    t = b ? Symbol.for("react.lazy") : 60116,
	    v = b ? Symbol.for("react.block") : 60121,
	    w = b ? Symbol.for("react.fundamental") : 60117,
	    x = b ? Symbol.for("react.responder") : 60118,
	    y = b ? Symbol.for("react.scope") : 60119;

	function z(a) {
	  if ("object" === typeof a && null !== a) {
	    var u = a.$$typeof;

	    switch (u) {
	      case c:
	        switch (a = a.type, a) {
	          case l:
	          case m:
	          case e:
	          case g:
	          case f:
	          case p:
	            return a;

	          default:
	            switch (a = a && a.$$typeof, a) {
	              case k:
	              case n:
	              case t:
	              case r:
	              case h:
	                return a;

	              default:
	                return u;
	            }

	        }

	      case d:
	        return u;
	    }
	  }
	}

	function A(a) {
	  return z(a) === m;
	}

	reactIs_production_min.AsyncMode = l;
	reactIs_production_min.ConcurrentMode = m;
	reactIs_production_min.ContextConsumer = k;
	reactIs_production_min.ContextProvider = h;
	reactIs_production_min.Element = c;
	reactIs_production_min.ForwardRef = n;
	reactIs_production_min.Fragment = e;
	reactIs_production_min.Lazy = t;
	reactIs_production_min.Memo = r;
	reactIs_production_min.Portal = d;
	reactIs_production_min.Profiler = g;
	reactIs_production_min.StrictMode = f;
	reactIs_production_min.Suspense = p;

	reactIs_production_min.isAsyncMode = function (a) {
	  return A(a) || z(a) === l;
	};

	reactIs_production_min.isConcurrentMode = A;

	reactIs_production_min.isContextConsumer = function (a) {
	  return z(a) === k;
	};

	reactIs_production_min.isContextProvider = function (a) {
	  return z(a) === h;
	};

	reactIs_production_min.isElement = function (a) {
	  return "object" === typeof a && null !== a && a.$$typeof === c;
	};

	reactIs_production_min.isForwardRef = function (a) {
	  return z(a) === n;
	};

	reactIs_production_min.isFragment = function (a) {
	  return z(a) === e;
	};

	reactIs_production_min.isLazy = function (a) {
	  return z(a) === t;
	};

	reactIs_production_min.isMemo = function (a) {
	  return z(a) === r;
	};

	reactIs_production_min.isPortal = function (a) {
	  return z(a) === d;
	};

	reactIs_production_min.isProfiler = function (a) {
	  return z(a) === g;
	};

	reactIs_production_min.isStrictMode = function (a) {
	  return z(a) === f;
	};

	reactIs_production_min.isSuspense = function (a) {
	  return z(a) === p;
	};

	reactIs_production_min.isValidElementType = function (a) {
	  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
	};

	reactIs_production_min.typeOf = z;

	{
	  reactIs.exports = reactIs_production_min;
	}

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret$4 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	var ReactPropTypesSecret_1$1 = ReactPropTypesSecret$4;

	var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */


	function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
	}
	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */


	checkPropTypes$1.resetWarningCache = function () {
	};

	var checkPropTypes_1 = checkPropTypes$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactIs = reactIs.exports;
	var assign$2 = objectAssign;
	var ReactPropTypesSecret$3 = ReactPropTypesSecret_1$1;
	var has = has$1;
	var checkPropTypes = checkPropTypes_1;

	var printWarning = function () {};

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */

	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */


	  var ANONYMOUS = '<<anonymous>>'; // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bigint: createPrimitiveTypeChecker('bigint'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */

	  /*eslint-disable no-self-compare*/

	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */


	  function PropTypeError(message, data) {
	    this.message = message;
	    this.data = data && typeof data === 'object' ? data : {};
	    this.stack = '';
	  } // Make `instanceof Error` still work for returned errors.


	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {

	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret$3) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	          err.name = 'Invariant Violation';
	          throw err;
	        }
	      }

	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }

	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }

	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
	          expectedType: expectedType
	        });
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }

	      var propValue = props[propName];

	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }

	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$3);

	        if (error instanceof Error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {

	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];

	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);

	        if (type === 'symbol') {
	          return String(value);
	        }

	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }

	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }

	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$3);

	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];

	      if (typeof checker !== 'function') {
	        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var expectedTypes = [];

	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$3);

	        if (checkerResult == null) {
	          return null;
	        }

	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
	          expectedTypes.push(checkerResult.data.expectedType);
	        }
	      }

	      var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function invalidValidatorError(componentName, location, propFullName, key, type) {
	    return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }

	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];

	        if (typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }

	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$3);

	        if (error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);

	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      } // We need to check all keys in case some are required but missing from props.


	      var allKeys = assign$2({}, props[propName], shapeTypes);

	      for (var key in allKeys) {
	        var checker = shapeTypes[key];

	        if (has(shapeTypes, key) && typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }

	        if (!checker) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	        }

	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$3);

	        if (error) {
	          return error;
	        }
	      }

	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;

	      case 'boolean':
	        return !propValue;

	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }

	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);

	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;

	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;

	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;

	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    } // falsy value can't be a Symbol


	    if (!propValue) {
	      return false;
	    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    } // Fallback for non-spec compliant Symbols which are polyfilled.


	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  } // Equivalent of `typeof` but with special handling for array and regexp.


	  function getPropType(propValue) {
	    var propType = typeof propValue;

	    if (Array.isArray(propValue)) {
	      return 'array';
	    }

	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }

	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }

	    return propType;
	  } // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.


	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }

	    var propType = getPropType(propValue);

	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }

	    return propType;
	  } // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"


	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);

	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;

	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;

	      default:
	        return type;
	    }
	  } // Returns class name of the object, if any.


	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }

	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	  return ReactPropTypes;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	// Therefore we re-export development-only version with all the PropTypes checks here.
	// However if one is migrating to the `prop-types` npm library, they will go through the
	// `index.js` entry point, and it will branch depending on the environment.


	var factory$4 = factoryWithTypeCheckers;

	var factory_1$1 = function (isValidElement) {
	  // It is still allowed in 15.5.
	  var throwOnDirectAccess = false;
	  return factory$4(isValidElement, throwOnDirectAccess);
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _require$1 = ReactElement_1,
	    isValidElement$1 = _require$1.isValidElement;
	var factory$3 = factory_1$1;
	var ReactPropTypes$1 = factory$3(isValidElement$1);

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactVersion$3 = '15.7.0';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$i = objectAssign; // -- Inlined from fbjs --

	var emptyObject$2 = {};

	function _invariant(condition, format, a, b, c, d, e, f) {

	  if (!condition) {
	    var error;

	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame

	    throw error;
	  }
	}


	var MIXINS_KEY = 'mixins'; // Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.

	function identity$3(fn) {
	  return fn;
	}

	function factory$2(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */
	  var injectedMixins = [];
	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */

	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',
	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',
	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',
	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };
	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */

	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };
	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */

	  var RESERVED_SPEC_KEYS = {
	    displayName: function (Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function (Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function (Constructor, childContextTypes) {

	      Constructor.childContextTypes = _assign$i({}, Constructor.childContextTypes, childContextTypes);
	    },
	    contextTypes: function (Constructor, contextTypes) {

	      Constructor.contextTypes = _assign$i({}, Constructor.contextTypes, contextTypes);
	    },

	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function (Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function (Constructor, propTypes) {

	      Constructor.propTypes = _assign$i({}, Constructor.propTypes, propTypes);
	    },
	    statics: function (Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function () {}
	  };

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null; // Disallow overriding of base class methods unless explicitly allowed.

	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
	    } // Disallow defining methods more than once unless explicitly allowed.


	    if (isAlreadyDefined) {
	      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
	    }
	  }
	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */


	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {

	      return;
	    }

	    _invariant(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');

	    _invariant(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs; // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.

	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name]; // These cases should already be caught by validateMethodOverride.

	            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name); // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.


	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }

	    for (var name in statics) {
	      var property = statics[name];

	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = (name in RESERVED_SPEC_KEYS);

	      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

	      var isAlreadyDefined = (name in Constructor);

	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name) ? ReactClassStaticInterface[name] : null;

	        _invariant(specPolicy === 'DEFINE_MANY_MERGED', 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);

	        Constructor[name] = createMergedResultFunction(Constructor[name], property);
	        return;
	      }

	      Constructor[name] = property;
	    }
	  }
	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */


	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);

	        one[key] = two[key];
	      }
	    }

	    return one;
	  }
	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */


	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);

	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }

	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }
	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */


	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }
	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */


	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);

	    return boundMethod;
	  }
	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */


	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;

	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function () {
	      this.__isMounted = true;
	    }
	  };
	  var IsMountedPostMixin = {
	    componentWillUnmount: function () {
	      this.__isMounted = false;
	    }
	  };
	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */

	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function (newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function () {

	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function () {};

	  _assign$i(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */


	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity$3(function (props, context, updater) {


	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject$2;
	      this.updater = updater || ReactNoopUpdateQueue;
	      this.state = null; // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;

	      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin); // Initialize the defaultProps property after all mixins have been merged.

	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');


	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	var factory_1 = factory$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _require = ReactBaseClasses$1,
	    Component = _require.Component;
	var _require2 = ReactElement_1,
	    isValidElement = _require2.isValidElement;
	var ReactNoopUpdateQueue$1 = ReactNoopUpdateQueue_1;
	var factory$1 = factory_1;
	var createClass = factory$1(Component, isValidElement, ReactNoopUpdateQueue$1);

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$t = reactProdInvariant_1$1;
	var ReactElement$1 = ReactElement_1;
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */

	function onlyChild$1(children) {
	  !ReactElement$1.isValidElement(children) ? _prodInvariant$t('143') : void 0;
	  return children;
	}

	var onlyChild_1 = onlyChild$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$h = objectAssign;
	var ReactBaseClasses = ReactBaseClasses$1;
	var ReactChildren = ReactChildren_1;
	var ReactDOMFactories = ReactDOMFactories_1;
	var ReactElement = ReactElement_1;
	var ReactPropTypes = ReactPropTypes$1;
	var ReactVersion$2 = ReactVersion$3;
	var createReactClass$2 = createClass;
	var onlyChild = onlyChild_1;
	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	var __spread = _assign$h;

	var createMixin = function (mixin) {
	  return mixin;
	};

	var React$7 = {
	  // Modern
	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },
	  Component: ReactBaseClasses.Component,
	  PureComponent: ReactBaseClasses.PureComponent,
	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,
	  // Classic
	  PropTypes: ReactPropTypes,
	  createClass: createReactClass$2,
	  createFactory: createFactory,
	  createMixin: createMixin,
	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,
	  version: ReactVersion$2,
	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	var React_1 = React$7;

	var react = React_1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */


	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;
	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';
	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	var reactProdInvariant_1 = reactProdInvariant;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$s = reactProdInvariant_1;

	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_PROPERTY: 0x1,
	  HAS_BOOLEAN_VALUE: 0x4,
	  HAS_NUMERIC_VALUE: 0x8,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
	   * attribute namespace URL. (Attribute names not specified use no namespace.)
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function (domPropertyConfig) {
	    var Injection = DOMPropertyInjection;
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty$6._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
	    }

	    for (var propName in Properties) {
	      !!DOMProperty$6.properties.hasOwnProperty(propName) ? _prodInvariant$s('48', propName) : void 0;
	      var lowerCased = propName.toLowerCase();
	      var propConfig = Properties[propName];
	      var propertyInfo = {
	        attributeName: lowerCased,
	        attributeNamespace: null,
	        propertyName: propName,
	        mutationMethod: null,
	        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
	        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
	        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
	        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
	        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
	      };
	      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? _prodInvariant$s('50', propName) : void 0;

	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        propertyInfo.attributeName = attributeName;
	      }

	      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
	        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
	      }

	      if (DOMPropertyNames.hasOwnProperty(propName)) {
	        propertyInfo.propertyName = DOMPropertyNames[propName];
	      }

	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        propertyInfo.mutationMethod = DOMMutationMethods[propName];
	      }

	      DOMProperty$6.properties[propName] = propertyInfo;
	    }
	  }
	};
	/* eslint-disable max-len */

	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	/* eslint-enable max-len */

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */

	var DOMProperty$6 = {
	  ID_ATTRIBUTE_NAME: 'data-reactid',
	  ROOT_ATTRIBUTE_NAME: 'data-reactroot',
	  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
	  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

	  /**
	   * Map from property "standard name" to an object with info about how to set
	   * the property in the DOM. Each object contains:
	   *
	   * attributeName:
	   *   Used when rendering markup or with `*Attribute()`.
	   * attributeNamespace
	   * propertyName:
	   *   Used on DOM node instances. (This includes properties that mutate due to
	   *   external factors.)
	   * mutationMethod:
	   *   If non-null, used instead of the property or `setAttribute()` after
	   *   initial render.
	   * mustUseProperty:
	   *   Whether the property must be accessed and mutated as an object property.
	   * hasBooleanValue:
	   *   Whether the property should be removed when set to a falsey value.
	   * hasNumericValue:
	   *   Whether the property must be numeric or parse as a numeric and should be
	   *   removed when set to a falsey value.
	   * hasPositiveNumericValue:
	   *   Whether the property must be positive numeric or parse as a positive
	   *   numeric and should be removed when set to a falsey value.
	   * hasOverloadedBooleanValue:
	   *   Whether the property can be used as a flag as well as with a value.
	   *   Removed when strictly equal to false; present without a value when
	   *   strictly equal to true; present with a value otherwise.
	   */
	  properties: {},

	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties. Available only in __DEV__.
	   *
	   * autofocus is predefined, because adding it to the property whitelist
	   * causes unintended side effects.
	   *
	   * @type {Object}
	   */
	  getPossibleStandardName: null,

	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],

	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function (attributeName) {
	    for (var i = 0; i < DOMProperty$6._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty$6._isCustomAttributeFunctions[i];

	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }

	    return false;
	  },
	  injection: DOMPropertyInjection
	};
	var DOMProperty_1 = DOMProperty$6;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMComponentFlags$2 = {
	  hasCachedChildNodes: 1 << 0
	};
	var ReactDOMComponentFlags_1 = ReactDOMComponentFlags$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$r = reactProdInvariant_1;
	var DOMProperty$5 = DOMProperty_1;
	var ReactDOMComponentFlags$1 = ReactDOMComponentFlags_1;
	var ATTR_NAME$1 = DOMProperty$5.ID_ATTRIBUTE_NAME;
	var Flags$1 = ReactDOMComponentFlags$1;
	var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);
	/**
	 * Check if a given node should be cached.
	 */

	function shouldPrecacheNode(node, nodeID) {
	  return node.nodeType === 1 && node.getAttribute(ATTR_NAME$1) === String(nodeID) || node.nodeType === 8 && node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 && node.nodeValue === ' react-empty: ' + nodeID + ' ';
	}
	/**
	 * Drill down (through composites and empty components) until we get a host or
	 * host text component.
	 *
	 * This is pretty polymorphic but unavoidable with the current structure we have
	 * for `_renderedChildren`.
	 */


	function getRenderedHostOrTextFromComponent(component) {
	  var rendered;

	  while (rendered = component._renderedComponent) {
	    component = rendered;
	  }

	  return component;
	}
	/**
	 * Populate `_hostNode` on the rendered host/text component with the given
	 * DOM node. The passed `inst` can be a composite.
	 */


	function precacheNode(inst, node) {
	  var hostInst = getRenderedHostOrTextFromComponent(inst);
	  hostInst._hostNode = node;
	  node[internalInstanceKey] = hostInst;
	}

	function uncacheNode(inst) {
	  var node = inst._hostNode;

	  if (node) {
	    delete node[internalInstanceKey];
	    inst._hostNode = null;
	  }
	}
	/**
	 * Populate `_hostNode` on each child of `inst`, assuming that the children
	 * match up with the DOM (element) children of `node`.
	 *
	 * We cache entire levels at once to avoid an n^2 problem where we access the
	 * children of a node sequentially and have to walk from the start to our target
	 * node every time.
	 *
	 * Since we update `_renderedChildren` and the actual DOM at (slightly)
	 * different times, we could race here and see a newer `_renderedChildren` than
	 * the DOM nodes we see. To avoid this, ReactMultiChild calls
	 * `prepareToManageChildren` before we change `_renderedChildren`, at which
	 * time the container's child nodes are always cached (until it unmounts).
	 */


	function precacheChildNodes(inst, node) {
	  if (inst._flags & Flags$1.hasCachedChildNodes) {
	    return;
	  }

	  var children = inst._renderedChildren;
	  var childNode = node.firstChild;

	  outer: for (var name in children) {
	    if (!children.hasOwnProperty(name)) {
	      continue;
	    }

	    var childInst = children[name];

	    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;

	    if (childID === 0) {
	      // We're currently unmounting this child in ReactMultiChild; skip it.
	      continue;
	    } // We assume the child nodes are in the same order as the child instances.


	    for (; childNode !== null; childNode = childNode.nextSibling) {
	      if (shouldPrecacheNode(childNode, childID)) {
	        precacheNode(childInst, childNode);
	        continue outer;
	      }
	    } // We reached the end of the DOM children without finding an ID match.


	    _prodInvariant$r('32', childID) ;
	  }

	  inst._flags |= Flags$1.hasCachedChildNodes;
	}
	/**
	 * Given a DOM node, return the closest ReactDOMComponent or
	 * ReactDOMTextComponent instance ancestor.
	 */


	function getClosestInstanceFromNode(node) {
	  if (node[internalInstanceKey]) {
	    return node[internalInstanceKey];
	  } // Walk up the tree until we find an ancestor whose instance we have cached.


	  var parents = [];

	  while (!node[internalInstanceKey]) {
	    parents.push(node);

	    if (node.parentNode) {
	      node = node.parentNode;
	    } else {
	      // Top of the tree. This node must not be part of a React tree (or is
	      // unmounted, potentially).
	      return null;
	    }
	  }

	  var closest;
	  var inst;

	  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
	    closest = inst;

	    if (parents.length) {
	      precacheChildNodes(inst, node);
	    }
	  }

	  return closest;
	}
	/**
	 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
	 * instance, or null if the node was not rendered by this React.
	 */


	function getInstanceFromNode(node) {
	  var inst = getClosestInstanceFromNode(node);

	  if (inst != null && inst._hostNode === node) {
	    return inst;
	  } else {
	    return null;
	  }
	}
	/**
	 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
	 * DOM node.
	 */


	function getNodeFromInstance(inst) {
	  // Without this first invariant, passing a non-DOM-component triggers the next
	  // invariant for a missing parent, which is super confusing.
	  !(inst._hostNode !== undefined) ? _prodInvariant$r('33') : void 0;

	  if (inst._hostNode) {
	    return inst._hostNode;
	  } // Walk up the tree until we find an ancestor whose DOM node we have cached.


	  var parents = [];

	  while (!inst._hostNode) {
	    parents.push(inst);
	    !inst._hostParent ? _prodInvariant$r('34') : void 0;
	    inst = inst._hostParent;
	  } // Now parents contains each ancestor that does *not* have a cached native
	  // node, and `inst` is the deepest ancestor that does.


	  for (; parents.length; inst = parents.pop()) {
	    precacheChildNodes(inst, inst._hostNode);
	  }

	  return inst._hostNode;
	}

	var ReactDOMComponentTree$j = {
	  getClosestInstanceFromNode: getClosestInstanceFromNode,
	  getInstanceFromNode: getInstanceFromNode,
	  getNodeFromInstance: getNodeFromInstance,
	  precacheChildNodes: precacheChildNodes,
	  precacheNode: precacheNode,
	  uncacheNode: uncacheNode
	};
	var ReactDOMComponentTree_1 = ReactDOMComponentTree$j;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ARIADOMPropertyConfig$1 = {
	  Properties: {
	    // Global States and Properties
	    'aria-current': 0,
	    // state
	    'aria-details': 0,
	    'aria-disabled': 0,
	    // state
	    'aria-hidden': 0,
	    // state
	    'aria-invalid': 0,
	    // state
	    'aria-keyshortcuts': 0,
	    'aria-label': 0,
	    'aria-roledescription': 0,
	    // Widget Attributes
	    'aria-autocomplete': 0,
	    'aria-checked': 0,
	    'aria-expanded': 0,
	    'aria-haspopup': 0,
	    'aria-level': 0,
	    'aria-modal': 0,
	    'aria-multiline': 0,
	    'aria-multiselectable': 0,
	    'aria-orientation': 0,
	    'aria-placeholder': 0,
	    'aria-pressed': 0,
	    'aria-readonly': 0,
	    'aria-required': 0,
	    'aria-selected': 0,
	    'aria-sort': 0,
	    'aria-valuemax': 0,
	    'aria-valuemin': 0,
	    'aria-valuenow': 0,
	    'aria-valuetext': 0,
	    // Live Region Attributes
	    'aria-atomic': 0,
	    'aria-busy': 0,
	    'aria-live': 0,
	    'aria-relevant': 0,
	    // Drag-and-Drop Attributes
	    'aria-dropeffect': 0,
	    'aria-grabbed': 0,
	    // Relationship Attributes
	    'aria-activedescendant': 0,
	    'aria-colcount': 0,
	    'aria-colindex': 0,
	    'aria-colspan': 0,
	    'aria-controls': 0,
	    'aria-describedby': 0,
	    'aria-errormessage': 0,
	    'aria-flowto': 0,
	    'aria-labelledby': 0,
	    'aria-owns': 0,
	    'aria-posinset': 0,
	    'aria-rowcount': 0,
	    'aria-rowindex': 0,
	    'aria-rowspan': 0,
	    'aria-setsize': 0
	  },
	  DOMAttributeNames: {},
	  DOMPropertyNames: {}
	};
	var ARIADOMPropertyConfig_1 = ARIADOMPropertyConfig$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$q = reactProdInvariant_1;
	/**
	 * Injectable ordering of event plugins.
	 */

	var eventPluginOrder = null;
	/**
	 * Injectable mapping from names to event plugin modules.
	 */

	var namesToPlugins = {};
	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */

	function recomputePluginOrdering() {
	  if (!eventPluginOrder) {
	    // Wait until an `eventPluginOrder` is injected.
	    return;
	  }

	  for (var pluginName in namesToPlugins) {
	    var pluginModule = namesToPlugins[pluginName];
	    var pluginIndex = eventPluginOrder.indexOf(pluginName);
	    !(pluginIndex > -1) ? _prodInvariant$q('96', pluginName) : void 0;

	    if (EventPluginRegistry$3.plugins[pluginIndex]) {
	      continue;
	    }

	    !pluginModule.extractEvents ? _prodInvariant$q('97', pluginName) : void 0;
	    EventPluginRegistry$3.plugins[pluginIndex] = pluginModule;
	    var publishedEvents = pluginModule.eventTypes;

	    for (var eventName in publishedEvents) {
	      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? _prodInvariant$q('98', eventName, pluginName) : void 0;
	    }
	  }
	}
	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */


	function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
	  !!EventPluginRegistry$3.eventNameDispatchConfigs.hasOwnProperty(eventName) ? _prodInvariant$q('99', eventName) : void 0;
	  EventPluginRegistry$3.eventNameDispatchConfigs[eventName] = dispatchConfig;
	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
	      }
	    }

	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
	    return true;
	  }

	  return false;
	}
	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */


	function publishRegistrationName(registrationName, pluginModule, eventName) {
	  !!EventPluginRegistry$3.registrationNameModules[registrationName] ? _prodInvariant$q('100', registrationName) : void 0;
	  EventPluginRegistry$3.registrationNameModules[registrationName] = pluginModule;
	  EventPluginRegistry$3.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
	}
	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */


	var EventPluginRegistry$3 = {
	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],

	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},

	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},

	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},

	  /**
	   * Mapping from lowercase registration names to the properly cased version,
	   * used to warn in the case of missing event handlers. Available
	   * only in __DEV__.
	   * @type {Object}
	   */
	  possibleRegistrationNames: null,
	  // Trust the developer to only use possibleRegistrationNames in __DEV__

	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function (injectedEventPluginOrder) {
	    !!eventPluginOrder ? _prodInvariant$q('101') : void 0; // Clone the ordering so it cannot be dynamically mutated.

	    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
	    recomputePluginOrdering();
	  },

	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function (injectedNamesToPlugins) {
	    var isOrderingDirty = false;

	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }

	      var pluginModule = injectedNamesToPlugins[pluginName];

	      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
	        !!namesToPlugins[pluginName] ? _prodInvariant$q('102', pluginName) : void 0;
	        namesToPlugins[pluginName] = pluginModule;
	        isOrderingDirty = true;
	      }
	    }

	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },

	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function (event) {
	    var dispatchConfig = event.dispatchConfig;

	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry$3.registrationNameModules[dispatchConfig.registrationName] || null;
	    }

	    if (dispatchConfig.phasedRegistrationNames !== undefined) {
	      // pulling phasedRegistrationNames out of dispatchConfig helps Flow see
	      // that it is not undefined.
	      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

	      for (var phase in phasedRegistrationNames) {
	        if (!phasedRegistrationNames.hasOwnProperty(phase)) {
	          continue;
	        }

	        var pluginModule = EventPluginRegistry$3.registrationNameModules[phasedRegistrationNames[phase]];

	        if (pluginModule) {
	          return pluginModule;
	        }
	      }
	    }

	    return null;
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function () {
	    eventPluginOrder = null;

	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }

	    EventPluginRegistry$3.plugins.length = 0;
	    var eventNameDispatchConfigs = EventPluginRegistry$3.eventNameDispatchConfigs;

	    for (var eventName in eventNameDispatchConfigs) {
	      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
	        delete eventNameDispatchConfigs[eventName];
	      }
	    }

	    var registrationNameModules = EventPluginRegistry$3.registrationNameModules;

	    for (var registrationName in registrationNameModules) {
	      if (registrationNameModules.hasOwnProperty(registrationName)) {
	        delete registrationNameModules[registrationName];
	      }
	    }
	  }
	};
	var EventPluginRegistry_1 = EventPluginRegistry$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var caughtError = null;
	/**
	 * Call a function while guarding against errors that happens within it.
	 *
	 * @param {String} name of the guard to use for logging or debugging
	 * @param {Function} func The function to invoke
	 * @param {*} a First argument
	 * @param {*} b Second argument
	 */

	function invokeGuardedCallback(name, func, a) {
	  try {
	    func(a);
	  } catch (x) {
	    if (caughtError === null) {
	      caughtError = x;
	    }
	  }
	}

	var ReactErrorUtils$3 = {
	  invokeGuardedCallback: invokeGuardedCallback,

	  /**
	   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
	   * handler are sure to be rethrown by rethrowCaughtError.
	   */
	  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

	  /**
	   * During execution of guarded functions we will capture the first error which
	   * we will rethrow to be handled by the top level error handler.
	   */
	  rethrowCaughtError: function () {
	    if (caughtError) {
	      var error = caughtError;
	      caughtError = null;
	      throw error;
	    }
	  }
	};

	var ReactErrorUtils_1 = ReactErrorUtils$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$p = reactProdInvariant_1;
	var ReactErrorUtils$2 = ReactErrorUtils_1;
	/**
	 * Injected dependencies:
	 */

	/**
	 * - `ComponentTree`: [required] Module that can convert between React instances
	 *   and actual node references.
	 */

	var ComponentTree;
	var TreeTraversal;
	var injection = {
	  injectComponentTree: function (Injected) {
	    ComponentTree = Injected;
	  },
	  injectTreeTraversal: function (Injected) {
	    TreeTraversal = Injected;
	  }
	};

	function isEndish(topLevelType) {
	  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
	}

	function isMoveish(topLevelType) {
	  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
	}

	function isStartish(topLevelType) {
	  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
	}
	/**
	 * Dispatch the event to the listener.
	 * @param {SyntheticEvent} event SyntheticEvent to handle
	 * @param {boolean} simulated If the event is simulated (changes exn behavior)
	 * @param {function} listener Application-level callback
	 * @param {*} inst Internal component instance
	 */


	function executeDispatch(event, simulated, listener, inst) {
	  var type = event.type || 'unknown-event';
	  event.currentTarget = EventPluginUtils$3.getNodeFromInstance(inst);

	  if (simulated) {
	    ReactErrorUtils$2.invokeGuardedCallbackWithCatch(type, listener, event);
	  } else {
	    ReactErrorUtils$2.invokeGuardedCallback(type, listener, event);
	  }

	  event.currentTarget = null;
	}
	/**
	 * Standard/simple iteration through an event's collected dispatches.
	 */


	function executeDispatchesInOrder(event, simulated) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchInstances = event._dispatchInstances;

	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      } // Listeners and Instances are two parallel arrays that are always in sync.


	      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
	    }
	  } else if (dispatchListeners) {
	    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
	  }

	  event._dispatchListeners = null;
	  event._dispatchInstances = null;
	}
	/**
	 * Standard/simple iteration through an event's collected dispatches, but stops
	 * at the first dispatch execution returning true, and returns that id.
	 *
	 * @return {?string} id of the first dispatch execution who's listener returns
	 * true, or null if no listener returned true.
	 */


	function executeDispatchesInOrderStopAtTrueImpl(event) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchInstances = event._dispatchInstances;

	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      } // Listeners and Instances are two parallel arrays that are always in sync.


	      if (dispatchListeners[i](event, dispatchInstances[i])) {
	        return dispatchInstances[i];
	      }
	    }
	  } else if (dispatchListeners) {
	    if (dispatchListeners(event, dispatchInstances)) {
	      return dispatchInstances;
	    }
	  }

	  return null;
	}
	/**
	 * @see executeDispatchesInOrderStopAtTrueImpl
	 */


	function executeDispatchesInOrderStopAtTrue(event) {
	  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
	  event._dispatchInstances = null;
	  event._dispatchListeners = null;
	  return ret;
	}
	/**
	 * Execution of a "direct" dispatch - there must be at most one dispatch
	 * accumulated on the event or it is considered an error. It doesn't really make
	 * sense for an event with multiple dispatches (bubbled) to keep track of the
	 * return values at each dispatch execution, but it does tend to make sense when
	 * dealing with "direct" dispatches.
	 *
	 * @return {*} The return value of executing the single dispatch.
	 */


	function executeDirectDispatch(event) {

	  var dispatchListener = event._dispatchListeners;
	  var dispatchInstance = event._dispatchInstances;
	  !!Array.isArray(dispatchListener) ? _prodInvariant$p('103') : void 0;
	  event.currentTarget = dispatchListener ? EventPluginUtils$3.getNodeFromInstance(dispatchInstance) : null;
	  var res = dispatchListener ? dispatchListener(event) : null;
	  event.currentTarget = null;
	  event._dispatchListeners = null;
	  event._dispatchInstances = null;
	  return res;
	}
	/**
	 * @param {SyntheticEvent} event
	 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
	 */


	function hasDispatches(event) {
	  return !!event._dispatchListeners;
	}
	/**
	 * General utilities that are useful in creating custom Event Plugins.
	 */


	var EventPluginUtils$3 = {
	  isEndish: isEndish,
	  isMoveish: isMoveish,
	  isStartish: isStartish,
	  executeDirectDispatch: executeDirectDispatch,
	  executeDispatchesInOrder: executeDispatchesInOrder,
	  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
	  hasDispatches: hasDispatches,
	  getInstanceFromNode: function (node) {
	    return ComponentTree.getInstanceFromNode(node);
	  },
	  getNodeFromInstance: function (node) {
	    return ComponentTree.getNodeFromInstance(node);
	  },
	  isAncestor: function (a, b) {
	    return TreeTraversal.isAncestor(a, b);
	  },
	  getLowestCommonAncestor: function (a, b) {
	    return TreeTraversal.getLowestCommonAncestor(a, b);
	  },
	  getParentInstance: function (inst) {
	    return TreeTraversal.getParentInstance(inst);
	  },
	  traverseTwoPhase: function (target, fn, arg) {
	    return TreeTraversal.traverseTwoPhase(target, fn, arg);
	  },
	  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
	    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
	  },
	  injection: injection
	};
	var EventPluginUtils_1 = EventPluginUtils$3;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$o = reactProdInvariant_1;
	/**
	 * Accumulates items that must not be null or undefined into the first one. This
	 * is used to conserve memory by avoiding array allocations, and thus sacrifices
	 * API cleanness. Since `current` can be null before being passed in and not
	 * null after this function, make sure to assign it back to `current`:
	 *
	 * `a = accumulateInto(a, b);`
	 *
	 * This API should be sparingly used. Try `accumulate` for something cleaner.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */

	function accumulateInto$2(current, next) {
	  !(next != null) ? _prodInvariant$o('30') : void 0;

	  if (current == null) {
	    return next;
	  } // Both are not empty. Warning: Never call x.concat(y) when you are not
	  // certain that x is an Array (x could be a string with concat method).


	  if (Array.isArray(current)) {
	    if (Array.isArray(next)) {
	      current.push.apply(current, next);
	      return current;
	    }

	    current.push(next);
	    return current;
	  }

	  if (Array.isArray(next)) {
	    // A bit too dangerous to mutate `next`.
	    return [current].concat(next);
	  }

	  return [current, next];
	}

	var accumulateInto_1 = accumulateInto$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * @param {array} arr an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */


	function forEachAccumulated$2(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	}

	var forEachAccumulated_1 = forEachAccumulated$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$n = reactProdInvariant_1;
	var EventPluginRegistry$2 = EventPluginRegistry_1;
	var EventPluginUtils$2 = EventPluginUtils_1;
	var ReactErrorUtils$1 = ReactErrorUtils_1;
	var accumulateInto$1 = accumulateInto_1;
	var forEachAccumulated$1 = forEachAccumulated_1;
	/**
	 * Internal store for event listeners
	 */

	var listenerBank = {};
	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */

	var eventQueue = null;
	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @param {boolean} simulated If the event is simulated (changes exn behavior)
	 * @private
	 */

	var executeDispatchesAndRelease = function (event, simulated) {
	  if (event) {
	    EventPluginUtils$2.executeDispatchesInOrder(event, simulated);

	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};

	var executeDispatchesAndReleaseSimulated = function (e) {
	  return executeDispatchesAndRelease(e, true);
	};

	var executeDispatchesAndReleaseTopLevel = function (e) {
	  return executeDispatchesAndRelease(e, false);
	};

	var getDictionaryKey$1 = function (inst) {
	  // Prevents V8 performance issue:
	  // https://github.com/facebook/react/pull/7232
	  return '.' + inst._rootNodeID;
	};

	function isInteractive$1(tag) {
	  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
	}

	function shouldPreventMouseEvent(name, type, props) {
	  switch (name) {
	    case 'onClick':
	    case 'onClickCapture':
	    case 'onDoubleClick':
	    case 'onDoubleClickCapture':
	    case 'onMouseDown':
	    case 'onMouseDownCapture':
	    case 'onMouseMove':
	    case 'onMouseMoveCapture':
	    case 'onMouseUp':
	    case 'onMouseUpCapture':
	      return !!(props.disabled && isInteractive$1(type));

	    default:
	      return false;
	  }
	}
	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */


	var EventPluginHub$5 = {
	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {
	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry$2.injectEventPluginOrder,

	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry$2.injectEventPluginsByName
	  },

	  /**
	   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {function} listener The callback to store.
	   */
	  putListener: function (inst, registrationName, listener) {
	    !(typeof listener === 'function') ? _prodInvariant$n('94', registrationName, typeof listener) : void 0;
	    var key = getDictionaryKey$1(inst);
	    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[key] = listener;
	    var PluginModule = EventPluginRegistry$2.registrationNameModules[registrationName];

	    if (PluginModule && PluginModule.didPutListener) {
	      PluginModule.didPutListener(inst, registrationName, listener);
	    }
	  },

	  /**
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function (inst, registrationName) {
	    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
	    // live here; needs to be moved to a better place soon
	    var bankForRegistrationName = listenerBank[registrationName];

	    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
	      return null;
	    }

	    var key = getDictionaryKey$1(inst);
	    return bankForRegistrationName && bankForRegistrationName[key];
	  },

	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function (inst, registrationName) {
	    var PluginModule = EventPluginRegistry$2.registrationNameModules[registrationName];

	    if (PluginModule && PluginModule.willDeleteListener) {
	      PluginModule.willDeleteListener(inst, registrationName);
	    }

	    var bankForRegistrationName = listenerBank[registrationName]; // TODO: This should never be null -- when is it?

	    if (bankForRegistrationName) {
	      var key = getDictionaryKey$1(inst);
	      delete bankForRegistrationName[key];
	    }
	  },

	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {object} inst The instance, which is the source of events.
	   */
	  deleteAllListeners: function (inst) {
	    var key = getDictionaryKey$1(inst);

	    for (var registrationName in listenerBank) {
	      if (!listenerBank.hasOwnProperty(registrationName)) {
	        continue;
	      }

	      if (!listenerBank[registrationName][key]) {
	        continue;
	      }

	      var PluginModule = EventPluginRegistry$2.registrationNameModules[registrationName];

	      if (PluginModule && PluginModule.willDeleteListener) {
	        PluginModule.willDeleteListener(inst, registrationName);
	      }

	      delete listenerBank[registrationName][key];
	    }
	  },

	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var events;
	    var plugins = EventPluginRegistry$2.plugins;

	    for (var i = 0; i < plugins.length; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];

	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);

	        if (extractedEvents) {
	          events = accumulateInto$1(events, extractedEvents);
	        }
	      }
	    }

	    return events;
	  },

	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function (events) {
	    if (events) {
	      eventQueue = accumulateInto$1(eventQueue, events);
	    }
	  },

	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function (simulated) {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;

	    if (simulated) {
	      forEachAccumulated$1(processingEventQueue, executeDispatchesAndReleaseSimulated);
	    } else {
	      forEachAccumulated$1(processingEventQueue, executeDispatchesAndReleaseTopLevel);
	    }

	    !!eventQueue ? _prodInvariant$n('95') : void 0; // This would be a good time to rethrow if any of the event handlers threw.

	    ReactErrorUtils$1.rethrowCaughtError();
	  },

	  /**
	   * These are needed for tests only. Do not use!
	   */
	  __purge: function () {
	    listenerBank = {};
	  },
	  __getListenerBank: function () {
	    return listenerBank;
	  }
	};
	var EventPluginHub_1 = EventPluginHub$5;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPluginHub$4 = EventPluginHub_1;
	var EventPluginUtils$1 = EventPluginUtils_1;
	var accumulateInto = accumulateInto_1;
	var forEachAccumulated = forEachAccumulated_1;
	var getListener = EventPluginHub$4.getListener;
	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */

	function listenerAtPhase(inst, event, propagationPhase) {
	  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(inst, registrationName);
	}
	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */


	function accumulateDirectionalDispatches(inst, phase, event) {

	  var listener = listenerAtPhase(inst, event, phase);

	  if (listener) {
	    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
	    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
	  }
	}
	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We cannot perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */


	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    EventPluginUtils$1.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
	  }
	}
	/**
	 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
	 */


	function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    var targetInst = event._targetInst;
	    var parentInst = targetInst ? EventPluginUtils$1.getParentInstance(targetInst) : null;
	    EventPluginUtils$1.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
	  }
	}
	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */


	function accumulateDispatches(inst, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(inst, registrationName);

	    if (listener) {
	      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
	      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
	    }
	  }
	}
	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */


	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event._targetInst, null, event);
	  }
	}

	function accumulateTwoPhaseDispatches(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}

	function accumulateTwoPhaseDispatchesSkipTarget(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
	}

	function accumulateEnterLeaveDispatches(leave, enter, from, to) {
	  EventPluginUtils$1.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
	}

	function accumulateDirectDispatches(events) {
	  forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}
	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */


	var EventPropagators$5 = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
	};
	var EventPropagators_1 = EventPropagators$5;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */

	var ExecutionEnvironment$e = {
	  canUseDOM: canUseDOM,
	  canUseWorkers: typeof Worker !== 'undefined',
	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
	  canUseViewport: canUseDOM && !!window.screen,
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};
	var ExecutionEnvironment_1 = ExecutionEnvironment$e;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$m = reactProdInvariant_1;
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */

	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;

	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? _prodInvariant$m('25') : void 0;
	  instance.destructor();

	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */

	var addPoolingTo = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;

	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }

	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass$7 = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler
	};
	var PooledClass_1 = PooledClass$7;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$d = ExecutionEnvironment_1;
	var contentKey = null;
	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */

	function getTextContentAccessor$2() {
	  if (!contentKey && ExecutionEnvironment$d.canUseDOM) {
	    // Prefer textContent to innerText because many browsers support both but
	    // SVG <text> elements don't support innerText even when <div> does.
	    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
	  }

	  return contentKey;
	}

	var getTextContentAccessor_1 = getTextContentAccessor$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$g = objectAssign;
	var PooledClass$6 = PooledClass_1;
	var getTextContentAccessor$1 = getTextContentAccessor_1;
	/**
	 * This helper class stores information about text content of a target node,
	 * allowing comparison of content before and after a given event.
	 *
	 * Identify the node where selection currently begins, then observe
	 * both its text content and its current position in the DOM. Since the
	 * browser may natively replace the target node during composition, we can
	 * use its position to find its replacement.
	 *
	 * @param {DOMEventTarget} root
	 */

	function FallbackCompositionState$1(root) {
	  this._root = root;
	  this._startText = this.getText();
	  this._fallbackText = null;
	}

	_assign$g(FallbackCompositionState$1.prototype, {
	  destructor: function () {
	    this._root = null;
	    this._startText = null;
	    this._fallbackText = null;
	  },

	  /**
	   * Get current text of input.
	   *
	   * @return {string}
	   */
	  getText: function () {
	    if ('value' in this._root) {
	      return this._root.value;
	    }

	    return this._root[getTextContentAccessor$1()];
	  },

	  /**
	   * Determine the differing substring between the initially stored
	   * text content and the current content.
	   *
	   * @return {string}
	   */
	  getData: function () {
	    if (this._fallbackText) {
	      return this._fallbackText;
	    }

	    var start;
	    var startValue = this._startText;
	    var startLength = startValue.length;
	    var end;
	    var endValue = this.getText();
	    var endLength = endValue.length;

	    for (start = 0; start < startLength; start++) {
	      if (startValue[start] !== endValue[start]) {
	        break;
	      }
	    }

	    var minEnd = startLength - start;

	    for (end = 1; end <= minEnd; end++) {
	      if (startValue[startLength - end] !== endValue[endLength - end]) {
	        break;
	      }
	    }

	    var sliceTail = end > 1 ? 1 - end : undefined;
	    this._fallbackText = endValue.slice(start, sliceTail);
	    return this._fallbackText;
	  }
	});

	PooledClass$6.addPoolingTo(FallbackCompositionState$1);
	var FallbackCompositionState_1 = FallbackCompositionState$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$f = objectAssign;
	var PooledClass$5 = PooledClass_1;
	var emptyFunction$5 = emptyFunction_1;
	var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var EventInterface = {
	  type: null,
	  target: null,
	  // currentTarget is set when dispatching; no use in copying it here
	  currentTarget: emptyFunction$5.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function (event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};
	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {*} targetInst Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @param {DOMEventTarget} nativeEventTarget Target node.
	 */

	function SyntheticEvent$9(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {

	  this.dispatchConfig = dispatchConfig;
	  this._targetInst = targetInst;
	  this.nativeEvent = nativeEvent;
	  var Interface = this.constructor.Interface;

	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }

	    var normalize = Interface[propName];

	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      if (propName === 'target') {
	        this.target = nativeEventTarget;
	      } else {
	        this[propName] = nativeEvent[propName];
	      }
	    }
	  }

	  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;

	  if (defaultPrevented) {
	    this.isDefaultPrevented = emptyFunction$5.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction$5.thatReturnsFalse;
	  }

	  this.isPropagationStopped = emptyFunction$5.thatReturnsFalse;
	  return this;
	}

	_assign$f(SyntheticEvent$9.prototype, {
	  preventDefault: function () {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;

	    if (!event) {
	      return;
	    }

	    if (event.preventDefault) {
	      event.preventDefault(); // eslint-disable-next-line valid-typeof
	    } else if (typeof event.returnValue !== 'unknown') {
	      event.returnValue = false;
	    }

	    this.isDefaultPrevented = emptyFunction$5.thatReturnsTrue;
	  },
	  stopPropagation: function () {
	    var event = this.nativeEvent;

	    if (!event) {
	      return;
	    }

	    if (event.stopPropagation) {
	      event.stopPropagation(); // eslint-disable-next-line valid-typeof
	    } else if (typeof event.cancelBubble !== 'unknown') {
	      // The ChangeEventPlugin registers a "propertychange" event for
	      // IE. This event does not support bubbling or cancelling, and
	      // any references to cancelBubble throw "Member not found".  A
	      // typeof check of "unknown" circumvents this issue (and is also
	      // IE specific).
	      event.cancelBubble = true;
	    }

	    this.isPropagationStopped = emptyFunction$5.thatReturnsTrue;
	  },

	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function () {
	    this.isPersistent = emptyFunction$5.thatReturnsTrue;
	  },

	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction$5.thatReturnsFalse,

	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function () {
	    var Interface = this.constructor.Interface;

	    for (var propName in Interface) {
	      {
	        this[propName] = null;
	      }
	    }

	    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
	      this[shouldBeReleasedProperties[i]] = null;
	    }
	  }
	});

	SyntheticEvent$9.Interface = EventInterface;
	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */

	SyntheticEvent$9.augmentClass = function (Class, Interface) {
	  var Super = this;

	  var E = function () {};

	  E.prototype = Super.prototype;
	  var prototype = new E();

	  _assign$f(prototype, Class.prototype);

	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;
	  Class.Interface = _assign$f({}, Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;
	  PooledClass$5.addPoolingTo(Class, PooledClass$5.fourArgumentPooler);
	};

	PooledClass$5.addPoolingTo(SyntheticEvent$9, PooledClass$5.fourArgumentPooler);
	var SyntheticEvent_1 = SyntheticEvent$9;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$8 = SyntheticEvent_1;
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */

	var CompositionEventInterface = {
	  data: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticCompositionEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$8.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$8.augmentClass(SyntheticCompositionEvent$1, CompositionEventInterface);
	var SyntheticCompositionEvent_1 = SyntheticCompositionEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$7 = SyntheticEvent_1;
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
	 *      /#events-inputevents
	 */

	var InputEventInterface = {
	  data: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticInputEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$7.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$7.augmentClass(SyntheticInputEvent$1, InputEventInterface);
	var SyntheticInputEvent_1 = SyntheticInputEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPropagators$4 = EventPropagators_1;
	var ExecutionEnvironment$c = ExecutionEnvironment_1;
	var FallbackCompositionState = FallbackCompositionState_1;
	var SyntheticCompositionEvent = SyntheticCompositionEvent_1;
	var SyntheticInputEvent = SyntheticInputEvent_1;
	var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space

	var START_KEYCODE = 229;
	var canUseCompositionEvent = ExecutionEnvironment$c.canUseDOM && 'CompositionEvent' in window;
	var documentMode = null;

	if (ExecutionEnvironment$c.canUseDOM && 'documentMode' in document) {
	  documentMode = document.documentMode;
	} // Webkit offers a very useful `textInput` event that can be used to
	// directly represent `beforeInput`. The IE `textinput` event is not as
	// useful, so we don't use it.


	var canUseTextInputEvent = ExecutionEnvironment$c.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto(); // In IE9+, we have access to composition events, but the data supplied
	// by the native compositionend event may be incorrect. Japanese ideographic
	// spaces, for instance (\u3000) are not recorded correctly.

	var useFallbackCompositionData = ExecutionEnvironment$c.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
	/**
	 * Opera <= 12 includes TextEvent in window, but does not fire
	 * text input events. Rely on keypress instead.
	 */

	function isPresto() {
	  var opera = window.opera;
	  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
	}

	var SPACEBAR_CODE = 32;
	var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE); // Events and their corresponding property names.

	var eventTypes$4 = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: 'onBeforeInput',
	      captured: 'onBeforeInputCapture'
	    },
	    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
	  },
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionEnd',
	      captured: 'onCompositionEndCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionStart',
	      captured: 'onCompositionStartCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: 'onCompositionUpdate',
	      captured: 'onCompositionUpdateCapture'
	    },
	    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
	  }
	}; // Track whether we've ever handled a keypress on the space key.

	var hasSpaceKeypress = false;
	/**
	 * Return whether a native keypress event is assumed to be a command.
	 * This is required because Firefox fires `keypress` events for key commands
	 * (cut, copy, select-all, etc.) even though no character is inserted.
	 */

	function isKeypressCommand(nativeEvent) {
	  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
	  !(nativeEvent.ctrlKey && nativeEvent.altKey);
	}
	/**
	 * Translate native top level events into event types.
	 *
	 * @param {string} topLevelType
	 * @return {object}
	 */


	function getCompositionEventType(topLevelType) {
	  switch (topLevelType) {
	    case 'topCompositionStart':
	      return eventTypes$4.compositionStart;

	    case 'topCompositionEnd':
	      return eventTypes$4.compositionEnd;

	    case 'topCompositionUpdate':
	      return eventTypes$4.compositionUpdate;
	  }
	}
	/**
	 * Does our fallback best-guess model think this event signifies that
	 * composition has begun?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */


	function isFallbackCompositionStart(topLevelType, nativeEvent) {
	  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
	}
	/**
	 * Does our fallback mode think that this event is the end of composition?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */


	function isFallbackCompositionEnd(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case 'topKeyUp':
	      // Command keys insert or clear IME input.
	      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;

	    case 'topKeyDown':
	      // Expect IME keyCode on each keydown. If we get any other
	      // code we must have exited earlier.
	      return nativeEvent.keyCode !== START_KEYCODE;

	    case 'topKeyPress':
	    case 'topMouseDown':
	    case 'topBlur':
	      // Events are not possible without cancelling IME.
	      return true;

	    default:
	      return false;
	  }
	}
	/**
	 * Google Input Tools provides composition data via a CustomEvent,
	 * with the `data` property populated in the `detail` object. If this
	 * is available on the event object, use it. If not, this is a plain
	 * composition event and we have nothing special to extract.
	 *
	 * @param {object} nativeEvent
	 * @return {?string}
	 */


	function getDataFromCustomEvent(nativeEvent) {
	  var detail = nativeEvent.detail;

	  if (typeof detail === 'object' && 'data' in detail) {
	    return detail.data;
	  }

	  return null;
	} // Track the current IME composition fallback object, if any.


	var currentComposition = null;
	/**
	 * @return {?object} A SyntheticCompositionEvent.
	 */

	function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	  var eventType;
	  var fallbackData;

	  if (canUseCompositionEvent) {
	    eventType = getCompositionEventType(topLevelType);
	  } else if (!currentComposition) {
	    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
	      eventType = eventTypes$4.compositionStart;
	    }
	  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
	    eventType = eventTypes$4.compositionEnd;
	  }

	  if (!eventType) {
	    return null;
	  }

	  if (useFallbackCompositionData) {
	    // The current composition is stored statically and must not be
	    // overwritten while composition continues.
	    if (!currentComposition && eventType === eventTypes$4.compositionStart) {
	      currentComposition = FallbackCompositionState.getPooled(nativeEventTarget);
	    } else if (eventType === eventTypes$4.compositionEnd) {
	      if (currentComposition) {
	        fallbackData = currentComposition.getData();
	      }
	    }
	  }

	  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

	  if (fallbackData) {
	    // Inject data generated from fallback path into the synthetic event.
	    // This matches the property of native CompositionEventInterface.
	    event.data = fallbackData;
	  } else {
	    var customData = getDataFromCustomEvent(nativeEvent);

	    if (customData !== null) {
	      event.data = customData;
	    }
	  }

	  EventPropagators$4.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	/**
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The string corresponding to this `beforeInput` event.
	 */


	function getNativeBeforeInputChars(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case 'topCompositionEnd':
	      return getDataFromCustomEvent(nativeEvent);

	    case 'topKeyPress':
	      /**
	       * If native `textInput` events are available, our goal is to make
	       * use of them. However, there is a special case: the spacebar key.
	       * In Webkit, preventing default on a spacebar `textInput` event
	       * cancels character insertion, but it *also* causes the browser
	       * to fall back to its default spacebar behavior of scrolling the
	       * page.
	       *
	       * Tracking at:
	       * https://code.google.com/p/chromium/issues/detail?id=355103
	       *
	       * To avoid this issue, use the keypress event as if no `textInput`
	       * event is available.
	       */
	      var which = nativeEvent.which;

	      if (which !== SPACEBAR_CODE) {
	        return null;
	      }

	      hasSpaceKeypress = true;
	      return SPACEBAR_CHAR;

	    case 'topTextInput':
	      // Record the characters to be added to the DOM.
	      var chars = nativeEvent.data; // If it's a spacebar character, assume that we have already handled
	      // it at the keypress level and bail immediately. Android Chrome
	      // doesn't give us keycodes, so we need to blacklist it.

	      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
	        return null;
	      }

	      return chars;

	    default:
	      // For other native event types, do nothing.
	      return null;
	  }
	}
	/**
	 * For browsers that do not provide the `textInput` event, extract the
	 * appropriate string to use for SyntheticInputEvent.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The fallback string for this `beforeInput` event.
	 */


	function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
	  // If we are currently composing (IME) and using a fallback to do so,
	  // try to extract the composed characters from the fallback object.
	  // If composition event is available, we extract a string only at
	  // compositionevent, otherwise extract it at fallback events.
	  if (currentComposition) {
	    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
	      var chars = currentComposition.getData();
	      FallbackCompositionState.release(currentComposition);
	      currentComposition = null;
	      return chars;
	    }

	    return null;
	  }

	  switch (topLevelType) {
	    case 'topPaste':
	      // If a paste event occurs after a keypress, throw out the input
	      // chars. Paste events should not lead to BeforeInput events.
	      return null;

	    case 'topKeyPress':
	      /**
	       * As of v27, Firefox may fire keypress events even when no character
	       * will be inserted. A few possibilities:
	       *
	       * - `which` is `0`. Arrow keys, Esc key, etc.
	       *
	       * - `which` is the pressed key code, but no char is available.
	       *   Ex: 'AltGr + d` in Polish. There is no modified character for
	       *   this key combination and no character is inserted into the
	       *   document, but FF fires the keypress for char code `100` anyway.
	       *   No `input` event will occur.
	       *
	       * - `which` is the pressed key code, but a command combination is
	       *   being used. Ex: `Cmd+C`. No character is inserted, and no
	       *   `input` event will occur.
	       */
	      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
	        return String.fromCharCode(nativeEvent.which);
	      }

	      return null;

	    case 'topCompositionEnd':
	      return useFallbackCompositionData ? null : nativeEvent.data;

	    default:
	      return null;
	  }
	}
	/**
	 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
	 * `textInput` or fallback behavior.
	 *
	 * @return {?object} A SyntheticInputEvent.
	 */


	function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	  var chars;

	  if (canUseTextInputEvent) {
	    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
	  } else {
	    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
	  } // If no characters are being inserted, no BeforeInput event should
	  // be fired.


	  if (!chars) {
	    return null;
	  }

	  var event = SyntheticInputEvent.getPooled(eventTypes$4.beforeInput, targetInst, nativeEvent, nativeEventTarget);
	  event.data = chars;
	  EventPropagators$4.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	/**
	 * Create an `onBeforeInput` event to match
	 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
	 *
	 * This event plugin is based on the native `textInput` event
	 * available in Chrome, Safari, Opera, and IE. This event fires after
	 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
	 *
	 * `beforeInput` is spec'd but not implemented in any browsers, and
	 * the `input` event does not provide any useful information about what has
	 * actually been added, contrary to the spec. Thus, `textInput` is the best
	 * available event to identify the characters that have actually been inserted
	 * into the target node.
	 *
	 * This plugin is also responsible for emitting `composition` events, thus
	 * allowing us to share composition fallback code for both `beforeInput` and
	 * `composition` event types.
	 */


	var BeforeInputEventPlugin$1 = {
	  eventTypes: eventTypes$4,
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
	  }
	};
	var BeforeInputEventPlugin_1 = BeforeInputEventPlugin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$l = reactProdInvariant_1;

	function _classCallCheck$1(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var PooledClass$4 = PooledClass_1;
	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */

	var CallbackQueue$2 = function () {
	  function CallbackQueue(arg) {
	    _classCallCheck$1(this, CallbackQueue);

	    this._callbacks = null;
	    this._contexts = null;
	    this._arg = arg;
	  }
	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */


	  CallbackQueue.prototype.enqueue = function enqueue(callback, context) {
	    this._callbacks = this._callbacks || [];

	    this._callbacks.push(callback);

	    this._contexts = this._contexts || [];

	    this._contexts.push(context);
	  };
	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */


	  CallbackQueue.prototype.notifyAll = function notifyAll() {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    var arg = this._arg;

	    if (callbacks && contexts) {
	      !(callbacks.length === contexts.length) ? _prodInvariant$l('24') : void 0;
	      this._callbacks = null;
	      this._contexts = null;

	      for (var i = 0; i < callbacks.length; i++) {
	        callbacks[i].call(contexts[i], arg);
	      }

	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  };

	  CallbackQueue.prototype.checkpoint = function checkpoint() {
	    return this._callbacks ? this._callbacks.length : 0;
	  };

	  CallbackQueue.prototype.rollback = function rollback(len) {
	    if (this._callbacks && this._contexts) {
	      this._callbacks.length = len;
	      this._contexts.length = len;
	    }
	  };
	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */


	  CallbackQueue.prototype.reset = function reset() {
	    this._callbacks = null;
	    this._contexts = null;
	  };
	  /**
	   * `PooledClass` looks for this.
	   */


	  CallbackQueue.prototype.destructor = function destructor() {
	    this.reset();
	  };

	  return CallbackQueue;
	}();

	var CallbackQueue_1 = PooledClass$4.addPoolingTo(CallbackQueue$2);

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$k = reactProdInvariant_1;
	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid owner.
	 * @final
	 */

	function isValidOwner(object) {
	  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
	}
	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */


	var ReactOwner$1 = {
	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function (component, ref, owner) {
	    !isValidOwner(owner) ? _prodInvariant$k('119') : void 0;
	    owner.attachRef(ref, component);
	  },

	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function (component, ref, owner) {
	    !isValidOwner(owner) ? _prodInvariant$k('120') : void 0;
	    var ownerPublicInstance = owner.getPublicInstance(); // Check that `component`'s owner is still alive and that `component` is still the current ref
	    // because we do not want to detach the ref if another component stole it.

	    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
	      owner.detachRef(ref);
	    }
	  }
	};
	var ReactOwner_1 = ReactOwner$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var ReactOwner = ReactOwner_1;
	var ReactRef$1 = {};

	function attachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(component.getPublicInstance());
	  } else {
	    // Legacy ref
	    ReactOwner.addComponentAsRefTo(component, ref, owner);
	  }
	}

	function detachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(null);
	  } else {
	    // Legacy ref
	    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
	  }
	}

	ReactRef$1.attachRefs = function (instance, element) {
	  if (element === null || typeof element !== 'object') {
	    return;
	  }

	  var ref = element.ref;

	  if (ref != null) {
	    attachRef(ref, instance, element._owner);
	  }
	};

	ReactRef$1.shouldUpdateRefs = function (prevElement, nextElement) {
	  // If either the owner or a `ref` has changed, make sure the newest owner
	  // has stored a reference to `this`, and the previous owner (if different)
	  // has forgotten the reference to `this`. We use the element instead
	  // of the public this.props because the post processing cannot determine
	  // a ref. The ref conceptually lives on the element.
	  // TODO: Should this even be possible? The owner cannot change because
	  // it's forbidden by shouldUpdateReactComponent. The ref can change
	  // if you swap the keys of but not the refs. Reconsider where this check
	  // is made. It probably belongs where the key checking and
	  // instantiateReactComponent is done.
	  var prevRef = null;
	  var prevOwner = null;

	  if (prevElement !== null && typeof prevElement === 'object') {
	    prevRef = prevElement.ref;
	    prevOwner = prevElement._owner;
	  }

	  var nextRef = null;
	  var nextOwner = null;

	  if (nextElement !== null && typeof nextElement === 'object') {
	    nextRef = nextElement.ref;
	    nextOwner = nextElement._owner;
	  }

	  return prevRef !== nextRef || // If owner changes but we have an unchanged function ref, don't update refs
	  typeof nextRef === 'string' && nextOwner !== prevOwner;
	};

	ReactRef$1.detachRefs = function (instance, element) {
	  if (element === null || typeof element !== 'object') {
	    return;
	  }

	  var ref = element.ref;

	  if (ref != null) {
	    detachRef(ref, instance, element._owner);
	  }
	};

	var ReactRef_1 = ReactRef$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactRef = ReactRef_1;
	/**
	 * Helper to call ReactRef.attachRefs with this composite component, split out
	 * to avoid allocations in the transaction mount-ready queue.
	 */

	function attachRefs() {
	  ReactRef.attachRefs(this, this._currentElement);
	}

	var ReactReconciler$6 = {
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} the containing host component instance
	   * @param {?object} info about the host container
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (internalInstance, transaction, hostParent, hostContainerInfo, context, parentDebugID) // 0 in production and for roots
	  {

	    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);

	    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }

	    return markup;
	  },

	  /**
	   * Returns a value that can be passed to
	   * ReactComponentEnvironment.replaceNodeWithMarkup.
	   */
	  getHostNode: function (internalInstance) {
	    return internalInstance.getHostNode();
	  },

	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (internalInstance, safely) {

	    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
	    internalInstance.unmountComponent(safely);
	  },

	  /**
	   * Update a component using a new element.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @internal
	   */
	  receiveComponent: function (internalInstance, nextElement, transaction, context) {
	    var prevElement = internalInstance._currentElement;

	    if (nextElement === prevElement && context === internalInstance._context) {
	      // Since elements are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the element. We explicitly check for the existence of an owner since
	      // it's possible for an element created outside a composite to be
	      // deeply mutated and reused.
	      // TODO: Bailing out early is just a perf optimization right?
	      // TODO: Removing the return statement should affect correctness?
	      return;
	    }

	    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);

	    if (refsChanged) {
	      ReactRef.detachRefs(internalInstance, prevElement);
	    }

	    internalInstance.receiveComponent(nextElement, transaction, context);

	    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	  },

	  /**
	   * Flush any dirty changes in a component.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (internalInstance, transaction, updateBatchNumber) {
	    if (internalInstance._updateBatchNumber !== updateBatchNumber) {
	      return;
	    }

	    internalInstance.performUpdateIfNecessary(transaction);
	  }
	};
	var ReactReconciler_1 = ReactReconciler$6;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$j = reactProdInvariant_1;
	var OBSERVED_ERROR = {};
	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM updates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */

	var TransactionImpl = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function () {
	    this.transactionWrappers = this.getTransactionWrappers();

	    if (this.wrapperInitData) {
	      this.wrapperInitData.length = 0;
	    } else {
	      this.wrapperInitData = [];
	    }

	    this._isInTransaction = false;
	  },
	  _isInTransaction: false,

	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,
	  isInTransaction: function () {
	    return !!this._isInTransaction;
	  },

	  /* eslint-disable space-before-function-paren */

	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked. The optional arguments helps prevent the need
	   * to bind in many cases.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} a Argument to pass to the method.
	   * @param {Object?=} b Argument to pass to the method.
	   * @param {Object?=} c Argument to pass to the method.
	   * @param {Object?=} d Argument to pass to the method.
	   * @param {Object?=} e Argument to pass to the method.
	   * @param {Object?=} f Argument to pass to the method.
	   *
	   * @return {*} Return value from `method`.
	   */
	  perform: function (method, scope, a, b, c, d, e, f) {
	    /* eslint-enable space-before-function-paren */
	    !!this.isInTransaction() ? _prodInvariant$j('27') : void 0;
	    var errorThrown;
	    var ret;

	    try {
	      this._isInTransaction = true; // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.

	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {}
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }

	    return ret;
	  },
	  initializeAll: function (startIndex) {
	    var transactionWrappers = this.transactionWrappers;

	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];

	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
	      } finally {
	        if (this.wrapperInitData[i] === OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {}
	        }
	      }
	    }
	  },

	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function (startIndex) {
	    !this.isInTransaction() ? _prodInvariant$j('28') : void 0;
	    var transactionWrappers = this.transactionWrappers;

	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;

	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;

	        if (initData !== OBSERVED_ERROR && wrapper.close) {
	          wrapper.close.call(this, initData);
	        }

	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {}
	        }
	      }
	    }

	    this.wrapperInitData.length = 0;
	  }
	};
	var Transaction$4 = TransactionImpl;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$i = reactProdInvariant_1,
	    _assign$e = objectAssign;
	var CallbackQueue$1 = CallbackQueue_1;
	var PooledClass$3 = PooledClass_1;
	var ReactReconciler$5 = ReactReconciler_1;
	var Transaction$3 = Transaction$4;
	var invariant$3 = invariant_1;
	var dirtyComponents = [];
	var updateBatchNumber = 0;
	var asapCallbackQueue = CallbackQueue$1.getPooled();
	var asapEnqueued = false;
	var batchingStrategy = null;

	function ensureInjected() {
	  !(ReactUpdates$a.ReactReconcileTransaction && batchingStrategy) ? _prodInvariant$i('123') : void 0;
	}

	var NESTED_UPDATES = {
	  initialize: function () {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function () {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};
	var UPDATE_QUEUEING = {
	  initialize: function () {
	    this.callbackQueue.reset();
	  },
	  close: function () {
	    this.callbackQueue.notifyAll();
	  }
	};
	var TRANSACTION_WRAPPERS$3 = [NESTED_UPDATES, UPDATE_QUEUEING];

	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue$1.getPooled();
	  this.reconcileTransaction = ReactUpdates$a.ReactReconcileTransaction.getPooled(
	  /* useCreateElement */
	  true);
	}

	_assign$e(ReactUpdatesFlushTransaction.prototype, Transaction$3, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS$3;
	  },
	  destructor: function () {
	    this.dirtyComponentsLength = null;
	    CallbackQueue$1.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates$a.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },
	  perform: function (method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction$3.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
	  }
	});

	PooledClass$3.addPoolingTo(ReactUpdatesFlushTransaction);

	function batchedUpdates(callback, a, b, c, d, e) {
	  ensureInjected();
	  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
	}
	/**
	 * Array comparator for ReactComponents by mount ordering.
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */


	function mountOrderComparator(c1, c2) {
	  return c1._mountOrder - c2._mountOrder;
	}

	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  !(len === dirtyComponents.length) ? _prodInvariant$i('124', len, dirtyComponents.length) : void 0; // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.

	  dirtyComponents.sort(mountOrderComparator); // Any updates enqueued while reconciling must be performed after this entire
	  // batch. Otherwise, if dirtyComponents is [A, B] where A has children B and
	  // C, B could update twice in a single batch if C's render enqueues an update
	  // to B (since B would have already updated, we should skip it, and the only
	  // way we can know to do so is by checking the batch counter).

	  updateBatchNumber++;

	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, it will still
	    // be here, but we assume that it has cleared its _pendingCallbacks and
	    // that performUpdateIfNecessary is a noop.
	    var component = dirtyComponents[i]; // If performUpdateIfNecessary happens to enqueue any new updates, we
	    // shouldn't execute the callbacks until the next render happens, so
	    // stash the callbacks first

	    var callbacks = component._pendingCallbacks;
	    component._pendingCallbacks = null;
	    var markerName;

	    ReactReconciler$5.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);

	    if (markerName) {
	      console.timeEnd(markerName);
	    }

	    if (callbacks) {
	      for (var j = 0; j < callbacks.length; j++) {
	        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
	      }
	    }
	  }
	}

	var flushBatchedUpdates = function () {
	  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	  // array and perform any updates enqueued by mount-ready handlers (i.e.,
	  // componentDidUpdate) but we need to check here too in order to catch
	  // updates enqueued by setState callbacks and asap calls.
	  while (dirtyComponents.length || asapEnqueued) {
	    if (dirtyComponents.length) {
	      var transaction = ReactUpdatesFlushTransaction.getPooled();
	      transaction.perform(runBatchedUpdates, null, transaction);
	      ReactUpdatesFlushTransaction.release(transaction);
	    }

	    if (asapEnqueued) {
	      asapEnqueued = false;
	      var queue = asapCallbackQueue;
	      asapCallbackQueue = CallbackQueue$1.getPooled();
	      queue.notifyAll();
	      CallbackQueue$1.release(queue);
	    }
	  }
	};
	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */


	function enqueueUpdate$1(component) {
	  ensureInjected(); // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)

	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate$1, component);
	    return;
	  }

	  dirtyComponents.push(component);

	  if (component._updateBatchNumber == null) {
	    component._updateBatchNumber = updateBatchNumber + 1;
	  }
	}
	/**
	 * Enqueue a callback to be run at the end of the current batching cycle. Throws
	 * if no updates are currently being performed.
	 */


	function asap(callback, context) {
	  invariant$3(batchingStrategy.isBatchingUpdates, "ReactUpdates.asap: Can't enqueue an asap callback in a context where" + 'updates are not being batched.');
	  asapCallbackQueue.enqueue(callback, context);
	  asapEnqueued = true;
	}

	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function (ReconcileTransaction) {
	    !ReconcileTransaction ? _prodInvariant$i('126') : void 0;
	    ReactUpdates$a.ReactReconcileTransaction = ReconcileTransaction;
	  },
	  injectBatchingStrategy: function (_batchingStrategy) {
	    !_batchingStrategy ? _prodInvariant$i('127') : void 0;
	    !(typeof _batchingStrategy.batchedUpdates === 'function') ? _prodInvariant$i('128') : void 0;
	    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? _prodInvariant$i('129') : void 0;
	    batchingStrategy = _batchingStrategy;
	  }
	};
	var ReactUpdates$a = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,
	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate$1,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection,
	  asap: asap
	};
	var ReactUpdates_1 = ReactUpdates$a;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMComponentTree$i = ReactDOMComponentTree_1;

	function isCheckable(elem) {
	  var type = elem.type;
	  var nodeName = elem.nodeName;
	  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
	}

	function getTracker(inst) {
	  return inst._wrapperState.valueTracker;
	}

	function attachTracker(inst, tracker) {
	  inst._wrapperState.valueTracker = tracker;
	}

	function detachTracker(inst) {
	  inst._wrapperState.valueTracker = null;
	}

	function getValueFromNode(node) {
	  var value;

	  if (node) {
	    value = isCheckable(node) ? '' + node.checked : node.value;
	  }

	  return value;
	}

	var inputValueTracking$2 = {
	  // exposed for testing
	  _getTrackerFromNode: function (node) {
	    return getTracker(ReactDOMComponentTree$i.getInstanceFromNode(node));
	  },
	  track: function (inst) {
	    if (getTracker(inst)) {
	      return;
	    }

	    var node = ReactDOMComponentTree$i.getNodeFromInstance(inst);
	    var valueField = isCheckable(node) ? 'checked' : 'value';
	    var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
	    var currentValue = '' + node[valueField]; // if someone has already defined a value or Safari, then bail
	    // and don't track value will cause over reporting of changes,
	    // but it's better then a hard failure
	    // (needed for certain tests that spyOn input values and Safari)

	    if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
	      return;
	    }

	    Object.defineProperty(node, valueField, {
	      enumerable: descriptor.enumerable,
	      configurable: true,
	      get: function () {
	        return descriptor.get.call(this);
	      },
	      set: function (value) {
	        currentValue = '' + value;
	        descriptor.set.call(this, value);
	      }
	    });
	    attachTracker(inst, {
	      getValue: function () {
	        return currentValue;
	      },
	      setValue: function (value) {
	        currentValue = '' + value;
	      },
	      stopTracking: function () {
	        detachTracker(inst);
	        delete node[valueField];
	      }
	    });
	  },
	  updateValueIfChanged: function (inst) {
	    if (!inst) {
	      return false;
	    }

	    var tracker = getTracker(inst);

	    if (!tracker) {
	      inputValueTracking$2.track(inst);
	      return true;
	    }

	    var lastValue = tracker.getValue();
	    var nextValue = getValueFromNode(ReactDOMComponentTree$i.getNodeFromInstance(inst));

	    if (nextValue !== lastValue) {
	      tracker.setValue(nextValue);
	      return true;
	    }

	    return false;
	  },
	  stopTracking: function (inst) {
	    var tracker = getTracker(inst);

	    if (tracker) {
	      tracker.stopTracking();
	    }
	  }
	};
	var inputValueTracking_1 = inputValueTracking$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */


	function getEventTarget$3(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window; // Normalize SVG <use> element events #4963

	  if (target.correspondingUseElement) {
	    target = target.correspondingUseElement;
	  } // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html


	  return target.nodeType === 3 ? target.parentNode : target;
	}

	var getEventTarget_1 = getEventTarget$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$b = ExecutionEnvironment_1;
	var useHasFeature;

	if (ExecutionEnvironment$b.canUseDOM) {
	  useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
	  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	  document.implementation.hasFeature('', '') !== true;
	}
	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */


	function isEventSupported$2(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment$b.canUseDOM || capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = (eventName in document);

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	var isEventSupported_1 = isEventSupported$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */


	var supportedInputTypes = {
	  color: true,
	  date: true,
	  datetime: true,
	  'datetime-local': true,
	  email: true,
	  month: true,
	  number: true,
	  password: true,
	  range: true,
	  search: true,
	  tel: true,
	  text: true,
	  time: true,
	  url: true,
	  week: true
	};

	function isTextInputElement$2(elem) {
	  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

	  if (nodeName === 'input') {
	    return !!supportedInputTypes[elem.type];
	  }

	  if (nodeName === 'textarea') {
	    return true;
	  }

	  return false;
	}

	var isTextInputElement_1 = isTextInputElement$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPluginHub$3 = EventPluginHub_1;
	var EventPropagators$3 = EventPropagators_1;
	var ExecutionEnvironment$a = ExecutionEnvironment_1;
	var ReactDOMComponentTree$h = ReactDOMComponentTree_1;
	var ReactUpdates$9 = ReactUpdates_1;
	var SyntheticEvent$6 = SyntheticEvent_1;
	var inputValueTracking$1 = inputValueTracking_1;
	var getEventTarget$2 = getEventTarget_1;
	var isEventSupported$1 = isEventSupported_1;
	var isTextInputElement$1 = isTextInputElement_1;
	var eventTypes$3 = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: 'onChange',
	      captured: 'onChangeCapture'
	    },
	    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
	  }
	};

	function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
	  var event = SyntheticEvent$6.getPooled(eventTypes$3.change, inst, nativeEvent, target);
	  event.type = 'change';
	  EventPropagators$3.accumulateTwoPhaseDispatches(event);
	  return event;
	}
	/**
	 * For IE shims
	 */


	var activeElement$1 = null;
	var activeElementInst$1 = null;
	/**
	 * SECTION: handle `change` event
	 */

	function shouldUseChangeEvent(elem) {
	  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
	  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
	}

	var doesChangeEventBubble = false;

	if (ExecutionEnvironment$a.canUseDOM) {
	  // See `handleChange` comment below
	  doesChangeEventBubble = isEventSupported$1('change') && (!document.documentMode || document.documentMode > 8);
	}

	function manualDispatchChangeEvent(nativeEvent) {
	  var event = createAndAccumulateChangeEvent(activeElementInst$1, nativeEvent, getEventTarget$2(nativeEvent)); // If change and propertychange bubbled, we'd just bind to it like all the
	  // other events and have it go through ReactBrowserEventEmitter. Since it
	  // doesn't, we manually listen for the events and so we have to enqueue and
	  // process the abstract event manually.
	  //
	  // Batching is necessary here in order to ensure that all event handlers run
	  // before the next rerender (including event handlers attached to ancestor
	  // elements instead of directly on the input). Without this, controlled
	  // components don't work properly in conjunction with event bubbling because
	  // the component is rerendered and the value reverted before all the event
	  // handlers can run. See https://github.com/facebook/react/issues/708.

	  ReactUpdates$9.batchedUpdates(runEventInBatch, event);
	}

	function runEventInBatch(event) {
	  EventPluginHub$3.enqueueEvents(event);
	  EventPluginHub$3.processEventQueue(false);
	}

	function startWatchingForChangeEventIE8(target, targetInst) {
	  activeElement$1 = target;
	  activeElementInst$1 = targetInst;
	  activeElement$1.attachEvent('onchange', manualDispatchChangeEvent);
	}

	function stopWatchingForChangeEventIE8() {
	  if (!activeElement$1) {
	    return;
	  }

	  activeElement$1.detachEvent('onchange', manualDispatchChangeEvent);
	  activeElement$1 = null;
	  activeElementInst$1 = null;
	}

	function getInstIfValueChanged(targetInst, nativeEvent) {
	  var updated = inputValueTracking$1.updateValueIfChanged(targetInst);
	  var simulated = nativeEvent.simulated === true && ChangeEventPlugin$1._allowSimulatedPassThrough;

	  if (updated || simulated) {
	    return targetInst;
	  }
	}

	function getTargetInstForChangeEvent(topLevelType, targetInst) {
	  if (topLevelType === 'topChange') {
	    return targetInst;
	  }
	}

	function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
	  if (topLevelType === 'topFocus') {
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForChangeEventIE8();
	    startWatchingForChangeEventIE8(target, targetInst);
	  } else if (topLevelType === 'topBlur') {
	    stopWatchingForChangeEventIE8();
	  }
	}
	/**
	 * SECTION: handle `input` event
	 */


	var isInputEventSupported = false;

	if (ExecutionEnvironment$a.canUseDOM) {
	  // IE9 claims to support the input event but fails to trigger it when
	  // deleting text, so we ignore its input events.
	  isInputEventSupported = isEventSupported$1('input') && (!document.documentMode || document.documentMode > 9);
	}
	/**
	 * (For IE <=9) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */


	function startWatchingForValueChange(target, targetInst) {
	  activeElement$1 = target;
	  activeElementInst$1 = targetInst;
	  activeElement$1.attachEvent('onpropertychange', handlePropertyChange);
	}
	/**
	 * (For IE <=9) Removes the event listeners from the currently-tracked element,
	 * if any exists.
	 */


	function stopWatchingForValueChange() {
	  if (!activeElement$1) {
	    return;
	  }

	  activeElement$1.detachEvent('onpropertychange', handlePropertyChange);
	  activeElement$1 = null;
	  activeElementInst$1 = null;
	}
	/**
	 * (For IE <=9) Handles a propertychange event, sending a `change` event if
	 * the value of the active element has changed.
	 */


	function handlePropertyChange(nativeEvent) {
	  if (nativeEvent.propertyName !== 'value') {
	    return;
	  }

	  if (getInstIfValueChanged(activeElementInst$1, nativeEvent)) {
	    manualDispatchChangeEvent(nativeEvent);
	  }
	}

	function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
	  if (topLevelType === 'topFocus') {
	    // In IE8, we can capture almost all .value changes by adding a
	    // propertychange handler and looking for events with propertyName
	    // equal to 'value'
	    // In IE9, propertychange fires for most input events but is buggy and
	    // doesn't fire when text is deleted, but conveniently, selectionchange
	    // appears to fire in all of the remaining cases so we catch those and
	    // forward the event if the value has changed
	    // In either case, we don't want to call the event handler if the value
	    // is changed from JS so we redefine a setter for `.value` that updates
	    // our activeElementValue variable, allowing us to ignore those changes
	    //
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForValueChange();
	    startWatchingForValueChange(target, targetInst);
	  } else if (topLevelType === 'topBlur') {
	    stopWatchingForValueChange();
	  }
	} // For IE8 and IE9.


	function getTargetInstForInputEventPolyfill(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
	    // On the selectionchange event, the target is just document which isn't
	    // helpful for us so just check activeElement instead.
	    //
	    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
	    // propertychange on the first input event after setting `value` from a
	    // script and fires only keydown, keypress, keyup. Catching keyup usually
	    // gets it and catching keydown lets us fire an event for the first
	    // keystroke if user does a key repeat (it'll be a little delayed: right
	    // before the second keystroke). Other input methods (e.g., paste) seem to
	    // fire selectionchange normally.
	    return getInstIfValueChanged(activeElementInst$1, nativeEvent);
	  }
	}
	/**
	 * SECTION: handle `click` event
	 */


	function shouldUseClickEvent(elem) {
	  // Use the `click` event to detect changes to checkbox and radio inputs.
	  // This approach works across all browsers, whereas `change` does not fire
	  // until `blur` in IE8.
	  var nodeName = elem.nodeName;
	  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
	}

	function getTargetInstForClickEvent(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topClick') {
	    return getInstIfValueChanged(targetInst, nativeEvent);
	  }
	}

	function getTargetInstForInputOrChangeEvent(topLevelType, targetInst, nativeEvent) {
	  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
	    return getInstIfValueChanged(targetInst, nativeEvent);
	  }
	}

	function handleControlledInputBlur(inst, node) {
	  // TODO: In IE, inst is occasionally null. Why?
	  if (inst == null) {
	    return;
	  } // Fiber and ReactDOM keep wrapper state in separate places


	  var state = inst._wrapperState || node._wrapperState;

	  if (!state || !state.controlled || node.type !== 'number') {
	    return;
	  } // If controlled, assign the value attribute to the current value on blur


	  var value = '' + node.value;

	  if (node.getAttribute('value') !== value) {
	    node.setAttribute('value', value);
	  }
	}
	/**
	 * This plugin creates an `onChange` event that normalizes change events
	 * across form elements. This event fires at a time when it's possible to
	 * change the element's value without seeing a flicker.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - select
	 */


	var ChangeEventPlugin$1 = {
	  eventTypes: eventTypes$3,
	  _allowSimulatedPassThrough: true,
	  _isInputEventSupported: isInputEventSupported,
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var targetNode = targetInst ? ReactDOMComponentTree$h.getNodeFromInstance(targetInst) : window;
	    var getTargetInstFunc, handleEventFunc;

	    if (shouldUseChangeEvent(targetNode)) {
	      if (doesChangeEventBubble) {
	        getTargetInstFunc = getTargetInstForChangeEvent;
	      } else {
	        handleEventFunc = handleEventsForChangeEventIE8;
	      }
	    } else if (isTextInputElement$1(targetNode)) {
	      if (isInputEventSupported) {
	        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
	      } else {
	        getTargetInstFunc = getTargetInstForInputEventPolyfill;
	        handleEventFunc = handleEventsForInputEventPolyfill;
	      }
	    } else if (shouldUseClickEvent(targetNode)) {
	      getTargetInstFunc = getTargetInstForClickEvent;
	    }

	    if (getTargetInstFunc) {
	      var inst = getTargetInstFunc(topLevelType, targetInst, nativeEvent);

	      if (inst) {
	        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
	        return event;
	      }
	    }

	    if (handleEventFunc) {
	      handleEventFunc(topLevelType, targetNode, targetInst);
	    } // When blurring, set the value attribute for number inputs


	    if (topLevelType === 'topBlur') {
	      handleControlledInputBlur(targetInst, targetNode);
	    }
	  }
	};
	var ChangeEventPlugin_1 = ChangeEventPlugin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Module that is injectable into `EventPluginHub`, that specifies a
	 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
	 * plugins, without having to package every one of them. This is better than
	 * having plugins be ordered in the same order that they are injected because
	 * that ordering would be influenced by the packaging order.
	 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
	 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
	 */


	var DefaultEventPluginOrder$1 = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];
	var DefaultEventPluginOrder_1 = DefaultEventPluginOrder$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$5 = SyntheticEvent_1;
	var getEventTarget$1 = getEventTarget_1;
	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var UIEventInterface = {
	  view: function (event) {
	    if (event.view) {
	      return event.view;
	    }

	    var target = getEventTarget$1(event);

	    if (target.window === target) {
	      // target is a window object
	      return target;
	    }

	    var doc = target.ownerDocument; // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.

	    if (doc) {
	      return doc.defaultView || doc.parentWindow;
	    } else {
	      return window;
	    }
	  },
	  detail: function (event) {
	    return event.detail || 0;
	  }
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */

	function SyntheticUIEvent$5(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$5.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$5.augmentClass(SyntheticUIEvent$5, UIEventInterface);
	var SyntheticUIEvent_1 = SyntheticUIEvent$5;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ViewportMetrics$2 = {
	  currentScrollLeft: 0,
	  currentScrollTop: 0,
	  refreshScrollValues: function (scrollPosition) {
	    ViewportMetrics$2.currentScrollLeft = scrollPosition.x;
	    ViewportMetrics$2.currentScrollTop = scrollPosition.y;
	  }
	};
	var ViewportMetrics_1 = ViewportMetrics$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Translation from modifier key to the associated property in the event.
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
	 */


	var modifierKeyToProp = {
	  Alt: 'altKey',
	  Control: 'ctrlKey',
	  Meta: 'metaKey',
	  Shift: 'shiftKey'
	}; // IE8 does not implement getModifierState so we simply map it to the only
	// modifier keys exposed by the event itself, does not support Lock-keys.
	// Currently, all major browsers except Chrome seems to support Lock-keys.

	function modifierStateGetter(keyArg) {
	  var syntheticEvent = this;
	  var nativeEvent = syntheticEvent.nativeEvent;

	  if (nativeEvent.getModifierState) {
	    return nativeEvent.getModifierState(keyArg);
	  }

	  var keyProp = modifierKeyToProp[keyArg];
	  return keyProp ? !!nativeEvent[keyProp] : false;
	}

	function getEventModifierState$3(nativeEvent) {
	  return modifierStateGetter;
	}

	var getEventModifierState_1 = getEventModifierState$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticUIEvent$4 = SyntheticUIEvent_1;
	var ViewportMetrics$1 = ViewportMetrics_1;
	var getEventModifierState$2 = getEventModifierState_1;
	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: getEventModifierState$2,
	  button: function (event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;

	    if ('which' in event) {
	      return button;
	    } // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)


	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function (event) {
	    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
	  },
	  // "Proprietary" Interface.
	  pageX: function (event) {
	    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics$1.currentScrollLeft;
	  },
	  pageY: function (event) {
	    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics$1.currentScrollTop;
	  }
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticMouseEvent$4(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent$4.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticUIEvent$4.augmentClass(SyntheticMouseEvent$4, MouseEventInterface);
	var SyntheticMouseEvent_1 = SyntheticMouseEvent$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPropagators$2 = EventPropagators_1;
	var ReactDOMComponentTree$g = ReactDOMComponentTree_1;
	var SyntheticMouseEvent$3 = SyntheticMouseEvent_1;
	var eventTypes$2 = {
	  mouseEnter: {
	    registrationName: 'onMouseEnter',
	    dependencies: ['topMouseOut', 'topMouseOver']
	  },
	  mouseLeave: {
	    registrationName: 'onMouseLeave',
	    dependencies: ['topMouseOut', 'topMouseOver']
	  }
	};
	var EnterLeaveEventPlugin$1 = {
	  eventTypes: eventTypes$2,

	  /**
	   * For almost every interaction we care about, there will be both a top-level
	   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
	   * we do not extract duplicate events. However, moving the mouse into the
	   * browser from outside will not fire a `mouseout` event. In this case, we use
	   * the `mouseover` top-level event.
	   */
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
	      return null;
	    }

	    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
	      // Must not be a mouse in or mouse out - ignoring.
	      return null;
	    }

	    var win;

	    if (nativeEventTarget.window === nativeEventTarget) {
	      // `nativeEventTarget` is probably a window object.
	      win = nativeEventTarget;
	    } else {
	      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	      var doc = nativeEventTarget.ownerDocument;

	      if (doc) {
	        win = doc.defaultView || doc.parentWindow;
	      } else {
	        win = window;
	      }
	    }

	    var from;
	    var to;

	    if (topLevelType === 'topMouseOut') {
	      from = targetInst;
	      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
	      to = related ? ReactDOMComponentTree$g.getClosestInstanceFromNode(related) : null;
	    } else {
	      // Moving to a node from outside the window.
	      from = null;
	      to = targetInst;
	    }

	    if (from === to) {
	      // Nothing pertains to our managed components.
	      return null;
	    }

	    var fromNode = from == null ? win : ReactDOMComponentTree$g.getNodeFromInstance(from);
	    var toNode = to == null ? win : ReactDOMComponentTree$g.getNodeFromInstance(to);
	    var leave = SyntheticMouseEvent$3.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
	    leave.type = 'mouseleave';
	    leave.target = fromNode;
	    leave.relatedTarget = toNode;
	    var enter = SyntheticMouseEvent$3.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
	    enter.type = 'mouseenter';
	    enter.target = toNode;
	    enter.relatedTarget = fromNode;
	    EventPropagators$2.accumulateEnterLeaveDispatches(leave, enter, from, to);
	    return [leave, enter];
	  }
	};
	var EnterLeaveEventPlugin_1 = EnterLeaveEventPlugin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMProperty$4 = DOMProperty_1;
	var MUST_USE_PROPERTY = DOMProperty$4.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty$4.injection.HAS_BOOLEAN_VALUE;
	var HAS_NUMERIC_VALUE = DOMProperty$4.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty$4.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty$4.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
	var HTMLDOMPropertyConfig$1 = {
	  isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty$4.ATTRIBUTE_NAME_CHAR + ']*$')),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: 0,
	    acceptCharset: 0,
	    accessKey: 0,
	    action: 0,
	    allowFullScreen: HAS_BOOLEAN_VALUE,
	    allowTransparency: 0,
	    alt: 0,
	    // specifies target context for links with `preload` type
	    as: 0,
	    async: HAS_BOOLEAN_VALUE,
	    autoComplete: 0,
	    // autoFocus is polyfilled/normalized by AutoFocusUtils
	    // autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    capture: HAS_BOOLEAN_VALUE,
	    cellPadding: 0,
	    cellSpacing: 0,
	    charSet: 0,
	    challenge: 0,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    cite: 0,
	    classID: 0,
	    className: 0,
	    cols: HAS_POSITIVE_NUMERIC_VALUE,
	    colSpan: 0,
	    content: 0,
	    contentEditable: 0,
	    contextMenu: 0,
	    controls: HAS_BOOLEAN_VALUE,
	    controlsList: 0,
	    coords: 0,
	    crossOrigin: 0,
	    data: 0,
	    // For `<object />` acts as `src`.
	    dateTime: 0,
	    'default': HAS_BOOLEAN_VALUE,
	    defer: HAS_BOOLEAN_VALUE,
	    dir: 0,
	    disabled: HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: 0,
	    encType: 0,
	    form: 0,
	    formAction: 0,
	    formEncType: 0,
	    formMethod: 0,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    formTarget: 0,
	    frameBorder: 0,
	    headers: 0,
	    height: 0,
	    hidden: HAS_BOOLEAN_VALUE,
	    high: 0,
	    href: 0,
	    hrefLang: 0,
	    htmlFor: 0,
	    httpEquiv: 0,
	    icon: 0,
	    id: 0,
	    inputMode: 0,
	    integrity: 0,
	    is: 0,
	    keyParams: 0,
	    keyType: 0,
	    kind: 0,
	    label: 0,
	    lang: 0,
	    list: 0,
	    loop: HAS_BOOLEAN_VALUE,
	    low: 0,
	    manifest: 0,
	    marginHeight: 0,
	    marginWidth: 0,
	    max: 0,
	    maxLength: 0,
	    media: 0,
	    mediaGroup: 0,
	    method: 0,
	    min: 0,
	    minLength: 0,
	    // Caution; `option.selected` is not updated if `select.multiple` is
	    // disabled with `removeAttribute`.
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: 0,
	    nonce: 0,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: HAS_BOOLEAN_VALUE,
	    optimum: 0,
	    pattern: 0,
	    placeholder: 0,
	    playsInline: HAS_BOOLEAN_VALUE,
	    poster: 0,
	    preload: 0,
	    profile: 0,
	    radioGroup: 0,
	    readOnly: HAS_BOOLEAN_VALUE,
	    referrerPolicy: 0,
	    rel: 0,
	    required: HAS_BOOLEAN_VALUE,
	    reversed: HAS_BOOLEAN_VALUE,
	    role: 0,
	    rows: HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: HAS_NUMERIC_VALUE,
	    sandbox: 0,
	    scope: 0,
	    scoped: HAS_BOOLEAN_VALUE,
	    scrolling: 0,
	    seamless: HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    shape: 0,
	    size: HAS_POSITIVE_NUMERIC_VALUE,
	    sizes: 0,
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: 0,
	    src: 0,
	    srcDoc: 0,
	    srcLang: 0,
	    srcSet: 0,
	    start: HAS_NUMERIC_VALUE,
	    step: 0,
	    style: 0,
	    summary: 0,
	    tabIndex: 0,
	    target: 0,
	    title: 0,
	    // Setting .type throws on non-<input> tags
	    type: 0,
	    useMap: 0,
	    value: 0,
	    width: 0,
	    wmode: 0,
	    wrap: 0,

	    /**
	     * RDFa Properties
	     */
	    about: 0,
	    datatype: 0,
	    inlist: 0,
	    prefix: 0,
	    // property is also supported for OpenGraph in meta tags.
	    property: 0,
	    resource: 0,
	    'typeof': 0,
	    vocab: 0,

	    /**
	     * Non-standard Properties
	     */
	    // autoCapitalize and autoCorrect are supported in Mobile Safari for
	    // keyboard hints.
	    autoCapitalize: 0,
	    autoCorrect: 0,
	    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	    autoSave: 0,
	    // color is for Safari mask-icon link
	    color: 0,
	    // itemProp, itemScope, itemType are for
	    // Microdata support. See http://schema.org/docs/gs.html
	    itemProp: 0,
	    itemScope: HAS_BOOLEAN_VALUE,
	    itemType: 0,
	    // itemID and itemRef are for Microdata support as well but
	    // only specified in the WHATWG spec document. See
	    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	    itemID: 0,
	    itemRef: 0,
	    // results show looking glass icon and recent searches on input
	    // search fields in WebKit/Blink
	    results: 0,
	    // IE-only attribute that specifies security restrictions on an iframe
	    // as an alternative to the sandbox attribute on IE<10
	    security: 0,
	    // IE-only attribute that controls focus behavior
	    unselectable: 0
	  },
	  DOMAttributeNames: {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMPropertyNames: {},
	  DOMMutationMethods: {
	    value: function (node, value) {
	      if (value == null) {
	        return node.removeAttribute('value');
	      } // Number inputs get special treatment due to some edge cases in
	      // Chrome. Let everything else assign the value attribute as normal.
	      // https://github.com/facebook/react/issues/7253#issuecomment-236074326


	      if (node.type !== 'number' || node.hasAttribute('value') === false) {
	        node.setAttribute('value', '' + value);
	      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
	        // Don't assign an attribute if validation reports bad
	        // input. Chrome will clear the value. Additionally, don't
	        // operate on inputs that have focus, otherwise Chrome might
	        // strip off trailing decimal places and cause the user's
	        // cursor position to jump to the beginning of the input.
	        //
	        // In ReactDOMInput, we have an onBlur event that will trigger
	        // this function again when focus is lost.
	        node.setAttribute('value', '' + value);
	      }
	    }
	  }
	};
	var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMNamespaces$3 = {
	  html: 'http://www.w3.org/1999/xhtml',
	  mathml: 'http://www.w3.org/1998/Math/MathML',
	  svg: 'http://www.w3.org/2000/svg'
	};
	var DOMNamespaces_1 = DOMNamespaces$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Create a function which has 'unsafe' privileges (required by windows8 apps)
	 */


	var createMicrosoftUnsafeLocalFunction$3 = function (func) {
	  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
	    return function (arg0, arg1, arg2, arg3) {
	      MSApp.execUnsafeLocalFunction(function () {
	        return func(arg0, arg1, arg2, arg3);
	      });
	    };
	  } else {
	    return func;
	  }
	};

	var createMicrosoftUnsafeLocalFunction_1 = createMicrosoftUnsafeLocalFunction$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$9 = ExecutionEnvironment_1;
	var DOMNamespaces$2 = DOMNamespaces_1;
	var WHITESPACE_TEST = /^[ \r\n\t\f]/;
	var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
	var createMicrosoftUnsafeLocalFunction$2 = createMicrosoftUnsafeLocalFunction_1; // SVG temp container for IE lacking innerHTML

	var reusableSVGContainer;
	/**
	 * Set the innerHTML property of a node, ensuring that whitespace is preserved
	 * even in IE8.
	 *
	 * @param {DOMElement} node
	 * @param {string} html
	 * @internal
	 */

	var setInnerHTML$4 = createMicrosoftUnsafeLocalFunction$2(function (node, html) {
	  // IE does not have innerHTML for SVG nodes, so instead we inject the
	  // new markup in a temp node and then move the child nodes across into
	  // the target node
	  if (node.namespaceURI === DOMNamespaces$2.svg && !('innerHTML' in node)) {
	    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
	    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
	    var svgNode = reusableSVGContainer.firstChild;

	    while (svgNode.firstChild) {
	      node.appendChild(svgNode.firstChild);
	    }
	  } else {
	    node.innerHTML = html;
	  }
	});

	if (ExecutionEnvironment$9.canUseDOM) {
	  // IE8: When updating a just created node with innerHTML only leading
	  // whitespace is removed. When updating an existing node with innerHTML
	  // whitespace in root TextNodes is also collapsed.
	  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html
	  // Feature detection; only IE8 is known to behave improperly like this.
	  var testElement = document.createElement('div');
	  testElement.innerHTML = ' ';

	  if (testElement.innerHTML === '') {
	    setInnerHTML$4 = function (node, html) {
	      // Magic theory: IE8 supposedly differentiates between added and updated
	      // nodes when processing innerHTML, innerHTML on updated nodes suffers
	      // from worse whitespace behavior. Re-adding a node like this triggers
	      // the initial and more favorable whitespace behavior.
	      // TODO: What to do on a detached node?
	      if (node.parentNode) {
	        node.parentNode.replaceChild(node, node);
	      } // We also implement a workaround for non-visible tags disappearing into
	      // thin air on IE8, this only happens if there is no visible text
	      // in-front of the non-visible tags. Piggyback on the whitespace fix
	      // and simply check if any non-visible tags appear in the source.


	      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
	        // Recover leading whitespace by temporarily prepending any character.
	        // \uFEFF has the potential advantage of being zero-width/invisible.
	        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
	        // in hopes that this is preserved even if "\uFEFF" is transformed to
	        // the actual Unicode character (by Babel, for example).
	        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
	        node.innerHTML = String.fromCharCode(0xfeff) + html; // deleteData leaves an empty `TextNode` which offsets the index of all
	        // children. Definitely want to avoid this.

	        var textNode = node.firstChild;

	        if (textNode.data.length === 1) {
	          node.removeChild(textNode);
	        } else {
	          textNode.deleteData(0, 1);
	        }
	      } else {
	        node.innerHTML = html;
	      }
	    };
	  }

	  testElement = null;
	}

	var setInnerHTML_1 = setInnerHTML$4;

	/**
	 * Copyright (c) 2016-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * Based on the escape-html library, which is used under the MIT License below:
	 *
	 * Copyright (c) 2012-2013 TJ Holowaychuk
	 * Copyright (c) 2015 Andreas Lubbe
	 * Copyright (c) 2015 Tiancheng "Timothy" Gu
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * 'Software'), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 *
	 */

	/**
	 * Module variables.
	 * @private
	 */


	var matchHtmlRegExp = /["'&<>]/;
	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;

	      case 38:
	        // &
	        escape = '&amp;';
	        break;

	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

	        break;

	      case 60:
	        // <
	        escape = '&lt;';
	        break;

	      case 62:
	        // >
	        escape = '&gt;';
	        break;

	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	} // end code copied and modified from escape-html

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */


	function escapeTextContentForBrowser$4(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }

	  return escapeHtml(text);
	}

	var escapeTextContentForBrowser_1 = escapeTextContentForBrowser$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$8 = ExecutionEnvironment_1;
	var escapeTextContentForBrowser$3 = escapeTextContentForBrowser_1;
	var setInnerHTML$3 = setInnerHTML_1;
	/**
	 * Set the textContent property of a node, ensuring that whitespace is preserved
	 * even in IE8. innerText is a poor substitute for textContent and, among many
	 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
	 * as it should.
	 *
	 * @param {DOMElement} node
	 * @param {string} text
	 * @internal
	 */

	var setTextContent$2 = function (node, text) {
	  if (text) {
	    var firstChild = node.firstChild;

	    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
	      firstChild.nodeValue = text;
	      return;
	    }
	  }

	  node.textContent = text;
	};

	if (ExecutionEnvironment$8.canUseDOM) {
	  if (!('textContent' in document.documentElement)) {
	    setTextContent$2 = function (node, text) {
	      if (node.nodeType === 3) {
	        node.nodeValue = text;
	        return;
	      }

	      setInnerHTML$3(node, escapeTextContentForBrowser$3(text));
	    };
	  }
	}

	var setTextContent_1 = setTextContent$2;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMNamespaces$1 = DOMNamespaces_1;
	var setInnerHTML$2 = setInnerHTML_1;
	var createMicrosoftUnsafeLocalFunction$1 = createMicrosoftUnsafeLocalFunction_1;
	var setTextContent$1 = setTextContent_1;
	var ELEMENT_NODE_TYPE$1 = 1;
	var DOCUMENT_FRAGMENT_NODE_TYPE$1 = 11;
	/**
	 * In IE (8-11) and Edge, appending nodes with no children is dramatically
	 * faster than appending a full subtree, so we essentially queue up the
	 * .appendChild calls here and apply them so each node is added to its parent
	 * before any children are added.
	 *
	 * In other browsers, doing so is slower or neutral compared to the other order
	 * (in Firefox, twice as slow) so we only do this inversion in IE.
	 *
	 * See https://github.com/spicyj/innerhtml-vs-createelement-vs-clonenode.
	 */

	var enableLazy = typeof document !== 'undefined' && typeof document.documentMode === 'number' || typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && /\bEdge\/\d/.test(navigator.userAgent);

	function insertTreeChildren(tree) {
	  if (!enableLazy) {
	    return;
	  }

	  var node = tree.node;
	  var children = tree.children;

	  if (children.length) {
	    for (var i = 0; i < children.length; i++) {
	      insertTreeBefore(node, children[i], null);
	    }
	  } else if (tree.html != null) {
	    setInnerHTML$2(node, tree.html);
	  } else if (tree.text != null) {
	    setTextContent$1(node, tree.text);
	  }
	}

	var insertTreeBefore = createMicrosoftUnsafeLocalFunction$1(function (parentNode, tree, referenceNode) {
	  // DocumentFragments aren't actually part of the DOM after insertion so
	  // appending children won't update the DOM. We need to ensure the fragment
	  // is properly populated first, breaking out of our lazy approach for just
	  // this level. Also, some <object> plugins (like Flash Player) will read
	  // <param> nodes immediately upon insertion into the DOM, so <object>
	  // must also be populated prior to insertion into the DOM.
	  if (tree.node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE$1 || tree.node.nodeType === ELEMENT_NODE_TYPE$1 && tree.node.nodeName.toLowerCase() === 'object' && (tree.node.namespaceURI == null || tree.node.namespaceURI === DOMNamespaces$1.html)) {
	    insertTreeChildren(tree);
	    parentNode.insertBefore(tree.node, referenceNode);
	  } else {
	    parentNode.insertBefore(tree.node, referenceNode);
	    insertTreeChildren(tree);
	  }
	});

	function replaceChildWithTree(oldNode, newTree) {
	  oldNode.parentNode.replaceChild(newTree.node, oldNode);
	  insertTreeChildren(newTree);
	}

	function queueChild(parentTree, childTree) {
	  if (enableLazy) {
	    parentTree.children.push(childTree);
	  } else {
	    parentTree.node.appendChild(childTree.node);
	  }
	}

	function queueHTML(tree, html) {
	  if (enableLazy) {
	    tree.html = html;
	  } else {
	    setInnerHTML$2(tree.node, html);
	  }
	}

	function queueText(tree, text) {
	  if (enableLazy) {
	    tree.text = text;
	  } else {
	    setTextContent$1(tree.node, text);
	  }
	}

	function toString$2() {
	  return this.node.nodeName;
	}

	function DOMLazyTree$6(node) {
	  return {
	    node: node,
	    children: [],
	    html: null,
	    text: null,
	    toString: toString$2
	  };
	}

	DOMLazyTree$6.insertTreeBefore = insertTreeBefore;
	DOMLazyTree$6.replaceChildWithTree = replaceChildWithTree;
	DOMLazyTree$6.queueChild = queueChild;
	DOMLazyTree$6.queueHTML = queueHTML;
	DOMLazyTree$6.queueText = queueText;
	var DOMLazyTree_1 = DOMLazyTree$6;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */


	var invariant$2 = invariant_1;
	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFromMixed.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */

	function toArray$1(obj) {
	  var length = obj.length; // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
	  // in old versions of Safari).

	  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? invariant$2(false) : void 0;
	  !(typeof length === 'number') ? invariant$2(false) : void 0;
	  !(length === 0 || length - 1 in obj) ? invariant$2(false) : void 0;
	  !(typeof obj.callee !== 'function') ? invariant$2(false) : void 0; // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.

	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {// IE < 9 does not support Array#slice on collections objects
	    }
	  } // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.


	  var ret = Array(length);

	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }

	  return ret;
	}
	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */


	function hasArrayNature(obj) {
	  return (// not null/false
	    !!obj && ( // arrays are objects, NodeLists are functions in Safari
	    typeof obj == 'object' || typeof obj == 'function') && // quacks like an array
	    'length' in obj && // not window
	    !('setInterval' in obj) && // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    typeof obj.nodeType != 'number' && ( // a real array
	    Array.isArray(obj) || // arguments
	    'callee' in obj || // HTMLCollection/NodeList
	    'item' in obj)
	  );
	}
	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFromMixed = require('createArrayFromMixed');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFromMixed(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */


	function createArrayFromMixed$1(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray$1(obj);
	  }
	}

	var createArrayFromMixed_1 = createArrayFromMixed$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	/*eslint-disable fb-www/unsafe-html */


	var ExecutionEnvironment$7 = ExecutionEnvironment_1;
	var invariant$1 = invariant_1;
	/**
	 * Dummy container used to detect which wraps are necessary.
	 */

	var dummyNode$1 = ExecutionEnvironment$7.canUseDOM ? document.createElement('div') : null;
	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */

	var shouldWrap = {};
	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];
	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],
	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],
	  'optgroup': selectWrap,
	  'option': selectWrap,
	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,
	  'td': trWrap,
	  'th': trWrap
	}; // Initialize the SVG elements since we know they'll always need to be wrapped
	// consistently. If they are created inside a <div> they will be initialized in
	// the wrong namespace (and will not display).

	var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
	svgElements.forEach(function (nodeName) {
	  markupWrap[nodeName] = svgWrap;
	  shouldWrap[nodeName] = true;
	});
	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */

	function getMarkupWrap$1(nodeName) {
	  !!!dummyNode$1 ? invariant$1(false) : void 0;

	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }

	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode$1.innerHTML = '<link />';
	    } else {
	      dummyNode$1.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }

	    shouldWrap[nodeName] = !dummyNode$1.firstChild;
	  }

	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}

	var getMarkupWrap_1 = getMarkupWrap$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/*eslint-disable fb-www/unsafe-html*/


	var ExecutionEnvironment$6 = ExecutionEnvironment_1;
	var createArrayFromMixed = createArrayFromMixed_1;
	var getMarkupWrap = getMarkupWrap_1;
	var invariant = invariant_1;
	/**
	 * Dummy container used to render all markup.
	 */

	var dummyNode = ExecutionEnvironment$6.canUseDOM ? document.createElement('div') : null;
	/**
	 * Pattern used by `getNodeName`.
	 */

	var nodeNamePattern = /^\s*<(\w+)/;
	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */

	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}
	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */


	function createNodesFromMarkup$1(markup, handleScript) {
	  var node = dummyNode;
	  !!!dummyNode ? invariant(false) : void 0;
	  var nodeName = getNodeName(markup);
	  var wrap = nodeName && getMarkupWrap(nodeName);

	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];
	    var wrapDepth = wrap[0];

	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }

	  var scripts = node.getElementsByTagName('script');

	  if (scripts.length) {
	    !handleScript ? invariant(false) : void 0;
	    createArrayFromMixed(scripts).forEach(handleScript);
	  }

	  var nodes = Array.from(node.childNodes);

	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }

	  return nodes;
	}

	var createNodesFromMarkup_1 = createNodesFromMarkup$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$h = reactProdInvariant_1;
	var DOMLazyTree$5 = DOMLazyTree_1;
	var ExecutionEnvironment$5 = ExecutionEnvironment_1;
	var createNodesFromMarkup = createNodesFromMarkup_1;
	var emptyFunction$4 = emptyFunction_1;
	var Danger$1 = {
	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
	    !ExecutionEnvironment$5.canUseDOM ? _prodInvariant$h('56') : void 0;
	    !markup ? _prodInvariant$h('57') : void 0;
	    !(oldChild.nodeName !== 'HTML') ? _prodInvariant$h('58') : void 0;

	    if (typeof markup === 'string') {
	      var newChild = createNodesFromMarkup(markup, emptyFunction$4)[0];
	      oldChild.parentNode.replaceChild(newChild, oldChild);
	    } else {
	      DOMLazyTree$5.replaceChildWithTree(oldChild, markup);
	    }
	  }
	};
	var Danger_1 = Danger$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMLazyTree$4 = DOMLazyTree_1;
	var Danger = Danger_1;
	var createMicrosoftUnsafeLocalFunction = createMicrosoftUnsafeLocalFunction_1;
	var setInnerHTML$1 = setInnerHTML_1;
	var setTextContent = setTextContent_1;

	function getNodeAfter(parentNode, node) {
	  // Special case for text components, which return [open, close] comments
	  // from getHostNode.
	  if (Array.isArray(node)) {
	    node = node[1];
	  }

	  return node ? node.nextSibling : parentNode.firstChild;
	}
	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */


	var insertChildAt = createMicrosoftUnsafeLocalFunction(function (parentNode, childNode, referenceNode) {
	  // We rely exclusively on `insertBefore(node, null)` instead of also using
	  // `appendChild(node)`. (Using `undefined` is not allowed by all browsers so
	  // we are careful to use `null`.)
	  parentNode.insertBefore(childNode, referenceNode);
	});

	function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
	  DOMLazyTree$4.insertTreeBefore(parentNode, childTree, referenceNode);
	}

	function moveChild(parentNode, childNode, referenceNode) {
	  if (Array.isArray(childNode)) {
	    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
	  } else {
	    insertChildAt(parentNode, childNode, referenceNode);
	  }
	}

	function removeChild(parentNode, childNode) {
	  if (Array.isArray(childNode)) {
	    var closingComment = childNode[1];
	    childNode = childNode[0];
	    removeDelimitedText(parentNode, childNode, closingComment);
	    parentNode.removeChild(closingComment);
	  }

	  parentNode.removeChild(childNode);
	}

	function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
	  var node = openingComment;

	  while (true) {
	    var nextNode = node.nextSibling;
	    insertChildAt(parentNode, node, referenceNode);

	    if (node === closingComment) {
	      break;
	    }

	    node = nextNode;
	  }
	}

	function removeDelimitedText(parentNode, startNode, closingComment) {
	  while (true) {
	    var node = startNode.nextSibling;

	    if (node === closingComment) {
	      // The closing comment is removed by ReactMultiChild.
	      break;
	    } else {
	      parentNode.removeChild(node);
	    }
	  }
	}

	function replaceDelimitedText(openingComment, closingComment, stringText) {
	  var parentNode = openingComment.parentNode;
	  var nodeAfterComment = openingComment.nextSibling;

	  if (nodeAfterComment === closingComment) {
	    // There are no text nodes between the opening and closing comments; insert
	    // a new one if stringText isn't empty.
	    if (stringText) {
	      insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
	    }
	  } else {
	    if (stringText) {
	      // Set the text content of the first node after the opening comment, and
	      // remove all following nodes up until the closing comment.
	      setTextContent(nodeAfterComment, stringText);
	      removeDelimitedText(parentNode, nodeAfterComment, closingComment);
	    } else {
	      removeDelimitedText(parentNode, openingComment, closingComment);
	    }
	  }
	}

	var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
	/**
	 * Operations for updating with DOM children.
	 */


	var DOMChildrenOperations$3 = {
	  dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,
	  replaceDelimitedText: replaceDelimitedText,

	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @internal
	   */
	  processUpdates: function (parentNode, updates) {

	    for (var k = 0; k < updates.length; k++) {
	      var update = updates[k];

	      switch (update.type) {
	        case 'INSERT_MARKUP':
	          insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));

	          break;

	        case 'MOVE_EXISTING':
	          moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));

	          break;

	        case 'SET_MARKUP':
	          setInnerHTML$1(parentNode, update.content);

	          break;

	        case 'TEXT_CONTENT':
	          setTextContent(parentNode, update.content);

	          break;

	        case 'REMOVE_NODE':
	          removeChild(parentNode, update.fromNode);

	          break;
	      }
	    }
	  }
	};
	var DOMChildrenOperations_1 = DOMChildrenOperations$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMChildrenOperations$2 = DOMChildrenOperations_1;
	var ReactDOMComponentTree$f = ReactDOMComponentTree_1;
	/**
	 * Operations used to process updates to DOM nodes.
	 */

	var ReactDOMIDOperations$1 = {
	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: function (parentInst, updates) {
	    var node = ReactDOMComponentTree$f.getNodeFromInstance(parentInst);
	    DOMChildrenOperations$2.processUpdates(node, updates);
	  }
	};
	var ReactDOMIDOperations_1 = ReactDOMIDOperations$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMChildrenOperations$1 = DOMChildrenOperations_1;
	var ReactDOMIDOperations = ReactDOMIDOperations_1;
	/**
	 * Abstracts away all functionality of the reconciler that requires knowledge of
	 * the browser context. TODO: These callers should be refactored to avoid the
	 * need for this injection.
	 */

	var ReactComponentBrowserEnvironment$1 = {
	  processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
	  replaceNodeWithMarkup: DOMChildrenOperations$1.dangerouslyReplaceNodeWithMarkup
	};
	var ReactComponentBrowserEnvironment_1 = ReactComponentBrowserEnvironment$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * @param {DOMElement} node input/textarea to focus
	 */


	function focusNode$2(node) {
	  // IE8 can throw "Can't move focus to the control because it is invisible,
	  // not enabled, or of a type that does not accept the focus." for all kinds of
	  // reasons that are too expensive and fragile to test.
	  try {
	    node.focus();
	  } catch (e) {}
	}

	var focusNode_1 = focusNode$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMComponentTree$e = ReactDOMComponentTree_1;
	var focusNode$1 = focusNode_1;
	var AutoFocusUtils$1 = {
	  focusDOMComponent: function () {
	    focusNode$1(ReactDOMComponentTree$e.getNodeFromInstance(this));
	  }
	};
	var AutoFocusUtils_1 = AutoFocusUtils$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */


	var isUnitlessNumber$1 = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  columns: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */

	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */


	var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.

	Object.keys(isUnitlessNumber$1).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber$1[prefixKey(prefix, prop)] = isUnitlessNumber$1[prop];
	  });
	});
	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */

	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};
	var CSSProperty$2 = {
	  isUnitlessNumber: isUnitlessNumber$1,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};
	var CSSProperty_1 = CSSProperty$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var CSSProperty$1 = CSSProperty_1;
	var isUnitlessNumber = CSSProperty$1.isUnitlessNumber;
	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @param {ReactDOMComponent} component
	 * @return {string} Normalized style value with dimensions applied.
	 */

	function dangerousStyleValue$1(name, value, component, isCustomProperty) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901
	  var isEmpty = value == null || typeof value === 'boolean' || value === '';

	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);

	  if (isCustomProperty || isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {

	    value = value.trim();
	  }

	  return value + 'px';
	}

	var dangerousStyleValue_1 = dangerousStyleValue$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */


	var _uppercasePattern = /([A-Z])/g;
	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */

	function hyphenate$1(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	var hyphenate_1 = hyphenate$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	var hyphenate = hyphenate_1;
	var msPattern = /^ms-/;
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */

	function hyphenateStyleName$1(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	var hyphenateStyleName_1 = hyphenateStyleName$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 * @typechecks static-only
	 */
	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 */


	function memoizeStringOnly$1(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }

	    return cache[string];
	  };
	}

	var memoizeStringOnly_1 = memoizeStringOnly$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var CSSProperty = CSSProperty_1;
	var ExecutionEnvironment$4 = ExecutionEnvironment_1;
	var dangerousStyleValue = dangerousStyleValue_1;
	var hyphenateStyleName = hyphenateStyleName_1;
	var memoizeStringOnly = memoizeStringOnly_1;
	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});
	var hasShorthandPropertyBug = false;
	var styleFloatAccessor = 'cssFloat';

	if (ExecutionEnvironment$4.canUseDOM) {
	  var tempStyle = document.createElement('div').style;

	  try {
	    // IE8 throws "Invalid argument." if resetting shorthand style properties.
	    tempStyle.font = '';
	  } catch (e) {
	    hasShorthandPropertyBug = true;
	  } // IE8 only supports accessing cssFloat (standard) as styleFloat


	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}
	/**
	 * Operations for dealing with CSS properties.
	 */


	var CSSPropertyOperations$1 = {
	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   * @return {?string}
	   */
	  createMarkupForStyles: function (styles, component) {
	    var serialized = '';

	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }

	      var isCustomProperty = styleName.indexOf('--') === 0;
	      var styleValue = styles[styleName];

	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue, component, isCustomProperty) + ';';
	      }
	    }

	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   * @param {ReactDOMComponent} component
	   */
	  setValueForStyles: function (node, styles, component) {

	    var style = node.style;

	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }

	      var isCustomProperty = styleName.indexOf('--') === 0;

	      var styleValue = dangerousStyleValue(styleName, styles[styleName], component, isCustomProperty);

	      if (styleName === 'float' || styleName === 'cssFloat') {
	        styleName = styleFloatAccessor;
	      }

	      if (isCustomProperty) {
	        style.setProperty(styleName, styleValue);
	      } else if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];

	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }
	};
	var CSSPropertyOperations_1 = CSSPropertyOperations$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var escapeTextContentForBrowser$2 = escapeTextContentForBrowser_1;
	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */

	function quoteAttributeValueForBrowser$1(value) {
	  return '"' + escapeTextContentForBrowser$2(value) + '"';
	}

	var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMProperty$3 = DOMProperty_1;
	var quoteAttributeValueForBrowser = quoteAttributeValueForBrowser_1;
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty$3.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty$3.ATTRIBUTE_NAME_CHAR + ']*$');
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};

	function isAttributeNameSafe(attributeName) {
	  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
	    return true;
	  }

	  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
	    return false;
	  }

	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }

	  illegalAttributeNameCache[attributeName] = true;
	  return false;
	}

	function shouldIgnoreValue(propertyInfo, value) {
	  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
	}
	/**
	 * Operations for dealing with DOM properties.
	 */


	var DOMPropertyOperations$2 = {
	  /**
	   * Creates markup for the ID property.
	   *
	   * @param {string} id Unescaped ID.
	   * @return {string} Markup string.
	   */
	  createMarkupForID: function (id) {
	    return DOMProperty$3.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
	  },
	  setAttributeForID: function (node, id) {
	    node.setAttribute(DOMProperty$3.ID_ATTRIBUTE_NAME, id);
	  },
	  createMarkupForRoot: function () {
	    return DOMProperty$3.ROOT_ATTRIBUTE_NAME + '=""';
	  },
	  setAttributeForRoot: function (node) {
	    node.setAttribute(DOMProperty$3.ROOT_ATTRIBUTE_NAME, '');
	  },

	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function (name, value) {
	    var propertyInfo = DOMProperty$3.properties.hasOwnProperty(name) ? DOMProperty$3.properties[name] : null;

	    if (propertyInfo) {
	      if (shouldIgnoreValue(propertyInfo, value)) {
	        return '';
	      }

	      var attributeName = propertyInfo.attributeName;

	      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
	        return attributeName + '=""';
	      }

	      return attributeName + '=' + quoteAttributeValueForBrowser(value);
	    } else if (DOMProperty$3.isCustomAttribute(name)) {
	      if (value == null) {
	        return '';
	      }

	      return name + '=' + quoteAttributeValueForBrowser(value);
	    }

	    return null;
	  },

	  /**
	   * Creates markup for a custom property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {string} Markup string, or empty string if the property was invalid.
	   */
	  createMarkupForCustomAttribute: function (name, value) {
	    if (!isAttributeNameSafe(name) || value == null) {
	      return '';
	    }

	    return name + '=' + quoteAttributeValueForBrowser(value);
	  },

	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  setValueForProperty: function (node, name, value) {
	    var propertyInfo = DOMProperty$3.properties.hasOwnProperty(name) ? DOMProperty$3.properties[name] : null;

	    if (propertyInfo) {
	      var mutationMethod = propertyInfo.mutationMethod;

	      if (mutationMethod) {
	        mutationMethod(node, value);
	      } else if (shouldIgnoreValue(propertyInfo, value)) {
	        this.deleteValueForProperty(node, name);
	        return;
	      } else if (propertyInfo.mustUseProperty) {
	        // Contrary to `setAttribute`, object properties are properly
	        // `toString`ed by IE8/9.
	        node[propertyInfo.propertyName] = value;
	      } else {
	        var attributeName = propertyInfo.attributeName;
	        var namespace = propertyInfo.attributeNamespace; // `setAttribute` with objects becomes only `[object]` in IE8/9,
	        // ('' + value) makes it output the correct toString()-value.

	        if (namespace) {
	          node.setAttributeNS(namespace, attributeName, '' + value);
	        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
	          node.setAttribute(attributeName, '');
	        } else {
	          node.setAttribute(attributeName, '' + value);
	        }
	      }
	    } else if (DOMProperty$3.isCustomAttribute(name)) {
	      DOMPropertyOperations$2.setValueForAttribute(node, name, value);
	      return;
	    }
	  },
	  setValueForAttribute: function (node, name, value) {
	    if (!isAttributeNameSafe(name)) {
	      return;
	    }

	    if (value == null) {
	      node.removeAttribute(name);
	    } else {
	      node.setAttribute(name, '' + value);
	    }
	  },

	  /**
	   * Deletes an attributes from a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForAttribute: function (node, name) {
	    node.removeAttribute(name);
	  },

	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForProperty: function (node, name) {
	    var propertyInfo = DOMProperty$3.properties.hasOwnProperty(name) ? DOMProperty$3.properties[name] : null;

	    if (propertyInfo) {
	      var mutationMethod = propertyInfo.mutationMethod;

	      if (mutationMethod) {
	        mutationMethod(node, undefined);
	      } else if (propertyInfo.mustUseProperty) {
	        var propName = propertyInfo.propertyName;

	        if (propertyInfo.hasBooleanValue) {
	          node[propName] = false;
	        } else {
	          node[propName] = '';
	        }
	      } else {
	        node.removeAttribute(propertyInfo.attributeName);
	      }
	    } else if (DOMProperty$3.isCustomAttribute(name)) {
	      node.removeAttribute(name);
	    }
	  }
	};
	var DOMPropertyOperations_1 = DOMPropertyOperations$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPluginHub$2 = EventPluginHub_1;

	function runEventQueueInBatch(events) {
	  EventPluginHub$2.enqueueEvents(events);
	  EventPluginHub$2.processEventQueue(false);
	}

	var ReactEventEmitterMixin$1 = {
	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   */
	  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var events = EventPluginHub$2.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
	    runEventQueueInBatch(events);
	  }
	};
	var ReactEventEmitterMixin_1 = ReactEventEmitterMixin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$3 = ExecutionEnvironment_1;
	/**
	 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
	 *
	 * @param {string} styleProp
	 * @param {string} eventName
	 * @returns {object}
	 */

	function makePrefixMap(styleProp, eventName) {
	  var prefixes = {};
	  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
	  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
	  prefixes['Moz' + styleProp] = 'moz' + eventName;
	  prefixes['ms' + styleProp] = 'MS' + eventName;
	  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();
	  return prefixes;
	}
	/**
	 * A list of event names to a configurable list of vendor prefixes.
	 */


	var vendorPrefixes = {
	  animationend: makePrefixMap('Animation', 'AnimationEnd'),
	  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
	  animationstart: makePrefixMap('Animation', 'AnimationStart'),
	  transitionend: makePrefixMap('Transition', 'TransitionEnd')
	};
	/**
	 * Event names that have already been detected and prefixed (if applicable).
	 */

	var prefixedEventNames = {};
	/**
	 * Element to check for prefixes on.
	 */

	var style = {};
	/**
	 * Bootstrap if a DOM exists.
	 */

	if (ExecutionEnvironment$3.canUseDOM) {
	  style = document.createElement('div').style; // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are usable, and if not remove them from the map.

	  if (!('AnimationEvent' in window)) {
	    delete vendorPrefixes.animationend.animation;
	    delete vendorPrefixes.animationiteration.animation;
	    delete vendorPrefixes.animationstart.animation;
	  } // Same as above


	  if (!('TransitionEvent' in window)) {
	    delete vendorPrefixes.transitionend.transition;
	  }
	}
	/**
	 * Attempts to determine the correct vendor prefixed event name.
	 *
	 * @param {string} eventName
	 * @returns {string}
	 */


	function getVendorPrefixedEventName$1(eventName) {
	  if (prefixedEventNames[eventName]) {
	    return prefixedEventNames[eventName];
	  } else if (!vendorPrefixes[eventName]) {
	    return eventName;
	  }

	  var prefixMap = vendorPrefixes[eventName];

	  for (var styleProp in prefixMap) {
	    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
	      return prefixedEventNames[eventName] = prefixMap[styleProp];
	    }
	  }

	  return '';
	}

	var getVendorPrefixedEventName_1 = getVendorPrefixedEventName$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$d = objectAssign;
	var EventPluginRegistry$1 = EventPluginRegistry_1;
	var ReactEventEmitterMixin = ReactEventEmitterMixin_1;
	var ViewportMetrics = ViewportMetrics_1;
	var getVendorPrefixedEventName = getVendorPrefixedEventName_1;
	var isEventSupported = isEventSupported_1;
	/**
	 * Summary of `ReactBrowserEventEmitter` event handling:
	 *
	 *  - Top-level delegation is used to trap most native browser events. This
	 *    may only occur in the main thread and is the responsibility of
	 *    ReactEventListener, which is injected and can therefore support pluggable
	 *    event sources. This is the only work that occurs in the main thread.
	 *
	 *  - We normalize and de-duplicate events to account for browser quirks. This
	 *    may be done in the worker thread.
	 *
	 *  - Forward these native events (with the associated top-level type used to
	 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
	 *    to extract any synthetic events.
	 *
	 *  - The `EventPluginHub` will then process each event by annotating them with
	 *    "dispatches", a sequence of listeners and IDs that care about that event.
	 *
	 *  - The `EventPluginHub` then dispatches the events.
	 *
	 * Overview of React and the event system:
	 *
	 * +------------+    .
	 * |    DOM     |    .
	 * +------------+    .
	 *       |           .
	 *       v           .
	 * +------------+    .
	 * | ReactEvent |    .
	 * |  Listener  |    .
	 * +------------+    .                         +-----------+
	 *       |           .               +--------+|SimpleEvent|
	 *       |           .               |         |Plugin     |
	 * +-----|------+    .               v         +-----------+
	 * |     |      |    .    +--------------+                    +------------+
	 * |     +-----------.--->|EventPluginHub|                    |    Event   |
	 * |            |    .    |              |     +-----------+  | Propagators|
	 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
	 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
	 * |            |    .    |              |     +-----------+  |  utilities |
	 * |     +-----------.--->|              |                    +------------+
	 * |     |      |    .    +--------------+
	 * +-----|------+    .                ^        +-----------+
	 *       |           .                |        |Enter/Leave|
	 *       +           .                +-------+|Plugin     |
	 * +-------------+   .                         +-----------+
	 * | application |   .
	 * |-------------|   .
	 * |             |   .
	 * |             |   .
	 * +-------------+   .
	 *                   .
	 *    React Core     .  General Purpose Event Plugin System
	 */

	var hasEventPageXY;
	var alreadyListeningTo = {};
	var isMonitoringScrollValue = false;
	var reactTopListenersCounter = 0; // For events like 'submit' which don't consistently bubble (which we trap at a
	// lower node than `document`), binding at `document` would cause duplicate
	// events so we don't include them here

	var topEventMapping = {
	  topAbort: 'abort',
	  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
	  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
	  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
	  topBlur: 'blur',
	  topCanPlay: 'canplay',
	  topCanPlayThrough: 'canplaythrough',
	  topChange: 'change',
	  topClick: 'click',
	  topCompositionEnd: 'compositionend',
	  topCompositionStart: 'compositionstart',
	  topCompositionUpdate: 'compositionupdate',
	  topContextMenu: 'contextmenu',
	  topCopy: 'copy',
	  topCut: 'cut',
	  topDoubleClick: 'dblclick',
	  topDrag: 'drag',
	  topDragEnd: 'dragend',
	  topDragEnter: 'dragenter',
	  topDragExit: 'dragexit',
	  topDragLeave: 'dragleave',
	  topDragOver: 'dragover',
	  topDragStart: 'dragstart',
	  topDrop: 'drop',
	  topDurationChange: 'durationchange',
	  topEmptied: 'emptied',
	  topEncrypted: 'encrypted',
	  topEnded: 'ended',
	  topError: 'error',
	  topFocus: 'focus',
	  topInput: 'input',
	  topKeyDown: 'keydown',
	  topKeyPress: 'keypress',
	  topKeyUp: 'keyup',
	  topLoadedData: 'loadeddata',
	  topLoadedMetadata: 'loadedmetadata',
	  topLoadStart: 'loadstart',
	  topMouseDown: 'mousedown',
	  topMouseMove: 'mousemove',
	  topMouseOut: 'mouseout',
	  topMouseOver: 'mouseover',
	  topMouseUp: 'mouseup',
	  topPaste: 'paste',
	  topPause: 'pause',
	  topPlay: 'play',
	  topPlaying: 'playing',
	  topProgress: 'progress',
	  topRateChange: 'ratechange',
	  topScroll: 'scroll',
	  topSeeked: 'seeked',
	  topSeeking: 'seeking',
	  topSelectionChange: 'selectionchange',
	  topStalled: 'stalled',
	  topSuspend: 'suspend',
	  topTextInput: 'textInput',
	  topTimeUpdate: 'timeupdate',
	  topTouchCancel: 'touchcancel',
	  topTouchEnd: 'touchend',
	  topTouchMove: 'touchmove',
	  topTouchStart: 'touchstart',
	  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
	  topVolumeChange: 'volumechange',
	  topWaiting: 'waiting',
	  topWheel: 'wheel'
	};
	/**
	 * To ensure no conflicts with other potential React instances on the page
	 */

	var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

	function getListeningForDocument(mountAt) {
	  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
	  // directly.
	  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
	    mountAt[topListenersIDKey] = reactTopListenersCounter++;
	    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
	  }

	  return alreadyListeningTo[mountAt[topListenersIDKey]];
	}
	/**
	 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
	 * example:
	 *
	 *   EventPluginHub.putListener('myID', 'onClick', myFunction);
	 *
	 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
	 *
	 * @internal
	 */


	var ReactBrowserEventEmitter$4 = _assign$d({}, ReactEventEmitterMixin, {
	  /**
	   * Injectable event backend
	   */
	  ReactEventListener: null,
	  injection: {
	    /**
	     * @param {object} ReactEventListener
	     */
	    injectReactEventListener: function (ReactEventListener) {
	      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter$4.handleTopLevel);
	      ReactBrowserEventEmitter$4.ReactEventListener = ReactEventListener;
	    }
	  },

	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function (enabled) {
	    if (ReactBrowserEventEmitter$4.ReactEventListener) {
	      ReactBrowserEventEmitter$4.ReactEventListener.setEnabled(enabled);
	    }
	  },

	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function () {
	    return !!(ReactBrowserEventEmitter$4.ReactEventListener && ReactBrowserEventEmitter$4.ReactEventListener.isEnabled());
	  },

	  /**
	   * We listen for bubbled touch events on the document object.
	   *
	   * Firefox v8.01 (and possibly others) exhibited strange behavior when
	   * mounting `onmousemove` events at some node that was not the document
	   * element. The symptoms were that if your mouse is not moving over something
	   * contained within that mount point (for example on the background) the
	   * top-level listeners for `onmousemove` won't be called. However, if you
	   * register the `mousemove` on the document object, then it will of course
	   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
	   * top-level listeners to the document object only, at least for these
	   * movement types of events and possibly all events.
	   *
	   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	   *
	   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
	   * they bubble to document.
	   *
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {object} contentDocumentHandle Document which owns the container
	   */
	  listenTo: function (registrationName, contentDocumentHandle) {
	    var mountAt = contentDocumentHandle;
	    var isListening = getListeningForDocument(mountAt);
	    var dependencies = EventPluginRegistry$1.registrationNameDependencies[registrationName];

	    for (var i = 0; i < dependencies.length; i++) {
	      var dependency = dependencies[i];

	      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
	        if (dependency === 'topWheel') {
	          if (isEventSupported('wheel')) {
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
	          } else if (isEventSupported('mousewheel')) {
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
	          } else {
	            // Firefox needs to capture a different mouse scroll event.
	            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
	          }
	        } else if (dependency === 'topScroll') {
	          if (isEventSupported('scroll', true)) {
	            ReactBrowserEventEmitter$4.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
	          } else {
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topScroll', 'scroll', ReactBrowserEventEmitter$4.ReactEventListener.WINDOW_HANDLE);
	          }
	        } else if (dependency === 'topFocus' || dependency === 'topBlur') {
	          if (isEventSupported('focus', true)) {
	            ReactBrowserEventEmitter$4.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
	            ReactBrowserEventEmitter$4.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);
	          } else if (isEventSupported('focusin')) {
	            // IE has `focusin` and `focusout` events which bubble.
	            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topFocus', 'focusin', mountAt);
	            ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent('topBlur', 'focusout', mountAt);
	          } // to make sure blur and focus event listeners are only attached once


	          isListening.topBlur = true;
	          isListening.topFocus = true;
	        } else if (topEventMapping.hasOwnProperty(dependency)) {
	          ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
	        }

	        isListening[dependency] = true;
	      }
	    }
	  },
	  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter$4.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
	  },
	  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter$4.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
	  },

	  /**
	   * Protect against document.createEvent() returning null
	   * Some popup blocker extensions appear to do this:
	   * https://github.com/facebook/react/issues/6887
	   */
	  supportsEventPageXY: function () {
	    if (!document.createEvent) {
	      return false;
	    }

	    var ev = document.createEvent('MouseEvent');
	    return ev != null && 'pageX' in ev;
	  },

	  /**
	   * Listens to window scroll and resize events. We cache scroll values so that
	   * application code can access them without triggering reflows.
	   *
	   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
	   * pageX/pageY isn't supported (legacy browsers).
	   *
	   * NOTE: Scroll events do not bubble.
	   *
	   * @see http://www.quirksmode.org/dom/events/scroll.html
	   */
	  ensureScrollValueMonitoring: function () {
	    if (hasEventPageXY === undefined) {
	      hasEventPageXY = ReactBrowserEventEmitter$4.supportsEventPageXY();
	    }

	    if (!hasEventPageXY && !isMonitoringScrollValue) {
	      var refresh = ViewportMetrics.refreshScrollValues;
	      ReactBrowserEventEmitter$4.ReactEventListener.monitorScrollValue(refresh);
	      isMonitoringScrollValue = true;
	    }
	  }
	});

	var ReactBrowserEventEmitter_1 = ReactBrowserEventEmitter$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$g = reactProdInvariant_1;
	var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	var propTypesFactory = factory_1$1;
	var React$6 = React_1;
	var PropTypes$1 = propTypesFactory(React$6.isValidElement);
	var hasReadOnlyValue = {
	  button: true,
	  checkbox: true,
	  image: true,
	  hidden: true,
	  radio: true,
	  reset: true,
	  submit: true
	};

	function _assertSingleLink(inputProps) {
	  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? _prodInvariant$g('87') : void 0;
	}

	function _assertValueLink(inputProps) {
	  _assertSingleLink(inputProps);

	  !(inputProps.value == null && inputProps.onChange == null) ? _prodInvariant$g('88') : void 0;
	}

	function _assertCheckedLink(inputProps) {
	  _assertSingleLink(inputProps);

	  !(inputProps.checked == null && inputProps.onChange == null) ? _prodInvariant$g('89') : void 0;
	}

	var propTypes$2 = {
	  value: function (props, propName, componentName) {
	    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
	      return null;
	    }

	    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	  },
	  checked: function (props, propName, componentName) {
	    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
	      return null;
	    }

	    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	  },
	  onChange: PropTypes$1.func
	};
	var loggedTypeFailures = {};

	function getDeclarationErrorAddendum$2(owner) {
	  if (owner) {
	    var name = owner.getName();

	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }

	  return '';
	}
	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */


	var LinkedValueUtils$3 = {
	  checkPropTypes: function (tagName, props, owner) {
	    for (var propName in propTypes$2) {
	      if (propTypes$2.hasOwnProperty(propName)) {
	        var error = propTypes$2[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret$1);
	      }

	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	        getDeclarationErrorAddendum$2(owner);
	      }
	    }
	  },

	  /**
	   * @param {object} inputProps Props for form component
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function (inputProps) {
	    if (inputProps.valueLink) {
	      _assertValueLink(inputProps);

	      return inputProps.valueLink.value;
	    }

	    return inputProps.value;
	  },

	  /**
	   * @param {object} inputProps Props for form component
	   * @return {*} current checked status of the input either from checked prop
	   *             or link.
	   */
	  getChecked: function (inputProps) {
	    if (inputProps.checkedLink) {
	      _assertCheckedLink(inputProps);

	      return inputProps.checkedLink.value;
	    }

	    return inputProps.checked;
	  },

	  /**
	   * @param {object} inputProps Props for form component
	   * @param {SyntheticEvent} event change event to handle
	   */
	  executeOnChange: function (inputProps, event) {
	    if (inputProps.valueLink) {
	      _assertValueLink(inputProps);

	      return inputProps.valueLink.requestChange(event.target.value);
	    } else if (inputProps.checkedLink) {
	      _assertCheckedLink(inputProps);

	      return inputProps.checkedLink.requestChange(event.target.checked);
	    } else if (inputProps.onChange) {
	      return inputProps.onChange.call(undefined, event);
	    }
	  }
	};
	var LinkedValueUtils_1 = LinkedValueUtils$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$f = reactProdInvariant_1,
	    _assign$c = objectAssign;
	var DOMPropertyOperations$1 = DOMPropertyOperations_1;
	var LinkedValueUtils$2 = LinkedValueUtils_1;
	var ReactDOMComponentTree$d = ReactDOMComponentTree_1;
	var ReactUpdates$8 = ReactUpdates_1;

	function forceUpdateIfMounted$1() {
	  if (this._rootNodeID) {
	    // DOM component is still mounted; update
	    ReactDOMInput$1.updateWrapper(this);
	  }
	}

	function isControlled(props) {
	  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
	  return usesChecked ? props.checked != null : props.value != null;
	}
	/**
	 * Implements an <input> host component that allows setting these optional
	 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
	 *
	 * If `checked` or `value` are not supplied (or null/undefined), user actions
	 * that affect the checked state or value will trigger updates to the element.
	 *
	 * If they are supplied (and not null/undefined), the rendered element will not
	 * trigger updates to the element. Instead, the props must change in order for
	 * the rendered element to be updated.
	 *
	 * The rendered element will be initialized as unchecked (or `defaultChecked`)
	 * with an empty value (or `defaultValue`).
	 *
	 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
	 */


	var ReactDOMInput$1 = {
	  getHostProps: function (inst, props) {
	    var value = LinkedValueUtils$2.getValue(props);
	    var checked = LinkedValueUtils$2.getChecked(props);

	    var hostProps = _assign$c({
	      // Make sure we set .type before any other properties (setting .value
	      // before .type means .value is lost in IE11 and below)
	      type: undefined,
	      // Make sure we set .step before .value (setting .value before .step
	      // means .value is rounded on mount, based upon step precision)
	      step: undefined,
	      // Make sure we set .min & .max before .value (to ensure proper order
	      // in corner cases such as min or max deriving from value, e.g. Issue #7170)
	      min: undefined,
	      max: undefined
	    }, props, {
	      defaultChecked: undefined,
	      defaultValue: undefined,
	      value: value != null ? value : inst._wrapperState.initialValue,
	      checked: checked != null ? checked : inst._wrapperState.initialChecked,
	      onChange: inst._wrapperState.onChange
	    });

	    return hostProps;
	  },
	  mountWrapper: function (inst, props) {

	    var defaultValue = props.defaultValue;
	    inst._wrapperState = {
	      initialChecked: props.checked != null ? props.checked : props.defaultChecked,
	      initialValue: props.value != null ? props.value : defaultValue,
	      listeners: null,
	      onChange: _handleChange$2.bind(inst),
	      controlled: isControlled(props)
	    };
	  },
	  updateWrapper: function (inst) {
	    var props = inst._currentElement.props;


	    var checked = props.checked;

	    if (checked != null) {
	      DOMPropertyOperations$1.setValueForProperty(ReactDOMComponentTree$d.getNodeFromInstance(inst), 'checked', checked || false);
	    }

	    var node = ReactDOMComponentTree$d.getNodeFromInstance(inst);
	    var value = LinkedValueUtils$2.getValue(props);

	    if (value != null) {
	      if (value === 0 && node.value === '') {
	        node.value = '0'; // Note: IE9 reports a number inputs as 'text', so check props instead.
	      } else if (props.type === 'number') {
	        // Simulate `input.valueAsNumber`. IE9 does not support it
	        var valueAsNumber = parseFloat(node.value, 10) || 0;

	        if ( // eslint-disable-next-line
	        value != valueAsNumber || // eslint-disable-next-line
	        value == valueAsNumber && node.value != value) {
	          // Cast `value` to a string to ensure the value is set correctly. While
	          // browsers typically do this as necessary, jsdom doesn't.
	          node.value = '' + value;
	        }
	      } else if (node.value !== '' + value) {
	        // Cast `value` to a string to ensure the value is set correctly. While
	        // browsers typically do this as necessary, jsdom doesn't.
	        node.value = '' + value;
	      }
	    } else {
	      if (props.value == null && props.defaultValue != null) {
	        // In Chrome, assigning defaultValue to certain input types triggers input validation.
	        // For number inputs, the display value loses trailing decimal points. For email inputs,
	        // Chrome raises "The specified value <x> is not a valid email address".
	        //
	        // Here we check to see if the defaultValue has actually changed, avoiding these problems
	        // when the user is inputting text
	        //
	        // https://github.com/facebook/react/issues/7253
	        if (node.defaultValue !== '' + props.defaultValue) {
	          node.defaultValue = '' + props.defaultValue;
	        }
	      }

	      if (props.checked == null && props.defaultChecked != null) {
	        node.defaultChecked = !!props.defaultChecked;
	      }
	    }
	  },
	  postMountWrapper: function (inst) {
	    var props = inst._currentElement.props; // This is in postMount because we need access to the DOM node, which is not
	    // available until after the component has mounted.

	    var node = ReactDOMComponentTree$d.getNodeFromInstance(inst); // Detach value from defaultValue. We won't do anything if we're working on
	    // submit or reset inputs as those values & defaultValues are linked. They
	    // are not resetable nodes so this operation doesn't matter and actually
	    // removes browser-default values (eg "Submit Query") when no value is
	    // provided.

	    switch (props.type) {
	      case 'submit':
	      case 'reset':
	        break;

	      case 'color':
	      case 'date':
	      case 'datetime':
	      case 'datetime-local':
	      case 'month':
	      case 'time':
	      case 'week':
	        // This fixes the no-show issue on iOS Safari and Android Chrome:
	        // https://github.com/facebook/react/issues/7233
	        node.value = '';
	        node.value = node.defaultValue;
	        break;

	      default:
	        node.value = node.value;
	        break;
	    } // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
	    // this is needed to work around a chrome bug where setting defaultChecked
	    // will sometimes influence the value of checked (even after detachment).
	    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
	    // We need to temporarily unset name to avoid disrupting radio button groups.


	    var name = node.name;

	    if (name !== '') {
	      node.name = '';
	    }

	    node.defaultChecked = !node.defaultChecked;
	    node.defaultChecked = !node.defaultChecked;

	    if (name !== '') {
	      node.name = name;
	    }
	  }
	};

	function _handleChange$2(event) {
	  var props = this._currentElement.props;
	  var returnValue = LinkedValueUtils$2.executeOnChange(props, event); // Here we use asap to wait until all updates have propagated, which
	  // is important when using controlled components within layers:
	  // https://github.com/facebook/react/issues/1698

	  ReactUpdates$8.asap(forceUpdateIfMounted$1, this);
	  var name = props.name;

	  if (props.type === 'radio' && name != null) {
	    var rootNode = ReactDOMComponentTree$d.getNodeFromInstance(this);
	    var queryRoot = rootNode;

	    while (queryRoot.parentNode) {
	      queryRoot = queryRoot.parentNode;
	    } // If `rootNode.form` was non-null, then we could try `form.elements`,
	    // but that sometimes behaves strangely in IE8. We could also try using
	    // `form.getElementsByName`, but that will only return direct children
	    // and won't include inputs that use the HTML5 `form=` attribute. Since
	    // the input might not even be in a form, let's just use the global
	    // `querySelectorAll` to ensure we don't miss anything.


	    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

	    for (var i = 0; i < group.length; i++) {
	      var otherNode = group[i];

	      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
	        continue;
	      } // This will throw if radio buttons rendered by different copies of React
	      // and the same name are rendered into the same form (same as #1939).
	      // That's probably okay; we don't support it just as we don't support
	      // mixing React radio buttons with non-React ones.


	      var otherInstance = ReactDOMComponentTree$d.getInstanceFromNode(otherNode);
	      !otherInstance ? _prodInvariant$f('90') : void 0; // If this is a controlled radio button group, forcing the input that
	      // was previously checked to update will cause it to be come re-checked
	      // as appropriate.

	      ReactUpdates$8.asap(forceUpdateIfMounted$1, otherInstance);
	    }
	  }

	  return returnValue;
	}

	var ReactDOMInput_1 = ReactDOMInput$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$b = objectAssign;
	var LinkedValueUtils$1 = LinkedValueUtils_1;
	var ReactDOMComponentTree$c = ReactDOMComponentTree_1;
	var ReactUpdates$7 = ReactUpdates_1;
	var didWarnValueDefaultValue = false;

	function updateOptionsIfPendingUpdateAndMounted() {
	  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
	    this._wrapperState.pendingUpdate = false;
	    var props = this._currentElement.props;
	    var value = LinkedValueUtils$1.getValue(props);

	    if (value != null) {
	      updateOptions(this, Boolean(props.multiple), value);
	    }
	  }
	}
	/**
	 * @param {ReactDOMComponent} inst
	 * @param {boolean} multiple
	 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
	 * @private
	 */


	function updateOptions(inst, multiple, propValue) {
	  var selectedValue, i;
	  var options = ReactDOMComponentTree$c.getNodeFromInstance(inst).options;

	  if (multiple) {
	    selectedValue = {};

	    for (i = 0; i < propValue.length; i++) {
	      selectedValue['' + propValue[i]] = true;
	    }

	    for (i = 0; i < options.length; i++) {
	      var selected = selectedValue.hasOwnProperty(options[i].value);

	      if (options[i].selected !== selected) {
	        options[i].selected = selected;
	      }
	    }
	  } else {
	    // Do not set `select.value` as exact behavior isn't consistent across all
	    // browsers for all cases.
	    selectedValue = '' + propValue;

	    for (i = 0; i < options.length; i++) {
	      if (options[i].value === selectedValue) {
	        options[i].selected = true;
	        return;
	      }
	    }

	    if (options.length) {
	      options[0].selected = true;
	    }
	  }
	}
	/**
	 * Implements a <select> host component that allows optionally setting the
	 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
	 * stringable. If `multiple` is true, the prop must be an array of stringables.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that change the
	 * selected option will trigger updates to the rendered options.
	 *
	 * If it is supplied (and not null/undefined), the rendered options will not
	 * update in response to user actions. Instead, the `value` prop must change in
	 * order for the rendered options to update.
	 *
	 * If `defaultValue` is provided, any options with the supplied values will be
	 * selected.
	 */


	var ReactDOMSelect$2 = {
	  getHostProps: function (inst, props) {
	    return _assign$b({}, props, {
	      onChange: inst._wrapperState.onChange,
	      value: undefined
	    });
	  },
	  mountWrapper: function (inst, props) {

	    var value = LinkedValueUtils$1.getValue(props);
	    inst._wrapperState = {
	      pendingUpdate: false,
	      initialValue: value != null ? value : props.defaultValue,
	      listeners: null,
	      onChange: _handleChange$1.bind(inst),
	      wasMultiple: Boolean(props.multiple)
	    };

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
	      didWarnValueDefaultValue = true;
	    }
	  },
	  getSelectValueContext: function (inst) {
	    // ReactDOMOption looks at this initial value so the initial generated
	    // markup has correct `selected` attributes
	    return inst._wrapperState.initialValue;
	  },
	  postUpdateWrapper: function (inst) {
	    var props = inst._currentElement.props; // After the initial mount, we control selected-ness manually so don't pass
	    // this value down

	    inst._wrapperState.initialValue = undefined;
	    var wasMultiple = inst._wrapperState.wasMultiple;
	    inst._wrapperState.wasMultiple = Boolean(props.multiple);
	    var value = LinkedValueUtils$1.getValue(props);

	    if (value != null) {
	      inst._wrapperState.pendingUpdate = false;
	      updateOptions(inst, Boolean(props.multiple), value);
	    } else if (wasMultiple !== Boolean(props.multiple)) {
	      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
	      if (props.defaultValue != null) {
	        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
	      } else {
	        // Revert the select back to its default unselected state.
	        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
	      }
	    }
	  }
	};

	function _handleChange$1(event) {
	  var props = this._currentElement.props;
	  var returnValue = LinkedValueUtils$1.executeOnChange(props, event);

	  if (this._rootNodeID) {
	    this._wrapperState.pendingUpdate = true;
	  }

	  ReactUpdates$7.asap(updateOptionsIfPendingUpdateAndMounted, this);
	  return returnValue;
	}

	var ReactDOMSelect_1 = ReactDOMSelect$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$a = objectAssign;
	var React$5 = React_1;
	var ReactDOMComponentTree$b = ReactDOMComponentTree_1;
	var ReactDOMSelect$1 = ReactDOMSelect_1;

	function flattenChildren$2(children) {
	  var content = ''; // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.

	  React$5.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }

	    if (typeof child === 'string' || typeof child === 'number') {
	      content += child;
	    }
	  });
	  return content;
	}
	/**
	 * Implements an <option> host component that warns when `selected` is set.
	 */


	var ReactDOMOption$1 = {
	  mountWrapper: function (inst, props, hostParent) {


	    var selectValue = null;

	    if (hostParent != null) {
	      var selectParent = hostParent;

	      if (selectParent._tag === 'optgroup') {
	        selectParent = selectParent._hostParent;
	      }

	      if (selectParent != null && selectParent._tag === 'select') {
	        selectValue = ReactDOMSelect$1.getSelectValueContext(selectParent);
	      }
	    } // If the value is null (e.g., no specified value or after initial mount)
	    // or missing (e.g., for <datalist>), we don't change props.selected


	    var selected = null;

	    if (selectValue != null) {
	      var value;

	      if (props.value != null) {
	        value = props.value + '';
	      } else {
	        value = flattenChildren$2(props.children);
	      }

	      selected = false;

	      if (Array.isArray(selectValue)) {
	        // multiple
	        for (var i = 0; i < selectValue.length; i++) {
	          if ('' + selectValue[i] === value) {
	            selected = true;
	            break;
	          }
	        }
	      } else {
	        selected = '' + selectValue === value;
	      }
	    }

	    inst._wrapperState = {
	      selected: selected
	    };
	  },
	  postMountWrapper: function (inst) {
	    // value="" should make a value attribute (#6219)
	    var props = inst._currentElement.props;

	    if (props.value != null) {
	      var node = ReactDOMComponentTree$b.getNodeFromInstance(inst);
	      node.setAttribute('value', props.value);
	    }
	  },
	  getHostProps: function (inst, props) {
	    var hostProps = _assign$a({
	      selected: undefined,
	      children: undefined
	    }, props); // Read state only from initial mount because <select> updates value
	    // manually; we need the initial state only for server rendering


	    if (inst._wrapperState.selected != null) {
	      hostProps.selected = inst._wrapperState.selected;
	    }

	    var content = flattenChildren$2(props.children);

	    if (content) {
	      hostProps.children = content;
	    }

	    return hostProps;
	  }
	};
	var ReactDOMOption_1 = ReactDOMOption$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$e = reactProdInvariant_1,
	    _assign$9 = objectAssign;
	var LinkedValueUtils = LinkedValueUtils_1;
	var ReactDOMComponentTree$a = ReactDOMComponentTree_1;
	var ReactUpdates$6 = ReactUpdates_1;

	function forceUpdateIfMounted() {
	  if (this._rootNodeID) {
	    // DOM component is still mounted; update
	    ReactDOMTextarea$1.updateWrapper(this);
	  }
	}
	/**
	 * Implements a <textarea> host component that allows setting `value`, and
	 * `defaultValue`. This differs from the traditional DOM API because value is
	 * usually set as PCDATA children.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that affect the
	 * value will trigger updates to the element.
	 *
	 * If `value` is supplied (and not null/undefined), the rendered element will
	 * not trigger updates to the element. Instead, the `value` prop must change in
	 * order for the rendered element to be updated.
	 *
	 * The rendered element will be initialized with an empty value, the prop
	 * `defaultValue` if specified, or the children content (deprecated).
	 */


	var ReactDOMTextarea$1 = {
	  getHostProps: function (inst, props) {
	    !(props.dangerouslySetInnerHTML == null) ? _prodInvariant$e('91') : void 0; // Always set children to the same thing. In IE9, the selection range will
	    // get reset if `textContent` is mutated.  We could add a check in setTextContent
	    // to only set the value if/when the value differs from the node value (which would
	    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
	    // The value can be a boolean or object so that's why it's forced to be a string.

	    var hostProps = _assign$9({}, props, {
	      value: undefined,
	      defaultValue: undefined,
	      children: '' + inst._wrapperState.initialValue,
	      onChange: inst._wrapperState.onChange
	    });

	    return hostProps;
	  },
	  mountWrapper: function (inst, props) {

	    var value = LinkedValueUtils.getValue(props);
	    var initialValue = value; // Only bother fetching default value if we're going to use it

	    if (value == null) {
	      var defaultValue = props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.

	      var children = props.children;

	      if (children != null) {

	        !(defaultValue == null) ? _prodInvariant$e('92') : void 0;

	        if (Array.isArray(children)) {
	          !(children.length <= 1) ? _prodInvariant$e('93') : void 0;
	          children = children[0];
	        }

	        defaultValue = '' + children;
	      }

	      if (defaultValue == null) {
	        defaultValue = '';
	      }

	      initialValue = defaultValue;
	    }

	    inst._wrapperState = {
	      initialValue: '' + initialValue,
	      listeners: null,
	      onChange: _handleChange.bind(inst)
	    };
	  },
	  updateWrapper: function (inst) {
	    var props = inst._currentElement.props;
	    var node = ReactDOMComponentTree$a.getNodeFromInstance(inst);
	    var value = LinkedValueUtils.getValue(props);

	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      var newValue = '' + value; // To avoid side effects (such as losing text selection), only set value if changed

	      if (newValue !== node.value) {
	        node.value = newValue;
	      }

	      if (props.defaultValue == null) {
	        node.defaultValue = newValue;
	      }
	    }

	    if (props.defaultValue != null) {
	      node.defaultValue = props.defaultValue;
	    }
	  },
	  postMountWrapper: function (inst) {
	    // This is in postMount because we need access to the DOM node, which is not
	    // available until after the component has mounted.
	    var node = ReactDOMComponentTree$a.getNodeFromInstance(inst);
	    var textContent = node.textContent; // Only set node.value if textContent is equal to the expected
	    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
	    // will populate textContent as well.
	    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/

	    if (textContent === inst._wrapperState.initialValue) {
	      node.value = textContent;
	    }
	  }
	};

	function _handleChange(event) {
	  var props = this._currentElement.props;
	  var returnValue = LinkedValueUtils.executeOnChange(props, event);
	  ReactUpdates$6.asap(forceUpdateIfMounted, this);
	  return returnValue;
	}

	var ReactDOMTextarea_1 = ReactDOMTextarea$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$d = reactProdInvariant_1;
	var injected = false;
	var ReactComponentEnvironment$3 = {
	  /**
	   * Optionally injectable hook for swapping out mount images in the middle of
	   * the tree.
	   */
	  replaceNodeWithMarkup: null,

	  /**
	   * Optionally injectable hook for processing a queue of child updates. Will
	   * later move into MultiChildComponents.
	   */
	  processChildrenUpdates: null,
	  injection: {
	    injectEnvironment: function (environment) {
	      !!injected ? _prodInvariant$d('104') : void 0;
	      ReactComponentEnvironment$3.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
	      ReactComponentEnvironment$3.processChildrenUpdates = environment.processChildrenUpdates;
	      injected = true;
	    }
	  }
	};
	var ReactComponentEnvironment_1 = ReactComponentEnvironment$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 */
	// TODO: Replace this with ES6: var ReactInstanceMap = new Map();


	var ReactInstanceMap$4 = {
	  /**
	   * This API should be called `delete` but we'd have to make sure to always
	   * transform these to strings for IE support. When this transform is fully
	   * supported we can rename it.
	   */
	  remove: function (key) {
	    key._reactInternalInstance = undefined;
	  },
	  get: function (key) {
	    return key._reactInternalInstance;
	  },
	  has: function (key) {
	    return key._reactInternalInstance !== undefined;
	  },
	  set: function (key, value) {
	    key._reactInternalInstance = value;
	  }
	};
	var ReactInstanceMap_1 = ReactInstanceMap$4;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$c = reactProdInvariant_1;
	var React$4 = React_1;
	var ReactNodeTypes$2 = {
	  HOST: 0,
	  COMPOSITE: 1,
	  EMPTY: 2,
	  getType: function (node) {
	    if (node === null || node === false) {
	      return ReactNodeTypes$2.EMPTY;
	    } else if (React$4.isValidElement(node)) {
	      if (typeof node.type === 'function') {
	        return ReactNodeTypes$2.COMPOSITE;
	      } else {
	        return ReactNodeTypes$2.HOST;
	      }
	    }

	    _prodInvariant$c('26', node) ;
	  }
	};
	var ReactNodeTypes_1 = ReactNodeTypes$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 * 
	 */

	var hasOwnProperty$d = Object.prototype.hasOwnProperty;
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */

	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */


	function shallowEqual$2(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  } // Test for A's keys different from B.


	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty$d.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	var shallowEqual_1 = shallowEqual$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Given a `prevElement` and `nextElement`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are elements. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevElement
	 * @param {?object} nextElement
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */


	function shouldUpdateReactComponent$3(prevElement, nextElement) {
	  var prevEmpty = prevElement === null || prevElement === false;
	  var nextEmpty = nextElement === null || nextElement === false;

	  if (prevEmpty || nextEmpty) {
	    return prevEmpty === nextEmpty;
	  }

	  var prevType = typeof prevElement;
	  var nextType = typeof nextElement;

	  if (prevType === 'string' || prevType === 'number') {
	    return nextType === 'string' || nextType === 'number';
	  } else {
	    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
	  }
	}

	var shouldUpdateReactComponent_1 = shouldUpdateReactComponent$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$b = reactProdInvariant_1,
	    _assign$8 = objectAssign;
	var React$3 = React_1;
	var ReactComponentEnvironment$2 = ReactComponentEnvironment_1;
	var ReactCurrentOwner = ReactCurrentOwner_1;
	var ReactErrorUtils = ReactErrorUtils_1;
	var ReactInstanceMap$3 = ReactInstanceMap_1;
	var ReactNodeTypes$1 = ReactNodeTypes_1;
	var ReactReconciler$4 = ReactReconciler_1;

	var emptyObject$1 = emptyObject_1;
	var shallowEqual$1 = shallowEqual_1;
	var shouldUpdateReactComponent$2 = shouldUpdateReactComponent_1;
	var CompositeTypes = {
	  ImpureClass: 0,
	  PureClass: 1,
	  StatelessFunctional: 2
	};

	function StatelessComponent(Component) {}

	StatelessComponent.prototype.render = function () {
	  var Component = ReactInstanceMap$3.get(this)._currentElement.type;

	  var element = Component(this.props, this.context, this.updater);
	  return element;
	};

	function shouldConstruct(Component) {
	  return !!(Component.prototype && Component.prototype.isReactComponent);
	}

	function isPureComponent(Component) {
	  return !!(Component.prototype && Component.prototype.isPureReactComponent);
	} // Separated into a function to contain deoptimizations caused by try/finally.
	/**
	 * ------------------ The Life-Cycle of a Composite Component ------------------
	 *
	 * - constructor: Initialization of state. The instance is now retained.
	 *   - componentWillMount
	 *   - render
	 *   - [children's constructors]
	 *     - [children's componentWillMount and render]
	 *     - [children's componentDidMount]
	 *     - componentDidMount
	 *
	 *       Update Phases:
	 *       - componentWillReceiveProps (only called if parent updated)
	 *       - shouldComponentUpdate
	 *         - componentWillUpdate
	 *           - render
	 *           - [children's constructors or receive props phases]
	 *         - componentDidUpdate
	 *
	 *     - componentWillUnmount
	 *     - [children's componentWillUnmount]
	 *   - [children destroyed]
	 * - (destroyed): The instance is now blank, released by React and ready for GC.
	 *
	 * -----------------------------------------------------------------------------
	 */

	/**
	 * An incrementing ID assigned to each component when it is mounted. This is
	 * used to enforce the order in which `ReactUpdates` updates dirty components.
	 *
	 * @private
	 */


	var nextMountID = 1;
	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */

	var ReactCompositeComponent$1 = {
	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {ReactElement} element
	   * @final
	   * @internal
	   */
	  construct: function (element) {
	    this._currentElement = element;
	    this._rootNodeID = 0;
	    this._compositeType = null;
	    this._instance = null;
	    this._hostParent = null;
	    this._hostContainerInfo = null; // See ReactUpdateQueue

	    this._updateBatchNumber = null;
	    this._pendingElement = null;
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    this._renderedNodeType = null;
	    this._renderedComponent = null;
	    this._context = null;
	    this._mountOrder = 0;
	    this._topLevelWrapper = null; // See ReactUpdates and ReactUpdateQueue.

	    this._pendingCallbacks = null; // ComponentWillUnmount shall only be called once

	    this._calledComponentWillUnmount = false;
	  },

	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} hostParent
	   * @param {?object} hostContainerInfo
	   * @param {?object} context
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {

	    this._context = context;
	    this._mountOrder = nextMountID++;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	    var publicProps = this._currentElement.props;

	    var publicContext = this._processContext(context);

	    var Component = this._currentElement.type;
	    var updateQueue = transaction.getUpdateQueue(); // Initialize the public class

	    var doConstruct = shouldConstruct(Component);

	    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);

	    var renderedElement; // Support functional components

	    if (!doConstruct && (inst == null || inst.render == null)) {
	      renderedElement = inst;
	      !(inst === null || inst === false || React$3.isValidElement(inst)) ? _prodInvariant$b('105', Component.displayName || Component.name || 'Component') : void 0;
	      inst = new StatelessComponent(Component);
	      this._compositeType = CompositeTypes.StatelessFunctional;
	    } else {
	      if (isPureComponent(Component)) {
	        this._compositeType = CompositeTypes.PureClass;
	      } else {
	        this._compositeType = CompositeTypes.ImpureClass;
	      }
	    }
	    // simpler class abstractions, we set them up after the fact.


	    inst.props = publicProps;
	    inst.context = publicContext;
	    inst.refs = emptyObject$1;
	    inst.updater = updateQueue;
	    this._instance = inst; // Store a reference from the instance back to the internal representation

	    ReactInstanceMap$3.set(inst, this);

	    var initialState = inst.state;

	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }

	    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? _prodInvariant$b('106', this.getName() || 'ReactCompositeComponent') : void 0;
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    var markup;

	    if (inst.unstable_handleError) {
	      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    } else {
	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    }

	    if (inst.componentDidMount) {
	      {
	        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
	      }
	    }

	    return markup;
	  },
	  _constructComponent: function (doConstruct, publicProps, publicContext, updateQueue) {
	    {
	      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
	    }
	  },
	  _constructComponentWithoutOwner: function (doConstruct, publicProps, publicContext, updateQueue) {
	    var Component = this._currentElement.type;

	    if (doConstruct) {
	      {
	        return new Component(publicProps, publicContext, updateQueue);
	      }
	    } // This can still be an instance in case of factory components
	    // but we'll count this as time spent rendering as the more common case.


	    {
	      return Component(publicProps, publicContext, updateQueue);
	    }
	  },
	  performInitialMountWithErrorHandling: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
	    var markup;
	    var checkpoint = transaction.checkpoint();

	    try {
	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    } catch (e) {
	      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
	      transaction.rollback(checkpoint);

	      this._instance.unstable_handleError(e);

	      if (this._pendingStateQueue) {
	        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
	      }

	      checkpoint = transaction.checkpoint();

	      this._renderedComponent.unmountComponent(true);

	      transaction.rollback(checkpoint); // Try again - we've informed the component about the error, so they can render an error message this time.
	      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).

	      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
	    }

	    return markup;
	  },
	  performInitialMount: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
	    var inst = this._instance;
	    var debugID = 0;

	    if (inst.componentWillMount) {
	      {
	        inst.componentWillMount();
	      } // When mounting, calls to `setState` by `componentWillMount` will set
	      // `this._pendingStateQueue` without triggering a re-render.


	      if (this._pendingStateQueue) {
	        inst.state = this._processPendingState(inst.props, inst.context);
	      }
	    } // If not a stateless component, we now render


	    if (renderedElement === undefined) {
	      renderedElement = this._renderValidatedComponent();
	    }

	    var nodeType = ReactNodeTypes$1.getType(renderedElement);
	    this._renderedNodeType = nodeType;

	    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes$1.EMPTY
	    /* shouldHaveDebugID */
	    );

	    this._renderedComponent = child;
	    var markup = ReactReconciler$4.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);

	    return markup;
	  },
	  getHostNode: function () {
	    return ReactReconciler$4.getHostNode(this._renderedComponent);
	  },

	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (safely) {
	    if (!this._renderedComponent) {
	      return;
	    }

	    var inst = this._instance;

	    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
	      inst._calledComponentWillUnmount = true;

	      if (safely) {
	        var name = this.getName() + '.componentWillUnmount()';
	        ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
	      } else {
	        {
	          inst.componentWillUnmount();
	        }
	      }
	    }

	    if (this._renderedComponent) {
	      ReactReconciler$4.unmountComponent(this._renderedComponent, safely);
	      this._renderedNodeType = null;
	      this._renderedComponent = null;
	      this._instance = null;
	    } // Reset pending fields
	    // Even if this component is scheduled for another update in ReactUpdates,
	    // it would still be ignored because these fields are reset.


	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    this._pendingCallbacks = null;
	    this._pendingElement = null; // These fields do not really need to be reset since this object is no
	    // longer accessible.

	    this._context = null;
	    this._rootNodeID = 0;
	    this._topLevelWrapper = null; // Delete the reference from the instance to this internal representation
	    // which allow the internals to be properly cleaned up even if the user
	    // leaks a reference to the public instance.

	    ReactInstanceMap$3.remove(inst); // Some existing components rely on inst.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: inst.props = null;
	    // TODO: inst.state = null;
	    // TODO: inst.context = null;
	  },

	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _maskContext: function (context) {
	    var Component = this._currentElement.type;
	    var contextTypes = Component.contextTypes;

	    if (!contextTypes) {
	      return emptyObject$1;
	    }

	    var maskedContext = {};

	    for (var contextName in contextTypes) {
	      maskedContext[contextName] = context[contextName];
	    }

	    return maskedContext;
	  },

	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`, and asserts that they are valid.
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _processContext: function (context) {
	    var maskedContext = this._maskContext(context);

	    return maskedContext;
	  },

	  /**
	   * @param {object} currentContext
	   * @return {object}
	   * @private
	   */
	  _processChildContext: function (currentContext) {
	    var Component = this._currentElement.type;
	    var inst = this._instance;
	    var childContext;

	    if (inst.getChildContext) {
	      {
	        childContext = inst.getChildContext();
	      }
	    }

	    if (childContext) {
	      !(typeof Component.childContextTypes === 'object') ? _prodInvariant$b('107', this.getName() || 'ReactCompositeComponent') : void 0;

	      for (var name in childContext) {
	        !(name in Component.childContextTypes) ? _prodInvariant$b('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
	      }

	      return _assign$8({}, currentContext, childContext);
	    }

	    return currentContext;
	  },

	  /**
	   * Assert that the context types are valid
	   *
	   * @param {object} typeSpecs Map of context field to a ReactPropType
	   * @param {object} values Runtime values that need to be type-checked
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @private
	   */
	  _checkContextTypes: function (typeSpecs, values, location) {
	  },
	  receiveComponent: function (nextElement, transaction, nextContext) {
	    var prevElement = this._currentElement;
	    var prevContext = this._context;
	    this._pendingElement = null;
	    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
	  },

	  /**
	   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
	   * is set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (transaction) {
	    if (this._pendingElement != null) {
	      ReactReconciler$4.receiveComponent(this, this._pendingElement, transaction, this._context);
	    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
	      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
	    } else {
	      this._updateBatchNumber = null;
	    }
	  },

	  /**
	   * Perform an update to a mounted component. The componentWillReceiveProps and
	   * shouldComponentUpdate methods are called, then (assuming the update isn't
	   * skipped) the remaining update lifecycle methods are called and the DOM
	   * representation is updated.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevParentElement
	   * @param {ReactElement} nextParentElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
	    var inst = this._instance;
	    !(inst != null) ? _prodInvariant$b('136', this.getName() || 'ReactCompositeComponent') : void 0;
	    var willReceive = false;
	    var nextContext; // Determine if the context has changed or not

	    if (this._context === nextUnmaskedContext) {
	      nextContext = inst.context;
	    } else {
	      nextContext = this._processContext(nextUnmaskedContext);
	      willReceive = true;
	    }

	    var prevProps = prevParentElement.props;
	    var nextProps = nextParentElement.props; // Not a simple state update but a props update

	    if (prevParentElement !== nextParentElement) {
	      willReceive = true;
	    } // An update here will schedule an update but immediately set
	    // _pendingStateQueue which will ensure that any state updates gets
	    // immediately reconciled instead of waiting for the next batch.


	    if (willReceive && inst.componentWillReceiveProps) {
	      {
	        inst.componentWillReceiveProps(nextProps, nextContext);
	      }
	    }

	    var nextState = this._processPendingState(nextProps, nextContext);

	    var shouldUpdate = true;

	    if (!this._pendingForceUpdate) {
	      if (inst.shouldComponentUpdate) {
	        {
	          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
	        }
	      } else {
	        if (this._compositeType === CompositeTypes.PureClass) {
	          shouldUpdate = !shallowEqual$1(prevProps, nextProps) || !shallowEqual$1(inst.state, nextState);
	        }
	      }
	    }

	    this._updateBatchNumber = null;

	    if (shouldUpdate) {
	      this._pendingForceUpdate = false; // Will set `this.props`, `this.state` and `this.context`.

	      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
	    } else {
	      // If it's determined that a component should not update, we still want
	      // to set props and state but we shortcut the rest of the update.
	      this._currentElement = nextParentElement;
	      this._context = nextUnmaskedContext;
	      inst.props = nextProps;
	      inst.state = nextState;
	      inst.context = nextContext;
	    }
	  },
	  _processPendingState: function (props, context) {
	    var inst = this._instance;
	    var queue = this._pendingStateQueue;
	    var replace = this._pendingReplaceState;
	    this._pendingReplaceState = false;
	    this._pendingStateQueue = null;

	    if (!queue) {
	      return inst.state;
	    }

	    if (replace && queue.length === 1) {
	      return queue[0];
	    }

	    var nextState = _assign$8({}, replace ? queue[0] : inst.state);

	    for (var i = replace ? 1 : 0; i < queue.length; i++) {
	      var partial = queue[i];

	      _assign$8(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
	    }

	    return nextState;
	  },

	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {ReactElement} nextElement Next element
	   * @param {object} nextProps Next public object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {?object} nextContext Next public object to set as context.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {?object} unmaskedContext
	   * @private
	   */
	  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {

	    var inst = this._instance;
	    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
	    var prevProps;
	    var prevState;
	    var prevContext;

	    if (hasComponentDidUpdate) {
	      prevProps = inst.props;
	      prevState = inst.state;
	      prevContext = inst.context;
	    }

	    if (inst.componentWillUpdate) {
	      {
	        inst.componentWillUpdate(nextProps, nextState, nextContext);
	      }
	    }

	    this._currentElement = nextElement;
	    this._context = unmaskedContext;
	    inst.props = nextProps;
	    inst.state = nextState;
	    inst.context = nextContext;

	    this._updateRenderedComponent(transaction, unmaskedContext);

	    if (hasComponentDidUpdate) {
	      {
	        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
	      }
	    }
	  },

	  /**
	   * Call the component's `render` method and update the DOM accordingly.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  _updateRenderedComponent: function (transaction, context) {
	    var prevComponentInstance = this._renderedComponent;
	    var prevRenderedElement = prevComponentInstance._currentElement;

	    var nextRenderedElement = this._renderValidatedComponent();

	    var debugID = 0;

	    if (shouldUpdateReactComponent$2(prevRenderedElement, nextRenderedElement)) {
	      ReactReconciler$4.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
	    } else {
	      var oldHostNode = ReactReconciler$4.getHostNode(prevComponentInstance);
	      ReactReconciler$4.unmountComponent(prevComponentInstance, false);
	      var nodeType = ReactNodeTypes$1.getType(nextRenderedElement);
	      this._renderedNodeType = nodeType;

	      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes$1.EMPTY
	      /* shouldHaveDebugID */
	      );

	      this._renderedComponent = child;
	      var nextMarkup = ReactReconciler$4.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID);

	      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
	    }
	  },

	  /**
	   * Overridden in shallow rendering.
	   *
	   * @protected
	   */
	  _replaceNodeWithMarkup: function (oldHostNode, nextMarkup, prevInstance) {
	    ReactComponentEnvironment$2.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
	  },

	  /**
	   * @protected
	   */
	  _renderValidatedComponentWithoutOwnerOrContext: function () {
	    var inst = this._instance;
	    var renderedElement;

	    {
	      renderedElement = inst.render();
	    }

	    return renderedElement;
	  },

	  /**
	   * @private
	   */
	  _renderValidatedComponent: function () {
	    var renderedElement;

	    if (this._compositeType !== CompositeTypes.StatelessFunctional) {
	      ReactCurrentOwner.current = this;

	      try {
	        renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
	      } finally {
	        ReactCurrentOwner.current = null;
	      }
	    } else {
	      renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
	    }

	    !( // TODO: An `isValidNode` function would probably be more appropriate
	    renderedElement === null || renderedElement === false || React$3.isValidElement(renderedElement)) ? _prodInvariant$b('109', this.getName() || 'ReactCompositeComponent') : void 0;
	    return renderedElement;
	  },

	  /**
	   * Lazily allocates the refs object and stores `component` as `ref`.
	   *
	   * @param {string} ref Reference name.
	   * @param {component} component Component to store as `ref`.
	   * @final
	   * @private
	   */
	  attachRef: function (ref, component) {
	    var inst = this.getPublicInstance();
	    !(inst != null) ? _prodInvariant$b('110') : void 0;
	    var publicComponentInstance = component.getPublicInstance();

	    var refs = inst.refs === emptyObject$1 ? inst.refs = {} : inst.refs;
	    refs[ref] = publicComponentInstance;
	  },

	  /**
	   * Detaches a reference name.
	   *
	   * @param {string} ref Name to dereference.
	   * @final
	   * @private
	   */
	  detachRef: function (ref) {
	    var refs = this.getPublicInstance().refs;
	    delete refs[ref];
	  },

	  /**
	   * Get a text description of the component that can be used to identify it
	   * in error messages.
	   * @return {string} The name or null.
	   * @internal
	   */
	  getName: function () {
	    var type = this._currentElement.type;
	    var constructor = this._instance && this._instance.constructor;
	    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
	  },

	  /**
	   * Get the publicly accessible representation of this component - i.e. what
	   * is exposed by refs and returned by render. Can be null for stateless
	   * components.
	   *
	   * @return {ReactComponent} the public component instance.
	   * @internal
	   */
	  getPublicInstance: function () {
	    var inst = this._instance;

	    if (this._compositeType === CompositeTypes.StatelessFunctional) {
	      return null;
	    }

	    return inst;
	  },
	  // Stub
	  _instantiateReactComponent: null
	};
	var ReactCompositeComponent_1 = ReactCompositeComponent$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyComponentFactory;
	var ReactEmptyComponentInjection = {
	  injectEmptyComponentFactory: function (factory) {
	    emptyComponentFactory = factory;
	  }
	};
	var ReactEmptyComponent$2 = {
	  create: function (instantiate) {
	    return emptyComponentFactory(instantiate);
	  }
	};
	ReactEmptyComponent$2.injection = ReactEmptyComponentInjection;
	var ReactEmptyComponent_1 = ReactEmptyComponent$2;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$a = reactProdInvariant_1;
	var genericComponentClass = null;
	var textComponentClass = null;
	var ReactHostComponentInjection = {
	  // This accepts a class that receives the tag string. This is a catch all
	  // that can render any kind of tag.
	  injectGenericComponentClass: function (componentClass) {
	    genericComponentClass = componentClass;
	  },
	  // This accepts a text component class that takes the text string to be
	  // rendered as props.
	  injectTextComponentClass: function (componentClass) {
	    textComponentClass = componentClass;
	  }
	};
	/**
	 * Get a host internal component class for a specific tag.
	 *
	 * @param {ReactElement} element The element to create.
	 * @return {function} The internal class constructor function.
	 */

	function createInternalComponent(element) {
	  !genericComponentClass ? _prodInvariant$a('111', element.type) : void 0;
	  return new genericComponentClass(element);
	}
	/**
	 * @param {ReactText} text
	 * @return {ReactComponent}
	 */


	function createInstanceForText(text) {
	  return new textComponentClass(text);
	}
	/**
	 * @param {ReactComponent} component
	 * @return {boolean}
	 */


	function isTextComponent(component) {
	  return component instanceof textComponentClass;
	}

	var ReactHostComponent$2 = {
	  createInternalComponent: createInternalComponent,
	  createInstanceForText: createInstanceForText,
	  isTextComponent: isTextComponent,
	  injection: ReactHostComponentInjection
	};
	var ReactHostComponent_1 = ReactHostComponent$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$9 = reactProdInvariant_1,
	    _assign$7 = objectAssign;
	var ReactCompositeComponent = ReactCompositeComponent_1;
	var ReactEmptyComponent$1 = ReactEmptyComponent_1;
	var ReactHostComponent$1 = ReactHostComponent_1;

	var ReactCompositeComponentWrapper = function (element) {
	  this.construct(element);
	};

	function getDeclarationErrorAddendum$1(owner) {
	  if (owner) {
	    var name = owner.getName();

	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }

	  return '';
	}
	/**
	 * Check if the type reference is a known internal type. I.e. not a user
	 * provided composite type.
	 *
	 * @param {function} type
	 * @return {boolean} Returns true if this is a valid internal type.
	 */


	function isInternalComponentType(type) {
	  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
	}
	/**
	 * Given a ReactNode, create an instance that will actually be mounted.
	 *
	 * @param {ReactNode} node
	 * @param {boolean} shouldHaveDebugID
	 * @return {object} A new instance of the element's constructor.
	 * @protected
	 */


	function instantiateReactComponent$2(node, shouldHaveDebugID) {
	  var instance;

	  if (node === null || node === false) {
	    instance = ReactEmptyComponent$1.create(instantiateReactComponent$2);
	  } else if (typeof node === 'object') {
	    var element = node;
	    var type = element.type;

	    if (typeof type !== 'function' && typeof type !== 'string') {
	      var info = '';

	      info += getDeclarationErrorAddendum$1(element._owner);
	      _prodInvariant$9('130', type == null ? type : typeof type, info) ;
	    } // Special case string values


	    if (typeof element.type === 'string') {
	      instance = ReactHostComponent$1.createInternalComponent(element);
	    } else if (isInternalComponentType(element.type)) {
	      // This is temporarily available for custom components that are not string
	      // representations. I.e. ART. Once those are updated to use the string
	      // representation, we can drop this code path.
	      instance = new element.type(element); // We renamed this. Allow the old name for compat. :(

	      if (!instance.getHostNode) {
	        instance.getHostNode = instance.getNativeNode;
	      }
	    } else {
	      instance = new ReactCompositeComponentWrapper(element);
	    }
	  } else if (typeof node === 'string' || typeof node === 'number') {
	    instance = ReactHostComponent$1.createInstanceForText(node);
	  } else {
	    _prodInvariant$9('131', typeof node) ;
	  }
	  // respectively. Instead of using expandos on components, we should be
	  // storing the state needed by the diffing algorithms elsewhere.


	  instance._mountIndex = 0;
	  instance._mountImage = null;

	  return instance;
	}

	_assign$7(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
	  _instantiateReactComponent: instantiateReactComponent$2
	});

	var instantiateReactComponent_1 = instantiateReactComponent$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */


	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	  return '$' + escapedString;
	}
	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */


	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);
	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils$1 = {
	  escape: escape,
	  unescape: unescape
	};
	var KeyEscapeUtils_1 = KeyEscapeUtils$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	// nor polyfill, then a plain number is used for performance.


	var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
	var ReactElementSymbol = REACT_ELEMENT_TYPE$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	/* global Symbol */


	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */

	function getIteratorFn$1(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	var getIteratorFn_1 = getIteratorFn$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$8 = reactProdInvariant_1;
	var REACT_ELEMENT_TYPE = ReactElementSymbol;
	var getIteratorFn = getIteratorFn_1;
	var KeyEscapeUtils = KeyEscapeUtils_1;
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */

	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  } // Implicit key determined by the index in the set


	  return index.toString(36);
	}
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */


	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.

	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);

	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;

	      if (iteratorFn !== children.entries) {
	        var ii = 0;

	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {


	        while (!(step = iterator.next()).done) {
	          var entry = step.value;

	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';

	      var childrenString = String(children);
	      _prodInvariant$8('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) ;
	    }
	  }

	  return subtreeCount;
	}
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */


	function traverseAllChildren$2(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	var traverseAllChildren_1 = traverseAllChildren$2;

	/**
	 * Copyright (c) 2016-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString // Take an example native function source for comparison
	  .call(hasOwnProperty // Strip regex characters so we can use it for regex
	  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&' // Remove hasOwnProperty from the template to make it generic
	  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	// Array.from
	typeof Array.from === 'function' && // Map
	typeof Map === 'function' && isNative(Map) && // Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) && // Set
	typeof Set === 'function' && isNative(Set) && // Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactReconciler$3 = ReactReconciler_1;
	var instantiateReactComponent$1 = instantiateReactComponent_1;
	var shouldUpdateReactComponent$1 = shouldUpdateReactComponent_1;
	var traverseAllChildren$1 = traverseAllChildren_1;

	if (typeof process !== 'undefined' && process.env && "production" === 'test') ;

	function instantiateChild(childInstances, child, name, selfDebugID) {
	  // We found a component instance.
	  var keyUnique = childInstances[name] === undefined;

	  if (child != null && keyUnique) {
	    childInstances[name] = instantiateReactComponent$1(child);
	  }
	}
	/**
	 * ReactChildReconciler provides helpers for initializing or updating a set of
	 * children. Its output is suitable for passing it onto ReactMultiChild which
	 * does diffed reordering and insertion.
	 */


	var ReactChildReconciler$1 = {
	  /**
	   * Generates a "mount image" for each of the supplied children. In the case
	   * of `ReactDOMComponent`, a mount image is a string of markup.
	   *
	   * @param {?object} nestedChildNodes Nested child maps.
	   * @return {?object} A set of child instances.
	   * @internal
	   */
	  instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID) // 0 in production and for roots
	  {
	    if (nestedChildNodes == null) {
	      return null;
	    }

	    var childInstances = {};

	    {
	      traverseAllChildren$1(nestedChildNodes, instantiateChild, childInstances);
	    }

	    return childInstances;
	  },

	  /**
	   * Updates the rendered children and returns a new set of children.
	   *
	   * @param {?object} prevChildren Previously initialized set of children.
	   * @param {?object} nextChildren Flat child element maps.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @return {?object} A new set of child instances.
	   * @internal
	   */
	  updateChildren: function (prevChildren, nextChildren, mountImages, removedNodes, transaction, hostParent, hostContainerInfo, context, selfDebugID) // 0 in production and for roots
	  {
	    // We currently don't have a way to track moves here but if we use iterators
	    // instead of for..in we can zip the iterators and check if an item has
	    // moved.
	    // TODO: If nothing has changed, return the prevChildren object so that we
	    // can quickly bailout if nothing has changed.
	    if (!nextChildren && !prevChildren) {
	      return;
	    }

	    var name;
	    var prevChild;

	    for (name in nextChildren) {
	      if (!nextChildren.hasOwnProperty(name)) {
	        continue;
	      }

	      prevChild = prevChildren && prevChildren[name];
	      var prevElement = prevChild && prevChild._currentElement;
	      var nextElement = nextChildren[name];

	      if (prevChild != null && shouldUpdateReactComponent$1(prevElement, nextElement)) {
	        ReactReconciler$3.receiveComponent(prevChild, nextElement, transaction, context);
	        nextChildren[name] = prevChild;
	      } else {
	        if (prevChild) {
	          removedNodes[name] = ReactReconciler$3.getHostNode(prevChild);
	          ReactReconciler$3.unmountComponent(prevChild, false);
	        } // The child must be instantiated before it's mounted.


	        var nextChildInstance = instantiateReactComponent$1(nextElement);
	        nextChildren[name] = nextChildInstance; // Creating mount image now ensures refs are resolved in right order
	        // (see https://github.com/facebook/react/pull/7101 for explanation).

	        var nextChildMountImage = ReactReconciler$3.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID);
	        mountImages.push(nextChildMountImage);
	      }
	    } // Unmount children that are no longer present.


	    for (name in prevChildren) {
	      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
	        prevChild = prevChildren[name];
	        removedNodes[name] = ReactReconciler$3.getHostNode(prevChild);
	        ReactReconciler$3.unmountComponent(prevChild, false);
	      }
	    }
	  },

	  /**
	   * Unmounts all rendered children. This should be used to clean up children
	   * when this component is unmounted.
	   *
	   * @param {?object} renderedChildren Previously initialized set of children.
	   * @internal
	   */
	  unmountChildren: function (renderedChildren, safely) {
	    for (var name in renderedChildren) {
	      if (renderedChildren.hasOwnProperty(name)) {
	        var renderedChild = renderedChildren[name];
	        ReactReconciler$3.unmountComponent(renderedChild, safely);
	      }
	    }
	  }
	};
	var ReactChildReconciler_1 = ReactChildReconciler$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	var traverseAllChildren = traverseAllChildren_1;

	if (typeof process !== 'undefined' && process.env && "production" === 'test') ;
	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 * @param {number=} selfDebugID Optional debugID of the current internal instance.
	 */


	function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
	  // We found a component instance.
	  if (traverseContext && typeof traverseContext === 'object') {
	    var result = traverseContext;
	    var keyUnique = result[name] === undefined;

	    if (keyUnique && child != null) {
	      result[name] = child;
	    }
	  }
	}
	/**
	 * Flattens children that are typically specified as `props.children`. Any null
	 * children will not be included in the resulting object.
	 * @return {!object} flattened children keyed by name.
	 */


	function flattenChildren$1(children, selfDebugID) {
	  if (children == null) {
	    return children;
	  }

	  var result = {};

	  {
	    traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  }

	  return result;
	}

	var flattenChildren_1 = flattenChildren$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$7 = reactProdInvariant_1;
	var ReactComponentEnvironment$1 = ReactComponentEnvironment_1;
	var ReactReconciler$2 = ReactReconciler_1;
	var ReactChildReconciler = ReactChildReconciler_1;
	var flattenChildren = flattenChildren_1;
	/**
	 * Make an update for markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */

	function makeInsertMarkup(markup, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'INSERT_MARKUP',
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	/**
	 * Make an update for moving an existing element to another index.
	 *
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */


	function makeMove(child, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'MOVE_EXISTING',
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: ReactReconciler$2.getHostNode(child),
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	/**
	 * Make an update for removing an element at an index.
	 *
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */


	function makeRemove(child, node) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'REMOVE_NODE',
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: node,
	    toIndex: null,
	    afterNode: null
	  };
	}
	/**
	 * Make an update for setting the markup of a node.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @private
	 */


	function makeSetMarkup(markup) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'SET_MARKUP',
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	/**
	 * Make an update for setting the text content.
	 *
	 * @param {string} textContent Text content to set.
	 * @private
	 */


	function makeTextContent(textContent) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: 'TEXT_CONTENT',
	    content: textContent,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	/**
	 * Push an update, if any, onto the queue. Creates a new queue if none is
	 * passed and always returns the queue. Mutative.
	 */


	function enqueue(queue, update) {
	  if (update) {
	    queue = queue || [];
	    queue.push(update);
	  }

	  return queue;
	}
	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */


	function processQueue(inst, updateQueue) {
	  ReactComponentEnvironment$1.processChildrenUpdates(inst, updateQueue);
	}
	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */


	var ReactMultiChild$1 = {
	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {
	    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {

	      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
	    },
	    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
	      var nextChildren;
	      var selfDebugID = 0;

	      nextChildren = flattenChildren(nextNestedChildrenElements);
	      ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
	      return nextChildren;
	    },

	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function (nestedChildren, transaction, context) {
	      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);

	      this._renderedChildren = children;
	      var mountImages = [];
	      var index = 0;

	      for (var name in children) {
	        if (children.hasOwnProperty(name)) {
	          var child = children[name];
	          var selfDebugID = 0;

	          var mountImage = ReactReconciler$2.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
	          child._mountIndex = index++;
	          mountImages.push(mountImage);
	        }
	      }

	      return mountImages;
	    },

	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function (nextContent) {
	      var prevChildren = this._renderedChildren; // Remove any rendered children.

	      ReactChildReconciler.unmountChildren(prevChildren, false);

	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	          _prodInvariant$7('118') ;
	        }
	      } // Set new text content.


	      var updates = [makeTextContent(nextContent)];
	      processQueue(this, updates);
	    },

	    /**
	     * Replaces any rendered children with a markup string.
	     *
	     * @param {string} nextMarkup String of markup.
	     * @internal
	     */
	    updateMarkup: function (nextMarkup) {
	      var prevChildren = this._renderedChildren; // Remove any rendered children.

	      ReactChildReconciler.unmountChildren(prevChildren, false);

	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	          _prodInvariant$7('118') ;
	        }
	      }

	      var updates = [makeSetMarkup(nextMarkup)];
	      processQueue(this, updates);
	    },

	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      // Hook used by React ART
	      this._updateChildren(nextNestedChildrenElements, transaction, context);
	    },

	    /**
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      var prevChildren = this._renderedChildren;
	      var removedNodes = {};
	      var mountImages = [];

	      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);

	      if (!nextChildren && !prevChildren) {
	        return;
	      }

	      var updates = null;
	      var name; // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.

	      var nextIndex = 0;
	      var lastIndex = 0; // `nextMountIndex` will increment for each newly mounted child.

	      var nextMountIndex = 0;
	      var lastPlacedNode = null;

	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }

	        var prevChild = prevChildren && prevChildren[name];
	        var nextChild = nextChildren[name];

	        if (prevChild === nextChild) {
	          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex); // The `removedNodes` loop below will actually remove the child.
	          } // The child must be instantiated before it's mounted.


	          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
	          nextMountIndex++;
	        }

	        nextIndex++;
	        lastPlacedNode = ReactReconciler$2.getHostNode(nextChild);
	      } // Remove children that are no longer present.


	      for (name in removedNodes) {
	        if (removedNodes.hasOwnProperty(name)) {
	          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
	        }
	      }

	      if (updates) {
	        processQueue(this, updates);
	      }

	      this._renderedChildren = nextChildren;
	    },

	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted. It does not actually perform any
	     * backend operations.
	     *
	     * @internal
	     */
	    unmountChildren: function (safely) {
	      var renderedChildren = this._renderedChildren;
	      ReactChildReconciler.unmountChildren(renderedChildren, safely);
	      this._renderedChildren = null;
	    },

	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function (child, afterNode, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        return makeMove(child, afterNode, toIndex);
	      }
	    },

	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @param {string} mountImage Markup to insert.
	     * @protected
	     */
	    createChild: function (child, afterNode, mountImage) {
	      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
	    },

	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function (child, node) {
	      return makeRemove(child, node);
	    },

	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildAtIndex: function (child, mountImage, afterNode, index, transaction, context) {
	      child._mountIndex = index;
	      return this.createChild(child, afterNode, mountImage);
	    },

	    /**
	     * Unmounts a rendered child.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @private
	     */
	    _unmountChild: function (child, node) {
	      var update = this.removeChild(child, node);
	      child._mountIndex = null;
	      return update;
	    }
	  }
	};
	var ReactMultiChild_1 = ReactMultiChild$1;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$6 = reactProdInvariant_1;
	var ReactInstanceMap$2 = ReactInstanceMap_1;
	var ReactUpdates$5 = ReactUpdates_1;

	function enqueueUpdate(internalInstance) {
	  ReactUpdates$5.enqueueUpdate(internalInstance);
	}

	function formatUnexpectedArgument(arg) {
	  var type = typeof arg;

	  if (type !== 'object') {
	    return type;
	  }

	  var displayName = arg.constructor && arg.constructor.name || type;
	  var keys = Object.keys(arg);

	  if (keys.length > 0 && keys.length < 20) {
	    return displayName + ' (keys: ' + keys.join(', ') + ')';
	  }

	  return displayName;
	}

	function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
	  var internalInstance = ReactInstanceMap$2.get(publicInstance);

	  if (!internalInstance) {

	    return null;
	  }

	  return internalInstance;
	}
	/**
	 * ReactUpdateQueue allows for state updates to be scheduled into a later
	 * reconciliation step.
	 */


	var ReactUpdateQueue$3 = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {

	    var internalInstance = ReactInstanceMap$2.get(publicInstance);

	    if (internalInstance) {
	      // During componentWillMount and render this will still be null but after
	      // that will always render to something. At least for now. So we can use
	      // this hack.
	      return !!internalInstance._renderedComponent;
	    } else {
	      return false;
	    }
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @param {string} callerName Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback, callerName) {
	    ReactUpdateQueue$3.validateCallback(callback, callerName);
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance); // Previously we would throw an error if we didn't have an internal
	    // instance. Since we want to make it a no-op instead, we mirror the same
	    // behavior we have in other enqueue* methods.
	    // We also need to ignore callbacks in componentWillMount. See
	    // enqueueUpdates.

	    if (!internalInstance) {
	      return null;
	    }

	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    } // TODO: The callback here is ignored when setState is called from
	    // componentWillMount. Either fix it or disallow doing so completely in
	    // favor of getInitialState. Alternatively, we can disallow
	    // componentWillMount during server-side rendering.


	    enqueueUpdate(internalInstance);
	  },
	  enqueueCallbackInternal: function (internalInstance, callback) {
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

	    if (!internalInstance) {
	      return;
	    }

	    internalInstance._pendingForceUpdate = true;
	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState, callback) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

	    if (!internalInstance) {
	      return;
	    }

	    internalInstance._pendingStateQueue = [completeState];
	    internalInstance._pendingReplaceState = true; // Future-proof 15.5

	    if (callback !== undefined && callback !== null) {
	      ReactUpdateQueue$3.validateCallback(callback, 'replaceState');

	      if (internalInstance._pendingCallbacks) {
	        internalInstance._pendingCallbacks.push(callback);
	      } else {
	        internalInstance._pendingCallbacks = [callback];
	      }
	    }

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {

	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

	    if (!internalInstance) {
	      return;
	    }

	    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
	    queue.push(partialState);
	    enqueueUpdate(internalInstance);
	  },
	  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {
	    internalInstance._pendingElement = nextElement; // TODO: introduce _pendingContext instead of setting it directly.

	    internalInstance._context = nextContext;
	    enqueueUpdate(internalInstance);
	  },
	  validateCallback: function (callback, callerName) {
	    !(!callback || typeof callback === 'function') ? _prodInvariant$6('122', callerName, formatUnexpectedArgument(callback)) : void 0;
	  }
	};
	var ReactUpdateQueue_1 = ReactUpdateQueue$3;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var ReactUpdateQueue$2 = ReactUpdateQueue_1;
	/**
	 * This is the update queue used for server rendering.
	 * It delegates to ReactUpdateQueue while server rendering is in progress and
	 * switches to ReactNoopUpdateQueue after the transaction has completed.
	 * @class ReactServerUpdateQueue
	 * @param {Transaction} transaction
	 */


	var ReactServerUpdateQueue$1 = function () {
	  function ReactServerUpdateQueue(transaction) {
	    _classCallCheck(this, ReactServerUpdateQueue);

	    this.transaction = transaction;
	  }
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */


	  ReactServerUpdateQueue.prototype.isMounted = function isMounted(publicInstance) {
	    return false;
	  };
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */


	  ReactServerUpdateQueue.prototype.enqueueCallback = function enqueueCallback(publicInstance, callback, callerName) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue$2.enqueueCallback(publicInstance, callback, callerName);
	    }
	  };
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */


	  ReactServerUpdateQueue.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue$2.enqueueForceUpdate(publicInstance);
	    }
	  };
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object|function} completeState Next state.
	   * @internal
	   */


	  ReactServerUpdateQueue.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue$2.enqueueReplaceState(publicInstance, completeState);
	    }
	  };
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object|function} partialState Next partial state to be merged with state.
	   * @internal
	   */


	  ReactServerUpdateQueue.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState) {
	    if (this.transaction.isInTransaction()) {
	      ReactUpdateQueue$2.enqueueSetState(publicInstance, partialState);
	    }
	  };

	  return ReactServerUpdateQueue;
	}();

	var ReactServerUpdateQueue_1 = ReactServerUpdateQueue$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$6 = objectAssign;
	var PooledClass$2 = PooledClass_1;
	var Transaction$2 = Transaction$4;
	var ReactServerUpdateQueue = ReactServerUpdateQueue_1;
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */

	var TRANSACTION_WRAPPERS$2 = [];

	var noopCallbackQueue = {
	  enqueue: function () {}
	};
	/**
	 * @class ReactServerRenderingTransaction
	 * @param {boolean} renderToStaticMarkup
	 */

	function ReactServerRenderingTransaction$1(renderToStaticMarkup) {
	  this.reinitializeTransaction();
	  this.renderToStaticMarkup = renderToStaticMarkup;
	  this.useCreateElement = false;
	  this.updateQueue = new ReactServerUpdateQueue(this);
	}

	var Mixin$1 = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array} Empty list of operation wrap procedures.
	   */
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS$2;
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function () {
	    return noopCallbackQueue;
	  },

	  /**
	   * @return {object} The queue to collect React async events.
	   */
	  getUpdateQueue: function () {
	    return this.updateQueue;
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be reused.
	   */
	  destructor: function () {},
	  checkpoint: function () {},
	  rollback: function () {}
	};

	_assign$6(ReactServerRenderingTransaction$1.prototype, Transaction$2, Mixin$1);

	PooledClass$2.addPoolingTo(ReactServerRenderingTransaction$1);
	var ReactServerRenderingTransaction_1 = ReactServerRenderingTransaction$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$5 = reactProdInvariant_1,
	    _assign$5 = objectAssign;
	var AutoFocusUtils = AutoFocusUtils_1;
	var CSSPropertyOperations = CSSPropertyOperations_1;
	var DOMLazyTree$3 = DOMLazyTree_1;
	var DOMNamespaces = DOMNamespaces_1;
	var DOMProperty$2 = DOMProperty_1;
	var DOMPropertyOperations = DOMPropertyOperations_1;
	var EventPluginHub$1 = EventPluginHub_1;
	var EventPluginRegistry = EventPluginRegistry_1;
	var ReactBrowserEventEmitter$3 = ReactBrowserEventEmitter_1;
	var ReactDOMComponentFlags = ReactDOMComponentFlags_1;
	var ReactDOMComponentTree$9 = ReactDOMComponentTree_1;
	var ReactDOMInput = ReactDOMInput_1;
	var ReactDOMOption = ReactDOMOption_1;
	var ReactDOMSelect = ReactDOMSelect_1;
	var ReactDOMTextarea = ReactDOMTextarea_1;
	var ReactMultiChild = ReactMultiChild_1;
	var ReactServerRenderingTransaction = ReactServerRenderingTransaction_1;
	var escapeTextContentForBrowser$1 = escapeTextContentForBrowser_1;
	var inputValueTracking = inputValueTracking_1;
	var Flags = ReactDOMComponentFlags;
	var deleteListener = EventPluginHub$1.deleteListener;
	var getNode = ReactDOMComponentTree$9.getNodeFromInstance;
	var listenTo = ReactBrowserEventEmitter$3.listenTo;
	var registrationNameModules = EventPluginRegistry.registrationNameModules; // For quickly matching children type, to test if can be treated as content.

	var CONTENT_TYPES = {
	  string: true,
	  number: true
	};
	var STYLE = 'style';
	var HTML = '__html';
	var RESERVED_PROPS = {
	  children: null,
	  dangerouslySetInnerHTML: null,
	  suppressContentEditableWarning: null
	}; // Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).

	var DOC_FRAGMENT_TYPE = 11;

	function getDeclarationErrorAddendum(internalInstance) {
	  if (internalInstance) {
	    var owner = internalInstance._currentElement._owner || null;

	    if (owner) {
	      var name = owner.getName();

	      if (name) {
	        return ' This DOM node was rendered by `' + name + '`.';
	      }
	    }
	  }

	  return '';
	}
	/**
	 * @param {object} component
	 * @param {?object} props
	 */


	function assertValidProps(component, props) {
	  if (!props) {
	    return;
	  } // Note the use of `==` which checks for null or undefined.


	  if (voidElementTags[component._tag]) {
	    !(props.children == null && props.dangerouslySetInnerHTML == null) ? _prodInvariant$5('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
	  }

	  if (props.dangerouslySetInnerHTML != null) {
	    !(props.children == null) ? _prodInvariant$5('60') : void 0;
	    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? _prodInvariant$5('61') : void 0;
	  }

	  !(props.style == null || typeof props.style === 'object') ? _prodInvariant$5('62', getDeclarationErrorAddendum(component)) : void 0;
	}

	function enqueuePutListener(inst, registrationName, listener, transaction) {
	  if (transaction instanceof ReactServerRenderingTransaction) {
	    return;
	  }

	  var containerInfo = inst._hostContainerInfo;
	  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
	  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
	  listenTo(registrationName, doc);
	  transaction.getReactMountReady().enqueue(putListener, {
	    inst: inst,
	    registrationName: registrationName,
	    listener: listener
	  });
	}

	function putListener() {
	  var listenerToPut = this;
	  EventPluginHub$1.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
	}

	function inputPostMount() {
	  var inst = this;
	  ReactDOMInput.postMountWrapper(inst);
	}

	function textareaPostMount() {
	  var inst = this;
	  ReactDOMTextarea.postMountWrapper(inst);
	}

	function optionPostMount() {
	  var inst = this;
	  ReactDOMOption.postMountWrapper(inst);
	}
	// maintain a list rather than create a `trapBubbledEvent` for each


	var mediaEvents = {
	  topAbort: 'abort',
	  topCanPlay: 'canplay',
	  topCanPlayThrough: 'canplaythrough',
	  topDurationChange: 'durationchange',
	  topEmptied: 'emptied',
	  topEncrypted: 'encrypted',
	  topEnded: 'ended',
	  topError: 'error',
	  topLoadedData: 'loadeddata',
	  topLoadedMetadata: 'loadedmetadata',
	  topLoadStart: 'loadstart',
	  topPause: 'pause',
	  topPlay: 'play',
	  topPlaying: 'playing',
	  topProgress: 'progress',
	  topRateChange: 'ratechange',
	  topSeeked: 'seeked',
	  topSeeking: 'seeking',
	  topStalled: 'stalled',
	  topSuspend: 'suspend',
	  topTimeUpdate: 'timeupdate',
	  topVolumeChange: 'volumechange',
	  topWaiting: 'waiting'
	};

	function trackInputValue() {
	  inputValueTracking.track(this);
	}

	function trapBubbledEventsLocal() {
	  var inst = this; // If a component renders to null or if another component fatals and causes
	  // the state of the tree to be corrupted, `node` here can be null.

	  !inst._rootNodeID ? _prodInvariant$5('63') : void 0;
	  var node = getNode(inst);
	  !node ? _prodInvariant$5('64') : void 0;

	  switch (inst._tag) {
	    case 'iframe':
	    case 'object':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter$3.trapBubbledEvent('topLoad', 'load', node)];
	      break;

	    case 'video':
	    case 'audio':
	      inst._wrapperState.listeners = []; // Create listener for each media event

	      for (var event in mediaEvents) {
	        if (mediaEvents.hasOwnProperty(event)) {
	          inst._wrapperState.listeners.push(ReactBrowserEventEmitter$3.trapBubbledEvent(event, mediaEvents[event], node));
	        }
	      }

	      break;

	    case 'source':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter$3.trapBubbledEvent('topError', 'error', node)];
	      break;

	    case 'img':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter$3.trapBubbledEvent('topError', 'error', node), ReactBrowserEventEmitter$3.trapBubbledEvent('topLoad', 'load', node)];
	      break;

	    case 'form':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter$3.trapBubbledEvent('topReset', 'reset', node), ReactBrowserEventEmitter$3.trapBubbledEvent('topSubmit', 'submit', node)];
	      break;

	    case 'input':
	    case 'select':
	    case 'textarea':
	      inst._wrapperState.listeners = [ReactBrowserEventEmitter$3.trapBubbledEvent('topInvalid', 'invalid', node)];
	      break;
	  }
	}

	function postUpdateSelectWrapper() {
	  ReactDOMSelect.postUpdateWrapper(this);
	} // For HTML, certain tags should omit their close tag. We keep a whitelist for
	// those special-case tags.


	var omittedCloseTags = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true // NOTE: menuitem's close tag should be omitted, but that causes problems.

	};
	var newlineEatingTags = {
	  listing: true,
	  pre: true,
	  textarea: true
	}; // For HTML, certain tags cannot have children. This has the same purpose as
	// `omittedCloseTags` except that `menuitem` should still have its closing tag.

	var voidElementTags = _assign$5({
	  menuitem: true
	}, omittedCloseTags); // We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name


	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

	var validatedTagCache = {};
	var hasOwnProperty$c = {}.hasOwnProperty;

	function validateDangerousTag(tag) {
	  if (!hasOwnProperty$c.call(validatedTagCache, tag)) {
	    !VALID_TAG_REGEX.test(tag) ? _prodInvariant$5('65', tag) : void 0;
	    validatedTagCache[tag] = true;
	  }
	}

	function isCustomComponent(tagName, props) {
	  return tagName.indexOf('-') >= 0 || props.is != null;
	}

	var globalIdCounter = 1;
	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @constructor ReactDOMComponent
	 * @extends ReactMultiChild
	 */

	function ReactDOMComponent$1(element) {
	  var tag = element.type;
	  validateDangerousTag(tag);
	  this._currentElement = element;
	  this._tag = tag.toLowerCase();
	  this._namespaceURI = null;
	  this._renderedChildren = null;
	  this._previousStyle = null;
	  this._previousStyleCopy = null;
	  this._hostNode = null;
	  this._hostParent = null;
	  this._rootNodeID = 0;
	  this._domID = 0;
	  this._hostContainerInfo = null;
	  this._wrapperState = null;
	  this._topLevelWrapper = null;
	  this._flags = 0;
	}

	ReactDOMComponent$1.displayName = 'ReactDOMComponent';
	ReactDOMComponent$1.Mixin = {
	  /**
	   * Generates root tag markup then recurses. This method has side effects and
	   * is not idempotent.
	   *
	   * @internal
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?ReactDOMComponent} the parent component instance
	   * @param {?object} info about the host container
	   * @param {object} context
	   * @return {string} The computed markup.
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    this._rootNodeID = globalIdCounter++;
	    this._domID = hostContainerInfo._idCounter++;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	    var props = this._currentElement.props;

	    switch (this._tag) {
	      case 'audio':
	      case 'form':
	      case 'iframe':
	      case 'img':
	      case 'link':
	      case 'object':
	      case 'source':
	      case 'video':
	        this._wrapperState = {
	          listeners: null
	        };
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;

	      case 'input':
	        ReactDOMInput.mountWrapper(this, props, hostParent);
	        props = ReactDOMInput.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trackInputValue, this);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;

	      case 'option':
	        ReactDOMOption.mountWrapper(this, props, hostParent);
	        props = ReactDOMOption.getHostProps(this, props);
	        break;

	      case 'select':
	        ReactDOMSelect.mountWrapper(this, props, hostParent);
	        props = ReactDOMSelect.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;

	      case 'textarea':
	        ReactDOMTextarea.mountWrapper(this, props, hostParent);
	        props = ReactDOMTextarea.getHostProps(this, props);
	        transaction.getReactMountReady().enqueue(trackInputValue, this);
	        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
	        break;
	    }

	    assertValidProps(this, props); // We create tags in the namespace of their parent container, except HTML
	    // tags get no namespace.

	    var namespaceURI;
	    var parentTag;

	    if (hostParent != null) {
	      namespaceURI = hostParent._namespaceURI;
	      parentTag = hostParent._tag;
	    } else if (hostContainerInfo._tag) {
	      namespaceURI = hostContainerInfo._namespaceURI;
	      parentTag = hostContainerInfo._tag;
	    }

	    if (namespaceURI == null || namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
	      namespaceURI = DOMNamespaces.html;
	    }

	    if (namespaceURI === DOMNamespaces.html) {
	      if (this._tag === 'svg') {
	        namespaceURI = DOMNamespaces.svg;
	      } else if (this._tag === 'math') {
	        namespaceURI = DOMNamespaces.mathml;
	      }
	    }

	    this._namespaceURI = namespaceURI;

	    var mountImage;

	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var el;

	      if (namespaceURI === DOMNamespaces.html) {
	        if (this._tag === 'script') {
	          // Create the script via .innerHTML so its "parser-inserted" flag is
	          // set to true and it does not execute
	          var div = ownerDocument.createElement('div');
	          var type = this._currentElement.type;
	          div.innerHTML = '<' + type + '></' + type + '>';
	          el = div.removeChild(div.firstChild);
	        } else if (props.is) {
	          el = ownerDocument.createElement(this._currentElement.type, props.is);
	        } else {
	          // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
	          // See discussion in https://github.com/facebook/react/pull/6896
	          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
	          el = ownerDocument.createElement(this._currentElement.type);
	        }
	      } else {
	        el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
	      }

	      ReactDOMComponentTree$9.precacheNode(this, el);
	      this._flags |= Flags.hasCachedChildNodes;

	      if (!this._hostParent) {
	        DOMPropertyOperations.setAttributeForRoot(el);
	      }

	      this._updateDOMProperties(null, props, transaction);

	      var lazyTree = DOMLazyTree$3(el);

	      this._createInitialChildren(transaction, props, context, lazyTree);

	      mountImage = lazyTree;
	    } else {
	      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);

	      var tagContent = this._createContentMarkup(transaction, props, context);

	      if (!tagContent && omittedCloseTags[this._tag]) {
	        mountImage = tagOpen + '/>';
	      } else {
	        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
	      }
	    }

	    switch (this._tag) {
	      case 'input':
	        transaction.getReactMountReady().enqueue(inputPostMount, this);

	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }

	        break;

	      case 'textarea':
	        transaction.getReactMountReady().enqueue(textareaPostMount, this);

	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }

	        break;

	      case 'select':
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }

	        break;

	      case 'button':
	        if (props.autoFocus) {
	          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
	        }

	        break;

	      case 'option':
	        transaction.getReactMountReady().enqueue(optionPostMount, this);
	        break;
	    }

	    return mountImage;
	  },

	  /**
	   * Creates markup for the open tag and all attributes.
	   *
	   * This method has side effects because events get registered.
	   *
	   * Iterating over object properties is faster than iterating over arrays.
	   * @see http://jsperf.com/obj-vs-arr-iteration
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} props
	   * @return {string} Markup of opening tag.
	   */
	  _createOpenTagMarkupAndPutListeners: function (transaction, props) {
	    var ret = '<' + this._currentElement.type;

	    for (var propKey in props) {
	      if (!props.hasOwnProperty(propKey)) {
	        continue;
	      }

	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (propValue) {
	          enqueuePutListener(this, propKey, propValue, transaction);
	        }
	      } else {
	        if (propKey === STYLE) {
	          if (propValue) {

	            propValue = this._previousStyleCopy = _assign$5({}, props.style);
	          }

	          propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this);
	        }

	        var markup = null;

	        if (this._tag != null && isCustomComponent(this._tag, props)) {
	          if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
	          }
	        } else {
	          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
	        }

	        if (markup) {
	          ret += ' ' + markup;
	        }
	      }
	    } // For static pages, no need to put React ID and checksum. Saves lots of
	    // bytes.


	    if (transaction.renderToStaticMarkup) {
	      return ret;
	    }

	    if (!this._hostParent) {
	      ret += ' ' + DOMPropertyOperations.createMarkupForRoot();
	    }

	    ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID);
	    return ret;
	  },

	  /**
	   * Creates markup for the content between the tags.
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} props
	   * @param {object} context
	   * @return {string} Content markup.
	   */
	  _createContentMarkup: function (transaction, props, context) {
	    var ret = ''; // Intentional use of != to avoid catching zero/false.

	    var innerHTML = props.dangerouslySetInnerHTML;

	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        ret = innerHTML.__html;
	      }
	    } else {
	      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
	      var childrenToUse = contentToUse != null ? null : props.children;

	      if (contentToUse != null) {
	        // TODO: Validate that text is allowed as a child of this node
	        ret = escapeTextContentForBrowser$1(contentToUse);
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(childrenToUse, transaction, context);
	        ret = mountImages.join('');
	      }
	    }

	    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
	      // text/html ignores the first character in these tags if it's a newline
	      // Prefer to break application/xml over text/html (for now) by adding
	      // a newline specifically to get eaten by the parser. (Alternately for
	      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	      // \r is normalized out by HTMLTextAreaElement#value.)
	      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	      // See: Parsing of "textarea" "listing" and "pre" elements
	      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	      return '\n' + ret;
	    } else {
	      return ret;
	    }
	  },
	  _createInitialChildren: function (transaction, props, context, lazyTree) {
	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = props.dangerouslySetInnerHTML;

	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        DOMLazyTree$3.queueHTML(lazyTree, innerHTML.__html);
	      }
	    } else {
	      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
	      var childrenToUse = contentToUse != null ? null : props.children; // TODO: Validate that text is allowed as a child of this node

	      if (contentToUse != null) {
	        // Avoid setting textContent when the text is empty. In IE11 setting
	        // textContent on a text area will cause the placeholder to not
	        // show within the textarea until it has been focused and blurred again.
	        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
	        if (contentToUse !== '') {

	          DOMLazyTree$3.queueText(lazyTree, contentToUse);
	        }
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(childrenToUse, transaction, context);

	        for (var i = 0; i < mountImages.length; i++) {
	          DOMLazyTree$3.queueChild(lazyTree, mountImages[i]);
	        }
	      }
	    }
	  },

	  /**
	   * Receives a next element and updates the component.
	   *
	   * @internal
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} context
	   */
	  receiveComponent: function (nextElement, transaction, context) {
	    var prevElement = this._currentElement;
	    this._currentElement = nextElement;
	    this.updateComponent(transaction, prevElement, nextElement, context);
	  },

	  /**
	   * Updates a DOM component after it has already been allocated and
	   * attached to the DOM. Reconciles the root DOM node, then recurses.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevElement
	   * @param {ReactElement} nextElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function (transaction, prevElement, nextElement, context) {
	    var lastProps = prevElement.props;
	    var nextProps = this._currentElement.props;

	    switch (this._tag) {
	      case 'input':
	        lastProps = ReactDOMInput.getHostProps(this, lastProps);
	        nextProps = ReactDOMInput.getHostProps(this, nextProps);
	        break;

	      case 'option':
	        lastProps = ReactDOMOption.getHostProps(this, lastProps);
	        nextProps = ReactDOMOption.getHostProps(this, nextProps);
	        break;

	      case 'select':
	        lastProps = ReactDOMSelect.getHostProps(this, lastProps);
	        nextProps = ReactDOMSelect.getHostProps(this, nextProps);
	        break;

	      case 'textarea':
	        lastProps = ReactDOMTextarea.getHostProps(this, lastProps);
	        nextProps = ReactDOMTextarea.getHostProps(this, nextProps);
	        break;
	    }

	    assertValidProps(this, nextProps);

	    this._updateDOMProperties(lastProps, nextProps, transaction);

	    this._updateDOMChildren(lastProps, nextProps, transaction, context);

	    switch (this._tag) {
	      case 'input':
	        // Update the wrapper around inputs *after* updating props. This has to
	        // happen after `_updateDOMProperties`. Otherwise HTML5 input validations
	        // raise warnings and prevent the new value from being assigned.
	        ReactDOMInput.updateWrapper(this); // We also check that we haven't missed a value update, such as a
	        // Radio group shifting the checked value to another named radio input.

	        inputValueTracking.updateValueIfChanged(this);
	        break;

	      case 'textarea':
	        ReactDOMTextarea.updateWrapper(this);
	        break;

	      case 'select':
	        // <select> value update needs to occur after <option> children
	        // reconciliation
	        transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
	        break;
	    }
	  },

	  /**
	   * Reconciles the properties by detecting differences in property values and
	   * updating the DOM as necessary. This function is probably the single most
	   * critical path for performance optimization.
	   *
	   * TODO: Benchmark whether checking for changed values in memory actually
	   *       improves performance (especially statically positioned elements).
	   * TODO: Benchmark the effects of putting this at the top since 99% of props
	   *       do not change for a given reconciliation.
	   * TODO: Benchmark areas that can be improved with caching.
	   *
	   * @private
	   * @param {object} lastProps
	   * @param {object} nextProps
	   * @param {?DOMElement} node
	   */
	  _updateDOMProperties: function (lastProps, nextProps, transaction) {
	    var propKey;
	    var styleName;
	    var styleUpdates;

	    for (propKey in lastProps) {
	      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
	        continue;
	      }

	      if (propKey === STYLE) {
	        var lastStyle = this._previousStyleCopy;

	        for (styleName in lastStyle) {
	          if (lastStyle.hasOwnProperty(styleName)) {
	            styleUpdates = styleUpdates || {};
	            styleUpdates[styleName] = '';
	          }
	        }

	        this._previousStyleCopy = null;
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (lastProps[propKey]) {
	          // Only call deleteListener if there was a listener previously or
	          // else willDeleteListener gets called when there wasn't actually a
	          // listener (e.g., onClick={null})
	          deleteListener(this, propKey);
	        }
	      } else if (isCustomComponent(this._tag, lastProps)) {
	        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	          DOMPropertyOperations.deleteValueForAttribute(getNode(this), propKey);
	        }
	      } else if (DOMProperty$2.properties[propKey] || DOMProperty$2.isCustomAttribute(propKey)) {
	        DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey);
	      }
	    }

	    for (propKey in nextProps) {
	      var nextProp = nextProps[propKey];
	      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;

	      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
	        continue;
	      }

	      if (propKey === STYLE) {
	        if (nextProp) {

	          nextProp = this._previousStyleCopy = _assign$5({}, nextProp);
	        } else {
	          this._previousStyleCopy = null;
	        }

	        if (lastProp) {
	          // Unset styles on `lastProp` but not on `nextProp`.
	          for (styleName in lastProp) {
	            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = '';
	            }
	          } // Update styles that changed since `lastProp`.


	          for (styleName in nextProp) {
	            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = nextProp[styleName];
	            }
	          }
	        } else {
	          // Relies on `updateStylesByID` not mutating `styleUpdates`.
	          styleUpdates = nextProp;
	        }
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        if (nextProp) {
	          enqueuePutListener(this, propKey, nextProp, transaction);
	        } else if (lastProp) {
	          deleteListener(this, propKey);
	        }
	      } else if (isCustomComponent(this._tag, nextProps)) {
	        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
	          DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp);
	        }
	      } else if (DOMProperty$2.properties[propKey] || DOMProperty$2.isCustomAttribute(propKey)) {
	        var node = getNode(this); // If we're updating to null or undefined, we should remove the property
	        // from the DOM node instead of inadvertently setting to a string. This
	        // brings us in line with the same behavior we have on initial render.

	        if (nextProp != null) {
	          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
	        } else {
	          DOMPropertyOperations.deleteValueForProperty(node, propKey);
	        }
	      }
	    }

	    if (styleUpdates) {
	      CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this);
	    }
	  },

	  /**
	   * Reconciles the children with the various properties that affect the
	   * children content.
	   *
	   * @param {object} lastProps
	   * @param {object} nextProps
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   */
	  _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
	    var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
	    var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
	    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
	    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html; // Note the use of `!=` which checks for null or undefined.

	    var lastChildren = lastContent != null ? null : lastProps.children;
	    var nextChildren = nextContent != null ? null : nextProps.children; // If we're switching from children to content/html or vice versa, remove
	    // the old content

	    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
	    var nextHasContentOrHtml = nextContent != null || nextHtml != null;

	    if (lastChildren != null && nextChildren == null) {
	      this.updateChildren(null, transaction, context);
	    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
	      this.updateTextContent('');
	    }

	    if (nextContent != null) {
	      if (lastContent !== nextContent) {
	        this.updateTextContent('' + nextContent);
	      }
	    } else if (nextHtml != null) {
	      if (lastHtml !== nextHtml) {
	        this.updateMarkup('' + nextHtml);
	      }
	    } else if (nextChildren != null) {

	      this.updateChildren(nextChildren, transaction, context);
	    }
	  },
	  getHostNode: function () {
	    return getNode(this);
	  },

	  /**
	   * Destroys all event registrations for this instance. Does not remove from
	   * the DOM. That must be done by the parent.
	   *
	   * @internal
	   */
	  unmountComponent: function (safely) {
	    switch (this._tag) {
	      case 'audio':
	      case 'form':
	      case 'iframe':
	      case 'img':
	      case 'link':
	      case 'object':
	      case 'source':
	      case 'video':
	        var listeners = this._wrapperState.listeners;

	        if (listeners) {
	          for (var i = 0; i < listeners.length; i++) {
	            listeners[i].remove();
	          }
	        }

	        break;

	      case 'input':
	      case 'textarea':
	        inputValueTracking.stopTracking(this);
	        break;

	      case 'html':
	      case 'head':
	      case 'body':
	        /**
	         * Components like <html> <head> and <body> can't be removed or added
	         * easily in a cross-browser way, however it's valuable to be able to
	         * take advantage of React's reconciliation for styling and <title>
	         * management. So we just document it and throw in dangerous cases.
	         */
	        _prodInvariant$5('66', this._tag) ;
	        break;
	    }

	    this.unmountChildren(safely);
	    ReactDOMComponentTree$9.uncacheNode(this);
	    EventPluginHub$1.deleteAllListeners(this);
	    this._rootNodeID = 0;
	    this._domID = 0;
	    this._wrapperState = null;
	  },
	  getPublicInstance: function () {
	    return getNode(this);
	  }
	};

	_assign$5(ReactDOMComponent$1.prototype, ReactDOMComponent$1.Mixin, ReactMultiChild.Mixin);

	var ReactDOMComponent_1 = ReactDOMComponent$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$4 = objectAssign;
	var DOMLazyTree$2 = DOMLazyTree_1;
	var ReactDOMComponentTree$8 = ReactDOMComponentTree_1;

	var ReactDOMEmptyComponent$1 = function (instantiate) {
	  // ReactCompositeComponent uses this:
	  this._currentElement = null; // ReactDOMComponentTree uses these:

	  this._hostNode = null;
	  this._hostParent = null;
	  this._hostContainerInfo = null;
	  this._domID = 0;
	};

	_assign$4(ReactDOMEmptyComponent$1.prototype, {
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
	    var domID = hostContainerInfo._idCounter++;
	    this._domID = domID;
	    this._hostParent = hostParent;
	    this._hostContainerInfo = hostContainerInfo;
	    var nodeValue = ' react-empty: ' + this._domID + ' ';

	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var node = ownerDocument.createComment(nodeValue);
	      ReactDOMComponentTree$8.precacheNode(this, node);
	      return DOMLazyTree$2(node);
	    } else {
	      if (transaction.renderToStaticMarkup) {
	        // Normally we'd insert a comment node, but since this is a situation
	        // where React won't take over (static pages), we can simply return
	        // nothing.
	        return '';
	      }

	      return '<!--' + nodeValue + '-->';
	    }
	  },
	  receiveComponent: function () {},
	  getHostNode: function () {
	    return ReactDOMComponentTree$8.getNodeFromInstance(this);
	  },
	  unmountComponent: function () {
	    ReactDOMComponentTree$8.uncacheNode(this);
	  }
	});

	var ReactDOMEmptyComponent_1 = ReactDOMEmptyComponent$1;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$4 = reactProdInvariant_1;
	/**
	 * Return the lowest common ancestor of A and B, or null if they are in
	 * different trees.
	 */

	function getLowestCommonAncestor(instA, instB) {
	  !('_hostNode' in instA) ? _prodInvariant$4('33') : void 0;
	  !('_hostNode' in instB) ? _prodInvariant$4('33') : void 0;
	  var depthA = 0;

	  for (var tempA = instA; tempA; tempA = tempA._hostParent) {
	    depthA++;
	  }

	  var depthB = 0;

	  for (var tempB = instB; tempB; tempB = tempB._hostParent) {
	    depthB++;
	  } // If A is deeper, crawl up.


	  while (depthA - depthB > 0) {
	    instA = instA._hostParent;
	    depthA--;
	  } // If B is deeper, crawl up.


	  while (depthB - depthA > 0) {
	    instB = instB._hostParent;
	    depthB--;
	  } // Walk in lockstep until we find a match.


	  var depth = depthA;

	  while (depth--) {
	    if (instA === instB) {
	      return instA;
	    }

	    instA = instA._hostParent;
	    instB = instB._hostParent;
	  }

	  return null;
	}
	/**
	 * Return if A is an ancestor of B.
	 */


	function isAncestor(instA, instB) {
	  !('_hostNode' in instA) ? _prodInvariant$4('35') : void 0;
	  !('_hostNode' in instB) ? _prodInvariant$4('35') : void 0;

	  while (instB) {
	    if (instB === instA) {
	      return true;
	    }

	    instB = instB._hostParent;
	  }

	  return false;
	}
	/**
	 * Return the parent instance of the passed-in instance.
	 */


	function getParentInstance(inst) {
	  !('_hostNode' in inst) ? _prodInvariant$4('36') : void 0;
	  return inst._hostParent;
	}
	/**
	 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
	 */


	function traverseTwoPhase(inst, fn, arg) {
	  var path = [];

	  while (inst) {
	    path.push(inst);
	    inst = inst._hostParent;
	  }

	  var i;

	  for (i = path.length; i-- > 0;) {
	    fn(path[i], 'captured', arg);
	  }

	  for (i = 0; i < path.length; i++) {
	    fn(path[i], 'bubbled', arg);
	  }
	}
	/**
	 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
	 * should would receive a `mouseEnter` or `mouseLeave` event.
	 *
	 * Does not invoke the callback on the nearest common ancestor because nothing
	 * "entered" or "left" that element.
	 */


	function traverseEnterLeave(from, to, fn, argFrom, argTo) {
	  var common = from && to ? getLowestCommonAncestor(from, to) : null;
	  var pathFrom = [];

	  while (from && from !== common) {
	    pathFrom.push(from);
	    from = from._hostParent;
	  }

	  var pathTo = [];

	  while (to && to !== common) {
	    pathTo.push(to);
	    to = to._hostParent;
	  }

	  var i;

	  for (i = 0; i < pathFrom.length; i++) {
	    fn(pathFrom[i], 'bubbled', argFrom);
	  }

	  for (i = pathTo.length; i-- > 0;) {
	    fn(pathTo[i], 'captured', argTo);
	  }
	}

	var ReactDOMTreeTraversal$1 = {
	  isAncestor: isAncestor,
	  getLowestCommonAncestor: getLowestCommonAncestor,
	  getParentInstance: getParentInstance,
	  traverseTwoPhase: traverseTwoPhase,
	  traverseEnterLeave: traverseEnterLeave
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$3 = reactProdInvariant_1,
	    _assign$3 = objectAssign;
	var DOMChildrenOperations = DOMChildrenOperations_1;
	var DOMLazyTree$1 = DOMLazyTree_1;
	var ReactDOMComponentTree$7 = ReactDOMComponentTree_1;
	var escapeTextContentForBrowser = escapeTextContentForBrowser_1;
	/**
	 * Text nodes violate a couple assumptions that React makes about components:
	 *
	 *  - When mounting text into the DOM, adjacent text nodes are merged.
	 *  - Text nodes cannot be assigned a React root ID.
	 *
	 * This component is used to wrap strings between comment nodes so that they
	 * can undergo the same reconciliation that is applied to elements.
	 *
	 * TODO: Investigate representing React components in the DOM with text nodes.
	 *
	 * @class ReactDOMTextComponent
	 * @extends ReactComponent
	 * @internal
	 */

	var ReactDOMTextComponent$1 = function (text) {
	  // TODO: This is really a ReactText (ReactNode), not a ReactElement
	  this._currentElement = text;
	  this._stringText = '' + text; // ReactDOMComponentTree uses these:

	  this._hostNode = null;
	  this._hostParent = null; // Properties

	  this._domID = 0;
	  this._mountIndex = 0;
	  this._closingComment = null;
	  this._commentNodes = null;
	};

	_assign$3(ReactDOMTextComponent$1.prototype, {
	  /**
	   * Creates the markup for this text node. This node is not intended to have
	   * any features besides containing text content.
	   *
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Markup for this text node.
	   * @internal
	   */
	  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {

	    var domID = hostContainerInfo._idCounter++;
	    var openingValue = ' react-text: ' + domID + ' ';
	    var closingValue = ' /react-text ';
	    this._domID = domID;
	    this._hostParent = hostParent;

	    if (transaction.useCreateElement) {
	      var ownerDocument = hostContainerInfo._ownerDocument;
	      var openingComment = ownerDocument.createComment(openingValue);
	      var closingComment = ownerDocument.createComment(closingValue);
	      var lazyTree = DOMLazyTree$1(ownerDocument.createDocumentFragment());
	      DOMLazyTree$1.queueChild(lazyTree, DOMLazyTree$1(openingComment));

	      if (this._stringText) {
	        DOMLazyTree$1.queueChild(lazyTree, DOMLazyTree$1(ownerDocument.createTextNode(this._stringText)));
	      }

	      DOMLazyTree$1.queueChild(lazyTree, DOMLazyTree$1(closingComment));
	      ReactDOMComponentTree$7.precacheNode(this, openingComment);
	      this._closingComment = closingComment;
	      return lazyTree;
	    } else {
	      var escapedText = escapeTextContentForBrowser(this._stringText);

	      if (transaction.renderToStaticMarkup) {
	        // Normally we'd wrap this between comment nodes for the reasons stated
	        // above, but since this is a situation where React won't take over
	        // (static pages), we can simply return the text as it is.
	        return escapedText;
	      }

	      return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
	    }
	  },

	  /**
	   * Updates this component by updating the text content.
	   *
	   * @param {ReactText} nextText The next text content
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  receiveComponent: function (nextText, transaction) {
	    if (nextText !== this._currentElement) {
	      this._currentElement = nextText;
	      var nextStringText = '' + nextText;

	      if (nextStringText !== this._stringText) {
	        // TODO: Save this as pending props and use performUpdateIfNecessary
	        // and/or updateComponent to do the actual update for consistency with
	        // other component types?
	        this._stringText = nextStringText;
	        var commentNodes = this.getHostNode();
	        DOMChildrenOperations.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);
	      }
	    }
	  },
	  getHostNode: function () {
	    var hostNode = this._commentNodes;

	    if (hostNode) {
	      return hostNode;
	    }

	    if (!this._closingComment) {
	      var openingComment = ReactDOMComponentTree$7.getNodeFromInstance(this);
	      var node = openingComment.nextSibling;

	      while (true) {
	        !(node != null) ? _prodInvariant$3('67', this._domID) : void 0;

	        if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
	          this._closingComment = node;
	          break;
	        }

	        node = node.nextSibling;
	      }
	    }

	    hostNode = [this._hostNode, this._closingComment];
	    this._commentNodes = hostNode;
	    return hostNode;
	  },
	  unmountComponent: function () {
	    this._closingComment = null;
	    this._commentNodes = null;
	    ReactDOMComponentTree$7.uncacheNode(this);
	  }
	});

	var ReactDOMTextComponent_1 = ReactDOMTextComponent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$2 = objectAssign;
	var ReactUpdates$4 = ReactUpdates_1;
	var Transaction$1 = Transaction$4;
	var emptyFunction$3 = emptyFunction_1;
	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction$3,
	  close: function () {
	    ReactDefaultBatchingStrategy$1.isBatchingUpdates = false;
	  }
	};
	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction$3,
	  close: ReactUpdates$4.flushBatchedUpdates.bind(ReactUpdates$4)
	};
	var TRANSACTION_WRAPPERS$1 = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}

	_assign$2(ReactDefaultBatchingStrategyTransaction.prototype, Transaction$1, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS$1;
	  }
	});

	var transaction = new ReactDefaultBatchingStrategyTransaction();
	var ReactDefaultBatchingStrategy$1 = {
	  isBatchingUpdates: false,

	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function (callback, a, b, c, d, e) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy$1.isBatchingUpdates;
	    ReactDefaultBatchingStrategy$1.isBatchingUpdates = true; // The code is written this way to avoid extra allocations

	    if (alreadyBatchingUpdates) {
	      return callback(a, b, c, d, e);
	    } else {
	      return transaction.perform(callback, null, a, b, c, d, e);
	    }
	  }
	};
	var ReactDefaultBatchingStrategy_1 = ReactDefaultBatchingStrategy$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */


	var emptyFunction$2 = emptyFunction_1;
	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */

	var EventListener$2 = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {

	      return {
	        remove: emptyFunction$2
	      };
	    }
	  },
	  registerDefault: function registerDefault() {}
	};
	var EventListener_1 = EventListener$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */
	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */


	function getUnboundedScrollPosition$1(scrollable) {
	  if (scrollable.Window && scrollable instanceof scrollable.Window) {
	    return {
	      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
	      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
	    };
	  }

	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}

	var getUnboundedScrollPosition_1 = getUnboundedScrollPosition$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign$1 = objectAssign;
	var EventListener$1 = EventListener_1;
	var ExecutionEnvironment$2 = ExecutionEnvironment_1;
	var PooledClass$1 = PooledClass_1;
	var ReactDOMComponentTree$6 = ReactDOMComponentTree_1;
	var ReactUpdates$3 = ReactUpdates_1;
	var getEventTarget = getEventTarget_1;
	var getUnboundedScrollPosition = getUnboundedScrollPosition_1;
	/**
	 * Find the deepest React component completely containing the root of the
	 * passed-in instance (for use when entire React trees are nested within each
	 * other). If React trees are not nested, returns null.
	 */

	function findParent(inst) {
	  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
	  // traversal, but caching is difficult to do correctly without using a
	  // mutation observer to listen for all DOM changes.
	  while (inst._hostParent) {
	    inst = inst._hostParent;
	  }

	  var rootNode = ReactDOMComponentTree$6.getNodeFromInstance(inst);
	  var container = rootNode.parentNode;
	  return ReactDOMComponentTree$6.getClosestInstanceFromNode(container);
	} // Used to store ancestor hierarchy in top level callback


	function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
	  this.topLevelType = topLevelType;
	  this.nativeEvent = nativeEvent;
	  this.ancestors = [];
	}

	_assign$1(TopLevelCallbackBookKeeping.prototype, {
	  destructor: function () {
	    this.topLevelType = null;
	    this.nativeEvent = null;
	    this.ancestors.length = 0;
	  }
	});

	PooledClass$1.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass$1.twoArgumentPooler);

	function handleTopLevelImpl(bookKeeping) {
	  var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);
	  var targetInst = ReactDOMComponentTree$6.getClosestInstanceFromNode(nativeEventTarget); // Loop through the hierarchy, in case there's any nested components.
	  // It's important that we build the array of ancestors before calling any
	  // event handlers, because event handlers can modify the DOM, leading to
	  // inconsistencies with ReactMount's node cache. See #1105.

	  var ancestor = targetInst;

	  do {
	    bookKeeping.ancestors.push(ancestor);
	    ancestor = ancestor && findParent(ancestor);
	  } while (ancestor);

	  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
	    targetInst = bookKeeping.ancestors[i];

	    ReactEventListener$1._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
	  }
	}

	function scrollValueMonitor(cb) {
	  var scrollPosition = getUnboundedScrollPosition(window);
	  cb(scrollPosition);
	}

	var ReactEventListener$1 = {
	  _enabled: true,
	  _handleTopLevel: null,
	  WINDOW_HANDLE: ExecutionEnvironment$2.canUseDOM ? window : null,
	  setHandleTopLevel: function (handleTopLevel) {
	    ReactEventListener$1._handleTopLevel = handleTopLevel;
	  },
	  setEnabled: function (enabled) {
	    ReactEventListener$1._enabled = !!enabled;
	  },
	  isEnabled: function () {
	    return ReactEventListener$1._enabled;
	  },

	  /**
	   * Traps top-level events by using event bubbling.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} element Element on which to attach listener.
	   * @return {?object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
	    if (!element) {
	      return null;
	    }

	    return EventListener$1.listen(element, handlerBaseName, ReactEventListener$1.dispatchEvent.bind(null, topLevelType));
	  },

	  /**
	   * Traps a top-level event by using event capturing.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} element Element on which to attach listener.
	   * @return {?object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapCapturedEvent: function (topLevelType, handlerBaseName, element) {
	    if (!element) {
	      return null;
	    }

	    return EventListener$1.capture(element, handlerBaseName, ReactEventListener$1.dispatchEvent.bind(null, topLevelType));
	  },
	  monitorScrollValue: function (refresh) {
	    var callback = scrollValueMonitor.bind(null, refresh);
	    EventListener$1.listen(window, 'scroll', callback);
	  },
	  dispatchEvent: function (topLevelType, nativeEvent) {
	    if (!ReactEventListener$1._enabled) {
	      return;
	    }

	    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);

	    try {
	      // Event queue being processed in the same cycle allows
	      // `preventDefault`.
	      ReactUpdates$3.batchedUpdates(handleTopLevelImpl, bookKeeping);
	    } finally {
	      TopLevelCallbackBookKeeping.release(bookKeeping);
	    }
	  }
	};
	var ReactEventListener_1 = ReactEventListener$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var DOMProperty$1 = DOMProperty_1;
	var EventPluginHub = EventPluginHub_1;
	var EventPluginUtils = EventPluginUtils_1;
	var ReactComponentEnvironment = ReactComponentEnvironment_1;
	var ReactEmptyComponent = ReactEmptyComponent_1;
	var ReactBrowserEventEmitter$2 = ReactBrowserEventEmitter_1;
	var ReactHostComponent = ReactHostComponent_1;
	var ReactUpdates$2 = ReactUpdates_1;
	var ReactInjection$1 = {
	  Component: ReactComponentEnvironment.injection,
	  DOMProperty: DOMProperty$1.injection,
	  EmptyComponent: ReactEmptyComponent.injection,
	  EventPluginHub: EventPluginHub.injection,
	  EventPluginUtils: EventPluginUtils.injection,
	  EventEmitter: ReactBrowserEventEmitter$2.injection,
	  HostComponent: ReactHostComponent.injection,
	  Updates: ReactUpdates$2.injection
	};
	var ReactInjection_1 = ReactInjection$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */


	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }

	  return node;
	}
	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */


	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }

	    node = node.parentNode;
	  }
	}
	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */


	function getNodeForCharacterOffset$1(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;

	  while (node) {
	    if (node.nodeType === 3) {
	      nodeEnd = nodeStart + node.textContent.length;

	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }

	      nodeStart = nodeEnd;
	    }

	    node = getLeafNode(getSiblingNode(node));
	  }
	}

	var getNodeForCharacterOffset_1 = getNodeForCharacterOffset$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ExecutionEnvironment$1 = ExecutionEnvironment_1;
	var getNodeForCharacterOffset = getNodeForCharacterOffset_1;
	var getTextContentAccessor = getTextContentAccessor_1;
	/**
	 * While `isCollapsed` is available on the Selection object and `collapsed`
	 * is available on the Range object, IE11 sometimes gets them wrong.
	 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
	 */

	function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
	  return anchorNode === focusNode && anchorOffset === focusOffset;
	}
	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */


	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length; // Duplicate selection so we can move range without breaking user selection.

	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);
	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;
	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}
	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */


	function getModernOffsets(node) {
	  var selection = window.getSelection && window.getSelection();

	  if (!selection || selection.rangeCount === 0) {
	    return null;
	  }

	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;
	  var currentRange = selection.getRangeAt(0); // In Firefox, range.startContainer and range.endContainer can be "anonymous
	  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
	  // divs do not seem to expose properties, triggering a "Permission denied
	  // error" if any of its properties are accessed. The only seemingly possible
	  // way to avoid erroring is to access a property that typically works for
	  // non-anonymous divs and catch any error that may otherwise arise. See
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

	  try {
	    /* eslint-disable no-unused-expressions */
	    currentRange.startContainer.nodeType;
	    currentRange.endContainer.nodeType;
	    /* eslint-enable no-unused-expressions */
	  } catch (e) {
	    return null;
	  } // If the node and offset values are the same, the selection is collapsed.
	  // `Selection.isCollapsed` is available natively, but IE sometimes gets
	  // this value wrong.


	  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
	  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
	  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
	  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
	  var end = start + rangeLength; // Detect whether the selection is backward.

	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;
	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}
	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */


	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;

	  if (offsets.end === undefined) {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }

	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}
	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programmatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */


	function setModernOffsets(node, offsets) {
	  if (!window.getSelection) {
	    return;
	  }

	  var selection = window.getSelection();
	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = offsets.end === undefined ? start : Math.min(offsets.end, length); // IE 11 uses modern selection, but doesn't support the extend method.
	  // Flip backward selections, so we can set with a single range.

	  if (!selection.extend && start > end) {
	    var temp = end;
	    end = start;
	    start = temp;
	  }

	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);

	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();

	    if (start > end) {
	      selection.addRange(range);
	      selection.extend(endMarker.node, endMarker.offset);
	    } else {
	      range.setEnd(endMarker.node, endMarker.offset);
	      selection.addRange(range);
	    }
	  }
	}

	var useIEOffsets = ExecutionEnvironment$1.canUseDOM && 'selection' in document && !('getSelection' in window);
	var ReactDOMSelection$1 = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
	};
	var ReactDOMSelection_1 = ReactDOMSelection$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */


	function isNode$1(object) {
	  var doc = object ? object.ownerDocument || object : document;
	  var defaultView = doc.defaultView || window;
	  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}

	var isNode_1 = isNode$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */


	var isNode = isNode_1;
	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */

	function isTextNode$1(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	var isTextNode_1 = isTextNode$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */


	var isTextNode = isTextNode_1;
	/*eslint-disable no-bitwise */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 */

	function containsNode$1(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return containsNode$1(outerNode, innerNode.parentNode);
	  } else if ('contains' in outerNode) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	var containsNode_1 = containsNode$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/* eslint-disable fb-www/typeof-undefined */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */


	function getActiveElement$2(doc)
	/*?DOMElement*/
	{
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);

	  if (typeof doc === 'undefined') {
	    return null;
	  }

	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}

	var getActiveElement_1 = getActiveElement$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMSelection = ReactDOMSelection_1;
	var containsNode = containsNode_1;
	var focusNode = focusNode_1;
	var getActiveElement$1 = getActiveElement_1;

	function isInDocument(node) {
	  return containsNode(document.documentElement, node);
	}
	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */


	var ReactInputSelection$2 = {
	  hasSelectionCapabilities: function (elem) {
	    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
	    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
	  },
	  getSelectionInformation: function () {
	    var focusedElem = getActiveElement$1();
	    return {
	      focusedElem: focusedElem,
	      selectionRange: ReactInputSelection$2.hasSelectionCapabilities(focusedElem) ? ReactInputSelection$2.getSelection(focusedElem) : null
	    };
	  },

	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function (priorSelectionInformation) {
	    var curFocusedElem = getActiveElement$1();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;

	    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection$2.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection$2.setSelection(priorFocusedElem, priorSelectionRange);
	      }

	      focusNode(priorFocusedElem);
	    }
	  },

	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function (input) {
	    var selection;

	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
	      // IE8 input.
	      var range = document.selection.createRange(); // There can only be one selection per document in IE, so it must
	      // be in our element.

	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }

	    return selection || {
	      start: 0,
	      end: 0
	    };
	  },

	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function (input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;

	    if (end === undefined) {
	      end = start;
	    }

	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};
	var ReactInputSelection_1 = ReactInputSelection$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _assign = objectAssign;
	var CallbackQueue = CallbackQueue_1;
	var PooledClass = PooledClass_1;
	var ReactBrowserEventEmitter$1 = ReactBrowserEventEmitter_1;
	var ReactInputSelection$1 = ReactInputSelection_1;
	var Transaction = Transaction$4;
	var ReactUpdateQueue$1 = ReactUpdateQueue_1;
	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */

	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection$1.getSelectionInformation,

	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection$1.restoreSelection
	};
	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */

	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
	   * the reconciliation.
	   */
	  initialize: function () {
	    var currentlyEnabled = ReactBrowserEventEmitter$1.isEnabled();
	    ReactBrowserEventEmitter$1.setEnabled(false);
	    return currentlyEnabled;
	  },

	  /**
	   * @param {boolean} previouslyEnabled Enabled status of
	   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
	   *   restores the previous value.
	   */
	  close: function (previouslyEnabled) {
	    ReactBrowserEventEmitter$1.setEnabled(previouslyEnabled);
	  }
	};
	/**
	 * Provides a queue for collecting `componentDidMount` and
	 * `componentDidUpdate` callbacks during the transaction.
	 */

	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function () {
	    this.reactMountReady.reset();
	  },

	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function () {
	    this.reactMountReady.notifyAll();
	  }
	};
	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */

	var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */


	function ReactReconcileTransaction$1(useCreateElement) {
	  this.reinitializeTransaction(); // Only server-side rendering really needs this option (see
	  // `ReactServerRendering`), but server-side uses
	  // `ReactServerRenderingTransaction` instead. This option is here so that it's
	  // accessible and defaults to false when `ReactDOMComponent` and
	  // `ReactDOMTextComponent` checks it in `mountComponent`.`

	  this.renderToStaticMarkup = false;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.useCreateElement = useCreateElement;
	}

	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap procedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function () {
	    return this.reactMountReady;
	  },

	  /**
	   * @return {object} The queue to collect React async events.
	   */
	  getUpdateQueue: function () {
	    return ReactUpdateQueue$1;
	  },

	  /**
	   * Save current transaction state -- if the return value from this method is
	   * passed to `rollback`, the transaction will be reset to that state.
	   */
	  checkpoint: function () {
	    // reactMountReady is the our only stateful wrapper
	    return this.reactMountReady.checkpoint();
	  },
	  rollback: function (checkpoint) {
	    this.reactMountReady.rollback(checkpoint);
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be reused.
	   */
	  destructor: function () {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;
	  }
	};

	_assign(ReactReconcileTransaction$1.prototype, Transaction, Mixin);

	PooledClass.addPoolingTo(ReactReconcileTransaction$1);
	var ReactReconcileTransaction_1 = ReactReconcileTransaction$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var NS = {
	  xlink: 'http://www.w3.org/1999/xlink',
	  xml: 'http://www.w3.org/XML/1998/namespace'
	}; // We use attributes for everything SVG so let's avoid some duplication and run
	// code instead.
	// The following are all specified in the HTML config already so we exclude here.
	// - class (as className)
	// - color
	// - height
	// - id
	// - lang
	// - max
	// - media
	// - method
	// - min
	// - name
	// - style
	// - target
	// - type
	// - width

	var ATTRS = {
	  accentHeight: 'accent-height',
	  accumulate: 0,
	  additive: 0,
	  alignmentBaseline: 'alignment-baseline',
	  allowReorder: 'allowReorder',
	  alphabetic: 0,
	  amplitude: 0,
	  arabicForm: 'arabic-form',
	  ascent: 0,
	  attributeName: 'attributeName',
	  attributeType: 'attributeType',
	  autoReverse: 'autoReverse',
	  azimuth: 0,
	  baseFrequency: 'baseFrequency',
	  baseProfile: 'baseProfile',
	  baselineShift: 'baseline-shift',
	  bbox: 0,
	  begin: 0,
	  bias: 0,
	  by: 0,
	  calcMode: 'calcMode',
	  capHeight: 'cap-height',
	  clip: 0,
	  clipPath: 'clip-path',
	  clipRule: 'clip-rule',
	  clipPathUnits: 'clipPathUnits',
	  colorInterpolation: 'color-interpolation',
	  colorInterpolationFilters: 'color-interpolation-filters',
	  colorProfile: 'color-profile',
	  colorRendering: 'color-rendering',
	  contentScriptType: 'contentScriptType',
	  contentStyleType: 'contentStyleType',
	  cursor: 0,
	  cx: 0,
	  cy: 0,
	  d: 0,
	  decelerate: 0,
	  descent: 0,
	  diffuseConstant: 'diffuseConstant',
	  direction: 0,
	  display: 0,
	  divisor: 0,
	  dominantBaseline: 'dominant-baseline',
	  dur: 0,
	  dx: 0,
	  dy: 0,
	  edgeMode: 'edgeMode',
	  elevation: 0,
	  enableBackground: 'enable-background',
	  end: 0,
	  exponent: 0,
	  externalResourcesRequired: 'externalResourcesRequired',
	  fill: 0,
	  fillOpacity: 'fill-opacity',
	  fillRule: 'fill-rule',
	  filter: 0,
	  filterRes: 'filterRes',
	  filterUnits: 'filterUnits',
	  floodColor: 'flood-color',
	  floodOpacity: 'flood-opacity',
	  focusable: 0,
	  fontFamily: 'font-family',
	  fontSize: 'font-size',
	  fontSizeAdjust: 'font-size-adjust',
	  fontStretch: 'font-stretch',
	  fontStyle: 'font-style',
	  fontVariant: 'font-variant',
	  fontWeight: 'font-weight',
	  format: 0,
	  from: 0,
	  fx: 0,
	  fy: 0,
	  g1: 0,
	  g2: 0,
	  glyphName: 'glyph-name',
	  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	  glyphOrientationVertical: 'glyph-orientation-vertical',
	  glyphRef: 'glyphRef',
	  gradientTransform: 'gradientTransform',
	  gradientUnits: 'gradientUnits',
	  hanging: 0,
	  horizAdvX: 'horiz-adv-x',
	  horizOriginX: 'horiz-origin-x',
	  ideographic: 0,
	  imageRendering: 'image-rendering',
	  'in': 0,
	  in2: 0,
	  intercept: 0,
	  k: 0,
	  k1: 0,
	  k2: 0,
	  k3: 0,
	  k4: 0,
	  kernelMatrix: 'kernelMatrix',
	  kernelUnitLength: 'kernelUnitLength',
	  kerning: 0,
	  keyPoints: 'keyPoints',
	  keySplines: 'keySplines',
	  keyTimes: 'keyTimes',
	  lengthAdjust: 'lengthAdjust',
	  letterSpacing: 'letter-spacing',
	  lightingColor: 'lighting-color',
	  limitingConeAngle: 'limitingConeAngle',
	  local: 0,
	  markerEnd: 'marker-end',
	  markerMid: 'marker-mid',
	  markerStart: 'marker-start',
	  markerHeight: 'markerHeight',
	  markerUnits: 'markerUnits',
	  markerWidth: 'markerWidth',
	  mask: 0,
	  maskContentUnits: 'maskContentUnits',
	  maskUnits: 'maskUnits',
	  mathematical: 0,
	  mode: 0,
	  numOctaves: 'numOctaves',
	  offset: 0,
	  opacity: 0,
	  operator: 0,
	  order: 0,
	  orient: 0,
	  orientation: 0,
	  origin: 0,
	  overflow: 0,
	  overlinePosition: 'overline-position',
	  overlineThickness: 'overline-thickness',
	  paintOrder: 'paint-order',
	  panose1: 'panose-1',
	  pathLength: 'pathLength',
	  patternContentUnits: 'patternContentUnits',
	  patternTransform: 'patternTransform',
	  patternUnits: 'patternUnits',
	  pointerEvents: 'pointer-events',
	  points: 0,
	  pointsAtX: 'pointsAtX',
	  pointsAtY: 'pointsAtY',
	  pointsAtZ: 'pointsAtZ',
	  preserveAlpha: 'preserveAlpha',
	  preserveAspectRatio: 'preserveAspectRatio',
	  primitiveUnits: 'primitiveUnits',
	  r: 0,
	  radius: 0,
	  refX: 'refX',
	  refY: 'refY',
	  renderingIntent: 'rendering-intent',
	  repeatCount: 'repeatCount',
	  repeatDur: 'repeatDur',
	  requiredExtensions: 'requiredExtensions',
	  requiredFeatures: 'requiredFeatures',
	  restart: 0,
	  result: 0,
	  rotate: 0,
	  rx: 0,
	  ry: 0,
	  scale: 0,
	  seed: 0,
	  shapeRendering: 'shape-rendering',
	  slope: 0,
	  spacing: 0,
	  specularConstant: 'specularConstant',
	  specularExponent: 'specularExponent',
	  speed: 0,
	  spreadMethod: 'spreadMethod',
	  startOffset: 'startOffset',
	  stdDeviation: 'stdDeviation',
	  stemh: 0,
	  stemv: 0,
	  stitchTiles: 'stitchTiles',
	  stopColor: 'stop-color',
	  stopOpacity: 'stop-opacity',
	  strikethroughPosition: 'strikethrough-position',
	  strikethroughThickness: 'strikethrough-thickness',
	  string: 0,
	  stroke: 0,
	  strokeDasharray: 'stroke-dasharray',
	  strokeDashoffset: 'stroke-dashoffset',
	  strokeLinecap: 'stroke-linecap',
	  strokeLinejoin: 'stroke-linejoin',
	  strokeMiterlimit: 'stroke-miterlimit',
	  strokeOpacity: 'stroke-opacity',
	  strokeWidth: 'stroke-width',
	  surfaceScale: 'surfaceScale',
	  systemLanguage: 'systemLanguage',
	  tableValues: 'tableValues',
	  targetX: 'targetX',
	  targetY: 'targetY',
	  textAnchor: 'text-anchor',
	  textDecoration: 'text-decoration',
	  textRendering: 'text-rendering',
	  textLength: 'textLength',
	  to: 0,
	  transform: 0,
	  u1: 0,
	  u2: 0,
	  underlinePosition: 'underline-position',
	  underlineThickness: 'underline-thickness',
	  unicode: 0,
	  unicodeBidi: 'unicode-bidi',
	  unicodeRange: 'unicode-range',
	  unitsPerEm: 'units-per-em',
	  vAlphabetic: 'v-alphabetic',
	  vHanging: 'v-hanging',
	  vIdeographic: 'v-ideographic',
	  vMathematical: 'v-mathematical',
	  values: 0,
	  vectorEffect: 'vector-effect',
	  version: 0,
	  vertAdvY: 'vert-adv-y',
	  vertOriginX: 'vert-origin-x',
	  vertOriginY: 'vert-origin-y',
	  viewBox: 'viewBox',
	  viewTarget: 'viewTarget',
	  visibility: 0,
	  widths: 0,
	  wordSpacing: 'word-spacing',
	  writingMode: 'writing-mode',
	  x: 0,
	  xHeight: 'x-height',
	  x1: 0,
	  x2: 0,
	  xChannelSelector: 'xChannelSelector',
	  xlinkActuate: 'xlink:actuate',
	  xlinkArcrole: 'xlink:arcrole',
	  xlinkHref: 'xlink:href',
	  xlinkRole: 'xlink:role',
	  xlinkShow: 'xlink:show',
	  xlinkTitle: 'xlink:title',
	  xlinkType: 'xlink:type',
	  xmlBase: 'xml:base',
	  xmlns: 0,
	  xmlnsXlink: 'xmlns:xlink',
	  xmlLang: 'xml:lang',
	  xmlSpace: 'xml:space',
	  y: 0,
	  y1: 0,
	  y2: 0,
	  yChannelSelector: 'yChannelSelector',
	  z: 0,
	  zoomAndPan: 'zoomAndPan'
	};
	var SVGDOMPropertyConfig$1 = {
	  Properties: {},
	  DOMAttributeNamespaces: {
	    xlinkActuate: NS.xlink,
	    xlinkArcrole: NS.xlink,
	    xlinkHref: NS.xlink,
	    xlinkRole: NS.xlink,
	    xlinkShow: NS.xlink,
	    xlinkTitle: NS.xlink,
	    xlinkType: NS.xlink,
	    xmlBase: NS.xml,
	    xmlLang: NS.xml,
	    xmlSpace: NS.xml
	  },
	  DOMAttributeNames: {}
	};
	Object.keys(ATTRS).forEach(function (key) {
	  SVGDOMPropertyConfig$1.Properties[key] = 0;

	  if (ATTRS[key]) {
	    SVGDOMPropertyConfig$1.DOMAttributeNames[key] = ATTRS[key];
	  }
	});
	var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var EventPropagators$1 = EventPropagators_1;
	var ExecutionEnvironment = ExecutionEnvironment_1;
	var ReactDOMComponentTree$5 = ReactDOMComponentTree_1;
	var ReactInputSelection = ReactInputSelection_1;
	var SyntheticEvent$4 = SyntheticEvent_1;
	var getActiveElement = getActiveElement_1;
	var isTextInputElement = isTextInputElement_1;
	var shallowEqual = shallowEqual_1;
	var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;
	var eventTypes$1 = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: 'onSelect',
	      captured: 'onSelectCapture'
	    },
	    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
	  }
	};
	var activeElement = null;
	var activeElementInst = null;
	var lastSelection = null;
	var mouseDown = false; // Track whether a listener exists for this plugin. If none exist, we do
	// not extract events. See #3639.

	var hasListener = false;
	/**
	 * Get an object which is a unique representation of the current selection.
	 *
	 * The return value will not be consistent across nodes or browsers, but
	 * two identical selections on the same node will return identical objects.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */

	function getSelection(node) {
	  if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
	    return {
	      start: node.selectionStart,
	      end: node.selectionEnd
	    };
	  } else if (window.getSelection) {
	    var selection = window.getSelection();
	    return {
	      anchorNode: selection.anchorNode,
	      anchorOffset: selection.anchorOffset,
	      focusNode: selection.focusNode,
	      focusOffset: selection.focusOffset
	    };
	  } else if (document.selection) {
	    var range = document.selection.createRange();
	    return {
	      parentElement: range.parentElement(),
	      text: range.text,
	      top: range.boundingTop,
	      left: range.boundingLeft
	    };
	  }
	}
	/**
	 * Poll selection to see whether it's changed.
	 *
	 * @param {object} nativeEvent
	 * @return {?SyntheticEvent}
	 */


	function constructSelectEvent(nativeEvent, nativeEventTarget) {
	  // Ensure we have the right element, and that the user is not dragging a
	  // selection (this matches native `select` event behavior). In HTML5, select
	  // fires only on input and textarea thus if there's no focused element we
	  // won't dispatch.
	  if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
	    return null;
	  } // Only fire when selection has actually changed.


	  var currentSelection = getSelection(activeElement);

	  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
	    lastSelection = currentSelection;
	    var syntheticEvent = SyntheticEvent$4.getPooled(eventTypes$1.select, activeElementInst, nativeEvent, nativeEventTarget);
	    syntheticEvent.type = 'select';
	    syntheticEvent.target = activeElement;
	    EventPropagators$1.accumulateTwoPhaseDispatches(syntheticEvent);
	    return syntheticEvent;
	  }

	  return null;
	}
	/**
	 * This plugin creates an `onSelect` event that normalizes select events
	 * across form elements.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - contentEditable
	 *
	 * This differs from native browser implementations in the following ways:
	 * - Fires on contentEditable fields as well as inputs.
	 * - Fires for collapsed selection.
	 * - Fires after user input.
	 */


	var SelectEventPlugin$1 = {
	  eventTypes: eventTypes$1,
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    if (!hasListener) {
	      return null;
	    }

	    var targetNode = targetInst ? ReactDOMComponentTree$5.getNodeFromInstance(targetInst) : window;

	    switch (topLevelType) {
	      // Track the input node that has focus.
	      case 'topFocus':
	        if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
	          activeElement = targetNode;
	          activeElementInst = targetInst;
	          lastSelection = null;
	        }

	        break;

	      case 'topBlur':
	        activeElement = null;
	        activeElementInst = null;
	        lastSelection = null;
	        break;
	      // Don't fire the event while the user is dragging. This matches the
	      // semantics of the native select event.

	      case 'topMouseDown':
	        mouseDown = true;
	        break;

	      case 'topContextMenu':
	      case 'topMouseUp':
	        mouseDown = false;
	        return constructSelectEvent(nativeEvent, nativeEventTarget);
	      // Chrome and IE fire non-standard event when selection is changed (and
	      // sometimes when it hasn't). IE's event fires out of order with respect
	      // to key and input events on deletion, so we discard it.
	      //
	      // Firefox doesn't support selectionchange, so check selection status
	      // after each key entry. The selection changes after keydown and before
	      // keyup, but we check on keydown as well in the case of holding down a
	      // key, when multiple keydown events are fired but only one keyup is.
	      // This is also our approach for IE handling, for the reason above.

	      case 'topSelectionChange':
	        if (skipSelectionChangeEvent) {
	          break;
	        }

	      // falls through

	      case 'topKeyDown':
	      case 'topKeyUp':
	        return constructSelectEvent(nativeEvent, nativeEventTarget);
	    }

	    return null;
	  },
	  didPutListener: function (inst, registrationName, listener) {
	    if (registrationName === 'onSelect') {
	      hasListener = true;
	    }
	  }
	};
	var SelectEventPlugin_1 = SelectEventPlugin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$3 = SyntheticEvent_1;
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
	 */

	var AnimationEventInterface = {
	  animationName: null,
	  elapsedTime: null,
	  pseudoElement: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */

	function SyntheticAnimationEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$3.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$3.augmentClass(SyntheticAnimationEvent$1, AnimationEventInterface);
	var SyntheticAnimationEvent_1 = SyntheticAnimationEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$2 = SyntheticEvent_1;
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */

	var ClipboardEventInterface = {
	  clipboardData: function (event) {
	    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
	  }
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticClipboardEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$2.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$2.augmentClass(SyntheticClipboardEvent$1, ClipboardEventInterface);
	var SyntheticClipboardEvent_1 = SyntheticClipboardEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticUIEvent$3 = SyntheticUIEvent_1;
	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var FocusEventInterface = {
	  relatedTarget: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticFocusEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent$3.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticUIEvent$3.augmentClass(SyntheticFocusEvent$1, FocusEventInterface);
	var SyntheticFocusEvent_1 = SyntheticFocusEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	/**
	 * `charCode` represents the actual "character code" and is safe to use with
	 * `String.fromCharCode`. As such, only keys that correspond to printable
	 * characters produce a valid `charCode`, the only exception to this is Enter.
	 * The Tab-key is considered non-printable and does not have a `charCode`,
	 * presumably because it does not produce a tab-character in browsers.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {number} Normalized `charCode` property.
	 */


	function getEventCharCode$3(nativeEvent) {
	  var charCode;
	  var keyCode = nativeEvent.keyCode;

	  if ('charCode' in nativeEvent) {
	    charCode = nativeEvent.charCode; // FF does not set `charCode` for the Enter-key, check against `keyCode`.

	    if (charCode === 0 && keyCode === 13) {
	      charCode = 13;
	    }
	  } else {
	    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
	    charCode = keyCode;
	  } // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
	  // Must not discard the (non-)printable Enter-key.


	  if (charCode >= 32 || charCode === 13) {
	    return charCode;
	  }

	  return 0;
	}

	var getEventCharCode_1 = getEventCharCode$3;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var getEventCharCode$2 = getEventCharCode_1;
	/**
	 * Normalization of deprecated HTML5 `key` values
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */

	var normalizeKey = {
	  Esc: 'Escape',
	  Spacebar: ' ',
	  Left: 'ArrowLeft',
	  Up: 'ArrowUp',
	  Right: 'ArrowRight',
	  Down: 'ArrowDown',
	  Del: 'Delete',
	  Win: 'OS',
	  Menu: 'ContextMenu',
	  Apps: 'ContextMenu',
	  Scroll: 'ScrollLock',
	  MozPrintableKey: 'Unidentified'
	};
	/**
	 * Translation from legacy `keyCode` to HTML5 `key`
	 * Only special keys supported, all others depend on keyboard layout or browser
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */

	var translateToKey = {
	  8: 'Backspace',
	  9: 'Tab',
	  12: 'Clear',
	  13: 'Enter',
	  16: 'Shift',
	  17: 'Control',
	  18: 'Alt',
	  19: 'Pause',
	  20: 'CapsLock',
	  27: 'Escape',
	  32: ' ',
	  33: 'PageUp',
	  34: 'PageDown',
	  35: 'End',
	  36: 'Home',
	  37: 'ArrowLeft',
	  38: 'ArrowUp',
	  39: 'ArrowRight',
	  40: 'ArrowDown',
	  45: 'Insert',
	  46: 'Delete',
	  112: 'F1',
	  113: 'F2',
	  114: 'F3',
	  115: 'F4',
	  116: 'F5',
	  117: 'F6',
	  118: 'F7',
	  119: 'F8',
	  120: 'F9',
	  121: 'F10',
	  122: 'F11',
	  123: 'F12',
	  144: 'NumLock',
	  145: 'ScrollLock',
	  224: 'Meta'
	};
	/**
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `key` property.
	 */

	function getEventKey$1(nativeEvent) {
	  if (nativeEvent.key) {
	    // Normalize inconsistent values reported by browsers due to
	    // implementations of a working draft specification.
	    // FireFox implements `key` but returns `MozPrintableKey` for all
	    // printable characters (normalized to `Unidentified`), ignore it.
	    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;

	    if (key !== 'Unidentified') {
	      return key;
	    }
	  } // Browser does not implement `key`, polyfill as much of it as we can.


	  if (nativeEvent.type === 'keypress') {
	    var charCode = getEventCharCode$2(nativeEvent); // The enter-key is technically both printable and non-printable and can
	    // thus be captured by `keypress`, no other non-printable key should.

	    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
	  }

	  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
	    // While user keyboard layout determines the actual meaning of each
	    // `keyCode` value, almost all function keys have a universal value.
	    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
	  }

	  return '';
	}

	var getEventKey_1 = getEventKey$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticUIEvent$2 = SyntheticUIEvent_1;
	var getEventCharCode$1 = getEventCharCode_1;
	var getEventKey = getEventKey_1;
	var getEventModifierState$1 = getEventModifierState_1;
	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var KeyboardEventInterface = {
	  key: getEventKey,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: getEventModifierState$1,
	  // Legacy Interface
	  charCode: function (event) {
	    // `charCode` is the result of a KeyPress event and represents the value of
	    // the actual printable character.
	    // KeyPress is deprecated, but its replacement is not yet final and not
	    // implemented in any major browser. Only KeyPress has charCode.
	    if (event.type === 'keypress') {
	      return getEventCharCode$1(event);
	    }

	    return 0;
	  },
	  keyCode: function (event) {
	    // `keyCode` is the result of a KeyDown/Up event and represents the value of
	    // physical keyboard key.
	    // The actual meaning of the value depends on the users' keyboard layout
	    // which cannot be detected. Assuming that it is a US keyboard layout
	    // provides a surprisingly accurate mapping for US and European users.
	    // Due to this, it is left to the user to implement at this time.
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }

	    return 0;
	  },
	  which: function (event) {
	    // `which` is an alias for either `keyCode` or `charCode` depending on the
	    // type of the event.
	    if (event.type === 'keypress') {
	      return getEventCharCode$1(event);
	    }

	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }

	    return 0;
	  }
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticKeyboardEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent$2.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticUIEvent$2.augmentClass(SyntheticKeyboardEvent$1, KeyboardEventInterface);
	var SyntheticKeyboardEvent_1 = SyntheticKeyboardEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticMouseEvent$2 = SyntheticMouseEvent_1;
	/**
	 * @interface DragEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var DragEventInterface = {
	  dataTransfer: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticDragEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticMouseEvent$2.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticMouseEvent$2.augmentClass(SyntheticDragEvent$1, DragEventInterface);
	var SyntheticDragEvent_1 = SyntheticDragEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticUIEvent$1 = SyntheticUIEvent_1;
	var getEventModifierState = getEventModifierState_1;
	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */

	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: getEventModifierState
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */

	function SyntheticTouchEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticUIEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticUIEvent$1.augmentClass(SyntheticTouchEvent$1, TouchEventInterface);
	var SyntheticTouchEvent_1 = SyntheticTouchEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticEvent$1 = SyntheticEvent_1;
	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
	 */

	var TransitionEventInterface = {
	  propertyName: null,
	  elapsedTime: null,
	  pseudoElement: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */

	function SyntheticTransitionEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticEvent$1.augmentClass(SyntheticTransitionEvent$1, TransitionEventInterface);
	var SyntheticTransitionEvent_1 = SyntheticTransitionEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var SyntheticMouseEvent$1 = SyntheticMouseEvent_1;
	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */

	var WheelEventInterface = {
	  deltaX: function (event) {
	    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
	  },
	  deltaY: function (event) {
	    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	    'wheelDelta' in event ? -event.wheelDelta : 0;
	  },
	  deltaZ: null,
	  // Browsers without "deltaMode" is reporting in raw wheel delta where one
	  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
	  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
	  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
	  deltaMode: null
	};
	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */

	function SyntheticWheelEvent$1(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
	  return SyntheticMouseEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
	}

	SyntheticMouseEvent$1.augmentClass(SyntheticWheelEvent$1, WheelEventInterface);
	var SyntheticWheelEvent_1 = SyntheticWheelEvent$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var _prodInvariant$2 = reactProdInvariant_1;
	var EventListener = EventListener_1;
	var EventPropagators = EventPropagators_1;
	var ReactDOMComponentTree$4 = ReactDOMComponentTree_1;
	var SyntheticAnimationEvent = SyntheticAnimationEvent_1;
	var SyntheticClipboardEvent = SyntheticClipboardEvent_1;
	var SyntheticEvent = SyntheticEvent_1;
	var SyntheticFocusEvent = SyntheticFocusEvent_1;
	var SyntheticKeyboardEvent = SyntheticKeyboardEvent_1;
	var SyntheticMouseEvent = SyntheticMouseEvent_1;
	var SyntheticDragEvent = SyntheticDragEvent_1;
	var SyntheticTouchEvent = SyntheticTouchEvent_1;
	var SyntheticTransitionEvent = SyntheticTransitionEvent_1;
	var SyntheticUIEvent = SyntheticUIEvent_1;
	var SyntheticWheelEvent = SyntheticWheelEvent_1;
	var emptyFunction$1 = emptyFunction_1;
	var getEventCharCode = getEventCharCode_1;
	/**
	 * Turns
	 * ['abort', ...]
	 * into
	 * eventTypes = {
	 *   'abort': {
	 *     phasedRegistrationNames: {
	 *       bubbled: 'onAbort',
	 *       captured: 'onAbortCapture',
	 *     },
	 *     dependencies: ['topAbort'],
	 *   },
	 *   ...
	 * };
	 * topLevelEventsToDispatchConfig = {
	 *   'topAbort': { sameConfig }
	 * };
	 */

	var eventTypes = {};
	var topLevelEventsToDispatchConfig = {};
	['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'canPlay', 'canPlayThrough', 'click', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
	  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
	  var onEvent = 'on' + capitalizedEvent;
	  var topEvent = 'top' + capitalizedEvent;
	  var type = {
	    phasedRegistrationNames: {
	      bubbled: onEvent,
	      captured: onEvent + 'Capture'
	    },
	    dependencies: [topEvent]
	  };
	  eventTypes[event] = type;
	  topLevelEventsToDispatchConfig[topEvent] = type;
	});
	var onClickListeners = {};

	function getDictionaryKey(inst) {
	  // Prevents V8 performance issue:
	  // https://github.com/facebook/react/pull/7232
	  return '.' + inst._rootNodeID;
	}

	function isInteractive(tag) {
	  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
	}

	var SimpleEventPlugin$1 = {
	  eventTypes: eventTypes,
	  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
	    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];

	    if (!dispatchConfig) {
	      return null;
	    }

	    var EventConstructor;

	    switch (topLevelType) {
	      case 'topAbort':
	      case 'topCanPlay':
	      case 'topCanPlayThrough':
	      case 'topDurationChange':
	      case 'topEmptied':
	      case 'topEncrypted':
	      case 'topEnded':
	      case 'topError':
	      case 'topInput':
	      case 'topInvalid':
	      case 'topLoad':
	      case 'topLoadedData':
	      case 'topLoadedMetadata':
	      case 'topLoadStart':
	      case 'topPause':
	      case 'topPlay':
	      case 'topPlaying':
	      case 'topProgress':
	      case 'topRateChange':
	      case 'topReset':
	      case 'topSeeked':
	      case 'topSeeking':
	      case 'topStalled':
	      case 'topSubmit':
	      case 'topSuspend':
	      case 'topTimeUpdate':
	      case 'topVolumeChange':
	      case 'topWaiting':
	        // HTML Events
	        // @see http://www.w3.org/TR/html5/index.html#events-0
	        EventConstructor = SyntheticEvent;
	        break;

	      case 'topKeyPress':
	        // Firefox creates a keypress event for function keys too. This removes
	        // the unwanted keypress events. Enter is however both printable and
	        // non-printable. One would expect Tab to be as well (but it isn't).
	        if (getEventCharCode(nativeEvent) === 0) {
	          return null;
	        }

	      /* falls through */

	      case 'topKeyDown':
	      case 'topKeyUp':
	        EventConstructor = SyntheticKeyboardEvent;
	        break;

	      case 'topBlur':
	      case 'topFocus':
	        EventConstructor = SyntheticFocusEvent;
	        break;

	      case 'topClick':
	        // Firefox creates a click event on right mouse clicks. This removes the
	        // unwanted click events.
	        if (nativeEvent.button === 2) {
	          return null;
	        }

	      /* falls through */

	      case 'topDoubleClick':
	      case 'topMouseDown':
	      case 'topMouseMove':
	      case 'topMouseUp': // TODO: Disabled elements should not respond to mouse events

	      /* falls through */

	      case 'topMouseOut':
	      case 'topMouseOver':
	      case 'topContextMenu':
	        EventConstructor = SyntheticMouseEvent;
	        break;

	      case 'topDrag':
	      case 'topDragEnd':
	      case 'topDragEnter':
	      case 'topDragExit':
	      case 'topDragLeave':
	      case 'topDragOver':
	      case 'topDragStart':
	      case 'topDrop':
	        EventConstructor = SyntheticDragEvent;
	        break;

	      case 'topTouchCancel':
	      case 'topTouchEnd':
	      case 'topTouchMove':
	      case 'topTouchStart':
	        EventConstructor = SyntheticTouchEvent;
	        break;

	      case 'topAnimationEnd':
	      case 'topAnimationIteration':
	      case 'topAnimationStart':
	        EventConstructor = SyntheticAnimationEvent;
	        break;

	      case 'topTransitionEnd':
	        EventConstructor = SyntheticTransitionEvent;
	        break;

	      case 'topScroll':
	        EventConstructor = SyntheticUIEvent;
	        break;

	      case 'topWheel':
	        EventConstructor = SyntheticWheelEvent;
	        break;

	      case 'topCopy':
	      case 'topCut':
	      case 'topPaste':
	        EventConstructor = SyntheticClipboardEvent;
	        break;
	    }

	    !EventConstructor ? _prodInvariant$2('86', topLevelType) : void 0;
	    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  },
	  didPutListener: function (inst, registrationName, listener) {
	    // Mobile Safari does not fire properly bubble click events on
	    // non-interactive elements, which means delegated click listeners do not
	    // fire. The workaround for this bug involves attaching an empty click
	    // listener on the target node.
	    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
	      var key = getDictionaryKey(inst);
	      var node = ReactDOMComponentTree$4.getNodeFromInstance(inst);

	      if (!onClickListeners[key]) {
	        onClickListeners[key] = EventListener.listen(node, 'click', emptyFunction$1);
	      }
	    }
	  },
	  willDeleteListener: function (inst, registrationName) {
	    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
	      var key = getDictionaryKey(inst);
	      onClickListeners[key].remove();
	      delete onClickListeners[key];
	    }
	  }
	};
	var SimpleEventPlugin_1 = SimpleEventPlugin$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ARIADOMPropertyConfig = ARIADOMPropertyConfig_1;
	var BeforeInputEventPlugin = BeforeInputEventPlugin_1;
	var ChangeEventPlugin = ChangeEventPlugin_1;
	var DefaultEventPluginOrder = DefaultEventPluginOrder_1;
	var EnterLeaveEventPlugin = EnterLeaveEventPlugin_1;
	var HTMLDOMPropertyConfig = HTMLDOMPropertyConfig_1;
	var ReactComponentBrowserEnvironment = ReactComponentBrowserEnvironment_1;
	var ReactDOMComponent = ReactDOMComponent_1;
	var ReactDOMComponentTree$3 = ReactDOMComponentTree_1;
	var ReactDOMEmptyComponent = ReactDOMEmptyComponent_1;
	var ReactDOMTreeTraversal = ReactDOMTreeTraversal$1;
	var ReactDOMTextComponent = ReactDOMTextComponent_1;
	var ReactDefaultBatchingStrategy = ReactDefaultBatchingStrategy_1;
	var ReactEventListener = ReactEventListener_1;
	var ReactInjection = ReactInjection_1;
	var ReactReconcileTransaction = ReactReconcileTransaction_1;
	var SVGDOMPropertyConfig = SVGDOMPropertyConfig_1;
	var SelectEventPlugin = SelectEventPlugin_1;
	var SimpleEventPlugin = SimpleEventPlugin_1;
	var alreadyInjected = false;

	function inject() {
	  if (alreadyInjected) {
	    // TODO: This is currently true because these injections are shared between
	    // the client and the server package. They should be built independently
	    // and not share any injection state. Then this problem will be solved.
	    return;
	  }

	  alreadyInjected = true;
	  ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
	  /**
	   * Inject modules for resolving DOM hierarchy and plugin ordering.
	   */

	  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
	  ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree$3);
	  ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);
	  /**
	   * Some important event plugins included by default (without having to require
	   * them).
	   */

	  ReactInjection.EventPluginHub.injectEventPluginsByName({
	    SimpleEventPlugin: SimpleEventPlugin,
	    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
	    ChangeEventPlugin: ChangeEventPlugin,
	    SelectEventPlugin: SelectEventPlugin,
	    BeforeInputEventPlugin: BeforeInputEventPlugin
	  });
	  ReactInjection.HostComponent.injectGenericComponentClass(ReactDOMComponent);
	  ReactInjection.HostComponent.injectTextComponentClass(ReactDOMTextComponent);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(ARIADOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
	  ReactInjection.EmptyComponent.injectEmptyComponentFactory(function (instantiate) {
	    return new ReactDOMEmptyComponent(instantiate);
	  });
	  ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
	  ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
	  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
	}

	var ReactDefaultInjection$1 = {
	  inject: inject
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	var DOC_NODE_TYPE$1 = 9;

	function ReactDOMContainerInfo$1(topLevelWrapper, node) {
	  var info = {
	    _topLevelWrapper: topLevelWrapper,
	    _idCounter: 1,
	    _ownerDocument: node ? node.nodeType === DOC_NODE_TYPE$1 ? node : node.ownerDocument : null,
	    _node: node,
	    _tag: node ? node.nodeName.toLowerCase() : null,
	    _namespaceURI: node ? node.namespaceURI : null
	  };

	  return info;
	}

	var ReactDOMContainerInfo_1 = ReactDOMContainerInfo$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMFeatureFlags$1 = {
	  useCreateElement: true,
	  useFiber: false
	};
	var ReactDOMFeatureFlags_1 = ReactDOMFeatureFlags$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	var MOD = 65521; // adler32 is not cryptographically strong, and is only used to sanity check that
	// markup generated on the server matches the markup generated on the client.
	// This implementation (a modified version of the SheetJS version) has been optimized
	// for our use case, at the expense of conforming to the adler32 specification
	// for non-ascii inputs.

	function adler32$1(data) {
	  var a = 1;
	  var b = 0;
	  var i = 0;
	  var l = data.length;
	  var m = l & ~0x3;

	  while (i < m) {
	    var n = Math.min(i + 4096, m);

	    for (; i < n; i += 4) {
	      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
	    }

	    a %= MOD;
	    b %= MOD;
	  }

	  for (; i < l; i++) {
	    b += a += data.charCodeAt(i);
	  }

	  a %= MOD;
	  b %= MOD;
	  return a | b << 16;
	}

	var adler32_1 = adler32$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var adler32 = adler32_1;
	var TAG_END = /\/?>/;
	var COMMENT_START = /^<\!\-\-/;
	var ReactMarkupChecksum$1 = {
	  CHECKSUM_ATTR_NAME: 'data-react-checksum',

	  /**
	   * @param {string} markup Markup string
	   * @return {string} Markup string with checksum attribute attached
	   */
	  addChecksumToMarkup: function (markup) {
	    var checksum = adler32(markup); // Add checksum (handle both parent tags, comments and self-closing tags)

	    if (COMMENT_START.test(markup)) {
	      return markup;
	    } else {
	      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum$1.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
	    }
	  },

	  /**
	   * @param {string} markup to use
	   * @param {DOMElement} element root React element
	   * @returns {boolean} whether or not the markup is the same
	   */
	  canReuseMarkup: function (markup, element) {
	    var existingChecksum = element.getAttribute(ReactMarkupChecksum$1.CHECKSUM_ATTR_NAME);
	    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
	    var markupChecksum = adler32(markup);
	    return markupChecksum === existingChecksum;
	  }
	};
	var ReactMarkupChecksum_1 = ReactMarkupChecksum$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant$1 = reactProdInvariant_1;
	var DOMLazyTree = DOMLazyTree_1;
	var DOMProperty = DOMProperty_1;
	var React$2 = React_1;
	var ReactBrowserEventEmitter = ReactBrowserEventEmitter_1;
	var ReactDOMComponentTree$2 = ReactDOMComponentTree_1;
	var ReactDOMContainerInfo = ReactDOMContainerInfo_1;
	var ReactDOMFeatureFlags = ReactDOMFeatureFlags_1;
	var ReactInstanceMap$1 = ReactInstanceMap_1;
	var ReactMarkupChecksum = ReactMarkupChecksum_1;
	var ReactReconciler$1 = ReactReconciler_1;
	var ReactUpdateQueue = ReactUpdateQueue_1;
	var ReactUpdates$1 = ReactUpdates_1;
	var emptyObject = emptyObject_1;
	var instantiateReactComponent = instantiateReactComponent_1;
	var setInnerHTML = setInnerHTML_1;
	var shouldUpdateReactComponent = shouldUpdateReactComponent_1;
	var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
	var ROOT_ATTR_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;
	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;
	var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
	var instancesByReactRootID = {};
	/**
	 * Finds the index of the first character
	 * that's not common between the two given strings.
	 *
	 * @return {number} the index of the character where the strings diverge
	 */

	function firstDifferenceIndex(string1, string2) {
	  var minLen = Math.min(string1.length, string2.length);

	  for (var i = 0; i < minLen; i++) {
	    if (string1.charAt(i) !== string2.charAt(i)) {
	      return i;
	    }
	  }

	  return string1.length === string2.length ? -1 : minLen;
	}
	/**
	 * @param {DOMElement|DOMDocument} container DOM element that may contain
	 * a React component
	 * @return {?*} DOM element that may have the reactRoot ID, or null.
	 */


	function getReactRootElementInContainer(container) {
	  if (!container) {
	    return null;
	  }

	  if (container.nodeType === DOC_NODE_TYPE) {
	    return container.documentElement;
	  } else {
	    return container.firstChild;
	  }
	}

	function internalGetID(node) {
	  // If node is something like a window, document, or text node, none of
	  // which support attributes or a .getAttribute method, gracefully return
	  // the empty string, as if the attribute were missing.
	  return node.getAttribute && node.getAttribute(ATTR_NAME) || '';
	}
	/**
	 * Mounts this component and inserts it into the DOM.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {ReactReconcileTransaction} transaction
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */


	function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {

	  var markup = ReactReconciler$1.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context, 0
	  /* parentDebugID */
	  );

	  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;

	  ReactMount$2._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
	}
	/**
	 * Batched mount.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */


	function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
	  var transaction = ReactUpdates$1.ReactReconcileTransaction.getPooled(
	  /* useCreateElement */
	  !shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement);
	  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
	  ReactUpdates$1.ReactReconcileTransaction.release(transaction);
	}
	/**
	 * Unmounts a component and removes it from the DOM.
	 *
	 * @param {ReactComponent} instance React component instance.
	 * @param {DOMElement} container DOM element to unmount from.
	 * @final
	 * @internal
	 * @see {ReactMount.unmountComponentAtNode}
	 */


	function unmountComponentFromNode(instance, container, safely) {

	  ReactReconciler$1.unmountComponent(instance, safely);

	  if (container.nodeType === DOC_NODE_TYPE) {
	    container = container.documentElement;
	  } // http://jsperf.com/emptying-a-node


	  while (container.lastChild) {
	    container.removeChild(container.lastChild);
	  }
	}
	/**
	 * True if the supplied DOM node has a direct React-rendered child that is
	 * not a React root element. Useful for warning in `render`,
	 * `unmountComponentAtNode`, etc.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM element contains a direct child that was
	 * rendered by React but is not a root element.
	 * @internal
	 */


	function hasNonRootReactChild(container) {
	  var rootEl = getReactRootElementInContainer(container);

	  if (rootEl) {
	    var inst = ReactDOMComponentTree$2.getInstanceFromNode(rootEl);
	    return !!(inst && inst._hostParent);
	  }
	}
	/**
	 * True if the supplied DOM node is a valid node element.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @return {boolean} True if the DOM is a valid DOM node.
	 * @internal
	 */


	function isValidContainer(node) {
	  return !!(node && (node.nodeType === ELEMENT_NODE_TYPE || node.nodeType === DOC_NODE_TYPE || node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE));
	}

	function getHostRootInstanceInContainer(container) {
	  var rootEl = getReactRootElementInContainer(container);
	  var prevHostInstance = rootEl && ReactDOMComponentTree$2.getInstanceFromNode(rootEl);
	  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
	}

	function getTopLevelWrapperInContainer(container) {
	  var root = getHostRootInstanceInContainer(container);
	  return root ? root._hostContainerInfo._topLevelWrapper : null;
	}
	/**
	 * Temporary (?) hack so that we can store all top-level pending updates on
	 * composites instead of having to worry about different types of components
	 * here.
	 */


	var topLevelRootCounter = 1;

	var TopLevelWrapper = function () {
	  this.rootID = topLevelRootCounter++;
	};

	TopLevelWrapper.prototype.isReactComponent = {};

	TopLevelWrapper.prototype.render = function () {
	  return this.props.child;
	};

	TopLevelWrapper.isReactTopLevelWrapper = true;
	/**
	 * Mounting is the process of initializing a React component by creating its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.render(
	 *     component,
	 *     document.getElementById('container')
	 *   );
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */

	var ReactMount$2 = {
	  TopLevelWrapper: TopLevelWrapper,

	  /**
	   * Used by devtools. The keys are not important.
	   */
	  _instancesByReactRootID: instancesByReactRootID,

	  /**
	   * This is a hook provided to support rendering React components while
	   * ensuring that the apparent scroll position of its `container` does not
	   * change.
	   *
	   * @param {DOMElement} container The `container` being rendered into.
	   * @param {function} renderCallback This must be called once to do the render.
	   */
	  scrollMonitor: function (container, renderCallback) {
	    renderCallback();
	  },

	  /**
	   * Take a component that's already mounted into the DOM and replace its props
	   * @param {ReactComponent} prevComponent component instance already in the DOM
	   * @param {ReactElement} nextElement component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {?function} callback function triggered on completion
	   */
	  _updateRootComponent: function (prevComponent, nextElement, nextContext, container, callback) {
	    ReactMount$2.scrollMonitor(container, function () {
	      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);

	      if (callback) {
	        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
	      }
	    });
	    return prevComponent;
	  },

	  /**
	   * Render a new component into the DOM. Hooked by hooks!
	   *
	   * @param {ReactElement} nextElement element to render
	   * @param {DOMElement} container container to render into
	   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
	   * @return {ReactComponent} nextComponent
	   */
	  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
	    !isValidContainer(container) ? _prodInvariant$1('37') : void 0;
	    ReactBrowserEventEmitter.ensureScrollValueMonitoring();
	    var componentInstance = instantiateReactComponent(nextElement); // The initial render is synchronous but any updates that happen during
	    // rendering, in componentWillMount or componentDidMount, will be batched
	    // according to the current batching strategy.

	    ReactUpdates$1.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
	    var wrapperID = componentInstance._instance.rootID;
	    instancesByReactRootID[wrapperID] = componentInstance;
	    return componentInstance;
	  },

	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
	   * @param {ReactElement} nextElement Component element to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
	    !(parentComponent != null && ReactInstanceMap$1.has(parentComponent)) ? _prodInvariant$1('38') : void 0;
	    return ReactMount$2._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
	  },
	  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
	    ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render');
	    !React$2.isValidElement(nextElement) ? _prodInvariant$1('39', typeof nextElement === 'string' ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />." : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;
	    var nextWrappedElement = React$2.createElement(TopLevelWrapper, {
	      child: nextElement
	    });
	    var nextContext;

	    if (parentComponent) {
	      var parentInst = ReactInstanceMap$1.get(parentComponent);
	      nextContext = parentInst._processChildContext(parentInst._context);
	    } else {
	      nextContext = emptyObject;
	    }

	    var prevComponent = getTopLevelWrapperInContainer(container);

	    if (prevComponent) {
	      var prevWrappedElement = prevComponent._currentElement;
	      var prevElement = prevWrappedElement.props.child;

	      if (shouldUpdateReactComponent(prevElement, nextElement)) {
	        var publicInst = prevComponent._renderedComponent.getPublicInstance();

	        var updatedCallback = callback && function () {
	          callback.call(publicInst);
	        };

	        ReactMount$2._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);

	        return publicInst;
	      } else {
	        ReactMount$2.unmountComponentAtNode(container);
	      }
	    }

	    var reactRootElement = getReactRootElementInContainer(container);
	    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
	    var containerHasNonRootReactChild = hasNonRootReactChild(container);

	    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;

	    var component = ReactMount$2._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();

	    if (callback) {
	      callback.call(component);
	    }

	    return component;
	  },

	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactElement} nextElement Component element to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  render: function (nextElement, container, callback) {
	    return ReactMount$2._renderSubtreeIntoContainer(null, nextElement, container, callback);
	  },

	  /**
	   * Unmounts and destroys the React component rendered in the `container`.
	   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
	   *
	   * @param {DOMElement} container DOM element containing a React component.
	   * @return {boolean} True if a component was found in and unmounted from
	   *                   `container`
	   */
	  unmountComponentAtNode: function (container) {
	    !isValidContainer(container) ? _prodInvariant$1('40') : void 0;

	    var prevComponent = getTopLevelWrapperInContainer(container);

	    if (!prevComponent) {
	      // Check if the node being unmounted was rendered by React, but isn't a
	      // root node.
	      hasNonRootReactChild(container); // Check if the container itself is a React root node.

	      container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);

	      return false;
	    }

	    delete instancesByReactRootID[prevComponent._instance.rootID];
	    ReactUpdates$1.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
	    return true;
	  },
	  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {
	    !isValidContainer(container) ? _prodInvariant$1('41') : void 0;

	    if (shouldReuseMarkup) {
	      var rootElement = getReactRootElementInContainer(container);

	      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
	        ReactDOMComponentTree$2.precacheNode(instance, rootElement);
	        return;
	      } else {
	        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
	        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
	        var rootMarkup = rootElement.outerHTML;
	        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
	        var normalizedMarkup = markup;

	        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
	        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
	        !(container.nodeType !== DOC_NODE_TYPE) ? _prodInvariant$1('42', difference) : void 0;
	      }
	    }

	    !(container.nodeType !== DOC_NODE_TYPE) ? _prodInvariant$1('43') : void 0;

	    if (transaction.useCreateElement) {
	      while (container.lastChild) {
	        container.removeChild(container.lastChild);
	      }

	      DOMLazyTree.insertTreeBefore(container, markup, null);
	    } else {
	      setInnerHTML(container, markup);
	      ReactDOMComponentTree$2.precacheNode(instance, container.firstChild);
	    }
	  }
	};
	var ReactMount_1 = ReactMount$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactVersion$1 = '15.6.2';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactNodeTypes = ReactNodeTypes_1;

	function getHostComponentFromComposite$2(inst) {
	  var type;

	  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
	    inst = inst._renderedComponent;
	  }

	  if (type === ReactNodeTypes.HOST) {
	    return inst._renderedComponent;
	  } else if (type === ReactNodeTypes.EMPTY) {
	    return null;
	  }
	}

	var getHostComponentFromComposite_1 = getHostComponentFromComposite$2;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var _prodInvariant = reactProdInvariant_1;
	var ReactDOMComponentTree$1 = ReactDOMComponentTree_1;
	var ReactInstanceMap = ReactInstanceMap_1;
	var getHostComponentFromComposite$1 = getHostComponentFromComposite_1;
	/**
	 * Returns the DOM node rendered by this element.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
	 *
	 * @param {ReactComponent|DOMElement} componentOrElement
	 * @return {?DOMElement} The root node of this element.
	 */

	function findDOMNode$1(componentOrElement) {

	  if (componentOrElement == null) {
	    return null;
	  }

	  if (componentOrElement.nodeType === 1) {
	    return componentOrElement;
	  }

	  var inst = ReactInstanceMap.get(componentOrElement);

	  if (inst) {
	    inst = getHostComponentFromComposite$1(inst);
	    return inst ? ReactDOMComponentTree$1.getNodeFromInstance(inst) : null;
	  }

	  if (typeof componentOrElement.render === 'function') {
	    _prodInvariant('44') ;
	  } else {
	    _prodInvariant('45', Object.keys(componentOrElement)) ;
	  }
	}

	var findDOMNode_1 = findDOMNode$1;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactMount$1 = ReactMount_1;
	var renderSubtreeIntoContainer$1 = ReactMount$1.renderSubtreeIntoContainer;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var ReactDOMComponentTree = ReactDOMComponentTree_1;
	var ReactDefaultInjection = ReactDefaultInjection$1;
	var ReactMount = ReactMount_1;
	var ReactReconciler = ReactReconciler_1;
	var ReactUpdates = ReactUpdates_1;
	var ReactVersion = ReactVersion$1;
	var findDOMNode = findDOMNode_1;
	var getHostComponentFromComposite = getHostComponentFromComposite_1;
	var renderSubtreeIntoContainer = renderSubtreeIntoContainer$1;
	ReactDefaultInjection.inject();
	var ReactDOM = {
	  findDOMNode: findDOMNode,
	  render: ReactMount.render,
	  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
	  version: ReactVersion,

	  /* eslint-disable camelcase */
	  unstable_batchedUpdates: ReactUpdates.batchedUpdates,
	  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
	  /* eslint-enable camelcase */

	}; // Inject the runtime into a devtools global hook regardless of browser.
	// Allows for debugging when the hook is injected on the page.

	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
	    ComponentTree: {
	      getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
	      getNodeFromInstance: function (inst) {
	        // inst is an internal instance (but could be a composite)
	        if (inst._renderedComponent) {
	          inst = getHostComponentFromComposite(inst);
	        }

	        if (inst) {
	          return ReactDOMComponentTree.getNodeFromInstance(inst);
	        } else {
	          return null;
	        }
	      }
	    },
	    Mount: ReactMount,
	    Reconciler: ReactReconciler
	  });
	}

	var ReactDOM_1 = ReactDOM;

	var reactDom = ReactDOM_1;

	var lib = {exports: {}};

	var masonry = {exports: {}};

	var outlayer = {exports: {}};

	var evEmitter = {exports: {}};

	/**
	 * EvEmitter v1.1.0
	 * Lil' event emitter
	 * MIT License
	 */

	(function (module) {
	  /* jshint unused: true, undef: true, strict: true */
	  (function (global, factory) {
	    // universal module definition

	    /* jshint strict: false */

	    /* globals define, module, window */
	    if (module.exports) {
	      // CommonJS - Browserify, Webpack
	      module.exports = factory();
	    } else {
	      // Browser globals
	      global.EvEmitter = factory();
	    }
	  })(typeof window != 'undefined' ? window : commonjsGlobal, function () {

	    function EvEmitter() {}

	    var proto = EvEmitter.prototype;

	    proto.on = function (eventName, listener) {
	      if (!eventName || !listener) {
	        return;
	      } // set events hash


	      var events = this._events = this._events || {}; // set listeners array

	      var listeners = events[eventName] = events[eventName] || []; // only add once

	      if (listeners.indexOf(listener) == -1) {
	        listeners.push(listener);
	      }

	      return this;
	    };

	    proto.once = function (eventName, listener) {
	      if (!eventName || !listener) {
	        return;
	      } // add event


	      this.on(eventName, listener); // set once flag
	      // set onceEvents hash

	      var onceEvents = this._onceEvents = this._onceEvents || {}; // set onceListeners object

	      var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; // set flag

	      onceListeners[listener] = true;
	      return this;
	    };

	    proto.off = function (eventName, listener) {
	      var listeners = this._events && this._events[eventName];

	      if (!listeners || !listeners.length) {
	        return;
	      }

	      var index = listeners.indexOf(listener);

	      if (index != -1) {
	        listeners.splice(index, 1);
	      }

	      return this;
	    };

	    proto.emitEvent = function (eventName, args) {
	      var listeners = this._events && this._events[eventName];

	      if (!listeners || !listeners.length) {
	        return;
	      } // copy over to avoid interference if .off() in listener


	      listeners = listeners.slice(0);
	      args = args || []; // once stuff

	      var onceListeners = this._onceEvents && this._onceEvents[eventName];

	      for (var i = 0; i < listeners.length; i++) {
	        var listener = listeners[i];
	        var isOnce = onceListeners && onceListeners[listener];

	        if (isOnce) {
	          // remove listener
	          // remove before trigger to prevent recursion
	          this.off(eventName, listener); // unset once flag

	          delete onceListeners[listener];
	        } // trigger listener


	        listener.apply(this, args);
	      }

	      return this;
	    };

	    proto.allOff = function () {
	      delete this._events;
	      delete this._onceEvents;
	    };

	    return EvEmitter;
	  });
	})(evEmitter);

	var getSize = {exports: {}};

	/*!
	 * getSize v2.0.3
	 * measure size of elements
	 * MIT license
	 */

	(function (module) {
	  /* jshint browser: true, strict: true, undef: true, unused: true */

	  /* globals console: false */
	  (function (window, factory) {
	    /* jshint strict: false */

	    /* globals define, module */
	    if (module.exports) {
	      // CommonJS
	      module.exports = factory();
	    } else {
	      // browser global
	      window.getSize = factory();
	    }
	  })(window, function factory() {
	    // get a number from a string, not a percentage

	    function getStyleSize(value) {
	      var num = parseFloat(value); // not a percent like '100%', and a number

	      var isValid = value.indexOf('%') == -1 && !isNaN(num);
	      return isValid && num;
	    }

	    function noop() {}

	    var logError = typeof console == 'undefined' ? noop : function (message) {
	      console.error(message);
	    }; // -------------------------- measurements -------------------------- //

	    var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
	    var measurementsLength = measurements.length;

	    function getZeroSize() {
	      var size = {
	        width: 0,
	        height: 0,
	        innerWidth: 0,
	        innerHeight: 0,
	        outerWidth: 0,
	        outerHeight: 0
	      };

	      for (var i = 0; i < measurementsLength; i++) {
	        var measurement = measurements[i];
	        size[measurement] = 0;
	      }

	      return size;
	    } // -------------------------- getStyle -------------------------- //

	    /**
	     * getStyle, get style of element, check for Firefox bug
	     * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	     */


	    function getStyle(elem) {
	      var style = getComputedStyle(elem);

	      if (!style) {
	        logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
	      }

	      return style;
	    } // -------------------------- setup -------------------------- //


	    var isSetup = false;
	    var isBoxSizeOuter;
	    /**
	     * setup
	     * check isBoxSizerOuter
	     * do on first getSize() rather than on page load for Firefox bug
	     */

	    function setup() {
	      // setup once
	      if (isSetup) {
	        return;
	      }

	      isSetup = true; // -------------------------- box sizing -------------------------- //

	      /**
	       * Chrome & Safari measure the outer-width on style.width on border-box elems
	       * IE11 & Firefox<29 measures the inner-width
	       */

	      var div = document.createElement('div');
	      div.style.width = '200px';
	      div.style.padding = '1px 2px 3px 4px';
	      div.style.borderStyle = 'solid';
	      div.style.borderWidth = '1px 2px 3px 4px';
	      div.style.boxSizing = 'border-box';
	      var body = document.body || document.documentElement;
	      body.appendChild(div);
	      var style = getStyle(div); // round value for browser zoom. desandro/masonry#928

	      isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
	      getSize.isBoxSizeOuter = isBoxSizeOuter;
	      body.removeChild(div);
	    } // -------------------------- getSize -------------------------- //


	    function getSize(elem) {
	      setup(); // use querySeletor if elem is string

	      if (typeof elem == 'string') {
	        elem = document.querySelector(elem);
	      } // do not proceed on non-objects


	      if (!elem || typeof elem != 'object' || !elem.nodeType) {
	        return;
	      }

	      var style = getStyle(elem); // if hidden, everything is 0

	      if (style.display == 'none') {
	        return getZeroSize();
	      }

	      var size = {};
	      size.width = elem.offsetWidth;
	      size.height = elem.offsetHeight;
	      var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box'; // get all measurements

	      for (var i = 0; i < measurementsLength; i++) {
	        var measurement = measurements[i];
	        var value = style[measurement];
	        var num = parseFloat(value); // any 'auto', 'medium' value will be 0

	        size[measurement] = !isNaN(num) ? num : 0;
	      }

	      var paddingWidth = size.paddingLeft + size.paddingRight;
	      var paddingHeight = size.paddingTop + size.paddingBottom;
	      var marginWidth = size.marginLeft + size.marginRight;
	      var marginHeight = size.marginTop + size.marginBottom;
	      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	      var borderHeight = size.borderTopWidth + size.borderBottomWidth;
	      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter; // overwrite width and height if we can get it from style

	      var styleWidth = getStyleSize(style.width);

	      if (styleWidth !== false) {
	        size.width = styleWidth + ( // add padding and border unless it's already including it
	        isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
	      }

	      var styleHeight = getStyleSize(style.height);

	      if (styleHeight !== false) {
	        size.height = styleHeight + ( // add padding and border unless it's already including it
	        isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
	      }

	      size.innerWidth = size.width - (paddingWidth + borderWidth);
	      size.innerHeight = size.height - (paddingHeight + borderHeight);
	      size.outerWidth = size.width + marginWidth;
	      size.outerHeight = size.height + marginHeight;
	      return size;
	    }

	    return getSize;
	  });
	})(getSize);

	var utils$4 = {exports: {}};

	var matchesSelector = {exports: {}};

	/**
	 * matchesSelector v2.0.2
	 * matchesSelector( element, '.selector' )
	 * MIT license
	 */

	(function (module) {
	  /*jshint browser: true, strict: true, undef: true, unused: true */
	  (function (window, factory) {

	    if (module.exports) {
	      // CommonJS
	      module.exports = factory();
	    } else {
	      // browser global
	      window.matchesSelector = factory();
	    }
	  })(window, function factory() {

	    var matchesMethod = function () {
	      var ElemProto = window.Element.prototype; // check for the standard method name first

	      if (ElemProto.matches) {
	        return 'matches';
	      } // check un-prefixed


	      if (ElemProto.matchesSelector) {
	        return 'matchesSelector';
	      } // check vendor prefixes


	      var prefixes = ['webkit', 'moz', 'ms', 'o'];

	      for (var i = 0; i < prefixes.length; i++) {
	        var prefix = prefixes[i];
	        var method = prefix + 'MatchesSelector';

	        if (ElemProto[method]) {
	          return method;
	        }
	      }
	    }();

	    return function matchesSelector(elem, selector) {
	      return elem[matchesMethod](selector);
	    };
	  });
	})(matchesSelector);

	/**
	 * Fizzy UI utils v2.0.7
	 * MIT license
	 */

	(function (module) {
	  /*jshint browser: true, undef: true, unused: true, strict: true */
	  (function (window, factory) {
	    // universal module definition

	    /*jshint strict: false */

	    /*globals define, module, require */
	    if (module.exports) {
	      // CommonJS
	      module.exports = factory(window, matchesSelector.exports);
	    } else {
	      // browser global
	      window.fizzyUIUtils = factory(window, window.matchesSelector);
	    }
	  })(window, function factory(window, matchesSelector) {

	    var utils = {}; // ----- extend ----- //
	    // extends objects

	    utils.extend = function (a, b) {
	      for (var prop in b) {
	        a[prop] = b[prop];
	      }

	      return a;
	    }; // ----- modulo ----- //


	    utils.modulo = function (num, div) {
	      return (num % div + div) % div;
	    }; // ----- makeArray ----- //


	    var arraySlice = Array.prototype.slice; // turn element or nodeList into an array

	    utils.makeArray = function (obj) {
	      if (Array.isArray(obj)) {
	        // use object if already an array
	        return obj;
	      } // return empty array if undefined or null. #6


	      if (obj === null || obj === undefined) {
	        return [];
	      }

	      var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';

	      if (isArrayLike) {
	        // convert nodeList to array
	        return arraySlice.call(obj);
	      } // array of single index


	      return [obj];
	    }; // ----- removeFrom ----- //


	    utils.removeFrom = function (ary, obj) {
	      var index = ary.indexOf(obj);

	      if (index != -1) {
	        ary.splice(index, 1);
	      }
	    }; // ----- getParent ----- //


	    utils.getParent = function (elem, selector) {
	      while (elem.parentNode && elem != document.body) {
	        elem = elem.parentNode;

	        if (matchesSelector(elem, selector)) {
	          return elem;
	        }
	      }
	    }; // ----- getQueryElement ----- //
	    // use element as selector string


	    utils.getQueryElement = function (elem) {
	      if (typeof elem == 'string') {
	        return document.querySelector(elem);
	      }

	      return elem;
	    }; // ----- handleEvent ----- //
	    // enable .ontype to trigger from .addEventListener( elem, 'type' )


	    utils.handleEvent = function (event) {
	      var method = 'on' + event.type;

	      if (this[method]) {
	        this[method](event);
	      }
	    }; // ----- filterFindElements ----- //


	    utils.filterFindElements = function (elems, selector) {
	      // make array of elems
	      elems = utils.makeArray(elems);
	      var ffElems = [];
	      elems.forEach(function (elem) {
	        // check that elem is an actual element
	        if (!(elem instanceof HTMLElement)) {
	          return;
	        } // add elem if no selector


	        if (!selector) {
	          ffElems.push(elem);
	          return;
	        } // filter & find items if we have a selector
	        // filter


	        if (matchesSelector(elem, selector)) {
	          ffElems.push(elem);
	        } // find children


	        var childElems = elem.querySelectorAll(selector); // concat childElems to filterFound array

	        for (var i = 0; i < childElems.length; i++) {
	          ffElems.push(childElems[i]);
	        }
	      });
	      return ffElems;
	    }; // ----- debounceMethod ----- //


	    utils.debounceMethod = function (_class, methodName, threshold) {
	      threshold = threshold || 100; // original method

	      var method = _class.prototype[methodName];
	      var timeoutName = methodName + 'Timeout';

	      _class.prototype[methodName] = function () {
	        var timeout = this[timeoutName];
	        clearTimeout(timeout);
	        var args = arguments;

	        var _this = this;

	        this[timeoutName] = setTimeout(function () {
	          method.apply(_this, args);
	          delete _this[timeoutName];
	        }, threshold);
	      };
	    }; // ----- docReady ----- //


	    utils.docReady = function (callback) {
	      var readyState = document.readyState;

	      if (readyState == 'complete' || readyState == 'interactive') {
	        // do async to allow for other scripts to run. metafizzy/flickity#441
	        setTimeout(callback);
	      } else {
	        document.addEventListener('DOMContentLoaded', callback);
	      }
	    }; // ----- htmlInit ----- //
	    // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/


	    utils.toDashed = function (str) {
	      return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
	        return $1 + '-' + $2;
	      }).toLowerCase();
	    };

	    var console = window.console;
	    /**
	     * allow user to initialize classes via [data-namespace] or .js-namespace class
	     * htmlInit( Widget, 'widgetName' )
	     * options are parsed from data-namespace-options
	     */

	    utils.htmlInit = function (WidgetClass, namespace) {
	      utils.docReady(function () {
	        var dashedNamespace = utils.toDashed(namespace);
	        var dataAttr = 'data-' + dashedNamespace;
	        var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
	        var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
	        var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
	        var dataOptionsAttr = dataAttr + '-options';
	        var jQuery = window.jQuery;
	        elems.forEach(function (elem) {
	          var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
	          var options;

	          try {
	            options = attr && JSON.parse(attr);
	          } catch (error) {
	            // log error, do not initialize
	            if (console) {
	              console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
	            }

	            return;
	          } // initialize


	          var instance = new WidgetClass(elem, options); // make available via $().data('namespace')

	          if (jQuery) {
	            jQuery.data(elem, namespace, instance);
	          }
	        });
	      });
	    }; // -----  ----- //


	    return utils;
	  });
	})(utils$4);

	var item = {exports: {}};

	/**
	 * Outlayer Item
	 */

	(function (module) {
	  (function (window, factory) {
	    // universal module definition

	    /* jshint strict: false */

	    /* globals define, module, require */
	    if (module.exports) {
	      // CommonJS - Browserify, Webpack
	      module.exports = factory(evEmitter.exports, getSize.exports);
	    } else {
	      // browser global
	      window.Outlayer = {};
	      window.Outlayer.Item = factory(window.EvEmitter, window.getSize);
	    }
	  })(window, function factory(EvEmitter, getSize) {

	    function isEmptyObj(obj) {
	      for (var prop in obj) {
	        return false;
	      }

	      prop = null;
	      return true;
	    } // -------------------------- CSS3 support -------------------------- //


	    var docElemStyle = document.documentElement.style;
	    var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
	    var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
	    var transitionEndEvent = {
	      WebkitTransition: 'webkitTransitionEnd',
	      transition: 'transitionend'
	    }[transitionProperty]; // cache all vendor properties that could have vendor prefix

	    var vendorProperties = {
	      transform: transformProperty,
	      transition: transitionProperty,
	      transitionDuration: transitionProperty + 'Duration',
	      transitionProperty: transitionProperty + 'Property',
	      transitionDelay: transitionProperty + 'Delay'
	    }; // -------------------------- Item -------------------------- //

	    function Item(element, layout) {
	      if (!element) {
	        return;
	      }

	      this.element = element; // parent layout class, i.e. Masonry, Isotope, or Packery

	      this.layout = layout;
	      this.position = {
	        x: 0,
	        y: 0
	      };

	      this._create();
	    } // inherit EvEmitter


	    var proto = Item.prototype = Object.create(EvEmitter.prototype);
	    proto.constructor = Item;

	    proto._create = function () {
	      // transition objects
	      this._transn = {
	        ingProperties: {},
	        clean: {},
	        onEnd: {}
	      };
	      this.css({
	        position: 'absolute'
	      });
	    }; // trigger specified handler for event type


	    proto.handleEvent = function (event) {
	      var method = 'on' + event.type;

	      if (this[method]) {
	        this[method](event);
	      }
	    };

	    proto.getSize = function () {
	      this.size = getSize(this.element);
	    };
	    /**
	     * apply CSS styles to element
	     * @param {Object} style
	     */


	    proto.css = function (style) {
	      var elemStyle = this.element.style;

	      for (var prop in style) {
	        // use vendor property if available
	        var supportedProp = vendorProperties[prop] || prop;
	        elemStyle[supportedProp] = style[prop];
	      }
	    }; // measure position, and sets it


	    proto.getPosition = function () {
	      var style = getComputedStyle(this.element);

	      var isOriginLeft = this.layout._getOption('originLeft');

	      var isOriginTop = this.layout._getOption('originTop');

	      var xValue = style[isOriginLeft ? 'left' : 'right'];
	      var yValue = style[isOriginTop ? 'top' : 'bottom'];
	      var x = parseFloat(xValue);
	      var y = parseFloat(yValue); // convert percent to pixels

	      var layoutSize = this.layout.size;

	      if (xValue.indexOf('%') != -1) {
	        x = x / 100 * layoutSize.width;
	      }

	      if (yValue.indexOf('%') != -1) {
	        y = y / 100 * layoutSize.height;
	      } // clean up 'auto' or other non-integer values


	      x = isNaN(x) ? 0 : x;
	      y = isNaN(y) ? 0 : y; // remove padding from measurement

	      x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
	      y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
	      this.position.x = x;
	      this.position.y = y;
	    }; // set settled position, apply padding


	    proto.layoutPosition = function () {
	      var layoutSize = this.layout.size;
	      var style = {};

	      var isOriginLeft = this.layout._getOption('originLeft');

	      var isOriginTop = this.layout._getOption('originTop'); // x


	      var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
	      var xProperty = isOriginLeft ? 'left' : 'right';
	      var xResetProperty = isOriginLeft ? 'right' : 'left';
	      var x = this.position.x + layoutSize[xPadding]; // set in percentage or pixels

	      style[xProperty] = this.getXValue(x); // reset other property

	      style[xResetProperty] = ''; // y

	      var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
	      var yProperty = isOriginTop ? 'top' : 'bottom';
	      var yResetProperty = isOriginTop ? 'bottom' : 'top';
	      var y = this.position.y + layoutSize[yPadding]; // set in percentage or pixels

	      style[yProperty] = this.getYValue(y); // reset other property

	      style[yResetProperty] = '';
	      this.css(style);
	      this.emitEvent('layout', [this]);
	    };

	    proto.getXValue = function (x) {
	      var isHorizontal = this.layout._getOption('horizontal');

	      return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
	    };

	    proto.getYValue = function (y) {
	      var isHorizontal = this.layout._getOption('horizontal');

	      return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
	    };

	    proto._transitionTo = function (x, y) {
	      this.getPosition(); // get current x & y from top/left

	      var curX = this.position.x;
	      var curY = this.position.y;
	      var didNotMove = x == this.position.x && y == this.position.y; // save end position

	      this.setPosition(x, y); // if did not move and not transitioning, just go to layout

	      if (didNotMove && !this.isTransitioning) {
	        this.layoutPosition();
	        return;
	      }

	      var transX = x - curX;
	      var transY = y - curY;
	      var transitionStyle = {};
	      transitionStyle.transform = this.getTranslate(transX, transY);
	      this.transition({
	        to: transitionStyle,
	        onTransitionEnd: {
	          transform: this.layoutPosition
	        },
	        isCleaning: true
	      });
	    };

	    proto.getTranslate = function (x, y) {
	      // flip cooridinates if origin on right or bottom
	      var isOriginLeft = this.layout._getOption('originLeft');

	      var isOriginTop = this.layout._getOption('originTop');

	      x = isOriginLeft ? x : -x;
	      y = isOriginTop ? y : -y;
	      return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	    }; // non transition + transform support


	    proto.goTo = function (x, y) {
	      this.setPosition(x, y);
	      this.layoutPosition();
	    };

	    proto.moveTo = proto._transitionTo;

	    proto.setPosition = function (x, y) {
	      this.position.x = parseFloat(x);
	      this.position.y = parseFloat(y);
	    }; // ----- transition ----- //

	    /**
	     * @param {Object} style - CSS
	     * @param {Function} onTransitionEnd
	     */
	    // non transition, just trigger callback


	    proto._nonTransition = function (args) {
	      this.css(args.to);

	      if (args.isCleaning) {
	        this._removeStyles(args.to);
	      }

	      for (var prop in args.onTransitionEnd) {
	        args.onTransitionEnd[prop].call(this);
	      }
	    };
	    /**
	     * proper transition
	     * @param {Object} args - arguments
	     *   @param {Object} to - style to transition to
	     *   @param {Object} from - style to start transition from
	     *   @param {Boolean} isCleaning - removes transition styles after transition
	     *   @param {Function} onTransitionEnd - callback
	     */


	    proto.transition = function (args) {
	      // redirect to nonTransition if no transition duration
	      if (!parseFloat(this.layout.options.transitionDuration)) {
	        this._nonTransition(args);

	        return;
	      }

	      var _transition = this._transn; // keep track of onTransitionEnd callback by css property

	      for (var prop in args.onTransitionEnd) {
	        _transition.onEnd[prop] = args.onTransitionEnd[prop];
	      } // keep track of properties that are transitioning


	      for (prop in args.to) {
	        _transition.ingProperties[prop] = true; // keep track of properties to clean up when transition is done

	        if (args.isCleaning) {
	          _transition.clean[prop] = true;
	        }
	      } // set from styles


	      if (args.from) {
	        this.css(args.from); // force redraw. http://blog.alexmaccaw.com/css-transitions

	        this.element.offsetHeight; // hack for JSHint to hush about unused var
	      } // enable transition


	      this.enableTransition(args.to); // set styles that are transitioning

	      this.css(args.to);
	      this.isTransitioning = true;
	    }; // dash before all cap letters, including first for
	    // WebkitTransform => -webkit-transform


	    function toDashedAll(str) {
	      return str.replace(/([A-Z])/g, function ($1) {
	        return '-' + $1.toLowerCase();
	      });
	    }

	    var transitionProps = 'opacity,' + toDashedAll(transformProperty);

	    proto.enableTransition = function
	      /* style */
	    () {
	      // HACK changing transitionProperty during a transition
	      // will cause transition to jump
	      if (this.isTransitioning) {
	        return;
	      } // make `transition: foo, bar, baz` from style object
	      // HACK un-comment this when enableTransition can work
	      // while a transition is happening
	      // var transitionValues = [];
	      // for ( var prop in style ) {
	      //   // dash-ify camelCased properties like WebkitTransition
	      //   prop = vendorProperties[ prop ] || prop;
	      //   transitionValues.push( toDashedAll( prop ) );
	      // }
	      // munge number to millisecond, to match stagger


	      var duration = this.layout.options.transitionDuration;
	      duration = typeof duration == 'number' ? duration + 'ms' : duration; // enable transition styles

	      this.css({
	        transitionProperty: transitionProps,
	        transitionDuration: duration,
	        transitionDelay: this.staggerDelay || 0
	      }); // listen for transition end event

	      this.element.addEventListener(transitionEndEvent, this, false);
	    }; // ----- events ----- //


	    proto.onwebkitTransitionEnd = function (event) {
	      this.ontransitionend(event);
	    };

	    proto.onotransitionend = function (event) {
	      this.ontransitionend(event);
	    }; // properties that I munge to make my life easier


	    var dashedVendorProperties = {
	      '-webkit-transform': 'transform'
	    };

	    proto.ontransitionend = function (event) {
	      // disregard bubbled events from children
	      if (event.target !== this.element) {
	        return;
	      }

	      var _transition = this._transn; // get property name of transitioned property, convert to prefix-free

	      var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName; // remove property that has completed transitioning

	      delete _transition.ingProperties[propertyName]; // check if any properties are still transitioning

	      if (isEmptyObj(_transition.ingProperties)) {
	        // all properties have completed transitioning
	        this.disableTransition();
	      } // clean style


	      if (propertyName in _transition.clean) {
	        // clean up style
	        this.element.style[event.propertyName] = '';
	        delete _transition.clean[propertyName];
	      } // trigger onTransitionEnd callback


	      if (propertyName in _transition.onEnd) {
	        var onTransitionEnd = _transition.onEnd[propertyName];
	        onTransitionEnd.call(this);
	        delete _transition.onEnd[propertyName];
	      }

	      this.emitEvent('transitionEnd', [this]);
	    };

	    proto.disableTransition = function () {
	      this.removeTransitionStyles();
	      this.element.removeEventListener(transitionEndEvent, this, false);
	      this.isTransitioning = false;
	    };
	    /**
	     * removes style property from element
	     * @param {Object} style
	    **/


	    proto._removeStyles = function (style) {
	      // clean up transition styles
	      var cleanStyle = {};

	      for (var prop in style) {
	        cleanStyle[prop] = '';
	      }

	      this.css(cleanStyle);
	    };

	    var cleanTransitionStyle = {
	      transitionProperty: '',
	      transitionDuration: '',
	      transitionDelay: ''
	    };

	    proto.removeTransitionStyles = function () {
	      // remove transition
	      this.css(cleanTransitionStyle);
	    }; // ----- stagger ----- //


	    proto.stagger = function (delay) {
	      delay = isNaN(delay) ? 0 : delay;
	      this.staggerDelay = delay + 'ms';
	    }; // ----- show/hide/remove ----- //
	    // remove element from DOM


	    proto.removeElem = function () {
	      this.element.parentNode.removeChild(this.element); // remove display: none

	      this.css({
	        display: ''
	      });
	      this.emitEvent('remove', [this]);
	    };

	    proto.remove = function () {
	      // just remove element if no transition support or no transition
	      if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
	        this.removeElem();
	        return;
	      } // start transition


	      this.once('transitionEnd', function () {
	        this.removeElem();
	      });
	      this.hide();
	    };

	    proto.reveal = function () {
	      delete this.isHidden; // remove display: none

	      this.css({
	        display: ''
	      });
	      var options = this.layout.options;
	      var onTransitionEnd = {};
	      var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
	      onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
	      this.transition({
	        from: options.hiddenStyle,
	        to: options.visibleStyle,
	        isCleaning: true,
	        onTransitionEnd: onTransitionEnd
	      });
	    };

	    proto.onRevealTransitionEnd = function () {
	      // check if still visible
	      // during transition, item may have been hidden
	      if (!this.isHidden) {
	        this.emitEvent('reveal');
	      }
	    };
	    /**
	     * get style property use for hide/reveal transition end
	     * @param {String} styleProperty - hiddenStyle/visibleStyle
	     * @returns {String}
	     */


	    proto.getHideRevealTransitionEndProperty = function (styleProperty) {
	      var optionStyle = this.layout.options[styleProperty]; // use opacity

	      if (optionStyle.opacity) {
	        return 'opacity';
	      } // get first property


	      for (var prop in optionStyle) {
	        return prop;
	      }
	    };

	    proto.hide = function () {
	      // set flag
	      this.isHidden = true; // remove display: none

	      this.css({
	        display: ''
	      });
	      var options = this.layout.options;
	      var onTransitionEnd = {};
	      var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
	      onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
	      this.transition({
	        from: options.visibleStyle,
	        to: options.hiddenStyle,
	        // keep hidden stuff hidden
	        isCleaning: true,
	        onTransitionEnd: onTransitionEnd
	      });
	    };

	    proto.onHideTransitionEnd = function () {
	      // check if still hidden
	      // during transition, item may have been un-hidden
	      if (this.isHidden) {
	        this.css({
	          display: 'none'
	        });
	        this.emitEvent('hide');
	      }
	    };

	    proto.destroy = function () {
	      this.css({
	        position: '',
	        left: '',
	        right: '',
	        top: '',
	        bottom: '',
	        transition: '',
	        transform: ''
	      });
	    };

	    return Item;
	  });
	})(item);

	/*!
	 * Outlayer v2.1.1
	 * the brains and guts of a layout library
	 * MIT license
	 */

	(function (module) {
	  (function (window, factory) {

	    /* jshint strict: false */

	    /* globals define, module, require */

	    if (module.exports) {
	      // CommonJS - Browserify, Webpack
	      module.exports = factory(window, evEmitter.exports, getSize.exports, utils$4.exports, item.exports);
	    } else {
	      // browser global
	      window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
	    }
	  })(window, function factory(window, EvEmitter, getSize, utils, Item) {

	    var console = window.console;
	    var jQuery = window.jQuery;

	    var noop = function () {}; // -------------------------- Outlayer -------------------------- //
	    // globally unique identifiers


	    var GUID = 0; // internal store of all Outlayer intances

	    var instances = {};
	    /**
	     * @param {Element, String} element
	     * @param {Object} options
	     * @constructor
	     */

	    function Outlayer(element, options) {
	      var queryElement = utils.getQueryElement(element);

	      if (!queryElement) {
	        if (console) {
	          console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
	        }

	        return;
	      }

	      this.element = queryElement; // add jQuery

	      if (jQuery) {
	        this.$element = jQuery(this.element);
	      } // options


	      this.options = utils.extend({}, this.constructor.defaults);
	      this.option(options); // add id for Outlayer.getFromElement

	      var id = ++GUID;
	      this.element.outlayerGUID = id; // expando

	      instances[id] = this; // associate via id
	      // kick it off

	      this._create();

	      var isInitLayout = this._getOption('initLayout');

	      if (isInitLayout) {
	        this.layout();
	      }
	    } // settings are for internal use only


	    Outlayer.namespace = 'outlayer';
	    Outlayer.Item = Item; // default options

	    Outlayer.defaults = {
	      containerStyle: {
	        position: 'relative'
	      },
	      initLayout: true,
	      originLeft: true,
	      originTop: true,
	      resize: true,
	      resizeContainer: true,
	      // item options
	      transitionDuration: '0.4s',
	      hiddenStyle: {
	        opacity: 0,
	        transform: 'scale(0.001)'
	      },
	      visibleStyle: {
	        opacity: 1,
	        transform: 'scale(1)'
	      }
	    };
	    var proto = Outlayer.prototype; // inherit EvEmitter

	    utils.extend(proto, EvEmitter.prototype);
	    /**
	     * set options
	     * @param {Object} opts
	     */

	    proto.option = function (opts) {
	      utils.extend(this.options, opts);
	    };
	    /**
	     * get backwards compatible option value, check old name
	     */


	    proto._getOption = function (option) {
	      var oldOption = this.constructor.compatOptions[option];
	      return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
	    };

	    Outlayer.compatOptions = {
	      // currentName: oldName
	      initLayout: 'isInitLayout',
	      horizontal: 'isHorizontal',
	      layoutInstant: 'isLayoutInstant',
	      originLeft: 'isOriginLeft',
	      originTop: 'isOriginTop',
	      resize: 'isResizeBound',
	      resizeContainer: 'isResizingContainer'
	    };

	    proto._create = function () {
	      // get items from children
	      this.reloadItems(); // elements that affect layout, but are not laid out

	      this.stamps = [];
	      this.stamp(this.options.stamp); // set container style

	      utils.extend(this.element.style, this.options.containerStyle); // bind resize method

	      var canBindResize = this._getOption('resize');

	      if (canBindResize) {
	        this.bindResize();
	      }
	    }; // goes through all children again and gets bricks in proper order


	    proto.reloadItems = function () {
	      // collection of item elements
	      this.items = this._itemize(this.element.children);
	    };
	    /**
	     * turn elements into Outlayer.Items to be used in layout
	     * @param {Array or NodeList or HTMLElement} elems
	     * @returns {Array} items - collection of new Outlayer Items
	     */


	    proto._itemize = function (elems) {
	      var itemElems = this._filterFindItemElements(elems);

	      var Item = this.constructor.Item; // create new Outlayer Items for collection

	      var items = [];

	      for (var i = 0; i < itemElems.length; i++) {
	        var elem = itemElems[i];
	        var item = new Item(elem, this);
	        items.push(item);
	      }

	      return items;
	    };
	    /**
	     * get item elements to be used in layout
	     * @param {Array or NodeList or HTMLElement} elems
	     * @returns {Array} items - item elements
	     */


	    proto._filterFindItemElements = function (elems) {
	      return utils.filterFindElements(elems, this.options.itemSelector);
	    };
	    /**
	     * getter method for getting item elements
	     * @returns {Array} elems - collection of item elements
	     */


	    proto.getItemElements = function () {
	      return this.items.map(function (item) {
	        return item.element;
	      });
	    }; // ----- init & layout ----- //

	    /**
	     * lays out all items
	     */


	    proto.layout = function () {
	      this._resetLayout();

	      this._manageStamps(); // don't animate first layout


	      var layoutInstant = this._getOption('layoutInstant');

	      var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
	      this.layoutItems(this.items, isInstant); // flag for initalized

	      this._isLayoutInited = true;
	    }; // _init is alias for layout


	    proto._init = proto.layout;
	    /**
	     * logic before any new layout
	     */

	    proto._resetLayout = function () {
	      this.getSize();
	    };

	    proto.getSize = function () {
	      this.size = getSize(this.element);
	    };
	    /**
	     * get measurement from option, for columnWidth, rowHeight, gutter
	     * if option is String -> get element from selector string, & get size of element
	     * if option is Element -> get size of element
	     * else use option as a number
	     *
	     * @param {String} measurement
	     * @param {String} size - width or height
	     * @private
	     */


	    proto._getMeasurement = function (measurement, size) {
	      var option = this.options[measurement];
	      var elem;

	      if (!option) {
	        // default to 0
	        this[measurement] = 0;
	      } else {
	        // use option as an element
	        if (typeof option == 'string') {
	          elem = this.element.querySelector(option);
	        } else if (option instanceof HTMLElement) {
	          elem = option;
	        } // use size of element, if element


	        this[measurement] = elem ? getSize(elem)[size] : option;
	      }
	    };
	    /**
	     * layout a collection of item elements
	     * @api public
	     */


	    proto.layoutItems = function (items, isInstant) {
	      items = this._getItemsForLayout(items);

	      this._layoutItems(items, isInstant);

	      this._postLayout();
	    };
	    /**
	     * get the items to be laid out
	     * you may want to skip over some items
	     * @param {Array} items
	     * @returns {Array} items
	     */


	    proto._getItemsForLayout = function (items) {
	      return items.filter(function (item) {
	        return !item.isIgnored;
	      });
	    };
	    /**
	     * layout items
	     * @param {Array} items
	     * @param {Boolean} isInstant
	     */


	    proto._layoutItems = function (items, isInstant) {
	      this._emitCompleteOnItems('layout', items);

	      if (!items || !items.length) {
	        // no items, emit event with empty array
	        return;
	      }

	      var queue = [];
	      items.forEach(function (item) {
	        // get x/y object from method
	        var position = this._getItemLayoutPosition(item); // enqueue


	        position.item = item;
	        position.isInstant = isInstant || item.isLayoutInstant;
	        queue.push(position);
	      }, this);

	      this._processLayoutQueue(queue);
	    };
	    /**
	     * get item layout position
	     * @param {Outlayer.Item} item
	     * @returns {Object} x and y position
	     */


	    proto._getItemLayoutPosition = function
	      /* item */
	    () {
	      return {
	        x: 0,
	        y: 0
	      };
	    };
	    /**
	     * iterate over array and position each item
	     * Reason being - separating this logic prevents 'layout invalidation'
	     * thx @paul_irish
	     * @param {Array} queue
	     */


	    proto._processLayoutQueue = function (queue) {
	      this.updateStagger();
	      queue.forEach(function (obj, i) {
	        this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
	      }, this);
	    }; // set stagger from option in milliseconds number


	    proto.updateStagger = function () {
	      var stagger = this.options.stagger;

	      if (stagger === null || stagger === undefined) {
	        this.stagger = 0;
	        return;
	      }

	      this.stagger = getMilliseconds(stagger);
	      return this.stagger;
	    };
	    /**
	     * Sets position of item in DOM
	     * @param {Outlayer.Item} item
	     * @param {Number} x - horizontal position
	     * @param {Number} y - vertical position
	     * @param {Boolean} isInstant - disables transitions
	     */


	    proto._positionItem = function (item, x, y, isInstant, i) {
	      if (isInstant) {
	        // if not transition, just set CSS
	        item.goTo(x, y);
	      } else {
	        item.stagger(i * this.stagger);
	        item.moveTo(x, y);
	      }
	    };
	    /**
	     * Any logic you want to do after each layout,
	     * i.e. size the container
	     */


	    proto._postLayout = function () {
	      this.resizeContainer();
	    };

	    proto.resizeContainer = function () {
	      var isResizingContainer = this._getOption('resizeContainer');

	      if (!isResizingContainer) {
	        return;
	      }

	      var size = this._getContainerSize();

	      if (size) {
	        this._setContainerMeasure(size.width, true);

	        this._setContainerMeasure(size.height, false);
	      }
	    };
	    /**
	     * Sets width or height of container if returned
	     * @returns {Object} size
	     *   @param {Number} width
	     *   @param {Number} height
	     */


	    proto._getContainerSize = noop;
	    /**
	     * @param {Number} measure - size of width or height
	     * @param {Boolean} isWidth
	     */

	    proto._setContainerMeasure = function (measure, isWidth) {
	      if (measure === undefined) {
	        return;
	      }

	      var elemSize = this.size; // add padding and border width if border box

	      if (elemSize.isBorderBox) {
	        measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
	      }

	      measure = Math.max(measure, 0);
	      this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
	    };
	    /**
	     * emit eventComplete on a collection of items events
	     * @param {String} eventName
	     * @param {Array} items - Outlayer.Items
	     */


	    proto._emitCompleteOnItems = function (eventName, items) {
	      var _this = this;

	      function onComplete() {
	        _this.dispatchEvent(eventName + 'Complete', null, [items]);
	      }

	      var count = items.length;

	      if (!items || !count) {
	        onComplete();
	        return;
	      }

	      var doneCount = 0;

	      function tick() {
	        doneCount++;

	        if (doneCount == count) {
	          onComplete();
	        }
	      } // bind callback


	      items.forEach(function (item) {
	        item.once(eventName, tick);
	      });
	    };
	    /**
	     * emits events via EvEmitter and jQuery events
	     * @param {String} type - name of event
	     * @param {Event} event - original event
	     * @param {Array} args - extra arguments
	     */


	    proto.dispatchEvent = function (type, event, args) {
	      // add original event to arguments
	      var emitArgs = event ? [event].concat(args) : args;
	      this.emitEvent(type, emitArgs);

	      if (jQuery) {
	        // set this.$element
	        this.$element = this.$element || jQuery(this.element);

	        if (event) {
	          // create jQuery event
	          var $event = jQuery.Event(event);
	          $event.type = type;
	          this.$element.trigger($event, args);
	        } else {
	          // just trigger with type if no event available
	          this.$element.trigger(type, args);
	        }
	      }
	    }; // -------------------------- ignore & stamps -------------------------- //

	    /**
	     * keep item in collection, but do not lay it out
	     * ignored items do not get skipped in layout
	     * @param {Element} elem
	     */


	    proto.ignore = function (elem) {
	      var item = this.getItem(elem);

	      if (item) {
	        item.isIgnored = true;
	      }
	    };
	    /**
	     * return item to layout collection
	     * @param {Element} elem
	     */


	    proto.unignore = function (elem) {
	      var item = this.getItem(elem);

	      if (item) {
	        delete item.isIgnored;
	      }
	    };
	    /**
	     * adds elements to stamps
	     * @param {NodeList, Array, Element, or String} elems
	     */


	    proto.stamp = function (elems) {
	      elems = this._find(elems);

	      if (!elems) {
	        return;
	      }

	      this.stamps = this.stamps.concat(elems); // ignore

	      elems.forEach(this.ignore, this);
	    };
	    /**
	     * removes elements to stamps
	     * @param {NodeList, Array, or Element} elems
	     */


	    proto.unstamp = function (elems) {
	      elems = this._find(elems);

	      if (!elems) {
	        return;
	      }

	      elems.forEach(function (elem) {
	        // filter out removed stamp elements
	        utils.removeFrom(this.stamps, elem);
	        this.unignore(elem);
	      }, this);
	    };
	    /**
	     * finds child elements
	     * @param {NodeList, Array, Element, or String} elems
	     * @returns {Array} elems
	     */


	    proto._find = function (elems) {
	      if (!elems) {
	        return;
	      } // if string, use argument as selector string


	      if (typeof elems == 'string') {
	        elems = this.element.querySelectorAll(elems);
	      }

	      elems = utils.makeArray(elems);
	      return elems;
	    };

	    proto._manageStamps = function () {
	      if (!this.stamps || !this.stamps.length) {
	        return;
	      }

	      this._getBoundingRect();

	      this.stamps.forEach(this._manageStamp, this);
	    }; // update boundingLeft / Top


	    proto._getBoundingRect = function () {
	      // get bounding rect for container element
	      var boundingRect = this.element.getBoundingClientRect();
	      var size = this.size;
	      this._boundingRect = {
	        left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
	        top: boundingRect.top + size.paddingTop + size.borderTopWidth,
	        right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
	        bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
	      };
	    };
	    /**
	     * @param {Element} stamp
	    **/


	    proto._manageStamp = noop;
	    /**
	     * get x/y position of element relative to container element
	     * @param {Element} elem
	     * @returns {Object} offset - has left, top, right, bottom
	     */

	    proto._getElementOffset = function (elem) {
	      var boundingRect = elem.getBoundingClientRect();
	      var thisRect = this._boundingRect;
	      var size = getSize(elem);
	      var offset = {
	        left: boundingRect.left - thisRect.left - size.marginLeft,
	        top: boundingRect.top - thisRect.top - size.marginTop,
	        right: thisRect.right - boundingRect.right - size.marginRight,
	        bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
	      };
	      return offset;
	    }; // -------------------------- resize -------------------------- //
	    // enable event handlers for listeners
	    // i.e. resize -> onresize


	    proto.handleEvent = utils.handleEvent;
	    /**
	     * Bind layout to window resizing
	     */

	    proto.bindResize = function () {
	      window.addEventListener('resize', this);
	      this.isResizeBound = true;
	    };
	    /**
	     * Unbind layout to window resizing
	     */


	    proto.unbindResize = function () {
	      window.removeEventListener('resize', this);
	      this.isResizeBound = false;
	    };

	    proto.onresize = function () {
	      this.resize();
	    };

	    utils.debounceMethod(Outlayer, 'onresize', 100);

	    proto.resize = function () {
	      // don't trigger if size did not change
	      // or if resize was unbound. See #9
	      if (!this.isResizeBound || !this.needsResizeLayout()) {
	        return;
	      }

	      this.layout();
	    };
	    /**
	     * check if layout is needed post layout
	     * @returns Boolean
	     */


	    proto.needsResizeLayout = function () {
	      var size = getSize(this.element); // check that this.size and size are there
	      // IE8 triggers resize on body size change, so they might not be

	      var hasSizes = this.size && size;
	      return hasSizes && size.innerWidth !== this.size.innerWidth;
	    }; // -------------------------- methods -------------------------- //

	    /**
	     * add items to Outlayer instance
	     * @param {Array or NodeList or Element} elems
	     * @returns {Array} items - Outlayer.Items
	    **/


	    proto.addItems = function (elems) {
	      var items = this._itemize(elems); // add items to collection


	      if (items.length) {
	        this.items = this.items.concat(items);
	      }

	      return items;
	    };
	    /**
	     * Layout newly-appended item elements
	     * @param {Array or NodeList or Element} elems
	     */


	    proto.appended = function (elems) {
	      var items = this.addItems(elems);

	      if (!items.length) {
	        return;
	      } // layout and reveal just the new items


	      this.layoutItems(items, true);
	      this.reveal(items);
	    };
	    /**
	     * Layout prepended elements
	     * @param {Array or NodeList or Element} elems
	     */


	    proto.prepended = function (elems) {
	      var items = this._itemize(elems);

	      if (!items.length) {
	        return;
	      } // add items to beginning of collection


	      var previousItems = this.items.slice(0);
	      this.items = items.concat(previousItems); // start new layout

	      this._resetLayout();

	      this._manageStamps(); // layout new stuff without transition


	      this.layoutItems(items, true);
	      this.reveal(items); // layout previous items

	      this.layoutItems(previousItems);
	    };
	    /**
	     * reveal a collection of items
	     * @param {Array of Outlayer.Items} items
	     */


	    proto.reveal = function (items) {
	      this._emitCompleteOnItems('reveal', items);

	      if (!items || !items.length) {
	        return;
	      }

	      var stagger = this.updateStagger();
	      items.forEach(function (item, i) {
	        item.stagger(i * stagger);
	        item.reveal();
	      });
	    };
	    /**
	     * hide a collection of items
	     * @param {Array of Outlayer.Items} items
	     */


	    proto.hide = function (items) {
	      this._emitCompleteOnItems('hide', items);

	      if (!items || !items.length) {
	        return;
	      }

	      var stagger = this.updateStagger();
	      items.forEach(function (item, i) {
	        item.stagger(i * stagger);
	        item.hide();
	      });
	    };
	    /**
	     * reveal item elements
	     * @param {Array}, {Element}, {NodeList} items
	     */


	    proto.revealItemElements = function (elems) {
	      var items = this.getItems(elems);
	      this.reveal(items);
	    };
	    /**
	     * hide item elements
	     * @param {Array}, {Element}, {NodeList} items
	     */


	    proto.hideItemElements = function (elems) {
	      var items = this.getItems(elems);
	      this.hide(items);
	    };
	    /**
	     * get Outlayer.Item, given an Element
	     * @param {Element} elem
	     * @param {Function} callback
	     * @returns {Outlayer.Item} item
	     */


	    proto.getItem = function (elem) {
	      // loop through items to get the one that matches
	      for (var i = 0; i < this.items.length; i++) {
	        var item = this.items[i];

	        if (item.element == elem) {
	          // return item
	          return item;
	        }
	      }
	    };
	    /**
	     * get collection of Outlayer.Items, given Elements
	     * @param {Array} elems
	     * @returns {Array} items - Outlayer.Items
	     */


	    proto.getItems = function (elems) {
	      elems = utils.makeArray(elems);
	      var items = [];
	      elems.forEach(function (elem) {
	        var item = this.getItem(elem);

	        if (item) {
	          items.push(item);
	        }
	      }, this);
	      return items;
	    };
	    /**
	     * remove element(s) from instance and DOM
	     * @param {Array or NodeList or Element} elems
	     */


	    proto.remove = function (elems) {
	      var removeItems = this.getItems(elems);

	      this._emitCompleteOnItems('remove', removeItems); // bail if no items to remove


	      if (!removeItems || !removeItems.length) {
	        return;
	      }

	      removeItems.forEach(function (item) {
	        item.remove(); // remove item from collection

	        utils.removeFrom(this.items, item);
	      }, this);
	    }; // ----- destroy ----- //
	    // remove and disable Outlayer instance


	    proto.destroy = function () {
	      // clean up dynamic styles
	      var style = this.element.style;
	      style.height = '';
	      style.position = '';
	      style.width = ''; // destroy items

	      this.items.forEach(function (item) {
	        item.destroy();
	      });
	      this.unbindResize();
	      var id = this.element.outlayerGUID;
	      delete instances[id]; // remove reference to instance by id

	      delete this.element.outlayerGUID; // remove data for jQuery

	      if (jQuery) {
	        jQuery.removeData(this.element, this.constructor.namespace);
	      }
	    }; // -------------------------- data -------------------------- //

	    /**
	     * get Outlayer instance from element
	     * @param {Element} elem
	     * @returns {Outlayer}
	     */


	    Outlayer.data = function (elem) {
	      elem = utils.getQueryElement(elem);
	      var id = elem && elem.outlayerGUID;
	      return id && instances[id];
	    }; // -------------------------- create Outlayer class -------------------------- //

	    /**
	     * create a layout class
	     * @param {String} namespace
	     */


	    Outlayer.create = function (namespace, options) {
	      // sub-class Outlayer
	      var Layout = subclass(Outlayer); // apply new options and compatOptions

	      Layout.defaults = utils.extend({}, Outlayer.defaults);
	      utils.extend(Layout.defaults, options);
	      Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
	      Layout.namespace = namespace;
	      Layout.data = Outlayer.data; // sub-class Item

	      Layout.Item = subclass(Item); // -------------------------- declarative -------------------------- //

	      utils.htmlInit(Layout, namespace); // -------------------------- jQuery bridge -------------------------- //
	      // make into jQuery plugin

	      if (jQuery && jQuery.bridget) {
	        jQuery.bridget(namespace, Layout);
	      }

	      return Layout;
	    };

	    function subclass(Parent) {
	      function SubClass() {
	        Parent.apply(this, arguments);
	      }

	      SubClass.prototype = Object.create(Parent.prototype);
	      SubClass.prototype.constructor = SubClass;
	      return SubClass;
	    } // ----- helpers ----- //
	    // how many milliseconds are in each unit


	    var msUnits = {
	      ms: 1,
	      s: 1000
	    }; // munge time-like parameter into millisecond number
	    // '0.4s' -> 40

	    function getMilliseconds(time) {
	      if (typeof time == 'number') {
	        return time;
	      }

	      var matches = time.match(/(^\d*\.?\d*)(\w*)/);
	      var num = matches && matches[1];
	      var unit = matches && matches[2];

	      if (!num.length) {
	        return 0;
	      }

	      num = parseFloat(num);
	      var mult = msUnits[unit] || 1;
	      return num * mult;
	    } // ----- fin ----- //
	    // back in global


	    Outlayer.Item = Item;
	    return Outlayer;
	  });
	})(outlayer);

	/*!
	 * Masonry v4.2.2
	 * Cascading grid layout library
	 * https://masonry.desandro.com
	 * MIT License
	 * by David DeSandro
	 */

	(function (module) {
	  (function (window, factory) {
	    // universal module definition

	    /* jshint strict: false */

	    /*globals define, module, require */
	    if (module.exports) {
	      // CommonJS
	      module.exports = factory(outlayer.exports, getSize.exports);
	    } else {
	      // browser global
	      window.Masonry = factory(window.Outlayer, window.getSize);
	    }
	  })(window, function factory(Outlayer, getSize) {
	    // create an Outlayer layout class

	    var Masonry = Outlayer.create('masonry'); // isFitWidth -> fitWidth

	    Masonry.compatOptions.fitWidth = 'isFitWidth';
	    var proto = Masonry.prototype;

	    proto._resetLayout = function () {
	      this.getSize();

	      this._getMeasurement('columnWidth', 'outerWidth');

	      this._getMeasurement('gutter', 'outerWidth');

	      this.measureColumns(); // reset column Y

	      this.colYs = [];

	      for (var i = 0; i < this.cols; i++) {
	        this.colYs.push(0);
	      }

	      this.maxY = 0;
	      this.horizontalColIndex = 0;
	    };

	    proto.measureColumns = function () {
	      this.getContainerWidth(); // if columnWidth is 0, default to outerWidth of first item

	      if (!this.columnWidth) {
	        var firstItem = this.items[0];
	        var firstItemElem = firstItem && firstItem.element; // columnWidth fall back to item of first element

	        this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
	        this.containerWidth;
	      }

	      var columnWidth = this.columnWidth += this.gutter; // calculate columns

	      var containerWidth = this.containerWidth + this.gutter;
	      var cols = containerWidth / columnWidth; // fix rounding errors, typically with gutters

	      var excess = columnWidth - containerWidth % columnWidth; // if overshoot is less than a pixel, round up, otherwise floor it

	      var mathMethod = excess && excess < 1 ? 'round' : 'floor';
	      cols = Math[mathMethod](cols);
	      this.cols = Math.max(cols, 1);
	    };

	    proto.getContainerWidth = function () {
	      // container is parent if fit width
	      var isFitWidth = this._getOption('fitWidth');

	      var container = isFitWidth ? this.element.parentNode : this.element; // check that this.size and size are there
	      // IE8 triggers resize on body size change, so they might not be

	      var size = getSize(container);
	      this.containerWidth = size && size.innerWidth;
	    };

	    proto._getItemLayoutPosition = function (item) {
	      item.getSize(); // how many columns does this brick span

	      var remainder = item.size.outerWidth % this.columnWidth;
	      var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil'; // round if off by 1 pixel, otherwise use ceil

	      var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
	      colSpan = Math.min(colSpan, this.cols); // use horizontal or top column position

	      var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition';
	      var colPosition = this[colPosMethod](colSpan, item); // position the brick

	      var position = {
	        x: this.columnWidth * colPosition.col,
	        y: colPosition.y
	      }; // apply setHeight to necessary columns

	      var setHeight = colPosition.y + item.size.outerHeight;
	      var setMax = colSpan + colPosition.col;

	      for (var i = colPosition.col; i < setMax; i++) {
	        this.colYs[i] = setHeight;
	      }

	      return position;
	    };

	    proto._getTopColPosition = function (colSpan) {
	      var colGroup = this._getTopColGroup(colSpan); // get the minimum Y value from the columns


	      var minimumY = Math.min.apply(Math, colGroup);
	      return {
	        col: colGroup.indexOf(minimumY),
	        y: minimumY
	      };
	    };
	    /**
	     * @param {Number} colSpan - number of columns the element spans
	     * @returns {Array} colGroup
	     */


	    proto._getTopColGroup = function (colSpan) {
	      if (colSpan < 2) {
	        // if brick spans only one column, use all the column Ys
	        return this.colYs;
	      }

	      var colGroup = []; // how many different places could this brick fit horizontally

	      var groupCount = this.cols + 1 - colSpan; // for each group potential horizontal position

	      for (var i = 0; i < groupCount; i++) {
	        colGroup[i] = this._getColGroupY(i, colSpan);
	      }

	      return colGroup;
	    };

	    proto._getColGroupY = function (col, colSpan) {
	      if (colSpan < 2) {
	        return this.colYs[col];
	      } // make an array of colY values for that one group


	      var groupColYs = this.colYs.slice(col, col + colSpan); // and get the max value of the array

	      return Math.max.apply(Math, groupColYs);
	    }; // get column position based on horizontal index. #873


	    proto._getHorizontalColPosition = function (colSpan, item) {
	      var col = this.horizontalColIndex % this.cols;
	      var isOver = colSpan > 1 && col + colSpan > this.cols; // shift to next row if item can't fit on current row

	      col = isOver ? 0 : col; // don't let zero-size items take up space

	      var hasSize = item.size.outerWidth && item.size.outerHeight;
	      this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
	      return {
	        col: col,
	        y: this._getColGroupY(col, colSpan)
	      };
	    };

	    proto._manageStamp = function (stamp) {
	      var stampSize = getSize(stamp);

	      var offset = this._getElementOffset(stamp); // get the columns that this stamp affects


	      var isOriginLeft = this._getOption('originLeft');

	      var firstX = isOriginLeft ? offset.left : offset.right;
	      var lastX = firstX + stampSize.outerWidth;
	      var firstCol = Math.floor(firstX / this.columnWidth);
	      firstCol = Math.max(0, firstCol);
	      var lastCol = Math.floor(lastX / this.columnWidth); // lastCol should not go over if multiple of columnWidth #425

	      lastCol -= lastX % this.columnWidth ? 0 : 1;
	      lastCol = Math.min(this.cols - 1, lastCol); // set colYs to bottom of the stamp

	      var isOriginTop = this._getOption('originTop');

	      var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;

	      for (var i = firstCol; i <= lastCol; i++) {
	        this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
	      }
	    };

	    proto._getContainerSize = function () {
	      this.maxY = Math.max.apply(Math, this.colYs);
	      var size = {
	        height: this.maxY
	      };

	      if (this._getOption('fitWidth')) {
	        size.width = this._getContainerFitWidth();
	      }

	      return size;
	    };

	    proto._getContainerFitWidth = function () {
	      var unusedCols = 0; // count unused columns

	      var i = this.cols;

	      while (--i) {
	        if (this.colYs[i] !== 0) {
	          break;
	        }

	        unusedCols++;
	      } // fit container to columns that have been used


	      return (this.cols - unusedCols) * this.columnWidth - this.gutter;
	    };

	    proto.needsResizeLayout = function () {
	      var previousWidth = this.containerWidth;
	      this.getContainerWidth();
	      return previousWidth != this.containerWidth;
	    };

	    return Masonry;
	  });
	})(masonry);

	var imagesloaded$1 = {exports: {}};

	/*!
	 * imagesLoaded v4.1.4
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */

	(function (module) {
	  (function (window, factory) {

	    /*global define: false, module: false, require: false */

	    if (module.exports) {
	      // CommonJS
	      module.exports = factory(window, evEmitter.exports);
	    } else {
	      // browser global
	      window.imagesLoaded = factory(window, window.EvEmitter);
	    }
	  })(typeof window !== 'undefined' ? window : commonjsGlobal, // --------------------------  factory -------------------------- //
	  function factory(window, EvEmitter) {

	    var $ = window.jQuery;
	    var console = window.console; // -------------------------- helpers -------------------------- //
	    // extend objects

	    function extend(a, b) {
	      for (var prop in b) {
	        a[prop] = b[prop];
	      }

	      return a;
	    }

	    var arraySlice = Array.prototype.slice; // turn element or nodeList into an array

	    function makeArray(obj) {
	      if (Array.isArray(obj)) {
	        // use object if already an array
	        return obj;
	      }

	      var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';

	      if (isArrayLike) {
	        // convert nodeList to array
	        return arraySlice.call(obj);
	      } // array of single index


	      return [obj];
	    } // -------------------------- imagesLoaded -------------------------- //

	    /**
	     * @param {Array, Element, NodeList, String} elem
	     * @param {Object or Function} options - if function, use as callback
	     * @param {Function} onAlways - callback function
	     */


	    function ImagesLoaded(elem, options, onAlways) {
	      // coerce ImagesLoaded() without new, to be new ImagesLoaded()
	      if (!(this instanceof ImagesLoaded)) {
	        return new ImagesLoaded(elem, options, onAlways);
	      } // use elem as selector string


	      var queryElem = elem;

	      if (typeof elem == 'string') {
	        queryElem = document.querySelectorAll(elem);
	      } // bail if bad element


	      if (!queryElem) {
	        console.error('Bad element for imagesLoaded ' + (queryElem || elem));
	        return;
	      }

	      this.elements = makeArray(queryElem);
	      this.options = extend({}, this.options); // shift arguments if no options set

	      if (typeof options == 'function') {
	        onAlways = options;
	      } else {
	        extend(this.options, options);
	      }

	      if (onAlways) {
	        this.on('always', onAlways);
	      }

	      this.getImages();

	      if ($) {
	        // add jQuery Deferred object
	        this.jqDeferred = new $.Deferred();
	      } // HACK check async to allow time to bind listeners


	      setTimeout(this.check.bind(this));
	    }

	    ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
	    ImagesLoaded.prototype.options = {};

	    ImagesLoaded.prototype.getImages = function () {
	      this.images = []; // filter & find items if we have an item selector

	      this.elements.forEach(this.addElementImages, this);
	    };
	    /**
	     * @param {Node} element
	     */


	    ImagesLoaded.prototype.addElementImages = function (elem) {
	      // filter siblings
	      if (elem.nodeName == 'IMG') {
	        this.addImage(elem);
	      } // get background image on element


	      if (this.options.background === true) {
	        this.addElementBackgroundImages(elem);
	      } // find children
	      // no non-element nodes, #143


	      var nodeType = elem.nodeType;

	      if (!nodeType || !elementNodeTypes[nodeType]) {
	        return;
	      }

	      var childImgs = elem.querySelectorAll('img'); // concat childElems to filterFound array

	      for (var i = 0; i < childImgs.length; i++) {
	        var img = childImgs[i];
	        this.addImage(img);
	      } // get child background images


	      if (typeof this.options.background == 'string') {
	        var children = elem.querySelectorAll(this.options.background);

	        for (i = 0; i < children.length; i++) {
	          var child = children[i];
	          this.addElementBackgroundImages(child);
	        }
	      }
	    };

	    var elementNodeTypes = {
	      1: true,
	      9: true,
	      11: true
	    };

	    ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
	      var style = getComputedStyle(elem);

	      if (!style) {
	        // Firefox returns null if in a hidden iframe https://bugzil.la/548397
	        return;
	      } // get url inside url("...")


	      var reURL = /url\((['"])?(.*?)\1\)/gi;
	      var matches = reURL.exec(style.backgroundImage);

	      while (matches !== null) {
	        var url = matches && matches[2];

	        if (url) {
	          this.addBackground(url, elem);
	        }

	        matches = reURL.exec(style.backgroundImage);
	      }
	    };
	    /**
	     * @param {Image} img
	     */


	    ImagesLoaded.prototype.addImage = function (img) {
	      var loadingImage = new LoadingImage(img);
	      this.images.push(loadingImage);
	    };

	    ImagesLoaded.prototype.addBackground = function (url, elem) {
	      var background = new Background(url, elem);
	      this.images.push(background);
	    };

	    ImagesLoaded.prototype.check = function () {
	      var _this = this;

	      this.progressedCount = 0;
	      this.hasAnyBroken = false; // complete if no images

	      if (!this.images.length) {
	        this.complete();
	        return;
	      }

	      function onProgress(image, elem, message) {
	        // HACK - Chrome triggers event before object properties have changed. #83
	        setTimeout(function () {
	          _this.progress(image, elem, message);
	        });
	      }

	      this.images.forEach(function (loadingImage) {
	        loadingImage.once('progress', onProgress);
	        loadingImage.check();
	      });
	    };

	    ImagesLoaded.prototype.progress = function (image, elem, message) {
	      this.progressedCount++;
	      this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded; // progress event

	      this.emitEvent('progress', [this, image, elem]);

	      if (this.jqDeferred && this.jqDeferred.notify) {
	        this.jqDeferred.notify(this, image);
	      } // check if completed


	      if (this.progressedCount == this.images.length) {
	        this.complete();
	      }

	      if (this.options.debug && console) {
	        console.log('progress: ' + message, image, elem);
	      }
	    };

	    ImagesLoaded.prototype.complete = function () {
	      var eventName = this.hasAnyBroken ? 'fail' : 'done';
	      this.isComplete = true;
	      this.emitEvent(eventName, [this]);
	      this.emitEvent('always', [this]);

	      if (this.jqDeferred) {
	        var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
	        this.jqDeferred[jqMethod](this);
	      }
	    }; // --------------------------  -------------------------- //


	    function LoadingImage(img) {
	      this.img = img;
	    }

	    LoadingImage.prototype = Object.create(EvEmitter.prototype);

	    LoadingImage.prototype.check = function () {
	      // If complete is true and browser supports natural sizes,
	      // try to check for image status manually.
	      var isComplete = this.getIsImageComplete();

	      if (isComplete) {
	        // report based on naturalWidth
	        this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	        return;
	      } // If none of the checks above matched, simulate loading on detached element.


	      this.proxyImage = new Image();
	      this.proxyImage.addEventListener('load', this);
	      this.proxyImage.addEventListener('error', this); // bind to image as well for Firefox. #191

	      this.img.addEventListener('load', this);
	      this.img.addEventListener('error', this);
	      this.proxyImage.src = this.img.src;
	    };

	    LoadingImage.prototype.getIsImageComplete = function () {
	      // check for non-zero, non-undefined naturalWidth
	      // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
	      return this.img.complete && this.img.naturalWidth;
	    };

	    LoadingImage.prototype.confirm = function (isLoaded, message) {
	      this.isLoaded = isLoaded;
	      this.emitEvent('progress', [this, this.img, message]);
	    }; // ----- events ----- //
	    // trigger specified handler for event type


	    LoadingImage.prototype.handleEvent = function (event) {
	      var method = 'on' + event.type;

	      if (this[method]) {
	        this[method](event);
	      }
	    };

	    LoadingImage.prototype.onload = function () {
	      this.confirm(true, 'onload');
	      this.unbindEvents();
	    };

	    LoadingImage.prototype.onerror = function () {
	      this.confirm(false, 'onerror');
	      this.unbindEvents();
	    };

	    LoadingImage.prototype.unbindEvents = function () {
	      this.proxyImage.removeEventListener('load', this);
	      this.proxyImage.removeEventListener('error', this);
	      this.img.removeEventListener('load', this);
	      this.img.removeEventListener('error', this);
	    }; // -------------------------- Background -------------------------- //


	    function Background(url, element) {
	      this.url = url;
	      this.element = element;
	      this.img = new Image();
	    } // inherit LoadingImage prototype


	    Background.prototype = Object.create(LoadingImage.prototype);

	    Background.prototype.check = function () {
	      this.img.addEventListener('load', this);
	      this.img.addEventListener('error', this);
	      this.img.src = this.url; // check if image is already complete

	      var isComplete = this.getIsImageComplete();

	      if (isComplete) {
	        this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
	        this.unbindEvents();
	      }
	    };

	    Background.prototype.unbindEvents = function () {
	      this.img.removeEventListener('load', this);
	      this.img.removeEventListener('error', this);
	    };

	    Background.prototype.confirm = function (isLoaded, message) {
	      this.isLoaded = isLoaded;
	      this.emitEvent('progress', [this, this.element, message]);
	    }; // -------------------------- jQuery -------------------------- //


	    ImagesLoaded.makeJQueryPlugin = function (jQuery) {
	      jQuery = jQuery || window.jQuery;

	      if (!jQuery) {
	        return;
	      } // set local variable


	      $ = jQuery; // $().imagesLoaded()

	      $.fn.imagesLoaded = function (options, callback) {
	        var instance = new ImagesLoaded(this, options, callback);
	        return instance.jqDeferred.promise($(this));
	      };
	    }; // try making plugin


	    ImagesLoaded.makeJQueryPlugin(); // --------------------------  -------------------------- //

	    return ImagesLoaded;
	  });
	})(imagesloaded$1);

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root$9 = freeGlobal || freeSelf || Function('return this')();
	var _root = root$9;

	var root$8 = _root;
	/** Built-in value references. */

	var Symbol$6 = root$8.Symbol;
	var _Symbol = Symbol$6;

	var Symbol$5 = _Symbol;
	/** Used for built-in method references. */

	var objectProto$e = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$b = objectProto$e.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString$1 = objectProto$e.toString;
	/** Built-in value references. */

	var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : undefined;
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */

	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);

	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }

	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */
	var objectProto$d = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var nativeObjectToString = objectProto$d.toString;
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */

	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol$4 = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;
	/** `Object#toString` result references. */

	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	/** Built-in value references. */

	var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : undefined;
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	function baseGetTag$6(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }

	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	var _baseGetTag = baseGetTag$6;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	function isObject$8(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject$8;

	var baseGetTag$5 = _baseGetTag,
	    isObject$7 = isObject_1;
	/** `Object#toString` result references. */

	var asyncTag = '[object AsyncFunction]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */

	function isFunction$2(value) {
	  if (!isObject$7(value)) {
	    return false;
	  } // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.


	  var tag = baseGetTag$5(value);
	  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction$2;

	var root$7 = _root;
	/** Used to detect overreaching core-js shims. */

	var coreJsData$1 = root$7['__core-js_shared__'];
	var _coreJsData = coreJsData$1;

	var coreJsData = _coreJsData;
	/** Used to detect methods masquerading as native. */

	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */


	function isMasked$1(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	var _isMasked = isMasked$1;

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString$2 = funcProto$2.toString;
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */

	function toSource$2(func) {
	  if (func != null) {
	    try {
	      return funcToString$2.call(func);
	    } catch (e) {}

	    try {
	      return func + '';
	    } catch (e) {}
	  }

	  return '';
	}

	var _toSource = toSource$2;

	var isFunction$1 = isFunction_1,
	    isMasked = _isMasked,
	    isObject$6 = isObject_1,
	    toSource$1 = _toSource;
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */

	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to detect host constructors (Safari). */

	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Used for built-in method references. */

	var funcProto$1 = Function.prototype,
	    objectProto$c = Object.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString$1 = funcProto$1.toString;
	/** Used to check objects for own properties. */

	var hasOwnProperty$a = objectProto$c.hasOwnProperty;
	/** Used to detect if a method is native. */

	var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */

	function baseIsNative$1(value) {
	  if (!isObject$6(value) || isMasked(value)) {
	    return false;
	  }

	  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource$1(value));
	}

	var _baseIsNative = baseIsNative$1;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */

	function getValue$1(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue$1;

	var baseIsNative = _baseIsNative,
	    getValue = _getValue;
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */

	function getNative$7(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative$7;

	var getNative$6 = _getNative;

	var defineProperty$2 = function () {
	  try {
	    var func = getNative$6(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}();

	var _defineProperty = defineProperty$2;

	var defineProperty$1 = _defineProperty;
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */

	function baseAssignValue$2(object, key, value) {
	  if (key == '__proto__' && defineProperty$1) {
	    defineProperty$1(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue$2;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */

	function eq$3(value, other) {
	  return value === other || value !== value && other !== other;
	}

	var eq_1 = eq$3;

	var baseAssignValue$1 = _baseAssignValue,
	    eq$2 = eq_1;
	/** Used for built-in method references. */

	var objectProto$b = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */

	function assignValue$3(object, key, value) {
	  var objValue = object[key];

	  if (!(hasOwnProperty$9.call(object, key) && eq$2(objValue, value)) || value === undefined && !(key in object)) {
	    baseAssignValue$1(object, key, value);
	  }
	}

	var _assignValue = assignValue$3;

	var assignValue$2 = _assignValue,
	    baseAssignValue = _baseAssignValue;
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */

	function copyObject$6(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }

	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue$2(object, key, newValue);
	    }
	  }

	  return object;
	}

	var _copyObject = copyObject$6;

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */

	function identity$2(value) {
	  return value;
	}

	var identity_1 = identity$2;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */

	function apply$1(func, thisArg, args) {
	  switch (args.length) {
	    case 0:
	      return func.call(thisArg);

	    case 1:
	      return func.call(thisArg, args[0]);

	    case 2:
	      return func.call(thisArg, args[0], args[1]);

	    case 3:
	      return func.call(thisArg, args[0], args[1], args[2]);
	  }

	  return func.apply(thisArg, args);
	}

	var _apply = apply$1;

	var apply = _apply;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax$1 = Math.max;
	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */

	function overRest$2(func, start, transform) {
	  start = nativeMax$1(start === undefined ? func.length - 1 : start, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax$1(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }

	    index = -1;
	    var otherArgs = Array(start + 1);

	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }

	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	var _overRest = overRest$2;

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */

	function constant$1(value) {
	  return function () {
	    return value;
	  };
	}

	var constant_1 = constant$1;

	var constant = constant_1,
	    defineProperty = _defineProperty,
	    identity$1 = identity_1;
	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */

	var baseSetToString$1 = !defineProperty ? identity$1 : function (func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	var _baseSetToString = baseSetToString$1;

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeNow = Date.now;
	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */

	function shortOut$1(func) {
	  var count = 0,
	      lastCalled = 0;
	  return function () {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	    lastCalled = stamp;

	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }

	    return func.apply(undefined, arguments);
	  };
	}

	var _shortOut = shortOut$1;

	var baseSetToString = _baseSetToString,
	    shortOut = _shortOut;
	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */

	var setToString$2 = shortOut(baseSetToString);
	var _setToString = setToString$2;

	var identity = identity_1,
	    overRest$1 = _overRest,
	    setToString$1 = _setToString;
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */

	function baseRest$1(func, start) {
	  return setToString$1(overRest$1(func, start, identity), func + '');
	}

	var _baseRest = baseRest$1;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */

	function isLength$2(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	var isLength_1 = isLength$2;

	var isFunction = isFunction_1,
	    isLength$1 = isLength_1;
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */

	function isArrayLike$4(value) {
	  return value != null && isLength$1(value.length) && !isFunction(value);
	}

	var isArrayLike_1 = isArrayLike$4;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** Used to detect unsigned integer values. */

	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */

	function isIndex$2(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	var _isIndex = isIndex$2;

	var eq$1 = eq_1,
	    isArrayLike$3 = isArrayLike_1,
	    isIndex$1 = _isIndex,
	    isObject$5 = isObject_1;
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */

	function isIterateeCall$1(value, index, object) {
	  if (!isObject$5(object)) {
	    return false;
	  }

	  var type = typeof index;

	  if (type == 'number' ? isArrayLike$3(object) && isIndex$1(index, object.length) : type == 'string' && index in object) {
	    return eq$1(object[index], value);
	  }

	  return false;
	}

	var _isIterateeCall = isIterateeCall$1;

	var baseRest = _baseRest,
	    isIterateeCall = _isIterateeCall;
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */

	function createAssigner$1(assigner) {
	  return baseRest(function (object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }

	    object = Object(object);

	    while (++index < length) {
	      var source = sources[index];

	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }

	    return object;
	  });
	}

	var _createAssigner = createAssigner$1;

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */

	function isPrototype$4(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$a;
	  return value === proto;
	}

	var _isPrototype = isPrototype$4;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */

	function baseTimes$1(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }

	  return result;
	}

	var _baseTimes = baseTimes$1;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$7(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$7;

	var baseGetTag$4 = _baseGetTag,
	    isObjectLike$6 = isObjectLike_1;
	/** `Object#toString` result references. */

	var argsTag$2 = '[object Arguments]';
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */

	function baseIsArguments$1(value) {
	  return isObjectLike$6(value) && baseGetTag$4(value) == argsTag$2;
	}

	var _baseIsArguments = baseIsArguments$1;

	var baseIsArguments = _baseIsArguments,
	    isObjectLike$5 = isObjectLike_1;
	/** Used for built-in method references. */

	var objectProto$9 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
	/** Built-in value references. */

	var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */

	var isArguments$2 = baseIsArguments(function () {
	  return arguments;
	}()) ? baseIsArguments : function (value) {
	  return isObjectLike$5(value) && hasOwnProperty$8.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
	};
	var isArguments_1 = isArguments$2;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$7 = Array.isArray;
	var isArray_1 = isArray$7;

	var isBuffer$2 = {exports: {}};

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */

	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	(function (module, exports) {
	  var root = _root,
	      stubFalse = stubFalse_1;
	  /** Detect free variable `exports`. */

	  var freeExports = exports && !exports.nodeType && exports;
	  /** Detect free variable `module`. */

	  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	  /** Detect the popular CommonJS extension `module.exports`. */

	  var moduleExports = freeModule && freeModule.exports === freeExports;
	  /** Built-in value references. */

	  var Buffer = moduleExports ? root.Buffer : undefined;
	  /* Built-in method references for those with the same name as other `lodash` methods. */

	  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	  /**
	   * Checks if `value` is a buffer.
	   *
	   * @static
	   * @memberOf _
	   * @since 4.3.0
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	   * @example
	   *
	   * _.isBuffer(new Buffer(2));
	   * // => true
	   *
	   * _.isBuffer(new Uint8Array(2));
	   * // => false
	   */

	  var isBuffer = nativeIsBuffer || stubFalse;
	  module.exports = isBuffer;
	})(isBuffer$2, isBuffer$2.exports);

	var baseGetTag$3 = _baseGetTag,
	    isLength = isLength_1,
	    isObjectLike$4 = isObjectLike_1;
	/** `Object#toString` result references. */

	var argsTag$1 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag$4 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    objectTag$3 = '[object Object]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$4 = '[object Set]',
	    stringTag$2 = '[object String]',
	    weakMapTag$2 = '[object WeakMap]';
	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';
	/** Used to identify `toStringTag` values of typed arrays. */

	var typedArrayTags = {};
	typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */

	function baseIsTypedArray$1(value) {
	  return isObjectLike$4(value) && isLength(value.length) && !!typedArrayTags[baseGetTag$3(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray$1;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */

	function baseUnary$3(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary$3;

	var _nodeUtil = {exports: {}};

	(function (module, exports) {
	  var freeGlobal = _freeGlobal;
	  /** Detect free variable `exports`. */

	  var freeExports = exports && !exports.nodeType && exports;
	  /** Detect free variable `module`. */

	  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	  /** Detect the popular CommonJS extension `module.exports`. */

	  var moduleExports = freeModule && freeModule.exports === freeExports;
	  /** Detect free variable `process` from Node.js. */

	  var freeProcess = moduleExports && freeGlobal.process;
	  /** Used to access faster Node.js helpers. */

	  var nodeUtil = function () {
	    try {
	      // Use `util.types` for Node.js 10+.
	      var types = freeModule && freeModule.require && freeModule.require('util').types;

	      if (types) {
	        return types;
	      } // Legacy `process.binding('util')` for Node.js < 10.


	      return freeProcess && freeProcess.binding && freeProcess.binding('util');
	    } catch (e) {}
	  }();

	  module.exports = nodeUtil;
	})(_nodeUtil, _nodeUtil.exports);

	var baseIsTypedArray = _baseIsTypedArray,
	    baseUnary$2 = _baseUnary,
	    nodeUtil$2 = _nodeUtil.exports;
	/* Node.js helper references. */

	var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */

	var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;
	var isTypedArray_1 = isTypedArray$1;

	var baseTimes = _baseTimes,
	    isArguments$1 = isArguments_1,
	    isArray$6 = isArray_1,
	    isBuffer$1 = isBuffer$2.exports,
	    isIndex = _isIndex,
	    isTypedArray = isTypedArray_1;
	/** Used for built-in method references. */

	var objectProto$8 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */

	function arrayLikeKeys$2(value, inherited) {
	  var isArr = isArray$6(value),
	      isArg = !isArr && isArguments$1(value),
	      isBuff = !isArr && !isArg && isBuffer$1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
	    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
	    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
	    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
	    isIndex(key, length)))) {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys$2;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */

	function overArg$2(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg$2;

	var overArg$1 = _overArg;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeKeys$1 = overArg$1(Object.keys, Object);
	var _nativeKeys = nativeKeys$1;

	var isPrototype$3 = _isPrototype,
	    nativeKeys = _nativeKeys;
	/** Used for built-in method references. */

	var objectProto$7 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	function baseKeys$1(object) {
	  if (!isPrototype$3(object)) {
	    return nativeKeys(object);
	  }

	  var result = [];

	  for (var key in Object(object)) {
	    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _baseKeys = baseKeys$1;

	var arrayLikeKeys$1 = _arrayLikeKeys,
	    baseKeys = _baseKeys,
	    isArrayLike$2 = isArrayLike_1;
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */

	function keys$4(object) {
	  return isArrayLike$2(object) ? arrayLikeKeys$1(object) : baseKeys(object);
	}

	var keys_1 = keys$4;

	var assignValue$1 = _assignValue,
	    copyObject$5 = _copyObject,
	    createAssigner = _createAssigner,
	    isArrayLike$1 = isArrayLike_1,
	    isPrototype$2 = _isPrototype,
	    keys$3 = keys_1;
	/** Used for built-in method references. */

	var objectProto$6 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */

	var assign$1 = createAssigner(function (object, source) {
	  if (isPrototype$2(source) || isArrayLike$1(source)) {
	    copyObject$5(source, keys$3(source), object);
	    return;
	  }

	  for (var key in source) {
	    if (hasOwnProperty$5.call(source, key)) {
	      assignValue$1(object, key, source[key]);
	    }
	  }
	});
	var assign_1 = assign$1;

	var collectionUtils = {exports: {}};

	var utils$3 = collectionUtils.exports = {};
	/**
	 * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
	 * @public
	 * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
	 * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
	 * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
	 */

	utils$3.forEach = function (collection, callback) {
	  for (var i = 0; i < collection.length; i++) {
	    var result = callback(collection[i]);

	    if (result) {
	      return result;
	    }
	  }
	};

	var elementUtils = function (options) {
	  var getState = options.stateHandler.getState;
	  /**
	   * Tells if the element has been made detectable and ready to be listened for resize events.
	   * @public
	   * @param {element} The element to check.
	   * @returns {boolean} True or false depending on if the element is detectable or not.
	   */

	  function isDetectable(element) {
	    var state = getState(element);
	    return state && !!state.isDetectable;
	  }
	  /**
	   * Marks the element that it has been made detectable and ready to be listened for resize events.
	   * @public
	   * @param {element} The element to mark.
	   */


	  function markAsDetectable(element) {
	    getState(element).isDetectable = true;
	  }
	  /**
	   * Tells if the element is busy or not.
	   * @public
	   * @param {element} The element to check.
	   * @returns {boolean} True or false depending on if the element is busy or not.
	   */


	  function isBusy(element) {
	    return !!getState(element).busy;
	  }
	  /**
	   * Marks the object is busy and should not be made detectable.
	   * @public
	   * @param {element} element The element to mark.
	   * @param {boolean} busy If the element is busy or not.
	   */


	  function markBusy(element, busy) {
	    getState(element).busy = !!busy;
	  }

	  return {
	    isDetectable: isDetectable,
	    markAsDetectable: markAsDetectable,
	    isBusy: isBusy,
	    markBusy: markBusy
	  };
	};

	var listenerHandler = function (idHandler) {
	  var eventListeners = {};
	  /**
	   * Gets all listeners for the given element.
	   * @public
	   * @param {element} element The element to get all listeners for.
	   * @returns All listeners for the given element.
	   */

	  function getListeners(element) {
	    var id = idHandler.get(element);

	    if (id === undefined) {
	      return [];
	    }

	    return eventListeners[id] || [];
	  }
	  /**
	   * Stores the given listener for the given element. Will not actually add the listener to the element.
	   * @public
	   * @param {element} element The element that should have the listener added.
	   * @param {function} listener The callback that the element has added.
	   */


	  function addListener(element, listener) {
	    var id = idHandler.get(element);

	    if (!eventListeners[id]) {
	      eventListeners[id] = [];
	    }

	    eventListeners[id].push(listener);
	  }

	  function removeListener(element, listener) {
	    var listeners = getListeners(element);

	    for (var i = 0, len = listeners.length; i < len; ++i) {
	      if (listeners[i] === listener) {
	        listeners.splice(i, 1);
	        break;
	      }
	    }
	  }

	  function removeAllListeners(element) {
	    var listeners = getListeners(element);

	    if (!listeners) {
	      return;
	    }

	    listeners.length = 0;
	  }

	  return {
	    get: getListeners,
	    add: addListener,
	    removeListener: removeListener,
	    removeAllListeners: removeAllListeners
	  };
	};

	var idGenerator = function () {
	  var idCount = 1;
	  /**
	   * Generates a new unique id in the context.
	   * @public
	   * @returns {number} A unique id in the context.
	   */

	  function generate() {
	    return idCount++;
	  }

	  return {
	    generate: generate
	  };
	};

	var idHandler = function (options) {
	  var idGenerator = options.idGenerator;
	  var getState = options.stateHandler.getState;
	  /**
	   * Gets the resize detector id of the element.
	   * @public
	   * @param {element} element The target element to get the id of.
	   * @returns {string|number|null} The id of the element. Null if it has no id.
	   */

	  function getId(element) {
	    var state = getState(element);

	    if (state && state.id !== undefined) {
	      return state.id;
	    }

	    return null;
	  }
	  /**
	   * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
	   * @public
	   * @param {element} element The target element to set the id of.
	   * @returns {string|number|null} The id of the element.
	   */


	  function setId(element) {
	    var state = getState(element);

	    if (!state) {
	      throw new Error("setId required the element to have a resize detection state.");
	    }

	    var id = idGenerator.generate();
	    state.id = id;
	    return id;
	  }

	  return {
	    get: getId,
	    set: setId
	  };
	};

	/* global console: false */

	/**
	 * Reporter that handles the reporting of logs, warnings and errors.
	 * @public
	 * @param {boolean} quiet Tells if the reporter should be quiet or not.
	 */


	var reporter = function (quiet) {
	  function noop() {//Does nothing.
	  }

	  var reporter = {
	    log: noop,
	    warn: noop,
	    error: noop
	  };

	  if (!quiet && window.console) {
	    var attachFunction = function (reporter, name) {
	      //The proxy is needed to be able to call the method with the console context,
	      //since we cannot use bind.
	      reporter[name] = function reporterProxy() {
	        var f = console[name];

	        if (f.apply) {
	          //IE9 does not support console.log.apply :)
	          f.apply(console, arguments);
	        } else {
	          for (var i = 0; i < arguments.length; i++) {
	            f(arguments[i]);
	          }
	        }
	      };
	    };

	    attachFunction(reporter, "log");
	    attachFunction(reporter, "warn");
	    attachFunction(reporter, "error");
	  }

	  return reporter;
	};

	var browserDetector$2 = {exports: {}};

	var detector = browserDetector$2.exports = {};

	detector.isIE = function (version) {
	  function isAnyIeVersion() {
	    var agent = navigator.userAgent.toLowerCase();
	    return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
	  }

	  if (!isAnyIeVersion()) {
	    return false;
	  }

	  if (!version) {
	    return true;
	  } //Shamelessly stolen from https://gist.github.com/padolsey/527683


	  var ieVersion = function () {
	    var undef,
	        v = 3,
	        div = document.createElement("div"),
	        all = div.getElementsByTagName("i");

	    do {
	      div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
	    } while (all[0]);

	    return v > 4 ? v : undef;
	  }();

	  return version === ieVersion;
	};

	detector.isLegacyOpera = function () {
	  return !!window.opera;
	};

	var utils$2 = {exports: {}};

	var utils$1 = utils$2.exports = {};
	utils$1.getOption = getOption$1;

	function getOption$1(options, name, defaultValue) {
	  var value = options[name];

	  if ((value === undefined || value === null) && defaultValue !== undefined) {
	    return defaultValue;
	  }

	  return value;
	}

	var utils = utils$2.exports;

	var batchProcessor = function batchProcessorMaker(options) {
	  options = options || {};
	  var reporter = options.reporter;
	  var asyncProcess = utils.getOption(options, "async", true);
	  var autoProcess = utils.getOption(options, "auto", true);

	  if (autoProcess && !asyncProcess) {
	    reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
	    asyncProcess = true;
	  }

	  var batch = Batch();
	  var asyncFrameHandler;
	  var isProcessing = false;

	  function addFunction(level, fn) {
	    if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
	      // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
	      // This needs to be done before, since we're checking the size of the batch to be 0.
	      processBatchAsync();
	    }

	    batch.add(level, fn);
	  }

	  function processBatch() {
	    // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
	    // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
	    isProcessing = true;

	    while (batch.size()) {
	      var processingBatch = batch;
	      batch = Batch();
	      processingBatch.process();
	    }

	    isProcessing = false;
	  }

	  function forceProcessBatch(localAsyncProcess) {
	    if (isProcessing) {
	      return;
	    }

	    if (localAsyncProcess === undefined) {
	      localAsyncProcess = asyncProcess;
	    }

	    if (asyncFrameHandler) {
	      cancelFrame(asyncFrameHandler);
	      asyncFrameHandler = null;
	    }

	    if (localAsyncProcess) {
	      processBatchAsync();
	    } else {
	      processBatch();
	    }
	  }

	  function processBatchAsync() {
	    asyncFrameHandler = requestFrame(processBatch);
	  }

	  function cancelFrame(listener) {
	    // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
	    var cancel = clearTimeout;
	    return cancel(listener);
	  }

	  function requestFrame(callback) {
	    // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
	    var raf = function (fn) {
	      return setTimeout(fn, 0);
	    };

	    return raf(callback);
	  }

	  return {
	    add: addFunction,
	    force: forceProcessBatch
	  };
	};

	function Batch() {
	  var batch = {};
	  var size = 0;
	  var topLevel = 0;
	  var bottomLevel = 0;

	  function add(level, fn) {
	    if (!fn) {
	      fn = level;
	      level = 0;
	    }

	    if (level > topLevel) {
	      topLevel = level;
	    } else if (level < bottomLevel) {
	      bottomLevel = level;
	    }

	    if (!batch[level]) {
	      batch[level] = [];
	    }

	    batch[level].push(fn);
	    size++;
	  }

	  function process() {
	    for (var level = bottomLevel; level <= topLevel; level++) {
	      var fns = batch[level];

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];
	        fn();
	      }
	    }
	  }

	  function getSize() {
	    return size;
	  }

	  return {
	    add: add,
	    process: process,
	    size: getSize
	  };
	}

	var prop = "_erd";

	function initState(element) {
	  element[prop] = {};
	  return getState(element);
	}

	function getState(element) {
	  return element[prop];
	}

	function cleanState(element) {
	  delete element[prop];
	}

	var stateHandler$1 = {
	  initState: initState,
	  getState: getState,
	  cleanState: cleanState
	};

	/**
	 * Resize detection strategy that injects objects to elements in order to detect resize events.
	 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
	 */

	var browserDetector$1 = browserDetector$2.exports;

	var object = function (options) {
	  options = options || {};
	  var reporter = options.reporter;
	  var batchProcessor = options.batchProcessor;
	  var getState = options.stateHandler.getState;

	  if (!reporter) {
	    throw new Error("Missing required dependency: reporter.");
	  }
	  /**
	   * Adds a resize event listener to the element.
	   * @public
	   * @param {element} element The element that should have the listener added.
	   * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
	   */


	  function addListener(element, listener) {
	    function listenerProxy() {
	      listener(element);
	    }

	    if (browserDetector$1.isIE(8)) {
	      //IE 8 does not support object, but supports the resize event directly on elements.
	      getState(element).object = {
	        proxy: listenerProxy
	      };
	      element.attachEvent("onresize", listenerProxy);
	    } else {
	      var object = getObject(element);

	      if (!object) {
	        throw new Error("Element is not detectable by this strategy.");
	      }

	      object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
	    }
	  }

	  function buildCssTextString(rules) {
	    var seperator = options.important ? " !important; " : "; ";
	    return (rules.join(seperator) + seperator).trim();
	  }
	  /**
	   * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
	   * @private
	   * @param {object} options Optional options object.
	   * @param {element} element The element to make detectable
	   * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
	   */


	  function makeDetectable(options, element, callback) {
	    if (!callback) {
	      callback = element;
	      element = options;
	      options = null;
	    }

	    options = options || {};
	    options.debug;

	    function injectObject(element, callback) {
	      var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]); //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.
	      // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.

	      var positionCheckPerformed = false; // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
	      // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.

	      var style = window.getComputedStyle(element);
	      var width = element.offsetWidth;
	      var height = element.offsetHeight;
	      getState(element).startSize = {
	        width: width,
	        height: height
	      };

	      function mutateDom() {
	        function alterPositionStyles() {
	          if (style.position === "static") {
	            element.style.setProperty("position", "relative", options.important ? "important" : "");

	            var removeRelativeStyles = function (reporter, element, style, property) {
	              function getNumericalValue(value) {
	                return value.replace(/[^-\d\.]/g, "");
	              }

	              var value = style[property];

	              if (value !== "auto" && getNumericalValue(value) !== "0") {
	                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
	                element.style.setProperty(property, "0", options.important ? "important" : "");
	              }
	            }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
	            //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


	            removeRelativeStyles(reporter, element, style, "top");
	            removeRelativeStyles(reporter, element, style, "right");
	            removeRelativeStyles(reporter, element, style, "bottom");
	            removeRelativeStyles(reporter, element, style, "left");
	          }
	        }

	        function onObjectLoad() {
	          // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
	          if (!positionCheckPerformed) {
	            alterPositionStyles();
	          }
	          /*jshint validthis: true */


	          function getDocument(element, callback) {
	            //Opera 12 seem to call the object.onload before the actual document has been created.
	            //So if it is not present, poll it with an timeout until it is present.
	            //TODO: Could maybe be handled better with object.onreadystatechange or similar.
	            if (!element.contentDocument) {
	              var state = getState(element);

	              if (state.checkForObjectDocumentTimeoutId) {
	                window.clearTimeout(state.checkForObjectDocumentTimeoutId);
	              }

	              state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
	                state.checkForObjectDocumentTimeoutId = 0;
	                getDocument(element, callback);
	              }, 100);
	              return;
	            }

	            callback(element.contentDocument);
	          } //Mutating the object element here seems to fire another load event.
	          //Mutating the inner document of the object element is fine though.


	          var objectElement = this; //Create the style element to be added to the object.

	          getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
	            //Notify that the element is ready to be listened to.
	            callback(element);
	          });
	        } // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
	        // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.


	        if (style.position !== "") {
	          alterPositionStyles();
	          positionCheckPerformed = true;
	        } //Add an object element as a child to the target element that will be listened to for resize events.


	        var object = document.createElement("object");
	        object.style.cssText = OBJECT_STYLE;
	        object.tabIndex = -1;
	        object.type = "text/html";
	        object.setAttribute("aria-hidden", "true");
	        object.onload = onObjectLoad; //Safari: This must occur before adding the object to the DOM.
	        //IE: Does not like that this happens before, even if it is also added after.

	        if (!browserDetector$1.isIE()) {
	          object.data = "about:blank";
	        }

	        if (!getState(element)) {
	          // The element has been uninstalled before the actual loading happened.
	          return;
	        }

	        element.appendChild(object);
	        getState(element).object = object; //IE: This must occur after adding the object to the DOM.

	        if (browserDetector$1.isIE()) {
	          object.data = "about:blank";
	        }
	      }

	      if (batchProcessor) {
	        batchProcessor.add(mutateDom);
	      } else {
	        mutateDom();
	      }
	    }

	    if (browserDetector$1.isIE(8)) {
	      //IE 8 does not support objects properly. Luckily they do support the resize event.
	      //So do not inject the object and notify that the element is already ready to be listened to.
	      //The event handler for the resize event is attached in the utils.addListener instead.
	      callback(element);
	    } else {
	      injectObject(element, callback);
	    }
	  }
	  /**
	   * Returns the child object of the target element.
	   * @private
	   * @param {element} element The target element.
	   * @returns The object element of the target.
	   */


	  function getObject(element) {
	    return getState(element).object;
	  }

	  function uninstall(element) {
	    if (!getState(element)) {
	      return;
	    }

	    var object = getObject(element);

	    if (!object) {
	      return;
	    }

	    if (browserDetector$1.isIE(8)) {
	      element.detachEvent("onresize", object.proxy);
	    } else {
	      element.removeChild(object);
	    }

	    if (getState(element).checkForObjectDocumentTimeoutId) {
	      window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
	    }

	    delete getState(element).object;
	  }

	  return {
	    makeDetectable: makeDetectable,
	    addListener: addListener,
	    uninstall: uninstall
	  };
	};

	/**
	 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
	 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
	 */

	var forEach$1 = collectionUtils.exports.forEach;

	var scroll = function (options) {
	  options = options || {};
	  var reporter = options.reporter;
	  var batchProcessor = options.batchProcessor;
	  var getState = options.stateHandler.getState;
	  options.stateHandler.hasState;
	  var idHandler = options.idHandler;

	  if (!batchProcessor) {
	    throw new Error("Missing required dependency: batchProcessor");
	  }

	  if (!reporter) {
	    throw new Error("Missing required dependency: reporter.");
	  } //TODO: Could this perhaps be done at installation time?


	  var scrollbarSizes = getScrollbarSizes();
	  var styleId = "erd_scroll_detection_scrollbar_style";
	  var detectionContainerClass = "erd_scroll_detection_container";

	  function initDocument(targetDocument) {
	    // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
	    // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
	    injectScrollStyle(targetDocument, styleId, detectionContainerClass);
	  }

	  initDocument(window.document);

	  function buildCssTextString(rules) {
	    var seperator = options.important ? " !important; " : "; ";
	    return (rules.join(seperator) + seperator).trim();
	  }

	  function getScrollbarSizes() {
	    var width = 500;
	    var height = 500;
	    var child = document.createElement("div");
	    child.style.cssText = buildCssTextString(["position: absolute", "width: " + width * 2 + "px", "height: " + height * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
	    var container = document.createElement("div");
	    container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width * 3 + "px", "left: " + -height * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
	    container.appendChild(child);
	    document.body.insertBefore(container, document.body.firstChild);
	    var widthSize = width - container.clientWidth;
	    var heightSize = height - container.clientHeight;
	    document.body.removeChild(container);
	    return {
	      width: widthSize,
	      height: heightSize
	    };
	  }

	  function injectScrollStyle(targetDocument, styleId, containerClass) {
	    function injectStyle(style, method) {
	      method = method || function (element) {
	        targetDocument.head.appendChild(element);
	      };

	      var styleElement = targetDocument.createElement("style");
	      styleElement.innerHTML = style;
	      styleElement.id = styleId;
	      method(styleElement);
	      return styleElement;
	    }

	    if (!targetDocument.getElementById(styleId)) {
	      var containerAnimationClass = containerClass + "_animation";
	      var containerAnimationActiveClass = containerClass + "_animation_active";
	      var style = "/* Created by the element-resize-detector library. */\n";
	      style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
	      style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
	      style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
	      style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
	      injectStyle(style);
	    }
	  }

	  function addAnimationClass(element) {
	    element.className += " " + detectionContainerClass + "_animation_active";
	  }

	  function addEvent(el, name, cb) {
	    if (el.addEventListener) {
	      el.addEventListener(name, cb);
	    } else if (el.attachEvent) {
	      el.attachEvent("on" + name, cb);
	    } else {
	      return reporter.error("[scroll] Don't know how to add event listeners.");
	    }
	  }

	  function removeEvent(el, name, cb) {
	    if (el.removeEventListener) {
	      el.removeEventListener(name, cb);
	    } else if (el.detachEvent) {
	      el.detachEvent("on" + name, cb);
	    } else {
	      return reporter.error("[scroll] Don't know how to remove event listeners.");
	    }
	  }

	  function getExpandElement(element) {
	    return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
	  }

	  function getShrinkElement(element) {
	    return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
	  }
	  /**
	   * Adds a resize event listener to the element.
	   * @public
	   * @param {element} element The element that should have the listener added.
	   * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
	   */


	  function addListener(element, listener) {
	    var listeners = getState(element).listeners;

	    if (!listeners.push) {
	      throw new Error("Cannot add listener to an element that is not detectable.");
	    }

	    getState(element).listeners.push(listener);
	  }
	  /**
	   * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
	   * @private
	   * @param {object} options Optional options object.
	   * @param {element} element The element to make detectable
	   * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
	   */


	  function makeDetectable(options, element, callback) {
	    if (!callback) {
	      callback = element;
	      element = options;
	      options = null;
	    }

	    options = options || {};

	    function debug() {
	      if (options.debug) {
	        var args = Array.prototype.slice.call(arguments);
	        args.unshift(idHandler.get(element), "Scroll: ");

	        if (reporter.log.apply) {
	          reporter.log.apply(null, args);
	        } else {
	          for (var i = 0; i < args.length; i++) {
	            reporter.log(args[i]);
	          }
	        }
	      }
	    }

	    function isDetached(element) {
	      function isInDocument(element) {
	        var isInShadowRoot = element.getRootNode && element.getRootNode().contains(element);
	        return element === element.ownerDocument.body || element.ownerDocument.body.contains(element) || isInShadowRoot;
	      }

	      if (!isInDocument(element)) {
	        return true;
	      } // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520


	      if (window.getComputedStyle(element) === null) {
	        return true;
	      }

	      return false;
	    }

	    function isUnrendered(element) {
	      // Check the absolute positioned container since the top level container is display: inline.
	      var container = getState(element).container.childNodes[0];
	      var style = window.getComputedStyle(container);
	      return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
	    }

	    function getStyle() {
	      // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
	      // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
	      var elementStyle = window.getComputedStyle(element);
	      var style = {};
	      style.position = elementStyle.position;
	      style.width = element.offsetWidth;
	      style.height = element.offsetHeight;
	      style.top = elementStyle.top;
	      style.right = elementStyle.right;
	      style.bottom = elementStyle.bottom;
	      style.left = elementStyle.left;
	      style.widthCSS = elementStyle.width;
	      style.heightCSS = elementStyle.height;
	      return style;
	    }

	    function storeStartSize() {
	      var style = getStyle();
	      getState(element).startSize = {
	        width: style.width,
	        height: style.height
	      };
	      debug("Element start size", getState(element).startSize);
	    }

	    function initListeners() {
	      getState(element).listeners = [];
	    }

	    function storeStyle() {
	      debug("storeStyle invoked.");

	      if (!getState(element)) {
	        debug("Aborting because element has been uninstalled");
	        return;
	      }

	      var style = getStyle();
	      getState(element).style = style;
	    }

	    function storeCurrentSize(element, width, height) {
	      getState(element).lastWidth = width;
	      getState(element).lastHeight = height;
	    }

	    function getExpandChildElement(element) {
	      return getExpandElement(element).childNodes[0];
	    }

	    function getWidthOffset() {
	      return 2 * scrollbarSizes.width + 1;
	    }

	    function getHeightOffset() {
	      return 2 * scrollbarSizes.height + 1;
	    }

	    function getExpandWidth(width) {
	      return width + 10 + getWidthOffset();
	    }

	    function getExpandHeight(height) {
	      return height + 10 + getHeightOffset();
	    }

	    function getShrinkWidth(width) {
	      return width * 2 + getWidthOffset();
	    }

	    function getShrinkHeight(height) {
	      return height * 2 + getHeightOffset();
	    }

	    function positionScrollbars(element, width, height) {
	      var expand = getExpandElement(element);
	      var shrink = getShrinkElement(element);
	      var expandWidth = getExpandWidth(width);
	      var expandHeight = getExpandHeight(height);
	      var shrinkWidth = getShrinkWidth(width);
	      var shrinkHeight = getShrinkHeight(height);
	      expand.scrollLeft = expandWidth;
	      expand.scrollTop = expandHeight;
	      shrink.scrollLeft = shrinkWidth;
	      shrink.scrollTop = shrinkHeight;
	    }

	    function injectContainerElement() {
	      var container = getState(element).container;

	      if (!container) {
	        container = document.createElement("div");
	        container.className = detectionContainerClass;
	        container.style.cssText = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
	        getState(element).container = container;
	        addAnimationClass(container);
	        element.appendChild(container);

	        var onAnimationStart = function () {
	          getState(element).onRendered && getState(element).onRendered();
	        };

	        addEvent(container, "animationstart", onAnimationStart); // Store the event handler here so that they may be removed when uninstall is called.
	        // See uninstall function for an explanation why it is needed.

	        getState(element).onAnimationStart = onAnimationStart;
	      }

	      return container;
	    }

	    function injectScrollElements() {
	      function alterPositionStyles() {
	        var style = getState(element).style;

	        if (style.position === "static") {
	          element.style.setProperty("position", "relative", options.important ? "important" : "");

	          var removeRelativeStyles = function (reporter, element, style, property) {
	            function getNumericalValue(value) {
	              return value.replace(/[^-\d\.]/g, "");
	            }

	            var value = style[property];

	            if (value !== "auto" && getNumericalValue(value) !== "0") {
	              reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
	              element.style[property] = 0;
	            }
	          }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
	          //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


	          removeRelativeStyles(reporter, element, style, "top");
	          removeRelativeStyles(reporter, element, style, "right");
	          removeRelativeStyles(reporter, element, style, "bottom");
	          removeRelativeStyles(reporter, element, style, "left");
	        }
	      }

	      function getLeftTopBottomRightCssText(left, top, bottom, right) {
	        left = !left ? "0" : left + "px";
	        top = !top ? "0" : top + "px";
	        bottom = !bottom ? "0" : bottom + "px";
	        right = !right ? "0" : right + "px";
	        return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
	      }

	      debug("Injecting elements");

	      if (!getState(element)) {
	        debug("Aborting because element has been uninstalled");
	        return;
	      }

	      alterPositionStyles();
	      var rootContainer = getState(element).container;

	      if (!rootContainer) {
	        rootContainer = injectContainerElement();
	      } // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
	      // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
	      // the targeted element.
	      // When the bug is resolved, "containerContainer" may be removed.
	      // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
	      // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.


	      var scrollbarWidth = scrollbarSizes.width;
	      var scrollbarHeight = scrollbarSizes.height;
	      var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
	      var containerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
	      var expandStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
	      var shrinkStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
	      var expandChildStyle = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
	      var shrinkChildStyle = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);
	      var containerContainer = document.createElement("div");
	      var container = document.createElement("div");
	      var expand = document.createElement("div");
	      var expandChild = document.createElement("div");
	      var shrink = document.createElement("div");
	      var shrinkChild = document.createElement("div"); // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
	      // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.

	      containerContainer.dir = "ltr";
	      containerContainer.style.cssText = containerContainerStyle;
	      containerContainer.className = detectionContainerClass;
	      container.className = detectionContainerClass;
	      container.style.cssText = containerStyle;
	      expand.style.cssText = expandStyle;
	      expandChild.style.cssText = expandChildStyle;
	      shrink.style.cssText = shrinkStyle;
	      shrinkChild.style.cssText = shrinkChildStyle;
	      expand.appendChild(expandChild);
	      shrink.appendChild(shrinkChild);
	      container.appendChild(expand);
	      container.appendChild(shrink);
	      containerContainer.appendChild(container);
	      rootContainer.appendChild(containerContainer);

	      function onExpandScroll() {
	        var state = getState(element);

	        if (state && state.onExpand) {
	          state.onExpand();
	        } else {
	          debug("Aborting expand scroll handler: element has been uninstalled");
	        }
	      }

	      function onShrinkScroll() {
	        var state = getState(element);

	        if (state && state.onShrink) {
	          state.onShrink();
	        } else {
	          debug("Aborting shrink scroll handler: element has been uninstalled");
	        }
	      }

	      addEvent(expand, "scroll", onExpandScroll);
	      addEvent(shrink, "scroll", onShrinkScroll); // Store the event handlers here so that they may be removed when uninstall is called.
	      // See uninstall function for an explanation why it is needed.

	      getState(element).onExpandScroll = onExpandScroll;
	      getState(element).onShrinkScroll = onShrinkScroll;
	    }

	    function registerListenersAndPositionElements() {
	      function updateChildSizes(element, width, height) {
	        var expandChild = getExpandChildElement(element);
	        var expandWidth = getExpandWidth(width);
	        var expandHeight = getExpandHeight(height);
	        expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
	        expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
	      }

	      function updateDetectorElements(done) {
	        var width = element.offsetWidth;
	        var height = element.offsetHeight; // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.

	        var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;
	        debug("Storing current size", width, height); // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
	        // Otherwise the if-check in handleScroll is useless.

	        storeCurrentSize(element, width, height); // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
	        // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

	        batchProcessor.add(0, function performUpdateChildSizes() {
	          if (!sizeChanged) {
	            return;
	          }

	          if (!getState(element)) {
	            debug("Aborting because element has been uninstalled");
	            return;
	          }

	          if (!areElementsInjected()) {
	            debug("Aborting because element container has not been initialized");
	            return;
	          }

	          if (options.debug) {
	            var w = element.offsetWidth;
	            var h = element.offsetHeight;

	            if (w !== width || h !== height) {
	              reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
	            }
	          }

	          updateChildSizes(element, width, height);
	        });
	        batchProcessor.add(1, function updateScrollbars() {
	          // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
	          // been restored to the original size, which will have changed the scrollbar positions.
	          if (!getState(element)) {
	            debug("Aborting because element has been uninstalled");
	            return;
	          }

	          if (!areElementsInjected()) {
	            debug("Aborting because element container has not been initialized");
	            return;
	          }

	          positionScrollbars(element, width, height);
	        });

	        if (sizeChanged && done) {
	          batchProcessor.add(2, function () {
	            if (!getState(element)) {
	              debug("Aborting because element has been uninstalled");
	              return;
	            }

	            if (!areElementsInjected()) {
	              debug("Aborting because element container has not been initialized");
	              return;
	            }

	            done();
	          });
	        }
	      }

	      function areElementsInjected() {
	        return !!getState(element).container;
	      }

	      function notifyListenersIfNeeded() {
	        function isFirstNotify() {
	          return getState(element).lastNotifiedWidth === undefined;
	        }

	        debug("notifyListenersIfNeeded invoked");
	        var state = getState(element); // Don't notify if the current size is the start size, and this is the first notification.

	        if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
	          return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
	        } // Don't notify if the size already has been notified.


	        if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
	          return debug("Not notifying: Size already notified");
	        }

	        debug("Current size not notified, notifying...");
	        state.lastNotifiedWidth = state.lastWidth;
	        state.lastNotifiedHeight = state.lastHeight;
	        forEach$1(getState(element).listeners, function (listener) {
	          listener(element);
	        });
	      }

	      function handleRender() {
	        debug("startanimation triggered.");

	        if (isUnrendered(element)) {
	          debug("Ignoring since element is still unrendered...");
	          return;
	        }

	        debug("Element rendered.");
	        var expand = getExpandElement(element);
	        var shrink = getShrinkElement(element);

	        if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
	          debug("Scrollbars out of sync. Updating detector elements...");
	          updateDetectorElements(notifyListenersIfNeeded);
	        }
	      }

	      function handleScroll() {
	        debug("Scroll detected.");

	        if (isUnrendered(element)) {
	          // Element is still unrendered. Skip this scroll event.
	          debug("Scroll event fired while unrendered. Ignoring...");
	          return;
	        }

	        updateDetectorElements(notifyListenersIfNeeded);
	      }

	      debug("registerListenersAndPositionElements invoked.");

	      if (!getState(element)) {
	        debug("Aborting because element has been uninstalled");
	        return;
	      }

	      getState(element).onRendered = handleRender;
	      getState(element).onExpand = handleScroll;
	      getState(element).onShrink = handleScroll;
	      var style = getState(element).style;
	      updateChildSizes(element, style.width, style.height);
	    }

	    function finalizeDomMutation() {
	      debug("finalizeDomMutation invoked.");

	      if (!getState(element)) {
	        debug("Aborting because element has been uninstalled");
	        return;
	      }

	      var style = getState(element).style;
	      storeCurrentSize(element, style.width, style.height);
	      positionScrollbars(element, style.width, style.height);
	    }

	    function ready() {
	      callback(element);
	    }

	    function install() {
	      debug("Installing...");
	      initListeners();
	      storeStartSize();
	      batchProcessor.add(0, storeStyle);
	      batchProcessor.add(1, injectScrollElements);
	      batchProcessor.add(2, registerListenersAndPositionElements);
	      batchProcessor.add(3, finalizeDomMutation);
	      batchProcessor.add(4, ready);
	    }

	    debug("Making detectable...");

	    if (isDetached(element)) {
	      debug("Element is detached");
	      injectContainerElement();
	      debug("Waiting until element is attached...");

	      getState(element).onRendered = function () {
	        debug("Element is now attached");
	        install();
	      };
	    } else {
	      install();
	    }
	  }

	  function uninstall(element) {
	    var state = getState(element);

	    if (!state) {
	      // Uninstall has been called on a non-erd element.
	      return;
	    } // Uninstall may have been called in the following scenarios:
	    // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
	    // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
	    // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
	    // So to be on the safe side, let's check for each thing before removing.
	    // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.


	    state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
	    state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
	    state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);
	    state.container && element.removeChild(state.container);
	  }

	  return {
	    makeDetectable: makeDetectable,
	    addListener: addListener,
	    uninstall: uninstall,
	    initDocument: initDocument
	  };
	};

	var forEach = collectionUtils.exports.forEach;
	var elementUtilsMaker = elementUtils;
	var listenerHandlerMaker = listenerHandler;
	var idGeneratorMaker = idGenerator;
	var idHandlerMaker = idHandler;
	var reporterMaker = reporter;
	var browserDetector = browserDetector$2.exports;
	var batchProcessorMaker = batchProcessor;
	var stateHandler = stateHandler$1; //Detection strategies.

	var objectStrategyMaker = object;
	var scrollStrategyMaker = scroll;

	function isCollection(obj) {
	  return Array.isArray(obj) || obj.length !== undefined;
	}

	function toArray(collection) {
	  if (!Array.isArray(collection)) {
	    var array = [];
	    forEach(collection, function (obj) {
	      array.push(obj);
	    });
	    return array;
	  } else {
	    return collection;
	  }
	}

	function isElement(obj) {
	  return obj && obj.nodeType === 1;
	}
	/**
	 * @typedef idHandler
	 * @type {object}
	 * @property {function} get Gets the resize detector id of the element.
	 * @property {function} set Generate and sets the resize detector id of the element.
	 */

	/**
	 * @typedef Options
	 * @type {object}
	 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
	                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
	                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
	 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
	                                    If not provided, a default id handler will be used.
	 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
	                                    If not provided, a default id handler will be used.
	                                    If set to false, then nothing will be reported.
	 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
	 */

	/**
	 * Creates an element resize detector instance.
	 * @public
	 * @param {Options?} options Optional global options object that will decide how this instance will work.
	 */


	var elementResizeDetector = function (options) {
	  options = options || {}; //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.

	  var idHandler;

	  if (options.idHandler) {
	    // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
	    // so that readonly flag always is true when it's used here. This may be removed next major version bump.
	    idHandler = {
	      get: function (element) {
	        return options.idHandler.get(element, true);
	      },
	      set: options.idHandler.set
	    };
	  } else {
	    var idGenerator = idGeneratorMaker();
	    var defaultIdHandler = idHandlerMaker({
	      idGenerator: idGenerator,
	      stateHandler: stateHandler
	    });
	    idHandler = defaultIdHandler;
	  } //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.


	  var reporter = options.reporter;

	  if (!reporter) {
	    //If options.reporter is false, then the reporter should be quiet.
	    var quiet = reporter === false;
	    reporter = reporterMaker(quiet);
	  } //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.


	  var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({
	    reporter: reporter
	  })); //Options to be used as default for the listenTo function.

	  var globalOptions = {};
	  globalOptions.callOnAdd = !!getOption(options, "callOnAdd", true);
	  globalOptions.debug = !!getOption(options, "debug", false);
	  var eventListenerHandler = listenerHandlerMaker(idHandler);
	  var elementUtils = elementUtilsMaker({
	    stateHandler: stateHandler
	  }); //The detection strategy to be used.

	  var detectionStrategy;
	  var desiredStrategy = getOption(options, "strategy", "object");
	  var importantCssRules = getOption(options, "important", false);
	  var strategyOptions = {
	    reporter: reporter,
	    batchProcessor: batchProcessor,
	    stateHandler: stateHandler,
	    idHandler: idHandler,
	    important: importantCssRules
	  };

	  if (desiredStrategy === "scroll") {
	    if (browserDetector.isLegacyOpera()) {
	      reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
	      desiredStrategy = "object";
	    } else if (browserDetector.isIE(9)) {
	      reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
	      desiredStrategy = "object";
	    }
	  }

	  if (desiredStrategy === "scroll") {
	    detectionStrategy = scrollStrategyMaker(strategyOptions);
	  } else if (desiredStrategy === "object") {
	    detectionStrategy = objectStrategyMaker(strategyOptions);
	  } else {
	    throw new Error("Invalid strategy name: " + desiredStrategy);
	  } //Calls can be made to listenTo with elements that are still being installed.
	  //Also, same elements can occur in the elements list in the listenTo function.
	  //With this map, the ready callbacks can be synchronized between the calls
	  //so that the ready callback can always be called when an element is ready - even if
	  //it wasn't installed from the function itself.


	  var onReadyCallbacks = {};
	  /**
	   * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
	   * @public
	   * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
	   * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
	   * @param {function} listener The callback to be executed for each resize event for each element.
	   */

	  function listenTo(options, elements, listener) {
	    function onResizeCallback(element) {
	      var listeners = eventListenerHandler.get(element);
	      forEach(listeners, function callListenerProxy(listener) {
	        listener(element);
	      });
	    }

	    function addListener(callOnAdd, element, listener) {
	      eventListenerHandler.add(element, listener);

	      if (callOnAdd) {
	        listener(element);
	      }
	    } //Options object may be omitted.


	    if (!listener) {
	      listener = elements;
	      elements = options;
	      options = {};
	    }

	    if (!elements) {
	      throw new Error("At least one element required.");
	    }

	    if (!listener) {
	      throw new Error("Listener required.");
	    }

	    if (isElement(elements)) {
	      // A single element has been passed in.
	      elements = [elements];
	    } else if (isCollection(elements)) {
	      // Convert collection to array for plugins.
	      // TODO: May want to check so that all the elements in the collection are valid elements.
	      elements = toArray(elements);
	    } else {
	      return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
	    }

	    var elementsReady = 0;
	    var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
	    var onReadyCallback = getOption(options, "onReady", function noop() {});
	    var debug = getOption(options, "debug", globalOptions.debug);
	    forEach(elements, function attachListenerToElement(element) {
	      if (!stateHandler.getState(element)) {
	        stateHandler.initState(element);
	        idHandler.set(element);
	      }

	      var id = idHandler.get(element);
	      debug && reporter.log("Attaching listener to element", id, element);

	      if (!elementUtils.isDetectable(element)) {
	        debug && reporter.log(id, "Not detectable.");

	        if (elementUtils.isBusy(element)) {
	          debug && reporter.log(id, "System busy making it detectable"); //The element is being prepared to be detectable. Do not make it detectable.
	          //Just add the listener, because the element will soon be detectable.

	          addListener(callOnAdd, element, listener);
	          onReadyCallbacks[id] = onReadyCallbacks[id] || [];
	          onReadyCallbacks[id].push(function onReady() {
	            elementsReady++;

	            if (elementsReady === elements.length) {
	              onReadyCallback();
	            }
	          });
	          return;
	        }

	        debug && reporter.log(id, "Making detectable..."); //The element is not prepared to be detectable, so do prepare it and add a listener to it.

	        elementUtils.markBusy(element, true);
	        return detectionStrategy.makeDetectable({
	          debug: debug,
	          important: importantCssRules
	        }, element, function onElementDetectable(element) {
	          debug && reporter.log(id, "onElementDetectable");

	          if (stateHandler.getState(element)) {
	            elementUtils.markAsDetectable(element);
	            elementUtils.markBusy(element, false);
	            detectionStrategy.addListener(element, onResizeCallback);
	            addListener(callOnAdd, element, listener); // Since the element size might have changed since the call to "listenTo", we need to check for this change,
	            // so that a resize event may be emitted.
	            // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
	            // Also, check the state existance before since the element may have been uninstalled in the installation process.

	            var state = stateHandler.getState(element);

	            if (state && state.startSize) {
	              var width = element.offsetWidth;
	              var height = element.offsetHeight;

	              if (state.startSize.width !== width || state.startSize.height !== height) {
	                onResizeCallback(element);
	              }
	            }

	            if (onReadyCallbacks[id]) {
	              forEach(onReadyCallbacks[id], function (callback) {
	                callback();
	              });
	            }
	          } else {
	            // The element has been unisntalled before being detectable.
	            debug && reporter.log(id, "Element uninstalled before being detectable.");
	          }

	          delete onReadyCallbacks[id];
	          elementsReady++;

	          if (elementsReady === elements.length) {
	            onReadyCallback();
	          }
	        });
	      }

	      debug && reporter.log(id, "Already detecable, adding listener."); //The element has been prepared to be detectable and is ready to be listened to.

	      addListener(callOnAdd, element, listener);
	      elementsReady++;
	    });

	    if (elementsReady === elements.length) {
	      onReadyCallback();
	    }
	  }

	  function uninstall(elements) {
	    if (!elements) {
	      return reporter.error("At least one element is required.");
	    }

	    if (isElement(elements)) {
	      // A single element has been passed in.
	      elements = [elements];
	    } else if (isCollection(elements)) {
	      // Convert collection to array for plugins.
	      // TODO: May want to check so that all the elements in the collection are valid elements.
	      elements = toArray(elements);
	    } else {
	      return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
	    }

	    forEach(elements, function (element) {
	      eventListenerHandler.removeAllListeners(element);
	      detectionStrategy.uninstall(element);
	      stateHandler.cleanState(element);
	    });
	  }

	  function initDocument(targetDocument) {
	    detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
	  }

	  return {
	    listenTo: listenTo,
	    removeListener: eventListenerHandler.removeListener,
	    removeAllListeners: eventListenerHandler.removeAllListeners,
	    uninstall: uninstall,
	    initDocument: initDocument
	  };
	};

	function getOption(options, name, defaultValue) {
	  var value = options[name];

	  if ((value === undefined || value === null) && defaultValue !== undefined) {
	    return defaultValue;
	  }

	  return value;
	}

	var root$6 = _root;
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now$1 = function () {
	  return root$6.Date.now();
	};

	var now_1 = now$1;

	/** Used to match a single whitespace character. */
	var reWhitespace = /\s/;
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */

	function trimmedEndIndex$1(string) {
	  var index = string.length;

	  while (index-- && reWhitespace.test(string.charAt(index))) {}

	  return index;
	}

	var _trimmedEndIndex = trimmedEndIndex$1;

	var trimmedEndIndex = _trimmedEndIndex;
	/** Used to match leading whitespace. */

	var reTrimStart = /^\s+/;
	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */

	function baseTrim$1(string) {
	  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
	}

	var _baseTrim = baseTrim$1;

	var baseGetTag$2 = _baseGetTag,
	    isObjectLike$3 = isObjectLike_1;
	/** `Object#toString` result references. */

	var symbolTag$2 = '[object Symbol]';
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */

	function isSymbol$4(value) {
	  return typeof value == 'symbol' || isObjectLike$3(value) && baseGetTag$2(value) == symbolTag$2;
	}

	var isSymbol_1 = isSymbol$4;

	var baseTrim = _baseTrim,
	    isObject$4 = isObject_1,
	    isSymbol$3 = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var NAN = 0 / 0;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt = parseInt;
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */

	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol$3(value)) {
	    return NAN;
	  }

	  if (isObject$4(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$4(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	var toNumber_1 = toNumber$1;

	var isObject$3 = isObject_1,
	    now = now_1,
	    toNumber = toNumber_1;
	/** Error message constants. */

	var FUNC_ERROR_TEXT$1 = 'Expected a function';
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax = Math.max,
	    nativeMin = Math.min;
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */

	function debounce$1(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }

	  wait = toNumber(wait) || 0;

	  if (isObject$3(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	var debounce_1 = debounce$1;

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */

	function arrayMap$2(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }

	  return result;
	}

	var _arrayMap = arrayMap$2;

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */

	function listCacheClear$1() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear$1;

	var eq = eq_1;
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */

	function assocIndexOf$4(array, key) {
	  var length = array.length;

	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }

	  return -1;
	}

	var _assocIndexOf = assocIndexOf$4;

	var assocIndexOf$3 = _assocIndexOf;
	/** Used for built-in method references. */

	var arrayProto = Array.prototype;
	/** Built-in value references. */

	var splice = arrayProto.splice;
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function listCacheDelete$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$3(data, key);

	  if (index < 0) {
	    return false;
	  }

	  var lastIndex = data.length - 1;

	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }

	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete$1;

	var assocIndexOf$2 = _assocIndexOf;
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function listCacheGet$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$2(data, key);
	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet$1;

	var assocIndexOf$1 = _assocIndexOf;
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function listCacheHas$1(key) {
	  return assocIndexOf$1(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas$1;

	var assocIndexOf = _assocIndexOf;
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */

	function listCacheSet$1(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }

	  return this;
	}

	var _listCacheSet = listCacheSet$1;

	var listCacheClear = _listCacheClear,
	    listCacheDelete = _listCacheDelete,
	    listCacheGet = _listCacheGet,
	    listCacheHas = _listCacheHas,
	    listCacheSet = _listCacheSet;
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function ListCache$4(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `ListCache`.


	ListCache$4.prototype.clear = listCacheClear;
	ListCache$4.prototype['delete'] = listCacheDelete;
	ListCache$4.prototype.get = listCacheGet;
	ListCache$4.prototype.has = listCacheHas;
	ListCache$4.prototype.set = listCacheSet;
	var _ListCache = ListCache$4;

	var ListCache$3 = _ListCache;
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */

	function stackClear$1() {
	  this.__data__ = new ListCache$3();
	  this.size = 0;
	}

	var _stackClear = stackClear$1;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function stackDelete$1(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete$1;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function stackGet$1(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet$1;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function stackHas$1(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas$1;

	var getNative$5 = _getNative,
	    root$5 = _root;
	/* Built-in method references that are verified to be native. */

	var Map$4 = getNative$5(root$5, 'Map');
	var _Map = Map$4;

	var getNative$4 = _getNative;
	/* Built-in method references that are verified to be native. */

	var nativeCreate$4 = getNative$4(Object, 'create');
	var _nativeCreate = nativeCreate$4;

	var nativeCreate$3 = _nativeCreate;
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */

	function hashClear$1() {
	  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear$1;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function hashDelete$1(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete$1;

	var nativeCreate$2 = _nativeCreate;
	/** Used to stand-in for `undefined` hash values. */

	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
	/** Used for built-in method references. */

	var objectProto$5 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function hashGet$1(key) {
	  var data = this.__data__;

	  if (nativeCreate$2) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$1 ? undefined : result;
	  }

	  return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet$1;

	var nativeCreate$1 = _nativeCreate;
	/** Used for built-in method references. */

	var objectProto$4 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function hashHas$1(key) {
	  var data = this.__data__;
	  return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
	}

	var _hashHas = hashHas$1;

	var nativeCreate = _nativeCreate;
	/** Used to stand-in for `undefined` hash values. */

	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */

	function hashSet$1(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}

	var _hashSet = hashSet$1;

	var hashClear = _hashClear,
	    hashDelete = _hashDelete,
	    hashGet = _hashGet,
	    hashHas = _hashHas,
	    hashSet = _hashSet;
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function Hash$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `Hash`.


	Hash$1.prototype.clear = hashClear;
	Hash$1.prototype['delete'] = hashDelete;
	Hash$1.prototype.get = hashGet;
	Hash$1.prototype.has = hashHas;
	Hash$1.prototype.set = hashSet;
	var _Hash = Hash$1;

	var Hash = _Hash,
	    ListCache$2 = _ListCache,
	    Map$3 = _Map;
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */

	function mapCacheClear$1() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map$3 || ListCache$2)(),
	    'string': new Hash()
	  };
	}

	var _mapCacheClear = mapCacheClear$1;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */

	function isKeyable$1(value) {
	  var type = typeof value;
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	var _isKeyable = isKeyable$1;

	var isKeyable = _isKeyable;
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */

	function getMapData$4(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	var _getMapData = getMapData$4;

	var getMapData$3 = _getMapData;
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function mapCacheDelete$1(key) {
	  var result = getMapData$3(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete$1;

	var getMapData$2 = _getMapData;
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function mapCacheGet$1(key) {
	  return getMapData$2(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet$1;

	var getMapData$1 = _getMapData;
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function mapCacheHas$1(key) {
	  return getMapData$1(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas$1;

	var getMapData = _getMapData;
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */

	function mapCacheSet$1(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet$1;

	var mapCacheClear = _mapCacheClear,
	    mapCacheDelete = _mapCacheDelete,
	    mapCacheGet = _mapCacheGet,
	    mapCacheHas = _mapCacheHas,
	    mapCacheSet = _mapCacheSet;
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function MapCache$2(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	} // Add methods to `MapCache`.


	MapCache$2.prototype.clear = mapCacheClear;
	MapCache$2.prototype['delete'] = mapCacheDelete;
	MapCache$2.prototype.get = mapCacheGet;
	MapCache$2.prototype.has = mapCacheHas;
	MapCache$2.prototype.set = mapCacheSet;
	var _MapCache = MapCache$2;

	var ListCache$1 = _ListCache,
	    Map$2 = _Map,
	    MapCache$1 = _MapCache;
	/** Used as the size to enable large array optimizations. */

	var LARGE_ARRAY_SIZE = 200;
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */

	function stackSet$1(key, value) {
	  var data = this.__data__;

	  if (data instanceof ListCache$1) {
	    var pairs = data.__data__;

	    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }

	    data = this.__data__ = new MapCache$1(pairs);
	  }

	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet$1;

	var ListCache = _ListCache,
	    stackClear = _stackClear,
	    stackDelete = _stackDelete,
	    stackGet = _stackGet,
	    stackHas = _stackHas,
	    stackSet = _stackSet;
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function Stack$1(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	} // Add methods to `Stack`.


	Stack$1.prototype.clear = stackClear;
	Stack$1.prototype['delete'] = stackDelete;
	Stack$1.prototype.get = stackGet;
	Stack$1.prototype.has = stackHas;
	Stack$1.prototype.set = stackSet;
	var _Stack = Stack$1;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */

	function arrayEach$1(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }

	  return array;
	}

	var _arrayEach = arrayEach$1;

	var copyObject$4 = _copyObject,
	    keys$2 = keys_1;
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */

	function baseAssign$1(object, source) {
	  return object && copyObject$4(source, keys$2(source), object);
	}

	var _baseAssign = baseAssign$1;

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	function nativeKeysIn$1(object) {
	  var result = [];

	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _nativeKeysIn = nativeKeysIn$1;

	var isObject$2 = isObject_1,
	    isPrototype$1 = _isPrototype,
	    nativeKeysIn = _nativeKeysIn;
	/** Used for built-in method references. */

	var objectProto$3 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	function baseKeysIn$1(object) {
	  if (!isObject$2(object)) {
	    return nativeKeysIn(object);
	  }

	  var isProto = isPrototype$1(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
	      result.push(key);
	    }
	  }

	  return result;
	}

	var _baseKeysIn = baseKeysIn$1;

	var arrayLikeKeys = _arrayLikeKeys,
	    baseKeysIn = _baseKeysIn,
	    isArrayLike = isArrayLike_1;
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */

	function keysIn$3(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	var keysIn_1 = keysIn$3;

	var copyObject$3 = _copyObject,
	    keysIn$2 = keysIn_1;
	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */

	function baseAssignIn$1(object, source) {
	  return object && copyObject$3(source, keysIn$2(source), object);
	}

	var _baseAssignIn = baseAssignIn$1;

	var _cloneBuffer = {exports: {}};

	(function (module, exports) {
	  var root = _root;
	  /** Detect free variable `exports`. */

	  var freeExports = exports && !exports.nodeType && exports;
	  /** Detect free variable `module`. */

	  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	  /** Detect the popular CommonJS extension `module.exports`. */

	  var moduleExports = freeModule && freeModule.exports === freeExports;
	  /** Built-in value references. */

	  var Buffer = moduleExports ? root.Buffer : undefined,
	      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
	  /**
	   * Creates a clone of  `buffer`.
	   *
	   * @private
	   * @param {Buffer} buffer The buffer to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Buffer} Returns the cloned buffer.
	   */

	  function cloneBuffer(buffer, isDeep) {
	    if (isDeep) {
	      return buffer.slice();
	    }

	    var length = buffer.length,
	        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	    buffer.copy(result);
	    return result;
	  }

	  module.exports = cloneBuffer;
	})(_cloneBuffer, _cloneBuffer.exports);

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */

	function copyArray$1(source, array) {
	  var index = -1,
	      length = source.length;
	  array || (array = Array(length));

	  while (++index < length) {
	    array[index] = source[index];
	  }

	  return array;
	}

	var _copyArray = copyArray$1;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */

	function arrayFilter$1(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];

	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }

	  return result;
	}

	var _arrayFilter = arrayFilter$1;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */

	function stubArray$2() {
	  return [];
	}

	var stubArray_1 = stubArray$2;

	var arrayFilter = _arrayFilter,
	    stubArray$1 = stubArray_1;
	/** Used for built-in method references. */

	var objectProto$2 = Object.prototype;
	/** Built-in value references. */

	var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */

	var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function (object) {
	  if (object == null) {
	    return [];
	  }

	  object = Object(object);
	  return arrayFilter(nativeGetSymbols$1(object), function (symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};
	var _getSymbols = getSymbols$3;

	var copyObject$2 = _copyObject,
	    getSymbols$2 = _getSymbols;
	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */

	function copySymbols$1(source, object) {
	  return copyObject$2(source, getSymbols$2(source), object);
	}

	var _copySymbols = copySymbols$1;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */

	function arrayPush$3(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }

	  return array;
	}

	var _arrayPush = arrayPush$3;

	var overArg = _overArg;
	/** Built-in value references. */

	var getPrototype$3 = overArg(Object.getPrototypeOf, Object);
	var _getPrototype = getPrototype$3;

	var arrayPush$2 = _arrayPush,
	    getPrototype$2 = _getPrototype,
	    getSymbols$1 = _getSymbols,
	    stubArray = stubArray_1;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeGetSymbols = Object.getOwnPropertySymbols;
	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */

	var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function (object) {
	  var result = [];

	  while (object) {
	    arrayPush$2(result, getSymbols$1(object));
	    object = getPrototype$2(object);
	  }

	  return result;
	};
	var _getSymbolsIn = getSymbolsIn$2;

	var copyObject$1 = _copyObject,
	    getSymbolsIn$1 = _getSymbolsIn;
	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */

	function copySymbolsIn$1(source, object) {
	  return copyObject$1(source, getSymbolsIn$1(source), object);
	}

	var _copySymbolsIn = copySymbolsIn$1;

	var arrayPush$1 = _arrayPush,
	    isArray$5 = isArray_1;
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */

	function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray$5(object) ? result : arrayPush$1(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys$2;

	var baseGetAllKeys$1 = _baseGetAllKeys,
	    getSymbols = _getSymbols,
	    keys$1 = keys_1;
	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */

	function getAllKeys$1(object) {
	  return baseGetAllKeys$1(object, keys$1, getSymbols);
	}

	var _getAllKeys = getAllKeys$1;

	var baseGetAllKeys = _baseGetAllKeys,
	    getSymbolsIn = _getSymbolsIn,
	    keysIn$1 = keysIn_1;
	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */

	function getAllKeysIn$2(object) {
	  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
	}

	var _getAllKeysIn = getAllKeysIn$2;

	var getNative$3 = _getNative,
	    root$4 = _root;
	/* Built-in method references that are verified to be native. */

	var DataView$1 = getNative$3(root$4, 'DataView');
	var _DataView = DataView$1;

	var getNative$2 = _getNative,
	    root$3 = _root;
	/* Built-in method references that are verified to be native. */

	var Promise$2 = getNative$2(root$3, 'Promise');
	var _Promise = Promise$2;

	var getNative$1 = _getNative,
	    root$2 = _root;
	/* Built-in method references that are verified to be native. */

	var Set$2 = getNative$1(root$2, 'Set');
	var _Set = Set$2;

	var getNative = _getNative,
	    root$1 = _root;
	/* Built-in method references that are verified to be native. */

	var WeakMap$1 = getNative(root$1, 'WeakMap');
	var _WeakMap = WeakMap$1;

	var DataView = _DataView,
	    Map$1 = _Map,
	    Promise$1 = _Promise,
	    Set$1 = _Set,
	    WeakMap = _WeakMap,
	    baseGetTag$1 = _baseGetTag,
	    toSource = _toSource;
	/** `Object#toString` result references. */

	var mapTag$3 = '[object Map]',
	    objectTag$2 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$3 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';
	var dataViewTag$2 = '[object DataView]';
	/** Used to detect maps, sets, and weakmaps. */

	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map$1),
	    promiseCtorString = toSource(Promise$1),
	    setCtorString = toSource(Set$1),
	    weakMapCtorString = toSource(WeakMap);
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */

	var getTag$3 = baseGetTag$1; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

	if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag$3(new Map$1()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set$1 && getTag$3(new Set$1()) != setTag$3 || WeakMap && getTag$3(new WeakMap()) != weakMapTag$1) {
	  getTag$3 = function (value) {
	    var result = baseGetTag$1(value),
	        Ctor = result == objectTag$2 ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag$2;

	        case mapCtorString:
	          return mapTag$3;

	        case promiseCtorString:
	          return promiseTag;

	        case setCtorString:
	          return setTag$3;

	        case weakMapCtorString:
	          return weakMapTag$1;
	      }
	    }

	    return result;
	  };
	}

	var _getTag = getTag$3;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */

	function initCloneArray$1(array) {
	  var length = array.length,
	      result = new array.constructor(length); // Add properties assigned by `RegExp#exec`.

	  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }

	  return result;
	}

	var _initCloneArray = initCloneArray$1;

	var root = _root;
	/** Built-in value references. */

	var Uint8Array$1 = root.Uint8Array;
	var _Uint8Array = Uint8Array$1;

	var Uint8Array = _Uint8Array;
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */

	function cloneArrayBuffer$3(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer$3;

	var cloneArrayBuffer$2 = _cloneArrayBuffer;
	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */

	function cloneDataView$1(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	var _cloneDataView = cloneDataView$1;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */

	function cloneRegExp$1(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp$1;

	var Symbol$3 = _Symbol;
	/** Used to convert symbols to primitives and strings. */

	var symbolProto$1 = Symbol$3 ? Symbol$3.prototype : undefined,
	    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */

	function cloneSymbol$1(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol$1;

	var cloneArrayBuffer$1 = _cloneArrayBuffer;
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */

	function cloneTypedArray$1(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray$1;

	var cloneArrayBuffer = _cloneArrayBuffer,
	    cloneDataView = _cloneDataView,
	    cloneRegExp = _cloneRegExp,
	    cloneSymbol = _cloneSymbol,
	    cloneTypedArray = _cloneTypedArray;
	/** `Object#toString` result references. */

	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag$1 = '[object Symbol]';
	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$1 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */

	function initCloneByTag$1(object, tag, isDeep) {
	  var Ctor = object.constructor;

	  switch (tag) {
	    case arrayBufferTag$1:
	      return cloneArrayBuffer(object);

	    case boolTag$1:
	    case dateTag$1:
	      return new Ctor(+object);

	    case dataViewTag$1:
	      return cloneDataView(object, isDeep);

	    case float32Tag$1:
	    case float64Tag$1:
	    case int8Tag$1:
	    case int16Tag$1:
	    case int32Tag$1:
	    case uint8Tag$1:
	    case uint8ClampedTag$1:
	    case uint16Tag$1:
	    case uint32Tag$1:
	      return cloneTypedArray(object, isDeep);

	    case mapTag$2:
	      return new Ctor();

	    case numberTag$1:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag$1:
	      return cloneRegExp(object);

	    case setTag$2:
	      return new Ctor();

	    case symbolTag$1:
	      return cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag$1;

	var isObject$1 = isObject_1;
	/** Built-in value references. */

	var objectCreate = Object.create;
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */

	var baseCreate$1 = function () {
	  function object() {}

	  return function (proto) {
	    if (!isObject$1(proto)) {
	      return {};
	    }

	    if (objectCreate) {
	      return objectCreate(proto);
	    }

	    object.prototype = proto;
	    var result = new object();
	    object.prototype = undefined;
	    return result;
	  };
	}();

	var _baseCreate = baseCreate$1;

	var baseCreate = _baseCreate,
	    getPrototype$1 = _getPrototype,
	    isPrototype = _isPrototype;
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */

	function initCloneObject$1(object) {
	  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
	}

	var _initCloneObject = initCloneObject$1;

	var getTag$2 = _getTag,
	    isObjectLike$2 = isObjectLike_1;
	/** `Object#toString` result references. */

	var mapTag$1 = '[object Map]';
	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */

	function baseIsMap$1(value) {
	  return isObjectLike$2(value) && getTag$2(value) == mapTag$1;
	}

	var _baseIsMap = baseIsMap$1;

	var baseIsMap = _baseIsMap,
	    baseUnary$1 = _baseUnary,
	    nodeUtil$1 = _nodeUtil.exports;
	/* Node.js helper references. */

	var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */

	var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
	var isMap_1 = isMap$1;

	var getTag$1 = _getTag,
	    isObjectLike$1 = isObjectLike_1;
	/** `Object#toString` result references. */

	var setTag$1 = '[object Set]';
	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */

	function baseIsSet$1(value) {
	  return isObjectLike$1(value) && getTag$1(value) == setTag$1;
	}

	var _baseIsSet = baseIsSet$1;

	var baseIsSet = _baseIsSet,
	    baseUnary = _baseUnary,
	    nodeUtil = _nodeUtil.exports;
	/* Node.js helper references. */

	var nodeIsSet = nodeUtil && nodeUtil.isSet;
	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */

	var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
	var isSet_1 = isSet$1;

	var Stack = _Stack,
	    arrayEach = _arrayEach,
	    assignValue = _assignValue,
	    baseAssign = _baseAssign,
	    baseAssignIn = _baseAssignIn,
	    cloneBuffer = _cloneBuffer.exports,
	    copyArray = _copyArray,
	    copySymbols = _copySymbols,
	    copySymbolsIn = _copySymbolsIn,
	    getAllKeys = _getAllKeys,
	    getAllKeysIn$1 = _getAllKeysIn,
	    getTag = _getTag,
	    initCloneArray = _initCloneArray,
	    initCloneByTag = _initCloneByTag,
	    initCloneObject = _initCloneObject,
	    isArray$4 = isArray_1,
	    isBuffer = isBuffer$2.exports,
	    isMap = isMap_1,
	    isObject = isObject_1,
	    isSet = isSet_1,
	    keys = keys_1,
	    keysIn = keysIn_1;
	/** Used to compose bitmasks for cloning. */

	var CLONE_DEEP_FLAG$1 = 1,
	    CLONE_FLAT_FLAG$1 = 2,
	    CLONE_SYMBOLS_FLAG$1 = 4;
	/** `Object#toString` result references. */

	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	/** Used to identify `toStringTag` values supported by `_.clone`. */

	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag$1] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */

	function baseClone$1(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG$1,
	      isFlat = bitmask & CLONE_FLAT_FLAG$1,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }

	  if (result !== undefined) {
	    return result;
	  }

	  if (!isObject(value)) {
	    return value;
	  }

	  var isArr = isArray$4(value);

	  if (isArr) {
	    result = initCloneArray(value);

	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }

	    if (tag == objectTag$1 || tag == argsTag || isFunc && !object) {
	      result = isFlat || isFunc ? {} : initCloneObject(value);

	      if (!isDeep) {
	        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }

	      result = initCloneByTag(value, tag, isDeep);
	    }
	  } // Check for circular references and return its corresponding clone.


	  stack || (stack = new Stack());
	  var stacked = stack.get(value);

	  if (stacked) {
	    return stacked;
	  }

	  stack.set(value, result);

	  if (isSet(value)) {
	    value.forEach(function (subValue) {
	      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function (subValue, key) {
	      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
	    });
	  }

	  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys : isFlat ? keysIn : keys;
	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function (subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    } // Recursively populate clone (susceptible to call stack limits).


	    assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	var _baseClone = baseClone$1;

	var isArray$3 = isArray_1,
	    isSymbol$2 = isSymbol_1;
	/** Used to match property names within property paths. */

	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */

	function isKey$1(value, object) {
	  if (isArray$3(value)) {
	    return false;
	  }

	  var type = typeof value;

	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$2(value)) {
	    return true;
	  }

	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}

	var _isKey = isKey$1;

	var MapCache = _MapCache;
	/** Error message constants. */

	var FUNC_ERROR_TEXT = 'Expected a function';
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */

	function memoize$1(func, resolver) {
	  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  var memoized = function () {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }

	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };

	  memoized.cache = new (memoize$1.Cache || MapCache)();
	  return memoized;
	} // Expose `MapCache`.


	memoize$1.Cache = MapCache;
	var memoize_1 = memoize$1;

	var memoize = memoize_1;
	/** Used as the maximum memoize cache size. */

	var MAX_MEMOIZE_SIZE = 500;
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */

	function memoizeCapped$1(func) {
	  var result = memoize(func, function (key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }

	    return key;
	  });
	  var cache = result.cache;
	  return result;
	}

	var _memoizeCapped = memoizeCapped$1;

	var memoizeCapped = _memoizeCapped;
	/** Used to match property names within property paths. */

	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/** Used to match backslashes in property paths. */

	var reEscapeChar = /\\(\\)?/g;
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */

	var stringToPath$1 = memoizeCapped(function (string) {
	  var result = [];

	  if (string.charCodeAt(0) === 46
	  /* . */
	  ) {
	    result.push('');
	  }

	  string.replace(rePropName, function (match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});
	var _stringToPath = stringToPath$1;

	var Symbol$2 = _Symbol,
	    arrayMap$1 = _arrayMap,
	    isArray$2 = isArray_1,
	    isSymbol$1 = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var INFINITY$1 = 1 / 0;
	/** Used to convert symbols to primitives and strings. */

	var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */

	function baseToString$1(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }

	  if (isArray$2(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap$1(value, baseToString$1) + '';
	  }

	  if (isSymbol$1(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
	}

	var _baseToString = baseToString$1;

	var baseToString = _baseToString;
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */

	function toString$1(value) {
	  return value == null ? '' : baseToString(value);
	}

	var toString_1 = toString$1;

	var isArray$1 = isArray_1,
	    isKey = _isKey,
	    stringToPath = _stringToPath,
	    toString = toString_1;
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */

	function castPath$3(value, object) {
	  if (isArray$1(value)) {
	    return value;
	  }

	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	var _castPath = castPath$3;

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */

	function last$1(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? array[length - 1] : undefined;
	}

	var last_1 = last$1;

	var isSymbol = isSymbol_1;
	/** Used as references for various `Number` constants. */

	var INFINITY = 1 / 0;
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */

	function toKey$2(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	var _toKey = toKey$2;

	var castPath$2 = _castPath,
	    toKey$1 = _toKey;
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */

	function baseGet$1(object, path) {
	  path = castPath$2(path, object);
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey$1(path[index++])];
	  }

	  return index && index == length ? object : undefined;
	}

	var _baseGet = baseGet$1;

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */

	function baseSlice$1(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }

	  end = end > length ? length : end;

	  if (end < 0) {
	    end += length;
	  }

	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;
	  var result = Array(length);

	  while (++index < length) {
	    result[index] = array[index + start];
	  }

	  return result;
	}

	var _baseSlice = baseSlice$1;

	var baseGet = _baseGet,
	    baseSlice = _baseSlice;
	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */

	function parent$1(object, path) {
	  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
	}

	var _parent = parent$1;

	var castPath$1 = _castPath,
	    last = last_1,
	    parent = _parent,
	    toKey = _toKey;
	/**
	 * The base implementation of `_.unset`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The property path to unset.
	 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	 */

	function baseUnset$1(object, path) {
	  path = castPath$1(path, object);
	  object = parent(object, path);
	  return object == null || delete object[toKey(last(path))];
	}

	var _baseUnset = baseUnset$1;

	var baseGetTag = _baseGetTag,
	    getPrototype = _getPrototype,
	    isObjectLike = isObjectLike_1;
	/** `Object#toString` result references. */

	var objectTag = '[object Object]';
	/** Used for built-in method references. */

	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	/** Used to resolve the decompiled source of functions. */

	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */

	var hasOwnProperty = objectProto.hasOwnProperty;
	/** Used to infer the `Object` constructor. */

	var objectCtorString = funcToString.call(Object);
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */

	function isPlainObject$1(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }

	  var proto = getPrototype(value);

	  if (proto === null) {
	    return true;
	  }

	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject$1;

	var isPlainObject = isPlainObject_1;
	/**
	 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
	 * objects.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {string} key The key of the property to inspect.
	 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
	 */

	function customOmitClone$1(value) {
	  return isPlainObject(value) ? undefined : value;
	}

	var _customOmitClone = customOmitClone$1;

	var Symbol$1 = _Symbol,
	    isArguments = isArguments_1,
	    isArray = isArray_1;
	/** Built-in value references. */

	var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */

	function isFlattenable$1(value) {
	  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	var _isFlattenable = isFlattenable$1;

	var arrayPush = _arrayPush,
	    isFlattenable = _isFlattenable;
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */

	function baseFlatten$1(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];

	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }

	  return result;
	}

	var _baseFlatten = baseFlatten$1;

	var baseFlatten = _baseFlatten;
	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */

	function flatten$1(array) {
	  var length = array == null ? 0 : array.length;
	  return length ? baseFlatten(array, 1) : [];
	}

	var flatten_1 = flatten$1;

	var flatten = flatten_1,
	    overRest = _overRest,
	    setToString = _setToString;
	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */

	function flatRest$1(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	var _flatRest = flatRest$1;

	var arrayMap = _arrayMap,
	    baseClone = _baseClone,
	    baseUnset = _baseUnset,
	    castPath = _castPath,
	    copyObject = _copyObject,
	    customOmitClone = _customOmitClone,
	    flatRest = _flatRest,
	    getAllKeysIn = _getAllKeysIn;
	/** Used to compose bitmasks for cloning. */

	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable property paths of `object` that are not omitted.
	 *
	 * **Note:** This method is considerably slower than `_.pick`.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [paths] The property paths to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */

	var omit$1 = flatRest(function (object, paths) {
	  var result = {};

	  if (object == null) {
	    return result;
	  }

	  var isDeep = false;
	  paths = arrayMap(paths, function (path) {
	    path = castPath(path, object);
	    isDeep || (isDeep = path.length > 1);
	    return path;
	  });
	  copyObject(object, getAllKeysIn(object), result);

	  if (isDeep) {
	    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
	  }

	  var length = paths.length;

	  while (length--) {
	    baseUnset(result, paths[length]);
	  }

	  return result;
	});
	var omit_1 = omit$1;

	var propTypes$1 = {exports: {}};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = ReactPropTypesSecret_1$1;

	function emptyFunction() {}

	function emptyFunctionWithReset() {}

	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	var factoryWithThrowingShims = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }

	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
	  }
	  shim.isRequired = shim;

	  function getShim() {
	    return shim;
	  }
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,
	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };
	  ReactPropTypes.PropTypes = ReactPropTypes;
	  return ReactPropTypes;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  propTypes$1.exports = factoryWithThrowingShims();
	}

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var React$1 = react;
	var factory = factory_1;

	if (typeof React$1 === 'undefined') {
	  throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
	} // Hack to grab NoopUpdateQueue from isomorphic React


	var ReactNoopUpdateQueue = new React$1.Component().updater;
	var createReactClass$1 = factory(React$1.Component, React$1.isValidElement, ReactNoopUpdateQueue);

	var isBrowser = typeof window !== 'undefined';
	var Masonry = isBrowser ? window.Masonry || masonry.exports : null;
	var imagesloaded = isBrowser ? imagesloaded$1.exports : null;
	var assign = assign_1;
	var elementResizeDetectorMaker = elementResizeDetector;
	var debounce = debounce_1;
	var omit = omit_1;
	var PropTypes = propTypes$1.exports;
	var React = react;
	var createReactClass = createReactClass$1;
	var propTypes = {
	  enableResizableChildren: PropTypes.bool,
	  disableImagesLoaded: PropTypes.bool,
	  onImagesLoaded: PropTypes.func,
	  updateOnEachImageLoad: PropTypes.bool,
	  options: PropTypes.object,
	  imagesLoadedOptions: PropTypes.object,
	  elementType: PropTypes.string,
	  onLayoutComplete: PropTypes.func,
	  onRemoveComplete: PropTypes.func
	};
	var MasonryComponent = createReactClass({
	  masonry: false,
	  erd: undefined,
	  latestKnownDomChildren: [],
	  displayName: 'MasonryComponent',
	  imagesLoadedCancelRef: undefined,
	  propTypes: propTypes,
	  getDefaultProps: function () {
	    return {
	      enableResizableChildren: false,
	      disableImagesLoaded: false,
	      updateOnEachImageLoad: false,
	      options: {},
	      imagesLoadedOptions: {},
	      className: '',
	      elementType: 'div',
	      onLayoutComplete: function () {},
	      onRemoveComplete: function () {}
	    };
	  },
	  initializeMasonry: function (force) {
	    if (!this.masonry || force) {
	      this.masonry = new Masonry(this.masonryContainer, this.props.options);

	      if (this.props.onLayoutComplete) {
	        this.masonry.on('layoutComplete', this.props.onLayoutComplete);
	      }

	      if (this.props.onRemoveComplete) {
	        this.masonry.on('removeComplete', this.props.onRemoveComplete);
	      }

	      this.latestKnownDomChildren = this.getCurrentDomChildren();
	    }
	  },
	  getCurrentDomChildren: function () {
	    var node = this.masonryContainer;
	    var children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
	    return Array.prototype.slice.call(children);
	  },
	  diffDomChildren: function () {
	    var forceItemReload = false;
	    var knownChildrenStillAttached = this.latestKnownDomChildren.filter(function (element) {
	      /*
	       * take only elements attached to DOM
	       * (aka the parent is the masonry container, not null)
	       * otherwise masonry would try to "remove it" again from the DOM
	       */
	      return !!element.parentNode;
	    });
	    /*
	     * If not all known children are attached to the dom - we have no other way of notifying
	     * masonry to remove the ones not still attached besides invoking a complete item reload.
	     * basically all the rest of the code below does not matter in that case.
	     */

	    if (knownChildrenStillAttached.length !== this.latestKnownDomChildren.length) {
	      forceItemReload = true;
	    }

	    var currentDomChildren = this.getCurrentDomChildren();
	    /*
	     * Since we are looking for a known child which is also attached to the dom AND
	     * not attached to the dom at the same time - this would *always* produce an empty array.
	     */

	    var removed = knownChildrenStillAttached.filter(function (attachedKnownChild) {
	      return !~currentDomChildren.indexOf(attachedKnownChild);
	    });
	    /*
	     * This would get any children which are attached to the dom but are *unkown* to us
	     * from previous renders
	     */

	    var newDomChildren = currentDomChildren.filter(function (currentChild) {
	      return !~knownChildrenStillAttached.indexOf(currentChild);
	    });
	    var beginningIndex = 0; // get everything added to the beginning of the DOMNode list

	    var prepended = newDomChildren.filter(function (newChild) {
	      var prepend = beginningIndex === currentDomChildren.indexOf(newChild);

	      if (prepend) {
	        // increase the index
	        beginningIndex++;
	      }

	      return prepend;
	    }); // we assume that everything else is appended

	    var appended = newDomChildren.filter(function (el) {
	      return prepended.indexOf(el) === -1;
	    });
	    /*
	     * otherwise we reverse it because so we're going through the list picking off the items that
	     * have been added at the end of the list. this complex logic is preserved in case it needs to be
	     * invoked
	     *
	     * var endingIndex = currentDomChildren.length - 1;
	     *
	     * newDomChildren.reverse().filter(function(newChild, i){
	     *     var append = endingIndex == currentDomChildren.indexOf(newChild);
	     *
	     *     if (append) {
	     *         endingIndex--;
	     *     }
	     *
	     *     return append;
	     * });
	     */
	    // get everything added to the end of the DOMNode list

	    var moved = [];
	    /*
	     * This would always be true (see above about the lofic for "removed")
	     */

	    if (removed.length === 0) {
	      /*
	       * 'moved' will contain some random elements (if any) since the "knownChildrenStillAttached" is a filter
	       * of the "known" children which are still attached - All indexes could basically change. (for example
	       * if the first element is not attached)
	       * Don't trust this array.
	       */
	      moved = knownChildrenStillAttached.filter(function (child, index) {
	        return index !== currentDomChildren.indexOf(child);
	      });
	    }

	    this.latestKnownDomChildren = currentDomChildren;
	    return {
	      old: knownChildrenStillAttached,
	      // Not used
	      new: currentDomChildren,
	      // Not used
	      removed: removed,
	      appended: appended,
	      prepended: prepended,
	      moved: moved,
	      forceItemReload: forceItemReload
	    };
	  },
	  performLayout: function () {
	    var diff = this.diffDomChildren();
	    var reloadItems = diff.forceItemReload || diff.moved.length > 0; // Would never be true. (see comments of 'diffDomChildren' about 'removed')

	    if (diff.removed.length > 0) {
	      if (this.props.enableResizableChildren) {
	        diff.removed.forEach(this.erd.removeAllListeners, this.erd);
	      }

	      this.masonry.remove(diff.removed);
	      reloadItems = true;
	    }

	    if (diff.appended.length > 0) {
	      this.masonry.appended(diff.appended);

	      if (diff.prepended.length === 0) {
	        reloadItems = true;
	      }

	      if (this.props.enableResizableChildren) {
	        diff.appended.forEach(this.listenToElementResize, this);
	      }
	    }

	    if (diff.prepended.length > 0) {
	      this.masonry.prepended(diff.prepended);

	      if (this.props.enableResizableChildren) {
	        diff.prepended.forEach(this.listenToElementResize, this);
	      }
	    }

	    if (reloadItems) {
	      this.masonry.reloadItems();
	    }

	    this.masonry.layout();
	  },
	  derefImagesLoaded: function () {
	    this.imagesLoadedCancelRef();
	    this.imagesLoadedCancelRef = undefined;
	  },
	  imagesLoaded: function () {
	    if (this.props.disableImagesLoaded) {
	      return;
	    }

	    if (this.imagesLoadedCancelRef) {
	      this.derefImagesLoaded();
	    }

	    var event = this.props.updateOnEachImageLoad ? 'progress' : 'always';
	    var handler = debounce(function (instance) {
	      if (this.props.onImagesLoaded) {
	        this.props.onImagesLoaded(instance);
	      }

	      this.masonry.layout();
	    }.bind(this), 100);
	    var imgLoad = imagesloaded(this.masonryContainer, this.props.imagesLoadedOptions).on(event, handler);

	    this.imagesLoadedCancelRef = function () {
	      imgLoad.off(event, handler);
	      handler.cancel();
	    };
	  },
	  initializeResizableChildren: function () {
	    if (!this.props.enableResizableChildren) {
	      return;
	    }

	    this.erd = elementResizeDetectorMaker({
	      strategy: 'scroll'
	    });
	    this.latestKnownDomChildren.forEach(this.listenToElementResize, this);
	  },
	  listenToElementResize: function (el) {
	    this.erd.listenTo(el, function () {
	      this.masonry.layout();
	    }.bind(this));
	  },
	  destroyErd: function () {
	    if (this.erd) {
	      this.latestKnownDomChildren.forEach(this.erd.uninstall, this.erd);
	    }
	  },
	  componentDidMount: function () {
	    this.initializeMasonry();
	    this.initializeResizableChildren();
	    this.imagesLoaded();
	  },
	  componentDidUpdate: function () {
	    this.performLayout();
	    this.imagesLoaded();
	  },
	  componentWillUnmount: function () {
	    this.destroyErd(); // unregister events

	    if (this.props.onLayoutComplete) {
	      this.masonry.off('layoutComplete', this.props.onLayoutComplete);
	    }

	    if (this.props.onRemoveComplete) {
	      this.masonry.off('removeComplete', this.props.onRemoveComplete);
	    }

	    if (this.imagesLoadedCancelRef) {
	      this.derefImagesLoaded();
	    }

	    this.masonry.destroy();
	  },
	  setRef: function (n) {
	    this.masonryContainer = n;
	  },
	  render: function () {
	    var props = omit(this.props, Object.keys(propTypes));
	    return React.createElement(this.props.elementType, assign({}, props, {
	      ref: this.setRef
	    }), this.props.children);
	  }
	});
	lib.exports = MasonryComponent;

	lib.exports.default = MasonryComponent;

	var Masonry$1 = lib.exports;

	// jQuery based Ajax functions
	var AjaxFunctions = {
	  post: function post(url, data, done) {
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      contentType: 'application/json',
	      type: 'POST',
	      data: JSON.stringify(data),
	      success: function success(data) {
	        done(null, data);
	      },
	      error: function error(err) {
	        done(err);
	      }
	    });
	  },
	  put: function put(url, data, done) {
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      contentType: 'application/json',
	      type: 'PUT',
	      data: JSON.stringify(data),
	      success: function success(data) {
	        done(null, data);
	      },
	      error: function error(err) {
	        done(err);
	      }
	    });
	  },
	  get: function get(url, done) {
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'GET',
	      success: function success(data) {
	        done(null, data);
	      },
	      error: function error(err) {
	        done(err);
	      }
	    });
	  },
	  delete: function _delete(url, data, done) {
	    $.ajax({
	      type: "DELETE",
	      url: url,
	      data: JSON.stringify(data),
	      contentType: "application/json",
	      success: function (data) {
	        done(null, data);
	      }.bind(this),
	      error: function error(err) {
	        done(err);
	      },
	      dataType: 'json'
	    });
	  }
	};

	var Pic = react.createClass({
	  render: function render() {
	    var likeClass = this.props.liked ? "liked btn btn-default btn-sm" : 'like btn btn-default btn-sm';
	    var hideOnLoading = this.props.loading ? ' c-hide' : '';
	    var showOnLoading = this.props.loading ? '' : ' c-hide';
	    var disabledOnLoading = this.props.loading ? ' disabled' : '';
	    var dOLfn = this.props.userPicsDisabled;
	    if (!this.props.likeable) likeClass += ' disabled';
	    var deleteBtn = this.props.deletable ? /*#__PURE__*/react.createElement("div", {
	      className: "btn btn-default btn-sm",
	      onClick: this.props.delete
	    }, /*#__PURE__*/react.createElement("span", {
	      className: "glyphicon glyphicon-remove",
	      "aria-hidden": "true"
	    })) : null;
	    return /*#__PURE__*/react.createElement("div", {
	      className: "grid-item"
	    }, /*#__PURE__*/react.createElement("div", {
	      className: "main-img"
	    }, /*#__PURE__*/react.createElement("img", {
	      src: this.props.imgUrl,
	      onError: this.props.imgReplacer
	    }), /*#__PURE__*/react.createElement("p", null, this.props.description)), /*#__PURE__*/react.createElement("div", {
	      className: "info"
	    }, /*#__PURE__*/react.createElement("a", {
	      href: "#",
	      onClick: dOLfn ? null : this.props.getUserPics
	    }, /*#__PURE__*/react.createElement("img", {
	      src: this.props.ownerImg,
	      title: this.props.username,
	      onError: this.props.idReplacer
	    })), deleteBtn, /*#__PURE__*/react.createElement("div", {
	      className: likeClass + disabledOnLoading,
	      onClick: this.props.likeable ? this.props.like : null
	    }, /*#__PURE__*/react.createElement("span", {
	      className: "glyphicon glyphicon-star" + hideOnLoading,
	      "aria-hidden": "true"
	    }), /*#__PURE__*/react.createElement("span", {
	      className: "glyphicon glyphicon-hourglass" + showOnLoading,
	      "aria-hidden": "true"
	    }), "\xA0", this.props.likes ? this.props.likes : "0")));
	  }
	});

	var Nav = react.createClass({
	  submit: function submit(e) {
	    e.preventDefault();

	    if (this.refs.url.value) {
	      this.props.submit(this.refs.url.value, this.refs.desc.value);
	      this.refs.url.value = '';
	      this.refs.desc.value = '';
	    }
	  },
	  render: function render() {
	    var hideIfLoggedOut = this.props.loggedIn ? '' : ' hide';
	    var hideIfLoggedIn = this.props.loggedIn ? ' hide' : '';
	    var dOL = this.props.setPageDisabled;
	    var all = '';
	    var myPics = '';

	    switch (this.props.page) {
	      case 'all':
	        all = 'active';
	        break;

	      case 'myPics':
	        myPics = 'active';
	        break;
	    }

	    return /*#__PURE__*/react.createElement("nav", {
	      className: "navbar navbar-default"
	    }, /*#__PURE__*/react.createElement("div", {
	      className: "container"
	    }, /*#__PURE__*/react.createElement("div", {
	      className: "navbar-header"
	    }, /*#__PURE__*/react.createElement("button", {
	      type: "button",
	      className: "navbar-toggle collapsed",
	      "data-toggle": "collapse",
	      "data-target": "#bs-example-navbar-collapse-1",
	      "aria-expanded": "false"
	    }, /*#__PURE__*/react.createElement("span", {
	      className: "sr-only"
	    }, "Toggle navigation"), /*#__PURE__*/react.createElement("span", {
	      className: "icon-bar"
	    }), /*#__PURE__*/react.createElement("span", {
	      className: "icon-bar"
	    }), /*#__PURE__*/react.createElement("span", {
	      className: "icon-bar"
	    })), /*#__PURE__*/react.createElement("a", {
	      className: "navbar-brand",
	      href: "#"
	    }, /*#__PURE__*/react.createElement("img", {
	      alt: "Brand",
	      src: "https://cdn.freecodecamp.org/demo-projects/images/pinterest-logo.png",
	      className: "brand-img",
	      title: "Pic-terest"
	    }))), /*#__PURE__*/react.createElement("div", {
	      className: "collapse navbar-collapse",
	      id: "bs-example-navbar-collapse-1"
	    }, /*#__PURE__*/react.createElement("ul", {
	      className: "nav navbar-nav"
	    }, /*#__PURE__*/react.createElement("li", {
	      className: all
	    }, /*#__PURE__*/react.createElement("a", {
	      href: "#",
	      onClick: dOL ? null : this.props.setPage.bind(null, 'all')
	    }, "All ", /*#__PURE__*/react.createElement("span", {
	      className: "sr-only"
	    }, "(current)"))), /*#__PURE__*/react.createElement("li", {
	      className: myPics + hideIfLoggedOut
	    }, /*#__PURE__*/react.createElement("a", {
	      href: "#",
	      onClick: dOL ? null : this.props.setPage.bind(null, 'myPics')
	    }, "My Pics")), /*#__PURE__*/react.createElement("li", {
	      className: 'dropdown' + hideIfLoggedOut
	    }, /*#__PURE__*/react.createElement("a", {
	      href: "#",
	      className: "dropdown-toggle",
	      "data-toggle": "dropdown",
	      role: "button",
	      "aria-haspopup": "true",
	      "aria-expanded": "false"
	    }, "Add a Pic ", /*#__PURE__*/react.createElement("span", {
	      className: "caret"
	    })), /*#__PURE__*/react.createElement("div", {
	      className: "dropdown-menu"
	    }, /*#__PURE__*/react.createElement("form", {
	      className: "add-form",
	      onSubmit: dOL ? null : this.submit
	    }, /*#__PURE__*/react.createElement("input", {
	      type: "text",
	      ref: "url",
	      placeholder: "Pic url...",
	      className: "form-control"
	    }), /*#__PURE__*/react.createElement("input", {
	      type: "text",
	      ref: "desc",
	      placeholder: "Pic description...",
	      className: "form-control"
	    }), /*#__PURE__*/react.createElement("button", {
	      type: "submit",
	      className: "btn btn-primary btn-block"
	    }, "Send"))))), /*#__PURE__*/react.createElement("div", {
	      className: "nav navbar-nav navbar-right"
	    }, /*#__PURE__*/react.createElement("a", {
	      href: "/auth/github",
	      className: "btn btn-default navbar-btn" + hideIfLoggedIn
	    }, /*#__PURE__*/react.createElement("img", {
	      className: "gh-icon",
	      src: "https://cdn.freecodecamp.org/demo-projects/images/ghb_32.png"
	    }), " Login"), /*#__PURE__*/react.createElement("a", {
	      href: "/logout",
	      className: "btn btn-default navbar-btn" + hideIfLoggedOut
	    }, "Logout")))));
	  }
	});

	var appUrl = window.location.origin;
	var App = react.createClass({
	  componentDidMount: function componentDidMount() {
	    var self = this;
	    AjaxFunctions.get(appUrl + '/api/user', function (err, user) {
	      if (user.status !== 'unauthenticated') {
	        self.setState({
	          user: user,
	          loggedIn: true
	        });
	      } else {
	        self.setState({
	          user: {
	            github: {
	              username: 'guest'
	            }
	          },
	          loggedIn: false
	        });
	      }

	      self.getAllPics();
	    });
	  },
	  getAllPics: function getAllPics() {
	    var self = this;
	    this.setState({
	      pics: [],
	      loading: true
	    });
	    AjaxFunctions.get(appUrl + '/api/pics', function (err, data) {
	      self.setState({
	        pics: data,
	        page: 'all',
	        loading: false
	      });
	    });
	  },
	  getUserPicsbyId: function getUserPicsbyId(id, cb) {
	    AjaxFunctions.get(appUrl + '/api/pics/' + id, function (err, data) {
	      cb(data);
	    }.bind(this));
	  },
	  getUserPics: function getUserPics(index) {
	    this.setState({
	      pics: [],
	      loading: true
	    });
	    var id = this.state.pics[index].ownerId._id;
	    this.getUserPicsbyId(id, function (pics) {
	      this.setState({
	        pics: pics,
	        page: 'user',
	        loading: false
	      });
	    }.bind(this));
	  },
	  createPic: function createPic(url, desc) {
	    if (!url) return;
	    desc = desc || 'a pic by @' + this.state.user.github.username;
	    console.log(url, desc);
	    AjaxFunctions.post(appUrl + '/api/pics', {
	      url: url,
	      description: desc
	    }, function (err, d) {
	      if (err) {
	        return console.log(err);
	      }

	      var pics = this.state.pics;
	      pics.unshift(d);
	      this.setState({
	        pics: pics
	      });
	    }.bind(this));
	  },
	  likeHandler: function likeHandler(index) {
	    var self = this;
	    var id = this.state.pics[index]._id;
	    var liked = this.state.pics[index].likers.indexOf(this.state.user._id) !== -1;
	    var verbFn = liked ? AjaxFunctions.put : AjaxFunctions.post;
	    this.setState({
	      picLoading: index
	    });
	    verbFn(appUrl + '/api/pics/' + id, {}, function (err, d) {
	      var pics = self.state.pics;

	      if (liked) {
	        var i = d.likers.indexOf(self.state.user._id);
	        d.likers.splice(i, 1);
	        pics[index].likers = d.likers;
	      } else {
	        d.likers.push(self.state.user._id);
	        pics[index].likers = d.likers;
	      }

	      if (!self.state.loading) {
	        self.setState({
	          pics: pics,
	          picLoading: undefined
	        });
	      }
	    });
	  },
	  deletePic: function deletePic(index) {
	    var self = this;
	    var id = this.state.pics[index]._id;
	    AjaxFunctions.delete(appUrl + '/api/pics/' + id, {}, function (err, d) {
	      var pics = self.state.pics;
	      pics.splice(index, 1);
	      self.setState({
	        pics: pics
	      });
	    });
	  },
	  getInitialState: function getInitialState() {
	    return {
	      user: {
	        github: {}
	      },
	      page: 'all',
	      pics: []
	    };
	  },
	  imgReplacer: function imgReplacer(e) {
	    e.target.src = "https://cdn.freecodecamp.org/demo-projects/images/placeholder.png";
	  },
	  idReplacer: function idReplacer(e) {
	    e.target.src = "https://cdn.freecodecamp.org/demo-projects/images/ghb_32.png";
	  },
	  setPage: function setPage(page) {
	    var self = this;

	    switch (page) {
	      case 'all':
	        this.getAllPics();
	        break;

	      case 'myPics':
	        var id = this.state.user._id;
	        this.getUserPicsbyId(id, function (pics) {
	          self.setState({
	            pics: pics,
	            page: 'myPics'
	          });
	        });
	        break;
	    }
	  },
	  render: function render() {
	    var hide = this.state.loading ? '' : ' c-hide';
	    var self = this;
	    var pics = this.state.pics.map(function (p, i) {
	      console.log(p);
	      return /*#__PURE__*/react.createElement(Pic, {
	        key: i,
	        imgUrl: p.url,
	        description: p.description,
	        ownerImg: p.ownerId.github.imageUrl,
	        likeable: self.state.loggedIn,
	        username: '@' + p.ownerId.github.username,
	        getUserPics: self.getUserPics.bind(null, i),
	        liked: p.likers.indexOf(self.state.user._id) !== -1,
	        deletable: self.state.loggedIn && self.state.page === 'myPics' && p.ownerId._id === self.state.user._id,
	        likes: p.likers.length,
	        like: self.likeHandler.bind(null, i),
	        delete: self.deletePic.bind(null, i),
	        imgReplacer: self.imgReplacer,
	        idReplacer: self.idReplacer,
	        loading: self.state.picLoading === i,
	        userPicsDisabled: self.state.picLoading !== undefined
	      });
	    });
	    return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(Nav, {
	      submit: this.createPic,
	      loggedIn: this.state.loggedIn,
	      page: this.state.page,
	      setPage: this.setPage,
	      setPageDisabled: self.state.picLoading !== undefined
	    }), /*#__PURE__*/react.createElement("div", {
	      className: "container"
	    }, /*#__PURE__*/react.createElement("div", {
	      className: 'preloader' + hide
	    }, /*#__PURE__*/react.createElement("img", {
	      src: "https://pinterest-clone.freecodecamp.repl.co/assets/preloader.gif"
	    })), /*#__PURE__*/react.createElement(Masonry$1, {
	      className: 'grid',
	      options: {
	        // options
	        itemSelector: '.grid-item',
	        columnWidth: 200,
	        fitWidth: true
	      }
	    }, pics)));
	  }
	});
	reactDom.render( /*#__PURE__*/react.createElement(App, null), document.getElementById('appView'));

})();
