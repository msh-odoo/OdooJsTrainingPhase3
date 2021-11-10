import { ProductDetails } from "../../components/product_detail/product_detail.js";
import { Header } from "../../components/header/header.js";
import { Footer } from "../../components/footer/footer.js";
import { registry } from "../../core/registry.js";

const { Component } = owl;

export class ProductDetailsScreen extends Component {
    constructor(parent, props) {
        super(...arguments);
        const params = props.params;
        this.productId = params.product_id;
    }

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    onclickBackToShop() {
        this.trigger('change-screen', { screen_name: 'shop', params: {} });
    }
}

ProductDetailsScreen.template = "productDetailsScreen";
ProductDetailsScreen.components = { Header, ProductDetails, Footer }

registry.category("screens").add("product_details", ProductDetailsScreen);
