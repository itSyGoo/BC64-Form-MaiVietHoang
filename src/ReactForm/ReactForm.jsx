import React, { Component } from "react";
import ProductForm from "./ProductForm";

export default class ReactForm extends Component {
  state = {
    arrSinhVien: [
      // {
      //   maSV: 1,
      //   hoTen: "Nguyen Van A",
      //   email: "abc@gmail.com",
      //   soDT: "012345678",
      // },
      // {
      //   maSV: 2,
      //   hoTen: "Nguyen Van B",
      //   email: "xyz@gmail.com",
      //   soDT: "012345679",
      // },
    ],
    sinhVienEdit: {
      // maSV: 1,
      // hoTen: "Nguyen Van A",
      // email: "abc@gmail.com",
      // soDT: "012345678",
    },
    searchTerm: "",
  };
  handleAddProduct = (proClick) => {
    console.log("proClick: ", proClick);
    let arrUpdate = [...this.state.arrSinhVien];
    arrUpdate.push(proClick);
    this.setState({
      arrSinhVien: arrUpdate,
    });
  };
  handleDeleteSinhVien = (maSinhVien) => {
    let newArrSV = this.state.arrSinhVien.filter(
      (item) => item.maSV != maSinhVien
    );
    this.setState({ arrSinhVien: newArrSV });
  };
  handleEditSinhVien = (proClick) => {
    this.setState({
      sinhVienEdit: proClick,
    });
  };
  handleUpdateSinhVien = (sinhVienUpdate) => {
    let index = this.state.arrSinhVien.findIndex(
      (item) => item.maSV == sinhVienUpdate.maSV
    );
    if (index !== -1) {
      let newArrSinhVien = [...this.state.arrSinhVien];
      newArrSinhVien[index] = sinhVienUpdate;
      this.setState({ arrSinhVien: newArrSinhVien });
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };
  render() {
    const filteredSinhVien = this.state.arrSinhVien.filter((sinhVien) => {
      return (
        sinhVien.hoTen
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        sinhVien.maSV.toString().includes(this.state.searchTerm)
      );
    });
    return (
      <div>
        <ProductForm
          handleUpdateSinhVien={this.handleUpdateSinhVien}
          sinhVienEdit={this.state.sinhVienEdit}
          handleAddProduct={this.handleAddProduct}
        />
        <div className="container mt-4">
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            className="form-control mb-3"
          />
        </div>
        <table className="table container mt-4">
          <thead className="container text-white text-center bg-dark">
            <tr className="table-dark">
              <th>Mã SV</th>
              <th>Họ Tên</th>
              <th>Email</th>
              <th>Số ĐT</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSinhVien.map((sinhVien) => {
              return (
                <tr key={sinhVien.maSV}>
                  <td>{sinhVien.maSV}</td>
                  <td>{sinhVien.hoTen}</td>
                  <td>{sinhVien.email}</td>
                  <td>{sinhVien.soDT}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleEditSinhVien(sinhVien);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        this.handleDeleteSinhVien(sinhVien.maSV);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
