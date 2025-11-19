namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Utils
{
    using System.Security.Cryptography;

    public static class JoinCodeGenerator
    {
        private const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 

        public static string Generate(int length = 8)
        {
            var data = new byte[length];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(data);
            }

            var result = new char[length];
            for (int i = 0; i < length; i++)
            {
                result[i] = chars[data[i] % chars.Length];
            }

            return new string(result);
        }
    }

}
