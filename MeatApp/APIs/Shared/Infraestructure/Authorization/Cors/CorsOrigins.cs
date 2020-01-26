using Shared.Extensions;
using System.Collections.Generic;
using System.ComponentModel;

namespace Shared.Infraestructure.Authorization.Cors
{
    public class CorsOrigins
    {
        public enum EnvironmentType
        {
            [Description("dsv")]
            Development,

            [Description("hml")]
            Staging,

            [Description("prd")]
            Production
        }

        public static string[] GetAllowedOrigins(EnvironmentType environmentType)
        {
            var sufixo = environmentType.GetDescription();

            List<string> listAllowedOrigins = new List<string>
            {
                "http://localhost:4200",
                "https://localhost:4200",
                "http://127.0.0.1:4200",
                "https://127.0.0.1:4200",
                $"https://DOMINIO-{sufixo}.azurewebsites.net"
            };

            if (environmentType == EnvironmentType.Production)
            {
                listAllowedOrigins.Add("https://DOMINIO.com.br");
            }

            return listAllowedOrigins.ToArray();
        }
    }
}
