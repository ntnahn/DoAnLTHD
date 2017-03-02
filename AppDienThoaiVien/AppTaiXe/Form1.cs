using AppTaiXe.model;
using Newtonsoft.Json;
using Quobject.SocketIoClientDotNet.Client;
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
        private Socket socket;
        private User user = null;
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
                            this.user = driver;
                            //this.doConnectToSocket(driver.Id);
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

        private void doConnectToSocket(String userID)
        {
            // Connect to socket
            var socket = IO.Socket("http://localhost:8080/");
            socket.On(Socket.EVENT_CONNECT, () =>
            {
                // Emit connect to socket server
                socket.Emit("clientConnect", userID);
            });
            // When have client request
            socket.On("DriverRequest", (data) =>
            {
                MessageBox.Show("Socket on DriverRequest:");
            });
            socket.Emit("DriverResponse", JsonConvert.SerializeObject(new { abc = "abc" }));
            this.socket = socket;
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
