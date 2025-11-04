//namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Utils
//{
//    using Microsoft.EntityFrameworkCore;
//    using System.Text.Json;
//    using System.Threading;

//    public static class SeedDndData
//    {
//        public static void Seed(MyDbContext context)
//        {
//            var basePath = AppContext.BaseDirectory;
//            var dataFolder = Path.Combine(basePath, "Data", "dnd-data", "data");

//            if (!Directory.Exists(dataFolder))
//                throw new DirectoryNotFoundException($"Data folder not found: {dataFolder}");

//            foreach (var file in Directory.GetFiles(dataFolder, "*.json"))
//            {
//                var json = File.ReadAllText(file);

//                if (file.EndsWith("spells.json"))
//                {
//                    var spells = JsonSerializer.Deserialize<List<Spell>>(json);
//                    if (spells != null && !context.Spells.Any())
//                    {
//                        context.Spells.AddRange(spells);
//                    }
//                }
//                else if (file.EndsWith("monsters.json"))
//                {
//                    var monsters = JsonSerializer.Deserialize<List<Monster>>(json);
//                    if (monsters != null && !context.Monsters.Any())
//                    {
//                        context.Monsters.AddRange(monsters);
//                    }
//                }
//                // Add similar blocks for backgrounds, classes, items, species...
//            }

//            context.SaveChanges();
//        }
//    }

//}
