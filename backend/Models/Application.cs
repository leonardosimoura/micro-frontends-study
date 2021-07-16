using System.Collections.Generic;

namespace backend.Models
{
    public class Application
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ApplicationVersion> Versions { get; set; }

        public IEnumerable<ApplicationDependency> Dependencies { get; set; }

        public IEnumerable<ApplicationDependency> Dependents { get; set; }
    }

    public class ApplicationVersion
    {
        public string Id { get; set; }
        public Application Application { get; set; }
        public string Source { get; set; }
        public string Version { get; set; }
        public IEnumerable<ApplicationDependency> Dependents { get; set; }
    }

    public class ApplicationDependency
    {
        public string Id { get; set; }
        public Application Application { get; set; }
        public string DependencyId { get; set; }
        public Application Dependency { get; set; }
        public ApplicationVersion DependencyVersion { get; set; }
        public string Version { get; set; }
    }
}