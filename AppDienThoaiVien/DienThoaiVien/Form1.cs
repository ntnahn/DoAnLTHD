using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace DienThoaiVien
{

    public partial class Form1 : Form
    {
        Socket socket;
        public Form1()
        {
            InitializeComponent();
            this.socket = IO.Socket("http://localhost:8080/");
            this.socket.On(Socket.EVENT_CONNECT, () =>
            {
                this.socket.Emit("message", "hello");
            });
        }

    }
}
