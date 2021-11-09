function jsonrpc(rpcId, url, params, settings = {}) {
    // const bus = env.bus;
    const XHR = window.XMLHttpRequest;
    const data = {
        id: rpcId,
        jsonrpc: "2.0",
        method: "call",
        params: params,
    };
    const request = settings.xhr || new XHR();
    let rejectFn;
    const promise = new Promise((resolve, reject) => {
        rejectFn = reject;
        // if (!settings.silent) {
        //     bus.trigger("RPC:REQUEST", data.id);
        // }
        // handle success
        request.addEventListener("load", () => {
            if (request.status === 502) {
                // If Odoo is behind another server (eg.: nginx)
                // bus.trigger("RPC:RESPONSE", data.id);
                reject(new Error());
                return;
            }
            const { error: responseError, result: responseResult } = JSON.parse(request.response);
            // bus.trigger("RPC:RESPONSE", data.id);
            if (!responseError) {
                return resolve(responseResult);
            }
            const error = Error(responseError);
            reject(error);
        });
        // handle failure
        request.addEventListener("error", () => {
            // bus.trigger("RPC:RESPONSE", data.id);
            reject(new Error());
        });
        // configure and send request
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    });
    promise.abort = function () {
        if (request.abort) {
            request.abort();
        }
        rejectFn(new Error("XmlHttpRequestError abort"));
    };
    return promise;
}

let rpcId = 0;
export function rpc(route, params = {}, settings) {
    return jsonrpc(rpcId++, route, params, settings);
}
