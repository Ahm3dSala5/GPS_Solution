using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GraduationProjecrStore.Infrastructure.Persistence.Configurations.Business
{
    public class StudentConfigurations : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.ToTable("Student").HasKey(x => x.Id);
        }
    }
}
