import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Legend
} from "recharts";
import { FaFilter } from "react-icons/fa";
const CustomTooltip = ({ active, payload, label, chartType }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                {chartType === "topProduct" && data.sku && (
                    <>
                        <p className="font-semibold text-green-600">SKU: {data.sku}</p>
                        <p className="font-semibold text-gray-700">{label}</p>
                        <p className="text-indigo-600">
                            Số lượng: {new Intl.NumberFormat('vi-VN').format(payload[0].value)}
                        </p>
                    </>
                )}

                {chartType === "revenue" && (
                    <>
                        <p className="font-semibold text-gray-700">Ngày: {label}</p>
                        <p className="text-green-600">
                            Doanh thu: {new Intl.NumberFormat('vi-VN').format(payload[0].value)} đ
                        </p>
                        <p className="font-semibold text-indigo-600">Số đơn hàng: {data.totalOrder}</p>
                    </>
                )}
            </div>
        );
    }

    return null;
};


const renderXAxisTick = (props) => {
    const { x, y, payload } = props;
    const value = payload.value;
    const display = value.length > 10 ? value.substring(0, 10) + "..." : value;
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="middle"
                fill="#4B5563"
                className="text-sm"
            >
                {display}
            </text>
        </g>
    );
};

const Chart = ({
    title,
    limit: initialLimit = 7,
    startDay: initialStart,
    endDay: initialEnd,
    labelKey,
    dataKey,
    apiFetcher,
    chartType,
    setChartType,
}) => {
    const [data, setData] = useState([]);
    const [localLoading, setLocalLoading] = useState(true);
    const [localError, setLocalError] = useState(null);

    const [limit, setLimit] = useState(initialLimit);

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);

    const [startDayInput, setStartDayInput] = useState(null);
    const [endDayInput, setEndDayInput] = useState(null);

    useEffect(() => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        const format = (d) => d.toISOString().split("T")[0];

        const start = initialStart || format(thirtyDaysAgo);
        const end = initialEnd || format(today);

        setStartDay(start);
        setEndDay(end);
        setStartDayInput(start);
        setEndDayInput(end);
    }, [initialStart, initialEnd]);

    useEffect(() => {
        if (startDay && endDay) {
            const fetch = async () => {
                try {
                    setLocalLoading(true);
                    const res = await apiFetcher({ limit, startDay, endDay });
                    setData(res?.items || []);
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setLocalError(err.message);
                } finally {
                    setLocalLoading(false);
                }
            };
            fetch();
        }
    }, [limit, startDay, endDay, apiFetcher]);

    if (localLoading) return (
        <div className="w-full h-[480px] flex items-center justify-center">
            <div className="animate-pulse text-lg text-gray-600">
                Đang tải dữ liệu...
            </div>
        </div>
    );

    if (localError) return (
        <div className="w-full h-[480px] flex items-center justify-center">
            <p className="text-red-500 text-lg">Lỗi: {localError}</p>
        </div>
    );

    return (
        <div className="w-full h-[480px] px-4 py-2 bg-white rounded-xl shadow-sm">

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <div className="flex gap-4 items-center">
                    <div>
                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        >
                            <option value="topProduct">Top sản phẩm bán chạy</option>
                            <option value="revenue">Doanh thu theo ngày</option>
                        </select>
                    </div>
                    <div>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        >
                            <option value={5}>5 mục</option>
                            <option value={7}>7 mục</option>
                            <option value={10}>10 mục</option>
                        </select>
                    </div>
                    <input
                        type="date"
                        value={startDayInput}
                        max={endDayInput || new Date().toISOString().split("T")[0]}
                        onChange={(e) => setStartDayInput(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                    <input
                        type="date"
                        value={endDayInput}
                        min={startDayInput}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setEndDayInput(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                    <button
                        onClick={() => {
                            setStartDay(startDayInput);
                            setEndDay(endDayInput);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                    >
                        <FaFilter className="text-lg" />
                        <span>Lọc</span>
                    </button>
                </div>
            </div>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 45, bottom: 20 }}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    >
                        <defs>
                            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.4} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis
                            dataKey={labelKey}
                            tick={renderXAxisTick}
                            interval={0}
                            stroke="#9CA3AF"
                            axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickFormatter={(value) => new Intl.NumberFormat('vi-VN').format(value)}
                            tickLine={false}
                        />
                        <Tooltip
                            content={<CustomTooltip chartType={chartType} />}
                            cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                        <Bar
                            dataKey={dataKey}
                            fill="url(#colorBar)"
                            name={chartType === 'topProduct' ? 'Số lượng sản phẩm đã bán' : 'Doanh thu'}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={60}
                            animationBegin={0}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;