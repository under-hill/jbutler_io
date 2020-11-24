using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;

namespace PersonalSite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LotrController : ControllerBase
    {
        private static readonly string[] BookFileNames = new[]
        {
            "TFOTR.txt", "TT.txt", "TROTK.txt"
        };

        private static readonly string[] BookDisplayNames = new[]
{
            "The Fellowship of the Ring", "Two Towers", "The Return of the King"
        };

        private readonly ILogger<LotrController> _logger;

        public LotrController(ILogger<LotrController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Quote Get()
        {
            return RetrieveRandomQuote();
        }

        private Quote RetrieveRandomQuote()
        {
            var rng = new Random();
            int volumeIndex = rng.Next(3);
            string volume = BookFileNames[volumeIndex];
            string fullVolume = System.IO.File.ReadAllText(@"Storage/" + volume);
            string[] books = fullVolume.Split("<h2>", StringSplitOptions.RemoveEmptyEntries);
            int bookIndex = rng.Next(books.Length);
            string[] chapters = books[bookIndex].Split("<h3>", StringSplitOptions.RemoveEmptyEntries).Skip(1).ToArray();
            int chapterIndex = rng.Next(chapters.Length / 2) * 2 + 1; // this skips the odd numbered headings for the chapter names
            string[] paragraphs = chapters[chapterIndex].Split("<p>", StringSplitOptions.RemoveEmptyEntries);

            string chapterName = chapters[chapterIndex]
                .Split("</h3>", StringSplitOptions.RemoveEmptyEntries)[0]
                .Split(">", StringSplitOptions.RemoveEmptyEntries).Last();
            int paragraphIndex = rng.Next(0, paragraphs.Count() - 1);
            string Text = paragraphs[paragraphIndex].Split("</p>")[0].Trim();

            return new Quote()
            {
                Volume = BookDisplayNames[volumeIndex],
                Book = BookName(volumeIndex, bookIndex),
                Chapter = ToRoman((chapterIndex / 2) + 1) + ". " + chapterName,
                Text = Text
            };
        }

        private static string ToRoman(int number)
        {
            if ((number < 0) || (number > 3999)) throw new ArgumentOutOfRangeException("insert value betwheen 1 and 3999");
            if (number < 1) return string.Empty;
            if (number >= 1000) return "M" + ToRoman(number - 1000);
            if (number >= 900) return "CM" + ToRoman(number - 900);
            if (number >= 500) return "D" + ToRoman(number - 500);
            if (number >= 400) return "CD" + ToRoman(number - 400);
            if (number >= 100) return "C" + ToRoman(number - 100);
            if (number >= 90) return "XC" + ToRoman(number - 90);
            if (number >= 50) return "L" + ToRoman(number - 50);
            if (number >= 40) return "XL" + ToRoman(number - 40);
            if (number >= 10) return "X" + ToRoman(number - 10);
            if (number >= 9) return "IX" + ToRoman(number - 9);
            if (number >= 5) return "V" + ToRoman(number - 5);
            if (number >= 4) return "IV" + ToRoman(number - 4);
            if (number >= 1) return "I" + ToRoman(number - 1);
            throw new ArgumentOutOfRangeException("something bad happened");
        }

        private string BookName(int volumeIndex, int bookIndex)
        {
            if (volumeIndex == 0 && bookIndex == 0) {
                return "Prologue";
            }
            return ToRoman(bookIndex + 1 + volumeIndex * 2);
        }

        //private string ChapterName(isPrologue, )
    }
}
