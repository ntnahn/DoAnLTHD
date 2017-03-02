using AppTaiXe.model;
using System;
using System.Collections;
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
using System.Timers;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;

namespace AppTaiXe
{
    public partial class DriverMain : Form
    {
        private ArrayList locations = new ArrayList();
        private User driver;
        private System.Timers.Timer timer; // set the time (5 min in this case)
        private Socket socket = IO.Socket("http://localhost:8080/");
        private Guest guest;
        internal User Driver
        {
            get { return driver; }
            set { driver = value; }
        }

        public DriverMain()
        {
            InitializeComponent();
            timer = new System.Timers.Timer(TimeSpan.FromSeconds(5).TotalMilliseconds);
        }

        private void DriverMain_Load(object sender, EventArgs e)
        {
            lblName.Text = driver.Name;
            lblType.Text = "Loại xe " + driver.VehicleType;
            lblStatus.Text = "Trạng thái: " + driver.Status;
            locations.Add(new Location(10.766525, 106.681965));
            locations.Add(new Location(10.762154, 106.682512));
            locations.Add(new Location(10.760623, 106.681377));
            locations.Add(new Location(10.763693, 106.679060));
            locations.Add(new Location(10.759772, 106.680176));
            locations.Add(new Location(10.765907, 106.679533));
            locations.Add(new Location(10.769153, 106.685562));
            locations.Add(new Location(10.766602, 106.688287));
            locations.Add(new Location(10.767656, 106.674683));
            locations.Add(new Location(10.770439, 106.676786));
            locations.Add(new Location(10.770165, 106.681786));
            locations.Add(new Location(10.766349, 106.678073));
            locations.Add(new Location(10.766012, 106.673331));
            locations.Add(new Location(10.758718, 106.677666));
            locations.Add(new Location(10.758824, 106.682794));
            locations.Add(new Location(10.758992, 106.687622));
            locations.Add(new Location(10.763187, 106.687064));
            locations.Add(new Location(10.770818, 106.673203));
            locations.Add(new Location(10.768225, 106.684554));

            this.driver = updateLocationDriver();

            timer.AutoReset = true;
            timer.Elapsed += new System.Timers.ElapsedEventHandler(OnTimedEvent);
            timer.Start();
            this.listenningSocketIo();
        }

        private void listenningSocketIo()
        {
            socket.Emit("clientConnect", driver.Id);
            socket.On("DriverRequest", (data) =>
            {
                guest = JsonConvert.DeserializeObject<Guest>(data.ToString());
                NotificationGuest notificationGuest = new NotificationGuest(this, guest);
                notificationGuest.Show();
            });
        }

        public void accept()
        {
            //socket.Emit("DriverResponse")
            socket.Emit("DriverResponse", JsonConvert.SerializeObject(new { NvDvId = guest.NvDvId, response = true }));
        }

        public void cancel()
        {
            socket.Emit("DriverResponse", JsonConvert.SerializeObject(new { NvDvId = guest.NvDvId, response = false }));
        }

        private void DriverMain_Close(object sender, EventArgs e)
        {
            timer.Stop();
            timer.Dispose();
            Environment.Exit(0);
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            //Do the stuff you want to be done every hour;
            updateLocationSuccess();
        }

        private void updateLocationSuccess()
        {
            User userUpdated = updateLocationDriver();
            if (userUpdated != null)
            {
                driver = userUpdated;
                socket.Emit("updateLocation");
            }
        }


        private User updateLocationDriver()
        {
            Random Random = new Random();
            int indexLocation = Random.Next(0, locations.Count);
            Location locationIndex = locations[indexLocation] as Location;
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string url = "http://localhost:8080/api/user/"+ driver.Id + "/location";
                var location = new
                {   location = new {
                        lat = locationIndex.Lat,
                        lng = locationIndex.Lng
                    }
                };
                HttpResponseMessage response = client.PutAsJsonAsync(url, location).Result;
                if (response.IsSuccessStatusCode)
                {
                    User user = response.Content.ReadAsAsync<User>().Result;
                    if (user != null)
                    {
                        //MessageBox.Show("Success update location!!");
                        return user;
                    }
                    else
                    {
                        MessageBox.Show("ERROR update location!!");
                    }
                }
                return null;
            }
        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }
    }
}
