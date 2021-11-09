import { rpc } from "../core/rpc.js";
// import { registry } from "../core/registry.js";

const { Component, mount } = owl;
const { whenReady } = owl.utils;

// TODO: MSH: Add unit tests, maybe use Qunit/jest/mocha test runner lib for testing

// TODO: MSH: Introduce model part which stores data of application, we should use MVVM pattern

export class App extends Component {
    // async mount(target) {
    //     await super.mount(target);
    //     const screenRegistry = registry.category("screens");
    //     const Shop = screenRegistry.get('shop');
    //     this.currentScreen = new Shop(this);
    //     await this.currentScreen.mount(this.el);
    // }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    // async _onChangeScreen(ev) {
    //     // TODO: MSH: When screen is changed, always add some state to url so that refreshing a browser
    //     // should load proper screen from url state
    //     this.currentScreen.destroy();
    //     const screenName = ev.detail.screen_name;
    //     const params = ev.detail.params;
    //     const screenRegistry = registry.category("screens");
    //     const CurrentScreen = screenRegistry.get(screenName);
    //     this.currentScreen = new CurrentScreen(this, params);
    //     await this.currentScreen.mount(this.el);
    // }

    _onUpdateScreen(ev) {
        debugger;
    }
}
App.template = "App";
// App.events = {
//     'change-screen': '_onChangeScreen',
//     'update-screen': '_onUpdateScreen'
// };

const setup = async () => {
    let templates = await rpc("/load-qweb", {});
    const env = {
        qweb: new owl.QWeb()
    };
    env.qweb.addTemplates(templates);
    mount(App, { env, target: document.body });
};

whenReady(setup);
