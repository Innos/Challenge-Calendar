using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class EightQueens
{
    static void Main(string[] args)
    {
        int[] b = new int[8];
        Recursion(0, b);
    }
    static void Recursion(int index, int[] board)
    {
        for (int i = 0; i < index; i++)
        {
            for (int l = i + 1; l < index; l++)
            {
                if (board[i] == board[l] || board[l] + (l - i) == board[i] || board[l] - (l - i) == board[i])
                {
                    return;
                }
            }
        }
        if (index >= 8)
        {
            Console.WriteLine(String.Join(" ", board));
        }
        else
        {
            for (int i = 0; i < 8; i++)
            {
                board[index] = i;
                Recursion(index + 1, board);
            }
        }
    }
}

