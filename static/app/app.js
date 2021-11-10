import { rpc } from "../core/rpc.js";
import { registry } from "../core/registry.js";

const { Component, mount } = owl;
const { useState } = owl.hooks;
const { whenReady } = owl.utils;

// TODO: MSH: Add unit tests, maybe use Qunit/jest/mocha test runner lib for testing

// TODO: MSH: Introduce model part which stores data of application, we should use MVVM pattern

export class App extends Component {
    constructor() {
        super(...arguments);
        this.state = useState({ currentScreen: 'shop', params: {} });
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    async _onChangeScreen(ev) {
        // TODO: MSH: When screen is changed, always add some state to url so that refreshing a browser
        // should load proper screen from url state
        const screenName = ev.detail.screen_name;
        const params = ev.detail.params;
        this.state.currentScreen = screenName;
        this.state.params = params;
    }

    _onUpdateScreen(ev) {
        debugger;
    }
}
App.template = "App";
App.components = {};

const screenRegistry = registry.category("screens");
screenRegistry.getEntries().forEach((comp) => {
    App.components[comp[1].name] = comp[1];
});

const setup = async () => {
    let templates = await rpc("/load-qweb", {});
    const env = {
        qweb: new owl.QWeb()
    };
    env.qweb.addTemplates(templates);
    mount(App, { env, target: document.body });
};

whenReady(setup);
