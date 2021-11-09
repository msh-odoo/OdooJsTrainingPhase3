import { BaseComponent } from "../base_component.js";
import { Cart } from "./cart.js";
import { rpc } from "../../core/rpc.js";

export class Header extends BaseComponent {

    async mount(target) {
        await super.mount(...arguments);
        // TODO: MSH: manage current cart details in localstorage or maybe in session(session would be better)
        const cart = new Cart(this);
        await cart.mount(this.el);
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    // TODO: MSH: Search should be separate component
    async _onSearch(ev) {
        ev.preventDefault();
        const value = this.el.querySelector('.o_search_input').value.trim();
        const searchedProducts = await rpc("/search_products", {
            val: value,
        });
        this.trigger('update-screen', { currentScreen: 'shop', products: searchedProducts });
    }
}

Header.template = "Header";
Header.events = {
    'click .o_search_btn': '_onSearch'
};
