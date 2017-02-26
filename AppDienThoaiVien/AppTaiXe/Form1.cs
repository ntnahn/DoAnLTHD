using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace AppTaiXe {
    public partial class Form1 : Form {
        public Form1() {
            InitializeComponent();
            var socket = IO.Socket("http://localhost:8080/");
            socket.On(Socket.EVENT_CONNECT, () => {
                //socket.Emit("hi");
            });
        }

        
    }
}
