
using Shared.Infraestructure.Authorization;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomCors(this IServiceCollection services, string[] origins)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AuthorizationConstants.Cors.EnableCors, builder =>
                {
                    builder
                        //.AllowAnyOrigin()
                        .WithOrigins(origins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .Build();
                });
            });

            return services;
        }
    }
}
