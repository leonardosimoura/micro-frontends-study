using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private AppDbContext Context { get; }
        public ApplicationController(AppDbContext context)
        {
            Context = context;
            Context.Database.EnsureCreated();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Context.Applications.Select(s => new
            {
                s.Id,
                s.Name,
                Dependencies = s.Dependencies.Select(dep => new
                {
                    dep.DependencyId,
                    dep.DependencyVersion
                })
            }).ToList());
        }

        [HttpPost]
        public IActionResult Post([FromBody] AddApplicationViewModel model)
        {
            try
            {
                var app = new Application();
                app.Id = model.Id;
                app.Name = model.Name;
                app.Versions = model.Versions.Select(s => new ApplicationVersion()
                {
                    Id = app.Id,
                    Source = s.Source,
                    Version = s.Version
                }).ToList();
                Context.Applications.Add(app);
                Context.SaveChanges();
                return Ok(app.Id);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] string id)
        {
            try
            {
                Context.Applications.Remove(Context.Applications.FirstOrDefault(f => f.Id == id));
                Context.SaveChanges();
                return Ok();
            }
            catch (System.Exception ex)
            {
                return Ok(ex);
            }
        }


        public class AddApplicationViewModel
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public IEnumerable<AddApplicationVersionViewModel> Versions { get; set; }
        }

        public class AddApplicationVersionViewModel
        {
            public string Source { get; set; }
            public string Version { get; set; }
        }
    }
}
