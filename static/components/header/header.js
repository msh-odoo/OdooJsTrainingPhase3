import { Cart } from "./cart.js";
import { rpc } from "../../core/rpc.js";

const { Component } = owl;

// TODO: MSH: manage current cart details in localstorage or maybe in session(session would be better)

export class Header extends Component {

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
Header.components = { Cart };
