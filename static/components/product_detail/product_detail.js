import { BaseComponent } from "../base_component.js";
import { rpc } from "../../core/rpc.js";

export class ProductDetails extends BaseComponent {
    constructor(parent, productId) {
        super(...arguments);
        this.productId = productId;
    }
    async willStart() {
        this.product = await rpc("/get_product_details", { product_id: this.productId });
    }
}
ProductDetails.template = "ProductDetails";
