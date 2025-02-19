namespace GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication
{
    public class ConfirmForgetPasswordDTO
    {
        public string UserName { set; get; }
        public string ConfirmationCode { set; get; }
    }
}
