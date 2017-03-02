using AppTaiXe.model;
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

namespace AppTaiXe
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            
        }

        void Form1_KeyDown(object sender, System.Windows.Forms.KeyEventArgs e)
        {
            MessageBox.Show("Key Down");
            if (e.KeyCode == Keys.Enter)
            {
                btnDangNhap.PerformClick();
            }
            throw new System.NotImplementedException();
        }


        private void btnDangNhap_Click(object sender, EventArgs e)
        {
            if (checkInfoLogin())
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    string url = "http://localhost:8080/api/user/check";
                    var user = new
                    {
                        name = txtName.Text.Trim(),
                        password = txtPass.Text.Trim()

                    };
                    HttpResponseMessage response = client.PutAsJsonAsync(url, user).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        User driver = response.Content.ReadAsAsync<User>().Result;
                        if (driver != null)
                        {
                            lblError.Text = "";
                            DriverMain DriverMain = new DriverMain();
                            DriverMain.Driver = driver;
                            this.Hide();
                            DriverMain.Show();
                           
                          
                        }
                        else
                        {
                            lblError.Text = "Please check username or password, not correctly!!";
                        }
                    }
                }
            }

        }

        private Boolean checkInfoLogin()
        {
            String name = txtName.Text.Trim();
            if (String.IsNullOrEmpty(name))
            {
                lblError.Text = "Please insert name";
                return false;
            }
            String pass = txtPass.Text.Trim();
            if (String.IsNullOrEmpty(pass))
            {
                lblError.Text = "Please insert password";
                return false;
            }
            return true;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            lblError.Text = "";
        }

        private void btnDangNhap_Keypress(object sender, KeyPressEventArgs e)
        {

        }
    }
}
