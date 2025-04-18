import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalUpdate from "../../../components/admin/ModalUpdate";
import { updateOrderStatus } from "../../../app/redux/slices/order.slice";

const statusOptions = [
  { value: "PENDING", label: "Đang chờ" },
  { value: "SHIPPING", label: "Đang giao" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELED", label: "Đã hủy" },
];

const schema = yup.object().shape({
  status: yup.string().required("Vui lòng chọn trạng thái!"),
});

const OrderUpdateStatus = ({ isOpen, onClose, order }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (order) {
      reset({
        status: order.status || "",
      });
    }
  }, [order, reset]);

  const watchedStatus = watch("status");

  const isChanged = watchedStatus && watchedStatus !== order?.status;

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(updateOrderStatus({ id: order.id, data })).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
      reset();
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const onError = (errors) => {
    if (errors.status) toast.error(errors.status.message);
  };

  return (
    <ModalUpdate
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật trạng thái đơn hàng"
      onSave={handleSubmit(onSubmit, onError)}
      isDisabled={!isChanged}
    >
      <label className="block text-lg font-semibold text-gray-700">
        Trạng thái <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
        {...register("status")}
      >
        <option value="">-- Chọn trạng thái --</option>
        {statusOptions.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
      {errors.status && (
        <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
      )}
    </ModalUpdate>
  );
};

export default OrderUpdateStatus;
