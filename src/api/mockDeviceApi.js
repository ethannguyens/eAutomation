import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const devices = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/devices/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/devices/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/devices/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/devices/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/devices/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (device) => {
  return replaceAll(device.title, ' ', '-');
};

class DeviceApi {
  static getAllDevices() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], devices));
      }, delay);
    });
  }

  static saveDevice(device) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minDeviceTitleLength = 1;
        if (device.title.length < minDeviceTitleLength) {
          reject(`Title must be at least ${minDeviceTitleLength} characters.`);
        }

        if (device.id) {
          const existingDeviceIndex = devices.findIndex(a => a.id == device.id);
          devices.splice(existingDeviceIndex, 1, device);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new devices in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          device.id = generateId(device);
          device.watchHref = `http://www.pluralsight.com/devices/${device.id}`;
          devices.push(device);
        }

        resolve(Object.assign({}, device));
      }, delay);
    });
  }

  static deleteDevice(deviceId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfDeviceToDelete = devices.findIndex(device => {
          device.deviceId == deviceId;
        });
        devices.splice(indexOfDeviceToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default DeviceApi;
