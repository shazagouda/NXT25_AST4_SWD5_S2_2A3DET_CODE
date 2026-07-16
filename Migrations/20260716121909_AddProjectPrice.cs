using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace A3DET_CODE.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Projects",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Projects");
        }
    }
}
