import { ProductList } from "../../components/product_list/product_list.js";
import { Header } from "../../components/header/header.js";
import { Footer } from "../../components/footer/footer.js";
import { registry } from "../../core/registry.js";

const { Component } = owl;

export class Shop extends Component {

}
Shop.template = "ShopScreen";
Shop.components = { Header, ProductList, Footer };

registry.category("screens").add("shop", Shop);
