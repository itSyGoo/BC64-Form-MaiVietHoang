import React, { Component } from "react";

export default class ProductForm extends Component {
  state = {
    value: {
      maSV: "",
      hoTen: "",
      email: "",
      soDT: "",
    },
    errValue: {
      maSV: "",
      hoTen: "",
      email: "",
      soDT: "",
    },
    isSubmit: false,
  };
  handleChangeInput = (e) => {
    let tag = e.target;
    let dataType = e.target.getAttribute("data-type");
    console.log("datatype:", dataType);
    let nameInput = tag.name;
    let newValue = { ...this.state.value };
    newValue[nameInput] = tag.value;
    let newErrValue = { ...this.state.errValue };
    let message = "";
    if (newValue[nameInput] === "") {
      message = "Vui lòng không để trống";
    } else {
      if (dataType) {
        switch (dataType) {
          case "number":
            {
              let regex = /^[0-9]+$/;
              if (!regex.test(newValue[nameInput])) {
                message = "*Trường này chỉ nhận số";
              }
            }
            break;
          case "string":
            {
              let regex =
                /^[a-zA-ZàáảãạâấầẩẫậăắằẳẵặêếềểễệôốồổỗộơớờởỡợưứừửữựđÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÊẾỀỂỄỆÔỐỒỔỖỘƠỚỜỞỠỢƯỨỪỬỮỰĐ ]+$/;
              if (!regex.test(newValue[nameInput])) {
                message = "*Họ tên không nhận số";
              }
            }
            break;
          case "email":
            {
              let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if (!regex.test(newValue[nameInput])) {
                message = "* Vui lòngnhập đúng định dạng email";
              }
            }
            break;
          case "numberDT":
            {
              let regex =
                /^(0|\\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/;
              if (!regex.test(newValue[nameInput])) {
                message = "*Vui lòng nhập đúng số điện thoại VN";
              }
            }
            break;
          default: {
          }
        }
      }
    }
    newErrValue[nameInput] = message;
    let valid = true;
    for (let key in newErrValue) {
      if (newErrValue[key] !== "") {
        valid = false;
        break;
      }
    }
    for (let key in newValue) {
      if (newValue[key] === "") {
        valid = false;
        break;
      }
    }
    this.setState({
      value: newValue,
      errValue: newErrValue,
      isSubmit: valid,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { handleAddProduct } = this.props;
    handleAddProduct(this.state.value);
  };
  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.sinhVienEdit.maSV !== currentState.value.maSV) {
      currentState.value = { ...newProps.sinhVienEdit };
    }
    return currentState;
  }
  render() {
    let { maSV, hoTen, email, soDT } = this.state.value;
    console.log(this.state);
    return (
      <div className="container mt-4">
        <h3 className="container bg-dark text-white text-center">
          Thông tin sinh viên
        </h3>
        <form onSubmit={this.handleSubmit} className="border rounded-2 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="maSV" className="form-label">
                  Mã Sinh Viên
                </label>
                <input
                  data-type="number"
                  type="text"
                  className="form-control"
                  name="maSV"
                  value={maSV}
                  placeholder="Nhập mã sinh viên"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: "20px" }} className="text-danger">
                  {this.state.errValue.maSV}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="hoTen" className="form-label">
                  Họ Tên
                </label>
                <input
                  data-type="string"
                  type="text"
                  className="form-control"
                  name="hoTen"
                  value={hoTen}
                  placeholder="Nhập họ và tên"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: "20px" }} className="text-danger">
                  {this.state.errValue.hoTen}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  data-type="email"
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Nhập email"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: "20px" }} className="text-danger">
                  {this.state.errValue.email}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="soDT" className="form-label">
                  Số Điện Thoại
                </label>
                <input
                  data-type="numberDT"
                  type="text"
                  className="form-control"
                  name="soDT"
                  value={soDT}
                  placeholder="Nhập số điện thoại"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: "20px" }} className="text-danger">
                  {this.state.errValue.soDT}
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={!this.state.isSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Thêm sinh viên
          </button>
          <button
            disabled={!this.state.isSubmit}
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.handleUpdateSinhVien(this.state.value);
            }}
          >
            Cập nhật sinh viên
          </button>
        </form>
      </div>
    );
  }
}
