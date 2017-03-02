using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AppDienThoaiVien {
    public partial class FormDienThoaiVien : Form {
        private HttpClient httpClient;
        private bool isUpdate = false;
        public FormDienThoaiVien() {
            InitializeComponent();
            this.cbxLoaiXe.SelectedIndex = 0;
            this.httpClient = new HttpClient();
            this.httpClient.DefaultRequestHeaders.Accept.Clear();
            this.httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public String getLoaiXe() {
            return this.cbxLoaiXe.SelectedIndex == 0 ? "normal" : "premium";
        }

        private void btnGui_Click(object sender, EventArgs e) {
            if (this.isUpdate) {
                string url = "http://localhost:8080/api/client/update-by-phone";
                var client = new {
                    client = new {
                        phone = this.txtSDT.Text,
                        address = this.txtDiaChiDonKhach.Text,
                        type = this.getLoaiXe(),
                        note = this.rtbGhiChu.Text
                    }
                };
                var response = this.httpClient.PostAsJsonAsync(url, client).Result;
                if (response.IsSuccessStatusCode) {
                    var clientAdded = response.Content
                        .ReadAsAsync<Client>()
                        .Result;
                    this.resetFormData();
                    MessageBox.Show("Cập nhật thông tin khách hàng thành công", "Thông báo");
                } else {
                    MessageBox.Show("Cập nhật thông tin khách hàng thất bại", "Thông báo");
                }
            } else {
                string url = "http://localhost:8080/api/client";
                var client = new {
                    client = new {
                        phone = this.txtSDT.Text,
                        address = this.txtDiaChiDonKhach.Text,
                        type = this.getLoaiXe(),
                        note = this.rtbGhiChu.Text
                    }
                };
                var response = this.httpClient.PostAsJsonAsync(url, client).Result;
                if (response.IsSuccessStatusCode) {
                    var clientAdded = response.Content
                        .ReadAsAsync<Client>()
                        .Result;
                    this.resetFormData();
                    MessageBox.Show("Thêm thông tin khách hàng thành công", "Thông báo");
                } else {
                    MessageBox.Show("Thêm thông tin khách hàng thất bại", "Thông báo");
                }
            }
        }

        private void btnHuy_Click(object sender, EventArgs e) {
            this.resetFormData();
        }

        private void resetFormData() {
            this.txtSDT.Text = "";
            this.txtDiaChiDonKhach.Text = "";
            this.cbxLoaiXe.SelectedIndex = 0;
            this.rtbGhiChu.Text = "";
        }

        private void resetFormDataExcludePhone() {
            this.txtDiaChiDonKhach.Text = "";
            this.cbxLoaiXe.SelectedIndex = 0;
            this.rtbGhiChu.Text = "";
        }

        private void fillFormData(Client client) {
            if (client == null) {
                this.resetFormDataExcludePhone();
                this.isUpdate = false;
            } else {
                this.txtDiaChiDonKhach.Text = client.Address;
                this.cbxLoaiXe.SelectedIndex = client.Type == "normal" ? 0 : 1;
                this.rtbGhiChu.Text = client.Note;
                this.isUpdate = true;
            }
        }

        private void txtSDT_TextChanged(object sender, EventArgs e) {
            string url = "http://localhost:8080/api/client/get-client-by-phone/" + this.txtSDT.Text;
            var response = this.httpClient.GetAsync(url).Result;
            if (response.IsSuccessStatusCode) {
                var clientAdded = response.Content
                    .ReadAsAsync<Client>()
                    .Result;
                this.fillFormData(clientAdded);
            }
        }

        private void btnDong_Click(object sender, EventArgs e) {
            this.Close();
        }
    }
}
