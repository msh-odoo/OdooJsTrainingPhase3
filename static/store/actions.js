import { rpc } from "../core/rpc.js";

export const actions = {
    async getProducts({ state }) {
        return await rpc("/get_products", {});
    },
};
