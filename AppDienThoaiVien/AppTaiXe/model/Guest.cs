using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppTaiXe.model
{
    class Guest
    {
        private String id;

        public String Id
        {
            get { return id; }
            set { id = value; }
        }
        private String phone;

        public String Phone
        {
            get { return phone; }
            set { phone = value; }
        }
        private String address;

        public String Address
        {
            get { return address; }
            set { address = value; }
        }
        private String status;

        public String Status
        {
            get { return status; }
            set { status = value; }
        }
        private String type;

        public String Type
        {
            get { return type; }
            set { type = value; }
        }
    }
}
