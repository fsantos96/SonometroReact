//Codigo para comunicarse con la api
const request = require('request-promise');
const baseApi = "http://localhost:3500/";

export function createNewManager(emailManager, managerid) {
    var options = {
        method: 'POST',
        uri: baseApi + "manager",
        body: {
            email: emailManager,
            id: managerid
        },
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function deleteManager(managerid) {
    var options = {
        method: 'DELETE',
        uri: baseApi + "manager?id=" + managerid,
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function getManagerList(managerId) {
    var param = managerId ? "?id=" + managerId : "";
    var options = {
        method: 'GET',
        uri: baseApi + "manager" + param,
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function getDeviceList(id) {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            uri: baseApi + "device?id=" + id,
            json: true
        };
    
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            console.log(error)
            reject();
        })
    });
}

export function updateDevice(device) {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'PUT',
            uri: baseApi + "device",
            json: true,
            body: {
                device: device
            },
        };
    
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            console.log(error)
            reject();
        })
    });
}
export function deleteDevice(deviceId) {
    var options = {
        method: 'DELETE',
        uri: baseApi + "device?id=" + deviceId,
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}

export function getAlertList() {
    var options = {
        method: 'GET',
        uri: baseApi + "alert",
        json: true
    };

    return new Promise((resolve, reject) => {
        request(options).then(data =>{
            resolve(data);
        }).catch(error => {
            reject();
        })
    });
}