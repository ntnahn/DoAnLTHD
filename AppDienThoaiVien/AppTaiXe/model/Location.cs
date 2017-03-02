using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppTaiXe.model
{
    class Location
    {
        private Double lat;

        public Double Lat
        {
            get { return lat; }
            set { lat = value; }
        }
        private Double lng;

        public Double Lng
        {
            get { return lng; }
            set { lng = value; }
        }

        public Location(double lat, double lng)
        {
            Lat = lat;
            Lng = lng;
        }

    }
}
