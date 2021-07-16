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
    public class ModuleController : ControllerBase
    {
        private AppDbContext Context { get; }
        public ModuleController(AppDbContext context)
        {
            Context = context;
            Context.Database.EnsureCreated();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Context.Modules.Select(s => new
            {
                s.Id,
                s.Name,
                Applications = s.Applications.Select(dep => new
                {
                    dep.Id,
                    dep.Source,
                    dep.Version
                })
            }).ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            return Ok(Context.Modules.Select(s => new
            {
                s.Id,
                s.Name,
                Applications = s.Applications.Select(dep => new
                {
                    dep.Id,
                    dep.Source,
                    dep.Version
                })
            }).FirstOrDefault(f => f.Id == id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] AddModuleViewModel viewModel)
        {
            try
            {
                var module = new Module();
                module.Id = viewModel.Id;
                module.Name = viewModel.Name;
                module.Applications = viewModel.Applications.Select(app => new Application()
                {
                    Id = app.Id,
                    Name = app.Name,
                    Source = app.Source,
                    Version = app.Version
                }).ToList();
                Context.Modules.Add(module);
                Context.SaveChanges();
                return Ok(module.Id);
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
                Context.Modules.Remove(Context.Modules.FirstOrDefault(f => f.Id == id));
                Context.SaveChanges();
                return Ok();
            }
            catch (System.Exception ex)
            {
                return Ok(ex);
            }
        }


        public class AddModuleViewModel
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public IEnumerable<AddApplicationViewModel> Applications { get; set; }
        }

        public class AddApplicationViewModel
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Source { get; set; }
            public string Version { get; set; }
        }
    }
}
