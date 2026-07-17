using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace A3DET_CODE.Migrations
{
    /// <inheritdoc />
    public partial class AddChatGroupIdToTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChatGroupId",
                table: "Teams",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChatGroupId",
                table: "Teams");
        }
    }
}
