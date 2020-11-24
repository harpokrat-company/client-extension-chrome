/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./background/api.ts":
/*!***************************!*\
  !*** ./background/api.ts ***!
  \***************************/
/*! namespace exports */
/*! export addAccount [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getAllUserPasswords [provided] [no usage info] [missing usage info prevents renaming] */
/*! export login [provided] [no usage info] [missing usage info prevents renaming] */
/*! export modifyAccount [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => /* binding */ login,
/* harmony export */   "getAllUserPasswords": () => /* binding */ getAllUserPasswords,
/* harmony export */   "addAccount": () => /* binding */ addAccount,
/* harmony export */   "modifyAccount": () => /* binding */ modifyAccount
/* harmony export */ });
/* harmony import */ var worker_loader_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-loader!./worker */ "./node_modules/worker-loader/dist/cjs.js!./background/worker.ts");
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var worker = new worker_loader_worker__WEBPACK_IMPORTED_MODULE_0__.default();
console.log(worker);
worker.addEventListener("message", function (message) {
    if (message.data.message == "debug") {
        console.log(message.data);
    }
    else if (message.data.message == "debug-error") {
        console.log(message.data);
    }
    else if (message.data.message == "workerException") {
        (0,_messaging__WEBPACK_IMPORTED_MODULE_1__.send_all_tabs_message)("askLogin", {});
    }
    else {
        console.log(message);
    }
});
var jwtInterval = undefined;
var login = function (email, password) {
    if (jwtInterval != undefined) {
        clearInterval(jwtInterval);
    }
    jwtInterval = setInterval(function () {
        worker.postMessage({ message: "login", params: { email: email, password: password } });
        function loginEventListener(message) {
            if (message.data.message == "login-response") {
                console.log("INTERVAL-LOGIN-RESPONSE: " + JSON.stringify(message.data.token));
                worker.removeEventListener("message", loginEventListener);
            }
        }
        worker.addEventListener("message", loginEventListener);
    }, 10 * 60 * 1000);
    return new Promise(function (resolve, reject) {
        worker.postMessage({ message: "login", params: { email: email, password: password } });
        function loginEventListener(message) {
            if (message.data.message == "login-response") {
                console.log("LOGIN-RESPONSE: " + JSON.stringify(message.data.token));
                worker.removeEventListener("message", loginEventListener);
                resolve(message.data.token);
            }
        }
        worker.addEventListener("message", loginEventListener);
    });
};
var login_message_handler = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, login(params.email, params.password)];
            case 1:
                _a.sent();
                (0,_messaging__WEBPACK_IMPORTED_MODULE_1__.send_all_tabs_message)("closeAllLogins", {});
                return [2 /*return*/, { success: true }];
        }
    });
}); };
var getAllUserPasswords = function () {
    return new Promise(function (resolve, reject) {
        worker.postMessage({ message: "getAllUserPasswords" });
        function getAllPasswordsEventListener(message) {
            if (message.data.message == "getAllUserPasswords-response") {
                // console.log("GETALLUSERPASSWORDS-RESPONSE: " + JSON.stringify(message.data.passwords));
                worker.removeEventListener("message", getAllPasswordsEventListener);
                resolve(message.data.passwords);
            }
        }
        worker.addEventListener("message", getAllPasswordsEventListener);
    });
};
var addAccount = function (account) {
    return new Promise(function (resolve, reject) {
        worker.postMessage({ message: "addPassword", params: account });
        function addPasswordEventListener(message) {
            if (message.data.message == "addPassword-response") {
                // console.log("ADDPASSWORD-RESPONSE: " + JSON.stringify(message.data.success));
                worker.removeEventListener("message", addPasswordEventListener);
                resolve(message.data.passwords);
            }
        }
        worker.addEventListener("message", addPasswordEventListener);
    });
};
var modifyAccount = function (account) {
    return new Promise(function (resolve, reject) {
        worker.postMessage({ message: "modifyPassword", params: account });
        function modifyPasswordEventListener(message) {
            if (message.data.message == "modifyPassword-response") {
                // console.log("MODIFYPASSWORD-RESPONSE: " + JSON.stringify(message.data.success));
                worker.removeEventListener("message", modifyPasswordEventListener);
                resolve(message.data.passwords);
            }
        }
        worker.addEventListener("message", modifyPasswordEventListener);
    });
};
(0,_messaging__WEBPACK_IMPORTED_MODULE_1__.add_message_listener)("hpk_login", login_message_handler);


/***/ }),

/***/ "./background/background.ts":
/*!**********************************!*\
  !*** ./background/background.ts ***!
  \**********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _new_account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new_account */ "./background/new_account.ts");
/* harmony import */ var _find_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./find_account */ "./background/find_account.ts");
/* harmony import */ var _modify_account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modify_account */ "./background/modify_account.ts");
/* harmony import */ var _pending_accounts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending_accounts */ "./background/pending_accounts.ts");
/* harmony import */ var _pending_modification_accounts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pending_modification_accounts */ "./background/pending_modification_accounts.ts");
/* harmony import */ var _tests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tests */ "./background/tests.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






browser.runtime.onInstalled.addListener(function (_a) {
    var reason = _a.reason, temporary = _a.temporary;
    return __awaiter(this, void 0, void 0, function () {
        var _b, url;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: 
                // setup storage lists
                // storage['aled'] is used for dev testing purposes
                return [4 /*yield*/, browser.storage.local.set({ aled: [], account_parts: [], pending_accounts: [], pending_modification_accounts: [] })];
                case 1:
                    // setup storage lists
                    // storage['aled'] is used for dev testing purposes
                    _c.sent();
                    (0,_new_account__WEBPACK_IMPORTED_MODULE_0__.setup_new_account)();
                    (0,_find_account__WEBPACK_IMPORTED_MODULE_1__.setup_find_account)();
                    (0,_modify_account__WEBPACK_IMPORTED_MODULE_2__.setup_modify_account)();
                    (0,_pending_accounts__WEBPACK_IMPORTED_MODULE_3__.setup_pending_accounts_messages)();
                    (0,_pending_modification_accounts__WEBPACK_IMPORTED_MODULE_4__.setup_pending_modification_accounts_messages)();
                    // login("aled@oskour.fi", "aledoskour").then((_) => {
                    //   getAllUserPasswords()
                    // });
                    if (temporary) {
                        (0,_tests__WEBPACK_IMPORTED_MODULE_5__.run_tests)()
                            .then()
                            .catch(function (err) {
                            console.log(err);
                        });
                    }
                    _b = reason;
                    switch (_b) {
                        case "install": return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2:
                    if (temporary) {
                        // break;
                    }
                    url = browser.runtime.getURL("./installed.html");
                    return [4 /*yield*/, browser.tabs.create({ url: url })];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});


/***/ }),

/***/ "./background/find_account.ts":
/*!************************************!*\
  !*** ./background/find_account.ts ***!
  \************************************/
/*! namespace exports */
/*! export find_accounts_for_domain [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setup_find_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "find_accounts_for_domain": () => /* binding */ find_accounts_for_domain,
/* harmony export */   "setup_find_account": () => /* binding */ setup_find_account
/* harmony export */ });
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./background/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var find_accounts_for_domain = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var sender_url, accounts, matchedAccounts, _i, accounts_1, account, re;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sender_url = new URL(sender.tab.url);
                if (sender_url.host == "") {
                    sender_url = new URL("http://localhost");
                }
                return [4 /*yield*/, (0,_api__WEBPACK_IMPORTED_MODULE_1__.getAllUserPasswords)()];
            case 1:
                accounts = _a.sent();
                matchedAccounts = [];
                for (_i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
                    account = accounts_1[_i];
                    re = new RegExp(account.domain);
                    if (re.test(sender_url.host)) {
                        matchedAccounts.push(account);
                    }
                }
                if (accounts.length > 0) {
                    return [2 /*return*/, { success: true, accounts: matchedAccounts }];
                }
                return [2 /*return*/, { success: false }
                    // TEST PLACEHOLDER
                    // if (sender_url.host == "en.wikipedia.org") {
                    //   return { success: true, account: { "name": "en.wikipedia.org - Aledoskour", "user": "kapno.cc", "pass": "aledoskour", "domain": "en.wikipedia.org" } }
                    // }
                ];
        }
    });
}); };
function setup_find_account() {
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("find_account_for_domain", find_accounts_for_domain);
}


/***/ }),

/***/ "./background/messaging.ts":
/*!*********************************!*\
  !*** ./background/messaging.ts ***!
  \*********************************/
/*! namespace exports */
/*! export add_message_listener [provided] [no usage info] [missing usage info prevents renaming] */
/*! export send_all_tabs_message [provided] [no usage info] [missing usage info prevents renaming] */
/*! export send_current_tab_message [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "send_current_tab_message": () => /* binding */ send_current_tab_message,
/* harmony export */   "send_all_tabs_message": () => /* binding */ send_all_tabs_message,
/* harmony export */   "add_message_listener": () => /* binding */ add_message_listener
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// send message to currently viewed tab
var send_current_tab_message = function (message_type, params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, request, tabs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Math.floor(Math.random() * 100000000);
                request = { id: id, message_type: message_type, params: params };
                return [4 /*yield*/, browser.tabs.query({ active: true, currentWindow: true })];
            case 1:
                tabs = _a.sent();
                return [2 /*return*/, browser.tabs.sendMessage(tabs[0].id, request)];
        }
    });
}); };
// send message to all tabs
var send_all_tabs_message = function (message_type, params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, request, tabs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Math.floor(Math.random() * 100000000);
                request = { id: id, message_type: message_type, params: params };
                return [4 /*yield*/, browser.tabs.query({})];
            case 1:
                tabs = _a.sent();
                tabs.forEach(function (tab) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, browser.tabs.sendMessage(tab.id, request)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
// Simple wrapper used to receive (and respond to) messages from the content
// scripts and the Angular popup. handler's resolve value will be the answer
var add_message_listener = function (message_type, handler) {
    browser.runtime.onMessage.addListener(function (request, sender) {
        if (request.message_type == message_type) {
            return handler(request.params, sender);
        }
    });
};


/***/ }),

/***/ "./background/modify_account.ts":
/*!**************************************!*\
  !*** ./background/modify_account.ts ***!
  \**************************************/
/*! namespace exports */
/*! export setup_modify_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setup_modify_account": () => /* binding */ setup_modify_account
/* harmony export */ });
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./background/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var modify_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,_api__WEBPACK_IMPORTED_MODULE_1__.modifyAccount)(params)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
function setup_modify_account() {
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("modify_account", modify_account);
}


/***/ }),

/***/ "./background/new_account.ts":
/*!***********************************!*\
  !*** ./background/new_account.ts ***!
  \***********************************/
/*! namespace exports */
/*! export add_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! export add_account_part [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setup_new_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_account_part": () => /* binding */ add_account_part,
/* harmony export */   "add_account": () => /* binding */ add_account,
/* harmony export */   "setup_new_account": () => /* binding */ setup_new_account
/* harmony export */ });
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./background/storage.ts");
/* harmony import */ var _pending_accounts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pending_accounts */ "./background/pending_accounts.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./background/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var add_account_part = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var sender_url, acc, new_acc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sender_url = new URL(sender.tab.url);
                if (sender_url.host == "") {
                    sender_url = new URL("http://localhost");
                }
                if (!(params.fields.user !== "" && params.fields.pass !== "")) return [3 /*break*/, 2];
                return [4 /*yield*/, (0,_pending_accounts__WEBPACK_IMPORTED_MODULE_2__.add_pending_account)({ user: params.fields.user, pass: params.fields.pass }, sender)];
            case 1:
                _a.sent();
                return [3 /*break*/, 7];
            case 2:
                if (!params.final) return [3 /*break*/, 5];
                return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_1__.get_from_storage_list)('account_parts', { domain: sender_url.host })];
            case 3:
                acc = _a.sent();
                new_acc = { user: acc.user, pass: acc.pass };
                if (params.user != "")
                    new_acc.user = params.user;
                if (params.pass != "")
                    new_acc.pass = params.pass;
                // console.log({ user: new_acc.user, pass: new_acc.pass }, sender);
                return [4 /*yield*/, (0,_pending_accounts__WEBPACK_IMPORTED_MODULE_2__.add_pending_account)({ user: new_acc.user, pass: new_acc.pass }, sender)];
            case 4:
                // console.log({ user: new_acc.user, pass: new_acc.pass }, sender);
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_1__.push_storage_list)('account_parts', {
                    name: sender_url.host + " - " + params.fields.user,
                    user: params.fields.user,
                    pass: params.fields.pass,
                    domain: sender_url.host
                })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, { success: true }];
        }
    });
}); };
// params: {name: "", user: "", pass: "", domain: ""}
var add_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // console.log("added account: " + JSON.stringify(params))
            return [4 /*yield*/, (0,_api__WEBPACK_IMPORTED_MODULE_3__.addAccount)({
                    name: params.name,
                    domain: params.domain,
                    username: params.user,
                    password: params.pass,
                })];
            case 1:
                // console.log("added account: " + JSON.stringify(params))
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
function setup_new_account() {
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("add_account", add_account);
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("add_account_part", add_account_part);
}


/***/ }),

/***/ "./background/pending_accounts.ts":
/*!****************************************!*\
  !*** ./background/pending_accounts.ts ***!
  \****************************************/
/*! namespace exports */
/*! export add_pending_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! export delete_first_pending_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! export is_account_pending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export pending_accounts_tests [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setup_pending_accounts_messages [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_pending_account": () => /* binding */ add_pending_account,
/* harmony export */   "is_account_pending": () => /* binding */ is_account_pending,
/* harmony export */   "delete_first_pending_account": () => /* binding */ delete_first_pending_account,
/* harmony export */   "setup_pending_accounts_messages": () => /* binding */ setup_pending_accounts_messages,
/* harmony export */   "pending_accounts_tests": () => /* binding */ pending_accounts_tests
/* harmony export */ });
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
/* harmony import */ var _find_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./find_account */ "./background/find_account.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./background/storage.ts");
/* harmony import */ var _pending_modification_accounts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending_modification_accounts */ "./background/pending_modification_accounts.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var add_pending_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var sender_url, res, found_username, found, account, acc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sender_url = new URL(sender.tab.url);
                if (sender_url.host == "") {
                    sender_url = new URL("http://localhost");
                }
                return [4 /*yield*/, (0,_find_account__WEBPACK_IMPORTED_MODULE_1__.find_accounts_for_domain)({}, sender)
                    // console.log("added pending account: " + sender_url.host + " ; " + params.user + " ; " + params.pass)
                ];
            case 1:
                res = _a.sent();
                if (!res.success) return [3 /*break*/, 3];
                found_username = false;
                found = undefined;
                for (account in res.accounts) {
                    acc = res.accounts[account];
                    if (acc.username == params.user) {
                        found_username = true;
                        found = acc;
                        if (acc.password == params.pass) {
                            return [2 /*return*/, { success: true }];
                        }
                    }
                }
                if (!found_username) return [3 /*break*/, 3];
                found.username = params.user;
                found.password = params.pass;
                return [4 /*yield*/, (0,_pending_modification_accounts__WEBPACK_IMPORTED_MODULE_3__.add_pending_modification_account)(found, sender)];
            case 2:
                _a.sent();
                return [2 /*return*/, { success: true }];
            case 3: return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_2__.push_storage_list)('pending_accounts', {
                    name: sender_url.host + " - " + params.user,
                    user: params.user,
                    pass: params.pass,
                    domain: sender_url.host
                })];
            case 4:
                _a.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
var is_account_pending = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, elem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get(['pending_accounts'])];
            case 1:
                res = _a.sent();
                if (res.pending_accounts.length > 0) {
                    elem = res.pending_accounts[0];
                    return [2 /*return*/, { success: true, account: elem }];
                }
                else {
                    return [2 /*return*/, { success: false }];
                }
                return [2 /*return*/];
        }
    });
}); };
var delete_first_pending_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_2__.splice_storage_list)('pending_accounts', {})];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.send_all_tabs_message)("close_pending_account_modal", {})
                    // console.log("removed first pending account")
                ];
            case 2:
                _a.sent();
                // console.log("removed first pending account")
                return [2 /*return*/, { success: true }];
        }
    });
}); };
var setup_pending_accounts_messages = function () {
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("add_pending_account", add_pending_account);
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("is_account_pending", is_account_pending);
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("delete_first_pending_account", delete_first_pending_account);
};
/* =====================================
                TESTS
===================================== */
var pending_accounts_tests = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get(['pending_accounts'])];
            case 1:
                res = _a.sent();
                console.log(JSON.stringify(res));
                i = res['pending_accounts'].length;
                return [4 /*yield*/, add_pending_account({ user: "aledtest123", pass: "oskour" }, { tab: { url: "http://aled.oskour.fi" } })];
            case 2:
                _a.sent();
                return [4 /*yield*/, browser.storage.local.get(['pending_accounts'])];
            case 3:
                res = _a.sent();
                console.log(JSON.stringify(res));
                if (res['pending_accounts'].length != i + 1) {
                    throw new Error("did not add 1 pending account");
                }
                return [4 /*yield*/, is_account_pending()];
            case 4:
                res = _a.sent();
                if (!res.success) {
                    throw new Error("did not add 1 pending account");
                }
                return [4 /*yield*/, delete_first_pending_account({}, {})];
            case 5:
                _a.sent();
                return [4 /*yield*/, browser.storage.local.get(['pending_accounts'])];
            case 6:
                res = _a.sent();
                console.log(JSON.stringify(res));
                if (res['pending_accounts'].length != i) {
                    throw new Error("did not splice 1 pending account");
                }
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./background/pending_modification_accounts.ts":
/*!*****************************************************!*\
  !*** ./background/pending_modification_accounts.ts ***!
  \*****************************************************/
/*! namespace exports */
/*! export add_pending_modification_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! export delete_first_pending_modification_account [provided] [no usage info] [missing usage info prevents renaming] */
/*! export is_account_pending_modification [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setup_pending_modification_accounts_messages [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_pending_modification_account": () => /* binding */ add_pending_modification_account,
/* harmony export */   "is_account_pending_modification": () => /* binding */ is_account_pending_modification,
/* harmony export */   "delete_first_pending_modification_account": () => /* binding */ delete_first_pending_modification_account,
/* harmony export */   "setup_pending_modification_accounts_messages": () => /* binding */ setup_pending_modification_accounts_messages
/* harmony export */ });
/* harmony import */ var _messaging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messaging */ "./background/messaging.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./background/storage.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

// import { find_accounts_for_domain } from './find_account'

var add_pending_modification_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var sender_url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sender_url = new URL(sender.tab.url);
                if (sender_url.host == "") {
                    sender_url = new URL("http://localhost");
                }
                // let res = await find_accounts_for_domain({}, sender)
                return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_1__.push_storage_list)('pending_modification_accounts', params)
                    // console.log("added pending_modification account: " + sender_url.host + " ; " + params.username + " ; " + params.password)
                ];
            case 1:
                // let res = await find_accounts_for_domain({}, sender)
                _a.sent();
                // console.log("added pending_modification account: " + sender_url.host + " ; " + params.username + " ; " + params.password)
                return [2 /*return*/, { success: true }];
        }
    });
}); };
var is_account_pending_modification = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var res, elem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get(['pending_modification_accounts'])];
            case 1:
                res = _a.sent();
                if (res.pending_modification_accounts.length > 0) {
                    elem = res.pending_modification_accounts[0];
                    return [2 /*return*/, { success: true, account: elem }];
                }
                else {
                    return [2 /*return*/, { success: false }];
                }
                return [2 /*return*/];
        }
    });
}); };
var delete_first_pending_modification_account = function (params, sender) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_1__.splice_storage_list)('pending_modification_accounts', {})];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.send_all_tabs_message)("close_pending_modification_account_modal", {})];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.send_all_tabs_message)("close_fill_form_modal", {})
                    // console.log("removed first pending_modification account")
                ];
            case 3:
                _a.sent();
                // console.log("removed first pending_modification account")
                return [2 /*return*/, { success: true }];
        }
    });
}); };
var setup_pending_modification_accounts_messages = function () {
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("add_pending_modification_account", add_pending_modification_account);
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("is_account_pending_modification", is_account_pending_modification);
    (0,_messaging__WEBPACK_IMPORTED_MODULE_0__.add_message_listener)("delete_first_pending_modification_account", delete_first_pending_modification_account);
};


/***/ }),

/***/ "./background/storage.ts":
/*!*******************************!*\
  !*** ./background/storage.ts ***!
  \*******************************/
/*! namespace exports */
/*! export get_from_storage_list [provided] [no usage info] [missing usage info prevents renaming] */
/*! export push_storage_list [provided] [no usage info] [missing usage info prevents renaming] */
/*! export splice_storage_list [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storage_tests [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "push_storage_list": () => /* binding */ push_storage_list,
/* harmony export */   "get_from_storage_list": () => /* binding */ get_from_storage_list,
/* harmony export */   "splice_storage_list": () => /* binding */ splice_storage_list,
/* harmony export */   "storage_tests": () => /* binding */ storage_tests
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Takes a list from the extension's local storage, adds an element to it
var push_storage_list = function (key, elem) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get([key])];
            case 1:
                res = _b.sent();
                res[key].push(elem);
                return [2 /*return*/, browser.storage.local.set((_a = {}, _a[key] = res[key], _a))];
        }
    });
}); };
var get_from_storage_list = function (key, filter) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get([key])];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res[key].find(function (x) {
                        for (var _i = 0, _a = Object.entries(filter); _i < _a.length; _i++) {
                            var _b = _a[_i], i = _b[0], j = _b[1];
                            if (x[i] !== j) {
                                return false;
                            }
                        }
                        return true;
                    })];
        }
    });
}); };
// Takes a list from the extension's local storage, removes an element,
// found using .indexOf(filter)
var splice_storage_list = function (key, filter) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get([key])];
            case 1:
                res = _b.sent();
                res[key].splice(res[key].indexOf(filter), 1);
                return [2 /*return*/, browser.storage.local.set((_a = {}, _a[key] = res[key], _a))];
        }
    });
}); };
/* =====================================
                TESTS
===================================== */
var storage_tests = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.local.get(['aled'])];
            case 1:
                res = _a.sent();
                console.log(JSON.stringify(res));
                i = res['aled'].length;
                return [4 /*yield*/, push_storage_list('aled', { aled: "oskour" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, browser.storage.local.get(['aled'])];
            case 3:
                res = _a.sent();
                console.log(JSON.stringify(res));
                if (res['aled'].length != i + 1) {
                    throw new Error("did not add 1 element to storage list");
                }
                return [4 /*yield*/, splice_storage_list('aled', { aled: "oskour" })];
            case 4:
                _a.sent();
                return [4 /*yield*/, browser.storage.local.get(['aled'])];
            case 5:
                res = _a.sent();
                console.log(JSON.stringify(res));
                if (res['aled'].length != i) {
                    throw new Error("did not splice 1 element from storage list");
                }
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./background/tests.ts":
/*!*****************************!*\
  !*** ./background/tests.ts ***!
  \*****************************/
/*! namespace exports */
/*! export run_tests [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "run_tests": () => /* binding */ run_tests
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./background/storage.ts");
/* harmony import */ var _pending_accounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pending_accounts */ "./background/pending_accounts.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var run_tests = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("=================================================");
                console.log("STARTING TESTS");
                console.log("=================================================");
                return [4 /*yield*/, (0,_storage__WEBPACK_IMPORTED_MODULE_0__.storage_tests)()];
            case 1:
                _a.sent();
                console.log("ran local storage tests successfuly");
                console.log("=================================================");
                return [4 /*yield*/, (0,_pending_accounts__WEBPACK_IMPORTED_MODULE_1__.pending_accounts_tests)()];
            case 2:
                _a.sent();
                console.log("ran pending accounts tests successfuly");
                console.log("=================================================");
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./node_modules/worker-loader/dist/cjs.js!./background/worker.ts":
/*!***********************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./background/worker.ts ***!
  \***********************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new Worker(__webpack_require__.p + "background.bundled.worker.js");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/background/";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./background/background.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi8uL2JhY2tncm91bmQvYXBpLnRzIiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uLy4vYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uLy4vYmFja2dyb3VuZC9maW5kX2FjY291bnQudHMiLCJ3ZWJwYWNrOi8vZmlyZWZveC13ZWJleHRlbnNpb24vLi9iYWNrZ3JvdW5kL21lc3NhZ2luZy50cyIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi8uL2JhY2tncm91bmQvbW9kaWZ5X2FjY291bnQudHMiLCJ3ZWJwYWNrOi8vZmlyZWZveC13ZWJleHRlbnNpb24vLi9iYWNrZ3JvdW5kL25ld19hY2NvdW50LnRzIiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uLy4vYmFja2dyb3VuZC9wZW5kaW5nX2FjY291bnRzLnRzIiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uLy4vYmFja2dyb3VuZC9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50cy50cyIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi8uL2JhY2tncm91bmQvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi8uL2JhY2tncm91bmQvdGVzdHMudHMiLCJ3ZWJwYWNrOi8vZmlyZWZveC13ZWJleHRlbnNpb24vLi9iYWNrZ3JvdW5kL3dvcmtlci50cyIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmlyZWZveC13ZWJleHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9maXJlZm94LXdlYmV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2ZpcmVmb3gtd2ViZXh0ZW5zaW9uL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUMrQztBQUMyQjtBQUcxRSxJQUFJLE1BQU0sR0FBRyxJQUFJLHlEQUFTLEVBQUUsQ0FBQztBQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR3BCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxPQUFxQjtJQUNyRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRTtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtTQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksYUFBYSxFQUFFO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCO1NBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxpQkFBaUIsRUFBRTtRQUNsRCxpRUFBcUIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0tBQ3hDO1NBQU07UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsSUFBSSxXQUFXLEdBQVEsU0FBUyxDQUFDO0FBRTFCLElBQU0sS0FBSyxHQUFHLFVBQUMsS0FBYSxFQUFFLFFBQWdCO0lBQ2pELElBQUksV0FBVyxJQUFJLFNBQVMsRUFBRTtRQUMxQixhQUFhLENBQUMs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Q3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUM7Z0JBQ2hFLHFCQUFNLHlFQUFzQixFQUFFOztnQkFBOUIsU0FBOEI7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUM7Ozs7S0FDakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkRCw2QkFBZSxzQ0FBVztBQUMxQixvQkFBb0IscUJBQXVCO0FBQzNDOzs7Ozs7O1VDRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7V0NOQSx1Qzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IEFwaVdvcmtlciBmcm9tIFwid29ya2VyLWxvYWRlciEuL3dvcmtlclwiO1xuaW1wb3J0IHsgYWRkX21lc3NhZ2VfbGlzdGVuZXIsIHNlbmRfYWxsX3RhYnNfbWVzc2FnZSB9IGZyb20gJy4vbWVzc2FnaW5nJztcblxuXG52YXIgd29ya2VyID0gbmV3IEFwaVdvcmtlcigpO1xuY29uc29sZS5sb2cod29ya2VyKTtcblxuXG53b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIGlmIChtZXNzYWdlLmRhdGEubWVzc2FnZSA9PSBcImRlYnVnXCIpIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZS5kYXRhKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZGF0YS5tZXNzYWdlID09IFwiZGVidWctZXJyb3JcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLmRhdGEpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5kYXRhLm1lc3NhZ2UgPT0gXCJ3b3JrZXJFeGNlcHRpb25cIikge1xuICAgICAgICBzZW5kX2FsbF90YWJzX21lc3NhZ2UoXCJhc2tMb2dpblwiLCB7fSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICB9XG59KVxuXG52YXIgand0SW50ZXJ2YWw6IGFueSA9IHVuZGVmaW5lZDtcblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoand0SW50ZXJ2YWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoand0SW50ZXJ2YWwpXG4gICAgfVxuICAgIGp3dEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBtZXNzYWdlOiBcImxvZ2luXCIsIHBhcmFtczogeyBlbWFpbCwgcGFzc3dvcmQgfSB9KTtcbiAgICAgICAgZnVuY3Rpb24gbG9naW5FdmVudExpc3RlbmVyKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YS5tZXNzYWdlID09IFwibG9naW4tcmVzcG9uc2VcIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5URVJWQUwtTE9HSU4tUkVTUE9OU0U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZS5kYXRhLnRva2VuKSk7XG4gICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGxvZ2luRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbG9naW5FdmVudExpc3RlbmVyKTtcbiAgICB9LCAxMCAqIDYwICogMTAwMClcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBtZXNzYWdlOiBcImxvZ2luXCIsIHBhcmFtczogeyBlbWFpbCwgcGFzc3dvcmQgfSB9KTtcbiAgICAgICAgZnVuY3Rpb24gbG9naW5FdmVudExpc3RlbmVyKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZGF0YS5tZXNzYWdlID09IFwibG9naW4tcmVzcG9uc2VcIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTE9HSU4tUkVTUE9OU0U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZS5kYXRhLnRva2VuKSk7XG4gICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGxvZ2luRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1lc3NhZ2UuZGF0YS50b2tlbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbG9naW5FdmVudExpc3RlbmVyKTtcbiAgICB9KVxufVxuXG5jb25zdCBsb2dpbl9tZXNzYWdlX2hhbmRsZXIgPSBhc3luYyAocGFyYW1zOiBhbnksIHNlbmRlcjogYW55KSA9PiB7XG4gICAgYXdhaXQgbG9naW4ocGFyYW1zLmVtYWlsLCBwYXJhbXMucGFzc3dvcmQpO1xuICAgIHNlbmRfYWxsX3RhYnNfbWVzc2FnZShcImNsb3NlQWxsTG9naW5zXCIsIHt9KTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEFsbFVzZXJQYXNzd29yZHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgbWVzc2FnZTogXCJnZXRBbGxVc2VyUGFzc3dvcmRzXCIgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbFBhc3N3b3Jkc0V2ZW50TGlzdGVuZXIobWVzc2FnZTogTWVzc2FnZUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5kYXRhLm1lc3NhZ2UgPT0gXCJnZXRBbGxVc2VyUGFzc3dvcmRzLXJlc3BvbnNlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdFVEFMTFVTRVJQQVNTV09SRFMtUkVTUE9OU0U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZS5kYXRhLnBhc3N3b3JkcykpO1xuICAgICAgICAgICAgICAgIHdvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBnZXRBbGxQYXNzd29yZHNFdmVudExpc3RlbmVyKVxuICAgICAgICAgICAgICAgIHJlc29sdmUobWVzc2FnZS5kYXRhLnBhc3N3b3JkcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZ2V0QWxsUGFzc3dvcmRzRXZlbnRMaXN0ZW5lcik7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEFjY291bnQgPSAoYWNjb3VudDogYW55KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgbWVzc2FnZTogXCJhZGRQYXNzd29yZFwiLCBwYXJhbXM6IGFjY291bnQgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGFkZFBhc3N3b3JkRXZlbnRMaXN0ZW5lcihtZXNzYWdlOiBNZXNzYWdlRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEubWVzc2FnZSA9PSBcImFkZFBhc3N3b3JkLXJlc3BvbnNlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFERFBBU1NXT1JELVJFU1BPTlNFOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UuZGF0YS5zdWNjZXNzKSk7XG4gICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFkZFBhc3N3b3JkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1lc3NhZ2UuZGF0YS5wYXNzd29yZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFkZFBhc3N3b3JkRXZlbnRMaXN0ZW5lcik7XG4gICAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IG1vZGlmeUFjY291bnQgPSAoYWNjb3VudDogYW55KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgbWVzc2FnZTogXCJtb2RpZnlQYXNzd29yZFwiLCBwYXJhbXM6IGFjY291bnQgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG1vZGlmeVBhc3N3b3JkRXZlbnRMaXN0ZW5lcihtZXNzYWdlOiBNZXNzYWdlRXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmRhdGEubWVzc2FnZSA9PSBcIm1vZGlmeVBhc3N3b3JkLXJlc3BvbnNlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1PRElGWVBBU1NXT1JELVJFU1BPTlNFOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UuZGF0YS5zdWNjZXNzKSk7XG4gICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG1vZGlmeVBhc3N3b3JkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1lc3NhZ2UuZGF0YS5wYXNzd29yZHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG1vZGlmeVBhc3N3b3JkRXZlbnRMaXN0ZW5lcik7XG4gICAgfSlcbn1cblxuYWRkX21lc3NhZ2VfbGlzdGVuZXIoXCJocGtfbG9naW5cIiwgbG9naW5fbWVzc2FnZV9oYW5kbGVyKSIsIlxuaW1wb3J0IHsgc2V0dXBfbmV3X2FjY291bnQgfSBmcm9tICcuL25ld19hY2NvdW50J1xuaW1wb3J0IHsgc2V0dXBfZmluZF9hY2NvdW50IH0gZnJvbSAnLi9maW5kX2FjY291bnQnXG5pbXBvcnQgeyBzZXR1cF9tb2RpZnlfYWNjb3VudCB9IGZyb20gJy4vbW9kaWZ5X2FjY291bnQnXG5pbXBvcnQgeyBzZXR1cF9wZW5kaW5nX2FjY291bnRzX21lc3NhZ2VzIH0gZnJvbSAnLi9wZW5kaW5nX2FjY291bnRzJ1xuaW1wb3J0IHsgc2V0dXBfcGVuZGluZ19tb2RpZmljYXRpb25fYWNjb3VudHNfbWVzc2FnZXMgfSBmcm9tICcuL3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRzJ1xuaW1wb3J0IHsgcnVuX3Rlc3RzIH0gZnJvbSAnLi90ZXN0cydcbmltcG9ydCB7IGxvZ2luLCBnZXRBbGxVc2VyUGFzc3dvcmRzIH0gZnJvbSAnLi9hcGknXG5cbmJyb3dzZXIucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihhc3luYyBmdW5jdGlvbiAoeyByZWFzb24sIHRlbXBvcmFyeSB9OiBhbnkpIHtcbiAgLy8gc2V0dXAgc3RvcmFnZSBsaXN0c1xuICAvLyBzdG9yYWdlWydhbGVkJ10gaXMgdXNlZCBmb3IgZGV2IHRlc3RpbmcgcHVycG9zZXNcbiAgYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IGFsZWQ6IFtdLCBhY2NvdW50X3BhcnRzOiBbXSwgcGVuZGluZ19hY2NvdW50czogW10sIHBlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRzOiBbXSB9KVxuXG4gIHNldHVwX25ld19hY2NvdW50KClcbiAgc2V0dXBfZmluZF9hY2NvdW50KClcbiAgc2V0dXBfbW9kaWZ5X2FjY291bnQoKVxuICBzZXR1cF9wZW5kaW5nX2FjY291bnRzX21lc3NhZ2VzKClcbiAgc2V0dXBfcGVuZGluZ19tb2RpZmljYXRpb25fYWNjb3VudHNfbWVzc2FnZXMoKVxuXG4gIC8vIGxvZ2luKFwiYWxlZEBvc2tvdXIuZmlcIiwgXCJhbGVkb3Nrb3VyXCIpLnRoZW4oKF8pID0+IHtcbiAgLy8gICBnZXRBbGxVc2VyUGFzc3dvcmRzKClcbiAgLy8gfSk7XG5cbiAgaWYgKHRlbXBvcmFyeSkge1xuICAgIHJ1bl90ZXN0cygpXG4gICAgICAudGhlbigpXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICB9XG4gIHN3aXRjaCAocmVhc29uKSB7XG4gICAgY2FzZSBcImluc3RhbGxcIjpcbiAgICAgIHtcbiAgICAgICAgaWYgKHRlbXBvcmFyeSkge1xuICAgICAgICAgIC8vIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybCA9IGJyb3dzZXIucnVudGltZS5nZXRVUkwoXCIuL2luc3RhbGxlZC5odG1sXCIpO1xuICAgICAgICBhd2FpdCBicm93c2VyLnRhYnMuY3JlYXRlKHsgdXJsIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn0pXG4iLCJcbmltcG9ydCB7IGFkZF9tZXNzYWdlX2xpc3RlbmVyIH0gZnJvbSAnLi9tZXNzYWdpbmcnXG5pbXBvcnQgeyBnZXRBbGxVc2VyUGFzc3dvcmRzIH0gZnJvbSAnLi9hcGknXG5cbmV4cG9ydCBjb25zdCBmaW5kX2FjY291bnRzX2Zvcl9kb21haW4gPSBhc3luYyAocGFyYW1zOiBhbnksIHNlbmRlcjogYW55KSA9PiB7XG4gIGxldCBzZW5kZXJfdXJsID0gbmV3IFVSTChzZW5kZXIudGFiLnVybClcbiAgaWYgKHNlbmRlcl91cmwuaG9zdCA9PSBcIlwiKSB7XG4gICAgc2VuZGVyX3VybCA9IG5ldyBVUkwoXCJodHRwOi8vbG9jYWxob3N0XCIpXG4gIH1cbiAgY29uc3QgYWNjb3VudHM6IGFueSA9IGF3YWl0IGdldEFsbFVzZXJQYXNzd29yZHMoKTtcbiAgbGV0IG1hdGNoZWRBY2NvdW50cyA9IFtdO1xuXG4gIGZvciAoY29uc3QgYWNjb3VudCBvZiBhY2NvdW50cykge1xuICAgIGxldCByZSA9IG5ldyBSZWdFeHAoYWNjb3VudC5kb21haW4pXG4gICAgaWYgKHJlLnRlc3Qoc2VuZGVyX3VybC5ob3N0KSkge1xuICAgICAgbWF0Y2hlZEFjY291bnRzLnB1c2goYWNjb3VudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBhY2NvdW50czogbWF0Y2hlZEFjY291bnRzIH1cbiAgfVxuICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSB9XG5cbiAgLy8gVEVTVCBQTEFDRUhPTERFUlxuICAvLyBpZiAoc2VuZGVyX3VybC5ob3N0ID09IFwiZW4ud2lraXBlZGlhLm9yZ1wiKSB7XG4gIC8vICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYWNjb3VudDogeyBcIm5hbWVcIjogXCJlbi53aWtpcGVkaWEub3JnIC0gQWxlZG9za291clwiLCBcInVzZXJcIjogXCJrYXBuby5jY1wiLCBcInBhc3NcIjogXCJhbGVkb3Nrb3VyXCIsIFwiZG9tYWluXCI6IFwiZW4ud2lraXBlZGlhLm9yZ1wiIH0gfVxuICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cF9maW5kX2FjY291bnQoKSB7XG4gIGFkZF9tZXNzYWdlX2xpc3RlbmVyKFwiZmluZF9hY2NvdW50X2Zvcl9kb21haW5cIiwgZmluZF9hY2NvdW50c19mb3JfZG9tYWluKVxufVxuIiwiXG4vLyBzZW5kIG1lc3NhZ2UgdG8gY3VycmVudGx5IHZpZXdlZCB0YWJcbmV4cG9ydCBjb25zdCBzZW5kX2N1cnJlbnRfdGFiX21lc3NhZ2UgPSBhc3luYyAobWVzc2FnZV90eXBlOiBzdHJpbmcsIHBhcmFtczogYW55KSA9PiB7XG4gIGxldCBpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMClcbiAgbGV0IHJlcXVlc3QgPSB7IGlkOiBpZCwgbWVzc2FnZV90eXBlOiBtZXNzYWdlX3R5cGUsIHBhcmFtczogcGFyYW1zIH1cbiAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpXG4gIGxldCB0YWJzID0gYXdhaXQgYnJvd3Nlci50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0pXG4gIHJldHVybiBicm93c2VyLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgcmVxdWVzdClcbn1cblxuLy8gc2VuZCBtZXNzYWdlIHRvIGFsbCB0YWJzXG5leHBvcnQgY29uc3Qgc2VuZF9hbGxfdGFic19tZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2VfdHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSkgPT4ge1xuICBsZXQgaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApXG4gIGxldCByZXF1ZXN0ID0geyBpZDogaWQsIG1lc3NhZ2VfdHlwZTogbWVzc2FnZV90eXBlLCBwYXJhbXM6IHBhcmFtcyB9XG4gIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpKVxuICBsZXQgdGFicyA9IGF3YWl0IGJyb3dzZXIudGFicy5xdWVyeSh7fSlcbiAgdGFicy5mb3JFYWNoKGFzeW5jICh0YWIpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwgcmVxdWVzdClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG4vLyBTaW1wbGUgd3JhcHBlciB1c2VkIHRvIHJlY2VpdmUgKGFuZCByZXNwb25kIHRvKSBtZXNzYWdlcyBmcm9tIHRoZSBjb250ZW50XG4vLyBzY3JpcHRzIGFuZCB0aGUgQW5ndWxhciBwb3B1cC4gaGFuZGxlcidzIHJlc29sdmUgdmFsdWUgd2lsbCBiZSB0aGUgYW5zd2VyXG5leHBvcnQgY29uc3QgYWRkX21lc3NhZ2VfbGlzdGVuZXIgPSAobWVzc2FnZV90eXBlOiBzdHJpbmcsIGhhbmRsZXI6IGFueSkgPT4ge1xuICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0OiBhbnksIHNlbmRlcjogYW55KSA9PiB7XG4gICAgaWYgKHJlcXVlc3QubWVzc2FnZV90eXBlID09IG1lc3NhZ2VfdHlwZSkge1xuICAgICAgcmV0dXJuIGhhbmRsZXIocmVxdWVzdC5wYXJhbXMsIHNlbmRlcilcbiAgICB9XG4gIH0pXG59XG4iLCJcbmltcG9ydCB7IGFkZF9tZXNzYWdlX2xpc3RlbmVyIH0gZnJvbSAnLi9tZXNzYWdpbmcnXG5pbXBvcnQgeyBtb2RpZnlBY2NvdW50IH0gZnJvbSAnLi9hcGknXG5cbmNvbnN0IG1vZGlmeV9hY2NvdW50ID0gYXN5bmMgKHBhcmFtczogYW55LCBzZW5kZXI6IGFueSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcIm1vZGlmaWVkIGFjY291bnQ6IFwiICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSlcbiAgbGV0IHJlcyA9IGF3YWl0IG1vZGlmeUFjY291bnQocGFyYW1zKTtcblxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwX21vZGlmeV9hY2NvdW50KCkge1xuICBhZGRfbWVzc2FnZV9saXN0ZW5lcihcIm1vZGlmeV9hY2NvdW50XCIsIG1vZGlmeV9hY2NvdW50KVxufVxuIiwiXG5pbXBvcnQgeyBhZGRfbWVzc2FnZV9saXN0ZW5lciB9IGZyb20gJy4vbWVzc2FnaW5nJ1xuaW1wb3J0IHsgcHVzaF9zdG9yYWdlX2xpc3QsIGdldF9mcm9tX3N0b3JhZ2VfbGlzdCB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IGFkZF9wZW5kaW5nX2FjY291bnQgfSBmcm9tICcuL3BlbmRpbmdfYWNjb3VudHMnXG5pbXBvcnQgeyBhZGRBY2NvdW50IH0gZnJvbSAnLi9hcGknXG5cbmV4cG9ydCBjb25zdCBhZGRfYWNjb3VudF9wYXJ0ID0gYXN5bmMgKHBhcmFtczogYW55LCBzZW5kZXI6IGFueSkgPT4ge1xuICBsZXQgc2VuZGVyX3VybCA9IG5ldyBVUkwoc2VuZGVyLnRhYi51cmwpXG4gIGlmIChzZW5kZXJfdXJsLmhvc3QgPT0gXCJcIikge1xuICAgIHNlbmRlcl91cmwgPSBuZXcgVVJMKFwiaHR0cDovL2xvY2FsaG9zdFwiKVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpXG4gIGlmIChwYXJhbXMuZmllbGRzLnVzZXIgIT09IFwiXCIgJiYgcGFyYW1zLmZpZWxkcy5wYXNzICE9PSBcIlwiKSB7XG4gICAgYXdhaXQgYWRkX3BlbmRpbmdfYWNjb3VudCh7IHVzZXI6IHBhcmFtcy5maWVsZHMudXNlciwgcGFzczogcGFyYW1zLmZpZWxkcy5wYXNzIH0sIHNlbmRlcilcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLmZpbmFsKSB7XG4gICAgICBsZXQgYWNjID0gYXdhaXQgZ2V0X2Zyb21fc3RvcmFnZV9saXN0KCdhY2NvdW50X3BhcnRzJywgeyBkb21haW46IHNlbmRlcl91cmwuaG9zdCB9KVxuICAgICAgbGV0IG5ld19hY2MgPSB7IHVzZXI6IGFjYy51c2VyLCBwYXNzOiBhY2MucGFzcyB9XG4gICAgICBpZiAocGFyYW1zLnVzZXIgIT0gXCJcIilcbiAgICAgICAgbmV3X2FjYy51c2VyID0gcGFyYW1zLnVzZXJcbiAgICAgIGlmIChwYXJhbXMucGFzcyAhPSBcIlwiKVxuICAgICAgICBuZXdfYWNjLnBhc3MgPSBwYXJhbXMucGFzc1xuICAgICAgLy8gY29uc29sZS5sb2coeyB1c2VyOiBuZXdfYWNjLnVzZXIsIHBhc3M6IG5ld19hY2MucGFzcyB9LCBzZW5kZXIpO1xuICAgICAgYXdhaXQgYWRkX3BlbmRpbmdfYWNjb3VudCh7IHVzZXI6IG5ld19hY2MudXNlciwgcGFzczogbmV3X2FjYy5wYXNzIH0sIHNlbmRlcilcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgcHVzaF9zdG9yYWdlX2xpc3QoJ2FjY291bnRfcGFydHMnLCB7XG4gICAgICAgIG5hbWU6IHNlbmRlcl91cmwuaG9zdCArIFwiIC0gXCIgKyBwYXJhbXMuZmllbGRzLnVzZXIsXG4gICAgICAgIHVzZXI6IHBhcmFtcy5maWVsZHMudXNlcixcbiAgICAgICAgcGFzczogcGFyYW1zLmZpZWxkcy5wYXNzLFxuICAgICAgICBkb21haW46IHNlbmRlcl91cmwuaG9zdFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9XG59XG5cbi8vIHBhcmFtczoge25hbWU6IFwiXCIsIHVzZXI6IFwiXCIsIHBhc3M6IFwiXCIsIGRvbWFpbjogXCJcIn1cbmV4cG9ydCBjb25zdCBhZGRfYWNjb3VudCA9IGFzeW5jIChwYXJhbXM6IGFueSwgc2VuZGVyOiBhbnkpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJhZGRlZCBhY2NvdW50OiBcIiArIEpTT04uc3RyaW5naWZ5KHBhcmFtcykpXG4gIGF3YWl0IGFkZEFjY291bnQoe1xuICAgIG5hbWU6IHBhcmFtcy5uYW1lLFxuICAgIGRvbWFpbjogcGFyYW1zLmRvbWFpbixcbiAgICB1c2VybmFtZTogcGFyYW1zLnVzZXIsXG4gICAgcGFzc3dvcmQ6IHBhcmFtcy5wYXNzLFxuICB9KVxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwX25ld19hY2NvdW50KCkge1xuICBhZGRfbWVzc2FnZV9saXN0ZW5lcihcImFkZF9hY2NvdW50XCIsIGFkZF9hY2NvdW50KVxuICBhZGRfbWVzc2FnZV9saXN0ZW5lcihcImFkZF9hY2NvdW50X3BhcnRcIiwgYWRkX2FjY291bnRfcGFydClcbn1cbiIsIlxuaW1wb3J0IHsgYWRkX21lc3NhZ2VfbGlzdGVuZXIsIHNlbmRfYWxsX3RhYnNfbWVzc2FnZSB9IGZyb20gJy4vbWVzc2FnaW5nJ1xuaW1wb3J0IHsgZmluZF9hY2NvdW50c19mb3JfZG9tYWluIH0gZnJvbSAnLi9maW5kX2FjY291bnQnXG5pbXBvcnQgeyBzcGxpY2Vfc3RvcmFnZV9saXN0LCBwdXNoX3N0b3JhZ2VfbGlzdCB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IGFkZF9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50IH0gZnJvbSAnLi9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50cydcblxuZXhwb3J0IGNvbnN0IGFkZF9wZW5kaW5nX2FjY291bnQgPSBhc3luYyAocGFyYW1zOiBhbnksIHNlbmRlcjogYW55KSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpXG4gIGxldCBzZW5kZXJfdXJsID0gbmV3IFVSTChzZW5kZXIudGFiLnVybClcbiAgaWYgKHNlbmRlcl91cmwuaG9zdCA9PSBcIlwiKSB7XG4gICAgc2VuZGVyX3VybCA9IG5ldyBVUkwoXCJodHRwOi8vbG9jYWxob3N0XCIpXG4gIH1cbiAgbGV0IHJlcyA9IGF3YWl0IGZpbmRfYWNjb3VudHNfZm9yX2RvbWFpbih7fSwgc2VuZGVyKVxuICAvLyBjb25zb2xlLmxvZyhcImFkZGVkIHBlbmRpbmcgYWNjb3VudDogXCIgKyBzZW5kZXJfdXJsLmhvc3QgKyBcIiA7IFwiICsgcGFyYW1zLnVzZXIgKyBcIiA7IFwiICsgcGFyYW1zLnBhc3MpXG4gIGlmIChyZXMuc3VjY2Vzcykge1xuICAgIGxldCBmb3VuZF91c2VybmFtZSA9IGZhbHNlO1xuICAgIGxldCBmb3VuZCA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBhY2NvdW50IGluIHJlcy5hY2NvdW50cykge1xuICAgICAgbGV0IGFjYyA9IHJlcy5hY2NvdW50c1thY2NvdW50XSBhcyBhbnk7XG4gICAgICBpZiAoYWNjLnVzZXJuYW1lID09IHBhcmFtcy51c2VyKSB7XG4gICAgICAgIGZvdW5kX3VzZXJuYW1lID0gdHJ1ZTtcbiAgICAgICAgZm91bmQgPSBhY2NcbiAgICAgICAgaWYgKGFjYy5wYXNzd29yZCA9PSBwYXJhbXMucGFzcykge1xuICAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm91bmRfdXNlcm5hbWUpIHtcbiAgICAgIGZvdW5kLnVzZXJuYW1lID0gcGFyYW1zLnVzZXJcbiAgICAgIGZvdW5kLnBhc3N3b3JkID0gcGFyYW1zLnBhc3NcbiAgICAgIGF3YWl0IGFkZF9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50KGZvdW5kLCBzZW5kZXIpXG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbiAgICB9XG4gIH1cbiAgYXdhaXQgcHVzaF9zdG9yYWdlX2xpc3QoJ3BlbmRpbmdfYWNjb3VudHMnLCB7XG4gICAgbmFtZTogc2VuZGVyX3VybC5ob3N0ICsgXCIgLSBcIiArIHBhcmFtcy51c2VyLFxuICAgIHVzZXI6IHBhcmFtcy51c2VyLFxuICAgIHBhc3M6IHBhcmFtcy5wYXNzLFxuICAgIGRvbWFpbjogc2VuZGVyX3VybC5ob3N0XG4gIH0pXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxufVxuXG5leHBvcnQgY29uc3QgaXNfYWNjb3VudF9wZW5kaW5nID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgcmVzID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChbJ3BlbmRpbmdfYWNjb3VudHMnXSlcbiAgaWYgKChyZXMucGVuZGluZ19hY2NvdW50cyBhcyBhbnkpLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgZWxlbSA9IChyZXMucGVuZGluZ19hY2NvdW50cyBhcyBhbnkpWzBdXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgYWNjb3VudDogZWxlbSB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBkZWxldGVfZmlyc3RfcGVuZGluZ19hY2NvdW50ID0gYXN5bmMgKHBhcmFtczogYW55LCBzZW5kZXI6IGFueSkgPT4ge1xuICBhd2FpdCBzcGxpY2Vfc3RvcmFnZV9saXN0KCdwZW5kaW5nX2FjY291bnRzJywge30pXG4gIGF3YWl0IHNlbmRfYWxsX3RhYnNfbWVzc2FnZShcImNsb3NlX3BlbmRpbmdfYWNjb3VudF9tb2RhbFwiLCB7fSlcbiAgLy8gY29uc29sZS5sb2coXCJyZW1vdmVkIGZpcnN0IHBlbmRpbmcgYWNjb3VudFwiKVxuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNldHVwX3BlbmRpbmdfYWNjb3VudHNfbWVzc2FnZXMgPSAoKSA9PiB7XG4gIGFkZF9tZXNzYWdlX2xpc3RlbmVyKFwiYWRkX3BlbmRpbmdfYWNjb3VudFwiLCBhZGRfcGVuZGluZ19hY2NvdW50KVxuICBhZGRfbWVzc2FnZV9saXN0ZW5lcihcImlzX2FjY291bnRfcGVuZGluZ1wiLCBpc19hY2NvdW50X3BlbmRpbmcpXG4gIGFkZF9tZXNzYWdlX2xpc3RlbmVyKFwiZGVsZXRlX2ZpcnN0X3BlbmRpbmdfYWNjb3VudFwiLCBkZWxldGVfZmlyc3RfcGVuZGluZ19hY2NvdW50KVxufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgICAgICAgVEVTVFNcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmV4cG9ydCBjb25zdCBwZW5kaW5nX2FjY291bnRzX3Rlc3RzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgcmVzID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChbJ3BlbmRpbmdfYWNjb3VudHMnXSlcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSlcbiAgbGV0IGkgPSAocmVzWydwZW5kaW5nX2FjY291bnRzJ10gYXMgYW55KS5sZW5ndGg7XG4gIGF3YWl0IGFkZF9wZW5kaW5nX2FjY291bnQoeyB1c2VyOiBcImFsZWR0ZXN0MTIzXCIsIHBhc3M6IFwib3Nrb3VyXCIgfSwgeyB0YWI6IHsgdXJsOiBcImh0dHA6Ly9hbGVkLm9za291ci5maVwiIH0gfSlcbiAgcmVzID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChbJ3BlbmRpbmdfYWNjb3VudHMnXSlcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSlcbiAgaWYgKChyZXNbJ3BlbmRpbmdfYWNjb3VudHMnXSBhcyBhbnkpLmxlbmd0aCAhPSBpICsgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImRpZCBub3QgYWRkIDEgcGVuZGluZyBhY2NvdW50XCIpXG4gIH1cbiAgcmVzID0gYXdhaXQgaXNfYWNjb3VudF9wZW5kaW5nKClcbiAgaWYgKCFyZXMuc3VjY2Vzcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcImRpZCBub3QgYWRkIDEgcGVuZGluZyBhY2NvdW50XCIpXG4gIH1cbiAgYXdhaXQgZGVsZXRlX2ZpcnN0X3BlbmRpbmdfYWNjb3VudCh7fSwge30pXG4gIHJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoWydwZW5kaW5nX2FjY291bnRzJ10pXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpXG4gIGlmICgocmVzWydwZW5kaW5nX2FjY291bnRzJ10gYXMgYW55KS5sZW5ndGggIT0gaSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImRpZCBub3Qgc3BsaWNlIDEgcGVuZGluZyBhY2NvdW50XCIpXG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgYWRkX21lc3NhZ2VfbGlzdGVuZXIsIHNlbmRfYWxsX3RhYnNfbWVzc2FnZSB9IGZyb20gJy4vbWVzc2FnaW5nJ1xuLy8gaW1wb3J0IHsgZmluZF9hY2NvdW50c19mb3JfZG9tYWluIH0gZnJvbSAnLi9maW5kX2FjY291bnQnXG5pbXBvcnQgeyBzcGxpY2Vfc3RvcmFnZV9saXN0LCBwdXNoX3N0b3JhZ2VfbGlzdCB9IGZyb20gJy4vc3RvcmFnZSdcblxuZXhwb3J0IGNvbnN0IGFkZF9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50ID0gYXN5bmMgKHBhcmFtczogYW55LCBzZW5kZXI6IGFueSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKVxuICBsZXQgc2VuZGVyX3VybCA9IG5ldyBVUkwoc2VuZGVyLnRhYi51cmwpXG4gIGlmIChzZW5kZXJfdXJsLmhvc3QgPT0gXCJcIikge1xuICAgIHNlbmRlcl91cmwgPSBuZXcgVVJMKFwiaHR0cDovL2xvY2FsaG9zdFwiKVxuICB9XG4gIC8vIGxldCByZXMgPSBhd2FpdCBmaW5kX2FjY291bnRzX2Zvcl9kb21haW4oe30sIHNlbmRlcilcbiAgYXdhaXQgcHVzaF9zdG9yYWdlX2xpc3QoJ3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRzJywgcGFyYW1zKVxuICAvLyBjb25zb2xlLmxvZyhcImFkZGVkIHBlbmRpbmdfbW9kaWZpY2F0aW9uIGFjY291bnQ6IFwiICsgc2VuZGVyX3VybC5ob3N0ICsgXCIgOyBcIiArIHBhcmFtcy51c2VybmFtZSArIFwiIDsgXCIgKyBwYXJhbXMucGFzc3dvcmQpXG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxufVxuXG5leHBvcnQgY29uc3QgaXNfYWNjb3VudF9wZW5kaW5nX21vZGlmaWNhdGlvbiA9IGFzeW5jIChwYXJhbXM6IGFueSwgc2VuZGVyOiBhbnkpID0+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoWydwZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50cyddKVxuICBpZiAoKHJlcy5wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50cyBhcyBhbnkpLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgZWxlbSA9IChyZXMucGVuZGluZ19tb2RpZmljYXRpb25fYWNjb3VudHMgYXMgYW55KVswXVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGFjY291bnQ6IGVsZW0gfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlX2ZpcnN0X3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnQgPSBhc3luYyAocGFyYW1zOiBhbnksIHNlbmRlcjogYW55KSA9PiB7XG4gIGF3YWl0IHNwbGljZV9zdG9yYWdlX2xpc3QoJ3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRzJywge30pXG4gIGF3YWl0IHNlbmRfYWxsX3RhYnNfbWVzc2FnZShcImNsb3NlX3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRfbW9kYWxcIiwge30pXG4gIGF3YWl0IHNlbmRfYWxsX3RhYnNfbWVzc2FnZShcImNsb3NlX2ZpbGxfZm9ybV9tb2RhbFwiLCB7fSlcbiAgLy8gY29uc29sZS5sb2coXCJyZW1vdmVkIGZpcnN0IHBlbmRpbmdfbW9kaWZpY2F0aW9uIGFjY291bnRcIilcbiAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSB9XG59XG5cbmV4cG9ydCBjb25zdCBzZXR1cF9wZW5kaW5nX21vZGlmaWNhdGlvbl9hY2NvdW50c19tZXNzYWdlcyA9ICgpID0+IHtcbiAgYWRkX21lc3NhZ2VfbGlzdGVuZXIoXCJhZGRfcGVuZGluZ19tb2RpZmljYXRpb25fYWNjb3VudFwiLCBhZGRfcGVuZGluZ19tb2RpZmljYXRpb25fYWNjb3VudClcbiAgYWRkX21lc3NhZ2VfbGlzdGVuZXIoXCJpc19hY2NvdW50X3BlbmRpbmdfbW9kaWZpY2F0aW9uXCIsIGlzX2FjY291bnRfcGVuZGluZ19tb2RpZmljYXRpb24pXG4gIGFkZF9tZXNzYWdlX2xpc3RlbmVyKFwiZGVsZXRlX2ZpcnN0X3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnRcIiwgZGVsZXRlX2ZpcnN0X3BlbmRpbmdfbW9kaWZpY2F0aW9uX2FjY291bnQpXG59XG5cbiIsIlxuLy8gVGFrZXMgYSBsaXN0IGZyb20gdGhlIGV4dGVuc2lvbidzIGxvY2FsIHN0b3JhZ2UsIGFkZHMgYW4gZWxlbWVudCB0byBpdFxuZXhwb3J0IGNvbnN0IHB1c2hfc3RvcmFnZV9saXN0ID0gYXN5bmMgKGtleTogYW55LCBlbGVtOiBhbnkpID0+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoW2tleV0pO1xuICAocmVzW2tleV0gYXMgYW55KS5wdXNoKGVsZW0pO1xuICByZXR1cm4gYnJvd3Nlci5zdG9yYWdlLmxvY2FsLnNldCh7IFtrZXldOiByZXNba2V5XSB9KTtcbn1cblxuXG5leHBvcnQgY29uc3QgZ2V0X2Zyb21fc3RvcmFnZV9saXN0ID0gYXN5bmMgKGtleTogYW55LCBmaWx0ZXI6IGFueSkgPT4ge1xuICBsZXQgcmVzID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChba2V5XSlcbiAgcmV0dXJuIChyZXNba2V5XSBhcyBhbnkpLmZpbmQoKHg6IGFueSkgPT4ge1xuICAgIGZvciAoY29uc3QgW2ksIGpdIG9mIE9iamVjdC5lbnRyaWVzKGZpbHRlcikpIHtcbiAgICAgIGlmICh4W2ldICE9PSBqKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pXG59XG5cbi8vIFRha2VzIGEgbGlzdCBmcm9tIHRoZSBleHRlbnNpb24ncyBsb2NhbCBzdG9yYWdlLCByZW1vdmVzIGFuIGVsZW1lbnQsXG4vLyBmb3VuZCB1c2luZyAuaW5kZXhPZihmaWx0ZXIpXG5leHBvcnQgY29uc3Qgc3BsaWNlX3N0b3JhZ2VfbGlzdCA9IGFzeW5jIChrZXk6IGFueSwgZmlsdGVyOiBhbnkpID0+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoW2tleV0pO1xuICAocmVzW2tleV0gYXMgYW55KS5zcGxpY2UoKHJlc1trZXldIGFzIGFueSkuaW5kZXhPZihmaWx0ZXIpLCAxKTtcbiAgcmV0dXJuIGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5XTogcmVzW2tleV0gfSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAgICAgICBURVNUU1xuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5leHBvcnQgY29uc3Qgc3RvcmFnZV90ZXN0cyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5sb2NhbC5nZXQoWydhbGVkJ10pXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpXG4gIGxldCBpID0gKHJlc1snYWxlZCddIGFzIGFueSkubGVuZ3RoO1xuICBhd2FpdCBwdXNoX3N0b3JhZ2VfbGlzdCgnYWxlZCcsIHsgYWxlZDogXCJvc2tvdXJcIiB9KVxuICByZXMgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYWxlZCddKVxuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMpKVxuICBpZiAoKHJlc1snYWxlZCddIGFzIGFueSkubGVuZ3RoICE9IGkgKyAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZGlkIG5vdCBhZGQgMSBlbGVtZW50IHRvIHN0b3JhZ2UgbGlzdFwiKVxuICB9XG4gIGF3YWl0IHNwbGljZV9zdG9yYWdlX2xpc3QoJ2FsZWQnLCB7IGFsZWQ6IFwib3Nrb3VyXCIgfSlcbiAgcmVzID0gYXdhaXQgYnJvd3Nlci5zdG9yYWdlLmxvY2FsLmdldChbJ2FsZWQnXSlcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSlcbiAgaWYgKChyZXNbJ2FsZWQnXSBhcyBhbnkpLmxlbmd0aCAhPSBpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZGlkIG5vdCBzcGxpY2UgMSBlbGVtZW50IGZyb20gc3RvcmFnZSBsaXN0XCIpXG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgc3RvcmFnZV90ZXN0cyB9IGZyb20gJy4vc3RvcmFnZSdcbmltcG9ydCB7IHBlbmRpbmdfYWNjb3VudHNfdGVzdHMgfSBmcm9tICcuL3BlbmRpbmdfYWNjb3VudHMnXG5cbmV4cG9ydCBjb25zdCBydW5fdGVzdHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICBjb25zb2xlLmxvZyhcIlNUQVJUSU5HIFRFU1RTXCIpXG4gIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICBhd2FpdCBzdG9yYWdlX3Rlc3RzKClcbiAgY29uc29sZS5sb2coXCJyYW4gbG9jYWwgc3RvcmFnZSB0ZXN0cyBzdWNjZXNzZnVseVwiKVxuICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgYXdhaXQgcGVuZGluZ19hY2NvdW50c190ZXN0cygpXG4gIGNvbnNvbGUubG9nKFwicmFuIHBlbmRpbmcgYWNjb3VudHMgdGVzdHMgc3VjY2Vzc2Z1bHlcIilcbiAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFdvcmtlcihfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYmFja2dyb3VuZC5idW5kbGVkLndvcmtlci5qc1wiKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9iYWNrZ3JvdW5kL1wiOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9