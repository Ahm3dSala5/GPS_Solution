using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GraduationProjecrStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Change_Project_File : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Project",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("883d4839-63e5-48c9-817a-361957533f2b"));

            migrationBuilder.DropColumn(
                name: "Data",
                table: "Project");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Project",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("46366765-b10a-4741-8162-0ab642c29699"), 0, "123 Main St", "6c24fffe-01de-41f1-87c2-02692e3f5fda", "testuser@example.com", true, false, null, "TESTUSER@EXAMPLE.COM", "TESTUSER", "AQAAAAIAAYagAAAAEO+MBTvF9+aBu65d3akTN8QMB3R+0Y3cYb6DUpaut5SOM1uxkvmm46Dlvn9jWQlkiQ==", "1234567890", true, "140774f3-bbfc-4e95-afc0-086a1e2c2ce7", false, "testuser" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("46366765-b10a-4741-8162-0ab642c29699"));

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Project");

            migrationBuilder.AddColumn<byte[]>(
                name: "Data",
                table: "Project",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Project",
                columns: new[] { "Id", "CollegeId", "ContentType", "Data", "DepartmentId", "Description", "Name", "SupervisorId", "UploadAt" },
                values: new object[,]
                {
                    { 1, 1, null, null, 1, null, null, 1, new DateTime(2025, 4, 24, 4, 40, 30, 280, DateTimeKind.Local).AddTicks(6185) },
                    { 2, 2, null, null, 2, null, null, 2, new DateTime(2025, 5, 4, 4, 40, 30, 280, DateTimeKind.Local).AddTicks(6315) },
                    { 3, 3, null, null, 3, null, null, 3, new DateTime(2025, 5, 14, 4, 40, 30, 280, DateTimeKind.Local).AddTicks(6332) }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "AccessFailedCount", "Address", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("883d4839-63e5-48c9-817a-361957533f2b"), 0, "123 Main St", "c7de6551-09be-42f3-bf83-3dc2adb87507", "testuser@example.com", true, false, null, "TESTUSER@EXAMPLE.COM", "TESTUSER", "AQAAAAIAAYagAAAAEGAhalghxp5XDOOZIkky90R41Tsl0EhzfJARDz/56TWed+wlE9285sOzeleI/asbDQ==", "1234567890", true, "9ab0dced-bdb2-496b-95f3-279aec802cb0", false, "testuser" });
        }
    }
}
