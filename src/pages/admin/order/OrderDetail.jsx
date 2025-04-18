import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../../app/redux/slices/order.slice";

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(fetchOrderById(id)).unwrap();
                setOrder(data);
            } catch (err) {
                console.error("Lỗi khi fetch đơn hàng:", err);
                setError("Không tìm thấy đơn hàng hoặc có lỗi xảy ra.");
            }
        };

        fetchData();
    }, [id, dispatch]);

    const getStatusLabel = (status) => {
        const statusMap = {
            "PENDING": { label: "Đang chờ", className: "bg-gray-100 text-gray-800" },
            "SHIPPING": { label: "Đang giao", className: "bg-blue-100 text-blue-600" },
            "COMPLETED": { label: "Hoàn thành", className: "bg-green-100 text-green-600" },
            "CANCELED": { label: "Đã hủy", className: "bg-red-100 text-red-600" }
        };
    
        const { label, className } = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };
        return <span className={`px-2 py-1 rounded-md ${className}`}>{label}</span>;
    };

    const getPaymentMethodLabel = (paymentMethod) => {
        const paymentMap = {
            COD: "COD",
            MOMO: "MoMo E-Wallet",
            ZALOPAY: "ZaloPay E-Wallet"
        };

        return paymentMap[paymentMethod] || paymentMethod;
    };

    const getDeliveryLabel = (delivery) => {
        const deliveryMap = {
            "STANDARD": "Standard",
            "VIETTEL_POST": "Viettel Post",
            "FAST_DELIVERY": "Giao hàng nhanh",
            "JT_EXPRESS": "J&T Express"
        };

        return deliveryMap[delivery] || delivery;
    };
    if (error) return <div className="text-red-500">{error}</div>;
    if (!order) return <div>Đang tải đơn hàng...</div>;
    
    const {
        orderCode,
        phoneNumber,
        totalPrice,
        status,
        paymentMethod,
        delivery,
        address,
        items = [],
    } = order;
    
    return (
        <div className="mt-4">
            <h2 className="text-l text-indigo-600 font-bold">Đơn hàng</h2>
            <div className="p-6 bg-white rounded-md shadow-md max-w mt-4 border border-gray-200">
                <div className="text-sm text-gray-800 space-y-3 mb-6">
                    <h3 className="font-bold mb-2 text-l">Thông tin đơn hàng</h3>
                    <div className="gap-y-1">
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Mã đơn hàng:</div>
                            <div className="text-l font-bold  ">{orderCode}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Số điện thoại:</div>
                            <div className="text-l font-medium ">{phoneNumber}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Tổng tiền:</div>
                            <div className="text-l font-medium ">{Number(totalPrice).toLocaleString()}</div>
                        </div>
                        <div className="flex mt-4">
                            <div className="w-40 font-medium text-l">Trạng thái:</div>
                            <div className="text-l font-medium">{getStatusLabel(status)}</div>
                        </div>
                        <div className="flex  mt-4">
                            <div className="w-40 font-medium text-l">Loại giao dịch:</div>
                            <div className="text-l font-medium" >{getPaymentMethodLabel(paymentMethod)}</div>
                        </div>
                        <div className="flex  mt-4">
                            <div className="w-40 font-medium text-l">Đơn vị vận chuyển:</div>
                            <div className="text-l font-medium ">{getDeliveryLabel(delivery)}</div>
                        </div>
                        <div className="col-span-2 flex mt-4">
                            <div className="w-40 font-medium text-l">Địa chỉ:</div>
                            <div className="text-l font-medium">{address}</div>
                        </div>
                    </div>
                </div>
    
                <div className="mb-6">
                    <h3 className="font-bold mb-2 text-l mt-4">Chi tiết đơn hàng</h3>
    
                    {/* Label hàng đầu */}
                    <div className="flex text-sm font-semibold text-gray-700 mb-2">
                        <div className="w-1/6 text-l font-medium mt-4">Mã sản phẩm</div>
                        <div className="w-1/6 text-l font-medium mt-4">Tên sản phẩm</div>
                        <div className="w-1/6 text-l font-medium mt-4">Màu sắc</div>
                        <div className="w-1/6 text-l font-medium mt-4">Đơn giá</div>
                        <div className="w-1/6 text-l font-medium mt-4">Số lượng</div>
                        <div className="w-1/6 text-l font-medium mt-4">Thành tiền</div>
                    </div>
    
                    {items.map((item, index) => (
                        <div key={index} className="flex text-sm text-gray-800 mb-1">
                            <div className="w-1/6 text-l font-medium mt-4">{item.sku}</div>
                            <div className="w-1/6 text-l font-medium mt-4">{item.name}</div>
                            <div className="w-1/6 text-l font-medium mt-4">{item.color || "-"}</div>
                            <div className="w-1/6 text-l font-medium mt-4">{Number(item.priceAtTime).toLocaleString()}</div>
                            <div className="w-1/6 text-l font-medium mt-4">{item.quantity}</div>
                            <div className="w-1/6 text-l font-medium mt-4">{Number(item.totalPrice).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={() => navigate(`/admin/orderList`)}
                    >
                        Quay lại
                    </button>                   
                </div>
            </div>
        </div>
    );
    
};

export default OrderDetail;
