import { BaseComponent } from "../base_component.js";

export class Product extends BaseComponent {
    constructor(parent, options) {
        super(...arguments);
        this.product = options.product;
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Finds product ID from event detail and opens product description page
     * @param {MouseEvent} ev 
     */
    onClickProduct(ev) {
        const productId = ev.currentTarget.dataset.id;
        this.trigger('change-screen', { screen_name: 'product_details', params: { product_id: productId } });
    }
}
Product.template = "Product";
Product.events = {
    'click': 'onClickProduct',
};
