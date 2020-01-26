using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shared.Extensions;
using Shared.Infraestructure.Authorization;
using Shared.Infraestructure.Authorization.Cors;

namespace Meat.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            //services.AddCustomCors(CorsOrigins.GetAllowedOrigins(Configuration.GetCorsEnvironmentName()));
            services.AddCors(options =>
            {
                options.AddPolicy(AuthorizationConstants.Cors.EnableCors, builder =>
                {
                    builder
                        //.AllowAnyOrigin()
                        .WithOrigins(CorsOrigins.GetAllowedOrigins(Configuration.GetCorsEnvironmentName()))
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .Build();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(AuthorizationConstants.Cors.EnableCors);

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
