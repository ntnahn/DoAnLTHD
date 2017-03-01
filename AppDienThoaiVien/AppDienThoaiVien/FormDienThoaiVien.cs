//using Newtonsoft.Json;
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

namespace AppDienThoaiVien
{
    public partial class FormDienThoaiVien : Form
    {
        public FormDienThoaiVien()
        {
            InitializeComponent();
            this.cbxLoaiXe.SelectedIndex = 0;
        }

        public String getLoaiXe() {
            return this.cbxLoaiXe.SelectedIndex == 0 ? "normal" : "premium";
        }

        private void btnGui_Click(object sender, EventArgs e)
        {
            using (var client = new HttpClient()) {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                string url = "http://localhost:8080/api/point";

                var point = new
                {
                    point = new
                    {
                        address = txtDiaChiDonKhach.Text,
                        type = this.getLoaiXe(),
                        note = rtbGhiChu.Text
                    }
                };
                var response = client.PostAsJsonAsync(url, point).Result;
                if (response.IsSuccessStatusCode) {
                    var pointAdded = response.Content
                        .ReadAsAsync<Point>()
                        .Result;
                    MessageBox.Show("Thêm điểm thành công", "Thông báo");
                } else {
                    MessageBox.Show("Thêm điểm không thành công", "Thông báo");
                }
            }
        }
    }
}
