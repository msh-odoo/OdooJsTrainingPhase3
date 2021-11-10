import { rpc } from "../../core/rpc.js";

const { Component } = owl;

export class ProductDetails extends Component {
    constructor(parent, props) {
        super(...arguments);
        this.productId = props.productId;
    }
    async willStart() {
        this.product = await rpc("/get_product_details", { product_id: this.productId });
    }
}
ProductDetails.template = "ProductDetails";
