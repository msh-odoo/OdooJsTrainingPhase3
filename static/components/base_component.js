// TODO: MSH: What if someone wants to re-render component, we need to have re-render method
// something like owl which have render method which actually forcefully renders component

export class BaseComponent {
    /**
     * Initialising component
     *
     * @param {BaseComponent} parent 
     */
    constructor(parent) {
        this.parent = parent;
        this.template = this.constructor.template;
        this.__children = [];
        if (parent) {
            this.env = parent.env;
        }
        else {
            // we are the root component
            this.env = this.constructor.env;
        }
        this.setParent(parent);
    }

    //--------------------------------------------------------------------------
    // Life Cycle Methods
    //--------------------------------------------------------------------------

    /**
     * This method is called before component is rendered, this method ususally
     * does job of fetching required data before compoentn is rendered.
     * @returns Promise
     */
    willStart() {
        return Promise.resolve();
    }
    /**
     * destroys current component as well as it's child components
     *
     */
    destroy() {
        this.__children.forEach((child) => {
            child.destroy();
        });
        if (this.el) {
            this.el.remove();
        }
    }
    /**
     * This method takes target html element and mount current component
     * after target html element.
     *
     * @param {HTMLElement} target 
     */
    async mount(target) {
        await this.willStart();
        const html = this.render();
        if (this.template) {
            const doc = new DOMParser().parseFromString(html, "text/html");
            this.el = doc.body.firstElementChild;
        } else {
            this.el = html; // in case template is not given then we create div element using createElement
        }
        // TODO: MSH: What if there are multiple root node of component template
        // for (let child of doc.body.childNodes) {
        //     if (this.el) {
        //         this.el.insertAdjacentHTML("afterend", child);
        //     } else {
        //         this.el = child;
        //     }
        // }
        // TODO: MSH: Do not always append, position params should be passed in mount and element should be mounted at that position
        target.appendChild(this.el);
        this.bindEvents();
        this.mounted();
    }
    /**
     * This method takes qweb template given on component and renders it
     *
     * @returns rendered template i.e. generated html from qweb template
     */
    render() {
        let el;
        if (this.template) {
            el = this.env.qweb.render(this.template, { widget: this });
        } else {
            // el = this._makeDescriptive();
            el = document.createElement('div');
        }
        return el;
    }
    /**
     * Called after component is rendered and inserted into DOM
     *
     */
    mounted() {}

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * Binds events hash given on component to this.el
     */
    bindEvents() {
        const events = this.constructor.events;
        const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
        if (isEmpty(events)) { return; }

        for (let key in events) {
            if (!events.hasOwnProperty(key)) { continue; }

            const method = this.proxy(events[key]);

            const match = /^(\S+)(\s+(.*))?$/.exec(key);
            let event = match[1];
            const selector = match[3];

            if (!selector) {
                this.el.addEventListener(event, method);
            } else {
                [...this.el.querySelectorAll(selector)].forEach((elem) => {
                    elem.addEventListener(event, method);
                });
            }
        }
    }
    proxy(method) {
        var self = this;
        return function () {
            var fn = (typeof method === 'string') ? self[method] : method;
            if (fn === void 0) {
                throw new Error("Couldn't find method '" + method + "' in widget " + self);
            }
            return fn.apply(self, arguments);
        };
    }
    /**
     * Sets parent of current component so that parent child relationship is maintained
     *
     * @param {BaseComponent} parent 
     */
    setParent(parent) {
        if (parent) {
            parent.__children.push(this);
        }
    }
    /**
     * Helper function to trigger custom events on element
     *
     * @param {String} eventName 
     * @param {Object} eventDetails 
     */
    trigger(eventName, eventDetails) {
        const event = new CustomEvent(eventName, { detail: eventDetails, bubbles: true });
        this.el.dispatchEvent(event);
    }
}
BaseComponent.template = null;
