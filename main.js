//Tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

// Lấy data từ localstorage
getLocalStorage();

//Lấy dữ liệu đầu vào
function layDuLieuDauVao(isAdd) {
  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matKhau = getEle("txtPass").value;
  var _ngaySinh = getEle("txtNgaySinh").value;
  var _khoaHoc = getEle("khSV").value;
  var _diemToan = getEle("txtDiemToan").value;
  var _diemLy = getEle("txtDiemLy").value;
  var _diemHoa = getEle("txtDiemHoa").value;

  //isValid là true => cho phép thêm sinh viên vào mảng
  var isValid = true;

  /**
   * Validation: kiểm tra tính hợp lệ của dữ liệu đầu vào
   */
  //Kiểm tra Validation cho input
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(_maSV, "divMaErr", "(*) Mã SV không được rỗng.") &&
      validation.kiemTraDoDaiKiTu(
        _maSV,
        "divMaErr",
        "(*) Độ dài kí tự từ 4 - 10",
        4,
        10
      ) &&
      validation.kiemTraMaSVTrung(
        _maSV,
        "divMaErr",
        "(*) Mã SV đã tồn tại!",
        dssv.list
      );
  }

  isValid &=
    validation.kiemTraRong(
      _tenSV,
      "divTenErr",
      "(*) Tên sinh viên không được rỗng."
    ) &&
    validation.kiemTraKiTuChuoi(
      _tenSV,
      "divTenErr",
      "(*) Tên sinh viên phải là chữ."
    );
  isValid &=
    validation.kiemTraRong(
      _email,
      "divEmailErr",
      "(*) Email không được rỗng."
    ) &&
    validation.kiemTraKiTuDacBiet(
      _email,
      "divEmailErr",
      "(*) Email chưa đúng."
    );
  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "divMatKhauErr",
      "(*) Mật Khẩu không được rỗng."
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "divMatKhauErr",
      "(*) Mật Khẩu phải có chữ in hoa, số và kí tự đặc biệt."
    );
  isValid &=
    validation.kiemTraRong(
      _ngaySinh,
      "divNgaySinhErr",
      "(*) Ngày sinh không được rỗng."
    ) &&
    validation.kiemTraRong(
      _ngaySinh,
      "divNgaySinhErr",
      "(*) Ngày sinh chưa đúng."
    );

  isValid &= validation.kiemTraKhoaHoc(
    "khSV",
    "divKHErr",
    "(*) Vui lòng chọn khóa học"
  );

  isValid &=
    validation.kiemTraRong(
      _diemToan,
      "divToanErr",
      "(*) Điểm Toán không được rỗng."
    ) &&
    validation.kiemTraDiem(_diemToan, "divToanErr", "(*) Điểm Toán chưa đúng.");
  isValid &=
    validation.kiemTraRong(
      _diemLy,
      "divLyErr",
      "(*) Điểm Lý không được rỗng."
    ) && validation.kiemTraDiem(_diemLy, "divLyErr", "(*) Điểm Lý chưa đúng.");
  isValid &=
    validation.kiemTraRong(
      _diemHoa,
      "divHoaErr",
      "(*) Điểm Hóa không được rỗng."
    ) &&
    validation.kiemTraDiem(_diemHoa, "divHoaErr", "(*) Điểm Hóa chưa đúng.");

  //Tạo đối tượng sinhVien từ lớp đối tượng SinhVien
  //Từ khóa new tạo đối tượng từ lớp đối tượng
  if (isValid) {
    var sinhVien = new SinhVien(
      _maSV,
      _tenSV,
      _email,
      _matKhau,
      _ngaySinh,
      _khoaHoc,
      _diemToan,
      _diemLy,
      _diemHoa
    );
    return sinhVien;
  }
  return null;
}

function taoBang(arr) {
  //reset tbody
  getEle("tbodySinhVien").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    //Tạo dòng (tr)
    var tagTR = document.createElement("tr");

    //Tạo cột (td)
    var tagTD_MaSV = document.createElement("td");
    var tagTD_TenSV = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgaySinh = document.createElement("td");
    var tagTD_KhoaHoc = document.createElement("td");
    var tagTD_DTB = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    //Tạo nội dung cho các cột
    tagTD_MaSV.innerHTML = arr[i].maSV;
    tagTD_TenSV.innerHTML = arr[i].tenSV;
    tagTD_Email.innerHTML = arr[i].email;
    tagTD_NgaySinh.innerHTML = arr[i].ngaySinh;
    tagTD_KhoaHoc.innerHTML = arr[i].khoaHoc;
    tagTD_DTB.innerHTML = arr[i].diemTB;
    tagTD_Button_Edit.innerHTML =
      '<button class="btn btn-info" onclick="suaSinhVien(\'' +
      arr[i].maSV +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaSinhVien(\'' +
      arr[i].maSV +
      "')\">Xóa</button>";

    //appendChild chèn các cột vào dòng
    tagTR.appendChild(tagTD_MaSV);
    tagTR.appendChild(tagTD_TenSV);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgaySinh);
    tagTR.appendChild(tagTD_KhoaHoc);
    tagTR.appendChild(tagTD_DTB);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    //appendChild dòng vào tbody
    getEle("tbodySinhVien").appendChild(tagTR);
  }
}

//Thêm sinh viên

// getEle("btnAdd").onclick = function () {
//   console.log(123);
// };

//callback function: tham số của 1 hàm là 1 hàm khác
getEle("btnAdd").addEventListener("click", function (event) {
  //Chặn trang web bị load lại trong form
  event.preventDefault();

  var sinhVien = layDuLieuDauVao(true);

  //Kiểm tra thông tin hợp lệ mới add SV
  if (sinhVien) {
    sinhVien.tinhDTB();
    dssv.themSinhVien(sinhVien);
    taoBang(dssv.list);

    //Lưu mảng list xuống localstorage
    setLocalStorage();
  }
});

//Xóa sinh viên
function xoaSinhVien(maSV) {
  dssv._xoaSinhVien(maSV);
  taoBang(dssv.list);
  setLocalStorage();
  console.log(dssv.list);
}

//Sửa sinh viên
function suaSinhVien(maSV) {
  var sinhVien = dssv.layThongTinSinhVien(maSV);

  //Mở button btnUpdate
  getEle("btnUpdate").style = "inline-block";

  //DOM tới các thẻ input và show ra value
  getEle("txtMaSV").value = sinhVien.maSV;
  getEle("txtMaSV").disabled = true;

  getEle("txtTenSV").value = sinhVien.tenSV;
  getEle("txtEmail").value = sinhVien.email;
  getEle("txtPass").value = sinhVien.matKhau;
  getEle("txtNgaySinh").value = sinhVien.ngaySinh;
  getEle("khSV").value = sinhVien.khoaHoc;
  getEle("txtDiemToan").value = sinhVien.diemToan;
  getEle("txtDiemLy").value = sinhVien.diemLy;
  getEle("txtDiemHoa").value = sinhVien.diemHoa;
}

//Cập nhật sinh viên
getEle("btnUpdate").addEventListener("click", function () {
  //Lấy thông tin mới

  var sinhVien = layDuLieuDauVao(false);
  sinhVien.tinhDTB();
  dssv.capNhatSinhVien(sinhVien);
  taoBang(dssv.list);
  setLocalStorage();
});

//Reset Form
getEle("btnReset").addEventListener("click", function () {
  //DOM tới các thẻ input gán value là rỗng
  getEle("formSV").reset();
  getEle("btnUpdate").style.display = "none";
  getEle("txtMaSV").disabled = false;

  //DOM tới các thẻ div show Err sẽ reset lại
});

//Tìm kiếm sinh viên
getEle("txtSearch").addEventListener("keyup", function () {
  var keyWord = getEle("txtSearch").value;
  var mangTimKiem = dssv.timKiemSinhVien(keyWord);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  //chuyển kiểu JSON sang kiểu string (JSON.stringify)
  var arrString = JSON.stringify(dssv.list);
  localStorage.setItem("DSSV", arrString);
}

function getLocalStorage() {
  //chuyển kiểu string sang kiểu JSON (JSON.stringify)
  if (localStorage.getItem("DSSV")) {
    var data = localStorage.getItem("DSSV");
    dssv.list = JSON.parse(data);
    taoBang(dssv.list);
  }
}
