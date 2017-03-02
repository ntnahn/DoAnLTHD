using AppTaiXe.model;
using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AppTaiXe
{
    public partial class NotificationGuest : Form
    {
        private Guest guest;

        internal Guest Guest
        {
            get { return guest; }
            set { guest = value; }
        }
        public NotificationGuest()
        {
            InitializeComponent();
        }

        private void NotificationGuest_Load(object sender, EventArgs e)
        {
            if (guest != null)
            {
                lblPhone.Text = guest.Phone;
                lblAdress.Text = guest.Address;
            }
            else
            {
                MessageBox.Show("Khách Hàng NULL");
            }
        }

        private void btnAccept_Click(object sender, EventArgs e)
        {

        }

        private void btnCancel_Click(object sender, EventArgs e)
        {

        }
    }
}
