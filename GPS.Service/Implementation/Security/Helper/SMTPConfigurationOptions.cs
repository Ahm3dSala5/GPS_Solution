using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProjectStore.Service.Implementation.Security.Helper
{
    internal class SMTPConfigurationOptions
    {
        public string Username { set; get; }
        public string Password { set; get; }
        public string Port { set; get; }
        public string Server { set; get; }
    }
}
