namespace Shared.Services
{
    public interface IAuthenticationService
    {
        string GenerateJwtToken();
    }
}
