using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraduationProjecrStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NullableDepts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Supervisor_SupervisorId",
                table: "Project");

            migrationBuilder.AlterColumn<int>(
                name: "SupervisorId",
                table: "Project",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Supervisor_SupervisorId",
                table: "Project",
                column: "SupervisorId",
                principalTable: "Supervisor",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Supervisor_SupervisorId",
                table: "Project");

            migrationBuilder.AlterColumn<int>(
                name: "SupervisorId",
                table: "Project",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Supervisor_SupervisorId",
                table: "Project",
                column: "SupervisorId",
                principalTable: "Supervisor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
