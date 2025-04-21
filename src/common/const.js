const MESSAGES = {
    // Auth messages
    REGISTER_SUCCESS: "Đăng ký thành công",
    REGISTER_ERROR: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.",
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGIN_ERROR: "Có lỗi xảy ra. Vui lòng thử lại.",
    PASSWORD_MISMATCH: "Mật khẩu không khớp!",
    FIELDS_REQUIRED: "Vui lòng điền đủ thông tin!",

    // Session messages
    SESSION_EXPIRED_MESSAGE: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
    INVALID_TOKEN: "Token không hợp lệ",

    // Network messages
    NETWORK_ERROR: "Lỗi mạng hoặc máy chủ không phản hồi.",
    NO_DATA : "Không có dữ liệu",

    // Profile messages
    GET_PROFILE_ERROR: 'Lỗi khi lấy thông tin tài khoản',
    UPDATE_PROFILE_SUCCESS: 'Cập nhật thông tin thành công',
    UPDATE_PROFILE_ERROR: 'Lỗi khi cập nhật thông tin',
    INVALID_EMAIL_FORMAT: 'Email không đúng định dạng',
    INVALID_PHONE_FORMAT: 'Số điện thoại phải có 10 chữ số',
    FULL_NAME_REQUIRED: "Họ và tên không được bỏ trống",

    // Change password messages
    CHANGE_PASSWORD_FIELDS_REQUIRED: 'Vui lòng điền đầy đủ thông tin',
    CHANGE_PASSWORD_MISMATCH: 'Mật khẩu mới không khớp',
    CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
    CHANGE_PASSWORD_ERROR: 'Đổi mật khẩu thất bại',
    OLD_PASSWORD_INCORRECT: 'Mật khẩu cũ không chính xác',

    // Upload messages
    UPLOAD_FILE_SIZE_ERROR: 'Kích thước file không được vượt quá 1MB',
    UPLOAD_FILE_TYPE_ERROR: 'Chỉ chấp nhận file JPEG hoặc PNG',
    UPLOAD_SUCCESS: 'Tải ảnh lên thành công',
    UPLOAD_ERROR: 'Lỗi khi tải file lên: ',

    // File deletion messages
    DELETE_FILE_ERROR: 'Lỗi khi xóa file',
    DELETE_FILE_NOT_FOUND: 'Không tìm thấy file cần xóa',
    DELETE_FILE_CLOUDINARY_ERROR: 'Lỗi khi xóa file từ Cloudinary',

    // Order messages
    CREATE_ORDER_SUCCESS: 'Đặt hàng thành công',
    UPDATE_ORDER_SUCCESS: 'Cập nhật đơn hàng thành công',
    UPDATE_ORDER_ERROR: 'Lỗi khi cập nhật đơn hàng',
    DELETE_ORDER_SUCCESS: 'Hủy đơn hàng thành công',
    DELETE_ORDER_ERROR: 'Lỗi khi hủy đơn hàng',

    // Product list error message
    GET_PRODUCT_LIST_ERROR: 'Lỗi khi lấy danh sách sản phẩm',
    GET_PRODUCT_DETAIL_ERROR: 'Lỗi khi lấy chi tiết sản phẩm',

    // Statistics error message
    START_DATE_AFTER_END_DATE_ERROR :"Ngày bắt đầu không được lớn hơn ngày kết thúc!",
    // VALLIDATION MESSAGE
    VALIDATION: {
        productCode: "Vui lòng nhập mã sản phẩm",
        productName: "Vui lòng nhập tên sản phẩm",

        quantity: {
            required: "Vui lòng nhập số lượng",
            type: "Số lượng phải là số",
            min: "Số lượng không được âm",
        },
        categoryId: "Vui lòng chọn loại sản phẩm",
        brandId: "Vui lòng chọn thương hiệu",
        color: "Vui lòng nhập màu sắc",
        warranty: "Vui lòng nhập thời gian bảo hành",
        price: {
            required: "Vui lòng nhập giá",
            type: "Giá phải là số",
            min: "Giá không được âm",
        },
        discount: {
            type: "Giảm giá phải là số",
            min: "Giảm giá không được âm",
            max: "Giảm giá không được vượt quá 100%",
        },
        description: "Vui lòng nhập mô tả",
        mainImageFile: {
            required: "Vui lòng chọn ảnh đại diện",
            size: "Ảnh đại diện phải nhỏ hơn 1MB",
        },
        images: {
            min: "Cần ít nhất 1 ảnh phụ",
            size: "Mỗi ảnh phụ phải nhỏ hơn 1MB",
        },
    }
};

const CONST = {
    ITEMS_PER_PAGE: 12,
    UPLOAD: {
        MAX_SIZE: 1024 * 1024, // 1MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png']
    },
    STATUS: {
        SUCCESS: 'success',
    }
};

export { CONST };
export default MESSAGES;
