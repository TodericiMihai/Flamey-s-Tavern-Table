using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPlayerUserRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAdmin",
                table: "AspNetUsers",
                newName: "IsAdmin");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Characters",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Characters_UserId",
                table: "Characters",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_AspNetUsers_UserId",
                table: "Characters",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_AspNetUsers_UserId",
                table: "Characters");

            migrationBuilder.DropIndex(
                name: "IX_Characters_UserId",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Characters");

            migrationBuilder.RenameColumn(
                name: "IsAdmin",
                table: "AspNetUsers",
                newName: "isAdmin");
        }
    }
}
