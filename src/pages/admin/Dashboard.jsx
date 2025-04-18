import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchStatistics, fetchStatisticsTopProduct, fetchRevenue  } from "../../app/redux/slices/statistic.slice";
import { FiShoppingCart } from "react-icons/fi";
import { FaDollarSign, FaRegUserCircle } from "react-icons/fa";
import Chart from "../../components/admin/Chart";
import { toast } from "react-toastify";

const Dashboard = () => {
  const today = new Date().toLocaleDateString("vi-VN");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chartType, setChartType] = useState("topProduct");

  const [statistics, setStatistics] = useState({
    totalQuantityNewProducts: 0,
    totalQuantityNewOrders: 0,
    totalQuantityNewCustomers: 0,
  });

  const apiFetcherTopProduct = async ({ limit, startDay, endDay }) => {
    const res = await dispatch(fetchStatisticsTopProduct({ limit, startDay, endDay })).unwrap();
    return res;
  };

  const apiFetcherRevenue = async ({ limit, startDay, endDay }) => {
    const res = await dispatch(fetchRevenue({ limit, startDay, endDay })).unwrap();
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchStatistics()).unwrap();
        if (result) {
          setStatistics(result);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchData();
  }, [dispatch]);

  const renderChart = () => {
    return (
      <Chart
        title={
          chartType === "topProduct"
            ? "Top sản phẩm bán chạy"
            : "Doanh thu theo ngày"
        }
        limit={7}
        labelKey={chartType === "topProduct" ? "name" : "date"}
        dataKey={chartType === "topProduct" ? "quantitySold" : "totalPrice"}
        apiFetcher={
          chartType === "topProduct" ? apiFetcherTopProduct : apiFetcherRevenue
        }
        chartType={chartType}
        setChartType={setChartType}
      />
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#636AE8] mb-2">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sản phẩm mới */}
        <div
          className="bg-[#f0f2ff] rounded-xl shadow p-5 h-[170px] cursor-pointer"
          onClick={() => navigate("/admin/productList")}
        >
          <div className="flex justify-between items-center">
            <h5 className="font-bold">Sản phẩm mới</h5>
            <div className="border border-[#636AE8] p-2 rounded-lg text-[#636AE8]">
              <FiShoppingCart size={20} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-4">
            {statistics.totalQuantityNewProducts}
          </h2>
          <p className="mt-4 text-sm">
            Sản phẩm mới trong ngày{" "}
            <span className="text-green-600 font-bold">{today}</span>
          </p>
        </div>

        {/* Đơn hàng mới */}
        <div className="bg-[#fff0f3] rounded-xl shadow p-5 h-[170px]">
          <div className="flex justify-between items-center">
            <h5 className="font-bold">Đơn hàng mới</h5>
            <div className="border border-[#e83e8c] p-2 rounded-lg text-[#e83e8c]">
              <FaDollarSign size={20} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-4">
            {statistics.totalQuantityNewOrders}
          </h2>
          <p className="mt-4 text-sm">
            Đơn hàng mới trong ngày{" "}
            <span className="text-green-600 font-bold">{today}</span>
          </p>
        </div>

        {/* Khách hàng mới */}
        <div
          className="bg-[#f0f8ff] rounded-xl shadow p-5 h-[170px] cursor-pointer"
          onClick={() => navigate("/admin/accounts")}
        >
          <div className="flex justify-between items-center">
            <h5 className="font-bold">Khách hàng mới</h5>
            <div className="border border-[#17a2b8] p-2 rounded-lg text-[#17a2b8]">
              <FaRegUserCircle size={20} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-4">
            {statistics.totalQuantityNewCustomers}
          </h2>
          <p className="mt-4 text-sm">
            Khách hàng mới trong ngày{" "}
            <span className="text-green-600 font-bold">{today}</span>
          </p>
        </div>
      </div>
      <div className="mt-6">
      {renderChart()}
    </div>
      
    </div>
  );
};

export default Dashboard;