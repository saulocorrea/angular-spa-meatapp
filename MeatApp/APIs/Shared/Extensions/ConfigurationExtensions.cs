using Microsoft.Extensions.Configuration;
using Shared.Infraestructure.Authorization.Cors;
using System;

namespace Shared.Extensions
{
    public static class ConfigurationExtensions
    {
        public static CorsOrigins.EnvironmentType GetCorsEnvironmentName(this IConfiguration configuration)
        {
            CorsSettings settings = configuration.GetSection(typeof(CorsSettings).Name).Get<CorsSettings>();

            CorsOrigins.EnvironmentType environment = (CorsOrigins.EnvironmentType)Enum.Parse(typeof(CorsOrigins.EnvironmentType), settings?.Environment, true);

            return environment;
        }
    }
}
