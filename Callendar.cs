using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class Calendar
{
    static void Main(string[] args)
    {
        int CellInteriorLength = 34;
        Console.Write(@"Enter month and year in format mm.yyyy (ex. ""04.2015""):");
        DateTime date = DateTime.Parse(Console.ReadLine());
        string dayInWeek = date.DayOfWeek.ToString();
        int daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);
        string month = date.ToString("MMMM");
        month = month.PadLeft(((CellInteriorLength - month.Length)/2)+month.Length).PadRight(CellInteriorLength);

        string[] days2 = new string[7] { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        string pattern = " -";
        string border = string.Concat(Enumerable.Repeat(pattern, CellInteriorLength/pattern.Length));
        char[] days = new char[7]{'M','T','W','T','F','S','S'};

        //Actual Printing
        Console.WriteLine("+{0}+",border);
        Console.WriteLine();
        Console.WriteLine("|{0}|",month);
        Console.WriteLine();
        Console.WriteLine("+{0}+", border);
        Console.WriteLine();
        Console.WriteLine("|{0,3} |{1,3} |{2,3} |{3,3} |{4,3} |{5,3} |{6,3} |", days[0], days[1], days[2], days[3], days[4], days[5], days[6]);
        Console.WriteLine();
        Console.WriteLine("+{0}+", border);

        int padding = Array.IndexOf(days2, dayInWeek);
        int length = daysInMonth + padding;
        if(length % 7 != 0)
        {
            length = (length / 7 + 1)* 7;
        }
        for (int i = 1; i <= length; i++)
        {
            if(i == 1)
            {
                Console.Write("|");
            }
            else if( i % 7 == 1)
            {
                Console.WriteLine();
                Console.Write("|");
            }

            if(i-padding <= daysInMonth && i - padding > 0)
            {
                Console.Write("{0,4}|",i-padding);
            }
            else
            {
                Console.Write("{0,4}|", new string(' ', 4));
            }
        }
        Console.WriteLine();
        Console.WriteLine("+{0}+", border);
    }
}

