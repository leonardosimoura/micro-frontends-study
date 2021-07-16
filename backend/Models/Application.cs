using System.Collections.Generic;

namespace backend.Models
{

    public class Module
    {

        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Application> Applications { get; set; }

    }

    public class Application
    {
        public string Id { get; set; }
        public string ModuleId { get; set; }
        public Module Module { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Version { get; set; }


    }
}