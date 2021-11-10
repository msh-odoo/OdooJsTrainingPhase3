import { Product } from "../product/product.js";
import { rpc } from "../../core/rpc.js";

const { Component } = owl;

export class ProductList extends Component {
    async willStart() {
        const data = await rpc("/get_products", {});
        this.products = JSON.parse(data).products;
    }
}

ProductList.template = "Content";
ProductList.components = { Product };
