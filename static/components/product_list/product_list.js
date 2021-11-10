import { Product } from "../product/product.js";
import { rpc } from "../../core/rpc.js";
const { useDispatch, useStore } = owl.hooks;

const { Component } = owl;

export class ProductList extends Component {
    constructor(parent, props) {
        super(...arguments);
        this.dispatch = useDispatch();
        this.products = useStore((state) => state.products);
    }
    async willStart() {
        const data = await this.dispatch('getProducts');
        // const data = await rpc("/get_products", {});
        this.products = JSON.parse(data).products;
    }
}

ProductList.template = "Content";
ProductList.components = { Product };
