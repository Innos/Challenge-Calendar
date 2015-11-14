import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class IgnoreCaseReversedComparator {
    public static void main(String[] args) {
        ArrayList<String> strings = new ArrayList<String>() {{
            add("A");
            add("a");
            add("B");
            add("b");
            add("C");
            add("c");
        }};

        Collections.sort(strings, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                int result = Integer.compare(o1.length(), o2.length());
                if (result == 0) {
                    int i = 0;
                    while(i < o1.length() && result == 0) {
                        char a = Character.toLowerCase(o1.charAt(i));
                        char b = Character.toLowerCase(o2.charAt(i));
                        result = Integer.compare(a, b);
                        if (result == 0) {
                            result = -Integer.compare(o1.charAt(i), o2.charAt(i));
                        }
                        i++;
                    }
                }
                return result;
            }
        });
        System.out.println(strings);
    }
}
