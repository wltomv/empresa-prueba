using System.Security.Cryptography;
using System.Text;


namespace empresa_api.utils
{
    public class Encrypt
    {
        public static string getSHA256(string text){
            SHA256 sha256 = SHA256.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = sha256.ComputeHash(encoding.GetBytes(text));
            StringBuilder sb = new StringBuilder();
            for(int i =0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);

            return sb.ToString();
        }

        public static string getPasswordHash(string plainPass){
            return BCrypt.Net.BCrypt.HashPassword(plainPass);
        }
    }
}