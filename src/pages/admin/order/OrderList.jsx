import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOrders } from "../../../app/redux/slices/order.slice";
import { FaEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import FilterBar from "../../../components/admin/FilterBar";
import { CONST } from "../../../common/const";
import OrderUpdateStatus from "./OrderUpdateStatus";

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [orders, setOrders] = useState([]);
    const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: "", transaction: "", delivery: "" });
    const [selectedOder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;

    const statusOptions = [
        { id: "PENDING", name: "Đang chờ" },
        { id: "SHIPPING", name: "Đang giao" },
        { id: "COMPLETED", name: "Hoàn thành" },
        { id: "CANCELED", name: "Đã hủy" }
    ];

    const paymentMethodOptions = [
        { id: "COD", name: "COD" },
        { id: "MOMO", name: "MoMo E-Wallet" },
        { id: "ZALOPAY", name: "ZaloPay E-Wallet" }
    ];

    const deliveryOptions = [
        { id: "STANDARD", name: "Standard" },
        { id: "VIETTEL_POST", name: "Viettel Post" },
        { id: "FAST_DELIVERY", name: "Giao hàng nhanh" },
        { id: "JT_EXPRESS", name: "J&T Express" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const { status, transaction, delivery } = filters;
                const filtersForAPI = {
                    status,
                    transaction,
                    delivery
                };
                
                const response = await dispatch(
                    fetchOrders({ search: searchTerm, page, ...filtersForAPI })
                ).unwrap();

                setOrders(response.items || []);
                setPageInfo({
                    total: response.pageInfo?.totalElements || 0,
                    totalPages: response.pageInfo?.totalPages || 0,
                });
            } catch (err) {
                setError(err.message || CONST.GET_ORDER_LIST_ERROR);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, searchTerm, page, filters, searchParams,refresh]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams);

        const status = params.status || "";
        const paymentMethod = params.paymentMethod || "";
        const delivery = params.delivery || "";

        setFilters({
            status,
            paymentMethod,
            delivery
        });
    }, [searchParams]);

    const handleSearch = (value) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setSearchParams((prev) => {
            return { ...Object.fromEntries(prev), page: newPage };
        });
    };
    const handleIsOpenModal = (order) =>{
        setIsModalOpen(true);
        setSelectedOrder(order);
    }

    const handleIsCloseModal = () =>{
        setIsModalOpen(false);
        setRefresh(!refresh);
    }
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);

        setSearchParams((prev) => {
            const newParams = { ...Object.fromEntries(prev), page: 1 };

            if (newFilters.status && newFilters.status !== "") {
                newParams.status = newFilters.status;
            } else {
                delete newParams.status;
            }

            if (newFilters.paymentMethod && newFilters.paymentMethod !== "") {
                newParams.paymentMethod = newFilters.paymentMethod;
            } else {
                delete newParams.paymentMethod;
            }

            if (newFilters.delivery && newFilters.delivery !== "") {
                newParams.delivery = newFilters.delivery;
            } else {
                delete newParams.delivery;
            }

            return newParams;
        });
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            "PENDING": { label: "Đang chờ", className: "bg-gray-100 text-gray-800" },
            "SHIPPING": { label: "Đang giao", className: "bg-blue-100 text-blue-600" },
            "COMPLETED": { label: "Hoàn thành", className: "bg-green-100 text-green-600" },
            "CANCELED": { label: "Đã hủy", className: "bg-red-100 text-red-600" }
        };

        const statusInfo = statusMap[status] || { label: status, className: "bg-gray-100 text-gray-800" };
        
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                {statusInfo.label}
            </span>
        );
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

    const getPaymentMethodLabel = (paymentMethod) => {
        const paymentMap = {
            "COD": "COD",
            "MOMO": "MoMo E-Wallet",
            "ZALOPAY": "ZaloPay E-Wallet"
        };

        return paymentMap[paymentMethod] || paymentMethod;
    };

    const filterOptions = [
        { label: "Lọc theo trạng thái", key: "status", options: statusOptions },
        { label: "Lọc theo loại giao dịch", key: "transaction", options: paymentMethodOptions },
        { label: "Lọc theo ĐVVC", key: "delivery", options: deliveryOptions }
    ];

    const columns = [
        {
            header: "Mã đơn hàng",
            accessor: "orderCode",
            render: (order) => <strong className="font-bold">{order.orderCode}</strong>,
        },
        {
            header: "Số điện thoại khách hàng",
            accessor: "phoneNumber",
        },
        {
            header: "Tổng tiền",
            accessor: "totalPrice",
            render: (order) => (
                <span className="text-gray-700 font-medium">
                    {new Intl.NumberFormat("vi-VN").format(order.totalPrice)} đ
                </span>
            ),
        },
        {
            header: "Trạng thái",
            accessor: "status",
            render: (order) => getStatusLabel(order.status),
        },
        {
            header: "Loại giao dịch",
            accessor: "paymentMethod",
            render: (order) => getPaymentMethodLabel(order.paymentMethod),
        },
        {
            header: "Phương thức vận chuyển",
            accessor: "delivery",
            render: (order) => getDeliveryLabel(order.delivery),
        },
        
        {
            header: "Hành động",
            render: (order) => (
                <div className="flex gap-2">
                    <button 
                        className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
                        onClick={() => navigate(`/admin/orderDetail/${order.id}`)}
                    >
                        <FaEye />
                    </button>
                    <button 
                        className="text-yellow-500 text-lg hover:scale-110 transition mr-3"
                        onClick={() => handleIsOpenModal(order)}
                    >
                        <MdOutlineModeEdit />
                    </button>
                  
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-9">Đơn hàng</h2>

            <div className="mb-4">
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-[300px] flex-shrink-0">
                        <SearchBar
                            searchTerm={searchParams.get("search") || ""}
                            onSearch={handleSearch}
                            placeholder="Nhập mã đơn hàng hoặc SĐT..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex-grow">
                        <FilterBar
                            filters={{ ...filters, options: filterOptions }}
                            onFilterChange={handleFilterChange}
                            className="w-full"
                        />
                    </div>
                </div>               
            </div>

            {loading && <p className="text-center text-gray-600 mt-1">Đang tải dữ liệu...</p>}
            {error && <p className="text-center text-red-600 mt-1">{error}</p>}

            <DataTable columns={columns} data={orders} />

            <Pagination
                total={pageInfo.total}
                totalPages={pageInfo.totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
            <OrderUpdateStatus isOpen={isModalOpen} onClose={handleIsCloseModal} order={selectedOder} />
        </div>
    );
};

export default OrderList;