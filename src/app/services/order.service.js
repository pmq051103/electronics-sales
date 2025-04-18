import SysFetch from "./fetch";

const OrderService = {
    fetchOrders: (params = {}) => {
        if (params.page !== undefined) {
            params.page = params.page - 1;
        }
        
        return SysFetch.get(`api/orders`, { params });
    },
    patchOrder : (id,data) => SysFetch.patch(`api/orders?id=${id}`,data)


}

export default OrderService;