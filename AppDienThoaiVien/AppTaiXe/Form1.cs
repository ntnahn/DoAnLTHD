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
            //var socket = IO.Socket("http://localhost:8080/");
            //socket.On(Socket.EVENT_CONNECT, () => {

            //});
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
                        var result = response.Content.ReadAsAsync<String>().Result;
                        if (result != null)
                        {
                            MessageBox.Show("Success " + result);
                          
                        }
                        else
                        {
                            MessageBox.Show("Please check username or password, not correctly!!");
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
                MessageBox.Show("Please insert name");
                return false;
            }
            String pass = txtPass.Text.Trim();
            if (String.IsNullOrEmpty(pass))
            {
                MessageBox.Show("Please insert password");
                return false;
            }
            return true;
        }
    }
}
