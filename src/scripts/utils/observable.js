class Observable {
  constructor(target) {
    this._listeners = [];
    this._proxy = this._createNestedProxy(target);
  }

  _createNestedProxy(target) {
    return new Proxy(target, {
      set: (obj, prop, value) => {
        if (typeof value === "object" && value !== null) {
          value = this._createNestedProxy(value);
        }
        obj[prop] = value;
        this._notify({ prop, value });
        return true;
      },
    });
  }

  observe(listener) {
    this._listeners.push(listener);
  }

  unobserve(listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  _notify(change) {
    for (const listener of this._listeners) {
      listener(change);
    }
  }

  get proxy() {
    return this._proxy;
  }
}

// 1. Create an object that you want to observe
const myObject = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
  },
};

// 2. Instantiate an Observable with the object
const observable = new Observable(myObject);

// 3. Define a callback function (listener) that will be called when the object or its nested properties change
function handleChange(change) {
  console.log("Change detected:", change);
}

// 4. Call the `observe` method of the `Observable` instance to register the callback function
observable.observe(handleChange);

// 5. Use the `proxy` property of the `Observable` instance to interact with the object
const myProxy = observable.proxy;

// Update top-level properties
myProxy.name = "Jane"; // handleChange will be called with { prop: "name", value: "Jane" }

// Update nested properties
myProxy.address.street = "456 Elm St"; // handleChange will be called with { prop: "street", value: "456 Elm St" }
