
const { Component } = owl;

export class Product extends Component {
    constructor(parent, props) {
        super(...arguments);
        this.product = props.product;
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
