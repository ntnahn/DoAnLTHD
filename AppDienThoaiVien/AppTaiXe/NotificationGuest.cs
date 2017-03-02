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
        internal Guest guestInfo;
        internal DriverMain driverMain;

        public NotificationGuest(DriverMain _driverMain, Guest _guest)
        {
            InitializeComponent();
            this.driverMain = _driverMain;
            this.guestInfo = _guest;
        }

        private void NotificationGuest_Load(object sender, EventArgs e)
        {
            if (guestInfo != null)
            {
                lblPhone.Text = guestInfo.Phone;
                lblAdress.Text = guestInfo.Address;
            }
            else
            {
                MessageBox.Show("Khách Hàng NULL");
            }
        }

        private void btnAccept_Click(object sender, EventArgs e)
        {
            if (driverMain != null)
                driverMain.accept();
            this.Close();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (driverMain != null)
                driverMain.cancel();
            this.Close();
        }
    }
}
