using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppTaiXe.model
{
    class User
    {
        private String id;

        public String Id
        {
            get { return id; }
            set { id = value; }
        }
        private String name;

        public String Name
        {
            get { return name; }
            set { name = value; }
        }
        private String password;

        public String Password
        {
            get { return password; }
            set { password = value; }
        }

        private Location location;

        public Location Location
        {
            get { return location; }
            set { location = value; }
        }
        private String vehicleType;

        public String VehicleType
        {
            get { return vehicleType; }
            set { vehicleType = value; }
        }

        
    }
}
