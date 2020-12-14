using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ImageCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "ImageCollection",
               columns: table => new
               {
                   ID = table.Column<Guid>(type: "TEXT", nullable: false),
                   ImageID = table.Column<Guid>(type: "TEXT", nullable: false),
                   ImageName = table.Column<string>(type: "TEXT", nullable: true),
                   ImageType = table.Column<string>(type: "TEXT", nullable: true),
                   Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                   ImageLength = table.Column<string>(type: "TEXT", nullable: true),
                   ImageURI = table.Column<string>(type: "TEXT", nullable: true),
                   Imagemetadata = table.Column<string>(type: "TEXT", nullable: true)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_Posts", x => x.ID);
               });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageCollection");
        }
    }
}
