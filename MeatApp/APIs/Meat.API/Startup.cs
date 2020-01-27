using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shared.Extensions;
using Shared.Infraestructure.Authorization;
using Shared.Infraestructure.Authorization.Cors;
using Shared.Services;
using System;

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

            services.AddControllers();

            var jwtSettings = Configuration.GetConfiguration<JwtSettings>();

            var key = System.Text.Encoding.ASCII.GetBytes(jwtSettings.Key);
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwtSettings.Issuer,
                        ValidAudience = jwtSettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(key),

                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy(AuthorizationConstants.Polices.Bearer, 
                               new AuthorizationPolicyBuilder()
                                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                                    .RequireAuthenticatedUser()
                                    .Build());
            });
            
            services.Configure<JwtSettings>(Configuration.GetSection("JwtSettings"));

            services.AddScoped<IAuthenticationService, AuthenticationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();
            
            app.UseCors(AuthorizationConstants.Cors.EnableCors);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
