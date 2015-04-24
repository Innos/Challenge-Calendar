using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class Calendar
{
    static void Main(string[] args)
    {
        //Can resize the calendar here (min. 3)
        int calendarSize = 3;

        //Holds the Interior length can resize from calendarSize
        int CellInteriorLength = calendarSize*7-1;
        int singleCellLength = (CellInteriorLength - 6) / 7;
        Console.Write(@"Enter month and year in format mm.yyyy (ex. ""04.2015""):");
        DateTime date = DateTime.Parse(Console.ReadLine());
        string dayInWeek = date.DayOfWeek.ToString();
        int daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);
        string month = date.ToString("MMMM");
        month = month.PadLeft(((CellInteriorLength - month.Length)/2)+month.Length).PadRight(CellInteriorLength);

        //Pattern for the walls
        string[] patterns = new string[] { " ","~"," ","-" };
        int patternCounter = 0;
        string border = "";
        while(border.Length < CellInteriorLength)
        {
            border =border +  patterns[patternCounter++ % patterns.Length];
        }

        //Array to match Padding
        string[] days2 = new string[7] { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        //Array for the days Format
        char[] days = new char[7]{'M','T','W','T','F','S','S'};

        //Printing the top of the Calendar
        Console.WriteLine("+{0}+",border);
        Console.WriteLine();
        Console.WriteLine("|{0}|",month);
        Console.WriteLine();
        Console.WriteLine("+{0}+", border);
        Console.WriteLine();

        //Print Day Format
        for (int i = 0; i < days.Length; i++)
        {
            string dayFormat = days[i].ToString();
            dayFormat = dayFormat.PadLeft((singleCellLength - dayFormat.Length) / 2 + dayFormat.Length).PadRight(singleCellLength);
            if(i == 0)
            {
                Console.Write("|");
            }
            Console.Write("{0}",dayFormat);
            Console.Write("|");
        }
        Console.WriteLine();
        Console.WriteLine();
        Console.WriteLine("+{0}+", border);

        //Print numbers
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
                string printDay = (i - padding).ToString();
                printDay = printDay.PadLeft((singleCellLength - printDay.Length) / 2 + printDay.Length).PadRight(singleCellLength);
                Console.Write("{0}|",printDay);
            }
            else
            {
                Console.Write("{0}|", new string(' ', singleCellLength));
            }
        }

        Console.WriteLine();
        Console.WriteLine("+{0}+", border);
    }
}

