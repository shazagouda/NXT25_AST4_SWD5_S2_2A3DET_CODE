using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace A3DET_CODE.Migrations
{
    /// <inheritdoc />
    public partial class AddMentorSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "Badges");

            migrationBuilder.AddColumn<int>(
                name: "MentorId",
                table: "Teams",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MentorId",
                table: "Projects",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Initials",
                table: "Mentors",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Mentors",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Expertise",
                table: "Mentors",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Mentors",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GitHubUrl",
                table: "Mentors",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "Mentors",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalSessions",
                table: "Mentors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Mentors",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "YearsOfExperience",
                table: "Mentors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MentorId",
                table: "Evaluations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MentorMentees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MentorId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MentorMentees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MentorMentees_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MentorMentees_AspNetUsers_StudentId",
                        column: x => x.StudentId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MentorMentees_Mentors_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MentorSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MentorId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Topic = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    IsConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    StudentRating = table.Column<int>(type: "int", nullable: true),
                    StudentFeedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MentorRating = table.Column<int>(type: "int", nullable: true),
                    MentorFeedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MentorSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MentorSessions_AspNetUsers_StudentId",
                        column: x => x.StudentId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MentorSessions_Mentors_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teams_MentorId",
                table: "Teams",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_MentorId",
                table: "Projects",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Mentors_UserId",
                table: "Mentors",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_MentorId",
                table: "Evaluations",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorMentees_ApplicationUserId",
                table: "MentorMentees",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorMentees_MentorId",
                table: "MentorMentees",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorMentees_StudentId",
                table: "MentorMentees",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorSessions_MentorId",
                table: "MentorSessions",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorSessions_StudentId",
                table: "MentorSessions",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Evaluations_Mentors_MentorId",
                table: "Evaluations",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mentors_AspNetUsers_UserId",
                table: "Mentors",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Mentors_MentorId",
                table: "Projects",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Mentors_MentorId",
                table: "Teams",
                column: "MentorId",
                principalTable: "Mentors",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Evaluations_Mentors_MentorId",
                table: "Evaluations");

            migrationBuilder.DropForeignKey(
                name: "FK_Mentors_AspNetUsers_UserId",
                table: "Mentors");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Mentors_MentorId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Mentors_MentorId",
                table: "Teams");

            migrationBuilder.DropTable(
                name: "MentorMentees");

            migrationBuilder.DropTable(
                name: "MentorSessions");

            migrationBuilder.DropIndex(
                name: "IX_Teams_MentorId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Projects_MentorId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Mentors_UserId",
                table: "Mentors");

            migrationBuilder.DropIndex(
                name: "IX_Evaluations_MentorId",
                table: "Evaluations");

            migrationBuilder.DropColumn(
                name: "MentorId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "MentorId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "GitHubUrl",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "TotalSessions",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "YearsOfExperience",
                table: "Mentors");

            migrationBuilder.DropColumn(
                name: "MentorId",
                table: "Evaluations");

            migrationBuilder.AlterColumn<string>(
                name: "Initials",
                table: "Mentors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "Mentors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Expertise",
                table: "Mentors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "Badges",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
