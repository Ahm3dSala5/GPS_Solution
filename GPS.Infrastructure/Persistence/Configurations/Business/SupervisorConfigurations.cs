using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduationProjecrStore.Infrastructure.Persistence.Configurations.Business
{
    public class SupervisorConfigurations : IEntityTypeConfiguration<Supervisor>
    {
        public void Configure(EntityTypeBuilder<Supervisor> builder)
        {
            builder.ToTable("Supervisor").HasKey(x => x.Id);
        }
    }
}
