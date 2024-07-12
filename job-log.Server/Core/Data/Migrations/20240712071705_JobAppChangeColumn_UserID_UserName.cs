using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace job_log.Server.Core.Data.Migrations
{
    /// <inheritdoc />
    public partial class JobAppChangeColumn_UserID_UserName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "JobApplications");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "JobApplications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "JobApplications");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "JobApplications",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
