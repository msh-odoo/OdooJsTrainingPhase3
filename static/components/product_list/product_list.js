import { BaseComponent } from "../base_component.js";
import { Product } from "../product/product.js";
import { rpc } from "../../core/rpc.js";

export class ProductList extends BaseComponent {
    async willStart() {
        const data = await rpc("/get_products", {});
        this.products = JSON.parse(data).products;
    }
    async mount(target) {
        await super.mount(...arguments);
        this.productComponents = [];
        this.products.forEach(product => {
            const productInstance = new Product(this, { product });
            this.productComponents.push(productInstance);
            const elem = this.el.querySelectorAll(`[data-product-id='${product.id}']`);
            productInstance.mount(elem[0]);
        });
    }
}

ProductList.template = "Content";
